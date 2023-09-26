/**
 * TO V2 speed table
 * calls function(gross weight (t)) which returns CAS.
 * Indexes: 0 - Config 1 + F, 1 - Config 2, 2 - Config 3.
 * Sub-Indexes: 0 to 16 represent gross weight (t) in 2.5t steps from 40 to 77.5
 */
const to = [
    [
        () => 125, //40
        () => 125, //42.5
        () => 127, //45
        () => 129, //47.5
        () => 131, //50
        () => 134, //52.5
        () => 137, //55
        () => 140, //57.5
        () => 143, //60
        () => 146, //62.5
        () => 148, //65
        () => 151, //67.5
        () => 154, //70
        () => 157, //72.5
        () => 160, //75
        () => 162 //77.5
    ], // Conf 1 + F
    [
        () => 122, //40
        () => 122, //42.5
        () => 124, //45
        () => 126, //47.5
        () => 128, //50
        () => 131, //52.5
        () => 133, //55
        () => 136, //57.5
        () => 139, //60
        () => 142, //62.5
        () => 144, //65
        () => 147, //67.5
        () => 150, //70
        () => 153, //72.5
        () => 155, //75
        () => 158 //77.5
    ], // Conf 2
    [
        () => 119, //40
        () => 119, //42.5
        () => 120, //45
        () => 122, //47.5
        () => 124, //50
        () => 127, //52.5
        () => 129, //55
        () => 132, //57.5
        () => 134, //60
        () => 137, //62.5
        () => 139, //65
        () => 142, //67.5
        () => 145, //70
        () => 148, //72.5
        () => 150, //75
        () => 153 //77.5
    ] // Conf 3
];

/**
 * Stall speed table
 * calls function(gross weight (t), landing gear) which returns CAS.
 * Indexes: 0 - Clean config, 1 - Config 1 + F, 2 - Config 2, 3 - Config 3, 4 - Config Full, 5 - Config 1.
 * Sub-Indexes: 0 to 16 represent gross weight (t) in 2.5t steps from 40 to 77.5
 */
const vs = [
    [
        () => 125, //40
        () => 129, //42.5
        () => 132, //45
        () => 136, //47.5
        () => 139, //50
        () => 142, //52.5
        () => 145, //55
        () => 147, //57.5
        () => 150, //60
        () => 152, //62.5
        () => 155, //65
        () => 158, //67.5
        () => 160, //70
        () => 163, //72.5
        () => 166, //75
        () => 168 //77.5
    ], // Clean Conf
    [
        () => 94, //40
        () => 96, //42.5
        () => 99, //45
        () => 101, //47.5
        () => 103, //50
        () => 106, //52.5
        () => 108, //55
        () => 110, //57.5
        () => 112, //60
        () => 114, //62.5
        () => 116, //65
        () => 118, //67.5
        () => 120, //70
        () => 122, //72.5
        () => 124, //75
        () => 126 //77.5
    ], // Conf 1 + F
    [
        () => 90, //40
        () => 92, //42.5
        () => 95, //45
        () => 97, //47.5
        () => 99, //50
        () => 101, //52.5
        () => 104, //55
        () => 105, //57.5
        () => 107, //60
        () => 109, //62.5
        () => 111, //65
        () => 113, //67.5
        () => 115, //70
        () => 117, //72.5
        () => 119, //75
        () => 121 //77.5
    ], // Conf 2
    [
        () => 88, //40
        () => 90, //42.5
        () => 93, //45
        () => 95, //47.5
        () => 97, //50
        () => 99, //52.5
        () => 101, //55
        () => 103, //57.5
        () => 105, //60
        () => 107, //62.5
        () => 109, //65
        () => 111, //67.5
        () => 113, //70
        () => 115, //72.5
        () => 116, //75
        () => 118 //77.5
    ], // Conf 3
    [
        () => 84, //40
        () => 86, //42.5
        () => 89, //45
        () => 91, //47.5
        () => 93, //50
        () => 95, //52.5
        () => 97, //55
        () => 99, //57.5
        () => 100, //60
        () => 102, //62.5
        () => 104, //65
        () => 106, //67.5
        () => 108, //70
        () => 109, //72.5
        () => 111, //75
        () => 113 //77.5
    ], // Conf Full
    [
        () => 103, //40
        () => 105, //42.5
        () => 108, //45
        () => 111, //47.5
        () => 113, //50
        () => 116, //52.5
        () => 118, //55
        () => 121, //57.5
        () => 123, //60
        () => 125, //62.5
        () => 127, //65
        () => 129, //67.5
        () => 132, //70
        () => 134, //72.5
        () => 136, //75
        () => 138 //77.5
    ] // Conf 1
];

/**
 * Lowest selectable Speed Table
 * calls function(gross weigh (t), landing gear) which returns CAS, automatically compensates for cg.
 * Indexes: 0 - Clean config, 1 - Config 1 + F, 2 - Config 2, 3 - Config 3, 4 - Config Full, 5 - Config 1.
 * Sub-Indexes: 0 to 16 represent gross weight (t) in 2.5t steps from 40 to 77.5
 */
const vls = [
    [
        () => 159,
        (m) => 159 + 1.8 * (m - 40),
        (m) => 168 + 1.8 * (m - 45),
        (m) => 177 + 1.8 * (m - 50),
        (m) => 186 + 1.2 * (m - 55),
        (m) => 192 + 1.2 * (m - 60),
        (m) => 198 + 1.6 * (m - 65),
        (m) => 206 + 1.2 * (m - 70),
        (m) => 212 + 1.6 * (m - 75),
        () => 220
    ], // Clean Config
    [
        () => 114,
        (m) => 114 + 1.4 * (m - 40),
        (m) => 121 + 1.2 * (m - 45),
        (m) => 127 + 1.2 * (m - 50),
        (m) => 133 + m - 55,
        (m) => 138 + 1.2 * (m - 60),
        (m) => 144 + m - 65,
        (m) => 149 + m - 70,
        (m) => 154 + 1.2 * (m - 75),
        () => 160
    ], // Config 1 + F
    [
        () => 110,
        (m) => 110 + 1.8 * (m - 40),
        (m) => 119 + 1.2 * (m - 45),
        (m) => 125 + 1.2 * (m - 50),
        (m) => 131 + 1.2 * (m - 55),
        (m) => 137 + m - 60,
        (m) => 142 + .6 * (m - 65),
        (m) => 145 + .8 * (m - 70),
        (m) => 149 + m - 75,
        () => 154
    ], // Config 2
    [
        (_, ldg) => 117 - ldg,
        (m, ldg) => correctCg(m, (m, cg) => cg < 25 ? 117 + .4 * (m - 40) : 117) - ldg,
        (m, ldg) => correctCg(m, (m, cg) => cg < 25 ? 119 + 1.2 * (m - 45) : 117 + 1.4 * (m - 45)) - ldg,
        (m, ldg) => correctCg(m, (m, cg) => cg < 25 ? 125 + 1.2 * (m - 50) : 124 + 1.2 * (m - 50)) - ldg,
        (m, ldg) => correctCg(m, (m, cg) => cg < 25 ? 131 + 1.2 * (m - 55) : 130 + m - 55) - ldg,
        (m, ldg) => correctCg(m, (m, cg) => cg < 25 ? 137 + m - 60 : 135 + 1.2 * (m - 60)) - ldg,
        (m, ldg) => correctCg(m, (m, cg) => (cg < 25 ? 142 : 141) + m - 65) - ldg,
        (m, ldg) => correctCg(m, (m, cg) => (cg < 25 ? 147 : 146) + m - 70) - ldg,
        (m, ldg) => correctCg(m, (m, cg) => cg < 25 ? 152 + .8 * (m - 75) : 151 + m - 65) - ldg,
        (_, ldg) => 156 - ldg
    ], // Config 3
    [
        () => 116,
        () => 116,
        () => 116,
        (m) => 116 + correctCg(m, (m, cg) => (cg < 25 ? .8 : .6) * (m - 50)),
        (m) => correctCg(m, (m, cg) => (cg < 25 ? 120 : 119) + m - 55),
        (m) => correctCg(m, (m, cg) => (cg < 25 ? 125 : 124) + m - 60),
        (m) => correctCg(m, (m, cg) => (cg < 25 ? 130 : 129) + m - 65),
        (m) => correctCg(m, (m, cg) => cg < 25 ? 135 + .8 * (m - 70) : 134 + m - 70),
        (m) => 139 + .8 * (m - 75),
        () => 143
    ], // Config Full
    [
        () => 125,
        (m) => 125 + 1.4 * (m - 40),
        (m) => 132 + 1.2 * (m - 45),
        (m) => 138 + 1.2 * (m - 50),
        (m) => 144 + 1.4 * (m - 55),
        (m) => 151 + m - 60,
        (m) => 156 + 1.2 * (m - 65),
        (m) => 162 + 1.4 * (m - 70),
        (m) => 169 + .8 * (m - 75),
        () => 173
    ] // Config 1
];

/**
 * Lowest selectable Speed Table for TakeOff ONLY
 * calls function(gross weight (t)) which returns CAS.
 * Indexes: 0 - Clean config, 1 - Config 1 + F, 2 - Config 2, 3 - Config 3, 4 - Config Full, 5 - Config 1.
 * Sub-Indexes: 0 to 16 represent gross weight (t) in 2.5t steps from 40 to 77.5
 */
const vlsTo = [
    vls[0], // Clean Config
    [
        () => 105,
        (m) => 105 + 1.2 * (m - 40),
        (m) => 111 + m - 45,
        (m) => 116 + 1.2 * (m - 50),
        (m) => 122 + m - 55,
        (m) => 127 + m - 60,
        (m) => 132 + m - 65,
        (m) => 137 + .8 * (m - 70),
        (m) => 141 + 1.2 * (m - 75),
        () => 147
    ], // Config 1 + F
    [
        (_) => 101,
        (m) => 101 + 1.4 * (m - 40),
        (m) => 108 + 1.2 * (m - 45),
        (m) => 114 + m - 50,
        (m) => 119 + 1.2 * (m - 55),
        (m) => 125 + m - 60,
        (m) => 130 + .4 * (m - 65),
        (m) => 132 + .8 * (m - 70),
        (m) => 136 + .8 * (m - 75),
        () => 140
    ], // Config 2
    [
        () => 101,
        (m) => 101 + m - 40,
        (m) => 106 + 1.2 * (m - 45),
        (m) => 112 + .8 * (m - 50),
        (m) => 116 + 1.2 * (m - 55),
        (m) => 122 + m - 60,
        (m) => 127 + m - 65,
        (m) => 132 + .8 * (m - 70),
        (m) => 136 + .8 * (m - 75),
        () => 140
    ], // Config 3
    vls[4], // Config Full
    vls[5] // Config 1
];

/**
 * F-Speed Table
 * calls function(gross weight (t)) which returns CAS.
 * Indexes: 0 to 9 represent gross weight (t) in 5t steps from 40 to 80.
 */
const f = [
    () => 118, //40
    () => 122, //42.5
    () => 125, //45
    () => 128, //47.5
    () => 131, //50
    () => 134, //52.5
    () => 137, //55
    () => 140, //57.5
    () => 142, //60
    () => 145, //62.5
    () => 148, //65
    () => 151, //67.5
    () => 153, //70
    () => 156, //72.5
    () => 158, //75
    () => 161 //77.5
];

/**
 * S-Speed Table
 * calls function(gross weight (t)) which returns CAS.
 * Sub-Indexes: 0 to 16 represent gross weight (t) in 2.5t steps from 40 to 77.5
 */
const s = [
    () => 155, //40
    () => 159, //42.5
    () => 163, //45
    () => 167, //47.5
    () => 171, //50
    () => 175, //52.5
    () => 179, //55
    () => 183, //57.5
    () => 186, //60
    () => 190, //62.5
    () => 193, //65
    () => 197, //67.5
    () => 200, //70
    () => 203, //72.5
    () => 206, //75
    () => 210 //77.5
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
 */
const vfeFS = [
    215, // Config 1 + F
    200, // Config 2
    185, // Config 3
    177, // Config Full
    230 // Config 1
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
    return f(m, isNaN(cg) ? 24 : cg);
}

/**
 * Ensure gross weight (mass) is withing valid range
 * @param m {number} mass: gross weight
 * @returns {number} mass: gross weight
 * @private
 */
function _correctMass(m) {
    const min = 40;
    const max = 77.5;
    const step = 2.5;
    return Math.ceil(((m > max ? max : m) - min) / step);
}

/**
 * Ensure gross weight (mass) is withing valid range (with 5t step for Vls)
 * @param m {number} mass: gross weight
 * @returns {number} mass: gross weight
 * @private
 */
function _correctMass2(m) {
    const min = 40;
    const max = 80;
    const step = 5;
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
        const cm2 = _correctMass2(m);
        this.vls = (isTo ? vlsTo : vls)[fPos][cm2](m, gPos);
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
        const cm2 = _correctMass2(m);
        this.vls = vls[isConf3 ? 3 : 4][cm2](m, 1);
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
