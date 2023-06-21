(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Tcas = {}));
})(this, (function (exports) { 'use strict';

  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
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
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  /**
   * Utility class to throttle instrument updates
   */
  class UpdateThrottler {
    /**
     * @param {number} intervalMs Interval between updates, in milliseconds
     */
    constructor(intervalMs) {
      _defineProperty(this, "intervalMs", void 0);
      _defineProperty(this, "currentTime", void 0);
      _defineProperty(this, "lastUpdateTime", void 0);
      _defineProperty(this, "refreshOffset", void 0);
      _defineProperty(this, "refreshNumber", void 0);
      this.intervalMs = intervalMs;
      this.currentTime = 0;
      this.lastUpdateTime = 0;

      // Take a random offset to space out updates from different instruments among different
      // frames as much as possible.
      this.refreshOffset = Math.floor(Math.random() * intervalMs);
      this.refreshNumber = 0;
    }

    /**
     * Checks whether the instrument should be updated in the current frame according to the
     * configured update interval.
     *
     * @param {number} deltaTime
     * @param {boolean} [forceUpdate = false] - True if you want to force an update during this frame.
     * @returns -1 if the instrument should not update, or the time elapsed since the last
     *          update in milliseconds
     */
    canUpdate(deltaTime) {
      let forceUpdate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      this.currentTime += deltaTime;
      const number = Math.floor((this.currentTime + this.refreshOffset) / this.intervalMs);
      const update = number > this.refreshNumber;
      this.refreshNumber = number;
      if (update || forceUpdate) {
        const accumulatedDelta = this.currentTime - this.lastUpdateTime;
        this.lastUpdateTime = this.currentTime;
        return accumulatedDelta;
      }
      return -1;
    }
  }

  // Copyright (c) 2020-2021 Working Title, FlyByWire Simulations
  let TurnDirection = /*#__PURE__*/function (TurnDirection) {
    TurnDirection[TurnDirection["Unknown"] = 0] = "Unknown";
    TurnDirection[TurnDirection["Left"] = 1] = "Left";
    TurnDirection[TurnDirection["Right"] = 2] = "Right";
    TurnDirection[TurnDirection["Either"] = 3] = "Either";
    return TurnDirection;
  }({});

  class MathUtils {
    static fastToFixed(val, fraction) {
      if (fraction <= 0) {
        return Math.round(val).toString();
      }
      let coefficient = MathUtils.optiPow10[fraction];
      if (!coefficient || Number.isNaN(coefficient)) {
        coefficient = 10 ** fraction;
        MathUtils.optiPow10[fraction] = coefficient;
      }
      return (Math.round(val * coefficient) / coefficient).toString();
    }
    static fastToFixedNum(val, fraction) {
      if (fraction <= 0) {
        return Math.round(val);
      }
      let coefficient = MathUtils.optiPow10[fraction];
      if (!coefficient || Number.isNaN(coefficient)) {
        coefficient = 10 ** fraction;
        MathUtils.optiPow10[fraction] = coefficient;
      }
      return Math.round(val * coefficient) / coefficient;
    }

    /**
      * Adds two angles with wrap around to result in 0-360°
      * @param a - positive or negative angle
      * @param b - positive or negative angle
      */
    static angleAdd(a, b) {
      let r = a + b;
      while (r > 360) {
        r -= 360;
      }
      while (r < 0) {
        r += 360;
      }
      return r;
    }
    static diffAngle(a, b, direction) {
      let diff = b - a;
      while (diff > 180) {
        diff -= 360;
      }
      while (diff <= -180) {
        diff += 360;
      }
      if (diff < 0 && direction === TurnDirection.Right) {
        diff += 360;
      }
      if (diff > 0 && direction === TurnDirection.Left) {
        diff -= 360;
      }
      return diff;
    }
    static adjustAngleForTurnDirection(angle, turnDirection) {
      let ret = angle;
      if (angle < 0 && turnDirection === TurnDirection.Right) {
        ret += 360;
      }
      if (angle > 0 && turnDirection === TurnDirection.Left) {
        ret -= 360;
      }
      return ret;
    }

    /**
     * Calculates the inner angle of the small triangle formed by two intersecting lines
     *
     * This effectively returns the angle XYZ in the figure shown below:
     *
     * ```
     * * Y
     * |\
     * | \
     * |  \
     * |   \
     * |    \
     * |     \
     * |      \
     * * X     * Z
     * ```
     *
     * @param xyAngle {number} bearing of line XY
     * @param zyAngle {number} bearing of line ZY
     */
    static smallCrossingAngle(xyAngle, zyAngle) {
      // Rotate frame of reference to 0deg
      let correctedXyBearing = xyAngle - zyAngle;
      if (correctedXyBearing < 0) {
        correctedXyBearing = 360 + correctedXyBearing;
      }
      let xyzAngle = 180 - correctedXyBearing;
      if (xyzAngle < 0) {
        // correctedXyBearing was > 180

        xyzAngle = 360 + xyzAngle;
      }
      return xyzAngle;
    }
    static mod(x, n) {
      return x - Math.floor(x / n) * n;
    }
    static highestPower2(n) {
      let res = 0;
      for (let i = n; i >= 1; i--) {
        if ((i & i - 1) === 0) {
          res = i;
          break;
        }
      }
      return res;
    }
    static unpackPowers(n) {
      const res = [];
      let x = n;
      while (x > 0) {
        const pow = MathUtils.highestPower2(x);
        res.push(pow);
        x -= pow;
      }
      return res;
    }
    static packPowers(ns) {
      if (ns.some(it => it === 0 || (it & it - 1) !== 0)) {
        throw new Error('Cannot pack number which is not a power of 2 or is equal to zero.');
      }
      return ns.reduce((acc, v) => acc + v);
    }

    /**
      * Convert degrees Celsius into Kelvin
      * @param celsius degrees Celsius
      * @returns degrees Kelvin
      */
    static convertCtoK(celsius) {
      return celsius + 273.15;
    }

    /**
      * Convert Mach to True Air Speed
      * @param mach Mach
      * @param oat Kelvin
      * @returns True Air Speed
      */
    static convertMachToKTas(mach, oat) {
      return mach * 661.4786 * Math.sqrt(oat / 288.15);
    }

    /**
      * Convert TAS to Mach
      * @param tas TAS
      * @param oat Kelvin
      * @returns True Air Speed
      */
    static convertKTASToMach(tas, oat) {
      return tas / 661.4786 / Math.sqrt(oat / 288.15);
    }

    /**
      * Convert TAS to Calibrated Air Speed
      * @param tas velocity true air speed
      * @param oat current temperature Kelvin
      * @param pressure current pressure hpa
      * @returns Calibrated Air Speed
      */
    static convertTasToKCas(tas, oat, pressure) {
      return 1479.1 * Math.sqrt((pressure / 1013 * ((1 + 1 / (oat / 288.15) * (tas / 1479.1) ** 2) ** 3.5 - 1) + 1) ** (1 / 3.5) - 1);
    }

    /**
      * Convert KCAS to KTAS
      * @param kcas velocity true air speed
      * @param oat current temperature Kelvin
      * @param pressure current pressure hpa
      * @returns True Air Speed
      */
    static convertKCasToKTAS(kcas, oat, pressure) {
      return 1479.1 * Math.sqrt(oat / 288.15 * ((1 / (pressure / 1013) * ((1 + 0.2 * (kcas / 661.4786) ** 2) ** 3.5 - 1) + 1) ** (1 / 3.5) - 1));
    }

    /**
      * Convert Mach to Calibrated Air Speed
      * @param mach Mach
      * @param oat Kelvin
      * @param pressure current pressure hpa
      * @returns Calibrated Air Speed
      */
    static convertMachToKCas(mach, oat, pressure) {
      return MathUtils.convertTasToKCas(MathUtils.convertMachToKTas(mach, oat), oat, pressure);
    }

    /**
      * Gets the horizontal distance between 2 points, given in lat/lon
      * @param pos0Lat {number} Position 0 lat
      * @param pos0Lon {number} Position 0 lon
      * @param pos1Lat {number} Position 1 lat
      * @param pos1Lon {number} Position 1 lon
      * @return {number} distance in nautical miles
      */
    static computeGreatCircleDistance(pos0Lat, pos0Lon, pos1Lat, pos1Lon) {
      const lat0 = pos0Lat * MathUtils.DEGREES_TO_RADIANS;
      const lon0 = pos0Lon * MathUtils.DEGREES_TO_RADIANS;
      const lat1 = pos1Lat * MathUtils.DEGREES_TO_RADIANS;
      const lon1 = pos1Lon * MathUtils.DEGREES_TO_RADIANS;
      const dlon = lon1 - lon0;
      const cosLat0 = Math.cos(lat0);
      const cosLat1 = Math.cos(lat1);
      const a1 = Math.sin((lat1 - lat0) / 2);
      const a2 = Math.sin(dlon / 2);
      return Math.asin(Math.sqrt(a1 * a1 + cosLat0 * cosLat1 * a2 * a2)) * 6880.126;
    }

    /**
      * Gets the heading between 2 points, given in lat/lon
      * @param pos0Lat {number} Position 0 lat
      * @param pos0Lon {number} Position 0 lon
      * @param pos1Lat {number} Position 1 lat
      * @param pos1Lon {number} Position 1 lon
      * @return {number} distance in nautical miles
      */
    static computeGreatCircleHeading(pos0Lat, pos0Lon, pos1Lat, pos1Lon) {
      const lat0 = pos0Lat * MathUtils.DEGREES_TO_RADIANS;
      const lon0 = pos0Lon * MathUtils.DEGREES_TO_RADIANS;
      const lat1 = pos1Lat * MathUtils.DEGREES_TO_RADIANS;
      const lon1 = pos1Lon * MathUtils.DEGREES_TO_RADIANS;
      const dlon = lon1 - lon0;
      const cosLat1 = Math.cos(lat1);
      let x = Math.sin(lat1 - lat0);
      const sinLon2 = Math.sin(dlon / 2.0);
      x += sinLon2 * sinLon2 * 2.0 * Math.sin(lat0) * cosLat1;
      let heading = Math.atan2(cosLat1 * Math.sin(dlon), x);
      if (heading < 0) {
        heading += 2 * Math.PI;
      }
      return heading * MathUtils.RADIANS_TO_DEGREES;
    }

    /**
      * Gets the distance between 2 points, given in lat/lon/alt above sea level
      * @param pos0Lat {number} Position 0 lat
      * @param pos0Lon {number} Position 0 lon
      * @param pos0alt {number} Position 0 alt (feet)
      * @param pos1Lat {number} Position 1 lat
      * @param pos1Lon {number} Position 1 lon
      * @param pos1alt {number} Position 1 alt (feet)
      * @return {number} distance in nautical miles
      */
    static computeDistance3D(pos0Lat, pos0Lon, pos0alt, pos1Lat, pos1Lon, pos1alt) {
      const earthRadius = 3440.065; // earth radius in nautcal miles
      const deg2rad = Math.PI / 180;
      const radius1 = pos0alt / 6076 + earthRadius;
      const radius2 = pos1alt / 6076 + earthRadius;
      const x1 = radius1 * Math.sin(deg2rad * (pos0Lat + 90)) * Math.cos(deg2rad * (pos0Lon + 180));
      const y1 = radius1 * Math.sin(deg2rad * (pos0Lat + 90)) * Math.sin(deg2rad * (pos0Lon + 180));
      const z1 = radius1 * Math.cos(deg2rad * (pos0Lat + 90));
      const x2 = radius2 * Math.sin(deg2rad * (pos1Lat + 90)) * Math.cos(deg2rad * (pos1Lon + 180));
      const y2 = radius2 * Math.sin(deg2rad * (pos1Lat + 90)) * Math.sin(deg2rad * (pos1Lon + 180));
      const z2 = radius2 * Math.cos(deg2rad * (pos1Lat + 90));
      return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2);
    }

    /**
      * Check if point is inside a given ellipse
      *
      * @param {number} xPos x value of point
      * @param {number} yPos y value of point
      * @param {number} xLimPos +ve xLimit of ellipse
      * @param {number} xLimNeg -ve xLimit of ellipse
      * @param {number} yLimPos +ve yLimit of ellipse
      * @param {number} yLimNeg -ve yLimit of ellipse
      * @return {boolean} Whether the point is in the ellipse
      *
      */
    static pointInEllipse(xPos, yPos, xLimPos, yLimPos) {
      let xLimNeg = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : xLimPos;
      let yLimNeg = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : yLimPos;
      return xPos ** 2 / (xPos >= 0 ? xLimPos : xLimNeg) ** 2 + yPos ** 2 / (yPos >= 0 ? yLimPos : yLimNeg) ** 2 <= 1;
    }

    /**
      * Performs the even-odd-rule Algorithm (a raycasting algorithm) to find out whether a point is in a given polygon.
      * This runs in O(n) where n is the number of edges of the polygon.
      *
      * @param {Array} polygon an array representation of the polygon where polygon[i][0] is the x Value of the i-th point and polygon[i][1] is the y Value.
      * @param {number} xPos  x value of point
      * @param {number} yPos y value of point
      * @return {boolean} Whether the point is in the polygon (not on the edge, just turn < into <= and > into >= for that)
      */
    static pointInPolygon(xPos, yPos, polygon) {
      // A point is in a polygon if a line from the point to infinity crosses the polygon an odd number of times
      let odd = false;
      // For each edge (In this case for each point of the polygon and the previous one)
      for (let i = 0, j = polygon.length - 1; i < polygon.length; i++) {
        // If a line from the point into infinity crosses this edge
        if (polygon[i][1] > yPos !== polygon[j][1] > yPos // One point needs to be above, one below our y coordinate
        // ...and the edge doesn't cross our Y corrdinate before our x coordinate (but between our x coordinate and infinity)
        && xPos < (polygon[j][0] - polygon[i][0]) * (yPos - polygon[i][1]) / (polygon[j][1] - polygon[i][1]) + polygon[i][0]) {
          // Invert odd
          odd = !odd;
        }
        j = i;
      }
      // If the number of crossings was odd, the point is in the polygon
      return odd;
    }

    /**
      * Line intercept math by Paul Bourke http://paulbourke.net/geometry/pointlineplane/
      * Determine the intersection point of two line segments
      * Return null if the lines don't intersect
      *
      * @param {number} x1 line0 x origin
      * @param {number} y1 line0 y origin
      * @param {number} x2 line0 x end
      * @param {number} y2 line0 y end
      * @param {number} x3 line1 x origin
      * @param {number} y3 line1 y origin
      * @param {number} x4 line1 x end
      * @param {number} y4 line1 y end
      *
      * @return {[number, number] | null} [x,y] of intercept, null if no intercept.
      */
    static intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
      // Check if none of the lines are of length 0
      if (x1 === x2 && y1 === y2 || x3 === x4 && y3 === y4) {
        return null;
      }
      const denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);

      // Lines are parallel
      if (denominator === 0) {
        return null;
      }
      const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
      const ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;

      // is the intersection along the segments
      if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
        return null;
      }

      // Return a object with the x and y coordinates of the intersection
      const x = x1 + ua * (x2 - x1);
      const y = y1 + ua * (y2 - y1);
      return [x, y];
    }

    // Find intersect with polygon
    static intersectWithPolygon(x1, y1, x2, y2, polygon) {
      let ret = null;
      polygon.forEach((xy, index, polygon) => {
        if (ret) return;
        if (index + 1 >= polygon.length) {
          return;
        }
        const x3 = xy[0];
        const y3 = xy[1];
        const x4 = polygon[index + 1][0];
        const y4 = polygon[index + 1][1];
        ret = MathUtils.intersect(x1, y1, x2, y2, x3, y3, x4, y4);
      });
      return ret;
    }

    /**
      * Returns the given value if the value is >=lower or <= upper. Otherwise returns the boundary value.
      * @param value the value to be clamped
      * @param lower lowest boundary value
      * @param upper highest boundary value
      */
    static clamp(value, lower, upper) {
      return Math.min(Math.max(value, lower), upper);
    }

    /**
      * Returns a value rounded to the given number of decimal precission.
      * @param value
      * @param decimalPrecision
      */
    static round(value, decimalPrecision) {
      const shift = 10 ** decimalPrecision;
      return Math.round((value + Number.EPSILON) * shift) / shift;
    }
  }
  _defineProperty(MathUtils, "DEGREES_TO_RADIANS", Math.PI / 180);
  _defineProperty(MathUtils, "RADIANS_TO_DEGREES", 180 / Math.PI);
  _defineProperty(MathUtils, "optiPow10", []);

  let Arinc429SignStatusMatrix = /*#__PURE__*/function (Arinc429SignStatusMatrix) {
    Arinc429SignStatusMatrix[Arinc429SignStatusMatrix["FailureWarning"] = 0] = "FailureWarning";
    Arinc429SignStatusMatrix[Arinc429SignStatusMatrix["NoComputedData"] = 1] = "NoComputedData";
    Arinc429SignStatusMatrix[Arinc429SignStatusMatrix["FunctionalTest"] = 2] = "FunctionalTest";
    Arinc429SignStatusMatrix[Arinc429SignStatusMatrix["NormalOperation"] = 3] = "NormalOperation";
    return Arinc429SignStatusMatrix;
  }({});
  class Arinc429Word {
    constructor(word) {
      _defineProperty(this, "ssm", void 0);
      _defineProperty(this, "value", void 0);
      Arinc429Word.u32View[0] = (word & 0xffffffff) >>> 0;
      this.ssm = Math.trunc(word / 2 ** 32) & 0b11;
      this.value = Arinc429Word.f32View[0];
    }
    static empty() {
      return new Arinc429Word(0);
    }
    static fromSimVarValue(name) {
      return new Arinc429Word(SimVar.GetSimVarValue(name, 'number'));
    }
    static async toSimVarValue(name, value, ssm) {
      Arinc429Word.f32View[0] = value;
      const simVal = Arinc429Word.u32View[0] + Math.trunc(ssm) * 2 ** 32;
      return SimVar.SetSimVarValue(name, 'string', simVal.toString());
    }
    isFailureWarning() {
      return this.ssm === Arinc429SignStatusMatrix.FailureWarning;
    }
    isNoComputedData() {
      return this.ssm === Arinc429SignStatusMatrix.NoComputedData;
    }
    isFunctionalTest() {
      return this.ssm === Arinc429SignStatusMatrix.FunctionalTest;
    }
    isNormalOperation() {
      return this.ssm === Arinc429SignStatusMatrix.NormalOperation;
    }

    /**
     * Returns the value when normal operation, the supplied default value otherwise.
     */
    valueOr(defaultValue) {
      return this.isNormalOperation() ? this.value : defaultValue;
    }
    getBitValue(bit) {
      return (this.value >> bit - 1 & 1) !== 0;
    }
    getBitValueOr(bit, defaultValue) {
      return this.isNormalOperation() ? (this.value >> bit - 1 & 1) !== 0 : defaultValue;
    }
    setBitValue(bit, value) {
      if (value) {
        this.value |= 1 << bit - 1;
      } else {
        this.value &= ~(1 << bit - 1);
      }
    }
  }
  _defineProperty(Arinc429Word, "u32View", new Uint32Array(1));
  _defineProperty(Arinc429Word, "f32View", new Float32Array(Arinc429Word.u32View.buffer));

  class LocalSimVar {
    constructor(simvar, unit) {
      this.simvar = simvar;
      this.unit = unit;
      _defineProperty(this, "localVar", void 0);
      this.localVar = SimVar.GetSimVarValue(this.simvar, this.unit);
    }
    setVar(value) {
      // Assume we are the only setter
      if (this.localVar !== value) {
        this.localVar = value;
        SimVar.SetSimVarValue(this.simvar, this.unit, +value);
      }
    }
    getVar() {
      return this.localVar;
    }
  }

  /**
   * Allows interacting with the persistent storage
   */
  class NXDataStore {
    static get listener() {
      if (this.mListener === undefined) {
        this.mListener = RegisterViewListener('JS_LISTENER_SIMVARS', null, true);
      }
      return this.mListener;
    }

    /**
     * Reads a value from persistent storage
     * @param key The property key
     * @param defaultVal The default value if the property is not set
     */

    static get(key, defaultVal) {
      const val = GetStoredData("A32NX_".concat(key));
      // GetStoredData returns null on error, or empty string for keys that don't exist (why isn't that an error??)
      // We could use SearchStoredData, but that spams the console with every key (somebody left their debug print in)
      if (val === null || val.length === 0) {
        return defaultVal;
      }
      return val;
    }

    /**
     * Sets a value in persistent storage
     *
     * @param key The property key
     * @param val The value to assign to the property
     */
    static set(key, val) {
      SetStoredData("A32NX_".concat(key), val);
      this.listener.triggerToAllSubscribers('A32NX_NXDATASTORE_UPDATE', key, val);
    }
    static subscribe(key, callback) {
      return Coherent.on('A32NX_NXDATASTORE_UPDATE', (updatedKey, value) => {
        if (key === '*' || key === updatedKey) {
          callback(updatedKey, value);
        }
      }).clear;
    }
    static getAndSubscribe(key, callback, defaultVal) {
      callback(key, NXDataStore.get(key, defaultVal));
      return NXDataStore.subscribe(key, callback);
    }
  }
  _defineProperty(NXDataStore, "mListener", void 0);

  class GenericDataListenerSync {
    constructor(recvEventCb, topic) {
      _defineProperty(this, "dataPackageQueue", void 0);
      _defineProperty(this, "topic", void 0);
      _defineProperty(this, "isRunning", void 0);
      _defineProperty(this, "listener", void 0);
      _defineProperty(this, "lastEventSynced", -1);
      _defineProperty(this, "recvEventCb", void 0);
      this.topic = topic;
      this.dataPackageQueue = [];
      this.isRunning = true;
      this.recvEventCb = recvEventCb;
      this.listener = RegisterGenericDataListener(() => {
        this.listener.onDataReceived(GenericDataListenerSync.EB_LISTENER_KEY, data => {
          this.processEventsReceived(data);
        });
      });
      const sendFn = () => {
        if (this.dataPackageQueue.length > 0) {
          const syncDataPackage = {
            packagedId: Math.floor(Math.random() * 1000000000),
            data: this.dataPackageQueue
          };
          this.listener.send(GenericDataListenerSync.EB_LISTENER_KEY, syncDataPackage);
          this.dataPackageQueue.length = 0;
        }
        if (this.isRunning) {
          requestAnimationFrame(sendFn);
        }
      };
      requestAnimationFrame(sendFn);
    }
    stop() {
      this.isRunning = false;
    }

    /**
     * Processes events received from onInteractionEvent and executes the configured callback.
     * @param target always empty
     * @param args SyncDataPackage
     */
    processEventsReceived(syncPackage) {
      const syncDataPackage = syncPackage;
      if (syncDataPackage.packagedId !== this.lastEventSynced) {
        this.lastEventSynced = syncDataPackage.packagedId;
        syncDataPackage.data.forEach(data => {
          if (data.topic === this.topic) {
            try {
              this.recvEventCb(data.topic, data.data !== undefined ? data.data : undefined);
            } catch (e) {
              console.error(e);
              if (e instanceof Error) {
                console.error(e.stack);
              }
            }
          }
        });
      }
    }

    /**
     * Sends an event via flow events.
     * @param topic The topic to send data on.
     * @param data The data to send.
     */
    sendEvent(topic, data) {
      const dataObj = data;
      const dataPackage = {
        topic,
        data: dataObj
      };
      this.dataPackageQueue.push(dataPackage);
    }
    receiveEvent() {
      // noop
    }
  }
  _defineProperty(GenericDataListenerSync, "EB_LISTENER_KEY", 'EB_EVENTS');

  /* eslint-disable camelcase */
  const REFRESH_RATE = 1000; // Time between refreshes in ms
  const TRACKING_MAX = 40; // # max contacts tracked - AMM 34-43-00:6a
  const DISPLAY_MAX = 8; // # max contacts tracked - usually configurable by PIN program
  const MEMORY_MAX = 200; // Max history before culling
  const MIN_VS = -6000;
  const MAX_VS = 6000;
  const INHIBIT_CLB_RA = 39000; // for all climb RA's
  const INHIBIT_INC_DES_RA_AGL = 1450; // for increase descent RA's
  const INHIBIT_ALL_DES_RA_AGL = 1200; // 1200 takeoff, 1000 approach
  const INHIBIT_ALL_RA = 1000; // 1100 in climb, 900 in descent
  const REALLY_BIG_NUMBER = 1000000;
  const INITIAL_DELAY = 5; // in seconds
  const FOLLOWUP_DELAY = 2.5; // in deconds
  const INITIAL_ACCEL = 8.04; // 0.25G in f/s^2
  const FOLLOWUP_ACCEL = 10.62; // 0.33G in f/s^2
  const TA_EXPIRATION_DELAY = 4; // in seconds
  const MIN_RA_DURATION = 5; // in seconds
  const VOL_BOOST = 1.25; // multiplier
  const CLOSURE_RATE_THRESH = -40; // in knots

  let TcasThreat = /*#__PURE__*/function (TcasThreat) {
    TcasThreat[TcasThreat["THREAT"] = 0] = "THREAT";
    TcasThreat[TcasThreat["ALL"] = 1] = "ALL";
    TcasThreat[TcasThreat["ABOVE"] = 2] = "ABOVE";
    TcasThreat[TcasThreat["BELOW"] = 3] = "BELOW";
    return TcasThreat;
  }({});
  let TcasState = /*#__PURE__*/function (TcasState) {
    TcasState[TcasState["NONE"] = 0] = "NONE";
    TcasState[TcasState["TA"] = 1] = "TA";
    TcasState[TcasState["RA"] = 2] = "RA";
    return TcasState;
  }({});
  let TcasMode = /*#__PURE__*/function (TcasMode) {
    TcasMode[TcasMode["STBY"] = 0] = "STBY";
    TcasMode[TcasMode["TA"] = 1] = "TA";
    TcasMode[TcasMode["TARA"] = 2] = "TARA";
    return TcasMode;
  }({});
  let XpdrMode = /*#__PURE__*/function (XpdrMode) {
    XpdrMode[XpdrMode["STBY"] = 1] = "STBY";
    XpdrMode[XpdrMode["ON"] = 3] = "ON";
    XpdrMode[XpdrMode["ALT"] = 4] = "ALT";
    return XpdrMode;
  }({});
  let TaRaIndex = /*#__PURE__*/function (TaRaIndex) {
    TaRaIndex[TaRaIndex["TA"] = 0] = "TA";
    TaRaIndex[TaRaIndex["RA"] = 1] = "RA";
    return TaRaIndex;
  }({});
  let TaRaIntrusion = /*#__PURE__*/function (TaRaIntrusion) {
    TaRaIntrusion[TaRaIntrusion["TRAFFIC"] = 0] = "TRAFFIC";
    TaRaIntrusion[TaRaIntrusion["PROXIMITY"] = 1] = "PROXIMITY";
    TaRaIntrusion[TaRaIntrusion["TA"] = 2] = "TA";
    TaRaIntrusion[TaRaIntrusion["RA"] = 3] = "RA";
    return TaRaIntrusion;
  }({});
  let RaSense = /*#__PURE__*/function (RaSense) {
    RaSense[RaSense["UP"] = 0] = "UP";
    RaSense[RaSense["DOWN"] = 1] = "DOWN";
    return RaSense;
  }({});
  let RaType = /*#__PURE__*/function (RaType) {
    RaType[RaType["CORRECT"] = 0] = "CORRECT";
    RaType[RaType["PREVENT"] = 1] = "PREVENT";
    return RaType;
  }({});
  let Limits = /*#__PURE__*/function (Limits) {
    Limits[Limits["MIN"] = 0] = "MIN";
    Limits[Limits["MAX"] = 1] = "MAX";
    return Limits;
  }({});
  let Inhibit = /*#__PURE__*/function (Inhibit) {
    Inhibit[Inhibit["NONE"] = 0] = "NONE";
    Inhibit[Inhibit["ALL_RA_AURAL_TA"] = 1] = "ALL_RA_AURAL_TA";
    Inhibit[Inhibit["ALL_RA"] = 2] = "ALL_RA";
    Inhibit[Inhibit["ALL_CLIMB_RA"] = 3] = "ALL_CLIMB_RA";
    Inhibit[Inhibit["ALL_DESC_RA"] = 4] = "ALL_DESC_RA";
    Inhibit[Inhibit["ALL_INCR_DESC_RA"] = 5] = "ALL_INCR_DESC_RA";
    return Inhibit;
  }({});
  const THREAT = {
    [TcasThreat.THREAT]: [-2700, 2700],
    [TcasThreat.ALL]: [-2700, 2700],
    [TcasThreat.ABOVE]: [-2700, 9900],
    [TcasThreat.BELOW]: [-9900, 2700]
  };

  // Altitude -> Sensitivity
  const SENSE = {
    3: [1000, 2350],
    4: [2350, 5000],
    5: [5000, 10000],
    6: [10000, 20000],
    7: [20000, 47000]
  };

  // TCAS Range Limit
  const RANGE = {
    // 34-43-00 6:2339
    forward: [60, 100],
    // 60-100 Nm Forwards
    side: 30,
    // 30 Nm side
    back: 20,
    // 20Nm behind
    alt: 9900
  };

  // Sensitivity to TAU limit
  const TAU = {
    1: [-1, -1],
    2: [20, -1],
    3: [25, 15],
    4: [30, 20],
    5: [40, 25],
    6: [45, 30],
    7: [48, 35],
    8: [48, 35]
  };

  // Incremental Range Protection Volume
  const DMOD = {
    1: [-1, -1],
    2: [0.3, -1],
    3: [0.33, 0.2],
    4: [0.48, 0.35],
    5: [0.75, 0.55],
    6: [1, 0.8],
    7: [1.3, 1.1],
    8: [1.3, 1.1]
  };

  // Detection Alt Threshold
  const ZTHR = {
    1: [-1, -1],
    2: [850, -1],
    3: [850, 300],
    4: [850, 300],
    5: [850, 350],
    6: [850, 400],
    7: [850, 600],
    8: [1200, 700]
  };

  // Time Variable Alt Tau Threshold
  const TVTHR = {
    1: -1,
    2: -1,
    3: 15,
    4: 18,
    5: 20,
    6: 22,
    7: 25,
    8: 25
  };

  // Positive Advisory Altitude Threshold
  const ALIM = {
    1: -1,
    2: -1,
    3: 300,
    4: 300,
    5: 350,
    6: 400,
    7: 600,
    8: 700
  };

  // Limit closure acceleration (workaround/unrealistic)
  // TODO FIXME: Replace with HMD accel filter?
  const ACCEL = {
    1: [900, 900],
    2: [1000, 1000],
    3: [1100, 1200],
    4: [1200, 1300],
    5: [1300, 1400],
    6: [2000, 2200],
    7: [2100, 2300],
    8: [2200, 2500]
  };

  // many lengths are approximate until we can get them accuratly (when boris re-makes them and we have the sources)
  const SOUNDS = {
    pull_up: {
      name: 'aural_pullup_new',
      length: 0.9
    },
    sink_rate: {
      name: 'aural_sink_rate_new',
      length: 0.9
    },
    dont_sink: {
      name: 'aural_dontsink_new',
      length: 0.9
    },
    too_low_gear: {
      name: 'aural_too_low_gear',
      length: 0.8
    },
    too_low_flaps: {
      name: 'aural_too_low_flaps',
      length: 0.8
    },
    too_low_terrain: {
      name: 'aural_too_low_terrain',
      length: 0.9
    },
    minimums: {
      name: 'aural_minimumnew',
      length: 0.67
    },
    hundred_above: {
      name: 'aural_100above',
      length: 0.72
    },
    retard: {
      name: 'new_retard',
      length: 0.9
    },
    alt_2500: {
      name: 'new_2500',
      length: 1.1
    },
    alt_1000: {
      name: 'new_1000',
      length: 0.9
    },
    alt_500: {
      name: 'new_500',
      length: 0.6
    },
    alt_400: {
      name: 'new_400',
      length: 0.6
    },
    alt_300: {
      name: 'new_300',
      length: 0.6
    },
    alt_200: {
      name: 'new_200',
      length: 0.6
    },
    alt_100: {
      name: 'new_100',
      length: 0.6
    },
    alt_50: {
      name: 'new_50',
      length: 0.4
    },
    alt_40: {
      name: 'new_40',
      length: 0.4
    },
    alt_30: {
      name: 'new_30',
      length: 0.4
    },
    alt_20: {
      name: 'new_20',
      length: 0.4
    },
    alt_10: {
      name: 'new_10',
      length: 0.3
    },
    alt_5: {
      name: 'new_5',
      length: 0.3
    },
    climb_climb: {
      name: 'climb_climb',
      length: 1.6
    },
    climb_crossing_climb: {
      name: 'climb_crossing_climb',
      length: 1.7
    },
    increase_climb: {
      name: 'increase_climb',
      length: 1.2
    },
    climb_climb_now: {
      name: 'climb_climb_now',
      length: 1.9
    },
    clear_of_conflict: {
      name: 'clear_of_conflict',
      length: 1.5
    },
    descend_descend: {
      name: 'descend_descend',
      length: 2.1
    },
    descend_crossing_descend: {
      name: 'descend_crossing_descend',
      length: 1.9
    },
    increase_descent: {
      name: 'increase_descent',
      length: 1.3
    },
    descend_descend_now: {
      name: 'descend_descend_now',
      length: 2.2
    },
    monitor_vs: {
      name: 'monitor_vs',
      length: 1.7
    },
    maint_vs_maint: {
      name: 'maint_vs_maint',
      length: 3.2
    },
    maint_vs_crossing_maint: {
      name: 'maint_vs_crossing_maint',
      length: 3.2
    },
    level_off_level_off: {
      name: 'level_off_level_off',
      length: 2.3
    },
    traffic_traffic: {
      name: 'traffic_traffic',
      length: 1.5
    }
  };
  const CALLOUTS = {
    climb: {
      id: 0,
      repeat: false,
      sound: SOUNDS.climb_climb
    },
    climb_cross: {
      id: 1,
      repeat: true,
      sound: SOUNDS.climb_crossing_climb
    },
    climb_increase: {
      id: 2,
      repeat: true,
      sound: SOUNDS.increase_climb
    },
    climb_now: {
      id: 3,
      repeat: true,
      sound: SOUNDS.climb_climb_now
    },
    clear_of_conflict: {
      id: 4,
      repeat: false,
      sound: SOUNDS.clear_of_conflict
    },
    descend: {
      id: 5,
      repeat: false,
      sound: SOUNDS.descend_descend
    },
    descend_cross: {
      id: 6,
      repeat: true,
      sound: SOUNDS.descend_crossing_descend
    },
    descend_increase: {
      id: 7,
      repeat: true,
      sound: SOUNDS.increase_descent
    },
    descend_now: {
      id: 8,
      repeat: true,
      sound: SOUNDS.descend_descend_now
    },
    monitor_vs: {
      id: 9,
      repeat: false,
      sound: SOUNDS.monitor_vs
    },
    maintain_vs: {
      id: 10,
      repeat: false,
      sound: SOUNDS.maint_vs_maint
    },
    maintain_vs_cross: {
      id: 11,
      repeat: false,
      sound: SOUNDS.maint_vs_crossing_maint
    },
    level_off: {
      id: 12,
      repeat: false,
      sound: SOUNDS.level_off_level_off
    },
    traffic: {
      id: 13,
      repeat: false,
      sound: SOUNDS.traffic_traffic
    }
  };
  const RA_VARIANTS = {
    // PREVENTIVE RA's
    monitor_vs_climb_0: {
      callout: CALLOUTS.monitor_vs,
      sense: RaSense.UP,
      type: RaType.PREVENT,
      vs: {
        green: [0, MAX_VS],
        red: [MIN_VS, 0]
      }
    },
    monitor_vs_climb_500: {
      callout: CALLOUTS.monitor_vs,
      sense: RaSense.UP,
      type: RaType.PREVENT,
      vs: {
        green: [-500, MAX_VS],
        red: [MIN_VS, -500]
      }
    },
    monitor_vs_climb_1000: {
      callout: CALLOUTS.monitor_vs,
      sense: RaSense.UP,
      type: RaType.PREVENT,
      vs: {
        green: [-1000, MAX_VS],
        red: [MIN_VS, -1000]
      }
    },
    monitor_vs_climb_2000: {
      callout: CALLOUTS.monitor_vs,
      sense: RaSense.UP,
      type: RaType.PREVENT,
      vs: {
        green: [-2000, MAX_VS],
        red: [MIN_VS, -2000]
      }
    },
    monitor_vs_descend_0: {
      callout: CALLOUTS.monitor_vs,
      sense: RaSense.DOWN,
      type: RaType.PREVENT,
      vs: {
        green: [MIN_VS, 0],
        red: [0, MAX_VS]
      }
    },
    monitor_vs_descend_500: {
      callout: CALLOUTS.monitor_vs,
      sense: RaSense.DOWN,
      type: RaType.PREVENT,
      vs: {
        green: [MIN_VS, 500],
        red: [500, MAX_VS]
      }
    },
    monitor_vs_descend_1000: {
      callout: CALLOUTS.monitor_vs,
      sense: RaSense.DOWN,
      type: RaType.PREVENT,
      vs: {
        green: [MIN_VS, 1000],
        red: [1000, MAX_VS]
      }
    },
    monitor_vs_descend_2000: {
      callout: CALLOUTS.monitor_vs,
      sense: RaSense.DOWN,
      type: RaType.PREVENT,
      vs: {
        green: [MIN_VS, 2000],
        red: [2000, MAX_VS]
      }
    },
    // CORRECTIVE RA's
    // CLIMB
    climb: {
      callout: CALLOUTS.climb,
      sense: RaSense.UP,
      type: RaType.CORRECT,
      vs: {
        green: [1500, 2000],
        red: [MIN_VS, 1500]
      }
    },
    climb_cross: {
      callout: CALLOUTS.climb_cross,
      sense: RaSense.UP,
      type: RaType.CORRECT,
      vs: {
        green: [1500, 2000],
        red: [MIN_VS, 1500]
      }
    },
    climb_increase: {
      callout: CALLOUTS.climb_increase,
      sense: RaSense.UP,
      type: RaType.CORRECT,
      vs: {
        green: [2500, 4400],
        red: [MIN_VS, 2500]
      }
    },
    climb_now: {
      callout: CALLOUTS.climb_now,
      sense: RaSense.UP,
      type: RaType.CORRECT,
      vs: {
        green: [1500, 2000],
        red: [MIN_VS, 1500]
      }
    },
    // CORRECTIVE RA's
    // DESCEND
    descend: {
      callout: CALLOUTS.descend,
      sense: RaSense.DOWN,
      type: RaType.CORRECT,
      vs: {
        green: [-2000, -1500],
        red: [-1500, MAX_VS]
      }
    },
    descend_cross: {
      callout: CALLOUTS.descend_cross,
      sense: RaSense.DOWN,
      type: RaType.CORRECT,
      vs: {
        green: [-2000, -1500],
        red: [-1500, MAX_VS]
      }
    },
    descend_increase: {
      callout: CALLOUTS.descend_increase,
      sense: RaSense.DOWN,
      type: RaType.CORRECT,
      vs: {
        green: [-4400, -2500],
        red: [-2500, MAX_VS]
      }
    },
    descend_now: {
      callout: CALLOUTS.descend_now,
      sense: RaSense.DOWN,
      type: RaType.CORRECT,
      vs: {
        green: [-2000, -1500],
        red: [-1500, MAX_VS]
      }
    },
    // CORRECTIVE RA's
    // LEVEL OFF
    // level_off_250_both: {
    //     // Currently not used
    //     // Will be used when support for multi-threat RA's,
    //     // from both above and below, will be added
    //     callout: CALLOUTS.level_off,
    //     sense: RaSense.UP,
    //     type: RaType.CORRECT,
    //     vs: {
    //         green: [-250, 250],
    //         red: [
    //             [MIN_VS, -250],
    //             [250, MAX_VS]
    //         ]
    //     }
    // },
    level_off_300_below: {
      callout: CALLOUTS.level_off,
      sense: RaSense.DOWN,
      type: RaType.CORRECT,
      vs: {
        green: [-400, 0],
        red: [0, MAX_VS]
      }
    },
    level_off_300_above: {
      callout: CALLOUTS.level_off,
      sense: RaSense.UP,
      type: RaType.CORRECT,
      vs: {
        green: [0, 400],
        red: [MIN_VS, 0]
      }
    },
    // CORRECTIVE RA's
    // MAINTAIN VS, CLIMB
    climb_maintain_vs: {
      callout: CALLOUTS.maintain_vs,
      sense: RaSense.UP,
      type: RaType.CORRECT,
      vs: {
        green: [1500, 4400],
        red: [MIN_VS, 1500]
      }
    },
    climb_maintain_vs_crossing: {
      callout: CALLOUTS.maintain_vs,
      sense: RaSense.UP,
      type: RaType.CORRECT,
      vs: {
        green: [1500, 4400],
        red: [MIN_VS, 1500]
      }
    },
    // CORRECTIVE RA's
    // MAINTAIN VS, DESCEND
    descend_maintain_vs: {
      callout: CALLOUTS.maintain_vs,
      sense: RaSense.DOWN,
      type: RaType.CORRECT,
      vs: {
        green: [-4400, -1500],
        red: [-1500, MAX_VS]
      }
    },
    descend_maintain_vs_crossing: {
      callout: CALLOUTS.maintain_vs,
      sense: RaSense.DOWN,
      type: RaType.CORRECT,
      vs: {
        green: [-4400, -1500],
        red: [-1500, MAX_VS]
      }
    }
  };
  const TCAS_CONST = {
    REFRESH_RATE,
    TRACKING_MAX,
    DISPLAY_MAX,
    MEMORY_MAX,
    MIN_VS,
    INHIBIT_CLB_RA,
    // for all climb RA's
    INHIBIT_INC_DES_RA_AGL,
    // for increase descent RA's
    INHIBIT_ALL_DES_RA_AGL,
    // 1200 takeoff, 1000 approach
    INHIBIT_ALL_RA,
    // 1100 in climb, 900 in descent
    REALLY_BIG_NUMBER,
    INITIAL_DELAY,
    // in seconds
    FOLLOWUP_DELAY,
    // in deconds
    INITIAL_ACCEL,
    // 0.25G in f/s^2
    FOLLOWUP_ACCEL,
    // 0.33G in f/s^2
    TA_EXPIRATION_DELAY,
    // in seconds
    MIN_RA_DURATION,
    // in seconds
    VOL_BOOST,
    // multiplier
    CLOSURE_RATE_THRESH,
    // in knots
    THREAT,
    SENSE,
    RANGE,
    TAU,
    DMOD,
    ZTHR,
    TVTHR,
    ALIM,
    ACCEL,
    SOUNDS,
    CALLOUTS,
    RA_VARIANTS
  };

  /* eslint-disable no-underscore-dangle */

  // TODO: Turn into abstract SoundManager singleton for all .ts components

  class PeriodicSound {
    constructor(sound, period) {
      this.sound = sound;
      this.period = period;
      _defineProperty(this, "timeSinceLastPlayed", void 0);
      this.timeSinceLastPlayed = NaN;
    }
  }
  class TcasSoundManager {
    static get instance() {
      if (!this._instance) {
        this._instance = new TcasSoundManager();
      }
      return this._instance;
    }
    constructor() {
      _defineProperty(this, "periodicList", void 0);
      _defineProperty(this, "soundQueue", void 0);
      _defineProperty(this, "playingSound", void 0);
      _defineProperty(this, "playingSoundRemaining", void 0);
      this.periodicList = [];
      this.soundQueue = [];
      this.playingSound = null;
      this.playingSoundRemaining = NaN;
    }
    init() {
      // do nothing
    }
    update(deltaTime) {
      if (this.playingSoundRemaining <= 0) {
        this.playingSound = null;
        this.playingSoundRemaining = NaN;
      } else if (this.playingSoundRemaining > 0) {
        this.playingSoundRemaining -= deltaTime / 1000;
      }
      if (this.playingSound === null && this.soundQueue.length > 0) {
        const _sound = this.soundQueue.shift();
        this.tryPlaySound(_sound);
      }
      this.periodicList.forEach(element => {
        if (Number.isNaN(element.timeSinceLastPlayed) || element.timeSinceLastPlayed >= element.period) {
          if (this.tryPlaySound(element.sound)) {
            element.timeSinceLastPlayed = 0;
          }
        } else {
          element.timeSinceLastPlayed += deltaTime / 1000;
        }
      });
    }
    addPeriodicSound(sound) {
      let period = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : NaN;
      if (!sound) {
        return;
      }
      let useLengthForPeriod = false;
      if (period < sound.length) {
        console.error("TcasSoundManager ERROR: Sound period can't be smaller than sound length. Using sound length instead.");
        useLengthForPeriod = true;
      }
      let found = false;
      this.periodicList.forEach(element => {
        if (element.sound.name === sound.name) {
          found = true;
        }
      });
      if (!found) {
        this.periodicList.push(new PeriodicSound(sound, useLengthForPeriod ? sound.length : period));
      }
    }
    removePeriodicSound(sound) {
      if (!sound) {
        return;
      }
      for (let i = 0; i < this.periodicList.length; i++) {
        if (this.periodicList[i].sound.name === sound.name) {
          this.periodicList.splice(i, 1);
        }
      }
    }
    tryPlaySound(sound) {
      let retry = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      let repeatOnce = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      if (this.playingSound === null) {
        this.playingSound = sound;
        this.playingSoundRemaining = sound.length;
        console.log('SOUND: playing ', sound);
        Coherent.call('PLAY_INSTRUMENT_SOUND', sound.name).catch(console.error);
        if (repeatOnce) {
          this.soundQueue.push(sound);
        }
        return true;
      }
      if (retry) {
        this.soundQueue.push(sound);
        if (repeatOnce) {
          this.soundQueue.push(sound);
        }
        return false;
      }
      return false;
    }
    isPlayingSound() {
      return this.playingSound === null;
    }
  }
  _defineProperty(TcasSoundManager, "_instance", void 0);

  class NDTcasTraffic {
    constructor(traffic) {
      _defineProperty(this, "ID", void 0);
      _defineProperty(this, "lat", void 0);
      _defineProperty(this, "lon", void 0);
      _defineProperty(this, "relativeAlt", void 0);
      _defineProperty(this, "intrusionLevel", void 0);
      _defineProperty(this, "vertSpeed", void 0);
      _defineProperty(this, "bitfield", void 0);
      this.ID = traffic.ID;
      this.lat = traffic.lat;
      this.lon = traffic.lon;
      this.relativeAlt = Math.round(traffic.relativeAlt / 100);
      this.intrusionLevel = traffic.intrusionLevel;
      this.vertSpeed = traffic.vertSpeed;
    }
  }
  class NDTcasDebugTraffic extends NDTcasTraffic {
    constructor(traffic) {
      super(traffic);
      _defineProperty(this, "seen", void 0);
      _defineProperty(this, "hidden", void 0);
      _defineProperty(this, "raTau", void 0);
      _defineProperty(this, "taTau", void 0);
      _defineProperty(this, "vTau", void 0);
      _defineProperty(this, "closureRate", void 0);
      _defineProperty(this, "closureAccel", void 0);
      this.seen = traffic.seen;
      this.hidden = false;
      this.raTau = traffic.raTau;
      this.taTau = traffic.taTau;
      this.vTau = traffic.vTau;
      this.closureRate = traffic.closureRate;
      this.closureAccel = traffic.closureAccel;
    }
  }
  class TcasTraffic {
    constructor(tf, ppos, alt) {
      _defineProperty(this, "alive", void 0);
      _defineProperty(this, "ID", void 0);
      _defineProperty(this, "seen", void 0);
      _defineProperty(this, "lat", void 0);
      _defineProperty(this, "lon", void 0);
      _defineProperty(this, "alt", void 0);
      _defineProperty(this, "vertSpeed", void 0);
      _defineProperty(this, "onGround", void 0);
      _defineProperty(this, "groundSpeed", void 0);
      _defineProperty(this, "heading", void 0);
      _defineProperty(this, "relativeAlt", void 0);
      _defineProperty(this, "slantDistance", void 0);
      _defineProperty(this, "hrzDistance", void 0);
      _defineProperty(this, "closureRate", void 0);
      _defineProperty(this, "closureAccel", void 0);
      _defineProperty(this, "intrusionLevel", void 0);
      _defineProperty(this, "isDisplayed", void 0);
      _defineProperty(this, "taTau", void 0);
      _defineProperty(this, "raTau", void 0);
      _defineProperty(this, "vTau", void 0);
      _defineProperty(this, "secondsSinceLastTa", void 0);
      this.alive = true;
      this.seen = 0;
      this.ID = tf.uId.toFixed(0); // 7 Digit = NPC; 20 digit = player
      this.lat = tf.lat;
      this.lon = tf.lon;
      this.alt = tf.alt * 3.281;
      this.relativeAlt = tf.alt * 3.281 - alt;
      this.heading = tf.heading;
      this.slantDistance = MathUtils.computeDistance3D(tf.lat, tf.lon, tf.alt * 3.281, ppos.lat, ppos.long, alt);
      this.hrzDistance = MathUtils.computeGreatCircleDistance(ppos.lat, ppos.long, tf.lat, tf.lon);
      this.groundSpeed = 0;
      this.isDisplayed = false;
      this.vertSpeed = 0;
      this.closureRate = 0;
      this.intrusionLevel = TaRaIntrusion.TRAFFIC;
      this.taTau = Infinity;
      this.raTau = Infinity;
      this.vTau = Infinity;
      this.secondsSinceLastTa = 0;
    }
  }
  class ResAdvisory {
    constructor(info, isReversal, secondsSinceStart, hasBeenAnnounced) {
      this.info = info;
      this.isReversal = isReversal;
      this.secondsSinceStart = secondsSinceStart;
      this.hasBeenAnnounced = hasBeenAnnounced;
    }
  }

  /**
   * TCAS computer singleton
   */
  class TcasComputer {
    constructor() {
      // for debug
      _defineProperty(this, "recListener", RegisterViewListener('JS_LISTENER_MAPS', () => {
        this.recListener.trigger('JS_BIND_BINGMAP', 'nxMap', false);
      }));
      // bind to listener
      _defineProperty(this, "debug", void 0);
      // TCAS_DEBUG on/off
      _defineProperty(this, "syncer", new GenericDataListenerSync());
      _defineProperty(this, "updateThrottler", void 0);
      // Utility to restrict updates
      _defineProperty(this, "airTraffic", void 0);
      // Air Traffic List
      _defineProperty(this, "raTraffic", void 0);
      // Traffic with RA
      _defineProperty(this, "sendAirTraffic", void 0);
      // List of traffic intruder objects to send to ND
      _defineProperty(this, "activeXpdr", void 0);
      // Active XPDR
      _defineProperty(this, "xpdrStatus", void 0);
      // Active XPDR ON/OFF
      _defineProperty(this, "tcasPower", void 0);
      // is TCAS computer powered?
      _defineProperty(this, "tcasSwitchPos", void 0);
      // TCAS Switch position STBY/TA/TARA
      _defineProperty(this, "altRptgSwitchPos", void 0);
      // ATC Alt Reporting Switch Position
      _defineProperty(this, "tcasMode", void 0);
      // TCAS S/MODE TODO FIXME: ARINC429
      _defineProperty(this, "tcasThreat", void 0);
      // TCAS Threat Setting
      _defineProperty(this, "tcasState", void 0);
      // TCAS Advisory State (None/TA/RA)
      _defineProperty(this, "taOnly", void 0);
      // Issuing TA Only message (yes/no) TODO FIXME: ARINC429
      _defineProperty(this, "tcasFault", void 0);
      // Issuing TCAS fault message (yes/no) TODO FIXME: ARINC429
      _defineProperty(this, "correctiveRa", void 0);
      // Is currently issuing a corrective RA (yes/no) TODO FIXME: ARINC429
      _defineProperty(this, "auralAdvisoryOutput", void 0);
      // Is currently playing an aural advisory (Discrete)
      _defineProperty(this, "isSlewActive", void 0);
      // Slew Mode on?
      _defineProperty(this, "simRate", void 0);
      // Simulation Rate
      _defineProperty(this, "ppos", void 0);
      // Plane PPOS
      _defineProperty(this, "baroCorrectedAltitude1", void 0);
      // ADR1/2 Altitude
      _defineProperty(this, "adr3BaroCorrectedAltitude1", void 0);
      // ADR3 Altitude
      _defineProperty(this, "pressureAlt", void 0);
      // Pressure Altitude
      _defineProperty(this, "planeAlt", void 0);
      // Plane Altitude
      _defineProperty(this, "radioAlt", void 0);
      // Radio Altitude
      _defineProperty(this, "verticalSpeed", void 0);
      // Vertical Speed
      _defineProperty(this, "trueHeading", void 0);
      // True heading
      _defineProperty(this, "sensitivity", void 0);
      _defineProperty(this, "activeRa", void 0);
      // Currently Active RA
      _defineProperty(this, "_newRa", void 0);
      // avoiding GC
      _defineProperty(this, "inhibitions", void 0);
      // current inhibition mode
      _defineProperty(this, "advisoryState", void 0);
      // Overall TCAS state for callout latching (None, TA, or RA)
      _defineProperty(this, "soundManager", void 0);
      // Sound manager singleton
      _defineProperty(this, "gpwsWarning", void 0);
    }
    // GPWS warning on/off

    static get instance() {
      // for debug
      if (!this._instance) {
        this._instance = new TcasComputer();
      }
      return this._instance;
    }

    /**
     * Initialise TCAS singleton
     */
    init() {
      SimVar.SetSimVarValue('L:A32NX_TCAS_STATE', 'Enum', 0);
      this.debug = false;
      NXDataStore.set('TCAS_DEBUG', '0'); // force debug off
      this.tcasPower = false;
      this.tcasMode = new LocalSimVar('L:A32NX_TCAS_MODE', 'Enum');
      this.tcasState = new LocalSimVar('L:A32NX_TCAS_STATE', 'Enum');
      this.tcasFault = new LocalSimVar('L:A32NX_TCAS_FAULT', 'bool');
      this.taOnly = new LocalSimVar('L:A32NX_TCAS_TA_ONLY', 'bool');
      this.correctiveRa = new LocalSimVar('L:A32NX_TCAS_RA_CORRECTIVE', 'bool');
      this.auralAdvisoryOutput = new LocalSimVar('L:A32NX_TCAS_AURAL_ADVISORY_OUTPUT', 'bool');
      this.airTraffic = [];
      this.raTraffic = [];
      this.sensitivity = new LocalSimVar('L:A32NX_TCAS_SENSITIVITY', 'number');
      this.sensitivity.setVar(1);
      this.updateThrottler = new UpdateThrottler(TCAS_CONST.REFRESH_RATE); // P5566074 pg 11:45
      this.inhibitions = Inhibit.NONE;
      this.ppos = {
        lat: NaN,
        long: NaN
      };
      this._newRa = new ResAdvisory(null, false, 0, false);
      this.advisoryState = TcasState.NONE;
      this.sendAirTraffic = [];
      this.activeRa = new ResAdvisory(null, false, 0, false);
      this.soundManager = new TcasSoundManager();
    }

    /**
     * Read from SimVars
     */
    updateVars() {
      // Note: these values are calculated/not used in the real TCAS computer, here we just read SimVars
      // this.debug = NXDataStore.get('TCAS_DEBUG', '0') !== '0';
      this.verticalSpeed = SimVar.GetSimVarValue('VERTICAL SPEED', 'feet per minute');
      this.ppos.lat = SimVar.GetSimVarValue('PLANE LATITUDE', 'degree latitude');
      this.ppos.long = SimVar.GetSimVarValue('PLANE LONGITUDE', 'degree longitude');
      this.tcasPower = !!SimVar.GetSimVarValue('A32NX_ELEC_DC_1_BUS_IS_POWERED', 'boolean');
      this.tcasSwitchPos = SimVar.GetSimVarValue('L:A32NX_SWITCH_TCAS_Position', 'number');
      this.altRptgSwitchPos = SimVar.GetSimVarValue('L:A32NX_SWITCH_ATC_ALT', 'number');
      this.tcasThreat = SimVar.GetSimVarValue('L:A32NX_SWITCH_TCAS_Traffic_Position', 'number');
      this.xpdrStatus = SimVar.GetSimVarValue('TRANSPONDER STATE:1', 'number');
      this.activeXpdr = SimVar.GetSimVarValue('L:A32NX_TRANSPONDER_SYSTEM', 'number');
      // workaround for altitude issues due to MSFS bug, needs to be changed to PRESSURE ALTITUDE again when solved
      this.pressureAlt = SimVar.GetSimVarValue('INDICATED ALTITUDE:3', 'feet');
      this.planeAlt = SimVar.GetSimVarValue('PLANE ALTITUDE', 'feet');
      const radioAlt1 = Arinc429Word.fromSimVarValue('L:A32NX_RA_1_RADIO_ALTITUDE');
      const radioAlt2 = Arinc429Word.fromSimVarValue('L:A32NX_RA_2_RADIO_ALTITUDE');
      this.radioAlt = (radioAlt1.isFailureWarning() || radioAlt1.isNoComputedData()) && !(!radioAlt1.isNoComputedData() && radioAlt2.isFailureWarning()) ? radioAlt2 : radioAlt1;
      this.baroCorrectedAltitude1 = Arinc429Word.fromSimVarValue("L:A32NX_ADIRS_ADR_".concat(this.activeXpdr + 1, "_BARO_CORRECTED_ALTITUDE_1"));
      this.adr3BaroCorrectedAltitude1 = Arinc429Word.fromSimVarValue('L:A32NX_ADIRS_ADR_3_BARO_CORRECTED_ALTITUDE_1');
      this.trueHeading = SimVar.GetSimVarValue('PLANE HEADING DEGREES TRUE', 'degrees');
      this.isSlewActive = !!SimVar.GetSimVarValue('IS SLEW ACTIVE', 'boolean');
      this.simRate = SimVar.GetGlobalVarValue('SIMULATION RATE', 'number');
      this.gpwsWarning = !!SimVar.GetSimVarValue('L:A32NX_GPWS_Warning_Active', 'boolean');
      this.tcasMode.setVar(this.xpdrStatus === XpdrMode.STBY || !this.tcasPower || !this.altRptgSwitchPos ? TcasMode.STBY : this.tcasSwitchPos); // 34-43-00:A32

      this.auralAdvisoryOutput.setVar(this.soundManager.isPlayingSound());
    }

    /**
     * TODO: Documentation & complete missing inhibitions
     */
    /**
     * Set inhibition level
     */
    updateInhibitions() {
      // TODO: Add more TA only conditions here (i.e GPWS active, Windshear warning active, stall)
      // TODO FIXME: Less magic numbers, Use constants defined in TcasConstants
      if (this.radioAlt.isFailureWarning() || !this.radioAlt.isNoComputedData() && this.radioAlt.value < 500 || this.gpwsWarning || this.tcasMode.getVar() === TcasMode.STBY) {
        this.inhibitions = Inhibit.ALL_RA_AURAL_TA;
      } else if (!this.radioAlt.isNoComputedData() && this.radioAlt.value < 1000 || this.tcasMode.getVar() === TcasMode.TA) {
        this.inhibitions = Inhibit.ALL_RA;
      } else if (!this.radioAlt.isNoComputedData() && this.radioAlt.value < 1100) {
        this.inhibitions = Inhibit.ALL_DESC_RA;
      } else if (!this.radioAlt.isNoComputedData() && this.radioAlt.value < 1550) {
        this.inhibitions = Inhibit.ALL_INCR_DESC_RA;
      } else if (this.pressureAlt > 39000) {
        this.inhibitions = Inhibit.ALL_CLIMB_RA;
      } else {
        this.inhibitions = Inhibit.NONE;
      }
    }

    /**
     * Set TCAS status
     */
    updateStatusFaults() {
      // If in STBY, inhibit all, set sens to 1, clear all existing RAs
      if (this.tcasMode.getVar() === TcasMode.STBY) {
        this.taOnly.setVar(false);
        this.tcasFault.setVar(false);
        this.sensitivity.setVar(1);
        this.activeRa.info = null;
        this.activeRa.isReversal = false;
        this.activeRa.secondsSinceStart = 0;
        this.activeRa.hasBeenAnnounced = false;
        this._newRa.info = null;
        this._newRa.isReversal = false;
        this._newRa.secondsSinceStart = 0;
        this._newRa.hasBeenAnnounced = false;
        return;
      }

      // Update "TA ONLY" message at the bottom of the ND
      if (this.inhibitions === Inhibit.ALL_RA || this.inhibitions === Inhibit.ALL_RA_AURAL_TA) {
        this.taOnly.setVar(true);
      } else {
        this.taOnly.setVar(false);
      }

      // Amber TCAS warning on fault (and on PFD) - 34-43-00:A24/34-43-010
      if (!this.baroCorrectedAltitude1 || !this.adr3BaroCorrectedAltitude1 || !this.baroCorrectedAltitude1.isNormalOperation() || !this.adr3BaroCorrectedAltitude1.isNormalOperation() || this.radioAlt.isFailureWarning() || this.baroCorrectedAltitude1.value - this.adr3BaroCorrectedAltitude1.value > 300 || !this.tcasPower) {
        this.tcasFault.setVar(true);
      } else {
        this.tcasFault.setVar(false);
      }

      // Update sensitivity
      if (this.activeRa.info === null) {
        if (this.inhibitions === Inhibit.ALL_RA || this.inhibitions === Inhibit.ALL_RA_AURAL_TA) {
          this.sensitivity.setVar(2);
        } else if (!this.radioAlt.isFailureWarning() && !this.radioAlt.isNoComputedData() && this.radioAlt.value > TCAS_CONST.SENSE[3][Limits.MIN] && this.radioAlt.value <= TCAS_CONST.SENSE[3][Limits.MAX]) {
          this.sensitivity.setVar(3);
        } else if (this.pressureAlt > TCAS_CONST.SENSE[4][Limits.MIN] && this.pressureAlt <= TCAS_CONST.SENSE[4][Limits.MAX]) {
          this.sensitivity.setVar(4);
        } else if (this.pressureAlt > TCAS_CONST.SENSE[5][Limits.MIN] && this.pressureAlt <= TCAS_CONST.SENSE[5][Limits.MAX]) {
          this.sensitivity.setVar(5);
        } else if (this.pressureAlt > TCAS_CONST.SENSE[6][Limits.MIN] && this.pressureAlt <= TCAS_CONST.SENSE[6][Limits.MAX]) {
          this.sensitivity.setVar(6);
        } else if (this.pressureAlt > TCAS_CONST.SENSE[7][Limits.MIN] && this.pressureAlt <= TCAS_CONST.SENSE[7][Limits.MAX]) {
          this.sensitivity.setVar(7);
        } else {
          this.sensitivity.setVar(8);
        }
      }
    }

    /**
     * Fetch traffic from MSFS traffic API
     * @param _deltaTime Deltatime of this frame
     */
    fetchRawTraffic(_deltaTime) {
      Coherent.call('GET_AIR_TRAFFIC').then(obj => {
        this.airTraffic.forEach(traffic => {
          traffic.alive = false;
        });
        obj.forEach(tf => {
          // Junk bad air traffic
          if (!tf.lat && !tf.lon && !tf.alt && !tf.heading) {
            if (this.debug) {
              console.log('Removing bugged traffic');
              console.log('====================================');
              console.log(" id | ".concat(tf.uId));
              console.log(" alt | ".concat(tf.alt * 3.281));
              console.log(" bearing | ".concat(MathUtils.computeGreatCircleHeading(this.ppos.lat, this.ppos.long, tf.lat, tf.lon)));
              console.log(" hDist | ".concat(MathUtils.computeGreatCircleDistance(this.ppos.lat, this.ppos.long, tf.lat, tf.lon)));
              console.log(' ================================ ');
            }
            return;
          }
          let traffic = this.airTraffic.find(p => p && p.ID === tf.uId.toFixed(0));
          if (!traffic) {
            traffic = new TcasTraffic(tf, this.ppos, this.planeAlt);
            this.airTraffic.push(traffic);
          }
          traffic.alive = true;
          traffic.seen = Math.min(traffic.seen + 1, 10);
          const newAlt = tf.alt * 3.281;
          traffic.vertSpeed = (newAlt - traffic.alt) / (_deltaTime / 1000) * 60; // feet per minute
          traffic.groundSpeed = Math.abs(MathUtils.computeGreatCircleDistance(tf.lat, tf.lon, traffic.lat, traffic.lon) / (_deltaTime / 1000) * 3600);
          const newSlantDist = MathUtils.computeDistance3D(traffic.lat, traffic.lon, traffic.alt, this.ppos.lat, this.ppos.long, this.pressureAlt);
          const newClosureRate = (traffic.slantDistance - newSlantDist) / (_deltaTime / 1000) * 3600; // knots = nautical miles per hour
          traffic.closureAccel = (newClosureRate - traffic.closureRate) / (_deltaTime / 1000);
          traffic.closureRate = newClosureRate;
          traffic.slantDistance = newSlantDist;
          traffic.lat = tf.lat;
          traffic.lon = tf.lon;
          traffic.alt = tf.alt * 3.281;
          traffic.heading = tf.heading;
          traffic.relativeAlt = newAlt - this.planeAlt;
          let taTau = (traffic.slantDistance - TCAS_CONST.DMOD[this.sensitivity.getVar()][TaRaIndex.TA] ** 2 / traffic.slantDistance) / traffic.closureRate * 3600;
          let raTau = (traffic.slantDistance - TCAS_CONST.DMOD[this.sensitivity.getVar()][TaRaIndex.RA] ** 2 / traffic.slantDistance) / traffic.closureRate * 3600;
          let vTau = traffic.relativeAlt / (this.verticalSpeed - traffic.vertSpeed) * 60;
          if (raTau < 0) {
            taTau = Infinity;
            raTau = Infinity;
          }
          if (vTau < 0) {
            vTau = Infinity;
          }
          traffic.taTau = taTau;
          traffic.raTau = raTau;
          traffic.vTau = vTau;
        });
        if (this.airTraffic.length > TCAS_CONST.MEMORY_MAX) {
          this.airTraffic = this.airTraffic.filter(traffic => traffic.alive === true).sort((a, b) => a.raTau - b.raTau);
          this.airTraffic.length = TCAS_CONST.MEMORY_MAX;
        }
      }).catch(console.error);
    }

    /**
     * Update all traffic elements. Detect and discount bugged traffic, out of range traffic, calculate intrusion level.
     */
    updateTraffic(_deltaTime) {
      this.airTraffic.forEach(traffic => {
        // Remove bugged traffic
        if (Math.abs(traffic.vertSpeed) >= 6000 || traffic.groundSpeed >= 600) {
          traffic.secondsSinceLastTa = 0;
          traffic.intrusionLevel = TaRaIntrusion.TRAFFIC;
          if (this.debug) {
            console.log('Removing bugged traffic');
            console.log('====================================');
            console.log(" id | ".concat(traffic.ID));
            console.log(" vertS | ".concat(traffic.vertSpeed, " ").concat(Math.abs(traffic.vertSpeed) >= 6000 ? '<<<' : ''));
            console.log(" groundS | ".concat(traffic.groundSpeed, " ").concat(traffic.groundSpeed >= 600 ? '<<<' : ''));
            console.log(" alt | ".concat(traffic.alt));
            console.log(" bearing | ".concat(MathUtils.computeGreatCircleHeading(this.ppos.lat, this.ppos.long, traffic.lat, traffic.lon)));
            console.log(" hDist | ".concat(MathUtils.computeGreatCircleDistance(this.ppos.lat, this.ppos.long, traffic.lat, traffic.lon)));
            console.log(' ================================ ');
          }
          return;
        }

        // Check if traffic is on ground. Mode-S transponders would transmit that information themselves, but since Asobo doesn't provide that
        // information, we need to rely on the fallback method
        // this also leads to problems above 1750 ft (the threshold for ground detection), since the aircraft on ground are then shown again.
        // Currently just hide all above currently ground alt (of ppos) + 380, not ideal but works better than other solutions.
        // SU X: traffic.isOnGround is currently broken for injected traffic, still using fallback method
        const groundAlt = this.planeAlt - SimVar.GetSimVarValue('PLANE ALT ABOVE GROUND', 'feet'); // altitude of the terrain
        const onGround = traffic.alt < groundAlt + 360 || traffic.groundSpeed < 30;
        let isDisplayed = false;
        if (!onGround) {
          if (traffic.groundSpeed >= 30) {
            // Workaround for MSFS live traffic, TODO: add option to disable
            if (this.tcasThreat === TcasThreat.THREAT) {
              if (traffic.intrusionLevel >= TaRaIntrusion.TA && traffic.relativeAlt >= TCAS_CONST.THREAT[TcasThreat.THREAT][Limits.MIN] && traffic.relativeAlt <= TCAS_CONST.THREAT[TcasThreat.THREAT][Limits.MAX]) {
                isDisplayed = true;
              }
            } else if (this.tcasThreat) {
              if (traffic.relativeAlt >= TCAS_CONST.THREAT[this.tcasThreat][Limits.MIN] && traffic.relativeAlt <= TCAS_CONST.THREAT[this.tcasThreat][Limits.MAX]) {
                isDisplayed = true;
              }
            }
          }
        } else if (this.debug) {
          console.log("traffic ".concat(traffic.ID, " on ground, not displayed"));
        }

        // Remove traffic that is out of range
        if (isDisplayed) {
          const bearing = MathUtils.computeGreatCircleHeading(this.ppos.lat, this.ppos.long, traffic.lat, traffic.lon) - this.trueHeading + 90;
          const x = traffic.hrzDistance * Math.cos(bearing * Math.PI / 180);
          const y = traffic.hrzDistance * Math.sin(bearing * Math.PI / 180);

          // TODO: Extend at higher altitudes
          // x^2 / xLim ^2 + y^2 / yLim ^2 <= 1
          if (!MathUtils.pointInEllipse(x, y, TCAS_CONST.RANGE.side, TCAS_CONST.RANGE.forward[Limits.MIN], TCAS_CONST.RANGE.side, TCAS_CONST.RANGE.back) || Math.abs(traffic.relativeAlt) > TCAS_CONST.RANGE.alt) {
            isDisplayed = false;
            traffic.taTau = Infinity;
            traffic.raTau = Infinity;
            if (this.debug) {
              console.log("traffic ".concat(traffic.ID, " out of range - not displayed"));
            }
          }
        }
        traffic.isDisplayed = isDisplayed;
        let rangeTest = 0;
        let altTest = 0;
        let accelTest = 0;

        // Perform range test
        if (traffic.raTau < TCAS_CONST.TAU[this.sensitivity.getVar()][TaRaIndex.RA] || traffic.slantDistance < TCAS_CONST.DMOD[this.sensitivity.getVar()][TaRaIndex.RA]) {
          rangeTest = TaRaIntrusion.RA;
        } else if (traffic.taTau < TCAS_CONST.TAU[this.sensitivity.getVar()][TaRaIndex.TA] || traffic.slantDistance < TCAS_CONST.DMOD[this.sensitivity.getVar()][TaRaIndex.TA]) {
          rangeTest = TaRaIntrusion.TA;
        } else if (traffic.hrzDistance < 6) {
          rangeTest = TaRaIntrusion.PROXIMITY;
        }

        // Perform altitude test
        if (traffic.vTau < (Math.abs(this.verticalSpeed) <= 600 ? TCAS_CONST.TVTHR[this.sensitivity.getVar()] : TCAS_CONST.TAU[this.sensitivity.getVar()][TaRaIndex.RA]) || Math.abs(traffic.relativeAlt) < TCAS_CONST.ZTHR[this.sensitivity.getVar()][TaRaIndex.RA]) {
          altTest = TaRaIntrusion.RA;
        } else if (traffic.vTau < TCAS_CONST.TAU[this.sensitivity.getVar()][TaRaIndex.TA] || Math.abs(traffic.relativeAlt) < TCAS_CONST.ZTHR[this.sensitivity.getVar()][TaRaIndex.TA]) {
          altTest = TaRaIntrusion.TA;
        } else if (Math.abs(traffic.relativeAlt) < 1200) {
          altTest = TaRaIntrusion.PROXIMITY;
        }

        // Perform acceleration test
        // TODO FIXME: Proper HMD based true-to-life filtering
        if (Math.abs(traffic.closureAccel) <= TCAS_CONST.ACCEL[this.sensitivity.getVar()][TaRaIndex.RA]) {
          accelTest = TaRaIntrusion.RA;
        } else if (Math.abs(traffic.closureAccel) <= TCAS_CONST.ACCEL[this.sensitivity.getVar()][TaRaIndex.TA]) {
          accelTest = TaRaIntrusion.TA;
        } else {
          accelTest = TaRaIntrusion.PROXIMITY;
        }
        const desiredIntrusionLevel = Math.min(rangeTest, altTest, accelTest);
        switch (traffic.intrusionLevel) {
          case TaRaIntrusion.RA:
            if (this.activeRa.info === null || this.activeRa.secondsSinceStart < TCAS_CONST.MIN_RA_DURATION || traffic.taTau > TCAS_CONST.TAU[this.sensitivity.getVar()][TaRaIndex.TA] * TCAS_CONST.VOL_BOOST && traffic.slantDistance > TCAS_CONST.DMOD[this.sensitivity.getVar()][TaRaIndex.TA] * TCAS_CONST.VOL_BOOST || traffic.vTau > TCAS_CONST.TAU[this.sensitivity.getVar()][TaRaIndex.TA] * TCAS_CONST.VOL_BOOST && Math.abs(traffic.relativeAlt) > TCAS_CONST.ZTHR[this.sensitivity.getVar()][TaRaIndex.TA] * TCAS_CONST.VOL_BOOST || traffic.closureRate < TCAS_CONST.CLOSURE_RATE_THRESH) {
              traffic.intrusionLevel = desiredIntrusionLevel;
            }
            break;
          case TaRaIntrusion.TA:
            switch (desiredIntrusionLevel) {
              case TaRaIntrusion.RA:
                if (!this.isSlewActive) {
                  traffic.intrusionLevel = desiredIntrusionLevel;
                  if (this.debug) console.log("".concat(traffic.ID, " new intrusion level is ").concat(desiredIntrusionLevel));
                }
                break;
              case TaRaIntrusion.TA:
                if (this.debug) console.log("".concat(traffic.ID, " resetting seconds since last TA to 0"));
                traffic.secondsSinceLastTa = 0;
                break;
              default:
                if (traffic.secondsSinceLastTa >= TCAS_CONST.TA_EXPIRATION_DELAY) {
                  traffic.secondsSinceLastTa = 0;
                  traffic.intrusionLevel = desiredIntrusionLevel;
                  if (this.debug) console.log("".concat(traffic.ID, " resetting seconds since last TA to ").concat(traffic.secondsSinceLastTa, " - new intrusion level is ").concat(desiredIntrusionLevel));
                } else if (traffic.secondsSinceLastTa < 10) {
                  traffic.secondsSinceLastTa += _deltaTime / 1000;
                  if (this.debug) console.log("".concat(traffic.ID, " seconds since last TA is ").concat(traffic.secondsSinceLastTa));
                }
                break;
            }
            break;
          default:
            if (!this.isSlewActive) {
              if (this.debug && desiredIntrusionLevel > TaRaIntrusion.TRAFFIC) console.log("".concat(traffic.ID, " new intrusion level is ").concat(desiredIntrusionLevel));
              traffic.intrusionLevel = desiredIntrusionLevel;
            }
            break;
        }
      });
    }

    /**
     * Get RA and update advisory state
     * @param _deltaTime delta time of this frame
     */
    updateRa(_deltaTime) {
      this.getRa(_deltaTime);
      this.updateAdvisoryState(_deltaTime);
    }

    /**
     * Calculate closing trajectory with given intruder
     * @param targetVS Target vertical speed
     * @param traffic intruder object
     * @param delay delay in seconds
     * @param accel acceleration in f/s^2
     * @returns Predicted alt after given delay
     */
    calculateTrajectory(targetVS, traffic, delay, accel) {
      // accel must be in f/s^2
      accel = targetVS < this.verticalSpeed ? -1 * accel : accel;
      const timeToAccelerate = Math.min(traffic.raTau - delay, (targetVS - this.verticalSpeed) / 60 / accel); // raTau can be infinity?
      const remainingTime = traffic.raTau - (delay + timeToAccelerate);
      return this.planeAlt + Math.round(this.verticalSpeed / 60) * (delay + timeToAccelerate) + 0.5 * accel * timeToAccelerate ** 2 + targetVS / 60 * remainingTime;
    }

    /**
     * Calculated predicted seperation for ALIM
     * @returns seperation distance
     */
    getPredictedSep() {
      let minSeparation = TCAS_CONST.REALLY_BIG_NUMBER;
      this.raTraffic.forEach(traffic => {
        const trafficAltAtCPA = traffic.alt + traffic.vertSpeed / 60 * traffic.raTau;
        const myAltAtCPA = this.planeAlt + this.verticalSpeed / 60 * traffic.raTau;
        const _sep = Math.abs(myAltAtCPA - trafficAltAtCPA);
        if (_sep < minSeparation) {
          minSeparation = _sep;
        }
      });
      return minSeparation;
    }

    /**
     * Calculate minimum vertical seperation
     * @param {*} sense Direction up/down
     * @param {*} targetVS Target Vertical Speed
     * @param {*} delay Delay in seconds
     * @param {*} accel Acceleration in in f/s^2
     * @returns Array where [vertical seperation, is aircraft crossing]
     */
    getVerticalSep(sense, targetVS, delay, accel) {
      let isCrossing = false;
      let minSeparation = TCAS_CONST.REALLY_BIG_NUMBER;
      this.raTraffic.forEach(traffic => {
        const trafficAltAtCPA = traffic.alt + traffic.vertSpeed / 60 * traffic.raTau;
        let _sep = TCAS_CONST.REALLY_BIG_NUMBER;
        if (sense === RaSense.UP) {
          const _delay = this.verticalSpeed < targetVS ? Math.min(traffic.raTau, delay) : 0;
          _sep = Math.max(this.calculateTrajectory(targetVS, traffic, _delay, accel) - trafficAltAtCPA, 0); // max might not be needed
          if (!isCrossing && this.planeAlt + 100 < traffic.alt) {
            isCrossing = true;
          }
        } else if (sense === RaSense.DOWN) {
          const _delay = this.verticalSpeed > targetVS ? Math.min(traffic.raTau, delay) : 0;
          _sep = Math.max(trafficAltAtCPA - this.calculateTrajectory(targetVS, traffic, _delay, accel), 0); // max might not be needed
          if (!isCrossing && this.planeAlt - 100 > traffic.alt) {
            isCrossing = true;
          }
        }
        if (_sep < minSeparation) {
          minSeparation = _sep;
        }
      });
      return [minSeparation, isCrossing];
    }

    /**
     * Get resolution advisory
     * @param _deltaTime deltaTime of this frame
     */
    getRa(_deltaTime) {
      // TODO: Store 10 most recent RA and 60 most recent TA - 34-43-00
      // TODO: Refactor, remove unneeeded if else
      if (this.tcasFault.getVar()) {
        this._newRa.info = null;
        this.activeRa.info = null;
        return;
      }
      this.raTraffic = this.airTraffic.filter(traffic => traffic.intrusionLevel === TaRaIntrusion.RA && traffic.alive).sort((a, b) => a.raTau - b.raTau);
      this._newRa.info = null;
      this._newRa.isReversal = false;
      this._newRa.secondsSinceStart = 0;
      this._newRa.hasBeenAnnounced = false;
      const previousRa = this.activeRa;
      const ALIM = TCAS_CONST.ALIM[this.sensitivity.getVar()];
      if (this.raTraffic.length === 0) {
        return;
      }
      if (this.activeRa.info === null) {
        // First RA
        const [upVerticalSep, upIsCrossing] = this.getVerticalSep(RaSense.UP, 1500, TCAS_CONST.INITIAL_DELAY, TCAS_CONST.INITIAL_ACCEL);
        const [downVerticalSep, downIsCrossing] = this.getVerticalSep(RaSense.DOWN, -1500, TCAS_CONST.INITIAL_DELAY, TCAS_CONST.INITIAL_ACCEL);

        // Select sense
        let sense = RaSense.UP;
        if (this.debug) {
          console.log('TCAS: INITIAL RA: SELECTING SENSE');
          console.log('---------------------------------');
          console.log("UP VERTICAL SEPARATION at 1500: ".concat(upVerticalSep, "; upIsCrssing: ").concat(upIsCrossing));
          console.log("DOWN VERTICAL SEPARATION at -1500: ".concat(downVerticalSep, "; downIsCrossing: ").concat(downIsCrossing));
          console.log('ALIM IS ', ALIM);
        }

        // Override if climb/desc RAs are inhibited.
        if (this.inhibitions === Inhibit.ALL_DESC_RA) {
          sense = RaSense.UP;
        } else if (this.inhibitions === Inhibit.ALL_CLIMB_RA) {
          sense = RaSense.DOWN;
        } else {
          // If both achieve ALIM, prefer non-crossing
          if (upVerticalSep >= ALIM && downVerticalSep >= ALIM) {
            if (this.debug) {
              console.log('BOTH ACHIEVE ALIM');
            }
            if (upIsCrossing && !downIsCrossing) {
              sense = RaSense.DOWN;
            } else if (!upIsCrossing && downIsCrossing) {
              sense = RaSense.UP;
            } else {
              sense = upVerticalSep > downVerticalSep ? RaSense.UP : RaSense.DOWN;
            }
          }

          // If neither achieve ALIM, choose sense with greatest separation
          if (upVerticalSep < ALIM && downVerticalSep < ALIM) {
            sense = upVerticalSep > downVerticalSep ? RaSense.UP : RaSense.DOWN;
            if (this.debug) {
              console.log('NEITHER ACHIEVE ALIM, PICKING GREATEST SEPARATION');
            }
          }

          // If only one achieves ALIM, pick it
          if (upVerticalSep >= ALIM && downVerticalSep < ALIM) {
            if (this.debug) {
              console.log('UP ACHIEVES ALIM');
            }
            sense = RaSense.UP;
          } else {
            if (this.debug) {
              console.log('DOWN ACHIEVES ALIM');
            }
            sense = RaSense.DOWN;
          }
        }

        // Useful later
        const [levelSep] = this.getVerticalSep(sense, 0, TCAS_CONST.INITIAL_DELAY, TCAS_CONST.INITIAL_ACCEL);
        if (this.debug) {
          console.log("levelSep is: ".concat(levelSep));
        }
        if (Math.abs(this.verticalSpeed) < 1500 || this.verticalSpeed <= -1500 && sense === RaSense.UP || this.verticalSpeed >= 1500 && sense === RaSense.DOWN) {
          // Choose preventive or corrective
          const predictedSep = this.getPredictedSep();
          if (predictedSep >= ALIM) {
            // We already achieve ALIM, so preventive RA
            // Multiplier for vertical speed (test negative VS for climb sense, positive VS for descend sense)
            const mul = sense === RaSense.UP ? -1 : 1;
            const [sep500] = this.getVerticalSep(sense, mul * 500, TCAS_CONST.INITIAL_DELAY, TCAS_CONST.INITIAL_ACCEL);
            const [sep1000] = this.getVerticalSep(sense, mul * 1000, TCAS_CONST.INITIAL_DELAY, TCAS_CONST.INITIAL_ACCEL);
            const [sep2000] = this.getVerticalSep(sense, mul * 2000, TCAS_CONST.INITIAL_DELAY, TCAS_CONST.INITIAL_ACCEL);

            // Find preventive RA's which achieve ALIM
            // If none achieve ALIM, then use nominal RA
            if (sep2000 >= ALIM) {
              this._newRa.info = sense === RaSense.UP ? TCAS_CONST.RA_VARIANTS.monitor_vs_climb_2000 : TCAS_CONST.RA_VARIANTS.monitor_vs_descend_2000;
            } else if (sep1000 >= ALIM) {
              this._newRa.info = sense === RaSense.UP ? TCAS_CONST.RA_VARIANTS.monitor_vs_climb_1000 : TCAS_CONST.RA_VARIANTS.monitor_vs_descend_1000;
            } else if (sep500 >= ALIM) {
              this._newRa.info = sense === RaSense.UP ? TCAS_CONST.RA_VARIANTS.monitor_vs_climb_500 : TCAS_CONST.RA_VARIANTS.monitor_vs_descend_500;
            } else if (levelSep >= ALIM) {
              this._newRa.info = sense === RaSense.UP ? TCAS_CONST.RA_VARIANTS.monitor_vs_climb_0 : TCAS_CONST.RA_VARIANTS.monitor_vs_descend_0;
            } else if (sense === RaSense.UP) {
              this._newRa.info = upIsCrossing ? TCAS_CONST.RA_VARIANTS.climb_cross : TCAS_CONST.RA_VARIANTS.climb;
            } else {
              this._newRa.info = downIsCrossing ? TCAS_CONST.RA_VARIANTS.descend_cross : TCAS_CONST.RA_VARIANTS.descend;
            }
          } else {
            // Corrective RA (either climb/descend or level off)
            const nominalSep = sense === RaSense.UP ? upVerticalSep : downVerticalSep;
            if (nominalSep > levelSep) {
              if (sense === RaSense.UP) {
                this._newRa.info = upIsCrossing ? TCAS_CONST.RA_VARIANTS.climb_cross : TCAS_CONST.RA_VARIANTS.climb;
              } else {
                this._newRa.info = downIsCrossing ? TCAS_CONST.RA_VARIANTS.descend_cross : TCAS_CONST.RA_VARIANTS.descend;
              }
            } else {
              this._newRa.info = sense === RaSense.UP ? TCAS_CONST.RA_VARIANTS.level_off_300_above : TCAS_CONST.RA_VARIANTS.level_off_300_below;
            }
          }
        } else {
          // We're above 1500 FPM already, so either maintain VS or level off
          const nominalSep = sense === RaSense.UP ? upVerticalSep : downVerticalSep;
          if (nominalSep > levelSep) {
            if (sense === RaSense.UP) {
              this._newRa.info = upIsCrossing ? TCAS_CONST.RA_VARIANTS.climb_maintain_vs_crossing : TCAS_CONST.RA_VARIANTS.climb_maintain_vs;
            } else {
              this._newRa.info = downIsCrossing ? TCAS_CONST.RA_VARIANTS.descend_maintain_vs_crossing : TCAS_CONST.RA_VARIANTS.descend_maintain_vs;
            }
          } else {
            this._newRa.info = sense === RaSense.UP ? TCAS_CONST.RA_VARIANTS.level_off_300_above : TCAS_CONST.RA_VARIANTS.level_off_300_below;
          }
        }
      } else {
        // There is a previous RA, so revise it if necessary
        let alreadyAchievedTaZTHR = true;
        let minTimeToCPA = TCAS_CONST.REALLY_BIG_NUMBER;
        this.raTraffic.forEach(traffic => {
          if (Math.abs(this.planeAlt - traffic.alt) < TCAS_CONST.ZTHR[this.sensitivity.getVar()][TaRaIndex.TA]) {
            alreadyAchievedTaZTHR = false;
          }
          if (traffic.raTau < minTimeToCPA) {
            minTimeToCPA = traffic.raTau;
          }
        });
        const sense = previousRa.info.sense;
        this._newRa.isReversal = previousRa.isReversal;
        this._newRa.secondsSinceStart = previousRa.secondsSinceStart;
        if (alreadyAchievedTaZTHR) {
          // We've already achieved TA ZTHR (formerly ALIM)
          // If 10 seconds or more elapsed since start of RA
          //   & (DEFERRED) we haven't yet reached CPA
          //   & our previous RA wasn't a monitor VS or level off,
          // THEN issue a level-off weakening RA
          // ! NOTE: This was originally ALIM, but revised the condition to require greater altitude difference,
          // !       so as not to cause a second RA
          // TODO: Revise conditions for level-off weakening, since nominal RA's are often issued right afterwards

          if (previousRa.secondsSinceStart >= 10 && previousRa.info.callout.id !== TCAS_CONST.CALLOUTS.level_off.id && previousRa.info.callout.id !== TCAS_CONST.CALLOUTS.monitor_vs.id) {
            this._newRa.info = previousRa.info.sense === RaSense.UP ? TCAS_CONST.RA_VARIANTS.level_off_300_above : TCAS_CONST.RA_VARIANTS.level_off_300_below;
          } else {
            // Continue with same RA
            this._newRa.info = previousRa.info;
            this._newRa.hasBeenAnnounced = true;
          }
        } else {
          const predictedSep = this.getPredictedSep(); // need this to factor in level off/maintain VS RA's
          let strengthenRaInfo = null;
          if (predictedSep < ALIM) {
            // Won't achieve ALIM anymore :(
            const mul = sense === RaSense.UP ? 1 : -1;
            let increaseSep = null;
            let increaseCross = null;
            switch (previousRa.info.callout.id) {
              case TCAS_CONST.CALLOUTS.level_off.id:
              case TCAS_CONST.CALLOUTS.monitor_vs.id:
                [increaseSep, increaseCross] = this.getVerticalSep(sense, mul * 1500, TCAS_CONST.FOLLOWUP_DELAY, TCAS_CONST.FOLLOWUP_ACCEL);
                if (increaseCross) {
                  strengthenRaInfo = sense === RaSense.UP ? TCAS_CONST.RA_VARIANTS.climb_cross : TCAS_CONST.RA_VARIANTS.descend_cross;
                } else {
                  strengthenRaInfo = sense === RaSense.UP ? TCAS_CONST.RA_VARIANTS.climb : TCAS_CONST.RA_VARIANTS.descend;
                }
                if (this.debug) {
                  console.log('StrengthenRAInfo: level 0 to 1: ', strengthenRaInfo);
                }
                break;
              case TCAS_CONST.CALLOUTS.climb.id:
              case TCAS_CONST.CALLOUTS.climb_cross.id:
              case TCAS_CONST.CALLOUTS.climb_now.id:
              case TCAS_CONST.CALLOUTS.descend.id:
              case TCAS_CONST.CALLOUTS.descend_now.id:
              case TCAS_CONST.CALLOUTS.maintain_vs.id:
              case TCAS_CONST.CALLOUTS.maintain_vs_cross.id:
                if (previousRa.info.sense === RaSense.UP && this.verticalSpeed >= 1500 || previousRa.info.sense === RaSense.DOWN && this.verticalSpeed <= -1500) {
                  [increaseSep, increaseCross] = this.getVerticalSep(sense, mul * 2500, TCAS_CONST.FOLLOWUP_DELAY, TCAS_CONST.FOLLOWUP_ACCEL);
                  // Check for inhibiting increasing descent
                  if (this.inhibitions !== Inhibit.ALL_INCR_DESC_RA) {
                    strengthenRaInfo = sense === RaSense.UP ? TCAS_CONST.RA_VARIANTS.climb_increase : TCAS_CONST.RA_VARIANTS.descend_increase;
                  }
                  if (this.debug) {
                    console.log('StrengthenRAInfo: level 1 to 2 ', strengthenRaInfo);
                  }
                } else if (this.debug) {
                  console.log('StrengthenRAInfo: condition not met. Callout: ', previousRa.info.callout);
                }
                break;
              default:
                if (this.debug) {
                  console.log('StrengthenRAInfo: condition not met. Callout: ', previousRa.info.callout);
                }
                break;
            }
            if (previousRa.isReversal || previousRa.secondsSinceStart < 10 || minTimeToCPA < 4) {
              // We've reversed before, or less than 10 seconds have elapsed since start of RA, or less than 4 seconds until CPA
              // Can only increase strength if able
              if (strengthenRaInfo === null) {
                // We're at the strongest RA type possible. So cannot reverse.
                this._newRa.info = previousRa.info;
                this._newRa.hasBeenAnnounced = true;
              } else {
                this._newRa.info = strengthenRaInfo;
              }
              // Do not allow reversal if CLIMB/DESC is inhibited
            } else if (this.inhibitions !== Inhibit.ALL_CLIMB_RA && this.inhibitions !== Inhibit.ALL_DESC_RA) {
              // Haven't reversed before, so it's still a possibility
              const reversedSense = sense === RaSense.UP ? RaSense.DOWN : RaSense.UP;
              const revMul = reversedSense === RaSense.UP ? 1 : -1;
              const [reverseSep] = this.getVerticalSep(reversedSense, revMul * 1500, TCAS_CONST.FOLLOWUP_DELAY, TCAS_CONST.FOLLOWUP_ACCEL);

              // If cannot increase RA, then pick between current separation and reverse
              if (strengthenRaInfo === null) {
                if (predictedSep >= reverseSep) {
                  this._newRa.info = previousRa.info;
                  this._newRa.hasBeenAnnounced = true;
                  return;
                }
                this._newRa.info = reversedSense === RaSense.UP ? TCAS_CONST.RA_VARIANTS.climb_now : TCAS_CONST.RA_VARIANTS.descend_now;
                this._newRa.isReversal = true;
              }

              // If both achieve ALIM, prefer non-reversal
              if (increaseSep >= ALIM && reverseSep >= ALIM) {
                this._newRa.info = strengthenRaInfo;
              }

              // If neither achieve ALIM, choose sense with greatest separation
              if (increaseSep < ALIM && reverseSep < ALIM) {
                if (increaseSep >= reverseSep) {
                  this._newRa.info = strengthenRaInfo;
                } else {
                  this._newRa.info = reversedSense === RaSense.UP ? TCAS_CONST.RA_VARIANTS.climb_now : TCAS_CONST.RA_VARIANTS.descend_now;
                  this._newRa.isReversal = true;
                }
              }

              // If only one achieves ALIM, pick it
              if (increaseSep >= ALIM && reverseSep < ALIM) {
                this._newRa.info = strengthenRaInfo;
              } else {
                this._newRa.info = reversedSense === RaSense.UP ? TCAS_CONST.RA_VARIANTS.climb_now : TCAS_CONST.RA_VARIANTS.descend_now;
                this._newRa.isReversal = true;
              }
            } else if (strengthenRaInfo !== null) {
              this._newRa.info = strengthenRaInfo;
            } else {
              this._newRa.info = previousRa.info;
              this._newRa.hasBeenAnnounced = true;
            }
          } else {
            // Continue with same RA
            this._newRa.info = previousRa.info;
            this._newRa.hasBeenAnnounced = true;
          }
        }
      }
    }

    /**
     * Update TA/RA state
     * @param _deltaTime time of this frame
     */
    updateAdvisoryState(_deltaTime) {
      const taThreatCount = this.airTraffic.reduce((acc, aircraft) => acc + (aircraft.alive && aircraft.isDisplayed && aircraft.intrusionLevel === TaRaIntrusion.TA ? 1 : 0), 0);
      if (taThreatCount > 0 && this.debug) {
        console.log("TA THREAT COUNT IS ".concat(taThreatCount));
      }
      const raThreatCount = this.raTraffic.length;
      switch (this.advisoryState) {
        case TcasState.TA:
          if (raThreatCount > 0 && this.inhibitions !== Inhibit.ALL_RA && this.inhibitions !== Inhibit.ALL_RA_AURAL_TA) {
            this.advisoryState = TcasState.RA;
            this.tcasState.setVar(TcasState.RA);
            if (this.debug) {
              console.log('TCAS: TA UPGRADED TO RA');
            }
          } else if (taThreatCount === 0) {
            this.advisoryState = TcasState.NONE;
            this.tcasState.setVar(TcasState.NONE);
          }
          break;
        case TcasState.RA:
          if (raThreatCount === 0) {
            if (taThreatCount > 0) {
              this.advisoryState = TcasState.TA;
              this.tcasState.setVar(TcasState.TA);
            } else {
              this.advisoryState = TcasState.NONE;
              this.tcasState.setVar(TcasState.NONE);
            }
            if (this.debug) {
              console.log('TCAS: CLEAR OF CONFLICT');
            }
            this.soundManager.tryPlaySound(TCAS_CONST.SOUNDS.clear_of_conflict, true);
            this.activeRa.info = null;
          }
          break;
        default:
          if (raThreatCount > 0 && this.inhibitions !== Inhibit.ALL_RA && this.inhibitions !== Inhibit.ALL_RA_AURAL_TA) {
            this.advisoryState = TcasState.RA;
            this.tcasState.setVar(TcasState.RA);
          } else if (taThreatCount > 0) {
            this.advisoryState = TcasState.TA;
            this.tcasState.setVar(TcasState.TA);
            if (this.inhibitions !== Inhibit.ALL_RA_AURAL_TA) {
              this.soundManager.tryPlaySound(TCAS_CONST.SOUNDS.traffic_traffic, true);
            }
          }
          break;
      }
      if (this._newRa.info !== null && this.advisoryState === TcasState.RA) {
        // Replace old RA with new RA
        this.activeRa.info = this._newRa.info;
        this.activeRa.isReversal = this._newRa.isReversal;
        this.activeRa.secondsSinceStart = this._newRa.secondsSinceStart;
        this.activeRa.hasBeenAnnounced = this._newRa.hasBeenAnnounced;
        this.activeRa.secondsSinceStart += _deltaTime / 1000;
        if (!this.activeRa.hasBeenAnnounced) {
          if (this.debug) {
            console.log('RA Intruders: ');
            console.log(' ================================ ');
            this.raTraffic.forEach(traffic => {
              console.log(" id | ".concat(traffic.ID));
              console.log(" alt | ".concat(traffic.alt));
              console.log(" rAlt | ".concat(traffic.relativeAlt));
              console.log(" sDist | ".concat(traffic.slantDistance));
              console.log(" bearing | ".concat(MathUtils.computeGreatCircleHeading(this.ppos.lat, this.ppos.long, traffic.lat, traffic.lon)));
              console.log(" hDist | ".concat(MathUtils.computeGreatCircleDistance(this.ppos.lat, this.ppos.long, traffic.lat, traffic.lon)));
              console.log(" closureRate | ".concat(traffic.closureRate));
              console.log(" closureAccel | ".concat(traffic.closureAccel));
              console.log(" RA TAU | ".concat(traffic.raTau, " <<< ").concat(TCAS_CONST.TAU[this.sensitivity.getVar()][TaRaIndex.RA]));
              console.log(" V TAU | ".concat(traffic.vTau, " <<< ").concat(TCAS_CONST.TAU[this.sensitivity.getVar()][TaRaIndex.TA]));
              console.log(" TA TAU | ".concat(traffic.taTau, " <<< ").concat(TCAS_CONST.TAU[this.sensitivity.getVar()][TaRaIndex.RA]));
              console.log(' ================================ ');
            });
            console.log('TCAS: RA GENERATED: ', this.activeRa.info.callout);
          }
          if (this.activeRa.info.callout.repeat) {
            this.soundManager.tryPlaySound(this.activeRa.info.callout.sound, true, true);
          } else {
            this.soundManager.tryPlaySound(this.activeRa.info.callout.sound, true, false);
          }
          const isCorrective = this.activeRa.info.type === RaType.CORRECT;
          this.correctiveRa.setVar(isCorrective);
          SimVar.SetSimVarValue('L:A32NX_TCAS_VSPEED_RED:1', 'Number', this.activeRa.info.vs.red[Limits.MIN]);
          SimVar.SetSimVarValue('L:A32NX_TCAS_VSPEED_RED:2', 'Number', this.activeRa.info.vs.red[Limits.MAX]);
          if (isCorrective) {
            SimVar.SetSimVarValue('L:A32NX_TCAS_VSPEED_GREEN:1', 'Number', this.activeRa.info.vs.green[Limits.MIN]);
            SimVar.SetSimVarValue('L:A32NX_TCAS_VSPEED_GREEN:2', 'Number', this.activeRa.info.vs.green[Limits.MAX]);
          }
          this.activeRa.hasBeenAnnounced = true;
        }
      }
    }

    /**
     * Send intruder array to ND display
     */
    emitDisplay() {
      this.sendAirTraffic.length = 0;
      const sentAirTraffic = this.airTraffic.filter(traffic => traffic.alive === true && traffic.isDisplayed === true).sort((a, b) => b.intrusionLevel - a.intrusionLevel || a.raTau - b.raTau || a.taTau - b.taTau || a.slantDistance - b.slantDistance);
      // Limit number of contacts displayed to 8
      sentAirTraffic.forEach((traffic, index) => {
        if (this.debug) {
          const debugTraffic = new NDTcasDebugTraffic(traffic);
          debugTraffic.hidden = index >= TCAS_CONST.DISPLAY_MAX;
          this.sendAirTraffic.push(debugTraffic);
        } else {
          if (index >= TCAS_CONST.DISPLAY_MAX) {
            return;
          }
          this.sendAirTraffic.push(new NDTcasTraffic(traffic));
        }
      });
      this.raTraffic.forEach(tf => {
        const traffic = sentAirTraffic.find(p => p && p.ID === tf.ID);
        if (!traffic && this.debug) {
          console.log("ERROR: RA ".concat(tf.ID, " NOT SENT"));
        }
      });
      this.syncer.sendEvent('A32NX_TCAS_TRAFFIC', this.sendAirTraffic);
    }

    /**
     * Main update loop
     * @param _deltaTime delta time of this frame
     */
    update(_deltaTime) {
      this.soundManager.update(_deltaTime);
      const deltaTime = this.updateThrottler.canUpdate(_deltaTime * (this.simRate || 1));
      if (deltaTime === -1) {
        return;
      }
      this.updateVars();
      this.updateInhibitions();
      this.updateStatusFaults();
      if (this.tcasMode.getVar() === TcasMode.STBY) {
        this.advisoryState = TcasState.NONE;
        this.tcasState.setVar(TcasState.NONE);
        this.correctiveRa.setVar(false);
        SimVar.SetSimVarValue('L:A32NX_TCAS_VSPEED_RED:1', 'Number', 0);
        SimVar.SetSimVarValue('L:A32NX_TCAS_VSPEED_RED:2', 'Number', 0);
        SimVar.SetSimVarValue('L:A32NX_TCAS_VSPEED_GREEN:1', 'Number', 0);
        SimVar.SetSimVarValue('L:A32NX_TCAS_VSPEED_GREEN:2', 'Number', 0);
        if (this.sendAirTraffic.length !== 0) {
          this.sendAirTraffic.length = 0;
          this.syncer.sendEvent('A32NX_TCAS_TRAFFIC', this.sendAirTraffic);
        }
        return;
      }
      this.fetchRawTraffic(deltaTime);
      this.updateTraffic(deltaTime);
      this.updateRa(deltaTime);
      this.emitDisplay();
    }
  }
  _defineProperty(TcasComputer, "_instance", void 0);

  const components = [TcasComputer.instance];
  function initTcasLoop() {
    components.forEach(component => component.init());
  }
  function updateTcasLoop(deltaTime) {
    components.forEach(component => component.update(deltaTime));
  }

  exports.TcasComputer = TcasComputer;
  exports.initTcasLoop = initTcasLoop;
  exports.updateTcasLoop = updateTcasLoop;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
