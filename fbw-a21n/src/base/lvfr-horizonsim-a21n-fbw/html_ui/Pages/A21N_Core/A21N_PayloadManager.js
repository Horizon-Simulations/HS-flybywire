class A32NX_PayloadConstructor {
    constructor() {
        this.paxStations = {
            rows1_6: {
                name: 'ROWS [1-9]',
                seats: 56,
                weight: Math.round(NXUnits.kgToUser(4536)),
                stationIndex: 0 + 1,
                position: 28.475,
                simVar: 'A32NX_PAX_A',
            },
            rows7_13: {
                name: 'ROWS [10-18]',
                seats: 56,
                weight: Math.round(NXUnits.kgToUser(4536)),
                stationIndex: 1 + 1,
                position: 4.225,
                simVar: 'A32NX_PAX_B',
            },
            rows14_21: {
                name: 'ROWS [19-27]',
                seats: 56,
                weight: Math.round(NXUnits.kgToUser(4536)),
                stationIndex: 2 + 1,
                position: -20.025,
                simVar: 'A32NX_PAX_C',
            },
            rows22_29: {
                name: 'ROWS [28-36]',
                seats: 56,
                weight: Math.round(NXUnits.kgToUser(4536)),
                stationIndex: 3 + 1,
                position: -44.275,
                simVar: 'A32NX_PAX_D',
            },
        };

        this.cargoStations = {
            fwdBag: {
                name: 'FWD BAGGAGE/CONTAINER',
                weight: Math.round(NXUnits.kgToUser(3402)),
                load: 0,
                stationIndex: 4 + 1,
                position: 26.24,
                visible: true,
                simVar: 'A32NX_CARGO_FWD_BAGGAGE_CONTAINER',
            },
            aftCont: {
                name: 'AFT CONTAINER',
                weight: Math.round(NXUnits.kgToUser(2426)),
                load: 0,
                stationIndex: 5 + 1,
                position: -29.68,
                visible: true,
                simVar: 'A32NX_CARGO_AFT_CONTAINER',
            },
            aftBag: {
                name: 'AFT BAGGAGE',
                weight: Math.round(NXUnits.kgToUser(2110)),
                load: 0,
                stationIndex: 6 + 1,
                position: -47.15,
                visible: true,
                simVar: 'A32NX_CARGO_AFT_BAGGAGE',
            },
            aftBulk: {
                name: 'AFT BULK/LOOSE',
                weight: Math.round(NXUnits.kgToUser(1497)),
                load: 0,
                stationIndex: 7 + 1,
                position: -58.29,
                visible: true,
                simVar: 'A32NX_CARGO_AFT_BULK_LOOSE',
            },
        };
    }
}

const payloadConstruct = new A32NX_PayloadConstructor();
const paxStations = payloadConstruct.paxStations;
const cargoStations = payloadConstruct.cargoStations;
const MAX_SEAT_AVAILABLE = 216;

/**
     * Calculate %MAC ZWFCG of all stations
     */
function getZfwcg() {
    const leMacZ = -13.675; // Accurate to 3 decimals, replaces debug weight values
    const macSize = 13.454; // Accurate to 3 decimals, replaces debug weight values

    const emptyWeight = (SimVar.GetSimVarValue('EMPTY WEIGHT', getUserUnit()));
    const emptyPosition = -17.04; // Value from flight_model.cfg
    const emptyMoment = emptyPosition * emptyWeight;
    const PAX_WEIGHT = SimVar.GetSimVarValue('L:A32NX_WB_PER_PAX_WEIGHT', 'Number');

    const paxTotalMass = Object.values(paxStations).map((station) => new BitFlags(SimVar.GetSimVarValue(`L:${station.simVar}`, 'Number')).getTotalBits() * PAX_WEIGHT).reduce((acc, cur) => acc + cur, 0);
    const paxTotalMoment = Object.values(paxStations).map((station) => new BitFlags(SimVar.GetSimVarValue(`L:${station.simVar}`, 'Number')).getTotalBits() * PAX_WEIGHT * station.position).reduce((acc, cur) => acc + cur, 0);
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
    const emptyWeight = (SimVar.GetSimVarValue('EMPTY WEIGHT', getUserUnit()));
    return emptyWeight + getTotalPayload();
}

function getUserUnit() {
    const defaultUnit = (NXUnits.userWeightUnit() == 'KG') ? 'Kilograms' : 'Pounds';
    return defaultUnit;
}
