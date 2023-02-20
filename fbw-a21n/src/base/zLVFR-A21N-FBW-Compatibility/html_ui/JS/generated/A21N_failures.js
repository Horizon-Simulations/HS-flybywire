(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Failures = {}));
})(this, (function (exports) { 'use strict';

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  /**
   * Provides queued reading on top of another reader.
   *
   * Requires that the variable is written by a queued writer.
   *
   * Internally this reads values and writes 0 when it consumes the value.
   */
  class QueuedSimVarReader {
    constructor(simVar) {
      _defineProperty(this, "simVar", void 0);

      _defineProperty(this, "isResetting", false);

      this.simVar = simVar;
    }

    register(identifier, callback) {
      this.simVar.register(identifier, () => {
        this.resetSimVar();
        callback();
      });
    }

    update() {
      if (!this.isResetting) {
        this.simVar.update();
      }
    }

    resetSimVar() {
      this.isResetting = true;
      this.simVar.write(0).then(() => {
        this.isResetting = false;
      });
    }

  }

  class Queue {
    constructor() {
      _defineProperty(this, "store", []);
    }

    enqueue(val) {
      this.store.push(val);
    }

    dequeue() {
      return this.store.shift();
    }

    size() {
      return this.store.length;
    }

  }

  /**
   * Provides queued writing on top of another writer.
   *
   * Requires that the variable is read by a queued reader.
   *
   * Internally this writes values to a SimVar one after the other, waiting for the SimVar to be
   * consumed (set to 0) before writing the next value.
   */
  class QueuedSimVarWriter {
    constructor(simVar) {
      _defineProperty(this, "simVar", void 0);

      _defineProperty(this, "messageQueue", void 0);

      _defineProperty(this, "context", void 0);

      this.simVar = simVar;
      this.messageQueue = new Queue();
      this.context = undefined;
    }

    write(value) {
      return new Promise(resolve => {
        this.messageQueue.enqueue(() => {
          const context = {
            value,
            isWritten: false,
            resolve
          };
          this.simVar.write(value).then(() => {
            context.isWritten = true;
          });
          return context;
        }); // Whenever possible do not wait for an update before writing.

        this.immediatelyWriteWhenAble();
      });
    }

    update() {
      if (this.isWriting()) {
        if (this.context.isWritten && this.isReadByConsumer()) {
          this.finaliseWriting();
        }
      } else if (this.messageQueue.size() > 0) {
        this.writeNext();
      }
    }

    isWriting() {
      return this.context !== undefined;
    }

    writeNext() {
      const write = this.messageQueue.dequeue();
      this.context = write();
    }

    finaliseWriting() {
      this.context.resolve();
      this.context = undefined;
    }

    isReadByConsumer() {
      return this.simVar.read() !== this.context.value;
    }

    immediatelyWriteWhenAble() {
      if (!this.isWriting() && this.messageQueue.size() === 1) {
        this.writeNext();
      }
    }

  }

  /**
   * Reads (either directly or through a callback) and writes variables.
   */
  class SimVarReaderWriter {
    constructor(simVarName) {
      _defineProperty(this, "simVarName", void 0);

      _defineProperty(this, "callbacks", new Map());

      this.simVarName = simVarName;
    }

    register(identifier, callback) {
      this.callbacks.set(identifier, callback);
    }

    update() {
      const identifier = this.read();

      if (this.handles(identifier)) {
        this.notify(identifier);
      }
    }

    read() {
      return SimVar.GetSimVarValue(this.simVarName, 'number');
    }

    write(value) {
      return SimVar.SetSimVarValue(this.simVarName, 'number', value);
    }

    handles(identifier) {
      return this.callbacks.get(identifier) !== undefined;
    }

    notify(identifier) {
      this.callbacks.get(identifier)();
    }

  }

  function getActivateFailureSimVarName(prefix) {
    return "L:".concat(prefix, "_FAILURE_ACTIVATE");
  }
  function getDeactivateFailureSimVarName(prefix) {
    return "L:".concat(prefix, "_FAILURE_DEACTIVATE");
  }

  class FailuresConsumer {
    constructor(simVarPrefix) {
      _defineProperty(this, "activeFailures", new Map());

      _defineProperty(this, "callbacks", new Map());

      _defineProperty(this, "activateFailureReader", void 0);

      _defineProperty(this, "deactivateFailureReader", void 0);

      this.activateFailureReader = new QueuedSimVarReader(new SimVarReaderWriter(getActivateFailureSimVarName(simVarPrefix)));
      this.deactivateFailureReader = new QueuedSimVarReader(new SimVarReaderWriter(getDeactivateFailureSimVarName(simVarPrefix)));
    }

    register(identifier, callback) {
      if (this.callbacks.get(identifier) !== undefined) {
        throw new Error("Cannot register the same failure identifier (".concat(identifier, ") multiple times."));
      }

      this.callbacks.set(identifier, callback || (_ => {}));
      this.activateFailureReader.register(identifier, () => {
        this.onReadCallback(identifier, true);
      });
      this.deactivateFailureReader.register(identifier, () => {
        this.onReadCallback(identifier, false);
      });
    }

    update() {
      this.activateFailureReader.update();
      this.deactivateFailureReader.update();
    }

    isActive(identifier) {
      return this.activeFailures.get(identifier) === true;
    }

    onReadCallback(identifier, value) {
      this.callbacks.get(identifier)(value);
      this.activeFailures.set(identifier, value);
    }

  }

  /**
   * Orchestrates the activation and deactivation of failures.
   *
   * Only a single instance of the orchestrator should exist within the whole application.
   */
  class FailuresOrchestrator {
    constructor(simVarPrefix, failures) {
      _defineProperty(this, "failures", []);

      _defineProperty(this, "activeFailures", new Set());

      _defineProperty(this, "changingFailures", new Set());

      _defineProperty(this, "activateFailureQueue", void 0);

      _defineProperty(this, "deactivateFailureQueue", void 0);

      this.activateFailureQueue = new QueuedSimVarWriter(new SimVarReaderWriter(getActivateFailureSimVarName(simVarPrefix)));
      this.deactivateFailureQueue = new QueuedSimVarWriter(new SimVarReaderWriter(getDeactivateFailureSimVarName(simVarPrefix)));
      failures.forEach(failure => {
        this.failures.push({
          ata: failure[0],
          identifier: failure[1],
          name: failure[2]
        });
      });
    }

    update() {
      this.activateFailureQueue.update();
      this.deactivateFailureQueue.update();
    }
    /**
     * Activates the failure with the given identifier.
     */


    async activate(identifier) {
      this.changingFailures.add(identifier);
      await this.activateFailureQueue.write(identifier);
      this.changingFailures.delete(identifier);
      this.activeFailures.add(identifier);
    }
    /**
     * Deactivates the failure with the given identifier.
     */


    async deactivate(identifier) {
      this.changingFailures.add(identifier);
      await this.deactivateFailureQueue.write(identifier);
      this.changingFailures.delete(identifier);
      this.activeFailures.delete(identifier);
    }
    /**
     * Determines whether or not the failure with the given identifier is active.
     */


    isActive(identifier) {
      return this.activeFailures.has(identifier);
    }
    /**
     * Determines whether or not the failure with the given identifier is currently
     * changing its state between active and inactive.
     */


    isChanging(identifier) {
      return this.changingFailures.has(identifier);
    }

    getAllFailures() {
      return this.failures;
    }

    getActiveFailures() {
      return new Set(this.activeFailures);
    }

    getChangingFailures() {
      return new Set(this.changingFailures);
    }

  }

  // One can rightfully argue that this constant shouldn't be located in @flybywiresim/failures.
  // Once we create an A320 specific package, such as @flybywiresim/a320, we can move it there.
  const A320Failure = Object.freeze({
    Fac1Failure: 22000,
    Fac2Failure: 22001,
    TransformerRectifier1: 24000,
    TransformerRectifier2: 24001,
    TransformerRectifierEssential: 24002,
    Elac1Failure: 27000,
    Elac2Failure: 27001,
    Sec1Failure: 27002,
    Sec2Failure: 27003,
    Sec3Failure: 27004,
    Fcdc1Failure: 27005,
    Fcdc2Failure: 27006,
    GreenReservoirLeak: 29000,
    BlueReservoirLeak: 29001,
    YellowReservoirLeak: 29002,
    GreenReservoirAirLeak: 29003,
    BlueReservoirAirLeak: 29004,
    YellowReservoirAirLeak: 29005,
    GreenReservoirReturnLeak: 29006,
    BlueReservoirReturnLeak: 29007,
    YellowReservoirReturnLeak: 29008,
    LeftPfdDisplay: 31000,
    RightPfdDisplay: 31001,
    FlightWarningComputer1: 31500,
    FlightWarningComputer2: 31501,
    LgciuPowerSupply1: 32000,
    LgciuPowerSupply2: 32001,
    LgciuInternalError1: 32002,
    LgciuInternalError2: 32003,
    GearProxSensorDamageGearUplockNose1: 32004,
    GearProxSensorDamageGearDownlockNose2: 32005,
    GearProxSensorDamageGearUplockRight1: 32006,
    GearProxSensorDamageGearDownlockRight2: 32007,
    GearProxSensorDamageGearUplockLeft2: 32008,
    GearProxSensorDamageGearDownlockLeft1: 32009,
    GearProxSensorDamageGearDoorClosedNose1: 32010,
    GearProxSensorDamageGearDoorOpenedNose2: 32011,
    GearProxSensorDamageGearDoorClosedRight2: 32012,
    GearProxSensorDamageGearDoorOpenedRight1: 32013,
    GearProxSensorDamageGearDoorClosedLeft2: 32014,
    GearProxSensorDamageGearDoorOpenedLeft1: 32015,
    GearActuatorJammedGearNose: 32020,
    GearActuatorJammedGearLeft: 32021,
    GearActuatorJammedGearRight: 32022,
    GearActuatorJammedGearDoorNose: 32023,
    GearActuatorJammedGearDoorLeft: 32024,
    GearActuatorJammedGearDoorRight: 32025,
    RadioAltimeter1: 34000,
    RadioAltimeter2: 34001
  });

  exports.A320Failure = A320Failure;
  exports.FailuresConsumer = FailuresConsumer;
  exports.FailuresOrchestrator = FailuresOrchestrator;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
