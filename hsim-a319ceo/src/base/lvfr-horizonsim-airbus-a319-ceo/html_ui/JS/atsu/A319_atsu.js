(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Atsu = {}));
})(this, (function (exports) { 'use strict';

    //  Copyright (c) 2022 FlyByWire Simulations
    //  SPDX-License-Identifier: GPL-3.0
    exports.AtsuStatusCodes = void 0;

    (function (AtsuStatusCodes) {
      AtsuStatusCodes[AtsuStatusCodes["Ok"] = 0] = "Ok";
      AtsuStatusCodes[AtsuStatusCodes["CallsignInUse"] = 1] = "CallsignInUse";
      AtsuStatusCodes[AtsuStatusCodes["OwnCallsign"] = 2] = "OwnCallsign";
      AtsuStatusCodes[AtsuStatusCodes["NoHoppieConnection"] = 3] = "NoHoppieConnection";
      AtsuStatusCodes[AtsuStatusCodes["NoTelexConnection"] = 4] = "NoTelexConnection";
      AtsuStatusCodes[AtsuStatusCodes["TelexDisabled"] = 5] = "TelexDisabled";
      AtsuStatusCodes[AtsuStatusCodes["ComFailed"] = 6] = "ComFailed";
      AtsuStatusCodes[AtsuStatusCodes["NoAtc"] = 7] = "NoAtc";
      AtsuStatusCodes[AtsuStatusCodes["DcduFull"] = 8] = "DcduFull";
      AtsuStatusCodes[AtsuStatusCodes["UnknownMessage"] = 9] = "UnknownMessage";
      AtsuStatusCodes[AtsuStatusCodes["ProxyError"] = 10] = "ProxyError";
      AtsuStatusCodes[AtsuStatusCodes["NewAtisReceived"] = 11] = "NewAtisReceived";
      AtsuStatusCodes[AtsuStatusCodes["NoAtisReceived"] = 12] = "NoAtisReceived";
      AtsuStatusCodes[AtsuStatusCodes["SystemBusy"] = 13] = "SystemBusy";
      AtsuStatusCodes[AtsuStatusCodes["EntryOutOfRange"] = 14] = "EntryOutOfRange";
      AtsuStatusCodes[AtsuStatusCodes["FormatError"] = 15] = "FormatError";
      AtsuStatusCodes[AtsuStatusCodes["NotInDatabase"] = 16] = "NotInDatabase";
    })(exports.AtsuStatusCodes || (exports.AtsuStatusCodes = {}));

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

    // Copyright (c) 2021-2022 FlyByWire Simulations
    // Copyright (c) 2021-2022 Synaptic Simulations
    //
    // SPDX-License-Identifier: GPL-3.0

    /**
     * This enum represents a Control Law selected by the guidance system.
     */
    let ControlLaw;

    (function (ControlLaw) {
      ControlLaw[ControlLaw["HEADING"] = 1] = "HEADING";
      ControlLaw[ControlLaw["TRACK"] = 2] = "TRACK";
      ControlLaw[ControlLaw["LATERAL_PATH"] = 3] = "LATERAL_PATH";
    })(ControlLaw || (ControlLaw = {}));

    let RequestedVerticalMode;

    (function (RequestedVerticalMode) {
      RequestedVerticalMode[RequestedVerticalMode["None"] = 0] = "None";
      RequestedVerticalMode[RequestedVerticalMode["SpeedThrust"] = 1] = "SpeedThrust";
      RequestedVerticalMode[RequestedVerticalMode["VpathThrust"] = 2] = "VpathThrust";
      RequestedVerticalMode[RequestedVerticalMode["VpathSpeed"] = 3] = "VpathSpeed";
      RequestedVerticalMode[RequestedVerticalMode["FpaSpeed"] = 4] = "FpaSpeed";
      RequestedVerticalMode[RequestedVerticalMode["VsSpeed"] = 5] = "VsSpeed";
    })(RequestedVerticalMode || (RequestedVerticalMode = {}));

    var LateralMode;

    (function (LateralMode) {
      LateralMode[LateralMode["NONE"] = 0] = "NONE";
      LateralMode[LateralMode["HDG"] = 10] = "HDG";
      LateralMode[LateralMode["TRACK"] = 11] = "TRACK";
      LateralMode[LateralMode["NAV"] = 20] = "NAV";
      LateralMode[LateralMode["LOC_CPT"] = 30] = "LOC_CPT";
      LateralMode[LateralMode["LOC_TRACK"] = 31] = "LOC_TRACK";
      LateralMode[LateralMode["LAND"] = 32] = "LAND";
      LateralMode[LateralMode["FLARE"] = 33] = "FLARE";
      LateralMode[LateralMode["ROLL_OUT"] = 34] = "ROLL_OUT";
      LateralMode[LateralMode["RWY"] = 40] = "RWY";
      LateralMode[LateralMode["RWY_TRACK"] = 41] = "RWY_TRACK";
      LateralMode[LateralMode["GA_TRACK"] = 50] = "GA_TRACK";
    })(LateralMode || (LateralMode = {}));

    var ArmedLateralMode;

    (function (ArmedLateralMode) {
      ArmedLateralMode[ArmedLateralMode["NAV"] = 0] = "NAV";
      ArmedLateralMode[ArmedLateralMode["LOC"] = 1] = "LOC";
    })(ArmedLateralMode || (ArmedLateralMode = {}));

    var VerticalMode;

    (function (VerticalMode) {
      VerticalMode[VerticalMode["NONE"] = 0] = "NONE";
      VerticalMode[VerticalMode["ALT"] = 10] = "ALT";
      VerticalMode[VerticalMode["ALT_CPT"] = 11] = "ALT_CPT";
      VerticalMode[VerticalMode["OP_CLB"] = 12] = "OP_CLB";
      VerticalMode[VerticalMode["OP_DES"] = 13] = "OP_DES";
      VerticalMode[VerticalMode["VS"] = 14] = "VS";
      VerticalMode[VerticalMode["FPA"] = 15] = "FPA";
      VerticalMode[VerticalMode["ALT_CST"] = 20] = "ALT_CST";
      VerticalMode[VerticalMode["ALT_CST_CPT"] = 21] = "ALT_CST_CPT";
      VerticalMode[VerticalMode["CLB"] = 22] = "CLB";
      VerticalMode[VerticalMode["DES"] = 23] = "DES";
      VerticalMode[VerticalMode["FINAL"] = 24] = "FINAL";
      VerticalMode[VerticalMode["GS_CPT"] = 30] = "GS_CPT";
      VerticalMode[VerticalMode["GS_TRACK"] = 31] = "GS_TRACK";
      VerticalMode[VerticalMode["LAND"] = 32] = "LAND";
      VerticalMode[VerticalMode["FLARE"] = 33] = "FLARE";
      VerticalMode[VerticalMode["ROLL_OUT"] = 34] = "ROLL_OUT";
      VerticalMode[VerticalMode["SRS"] = 40] = "SRS";
      VerticalMode[VerticalMode["SRS_GA"] = 41] = "SRS_GA";
      VerticalMode[VerticalMode["TCAS"] = 50] = "TCAS";
    })(VerticalMode || (VerticalMode = {}));

    var ArmedVerticalMode;

    (function (ArmedVerticalMode) {
      ArmedVerticalMode[ArmedVerticalMode["ALT"] = 0] = "ALT";
      ArmedVerticalMode[ArmedVerticalMode["ALT_CST"] = 1] = "ALT_CST";
      ArmedVerticalMode[ArmedVerticalMode["CLB"] = 2] = "CLB";
      ArmedVerticalMode[ArmedVerticalMode["DES"] = 3] = "DES";
      ArmedVerticalMode[ArmedVerticalMode["GS"] = 4] = "GS";
      ArmedVerticalMode[ArmedVerticalMode["FINAL"] = 5] = "FINAL";
      ArmedVerticalMode[ArmedVerticalMode["TCAS"] = 6] = "TCAS";
    })(ArmedVerticalMode || (ArmedVerticalMode = {}));

    let FmgcFlightPhase;

    (function (FmgcFlightPhase) {
      FmgcFlightPhase[FmgcFlightPhase["Preflight"] = 0] = "Preflight";
      FmgcFlightPhase[FmgcFlightPhase["Takeoff"] = 1] = "Takeoff";
      FmgcFlightPhase[FmgcFlightPhase["Climb"] = 2] = "Climb";
      FmgcFlightPhase[FmgcFlightPhase["Cruise"] = 3] = "Cruise";
      FmgcFlightPhase[FmgcFlightPhase["Descent"] = 4] = "Descent";
      FmgcFlightPhase[FmgcFlightPhase["Approach"] = 5] = "Approach";
      FmgcFlightPhase[FmgcFlightPhase["GoAround"] = 6] = "GoAround";
      FmgcFlightPhase[FmgcFlightPhase["Done"] = 7] = "Done";
    })(FmgcFlightPhase || (FmgcFlightPhase = {}));

    //  Copyright (c) 2022 FlyByWire Simulations
    //  SPDX-License-Identifier: GPL-3.0
    function wordWrap(text, maxLength) {
      const result = [];
      let line = [];
      let length = 0;
      const words = text.match(/[-@_A-Z0-9]+|\[\s+\]/g);

      for (const word of words) {
        if (length + word.length >= maxLength) {
          result.push(line.join(' ').toUpperCase());
          line = [];
          length = 0;
        }

        length += word.length + 1;
        line.push(word);
      }

      if (line.length > 0) {
        result.push(line.join(' ').toUpperCase());
      }

      return result;
    }
    function timestampToString(seconds) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor(seconds / 60) % 60;
      return "".concat(hours.toString().padStart(2, '0')).concat(minutes.toString().padStart(2, '0'));
    }

    function decimalToDms(deg, lng) {
      // converts decimal degrees to degrees minutes seconds
      const M = 0 | deg % 1 * 60e7;
      let degree;

      if (lng) {
        degree = (0 | (deg < 0 ? -deg : deg)).toString().padStart(3, '0');
      } else {
        degree = 0 | (deg < 0 ? -deg : deg);
      }

      let dir = '';

      if (deg < 0) {
        dir = lng ? 'W' : 'S';
      } else {
        dir = lng ? 'E' : 'N';
      }

      return {
        dir,
        deg: degree,
        min: Math.abs(0 | M / 1e7),
        sec: Math.abs((0 | M / 1e6 % 1 * 6e4) / 100)
      };
    }

    function coordinateToString(coordinate, shortVersion) {
      const dmsLat = decimalToDms(coordinate.lat, false);
      const dmsLon = decimalToDms(coordinate.lon, true);
      dmsLon.deg = Number(dmsLon.deg);
      dmsLat.sec = Math.ceil(Number(dmsLat.sec / 100));
      dmsLon.sec = Math.ceil(Number(dmsLon.sec / 100));

      if (shortVersion) {
        if (dmsLat.dir === 'N') {
          if (dmsLon.dir === 'E') {
            return "".concat(dmsLat.deg, "N").concat(dmsLon.deg);
          }

          return "".concat(dmsLat.deg).concat(dmsLon.deg, "N");
        }

        if (dmsLon.dir === 'E') {
          return "".concat(dmsLat.deg).concat(dmsLon.deg, "S");
        }

        return "".concat(dmsLat.deg, "W").concat(dmsLon.deg);
      }

      const lat = "".concat(dmsLat.deg, "\xB0").concat(dmsLat.min, ".").concat(dmsLat.sec).concat(dmsLat.dir);
      const lon = "".concat(dmsLon.deg, "\xB0").concat(dmsLon.min, ".").concat(dmsLon.sec).concat(dmsLon.dir);
      return "".concat(lat, "/").concat(lon);
    }

    /**
     * Defines the decoded UTC timestamp
     */

    class AtsuTimestamp {
      constructor() {
        _defineProperty(this, "Year", SimVar.GetSimVarValue('E:ZULU YEAR', 'number'));

        _defineProperty(this, "Month", SimVar.GetSimVarValue('E:ZULU MONTH OF YEAR', 'number'));

        _defineProperty(this, "Day", SimVar.GetSimVarValue('E:ZULU DAY OF MONTH', 'number'));

        _defineProperty(this, "Seconds", SimVar.GetSimVarValue('E:ZULU TIME', 'seconds'));
      }

      deserialize(jsonData) {
        this.Year = jsonData.Year;
        this.Month = jsonData.Month;
        this.Day = jsonData.Day;
        this.Seconds = jsonData.Seconds;
      }

      dcduTimestamp() {
        return "".concat(timestampToString(this.Seconds), "Z");
      }

      mcduTimestamp() {
        return timestampToString(this.Seconds);
      }

    }

    exports.AtsuMessageNetwork = void 0;

    (function (AtsuMessageNetwork) {
      AtsuMessageNetwork[AtsuMessageNetwork["Hoppie"] = 0] = "Hoppie";
      AtsuMessageNetwork[AtsuMessageNetwork["FBW"] = 1] = "FBW";
    })(exports.AtsuMessageNetwork || (exports.AtsuMessageNetwork = {}));

    exports.AtsuMessageDirection = void 0;

    (function (AtsuMessageDirection) {
      AtsuMessageDirection[AtsuMessageDirection["Uplink"] = 0] = "Uplink";
      AtsuMessageDirection[AtsuMessageDirection["Downlink"] = 1] = "Downlink";
    })(exports.AtsuMessageDirection || (exports.AtsuMessageDirection = {}));

    exports.AtsuMessageType = void 0;

    (function (AtsuMessageType) {
      AtsuMessageType[AtsuMessageType["Freetext"] = 0] = "Freetext";
      AtsuMessageType[AtsuMessageType["METAR"] = 1] = "METAR";
      AtsuMessageType[AtsuMessageType["TAF"] = 2] = "TAF";
      AtsuMessageType[AtsuMessageType["ATIS"] = 3] = "ATIS";
      AtsuMessageType[AtsuMessageType["AOC"] = 4] = "AOC";
      AtsuMessageType[AtsuMessageType["CPDLC"] = 5] = "CPDLC";
      AtsuMessageType[AtsuMessageType["DCL"] = 6] = "DCL";
      AtsuMessageType[AtsuMessageType["OCL"] = 7] = "OCL";
      AtsuMessageType[AtsuMessageType["ATC"] = 8] = "ATC";
    })(exports.AtsuMessageType || (exports.AtsuMessageType = {}));

    exports.AtsuMessageComStatus = void 0;

    (function (AtsuMessageComStatus) {
      AtsuMessageComStatus[AtsuMessageComStatus["Open"] = 0] = "Open";
      AtsuMessageComStatus[AtsuMessageComStatus["Sending"] = 1] = "Sending";
      AtsuMessageComStatus[AtsuMessageComStatus["Sent"] = 2] = "Sent";
      AtsuMessageComStatus[AtsuMessageComStatus["Received"] = 3] = "Received";
      AtsuMessageComStatus[AtsuMessageComStatus["Failed"] = 4] = "Failed";
    })(exports.AtsuMessageComStatus || (exports.AtsuMessageComStatus = {}));

    exports.AtsuMessageSerializationFormat = void 0;
    /**
     * Defines the generic ATC message
     */

    (function (AtsuMessageSerializationFormat) {
      AtsuMessageSerializationFormat[AtsuMessageSerializationFormat["MCDU"] = 0] = "MCDU";
      AtsuMessageSerializationFormat[AtsuMessageSerializationFormat["MCDUMonitored"] = 1] = "MCDUMonitored";
      AtsuMessageSerializationFormat[AtsuMessageSerializationFormat["DCDU"] = 2] = "DCDU";
      AtsuMessageSerializationFormat[AtsuMessageSerializationFormat["Printer"] = 3] = "Printer";
      AtsuMessageSerializationFormat[AtsuMessageSerializationFormat["Network"] = 4] = "Network";
    })(exports.AtsuMessageSerializationFormat || (exports.AtsuMessageSerializationFormat = {}));

    class AtsuMessage {
      constructor() {
        _defineProperty(this, "Network", exports.AtsuMessageNetwork.Hoppie);

        _defineProperty(this, "UniqueMessageID", -1);

        _defineProperty(this, "Timestamp", new AtsuTimestamp());

        _defineProperty(this, "Station", '');

        _defineProperty(this, "ComStatus", exports.AtsuMessageComStatus.Open);

        _defineProperty(this, "Type", null);

        _defineProperty(this, "Direction", null);

        _defineProperty(this, "Confirmed", false);

        _defineProperty(this, "Message", '');
      }

      serialize(_format) {
        throw new Error('No valid implementation');
      } // used to deserialize event data


      deserialize(jsonData) {
        this.Network = jsonData.Network;
        this.UniqueMessageID = jsonData.UniqueMessageID;

        if (jsonData.Timestamp) {
          this.Timestamp = new AtsuTimestamp();
          this.Timestamp.deserialize(jsonData.Timestamp);
        }

        this.Station = jsonData.Station;
        this.ComStatus = jsonData.ComStatus;
        this.Type = jsonData.Type;
        this.Direction = jsonData.Direction;
        this.Confirmed = jsonData.Confirmed;
        this.Message = jsonData.Message;
      }

    }

    //  Copyright (c) 2022 FlyByWire Simulations
    //  SPDX-License-Identifier: GPL-3.0
    exports.FansMode = void 0; // Sources for FANS-B areas:
    // https://www.icao.int/WACAF/Documents/Meetings/2016/Lisbon-2016/SAT-FI11/SAT-FIT-11_IP%2004%20-attachment_Boeing.pdf
    // Station logons are taken from VATSIM vACCs and sector file data of controllers (IVAO and VATSIM use the same callsigns)

    (function (FansMode) {
      FansMode[FansMode["FansNone"] = 0] = "FansNone";
      FansMode[FansMode["FansA"] = 1] = "FansA";
      FansMode[FansMode["FansB"] = 2] = "FansB";
    })(exports.FansMode || (exports.FansMode = {}));

    class FutureAirNavigationSystem {
      // contains all CPDLC callsigns that use FANS-B
      // FANS-A is assumed to be the fallback
      static currentFansMode(identifier) {
        if (/^[0-9A-Z]{4}$/.test(identifier)) {
          if (FutureAirNavigationSystem.areasFansB.findIndex(entry => entry === identifier) > -1) {
            return exports.FansMode.FansB;
          }

          return exports.FansMode.FansA;
        }

        return exports.FansMode.FansNone;
      }

    }

    _defineProperty(FutureAirNavigationSystem, "areasFansB", [// Eurocontrol
    'EURW', 'EURM', 'EURS', 'EURE', 'EURN', // Austria
    'LOVV', 'LOVB', 'LOVN', 'LOVF', 'LOVE', 'LOVS', 'LOVW', 'LOVL', 'LOVU', 'LOVC', 'LOVR', // Benelux
    'EHAW', 'EHAE', 'EHAS', 'EBBU', 'EBBW', 'EBBE', // Germany
    'EDMM', 'EDMR', 'EDMZ', 'EDMU', 'EDMG', 'EDMS', 'EDML', 'EDMB', 'EDGC', 'EDGE', 'EDGK', 'EDGG', 'EDGP', 'EDGR', 'EDGT', 'EDGZ', 'EDWW', 'EDWA', 'EDWB', 'EDWM', 'EDWE', 'EDWD', 'EDUH', 'EDUP', 'EDUO', 'EDUA', 'EDUD', 'EDUL', 'EDUR', 'EDUF', 'EDUN', 'EDUS', 'EDUT', 'EDUU', 'EDUW', 'EDYC', 'EDYH', 'EDYJ', 'EDYS', 'EDYM', 'EDYR', // Estonia
    'EETT', 'EEEE', 'EENN', 'EESS', // Latvia
    'BALT', 'EVRR', 'EVRW', 'EVRE', 'EVRN', 'EVRS', // Lithuania
    'EYVL', 'EYVU', // Greece
    'LGGG', 'LGGU', 'LGGE', 'LGGW', 'LGGS', 'LGGP', 'LGGK', 'LGGH', // Croatia, Slovenia, Zagreb, Sarajevo, Belgrade, Skopje, Tirana, Kosovo (currently no CPDLC)
    // Romania
    'LRBL', 'LRBA', 'LRBC', // Bulgary (currently no CPDLC)
    // Cyprus
    'LCCW', 'LCCS', 'LCCE', 'LCCC', // Hungary (currently no CPDLC)
    // Italy
    'LMMM', 'LMME', 'LIRD', 'LIRI', 'LIRM', 'LIRN', 'LIRS', 'LIPM', 'LIPN', 'LIPS', 'LIMS', 'LIMN', 'LIBI', 'LIBN', 'LIBS', // Romania (currently no CPDLC)
    // Switzerland
    'LSAS', 'LSAA', 'LSAB', 'LSAC', 'LSAD', 'LSAF', 'LSAG', 'LSAH', 'LSAJ', 'LSAU', 'LSAV', // Slovakia (currently no CPDLC)
    // France
    'LFXX', // Scandinavia
    'EKDK', 'EKDB', 'EKDC', 'EKDD', 'EKDS', 'EKDN', 'EKDV', 'EKCH', 'ESOS', 'ESM2', 'ESM3', 'ESM4', 'ESM5', 'ESM6', 'ESM7', 'ESMW', 'ENO1', 'ENO2', 'ENO3', 'ENO4', 'ENO5', 'ENO6', 'ENO7', 'ENO8', 'ENS9', 'ENS1', 'ENS2', 'ENS3', 'ENS4', 'ENS5', 'ENS7', 'ENB8', 'ENB9', 'ENB4', 'ENB5', 'ENB6', 'ENOR', 'ENNS', 'ENOB', 'EFES', 'EFEF', 'EFEG', 'EFEH', 'EFEJ', 'EFEM', // Spain
    'CBRA', 'CBRN', 'CBRS', 'CBRW', 'CBRC', 'CBRE', 'CBRD', 'CMRA', 'CMRM', 'CMRN', 'CMRC', 'CMRW', 'CMRE', 'CSRA', 'CSRW', 'CCRA', 'CCRI', 'CCRL', 'CCRW', 'CCRE', 'CCRO', // Portugal
    'LPPC', 'LPZC', 'LPZD', 'LPZE', 'LPZI', 'LPZN', 'LPZS', 'LPZV', 'LPZW', 'LPZO', 'LPZL', // Poland (currently no CPDLC)
    // Czech
    'LKAA', 'LKAW', 'LKAN', 'LKAU', 'LKAI']);

    //  Copyright (c) 2022 FlyByWire Simulations
    class InputValidationFansA {
      static validateScratchpadAltitude(value) {
        if (!/^[0-9]{1,5}(FT|M)*$/.test(value)) {
          return exports.AtsuStatusCodes.FormatError;
        }

        const feet = !value.endsWith('M');
        const altitude = parseInt(value.match(/([0-9]+)/)[0]);

        if (feet) {
          if (altitude >= 0 && altitude <= 1000 && !value.endsWith('FT')) {
            return exports.AtsuStatusCodes.FormatError;
          }

          if (altitude >= 0 && altitude <= 25000) {
            return exports.AtsuStatusCodes.Ok;
          }

          return exports.AtsuStatusCodes.EntryOutOfRange;
        }

        if (altitude >= 0 && altitude <= 12500) {
          return exports.AtsuStatusCodes.Ok;
        }

        return exports.AtsuStatusCodes.EntryOutOfRange;
      }

      static validateScratchpadSpeed(value) {
        if (/^((M*)\.[0-9]{1,2})$/.test(value)) {
          // MACH number
          let mach = parseInt(value.match(/([0-9]+)/)[0]);
          if (mach < 10) mach *= 10;

          if (mach >= 61 && mach <= 92) {
            return exports.AtsuStatusCodes.Ok;
          }

          return exports.AtsuStatusCodes.EntryOutOfRange;
        }

        if (/^([0-9]{1,3}(KT)*)$/.test(value)) {
          // knots
          const knots = parseInt(value.match(/([0-9]+)/)[0]);

          if (knots >= 70 && knots <= 350) {
            return exports.AtsuStatusCodes.Ok;
          }

          return exports.AtsuStatusCodes.EntryOutOfRange;
        }

        return exports.AtsuStatusCodes.FormatError;
      }

    }

    //  Copyright (c) 2022 FlyByWire Simulations
    class InputValidationFansB {
      static validateScratchpadAltitude(value) {
        if (!/^-*[0-9]{1,5}(FT|M)*$/.test(value)) {
          return exports.AtsuStatusCodes.FormatError;
        }

        const feet = !value.endsWith('M');
        const altitude = parseInt(value.match(/(-*[0-9]+)/)[0]);

        if (feet) {
          if (altitude >= 0 && altitude <= 410 && !value.endsWith('FT')) {
            return exports.AtsuStatusCodes.FormatError;
          }

          if (altitude >= -600 && altitude <= 41000) {
            return exports.AtsuStatusCodes.Ok;
          }

          return exports.AtsuStatusCodes.EntryOutOfRange;
        }

        if (altitude >= -30 && altitude <= 12500) {
          return exports.AtsuStatusCodes.Ok;
        }

        return exports.AtsuStatusCodes.EntryOutOfRange;
      }

      static validateScratchpadSpeed(value) {
        if (/^((M*)\.[0-9]{1,2})$/.test(value)) {
          // MACH number
          let mach = parseInt(value.match(/([0-9]+)/)[0]);
          if (mach < 10) mach *= 10;

          if (mach >= 50 && mach <= 92) {
            return exports.AtsuStatusCodes.Ok;
          }

          return exports.AtsuStatusCodes.EntryOutOfRange;
        }

        if (/^([0-9]{1,3}(KT)*)$/.test(value)) {
          // knots
          const knots = parseInt(value.match(/([0-9]+)/)[0]);

          if (knots >= 0 && knots <= 350) {
            return exports.AtsuStatusCodes.Ok;
          }

          return exports.AtsuStatusCodes.EntryOutOfRange;
        }

        return exports.AtsuStatusCodes.FormatError;
      }

    }

    exports.InputWaypointType = void 0;

    (function (InputWaypointType) {
      InputWaypointType[InputWaypointType["Invalid"] = 0] = "Invalid";
      InputWaypointType[InputWaypointType["GeoCoordinate"] = 1] = "GeoCoordinate";
      InputWaypointType[InputWaypointType["Timepoint"] = 2] = "Timepoint";
      InputWaypointType[InputWaypointType["Place"] = 3] = "Place";
    })(exports.InputWaypointType || (exports.InputWaypointType = {}));

    class InputValidation {
      /**
       * Checks if the value fits to a waypoint format
       * @param value The entered waypoint candidate
       * @returns AtsuStatusCodes.Ok if the format is valid
       */
      static validateScratchpadWaypoint(value) {
        if (value.match(/^(N|S)?([0-9]{2,4}\.[0-9])(N|S)?\/(E|W)?([0-9]{2,5}\.[0-9])(E|W)?$/) !== null) {
          return exports.AtsuStatusCodes.Ok;
        }

        if (/^[A-Z0-9]{1,5}$/.test(value)) {
          return exports.AtsuStatusCodes.Ok;
        }

        return exports.AtsuStatusCodes.FormatError;
      }
      /**
       * Checks if the value fits to a position format
       * @param value The entered position candidate
       * @returns AtsuStatusCodes.Ok if the format is valid
       */


      static validateScratchpadPosition(value) {
        if (/^[A-Z0-9]{1,10}$/.test(value)) {
          return exports.AtsuStatusCodes.Ok;
        }

        return exports.AtsuStatusCodes.FormatError;
      }
      /**
       * Checks if the value fits to a procedure format
       * @param value The entered procedure candidate
       * @returns AtsuStatusCodes.Ok if the format is valid
       */


      static validateScratchpadProcedure(value) {
        if (/^[A-Z0-9]{1,7}$/.test(value)) {
          return exports.AtsuStatusCodes.Ok;
        }

        return exports.AtsuStatusCodes.FormatError;
      }
      /**
       * Checks if the value fits to the time format
       * @param value The entered time candidate
       * @returns AtsuStatusCodes.Ok if the format is valid
       */


      static validateScratchpadTime(value) {
        let expectZulu = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        if (expectZulu && /^[0-9]{4}Z$/.test(value) || !expectZulu && /^[0-9]{4}$/.test(value)) {
          return exports.AtsuStatusCodes.Ok;
        }

        return exports.AtsuStatusCodes.FormatError;
      }
      /**
       * Checks if the value fits to the ATIS format
       * @param value The entered ATIS candidate
       * @returns AtsuStatusCodes.Ok if the format is valid
       */


      static validateScratchpadAtis(value) {
        if (/^[A-Z]{1}$/.test(value)) {
          return exports.AtsuStatusCodes.Ok;
        }

        return exports.AtsuStatusCodes.FormatError;
      }
      /**
       * Checks if the value fits to the degree format
       * @param value The entered degree candidate
       * @returns AtsuStatusCodes.Ok if the format is valid
       */


      static validateScratchpadDegree(value) {
        if (/^[0-9]{1,3}$/.test(value)) {
          const heading = parseInt(value);

          if (heading >= 0 && heading <= 360) {
            return exports.AtsuStatusCodes.Ok;
          }

          return exports.AtsuStatusCodes.EntryOutOfRange;
        }

        return exports.AtsuStatusCodes.FormatError;
      }
      /**
       * Checks if the value fits to the squawk format
       * @param value The entered squawk candidate
       * @returns AtsuStatusCodes.Ok if the format is valid
       */


      static validateScratchpadSquawk(value) {
        if (/^[0-9]{4}$/.test(value)) {
          const squawk = parseInt(value);

          if (squawk >= 0 && squawk < 7777) {
            return exports.AtsuStatusCodes.Ok;
          }

          return exports.AtsuStatusCodes.EntryOutOfRange;
        }

        return exports.AtsuStatusCodes.FormatError;
      }
      /**
       * Classifies a possible waypoint type of the scratchpad
       * Types:
       *   -  0 = lat-lon coordinate
       *   -  1 = time
       *   -  2 = place
       *   - -1 = unknonw
       * @param {FMCMainDisplay} mcdu The current MCDU instance
       * @param {string} waypoint The entered waypoint
       * @param {boolean} allowTime Indicates if time entries are allowed
       * @returns A tuple with the type and null or a NXSystemMessage-entry in case of a failure
       */


      static async classifyScratchpadWaypointType(mcdu, waypoint, allowTime) {
        if (mcdu.isLatLonFormat(waypoint)) {
          return [exports.InputWaypointType.GeoCoordinate, exports.AtsuStatusCodes.Ok];
        } // time formatted


        if (allowTime && /^([0-2][0-4][0-5][0-9]Z?)$/.test(waypoint)) {
          return [exports.InputWaypointType.Timepoint, exports.AtsuStatusCodes.Ok];
        } // place formatted


        if (/^[A-Z0-9]{2,7}/.test(waypoint)) {
          return mcdu.dataManager.GetWaypointsByIdent.bind(mcdu.dataManager)(waypoint).then(waypoints => {
            if (waypoints.length !== 0) {
              return [exports.InputWaypointType.Place, exports.AtsuStatusCodes.Ok];
            }

            return [exports.InputWaypointType.Invalid, exports.AtsuStatusCodes.NotInDatabase];
          });
        }

        return [exports.InputWaypointType.Invalid, exports.AtsuStatusCodes.FormatError];
      }
      /**
       * Validate a given VHF frequency that it fits to the 8.33 kHz-spacing
       * @param {string} value Frequency candidate
       * @returns null or a NXSystemMessages-entry in case of a failure
       */


      static validateVhfFrequency(value) {
        // valid frequency range: 118.000 - 136.975
        if (!/^1[1-3][0-9].[0-9]{2}[0|5]$/.test(value)) {
          return exports.AtsuStatusCodes.FormatError;
        }

        const elements = value.split('.');
        const before = parseInt(elements[0]);

        if (before < 118 || before > 136) {
          return exports.AtsuStatusCodes.EntryOutOfRange;
        } // TODO replace by REGEX
        // valid 8.33 kHz spacings


        const frequencySpacingOther = ['00', '05', '10', '15', '25', '30', '35', '40', '50', '55', '60', '65', '75', '80', '85', '90'];
        const frequencySpacingEnd = ['00', '05', '10', '15', '25', '30', '35', '40', '50', '55', '60', '65', '75']; // validate the correct frequency fraction

        const twoDigitFraction = elements[1].substring(1, elements[1].length);

        if (before === 136) {
          if (frequencySpacingEnd.findIndex(entry => entry === twoDigitFraction) === -1) {
            return exports.AtsuStatusCodes.EntryOutOfRange;
          }
        } else if (frequencySpacingOther.findIndex(entry => entry === twoDigitFraction) === -1) {
          return exports.AtsuStatusCodes.EntryOutOfRange;
        }

        return exports.AtsuStatusCodes.Ok;
      }
      /**
       * Validates a value that it is compatible with the FCOM format for altitudes and flight levels
       * @param {string} value The entered scratchpad altitude
       * @returns An AtsuStatusCodes-value
       */


      static validateScratchpadAltitude(value) {
        if (/^((FL)*[0-9]{1,3})$/.test(value)) {
          const flightlevel = parseInt(value.match(/([0-9]+)/)[0]);

          if (flightlevel >= 30 && flightlevel <= 410) {
            return exports.AtsuStatusCodes.Ok;
          }

          return exports.AtsuStatusCodes.EntryOutOfRange;
        }

        if (InputValidation.FANS === exports.FansMode.FansB) {
          return InputValidationFansB.validateScratchpadAltitude(value);
        }

        return InputValidationFansA.validateScratchpadAltitude(value);
      }
      /**
       * Checks if a string fits to the distance definition
       * @param distance The distance candidate
       * @returns AtsuStatusCodes.Ok if the format is valid
       */


      static validateScratchpadDistance(distance) {
        if (/^[0-9]{1,3}(NM|KM)$/.test(distance) || /^[0-9]{1,3}$/.test(distance)) {
          return exports.AtsuStatusCodes.Ok;
        }

        return exports.AtsuStatusCodes.FormatError;
      }
      /**
       * Validates a value that it is compatible with the FCOM format for lateral offsets
       * @param {string} value The entered scratchpad offset
       * @returns An AtsuStatusCodes-value
       */


      static validateScratchpadOffset(offset) {
        let nmUnit = true;
        let distance = 0;

        if (/^[LR][0-9]{1,3}(NM|KM)$/.test(offset) || /^[LR][0-9]{1,3}$/.test(offset)) {
          // format: DNNNKM, DNNNNM, DNNN
          distance = parseInt(offset.match(/([0-9]+)/)[0]);
          nmUnit = !offset.endsWith('KM');
        } else if (/^[0-9]{1,3}(NM|KM)[LR]$/.test(offset) || /^[0-9]{1,3}[LR]$/.test(offset)) {
          // format: NNNKMD, NNNNMD, NNND
          distance = parseInt(offset.match(/([0-9]+)/)[0]);
          nmUnit = !(offset.endsWith('KML') || offset.endsWith('KMR'));
        } else {
          return exports.AtsuStatusCodes.FormatError;
        } // validate the ranges


        if (nmUnit) {
          if (distance >= 1 && distance <= 128) {
            return exports.AtsuStatusCodes.Ok;
          }
        } else if (distance >= 1 && distance <= 256) {
          return exports.AtsuStatusCodes.Ok;
        }

        return exports.AtsuStatusCodes.EntryOutOfRange;
      }
      /**
       * Validates a value that it is compatible with the FCOM format for speeds
       * @param {string} value The entered scratchpad speed
       * @returns An AtsuStatusCodes-value
       */


      static validateScratchpadSpeed(value) {
        if (InputValidation.FANS === exports.FansMode.FansB) {
          return InputValidationFansB.validateScratchpadSpeed(value);
        }

        return InputValidationFansA.validateScratchpadSpeed(value);
      }
      /**
       * Validates a value that it is compatible with the FCOM format for vertical speeds
       * @param {string} value The entered scratchpad vertical speed
       * @returns An AtsuStatusCodes-value
       */


      static validateScratchpadVerticalSpeed(value) {
        if (/^(\+|-|M)?[0-9]{1,4}(FT\/MIN|FT|FTM|M\/MIN|MM|M){1}$/.test(value)) {
          let verticalSpeed = parseInt(value.match(/([0-9]+)/)[0]);

          if (value.startsWith('-') || value.startsWith('M')) {
            verticalSpeed *= -1;
          }

          if (!/(FT){1}/.test(value)) {
            if (verticalSpeed >= -2000 && verticalSpeed <= 2000) {
              return exports.AtsuStatusCodes.Ok;
            }
          } else if (verticalSpeed >= -6000 && verticalSpeed <= 6000) {
            return exports.AtsuStatusCodes.Ok;
          }

          return exports.AtsuStatusCodes.EntryOutOfRange;
        }

        return exports.AtsuStatusCodes.FormatError;
      }
      /**
       * Validates that two speed entries describe the same (knots or mach)
       * @param {string} lower Lower speed value
       * @param {string} higher Higher speed value
       * @returns True if both are same type else false
       */


      static sameSpeedType(lower, higher) {
        if (lower[0] === 'M' && higher[0] === 'M') {
          return true;
        }

        if (lower[0] === 'M' || higher[0] === 'M') {
          return false;
        }

        return true;
      }
      /**
       * Validates that a scratchpad entry follows the FCOM definition for speed ranges
       * @param {string} Given speed range candidate
       * @returns An array of AtsuStatusCodes-value and the speed ranges
       */


      static validateScratchpadSpeedRanges(value) {
        const entries = value.split('/');

        if (entries.length !== 2) {
          return [exports.AtsuStatusCodes.FormatError, []];
        }

        if (InputValidation.validateScratchpadSpeed(entries[0]) || InputValidation.validateScratchpadSpeed(entries[1])) {
          let error = InputValidation.validateScratchpadSpeed(entries[0]);

          if (error) {
            return [error, []];
          }

          error = this.validateScratchpadSpeed(entries[1]);
          return [error, []];
        }

        const lower = InputValidation.formatScratchpadSpeed(entries[0]);
        const higher = InputValidation.formatScratchpadSpeed(entries[1]);

        if (!InputValidation.sameSpeedType(lower, higher)) {
          return [exports.AtsuStatusCodes.FormatError, []];
        }

        if (parseInt(lower.match(/([0-9]+)/)[0]) >= parseInt(higher.match(/([0-9]+)/)[0])) {
          return [exports.AtsuStatusCodes.EntryOutOfRange, []];
        }

        return [exports.AtsuStatusCodes.Ok, [lower, higher]];
      }
      /**
       * Formats a scratchpad to a standard altitude string
       * @param {string} value The entered valid altitude
       * @returns Formatted string or empty string in case of a failure
       */


      static formatScratchpadAltitude(value) {
        if (value.startsWith('FL') || value.endsWith('M') || value.endsWith('FT')) {
          return value;
        }

        const altitude = parseInt(value);

        if (altitude >= 30 && altitude <= 410) {
          return "FL".concat(value);
        }

        return "".concat(value, "FT");
      }
      /**
       * Formats a scratchpad entry to the standard speed description
       * @param {string} value Valid speed entry
       * @returns The formatted speed string
       */


      static formatScratchpadSpeed(value) {
        if (value[0] === 'M' || value[0] === '.') {
          return "M.".concat(value.match(/([0-9]+)/)[0]);
        }

        return value.replace('KT', '');
      }
      /**
       * Validates a value that it is compatible with the FCOM format for vertical speeds
       * @param {string} value The entered scratchpad vertical speed
       * @returns An AtsuStatusCodes-value
       */


      static formatScratchpadVerticalSpeed(value) {
        let verticalSpeed = parseInt(value.match(/([0-9]+)/)[0]);

        if (value.startsWith('-') || value.startsWith('M')) {
          verticalSpeed *= -1;
        }

        if (!/(FT){1}/.test(value)) {
          return "".concat(verticalSpeed, "MM");
        }

        return "".concat(verticalSpeed, "FTM");
      }
      /**
       * Validates that two altitude entries describe the same (FL, feet or meters)
       * @param {string} lower Lower altitude value
       * @param {string} higher Higher altitude value
       * @returns True if both are same type else false
       */


      static sameAltitudeType(lower, higher) {
        if (lower.startsWith('FL') && higher.startsWith('FL')) {
          return true;
        }

        if (lower.startsWith('FL') || higher.startsWith('FL')) {
          return false;
        }

        if (lower[lower.length - 1] === 'M' && higher[higher.length - 1] === 'M' || lower[lower.length - 1] !== 'M' && higher[higher.length - 1] !== 'M') {
          return true;
        }

        return false;
      }
      /**
       * Converts a given altitude into foot
       * @param value The altitude that needs to be converted
       * @returns The altitude in feet
       */


      static convertToFeet(value) {
        const height = parseInt(value.match(/([0-9]+)/)[0]);

        if (value.startsWith('FL')) {
          return height * 100;
        }

        if (value[value.length - 1] === 'M') {
          return height * 3.28;
        }

        if (value.endsWith('FT')) {
          return height;
        }

        if (height < 1000) return height * 100;
        return height;
      }
      /**
       * Validates that lower is smaller than higher
       * @param {string} lower Lower altitude value
       * @param {string} higher Higher altitude value
       * @returns True if lower is smaller than higher, else false
       */


      static validateAltitudeRange(lower, higher) {
        if (!InputValidation.sameAltitudeType(lower, higher)) return exports.AtsuStatusCodes.FormatError;
        const errorLower = InputValidation.validateScratchpadAltitude(lower);
        if (errorLower !== exports.AtsuStatusCodes.Ok) return errorLower;
        const errorHigher = InputValidation.validateScratchpadAltitude(higher);
        if (errorHigher !== exports.AtsuStatusCodes.Ok) return errorHigher;
        const lowerFt = InputValidation.convertToFeet(lower);
        const higherFt = InputValidation.convertToFeet(higher);
        if (lowerFt >= higherFt) return exports.AtsuStatusCodes.EntryOutOfRange;
        return exports.AtsuStatusCodes.Ok;
      }
      /**
       * Validates the persons on board
       * @param {string} value The persons on board
       * @returns AtsuStatusCodes.Ok if the value is valid
       */


      static validateScratchpadPersonsOnBoard(value) {
        if (/^[0-9]{1,4}$/.test(value)) {
          const pob = parseInt(value.match(/([0-9]+)/)[0]);

          if (pob >= 1 && pob <= 1024) {
            return exports.AtsuStatusCodes.Ok;
          }

          return exports.AtsuStatusCodes.EntryOutOfRange;
        }

        return exports.AtsuStatusCodes.FormatError;
      }
      /**
       * Validates the endurance
       * @param {string} value The entered endurance
       * @returns AtsuStatusCodes.Ok if the value is valid
       */


      static validateScratchpadEndurance(value) {
        if (/^([0-9]{1}H|[0-9]{2}(H)*)[0-9]{2}(M|MIN|MN)*$/.test(value)) {
          const matches = value.match(/[0-9]{1,2}/g);
          const hours = parseInt(matches[0]);

          if (hours < 0 || hours >= 24) {
            return exports.AtsuStatusCodes.EntryOutOfRange;
          }

          const minutes = parseInt(matches[1]);

          if (minutes < 0 || minutes >= 60) {
            return exports.AtsuStatusCodes.EntryOutOfRange;
          }

          return exports.AtsuStatusCodes.Ok;
        }

        return exports.AtsuStatusCodes.FormatError;
      }
      /**
       * Validates the temparture
       * @param {string} value The entered temperature
       * @returns AtsuStatusCodes.Ok if the value is valid
       */


      static validateScratchpadTemperature(value) {
        if (/^[-+M]?[0-9]{1,3}[CF]?$/.test(value)) {
          const negative = value.startsWith('-') || value.startsWith('M');
          const fahrenheit = value.endsWith('F');
          let temperature = parseInt(value.match(/([0-9]+)/)[0]);

          if (negative) {
            temperature *= -1;
          }

          if (fahrenheit && temperature >= -105 && temperature <= 150) {
            return exports.AtsuStatusCodes.Ok;
          }

          if (!fahrenheit && (temperature >= 80 || temperature < 47)) {
            return exports.AtsuStatusCodes.Ok;
          }

          return exports.AtsuStatusCodes.EntryOutOfRange;
        }

        return exports.AtsuStatusCodes.FormatError;
      }
      /**
       * Validates the wind data
       * @param {string} value The entered wind data
       * @returns AtsuStatusCodes.Ok if the value is valid
       */


      static validateScratchpadWind(value) {
        if (/^[0-9]{1,3}\/[0-9]{1,3}(KT|KM)?$/.test(value)) {
          const numbers = value.match(/([0-9]+)/g);
          const direction = parseInt(numbers[0]);
          const speed = parseInt(numbers[1]);

          if (direction < 1 || direction > 360 || speed < 0 || speed > 255) {
            return exports.AtsuStatusCodes.EntryOutOfRange;
          }

          return exports.AtsuStatusCodes.Ok;
        }

        return exports.AtsuStatusCodes.FormatError;
      }
      /**
       * Converts an FCOM valid encoded offset string to a list of offset entries
       * @param {string} offset Valid encoded offset
       * @returns The decoded offset entries
       */


      static decodeOffsetString(offset) {
        let nmUnit = true;
        let left = false;
        let distance;

        if (/^[LR][0-9]{1,3}(NM|KM)$/.test(offset) || /^[LR][0-9]{1,3}$/.test(offset)) {
          // format: DNNNKM, DNNNNM, DNNN
          // contains not only numbers
          distance = offset.replace(/NM|KM/, '').replace(/L|R/, '');

          if (/(?!^\d+$)^.+$/.test(distance)) {
            return [];
          }

          distance = parseInt(distance);
          nmUnit = !offset.endsWith('KM');
          left = offset[0] === 'L';
        } else if (/[0-9]{1,3}(NM|KM)[LR]/.test(offset) || /[0-9]{1,3}[LR]/.test(offset)) {
          // format: NNNKMD, NNNNMD, NNND
          // contains not only numbers
          distance = offset.replace(/NM|KM/, '').replace(/L|R/, '');

          if (/(?!^\d+$)^.+$/.test(distance)) {
            return null;
          }

          distance = parseInt(distance);
          nmUnit = !(offset.endsWith('KML') || offset.endsWith('KMR'));
          left = offset[offset.length - 1] === 'L';
        }

        return [distance.toString(), nmUnit ? 'NM' : 'KM', left ? 'L' : 'R'];
      }
      /**
       * Formats a valid scratchpad offset to a normalized temperature entry
       * @param {string} value The entered temperature
       * @returns The formatted temperature
       */


      static formatScratchpadTemperature(value) {
        const negative = value.startsWith('-') || value.startsWith('M');
        const fahrenheit = value.endsWith('F');
        let temperature = parseInt(value.match(/([0-9]+)/)[0]);

        if (negative) {
          temperature *= -1;
        }

        return "".concat(temperature).concat(fahrenheit ? 'F' : 'C');
      }
      /**
       * Normalizes the wind data
       * @param {string} value The entered wind data
       * @returns The normalized wind data
       */


      static formatScratchpadWind(value) {
        const numbers = value.match(/([0-9]+)/g);
        const direction = parseInt(numbers[0]);
        const speed = parseInt(numbers[1]);
        const kilometers = value.endsWith('M');
        return "".concat(direction.toString().padStart(3, '0'), "/").concat(speed.toString().padStart(3, '0')).concat(kilometers ? 'KM' : 'KT');
      }
      /**
       * Formats a valid scratchpad offset to a normalized offset entry
       * @param {string} value The scratchpad entry
       * @returns The normalized offset entry
       */


      static formatScratchpadOffset(value) {
        const entries = InputValidation.decodeOffsetString(value);
        return "".concat(entries[0]).concat(entries[1]).concat(entries[2]);
      }
      /**
       * Formats a valid scratchpad endurance entry to a normalized offset entry
       * @param {string} value The scratchpad entry
       * @returns The normalized offset entry
       */


      static formatScratchpadEndurance(value) {
        const matches = value.match(/[0-9]{1,2}/g);
        const hours = parseInt(matches[0]);
        const minutes = parseInt(matches[1]);
        return "".concat(hours, "H").concat(minutes);
      }
      /**
       * Expands a lateral offset encoded string into an expanded version
       * @param {string} offset The valid offset value
       * @returns The expanded lateral offset
       */


      static expandLateralOffset(offset) {
        const entries = InputValidation.decodeOffsetString(offset);
        return "".concat(entries[0]).concat(entries[1], " ").concat(entries[2] === 'L' ? 'LEFT' : 'RIGHT');
      }
      /**
       * Formats a valid scratchpad distance entry to a normalized distance entry
       * @param {string} value The scratchpad entry
       * @returns The normalized distance entry
       */


      static formatScratchpadDistance(distance) {
        if (distance.endsWith('NM') || distance.endsWith('KM')) {
          return distance;
        }

        return "".concat(distance, "NM");
      }

    }

    _defineProperty(InputValidation, "FANS", exports.FansMode.FansNone);

    exports.CpdlcMessageExpectedResponseType = void 0;

    (function (CpdlcMessageExpectedResponseType) {
      CpdlcMessageExpectedResponseType["NotRequired"] = "NE";
      CpdlcMessageExpectedResponseType["WilcoUnable"] = "WU";
      CpdlcMessageExpectedResponseType["AffirmNegative"] = "AN";
      CpdlcMessageExpectedResponseType["Roger"] = "R";
      CpdlcMessageExpectedResponseType["No"] = "N";
      CpdlcMessageExpectedResponseType["Yes"] = "Y";
    })(exports.CpdlcMessageExpectedResponseType || (exports.CpdlcMessageExpectedResponseType = {}));

    exports.CpdlcMessageContentType = void 0;

    (function (CpdlcMessageContentType) {
      CpdlcMessageContentType[CpdlcMessageContentType["Unknown"] = 0] = "Unknown";
      CpdlcMessageContentType[CpdlcMessageContentType["Level"] = 1] = "Level";
      CpdlcMessageContentType[CpdlcMessageContentType["Position"] = 2] = "Position";
      CpdlcMessageContentType[CpdlcMessageContentType["Time"] = 3] = "Time";
      CpdlcMessageContentType[CpdlcMessageContentType["Direction"] = 4] = "Direction";
      CpdlcMessageContentType[CpdlcMessageContentType["Distance"] = 5] = "Distance";
      CpdlcMessageContentType[CpdlcMessageContentType["Speed"] = 6] = "Speed";
      CpdlcMessageContentType[CpdlcMessageContentType["Frequency"] = 7] = "Frequency";
      CpdlcMessageContentType[CpdlcMessageContentType["Procedure"] = 8] = "Procedure";
      CpdlcMessageContentType[CpdlcMessageContentType["Degree"] = 9] = "Degree";
      CpdlcMessageContentType[CpdlcMessageContentType["VerticalRate"] = 10] = "VerticalRate";
      CpdlcMessageContentType[CpdlcMessageContentType["LegType"] = 11] = "LegType";
      CpdlcMessageContentType[CpdlcMessageContentType["LegTypeDistance"] = 12] = "LegTypeDistance";
      CpdlcMessageContentType[CpdlcMessageContentType["LegTypeTime"] = 13] = "LegTypeTime";
      CpdlcMessageContentType[CpdlcMessageContentType["AtcUnit"] = 14] = "AtcUnit";
      CpdlcMessageContentType[CpdlcMessageContentType["Squawk"] = 15] = "Squawk";
      CpdlcMessageContentType[CpdlcMessageContentType["Altimeter"] = 16] = "Altimeter";
      CpdlcMessageContentType[CpdlcMessageContentType["Atis"] = 17] = "Atis";
      CpdlcMessageContentType[CpdlcMessageContentType["Fuel"] = 18] = "Fuel";
      CpdlcMessageContentType[CpdlcMessageContentType["PersonsOnBoard"] = 19] = "PersonsOnBoard";
      CpdlcMessageContentType[CpdlcMessageContentType["Freetext"] = 20] = "Freetext";
    })(exports.CpdlcMessageContentType || (exports.CpdlcMessageContentType = {}));

    class CpdlcMessageContent {
      constructor(type) {
        _defineProperty(this, "Type", exports.CpdlcMessageContentType.Unknown);

        _defineProperty(this, "IndexStart", -1);

        _defineProperty(this, "IndexEnd", -1);

        _defineProperty(this, "Monitoring", false);

        _defineProperty(this, "Value", '');

        this.Type = type;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        args.forEach(arg => {
          if (typeof arg === 'number') {
            if (this.IndexStart === -1) {
              this.IndexStart = arg;
            } else {
              this.IndexEnd = arg;
            }
          } else if (typeof arg === 'boolean') {
            this.Monitoring = arg;
          } else if (typeof arg === 'string') {
            this.Value = arg;
          }
        });
      }

      static createInstance(type) {
        switch (type) {
          case exports.CpdlcMessageContentType.Level:
            return new CpdlcMessageContentLevel(0);

          case exports.CpdlcMessageContentType.Position:
            return new CpdlcMessageContentPosition(0);

          case exports.CpdlcMessageContentType.Time:
            return new CpdlcMessageContentTime(0);

          case exports.CpdlcMessageContentType.Direction:
            return new CpdlcMessageContentDirection(0);

          case exports.CpdlcMessageContentType.Distance:
            return new CpdlcMessageContentDistance(0);

          case exports.CpdlcMessageContentType.Speed:
            return new CpdlcMessageContentSpeed(0);

          case exports.CpdlcMessageContentType.Frequency:
            return new CpdlcMessageContentFrequency(0);

          case exports.CpdlcMessageContentType.Procedure:
            return new CpdlcMessageContentProcedure(0);

          case exports.CpdlcMessageContentType.Degree:
            return new CpdlcMessageContentDegree(0);

          case exports.CpdlcMessageContentType.VerticalRate:
            return new CpdlcMessageContentVerticalRate(0);

          case exports.CpdlcMessageContentType.LegType:
            return new CpdlcMessageContentLegType(0);

          case exports.CpdlcMessageContentType.LegTypeDistance:
            return new CpdlcMessageContentLegTypeDistance(0);

          case exports.CpdlcMessageContentType.LegTypeTime:
            return new CpdlcMessageContentLegTypeTime(0);

          case exports.CpdlcMessageContentType.AtcUnit:
            return new CpdlcMessageContentAtcUnit(0);

          case exports.CpdlcMessageContentType.Squawk:
            return new CpdlcMessageContentSquawk(0);

          case exports.CpdlcMessageContentType.Altimeter:
            return new CpdlcMessageContentAltimeter(0);

          case exports.CpdlcMessageContentType.Atis:
            return new CpdlcMessageContentAtis(0);

          case exports.CpdlcMessageContentType.Fuel:
            return new CpdlcMessageContentFuel(0);

          case exports.CpdlcMessageContentType.PersonsOnBoard:
            return new CpdlcMessageContentPersonsOnBoard(0);

          case exports.CpdlcMessageContentType.Freetext:
            return new CpdlcMessageContentFreetext(0, 0);

          default:
            return null;
        }
      }

      deserialize(jsonData) {
        this.Type = jsonData.Type;
        this.IndexStart = jsonData.IndexStart;
        this.IndexEnd = jsonData.IndexEnd;
        this.Value = jsonData.Value;
        this.Monitoring = jsonData.Monitoring;
      }

    }
    class CpdlcMessageContentLevel extends CpdlcMessageContent {
      constructor() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        super(exports.CpdlcMessageContentType.Level, ...args);
      }

      validateAndReplaceContent(value) {
        let retval = false;

        if (this.IndexStart < value.length && this.IndexStart > -1) {
          retval = InputValidation.validateScratchpadAltitude(value[this.IndexStart]) === exports.AtsuStatusCodes.Ok;

          if (retval) {
            this.Value = value[this.IndexStart];
            value[this.IndexStart] = '%s';
          }
        }

        if (!retval && this.IndexEnd < value.length && this.IndexEnd > -1) {
          retval = InputValidation.validateScratchpadAltitude(value[this.IndexEnd]) === exports.AtsuStatusCodes.Ok;

          if (retval) {
            this.Value = value[this.IndexEnd];
            value[this.IndexEnd] = '%s';
          }
        }

        return {
          matched: retval,
          remaining: value
        };
      }

    }
    class CpdlcMessageContentPosition extends CpdlcMessageContent {
      constructor() {
        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        super(exports.CpdlcMessageContentType.Position, ...args);
      }

      validateAndReplaceContent(value) {
        let retval = false;

        if (this.IndexStart < value.length && this.IndexStart > -1) {
          if (InputValidation.validateScratchpadWaypoint(value[this.IndexStart]) === exports.AtsuStatusCodes.Ok && InputValidation.validateScratchpadTime(value[this.IndexStart], true) !== exports.AtsuStatusCodes.Ok && InputValidation.validateScratchpadTime(value[this.IndexStart], false) !== exports.AtsuStatusCodes.Ok) {
            this.Value = value[this.IndexStart];
            value[this.IndexStart] = '%s';
            retval = true;
          }
        }

        return {
          matched: retval,
          remaining: value
        };
      }

    }
    class CpdlcMessageContentTime extends CpdlcMessageContent {
      constructor() {
        for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }

        super(exports.CpdlcMessageContentType.Time, ...args);
      }

      validateAndReplaceContent(value) {
        let retval = false;

        if (this.IndexStart < value.length && this.IndexStart > -1) {
          if (InputValidation.validateScratchpadTime(value[this.IndexStart], true) === exports.AtsuStatusCodes.Ok) {
            this.Value = value[this.IndexStart];
            value[this.IndexStart] = '%s';
            retval = true;
          } else if (InputValidation.validateScratchpadTime(value[this.IndexStart], false) === exports.AtsuStatusCodes.Ok) {
            this.Value = "".concat(value[this.IndexStart], "Z");
            value[this.IndexStart] = '%s';
            retval = true;
          }
        }

        return {
          matched: retval,
          remaining: value
        };
      }

    }
    class CpdlcMessageContentDirection extends CpdlcMessageContent {
      constructor() {
        for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
          args[_key5] = arguments[_key5];
        }

        super(exports.CpdlcMessageContentType.Direction, ...args);
      }

      validateAndReplaceContent(value) {
        let retval = false;

        if (this.IndexStart < value.length && this.IndexStart > -1) {
          if (value[this.IndexStart] === 'LEFT' || value[this.IndexStart] === 'RIGHT') {
            this.Value = value[this.IndexStart];
            value[this.IndexStart] = '%s';
            retval = true;
          }
        }

        return {
          matched: retval,
          remaining: value
        };
      }

    }
    class CpdlcMessageContentDistance extends CpdlcMessageContent {
      constructor() {
        for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
          args[_key6] = arguments[_key6];
        }

        super(exports.CpdlcMessageContentType.Distance, ...args);
      }

      validateAndReplaceContent(value) {
        let retval = false;

        if (this.IndexStart < value.length && this.IndexStart > -1) {
          if (InputValidation.validateScratchpadDistance(value[this.IndexStart]) === exports.AtsuStatusCodes.Ok) {
            this.Value = value[this.IndexStart];
            value[this.IndexStart] = '%s';
            retval = true;
          }
        }

        return {
          matched: retval,
          remaining: value
        };
      }

    }
    class CpdlcMessageContentSpeed extends CpdlcMessageContent {
      constructor() {
        for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
          args[_key7] = arguments[_key7];
        }

        super(exports.CpdlcMessageContentType.Speed, ...args);
      }

      validateAndReplaceContent(value) {
        let retval = false;

        if (this.IndexStart < value.length && this.IndexStart > -1) {
          if (InputValidation.validateScratchpadSpeed(value[this.IndexStart]) === exports.AtsuStatusCodes.Ok) {
            this.Value = value[this.IndexStart];
            value[this.IndexStart] = '%s';
            retval = true;
          }
        }

        return {
          matched: retval,
          remaining: value
        };
      }

    }
    class CpdlcMessageContentFrequency extends CpdlcMessageContent {
      constructor() {
        for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
          args[_key8] = arguments[_key8];
        }

        super(exports.CpdlcMessageContentType.Frequency, ...args);
      }

      validateAndReplaceContent(value) {
        let retval = false;

        if (this.IndexStart < value.length && this.IndexStart > -1) {
          if (InputValidation.validateVhfFrequency(value[this.IndexStart]) === exports.AtsuStatusCodes.Ok) {
            this.Value = value[this.IndexStart];
            value[this.IndexStart] = '%s';
            retval = true;
          }
        }

        return {
          matched: retval,
          remaining: value
        };
      }

    }
    class CpdlcMessageContentProcedure extends CpdlcMessageContent {
      constructor() {
        for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
          args[_key9] = arguments[_key9];
        }

        super(exports.CpdlcMessageContentType.Procedure, ...args);
      }

      validateAndReplaceContent(value) {
        let retval = false;

        if (this.IndexStart < value.length && this.IndexStart > -1) {
          if (InputValidation.validateScratchpadProcedure(value[this.IndexStart]) === exports.AtsuStatusCodes.Ok) {
            this.Value = value[this.IndexStart];
            value[this.IndexStart] = '%s';
            retval = true;
          }
        }

        return {
          matched: retval,
          remaining: value
        };
      }

    }
    class CpdlcMessageContentDegree extends CpdlcMessageContent {
      constructor() {
        for (var _len10 = arguments.length, args = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
          args[_key10] = arguments[_key10];
        }

        super(exports.CpdlcMessageContentType.Degree, ...args);
      }

      validateAndReplaceContent(value) {
        let retval = false;

        if (this.IndexStart < value.length && this.IndexStart > -1) {
          if (InputValidation.validateScratchpadDegree(value[this.IndexStart]) === exports.AtsuStatusCodes.Ok) {
            this.Value = value[this.IndexStart];
            value[this.IndexStart] = '%s';
            retval = true;
          }
        }

        return {
          matched: retval,
          remaining: value
        };
      }

    }
    class CpdlcMessageContentVerticalRate extends CpdlcMessageContent {
      constructor() {
        for (var _len11 = arguments.length, args = new Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
          args[_key11] = arguments[_key11];
        }

        super(exports.CpdlcMessageContentType.VerticalRate, ...args);
      }

      validateAndReplaceContent(value) {
        let retval = false;

        if (this.IndexStart + 3 < value.length && this.IndexStart > -1) {
          if (value[this.IndexStart + 1] === 'FEET' && value[this.IndexStart + 2] === 'PER' && value[this.IndexStart + 3] === 'MINUTE') {
            this.Value = "".concat(value[this.IndexStart], " FEET PER MINUTE");
            value[this.IndexStart] = '%s';
            value.slice(this.IndexStart + 1, 3);
            retval = true;
          }
        }

        return {
          matched: retval,
          remaining: value
        };
      }

    }
    class CpdlcMessageContentAtcUnit extends CpdlcMessageContent {
      constructor() {
        for (var _len12 = arguments.length, args = new Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
          args[_key12] = arguments[_key12];
        }

        super(exports.CpdlcMessageContentType.AtcUnit, ...args);
      }

      validateAndReplaceContent(value) {
        let retval = false;

        if (this.IndexStart < value.length && this.IndexStart > -1) {
          if (this.IndexStart + 1 < value.length && value[this.IndexStart + 1] === 'CTR') {
            this.Value = "".concat(value[this.IndexStart], " ").concat(value[this.IndexStart + 1]);
            value.splice(this.IndexStart + 1, 1);
          } else {
            this.Value = value[this.IndexStart];
          }

          value[this.IndexStart] = '%s';
          retval = true;
        }

        return {
          matched: retval,
          remaining: value
        };
      }

    }
    class CpdlcMessageContentSquawk extends CpdlcMessageContent {
      constructor() {
        for (var _len13 = arguments.length, args = new Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
          args[_key13] = arguments[_key13];
        }

        super(exports.CpdlcMessageContentType.Squawk, ...args);
      }

      validateAndReplaceContent(value) {
        let retval = false;

        if (this.IndexStart < value.length && this.IndexStart > -1 && /^[0-9]{4}$/.test(value[this.IndexStart])) {
          const squawk = parseInt(value[this.IndexStart]);

          if (squawk >= 0 && squawk < 7777) {
            this.Value = value[this.IndexStart];
            value[this.IndexStart] = '%s';
            retval = true;
          }
        }

        return {
          matched: retval,
          remaining: value
        };
      }

    }
    class CpdlcMessageContentFreetext extends CpdlcMessageContent {
      constructor() {
        for (var _len14 = arguments.length, args = new Array(_len14), _key14 = 0; _key14 < _len14; _key14++) {
          args[_key14] = arguments[_key14];
        }

        super(exports.CpdlcMessageContentType.Freetext, ...args);
      }

      validateAndReplaceContent(value) {
        let retval = false;

        if (this.IndexStart < value.length && this.IndexStart > -1) {
          this.Value = value.slice(this.IndexStart, this.IndexEnd === -1 ? value.length : this.IndexEnd + 1).join(' ');
          value = value.slice(0, this.IndexStart);
          value.push('%s');
          retval = true;
        }

        return {
          matched: retval,
          remaining: value
        };
      }

    }
    class CpdlcMessageContentLegTypeDistance extends CpdlcMessageContent {
      constructor() {
        for (var _len15 = arguments.length, args = new Array(_len15), _key15 = 0; _key15 < _len15; _key15++) {
          args[_key15] = arguments[_key15];
        }

        super(exports.CpdlcMessageContentType.LegTypeDistance, ...args);
      }

      validateAndReplaceContent(value) {
        let retval = false;

        if (this.IndexStart < value.length && this.IndexStart > -1) {
          if (/^[0-9]{1,2}$/.test(value[this.IndexStart])) {
            const distance = parseInt(value[this.IndexStart]);

            if (distance >= 1 && distance < 100) {
              this.Value = value[this.IndexStart];
              value[this.IndexStart] = '%s';
              retval = true;
            }
          }
        }

        return {
          matched: retval,
          remaining: value
        };
      }

    }
    class CpdlcMessageContentLegTypeTime extends CpdlcMessageContent {
      constructor() {
        for (var _len16 = arguments.length, args = new Array(_len16), _key16 = 0; _key16 < _len16; _key16++) {
          args[_key16] = arguments[_key16];
        }

        super(exports.CpdlcMessageContentType.LegTypeTime, ...args);
      }

      validateAndReplaceContent(value) {
        let retval = false;

        if (this.IndexStart + 1 < value.length && this.IndexStart > -1 && /^[0-9]{1}$/.test(value[this.IndexStart])) {
          if (value[this.IndexStart + 1] === 'MIN' || value[this.IndexStart + 1] === 'MINS' || value[this.IndexStart + 1] === 'MINUTES') {
            const minutes = parseInt(value[this.IndexStart]);

            if (minutes >= 1 && minutes < 10) {
              this.Value = value[this.IndexStart];
              value[this.IndexStart] = '%s';
              retval = true;
            }
          }
        }

        return {
          matched: retval,
          remaining: value
        };
      }

    }
    class CpdlcMessageContentLegType extends CpdlcMessageContent {
      constructor() {
        for (var _len17 = arguments.length, args = new Array(_len17), _key17 = 0; _key17 < _len17; _key17++) {
          args[_key17] = arguments[_key17];
        }

        super(exports.CpdlcMessageContentType.LegType, ...args);

        _defineProperty(this, "legDistance", void 0);

        _defineProperty(this, "legTime", void 0);

        this.legDistance = new CpdlcMessageContentLegTypeDistance(...args);
        this.legTime = new CpdlcMessageContentLegTypeTime(...args);
      }

      validateAndReplaceContent(value) {
        const legTimeRetval = this.legTime.validateAndReplaceContent(value);

        if (legTimeRetval.matched === true) {
          return legTimeRetval;
        }

        return this.legDistance.validateAndReplaceContent(value);
      }

    }
    class CpdlcMessageContentAltimeter extends CpdlcMessageContent {
      constructor() {
        for (var _len18 = arguments.length, args = new Array(_len18), _key18 = 0; _key18 < _len18; _key18++) {
          args[_key18] = arguments[_key18];
        }

        super(exports.CpdlcMessageContentType.Altimeter, ...args);
      }

      validateAndReplaceContent(value) {
        let retval = false;

        if (this.IndexStart >= 1 && this.IndexStart < value.length && this.IndexStart > -1) {
          if (value[this.IndexStart - 1] === 'ALTIMETER' && /^[0-9]{2}\.[0-9]{2}$/.test(value[this.IndexStart])) {
            retval = true;
          } else if (value[this.IndexStart - 1] === 'QNH' && /^[0-9]{3,4}$/.test(value[this.IndexStart])) {
            retval = true;
          }

          if (retval === true) {
            this.Value = value[this.IndexStart];
            value[this.IndexStart] = '%s';
          }
        }

        return {
          matched: retval,
          remaining: value
        };
      }

    }
    class CpdlcMessageContentAtis extends CpdlcMessageContent {
      constructor() {
        for (var _len19 = arguments.length, args = new Array(_len19), _key19 = 0; _key19 < _len19; _key19++) {
          args[_key19] = arguments[_key19];
        }

        super(exports.CpdlcMessageContentType.Atis, ...args);
      }

      validateAndReplaceContent(value) {
        let retval = false;

        if (this.IndexStart < value.length && this.IndexStart > -1) {
          if (/^[A-Z]{1}$/.test(value[this.IndexStart])) {
            this.Value = value[this.IndexStart];
            value[this.IndexStart] = '%s';
            retval = true;
          }
        }

        return {
          matched: retval,
          remaining: value
        };
      }

    }
    class CpdlcMessageContentFuel extends CpdlcMessageContent {
      constructor() {
        for (var _len20 = arguments.length, args = new Array(_len20), _key20 = 0; _key20 < _len20; _key20++) {
          args[_key20] = arguments[_key20];
        }

        super(exports.CpdlcMessageContentType.Fuel, ...args);
      }

      validateAndReplaceContent(value) {
        let retval = false;

        if (this.IndexStart < value.length && this.IndexStart > -1) {
          if (/^[0-9]{1,6}$/.test(value[this.IndexStart])) {
            this.Value = value[this.IndexStart];
            value[this.IndexStart] = '%s';
            retval = true;
          }
        }

        return {
          matched: retval,
          remaining: value
        };
      }

    }
    class CpdlcMessageContentPersonsOnBoard extends CpdlcMessageContent {
      constructor() {
        for (var _len21 = arguments.length, args = new Array(_len21), _key21 = 0; _key21 < _len21; _key21++) {
          args[_key21] = arguments[_key21];
        }

        super(exports.CpdlcMessageContentType.PersonsOnBoard, ...args);
      }

      validateAndReplaceContent(value) {
        let retval = false;

        if (this.IndexStart < value.length && this.IndexStart > -1) {
          if (/^[0-9]{1,3}$/.test(value[this.IndexStart])) {
            this.Value = value[this.IndexStart];
            value[this.IndexStart] = '%s';
            retval = true;
          }
        }

        return {
          matched: retval,
          remaining: value
        };
      }

    }
    class CpdlcMessageElement {
      constructor(typeId) {
        _defineProperty(this, "TypeId", '');

        _defineProperty(this, "FansModes", []);

        _defineProperty(this, "Urgent", false);

        _defineProperty(this, "Content", []);

        _defineProperty(this, "ExpectedResponse", exports.CpdlcMessageExpectedResponseType.No);

        this.TypeId = typeId;

        for (var _len22 = arguments.length, args = new Array(_len22 > 1 ? _len22 - 1 : 0), _key22 = 1; _key22 < _len22; _key22++) {
          args[_key22 - 1] = arguments[_key22];
        }

        args.forEach(arg => {
          if (arg instanceof Array && arg[0] instanceof CpdlcMessageContent) this.Content = arg;else if (typeof arg === 'boolean') this.Urgent = arg;else if (arg instanceof Array) this.FansModes = arg;else if (typeof arg === 'string') this.ExpectedResponse = arg;else console.log("Unknown arg: ".concat(arg, ", type: ").concat(typeof arg));
        });
      }

      deepCopy() {
        const instance = new CpdlcMessageElement(this.TypeId, this.FansModes, this.Urgent, this.ExpectedResponse);
        this.Content.forEach(entry => {
          instance.Content.push(CpdlcMessageContent.createInstance(entry.Type));
          instance.Content[instance.Content.length - 1].IndexStart = entry.IndexStart;
          instance.Content[instance.Content.length - 1].IndexEnd = entry.IndexEnd;
          instance.Content[instance.Content.length - 1].Value = entry.Value;
          instance.Content[instance.Content.length - 1].Monitoring = entry.Monitoring;
        });
        return instance;
      }

      deserialize(jsonData) {
        this.TypeId = jsonData.TypeId;
        this.FansModes = jsonData.FansModes;
        this.Urgent = jsonData.Urgent;
        jsonData.Content.forEach(entry => {
          this.Content.push(CpdlcMessageContent.createInstance(entry.Type));
          this.Content[this.Content.length - 1].deserialize(entry);
        });
        this.ExpectedResponse = jsonData.ExpectedResponse;
      }

    }
    const CpdlcMessagesDownlink = {
      DM0: [['WILCO'], new CpdlcMessageElement('DM0', [exports.FansMode.FansA, exports.FansMode.FansB])],
      DM1: [['UNABLE'], new CpdlcMessageElement('DM1', [exports.FansMode.FansA, exports.FansMode.FansB])],
      DM2: [['STANDBY'], new CpdlcMessageElement('DM2', [exports.FansMode.FansA, exports.FansMode.FansB])],
      DM3: [['ROGER'], new CpdlcMessageElement('DM3', [exports.FansMode.FansA, exports.FansMode.FansB])],
      DM4: [['AFFIRM'], new CpdlcMessageElement('DM4', [exports.FansMode.FansA, exports.FansMode.FansB])],
      DM5: [['NEGATIVE'], new CpdlcMessageElement('DM5', [exports.FansMode.FansA, exports.FansMode.FansB])],
      DM6: [['REQUEST %s'], new CpdlcMessageElement('DM6', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentLevel(1)], exports.CpdlcMessageExpectedResponseType.Yes)],
      DM7: [['REQUEST BLOCK %s TO %s'], new CpdlcMessageElement('DM7', [exports.FansMode.FansA], [new CpdlcMessageContentLevel(2), new CpdlcMessageContentLevel(4)], exports.CpdlcMessageExpectedResponseType.Yes)],
      DM8: [['REQUEST CRUISE CLIMB TO %s'], new CpdlcMessageElement('DM8', [exports.FansMode.FansA], [new CpdlcMessageContentLevel(4)], exports.CpdlcMessageExpectedResponseType.Yes)],
      DM9: [['REQUEST CLIMB TO %s'], new CpdlcMessageElement('DM9', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentLevel(3)], exports.CpdlcMessageExpectedResponseType.Yes)],
      DM10: [['REQUEST DESCEND TO %s'], new CpdlcMessageElement('DM10', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentLevel(3)], exports.CpdlcMessageExpectedResponseType.Yes)],
      DM11: [['AT %s REQUEST CLIMB TO %s'], new CpdlcMessageElement('DM11', [exports.FansMode.FansA], [new CpdlcMessageContentPosition(1), new CpdlcMessageContentLevel(5)], exports.CpdlcMessageExpectedResponseType.Yes)],
      DM12: [['AT %s REQUEST DESCEND TO %s'], new CpdlcMessageElement('DM12', [exports.FansMode.FansA], [new CpdlcMessageContentPosition(1), new CpdlcMessageContentLevel(5)], exports.CpdlcMessageExpectedResponseType.Yes)],
      DM13: [['AT %s REQUEST CLIMB TO %s'], new CpdlcMessageElement('DM13', [exports.FansMode.FansA], [new CpdlcMessageContentTime(1), new CpdlcMessageContentLevel(5)], exports.CpdlcMessageExpectedResponseType.Yes)],
      DM14: [['AT %s REQUEST DESCEND TO %s'], new CpdlcMessageElement('DM14', [exports.FansMode.FansA], [new CpdlcMessageContentTime(1), new CpdlcMessageContentLevel(5)], exports.CpdlcMessageExpectedResponseType.Yes)],
      DM15: [['REQUEST OFFSET %s %s OF ROUTE'], new CpdlcMessageElement('DM15', [exports.FansMode.FansA], [new CpdlcMessageContentDistance(2), new CpdlcMessageContentDirection(3)], exports.CpdlcMessageExpectedResponseType.Yes)],
      DM16: [['AT %s REQUEST OFFSET %s %s OF ROUTE'], new CpdlcMessageElement('DM16', [exports.FansMode.FansA], [new CpdlcMessageContentPosition(1), new CpdlcMessageContentDistance(4), new CpdlcMessageContentDirection(5)], exports.CpdlcMessageExpectedResponseType.Yes)],
      DM17: [['AT %s REQUEST OFFSET %s %s OF ROUTE'], new CpdlcMessageElement('DM17', [exports.FansMode.FansA], [new CpdlcMessageContentTime(1), new CpdlcMessageContentDistance(4), new CpdlcMessageContentDirection(5)], exports.CpdlcMessageExpectedResponseType.Yes)],
      DM18: [['REQUEST %s'], new CpdlcMessageElement('DM18', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentSpeed(1)], exports.CpdlcMessageExpectedResponseType.Yes)],
      DM19: [['REQUEST %s TO %s'], new CpdlcMessageElement('DM19', [exports.FansMode.FansA], [new CpdlcMessageContentSpeed(1), new CpdlcMessageContentSpeed(3)], exports.CpdlcMessageExpectedResponseType.Yes)],
      DM20: [['REQUEST VOICE CONTACT'], new CpdlcMessageElement('DM20', [exports.FansMode.FansA], exports.CpdlcMessageExpectedResponseType.Yes)],
      DM21: [['REQUEST VOICE CONTACT %s'], new CpdlcMessageElement('DM21', [exports.FansMode.FansA], [new CpdlcMessageContentFrequency(3)], exports.CpdlcMessageExpectedResponseType.Yes)],
      DM22: [['REQUEST DIRECT TO %s'], new CpdlcMessageElement('DM22', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentPosition(3)], exports.CpdlcMessageExpectedResponseType.Yes)],
      DM23: [['REQUEST %s'], new CpdlcMessageElement('DM23', [exports.FansMode.FansA], [new CpdlcMessageContentProcedure(1)], exports.CpdlcMessageExpectedResponseType.Yes)],
      DM25: [['REQUEST %s CLEARANCE'], new CpdlcMessageElement('DM25', [exports.FansMode.FansA], [new CpdlcMessageContentFreetext(1, 2)], exports.CpdlcMessageExpectedResponseType.Yes)],
      DM26: [['REQUEST WEATHER DEVIATION TO %s VIA %s'], new CpdlcMessageElement('DM26', [exports.FansMode.FansA], [new CpdlcMessageContentPosition(4), new CpdlcMessageContentFreetext(6, -1)], exports.CpdlcMessageExpectedResponseType.Yes)],
      DM27: [['REQUEST WEATHER DEVIATION UP TO %s %s OF ROUTE'], new CpdlcMessageElement('DM27', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentDistance(5), new CpdlcMessageContentDirection(6)], exports.CpdlcMessageExpectedResponseType.Yes)],
      DM28: [['LEAVING %s'], new CpdlcMessageElement('DM28', [exports.FansMode.FansA], [new CpdlcMessageContentLevel(1)], exports.CpdlcMessageExpectedResponseType.No)],
      DM29: [['CLIMBING TO %s'], new CpdlcMessageElement('DM29', [exports.FansMode.FansA], [new CpdlcMessageContentLevel(2)], exports.CpdlcMessageExpectedResponseType.No)],
      DM30: [['DESCENDING TO %s'], new CpdlcMessageElement('DM30', [exports.FansMode.FansA], [new CpdlcMessageContentLevel(2)], exports.CpdlcMessageExpectedResponseType.No)],
      DM31: [['PASSING %s'], new CpdlcMessageElement('DM31', [exports.FansMode.FansA], [new CpdlcMessageContentPosition(1)], exports.CpdlcMessageExpectedResponseType.No)],
      DM32: [['PRESENT LEVEL %s'], new CpdlcMessageElement('DM32', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentLevel(2)], exports.CpdlcMessageExpectedResponseType.No)],
      DM33: [['PRESENT POSITION %s'], new CpdlcMessageElement('DM33', [exports.FansMode.FansA], [new CpdlcMessageContentPosition(2)], exports.CpdlcMessageExpectedResponseType.No)],
      DM34: [['PRESENT SPEED %s'], new CpdlcMessageElement('DM34', [exports.FansMode.FansA], [new CpdlcMessageContentSpeed(2)], exports.CpdlcMessageExpectedResponseType.No)],
      DM35: [['PRESENT HEADING %s'], new CpdlcMessageElement('DM35', [exports.FansMode.FansA], [new CpdlcMessageContentDegree(2)], exports.CpdlcMessageExpectedResponseType.No)],
      DM36: [['PRESENT GROUND TRACK %s'], new CpdlcMessageElement('DM36', [exports.FansMode.FansA], [new CpdlcMessageContentDegree(3)], exports.CpdlcMessageExpectedResponseType.No)],
      DM37: [['MAINTAINING %s', 'LEVEL %s'], new CpdlcMessageElement('DM37', [exports.FansMode.FansA], [new CpdlcMessageContentLevel(1)], exports.CpdlcMessageExpectedResponseType.No)],
      DM38: [['ASSIGNED LEVEL %s'], new CpdlcMessageElement('DM38', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentLevel(2)], exports.CpdlcMessageExpectedResponseType.No)],
      DM39: [['ASSIGNED SPEED %s'], new CpdlcMessageElement('DM39', [exports.FansMode.FansA], [new CpdlcMessageContentSpeed(2)], exports.CpdlcMessageExpectedResponseType.No)],
      DM40: [['ASSIGNED ROUTE %s'], new CpdlcMessageElement('DM40', [exports.FansMode.FansA], [new CpdlcMessageContentFreetext(2, -1)], exports.CpdlcMessageExpectedResponseType.No)],
      DM41: [['BACK ON ROUTE'], new CpdlcMessageElement('DM41', [exports.FansMode.FansA], exports.CpdlcMessageExpectedResponseType.No)],
      DM42: [['NEXT WAYPOINT %s'], new CpdlcMessageElement('DM42', [exports.FansMode.FansA], [new CpdlcMessageContentPosition(2)], exports.CpdlcMessageExpectedResponseType.No)],
      DM43: [['NEXT WAYPOINT ETA %s'], new CpdlcMessageElement('DM43', [exports.FansMode.FansA], [new CpdlcMessageContentTime(3)], exports.CpdlcMessageExpectedResponseType.No)],
      DM44: [['ENSUING WAYPOINT %s'], new CpdlcMessageElement('DM44', [exports.FansMode.FansA], [new CpdlcMessageContentPosition(2)], exports.CpdlcMessageExpectedResponseType.No)],
      DM45: [['REPORTED WAYPOINT %s'], new CpdlcMessageElement('DM45', [exports.FansMode.FansA], [new CpdlcMessageContentPosition(2)], exports.CpdlcMessageExpectedResponseType.No)],
      DM46: [['REPORTED WAYPOINT %s'], new CpdlcMessageElement('DM46', [exports.FansMode.FansA], [new CpdlcMessageContentTime(2)], exports.CpdlcMessageExpectedResponseType.No)],
      DM47: [['SQUAWKING %s'], new CpdlcMessageElement('DM47', [exports.FansMode.FansA], [new CpdlcMessageContentSquawk(1)], exports.CpdlcMessageExpectedResponseType.No)],
      DM48: [['POSITION REPORT'], new CpdlcMessageElement('DM48', [exports.FansMode.FansA], exports.CpdlcMessageExpectedResponseType.Roger)],
      DM49: [['WHEN CAN WE EXPECT %s'], new CpdlcMessageElement('DM49', [exports.FansMode.FansA], [new CpdlcMessageContentSpeed(4)], exports.CpdlcMessageExpectedResponseType.Yes)],
      DM50: [['WHEN CAN WE EXPECT %s TO %s'], new CpdlcMessageElement('DM50', [exports.FansMode.FansA], [new CpdlcMessageContentSpeed(4), new CpdlcMessageContentSpeed(6)], exports.CpdlcMessageExpectedResponseType.Yes)],
      DM51: [['WHEN CAN WE EXPECT BACK ON ROUTE'], new CpdlcMessageElement('DM51', [exports.FansMode.FansA], exports.CpdlcMessageExpectedResponseType.Yes)],
      DM52: [['WHEN CAN WE EXPECT LOWER LEVEL'], new CpdlcMessageElement('DM52', [exports.FansMode.FansA], exports.CpdlcMessageExpectedResponseType.Yes)],
      DM53: [['WHEN CAN WE EXPECT HIGHER LEVEL'], new CpdlcMessageElement('DM53', [exports.FansMode.FansA], exports.CpdlcMessageExpectedResponseType.Yes)],
      DM54: [['WHEN CAN WE EXPECT CRUISE CLIMB TO %s'], new CpdlcMessageElement('DM54', [exports.FansMode.FansA], [new CpdlcMessageContentLevel(7)], exports.CpdlcMessageExpectedResponseType.Yes)],
      DM55: [['PAN PAN PAN'], new CpdlcMessageElement('DM55', [exports.FansMode.FansA, exports.FansMode.FansB], exports.CpdlcMessageExpectedResponseType.Yes, true)],
      DM56: [['MAYDAY MAYDAY MAYDAY'], new CpdlcMessageElement('DM56', [exports.FansMode.FansA, exports.FansMode.FansB], exports.CpdlcMessageExpectedResponseType.Yes, true)],
      DM57: [['%s FUEL REMAINING AND %s PERSONS ON BOARD'], new CpdlcMessageElement('DM57', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentFuel(0), new CpdlcMessageContentPersonsOnBoard(4)], exports.CpdlcMessageExpectedResponseType.Yes, true)],
      DM58: [['CANCEL EMERGENCY'], new CpdlcMessageElement('DM58', [exports.FansMode.FansA, exports.FansMode.FansB], exports.CpdlcMessageExpectedResponseType.Yes, true)],
      DM59: [['DIVERTING TO %s VIA %s'], new CpdlcMessageElement('DM59', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentPosition(2), new CpdlcMessageContentFreetext(4, -1)], exports.CpdlcMessageExpectedResponseType.Yes, true)],
      DM60: [['OFFSETTING %s %s OF ROUTE'], new CpdlcMessageElement('DM60', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentDistance(1), new CpdlcMessageContentDirection(2)], exports.CpdlcMessageExpectedResponseType.Yes, true)],
      DM61: [['DESCENDING TO %s'], new CpdlcMessageElement('DM61', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentLevel(2)], exports.CpdlcMessageExpectedResponseType.Yes, true)],
      DM62: [['ERROR %s'], new CpdlcMessageElement('DM62', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentFreetext(1, -1)], exports.CpdlcMessageExpectedResponseType.Yes, true)],
      DM63: [['NOT CURRENT DATA AUTHORITY'], new CpdlcMessageElement('DM63', [exports.FansMode.FansA, exports.FansMode.FansB], exports.CpdlcMessageExpectedResponseType.No)],
      DM65: [['DUE TO WEATHER'], new CpdlcMessageElement('DM65', [exports.FansMode.FansA, exports.FansMode.FansB], exports.CpdlcMessageExpectedResponseType.No)],
      DM66: [['DUE TO AIRCRAFT PERFORMANCE'], new CpdlcMessageElement('DM66', [exports.FansMode.FansA, exports.FansMode.FansB], exports.CpdlcMessageExpectedResponseType.No)],
      DM67: [['%s'], new CpdlcMessageElement('DM67', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentFreetext(0, -1)], exports.CpdlcMessageExpectedResponseType.No)],
      DM68: [['%s'], new CpdlcMessageElement('DM68', [exports.FansMode.FansA], true, [new CpdlcMessageContentFreetext(0, -1)], exports.CpdlcMessageExpectedResponseType.Yes)],
      DM69: [['REQUEST VMC DESCEND'], new CpdlcMessageElement('DM69', [exports.FansMode.FansA], exports.CpdlcMessageExpectedResponseType.Yes)],
      DM70: [['REQUEST HEADING %s'], new CpdlcMessageElement('DM70', [exports.FansMode.FansA], [new CpdlcMessageContentDegree(2)], exports.CpdlcMessageExpectedResponseType.Yes)],
      DM71: [['REQUEST GROUND TRACK %s'], new CpdlcMessageElement('DM71', [exports.FansMode.FansA], [new CpdlcMessageContentDegree(3)], exports.CpdlcMessageExpectedResponseType.Yes)],
      DM72: [['REACHING %s'], new CpdlcMessageElement('DM72', [exports.FansMode.FansA], [new CpdlcMessageContentLevel(1)], exports.CpdlcMessageExpectedResponseType.Yes)],
      DM74: [['REQUEST TO MAINTAIN OWN SEPARATION AND VMC'], new CpdlcMessageElement('DM74', [exports.FansMode.FansA], exports.CpdlcMessageExpectedResponseType.Yes)],
      DM75: [['AT PILOTS DISCRETION'], new CpdlcMessageElement('DM75', [exports.FansMode.FansA], exports.CpdlcMessageExpectedResponseType.Yes)],
      DM76: [['REACHING BLOCK %s TO %s'], new CpdlcMessageElement('DM76', [exports.FansMode.FansA], [new CpdlcMessageContentLevel(2), new CpdlcMessageContentLevel(4)], exports.CpdlcMessageExpectedResponseType.No)],
      DM78: [['AT %s %s TO %s', 'AT %s %s FROM %s'], new CpdlcMessageElement('DM78', [exports.FansMode.FansA], [new CpdlcMessageContentTime(1), new CpdlcMessageContentDistance(2), new CpdlcMessageContentPosition(4)], exports.CpdlcMessageExpectedResponseType.No)],
      DM79: [['ATIS %s'], new CpdlcMessageElement('DM79', [exports.FansMode.FansA], [new CpdlcMessageContentAtis(1)], exports.CpdlcMessageExpectedResponseType.No)],
      DM80: [['DEVIATING UP TO %s %s OF ROUTE'], new CpdlcMessageElement('DM80', [exports.FansMode.FansA], [new CpdlcMessageContentDistance(3), new CpdlcMessageContentDirection(4)], exports.CpdlcMessageExpectedResponseType.Yes, true)],
      DM81: [['WE CAN ACCEPT %s AT %s'], new CpdlcMessageElement('DM81', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentLevel(3), new CpdlcMessageContentTime(5)], exports.CpdlcMessageExpectedResponseType.No)],
      DM82: [['WE CANNOT ACCEPT %s'], new CpdlcMessageElement('DM82', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentLevel(3)], exports.CpdlcMessageExpectedResponseType.No)],
      DM83: [['WE CAN ACCEPT %s AT %s'], new CpdlcMessageElement('DM83', [exports.FansMode.FansA], [new CpdlcMessageContentSpeed(3), new CpdlcMessageContentTime(5)], exports.CpdlcMessageExpectedResponseType.No)],
      DM84: [['WE CANNOT ACCEPT %s'], new CpdlcMessageElement('DM84', [exports.FansMode.FansA], [new CpdlcMessageContentSpeed(3)], exports.CpdlcMessageExpectedResponseType.No)],
      DM85: [['WE CAN ACCEPT %s %s AT %s'], new CpdlcMessageElement('DM85', [exports.FansMode.FansA], [new CpdlcMessageContentDistance(3), new CpdlcMessageContentDirection(4), new CpdlcMessageContentTime(6)], exports.CpdlcMessageExpectedResponseType.No)],
      DM86: [['WE CANNOT ACCEPT %s %s'], new CpdlcMessageElement('DM86', [exports.FansMode.FansA], [new CpdlcMessageContentDistance(3), new CpdlcMessageContentDirection(4)], exports.CpdlcMessageExpectedResponseType.No)],
      DM87: [['WHEN CAN WE EXPECT CLIMB TO %s'], new CpdlcMessageElement('DM87', [exports.FansMode.FansA], [new CpdlcMessageContentLevel(6)], exports.CpdlcMessageExpectedResponseType.Yes)],
      DM88: [['WHEN CAN WE EXPECT DESCEND TO %s'], new CpdlcMessageElement('DM88', [exports.FansMode.FansA], [new CpdlcMessageContentLevel(6)], exports.CpdlcMessageExpectedResponseType.Yes)],
      DM89: [['MONITORING %s %s'], new CpdlcMessageElement('DM89', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentAtcUnit(1), new CpdlcMessageContentFrequency(2)], exports.CpdlcMessageExpectedResponseType.No)],
      DM98: [['%s'], new CpdlcMessageElement('DM98', [exports.FansMode.FansB], [new CpdlcMessageContentFreetext(0, -1)], exports.CpdlcMessageExpectedResponseType.No)],
      DM99: [['CURRENT DATA AUTHORITY'], new CpdlcMessageElement('DM99', [exports.FansMode.FansA, exports.FansMode.FansB], exports.CpdlcMessageExpectedResponseType.No, true)],
      DM100: [['LOGICAL ACKNOWLEDGEMENT'], new CpdlcMessageElement('DM100', [exports.FansMode.FansB], exports.CpdlcMessageExpectedResponseType.No)],
      DM104: [['ETA %s %s'], new CpdlcMessageElement('DM104', [exports.FansMode.FansA], [new CpdlcMessageContentPosition(1), new CpdlcMessageContentTime(2)], exports.CpdlcMessageExpectedResponseType.No)],
      DM106: [['PREFERRED LEVEL %s'], new CpdlcMessageElement('DM106', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentLevel(2)], exports.CpdlcMessageExpectedResponseType.No)],
      DM107: [['NOT AUTHORIZED NEXT DATA AUTHORITY'], new CpdlcMessageElement('DM107', [exports.FansMode.FansB], exports.CpdlcMessageExpectedResponseType.No)],
      DM109: [['TOP OF DESCENT %s'], new CpdlcMessageElement('DM109', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentTime(3)], exports.CpdlcMessageExpectedResponseType.No)],
      DM113: [['SPEED %s'], new CpdlcMessageElement('DM113', [exports.FansMode.FansA], [new CpdlcMessageContentSpeed(1)], exports.CpdlcMessageExpectedResponseType.No)],
      DM9998: [['REQUEST LOGON'], new CpdlcMessageElement('DM9998', [exports.FansMode.FansA, exports.FansMode.FansB], exports.CpdlcMessageExpectedResponseType.Yes)],
      DM9999: [['LOGOFF'], new CpdlcMessageElement('DM9999', [exports.FansMode.FansA, exports.FansMode.FansB], exports.CpdlcMessageExpectedResponseType.No)]
    };
    const CpdlcMessagesUplink = {
      UM0: [['UNABLE'], new CpdlcMessageElement('UM0', [exports.FansMode.FansA, exports.FansMode.FansB])],
      UM1: [['STANDBY'], new CpdlcMessageElement('UM1', [exports.FansMode.FansA, exports.FansMode.FansB])],
      UM3: [['ROGER'], new CpdlcMessageElement('UM3', [exports.FansMode.FansA, exports.FansMode.FansB])],
      UM4: [['AFFIRM'], new CpdlcMessageElement('UM4', [exports.FansMode.FansA, exports.FansMode.FansB])],
      UM5: [['NEGATIVE'], new CpdlcMessageElement('UM5', [exports.FansMode.FansA, exports.FansMode.FansB])],
      UM6: [['EXPECT %s'], new CpdlcMessageElement('UM6', [exports.FansMode.FansA], [new CpdlcMessageContentLevel(1)], exports.CpdlcMessageExpectedResponseType.Roger)],
      UM7: [['EXPECT CLIMB AT %s'], new CpdlcMessageElement('UM7', [exports.FansMode.FansA], [new CpdlcMessageContentTime(3)], exports.CpdlcMessageExpectedResponseType.Roger)],
      UM8: [['EXPECT CLIMB AT %s'], new CpdlcMessageElement('UM8', [exports.FansMode.FansA], [new CpdlcMessageContentPosition(3)], exports.CpdlcMessageExpectedResponseType.Roger)],
      UM9: [['EXPECT DESCENT AT %s'], new CpdlcMessageElement('UM9', [exports.FansMode.FansA], [new CpdlcMessageContentTime(3)], exports.CpdlcMessageExpectedResponseType.Roger)],
      UM10: [['EXPECT DESCENT AT %s'], new CpdlcMessageElement('UM10', [exports.FansMode.FansA], [new CpdlcMessageContentPosition(3)], exports.CpdlcMessageExpectedResponseType.Roger)],
      UM11: [['EXPECT CRUISE CLIMB AT %s'], new CpdlcMessageElement('UM11', [exports.FansMode.FansA], [new CpdlcMessageContentTime(4)], exports.CpdlcMessageExpectedResponseType.Roger)],
      UM12: [['EXPECT CRUISE CLIMB AT %s'], new CpdlcMessageElement('UM12', [exports.FansMode.FansA], [new CpdlcMessageContentPosition(4)], exports.CpdlcMessageExpectedResponseType.Roger)],
      UM19: [['MAINTAIN %s'], new CpdlcMessageElement('UM19', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentLevel(1)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM20: [['CLIMB TO %s', 'CLIMB TO AND MAINTAIN %s'], new CpdlcMessageElement('UM20', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentLevel(2, 4)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM21: [['AT %s CLIMB TO %s', 'AT %s CLIMB TO AND MAINTAIN %s'], new CpdlcMessageElement('UM21', [exports.FansMode.FansA], [new CpdlcMessageContentTime(1, true), new CpdlcMessageContentLevel(4, 6)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM22: [['AT %s CLIMB TO %s', 'AT %s CLIMB TO AND MAINTAIN %s'], new CpdlcMessageElement('UM22', [exports.FansMode.FansA], [new CpdlcMessageContentPosition(1, true), new CpdlcMessageContentLevel(4, 6)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM23: [['DESCEND TO %s', 'DESCEND TO AND MAINTAIN %s'], new CpdlcMessageElement('UM23', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentLevel(2, 4)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM24: [['AT %s DESCEND TO %s', 'AT %s DESCEND TO AND MAINTAIN %s'], new CpdlcMessageElement('UM24', [exports.FansMode.FansA], [new CpdlcMessageContentTime(1, true), new CpdlcMessageContentLevel(4, 6)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM25: [['AT %s DESCEND TO %s', 'AT %s DESCEND TO AND MAINTAIN %s'], new CpdlcMessageElement('UM25', [exports.FansMode.FansA], [new CpdlcMessageContentPosition(1, true), new CpdlcMessageContentLevel(4, 6)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM26: [['CLIMB TO REACH %s BY %s'], new CpdlcMessageElement('UM26', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentLevel(3), new CpdlcMessageContentTime(5)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM27: [['CLIMB TO REACH %s BY %s'], new CpdlcMessageElement('UM27', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentLevel(3), new CpdlcMessageContentPosition(5)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM28: [['DESCEND TO REACH %s BY %s'], new CpdlcMessageElement('UM28', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentLevel(3), new CpdlcMessageContentTime(5)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM29: [['DESCEND TO REACH %s BY %s'], new CpdlcMessageElement('UM29', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentLevel(3), new CpdlcMessageContentPosition(5)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM30: [['MAINTAIN BLOCK %s TO %s'], new CpdlcMessageElement('UM30', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentLevel(2), new CpdlcMessageContentLevel(4)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM31: [['CLIMB TO MAINTAIN BLOCK %s TO %s'], new CpdlcMessageElement('UM31', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentLevel(4), new CpdlcMessageContentLevel(6)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM32: [['DESCEND TO MAINTAIN BLOCK %s TO %s'], new CpdlcMessageElement('UM32', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentLevel(4), new CpdlcMessageContentLevel(6)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM34: [['CRUISE CLIMB TO %s'], new CpdlcMessageElement('UM34', [exports.FansMode.FansA], [new CpdlcMessageContentLevel(3)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM35: [['WHEN ABOVE %s COMMENCE CRUISE CLIMB', 'CRUISE CLIMB ABOVE %s'], new CpdlcMessageElement('UM35', [exports.FansMode.FansA], [new CpdlcMessageContentLevel(2, 3)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM36: [['EXPEDITE CLIMB TO %s'], new CpdlcMessageElement('UM36', [exports.FansMode.FansA], [new CpdlcMessageContentLevel(3)], exports.CpdlcMessageExpectedResponseType.WilcoUnable, true)],
      UM37: [['EXPEDITE DESCENT TO %s'], new CpdlcMessageElement('UM37', [exports.FansMode.FansA], [new CpdlcMessageContentLevel(3)], exports.CpdlcMessageExpectedResponseType.WilcoUnable, true)],
      UM38: [['IMMEDIATELY CLIMB TO %s'], new CpdlcMessageElement('UM38', [exports.FansMode.FansA], [new CpdlcMessageContentLevel(3)], exports.CpdlcMessageExpectedResponseType.WilcoUnable, true)],
      UM39: [['IMMEDIATELY DESCEND TO %s'], new CpdlcMessageElement('UM39', [exports.FansMode.FansA], [new CpdlcMessageContentLevel(3)], exports.CpdlcMessageExpectedResponseType.WilcoUnable, true)],
      UM46: [['CROSS %s AT %s'], new CpdlcMessageElement('UM46', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentPosition(1), new CpdlcMessageContentLevel(3)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM47: [['CROSS %s AT OR ABOVE %s'], new CpdlcMessageElement('UM47', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentPosition(1), new CpdlcMessageContentLevel(5)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM48: [['CROSS %s AT OR BELOW %s'], new CpdlcMessageElement('UM48', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentPosition(1), new CpdlcMessageContentLevel(5)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM49: [['CROSS %s AT AND MAINTAIN %s'], new CpdlcMessageElement('UM49', [exports.FansMode.FansA], [new CpdlcMessageContentPosition(1), new CpdlcMessageContentLevel(5)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM50: [['CROSS %s BETWEEN %s AND %s'], new CpdlcMessageElement('UM50', [exports.FansMode.FansA], [new CpdlcMessageContentPosition(1), new CpdlcMessageContentLevel(3), new CpdlcMessageContentLevel(5)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM51: [['CROSS %s AT %s'], new CpdlcMessageElement('UM51', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentPosition(1), new CpdlcMessageContentTime(3)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM52: [['CROSS %s AT OR BEFORE %s'], new CpdlcMessageElement('UM52', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentPosition(1), new CpdlcMessageContentTime(5)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM53: [['CROSS %s AT OR AFTER %s'], new CpdlcMessageElement('UM53', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentPosition(1), new CpdlcMessageContentTime(5)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM54: [['CROSS %s BETWEEN %s AND %s'], new CpdlcMessageElement('UM54', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentPosition(1), new CpdlcMessageContentTime(3), new CpdlcMessageContentTime(5)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM55: [['CROSS %s AT %s'], new CpdlcMessageElement('UM55', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentPosition(1), new CpdlcMessageContentSpeed(3)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM56: [['CROSS %s AT OR LESS THAN %s'], new CpdlcMessageElement('UM56', [exports.FansMode.FansA], [new CpdlcMessageContentPosition(1), new CpdlcMessageContentSpeed(6)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM57: [['CROSS %s AT OR GREATER THAN %s'], new CpdlcMessageElement('UM57', [exports.FansMode.FansA], [new CpdlcMessageContentPosition(1), new CpdlcMessageContentSpeed(6)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM58: [['CROSS %s AT %s AT %s'], new CpdlcMessageElement('UM58', [exports.FansMode.FansA], [new CpdlcMessageContentPosition(1), new CpdlcMessageContentTime(3), new CpdlcMessageContentLevel(5)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM59: [['CROSS %s AT OR BEFORE %s AT %s'], new CpdlcMessageElement('UM59', [exports.FansMode.FansA], [new CpdlcMessageContentPosition(1), new CpdlcMessageContentTime(5), new CpdlcMessageContentLevel(7)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM60: [['CROSS %s AT OR AFTER %s AT %s'], new CpdlcMessageElement('UM60', [exports.FansMode.FansA], [new CpdlcMessageContentPosition(1), new CpdlcMessageContentTime(5), new CpdlcMessageContentLevel(7)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM61: [['CROSS %s AT AND MAINTAIN %s AT %s'], new CpdlcMessageElement('UM61', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentPosition(1), new CpdlcMessageContentLevel(5), new CpdlcMessageContentSpeed(7)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM62: [['AT %s CROSS %s AT AND MAINTAIN %s'], new CpdlcMessageElement('UM62', [exports.FansMode.FansA], [new CpdlcMessageContentTime(1), new CpdlcMessageContentPosition(3), new CpdlcMessageContentLevel(7)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM63: [['AT %s CROSS %s AT AND MAINTAIN %s AT %s'], new CpdlcMessageElement('UM63', [exports.FansMode.FansA], [new CpdlcMessageContentTime(1), new CpdlcMessageContentPosition(3), new CpdlcMessageContentLevel(7), new CpdlcMessageContentSpeed(9)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM64: [['OFFSET %s %s OF ROUTE'], new CpdlcMessageElement('UM64', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentDistance(1), new CpdlcMessageContentDirection(2)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM65: [['AT %s OFFSET %s %s OF ROUTE'], new CpdlcMessageElement('UM65', [exports.FansMode.FansA], [new CpdlcMessageContentPosition(1, true), new CpdlcMessageContentDistance(3), new CpdlcMessageContentDirection(4)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM66: [['AT %s OFFSET %s %s OF ROUTE'], new CpdlcMessageElement('UM66', [exports.FansMode.FansA], [new CpdlcMessageContentTime(1, true), new CpdlcMessageContentDistance(3), new CpdlcMessageContentDirection(4)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM67: [['PROCEED BACK ON ROUTE'], new CpdlcMessageElement('UM67', [exports.FansMode.FansA], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM68: [['REJOIN ROUTE BY %s'], new CpdlcMessageElement('UM68', [exports.FansMode.FansA], [new CpdlcMessageContentPosition(3)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM69: [['REJOIN ROUTE BY %s'], new CpdlcMessageElement('UM69', [exports.FansMode.FansA], [new CpdlcMessageContentTime(3)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM70: [['EXPECT BACK ON ROUTE BY %s'], new CpdlcMessageElement('UM70', [exports.FansMode.FansA], [new CpdlcMessageContentPosition(5)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM71: [['EXPECT BACK ON ROUTE BY %s'], new CpdlcMessageElement('UM71', [exports.FansMode.FansA], [new CpdlcMessageContentTime(5)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM72: [['RESUME OWN NAVIGATION'], new CpdlcMessageElement('UM72', [exports.FansMode.FansA, exports.FansMode.FansB], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      // UM73 for clearance skipped -> needs to be handled in DCL manager
      UM74: [['PROCEED DIRECT TO %s'], new CpdlcMessageElement('UM74', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentPosition(3)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM75: [['WHEN ABLE PROCEED DIRECT TO %s'], new CpdlcMessageElement('UM75', [exports.FansMode.FansA], [new CpdlcMessageContentPosition(5)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM76: [['AT %s PROCEED DIRECT TO %s'], new CpdlcMessageElement('UM76', [exports.FansMode.FansA], [new CpdlcMessageContentTime(1, true), new CpdlcMessageContentPosition(5)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM77: [['AT %s PROCEED DIRECT TO %s'], new CpdlcMessageElement('UM77', [exports.FansMode.FansA], [new CpdlcMessageContentPosition(1, true), new CpdlcMessageContentPosition(5)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM78: [['AT %s PROCEED DIRECT TO %s'], new CpdlcMessageElement('UM78', [exports.FansMode.FansA], [new CpdlcMessageContentLevel(1, true), new CpdlcMessageContentPosition(5)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM79: [['CLEARED TO %s VIA %s'], new CpdlcMessageElement('UM79', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentPosition(2), new CpdlcMessageContentFreetext(4, -1)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM80: [['CLEARED %s'], new CpdlcMessageElement('UM80', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentFreetext(1, -1)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM81: [['CLEARED %s'], new CpdlcMessageElement('UM81', [exports.FansMode.FansA], [new CpdlcMessageContentProcedure(1)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM82: [['CLEARED TO DEVIATE UP TO %s %s OF ROUTE'], new CpdlcMessageElement('UM82', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentDirection(5), new CpdlcMessageContentDistance(6)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM83: [['AT %s CLEARED %s'], new CpdlcMessageElement('UM83', [exports.FansMode.FansA], [new CpdlcMessageContentPosition(1, true), new CpdlcMessageContentFreetext(3, -1)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM84: [['AT %s CLEARED %s'], new CpdlcMessageElement('UM84', [exports.FansMode.FansA], [new CpdlcMessageContentPosition(1, true), new CpdlcMessageContentProcedure(3)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM85: [['EXPECT %s'], new CpdlcMessageElement('UM85', [exports.FansMode.FansA], [new CpdlcMessageContentFreetext(1, -1)], exports.CpdlcMessageExpectedResponseType.Roger)],
      UM86: [['AT %s EXPECT %s'], new CpdlcMessageElement('UM86', [exports.FansMode.FansA], [new CpdlcMessageContentPosition(1), new CpdlcMessageContentFreetext(3, -1)], exports.CpdlcMessageExpectedResponseType.Roger)],
      UM87: [['EXPECT DIRECT TO %s'], new CpdlcMessageElement('UM87', [exports.FansMode.FansA], [new CpdlcMessageContentPosition(3)], exports.CpdlcMessageExpectedResponseType.Roger)],
      UM88: [['AT %s EXPECT DIRECT TO %s'], new CpdlcMessageElement('UM88', [exports.FansMode.FansA], [new CpdlcMessageContentPosition(1), new CpdlcMessageContentPosition(5)], exports.CpdlcMessageExpectedResponseType.Roger)],
      UM89: [['AT %s EXPECT DIRECT TO %s'], new CpdlcMessageElement('UM89', [exports.FansMode.FansA], [new CpdlcMessageContentTime(1), new CpdlcMessageContentPosition(5)], exports.CpdlcMessageExpectedResponseType.Roger)],
      UM90: [['AT %s EXPECT DIRECT TO %s'], new CpdlcMessageElement('UM90', [exports.FansMode.FansA], [new CpdlcMessageContentLevel(1), new CpdlcMessageContentPosition(5)], exports.CpdlcMessageExpectedResponseType.Roger)],
      UM91: [['HOLD AT %s MAINTAIN %s INBOUND TRACK %s %s TURNS %s', 'HOLD AT %s MAINTAIN %s INBOUND TRACK %s %s TURN LEG TIME %s'], new CpdlcMessageElement('UM91', [exports.FansMode.FansA], [new CpdlcMessageContentPosition(2), new CpdlcMessageContentLevel(4), new CpdlcMessageContentDegree(7), new CpdlcMessageContentDirection(8), new CpdlcMessageContentLegType(12)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM92: [['HOLD AT %s AS PUBLISHED MAINTAIN %s'], new CpdlcMessageElement('UM92', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentPosition(2), new CpdlcMessageContentLevel(6)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM93: [['EXPECT FURTHER CLEARANCE AT %s'], new CpdlcMessageElement('UM93', [exports.FansMode.FansA], [new CpdlcMessageContentTime(4)], exports.CpdlcMessageExpectedResponseType.Roger)],
      UM94: [['TURN %s HEADING %s'], new CpdlcMessageElement('UM94', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentDirection(1), new CpdlcMessageContentDegree(3)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM95: [['TURN %s GROUND TRACK %s'], new CpdlcMessageElement('UM95', [exports.FansMode.FansA], [new CpdlcMessageContentDirection(1), new CpdlcMessageContentDegree(4)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM96: [['CONTINUE PRESENT HEADING', 'FLY PRESENT HEADING'], new CpdlcMessageElement('UM96', [exports.FansMode.FansA, exports.FansMode.FansB], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM97: [['AT %s FLY HEADING %s'], new CpdlcMessageElement('UM97', [exports.FansMode.FansA], [new CpdlcMessageContentPosition(1, true), new CpdlcMessageContentDegree(4)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM98: [['IMMEDIATELY TURN %s HEADING %s'], new CpdlcMessageElement('UM98', [exports.FansMode.FansA], [new CpdlcMessageContentDirection(2), new CpdlcMessageContentDegree(4)], exports.CpdlcMessageExpectedResponseType.WilcoUnable, true)],
      UM99: [['EXPECT %s'], new CpdlcMessageElement('UM99', [exports.FansMode.FansA], [new CpdlcMessageContentProcedure(1)], exports.CpdlcMessageExpectedResponseType.Roger)],
      UM100: [['AT %s EXPECT %s'], new CpdlcMessageElement('UM100', [exports.FansMode.FansA], [new CpdlcMessageContentTime(1), new CpdlcMessageContentSpeed(3)], exports.CpdlcMessageExpectedResponseType.Roger)],
      UM101: [['AT %s EXPECT %s'], new CpdlcMessageElement('UM101', [exports.FansMode.FansA], [new CpdlcMessageContentPosition(1), new CpdlcMessageContentSpeed(3)], exports.CpdlcMessageExpectedResponseType.Roger)],
      UM102: [['AT %s EXPECT %s'], new CpdlcMessageElement('UM102', [exports.FansMode.FansA], [new CpdlcMessageContentLevel(1), new CpdlcMessageContentSpeed(3)], exports.CpdlcMessageExpectedResponseType.Roger)],
      UM103: [['AT %s EXPECT %s TO %s'], new CpdlcMessageElement('UM103', [exports.FansMode.FansA], [new CpdlcMessageContentTime(1), new CpdlcMessageContentSpeed(3), new CpdlcMessageContentSpeed(5)], exports.CpdlcMessageExpectedResponseType.Roger)],
      UM104: [['AT %s EXPECT %s TO %s'], new CpdlcMessageElement('UM104', [exports.FansMode.FansA], [new CpdlcMessageContentPosition(1), new CpdlcMessageContentSpeed(3), new CpdlcMessageContentSpeed(5)], exports.CpdlcMessageExpectedResponseType.Roger)],
      UM105: [['AT %s EXPECT %s TO %s'], new CpdlcMessageElement('UM105', [exports.FansMode.FansA], [new CpdlcMessageContentLevel(1), new CpdlcMessageContentSpeed(3), new CpdlcMessageContentSpeed(5)], exports.CpdlcMessageExpectedResponseType.Roger)],
      UM106: [['MAINTAIN %s'], new CpdlcMessageElement('UM106', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentSpeed(1)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM107: [['MAINTAIN PRESENT SPEED'], new CpdlcMessageElement('UM107', [exports.FansMode.FansA, exports.FansMode.FansB], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM108: [['MAINTAIN %s OR GREATER'], new CpdlcMessageElement('UM108', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentSpeed(1)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM109: [['MAINTAIN %s OR LESS'], new CpdlcMessageElement('UM109', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentSpeed(1)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM110: [['MAINTAIN %s TO %s'], new CpdlcMessageElement('UM110', [exports.FansMode.FansA], [new CpdlcMessageContentSpeed(1), new CpdlcMessageContentSpeed(3)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM111: [['INCREASE SPEED TO %s'], new CpdlcMessageElement('UM111', [exports.FansMode.FansA], [new CpdlcMessageContentSpeed(3)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM112: [['INCREASE SPEED TO %s OR GREATER'], new CpdlcMessageElement('UM112', [exports.FansMode.FansA], [new CpdlcMessageContentSpeed(3)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM113: [['REDUCE SPEED TO %s'], new CpdlcMessageElement('UM113', [exports.FansMode.FansA], [new CpdlcMessageContentSpeed(3)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM114: [['REDUCE SPEED TO %s OR LESS'], new CpdlcMessageElement('UM114', [exports.FansMode.FansA], [new CpdlcMessageContentSpeed(3)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM115: [['DO NOT EXCEED %s'], new CpdlcMessageElement('UM115', [exports.FansMode.FansA], [new CpdlcMessageContentSpeed(3)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM116: [['RESUME NORMAL SPEED'], new CpdlcMessageElement('UM116', [exports.FansMode.FansA, exports.FansMode.FansB], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM117: [['CONTACT %s %s'], new CpdlcMessageElement('UM117', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentAtcUnit(1), new CpdlcMessageContentFrequency(2)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM118: [['AT %s CONTACT %s %s'], new CpdlcMessageElement('UM118', [exports.FansMode.FansA], [new CpdlcMessageContentPosition(1, true), new CpdlcMessageContentAtcUnit(3), new CpdlcMessageContentFrequency(4)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM119: [['AT %s CONTACT %s %s'], new CpdlcMessageElement('UM119', [exports.FansMode.FansA], [new CpdlcMessageContentTime(1, true), new CpdlcMessageContentAtcUnit(3), new CpdlcMessageContentFrequency(4)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM120: [['MONITOR %s %s'], new CpdlcMessageElement('UM120', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentAtcUnit(1), new CpdlcMessageContentFrequency(2)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM121: [['AT %s MONITOR %s %s'], new CpdlcMessageElement('UM121', [exports.FansMode.FansA], [new CpdlcMessageContentPosition(1, true), new CpdlcMessageContentAtcUnit(3), new CpdlcMessageContentFrequency(4)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM122: [['AT %s MONITOR %s %s'], new CpdlcMessageElement('UM122', [exports.FansMode.FansA], [new CpdlcMessageContentTime(1, true), new CpdlcMessageContentAtcUnit(3), new CpdlcMessageContentFrequency(4)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM123: [['SQUAWK %s'], new CpdlcMessageElement('UM123', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentSquawk(1)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM124: [['STOP SQUAWK'], new CpdlcMessageElement('UM124', [exports.FansMode.FansA], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM125: [['SQUAWK MODE CHARLIE', 'SQUAWK ALTITUDE'], new CpdlcMessageElement('UM125', [exports.FansMode.FansA], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM126: [['STOP SQUAWK MODE CHARLIE', 'STOP SQUAWK ALTITUDE'], new CpdlcMessageElement('UM126', [exports.FansMode.FansA], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM127: [['REPORT BACK ON ROUTE'], new CpdlcMessageElement('UM127', [exports.FansMode.FansA], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM128: [['REPORT LEAVING %s'], new CpdlcMessageElement('UM128', [exports.FansMode.FansA], [new CpdlcMessageContentLevel(2, true)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM129: [['REPORT MAINTAINING %s', 'REPORT LEVEL %s'], new CpdlcMessageElement('UM129', [exports.FansMode.FansA], [new CpdlcMessageContentLevel(2, true)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM130: [['REPORT PASSING %s'], new CpdlcMessageElement('UM130', [exports.FansMode.FansA], [new CpdlcMessageContentPosition(2, true)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM131: [['REPORT REMAINING FUEL AND PERSONS ON BOARD', 'REPORT REMAINING FUEL AND SOULS ON BOARD'], new CpdlcMessageElement('UM131', [exports.FansMode.FansA], exports.CpdlcMessageExpectedResponseType.Yes, true)],
      UM132: [['REPORT POSITION', 'CONFIRM POSITION'], new CpdlcMessageElement('UM132', [exports.FansMode.FansA], exports.CpdlcMessageExpectedResponseType.Yes)],
      UM133: [['REPORT PRESENT LEVEL'], new CpdlcMessageElement('UM133', [exports.FansMode.FansA], exports.CpdlcMessageExpectedResponseType.Yes)],
      UM134: [['REPORT SPEED', 'CONFIRM SPEED'], new CpdlcMessageElement('UM134', [exports.FansMode.FansA], exports.CpdlcMessageExpectedResponseType.Yes)],
      UM135: [['CONFIRM ASSIGNED LEVEL'], new CpdlcMessageElement('UM135', [exports.FansMode.FansA, exports.FansMode.FansB], exports.CpdlcMessageExpectedResponseType.Yes)],
      UM136: [['CONFIRM ASSIGNED SPEED'], new CpdlcMessageElement('UM136', [exports.FansMode.FansA], exports.CpdlcMessageExpectedResponseType.Yes)],
      UM137: [['CONFIRM ASSIGNED ROUTE'], new CpdlcMessageElement('UM137', [exports.FansMode.FansA], exports.CpdlcMessageExpectedResponseType.Yes)],
      UM138: [['CONFIRM TIME OVER REPORTED WAYPOINT'], new CpdlcMessageElement('UM138', [exports.FansMode.FansA], exports.CpdlcMessageExpectedResponseType.Yes)],
      UM139: [['CONFIRM REPORTED WAYPOINT'], new CpdlcMessageElement('UM139', [exports.FansMode.FansA], exports.CpdlcMessageExpectedResponseType.Yes)],
      UM140: [['CONFIRM NEXT WAYPOINT'], new CpdlcMessageElement('UM140', [exports.FansMode.FansA], exports.CpdlcMessageExpectedResponseType.Yes)],
      UM141: [['CONFIRM NEXT WAYPOINT ETA'], new CpdlcMessageElement('UM141', [exports.FansMode.FansA], exports.CpdlcMessageExpectedResponseType.Yes)],
      UM142: [['CONFIRM ENSUING WAYPOINT'], new CpdlcMessageElement('UM142', [exports.FansMode.FansA], exports.CpdlcMessageExpectedResponseType.Yes)],
      UM143: [['CONFIRM REQUEST'], new CpdlcMessageElement('UM143', [exports.FansMode.FansA], exports.CpdlcMessageExpectedResponseType.Yes)],
      UM144: [['CONFIRM SQUAWK'], new CpdlcMessageElement('UM144', [exports.FansMode.FansA], exports.CpdlcMessageExpectedResponseType.Yes)],
      UM145: [['REPORT HEADING', 'CONFIRM HEADING'], new CpdlcMessageElement('UM145', [exports.FansMode.FansA], exports.CpdlcMessageExpectedResponseType.Yes)],
      UM146: [['REPORT GROUND TRACK', 'CONFIRM GROUND TRACK'], new CpdlcMessageElement('UM146', [exports.FansMode.FansA], exports.CpdlcMessageExpectedResponseType.Yes)],
      UM147: [['REQUEST POSITION REPORT'], new CpdlcMessageElement('UM147', [exports.FansMode.FansA], exports.CpdlcMessageExpectedResponseType.Yes)],
      UM148: [['WHEN CAN YOU ACCEPT %s'], new CpdlcMessageElement('UM148', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentLevel(4)], exports.CpdlcMessageExpectedResponseType.Yes)],
      UM149: [['CAN YOU ACCEPT %s AT %s'], new CpdlcMessageElement('UM149', [exports.FansMode.FansA], [new CpdlcMessageContentLevel(3), new CpdlcMessageContentPosition(5)], exports.CpdlcMessageExpectedResponseType.AffirmNegative)],
      UM150: [['CAN YOU ACCEPT %s AT %s'], new CpdlcMessageElement('UM150', [exports.FansMode.FansA], [new CpdlcMessageContentLevel(3), new CpdlcMessageContentTime(5)], exports.CpdlcMessageExpectedResponseType.AffirmNegative)],
      UM151: [['WHEN CAN YOU ACCEPT %s'], new CpdlcMessageElement('UM151', [exports.FansMode.FansA], [new CpdlcMessageContentSpeed(4)], exports.CpdlcMessageExpectedResponseType.Yes)],
      UM152: [['WHEN CAN YOU ACCEPT %s %s OFFSET'], new CpdlcMessageElement('UM152', [exports.FansMode.FansA], [new CpdlcMessageContentDistance(4), new CpdlcMessageContentDirection(5)], exports.CpdlcMessageExpectedResponseType.Yes)],
      UM153: [['ALTIMETER %s', 'QNH %s'], new CpdlcMessageElement('UM153', [exports.FansMode.FansA], [new CpdlcMessageContentAltimeter(1)], exports.CpdlcMessageExpectedResponseType.Roger)],
      UM154: [['RADAR SERVICE TERMINATED', 'RADAR SERVICES TERMINATED'], new CpdlcMessageElement('UM154', [exports.FansMode.FansA], exports.CpdlcMessageExpectedResponseType.Roger)],
      UM155: [['RADAR CONTACT %s'], new CpdlcMessageElement('UM155', [exports.FansMode.FansA], [new CpdlcMessageContentPosition(2)], exports.CpdlcMessageExpectedResponseType.Roger)],
      UM156: [['RADAR CONTACT LOST'], new CpdlcMessageElement('UM156', [exports.FansMode.FansA], exports.CpdlcMessageExpectedResponseType.Roger)],
      UM157: [['CHECK STUCK MICROPHONE %s'], new CpdlcMessageElement('UM157', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentFrequency(3)], exports.CpdlcMessageExpectedResponseType.Roger, true)],
      UM158: [['ATIS %s'], new CpdlcMessageElement('UM158', [exports.FansMode.FansA], [new CpdlcMessageContentAtis(1)], exports.CpdlcMessageExpectedResponseType.Roger)],
      UM159: [['ERROR %s'], new CpdlcMessageElement('UM159', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentFreetext(1, -1)], exports.CpdlcMessageExpectedResponseType.NotRequired)],
      UM160: [['NEXT DATA AUTHORITY %s'], new CpdlcMessageElement('UM160', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentAtcUnit(3)], exports.CpdlcMessageExpectedResponseType.NotRequired)],
      UM161: [['END SERVICE'], new CpdlcMessageElement('UM161', [exports.FansMode.FansA], exports.CpdlcMessageExpectedResponseType.NotRequired)],
      UM162: [['MESSAGE NOT SUPPORTED BY THIS ATS UNIT', 'SERVICE UNAVAILABLE'], new CpdlcMessageElement('UM162', [exports.FansMode.FansA, exports.FansMode.FansB], exports.CpdlcMessageExpectedResponseType.NotRequired)],
      UM168: [['DISREGARD'], new CpdlcMessageElement('UM168', [exports.FansMode.FansA], exports.CpdlcMessageExpectedResponseType.Roger)],
      UM169: [['%s'], new CpdlcMessageElement('UM169', [exports.FansMode.FansA], [new CpdlcMessageContentFreetext(0, -1)], exports.CpdlcMessageExpectedResponseType.Roger)],
      UM171: [['CLIMB AT %s MINIMUM'], new CpdlcMessageElement('UM171', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentVerticalRate(2)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM172: [['CLIMB AT %s MAXIMUM'], new CpdlcMessageElement('UM172', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentVerticalRate(2)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM173: [['DESCEND AT %s MINIMUM'], new CpdlcMessageElement('UM173', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentVerticalRate(2)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM174: [['DESCEND AT %s MAXIMUM'], new CpdlcMessageElement('UM174', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentVerticalRate(2)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM175: [['REPORT REACHING %s'], new CpdlcMessageElement('UM175', [exports.FansMode.FansA], [new CpdlcMessageContentLevel(2, true)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM176: [['MAINTAIN OWN SEPARATION AND VMC'], new CpdlcMessageElement('UM176', [exports.FansMode.FansA], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM177: [['AT PILOTS DISCRETION'], new CpdlcMessageElement('UM177', [exports.FansMode.FansA], exports.CpdlcMessageExpectedResponseType.No)],
      UM179: [['SQUAWK IDENT'], new CpdlcMessageElement('UM179', [exports.FansMode.FansA, exports.FansMode.FansB], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM180: [['REPORT REACHING BLOCK %s TO %s'], new CpdlcMessageElement('UM180', [exports.FansMode.FansA], [new CpdlcMessageContentLevel(3, true), new CpdlcMessageContentLevel(5, true)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM181: [['REPORT DISTANCE TO %s', 'REPORT DISTANCE FROM %s'], new CpdlcMessageElement('UM181', [exports.FansMode.FansA], [new CpdlcMessageContentPosition(3)], exports.CpdlcMessageExpectedResponseType.Yes)],
      UM182: [['CONFIRM ATIS CODE'], new CpdlcMessageElement('UM182', [exports.FansMode.FansA], exports.CpdlcMessageExpectedResponseType.Yes)],
      UM183: [['%s'], new CpdlcMessageElement('UM183', [exports.FansMode.FansB], [new CpdlcMessageContentFreetext(0, -1)], exports.CpdlcMessageExpectedResponseType.Roger)],
      UM184: [['AT TIME %s REPORT DISTANCE TO %s', 'AT TIME %s REPORT DISTANCE FROM %s'], new CpdlcMessageElement('UM184', [exports.FansMode.FansA], [new CpdlcMessageContentTime(2, true), new CpdlcMessageContentPosition(6)], exports.CpdlcMessageExpectedResponseType.Yes)],
      UM190: [['FLY HEADING %s'], new CpdlcMessageElement('UM190', [exports.FansMode.FansB], [new CpdlcMessageContentDegree(2)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM213: [['%s ALTIMETER %s', '%s QNH %s'], new CpdlcMessageElement('UM213', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentPosition(0), new CpdlcMessageContentAltimeter(2)], exports.CpdlcMessageExpectedResponseType.Roger)],
      UM215: [['TURN %s %s DEGREES'], new CpdlcMessageElement('UM215', [exports.FansMode.FansB], [new CpdlcMessageContentDirection(1), new CpdlcMessageContentDegree(2)], exports.CpdlcMessageExpectedResponseType.WilcoUnable)],
      UM222: [['NO SPEED RESTRICTION'], new CpdlcMessageElement('UM222', [exports.FansMode.FansA, exports.FansMode.FansB], exports.CpdlcMessageExpectedResponseType.Roger)],
      UM227: [['LOGICAL ACKNOWLEDGEMENT'], new CpdlcMessageElement('UM227', [exports.FansMode.FansB], exports.CpdlcMessageExpectedResponseType.Roger)],
      UM228: [['REPORT ETA %s'], new CpdlcMessageElement('UM228', [exports.FansMode.FansA], [new CpdlcMessageContentPosition(2)], exports.CpdlcMessageExpectedResponseType.Yes)],
      UM231: [['STATE PREFERRED LEVEL'], new CpdlcMessageElement('UM231', [exports.FansMode.FansA, exports.FansMode.FansB], exports.CpdlcMessageExpectedResponseType.Yes)],
      UM232: [['STATE TOP OF DESCENT'], new CpdlcMessageElement('UM232', [exports.FansMode.FansA, exports.FansMode.FansB], exports.CpdlcMessageExpectedResponseType.Yes)],
      UM242: [['TRANSMIT ADS-B IDENT'], new CpdlcMessageElement('UM242', [exports.FansMode.FansA], exports.CpdlcMessageExpectedResponseType.Roger)],
      UM244: [['IDENTIFICATION TERMINATED'], new CpdlcMessageElement('UM244', [exports.FansMode.FansA], exports.CpdlcMessageExpectedResponseType.Roger)],
      UM9995: [['LOGOFF'], new CpdlcMessageElement('UM9995', [exports.FansMode.FansA, exports.FansMode.FansB], exports.CpdlcMessageExpectedResponseType.NotRequired)],
      UM9996: [['UNABLE %s'], new CpdlcMessageElement('UM9996', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentFreetext(1, -1)], exports.CpdlcMessageExpectedResponseType.NotRequired)],
      UM9997: [['LOGON ACCEPTED'], new CpdlcMessageElement('UM9997', [exports.FansMode.FansA, exports.FansMode.FansB], exports.CpdlcMessageExpectedResponseType.NotRequired)],
      UM9998: [['HANDOVER %s'], new CpdlcMessageElement('UM9998', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentAtcUnit(1)], exports.CpdlcMessageExpectedResponseType.NotRequired)],
      UM9999: [['CURRENT ATC %s'], new CpdlcMessageElement('UM9999', [exports.FansMode.FansA, exports.FansMode.FansB], [new CpdlcMessageContentFreetext(2, -1)], exports.CpdlcMessageExpectedResponseType.NotRequired)]
    };

    let CpdlcMessageMonitoringState;
    /**
     * Defines the general freetext message format
     */

    (function (CpdlcMessageMonitoringState) {
      CpdlcMessageMonitoringState[CpdlcMessageMonitoringState["Ignored"] = 0] = "Ignored";
      CpdlcMessageMonitoringState[CpdlcMessageMonitoringState["Required"] = 1] = "Required";
      CpdlcMessageMonitoringState[CpdlcMessageMonitoringState["Monitoring"] = 2] = "Monitoring";
      CpdlcMessageMonitoringState[CpdlcMessageMonitoringState["Cancelled"] = 3] = "Cancelled";
      CpdlcMessageMonitoringState[CpdlcMessageMonitoringState["Finished"] = 4] = "Finished";
    })(CpdlcMessageMonitoringState || (CpdlcMessageMonitoringState = {}));

    class CpdlcMessage extends AtsuMessage {
      constructor() {
        super();

        _defineProperty(this, "Content", []);

        _defineProperty(this, "Response", null);

        _defineProperty(this, "CurrentTransmissionId", -1);

        _defineProperty(this, "PreviousTransmissionId", -1);

        _defineProperty(this, "DcduRelevantMessage", true);

        _defineProperty(this, "CloseAutomatically", true);

        _defineProperty(this, "MessageMonitoring", CpdlcMessageMonitoringState.Ignored);

        _defineProperty(this, "SemanticResponseRequired", false);

        this.Type = exports.AtsuMessageType.CPDLC;
        this.Network = exports.AtsuMessageNetwork.Hoppie;
        this.Direction = exports.AtsuMessageDirection.Downlink;
      }

      deserialize(jsonData) {
        super.deserialize(jsonData);
        jsonData.Content.forEach(element => {
          const entry = new CpdlcMessageElement('');
          entry.deserialize(element);
          this.Content.push(entry);
        });

        if (jsonData.Response) {
          this.Response = new CpdlcMessage();
          this.Response.deserialize(jsonData.Response);
        }

        this.CurrentTransmissionId = jsonData.CurrentTransmissionId;
        this.PreviousTransmissionId = jsonData.PreviousTransmissionId;
        this.DcduRelevantMessage = jsonData.DcduRelevantMessage;
        this.CloseAutomatically = jsonData.CloseAutomatically;
        this.MessageMonitoring = jsonData.MessageMonitoring;
        this.SemanticResponseRequired = jsonData.SemanticResponseRequired;
      }

      serializeContent(format, template, element) {
        let content = '';
        content = template;
        element.Content.forEach(entry => {
          const idx = content.indexOf('%s');

          if (format === exports.AtsuMessageSerializationFormat.Network) {
            content = "".concat(content.substring(0, idx)).concat(entry.Value).concat(content.substring(idx + 2));
          } else if (entry.Value !== '') {
            if (this.MessageMonitoring === CpdlcMessageMonitoringState.Monitoring && format === exports.AtsuMessageSerializationFormat.MCDUMonitored) {
              content = "".concat(content.substring(0, idx), "{magenta}").concat(entry.Value, "{end}").concat(content.substring(idx + 2));
            } else {
              content = "".concat(content.substring(0, idx), "@").concat(entry.Value, "@").concat(content.substring(idx + 2));
            }
          } else {
            content = "".concat(content.substring(0, idx), "[      ]").concat(content.substring(idx + 2));
          }
        });
        return content;
      }

      extendSerializationWithResponse() {
        var _this$Response$Conten, _this$Response$Conten2, _this$Response$Conten3, _this$Response$Conten4, _this$Response$Conten5, _this$Response$Conten6, _this$Response$Conten7, _this$Response$Conten8, _this$Response$Conten9, _this$Response$Conten10, _this$Response$Conten11;

        if (!this.Response || this.Response.Content.length === 0) {
          return false;
        } // ignore the standard responses


        return ((_this$Response$Conten = this.Response.Content[0]) === null || _this$Response$Conten === void 0 ? void 0 : _this$Response$Conten.TypeId) !== 'DM0' && ((_this$Response$Conten2 = this.Response.Content[0]) === null || _this$Response$Conten2 === void 0 ? void 0 : _this$Response$Conten2.TypeId) !== 'DM1' && ((_this$Response$Conten3 = this.Response.Content[0]) === null || _this$Response$Conten3 === void 0 ? void 0 : _this$Response$Conten3.TypeId) !== 'DM2' && ((_this$Response$Conten4 = this.Response.Content[0]) === null || _this$Response$Conten4 === void 0 ? void 0 : _this$Response$Conten4.TypeId) !== 'DM3' && ((_this$Response$Conten5 = this.Response.Content[0]) === null || _this$Response$Conten5 === void 0 ? void 0 : _this$Response$Conten5.TypeId) !== 'DM4' && ((_this$Response$Conten6 = this.Response.Content[0]) === null || _this$Response$Conten6 === void 0 ? void 0 : _this$Response$Conten6.TypeId) !== 'DM5' && ((_this$Response$Conten7 = this.Response.Content[0]) === null || _this$Response$Conten7 === void 0 ? void 0 : _this$Response$Conten7.TypeId) !== 'UM0' && ((_this$Response$Conten8 = this.Response.Content[0]) === null || _this$Response$Conten8 === void 0 ? void 0 : _this$Response$Conten8.TypeId) !== 'UM1' && ((_this$Response$Conten9 = this.Response.Content[0]) === null || _this$Response$Conten9 === void 0 ? void 0 : _this$Response$Conten9.TypeId) !== 'UM3' && ((_this$Response$Conten10 = this.Response.Content[0]) === null || _this$Response$Conten10 === void 0 ? void 0 : _this$Response$Conten10.TypeId) !== 'UM4' && ((_this$Response$Conten11 = this.Response.Content[0]) === null || _this$Response$Conten11 === void 0 ? void 0 : _this$Response$Conten11.TypeId) !== 'UM5';
      }

      serialize(format) {
        const lineLength = format === exports.AtsuMessageSerializationFormat.DCDU ? 30 : 25;
        const lines = [];
        let message = '';

        if (this.Content.length !== 0) {
          for (const element of this.Content) {
            if (this.Direction === exports.AtsuMessageDirection.Downlink) {
              lines.push(...wordWrap(this.serializeContent(format, CpdlcMessagesDownlink[element.TypeId][0][0], element), lineLength));
            } else {
              lines.push(...wordWrap(this.serializeContent(format, CpdlcMessagesUplink[element.TypeId][0][0], element), lineLength));
            }
          }
        } else {
          this.Message.split('_').forEach(entry => {
            lines.push(...wordWrap(entry, lineLength));
          });
        }

        if (format === exports.AtsuMessageSerializationFormat.Network) {
          var _this$Content$;

          message = "/data2/".concat(this.CurrentTransmissionId, "/").concat(this.PreviousTransmissionId !== -1 ? this.PreviousTransmissionId : '', "/").concat((_this$Content$ = this.Content[0]) === null || _this$Content$ === void 0 ? void 0 : _this$Content$.ExpectedResponse, "/").concat(lines.join(' '));
        } else if (format === exports.AtsuMessageSerializationFormat.DCDU) {
          message = lines.join('\n');
        } else if (format === exports.AtsuMessageSerializationFormat.MCDU || format === exports.AtsuMessageSerializationFormat.MCDUMonitored) {
          if (this.Direction === exports.AtsuMessageDirection.Uplink) {
            message += "{cyan}".concat(this.Timestamp.dcduTimestamp(), " FROM ").concat(this.Station, "{end}\n");
          } else {
            message += "{cyan}".concat(this.Timestamp.dcduTimestamp(), " TO ").concat(this.Station, "{end}\n");
          }

          lines.forEach(line => {
            line = line.replace(/@/gi, '');

            if (format === exports.AtsuMessageSerializationFormat.MCDUMonitored) {
              message += line;
            } else {
              message += "{green}".concat(line, "{end}\n");
            }
          });
          message += '{white}------------------------{end}\n';

          if (this.extendSerializationWithResponse()) {
            message += this.Response.serialize(format);
          }
        } else if (format === exports.AtsuMessageSerializationFormat.Printer) {
          message += "".concat(this.Timestamp.dcduTimestamp(), " ").concat(this.Direction === exports.AtsuMessageDirection.Uplink ? 'FROM' : 'TO', " ").concat(this.Station, "}\n");
          lines.forEach(line => {
            line = line.replace(/@/gi, '');
            message += "".concat(line, "\n");
          });
          message += '------------------------\n';

          if (this.extendSerializationWithResponse()) {
            message += this.Response.serialize(format);
          }
        } else {
          message = this.Message;
        }

        return message;
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
        const val = GetStoredData("A32NX_".concat(key)); // GetStoredData returns null on error, or empty string for keys that don't exist (why isn't that an error??)
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

    /**
     * Defines the general weather message format
     */

    class WeatherMessage extends AtsuMessage {
      constructor() {
        super();

        _defineProperty(this, "Reports", []);

        this.Direction = exports.AtsuMessageDirection.Uplink;
      }

      serialize(format) {
        let type = '';

        switch (this.Type) {
          case exports.AtsuMessageType.METAR:
            type = 'METAR';
            break;

          case exports.AtsuMessageType.TAF:
            type = 'TAF';
            break;

          default:
            type = 'ATIS';
            break;
        }

        let message = '';

        if (format === exports.AtsuMessageSerializationFormat.MCDU || format === exports.AtsuMessageSerializationFormat.MCDUMonitored) {
          this.Reports.forEach(report => {
            message += "{cyan}".concat(type, " ").concat(report.airport, "{end}\n"); // eslint-disable-next-line no-loop-func

            wordWrap(report.report, 25).forEach(line => {
              if (line.startsWith('D-ATIS')) {
                message += "{amber}".concat(line, "{end}\n");
              } else if (line === 'NO METAR AVAILABLE' || line === 'NO TAF AVAILABLE') {
                message += "{amber}".concat(line, "{end}\n");
              } else {
                message += "{green}".concat(line, "{end}\n");
              }
            });
            message += '{white}------------------------{end}\n';
          });
        } else {
          this.Reports.forEach(report => {
            message += "".concat(type, " ").concat(report.airport, "\n"); // eslint-disable-next-line no-loop-func

            message += "".concat(report.report, "\n");
            message += '------------------------\n';
          });
        }

        return message;
      }

    }

    exports.AtisType = void 0;
    /**
     * Defines the general ATIS message format
     */

    (function (AtisType) {
      AtisType[AtisType["Departure"] = 0] = "Departure";
      AtisType[AtisType["Arrival"] = 1] = "Arrival";
      AtisType[AtisType["Enroute"] = 2] = "Enroute";
    })(exports.AtisType || (exports.AtisType = {}));

    class AtisMessage extends WeatherMessage {
      constructor() {
        super();

        _defineProperty(this, "Information", '');

        this.Type = exports.AtsuMessageType.ATIS;
        this.Station = NXDataStore.get('CONFIG_ATIS_SRC', 'MSFS');
      }

      parseInformation() {
        let foundInfo = false; // this function is only relevant for the ATC updater

        this.Reports.forEach(report => {
          report.report.split(' ').forEach(word => {
            // expect 'INFORMATION H' or 'INFORMATION HOTEL'
            if (foundInfo === false) {
              if (word === 'INFORMATION' || word === 'INFO') {
                foundInfo = true;
              }
            } else {
              this.Information = word; // fix 'INFORMATION HOTEL'

              if (this.Information.length > 1) {
                this.Information = this.Information[0];
              }

              foundInfo = false;
            }
          });
        });
      }

    }

    //  Copyright (c) 2021 FlyByWire Simulations
    /**
     * Defines the general METAR message format
     */

    class MetarMessage extends WeatherMessage {
      constructor() {
        super();
        this.Type = exports.AtsuMessageType.METAR;
        this.Station = NXDataStore.get('CONFIG_METAR_SRC', 'MSFS');
      }

    }

    //  Copyright (c) 2021 FlyByWire Simulations
    /**
     * Defines the general TAF message format
     */

    class TafMessage extends WeatherMessage {
      constructor() {
        super();
        this.Type = exports.AtsuMessageType.TAF;
        this.Station = NXDataStore.get('CONFIG_TAF_SRC', 'MSFS');
      }

    }

    // Copyright (c) 2020-2021 Working Title, FlyByWire Simulations
    // SPDX-License-Identifier: MIT
    let AirportClass;

    (function (AirportClass) {
      AirportClass[AirportClass["Unknown"] = 0] = "Unknown";
      AirportClass[AirportClass["Normal"] = 1] = "Normal";
      AirportClass[AirportClass["SoftUnknown"] = 2] = "SoftUnknown";
      AirportClass[AirportClass["Seaplane"] = 3] = "Seaplane";
      AirportClass[AirportClass["Heliport"] = 4] = "Heliport";
      AirportClass[AirportClass["Private"] = 5] = "Private";
    })(AirportClass || (AirportClass = {}));

    let AirportPrivateType;

    (function (AirportPrivateType) {
      AirportPrivateType[AirportPrivateType["Unknown"] = 0] = "Unknown";
      AirportPrivateType[AirportPrivateType["Public"] = 1] = "Public";
      AirportPrivateType[AirportPrivateType["Military"] = 2] = "Military";
      AirportPrivateType[AirportPrivateType["Private"] = 3] = "Private";
    })(AirportPrivateType || (AirportPrivateType = {}));

    let AirspaceType;

    (function (AirspaceType) {
      AirspaceType[AirspaceType["None"] = 0] = "None";
      AirspaceType[AirspaceType["Center"] = 1] = "Center";
      AirspaceType[AirspaceType["ClassA"] = 2] = "ClassA";
      AirspaceType[AirspaceType["ClassB"] = 3] = "ClassB";
      AirspaceType[AirspaceType["ClassC"] = 4] = "ClassC";
      AirspaceType[AirspaceType["ClassD"] = 5] = "ClassD";
      AirspaceType[AirspaceType["ClassE"] = 6] = "ClassE";
      AirspaceType[AirspaceType["ClassF"] = 7] = "ClassF";
      AirspaceType[AirspaceType["ClassG"] = 8] = "ClassG";
      AirspaceType[AirspaceType["Tower"] = 9] = "Tower";
      AirspaceType[AirspaceType["Clearance"] = 10] = "Clearance";
      AirspaceType[AirspaceType["Ground"] = 11] = "Ground";
      AirspaceType[AirspaceType["Departure"] = 12] = "Departure";
      AirspaceType[AirspaceType["Approach"] = 13] = "Approach";
      AirspaceType[AirspaceType["MOA"] = 14] = "MOA";
      AirspaceType[AirspaceType["Restricted"] = 15] = "Restricted";
      AirspaceType[AirspaceType["Prohibited"] = 16] = "Prohibited";
      AirspaceType[AirspaceType["Warning"] = 17] = "Warning";
      AirspaceType[AirspaceType["Alert"] = 18] = "Alert";
      AirspaceType[AirspaceType["Danger"] = 19] = "Danger";
      AirspaceType[AirspaceType["NationalPark"] = 20] = "NationalPark";
      AirspaceType[AirspaceType["ModeC"] = 21] = "ModeC";
      AirspaceType[AirspaceType["Radar"] = 22] = "Radar";
      AirspaceType[AirspaceType["Training"] = 23] = "Training";
    })(AirspaceType || (AirspaceType = {}));

    let AltitudeDescriptor;

    (function (AltitudeDescriptor) {
      AltitudeDescriptor[AltitudeDescriptor["Empty"] = 0] = "Empty";
      AltitudeDescriptor[AltitudeDescriptor["At"] = 1] = "At";
      AltitudeDescriptor[AltitudeDescriptor["AtOrAbove"] = 2] = "AtOrAbove";
      AltitudeDescriptor[AltitudeDescriptor["AtOrBelow"] = 3] = "AtOrBelow";
      AltitudeDescriptor[AltitudeDescriptor["Between"] = 4] = "Between";
      AltitudeDescriptor[AltitudeDescriptor["C"] = 5] = "C";
      AltitudeDescriptor[AltitudeDescriptor["G"] = 6] = "G";
      AltitudeDescriptor[AltitudeDescriptor["H"] = 7] = "H";
      AltitudeDescriptor[AltitudeDescriptor["I"] = 8] = "I";
      AltitudeDescriptor[AltitudeDescriptor["J"] = 9] = "J";
      AltitudeDescriptor[AltitudeDescriptor["V"] = 10] = "V";
    })(AltitudeDescriptor || (AltitudeDescriptor = {}));

    let FixTypeFlags;

    (function (FixTypeFlags) {
      FixTypeFlags[FixTypeFlags["None"] = 0] = "None";
      FixTypeFlags[FixTypeFlags["IAF"] = 1] = "IAF";
      FixTypeFlags[FixTypeFlags["IF"] = 2] = "IF";
      FixTypeFlags[FixTypeFlags["MAP"] = 4] = "MAP";
      FixTypeFlags[FixTypeFlags["FAF"] = 8] = "FAF";
    })(FixTypeFlags || (FixTypeFlags = {}));

    let FrequencyType; // ARINC424 names

    (function (FrequencyType) {
      FrequencyType[FrequencyType["None"] = 0] = "None";
      FrequencyType[FrequencyType["ATIS"] = 1] = "ATIS";
      FrequencyType[FrequencyType["Multicom"] = 2] = "Multicom";
      FrequencyType[FrequencyType["Unicom"] = 3] = "Unicom";
      FrequencyType[FrequencyType["CTAF"] = 4] = "CTAF";
      FrequencyType[FrequencyType["Ground"] = 5] = "Ground";
      FrequencyType[FrequencyType["Tower"] = 6] = "Tower";
      FrequencyType[FrequencyType["Clearance"] = 7] = "Clearance";
      FrequencyType[FrequencyType["Approach"] = 8] = "Approach";
      FrequencyType[FrequencyType["Departure"] = 9] = "Departure";
      FrequencyType[FrequencyType["Center"] = 10] = "Center";
      FrequencyType[FrequencyType["FSS"] = 11] = "FSS";
      FrequencyType[FrequencyType["AWOS"] = 12] = "AWOS";
      FrequencyType[FrequencyType["ASOS"] = 13] = "ASOS";
      FrequencyType[FrequencyType["ClearancePreTaxi"] = 14] = "ClearancePreTaxi";
      FrequencyType[FrequencyType["RemoteDeliveryClearance"] = 15] = "RemoteDeliveryClearance";
    })(FrequencyType || (FrequencyType = {}));

    let LegType;

    (function (LegType) {
      LegType[LegType["Unknown"] = 0] = "Unknown";
      LegType[LegType["AF"] = 1] = "AF";
      LegType[LegType["CA"] = 2] = "CA";
      LegType[LegType["CD"] = 3] = "CD";
      LegType[LegType["CF"] = 4] = "CF";
      LegType[LegType["CI"] = 5] = "CI";
      LegType[LegType["CR"] = 6] = "CR";
      LegType[LegType["DF"] = 7] = "DF";
      LegType[LegType["FA"] = 8] = "FA";
      LegType[LegType["FC"] = 9] = "FC";
      LegType[LegType["FD"] = 10] = "FD";
      LegType[LegType["FM"] = 11] = "FM";
      LegType[LegType["HA"] = 12] = "HA";
      LegType[LegType["HF"] = 13] = "HF";
      LegType[LegType["HM"] = 14] = "HM";
      LegType[LegType["IF"] = 15] = "IF";
      LegType[LegType["PI"] = 16] = "PI";
      LegType[LegType["RF"] = 17] = "RF";
      LegType[LegType["TF"] = 18] = "TF";
      LegType[LegType["VA"] = 19] = "VA";
      LegType[LegType["VD"] = 20] = "VD";
      LegType[LegType["VI"] = 21] = "VI";
      LegType[LegType["VM"] = 22] = "VM";
      LegType[LegType["VR"] = 23] = "VR";
    })(LegType || (LegType = {}));

    let NdbType;

    (function (NdbType) {
      NdbType[NdbType["CompassLocator"] = 0] = "CompassLocator";
      NdbType[NdbType["MH"] = 1] = "MH";
      NdbType[NdbType["H"] = 2] = "H";
      NdbType[NdbType["HH"] = 3] = "HH";
    })(NdbType || (NdbType = {}));

    let NearestSearchType;

    (function (NearestSearchType) {
      NearestSearchType[NearestSearchType["None"] = 0] = "None";
      NearestSearchType[NearestSearchType["Airport"] = 1] = "Airport";
      NearestSearchType[NearestSearchType["Intersection"] = 2] = "Intersection";
      NearestSearchType[NearestSearchType["Vor"] = 3] = "Vor";
      NearestSearchType[NearestSearchType["Ndb"] = 4] = "Ndb";
      NearestSearchType[NearestSearchType["Boundary"] = 5] = "Boundary";
    })(NearestSearchType || (NearestSearchType = {}));

    let RnavTypeFlags;

    (function (RnavTypeFlags) {
      RnavTypeFlags[RnavTypeFlags["None"] = 0] = "None";
      RnavTypeFlags[RnavTypeFlags["Lnav"] = 1] = "Lnav";
      RnavTypeFlags[RnavTypeFlags["LnavVnav"] = 2] = "LnavVnav";
      RnavTypeFlags[RnavTypeFlags["Lp"] = 4] = "Lp";
      RnavTypeFlags[RnavTypeFlags["Lpv"] = 8] = "Lpv";
    })(RnavTypeFlags || (RnavTypeFlags = {}));

    let RouteType;

    (function (RouteType) {
      RouteType[RouteType["None"] = 0] = "None";
      RouteType[RouteType["LowLevel"] = 1] = "LowLevel";
      RouteType[RouteType["HighLevel"] = 2] = "HighLevel";
      RouteType[RouteType["All"] = 3] = "All";
    })(RouteType || (RouteType = {}));

    let RunwayDesignatorChar;

    (function (RunwayDesignatorChar) {
      RunwayDesignatorChar[RunwayDesignatorChar["L"] = 1] = "L";
      RunwayDesignatorChar[RunwayDesignatorChar["R"] = 2] = "R";
      RunwayDesignatorChar[RunwayDesignatorChar["C"] = 3] = "C";
      RunwayDesignatorChar[RunwayDesignatorChar["W"] = 4] = "W";
      RunwayDesignatorChar[RunwayDesignatorChar["A"] = 5] = "A";
      RunwayDesignatorChar[RunwayDesignatorChar["B"] = 6] = "B";
    })(RunwayDesignatorChar || (RunwayDesignatorChar = {}));

    let RunwayLighting;

    (function (RunwayLighting) {
      RunwayLighting[RunwayLighting["Unknown"] = 0] = "Unknown";
      RunwayLighting[RunwayLighting["None"] = 1] = "None";
      RunwayLighting[RunwayLighting["PartTime"] = 2] = "PartTime";
      RunwayLighting[RunwayLighting["FullTime"] = 3] = "FullTime";
      RunwayLighting[RunwayLighting["Frequency"] = 4] = "Frequency";
    })(RunwayLighting || (RunwayLighting = {}));

    let RunwaySurface;

    (function (RunwaySurface) {
      RunwaySurface[RunwaySurface["Concrete"] = 0] = "Concrete";
      RunwaySurface[RunwaySurface["Grass"] = 1] = "Grass";
      RunwaySurface[RunwaySurface["WaterFsx"] = 2] = "WaterFsx";
      RunwaySurface[RunwaySurface["GrassBumpy"] = 3] = "GrassBumpy";
      RunwaySurface[RunwaySurface["Asphalt"] = 4] = "Asphalt";
      RunwaySurface[RunwaySurface["ShortGrass"] = 5] = "ShortGrass";
      RunwaySurface[RunwaySurface["LongGrass"] = 6] = "LongGrass";
      RunwaySurface[RunwaySurface["HardTurf"] = 7] = "HardTurf";
      RunwaySurface[RunwaySurface["Snow"] = 8] = "Snow";
      RunwaySurface[RunwaySurface["Ice"] = 9] = "Ice";
      RunwaySurface[RunwaySurface["Urban"] = 10] = "Urban";
      RunwaySurface[RunwaySurface["Forest"] = 11] = "Forest";
      RunwaySurface[RunwaySurface["Dirt"] = 12] = "Dirt";
      RunwaySurface[RunwaySurface["Coral"] = 13] = "Coral";
      RunwaySurface[RunwaySurface["Gravel"] = 14] = "Gravel";
      RunwaySurface[RunwaySurface["OilTreated"] = 15] = "OilTreated";
      RunwaySurface[RunwaySurface["SteelMats"] = 16] = "SteelMats";
      RunwaySurface[RunwaySurface["Bituminous"] = 17] = "Bituminous";
      RunwaySurface[RunwaySurface["Brick"] = 18] = "Brick";
      RunwaySurface[RunwaySurface["Macadam"] = 19] = "Macadam";
      RunwaySurface[RunwaySurface["Planks"] = 20] = "Planks";
      RunwaySurface[RunwaySurface["Sand"] = 21] = "Sand";
      RunwaySurface[RunwaySurface["Shale"] = 22] = "Shale";
      RunwaySurface[RunwaySurface["Tarmac"] = 23] = "Tarmac";
      RunwaySurface[RunwaySurface["WrightFlyerTrack"] = 24] = "WrightFlyerTrack";
      RunwaySurface[RunwaySurface["Ocean"] = 26] = "Ocean";
      RunwaySurface[RunwaySurface["Water"] = 27] = "Water";
      RunwaySurface[RunwaySurface["Pond"] = 28] = "Pond";
      RunwaySurface[RunwaySurface["Lake"] = 29] = "Lake";
      RunwaySurface[RunwaySurface["River"] = 30] = "River";
      RunwaySurface[RunwaySurface["WasterWater"] = 31] = "WasterWater";
      RunwaySurface[RunwaySurface["Paint"] = 32] = "Paint";
    })(RunwaySurface || (RunwaySurface = {}));

    let TurnDirection;

    (function (TurnDirection) {
      TurnDirection[TurnDirection["Unknown"] = 0] = "Unknown";
      TurnDirection[TurnDirection["Left"] = 1] = "Left";
      TurnDirection[TurnDirection["Right"] = 2] = "Right";
      TurnDirection[TurnDirection["Either"] = 3] = "Either";
    })(TurnDirection || (TurnDirection = {}));

    let VorClass;

    (function (VorClass) {
      VorClass[VorClass["Unknown"] = 0] = "Unknown";
      VorClass[VorClass["Terminal"] = 1] = "Terminal";
      VorClass[VorClass["LowAltitude"] = 2] = "LowAltitude";
      VorClass[VorClass["HighAlttitude"] = 3] = "HighAlttitude";
      VorClass[VorClass["ILS"] = 4] = "ILS";
      VorClass[VorClass["VOT"] = 5] = "VOT";
    })(VorClass || (VorClass = {}));

    let VorType;

    (function (VorType) {
      VorType[VorType["Unknown"] = 0] = "Unknown";
      VorType[VorType["VOR"] = 1] = "VOR";
      VorType[VorType["VORDME"] = 2] = "VORDME";
      VorType[VorType["DME"] = 3] = "DME";
      VorType[VorType["TACAN"] = 4] = "TACAN";
      VorType[VorType["VORTAC"] = 5] = "VORTAC";
      VorType[VorType["ILS"] = 6] = "ILS";
      VorType[VorType["VOT"] = 7] = "VOT";
    })(VorType || (VorType = {}));

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
        let odd = false; // For each edge (In this case for each point of the polygon and the previous one)

        for (let i = 0, j = polygon.length - 1; i < polygon.length; i++) {
          // If a line from the point into infinity crosses this edge
          if (polygon[i][1] > yPos !== polygon[j][1] > yPos // One point needs to be above, one below our y coordinate
          // ...and the edge doesn't cross our Y corrdinate before our x coordinate (but between our x coordinate and infinity)
          && xPos < (polygon[j][0] - polygon[i][0]) * (yPos - polygon[i][1]) / (polygon[j][1] - polygon[i][1]) + polygon[i][0]) {
            // Invert odd
            odd = !odd;
          }

          j = i;
        } // If the number of crossings was odd, the point is in the polygon


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

        const denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1); // Lines are parallel

        if (denominator === 0) {
          return null;
        }

        const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
        const ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator; // is the intersection along the segments

        if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
          return null;
        } // Return a object with the x and y coordinates of the intersection


        const x = x1 + ua * (x2 - x1);
        const y = y1 + ua * (y2 - y1);
        return [x, y];
      } // Find intersect with polygon


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

    //  Copyright (c) 2021 FlyByWire Simulations
    //  SPDX-License-Identifier: GPL-3.0
    let DatalinkProviders;

    (function (DatalinkProviders) {
      DatalinkProviders[DatalinkProviders["ARINC"] = 0] = "ARINC";
      DatalinkProviders[DatalinkProviders["SITA"] = 1] = "SITA";
      DatalinkProviders[DatalinkProviders["ProviderCount"] = 2] = "ProviderCount";
    })(DatalinkProviders || (DatalinkProviders = {}));

    class Aircraft$1 {
      constructor() {
        _defineProperty(this, "Latitude", 0.0);

        _defineProperty(this, "Longitude", 0.0);

        _defineProperty(this, "Altitude", 0.0);
      }

    }
    class OwnAircraft extends Aircraft$1 {
      constructor() {
        super(...arguments);

        _defineProperty(this, "AltitudeAboveGround", 0.0);

        _defineProperty(this, "PressureAltitude", 0.0);
      }

    } // maximum search range in NM

    const MaxSearchRange = 400; // maximum datarate under optimal conditions: 31.5 kb/s

    const VdlMaxDatarate = 31500; // dataprovider configuration

    const DatalinkConfiguration = [137.275, // ARINC
    137.975 // SITA
    ];

    var bind = function bind(fn, thisArg) {
      return function wrap() {
        var args = new Array(arguments.length);

        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }

        return fn.apply(thisArg, args);
      };
    };

    var toString = Object.prototype.toString;
    /**
     * Determine if a value is an Array
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is an Array, otherwise false
     */

    function isArray(val) {
      return toString.call(val) === '[object Array]';
    }
    /**
     * Determine if a value is undefined
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if the value is undefined, otherwise false
     */


    function isUndefined(val) {
      return typeof val === 'undefined';
    }
    /**
     * Determine if a value is a Buffer
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a Buffer, otherwise false
     */


    function isBuffer(val) {
      return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
    }
    /**
     * Determine if a value is an ArrayBuffer
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is an ArrayBuffer, otherwise false
     */


    function isArrayBuffer(val) {
      return toString.call(val) === '[object ArrayBuffer]';
    }
    /**
     * Determine if a value is a FormData
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is an FormData, otherwise false
     */


    function isFormData(val) {
      return typeof FormData !== 'undefined' && val instanceof FormData;
    }
    /**
     * Determine if a value is a view on an ArrayBuffer
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
     */


    function isArrayBufferView(val) {
      var result;

      if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
        result = ArrayBuffer.isView(val);
      } else {
        result = val && val.buffer && val.buffer instanceof ArrayBuffer;
      }

      return result;
    }
    /**
     * Determine if a value is a String
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a String, otherwise false
     */


    function isString(val) {
      return typeof val === 'string';
    }
    /**
     * Determine if a value is a Number
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a Number, otherwise false
     */


    function isNumber(val) {
      return typeof val === 'number';
    }
    /**
     * Determine if a value is an Object
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is an Object, otherwise false
     */


    function isObject(val) {
      return val !== null && typeof val === 'object';
    }
    /**
     * Determine if a value is a plain Object
     *
     * @param {Object} val The value to test
     * @return {boolean} True if value is a plain Object, otherwise false
     */


    function isPlainObject(val) {
      if (toString.call(val) !== '[object Object]') {
        return false;
      }

      var prototype = Object.getPrototypeOf(val);
      return prototype === null || prototype === Object.prototype;
    }
    /**
     * Determine if a value is a Date
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a Date, otherwise false
     */


    function isDate(val) {
      return toString.call(val) === '[object Date]';
    }
    /**
     * Determine if a value is a File
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a File, otherwise false
     */


    function isFile(val) {
      return toString.call(val) === '[object File]';
    }
    /**
     * Determine if a value is a Blob
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a Blob, otherwise false
     */


    function isBlob(val) {
      return toString.call(val) === '[object Blob]';
    }
    /**
     * Determine if a value is a Function
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a Function, otherwise false
     */


    function isFunction(val) {
      return toString.call(val) === '[object Function]';
    }
    /**
     * Determine if a value is a Stream
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a Stream, otherwise false
     */


    function isStream(val) {
      return isObject(val) && isFunction(val.pipe);
    }
    /**
     * Determine if a value is a URLSearchParams object
     *
     * @param {Object} val The value to test
     * @returns {boolean} True if value is a URLSearchParams object, otherwise false
     */


    function isURLSearchParams(val) {
      return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
    }
    /**
     * Trim excess whitespace off the beginning and end of a string
     *
     * @param {String} str The String to trim
     * @returns {String} The String freed of excess whitespace
     */


    function trim(str) {
      return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
    }
    /**
     * Determine if we're running in a standard browser environment
     *
     * This allows axios to run in a web worker, and react-native.
     * Both environments support XMLHttpRequest, but not fully standard globals.
     *
     * web workers:
     *  typeof window -> undefined
     *  typeof document -> undefined
     *
     * react-native:
     *  navigator.product -> 'ReactNative'
     * nativescript
     *  navigator.product -> 'NativeScript' or 'NS'
     */


    function isStandardBrowserEnv() {
      if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' || navigator.product === 'NativeScript' || navigator.product === 'NS')) {
        return false;
      }

      return typeof window !== 'undefined' && typeof document !== 'undefined';
    }
    /**
     * Iterate over an Array or an Object invoking a function for each item.
     *
     * If `obj` is an Array callback will be called passing
     * the value, index, and complete array for each item.
     *
     * If 'obj' is an Object callback will be called passing
     * the value, key, and complete object for each property.
     *
     * @param {Object|Array} obj The object to iterate
     * @param {Function} fn The callback to invoke for each item
     */


    function forEach(obj, fn) {
      // Don't bother if no value provided
      if (obj === null || typeof obj === 'undefined') {
        return;
      } // Force an array if not already something iterable


      if (typeof obj !== 'object') {
        /*eslint no-param-reassign:0*/
        obj = [obj];
      }

      if (isArray(obj)) {
        // Iterate over array values
        for (var i = 0, l = obj.length; i < l; i++) {
          fn.call(null, obj[i], i, obj);
        }
      } else {
        // Iterate over object keys
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            fn.call(null, obj[key], key, obj);
          }
        }
      }
    }
    /**
     * Accepts varargs expecting each argument to be an object, then
     * immutably merges the properties of each object and returns result.
     *
     * When multiple objects contain the same key the later object in
     * the arguments list will take precedence.
     *
     * Example:
     *
     * ```js
     * var result = merge({foo: 123}, {foo: 456});
     * console.log(result.foo); // outputs 456
     * ```
     *
     * @param {Object} obj1 Object to merge
     * @returns {Object} Result of all merge properties
     */


    function
      /* obj1, obj2, obj3, ... */
    merge() {
      var result = {};

      function assignValue(val, key) {
        if (isPlainObject(result[key]) && isPlainObject(val)) {
          result[key] = merge(result[key], val);
        } else if (isPlainObject(val)) {
          result[key] = merge({}, val);
        } else if (isArray(val)) {
          result[key] = val.slice();
        } else {
          result[key] = val;
        }
      }

      for (var i = 0, l = arguments.length; i < l; i++) {
        forEach(arguments[i], assignValue);
      }

      return result;
    }
    /**
     * Extends object a by mutably adding to it the properties of object b.
     *
     * @param {Object} a The object to be extended
     * @param {Object} b The object to copy properties from
     * @param {Object} thisArg The object to bind function to
     * @return {Object} The resulting value of object a
     */


    function extend(a, b, thisArg) {
      forEach(b, function assignValue(val, key) {
        if (thisArg && typeof val === 'function') {
          a[key] = bind(val, thisArg);
        } else {
          a[key] = val;
        }
      });
      return a;
    }
    /**
     * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
     *
     * @param {string} content with BOM
     * @return {string} content value without BOM
     */


    function stripBOM(content) {
      if (content.charCodeAt(0) === 0xFEFF) {
        content = content.slice(1);
      }

      return content;
    }

    var utils = {
      isArray: isArray,
      isArrayBuffer: isArrayBuffer,
      isBuffer: isBuffer,
      isFormData: isFormData,
      isArrayBufferView: isArrayBufferView,
      isString: isString,
      isNumber: isNumber,
      isObject: isObject,
      isPlainObject: isPlainObject,
      isUndefined: isUndefined,
      isDate: isDate,
      isFile: isFile,
      isBlob: isBlob,
      isFunction: isFunction,
      isStream: isStream,
      isURLSearchParams: isURLSearchParams,
      isStandardBrowserEnv: isStandardBrowserEnv,
      forEach: forEach,
      merge: merge,
      extend: extend,
      trim: trim,
      stripBOM: stripBOM
    };

    function encode(val) {
      return encodeURIComponent(val).replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
    }
    /**
     * Build a URL by appending params to the end
     *
     * @param {string} url The base of the url (e.g., http://www.google.com)
     * @param {object} [params] The params to be appended
     * @returns {string} The formatted url
     */


    var buildURL = function buildURL(url, params, paramsSerializer) {
      /*eslint no-param-reassign:0*/
      if (!params) {
        return url;
      }

      var serializedParams;

      if (paramsSerializer) {
        serializedParams = paramsSerializer(params);
      } else if (utils.isURLSearchParams(params)) {
        serializedParams = params.toString();
      } else {
        var parts = [];
        utils.forEach(params, function serialize(val, key) {
          if (val === null || typeof val === 'undefined') {
            return;
          }

          if (utils.isArray(val)) {
            key = key + '[]';
          } else {
            val = [val];
          }

          utils.forEach(val, function parseValue(v) {
            if (utils.isDate(v)) {
              v = v.toISOString();
            } else if (utils.isObject(v)) {
              v = JSON.stringify(v);
            }

            parts.push(encode(key) + '=' + encode(v));
          });
        });
        serializedParams = parts.join('&');
      }

      if (serializedParams) {
        var hashmarkIndex = url.indexOf('#');

        if (hashmarkIndex !== -1) {
          url = url.slice(0, hashmarkIndex);
        }

        url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
      }

      return url;
    };

    function InterceptorManager() {
      this.handlers = [];
    }
    /**
     * Add a new interceptor to the stack
     *
     * @param {Function} fulfilled The function to handle `then` for a `Promise`
     * @param {Function} rejected The function to handle `reject` for a `Promise`
     *
     * @return {Number} An ID used to remove interceptor later
     */


    InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
      this.handlers.push({
        fulfilled: fulfilled,
        rejected: rejected,
        synchronous: options ? options.synchronous : false,
        runWhen: options ? options.runWhen : null
      });
      return this.handlers.length - 1;
    };
    /**
     * Remove an interceptor from the stack
     *
     * @param {Number} id The ID that was returned by `use`
     */


    InterceptorManager.prototype.eject = function eject(id) {
      if (this.handlers[id]) {
        this.handlers[id] = null;
      }
    };
    /**
     * Iterate over all the registered interceptors
     *
     * This method is particularly useful for skipping over any
     * interceptors that may have become `null` calling `eject`.
     *
     * @param {Function} fn The function to call for each interceptor
     */


    InterceptorManager.prototype.forEach = function forEach(fn) {
      utils.forEach(this.handlers, function forEachHandler(h) {
        if (h !== null) {
          fn(h);
        }
      });
    };

    var InterceptorManager_1 = InterceptorManager;

    var normalizeHeaderName = function normalizeHeaderName(headers, normalizedName) {
      utils.forEach(headers, function processHeader(value, name) {
        if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
          headers[normalizedName] = value;
          delete headers[name];
        }
      });
    };

    /**
     * Update an Error with the specified config, error code, and response.
     *
     * @param {Error} error The error to update.
     * @param {Object} config The config.
     * @param {string} [code] The error code (for example, 'ECONNABORTED').
     * @param {Object} [request] The request.
     * @param {Object} [response] The response.
     * @returns {Error} The error.
     */

    var enhanceError = function enhanceError(error, config, code, request, response) {
      error.config = config;

      if (code) {
        error.code = code;
      }

      error.request = request;
      error.response = response;
      error.isAxiosError = true;

      error.toJSON = function toJSON() {
        return {
          // Standard
          message: this.message,
          name: this.name,
          // Microsoft
          description: this.description,
          number: this.number,
          // Mozilla
          fileName: this.fileName,
          lineNumber: this.lineNumber,
          columnNumber: this.columnNumber,
          stack: this.stack,
          // Axios
          config: this.config,
          code: this.code
        };
      };

      return error;
    };

    /**
     * Create an Error with the specified message, config, error code, request and response.
     *
     * @param {string} message The error message.
     * @param {Object} config The config.
     * @param {string} [code] The error code (for example, 'ECONNABORTED').
     * @param {Object} [request] The request.
     * @param {Object} [response] The response.
     * @returns {Error} The created error.
     */


    var createError = function createError(message, config, code, request, response) {
      var error = new Error(message);
      return enhanceError(error, config, code, request, response);
    };

    /**
     * Resolve or reject a Promise based on response status.
     *
     * @param {Function} resolve A function that resolves the promise.
     * @param {Function} reject A function that rejects the promise.
     * @param {object} response The response.
     */


    var settle = function settle(resolve, reject, response) {
      var validateStatus = response.config.validateStatus;

      if (!response.status || !validateStatus || validateStatus(response.status)) {
        resolve(response);
      } else {
        reject(createError('Request failed with status code ' + response.status, response.config, null, response.request, response));
      }
    };

    var cookies = utils.isStandardBrowserEnv() ? // Standard browser envs support document.cookie
    function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },
        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return match ? decodeURIComponent(match[3]) : null;
        },
        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    }() : // Non standard browser env (web workers, react-native) lack needed support.
    function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() {
          return null;
        },
        remove: function remove() {}
      };
    }();

    /**
     * Determines whether the specified URL is absolute
     *
     * @param {string} url The URL to test
     * @returns {boolean} True if the specified URL is absolute, otherwise false
     */

    var isAbsoluteURL = function isAbsoluteURL(url) {
      // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
      // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
      // by any combination of letters, digits, plus, period, or hyphen.
      return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
    };

    /**
     * Creates a new URL by combining the specified URLs
     *
     * @param {string} baseURL The base URL
     * @param {string} relativeURL The relative URL
     * @returns {string} The combined URL
     */

    var combineURLs = function combineURLs(baseURL, relativeURL) {
      return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
    };

    /**
     * Creates a new URL by combining the baseURL with the requestedURL,
     * only when the requestedURL is not already an absolute URL.
     * If the requestURL is absolute, this function returns the requestedURL untouched.
     *
     * @param {string} baseURL The base URL
     * @param {string} requestedURL Absolute or relative URL to combine
     * @returns {string} The combined full path
     */


    var buildFullPath = function buildFullPath(baseURL, requestedURL) {
      if (baseURL && !isAbsoluteURL(requestedURL)) {
        return combineURLs(baseURL, requestedURL);
      }

      return requestedURL;
    };

    // c.f. https://nodejs.org/api/http.html#http_message_headers


    var ignoreDuplicateOf = ['age', 'authorization', 'content-length', 'content-type', 'etag', 'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since', 'last-modified', 'location', 'max-forwards', 'proxy-authorization', 'referer', 'retry-after', 'user-agent'];
    /**
     * Parse headers into an object
     *
     * ```
     * Date: Wed, 27 Aug 2014 08:58:49 GMT
     * Content-Type: application/json
     * Connection: keep-alive
     * Transfer-Encoding: chunked
     * ```
     *
     * @param {String} headers Headers needing to be parsed
     * @returns {Object} Headers parsed into an object
     */

    var parseHeaders = function parseHeaders(headers) {
      var parsed = {};
      var key;
      var val;
      var i;

      if (!headers) {
        return parsed;
      }

      utils.forEach(headers.split('\n'), function parser(line) {
        i = line.indexOf(':');
        key = utils.trim(line.substr(0, i)).toLowerCase();
        val = utils.trim(line.substr(i + 1));

        if (key) {
          if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
            return;
          }

          if (key === 'set-cookie') {
            parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
          } else {
            parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
          }
        }
      });
      return parsed;
    };

    var isURLSameOrigin = utils.isStandardBrowserEnv() ? // Standard browser envs have full support of the APIs needed to test
    // whether the request URL is of the same origin as current location.
    function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;
      /**
      * Parse a URL to discover it's components
      *
      * @param {String} url The URL to be parsed
      * @returns {Object}
      */

      function resolveURL(url) {
        var href = url;

        if (msie) {
          // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href); // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils

        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: urlParsingNode.pathname.charAt(0) === '/' ? urlParsingNode.pathname : '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);
      /**
      * Determine if a URL shares the same origin as the current location
      *
      * @param {String} requestURL The URL to test
      * @returns {boolean} True if URL shares the same origin, otherwise false
      */

      return function isURLSameOrigin(requestURL) {
        var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
        return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
      };
    }() : // Non standard browser envs (web workers, react-native) lack needed support.
    function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    }();

    var xhr = function xhrAdapter(config) {
      return new Promise(function dispatchXhrRequest(resolve, reject) {
        var requestData = config.data;
        var requestHeaders = config.headers;
        var responseType = config.responseType;

        if (utils.isFormData(requestData)) {
          delete requestHeaders['Content-Type']; // Let the browser set it
        }

        var request = new XMLHttpRequest(); // HTTP basic authentication

        if (config.auth) {
          var username = config.auth.username || '';
          var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
          requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
        }

        var fullPath = buildFullPath(config.baseURL, config.url);
        request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true); // Set the request timeout in MS

        request.timeout = config.timeout;

        function onloadend() {
          if (!request) {
            return;
          } // Prepare the response


          var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
          var responseData = !responseType || responseType === 'text' || responseType === 'json' ? request.responseText : request.response;
          var response = {
            data: responseData,
            status: request.status,
            statusText: request.statusText,
            headers: responseHeaders,
            config: config,
            request: request
          };
          settle(resolve, reject, response); // Clean up request

          request = null;
        }

        if ('onloadend' in request) {
          // Use onloadend if available
          request.onloadend = onloadend;
        } else {
          // Listen for ready state to emulate onloadend
          request.onreadystatechange = function handleLoad() {
            if (!request || request.readyState !== 4) {
              return;
            } // The request errored out and we didn't get a response, this will be
            // handled by onerror instead
            // With one exception: request that using file: protocol, most browsers
            // will return status as 0 even though it's a successful request


            if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
              return;
            } // readystate handler is calling before onerror or ontimeout handlers,
            // so we should call onloadend on the next 'tick'


            setTimeout(onloadend);
          };
        } // Handle browser request cancellation (as opposed to a manual cancellation)


        request.onabort = function handleAbort() {
          if (!request) {
            return;
          }

          reject(createError('Request aborted', config, 'ECONNABORTED', request)); // Clean up request

          request = null;
        }; // Handle low level network errors


        request.onerror = function handleError() {
          // Real errors are hidden from us by the browser
          // onerror should only fire if it's a network error
          reject(createError('Network Error', config, null, request)); // Clean up request

          request = null;
        }; // Handle timeout


        request.ontimeout = function handleTimeout() {
          var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';

          if (config.timeoutErrorMessage) {
            timeoutErrorMessage = config.timeoutErrorMessage;
          }

          reject(createError(timeoutErrorMessage, config, config.transitional && config.transitional.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED', request)); // Clean up request

          request = null;
        }; // Add xsrf header
        // This is only done if running in a standard browser environment.
        // Specifically not if we're in a web worker, or react-native.


        if (utils.isStandardBrowserEnv()) {
          // Add xsrf header
          var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : undefined;

          if (xsrfValue) {
            requestHeaders[config.xsrfHeaderName] = xsrfValue;
          }
        } // Add headers to the request


        if ('setRequestHeader' in request) {
          utils.forEach(requestHeaders, function setRequestHeader(val, key) {
            if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
              // Remove Content-Type if data is undefined
              delete requestHeaders[key];
            } else {
              // Otherwise add header to the request
              request.setRequestHeader(key, val);
            }
          });
        } // Add withCredentials to request if needed


        if (!utils.isUndefined(config.withCredentials)) {
          request.withCredentials = !!config.withCredentials;
        } // Add responseType to request if needed


        if (responseType && responseType !== 'json') {
          request.responseType = config.responseType;
        } // Handle progress if needed


        if (typeof config.onDownloadProgress === 'function') {
          request.addEventListener('progress', config.onDownloadProgress);
        } // Not all browsers support upload events


        if (typeof config.onUploadProgress === 'function' && request.upload) {
          request.upload.addEventListener('progress', config.onUploadProgress);
        }

        if (config.cancelToken) {
          // Handle cancellation
          config.cancelToken.promise.then(function onCanceled(cancel) {
            if (!request) {
              return;
            }

            request.abort();
            reject(cancel); // Clean up request

            request = null;
          });
        }

        if (!requestData) {
          requestData = null;
        } // Send the request


        request.send(requestData);
      });
    };

    var DEFAULT_CONTENT_TYPE = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    function setContentTypeIfUnset(headers, value) {
      if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
        headers['Content-Type'] = value;
      }
    }

    function getDefaultAdapter() {
      var adapter;

      if (typeof XMLHttpRequest !== 'undefined') {
        // For browsers use XHR adapter
        adapter = xhr;
      } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
        // For node use HTTP adapter
        adapter = xhr;
      }

      return adapter;
    }

    function stringifySafely(rawValue, parser, encoder) {
      if (utils.isString(rawValue)) {
        try {
          (parser || JSON.parse)(rawValue);
          return utils.trim(rawValue);
        } catch (e) {
          if (e.name !== 'SyntaxError') {
            throw e;
          }
        }
      }

      return (encoder || JSON.stringify)(rawValue);
    }

    var defaults = {
      transitional: {
        silentJSONParsing: true,
        forcedJSONParsing: true,
        clarifyTimeoutError: false
      },
      adapter: getDefaultAdapter(),
      transformRequest: [function transformRequest(data, headers) {
        normalizeHeaderName(headers, 'Accept');
        normalizeHeaderName(headers, 'Content-Type');

        if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
          return data;
        }

        if (utils.isArrayBufferView(data)) {
          return data.buffer;
        }

        if (utils.isURLSearchParams(data)) {
          setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
          return data.toString();
        }

        if (utils.isObject(data) || headers && headers['Content-Type'] === 'application/json') {
          setContentTypeIfUnset(headers, 'application/json');
          return stringifySafely(data);
        }

        return data;
      }],
      transformResponse: [function transformResponse(data) {
        var transitional = this.transitional;
        var silentJSONParsing = transitional && transitional.silentJSONParsing;
        var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
        var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';

        if (strictJSONParsing || forcedJSONParsing && utils.isString(data) && data.length) {
          try {
            return JSON.parse(data);
          } catch (e) {
            if (strictJSONParsing) {
              if (e.name === 'SyntaxError') {
                throw enhanceError(e, this, 'E_JSON_PARSE');
              }

              throw e;
            }
          }
        }

        return data;
      }],

      /**
       * A timeout in milliseconds to abort a request. If set to 0 (default) a
       * timeout is not created.
       */
      timeout: 0,
      xsrfCookieName: 'XSRF-TOKEN',
      xsrfHeaderName: 'X-XSRF-TOKEN',
      maxContentLength: -1,
      maxBodyLength: -1,
      validateStatus: function validateStatus(status) {
        return status >= 200 && status < 300;
      }
    };
    defaults.headers = {
      common: {
        'Accept': 'application/json, text/plain, */*'
      }
    };
    utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
      defaults.headers[method] = {};
    });
    utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
      defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
    });
    var defaults_1 = defaults;

    /**
     * Transform the data for a request or a response
     *
     * @param {Object|String} data The data to be transformed
     * @param {Array} headers The headers for the request or response
     * @param {Array|Function} fns A single function or Array of functions
     * @returns {*} The resulting transformed data
     */


    var transformData = function transformData(data, headers, fns) {
      var context = this || defaults_1;
      /*eslint no-param-reassign:0*/

      utils.forEach(fns, function transform(fn) {
        data = fn.call(context, data, headers);
      });
      return data;
    };

    var isCancel = function isCancel(value) {
      return !!(value && value.__CANCEL__);
    };

    /**
     * Throws a `Cancel` if cancellation has been requested.
     */


    function throwIfCancellationRequested(config) {
      if (config.cancelToken) {
        config.cancelToken.throwIfRequested();
      }
    }
    /**
     * Dispatch a request to the server using the configured adapter.
     *
     * @param {object} config The config that is to be used for the request
     * @returns {Promise} The Promise to be fulfilled
     */


    var dispatchRequest = function dispatchRequest(config) {
      throwIfCancellationRequested(config); // Ensure headers exist

      config.headers = config.headers || {}; // Transform request data

      config.data = transformData.call(config, config.data, config.headers, config.transformRequest); // Flatten headers

      config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers);
      utils.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function cleanHeaderConfig(method) {
        delete config.headers[method];
      });
      var adapter = config.adapter || defaults_1.adapter;
      return adapter(config).then(function onAdapterResolution(response) {
        throwIfCancellationRequested(config); // Transform response data

        response.data = transformData.call(config, response.data, response.headers, config.transformResponse);
        return response;
      }, function onAdapterRejection(reason) {
        if (!isCancel(reason)) {
          throwIfCancellationRequested(config); // Transform response data

          if (reason && reason.response) {
            reason.response.data = transformData.call(config, reason.response.data, reason.response.headers, config.transformResponse);
          }
        }

        return Promise.reject(reason);
      });
    };

    /**
     * Config-specific merge-function which creates a new config-object
     * by merging two configuration objects together.
     *
     * @param {Object} config1
     * @param {Object} config2
     * @returns {Object} New object resulting from merging config2 to config1
     */


    var mergeConfig = function mergeConfig(config1, config2) {
      // eslint-disable-next-line no-param-reassign
      config2 = config2 || {};
      var config = {};
      var valueFromConfig2Keys = ['url', 'method', 'data'];
      var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
      var defaultToConfig2Keys = ['baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer', 'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName', 'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress', 'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent', 'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'];
      var directMergeKeys = ['validateStatus'];

      function getMergedValue(target, source) {
        if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
          return utils.merge(target, source);
        } else if (utils.isPlainObject(source)) {
          return utils.merge({}, source);
        } else if (utils.isArray(source)) {
          return source.slice();
        }

        return source;
      }

      function mergeDeepProperties(prop) {
        if (!utils.isUndefined(config2[prop])) {
          config[prop] = getMergedValue(config1[prop], config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
          config[prop] = getMergedValue(undefined, config1[prop]);
        }
      }

      utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
          config[prop] = getMergedValue(undefined, config2[prop]);
        }
      });
      utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);
      utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
          config[prop] = getMergedValue(undefined, config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
          config[prop] = getMergedValue(undefined, config1[prop]);
        }
      });
      utils.forEach(directMergeKeys, function merge(prop) {
        if (prop in config2) {
          config[prop] = getMergedValue(config1[prop], config2[prop]);
        } else if (prop in config1) {
          config[prop] = getMergedValue(undefined, config1[prop]);
        }
      });
      var axiosKeys = valueFromConfig2Keys.concat(mergeDeepPropertiesKeys).concat(defaultToConfig2Keys).concat(directMergeKeys);
      var otherKeys = Object.keys(config1).concat(Object.keys(config2)).filter(function filterAxiosKeys(key) {
        return axiosKeys.indexOf(key) === -1;
      });
      utils.forEach(otherKeys, mergeDeepProperties);
      return config;
    };

    var name = "axios";
    var version = "0.21.4";
    var description = "Promise based HTTP client for the browser and node.js";
    var main = "index.js";
    var scripts = {
    	test: "grunt test",
    	start: "node ./sandbox/server.js",
    	build: "NODE_ENV=production grunt build",
    	preversion: "npm test",
    	version: "npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json",
    	postversion: "git push && git push --tags",
    	examples: "node ./examples/server.js",
    	coveralls: "cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js",
    	fix: "eslint --fix lib/**/*.js"
    };
    var repository = {
    	type: "git",
    	url: "https://github.com/axios/axios.git"
    };
    var keywords = [
    	"xhr",
    	"http",
    	"ajax",
    	"promise",
    	"node"
    ];
    var author = "Matt Zabriskie";
    var license = "MIT";
    var bugs = {
    	url: "https://github.com/axios/axios/issues"
    };
    var homepage = "https://axios-http.com";
    var devDependencies = {
    	coveralls: "^3.0.0",
    	"es6-promise": "^4.2.4",
    	grunt: "^1.3.0",
    	"grunt-banner": "^0.6.0",
    	"grunt-cli": "^1.2.0",
    	"grunt-contrib-clean": "^1.1.0",
    	"grunt-contrib-watch": "^1.0.0",
    	"grunt-eslint": "^23.0.0",
    	"grunt-karma": "^4.0.0",
    	"grunt-mocha-test": "^0.13.3",
    	"grunt-ts": "^6.0.0-beta.19",
    	"grunt-webpack": "^4.0.2",
    	"istanbul-instrumenter-loader": "^1.0.0",
    	"jasmine-core": "^2.4.1",
    	karma: "^6.3.2",
    	"karma-chrome-launcher": "^3.1.0",
    	"karma-firefox-launcher": "^2.1.0",
    	"karma-jasmine": "^1.1.1",
    	"karma-jasmine-ajax": "^0.1.13",
    	"karma-safari-launcher": "^1.0.0",
    	"karma-sauce-launcher": "^4.3.6",
    	"karma-sinon": "^1.0.5",
    	"karma-sourcemap-loader": "^0.3.8",
    	"karma-webpack": "^4.0.2",
    	"load-grunt-tasks": "^3.5.2",
    	minimist: "^1.2.0",
    	mocha: "^8.2.1",
    	sinon: "^4.5.0",
    	"terser-webpack-plugin": "^4.2.3",
    	typescript: "^4.0.5",
    	"url-search-params": "^0.10.0",
    	webpack: "^4.44.2",
    	"webpack-dev-server": "^3.11.0"
    };
    var browser = {
    	"./lib/adapters/http.js": "./lib/adapters/xhr.js"
    };
    var jsdelivr = "dist/axios.min.js";
    var unpkg = "dist/axios.min.js";
    var typings = "./index.d.ts";
    var dependencies = {
    	"follow-redirects": "^1.14.0"
    };
    var bundlesize = [
    	{
    		path: "./dist/axios.min.js",
    		threshold: "5kB"
    	}
    ];
    var pkg = {
    	name: name,
    	version: version,
    	description: description,
    	main: main,
    	scripts: scripts,
    	repository: repository,
    	keywords: keywords,
    	author: author,
    	license: license,
    	bugs: bugs,
    	homepage: homepage,
    	devDependencies: devDependencies,
    	browser: browser,
    	jsdelivr: jsdelivr,
    	unpkg: unpkg,
    	typings: typings,
    	dependencies: dependencies,
    	bundlesize: bundlesize
    };

    var validators$1 = {}; // eslint-disable-next-line func-names

    ['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function (type, i) {
      validators$1[type] = function validator(thing) {
        return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
      };
    });
    var deprecatedWarnings = {};
    var currentVerArr = pkg.version.split('.');
    /**
     * Compare package versions
     * @param {string} version
     * @param {string?} thanVersion
     * @returns {boolean}
     */

    function isOlderVersion(version, thanVersion) {
      var pkgVersionArr = thanVersion ? thanVersion.split('.') : currentVerArr;
      var destVer = version.split('.');

      for (var i = 0; i < 3; i++) {
        if (pkgVersionArr[i] > destVer[i]) {
          return true;
        } else if (pkgVersionArr[i] < destVer[i]) {
          return false;
        }
      }

      return false;
    }
    /**
     * Transitional option validator
     * @param {function|boolean?} validator
     * @param {string?} version
     * @param {string} message
     * @returns {function}
     */


    validators$1.transitional = function transitional(validator, version, message) {
      var isDeprecated = version && isOlderVersion(version);

      function formatMessage(opt, desc) {
        return '[Axios v' + pkg.version + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
      } // eslint-disable-next-line func-names


      return function (value, opt, opts) {
        if (validator === false) {
          throw new Error(formatMessage(opt, ' has been removed in ' + version));
        }

        if (isDeprecated && !deprecatedWarnings[opt]) {
          deprecatedWarnings[opt] = true; // eslint-disable-next-line no-console

          console.warn(formatMessage(opt, ' has been deprecated since v' + version + ' and will be removed in the near future'));
        }

        return validator ? validator(value, opt, opts) : true;
      };
    };
    /**
     * Assert object's properties type
     * @param {object} options
     * @param {object} schema
     * @param {boolean?} allowUnknown
     */


    function assertOptions(options, schema, allowUnknown) {
      if (typeof options !== 'object') {
        throw new TypeError('options must be an object');
      }

      var keys = Object.keys(options);
      var i = keys.length;

      while (i-- > 0) {
        var opt = keys[i];
        var validator = schema[opt];

        if (validator) {
          var value = options[opt];
          var result = value === undefined || validator(value, opt, options);

          if (result !== true) {
            throw new TypeError('option ' + opt + ' must be ' + result);
          }

          continue;
        }

        if (allowUnknown !== true) {
          throw Error('Unknown option ' + opt);
        }
      }
    }

    var validator = {
      isOlderVersion: isOlderVersion,
      assertOptions: assertOptions,
      validators: validators$1
    };

    var validators = validator.validators;
    /**
     * Create a new instance of Axios
     *
     * @param {Object} instanceConfig The default config for the instance
     */

    function Axios(instanceConfig) {
      this.defaults = instanceConfig;
      this.interceptors = {
        request: new InterceptorManager_1(),
        response: new InterceptorManager_1()
      };
    }
    /**
     * Dispatch a request
     *
     * @param {Object} config The config specific for this request (merged with this.defaults)
     */


    Axios.prototype.request = function request(config) {
      /*eslint no-param-reassign:0*/
      // Allow for axios('example/url'[, config]) a la fetch API
      if (typeof config === 'string') {
        config = arguments[1] || {};
        config.url = arguments[0];
      } else {
        config = config || {};
      }

      config = mergeConfig(this.defaults, config); // Set config.method

      if (config.method) {
        config.method = config.method.toLowerCase();
      } else if (this.defaults.method) {
        config.method = this.defaults.method.toLowerCase();
      } else {
        config.method = 'get';
      }

      var transitional = config.transitional;

      if (transitional !== undefined) {
        validator.assertOptions(transitional, {
          silentJSONParsing: validators.transitional(validators.boolean, '1.0.0'),
          forcedJSONParsing: validators.transitional(validators.boolean, '1.0.0'),
          clarifyTimeoutError: validators.transitional(validators.boolean, '1.0.0')
        }, false);
      } // filter out skipped interceptors


      var requestInterceptorChain = [];
      var synchronousRequestInterceptors = true;
      this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
          return;
        }

        synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
        requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
      });
      var responseInterceptorChain = [];
      this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
      });
      var promise;

      if (!synchronousRequestInterceptors) {
        var chain = [dispatchRequest, undefined];
        Array.prototype.unshift.apply(chain, requestInterceptorChain);
        chain = chain.concat(responseInterceptorChain);
        promise = Promise.resolve(config);

        while (chain.length) {
          promise = promise.then(chain.shift(), chain.shift());
        }

        return promise;
      }

      var newConfig = config;

      while (requestInterceptorChain.length) {
        var onFulfilled = requestInterceptorChain.shift();
        var onRejected = requestInterceptorChain.shift();

        try {
          newConfig = onFulfilled(newConfig);
        } catch (error) {
          onRejected(error);
          break;
        }
      }

      try {
        promise = dispatchRequest(newConfig);
      } catch (error) {
        return Promise.reject(error);
      }

      while (responseInterceptorChain.length) {
        promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
      }

      return promise;
    };

    Axios.prototype.getUri = function getUri(config) {
      config = mergeConfig(this.defaults, config);
      return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
    }; // Provide aliases for supported request methods


    utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
      /*eslint func-names:0*/
      Axios.prototype[method] = function (url, config) {
        return this.request(mergeConfig(config || {}, {
          method: method,
          url: url,
          data: (config || {}).data
        }));
      };
    });
    utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
      /*eslint func-names:0*/
      Axios.prototype[method] = function (url, data, config) {
        return this.request(mergeConfig(config || {}, {
          method: method,
          url: url,
          data: data
        }));
      };
    });
    var Axios_1 = Axios;

    /**
     * A `Cancel` is an object that is thrown when an operation is canceled.
     *
     * @class
     * @param {string=} message The message.
     */

    function Cancel(message) {
      this.message = message;
    }

    Cancel.prototype.toString = function toString() {
      return 'Cancel' + (this.message ? ': ' + this.message : '');
    };

    Cancel.prototype.__CANCEL__ = true;
    var Cancel_1 = Cancel;

    /**
     * A `CancelToken` is an object that can be used to request cancellation of an operation.
     *
     * @class
     * @param {Function} executor The executor function.
     */


    function CancelToken(executor) {
      if (typeof executor !== 'function') {
        throw new TypeError('executor must be a function.');
      }

      var resolvePromise;
      this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve;
      });
      var token = this;
      executor(function cancel(message) {
        if (token.reason) {
          // Cancellation has already been requested
          return;
        }

        token.reason = new Cancel_1(message);
        resolvePromise(token.reason);
      });
    }
    /**
     * Throws a `Cancel` if cancellation has been requested.
     */


    CancelToken.prototype.throwIfRequested = function throwIfRequested() {
      if (this.reason) {
        throw this.reason;
      }
    };
    /**
     * Returns an object that contains a new `CancelToken` and a function that, when called,
     * cancels the `CancelToken`.
     */


    CancelToken.source = function source() {
      var cancel;
      var token = new CancelToken(function executor(c) {
        cancel = c;
      });
      return {
        token: token,
        cancel: cancel
      };
    };

    var CancelToken_1 = CancelToken;

    /**
     * Syntactic sugar for invoking a function and expanding an array for arguments.
     *
     * Common use case would be to use `Function.prototype.apply`.
     *
     *  ```js
     *  function f(x, y, z) {}
     *  var args = [1, 2, 3];
     *  f.apply(null, args);
     *  ```
     *
     * With `spread` this example can be re-written.
     *
     *  ```js
     *  spread(function(x, y, z) {})([1, 2, 3]);
     *  ```
     *
     * @param {Function} callback
     * @returns {Function}
     */

    var spread = function spread(callback) {
      return function wrap(arr) {
        return callback.apply(null, arr);
      };
    };

    /**
     * Determines whether the payload is an error thrown by Axios
     *
     * @param {*} payload The value to test
     * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
     */

    var isAxiosError = function isAxiosError(payload) {
      return typeof payload === 'object' && payload.isAxiosError === true;
    };

    /**
     * Create an instance of Axios
     *
     * @param {Object} defaultConfig The default config for the instance
     * @return {Axios} A new instance of Axios
     */


    function createInstance(defaultConfig) {
      var context = new Axios_1(defaultConfig);
      var instance = bind(Axios_1.prototype.request, context); // Copy axios.prototype to instance

      utils.extend(instance, Axios_1.prototype, context); // Copy context to instance

      utils.extend(instance, context);
      return instance;
    } // Create the default instance to be exported


    var axios$1 = createInstance(defaults_1); // Expose Axios class to allow class inheritance

    axios$1.Axios = Axios_1; // Factory for creating new instances

    axios$1.create = function create(instanceConfig) {
      return createInstance(mergeConfig(axios$1.defaults, instanceConfig));
    }; // Expose Cancel & CancelToken


    axios$1.Cancel = Cancel_1;
    axios$1.CancelToken = CancelToken_1;
    axios$1.isCancel = isCancel; // Expose all/spread

    axios$1.all = function all(promises) {
      return Promise.all(promises);
    };

    axios$1.spread = spread; // Expose isAxiosError

    axios$1.isAxiosError = isAxiosError;
    var axios_1 = axios$1; // Allow use of default import syntax in TypeScript

    var _default = axios$1;
    axios_1.default = _default;

    var axios = axios_1;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    /* global Reflect, Promise */

    var extendStatics = function (d, b) {
      extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      };

      return extendStatics(d, b);
    };

    function __extends(d, b) {
      if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function () {
      __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];

          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }

        return t;
      };

      return __assign.apply(this, arguments);
    };

    function __awaiter(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
          resolve(value);
        });
      }

      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }

        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }

        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }

        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    }

    function __generator(thisArg, body) {
      var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      },
          f,
          y,
          t,
          g;
      return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
      }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
      }), g;

      function verb(n) {
        return function (v) {
          return step([n, v]);
        };
      }

      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");

        while (_) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];

          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;

            case 4:
              _.label++;
              return {
                value: op[1],
                done: false
              };

            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;

            case 7:
              op = _.ops.pop();

              _.trys.pop();

              continue;

            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }

              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }

              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }

              if (t && _.label < t[2]) {
                _.label = t[2];

                _.ops.push(op);

                break;
              }

              if (t[2]) _.ops.pop();

              _.trys.pop();

              continue;
          }

          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }

        if (op[0] & 5) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    }

    function get(url, headers) {
      return axios.get(url.href, {
        headers: headers
      }).then(function (res) {
        return res.data;
      });
    }

    function del(url, headers) {
      return axios["delete"](url.href, {
        headers: headers
      }).then(function (res) {
        return res.data;
      });
    }

    function post(url, body, headers) {
      var headersToSend = __assign({
        'Content-Type': 'application/json'
      }, headers);

      return axios.post(url.href, body, {
        headers: headersToSend
      }).then(function (res) {
        return res.data;
      });
    }

    function put(url, body, headers) {
      var headersToSend = __assign({
        'Content-Type': 'application/json'
      }, headers);

      return axios.put(url.href, body, {
        headers: headersToSend
      }).then(function (res) {
        return res.data;
      });
    }

    var AtcType;

    (function (AtcType) {
      AtcType[AtcType["UNKNOWN"] = 0] = "UNKNOWN";
      AtcType[AtcType["DELIVERY"] = 1] = "DELIVERY";
      AtcType[AtcType["GROUND"] = 2] = "GROUND";
      AtcType[AtcType["TOWER"] = 3] = "TOWER";
      AtcType[AtcType["DEPARTURE"] = 4] = "DEPARTURE";
      AtcType[AtcType["APPROACH"] = 5] = "APPROACH";
      AtcType[AtcType["RADAR"] = 6] = "RADAR";
      AtcType[AtcType["ATIS"] = 7] = "ATIS";
    })(AtcType || (AtcType = {}));

    var ATC =
    /** @class */
    function () {
      function ATC() {}

      ATC.get = function (source) {
        return __awaiter(this, void 0, void 0, function () {
          var url;
          return __generator(this, function (_a) {
            if (!source) {
              throw new Error('No source provided');
            }

            url = new URL("/api/v1/atc?source=" + source, NXApi.url);
            return [2
            /*return*/
            , get(url)];
          });
        });
      };

      return ATC;
    }();

    var Atis =
    /** @class */
    function () {
      function Atis() {}

      Atis.get = function (icao, source) {
        return __awaiter(this, void 0, void 0, function () {
          var url;
          return __generator(this, function (_a) {
            if (!icao) {
              throw new Error('No ICAO provided');
            }

            url = new URL("/atis/" + icao, NXApi.url);

            if (source) {
              url.searchParams.set('source', source);
            }

            return [2
            /*return*/
            , get(url)];
          });
        });
      };

      return Atis;
    }();

    var Metar =
    /** @class */
    function () {
      function Metar() {}

      Metar.get = function (icao, source) {
        return __awaiter(this, void 0, void 0, function () {
          var url;
          return __generator(this, function (_a) {
            if (!icao) {
              throw new Error('No ICAO provided');
            }

            url = new URL("/metar/" + icao, NXApi.url);

            if (source) {
              url.searchParams.set('source', source);
            }

            return [2
            /*return*/
            , get(url)];
          });
        });
      };

      return Metar;
    }();

    var Taf =
    /** @class */
    function () {
      function Taf() {}

      Taf.get = function (icao, source) {
        return __awaiter(this, void 0, void 0, function () {
          var url;
          return __generator(this, function (_a) {
            if (!icao) {
              throw new Error('No ICAO provided');
            }

            url = new URL("/taf/" + icao, NXApi.url);

            if (source) {
              url.searchParams.set('source', source);
            }

            return [2
            /*return*/
            , get(url)];
          });
        });
      };

      return Taf;
    }();

    var TelexNotConnectedError =
    /** @class */
    function (_super) {
      __extends(TelexNotConnectedError, _super);

      function TelexNotConnectedError() {
        return _super.call(this, 'TELEX is not connected') || this;
      }

      return TelexNotConnectedError;
    }(Error);

    var Telex =
    /** @class */
    function () {
      function Telex() {}

      Telex.connect = function (status) {
        return post(new URL('/txcxn', NXApi.url), Telex.buildBody(status)).then(function (res) {
          Telex.accessToken = res.accessToken;
          return res;
        });
      };

      Telex.update = function (status) {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (_a) {
            Telex.connectionOrThrow();
            return [2
            /*return*/
            , put(new URL('/txcxn', NXApi.url), Telex.buildBody(status), {
              Authorization: Telex.buildToken()
            }).then(Telex.mapConnection)];
          });
        });
      };

      Telex.disconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (_a) {
            Telex.connectionOrThrow();
            return [2
            /*return*/
            , del(new URL('/txcxn', NXApi.url), {
              Authorization: Telex.buildToken()
            }).then(function () {
              Telex.accessToken = '';
            })];
          });
        });
      };

      Telex.sendMessage = function (recipientFlight, message) {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (_a) {
            Telex.connectionOrThrow();
            return [2
            /*return*/
            , post(new URL('/txmsg', NXApi.url), {
              to: recipientFlight,
              message: message
            }, {
              Authorization: Telex.buildToken()
            }).then(Telex.mapMessage)];
          });
        });
      };

      Telex.fetchMessages = function () {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (_a) {
            Telex.connectionOrThrow();
            return [2
            /*return*/
            , get(new URL('/txmsg', NXApi.url), {
              Authorization: Telex.buildToken()
            }).then(function (res) {
              return res.map(Telex.mapMessage);
            })];
          });
        });
      };

      Telex.fetchConnections = function (skip, take, bounds) {
        var url = new URL('/txcxn', NXApi.url);

        if (skip) {
          url.searchParams.set('skip', skip.toString());
        }

        if (take) {
          url.searchParams.append('take', take.toString());
        }

        if (bounds) {
          url.searchParams.append('north', bounds.north.toString());
          url.searchParams.append('east', bounds.east.toString());
          url.searchParams.append('south', bounds.south.toString());
          url.searchParams.append('west', bounds.west.toString());
        }

        return get(url).then(function (res) {
          return __assign(__assign({}, res), {
            results: res.results.map(Telex.mapConnection)
          });
        });
      };

      Telex.fetchAllConnections = function (bounds, stageCallback) {
        return __awaiter(this, void 0, void 0, function () {
          var flights, skip, total, data;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                flights = [];
                skip = 0;
                total = 0;
                _a.label = 1;

              case 1:
                return [4
                /*yield*/
                , Telex.fetchConnections(skip, 100, bounds)];

              case 2:
                data = _a.sent();
                total = data.total;
                skip += data.count;
                flights = flights.concat(data.results);

                if (stageCallback) {
                  stageCallback(flights);
                }

                _a.label = 3;

              case 3:
                if (total > skip) return [3
                /*break*/
                , 1];
                _a.label = 4;

              case 4:
                return [2
                /*return*/
                , flights];
            }
          });
        });
      };

      Telex.fetchConnection = function (id) {
        return get(new URL("/txcxn/" + id, NXApi.url)).then(Telex.mapConnection);
      };

      Telex.findConnections = function (flightNumber) {
        var url = new URL('/txcxn/_find', NXApi.url);
        url.searchParams.set('flight', flightNumber);
        return get(url).then(function (res) {
          return {
            matches: res.matches.map(Telex.mapConnection),
            fullMatch: res.fullMatch ? Telex.mapConnection(res.fullMatch) : undefined
          };
        });
      };

      Telex.countConnections = function () {
        return get(new URL('/txcxn/_count', NXApi.url));
      };

      Telex.buildBody = function (status) {
        return {
          location: {
            x: status.location.long,
            y: status.location.lat
          },
          trueAltitude: status.trueAltitude,
          heading: status.heading,
          origin: status.origin,
          destination: status.destination,
          freetextEnabled: status.freetextEnabled,
          flight: status.flight,
          aircraftType: status.aircraftType
        };
      };

      Telex.buildToken = function () {
        return "Bearer " + Telex.accessToken;
      };

      Telex.connectionOrThrow = function () {
        if (!Telex.accessToken) {
          throw new TelexNotConnectedError();
        }
      };

      Telex.mapConnection = function (connection) {
        return __assign(__assign({}, connection), {
          firstContact: new Date(connection.firstContact),
          lastContact: new Date(connection.lastContact)
        });
      };

      Telex.mapMessage = function (message) {
        var msg = __assign(__assign({}, message), {
          createdAt: new Date(message.createdAt)
        });

        if (message.from) {
          msg.from = Telex.mapConnection(message.from);
        }

        if (message.to) {
          msg.to = Telex.mapConnection(message.to);
        }

        return msg;
      };

      return Telex;
    }();

    var Hoppie =
    /** @class */
    function () {
      function Hoppie() {}

      Hoppie.sendRequest = function (body) {
        return post(new URL('/api/v1/hoppie', NXApi.url), body);
      };

      return Hoppie;
    }();

    var NXApi =
    /** @class */
    function () {
      function NXApi() {}

      NXApi.url = new URL('https://api.flybywiresim.com');
      return NXApi;
    }();

    // assumptions: international airports provide VHDL communication (i.e. USA)
    // not perfectly realistic, but realistic enough for a frequency occupancy calculation

    const VhfDatalinkAirports = ['DAUA', 'DAAG', 'DABB', 'DABT', 'DAAE', 'DAUB', 'DAOI', 'DABC', 'DAUH', 'DAAV', 'DAOO', 'DAAS', 'DAAT', 'DAON', 'HEBA', 'HEAT', 'HESN', 'HECA', 'HEAR', 'HEAL', 'HEGN', 'HELX', 'HEMA', 'HEMM', 'HESC', 'HESH', 'HEMK', 'HETB', 'HLLB', 'HLLS', 'HLLT', 'HLLM', 'GMAD', 'GMMN', 'GMFF', 'GMMX', 'GMMW', 'GMFO', 'GMME', 'GMTT', 'GMTN', 'GMMH', 'GMML', 'HSSS', 'HSPN', 'DTTJ', 'DTNH', 'DTMB', 'DTTX', 'DTKA', 'DTTZ', 'DTTA', 'HBBA', 'FMCH', 'HFFF', 'HHAS', 'HAAB', 'HADR', 'HKED', 'HKMO', 'HKKI', 'HKJK', 'FMMI', 'FMNA', 'FMNM', 'FMNN', 'FMMT', 'FMSD', 'FMST', 'FWCL', 'FWLI', 'FIMP', 'FMCZ', 'FQMA', 'FQBR', 'FQIN', 'FQNP', 'FQPB', 'FQTT', 'FQVL', 'FMEE', 'HRYR', 'FSIA', 'HCMF', 'HCMH', 'HCMK', 'HCMM', 'HSSJ', 'HTAR', 'HTDA', 'HTKJ', 'HTMW', 'HTZA', 'HUAR', 'HUEN', 'HUGU', 'FLLI', 'FLLS', 'FLND', 'FVHA', 'FVFA', 'FVBU', 'FNLU', 'FNUB', 'FKKD', 'FKYS', 'FEFF', 'FTTJ', 'FZNA', 'FZAA', 'FZIC', 'FZQA', 'FCBB', 'FCPP', 'FGSL', 'FOON', 'FOOL', 'FOOG', 'FPST', 'DBBB', 'RKND', 'FXMM', 'FYWH', 'FYWB', 'FACT', 'FADN', 'FAJS', 'FAKN', 'FABL', 'FAEL', 'FBSK', 'FBMN', 'FBFT', 'FBKE', 'DFOO', 'DFFD', 'GVBA', 'GVAC', 'GVFM', 'GVSV', 'DIAP', 'GBYD', 'DGAA', 'DGSI', 'DGTK', 'DGSN', 'DGLW', 'DGLE', 'GUCY', 'GGOV', 'GGBU', 'GLRB', 'GABS', 'GQNN', 'GQPP', 'DRRN', 'DNAA', 'DNCA', 'DNAS', 'DNKN', 'DNMM', 'DNPO', 'DNEN', 'DNSO', 'FHSH', 'GOBD', 'GFLL', 'DXXX', 'TQPF', 'TAPA', 'TNCA', 'MYNN', 'MYBC', 'MYEF', 'MYGF', 'MYER', 'TBPB', 'TUPJ', 'TNCB', 'TNCE', 'TNCS', 'MWCB', 'MWCR', 'MUCM', 'MUOC', 'MUCL', 'MUCF', 'MUHA', 'MUHG', 'MUSC', 'MUCU', 'MUVR', 'TNCC', 'TDPD', 'MDBH', 'MDLR', 'MDPC', 'MDCY', 'MDPP', 'MDST', 'MDSD', 'TGPY', 'TFFR', 'MTCH', 'MTPP', 'MKJP', 'MKJS', 'TFFF', 'TRPG', 'TJBQ', 'TJSJ', 'TFFJ', 'TKPK', 'TLPL', 'TVSV', 'TVSC', 'TNCM', 'TTPP', 'TTCP', 'MBPV', 'TIST', 'TISX', 'MZBZ', 'MRLB', 'MROC', 'MSLP', 'MGTK', 'MGGT', 'MHLC', 'MHRO', 'MHLM', 'MHTG', 'MNMG', 'MNBL', 'MNCI', 'MPBO', 'MPDA', 'MPTO', 'TXKF', 'CYXX', 'CYYC', 'CYEG', 'CYFC', 'CYQX', 'CYHZ', 'CYHM', 'CYLW', 'CYXU', 'CYQM', 'CYUL', 'CYOW', 'CYQB', 'CYQR', 'CYXE', 'CYYT', 'CYQT', 'CYYZ', 'CYVR', 'CYYJ', 'CYXY', 'CYHA', 'CYWG', 'BGSF', 'BGGH', 'BGJN', 'BGBW', 'MMAA', 'MMAS', 'MMUN', 'MMCU', 'MMCE', 'MMCZ', 'MMCL', 'MMDO', 'MMGL', 'MMHO', 'MMBT', 'MMZH', 'MMLO', 'MMLT', 'MMSD', 'MMZO', 'MMMZ', 'MMMD', 'MMMX', 'MMMY', 'MMMM', 'MMOX', 'MMPB', 'MMPR', 'MMQT', 'MMRX', 'MMIO', 'MMSP', 'MMTM', 'MMTJ', 'MMTO', 'MMTC', 'MMTG', 'MMPN', 'MMVR', 'MMVA', 'MMZC', 'LFVP', 'KAKR', 'KALB', 'KABQ', 'PANC', 'KATW', 'KATL', 'KACY', 'KAUS', 'KBWI', 'KBGR', 'KBLI', 'KBHM', 'KBOI', 'KBOS', 'KBUF', 'KCLT', 'KCHS', 'KMDW', 'KCVG', 'KCLE', 'KCMH', 'KDFW', 'KDAY', 'KDEN', 'KDSM', 'KDTW', 'KELP', 'PAFA', 'KFLL', 'KRSW', 'KFAT', 'KGRR', 'KGRB', 'KGSO', 'KMDT', 'KBDL', 'PHTO', 'PHNL', 'KIAH', 'KHSV', 'KIND', 'KJAN', 'KJAX', 'PAJN', 'KMCI', 'PAKT', 'KEYW', 'PHKO', 'KTYS', 'KLAL', 'KLAN', 'KLAS', 'KLIT', 'KLAX', 'KSDF', 'KMLB', 'KMEM', 'KMIA', 'KMAF', 'KMKE', 'KMSP', 'KMYR', 'KBNA', 'KMSY', 'KJFK', 'KEWR', 'KSWF', 'KORF', 'KOAK', 'KOKC', 'KOMA', 'KONT', 'KSNA', 'KMCO', 'KSFB', 'KPSP', 'KECP', 'KPNS', 'KPHL', 'KPHX', 'KIWA', 'KPIT', 'KPWM', 'KPDX', 'KPVD', 'KRAC', 'KRDU', 'KRNO', 'KRIC', 'KRST', 'KROC', 'KRFD', 'KSMF', 'KSLC', 'KSAT', 'KSBD', 'KSAN', 'KSFO', 'KSJC', 'KSRQ', 'KSAV', 'KSBM', 'KPAE', 'KGEG', 'KSTL', 'KPIE', 'KSYR', 'KTLH', 'KTPA', 'KTUS', 'KTUL', 'KDCA', 'KPBI', 'KAVP', 'KILM', 'SAEZ', 'SAZS', 'SACO', 'SAME', 'SARI', 'SARE', 'SAWG', 'SAWH', 'SLLP', 'SLVR', 'SLCB', 'SBAR', 'SBBE', 'SBCF', 'SBBV', 'SBBR', 'SBKP', 'SBCG', 'SBCY', 'SBCT', 'SBFL', 'SBFZ', 'SBFI', 'SBGO', 'SBJP', 'SBMO', 'SBEG', 'SBNT', 'SBPL', 'SBPA', 'SBPV', 'SBRF', 'SBRB', 'SBGL', 'SBSV', 'SBSL', 'SBSP', 'SBTE', 'SBUL', 'SBVT', 'SCFA', 'SCIE', 'SCTE', 'SCCI', 'SCEL', 'SKAR', 'SKBQ', 'SKBO', 'SKBG', 'SKBU', 'SKCL', 'SKCG', 'SKCC', 'SKIB', 'SKIP', 'SKFL', 'SKLT', 'SKAO', 'SKMZ', 'SKRG', 'SKMU', 'SKMR', 'SKNV', 'SKPS', 'SKPE', 'SKPP', 'SKPV', 'SKUI', 'SKRH', 'SKSP', 'SKTL', 'SKCO', 'SKSM', 'SKCZ', 'SKVP', 'SKVV', 'SKYP', 'SECU', 'SETN', 'SEGU', 'SERO', 'SEMT', 'SEQU', 'SETU', 'EGYP', 'SOCA', 'SYCJ', 'SGAS', 'SGES', 'SPQU', 'SPZO', 'SPIM', 'SMJP', 'SUMU', 'SULS', 'SURV', 'SVMI', 'SVMC', 'SVVA', 'UATE', 'UATT', 'UAAA', 'UATG', 'UAKK', 'UACK', 'UAUU', 'UAOO', 'UACC', 'UARR', 'UASK', 'UASP', 'UACP', 'UASS', 'UAII', 'UADD', 'UAFM', 'UCFL', 'UAFO', 'UTDT', 'UTDD', 'UTDL', 'UTDK', 'UTAA', 'UTAT', 'UTAM', 'UTAK', 'UTAV', 'UTFA', 'UTSB', 'UTKF', 'UTSL', 'UTFN', 'UTSA', 'UTNN', 'UTSS', 'UTTT', 'UTST', 'UTNU', 'ZKPY', 'RJSK', 'RJSA', 'RJFF', 'RJCH', 'RJFK', 'RJNK', 'RJOA', 'RJFR', 'RJFU', 'ROAH', 'RJGG', 'RJSN', 'RJFO', 'RJOB', 'RJBB', 'RJCC', 'RJSS', 'RJNS', 'RJTT', 'RJAA', 'ZMUB', 'ZBOW', 'ZGBH', 'ZBAA', 'ZYCC', 'ZGHA', 'ZSCG', 'ZUUU', 'ZUCK', 'ZYTL', 'ZYDD', 'ZBDT', 'ZLDH', 'ZHES', 'ZSFZ', 'ZSGZ', 'ZGGG', 'ZGKL', 'ZUGY', 'ZJHK', 'ZSHC', 'ZYHB', 'ZSOF', 'ZYHE', 'ZBHH', 'ZSSH', 'ZSTX', 'ZBLA', 'ZYJM', 'ZGOW', 'ZSJN', 'ZPPP', 'ZLAN', 'ZULS', 'ZSLG', 'ZPLJ', 'ZSLY', 'ZHLY', 'ZPMS', 'ZBMZ', 'ZGMX', 'ZYMD', 'ZSCN', 'ZSNJ', 'ZGNN', 'ZSNT', 'ZSNB', 'ZBDS', 'ZSQD', 'ZBDH', 'ZYQQ', 'ZSQZ', 'ZGSY', 'ZSSS', 'ZYTX', 'ZGSZ', 'ZBSJ', 'ZBYN', 'ZBTJ', 'ZWWW', 'ZUWX', 'ZSWH', 'ZSWZ', 'ZHHH', 'ZSWX', 'ZSWY', 'ZSAM', 'ZLXY', 'ZLXN', 'ZBXZ', 'ZPJH', 'ZSXZ', 'ZSYN', 'ZSYA', 'ZYYJ', 'ZSYT', 'ZHYC', 'ZLIC', 'ZSYW', 'ZBYC', 'ZGDY', 'ZGZJ', 'ZHCC', 'ZGSD', 'ZUZY', 'VHHH', 'VMMC', 'RCYU', 'RCKH', 'RCMQ', 'RCNN', 'RCSS', 'RCTP', 'RKPK', 'RKTN', 'RKPC', 'RKSS', 'RKSI', 'RKTU', 'RKJB', 'RKNY', 'VGEG', 'VGHS', 'VGSY', 'VQPR', 'VEAT', 'VAAH', 'VIAR', 'VOBG', 'VEBS', 'VOMM', 'VOCB', 'VIDP', 'VAGO', 'VEGY', 'VEGT', 'VOHY', 'VEIM', 'VAID', 'VIJP', 'UELL', 'VOCI', 'VECC', 'VOCL', 'VILK', 'VOMD', 'VOML', 'VABB', 'VANP', 'VAPO', 'VEBD', 'VISR', 'VASU', 'VOTV', 'VOTR', 'VABO', 'VIBN', 'VOBZ', 'VEVZ', 'VRMM', 'VRMG', 'VRMH', 'VNKT', 'OPBW', 'OPFA', 'OPGD', 'OPRN', 'OPKC', 'OPLA', 'OPMT', 'OPPS', 'OPQT', 'OPRK', 'OPST', 'OPTU', 'VCBI', 'VCRI', 'VCCJ', 'WBSB', 'VDPP', 'VDSR', 'VDSV', 'WPDL', 'WALL', 'WITT', 'WIIT', 'WIIB', 'WRBB', 'WADY', 'WIKB', 'WABB', 'WADD', 'WIIH', 'WRKK', 'WAAA', 'WAMM', 'WADL', 'WIMM', 'WIPT', 'WIPP', 'WIBB', 'WIOO', 'WIIS', 'WIMN', 'WRSJ', 'WRSQ', 'WIKD', 'WRLR', 'WAHI', 'VLLB', 'VLPS', 'VLSK', 'VLVT', 'WMKA', 'WMKI', 'WMKJ', 'WMKC', 'WBKK', 'WMKK', 'WMKN', 'WMKD', 'WBGG', 'WMKL', 'WMKP', 'WMSA', 'VYCZ', 'VYYY', 'VYNT', 'RPUO', 'RPLH', 'RPVM', 'RPLC', 'RPMD', 'RPMR', 'RPVI', 'RPVK', 'RPLI', 'RPLL', 'RPVT', 'RPVP', 'RPLB', 'RPMZ', 'WSSS', 'VTBD', 'VTBD', 'VTCC', 'VTCT', 'VTUD', 'VTSS', 'VTSG', 'VTSP', 'VTSB', 'VTSM', 'VTUD', 'VVDN', 'VVNB', 'VVTS', 'VVCT', 'VVCI', 'VVPB', 'VVPQ', 'VVCR', 'VVCA', 'OAKB', 'OAHR', 'OAKN', 'OAMS', 'OBBI', 'OIAA', 'OIAW', 'OIHR', 'OITL', 'OIBP', 'OIKB', 'OIMB', 'OIBB', 'OING', 'OIHH', 'OICI', 'OIFM', 'OIKK', 'OICC', 'OIBK', 'OIZC', 'OISR', 'OISL', 'OIMM', 'OIKQ', 'OIGG', 'OINZ', 'OISS', 'OITT', 'OIIE', 'OITR', 'OIYY', 'OIZH', 'ORNI', 'ORBI', 'ORMM', 'ORER', 'ORBM', 'ORTL', 'ORSU', 'LLER', 'LLHA', 'LLBG', 'OJAQ', 'OJAI', 'OKBK', 'OLBA', 'OOMS', 'OOSA', 'OOSH', 'OTBD', 'OEAB', 'OEAH', 'OESK', 'OEGS', 'OEDF', 'OEHL', 'OEJN', 'OEGN', 'OEMA', 'OENG', 'OERK', 'OETB', 'OETF', 'OEYN', 'OSAP', 'OSDI', 'OSLK', 'OSKL', 'OMAA', 'OMAL', 'OMDW', 'OMRK', 'OMSJ', 'OYAA', 'OYSN', 'OYSY', 'EBAW', 'EBBR', 'EBCI', 'EBLG', 'EBOS', 'LFKJ', 'LFKB', 'LFOB', 'LFBE', 'LFMU', 'LFBZ', 'LFBD', 'LFRB', 'LFMK', 'LFOK', 'LFLB', 'LFRD', 'LFKF', 'LFLS', 'LFBH', 'LFQQ', 'LFBL', 'LFLL', 'LFML', 'LFSB', 'LFRS', 'LFMN', 'LFTW', 'LFPG', 'LFBP', 'LFMP', 'LFBI', 'LFCR', 'LFMH', 'LFST', 'LFTH', 'LFBO', 'LFOT', 'LXGB', 'EGJA', 'EGJB', 'EGJJ', 'EICK', 'EIDW', 'EIKY', 'EIKN', 'EINN', 'EGNS', 'ELLX', 'EHAM', 'EHEH', 'EHGG', 'EHBK', 'EHRD', 'LOWG', 'LOWK', 'LOWI', 'LOWL', 'LOWS', 'LOWW', 'LKTB', 'LKKV', 'LKMT', 'LKPR', 'LKPD', 'EDSB', 'EDDB', 'EDDW', 'EDDK', 'EDLW', 'EDDL', 'EDDF', 'EDNY', 'EDDH', 'EDDV', 'EDDP', 'EDHL', 'EDJA', 'EDDM', 'EDDN', 'EDDS', 'EDLV', 'LHBP', 'LHDC', 'LHSM', 'LHPR', 'LZIB', 'LZKZ', 'LZPP', 'LZTT', 'LZSL', 'LZZI', 'LFSB', 'LSZB', 'LSGG', 'LSZA', 'LSZR', 'LSZH', 'EPBY', 'EPGD', 'EPKT', 'EPKK', 'EPLB', 'EPLL', 'EPPO', 'EPRZ', 'EPSC', 'EPWA', 'EPWR', 'LDSB', 'LDDU', 'LDLO', 'LDOS', 'LDPL', 'LDRI', 'LDSP', 'LDZD', 'LDZA', 'LCLK', 'LCPH', 'LCEN', 'LGAV', 'LGKF', 'LGSA', 'LGHI', 'LGKR', 'LGIR', 'LGKL', 'LGKP', 'LGKV', 'LGKO', 'LGMK', 'LGMT', 'LGPZ', 'LGRP', 'LGSM', 'LGSR', 'LGSK', 'LGSY', 'LGTS', 'LGBL', 'LGZA', 'LIEA', 'LIPY', 'LIBD', 'LIME', 'LIPE', 'LIPO', 'LIBR', 'LIEE', 'LICC', 'LIMZ', 'LIRQ', 'LIMJ', 'LICA', 'LIML', 'LIRN', 'LIEO', 'LICJ', 'LIMP', 'LIRZ', 'LIBP', 'LIRP', 'LIPR', 'LIRF', 'LICT', 'LIPQ', 'LIMF', 'LIPZ', 'LIPX', 'LMML', 'LPBJ', 'LPFR', 'LPMA', 'LPPS', 'LPPT', 'LPPR', 'LPPD', 'LPLA', 'LJLJ', 'LJMB', 'LJPZ', 'LECO', 'LEAL', 'LEAM', 'LEAS', 'LEBL', 'LEBB', 'LECS', 'GCFV', 'LEGE', 'GCLP', 'LEGR', 'LEHC', 'LEIB', 'LEJR', 'GCLA', 'GCRR', 'LEDA', 'LEMD', 'LEMG', 'LEMH', 'LEMI', 'LEPA', 'LEPP', 'LERS', 'LEXJ', 'LEST', 'LEZL', 'GCXO', 'LEVC', 'LEVD', 'LEVX', 'LEVT', 'LEZG', 'LATI', 'LAKU', 'UGEE', 'UDSG', 'UBBB', 'UBBG', 'UBBN', 'UBBQ', 'UBBL', 'UBBY', 'UMMG', 'UMGG', 'UMMS', 'LQBK', 'LQSA', 'LQTZ', 'LQMO', 'LBBG', 'LBPD', 'LBSF', 'LBWN', 'EETN', 'EETU', 'UGSB', 'UGKO', 'UGSS', 'UGGG', 'LYPR', 'EVRA', 'EVVA', 'EYKA', 'EYPA', 'EYSA', 'EYVI', 'LUKK', 'LRAR', 'LRBC', 'LRBM', 'LROP', 'LRCL', 'LRCK', 'LRCV', 'LRIA', 'LROD', 'LRSM', 'LRSB', 'LRSV', 'LRTM', 'LRTR', 'LYPG', 'LYTV', 'LWOH', 'LWSK', 'UNAA', 'UHMA', 'URKA', 'ULAA', 'URWA', 'UNBB', 'UUOB', 'UHBB', 'UIBB', 'UUBP', 'UWKS', 'USCC', 'ULWC', 'UIAA', 'URWI', 'UUII', 'URMG', 'UMKK', 'UWKD', 'UHHH', 'UHKK', 'URKK', 'UNKL', 'UUOK', 'UHMM', 'USCM', 'URML', 'URMM', 'UUDD', 'ULMM', 'URMN', 'USNN', 'UWKE', 'UWGG', 'UNWW', 'UNNT', 'UNOO', 'UWOO', 'UWOR', 'USPP', 'ULPB', 'UHMD', 'UHPP', 'ULOO', 'URRR', 'ULLI', 'UWWW', 'URSS', 'URMT', 'USRR', 'UUYY', 'UNTT', 'USTR', 'UIUU', 'UWLL', 'UWUU', 'UHWW', 'URMO', 'URWW', 'UUOO', 'UEEE', 'UUDL', 'USSS', 'UHSS', 'LYBE', 'LYNI', 'LYKV', 'LTAF', 'LTFG', 'LTAC', 'LTAI', 'LTFE', 'LTBR', 'LTBS', 'LTAY', 'LTCC', 'LTCA', 'LTAJ', 'LTBA', 'LTBJ', 'LTAU', 'LTAN', 'LTBZ', 'LTAT', 'LTAZ', 'LTFH', 'LTCG', 'LTAS', 'UKLN', 'UKDD', 'UKLI', 'UKHH', 'UKDR', 'UKBB', 'UKLL', 'UKON', 'UKOO', 'UKHP', 'UKFF', 'UKLU', 'UKDE', 'EKYT', 'EKAH', 'EKBI', 'EKCH', 'EKVG', 'EFMA', 'EFHK', 'EFKT', 'EFKU', 'EFKS', 'EFLP', 'EFOU', 'EFRO', 'EFTP', 'EFTU', 'EFVA', 'BIAR', 'BIKF', 'ENAL', 'ENBR', 'ENBO', 'ENHD', 'ENCN', 'ENGM', 'ENZV', 'ENTC', 'ENVA', 'ESGG', 'ESPA', 'ESMS', 'ESSP', 'ESPC', 'ESSA', 'ESNN', 'ESNU', 'ESMX', 'ESSV', 'EGBB', 'EGHH', 'EGGD', 'EGFF', 'EGCN', 'EGNV', 'EGNX', 'EGTE', 'EGNM', 'EGGP', 'EGLC', 'EGCC', 'EGNT', 'EGDQ', 'EGSH', 'EGHI', 'EGPD', 'EGPH', 'EGPF', 'EGPE', 'EGAA', 'EGAE', 'NSTU', 'YPAD', 'YBBN', 'YBRM', 'YBCS', 'YSCB', 'YPDN', 'YAVV', 'YBCG', 'YMHB', 'YMML', 'YWLM', 'YPPH', 'YPPD', 'YBMC', 'YSSY', 'YBTL', 'YPXM', 'YPCC', 'NCRG', 'SCIP', 'NFFN', 'NFNA', 'NTAA', 'PGUM', 'PLCH', 'NGTA', 'PKWA', 'PKMJ', 'PTKK', 'PTSA', 'PTPN', 'PTYA', 'ANAU', 'NWWW', 'NZAA', 'NZCH', 'NZQN', 'NZWN', 'YSNF', 'PGRO', 'PGSN', 'PGWT', 'NIUE', 'PTRO', 'AYPY', 'AYMH', 'NSFA', 'AGGH', 'NFTF', 'NFTV', 'NGFU', 'NVSS', 'NVVV', 'NLWF', 'NLWW']; // filter parameters to find preselect conditional relevant stations

    const MaxAirportsInRange = 50; // physical parameters to simulate the signal quality

    const AdditiveNoiseOverlapDB = 1.4;
    const MaximumDampingDB = -75.0;
    const ReceiverAntennaGainDBI = 25.0; // is equal to 50W emitter power

    const SignalStrengthDBW = 39.1202;

    class Airport {
      constructor() {
        _defineProperty(this, "Icao", '');

        _defineProperty(this, "Elevation", 0.0);

        _defineProperty(this, "Distance", 0.0);

        _defineProperty(this, "Datarates", Array(DatalinkProviders.ProviderCount).fill([false, 0]));
      }

    }
    /*
     * Simulates the physical effects of the VHF communication
     * - All international airports in a LoS range are taken into account
     * - The SNR is simulated and the resulting datarate is defined per airport
     */


    class Vhf {
      constructor() {
        _defineProperty(this, "stationsUpperAirspace", 0);

        _defineProperty(this, "datarates", []);

        _defineProperty(this, "presentPosition", new OwnAircraft());

        _defineProperty(this, "frequencyOverlap", []);

        _defineProperty(this, "relevantAirports", []);
      }

      updatePresentPosition() {
        this.presentPosition.Latitude = SimVar.GetSimVarValue('PLANE LATITUDE', 'degree latitude');
        this.presentPosition.Longitude = SimVar.GetSimVarValue('PLANE LONGITUDE', 'degree longitude');
        this.presentPosition.Altitude = SimVar.GetSimVarValue('PLANE ALTITUDE', 'feet');
        this.presentPosition.AltitudeAboveGround = SimVar.GetSimVarValue('PLANE ALT ABOVE GROUND', 'feet');
        this.presentPosition.PressureAltitude = SimVar.GetSimVarValue('INDICATED ALTITUDE:3', 'feet');
      } // calculates the freespace path loss for a certain distance
      // reference: https://en.wikipedia.org/wiki/Free-space_path_loss


      freespacePathLoss(frequency, distance) {
        // convert to meters
        const meters = distance * 1852;
        return 10.0 * Math.log10((4.0 * Math.PI * meters * (frequency * 1000000) / 299792458) ** 2.0);
      }

      estimateDatarate(type, distance, flightPhase, airport) {
        const maximumFreespaceLoss = SignalStrengthDBW + ReceiverAntennaGainDBI - AdditiveNoiseOverlapDB * this.frequencyOverlap[type] - MaximumDampingDB;
        let freespaceLoss = this.freespacePathLoss(DatalinkConfiguration[type], distance); // simulate the influence of buildings

        if (flightPhase === FmgcFlightPhase.Preflight || flightPhase === FmgcFlightPhase.Done) {
          // assume that buildings are close the aircraft -> add a loss of 30 dB to simulate the influence of buildings
          freespaceLoss += 30;
        } else if (flightPhase === FmgcFlightPhase.Takeoff || flightPhase === FmgcFlightPhase.GoAround || flightPhase === FmgcFlightPhase.Approach) {
          // assume that high buildings are in the vicinity of the aircraft -> add a loss of 15 dB to simulate the influence of buildings
          freespaceLoss += 15;
        }

        if (maximumFreespaceLoss >= freespaceLoss) {
          const lossDelta = maximumFreespaceLoss - freespaceLoss; // get the quality ratio normalized by the simulated signal power range

          const qualityRatio = Math.min(1.0, lossDelta / Math.abs(MaximumDampingDB)); // use a sigmoid function to estimate the scaling of the datarate
          // parametrized to jump from 1.0 to 0.02 (y) between 0.0 and 1.0 (x)
          // minimum scaling is 10% of the optimal datarate
          // inverse of quality ratio is needed to estimate the quality loss

          const scaling = Math.max(0.1, 1.0 / (Math.exp(9.0 * (1.0 - qualityRatio) - 5.0) + 1.0));
          airport.Datarates[type][0] = true;
          airport.Datarates[type][1] = VdlMaxDatarate * scaling;
        }
      }

      async updateRelevantAirports(flightPhase) {
        // use a simple line of sight algorithm to calculate the maximum distance
        // it ignores the topolography, but simulates the earth curvature
        // reference: https://audio.vatsim.net/storage/AFV%20User%20Guide.pdf
        const maximumDistanceLoS = (altitude0, altitude1) => 1.23 * Math.sqrt(Math.abs(altitude0 - altitude1));

        this.stationsUpperAirspace = 0;
        this.relevantAirports = []; // prepare the request with the information

        const requestBatch = new SimVar.SimVarBatch('C:fs9gps:NearestAirportItemsNumber', 'C:fs9gps:NearestAirportCurrentLine');
        requestBatch.add('C:fs9gps:NearestAirportCurrentICAO', 'string', 'string');
        requestBatch.add('C:fs9gps:NearestAirportSelectedLatitude', 'degree latitude');
        requestBatch.add('C:fs9gps:NearestAirportSelectedLongitude', 'degree longitude');
        requestBatch.add('C:fs9gps:WaypointAirportElevation', 'feet');
        requestBatch.add('C:fs9gps:NearestAirportCurrentDistance', 'meters');
        SimVar.SetSimVarValue('C:fs9gps:NearestAirportCurrentLatitude', 'degree latitude', this.presentPosition.Latitude);
        SimVar.SetSimVarValue('C:fs9gps:NearestAirportCurrentLongitude', 'degree longitude', this.presentPosition.Longitude);
        SimVar.SetSimVarValue('C:fs9gps:NearestAirportMaximumItems', 'number', MaxAirportsInRange);
        SimVar.SetSimVarValue('C:fs9gps:NearestAirportMaximumDistance', 'nautical miles', 100000); // get all airports

        return new Promise(resolve => {
          SimVar.GetSimVarArrayValues(requestBatch, airports => {
            airports.forEach(fetched => {
              // format: 'TYPE(one char) ICAO '
              const icao = fetched[0].substr(2).trim(); // found an international airport

              if (VhfDatalinkAirports.findIndex(elem => elem === icao) !== -1) {
                const maxDistance = maximumDistanceLoS(this.presentPosition.PressureAltitude, fetched[3]);
                const distanceNM = fetched[4] * 0.000539957;

                if (distanceNM <= maxDistance) {
                  const airport = new Airport();
                  airport.Icao = icao;
                  airport.Elevation = fetched[3];
                  airport.Distance = distanceNM;
                  let validAirport = false;

                  for (let i = 0; i < DatalinkProviders.ProviderCount; ++i) {
                    this.estimateDatarate(i, distanceNM, flightPhase, airport);
                    validAirport = validAirport || airport.Datarates[i][0];
                  }

                  if (validAirport) {
                    this.relevantAirports.push(airport);
                  }
                } // assume that all upper stations are reachable within the maximum range


                if (distanceNM <= MaxSearchRange) {
                  this.stationsUpperAirspace += 1;
                }
              }
            });
            resolve();
          });
        });
      }

      greatCircleDistance(latitude, longitude) {
        const deg2rad = deg => deg * (Math.PI / 180);

        const R = 6371; // Radius of the earth in km

        const dLat = deg2rad(this.presentPosition.Latitude - latitude); // deg2rad below

        const dLon = deg2rad(this.presentPosition.Longitude - longitude);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(latitude)) * Math.cos(deg2rad(this.presentPosition.Latitude)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c * 0.5399568; // Distance in nm

        return d;
      }

      async updateUsedVoiceFrequencies() {
        const storedAtisSrc = NXDataStore.get('CONFIG_ATIS_SRC', 'FAA').toLowerCase();
        this.frequencyOverlap = Array(DatalinkProviders.ProviderCount).fill(0);

        if (storedAtisSrc === 'vatsim' || storedAtisSrc === 'ivao') {
          await ATC.get(storedAtisSrc).then(res => {
            if (!res) return;
            res = res.filter(a => a.callsign.indexOf('_OBS') === -1 && parseFloat(a.frequency) <= 136.975 && this.greatCircleDistance(a.latitude, a.longitude) <= MaxSearchRange);
            res.forEach(controller => {
              const frequency = parseFloat(controller.frequency);

              for (const key in DatalinkConfiguration) {
                if ({}.hasOwnProperty.call(DatalinkConfiguration, key)) {
                  const datalinkFrequency = DatalinkConfiguration[key];

                  if (frequency >= datalinkFrequency - 0.009 && frequency <= datalinkFrequency + 0.009) {
                    // check 8.33 kHz spacing
                    this.frequencyOverlap[key] += 1;
                  } else if (frequency >= datalinkFrequency - 0.025 && frequency <= datalinkFrequency + 0.025) {
                    // check the direct 25 kHz neighbors for SITA
                    this.frequencyOverlap[key] += 1;
                  }
                }
              }
            });
          });
        }
      }
      /**
       * Simulates the data rates for the different datalink providers
       * @param flightPhase Actual flight phase to simulate the building based interferences
       * @returns A promise to provide the possibilty to run it in sequence
       */


      async simulateDatarates(flightPhase) {
        this.updatePresentPosition();
        return this.updateUsedVoiceFrequencies().then(() => this.updateRelevantAirports(flightPhase).then(() => {
          // use the average over all reachable stations to estimate the datarate
          this.datarates = Array(DatalinkProviders.ProviderCount).fill(0.0);
          const stationCount = Array(DatalinkProviders.ProviderCount).fill(0);
          this.relevantAirports.forEach(airport => {
            for (let i = 0; i < DatalinkProviders.ProviderCount; ++i) {
              if (airport.Datarates[0]) {
                this.datarates[i] += airport.Datarates[i][1];
                stationCount[i] += 1;
              }
            }
          });

          for (let i = 0; i < DatalinkProviders.ProviderCount; ++i) {
            if (stationCount[i] !== 0) this.datarates[i] /= stationCount[i];
          }
        }));
      }

    }

    const UpperSectorAltitude = 24000; // according to 1V3D in 120 ms

    const MessageChunksPerSecond = 32;
    const DataslotsPerSecond = 24;
    const BitsOfChunksPerSecond = MessageChunksPerSecond * 496; // standard size per data block

    const BytesPerSlot = 62;
    /*
     * Vdl simulates VDL3 to calculate the datarate for messages
     * - general idea is that Datalink is range based on not sector based
     * - 1V3D is used and it is assumed that one block is used for uplink messages
     * - traffic split up into upper and lower
     * - estimate relevant traffic based on own level and traffic of the lower sectors
     * - own datarate is simulated by VDL3 specification and sharing between relevant traffic
     */

    class Vdl {
      constructor() {
        _defineProperty(this, "recListener", RegisterViewListener('JS_LISTENER_MAPS', () => {
          this.recListener.trigger('JS_BIND_BINGMAP', 'nxMap', true);
        }));

        _defineProperty(this, "inboundDelay", {
          updateTime: 0,
          messages: 0,
          delay: 0
        });

        _defineProperty(this, "outboundDelay", {
          updateTime: 0,
          messages: 0,
          delay: 0
        });

        _defineProperty(this, "vhf3", new Vhf());

        _defineProperty(this, "presentPosition", new OwnAircraft());

        _defineProperty(this, "upperAirspaceTraffic", 0);

        _defineProperty(this, "lowerAirspaceTraffic", 0);

        _defineProperty(this, "perPacketDelay", Array(DatalinkProviders.ProviderCount).fill(500));
      }

      updatePresentPosition() {
        this.presentPosition.Latitude = SimVar.GetSimVarValue('PLANE LATITUDE', 'degree latitude');
        this.presentPosition.Longitude = SimVar.GetSimVarValue('PLANE LONGITUDE', 'degree longitude');
        this.presentPosition.Altitude = SimVar.GetSimVarValue('PLANE ALTITUDE', 'feet');
        this.presentPosition.AltitudeAboveGround = SimVar.GetSimVarValue('PLANE ALT ABOVE GROUND', 'feet');
        this.presentPosition.PressureAltitude = SimVar.GetSimVarValue('INDICATED ALTITUDE:3', 'feet');
      }

      async updateRemoteAircrafts() {
        this.lowerAirspaceTraffic = 0;
        this.upperAirspaceTraffic = 0;
        return Coherent.call('GET_AIR_TRAFFIC').then(obj => {
          obj.forEach(traffic => {
            // skip invalid aircraft
            if (!traffic.lat || !traffic.lon || !traffic.alt || !traffic.uId) {
              return;
            }

            const distance = MathUtils.computeDistance3D(traffic.lat, traffic.lon, traffic.alt, this.presentPosition.Latitude, this.presentPosition.Longitude, this.presentPosition.PressureAltitude);

            if (distance <= MaxSearchRange) {
              if (traffic.alt < UpperSectorAltitude) {
                this.lowerAirspaceTraffic += 1;
              } else {
                this.upperAirspaceTraffic += 1;
              }
            }
          });
        }).catch(console.error);
      }

      simulateTransmissionTimes(flightPhase) {
        this.updatePresentPosition();
        this.vhf3.simulateDatarates(flightPhase).then(() => this.updateRemoteAircrafts().then(() => {
          // check if now VHF connection is available
          let connectionAvailable = false;

          for (let i = 0; i < DatalinkProviders.ProviderCount; ++i) {
            if (this.vhf3.datarates[0] !== 0.0) {
              connectionAvailable = true;
              break;
            }
          }

          if (!connectionAvailable) {
            this.perPacketDelay = Array(DatalinkProviders.ProviderCount).fill(10000);
            return;
          }

          let relevantStations = 0; // calculate the relevant aircrafts based on the own level

          if (this.presentPosition.PressureAltitude < UpperSectorAltitude) {
            // calculate the ratio between relevant stations and upper sector stations
            // this ratio is used to add a fraction of the upper level aircrafts to the own relevant stations
            let ratio = 1.0;

            if (this.vhf3.stationsUpperAirspace !== 0) {
              ratio = this.vhf3.relevantAirports.length / this.vhf3.stationsUpperAirspace;
            }

            relevantStations = this.lowerAirspaceTraffic + ratio * this.upperAirspaceTraffic;
          } else {
            // calculate the ratio between relevant stations and lower stations
            // it is assumed that one station is responsible for the lower sectors
            let ratio = 1.0;

            if (this.vhf3.stationsUpperAirspace !== 0) {
              ratio = 1 / this.vhf3.relevantAirports.length;
            }

            relevantStations = this.upperAirspaceTraffic + ratio * this.lowerAirspaceTraffic;
          } // add the A32NX and the ground stations into the list of relevant aircrafts


          relevantStations += 1 + this.vhf3.relevantAirports.length;
          this.perPacketDelay = Array(DatalinkProviders.ProviderCount).fill(0);

          for (let i = 0; i < DatalinkProviders.ProviderCount; ++i) {
            // calculate the number of available slots based on data rate and floor due to broken slots
            let messageCount = Math.floor(DataslotsPerSecond * Math.min(1.0, this.vhf3.datarates[i] / BitsOfChunksPerSecond)); // get all available message slots

            messageCount *= this.vhf3.relevantAirports.length; // calculate the number of slots for the remote traffic based on non-rounded messages

            const messageCountPerStation = messageCount / relevantStations; // calculate the data rates and the time between two own packets

            this.perPacketDelay[i] = Math.round(1000 / messageCountPerStation + 0.5);
          }
        }));
      } // calculates the required transmission time in milliseconds


      calculateTransmissionTime(message) {
        // calculate the number of occupied datablocks
        const messageLength = message.serialize(exports.AtsuMessageSerializationFormat.Network).length;
        const occupiedDatablocks = Math.round(messageLength / BytesPerSlot + 0.5);
        const blocksTransmissionTime = occupiedDatablocks * Vdl.TransmissionTimePerPacket; // calculate the transmission times based on the data rates and choose the fastest

        return blocksTransmissionTime + (occupiedDatablocks - 1) * Math.min(...this.perPacketDelay);
      }
      /**
       * enqueues an inbound message and returns the required transmission time
       * @param message The enqueued message
       * @returns The overall transmission time
       */


      enqueueInboundMessage(message) {
        const currentTime = Date.now();
        let transmissionTime = this.calculateTransmissionTime(message);

        if (this.inboundDelay.messages !== 0) {
          transmissionTime += Math.min(...this.perPacketDelay);
        } else {
          this.inboundDelay.updateTime = currentTime;
        }

        this.inboundDelay.messages += 1;
        this.inboundDelay.delay = transmissionTime;
        return transmissionTime - (currentTime - this.inboundDelay.updateTime);
      }
      /**
       * Decreases the inbound system delay and resets the system if no message is enqueued
       * @param delay The passed delay
       */


      dequeueInboundMessage(delay) {
        this.inboundDelay.delay = Math.max(this.inboundDelay.delay - delay, 0);
        this.inboundDelay.updateTime = Date.now();
        this.inboundDelay.messages -= 1; // reset the timer

        if (this.inboundDelay.messages <= 0) {
          this.inboundDelay.messages = 0;
          this.inboundDelay.delay = 0;
        }
      }
      /**
       * Enqueues a message into the outbound queue. It is simulated that all ground stations communicate first, followed by the A32NX
       * @param message The enqueued outbound message
       * @returns The overall transmission time
       */


      enqueueOutboundMessage(message) {
        const currentTime = Date.now();
        let transmissionTime = this.calculateTransmissionTime(message);

        if (this.outboundDelay.messages !== 0) {
          transmissionTime += Math.min(...this.perPacketDelay);
        } else {
          // simulate that first packets are the ground stations, thereafter the A32NX packet for an initial offset
          transmissionTime += Vdl.TransmissionTimePerPacket * this.vhf3.relevantAirports.length;
          this.outboundDelay.updateTime = currentTime;
        }

        this.outboundDelay.messages += 1;
        this.outboundDelay.delay = transmissionTime;
        return transmissionTime - (currentTime - this.outboundDelay.updateTime);
      }
      /**
       * Enqueues a message of one packet length into the queue. It is simulated that all ground stations communicate first, followed by the A32NX
       * @returns The overall transmission time
       */


      enqueueOutboundPacket() {
        const currentTime = Date.now();
        let transmissionTime = Vdl.TransmissionTimePerPacket;

        if (this.outboundDelay.messages !== 0) {
          transmissionTime += Math.min(...this.perPacketDelay);
        } else {
          // simulate that first packets are the ground stations, thereafter the A32NX packet for an initial offset
          transmissionTime += Vdl.TransmissionTimePerPacket * this.vhf3.relevantAirports.length;
          this.outboundDelay.updateTime = currentTime;
        }

        this.outboundDelay.messages += 1;
        this.outboundDelay.delay = transmissionTime;
        return transmissionTime - (currentTime - this.outboundDelay.updateTime);
      }
      /**
       * Dequeues an outbound message from the queue and decreases the overall delay
       * @param delay The passed delay
       */


      dequeueOutboundMessage(delay) {
        this.outboundDelay.delay = Math.max(this.outboundDelay.delay - delay, 0);
        this.outboundDelay.updateTime = Date.now();
        this.outboundDelay.messages -= 1; // reset the timer

        if (this.outboundDelay.messages <= 0) {
          this.outboundDelay.messages = 0;
          this.outboundDelay.delay = 0;
        }
      }

    }

    _defineProperty(Vdl, "TransmissionTimePerPacket", 40);

    //  Copyright (c) 2021 FlyByWire Simulations
    /**
     * Defines the general freetext message format
     */

    class FreetextMessage extends AtsuMessage {
      constructor() {
        super();
        this.Type = exports.AtsuMessageType.Freetext;
        this.Direction = exports.AtsuMessageDirection.Downlink;
      }

      serialize(format) {
        let message = '';

        if (format === exports.AtsuMessageSerializationFormat.MCDU || format === exports.AtsuMessageSerializationFormat.MCDUMonitored) {
          wordWrap(this.Message, 25).forEach(line => {
            message += "{green}".concat(line, "{end}\n");
          });
          message += '{white}------------------------{end}\n';
        } else {
          message = this.Message;
        }

        return message;
      }

    }

    /**
     * Defines the connector to the hoppies network
     */

    class HoppieConnector {
      static async activateHoppie() {
        SimVar.SetSimVarValue('L:A32NX_HOPPIE_ACTIVE', 'number', 0);

        if (NXDataStore.get('CONFIG_HOPPIE_ENABLED', 'DISABLED') === 'DISABLED') {
          console.log('Hoppie deactivated in EFB');
          return;
        }

        if (NXDataStore.get('CONFIG_HOPPIE_USERID', '') === '') {
          console.log('No Hoppie-ID set');
          return;
        }

        const metarSrc = NXDataStore.get('CONFIG_METAR_SRC', 'MSFS');

        if (metarSrc !== 'VATSIM' && metarSrc !== 'IVAO') {
          console.log('Invalid METAR source');
          return;
        }

        const atisSrc = NXDataStore.get('CONFIG_ATIS_SRC', 'FAA');

        if (atisSrc !== 'VATSIM' && atisSrc !== 'IVAO') {
          console.log('Invalid ATIS source');
          return;
        }

        const body = {
          logon: NXDataStore.get('CONFIG_HOPPIE_USERID', ''),
          from: 'FBWA32NX',
          to: 'ALL-CALLSIGNS',
          type: 'ping',
          packet: ''
        };
        Hoppie.sendRequest(body).then(resp => {
          if (resp.response !== 'error {illegal logon code}') {
            SimVar.SetSimVarValue('L:A32NX_HOPPIE_ACTIVE', 'number', 1);
            console.log('Activated Hoppie ID');
          } else {
            console.log('Invalid Hoppie-ID set');
          }
        });
      }

      static deactivateHoppie() {
        SimVar.SetSimVarValue('L:A32NX_HOPPIE_ACTIVE', 'number', 0);
      }

      static async connect(flightNo) {
        if (SimVar.GetSimVarValue('L:A32NX_HOPPIE_ACTIVE', 'number') !== 1) {
          HoppieConnector.flightNumber = flightNo;
          return exports.AtsuStatusCodes.NoHoppieConnection;
        }

        return HoppieConnector.isCallsignInUse(flightNo).then(code => {
          if (code === exports.AtsuStatusCodes.Ok) {
            HoppieConnector.flightNumber = flightNo;
            return HoppieConnector.poll().then(() => code);
          }

          return code;
        });
      }

      static disconnect() {
        HoppieConnector.flightNumber = '';
        return exports.AtsuStatusCodes.Ok;
      }

      static async isCallsignInUse(station) {
        if (SimVar.GetSimVarValue('L:A32NX_HOPPIE_ACTIVE', 'number') !== 1) {
          return exports.AtsuStatusCodes.NoHoppieConnection;
        }

        const body = {
          logon: NXDataStore.get('CONFIG_HOPPIE_USERID', ''),
          from: station,
          to: 'ALL-CALLSIGNS',
          type: 'ping',
          packet: station
        };
        const text = await Hoppie.sendRequest(body).then(resp => resp.response);

        if (text === 'error {callsign already in use}') {
          return exports.AtsuStatusCodes.CallsignInUse;
        }

        if (text.includes('error')) {
          return exports.AtsuStatusCodes.ProxyError;
        }

        if (text.startsWith('ok') !== true) {
          return exports.AtsuStatusCodes.ComFailed;
        }

        return exports.AtsuStatusCodes.Ok;
      }

      static async isStationAvailable(station) {
        if (SimVar.GetSimVarValue('L:A32NX_HOPPIE_ACTIVE', 'number') !== 1 || HoppieConnector.flightNumber === '') {
          return exports.AtsuStatusCodes.NoHoppieConnection;
        }

        if (station === HoppieConnector.flightNumber) {
          return exports.AtsuStatusCodes.OwnCallsign;
        }

        const body = {
          logon: NXDataStore.get('CONFIG_HOPPIE_USERID', ''),
          from: HoppieConnector.flightNumber,
          to: 'ALL-CALLSIGNS',
          type: 'ping',
          packet: station
        };
        const text = await Hoppie.sendRequest(body).then(resp => resp.response);

        if (text.includes('error')) {
          return exports.AtsuStatusCodes.ProxyError;
        }

        if (text.startsWith('ok') !== true) {
          return exports.AtsuStatusCodes.ComFailed;
        }

        if (text !== "ok {".concat(station, "}")) {
          return exports.AtsuStatusCodes.NoAtc;
        }

        return exports.AtsuStatusCodes.Ok;
      }

      static async sendMessage(message, type) {
        if (SimVar.GetSimVarValue('L:A32NX_HOPPIE_ACTIVE', 'number') !== 1 || HoppieConnector.flightNumber === '') {
          return exports.AtsuStatusCodes.NoHoppieConnection;
        }

        const body = {
          logon: NXDataStore.get('CONFIG_HOPPIE_USERID', ''),
          from: HoppieConnector.flightNumber,
          to: message.Station,
          type,
          packet: message.serialize(exports.AtsuMessageSerializationFormat.Network)
        };
        const text = await Hoppie.sendRequest(body).then(resp => resp.response).catch(() => 'proxy');

        if (text === 'proxy') {
          return exports.AtsuStatusCodes.ProxyError;
        }

        if (text !== 'ok') {
          return exports.AtsuStatusCodes.ComFailed;
        }

        return exports.AtsuStatusCodes.Ok;
      }

      static async sendTelexMessage(message, force) {
        if (HoppieConnector.flightNumber !== '' && (force || SimVar.GetSimVarValue('L:A32NX_HOPPIE_ACTIVE', 'number') === 1)) {
          return HoppieConnector.sendMessage(message, 'telex');
        }

        return exports.AtsuStatusCodes.NoHoppieConnection;
      }

      static async sendCpdlcMessage(message, force) {
        if (HoppieConnector.flightNumber !== '' && (force || SimVar.GetSimVarValue('L:A32NX_HOPPIE_ACTIVE', 'number') === 1)) {
          return HoppieConnector.sendMessage(message, 'cpdlc');
        }

        return exports.AtsuStatusCodes.NoHoppieConnection;
      }

      static levenshteinDistance(template, message, content) {
        let elements = message.replace(/\n/g, ' ').split(' ');
        let validContent = true; // try to match the content

        content.forEach(entry => {
          const result = entry.validateAndReplaceContent(elements);

          if (!result.matched) {
            validContent = false;
          } else {
            elements = result.remaining;
          }
        });
        if (!validContent) return 100000;
        const correctedMessage = elements.join(' '); // initialize the track matrix

        const track = Array(correctedMessage.length + 1).fill(null).map(() => Array(template.length + 1).fill(null));

        for (let i = 0; i <= template.length; ++i) track[0][i] = i;

        for (let i = 0; i <= correctedMessage.length; ++i) track[i][0] = i;

        for (let j = 1; j <= correctedMessage.length; ++j) {
          for (let i = 1; i <= template.length; ++i) {
            const indicator = template[i - 1] === correctedMessage[j - 1] ? 0 : 1;
            track[j][i] = Math.min(track[j][i - 1] + 1, // delete
            track[j - 1][i] + 1, // insert
            track[j - 1][i - 1] + indicator // substitude
            );
          }
        }

        return track[correctedMessage.length][template.length];
      }

      static cpdlcMessageClassification(message) {
        const scores = [];
        let minScore = 100000; // clear the message from marker, etc.

        const clearedMessage = message.replace('@', '').replace('_', ' '); // test all uplink messages

        for (const ident in CpdlcMessagesUplink) {
          if ({}.hasOwnProperty.call(CpdlcMessagesUplink, ident)) {
            const data = CpdlcMessagesUplink[ident];

            if (HoppieConnector.fansMode === exports.FansMode.FansNone || data[1].FansModes.includes(HoppieConnector.fansMode)) {
              let minDistance = 100000;
              data[0].forEach(template => {
                const distance = HoppieConnector.levenshteinDistance(template, clearedMessage, data[1].Content);
                if (minDistance > distance) minDistance = distance;
              });
              scores.push([minDistance, ident]);
              if (minScore > minDistance) minScore = minDistance;
            }
          }
        } // get all entries with the minimal score


        let matches = [];
        scores.forEach(elem => {
          if (elem[0] === minScore) matches.push(elem[1]);
        });
        console.log("Found matches: ".concat(matches, ", score: ").concat(minScore));
        if (matches.length === 0) return undefined; // check if message without parameters are in, but the minScore not empty

        if (matches.length > 1 && minScore !== 0) {
          const nonEmpty = matches.filter(match => CpdlcMessagesUplink[match][1].Content.length !== 0);

          if (nonEmpty.length !== 0 && matches.length !== nonEmpty.length) {
            console.log("Ignoring ".concat(matches.length - nonEmpty.length, " messages without arguments. Remaining ").concat(nonEmpty));
            matches = nonEmpty;
          }
        } // check if more than the freetext-entry is valid


        if (matches.length > 1) {
          const nonFreetext = matches.filter(match => match !== 'UM169' && match !== 'UM183');

          if (nonFreetext.length !== 0 && matches.length !== nonFreetext.length) {
            console.log("Ignoring ".concat(matches.length - nonFreetext.length, " freetext messages. Remaining: ").concat(nonFreetext));
            matches = nonFreetext;
          }
        } // check if the FANS mode is invalid


        if (matches.length > 1 && this.fansMode !== exports.FansMode.FansNone) {
          const validFans = matches.filter(match => CpdlcMessagesUplink[match][1].FansModes.findIndex(elem => elem === this.fansMode) !== -1);

          if (validFans.length !== 0 && matches.length !== validFans.length) {
            console.log("Ignoring ".concat(matches.length - validFans.length, " invalid FANS messages. Remaining: ").concat(validFans));
            matches = validFans;
          }
        } // TODO add some more heuristic about messages
        // create a deep-copy of the message


        const retval = CpdlcMessagesUplink[matches[0]][1].deepCopy();
        let elements = message.split(' ');
        console.log("Selected UM-ID: ".concat(matches[0])); // parse the content and store it in the deep copy

        retval.Content.forEach(entry => {
          const result = entry.validateAndReplaceContent(elements);
          elements = result.remaining;
        });
        return retval;
      }

      static async poll() {
        const retval = [];

        if (SimVar.GetSimVarValue('L:A32NX_HOPPIE_ACTIVE', 'number') !== 1 || HoppieConnector.flightNumber === '') {
          return [exports.AtsuStatusCodes.NoHoppieConnection, retval];
        }

        try {
          const body = {
            logon: NXDataStore.get('CONFIG_HOPPIE_USERID', ''),
            from: HoppieConnector.flightNumber,
            to: HoppieConnector.flightNumber,
            type: 'poll'
          };
          const text = await Hoppie.sendRequest(body).then(resp => resp.response).catch(() => 'proxy'); // proxy error during request

          if (text === 'proxy') {
            return [exports.AtsuStatusCodes.ProxyError, retval];
          } // something went wrong


          if (!text.startsWith('ok')) {
            return [exports.AtsuStatusCodes.ComFailed, retval];
          } // split up the received data into multiple messages


          let messages = text.split(/({.*?})/gm);
          messages = messages.filter(elem => elem !== 'ok' && elem !== 'ok ' && elem !== '} ' && elem !== '}' && elem !== ''); // create the messages

          messages.forEach(element => {
            var _cpdlc$Content$;

            // get the single entries of the message
            // example: [CALLSIGN telex, {Hello world!}]
            const entries = element.substring(1).split(/({.*?})/gm); // get all relevant information

            const metadata = entries[0].split(' ');
            const sender = metadata[0].toUpperCase();
            const type = metadata[1].toLowerCase();
            const content = entries[1].replace(/{/, '').replace(/}/, '').toUpperCase();

            switch (type) {
              case 'telex':
                const freetext = new FreetextMessage();
                freetext.Network = exports.AtsuMessageNetwork.Hoppie;
                freetext.Station = sender;
                freetext.Direction = exports.AtsuMessageDirection.Uplink;
                freetext.ComStatus = exports.AtsuMessageComStatus.Received;
                freetext.Message = content.replace(/\n/i, ' ');
                retval.push(freetext);
                break;

              case 'cpdlc':
                const cpdlc = new CpdlcMessage();
                cpdlc.Station = sender;
                cpdlc.Direction = exports.AtsuMessageDirection.Uplink;
                cpdlc.ComStatus = exports.AtsuMessageComStatus.Received; // split up the data

                const elements = content.split('/');
                cpdlc.CurrentTransmissionId = parseInt(elements[2]);

                if (elements[3] !== '') {
                  cpdlc.PreviousTransmissionId = parseInt(elements[3]);
                }

                cpdlc.Message = elements[5].replace(/@/g, '').replace(/_/g, '\n');
                cpdlc.Content.push(HoppieConnector.cpdlcMessageClassification(cpdlc.Message));

                if (elements[4] !== ((_cpdlc$Content$ = cpdlc.Content[0]) === null || _cpdlc$Content$ === void 0 ? void 0 : _cpdlc$Content$.ExpectedResponse)) {
                  cpdlc.Content[0].ExpectedResponse = elements[4];
                }

                retval.push(cpdlc);
                break;

              default:
                break;
            }
          });
          return [exports.AtsuStatusCodes.Ok, retval];
        } catch (_err) {
          console.log('ERROR IN POLL');
          return [exports.AtsuStatusCodes.NoHoppieConnection, []];
        }
      }

      static pollInterval() {
        return 5000;
      }

    }

    _defineProperty(HoppieConnector, "flightNumber", '');

    _defineProperty(HoppieConnector, "fansMode", exports.FansMode.FansNone);

    const WeatherMap = {
      FAA: 'faa',
      IVAO: 'ivao',
      MSFS: 'ms',
      NOAA: 'aviationweather',
      PILOTEDGE: 'pilotedge',
      VATSIM: 'vatsim'
    };
    /**
     * Defines the NXApi connector for the AOC system
     */

    class NXApiConnector {
      static createAircraftStatus() {
        const lat = SimVar.GetSimVarValue('PLANE LATITUDE', 'degree latitude');
        const long = SimVar.GetSimVarValue('PLANE LONGITUDE', 'degree longitude');
        const alt = SimVar.GetSimVarValue('PLANE ALTITUDE', 'feet');
        const heading = SimVar.GetSimVarValue('PLANE HEADING DEGREES TRUE', 'degree');
        const acType = SimVar.GetSimVarValue('TITLE', 'string');
        const origin = NXDataStore.get('PLAN_ORIGIN', '');
        const destination = NXDataStore.get('PLAN_DESTINATION', '');
        const freetext = NXDataStore.get('CONFIG_ONLINE_FEATURES_STATUS', 'DISABLED') === 'ENABLED';
        return {
          location: {
            long,
            lat
          },
          trueAltitude: alt,
          heading,
          origin,
          destination,
          freetextEnabled: freetext,
          flight: NXApiConnector.flightNumber,
          aircraftType: acType
        };
      }

      static async connect(flightNo) {
        if (NXDataStore.get('CONFIG_ONLINE_FEATURES_STATUS', 'DISABLED') !== 'ENABLED') {
          return exports.AtsuStatusCodes.TelexDisabled;
        } // deactivate old connection


        await NXApiConnector.disconnect();
        NXApiConnector.flightNumber = flightNo;
        const status = NXApiConnector.createAircraftStatus();

        if (status !== undefined) {
          return Telex.connect(status).then(res => {
            if (res.accessToken !== '') {
              NXApiConnector.connected = true;
              NXApiConnector.updateCounter = 0;
              return exports.AtsuStatusCodes.Ok;
            }

            return exports.AtsuStatusCodes.NoTelexConnection;
          }).catch(() => exports.AtsuStatusCodes.CallsignInUse);
        }

        return exports.AtsuStatusCodes.Ok;
      }

      static async disconnect() {
        if (NXDataStore.get('CONFIG_ONLINE_FEATURES_STATUS', 'DISABLED') !== 'ENABLED') {
          return exports.AtsuStatusCodes.TelexDisabled;
        }

        if (NXApiConnector.connected) {
          return Telex.disconnect().then(() => {
            NXApiConnector.connected = false;
            NXApiConnector.flightNumber = '';
            return exports.AtsuStatusCodes.Ok;
          }).catch(() => exports.AtsuStatusCodes.ProxyError);
        }

        return exports.AtsuStatusCodes.NoTelexConnection;
      }

      static isConnected() {
        return NXApiConnector.connected;
      }

      static async sendTelexMessage(message) {
        if (NXApiConnector.connected) {
          const content = message.Message.replace('\n', ';');
          return Telex.sendMessage(message.Station, content).then(() => {
            message.ComStatus = exports.AtsuMessageComStatus.Sent;
            return exports.AtsuStatusCodes.Ok;
          }).catch(() => {
            message.ComStatus = exports.AtsuMessageComStatus.Failed;
            return exports.AtsuStatusCodes.ComFailed;
          });
        }

        return exports.AtsuStatusCodes.NoTelexConnection;
      }

      static async receiveMetar(icao, message) {
        const storedMetarSrc = NXDataStore.get('CONFIG_METAR_SRC', 'MSFS');
        return Metar.get(icao, WeatherMap[storedMetarSrc]).then(data => {
          let metar = data.metar;

          if (!metar || metar === undefined || metar === '') {
            metar = 'NO METAR AVAILABLE';
          }

          message.Reports.push({
            airport: icao,
            report: metar
          });
          return exports.AtsuStatusCodes.Ok;
        }).catch(() => {
          message.Reports.push({
            airport: icao,
            report: 'NO METAR AVAILABLE'
          });
          return exports.AtsuStatusCodes.Ok;
        });
      }

      static async receiveTaf(icao, message) {
        const storedTafSrc = NXDataStore.get('CONFIG_TAF_SRC', 'NOAA');
        return Taf.get(icao, WeatherMap[storedTafSrc]).then(data => {
          let taf = data.taf;

          if (!taf || taf === undefined || taf === '') {
            taf = 'NO TAF AVAILABLE';
          }

          message.Reports.push({
            airport: icao,
            report: taf
          });
          return exports.AtsuStatusCodes.Ok;
        }).catch(() => {
          message.Reports.push({
            airport: icao,
            report: 'NO TAF AVAILABLE'
          });
          return exports.AtsuStatusCodes.Ok;
        });
      }

      static async receiveAtis(icao, type, message) {
        const storedAtisSrc = NXDataStore.get('CONFIG_ATIS_SRC', 'FAA');
        await Atis.get(icao, WeatherMap[storedAtisSrc]).then(data => {
          let atis = undefined;

          if (type === exports.AtisType.Arrival) {
            if ('arr' in data) {
              atis = data.arr;
            } else {
              atis = data.combined;
            }
          } else if (type === exports.AtisType.Departure) {
            if ('dep' in data) {
              atis = data.dep;
            } else {
              atis = data.combined;
            }
          } else if (type === exports.AtisType.Enroute) {
            if ('combined' in data) {
              atis = data.combined;
            } else if ('arr' in data) {
              atis = data.arr;
            }
          }

          if (!atis || atis === undefined) {
            atis = 'D-ATIS NOT AVAILABLE';
          }

          message.Reports.push({
            airport: icao,
            report: atis
          });
        }).catch(() => {
          message.Reports.push({
            airport: icao,
            report: 'D-ATIS NOT AVAILABLE'
          });
        });
        return exports.AtsuStatusCodes.Ok;
      }

      static async poll() {
        const retval = [];

        if (NXApiConnector.connected) {
          if (NXApiConnector.updateCounter++ % 4 === 0) {
            const status = NXApiConnector.createAircraftStatus();

            if (status !== undefined) {
              const code = await Telex.update(status).then(() => exports.AtsuStatusCodes.Ok).catch(() => exports.AtsuStatusCodes.ProxyError);

              if (code !== exports.AtsuStatusCodes.Ok) {
                return [exports.AtsuStatusCodes.ComFailed, retval];
              }
            }
          } // Fetch new messages


          try {
            const data = await Telex.fetchMessages();

            for (const msg of data) {
              const message = new FreetextMessage();
              message.Network = exports.AtsuMessageNetwork.FBW;
              message.Direction = exports.AtsuMessageDirection.Uplink;
              message.Station = msg.from.flight;
              message.Message = msg.message.replace(/;/i, ' ');
              retval.push(message);
            }
          } catch (_e) {
            return [exports.AtsuStatusCodes.ComFailed, retval];
          }
        }

        return [exports.AtsuStatusCodes.Ok, retval];
      }

      static pollInterval() {
        return 15000;
      }

    }

    _defineProperty(NXApiConnector, "flightNumber", '');

    _defineProperty(NXApiConnector, "connected", false);

    _defineProperty(NXApiConnector, "updateCounter", 0);

    NXDataStore.set('PLAN_ORIGIN', '');
    NXDataStore.set('PLAN_DESTINATION', '');

    class Datalink {
      enqueueReceivedMessages(parent, messages) {
        messages.forEach(message => {
          // ignore empty messages (happens sometimes in CPDLC with buggy ATC software)
          if (message.Message.length !== 0) {
            const transmissionTime = this.vdl.enqueueInboundMessage(message);
            setTimeout(() => {
              this.vdl.dequeueInboundMessage(transmissionTime);
              parent.registerMessages([message]);
            }, transmissionTime);
          }
        });
      }

      constructor(parent) {
        _defineProperty(this, "vdl", new Vdl());

        _defineProperty(this, "waitedComUpdate", 0);

        _defineProperty(this, "waitedTimeHoppie", 0);

        _defineProperty(this, "waitedTimeNXApi", 0);

        _defineProperty(this, "firstPollHoppie", true);

        HoppieConnector.activateHoppie();
        setInterval(() => {
          if (this.waitedComUpdate <= 30000) {
            this.vdl.simulateTransmissionTimes(parent.flightPhase());
            this.waitedComUpdate = 0;
          } else {
            this.waitedComUpdate += 5000;
          }

          if (HoppieConnector.pollInterval() <= this.waitedTimeHoppie) {
            HoppieConnector.poll().then(retval => {
              if (retval[0] === exports.AtsuStatusCodes.Ok) {
                // delete all data in the first call (Hoppie stores old data)
                if (!this.firstPollHoppie) {
                  this.enqueueReceivedMessages(parent, retval[1]);
                }

                this.firstPollHoppie = false;
              }
            });
            this.waitedTimeHoppie = 0;
          } else {
            this.waitedTimeHoppie += 5000;
          }

          if (NXApiConnector.pollInterval() <= this.waitedTimeNXApi) {
            NXApiConnector.poll().then(retval => {
              if (retval[0] === exports.AtsuStatusCodes.Ok) {
                this.enqueueReceivedMessages(parent, retval[1]);
              }
            });
            this.waitedTimeNXApi = 0;
          } else {
            this.waitedTimeNXApi += 5000;
          }
        }, 5000);
      }

      static async connect(flightNo) {
        return NXApiConnector.connect(flightNo).then(code => {
          if (code === exports.AtsuStatusCodes.TelexDisabled) code = exports.AtsuStatusCodes.Ok;

          if (code === exports.AtsuStatusCodes.Ok) {
            return HoppieConnector.connect(flightNo).then(code => {
              if (code === exports.AtsuStatusCodes.NoHoppieConnection) code = exports.AtsuStatusCodes.Ok;
              return code;
            });
          }

          return code;
        });
      }

      static async disconnect() {
        let retvalNXApi = await NXApiConnector.disconnect();
        if (retvalNXApi === exports.AtsuStatusCodes.TelexDisabled) retvalNXApi = exports.AtsuStatusCodes.Ok;
        let retvalHoppie = HoppieConnector.disconnect();
        if (retvalHoppie === exports.AtsuStatusCodes.NoHoppieConnection) retvalHoppie = exports.AtsuStatusCodes.Ok;
        if (retvalNXApi !== exports.AtsuStatusCodes.Ok) return retvalNXApi;
        return retvalHoppie;
      }

      async receiveWeatherData(requestMetar, icaos, index, message) {
        let retval = exports.AtsuStatusCodes.Ok;

        if (index < icaos.length) {
          if (requestMetar === true) {
            retval = await NXApiConnector.receiveMetar(icaos[index], message).then(() => this.receiveWeatherData(requestMetar, icaos, index + 1, message));
          } else {
            retval = await NXApiConnector.receiveTaf(icaos[index], message).then(() => this.receiveWeatherData(requestMetar, icaos, index + 1, message));
          }
        }

        return retval;
      }

      async simulateWeatherRequestResponse(data, sentCallback) {
        return new Promise((resolve, _reject) => {
          // simulate the request transmission
          const requestTimeout = this.vdl.enqueueOutboundPacket();
          setTimeout(() => {
            this.vdl.dequeueOutboundMessage(requestTimeout);
            sentCallback();
            const processingTimeout = 300 + Math.floor(Math.random() * 500); // simulate some remote processing time

            setTimeout(() => {
              // simulate the response transmission
              const responseTimeout = this.vdl.enqueueInboundMessage(data[1]);
              setTimeout(() => {
                this.vdl.dequeueInboundMessage(responseTimeout);
                resolve(data);
              }, responseTimeout);
            }, processingTimeout);
          }, requestTimeout);
        });
      }

      async receiveWeather(requestMetar, icaos, sentCallback) {
        let message = undefined;

        if (requestMetar === true) {
          message = new MetarMessage();
        } else {
          message = new TafMessage();
        }

        return this.receiveWeatherData(requestMetar, icaos, 0, message).then(code => this.simulateWeatherRequestResponse([code, message], sentCallback));
      }

      async isStationAvailable(callsign) {
        return HoppieConnector.isStationAvailable(callsign);
      }

      async receiveAtis(icao, type, sentCallback) {
        const message = new AtisMessage();
        return NXApiConnector.receiveAtis(icao, type, message).then(() => this.simulateWeatherRequestResponse([exports.AtsuStatusCodes.Ok, message], sentCallback));
      }

      async sendMessage(message, force) {
        return new Promise((resolve, _reject) => {
          const timeout = this.vdl.enqueueOutboundMessage(message);
          setTimeout(() => {
            this.vdl.dequeueOutboundMessage(timeout);

            if (message.Type < exports.AtsuMessageType.AOC) {
              if (message.Network === exports.AtsuMessageNetwork.FBW) {
                NXApiConnector.sendTelexMessage(message).then(code => resolve(code));
              } else {
                HoppieConnector.sendTelexMessage(message, force).then(code => resolve(code));
              }
            } else if (message.Type === exports.AtsuMessageType.DCL) {
              HoppieConnector.sendTelexMessage(message, force).then(code => resolve(code));
            } else if (message.Type < exports.AtsuMessageType.ATC) {
              HoppieConnector.sendCpdlcMessage(message, force).then(code => resolve(code));
            } else {
              resolve(exports.AtsuStatusCodes.UnknownMessage);
            }
          }, timeout);
        });
      }

    }

    class UplinkMonitor {
      constructor(atsu, message) {
        _defineProperty(this, "atsu", null);

        _defineProperty(this, "messageId", -1);

        this.atsu = atsu;
        this.messageId = message.UniqueMessageID;
      }

      static relevantMessage(message) {
        if (UplinkMonitor.positionMonitoringMessageIds.findIndex(id => {
          var _message$Content$;

          return id === ((_message$Content$ = message.Content[0]) === null || _message$Content$ === void 0 ? void 0 : _message$Content$.TypeId);
        }) === -1 && UplinkMonitor.timeMonitoringMessageIds.findIndex(id => {
          var _message$Content$2;

          return id === ((_message$Content$2 = message.Content[0]) === null || _message$Content$2 === void 0 ? void 0 : _message$Content$2.TypeId);
        }) === -1 && UplinkMonitor.levelMonitoringMessageIds.findIndex(id => {
          var _message$Content$3;

          return id === ((_message$Content$3 = message.Content[0]) === null || _message$Content$3 === void 0 ? void 0 : _message$Content$3.TypeId);
        }) === -1) {
          return false;
        }

        return true;
      }

      static createMessageMonitor(atsu, message) {
        if (UplinkMonitor.positionMonitoringMessageIds.findIndex(id => {
          var _message$Content$4;

          return id === ((_message$Content$4 = message.Content[0]) === null || _message$Content$4 === void 0 ? void 0 : _message$Content$4.TypeId);
        }) !== -1) {
          return new PositionMonitor(atsu, message);
        }

        if (UplinkMonitor.timeMonitoringMessageIds.findIndex(id => {
          var _message$Content$5;

          return id === ((_message$Content$5 = message.Content[0]) === null || _message$Content$5 === void 0 ? void 0 : _message$Content$5.TypeId);
        }) !== -1) {
          return new TimeMonitor(atsu, message);
        }

        if (UplinkMonitor.levelMonitoringMessageIds.findIndex(id => {
          var _message$Content$6;

          return id === ((_message$Content$6 = message.Content[0]) === null || _message$Content$6 === void 0 ? void 0 : _message$Content$6.TypeId);
        }) !== -1) {
          return new LevelMonitor(atsu, message);
        }

        return null;
      }

    }

    _defineProperty(UplinkMonitor, "positionMonitoringMessageIds", ['UM22', 'UM25', 'UM65', 'UM77', 'UM83', 'UM84', 'UM97', 'UM118', 'UM121', 'UM130']);

    _defineProperty(UplinkMonitor, "timeMonitoringMessageIds", ['UM21', 'UM24', 'UM66', 'UM76', 'UM119', 'UM122', 'UM184']);

    _defineProperty(UplinkMonitor, "levelMonitoringMessageIds", ['UM78', 'UM128', 'UM129', 'UM130', 'UM175', 'UM180']);

    class PositionMonitor extends UplinkMonitor {
      constructor(atsu, message) {
        var _message$Content$7, _message$Content$7$Co;

        super(atsu, message);

        _defineProperty(this, "positionMonitor", '');

        this.positionMonitor = (_message$Content$7 = message.Content[0]) === null || _message$Content$7 === void 0 ? void 0 : (_message$Content$7$Co = _message$Content$7.Content[0]) === null || _message$Content$7$Co === void 0 ? void 0 : _message$Content$7$Co.Value;
      }

      conditionsMet() {
        if (this.atsu.lastWaypoint()) {
          const lastPosition = this.atsu.lastWaypoint().ident;
          return this.positionMonitor === lastPosition;
        }

        return false;
      }

    }

    class TimeMonitor extends UplinkMonitor {
      static extractSeconds(value) {
        const matches = value.match(/[0-9]{2}/g);
        const hours = parseInt(matches[0]);
        const minutes = parseInt(matches[1]);
        return (hours * 60 + minutes) * 60;
      }

      constructor(atsu, message) {
        var _message$Content$9, _message$Content$9$Co;

        super(atsu, message);

        _defineProperty(this, "timeOffset", 0);

        _defineProperty(this, "timeMonitor", -1);

        if (TimeMonitor.deferredMessageIDs.findIndex(id => {
          var _message$Content$8;

          return id === ((_message$Content$8 = message.Content[0]) === null || _message$Content$8 === void 0 ? void 0 : _message$Content$8.TypeId);
        }) !== -1) {
          this.timeOffset = 30;
        }

        this.timeMonitor = TimeMonitor.extractSeconds((_message$Content$9 = message.Content[0]) === null || _message$Content$9 === void 0 ? void 0 : (_message$Content$9$Co = _message$Content$9.Content[0]) === null || _message$Content$9$Co === void 0 ? void 0 : _message$Content$9$Co.Value);
      }

      conditionsMet() {
        const currentTime = SimVar.GetSimVarValue('E:ZULU TIME', 'seconds');

        if (currentTime + this.timeOffset >= this.timeMonitor) {
          // avoid errors due to day change (2359 to 0001)
          return currentTime - this.timeMonitor < 30;
        }

        return false;
      }

    }

    _defineProperty(TimeMonitor, "deferredMessageIDs", ['UM66', 'UM69', 'UM119', 'UM122']);

    class LevelMonitor extends UplinkMonitor {
      static extractAltitude(value) {
        let altitude = parseInt(value.match(/[0-9]+/)[0]);

        if (value.startsWith('FL')) {
          altitude *= 100;
        } else if (value.endsWith('M')) {
          altitude *= 3.28084;
        }

        return altitude;
      }

      constructor(atsu, message) {
        var _message$Content$10, _message$Content$10$C, _message$Content$11, _message$Content$13, _message$Content$14, _message$Content$15, _message$Content$16, _message$Content$17;

        super(atsu, message);

        _defineProperty(this, "lowerLevel", -1);

        _defineProperty(this, "upperLevel", -1);

        _defineProperty(this, "reachingLevel", false);

        _defineProperty(this, "leavingLevel", false);

        _defineProperty(this, "reachedLevel", false);

        this.lowerLevel = LevelMonitor.extractAltitude((_message$Content$10 = message.Content[0]) === null || _message$Content$10 === void 0 ? void 0 : (_message$Content$10$C = _message$Content$10.Content[0]) === null || _message$Content$10$C === void 0 ? void 0 : _message$Content$10$C.Value);

        if (((_message$Content$11 = message.Content[0]) === null || _message$Content$11 === void 0 ? void 0 : _message$Content$11.TypeId) === 'UM180') {
          var _message$Content$12;

          this.upperLevel = LevelMonitor.extractAltitude((_message$Content$12 = message.Content[0]) === null || _message$Content$12 === void 0 ? void 0 : _message$Content$12.Content[1].Value);
          this.reachingLevel = true;
        } else if (((_message$Content$13 = message.Content[0]) === null || _message$Content$13 === void 0 ? void 0 : _message$Content$13.TypeId) === 'UM78' || ((_message$Content$14 = message.Content[0]) === null || _message$Content$14 === void 0 ? void 0 : _message$Content$14.TypeId) === 'UM129' || ((_message$Content$15 = message.Content[0]) === null || _message$Content$15 === void 0 ? void 0 : _message$Content$15.TypeId) === 'UM175') {
          this.reachingLevel = true;
        } else if (((_message$Content$16 = message.Content[0]) === null || _message$Content$16 === void 0 ? void 0 : _message$Content$16.TypeId) === 'UM128') {
          this.reachingLevel = false;
        } else if (((_message$Content$17 = message.Content[0]) === null || _message$Content$17 === void 0 ? void 0 : _message$Content$17.TypeId) === 'UM130') {
          this.reachingLevel = true;
          this.leavingLevel = true;
        }
      }

      conditionsMet() {
        const currentAltitude = this.atsu.currentFlightState().altitude;

        if (this.reachingLevel && this.leavingLevel) {
          if (!this.reachedLevel) {
            this.reachedLevel = Math.abs(currentAltitude - this.lowerLevel) <= 100;
          } else {
            return Math.abs(currentAltitude - this.lowerLevel) > 100;
          }
        }

        if (!this.reachingLevel) {
          return Math.abs(currentAltitude - this.lowerLevel) > 100;
        }

        if (this.upperLevel > -1) {
          return this.lowerLevel <= currentAltitude && this.upperLevel >= currentAltitude;
        }

        return Math.abs(currentAltitude - this.lowerLevel) <= 100;
      }

    }

    class UplinkMessageMonitoring {
      constructor(atsu) {
        _defineProperty(this, "monitoredMessages", []);

        _defineProperty(this, "atsu", null);

        _defineProperty(this, "public", void 0);

        this.atsu = atsu;
      }

      monitorMessage(message) {
        if (UplinkMonitor.relevantMessage(message)) {
          this.monitoredMessages.push(UplinkMonitor.createMessageMonitor(this.atsu, message));
          return true;
        }

        return false;
      }

      removeMessage(uid) {
        const idx = this.monitoredMessages.findIndex(message => message.messageId === uid);

        if (idx > -1) {
          this.monitoredMessages.splice(idx, 1);
        }
      }

      monitoredMessageIds() {
        const ids = [];
        this.monitoredMessages.forEach(monitor => ids.push(monitor.messageId));
        return ids;
      }

      findAtcMessage(uid) {
        for (const message of this.atsu.atc.messages()) {
          if (message.UniqueMessageID === uid) {
            return message;
          }
        }

        return undefined;
      }

      checkMessageConditions() {
        const ids = [];
        let idx = this.monitoredMessages.length - 1;

        while (idx >= 0) {
          if (this.monitoredMessages[idx].conditionsMet()) {
            var _message$Response;

            const message = this.findAtcMessage(this.monitoredMessages[idx].messageId);

            if (message !== undefined && ((_message$Response = message.Response) === null || _message$Response === void 0 ? void 0 : _message$Response.ComStatus) === exports.AtsuMessageComStatus.Sent) {
              ids.push(this.monitoredMessages[idx].messageId);
              this.monitoredMessages.splice(idx, 1);
            }
          }

          idx -= 1;
        }

        return ids;
      }

    }

    class UplinkMessageInterpretation {
      static MessageRemainsOnDcdu(message) {
        return UplinkMessageInterpretation.NonAutomaticClosingMessage.findIndex(elem => message.Content[0].TypeId === elem) !== -1;
      }

      static SemanticAnswerRequired(message) {
        return message.Content[0].TypeId === 'UM143' || message.Content[0].TypeId in UplinkMessageInterpretation.SemanticAnswerTable;
      }

      static getDigitsFromBco16(code) {
        let codeCopy = code;
        const digits = [];

        while (codeCopy > 0) {
          digits.push(codeCopy % 16);
          codeCopy = Math.floor(codeCopy / 16);
        }

        if (digits.length < 4) {
          const digitsToAdd = 4 - digits.length;

          for (let i = 0; i < digitsToAdd; i++) {
            digits.push(0);
          }
        }

        digits.reverse();
        return digits;
      }

      static FillPresentData(atsu, message) {
        var _message$Content$;

        switch ((_message$Content$ = message.Content[0]) === null || _message$Content$ === void 0 ? void 0 : _message$Content$.TypeId) {
          case 'UM132':
            message.Response.Content[0].Content[0].Value = coordinateToString({
              lat: atsu.currentFlightState().lat,
              lon: atsu.currentFlightState().lon
            }, false);
            return true;

          case 'UM133':
            message.Response.Content[0].Content[0].Value = InputValidation.formatScratchpadAltitude(Math.round(atsu.currentFlightState().altitude / 100).toString());
            return true;

          case 'UM134':
            message.Response.Content[0].Content[0].Value = InputValidation.formatScratchpadSpeed(atsu.currentFlightState().indicatedAirspeed.toString());
            return true;

          case 'UM144':
            const squawk = UplinkMessageInterpretation.getDigitsFromBco16(SimVar.GetSimVarValue('TRANSPONDER CODE:1', 'Bco16'));
            message.Response.Content[0].Content[0].Value = "".concat(squawk[0]).concat(squawk[1]).concat(squawk[2]).concat(squawk[3]);
            return true;

          case 'UM145':
            message.Response.Content[0].Content[0].Value = atsu.currentFlightState().heading.toString();
            return true;

          case 'UM146':
            message.Response.Content[0].Content[0].Value = atsu.currentFlightState().track.toString();
            return true;

          case 'UM228':
            message.Response.Content[0].Content[0].Value = "".concat(timestampToString(atsu.destinationWaypoint().utc), "Z");
            return true;

          default:
            return false;
        }
      }

      static FillAssignedData(atsu, message) {
        var _message$Content$2;

        switch ((_message$Content$2 = message.Content[0]) === null || _message$Content$2 === void 0 ? void 0 : _message$Content$2.TypeId) {
          case 'UM135':
            message.Response.Content[0].Content[0].Value = InputValidation.formatScratchpadAltitude(Math.round(atsu.targetFlightState().altitude / 100).toString());
            return true;

          case 'UM136':
            message.Response.Content[0].Content[0].Value = InputValidation.formatScratchpadAltitude(atsu.targetFlightState().speed.toString());
            return true;

          default:
            return false;
        }
      }

      static FillPositionReportRelatedData(atsu, message) {
        var _message$Content$3;

        switch ((_message$Content$3 = message.Content[0]) === null || _message$Content$3 === void 0 ? void 0 : _message$Content$3.TypeId) {
          case 'UM138':
            if (atsu.lastWaypoint()) message.Response.Content[0].Content[0].Value = "".concat(timestampToString(atsu.lastWaypoint().utc), "Z");
            return true;

          case 'UM139':
            if (atsu.lastWaypoint()) message.Response.Content[0].Content[0].Value = atsu.lastWaypoint().ident;
            return true;

          case 'UM140':
            if (atsu.activeWaypoint()) message.Response.Content[0].Content[0].Value = atsu.activeWaypoint().ident;
            return true;

          case 'UM141':
            if (atsu.activeWaypoint()) message.Response.Content[0].Content[0].Value = "".concat(timestampToString(atsu.activeWaypoint().utc), "Z");
            return true;

          case 'UM142':
            if (atsu.nextWaypoint()) message.Response.Content[0].Content[0].Value = atsu.nextWaypoint().ident;
            return true;

          case 'UM147':
            message.Response = Atsu.createAutomatedPositionReport(atsu);
            return true;

          case 'UM148':
          case 'UM151':
            message.Response.Content[0].Content[0].Value = message.Content[0].Content[0].Value;
            return true;

          case 'UM152':
            message.Response.Content[0].Content[0].Value = message.Content[0].Content[0].Value;
            message.Response.Content[0].Content[1].Value = message.Content[0].Content[1].Value;
            return true;

          case 'UM228':
            if (atsu.destinationWaypoint()) {
              message.Response.Content[0].Content[0].Value = atsu.destinationWaypoint().ident;
              message.Response.Content[0].Content[1].Value = "".concat(timestampToString(atsu.destinationWaypoint().utc), "Z");
            }

            return true;

          default:
            return false;
        }
      }

      static FillReportingRelatedData(message) {
        var _message$Content$4;

        switch ((_message$Content$4 = message.Content[0]) === null || _message$Content$4 === void 0 ? void 0 : _message$Content$4.TypeId) {
          case 'UM128':
          case 'UM129':
          case 'UM130':
          case 'UM175':
            message.Response.Content[0].Content[0].Value = message.Content[0].Content[0].Value;
            return true;

          case 'UM180':
            for (let i = 0; i < message.Response.Content[0].Content.length; ++i) {
              message.Response.Content[0].Content[i].Value = message.Content[0].Content[i].Value;
            }

            return true;

          default:
            return false;
        }
      }

      static AppendSemanticAnswer(atsu, positiveAnswer, message) {
        var _message$Content$5, _message$Content$6;

        if (((_message$Content$5 = message.Content[0]) === null || _message$Content$5 === void 0 ? void 0 : _message$Content$5.TypeId) === 'UM143') {
          // find last request and create a deep copy
          for (const atcMessage of atsu.atc.messages()) {
            const cpdlc = atcMessage;

            if (UplinkMessageInterpretation.RequestMessages.findIndex(elem => elem === cpdlc.Content[0].TypeId) !== -1) {
              const response = new CpdlcMessage();
              response.Station = atcMessage.Station;
              response.PreviousTransmissionId = message.CurrentTransmissionId;

              for (const entry of cpdlc.Content) {
                response.Content.push(entry.deepCopy());
              }

              message.Response = response;
              return true;
            }
          }

          if (!message.Response) {
            const response = new CpdlcMessage();
            response.Station = message.Station;
            response.PreviousTransmissionId = message.CurrentTransmissionId;
            response.Content.push(CpdlcMessagesDownlink.DM67[1].deepCopy());
            response.Content[0].Content[0].Value = 'NO REQUEST TRANSMITTED';
            message.Response = response;
          }
        } else if (((_message$Content$6 = message.Content[0]) === null || _message$Content$6 === void 0 ? void 0 : _message$Content$6.TypeId) in UplinkMessageInterpretation.SemanticAnswerTable) {
          const lutEntry = UplinkMessageInterpretation.SemanticAnswerTable[message.Content[0].TypeId];

          if (lutEntry.positiveOrNegative) {
            const response = new CpdlcMessage();
            response.Station = message.Station;
            response.PreviousTransmissionId = message.CurrentTransmissionId;

            if (positiveAnswer) {
              response.Content.push(CpdlcMessagesDownlink[lutEntry.messages[0]][1].deepCopy());
            } else {
              response.Content.push(CpdlcMessagesDownlink[lutEntry.messages[1]][1].deepCopy());
            }

            message.Response = response;
          } else if (lutEntry.messages[0] in CpdlcMessagesDownlink) {
            const response = new CpdlcMessage();
            response.Station = message.Station;
            response.PreviousTransmissionId = message.CurrentTransmissionId;
            response.Content.push(CpdlcMessagesDownlink[lutEntry.messages[0]][1].deepCopy());
            message.Response = response;
          }
        }

        if (!UplinkMessageInterpretation.FillPresentData(atsu, message) && !UplinkMessageInterpretation.FillAssignedData(atsu, message)) {
          if (!UplinkMessageInterpretation.FillPositionReportRelatedData(atsu, message)) {
            UplinkMessageInterpretation.FillReportingRelatedData(message);
          }
        }

        return false;
      }

      static HasNegativeResponse(message) {
        var _message$Content$7;

        if (((_message$Content$7 = message.Content[0]) === null || _message$Content$7 === void 0 ? void 0 : _message$Content$7.TypeId) in UplinkMessageInterpretation.SemanticAnswerTable) {
          var _message$Content$8;

          const lutEntry = UplinkMessageInterpretation.SemanticAnswerTable[(_message$Content$8 = message.Content[0]) === null || _message$Content$8 === void 0 ? void 0 : _message$Content$8.TypeId];

          if (lutEntry.positiveOrNegative) {
            return message.Response.Content[0].TypeId !== lutEntry.messages[1];
          }
        }

        return false;
      }

      static IsModifiable(message) {
        var _message$Content$9;

        if (((_message$Content$9 = message.Content[0]) === null || _message$Content$9 === void 0 ? void 0 : _message$Content$9.TypeId) in UplinkMessageInterpretation.SemanticAnswerTable) {
          var _message$Content$10;

          const lutEntry = UplinkMessageInterpretation.SemanticAnswerTable[(_message$Content$10 = message.Content[0]) === null || _message$Content$10 === void 0 ? void 0 : _message$Content$10.TypeId];
          return lutEntry.modifiable;
        }

        return false;
      }

    }

    _defineProperty(UplinkMessageInterpretation, "NonAutomaticClosingMessage", ['UM127', 'UM128', 'UM129', 'UM130', 'UM131', 'UM132', 'UM133', 'UM134', 'UM135', 'UM136', 'UM137', 'UM138', 'UM139', 'UM140', 'UM141', 'UM142', 'UM143', 'UM144', 'UM145', 'UM146', 'UM147', 'UM148', 'UM151', 'UM152', 'UM180', 'UM181', 'UM182', 'UM228', 'UM231', 'UM232']);

    _defineProperty(UplinkMessageInterpretation, "RequestMessages", ['DM15', 'DM16', 'DM17', 'DM18', 'DM19', 'DM20', 'DM21', 'DM22', 'DM23', 'DM24', 'DM25', 'DM26', 'DM27', 'DM51', 'DM52', 'DM53', 'DM54', 'DM69', 'DM70', 'DM71', 'DM72', 'DM73', 'DM74']);

    _defineProperty(UplinkMessageInterpretation, "SemanticAnswerTable", {
      UM128: {
        positiveOrNegative: false,
        modifiable: false,
        messages: ['DM28']
      },
      UM129: {
        positiveOrNegative: false,
        modifiable: false,
        messages: ['DM37']
      },
      UM130: {
        positiveOrNegative: false,
        modifiable: false,
        messages: ['DM31']
      },
      UM131: {
        positiveOrNegative: false,
        modifiable: true,
        messages: ['DM57']
      },
      UM132: {
        positiveOrNegative: false,
        modifiable: true,
        messages: ['DM33']
      },
      UM133: {
        positiveOrNegative: false,
        modifiable: true,
        messages: ['DM32']
      },
      UM134: {
        positiveOrNegative: false,
        modifiable: true,
        messages: ['DM34']
      },
      UM135: {
        positiveOrNegative: false,
        modifiable: true,
        messages: ['DM38']
      },
      UM136: {
        positiveOrNegative: false,
        modifiable: true,
        messages: ['DM39']
      },
      UM137: {
        positiveOrNegative: false,
        modifiable: true,
        messages: ['DM40']
      },
      UM138: {
        positiveOrNegative: false,
        modifiable: true,
        messages: ['DM46']
      },
      UM139: {
        positiveOrNegative: false,
        modifiable: true,
        messages: ['DM45']
      },
      UM140: {
        positiveOrNegative: false,
        modifiable: true,
        messages: ['DM42']
      },
      UM141: {
        positiveOrNegative: false,
        modifiable: true,
        messages: ['DM43']
      },
      UM142: {
        positiveOrNegative: false,
        modifiable: true,
        messages: ['DM44']
      },
      UM144: {
        positiveOrNegative: false,
        modifiable: true,
        messages: ['DM47']
      },
      UM145: {
        positiveOrNegative: false,
        modifiable: true,
        messages: ['DM35']
      },
      UM146: {
        positiveOrNegative: false,
        modifiable: true,
        messages: ['DM36']
      },
      UM147: {
        positiveOrNegative: false,
        modifiable: true,
        messages: ['DM48']
      },
      UM148: {
        positiveOrNegative: true,
        modifiable: true,
        messages: ['DM81', 'DM82']
      },
      UM151: {
        positiveOrNegative: false,
        modifiable: true,
        messages: ['DM83']
      },
      UM152: {
        positiveOrNegative: true,
        modifiable: true,
        messages: ['DM85', 'DM86']
      },
      UM175: {
        positiveOrNegative: false,
        modifiable: false,
        messages: ['DM72']
      },
      UM180: {
        positiveOrNegative: false,
        modifiable: false,
        messages: ['DM76']
      },
      UM181: {
        positiveOrNegative: false,
        modifiable: true,
        messages: ['DM67']
      },
      UM182: {
        positiveOrNegative: false,
        modifiable: true,
        messages: ['DM79']
      },
      UM184: {
        positiveOrNegative: false,
        modifiable: true,
        messages: ['DM67']
      },
      UM228: {
        positiveOrNegative: false,
        modifiable: true,
        messages: ['DM104']
      },
      UM231: {
        positiveOrNegative: false,
        modifiable: true,
        messages: ['DM106']
      },
      UM232: {
        positiveOrNegative: false,
        modifiable: true,
        messages: ['DM109']
      }
    });

    class UplinkMessageStateMachine {
      static initialize(atsu, message) {
        message.CloseAutomatically = !UplinkMessageInterpretation.MessageRemainsOnDcdu(message);

        if (UplinkMonitor.relevantMessage(message)) {
          message.MessageMonitoring = CpdlcMessageMonitoringState.Required;
          message.SemanticResponseRequired = false;
        } else {
          message.MessageMonitoring = CpdlcMessageMonitoringState.Ignored;
          message.SemanticResponseRequired = UplinkMessageInterpretation.SemanticAnswerRequired(message);

          if (message.SemanticResponseRequired) {
            UplinkMessageInterpretation.AppendSemanticAnswer(atsu, true, message);
          }
        }
      }

      static update(atsu, message, uiEvent, positive) {
        if (positive) {
          if (message.MessageMonitoring === CpdlcMessageMonitoringState.Required) {
            message.MessageMonitoring = CpdlcMessageMonitoringState.Monitoring;
            atsu.atc.messageMonitoring.monitorMessage(message);
          } else if (!uiEvent && message.MessageMonitoring === CpdlcMessageMonitoringState.Monitoring) {
            message.MessageMonitoring = CpdlcMessageMonitoringState.Finished;
            message.SemanticResponseRequired = UplinkMessageInterpretation.SemanticAnswerRequired(message);
          }
        } else if (message.MessageMonitoring === CpdlcMessageMonitoringState.Monitoring) {
          var _message$Response, _message$Response2;

          if (((_message$Response = message.Response) === null || _message$Response === void 0 ? void 0 : _message$Response.ComStatus) === exports.AtsuMessageComStatus.Sending || ((_message$Response2 = message.Response) === null || _message$Response2 === void 0 ? void 0 : _message$Response2.ComStatus) === exports.AtsuMessageComStatus.Sent) {
            message.MessageMonitoring = CpdlcMessageMonitoringState.Cancelled;
          } else {
            message.MessageMonitoring = CpdlcMessageMonitoringState.Required;
          }

          atsu.atc.messageMonitoring.removeMessage(message.UniqueMessageID);
        }

        if (message.SemanticResponseRequired) {
          UplinkMessageInterpretation.AppendSemanticAnswer(atsu, positive, message);
        }
      }

    }

    let DcduStatusMessage;

    (function (DcduStatusMessage) {
      DcduStatusMessage[DcduStatusMessage["NoMessage"] = -1] = "NoMessage";
      DcduStatusMessage[DcduStatusMessage["AnswerRequired"] = 0] = "AnswerRequired";
      DcduStatusMessage[DcduStatusMessage["CommunicationFault"] = 1] = "CommunicationFault";
      DcduStatusMessage[DcduStatusMessage["CommunicationNotAvailable"] = 2] = "CommunicationNotAvailable";
      DcduStatusMessage[DcduStatusMessage["CommunicationNotInitialized"] = 3] = "CommunicationNotInitialized";
      DcduStatusMessage[DcduStatusMessage["MaximumDownlinkMessages"] = 4] = "MaximumDownlinkMessages";
      DcduStatusMessage[DcduStatusMessage["LinkLost"] = 5] = "LinkLost";
      DcduStatusMessage[DcduStatusMessage["FlightplanLoadFailed"] = 6] = "FlightplanLoadFailed";
      DcduStatusMessage[DcduStatusMessage["FlightplanLoadPartial"] = 7] = "FlightplanLoadPartial";
      DcduStatusMessage[DcduStatusMessage["FlightplanLoadingUnavailable"] = 8] = "FlightplanLoadingUnavailable";
      DcduStatusMessage[DcduStatusMessage["MonitoringFailed"] = 9] = "MonitoringFailed";
      DcduStatusMessage[DcduStatusMessage["MonitoringLost"] = 10] = "MonitoringLost";
      DcduStatusMessage[DcduStatusMessage["MonitoringUnavailable"] = 11] = "MonitoringUnavailable";
      DcduStatusMessage[DcduStatusMessage["NoAtcReply"] = 12] = "NoAtcReply";
      DcduStatusMessage[DcduStatusMessage["OverflowClosed"] = 13] = "OverflowClosed";
      DcduStatusMessage[DcduStatusMessage["PrintFailed"] = 14] = "PrintFailed";
      DcduStatusMessage[DcduStatusMessage["PriorityMessage"] = 15] = "PriorityMessage";
      DcduStatusMessage[DcduStatusMessage["SendFailed"] = 16] = "SendFailed";
      DcduStatusMessage[DcduStatusMessage["FlightplanLoadSecondary"] = 17] = "FlightplanLoadSecondary";
      DcduStatusMessage[DcduStatusMessage["FlightplanLoadingSecondary"] = 18] = "FlightplanLoadingSecondary";
      DcduStatusMessage[DcduStatusMessage["McduForText"] = 19] = "McduForText";
      DcduStatusMessage[DcduStatusMessage["McduForModification"] = 20] = "McduForModification";
      DcduStatusMessage[DcduStatusMessage["MonitoringCancelled"] = 21] = "MonitoringCancelled";
      DcduStatusMessage[DcduStatusMessage["Monitoring"] = 22] = "Monitoring";
      DcduStatusMessage[DcduStatusMessage["NoFmData"] = 23] = "NoFmData";
      DcduStatusMessage[DcduStatusMessage["NoMoreMessages"] = 24] = "NoMoreMessages";
      DcduStatusMessage[DcduStatusMessage["NoMorePages"] = 25] = "NoMorePages";
      DcduStatusMessage[DcduStatusMessage["PartialFmgsData"] = 26] = "PartialFmgsData";
      DcduStatusMessage[DcduStatusMessage["Printing"] = 27] = "Printing";
      DcduStatusMessage[DcduStatusMessage["RecallMode"] = 28] = "RecallMode";
      DcduStatusMessage[DcduStatusMessage["RecallEmpty"] = 29] = "RecallEmpty";
      DcduStatusMessage[DcduStatusMessage["Reminder"] = 30] = "Reminder";
      DcduStatusMessage[DcduStatusMessage["Sending"] = 31] = "Sending";
      DcduStatusMessage[DcduStatusMessage["Sent"] = 32] = "Sent";
      DcduStatusMessage[DcduStatusMessage["WaitFmData"] = 33] = "WaitFmData";
    })(DcduStatusMessage || (DcduStatusMessage = {}));

    class DcduMessage {
      constructor() {
        _defineProperty(this, "MessageId", 0);

        _defineProperty(this, "Station", '');

        _defineProperty(this, "MessageSent", false);

        _defineProperty(this, "MessageRead", false);

        _defineProperty(this, "PriorityMessage", false);

        _defineProperty(this, "Status", DcduStatusMessage.NoMessage);

        _defineProperty(this, "Direction", null);
      }

    }

    class DcduLink {
      closeMessage(messages, backlog, uid, uplink) {
        const idx = messages.findIndex(elem => elem[0].MessageId === uid);

        if (idx !== -1) {
          // validate that message exists in the queue
          const message = this.atc.messages().find(elem => elem.UniqueMessageID === uid);

          if ((!this.lastClosedMessage || this.lastClosedMessage[0][0].MessageId !== uid) && message !== undefined) {
            this.lastClosedMessage = [messages[idx], new Date().getTime()];
          }

          messages.splice(idx, 1);

          if (uplink) {
            this.validateNotificationCondition();
          } // add buffered messages


          while (backlog.length !== 0 && messages.length !== DcduLink.MaxDcduFileSize) {
            const bufferedBlock = backlog.shift();
            const dcduMessages = [];
            messages.push([]);
            bufferedBlock.forEach(data => {
              const message = this.atc.messages().find(elem => elem.UniqueMessageID === data.MessageId);

              if (message !== undefined) {
                messages[messages.length - 1].push(data); // pushed a new inbound message

                if (!data.MessageRead) {
                  this.setupIntervals();
                }

                if (message.DcduRelevantMessage) {
                  dcduMessages.push(message);
                }
              }
            });

            if (dcduMessages.length !== 0) {
              this.listener.triggerToAllSubscribers('A32NX_DCDU_MSG', dcduMessages);
            }
          }
        }

        return idx !== -1;
      }

      constructor(atsu, atc) {
        _defineProperty(this, "listener", RegisterViewListener('JS_LISTENER_SIMVARS', null, true));

        _defineProperty(this, "atsu", null);

        _defineProperty(this, "atc", null);

        _defineProperty(this, "downlinkMessages", []);

        _defineProperty(this, "uplinkMessages", []);

        _defineProperty(this, "bufferedDownlinkMessages", []);

        _defineProperty(this, "bufferedUplinkMessages", []);

        _defineProperty(this, "lastClosedMessage", null);

        _defineProperty(this, "atcMsgWatchdogInterval", null);

        _defineProperty(this, "atcRingInterval", null);

        this.atsu = atsu;
        this.atc = atc;
        Coherent.on('A32NX_ATSU_DELETE_MESSAGE', uid => {
          let idx = this.uplinkMessages.findIndex(elem => elem[0].MessageId === uid);

          if (idx > -1) {
            this.uplinkMessages[idx].forEach(message => {
              this.atc.removeMessage(message.MessageId);
            });
          } else {
            idx = this.downlinkMessages.findIndex(elem => elem[0].MessageId === uid);

            if (idx > -1) {
              this.downlinkMessages[idx].forEach(message => {
                this.atc.removeMessage(message.MessageId);
              });
            }
          }
        });
        Coherent.on('A32NX_ATSU_SEND_RESPONSE', (uid, response) => {
          const idx = this.uplinkMessages.findIndex(elem => elem[0].MessageId === uid);

          if (idx > -1) {
            // iterate in reverse order to ensure that the "identification" message is the last message in the queue
            // ensures that the DCDU-status change to SENT is done after every message is sent
            this.uplinkMessages[idx].slice().reverse().forEach(message => {
              this.atc.sendResponse(message.MessageId, response);
            });
          }
        });
        Coherent.on('A32NX_ATSU_SEND_MESSAGE', uid => {
          let idx = this.downlinkMessages.findIndex(elem => elem[0].MessageId === uid);

          if (idx > -1) {
            // iterate in reverse order to ensure that the "identification" message is the last message in the queue
            // ensures that the DCDU-status change to SENT is done after every message is sent
            this.downlinkMessages[idx].slice().reverse().forEach(entry => {
              const message = this.atc.messages().find(element => element.UniqueMessageID === entry.MessageId);

              if (message !== undefined) {
                if (message.Direction === exports.AtsuMessageDirection.Downlink) {
                  this.atc.sendMessage(message).then(code => {
                    if (code !== exports.AtsuStatusCodes.Ok) {
                      this.atsu.publishAtsuStatusCode(code);
                    }
                  });
                }
              }
            });
            return;
          }

          idx = this.uplinkMessages.findIndex(elem => elem[0].MessageId === uid);

          if (idx > -1) {
            const message = this.atc.messages().find(element => element.UniqueMessageID === uid);

            if (message !== undefined) {
              const cpdlcMessage = message;

              if (cpdlcMessage.Response && cpdlcMessage.SemanticResponseRequired) {
                this.atc.sendExistingResponse(uid);
              }
            }
          }
        });
        Coherent.on('A32NX_ATSU_DCDU_MESSAGE_MODIFY_RESPONSE', uid => {
          const idx = this.uplinkMessages.findIndex(elem => elem[0].MessageId === uid);

          if (idx > -1) {
            const message = this.atc.messages().find(element => element.UniqueMessageID === uid);

            if (message !== undefined) {
              this.atsu.modifyDcduMessage(message);
            }
          }
        });
        Coherent.on('A32NX_ATSU_PRINT_MESSAGE', uid => {
          const message = this.atc.messages().find(element => element.UniqueMessageID === uid);

          if (message !== undefined) {
            this.updateDcduStatusMessage(uid, DcduStatusMessage.Printing);
            this.atsu.printMessage(message);
            setTimeout(() => {
              if (this.currentDcduStatusMessage(uid) === DcduStatusMessage.Printing) {
                this.updateDcduStatusMessage(uid, DcduStatusMessage.NoMessage);
              }
            }, 4500);
          }
        });
        Coherent.on('A32NX_ATSU_DCDU_MESSAGE_CLOSED', uid => {
          if (!this.closeMessage(this.uplinkMessages, this.bufferedUplinkMessages, uid, true)) {
            this.closeMessage(this.downlinkMessages, this.bufferedDownlinkMessages, uid, false);
          }
        });
        Coherent.on('A32NX_ATSU_DCDU_MESSAGE_MONITORING', uid => {
          const message = this.atc.messages().find(element => element.UniqueMessageID === uid);
          UplinkMessageStateMachine.update(this.atsu, message, true, true);
          this.update(message);
        });
        Coherent.on('A32NX_ATSU_DCDU_MESSAGE_STOP_MONITORING', uid => {
          const message = this.atc.messages().find(element => element.UniqueMessageID === uid);
          UplinkMessageStateMachine.update(this.atsu, message, true, false);
          this.update(message);
        });
        Coherent.on('A32NX_ATSU_DCDU_MESSAGE_RECALL', () => {
          if (!this.lastClosedMessage) {
            this.listener.triggerToAllSubscribers('A32NX_DCDU_SYSTEM_ATSU_STATUS', DcduStatusMessage.RecallEmpty);
          } else {
            const currentStamp = new Date().getTime(); // timed out after five minutes

            if (currentStamp - this.lastClosedMessage[1] > 300000) {
              this.listener.triggerToAllSubscribers('A32NX_DCDU_SYSTEM_ATSU_STATUS', DcduStatusMessage.RecallEmpty);
              this.lastClosedMessage = undefined;
            } else {
              const messages = [];
              this.lastClosedMessage[0].forEach(dcduMessage => {
                const msg = this.atc.messages().find(elem => elem.UniqueMessageID === dcduMessage.MessageId);

                if (msg !== undefined) {
                  messages.push(msg);
                }
              });
              messages[0].CloseAutomatically = false;
              this.listener.triggerToAllSubscribers('A32NX_DCDU_MSG', messages);

              if (this.lastClosedMessage[0][0].Direction === exports.AtsuMessageDirection.Downlink) {
                this.downlinkMessages.push(this.lastClosedMessage[0]);
              } else {
                this.uplinkMessages.push(this.lastClosedMessage[0]);
              }

              this.updateDcduStatusMessage(messages[0].UniqueMessageID, DcduStatusMessage.RecallMode);
            }
          }
        });
        Coherent.on('A32NX_ATSU_DCDU_MESSAGE_READ', uid => {
          const idx = this.uplinkMessages.findIndex(elem => elem[0].MessageId === uid);

          if (idx !== -1) {
            this.uplinkMessages[idx][0].MessageRead = true;
            this.validateNotificationCondition();
          }
        });
        Coherent.on('A32NX_ATSU_DCDU_MESSAGE_INVERT_SEMANTIC_RESPONSE', uid => {
          const message = this.atc.messages().find(element => element.UniqueMessageID === uid);

          if (message !== undefined) {
            UplinkMessageStateMachine.update(this.atsu, message, true, false);
            this.listener.triggerToAllSubscribers('A32NX_DCDU_MSG', [message]);
          }
        });
      }

      validateNotificationCondition() {
        // check if the ring tone is still needed
        let unreadMessages = false;
        this.uplinkMessages.forEach(elem => {
          if (!elem[0].MessageRead) {
            unreadMessages = true;
          }
        });

        if (!unreadMessages) {
          this.cleanupNotifications();
        }
      }

      estimateRingInterval() {
        let interval = 15000;
        this.uplinkMessages.forEach(elem => {
          if (!elem[0].MessageRead) {
            if (elem[0].PriorityMessage) {
              interval = Math.min(interval, 5000);
            } else {
              interval = Math.min(interval, 15000);
            }
          }
        });
        return interval;
      }

      atcRingTone() {
        Coherent.call('PLAY_INSTRUMENT_SOUND', 'cpdlc_ring'); // ensure that the timeout is longer than the sound

        setTimeout(() => SimVar.SetSimVarValue('W:cpdlc_ring', 'boolean', 0), 2000);
      }

      cleanupNotifications() {
        SimVar.SetSimVarValue('L:A32NX_DCDU_ATC_MSG_WAITING', 'boolean', 0);
        SimVar.SetSimVarValue('L:A32NX_DCDU_ATC_MSG_ACK', 'number', 0);

        if (this.atcMsgWatchdogInterval) {
          clearInterval(this.atcMsgWatchdogInterval);
          this.atcMsgWatchdogInterval = null;
        }

        if (this.atcRingInterval) {
          clearInterval(this.atcRingInterval);
          this.atcRingInterval = null;
        }
      }

      setupIntervals() {
        if (!this.atcMsgWatchdogInterval) {
          // start the watchdog to check the the ATC MSG button
          this.atcMsgWatchdogInterval = setInterval(() => {
            if (SimVar.GetSimVarValue('L:A32NX_DCDU_ATC_MSG_ACK', 'number') === 1) {
              this.cleanupNotifications();
            }
          }, 100);
        }

        if (this.atcRingInterval) {
          clearInterval(this.atcRingInterval);
        } // call the first ring tone


        this.atcRingTone(); // start the ring tone interval

        this.atcRingInterval = setInterval(() => this.atcRingTone(), this.estimateRingInterval());
      }

      reset() {
        this.listener.triggerToAllSubscribers('A32NX_DCDU_RESET');
      }

      setAtcLogonMessage(message) {
        this.listener.triggerToAllSubscribers('A32NX_DCDU_ATC_LOGON_MSG', message);
      }

      enqueue(messages) {
        if (messages.length === 0) {
          return;
        }

        const dcduBlocks = [];
        messages.forEach(message => {
          var _Content$;

          const block = new DcduMessage();
          block.MessageId = message.UniqueMessageID;
          block.MessageRead = message.Direction === exports.AtsuMessageDirection.Downlink;
          block.Station = message.Station;
          block.Direction = message.Direction;
          block.PriorityMessage = (_Content$ = message.Content[0]) === null || _Content$ === void 0 ? void 0 : _Content$.Urgent;
          dcduBlocks.push(block);
        });

        if (dcduBlocks[0].Direction === exports.AtsuMessageDirection.Downlink && this.downlinkMessages.length < DcduLink.MaxDcduFileSize) {
          this.downlinkMessages.push(dcduBlocks);
        } else if (dcduBlocks[0].Direction === exports.AtsuMessageDirection.Uplink && this.uplinkMessages.length < DcduLink.MaxDcduFileSize) {
          this.uplinkMessages.push(dcduBlocks);
          SimVar.SetSimVarValue('L:A32NX_DCDU_ATC_MSG_WAITING', 'boolean', 1);
          SimVar.SetSimVarValue('L:A32NX_DCDU_ATC_MSG_ACK', 'number', 0);
          this.setupIntervals();
        } else {
          if (dcduBlocks[0].Direction === exports.AtsuMessageDirection.Downlink) {
            this.bufferedDownlinkMessages.push(dcduBlocks);
            this.listener.triggerToAllSubscribers('A32NX_DCDU_SYSTEM_ATSU_STATUS', DcduStatusMessage.MaximumDownlinkMessages);
            this.atsu.publishAtsuStatusCode(exports.AtsuStatusCodes.DcduFull);
          } else {
            this.bufferedUplinkMessages.push(dcduBlocks);
            this.listener.triggerToAllSubscribers('A32NX_DCDU_SYSTEM_ATSU_STATUS', DcduStatusMessage.AnswerRequired);
          }

          return;
        }

        this.listener.triggerToAllSubscribers('A32NX_DCDU_MSG', messages);
      }

      update(message) {
        let insertIfNeeded = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        // the assumption is that the first message in the block is the UID for the complete block
        const uplinkIdx = this.uplinkMessages.findIndex(elem => elem[0].MessageId === message.UniqueMessageID);

        if (uplinkIdx !== -1) {
          const messages = []; // create all messages and overwrite the first because this is the updated

          this.uplinkMessages[uplinkIdx].forEach(dcduMessage => {
            const msg = this.atc.messages().find(elem => elem.UniqueMessageID === dcduMessage.MessageId);

            if (msg !== undefined) {
              if (message.UniqueMessageID !== msg.UniqueMessageID) {
                messages.push(msg);
              } else {
                messages.push(message);
              }
            }
          });
          this.listener.triggerToAllSubscribers('A32NX_DCDU_MSG', messages);
          return;
        }

        const downlinkIdx = this.downlinkMessages.findIndex(elem => elem[0].MessageId === message.UniqueMessageID);

        if (downlinkIdx !== -1) {
          const messages = []; // create all messages and overwrite the first because this is the updated

          this.downlinkMessages[downlinkIdx].forEach(dcduMessage => {
            const msg = this.atc.messages().find(elem => elem.UniqueMessageID === dcduMessage.MessageId);

            if (message.UniqueMessageID !== msg.UniqueMessageID) {
              messages.push(msg);
            } else {
              messages.push(message);
            }
          });
          messages[0] = message;
          this.listener.triggerToAllSubscribers('A32NX_DCDU_MSG', messages);
          return;
        }

        if (insertIfNeeded) {
          this.enqueue([message]);
        }
      }

      dequeue(uid) {
        // the assumption is that the first message in the block is the UID for the complete block
        let idx = this.uplinkMessages.findIndex(elem => elem[0].MessageId === uid);

        if (idx !== -1) {
          this.listener.triggerToAllSubscribers('A32NX_DCDU_MSG_DELETE_UID', uid);
        } else {
          idx = this.downlinkMessages.findIndex(elem => elem[0].MessageId === uid);

          if (idx !== -1) {
            this.listener.triggerToAllSubscribers('A32NX_DCDU_MSG_DELETE_UID', uid);
          }
        }
      }

      updateDcduStatusMessage(uid, status) {
        // the assumption is that the first message in the block is the UID for the complete block
        const uplinkIdx = this.uplinkMessages.findIndex(elem => elem[0].MessageId === uid);

        if (uplinkIdx !== -1) {
          this.uplinkMessages[uplinkIdx][0].Status = status;
          this.listener.triggerToAllSubscribers('A32NX_DCDU_MSG_ATSU_STATUS', uid, status);
          return;
        }

        const downlinkIdx = this.downlinkMessages.findIndex(elem => elem[0].MessageId === uid);

        if (downlinkIdx !== -1) {
          this.downlinkMessages[downlinkIdx][0].Status = status;
          this.listener.triggerToAllSubscribers('A32NX_DCDU_MSG_ATSU_STATUS', uid, status);
        }
      }

      currentDcduStatusMessage(uid) {
        let idx = this.uplinkMessages.findIndex(elem => elem[0].MessageId === uid);

        if (idx !== -1) {
          return this.uplinkMessages[idx][0].Status;
        }

        idx = this.downlinkMessages.findIndex(elem => elem[0].MessageId === uid);

        if (idx !== -1) {
          return this.downlinkMessages[idx][0].Status;
        }

        return DcduStatusMessage.NoMessage;
      }

      openMessagesForStation(station) {
        let retval = false;
        this.uplinkMessages.forEach(block => {
          if (!block[0].MessageSent && block[0].Station === station) retval = true;
        });

        if (!retval) {
          this.downlinkMessages.forEach(block => {
            if (!block[0].MessageSent && block[0].Station === station) retval = true;
          });
        }

        if (!retval) {
          this.bufferedUplinkMessages.forEach(block => {
            if (!block[0].MessageSent && block[0].Station === station) retval = true;
          });
        }

        if (!retval) {
          this.bufferedDownlinkMessages.forEach(block => {
            if (!block[0].MessageSent && block[0].Station === station) retval = true;
          });
        }

        return retval;
      }

    }

    _defineProperty(DcduLink, "MaxDcduFileSize", 5);

    /*
     * Defines the ATC system for CPDLC communication
     */

    class Atc {
      constructor(parent, datalink) {
        _defineProperty(this, "parent", null);

        _defineProperty(this, "datalink", null);

        _defineProperty(this, "dcduLink", null);

        _defineProperty(this, "handoverInterval", 0);

        _defineProperty(this, "handoverOngoing", false);

        _defineProperty(this, "currentAtc", '');

        _defineProperty(this, "nextAtc", '');

        _defineProperty(this, "notificationTime", 0);

        _defineProperty(this, "cpdlcMessageId", 0);

        _defineProperty(this, "messageQueue", []);

        _defineProperty(this, "printAtisReport", false);

        _defineProperty(this, "atisAutoUpdateIcaos", []);

        _defineProperty(this, "atisMessages", new Map());

        _defineProperty(this, "maxUplinkDelay", -1);

        _defineProperty(this, "currentFansMode", exports.FansMode.FansNone);

        _defineProperty(this, "automaticPositionReport", false);

        _defineProperty(this, "messageMonitoring", null);

        this.parent = parent;
        this.datalink = datalink;
        this.dcduLink = new DcduLink(parent, this);
        this.messageMonitoring = new UplinkMessageMonitoring(parent);
        setInterval(() => {
          const ids = this.messageMonitoring.checkMessageConditions();
          ids.forEach(id => {
            const message = this.messageQueue.find(element => id === element.UniqueMessageID);

            if (message) {
              UplinkMessageStateMachine.update(this.parent, message, false, true);
              this.dcduLink.update(message, true);
            }
          });
        }, 5000);
      }

      async disconnect() {
        if (this.currentAtc !== '') {
          await this.logoff();
        }

        if (this.nextAtc !== '') {
          this.resetLogon();
        }
      }

      currentStation() {
        return this.currentAtc;
      }

      nextStation() {
        return this.nextAtc;
      }

      nextStationNotificationTime() {
        return this.notificationTime;
      }

      logonInProgress() {
        return this.nextAtc !== '';
      }

      resetLogon() {
        this.currentAtc = '';
        this.nextAtc = '';
        this.notificationTime = 0;
        this.dcduLink.setAtcLogonMessage('');
      }

      async logon(station) {
        if (this.nextAtc !== '' && station !== this.nextAtc) {
          return exports.AtsuStatusCodes.SystemBusy;
        }

        if (!this.handoverOngoing && this.currentAtc !== '') {
          const retval = await this.logoff();

          if (retval !== exports.AtsuStatusCodes.Ok) {
            return retval;
          }
        }

        this.handoverOngoing = false;
        const message = new CpdlcMessage();
        message.Station = station;
        message.CurrentTransmissionId = ++this.cpdlcMessageId;
        message.Direction = exports.AtsuMessageDirection.Downlink;
        message.Content.push(CpdlcMessagesDownlink.DM9998[1]);
        message.ComStatus = exports.AtsuMessageComStatus.Sending;
        message.Message = 'REQUEST LOGON';
        message.DcduRelevantMessage = false;
        this.nextAtc = station;
        this.parent.registerMessages([message]);
        this.dcduLink.setAtcLogonMessage("NEXT ATC: ".concat(station));
        this.notificationTime = SimVar.GetGlobalVarValue('ZULU TIME', 'seconds'); // check if the logon was successful within five minutes

        setTimeout(() => {
          // check if we have to timeout the logon request
          if (this.logonInProgress()) {
            const currentTime = SimVar.GetGlobalVarValue('ZULU TIME', 'seconds');
            const delta = currentTime - this.notificationTime; // validate that no second notification is triggered

            if (delta >= 300) {
              this.resetLogon();
            }
          }
        }, 300000);
        return this.datalink.sendMessage(message, false);
      }

      async handover(station) {
        if (this.nextAtc !== '' && station !== this.nextAtc) {
          return exports.AtsuStatusCodes.SystemBusy;
        }

        return new Promise((resolve, _reject) => {
          // add an interval to check if all messages are answered or sent to ATC
          this.handoverInterval = setInterval(() => {
            if (!this.dcduLink.openMessagesForStation(this.currentAtc)) {
              clearInterval(this.handoverInterval);
              this.handoverInterval = null; // add a timer to ensure that the last transmission is already received to avoid ATC software warnings

              setTimeout(() => {
                if (this.currentAtc !== '') {
                  this.logoffWithoutReset().then(code => {
                    if (code !== exports.AtsuStatusCodes.Ok) {
                      resolve(code);
                    }

                    this.handoverOngoing = true;
                    this.logon(station).then(code => resolve(code));
                  });
                } else {
                  this.handoverOngoing = true;
                  this.logon(station).then(code => resolve(code));
                }
              }, 15000);
            }
          }, 1000);
        });
      }

      async logoffWithoutReset() {
        if (this.currentAtc === '') {
          return exports.AtsuStatusCodes.NoAtc;
        }

        const message = new CpdlcMessage();
        message.Station = this.currentAtc;
        message.CurrentTransmissionId = ++this.cpdlcMessageId;
        message.Direction = exports.AtsuMessageDirection.Downlink;
        message.Content.push(CpdlcMessagesDownlink.DM9999[1]);
        message.ComStatus = exports.AtsuMessageComStatus.Sending;
        message.DcduRelevantMessage = false;
        this.maxUplinkDelay = -1;
        this.parent.registerMessages([message]);
        return this.datalink.sendMessage(message, true).then(error => error);
      }

      async logoff() {
        // abort a handover run
        if (this.handoverInterval !== undefined) {
          clearInterval(this.handoverInterval);
          this.handoverInterval = undefined;
        }

        return this.logoffWithoutReset().then(error => {
          this.dcduLink.setAtcLogonMessage('');
          this.currentFansMode = exports.FansMode.FansNone;
          this.currentAtc = '';
          this.nextAtc = '';
          return error;
        });
      }

      createCpdlcResponse(request, response) {
        const downlinkId = "DM".concat(response);

        if (!(downlinkId in CpdlcMessagesDownlink)) {
          return null;
        } // create the meta information of the response


        const responseMessage = new CpdlcMessage();
        responseMessage.Direction = exports.AtsuMessageDirection.Downlink;
        responseMessage.CurrentTransmissionId = ++this.cpdlcMessageId;
        responseMessage.PreviousTransmissionId = request.CurrentTransmissionId;
        responseMessage.Station = request.Station;
        responseMessage.Content.push(CpdlcMessagesDownlink[downlinkId][1]);
        return responseMessage;
      }

      sendResponse(uid, response) {
        const message = this.messageQueue.find(element => element.UniqueMessageID === uid);

        if (message !== undefined) {
          var _message$Response, _message$Response$Con, _responseMsg$Content$, _message$Response2, _message$Response3, _this$parent$modifica;

          const responseMsg = this.createCpdlcResponse(message, response); // avoid double-sends

          if (((_message$Response = message.Response) === null || _message$Response === void 0 ? void 0 : (_message$Response$Con = _message$Response.Content[0]) === null || _message$Response$Con === void 0 ? void 0 : _message$Response$Con.TypeId) === ((_responseMsg$Content$ = responseMsg.Content[0]) === null || _responseMsg$Content$ === void 0 ? void 0 : _responseMsg$Content$.TypeId) && (((_message$Response2 = message.Response) === null || _message$Response2 === void 0 ? void 0 : _message$Response2.ComStatus) === exports.AtsuMessageComStatus.Sending || ((_message$Response3 = message.Response) === null || _message$Response3 === void 0 ? void 0 : _message$Response3.ComStatus) === exports.AtsuMessageComStatus.Sent)) {
            return;
          }

          message.Response = responseMsg;
          message.Response.ComStatus = exports.AtsuMessageComStatus.Sending;
          this.dcduLink.updateDcduStatusMessage(message.UniqueMessageID, DcduStatusMessage.Sending);
          this.dcduLink.update(message);

          if (((_this$parent$modifica = this.parent.modificationMessage) === null || _this$parent$modifica === void 0 ? void 0 : _this$parent$modifica.UniqueMessageID) === uid) {
            this.parent.modificationMessage = null;
          }

          if (message.Response !== undefined) {
            this.datalink.sendMessage(message.Response, false).then(code => {
              if (code === exports.AtsuStatusCodes.Ok) {
                message.Response.ComStatus = exports.AtsuMessageComStatus.Sent;
                this.dcduLink.updateDcduStatusMessage(message.UniqueMessageID, DcduStatusMessage.Sent);
                setTimeout(() => {
                  if (this.dcduLink.currentDcduStatusMessage(message.UniqueMessageID) === DcduStatusMessage.Sent) {
                    this.dcduLink.updateDcduStatusMessage(message.UniqueMessageID, DcduStatusMessage.NoMessage);
                  }
                }, 5000);
              } else {
                message.Response.ComStatus = exports.AtsuMessageComStatus.Failed;
                this.dcduLink.updateDcduStatusMessage(message.UniqueMessageID, DcduStatusMessage.SendFailed);
              }

              this.dcduLink.update(message);
            });
          }
        }
      }

      sendExistingResponse(uid) {
        const message = this.messageQueue.find(element => element.UniqueMessageID === uid);

        if (message !== undefined && message.Response !== undefined) {
          var _this$parent$modifica2;

          // avoid double-sends
          if (message.Response.ComStatus === exports.AtsuMessageComStatus.Sending || message.Response.ComStatus === exports.AtsuMessageComStatus.Sent) {
            return;
          }

          if (message.Response.CurrentTransmissionId < 0) {
            message.Response.CurrentTransmissionId = ++this.cpdlcMessageId;
          }

          message.Response.ComStatus = exports.AtsuMessageComStatus.Sending;
          this.dcduLink.updateDcduStatusMessage(message.UniqueMessageID, DcduStatusMessage.Sending);
          this.dcduLink.update(message);
          this.datalink.sendMessage(message.Response, false).then(code => {
            if (code === exports.AtsuStatusCodes.Ok) {
              message.Response.ComStatus = exports.AtsuMessageComStatus.Sent;
              this.dcduLink.updateDcduStatusMessage(message.UniqueMessageID, DcduStatusMessage.Sent);
              setTimeout(() => {
                if (this.dcduLink.currentDcduStatusMessage(message.UniqueMessageID) === DcduStatusMessage.Sent) {
                  this.dcduLink.updateDcduStatusMessage(message.UniqueMessageID, DcduStatusMessage.NoMessage);
                }
              }, 5000);
            } else {
              message.Response.ComStatus = exports.AtsuMessageComStatus.Failed;
              this.dcduLink.updateDcduStatusMessage(message.UniqueMessageID, DcduStatusMessage.SendFailed);
            }

            this.dcduLink.update(message);
          });

          if (((_this$parent$modifica2 = this.parent.modificationMessage) === null || _this$parent$modifica2 === void 0 ? void 0 : _this$parent$modifica2.UniqueMessageID) === uid) {
            this.parent.modificationMessage = null;
          }
        }
      }

      async sendMessage(message) {
        var _this$parent$modifica3;

        if (message.ComStatus === exports.AtsuMessageComStatus.Sending || message.ComStatus === exports.AtsuMessageComStatus.Sent) {
          return exports.AtsuStatusCodes.Ok;
        }

        if (message.Station === '') {
          if (this.currentAtc === '') {
            return exports.AtsuStatusCodes.NoAtc;
          }

          message.Station = this.currentAtc;
        }

        message.ComStatus = exports.AtsuMessageComStatus.Sending;

        if (message.DcduRelevantMessage) {
          this.dcduLink.updateDcduStatusMessage(message.UniqueMessageID, DcduStatusMessage.Sending);
          this.dcduLink.update(message);
        }

        if (((_this$parent$modifica3 = this.parent.modificationMessage) === null || _this$parent$modifica3 === void 0 ? void 0 : _this$parent$modifica3.UniqueMessageID) === message.UniqueMessageID) {
          this.parent.modificationMessage = null;
        }

        return this.datalink.sendMessage(message, false).then(code => {
          if (code === exports.AtsuStatusCodes.Ok) {
            message.ComStatus = exports.AtsuMessageComStatus.Sent;
          } else {
            message.ComStatus = exports.AtsuMessageComStatus.Failed;
          }

          if (message.DcduRelevantMessage) {
            this.dcduLink.update(message);
            this.dcduLink.updateDcduStatusMessage(message.UniqueMessageID, code === exports.AtsuStatusCodes.Ok ? DcduStatusMessage.Sent : DcduStatusMessage.SendFailed);

            if (code === exports.AtsuStatusCodes.Ok) {
              setTimeout(() => {
                if (this.dcduLink.currentDcduStatusMessage(message.UniqueMessageID) === DcduStatusMessage.Sent) {
                  this.dcduLink.updateDcduStatusMessage(message.UniqueMessageID, DcduStatusMessage.NoMessage);
                }
              }, 5000);
            }
          }

          return code;
        });
      }

      messages() {
        return this.messageQueue;
      }

      monitoredMessages() {
        const retval = [];
        this.messageMonitoring.monitoredMessageIds().forEach(id => {
          const message = this.messageQueue.find(elem => elem.UniqueMessageID === id);

          if (message) {
            retval.push(message);
          }
        });
        return retval;
      }

      static isRelevantMessage(message) {
        return message.Type > exports.AtsuMessageType.AOC && message.Type < exports.AtsuMessageType.ATC;
      }

      removeMessage(uid) {
        const index = this.messageQueue.findIndex(element => element.UniqueMessageID === uid);

        if (index !== -1) {
          this.messageQueue.splice(index, 1);
          this.dcduLink.dequeue(uid);
        }

        return index !== -1;
      }

      cleanupMessages() {
        this.messageQueue = [];
        this.dcduLink.reset();
        this.atisMessages = new Map();
      }

      analyzeMessage(request, response) {
        var _request$Content$;

        if (((_request$Content$ = request.Content[0]) === null || _request$Content$ === void 0 ? void 0 : _request$Content$.ExpectedResponse) === exports.CpdlcMessageExpectedResponseType.NotRequired && response === undefined) {
          var _request$Content$2, _request$Content$3, _request$Content$4;

          // received the station message for the DCDU
          if (((_request$Content$2 = request.Content[0]) === null || _request$Content$2 === void 0 ? void 0 : _request$Content$2.TypeId) === 'UM9999') {
            request.DcduRelevantMessage = false;

            if (this.currentAtc !== '') {
              this.dcduLink.setAtcLogonMessage(request.Message);
            }

            return true;
          } // received a logoff message


          if (((_request$Content$3 = request.Content[0]) === null || _request$Content$3 === void 0 ? void 0 : _request$Content$3.TypeId) === 'UM9995') {
            request.DcduRelevantMessage = false;
            this.dcduLink.setAtcLogonMessage('');
            this.currentAtc = '';
            return true;
          } // received a service terminated message


          if (request.Message.includes('TERMINATED')) {
            request.DcduRelevantMessage = false;
            this.dcduLink.setAtcLogonMessage('');
            this.currentAtc = '';
            return true;
          } // process the handover message


          if (((_request$Content$4 = request.Content[0]) === null || _request$Content$4 === void 0 ? void 0 : _request$Content$4.TypeId) === 'UM9998') {
            const entries = request.Message.split(' ');

            if (entries.length >= 2) {
              request.DcduRelevantMessage = false;
              const station = entries[1].replace(/@/gi, '');
              this.handover(station);
              return true;
            }
          }
        } // expecting a LOGON or denied message


        if (this.nextAtc !== '' && request !== undefined && response !== undefined) {
          var _request$Content$5;

          if (((_request$Content$5 = request.Content[0]) === null || _request$Content$5 === void 0 ? void 0 : _request$Content$5.TypeId) === 'DM9998') {
            var _response$Content$, _response$Content$2, _response$Content$3;

            // logon accepted by ATC
            if (((_response$Content$ = response.Content[0]) === null || _response$Content$ === void 0 ? void 0 : _response$Content$.TypeId) === 'UM9997') {
              response.DcduRelevantMessage = false;
              this.dcduLink.setAtcLogonMessage("CURRENT ATC UNIT @".concat(this.nextAtc, "@ CTL"));
              this.currentFansMode = FutureAirNavigationSystem.currentFansMode(this.nextAtc);
              InputValidation.FANS = this.currentFansMode;
              this.currentAtc = this.nextAtc;
              this.nextAtc = '';
              return true;
            } // logon rejected


            if (((_response$Content$2 = response.Content[0]) === null || _response$Content$2 === void 0 ? void 0 : _response$Content$2.TypeId) === 'UM9996' || ((_response$Content$3 = response.Content[0]) === null || _response$Content$3 === void 0 ? void 0 : _response$Content$3.TypeId) === 'UM0') {
              response.DcduRelevantMessage = false;
              this.dcduLink.setAtcLogonMessage('');
              this.currentAtc = '';
              this.nextAtc = '';
              return true;
            }
          }
        } // TODO later analyze requests by ATC


        return false;
      }

      insertMessages(messages) {
        messages.forEach(message => {
          const cpdlcMessage = message;
          let concatMessages = true;

          if (cpdlcMessage.Direction === exports.AtsuMessageDirection.Uplink && cpdlcMessage.Content !== undefined) {
            var _cpdlcMessage$Content, _cpdlcMessage$Content2, _cpdlcMessage$Content3, _cpdlcMessage$Content4, _cpdlcMessage$Content5, _cpdlcMessage$Content6, _cpdlcMessage$Content7, _cpdlcMessage$Content8;

            // filter all standard messages and LOGON-related messages
            concatMessages = ((_cpdlcMessage$Content = cpdlcMessage.Content[0]) === null || _cpdlcMessage$Content === void 0 ? void 0 : _cpdlcMessage$Content.TypeId) === 'UM0' || ((_cpdlcMessage$Content2 = cpdlcMessage.Content[0]) === null || _cpdlcMessage$Content2 === void 0 ? void 0 : _cpdlcMessage$Content2.TypeId) === 'UM1' || ((_cpdlcMessage$Content3 = cpdlcMessage.Content[0]) === null || _cpdlcMessage$Content3 === void 0 ? void 0 : _cpdlcMessage$Content3.TypeId) === 'UM3' || ((_cpdlcMessage$Content4 = cpdlcMessage.Content[0]) === null || _cpdlcMessage$Content4 === void 0 ? void 0 : _cpdlcMessage$Content4.TypeId) === 'UM4' || ((_cpdlcMessage$Content5 = cpdlcMessage.Content[0]) === null || _cpdlcMessage$Content5 === void 0 ? void 0 : _cpdlcMessage$Content5.TypeId) === 'UM5' || ((_cpdlcMessage$Content6 = cpdlcMessage.Content[0]) === null || _cpdlcMessage$Content6 === void 0 ? void 0 : _cpdlcMessage$Content6.TypeId) === 'UM9995' || ((_cpdlcMessage$Content7 = cpdlcMessage.Content[0]) === null || _cpdlcMessage$Content7 === void 0 ? void 0 : _cpdlcMessage$Content7.TypeId) === 'UM9996' || ((_cpdlcMessage$Content8 = cpdlcMessage.Content[0]) === null || _cpdlcMessage$Content8 === void 0 ? void 0 : _cpdlcMessage$Content8.TypeId) === 'UM9997';
          }

          if (cpdlcMessage.Direction === exports.AtsuMessageDirection.Downlink && cpdlcMessage.CurrentTransmissionId === -1) {
            cpdlcMessage.CurrentTransmissionId = ++this.cpdlcMessageId;
          } // initialize the uplink message


          if (cpdlcMessage.Direction === exports.AtsuMessageDirection.Uplink) {
            UplinkMessageStateMachine.initialize(this.parent, cpdlcMessage);
          } // search corresponding request, if previous ID is set


          if (concatMessages && cpdlcMessage.PreviousTransmissionId !== -1) {
            this.messageQueue.forEach(element => {
              // ensure that the sending and receiving stations are the same to avoid CPDLC ID overlaps
              if (element.Station === cpdlcMessage.Station) {
                while (element !== null) {
                  if (element.CurrentTransmissionId === cpdlcMessage.PreviousTransmissionId) {
                    element.Response = cpdlcMessage;
                    this.analyzeMessage(element, cpdlcMessage);
                    break;
                  }

                  element = element.Response;
                }
              }
            });
          } else {
            this.messageQueue.unshift(cpdlcMessage);
            this.analyzeMessage(cpdlcMessage, undefined);
          }
        });

        if (messages.length !== 0 && messages[0].DcduRelevantMessage) {
          this.dcduLink.enqueue(messages);
        }
      }

      updateMessage(message) {
        const index = this.messageQueue.findIndex(element => element.UniqueMessageID === message.UniqueMessageID);

        if (index !== -1) {
          var _this$parent$modifica4;

          if (((_this$parent$modifica4 = this.parent.modificationMessage) === null || _this$parent$modifica4 === void 0 ? void 0 : _this$parent$modifica4.UniqueMessageID) === message.UniqueMessageID) {
            this.parent.modificationMessage = undefined;
          }

          this.messageQueue[index] = message;
          this.dcduLink.update(message);
        }
      }

      messageRead(uid) {
        const index = this.messageQueue.findIndex(element => element.UniqueMessageID === uid);

        if (index !== -1 && this.messageQueue[index].Direction === exports.AtsuMessageDirection.Uplink) {
          this.messageQueue[index].Confirmed = true;
        }

        return index !== -1;
      }

      async updateAtis(icao, type, overwrite) {
        return this.datalink.receiveAtis(icao, type, () => {}).then(retval => {
          if (retval[0] === exports.AtsuStatusCodes.Ok) {
            let code = exports.AtsuStatusCodes.Ok;
            const atis = retval[1];
            atis.Timestamp = new AtsuTimestamp();
            atis.parseInformation();
            let printable = false;

            if (atis.Information === '') {
              return exports.AtsuStatusCodes.NoAtisReceived;
            }

            if (this.atisMessages.get(icao) !== undefined) {
              if (this.atisMessages.get(icao)[1][0].Information !== atis.Information) {
                this.atisMessages.get(icao)[1].unshift(atis);
                code = exports.AtsuStatusCodes.NewAtisReceived;
                printable = true;
              } else if (overwrite) {
                this.atisMessages.get(icao)[1][0] = atis;
                code = exports.AtsuStatusCodes.NewAtisReceived;
              }
            } else {
              this.atisMessages.set(icao, [atis.Timestamp.Seconds, [atis]]);
              code = exports.AtsuStatusCodes.NewAtisReceived;
              printable = true;
            }

            this.atisMessages.get(icao)[0] = atis.Timestamp.Seconds;

            if (this.printAtisReport && printable) {
              this.parent.printMessage(atis);
            }

            return code;
          }

          return retval[0];
        });
      }

      togglePrintAtisReports() {
        this.printAtisReport = !this.printAtisReport;
      }

      printAtisReportsPrint() {
        return this.printAtisReport;
      }

      async receiveAtis(icao, type) {
        return this.updateAtis(icao, type, true);
      }

      atisReports(icao) {
        if (this.atisMessages.has(icao)) {
          return this.atisMessages.get(icao)[1];
        }

        return [];
      }

      resetAtisAutoUpdate() {
        this.atisAutoUpdateIcaos.forEach(elem => clearInterval(elem[2]));
        this.atisAutoUpdateIcaos = [];
      }

      atisAutoUpdateActive(icao) {
        return this.atisAutoUpdateIcaos.findIndex(elem => icao === elem[0]) !== -1;
      }

      automaticAtisUpdater(icao, type) {
        if (this.atisMessages.has(icao)) {
          this.updateAtis(icao, type, false).then(code => {
            if (code === exports.AtsuStatusCodes.Ok) {
              this.atisMessages.get(icao)[0] = new AtsuTimestamp().Seconds;
            } else {
              this.parent.publishAtsuStatusCode(code);
            }
          });
        } else {
          this.updateAtis(icao, type, false).then(code => {
            if (code !== exports.AtsuStatusCodes.Ok) {
              this.parent.publishAtsuStatusCode(code);
            }
          });
        }
      }

      activateAtisAutoUpdate(icao, type) {
        if (this.atisAutoUpdateIcaos.find(elem => elem[0] === icao) === undefined) {
          const updater = setInterval(() => this.automaticAtisUpdater(icao, type), 60000);
          this.atisAutoUpdateIcaos.push([icao, type, updater]);
        }
      }

      deactivateAtisAutoUpdate(icao) {
        const idx = this.atisAutoUpdateIcaos.findIndex(elem => icao === elem[0]);

        if (idx >= 0) {
          clearInterval(this.atisAutoUpdateIcaos[idx][2]);
          this.atisAutoUpdateIcaos.splice(idx, 1);
        }
      }

      fansMode() {
        return this.currentFansMode;
      }

      automaticPositionReportActive() {
        return this.automaticPositionReport;
      }

      toggleAutomaticPositionReportActive() {
        this.automaticPositionReport = !this.automaticPositionReport;
      }

    }

    /**
     * Defines the AOC
     */
    class Aoc {
      constructor(datalink) {
        _defineProperty(this, "datalink", null);

        _defineProperty(this, "messageQueue", []);

        this.datalink = datalink;
      }

      static isRelevantMessage(message) {
        return message.Type < exports.AtsuMessageType.AOC;
      }

      async sendMessage(message) {
        if (Aoc.isRelevantMessage(message)) {
          return this.datalink.sendMessage(message, false);
        }

        return exports.AtsuStatusCodes.UnknownMessage;
      }

      removeMessage(uid) {
        const index = this.messageQueue.findIndex(element => element.UniqueMessageID === uid);

        if (index !== -1) {
          this.messageQueue.splice(index, 1);
        }

        return index !== -1;
      }

      async receiveWeather(requestMetar, icaos, sentCallback) {
        return this.datalink.receiveWeather(requestMetar, icaos, sentCallback);
      }

      async receiveAtis(icao, type, sentCallback) {
        return this.datalink.receiveAtis(icao, type, sentCallback);
      }

      messageRead(uid) {
        const index = this.messageQueue.findIndex(element => element.UniqueMessageID === uid);

        if (index !== -1 && this.messageQueue[index].Direction === exports.AtsuMessageDirection.Uplink) {
          if (this.messageQueue[index].Confirmed === false) {
            const cMsgCnt = SimVar.GetSimVarValue('L:A32NX_COMPANY_MSG_COUNT', 'Number');
            SimVar.SetSimVarValue('L:A32NX_COMPANY_MSG_COUNT', 'Number', cMsgCnt <= 1 ? 0 : cMsgCnt - 1);
          }

          this.messageQueue[index].Confirmed = true;
        }

        return index !== -1;
      }

      messages() {
        return this.messageQueue;
      }

      outputMessages() {
        return this.messageQueue.filter(entry => entry.Direction === exports.AtsuMessageDirection.Downlink);
      }

      inputMessages() {
        return this.messageQueue.filter(entry => entry.Direction === exports.AtsuMessageDirection.Uplink);
      }

      uidRegistered(uid) {
        return this.messageQueue.findIndex(element => uid === element.UniqueMessageID) !== -1;
      }

      insertMessages(messages) {
        messages.forEach(message => {
          this.messageQueue.unshift(message);

          if (message.Direction === exports.AtsuMessageDirection.Uplink) {
            // increase the company message counter
            const cMsgCnt = SimVar.GetSimVarValue('L:A32NX_COMPANY_MSG_COUNT', 'Number');
            SimVar.SetSimVarValue('L:A32NX_COMPANY_MSG_COUNT', 'Number', cMsgCnt + 1);
          }
        });
      }

    }

    class Waypoint {
      constructor(ident) {
        _defineProperty(this, "ident", '');

        _defineProperty(this, "altitude", 0);

        _defineProperty(this, "utc", 0);

        this.ident = ident;
      }

    }
    class FlightStateObserver {
      static findLastWaypoint(fp) {
        if (fp) {
          let idx = fp.activeWaypointIndex;

          while (idx >= 0) {
            const wp = fp.getWaypoint(idx);

            if ((wp === null || wp === void 0 ? void 0 : wp.waypointReachedAt) !== 0) {
              return wp;
            }

            idx -= 1;
          }
        }

        return null;
      }

      updatePresentPosition() {
        this.PresentPosition.lat = SimVar.GetSimVarValue('GPS POSITION LAT', 'degree latitude');
        this.PresentPosition.lon = SimVar.GetSimVarValue('GPS POSITION LON', 'degree longitude');
        this.PresentPosition.altitude = Math.round(SimVar.GetSimVarValue('PLANE ALTITUDE', 'feet'));
        this.PresentPosition.heading = Math.round(SimVar.GetSimVarValue('GPS GROUND TRUE HEADING', 'degree'));
        this.PresentPosition.track = Math.round(SimVar.GetSimVarValue('GPS GROUND TRUE TRACK', 'degree'));
        this.PresentPosition.indicatedAirspeed = Math.round(SimVar.GetSimVarValue('AIRSPEED INDICATED', 'knots'));
        this.PresentPosition.groundSpeed = Math.round(SimVar.GetSimVarValue('GROUND VELOCITY', 'knots'));
        this.PresentPosition.verticalSpeed = Math.round(SimVar.GetSimVarValue('VERTICAL SPEED', 'feet per second') * 60.0);
      }

      updateFcu() {
        this.FcuSettings.apActive = SimVar.GetSimVarValue('L:A32NX_AUTOPILOT_ACTIVE', 'bool');
        const thrustMode = SimVar.GetSimVarValue('L:A32NX_AUTOTHRUST_MODE', 'number');

        if (this.FcuSettings.apActive) {
          this.FcuSettings.altitude = Math.round(Simplane.getAutoPilotDisplayedAltitudeLockValue());
          this.FcuSettings.machMode = thrustMode === 8;

          if (thrustMode === 0) {
            if (this.FcuSettings.machMode) {
              this.FcuSettings.speed = SimVar.GetSimVarValue('L:A32NX_MachPreselVal', 'number');
            } else {
              this.FcuSettings.speed = SimVar.GetSimVarValue('L:A32NX_SpeedPreselVal', 'number');
            }
          } else if (this.FcuSettings.machMode) {
            this.FcuSettings.speed = SimVar.GetSimVarValue('AIRSPEED INDICATED', 'knots');
          } else {
            this.FcuSettings.speed = SimVar.GetSimVarValue('AIRSPEED MACH', 'mach');
          }
        } else {
          this.FcuSettings.altitude = null;
          this.FcuSettings.machMode = false;
          this.FcuSettings.speed = null;
        }
      }

      updateEnvironment() {
        this.EnvironmentData.windDirection = SimVar.GetSimVarValue('AMBIENT WIND DIRECTION', 'degrees');
        this.EnvironmentData.windSpeed = SimVar.GetSimVarValue('AMBIENT WIND VELOCITY', 'knots');
        this.EnvironmentData.temperature = SimVar.GetSimVarValue('AMBIENT TEMPERATURE', 'celsius');
      }

      constructor(mcdu, callback) {
        _defineProperty(this, "LastWaypoint", undefined);

        _defineProperty(this, "PresentPosition", {
          lat: null,
          lon: null,
          altitude: null,
          heading: null,
          track: null,
          indicatedAirspeed: null,
          groundSpeed: null,
          verticalSpeed: null
        });

        _defineProperty(this, "FcuSettings", {
          apActive: false,
          speed: null,
          machMode: false,
          altitude: null
        });

        _defineProperty(this, "EnvironmentData", {
          windDirection: null,
          windSpeed: null,
          temperature: null
        });

        _defineProperty(this, "ActiveWaypoint", undefined);

        _defineProperty(this, "NextWaypoint", undefined);

        _defineProperty(this, "Destination", undefined);

        setInterval(() => {
          const fp = mcdu.flightPlanManager.activeFlightPlan;
          const last = FlightStateObserver.findLastWaypoint(fp);
          const active = fp === null || fp === void 0 ? void 0 : fp.getWaypoint(fp.activeWaypointIndex);
          const next = fp === null || fp === void 0 ? void 0 : fp.getWaypoint(fp.activeWaypointIndex + 1);
          const destination = fp === null || fp === void 0 ? void 0 : fp.getWaypoint(fp.waypoints.length - 1);
          let waypointPassed = false;
          this.updatePresentPosition();
          this.updateFcu();
          this.updateEnvironment();

          if (last) {
            if (!this.LastWaypoint || last.ident !== this.LastWaypoint.ident) {
              this.LastWaypoint = new Waypoint(last.ident);
              this.LastWaypoint.utc = last.waypointReachedAt;
              this.LastWaypoint.altitude = this.PresentPosition.altitude;
              waypointPassed = true;
            }
          }

          if (active && next) {
            const ppos = {
              lat: this.PresentPosition.lat,
              long: this.PresentPosition.lon
            };
            const stats = fp.computeWaypointStatistics(ppos);

            if (!this.ActiveWaypoint || this.ActiveWaypoint.ident !== active.ident) {
              this.ActiveWaypoint = new Waypoint(active.ident);
            }

            this.ActiveWaypoint.utc = Math.round(stats.get(fp.activeWaypointIndex).etaFromPpos);

            if (!this.NextWaypoint || this.NextWaypoint.ident !== next.ident) {
              this.NextWaypoint = new Waypoint(next.ident);
            }

            this.ActiveWaypoint.utc = Math.round(stats.get(fp.activeWaypointIndex + 1).etaFromPpos);

            if (!this.Destination || this.Destination.ident !== destination.ident) {
              this.Destination = new Waypoint(destination.ident);
            }

            this.Destination.utc = Math.round(stats.get(fp.waypoints.length - 1).etaFromPpos);
          }

          if (waypointPassed) {
            callback(mcdu.atsu);
          }
        }, 1000);
      }

    }

    /**
     * Defines the general DCL message format
     */

    class DclMessage extends CpdlcMessage {
      constructor() {
        super();

        _defineProperty(this, "Callsign", '');

        _defineProperty(this, "Origin", '');

        _defineProperty(this, "Destination", '');

        _defineProperty(this, "AcType", '');

        _defineProperty(this, "Atis", '');

        _defineProperty(this, "Gate", '');

        _defineProperty(this, "Freetext", []);

        this.Type = exports.AtsuMessageType.DCL;
        this.Direction = exports.AtsuMessageDirection.Downlink;
        this.CloseAutomatically = false;
      }

      serialize(format) {
        let dclMessage = '';

        if (format === exports.AtsuMessageSerializationFormat.Network) {
          dclMessage = 'REQUEST PREDEP CLEARANCE \n';
          dclMessage += "".concat(this.Callsign, " ").concat(this.AcType, " TO ").concat(this.Destination, " \n");
          dclMessage += "AT ".concat(this.Origin).concat(this.Gate !== '' ? " STAND ".concat(this.Gate) : '', " \n");
          dclMessage += "ATIS ".concat(this.Atis);
        } else {
          if (format !== exports.AtsuMessageSerializationFormat.DCDU) {
            dclMessage = "".concat(this.Timestamp.dcduTimestamp(), " TO ").concat(this.Station, "\n");
          }

          dclMessage += "DEPART REQUEST\n".concat(this.Callsign, "\n");
          dclMessage += "FROM:".concat(this.Origin).concat(this.Gate.length !== 0 ? " GATE:".concat(this.Gate) : '', "\n");
          dclMessage += "TO:".concat(this.Destination, " ATIS:").concat(this.Atis, "\n");
          dclMessage += "A/C TYPE:".concat(this.AcType);
          const freetext = this.Freetext.join('\n').replace(/^\s*\n/gm, '');

          if (freetext.length !== 0) {
            dclMessage += "\n".concat(freetext);
          }
        }

        return dclMessage;
      } // used to deserialize event data


      deserialize(jsonData) {
        super.deserialize(jsonData);
        this.Callsign = jsonData.Callsign;
        this.Origin = jsonData.Origin;
        this.Destination = jsonData.Destination;
        this.AcType = jsonData.AcType;
        this.Gate = jsonData.Gate;
        this.Atis = jsonData.Atis;
        this.Freetext = jsonData.Freetext;
      }

    }

    /**
     * Defines the general OCL message format
     */

    class OclMessage extends CpdlcMessage {
      constructor() {
        super();

        _defineProperty(this, "Callsign", '');

        _defineProperty(this, "Destination", '');

        _defineProperty(this, "EntryPoint", '');

        _defineProperty(this, "EntryTime", '');

        _defineProperty(this, "RequestedMach", '');

        _defineProperty(this, "RequestedFlightlevel", '');

        _defineProperty(this, "Freetext", []);

        this.Type = exports.AtsuMessageType.OCL;
        this.Direction = exports.AtsuMessageDirection.Downlink;
        this.CloseAutomatically = false;
      }

      serialize(format) {
        let oclMessage = "OCEANIC REQUEST\n".concat(this.Callsign, " \n");
        oclMessage += "ENTRY POINT:".concat(this.EntryPoint, "\nAT:").concat(this.EntryTime, " \n");
        oclMessage += "REQ:".concat(this.RequestedMach, " ").concat(this.RequestedFlightlevel);
        const freetext = this.Freetext.join('\n').replace(/^\s*\n/gm, '');

        if (freetext.length !== 0) {
          oclMessage += "\n".concat(freetext);
        } // convert to the Hoppie-format


        if (format === exports.AtsuMessageSerializationFormat.Network) {
          oclMessage = "/data2/".concat(this.CurrentTransmissionId, "//N/").concat(oclMessage);
        } else if (format !== exports.AtsuMessageSerializationFormat.DCDU) {
          oclMessage = "".concat(this.Timestamp.dcduTimestamp(), " TO ").concat(this.Station, "\n").concat(oclMessage);
        }

        return oclMessage;
      } // used to deserialize event data


      deserialize(jsonData) {
        super.deserialize(jsonData);
        this.Callsign = jsonData.Callsign;
        this.Destination = jsonData.Destination;
        this.EntryPoint = jsonData.EntryPoint;
        this.EntryTime = jsonData.EntryTime;
        this.RequestedMach = jsonData.RequestedMach;
        this.RequestedFlightlevel = jsonData.RequestedFlightlevel;
        this.Freetext = jsonData.Freetext;
      }

    }

    class ATS623 {
      constructor(atsu) {
        _defineProperty(this, "atsu", null);

        _defineProperty(this, "clearanceRequest", null);

        this.atsu = atsu;
      }

      isRelevantMessage(message) {
        var _this$clearanceReques;

        if (message instanceof DclMessage || message instanceof OclMessage) {
          return true;
        }

        if (message.Station !== ((_this$clearanceReques = this.clearanceRequest) === null || _this$clearanceReques === void 0 ? void 0 : _this$clearanceReques.Station)) {
          return false;
        }

        if (message instanceof CpdlcMessage) {
          const cpdlc = message; // allow only freetext messages

          return cpdlc.Content.TypeId === 'UM183' || cpdlc.Content.TypeId === 'UM169';
        }

        return true;
      }

      insertMessages(messages) {
        const handledMessages = [];
        messages.forEach(message => {
          let processedMessage = message;

          if (!(message instanceof CpdlcMessage)) {
            processedMessage = new CpdlcMessage();
            processedMessage.UniqueMessageID = message.UniqueMessageID;
            processedMessage.ComStatus = message.ComStatus;
            processedMessage.Confirmed = message.Confirmed;
            processedMessage.Direction = message.Direction;
            processedMessage.Timestamp = message.Timestamp;
            processedMessage.Network = message.Network;
            processedMessage.Station = message.Station;
            processedMessage.Message = message.Message;
            processedMessage.DcduRelevantMessage = true;
            processedMessage.PreviousTransmissionId = this.clearanceRequest.CurrentTransmissionId;

            if (this.atsu.atc.fansMode() === exports.FansMode.FansA) {
              processedMessage.Content = CpdlcMessagesUplink.UM169[1].deepCopy();
            } else {
              processedMessage.Content = CpdlcMessagesUplink.UM183[1].deepCopy();
            }

            processedMessage.Content.Content[0].Value = message.Message;
            processedMessage.Content.ExpectedResponse = exports.CpdlcMessageExpectedResponseType.No;
          }

          if (message instanceof DclMessage || message instanceof OclMessage) {
            // new clearance request sent
            this.clearanceRequest = message;
          } else if (this.clearanceRequest instanceof DclMessage && this.atsu.destinationWaypoint()) {
            processedMessage.CloseAutomatically = false; // expect some clearance with TO DEST or SQWK/SQUAWK/SQK XXXX -> stop ATS run

            const regex = new RegExp(".*TO @?(".concat(this.atsu.destinationWaypoint().ident, "){1}@?.*(SQWK|SQUAWK){1}.*"));

            if (regex.test(processedMessage.Message)) {
              if (processedMessage.Content.ExpectedResponse === exports.CpdlcMessageExpectedResponseType.No) {
                processedMessage.Content.ExpectedResponse = exports.CpdlcMessageExpectedResponseType.Roger;
              }

              this.clearanceRequest = null;
            } else if (/.*VIA TELEX.*/.test(processedMessage.Message)) {
              // ignore "CLEARANCE DELIVERED VIA TELEX" in the DCDU
              processedMessage.DcduRelevantMessage = false;
            }
          } else if (this.atsu.destinationWaypoint()) {
            processedMessage.CloseAutomatically = false; // oceanic clearance with CLRD TO -> stop ATS run

            const regex = new RegExp(".*TO @?(".concat(this.atsu.destinationWaypoint().ident, "){1}@?"));

            if (regex.test(processedMessage.Message)) {
              if (processedMessage.Content.ExpectedResponse === exports.CpdlcMessageExpectedResponseType.No) {
                processedMessage.Content.ExpectedResponse = exports.CpdlcMessageExpectedResponseType.Roger;
              }

              this.clearanceRequest = null;
            }
          }

          handledMessages.push(processedMessage);
        });
        this.atsu.atc.insertMessages(handledMessages);
      }

    }

    /**
     * Defines the ATSU
     */

    class Atsu {
      static createAutomatedPositionReport(atsu) {
        const message = new CpdlcMessage();
        message.Station = atsu.atc.currentStation();
        message.Content.push(CpdlcMessagesDownlink.DM48[1].deepCopy());
        let targetAltitude = '';
        let passedAltitude = '';
        let currentAltitude = '';

        if (Simplane.getPressureSelectedMode(Aircraft.A320_NEO) === 'STD') {
          if (atsu.flightStateObserver.LastWaypoint) {
            passedAltitude = InputValidation.formatScratchpadAltitude("FL".concat(Math.round(atsu.flightStateObserver.LastWaypoint.altitude / 100)));
          } else {
            passedAltitude = InputValidation.formatScratchpadAltitude("FL".concat(Math.round(atsu.flightStateObserver.PresentPosition.altitude / 100)));
          }

          currentAltitude = InputValidation.formatScratchpadAltitude("FL".concat(Math.round(atsu.flightStateObserver.PresentPosition.altitude / 100)));

          if (atsu.flightStateObserver.FcuSettings.altitude) {
            targetAltitude = InputValidation.formatScratchpadAltitude("FL".concat(Math.round(atsu.flightStateObserver.FcuSettings.altitude / 100)));
          } else {
            targetAltitude = currentAltitude;
          }
        } else {
          if (atsu.flightStateObserver.LastWaypoint) {
            passedAltitude = InputValidation.formatScratchpadAltitude(atsu.flightStateObserver.LastWaypoint.altitude.toString());
          } else {
            passedAltitude = InputValidation.formatScratchpadAltitude(atsu.flightStateObserver.PresentPosition.altitude.toString());
          }

          currentAltitude = InputValidation.formatScratchpadAltitude(atsu.flightStateObserver.PresentPosition.altitude.toString());

          if (atsu.flightStateObserver.FcuSettings.altitude) {
            targetAltitude = InputValidation.formatScratchpadAltitude(atsu.flightStateObserver.FcuSettings.altitude.toString());
          } else {
            targetAltitude = currentAltitude;
          }
        }

        let extension = null;

        if (atsu.flightStateObserver.LastWaypoint) {
          // define the overhead
          extension = CpdlcMessagesDownlink.DM67[1].deepCopy();
          extension.Content[0].Value = "OVHD: ".concat(atsu.flightStateObserver.LastWaypoint.ident);
          message.Content.push(extension);
          extension = CpdlcMessagesDownlink.DM67[1].deepCopy();
          extension.Content[0].Value = "AT ".concat(timestampToString(atsu.flightStateObserver.LastWaypoint.utc), "Z/").concat(passedAltitude);
          message.Content.push(extension);
        } // define the present position


        extension = CpdlcMessagesDownlink.DM67[1].deepCopy();
        extension.Content[0].Value = "PPOS: ".concat(coordinateToString({
          lat: atsu.flightStateObserver.PresentPosition.lat,
          lon: atsu.flightStateObserver.PresentPosition.lon
        }, false));
        message.Content.push(extension);
        extension = CpdlcMessagesDownlink.DM67[1].deepCopy();
        extension.Content[0].Value = "AT ".concat(timestampToString(SimVar.GetSimVarValue('E:ZULU TIME', 'seconds')), "Z/").concat(currentAltitude);
        message.Content.push(extension);

        if (atsu.flightStateObserver.ActiveWaypoint) {
          // define the active position
          extension = CpdlcMessagesDownlink.DM67[1].deepCopy();
          extension.Content[0].Value = "TO: ".concat(atsu.flightStateObserver.ActiveWaypoint.ident, " AT ").concat(timestampToString(atsu.flightStateObserver.ActiveWaypoint.utc), "Z");
          message.Content.push(extension);
        }

        if (atsu.flightStateObserver.NextWaypoint) {
          // define the next position
          extension = CpdlcMessagesDownlink.DM67[1].deepCopy();
          extension.Content[0].Value = "NEXT: ".concat(atsu.flightStateObserver.NextWaypoint.ident);
          message.Content.push(extension);
        } // define wind and SAT


        if (atsu.flightStateObserver.EnvironmentData.windDirection && atsu.flightStateObserver.EnvironmentData.windSpeed && atsu.flightStateObserver.EnvironmentData.temperature) {
          extension = CpdlcMessagesDownlink.DM67[1].deepCopy();
          const windInput = "".concat(atsu.flightStateObserver.EnvironmentData.windDirection, "/").concat(atsu.flightStateObserver.EnvironmentData.windSpeed, "KT");
          extension.Content[0].Value = "WIND: ".concat(InputValidation.formatScratchpadWind(windInput));
          extension.Content[0].Value = "".concat(extension.Content[0].Value, " SAT: ").concat(atsu.flightStateObserver.EnvironmentData.temperature, "C");
          message.Content.push(extension);
        }

        if (atsu.destinationWaypoint()) {
          // define ETA
          extension = CpdlcMessagesDownlink.DM67[1].deepCopy();
          extension.Content[0].Value = "DEST ETA: ".concat(timestampToString(atsu.destinationWaypoint().utc), "Z");
          message.Content.push(extension);
        } // define descending/climbing and VS


        if (Math.abs(atsu.flightStateObserver.FcuSettings.altitude - atsu.flightStateObserver.PresentPosition.altitude) >= 500) {
          if (atsu.flightStateObserver.FcuSettings.altitude > atsu.flightStateObserver.PresentPosition.altitude) {
            extension = CpdlcMessagesDownlink.DM67[1].deepCopy();
            extension.Content[0].Value = "CLIMBING TO: ".concat(targetAltitude);
            message.Content.push(extension);
          } else {
            extension = CpdlcMessagesDownlink.DM67[1].deepCopy();
            extension.Content[0].Value = "DESCENDING TO: ".concat(targetAltitude);
            message.Content.push(extension);
          }

          extension = CpdlcMessagesDownlink.DM67[1].deepCopy();
          extension.Content[0].Value = "VS: ".concat(InputValidation.formatScratchpadVerticalSpeed("".concat(atsu.flightStateObserver.PresentPosition.verticalSpeed, "FTM")));
          message.Content.push(extension);
        } // define speed


        const ias = InputValidation.formatScratchpadSpeed(atsu.flightStateObserver.PresentPosition.indicatedAirspeed.toString());
        const gs = InputValidation.formatScratchpadSpeed(atsu.flightStateObserver.PresentPosition.groundSpeed.toString());
        extension = CpdlcMessagesDownlink.DM67[1].deepCopy();
        extension.Content[0].Value = "SPD: ".concat(ias, " GS: ").concat(gs);
        message.Content.push(extension); // define HDG

        const hdg = atsu.flightStateObserver.PresentPosition.heading.toString();
        extension = CpdlcMessagesDownlink.DM67[1].deepCopy();
        extension.Content[0].Value = "HDG: ".concat(hdg, "\xB0TRUE");
        message.Content.push(extension); // define track

        const trk = atsu.flightStateObserver.PresentPosition.track.toString();
        extension = CpdlcMessagesDownlink.DM67[1].deepCopy();
        extension.Content[0].Value = "TRK: ".concat(trk, "\xB0");
        message.Content.push(extension); // TODO define deviating

        return message;
      }

      static waypointPassedCallback(atsu) {
        if (atsu.atc.automaticPositionReportActive() && atsu.atc.currentStation() !== '' && atsu.flightStateObserver.LastWaypoint && atsu.flightStateObserver.ActiveWaypoint && atsu.flightStateObserver.NextWaypoint) {
          const message = Atsu.createAutomatedPositionReport(atsu); // skip the DCDU

          message.DcduRelevantMessage = false;
          atsu.sendMessage(message);
        }
      }

      constructor(mcdu) {
        _defineProperty(this, "flightStateObserver", null);

        _defineProperty(this, "datalink", new Datalink(this));

        _defineProperty(this, "fltNo", '');

        _defineProperty(this, "messageCounter", 0);

        _defineProperty(this, "ats623", new ATS623(this));

        _defineProperty(this, "aoc", new Aoc(this.datalink));

        _defineProperty(this, "atc", new Atc(this, this.datalink));

        _defineProperty(this, "modificationMessage", null);

        _defineProperty(this, "listener", RegisterViewListener('JS_LISTENER_SIMVARS', null, true));

        _defineProperty(this, "mcdu", undefined);

        this.flightStateObserver = new FlightStateObserver(mcdu, Atsu.waypointPassedCallback);
        this.mcdu = mcdu;
      }

      async connectToNetworks(flightNo) {
        await this.disconnectFromNetworks();

        if (flightNo.length === 0) {
          return exports.AtsuStatusCodes.Ok;
        }

        const code = await Datalink.connect(flightNo);

        if (code === exports.AtsuStatusCodes.Ok) {
          console.log("ATSU: Callsign switch from ".concat(this.fltNo, " to ").concat(flightNo));
          this.fltNo = flightNo;
        }

        return code;
      }

      flightPhase() {
        if (this.mcdu !== undefined && this.mcdu.flightPhaseManager) {
          return this.mcdu.flightPhaseManager.phase;
        }

        return FmgcFlightPhase.Preflight;
      }

      async disconnectFromNetworks() {
        await this.atc.disconnect();
        console.log('ATSU: Reset of callsign');
        this.fltNo = '';
        return Datalink.disconnect();
      }

      flightNumber() {
        return this.fltNo;
      }

      async sendMessage(message) {
        let retval = exports.AtsuStatusCodes.UnknownMessage;

        if (Aoc.isRelevantMessage(message)) {
          retval = await this.aoc.sendMessage(message);

          if (retval === exports.AtsuStatusCodes.Ok) {
            this.registerMessages([message]);
          }
        } else if (Atc.isRelevantMessage(message)) {
          retval = await this.atc.sendMessage(message);

          if (retval === exports.AtsuStatusCodes.Ok) {
            this.registerMessages([message]);
          }
        }

        return retval;
      }

      removeMessage(uid) {
        if (this.atc.removeMessage(uid) === true) {
          this.listener.triggerToAllSubscribers('A32NX_DCDU_MSG_DELETE_UID', uid);
        } else {
          this.aoc.removeMessage(uid);
        }
      }

      registerMessages(messages) {
        if (messages.length === 0) return;
        messages.forEach(message => {
          message.UniqueMessageID = ++this.messageCounter;
          message.Timestamp = new AtsuTimestamp();
        });

        if (this.ats623.isRelevantMessage(messages[0])) {
          this.ats623.insertMessages(messages);
        } else if (Aoc.isRelevantMessage(messages[0])) {
          this.aoc.insertMessages(messages);
        } else if (Atc.isRelevantMessage(messages[0])) {
          this.atc.insertMessages(messages);
        }
      }

      messageRead(uid) {
        this.aoc.messageRead(uid);
        this.atc.messageRead(uid);
      }

      publishAtsuStatusCode(code) {
        this.mcdu.addNewAtsuMessage(code);
      }

      modifyDcduMessage(message) {
        this.modificationMessage = message;
        this.mcdu.tryToShowAtcModifyPage();
      }

      async isRemoteStationAvailable(callsign) {
        return this.datalink.isStationAvailable(callsign);
      }

      findMessage(uid) {
        let message = this.aoc.messages().find(element => element.UniqueMessageID === uid);

        if (message !== undefined) {
          return message;
        }

        message = this.atc.messages().find(element => element.UniqueMessageID === uid);

        if (message !== undefined) {
          return message;
        }

        return undefined;
      }

      printMessage(message) {
        const text = message.serialize(exports.AtsuMessageSerializationFormat.Printer);
        this.mcdu.printPage(text.split('\n'));
      }

      lastWaypoint() {
        return this.flightStateObserver.LastWaypoint;
      }

      activeWaypoint() {
        return this.flightStateObserver.ActiveWaypoint;
      }

      nextWaypoint() {
        return this.flightStateObserver.NextWaypoint;
      }

      destinationWaypoint() {
        return this.flightStateObserver.Destination;
      }

      currentFlightState() {
        return this.flightStateObserver.PresentPosition;
      }

      targetFlightState() {
        return this.flightStateObserver.FcuSettings;
      }

    }

    exports.Aoc = Aoc;
    exports.Atc = Atc;
    exports.AtisMessage = AtisMessage;
    exports.Atsu = Atsu;
    exports.AtsuMessage = AtsuMessage;
    exports.AtsuTimestamp = AtsuTimestamp;
    exports.CpdlcMessage = CpdlcMessage;
    exports.CpdlcMessageContent = CpdlcMessageContent;
    exports.CpdlcMessageElement = CpdlcMessageElement;
    exports.CpdlcMessagesDownlink = CpdlcMessagesDownlink;
    exports.DclMessage = DclMessage;
    exports.FreetextMessage = FreetextMessage;
    exports.HoppieConnector = HoppieConnector;
    exports.InputValidation = InputValidation;
    exports.MetarMessage = MetarMessage;
    exports.OclMessage = OclMessage;
    exports.TafMessage = TafMessage;
    exports.UplinkMessageInterpretation = UplinkMessageInterpretation;
    exports.UplinkMessageStateMachine = UplinkMessageStateMachine;
    exports.UplinkMonitor = UplinkMonitor;
    exports.Waypoint = Waypoint;
    exports.WeatherMessage = WeatherMessage;
    exports.coordinateToString = coordinateToString;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
