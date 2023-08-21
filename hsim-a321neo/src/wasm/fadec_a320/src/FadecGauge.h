#pragma once

#ifndef __INTELLISENSE__
#define MODULE_EXPORT __attribute__((visibility("default")))
#define MODULE_WASM_MODNAME(mod) __attribute__((import_module(mod)))
#else
#define MODULE_EXPORT
#define MODULE_WASM_MODNAME(mod)
#define __attribute__(x)
#define __restrict__
#endif

#include <MSFS\Legacy\gauges.h>
#include <MSFS\MSFS.h>
#include <MSFS\MSFS_Render.h>
#include <SimConnect.h>

#include <chrono>
#include <cmath>
#include <iostream>
#include <string>

#include "EngineControl.h"
// #include "ThrustLimits.h"
#include "RegPolynomials.h"
#include "SimVars.h"
#include "Tables.h"
#include "common.h"

#define DEFAULT_AIRCRAFT_REGISTRATION "ASX320"

class FadecGauge {
 private:
  bool isConnected = false;
  bool _isReady = false;
  double previousSimulationTime = 0;
  SimulationData simulationData = {};
  SimulationDataLivery simulationDataLivery = {};

  /// <summary>
  /// Initializes the connection to SimConnect
  /// </summary>
  /// <returns>True if successful, false otherwise.</returns>
  bool initializeSimConnect() {
    std::cout << "FADEC: Connecting to SimConnect..." << std::endl;
    if (SUCCEEDED(SimConnect_Open(&hSimConnect, "FadecGauge", nullptr, 0, 0, 0))) {
      std::cout << "FADEC: SimConnect connected." << std::endl;

      // SimConnect Tanker Definitions
      SimConnect_AddToDataDefinition(hSimConnect, DataTypesID::FuelLeftMain, "FUEL TANK LEFT MAIN QUANTITY", "Gallons");
      SimConnect_AddToDataDefinition(hSimConnect, DataTypesID::FuelRightMain, "FUEL TANK RIGHT MAIN QUANTITY", "Gallons");
      SimConnect_AddToDataDefinition(hSimConnect, DataTypesID::FuelCenterMain, "FUEL TANK CENTER QUANTITY", "Gallons");
      SimConnect_AddToDataDefinition(hSimConnect, DataTypesID::FuelLeftAux, "FUEL TANK LEFT AUX QUANTITY", "Gallons");
      SimConnect_AddToDataDefinition(hSimConnect, DataTypesID::FuelRightAux, "FUEL TANK RIGHT AUX QUANTITY", "Gallons");
      SimConnect_AddToDataDefinition(hSimConnect, DataTypesID::FuelAct1, "FUELSYSTEM TANK QUANTITY:6", "Gallons");
      SimConnect_AddToDataDefinition(hSimConnect, DataTypesID::FuelAct2, "FUELSYSTEM TANK QUANTITY:7", "Gallons");

      // SimConnect Oil Temperature Definitions
      SimConnect_AddToDataDefinition(hSimConnect, DataTypesID::OilTempLeft, "GENERAL ENG OIL TEMPERATURE:1", "Celsius");
      SimConnect_AddToDataDefinition(hSimConnect, DataTypesID::OilTempRight, "GENERAL ENG OIL TEMPERATURE:2", "Celsius");

      // SimConnect Oil Pressure Definitions
      SimConnect_AddToDataDefinition(hSimConnect, DataTypesID::OilPsiLeft, "GENERAL ENG OIL PRESSURE:1", "Psi");
      SimConnect_AddToDataDefinition(hSimConnect, DataTypesID::OilPsiRight, "GENERAL ENG OIL PRESSURE:2", "Psi");

      // SimConnect Engine Start Definitions
      SimConnect_AddToDataDefinition(hSimConnect, DataTypesID::StartCN2Left, "TURB ENG CORRECTED N2:1", "Percent");
      SimConnect_AddToDataDefinition(hSimConnect, DataTypesID::StartCN2Right, "TURB ENG CORRECTED N2:2", "Percent");
      // Simulation Data
      SimConnect_AddToDataDefinition(hSimConnect, DataTypesID::SimulationDataTypeId, "SIMULATION TIME", "NUMBER");
      SimConnect_AddToDataDefinition(hSimConnect, DataTypesID::SimulationDataTypeId, "SIMULATION RATE", "NUMBER");

      SimConnect_AddToDataDefinition(hSimConnect, DataTypesID::AcftInfo, "ATC ID", NULL, SIMCONNECT_DATATYPE_STRING32);

      std::cout << "FADEC: SimConnect registrations complete." << std::endl;
      return true;
    }

    std::cout << "FADEC: SimConnect failed." << std::endl;

    return false;
  }

  bool isRegistrationFound() { return simulationDataLivery.atc_id[0] != 0; }

 public:
  /// <summary>
  /// Initializes the FADEC control
  /// </summary>
  /// <returns>True if successful, false otherwise.</returns>
  bool initializeFADEC() {
    if (!this->initializeSimConnect()) {
      std::cout << "FADEC: Init SimConnect failed." << std::endl;
      return false;
    }

    isConnected = true;

    return true;
  }

  /// <summary>
  /// Callback used to update the FADEC at each tick (dt)
  /// </summary>
  /// <returns>True if successful, false otherwise.</returns>
  bool onUpdate(double deltaTime) {
    if (isConnected == true) {
      // read simulation data from simconnect
      simConnectRequestData();
      simConnectReadData();
      // detect pause
      if ((simulationData.simulationTime == previousSimulationTime) || (simulationData.simulationTime < 0.2)) {
        // pause detected -> return
        return true;
      }
      // calculate delta time
      double calculatedSampleTime = max(0.002, simulationData.simulationTime - previousSimulationTime);
      // store previous simulation time
      previousSimulationTime = simulationData.simulationTime;
      // update engines
      EngineControlInstance.update(calculatedSampleTime, simulationData.simulationTime);
    }

    return true;
  }

  bool simConnectRequestDataAcftInfo() {
    // check if we are connected
    if (!isConnected) {
      return false;
    }

    // request data
    return S_OK ==
           SimConnect_RequestDataOnSimObject(hSimConnect, 8, DataTypesID::AcftInfo, SIMCONNECT_OBJECT_ID_USER, SIMCONNECT_PERIOD_ONCE);
  }

  bool simConnectRequestData() {
    // check if we are connected
    if (!isConnected) {
      return false;
    }

    // request data
    HRESULT result = SimConnect_RequestDataOnSimObject(hSimConnect, 0, DataTypesID::SimulationDataTypeId, SIMCONNECT_OBJECT_ID_USER,
                                                       SIMCONNECT_PERIOD_ONCE);

    // check result of data request
    if (result != S_OK) {
      // request failed
      return false;
    }

    // success
    return true;
  }

  bool simConnectReadData() {
    // check if we are connected
    if (!isConnected) {
      return false;
    }

    // get next dispatch message(s) and process them
    DWORD cbData;
    SIMCONNECT_RECV* pData;
    while (SUCCEEDED(SimConnect_GetNextDispatch(hSimConnect, &pData, &cbData))) {
      simConnectProcessDispatchMessage(pData, &cbData);
    }

    // success
    return true;
  }

  void simConnectProcessDispatchMessage(SIMCONNECT_RECV* pData, DWORD* cbData) {
    switch (pData->dwID) {
      case SIMCONNECT_RECV_ID_OPEN:
        // connection established
        std::cout << "FADEC: SimConnect connection established" << std::endl;
        break;

      case SIMCONNECT_RECV_ID_QUIT:
        // connection lost
        std::cout << "FADEC: Received SimConnect connection quit message" << std::endl;
        break;

      case SIMCONNECT_RECV_ID_SIMOBJECT_DATA:
        // process data
        simConnectProcessSimObjectData(static_cast<SIMCONNECT_RECV_SIMOBJECT_DATA*>(pData));
        break;

      case SIMCONNECT_RECV_ID_EXCEPTION:
        // exception
        std::cout << "FADEC: Exception in SimConnect connection: ";
        std::cout << getSimConnectExceptionString(
            static_cast<SIMCONNECT_EXCEPTION>(static_cast<SIMCONNECT_RECV_EXCEPTION*>(pData)->dwException));
        std::cout << std::endl;
        break;

      default:
        break;
    }
  }

  void simConnectProcessSimObjectData(const SIMCONNECT_RECV_SIMOBJECT_DATA* data) {
    // process depending on request id
    switch (data->dwRequestID) {
      case 0:
        // store aircraft data
        simulationData = *((SimulationData*)&data->dwData);
        return;
      case 8:
        simulationDataLivery = *((SimulationDataLivery*)&data->dwData);
        if (simulationDataLivery.atc_id[0] == '\0') {
          std::cout << "FADEC: Use default aircraft registration " << DEFAULT_AIRCRAFT_REGISTRATION << std::endl;
          strncpy(simulationDataLivery.atc_id, DEFAULT_AIRCRAFT_REGISTRATION, sizeof(simulationDataLivery.atc_id));
        }
        return;

      default:
        // print unknown request id
        std::cout << "FADEC: Unknown request id in SimConnect connection: ";
        std::cout << data->dwRequestID << std::endl;
        return;
    }
  }

  /// <summary>
  /// Kills the FADEC and unregisters all LVars
  /// </summary>
  /// <returns>True if successful, false otherwise.</returns>
  bool killFADEC() {
    std::cout << "FADEC: Disconnecting ..." << std::endl;
    EngineControlInstance.terminate();

    isConnected = false;
    unregister_all_named_vars();

    std::cout << "FADEC: Disconnected." << std::endl;
    return SUCCEEDED(SimConnect_Close(hSimConnect));
  }

  std::string getSimConnectExceptionString(SIMCONNECT_EXCEPTION exception) {
    switch (exception) {
      case SIMCONNECT_EXCEPTION_NONE:
        return "NONE";

      case SIMCONNECT_EXCEPTION_ERROR:
        return "ERROR";

      case SIMCONNECT_EXCEPTION_SIZE_MISMATCH:
        return "SIZE_MISMATCH";

      case SIMCONNECT_EXCEPTION_UNRECOGNIZED_ID:
        return "UNRECOGNIZED_ID";

      case SIMCONNECT_EXCEPTION_UNOPENED:
        return "UNOPENED";

      case SIMCONNECT_EXCEPTION_VERSION_MISMATCH:
        return "VERSION_MISMATCH";

      case SIMCONNECT_EXCEPTION_TOO_MANY_GROUPS:
        return "TOO_MANY_GROUPS";

      case SIMCONNECT_EXCEPTION_NAME_UNRECOGNIZED:
        return "NAME_UNRECOGNIZED";

      case SIMCONNECT_EXCEPTION_TOO_MANY_EVENT_NAMES:
        return "TOO_MANY_EVENT_NAMES";

      case SIMCONNECT_EXCEPTION_EVENT_ID_DUPLICATE:
        return "EVENT_ID_DUPLICATE";

      case SIMCONNECT_EXCEPTION_TOO_MANY_MAPS:
        return "TOO_MANY_MAPS";

      case SIMCONNECT_EXCEPTION_TOO_MANY_OBJECTS:
        return "TOO_MANY_OBJECTS";

      case SIMCONNECT_EXCEPTION_TOO_MANY_REQUESTS:
        return "TOO_MANY_REQUESTS";

      case SIMCONNECT_EXCEPTION_WEATHER_INVALID_PORT:
        return "WEATHER_INVALID_PORT";

      case SIMCONNECT_EXCEPTION_WEATHER_INVALID_METAR:
        return "WEATHER_INVALID_METAR";

      case SIMCONNECT_EXCEPTION_WEATHER_UNABLE_TO_GET_OBSERVATION:
        return "WEATHER_UNABLE_TO_GET_OBSERVATION";

      case SIMCONNECT_EXCEPTION_WEATHER_UNABLE_TO_CREATE_STATION:
        return "WEATHER_UNABLE_TO_CREATE_STATION";

      case SIMCONNECT_EXCEPTION_WEATHER_UNABLE_TO_REMOVE_STATION:
        return "WEATHER_UNABLE_TO_REMOVE_STATION";

      case SIMCONNECT_EXCEPTION_INVALID_DATA_TYPE:
        return "INVALID_DATA_TYPE";

      case SIMCONNECT_EXCEPTION_INVALID_DATA_SIZE:
        return "INVALID_DATA_SIZE";

      case SIMCONNECT_EXCEPTION_DATA_ERROR:
        return "DATA_ERROR";

      case SIMCONNECT_EXCEPTION_INVALID_ARRAY:
        return "INVALID_ARRAY";

      case SIMCONNECT_EXCEPTION_CREATE_OBJECT_FAILED:
        return "CREATE_OBJECT_FAILED";

      case SIMCONNECT_EXCEPTION_LOAD_FLIGHTPLAN_FAILED:
        return "LOAD_FLIGHTPLAN_FAILED";

      case SIMCONNECT_EXCEPTION_OPERATION_INVALID_FOR_OBJECT_TYPE:
        return "OPERATION_INVALID_FOR_OBJECT_TYPE";

      case SIMCONNECT_EXCEPTION_ILLEGAL_OPERATION:
        return "ILLEGAL_OPERATION";

      case SIMCONNECT_EXCEPTION_ALREADY_SUBSCRIBED:
        return "ALREADY_SUBSCRIBED";

      case SIMCONNECT_EXCEPTION_INVALID_ENUM:
        return "INVALID_ENUM";

      case SIMCONNECT_EXCEPTION_DEFINITION_ERROR:
        return "DEFINITION_ERROR";

      case SIMCONNECT_EXCEPTION_DUPLICATE_ID:
        return "DUPLICATE_ID";

      case SIMCONNECT_EXCEPTION_DATUM_ID:
        return "DATUM_ID";

      case SIMCONNECT_EXCEPTION_OUT_OF_BOUNDS:
        return "OUT_OF_BOUNDS";

      case SIMCONNECT_EXCEPTION_ALREADY_CREATED:
        return "ALREADY_CREATED";

      case SIMCONNECT_EXCEPTION_OBJECT_OUTSIDE_REALITY_BUBBLE:
        return "OBJECT_OUTSIDE_REALITY_BUBBLE";

      case SIMCONNECT_EXCEPTION_OBJECT_CONTAINER:
        return "OBJECT_CONTAINER";

      case SIMCONNECT_EXCEPTION_OBJECT_AI:
        return "OBJECT_AI";

      case SIMCONNECT_EXCEPTION_OBJECT_ATC:
        return "OBJECT_ATC";

      case SIMCONNECT_EXCEPTION_OBJECT_SCHEDULE:
        return "OBJECT_SCHEDULE";

      default:
        return "UNKNOWN";
    }
  }

  /*
   * This function is to call if some data are needed before initialization of
   * the engine (such as aircraft registration). This has to be done here due to
   * data fetch feature being available after the first PANEL_SERVICE_PRE_DRAW
   * (from what I have observed) This problem was observed when engine
   * configuration file was under development Reach Julian Sebline on Discord if
   * information needed
   *
   * Modify this function as needed
   *
   * @return true if all the requirements to initialize the engine are fulfilled
   */
  bool fetchNeededData() {
    // This two lines request aircraft registration
    simConnectRequestDataAcftInfo();
    simConnectReadData();

    _isReady = isRegistrationFound();

    if (_isReady) {
      EngineControlInstance.initialize(simulationDataLivery.atc_id);
    }

    return _isReady;
  }

  bool isReady() { return _isReady; }
};
