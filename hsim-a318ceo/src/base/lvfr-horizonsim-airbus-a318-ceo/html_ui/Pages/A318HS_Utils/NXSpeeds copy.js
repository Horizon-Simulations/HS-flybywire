/**
 * TO V2 speed table
 * calls function(gross weight (t)) which returns CAS.
 * Indexes: 0 - Config 1 + F, 1 - Config 2, 2 - Config 3.
 * Sub-Indexes: 0 to 11 represent gross weight (t) in 5t steps from 50 to 105.
 * BASED ON A320 FCOM vol. 1
 */
const to = [
    [
        () => 144, // 50
        () => 145, // 55
        () => 146, // 60
        () => 146, // 65
        () => 146, // 70
        () => 146, // 75
        () => 151, // 80
        () => 157, // 85
        () => 161, // 90
        () => 166, // 95
        () => 168, // 100
        () => 169, // 105
    ], // Conf 1 + F
    [
        () => 133, // 50
        () => 133, // 55
        () => 133, // 60
        () => 134, // 65
        () => 139, // 70
        () => 144, // 75
        () => 149, // 80
        () => 153, // 85
        () => 157, // 90
        () => 161, // 95
        () => 165, // 100
        () => 167, // 105
    ], // Conf 2
    [
        () => 130, // 50
        () => 130, // 55
        () => 130, // 60
        () => 130, // 65
        () => 130, // 70
        () => 132, // 75
        () => 136, // 80
        () => 140, // 85
        () => 142, // 90
        () => 142, // 95
        () => 145, // 100
        () => 146, // 105
    ] // Conf 3
];

/**
 * Stall speed table
 * calls function(gross weight (t), landing gear) which returns CAS.
 * Indexes: 0 - Clean config, 1 - Config 1 + F, 2 - Config 2, 3 - Config 3, 4 - Config Full, 5 - Config 1.
 * Sub-Indexes: 0 to 11 represent gross weight (t) in 5t steps from 50 to 105.
 *  * BASED ON A320 FCOM vol. 1
 */
const vs = [
    [
        () => 135, // 50
        () => 137, // 55
        () => 142, // 60
        () => 148, // 65
        () => 153, // 70
        () => 159, // 75
        () => 164, // 80
        () => 169, // 85
        () => 173, // 90
        () => 177, // 95
        () => 179, // 100
        () => 181, // 105
    ], // Clean Conf
    [
        () => 101, // 50
        () => 106, // 55
        () => 110, // 60
        () => 114, // 65
        () => 119, // 70
        () => 123, // 75
        () => 126, // 80
        () => 130, // 85
        () => 134, // 90
        () => 137, // 95
        () => 140, // 100
        () => 143, // 105
    ], // Conf 1 + F
    [
        () => 96, // 50
        () => 100, // 55
        () => 104, // 60
        () => 108, // 65
        () => 113, // 70
        () => 117, // 75
        () => 120, // 80
        () => 123, // 85
        () => 126, // 90
        () => 130, // 95
        () => 133, // 100
        () => 137, // 105
    ], // Conf 2
    [
        () => 92, // 50
        () => 97, // 55
        () => 101, // 60
        () => 105, // 65
        () => 109, // 70
        () => 112, // 75
        () => 116, // 80
        () => 119, // 85
        () => 122, // 90
        () => 126, // 95
        () => 130, // 100
        () => 135, // 105
    ], // Conf 3
    [
        () => 91, // 50
        () => 93, // 55
        () => 97, // 60
        () => 101, // 65
        () => 104, // 70
        () => 107, // 75
        () => 111, // 80
        () => 115, // 85
        () => 118, // 90
        () => 121, // 95
        () => 125, // 100
        () => 128, // 105
    ], // Conf Full
    [
        () => 112, // 50
        () => 115, // 55
        () => 119, // 60
        () => 124, // 65
        () => 129, // 70
        () => 133, // 75
        () => 137, // 80
        () => 141, // 85
        () => 145, // 90
        () => 148, // 95
        () => 152, // 100
        () => 156, // 105
    ] // Conf 1
];

/**
 * Lowest selectable Speed Table
 * calls function(gross weigh (t), landing gear) which returns CAS, automatically compensates for cg.
 * Indexes: 0 - Clean config, 1 - Config 1 + F, 2 - Config 2, 3 - Config 3, 4 - Config Full, 5 - Config 1.
 * Sub-Indexes: 0 to 11 represent gross weight (t) in 5t steps from 50 to 105.
 *  * BASED ON A320 FCOM 2 (VS FLAPS * 1.23 / VS CLEAN * 1.28) https://safetyfirst.airbus.com/control-your-speed-during-descent-approach-and-landing/
 */
const vls = [
    [
        () => 173, // 50
        () => 175, // 55
        () => 182, // 60
        () => 189, // 65
        () => 196, // 70
        () => 204, // 75
        () => 210, // 80
        () => 216, // 85
        () => 221, // 90
        () => 227, // 95
        () => 229, // 100
        () => 232, // 105
    ], // Clean Config
    [
        () => 124, // 50
        () => 130, // 55
        () => 135, // 60
        () => 140, // 65
        () => 146, // 70
        () => 151, // 75
        () => 155, // 80
        () => 160, // 85
        () => 165, // 90
        () => 169, // 95
        () => 172, // 100
        () => 176, // 105
    ], // Config 1 + F
    [
        () => 118, // 50
        () => 123, // 55
        () => 128, // 60
        () => 133, // 65
        () => 139, // 70
        () => 144, // 75
        () => 148, // 80
        () => 151, // 85
        () => 155, // 90
        () => 160, // 95
        () => 164, // 100
        () => 169, // 105
    ], // Config 2
    [
        () => 113, // 50
        () => 119, // 55
        () => 124, // 60
        () => 129, // 65
        () => 134, // 70
        () => 138, // 75
        () => 143, // 80
        () => 146, // 85
        () => 150, // 90
        () => 155, // 95
        () => 160, // 100
        () => 166, // 105
    ], // Config 3
    [
        () => 112, // 50
        () => 114, // 55
        () => 119, // 60
        () => 124, // 65
        () => 128, // 70
        () => 132, // 75
        () => 137, // 80
        () => 141, // 85
        () => 145, // 90
        () => 149, // 95
        () => 154, // 100
        () => 157, // 105
    ], // Config Full
    [
        () => 138, // 50
        () => 141, // 55
        () => 146, // 60
        () => 153, // 65
        () => 159, // 70
        () => 164, // 75
        () => 169, // 80
        () => 173, // 85
        () => 178, // 90
        () => 182, // 95
        () => 187, // 100
        () => 192, // 105
    ] // Config 1
];

/**
 * Lowest selectable Speed Table for TakeOff ONLY
 * calls function(gross weight (t)) which returns CAS.
 * Indexes: 0 - Clean config, 1 - Config 1 + F, 2 - Config 2, 3 - Config 3, 4 - Config Full, 5 - Config 1.
 * Sub-Indexes: 0 to 11 represent gross weight (t) in 5t steps from 50 to 105.
 * BASED ON A320 FCOM vol. 1 (VS * 1.13)
 */
const vlsTo = [
    [
        () => 153, // 50
        () => 155, // 55
        () => 160, // 60
        () => 167, // 65
        () => 173, // 70
        () => 180, // 75
        () => 185, // 80
        () => 191, // 85
        () => 195, // 90
        () => 200, // 95
        () => 202, // 100
        () => 205, // 105
    ], // Clean Config
    [
        () => 114, // 50
        () => 120, // 55
        () => 124, // 60
        () => 129, // 65
        () => 134, // 70
        () => 139, // 75
        () => 142, // 80
        () => 147, // 85
        () => 151, // 90
        () => 155, // 95
        () => 158, // 100
        () => 162, // 105
    ], // Config 1 + F
    [
        () => 108, // 50
        () => 113, // 55
        () => 118, // 60
        () => 122, // 65
        () => 128, // 70
        () => 132, // 75
        () => 136, // 80
        () => 139, // 85
        () => 142, // 90
        () => 147, // 95
        () => 150, // 100
        () => 155, // 105
    ], // Config 2
    [
        () => 104, // 50
        () => 110, // 55
        () => 114, // 60
        () => 119, // 65
        () => 123, // 70
        () => 127, // 75
        () => 131, // 80
        () => 134, // 85
        () => 138, // 90
        () => 142, // 95
        () => 147, // 100
        () => 153, // 105
    ], // Config 3
    [
        () => 103, // 50
        () => 105, // 55
        () => 110, // 60
        () => 114, // 65
        () => 118, // 70
        () => 121, // 75
        () => 125, // 80
        () => 130, // 85
        () => 133, // 90
        () => 137, // 95
        () => 141, // 100
        () => 145, // 105
    ], // Config Full
    [
        () => 127, // 50
        () => 130, // 55
        () => 134, // 60
        () => 140, // 65
        () => 146, // 70
        () => 150, // 75
        () => 155, // 80
        () => 159, // 85
        () => 164, // 90
        () => 167, // 95
        () => 172, // 100
        () => 176, // 105
    ], // Config 1
];

/**
 * F-Speed Table
 * calls function(gross weight (t)) which returns CAS.
 * Indexes: 0 to 11 represent gross weight (t) in 5t steps from 50 to 105.
 * BASED ON A320 FCOM 1 (VS 1+F * 1.18)
 */
const f = [
    () => 131, // 50
    () => 134, // 55
    () => 140, // 60
    () => 145, // 65
    () => 151, // 70
    () => 156, // 75
    () => 162, // 80
    () => 167, // 85
    () => 171, // 90
    () => 176, // 95
    () => 179, // 100
    () => 183, // 105
];

/**
 * S-Speed Table
 * calls function(gross weight (t)) which returns CAS.
 * Indexes: 0 to 11 represent gross weight (t) in 5t steps from 50 to 105.
 * BASED ON A320 FCOM 1 (VS CLEAN * 1.21)
 */
const s = [
    () => 169, // 50
    () => 173, // 55
    () => 180, // 60
    () => 188, // 65
    () => 194, // 70
    () => 201, // 75
    () => 208, // 80
    () => 214, // 85
    () => 221, // 90
    () => 227, // 95
    () => 234, // 100
    () => 242, // 105
];

const vmca = [
    [-2000, 115],
    [0, 114],
    [2000, 114],
    [4000, 113],
    [6000, 112],
    [8000, 109],
    [10000, 106],
    [12000, 103],
    [14100, 99],
    [15100, 97],
];

const vmcg = [ // 1+F, 2, 3 all the same
    [-2000, 117],
    [0, 116],
    [2000, 116],
    [4000, 115],
    [6000, 114],
    [8000, 112],
    [10000, 109],
    [12000, 106],
    [14100, 102],
    [15100, 101],
];

/**
 * Vfe for Flaps/Slats
 * @type {number[]}
 *  * BASED ON A320 FCOM 2
 */
const vfeFS = [
    225, // Config 1 + F
    215, // Config 2
    195, // Config 3
    186, // Config Full
    243 // Config 1
];

const Vmo = 350;
const Mmo = 0.82;

/**
 * Correct input function for cg
 * @param m {number} gross weight (t)
 * @param f {function} function to be called with cg variable
 * @param cg {number} center of gravity
 * @returns {number} cg corrected velocity (CAS)
 */
function correctCg(m, f, cg = SimVar.GetSimVarValue("CG PERCENT", "percent")) {
    return f(m, isNaN(cg) ? 25 : cg);
}

/**
 * Ensure gross weight (mass) is withing valid range
 * @param m {number} mass: gross weight
 * @returns {number} mass: gross weight
 * @private
 */
function _correctMass(m) {
    const min = 39;
    const max = 69;
    const step = 2.5;
    return Math.ceil(((m > max ? max : m) - min) / step);
}

/**
 * Calculate green dot speed
 * Calculation:
 * Gross weight (t) * 2 + 85 when below FL200
 * @returns {number}
 */
function _computeGD(m) {
    return m * 2 + 85;
}

/**
 * Corrects velocity for mach effect by adding 1kt for every 1000ft above FL200
 * @param v {number} velocity in kt (CAS)
 * @param alt {number} altitude in feet (baro)
 * @returns {number} Mach corrected velocity in kt (CAS)
 */
function _compensateForMachEffect(v, alt) {
    return Math.ceil(alt > 20000 ? v + (alt - 20000) / 1000 : v);
}

/**
 * Calculates wind component for ground speed mini
 * @param vw {number} velocity wind (headwind)
 * @returns {number} velocity wind [5, 15]
 */
function _addWindComponent(vw) {
    return Math.max(Math.min(15, vw), 5);
}

/**
 * Get difference between angles
 * @param a {number} angle a
 * @param b {number} angle b
 * @returns {number} angle diff
 * @private
 */
function _getdiffAngle(a, b) {
    return 180 - Math.abs(Math.abs(a - b) - 180);
}

/**
 * Get next flaps index for vfeFS table
 * @param fi {number} current flaps index
 * @returns {number} vfeFS table index
 * @private
 */
function _getVfeNIdx(fi) {
    switch (fi) {
        case 0: return 4;
        case 5: return 1;
        default: return fi;
    }
}

/**
 * Convert degrees Celsius into Kelvin
 * @param T {number} degrees Celsius
 * @returns {number} degrees Kelvin
 */
function _convertCtoK(T) {
    return T + 273.15;
}

/**
 * Convert Mach to True Air Speed
 * @param M {number} Mach
 * @param T {number} Kelvin
 * @returns {number} True Air Speed
 */
function _convertMachToKTas(M, T) {
    return M * 661.4786 * Math.sqrt(T / 288.15);
}

/**
 * Convert TAS to Mach
 * @param Vt {number} TAS
 * @param T {number} Kelvin
 * @returns {number} True Air Speed
 */
function _convertKTASToMach(Vt, T) {
    return Vt / 661.4786 / Math.sqrt(T / 288.15);
}

/**
 * Convert TAS to Calibrated Air Speed
 * @param Vt {number} velocity true air speed
 * @param T {number} current temperature Kelvin
 * @param p {number} current pressure hpa
 * @returns {number} Calibrated Air Speed
 */
function _convertTasToKCas(Vt, T, p) {
    return 1479.1 * Math.sqrt((p / 1013 * ((1 + 1 / (T / 288.15) * (Vt / 1479.1) ** 2) ** 3.5 - 1) + 1) ** (1 / 3.5) - 1);
}

/**
 * Convert KCAS to KTAS
 * @param Vc {number} velocity true air speed
 * @param T {number} current temperature Kelvin
 * @param p {number} current pressure hpa
 * @returns {number} Calibrated Air Speed
 */
function _convertKCasToKTAS(Vc, T, p) {
    return 1479.1 * Math.sqrt(T / 288.15 * ((1 / (p / 1013) * ((1 + 0.2 * (Vc / 661.4786) ** 2) ** 3.5 - 1) + 1) ** (1 / 3.5) - 1));
}

/**
 * Convert Mach to Calibrated Air Speed
 * @param M {number} Mach
 * @param T {number} Kelvin
 * @param p {number} current pressure hpa
 * @returns {number} Calibrated Air Speed
 */
function _convertMachToKCas(M, T, p) {
    return _convertTasToKCas(_convertMachToKTas(M, T), T, p);
}

/**
 * Get correct Vmax for Vmo and Mmo in knots
 * @returns {number} Min(Vmo, Mmo)
 * @private
 */
function _getVmo() {
    return Math.min(Vmo, _convertMachToKCas(Mmo, _convertCtoK(Simplane.getAmbientTemperature()), SimVar.GetSimVarValue("AMBIENT PRESSURE", "millibar")));
}

class NXSpeeds {
    /**
     * Computes Vs, Vls, Vapp, F, S and GD
     * @param m {number} mass: gross weight in t
     * @param fPos {number} flaps position
     * @param gPos {number} landing gear position
     * @param isTo {boolean} whether in takeoff config or not
     * @param wind {number} wind speed
     */
    constructor(m, fPos, gPos, isTo, wind = 0) {
        const cm = _correctMass(m);
        this.vs = vs[fPos][cm](m, gPos);
        this.vls = (isTo ? vlsTo : vls)[fPos][cm](m, gPos);
        this.vapp = this.vls + _addWindComponent(wind);
        this.f = f[cm](m);
        this.s = s[cm](m);
        this.gd = _computeGD(m);
        this.vmax = fPos === 0 ? _getVmo() : vfeFS[fPos - 1];
        this.vfeN = fPos === 4 ? 0 : vfeFS[_getVfeNIdx(fPos)];
    }

    compensateForMachEffect(alt) {
        this.vs = _compensateForMachEffect(this.vs, alt);
        this.vls = _compensateForMachEffect(this.vls, alt);
        this.gd = _compensateForMachEffect(this.gd, alt);
    }
}

class NXSpeedsTo {
    /**
     * Computes TakeOff speeds
     * @param m {number} mass: tow in t
     * @param fPos {number} flaps takeoff config
     * @param alt {number} field altitude
     */
    constructor(m = 60, fPos = 1, alt = 0) {
        this.v2 = Math.floor(to[fPos - 1][_correctMass(m)](m) + (fPos === 2 ? (Math.abs(alt * 0.0002)) : 0));
        this.vr = this.v2 - 4;
        this.v1 = this.v2 - 5;
    }
}

class NXSpeedsApp {
    /**
     * Calculates VLS and Vapp for selected landing configuration
     * @param {number} m Projected landing mass in t
     * @param {boolean} isConf3 CONF3 if true, else FULL
     * @param {number} [wind=0] tower headwind component
     */
    constructor(m, isConf3, wind = 0) {
        const cm = _correctMass(m);
        this.vls = vls[isConf3 ? 3 : 4][cm](m, 1);
        this.vapp = this.vls + NXSpeedsUtils.addWindComponent(wind / 3);
        this.f = f[cm](m);
        this.s = s[cm](m);
        this.gd = _computeGD(m);
        this.valid = true;
    }
}

class NXSpeedsUtils {
    /**
     * Calculates wind component for ground speed mini
     * @param vw {number} velocity wind (1/3 steady headwind)
     * @returns {number} velocity wind [5, 15]
     */
    static addWindComponent(vw = (SimVar.GetSimVarValue("AIRCRAFT WIND Z", "knots") * -1) / 3) {
        return _addWindComponent(vw);
    }

    /**
     * Calculates headwind component
     * @param v {number} velocity wind
     * @param a {number} angle: a
     * @param b {number} angle: b
     * @returns {number} velocity headwind
     */
    static getHeadwind(v, a, b) {
        return v * Math.cos(_getdiffAngle(a, b) * (Math.PI / 180));
    }

    /**
     * 1/3 * (current headwind - tower headwind)
     * @param vTwr {number} velocity tower headwind
     * @param vCur {number} velocity current headwind
     * @returns {number} head wind diff
     */
    static getHeadWindDiff(vTwr, vCur = SimVar.GetSimVarValue("AIRCRAFT WIND Z", "knots") * -1) {
        return Math.round(1 / 3 * (vCur - vTwr));
    }

    /**
     * Returns Vtarget limited by Vapp and VFE next
     * @param vapp {number} Vapp
     * @param windDiff {number} ground speed mini
     * @returns {number}
     */
    static getVtargetGSMini(vapp, windDiff) {
        return Math.max(vapp, Math.min(Math.round(vapp + windDiff), Math.round(
            SimVar.GetSimVarValue("L:A32NX_FLAPS_HANDLE_INDEX", "Number") === 4 ? SimVar.GetSimVarValue("L:A32NX_SPEEDS_VMAX", "Number") - 5 : SimVar.GetSimVarValue("L:A32NX_SPEEDS_VFEN", "Number")
        )));
    }

    static convertKCasToMach(
        Vc,
        T = _convertCtoK(Simplane.getAmbientTemperature()),
        p = SimVar.GetSimVarValue("AMBIENT PRESSURE", "millibar")
    ) {
        return _convertKTASToMach(_convertKCasToKTAS(Vc, T, p), T);
    }

    /** @private */
    static interpolateTable(table, alt) {
        if (alt <= table[0][0]) {
            return vmca[0][1];
        }
        if (alt >= table[table.length - 1][0]) {
            table[table.length - 1][1];
        }
        for (let i = 0; i < table.length - 1; i++) {
            if (alt >= table[i][0] && alt <= table[i + 1][0]) {
                const d = (alt - table[i][0]) / (table[i + 1][0] - table[i][0]);
                return Avionics.Utils.lerpAngle(table[i][1], table[i + 1][1], d);
            }
        }
    }

    /**
     * Get VMCA (minimum airborne control speed) for a given altitude
     * @param {number} altitude Altitude in feet
     * @returns VMCA in knots
     */
    static getVmca(altitude) {
        return this.interpolateTable(vmca, altitude);
    }

    /**
     * Get VMCG (minimum ground control speed) for a given altitude
     * @param {number} altitude Altitude in feet
     * @returns VMCG in knots
     */
    static getVmcg(altitude) {
        return this.interpolateTable(vmcg, altitude);
    }

    /**
     * Get Vs1g for the given config
     *
     * @param {number} mass mass of the aircraft in tons
     * @param {number} conf 0 - Clean config, 1 - Config 1 + F, 2 - Config 2, 3 - Config 3, 4 - Config Full, 5 - Config 1.
     * @param {boolean} gearDown true if the gear is down
     */
    static getVs1g(mass, conf, gearDown) {
        return vs[conf][_correctMass(mass)](mass, gearDown ? 1 : 0);
    }
}
