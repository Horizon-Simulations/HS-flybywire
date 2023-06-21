(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.SimBridgeClient = {}));
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

  const getSimBridgeIp = () => NXDataStore.get('CONFIG_SIMBRIDGE_REMOTE', 'local') === 'local' ? 'localhost' : NXDataStore.get('CONFIG_SIMBRIDGE_IP', 'localhost');
  const getSimBridgeUrl = () => "http://".concat(getSimBridgeIp(), ":").concat(NXDataStore.get('CONFIG_SIMBRIDGE_PORT', '8380'));
  const fetchWithTimeout = function (resource, options) {
    let timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2000;
    return new Promise((resolve, reject) => {
      // AbortController not available in Coherent -_-
      const timer = setTimeout(() => {
        reject(new Error("Timeout after ".concat(timeout, " ms!")));
      }, timeout);
      fetch(resource, options).then(value => {
        clearTimeout(timer);
        resolve(value);
      }).catch(reason => {
        clearTimeout(timer);
        reject(reason);
      });
    });
  };

  // Copyright (c) 2022 FlyByWire Simulations

  /**
   * Class responsible for retrieving data related to company routes from SimBridge
   */
  class Health {
    /**
     * Used to check the state of a given service. If none is given, then main status is returned.
     * @param serviceName The name of the service or omit for the overall status
     * @returns true if service is available, false otherwise
     */
    static async getHealth(serviceName) {
      const response = await fetchWithTimeout("".concat(getSimBridgeUrl(), "/health"), undefined, 5000);
      if (!response.ok) {
        throw new Error("SimBridge Error: ".concat(response.status));
      }
      const healthJson = await response.json();
      switch (serviceName) {
        case undefined:
          if (healthJson.status === 'ok') {
            return true;
          }
          break;
        case 'api':
          if (healthJson.info.api.status === 'up') {
            return true;
          }
          break;
        case 'mcdu':
          if (healthJson.info.mcdu.status === 'up') {
            return true;
          }
          break;
        default:
          throw new Error("Unknown service name: '".concat(serviceName, "'"));
      }
      return false;
    }
  }

  /**
   * SimBridgeState is one of:
   * - OFF: SimBridge is deactivated in the EFB
   * - OFFLINE: SimBridge is activated in the EFB, but the connection to the SimBridge server could not be established
   * - CONNECTING: SimBridge is activated in the EFB, and the connection to the SimBridge server is being established
   * - CONNECTED: SimBridge is activated in the EFB and the connection to the SimBridge server is established
   */
  let SimBridgeClientState = /*#__PURE__*/function (SimBridgeClientState) {
    SimBridgeClientState["OFF"] = "OFF";
    SimBridgeClientState["OFFLINE"] = "OFFLINE";
    SimBridgeClientState["CONNECTING"] = "CONNECTING";
    SimBridgeClientState["CONNECTED"] = "CONNECTED";
    return SimBridgeClientState;
  }({});

  /**
   * This class is a singleton that is used to manage the state of the client connection to the
   * SimBridge server. The aim is to prevent simbridge-client services to constantly try to connect
   * to the server when it is not available and therefore creating unnecessary log entries and load.
   */
  class ClientState {
    /**
     * Private constructor for the singleton. Start checking the server availability regularly
     * to update the state which can be retrieved with isAvailable().
     */
    constructor() {
      // flag to indicate if the client is available
      _defineProperty(this, "available", false);
      // SimBridge Connect setting
      _defineProperty(this, "simBridgeEnabledSetting", 'AUTO ON');
      // counter for failed connection attempts
      _defineProperty(this, "connectionAttemptCounter", 0);
      // how many times to attempt to connect to the server before giving up
      _defineProperty(this, "maxSimBridgeConnectionAttempts", 60);
      // Indicates the state of the client connection to the SimBridge server
      _defineProperty(this, "simBridgeState", SimBridgeClientState.OFF);
      // Subscribe to the SimBridge Enabled setting to be notified when it changes. Otherwise, we would
      // only be able to check each check interval (5sec)
      NXDataStore.getAndSubscribe('CONFIG_SIMBRIDGE_ENABLED', (key, value) => {
        // console.log(`[SimBridge-Client] SimBridge Enabled setting changed to: ${value}`);
        this.simBridgeEnabledSetting = value;
        this.connectionAttemptCounter = 0;
        this.checkServerAvailability();
      }, 'AUTO ON');
      // Subscribe to the SimBridge Remote setting so we can instantly re-establish connection
      // when we change this
      NXDataStore.subscribe('CONFIG_SIMBRIDGE_REMOTE', _ => {
        this.connectionAttemptCounter = 0;
        this.checkServerAvailability();
      });

      // reset the setting if not permanent off
      if (this.simBridgeEnabledSetting !== 'PERM OFF') {
        NXDataStore.set('CONFIG_SIMBRIDGE_ENABLED', 'AUTO ON');
      }

      // Try to connect websocket if enabled in EFB and no connection established
      setInterval(() => {
        this.checkServerAvailability();
      }, 5000);
    }

    /**
     * The singleton instance getter
     */
    static getInstance() {
      if (!ClientState.instance) {
        ClientState.instance = new ClientState();
      }
      return ClientState.instance;
    }

    /**
     * Returns true if the client is available, false otherwise.
     * Availability is checked every 5 seconds.
     *
     * @deprecated use getSimBridgeClientState() or isConnected() instead
     */
    isAvailable() {
      return this.available;
    }

    /**
     * Returns the current state of the client connection to the SimBridge server.
     * This returns a cached value that is updated every 5 seconds and does not perform
     * a health check to the server.
     *
     * @returns {SimBridgeClientState}
     */
    getSimBridgeClientState() {
      return this.simBridgeState;
    }

    /**
     * Returns true if the SimBridgeClientState is CONNECTED
     */
    isConnected() {
      return this.simBridgeState === SimBridgeClientState.CONNECTED;
    }

    /**
     * Sets the SimBridgeClientState based on the SimBridge Enabled setting and the availability of the server
     *
     * @private
     */
    setSimBridgeState() {
      if (this.available) {
        this.simBridgeState = SimBridgeClientState.CONNECTED;
        return;
      }
      switch (this.simBridgeEnabledSetting) {
        case 'AUTO ON':
          this.simBridgeState = SimBridgeClientState.CONNECTING;
          break;
        case 'AUTO OFF':
          this.simBridgeState = SimBridgeClientState.OFFLINE;
          break;
        default:
          this.simBridgeState = SimBridgeClientState.OFF;
      }
    }

    /**
     * Checks if the SimBridge server is available (via health check service) and updates the state accordingly
     * @private
     */
    checkServerAvailability() {
      // Check the SimBridge Enabled setting (set in the flyPad EFB)
      // If the setting is not AUTO ON, then the client is not available
      if (this.simBridgeEnabledSetting !== 'AUTO ON') {
        this.connectionAttemptCounter = 0;
        this.available = false;
        this.setSimBridgeState();
        return;
      }

      // After 60 failed connection attempts, give up and set the SimBridge Enabled setting to AUTO OFF to
      // prevent the client from trying to connect to the server again. The user can reset the setting to AUTO ON
      // in the flyPad EFB to try again.
      if (this.connectionAttemptCounter++ >= this.maxSimBridgeConnectionAttempts) {
        NXDataStore.set('CONFIG_SIMBRIDGE_ENABLED', 'AUTO OFF');
        this.connectionAttemptCounter = 0;
      } else {
        // try to connect to the server
        Health.getHealth().then(result => {
          if (result) {
            if (!this.available) {
              // only log once when SimBridge becomes available
              console.log('[SimBridge-Client] SimBridge available.');
            }
            this.available = true;
            this.connectionAttemptCounter = 0;
          } else {
            this.available = false;
            console.log("[SimBridge-Client] SimBridge is not available. Connection attempt counter:\n                                    ".concat(this.connectionAttemptCounter, " of ").concat(this.maxSimBridgeConnectionAttempts));
          }
        }).catch(() => {
          this.available = false;
          console.log("[SimBridge-Client] SimBridge is not available. Connection attempt counter:\n                            ".concat(this.connectionAttemptCounter, " of ").concat(this.maxSimBridgeConnectionAttempts));
        });
      }
      this.setSimBridgeState();
    }
  }
  // The singleton instance
  _defineProperty(ClientState, "instance", void 0);

  // Copyright (c) 2022 FlyByWire Simulations
  /**
   * Class responsible for retrieving data related to company routes from SimBridge
   */
  class CompanyRoute {
    /**
     * Used to retrieve a given company route
     * @param route The routename in question
     * @returns Returns the CoRoute DTO
     */
    static async getCoRoute(route) {
      if (!ClientState.getInstance().isConnected()) {
        throw new Error('SimBridge is not connected.');
      }
      if (route) {
        const response = await fetchWithTimeout("".concat(getSimBridgeUrl(), "/api/v1/coroute?rteNum=").concat(route));
        if (response.ok) {
          return {
            success: true,
            data: await response.json()
          };
        }
        return {
          success: false,
          data: null
        };
      }
      throw new Error('No Company route provided');
    }

    /**
     * Used to retrieve a list of company routes for a given origin and dest
     * @param origin the origin
     * @param dest the destination
     * @returns Returns a list of CoRoute DTOs
     */
    static async getRouteList(origin, dest) {
      if (!ClientState.getInstance().isConnected()) {
        throw new Error('SimBridge is not connected.');
      }
      if (origin && dest) {
        const response = await fetchWithTimeout("".concat(getSimBridgeUrl(), "/api/v1/coroute/list?origin=").concat(origin, "&destination=").concat(dest));
        if (response.ok) {
          const filteredData = (await response.json()).filter(value => value.name.length < 10);
          return {
            success: true,
            data: filteredData
          };
        }
        return {
          success: false,
          data: null
        };
      }
      throw new Error('Origin or Destination missing');
    }
  }

  // Copyright (c) 2022 FlyByWire Simulations

  /**
   * Class pertaining to retrieving static files for general viewing from SimBridge
   */
  class Viewer {
    /**
     * Used to retrieve a streamable image of specified page within a given PDF file
     * @param filename required field, filename of the pdf
     * @param pageNumber required field, The page of the PDF file
     * @returns a Blob
     */
    static async getPDFPage(filename, pageNumber) {
      if (!ClientState.getInstance().isConnected()) {
        throw new Error('SimBridge is not connected.');
      }
      if (filename || pageNumber) {
        const response = await fetchWithTimeout("".concat(getSimBridgeUrl(), "/api/v1/utility/pdf?filename=").concat(filename, "&pagenumber=").concat(pageNumber));
        if (response.ok) {
          return response.blob();
        }
        throw new Error("SimBridge Error: ".concat(response.status));
      }
      throw new Error('File name or page number missing');
    }

    /**
     * Used to retrieve a URL to the rendered image of the specified PDF page.
     * It internally calls getPDFPage and then calls createObjectURL().
     * @see https://developer.mozilla.org/en-US/docs/web/api/url/createobjecturl
     * @param filename required field, filename of the pdf
     * @param pageNumber required field, The page of the PDF file
     * @returns url to the image (object blob) of the PDF page
     */
    static async getPDFPageUrl(filename, pageNumber) {
      const blob = await Viewer.getPDFPage(filename, pageNumber);
      return URL.createObjectURL(blob);
    }

    /**
     * Retrieve the number of pages within a specified PDF file
     * @param filename required field, filename of the pdf
     * @returns A number
     */
    static async getPDFPageNum(filename) {
      if (!ClientState.getInstance().isConnected()) {
        throw new Error('SimBridge is not connected.');
      }
      if (filename) {
        const response = await fetchWithTimeout("".concat(getSimBridgeUrl(), "/api/v1/utility/pdf/numpages?filename=").concat(filename));
        if (response.ok) {
          return response.json();
        }
        throw new Error("SimBridge Error: ".concat(response.status));
      }
      throw new Error('File name or page number missing');
    }

    /**
     * Used to retrieve a list of filenames within the PDF folder
     * @returns an Array of strings
     */
    static async getPDFList() {
      if (!ClientState.getInstance().isConnected()) {
        throw new Error('SimBridge is not connected.');
      }
      const response = await fetchWithTimeout("".concat(getSimBridgeUrl(), "/api/v1/utility/pdf/list"));
      if (response.ok) {
        return response.json();
      }
      throw new Error("SimBridge Error: ".concat(response.status));
    }

    /**
     * Used to retrieve a streamable image of a specified image in the images folder
     * @param filename required field, filename of the image
     * @returns A Blob
     */
    static async getImage(filename) {
      if (!ClientState.getInstance().isConnected()) {
        throw new Error('SimBridge is not connected.');
      }
      if (filename) {
        const response = await fetchWithTimeout("".concat(getSimBridgeUrl(), "/api/v1/utility/image?filename=").concat(filename));
        if (response.ok) {
          return response.blob();
        }
        throw new Error("SimBridge Error: ".concat(response.status));
      }
      throw new Error('File name or page number missing');
    }

    /**
     * Used to retrieve a URL to the image.
     * It internally calls getPDFImage and then calls createObjectURL().
     * @see https://developer.mozilla.org/en-US/docs/web/api/url/createobjecturl
     * @param filename required field, filename of the pdf
     * @returns url to the image (object blob)
     */
    static async getImageUrl(filename) {
      const blob = await Viewer.getImage(filename);
      return URL.createObjectURL(blob);
    }

    /**
     * Used to retrieve a list of filenames within the PDF folder
     * @returns an Array of strings
     */
    static async getImageList() {
      if (!ClientState.getInstance().isConnected()) {
        throw new Error('SimBridge is not connected.');
      }
      const response = await fetchWithTimeout("".concat(getSimBridgeUrl(), "/api/v1/utility/image/list"));
      if (response.ok) {
        return response.json();
      }
      throw new Error("SimBridge Error: ".concat(response.status));
    }
  }

  /**
   * Class to communicate with the SimBridge MCDU server
   */
  class McduServerClient {
    constructor() {
      _defineProperty(this, "state", ClientState.getInstance());
      _defineProperty(this, "socket", undefined);
    }
    /**
     * Will attempt to connect to the SimBridge MCDU server. Will throw an error if the connection fails.
     * @param caller back reference to the caller - see notes below.
     * @param eventHandler The callback to be called when an event is received from the socket.
     *  See https://developer.mozilla.org/en-US/docs/Web/API/WebSocket#events for possible events.
     *
     * Note: This method requires the caller object to be provided, so it can send it back to the event handler when an
     * event is triggered. Otherwise, the event handler in McduServerClient will not be able to call the caller's
     * methods as it will not recognize "this" (will be undefined).
     */
    connect(eventHandler) {
      if (this.state.getSimBridgeClientState() === SimBridgeClientState.CONNECTED) {
        // first disconnect to clean up any previous connection
        this.disconnect();

        // Connect web socket
        this.socket = new WebSocket(McduServerClient.url());

        // Setup up event handler from the caller
        if (eventHandler && typeof eventHandler === 'function') {
          this.socket.onerror = event => eventHandler(event);
          this.socket.onclose = event => eventHandler(event);
          this.socket.onopen = event => eventHandler(event);
          this.socket.onmessage = event => eventHandler(event);
        }
      }
    }

    /**
     * Checks if the connection to the SimBridge MCDU Server is still valid.
     * If the user deactivated the SimBridge in the EFB or if the SimBridge connection is not established
     * this will return false.
     *  @see ClientState.isAvailable()
     */
    validateConnection() {
      return this.state.isAvailable();
    }

    /**
     * Will disconnect from the SimBridge MCDU server. If no connection is active, then nothing will happen.
     */
    disconnect() {
      if (this.socket) {
        this.socket.close();
        this.socket = undefined;
      }
    }

    /**
     * Checks if the McduServerClient is connected to the SimBridge MCDU server via the websocket.
     */
    isConnected() {
      return this.socket && this.socket.readyState === 1;
    }

    /**
     * Will send a message to the SimBridge MCDU server. An error will be thrown if the connection is not active.
     * @param message
     */
    send(message) {
      if (this.socket && this.socket.readyState) {
        this.socket.send(message);
      } else {
        throw new Error('MCDUServerClient is not connected to the SimBridge MCDU Server');
      }
    }
  }
  _defineProperty(McduServerClient, "ip", () => getSimBridgeIp());
  _defineProperty(McduServerClient, "port", () => NXDataStore.get('CONFIG_SIMBRIDGE_PORT', '8380'));
  _defineProperty(McduServerClient, "url", () => "ws://".concat(McduServerClient.ip(), ":").concat(McduServerClient.port(), "/interfaces/v1/mcdu").replace(/\s+/g, ''));

  exports.ClientState = ClientState;
  exports.CompanyRoute = CompanyRoute;
  exports.Health = Health;
  exports.McduServerClient = McduServerClient;
  exports.Viewer = Viewer;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
