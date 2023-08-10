/* eslint-disable no-undef */
class A32NX_PayloadConstructor {
    constructor() {
        this.paxStations = {
            rows1_5: {
                name: 'ROWS [1-5]',
                seats: 16,
                weight: Math.round(NXUnits.kgToUser(1264)),
                stationIndex: 0 + 1,
                position: 16.5,
                simVar: "A32NX_PAX_A"
            },
            rows6_10: {
                name: 'ROWS [6-10]',
                seats: 30,
                weight: Math.round(NXUnits.kgToUser(2370)),
                stationIndex: 1 + 1,
                position: -2,
                simVar: "A32NX_PAX_B"
            },
            rows11_15: {
                name: 'ROWS [11-15]',
                seats: 30,
                weight: Math.round(NXUnits.kgToUser(2370)),
                stationIndex: 2 + 1,
                position: -20.45,
                simVar: "A32NX_PAX_C"
            },
            rows16_22: {
                name: 'ROWS [16-22]',
                seats: 42,
                weight: Math.round(NXUnits.kgToUser(3318)),
                stationIndex: 3 + 1,
                position: -38.9,
                simVar: "A32NX_PAX_D"
            },
            rows23_29: {
                name: 'ROWS [23-29]',
                seats: 42,
                weight: Math.round(NXUnits.kgToUser(3318)),
                stationIndex: 4 + 1,
                position: -57.35,
                simVar: "A32NX_PAX_E"
            },
        };

        this.cargoStations = {
            fwdBag: {
                name: 'FWD BAGGAGE/CONTAINER',
                weight: Math.round(NXUnits.kgToUser(3402)),
                load: 0,
                stationIndex: 5 + 1,
                position: 13.43,
                visible: true,
                simVar: 'A32NX_CARGO_FWD_BAGGAGE_CONTAINER',
            },
            aftCont: {
                name: 'AFT CONTAINER',
                weight: Math.round(NXUnits.kgToUser(2426)),
                load: 0,
                stationIndex: 6 + 1,
                position: -41.83,
                visible: true,
                simVar: 'A32NX_CARGO_AFT_CONTAINER',
            },
            aftBag: {
                name: 'AFT BAGGAGE',
                weight: Math.round(NXUnits.kgToUser(2110)),
                load: 0,
                stationIndex: 7 + 1,
                position: -54.83,
                visible: true,
                simVar: 'A32NX_CARGO_AFT_BAGGAGE',
            },
            aftBulk: {
                name: 'AFT BULK/LOOSE',
                weight: Math.round(NXUnits.kgToUser(1497)),
                load: 0,
                stationIndex: 8 + 1,
                position: -62.13,
                visible: true,
                simVar: 'A32NX_CARGO_AFT_BULK_LOOSE',
            },
        };
    }
}

const payloadConstruct = new A32NX_PayloadConstructor();
const paxStations = payloadConstruct.paxStations;
const cargoStations = payloadConstruct.cargoStations;
const MAX_SEAT_AVAILABLE = 160;

/**
 * Calculate %MAC ZWFCG of all stations
 */
function getZfwcg() {

    const leMacZ = -18.417; // Accurate to 3 decimals, replaces debug weight values
    const macSize = 13.464; // Accurate to 3 decimals, replaces debug weight values

    const emptyWeight = (SimVar.GetSimVarValue("EMPTY WEIGHT", getUserUnit()));
    const emptyPosition = -21.775; // Value from flight_model.cfg
    const emptyMoment = emptyPosition * emptyWeight;
    const PAX_WEIGHT = SimVar.GetSimVarValue("L:A32NX_WB_PER_PAX_WEIGHT", "Number");

    const paxTotalMass = Object.values(paxStations).map((station) => new BitFlags(SimVar.GetSimVarValue(`L:${station.simVar}`, "Number")).getTotalBits() * PAX_WEIGHT).reduce((acc, cur) => acc + cur, 0);
    const paxTotalMoment = Object.values(paxStations).map((station) => new BitFlags(SimVar.GetSimVarValue(`L:${station.simVar}`, "Number")).getTotalBits() * PAX_WEIGHT * station.position).reduce((acc, cur) => acc + cur, 0);

    const cargoTotalMass = Object.values(cargoStations).map((station) => SimVar.GetSimVarValue(`PAYLOAD STATION WEIGHT:${station.stationIndex}`, getUserUnit())).reduce((acc, cur) => acc + cur, 0);
    const cargoTotalMoment = Object.values(cargoStations).map((station) => (SimVar.GetSimVarValue(`PAYLOAD STATION WEIGHT:${station.stationIndex}`, getUserUnit()) * station.position)).reduce((acc, cur) => acc + cur, 0);

    const totalMass = emptyWeight + paxTotalMass + cargoTotalMass;
    const totalMoment = emptyMoment + paxTotalMoment + cargoTotalMoment;

    const cgPosition = totalMoment / totalMass;
    const cgPositionToLemac = cgPosition - leMacZ;
    const cgPercentMac = -100 * (cgPositionToLemac / macSize);

    return cgPercentMac;
}

function getTotalCargo() {
    const cargoTotalMass = Object.values(cargoStations).filter((station) => station.visible).map((station) => SimVar.GetSimVarValue(`PAYLOAD STATION WEIGHT:${station.stationIndex}`, getUserUnit())).reduce((acc, cur) => acc + cur, 0);
    return cargoTotalMass;
}

function getTotalPayload() {
    const paxTotalMass = Object.values(paxStations).map((station) => SimVar.GetSimVarValue(`PAYLOAD STATION WEIGHT:${station.stationIndex}`, getUserUnit())).reduce((acc, cur) => acc + cur, 0);
    const cargoTotalMass = getTotalCargo();
    return paxTotalMass + cargoTotalMass;
}

function getZfw() {
    const emptyWeight = (SimVar.GetSimVarValue("EMPTY WEIGHT", getUserUnit()));
    return emptyWeight + getTotalPayload();
}

function getUserUnit() {
    const defaultUnit = (NXUnits.userWeightUnit() == "KG") ? "Kilograms" : "Pounds";
    return defaultUnit;
}
