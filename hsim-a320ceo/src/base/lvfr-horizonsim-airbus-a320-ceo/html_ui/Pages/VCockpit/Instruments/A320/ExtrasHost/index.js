/**
 * Valid type arguments for Set/GetSimVarValue
 */
var SimVarValueType;
(function (SimVarValueType) {
    SimVarValueType["Number"] = "number";
    SimVarValueType["Percent"] = "percent";
    SimVarValueType["Degree"] = "degrees";
    SimVarValueType["Knots"] = "knots";
    SimVarValueType["Feet"] = "feet";
    SimVarValueType["Meters"] = "meters";
    SimVarValueType["FPM"] = "feet per minute";
    SimVarValueType["Radians"] = "radians";
    SimVarValueType["InHG"] = "inches of mercury";
    SimVarValueType["MB"] = "Millibars";
    SimVarValueType["Bool"] = "bool";
    SimVarValueType["Celsius"] = "celsius";
    SimVarValueType["MHz"] = "MHz";
    SimVarValueType["KHz"] = "KHz";
    SimVarValueType["NM"] = "nautical mile";
    SimVarValueType["String"] = "string";
    SimVarValueType["RPM"] = "Rpm";
    SimVarValueType["PPH"] = "Pounds per hour";
    SimVarValueType["GPH"] = "gph";
    SimVarValueType["Farenheit"] = "farenheit";
    SimVarValueType["PSI"] = "psi";
    SimVarValueType["GAL"] = "gallons";
    SimVarValueType["LBS"] = "pounds";
    SimVarValueType["Hours"] = "Hours";
    SimVarValueType["Volts"] = "Volts";
    SimVarValueType["Amps"] = "Amperes";
    SimVarValueType["Seconds"] = "seconds";
    SimVarValueType["Enum"] = "enum";
    SimVarValueType["LLA"] = "latlonalt";
    SimVarValueType["MetersPerSecond"] = "meters per second";
    SimVarValueType["Mach"] = "mach";
    SimVarValueType["Pounds"] = "pounds";
    SimVarValueType["SlugsPerCubicFoot"] = "slug per cubic foot";
})(SimVarValueType || (SimVarValueType = {}));
const latlonaltRegEx = new RegExp(/latlonalt/i);
const latlonaltpbhRegex = new RegExp(/latlonaltpbh/i);
const pbhRegex = new RegExp(/pbh/i);
const pid_structRegex = new RegExp(/pid_struct/i);
const xyzRegex = new RegExp(/xyz/i);
const stringRegex = new RegExp(/string/i);
const boolRegex = new RegExp(/boolean|bool/i);
const numberRegex = new RegExp(/number/i);
const defaultSource = '';
SimVar.GetSimVarValue = (name, unit, dataSource = defaultSource) => {
    try {
        if (simvar) {
            let output;
            const registeredID = SimVar.GetRegisteredId(name, unit, dataSource);
            if (registeredID >= 0) {
                if (numberRegex.test(unit)) {
                    output = simvar.getValueReg(registeredID);
                }
                else if (stringRegex.test(unit)) {
                    output = simvar.getValueReg_String(registeredID);
                }
                else if (latlonaltRegEx.test(unit)) {
                    output = new LatLongAlt(simvar.getValue_LatLongAlt(name, dataSource));
                }
                else if (latlonaltpbhRegex.test(unit)) {
                    output = new LatLongAltPBH(simvar.getValue_LatLongAltPBH(name, dataSource));
                }
                else if (pbhRegex.test(unit)) {
                    output = new PitchBankHeading(simvar.getValue_PBH(name, dataSource));
                }
                else if (pid_structRegex.test(unit)) {
                    output = new PID_STRUCT(simvar.getValue_PID_STRUCT(name, dataSource));
                }
                else if (xyzRegex.test(unit)) {
                    output = new XYZ(simvar.getValue_XYZ(name, dataSource));
                }
                else {
                    output = simvar.getValueReg(registeredID);
                }
            }
            return output;
        }
        else {
            console.warn('SimVar handler is not defined (' + name + ')');
        }
    }
    catch (error) {
        console.warn('ERROR ', error, ' GetSimVarValue ' + name + ' unit : ' + unit);
        return null;
    }
    return null;
};
SimVar.SetSimVarValue = (name, unit, value, dataSource = defaultSource) => {
    if (value == undefined) {
        console.warn(name + ' : Trying to set a null value');
        return Promise.resolve();
    }
    try {
        if (simvar) {
            const regID = SimVar.GetRegisteredId(name, unit, dataSource);
            if (regID >= 0) {
                if (stringRegex.test(unit)) {
                    return Coherent.call('setValueReg_String', regID, value);
                }
                else if (boolRegex.test(unit)) {
                    return Coherent.call('setValueReg_Bool', regID, !!value);
                }
                else if (numberRegex.test(unit)) {
                    return Coherent.call('setValueReg_Number', regID, value);
                }
                else if (latlonaltRegEx.test(unit)) {
                    return Coherent.call('setValue_LatLongAlt', name, value, dataSource);
                }
                else if (latlonaltpbhRegex.test(unit)) {
                    return Coherent.call('setValue_LatLongAltPBH', name, value, dataSource);
                }
                else if (pbhRegex.test(unit)) {
                    return Coherent.call('setValue_PBH', name, value, dataSource);
                }
                else if (pid_structRegex.test(unit)) {
                    return Coherent.call('setValue_PID_STRUCT', name, value, dataSource);
                }
                else if (xyzRegex.test(unit)) {
                    return Coherent.call('setValue_XYZ', name, value, dataSource);
                }
                else {
                    return Coherent.call('setValueReg_Number', regID, value);
                }
            }
        }
        else {
            console.warn('SimVar handler is not defined');
        }
    }
    catch (error) {
        console.warn('error SetSimVarValue ' + error);
    }
    return Promise.resolve();
};

/**
 * A number with an associated unit. Each NumberUnit is created with a reference unit type,
 * which cannot be changed after instantiation. The reference unit type determines how the
 * value of the NumberUnit is internally represented. Each NumberUnit also maintains an
 * active unit type, which can be dynamically changed at any time.
 */
class NumberUnit {
    /**
     * Constructor.
     * @param number - the initial numeric value of the new NumberUnit.
     * @param unit - the unit type of the new NumberUnit.
     */
    constructor(number, unit) {
        this._number = number;
        this._unit = unit;
        this.readonly = new NumberUnitReadOnly(this);
    }
    /**
     * Gets this NumberUnit's numeric value.
     * @returns This NumberUnit's numeric value.
     */
    get number() {
        return this._number;
    }
    /**
     * Gets this NumberUnit's unit type.
     * @returns This NumberUnit's unit type.
     */
    get unit() {
        return this._unit;
    }
    /**
     * Converts a value to a numeric value with this NumberUnit's unit type.
     * @param value - the value.
     * @param unit - the unit type of the new value. Defaults to this NumberUnit's unit type. This argument is ignored if
     * value is a NumberUnit.
     * @returns the numeric of the value with this NumberUnit's unit type.
     */
    toNumberOfThisUnit(value, unit) {
        if ((typeof value !== 'number') && this.unit.canConvert(value.unit)) {
            return this.unit.convertFrom(value.number, value.unit);
        }
        if (typeof value === 'number' && (!unit || this.unit.canConvert(unit))) {
            return unit ? this.unit.convertFrom(value, unit) : value;
        }
        return undefined;
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    set(arg1, arg2) {
        const converted = this.toNumberOfThisUnit(arg1, arg2);
        if (converted !== undefined) {
            this._number = converted;
            return this;
        }
        throw new Error('Invalid unit conversion attempted.');
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    add(arg1, arg2, arg3) {
        const isArg2NumberUnit = arg2 instanceof NumberUnit;
        const converted = this.toNumberOfThisUnit(arg1, isArg2NumberUnit ? undefined : arg2);
        if (converted !== undefined) {
            let out = isArg2NumberUnit ? arg2 : arg3;
            if (out) {
                out.set(this.number + converted, this.unit);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-this-alias
                out = this;
                this._number += converted;
            }
            return out;
        }
        throw new Error('Invalid unit conversion attempted.');
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    subtract(arg1, arg2, arg3) {
        const isArg2NumberUnit = arg2 instanceof NumberUnit;
        const converted = this.toNumberOfThisUnit(arg1, isArg2NumberUnit ? undefined : arg2);
        if (converted !== undefined) {
            let out = isArg2NumberUnit ? arg2 : arg3;
            if (out) {
                out.set(this.number - converted, this.unit);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-this-alias
                out = this;
                this._number -= converted;
            }
            return out;
        }
        throw new Error('Invalid unit conversion attempted.');
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    scale(factor, out) {
        if (out) {
            return out.set(this.number * factor, this.unit);
        }
        else {
            this._number *= factor;
            return this;
        }
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    ratio(value, unit) {
        const converted = this.toNumberOfThisUnit(value, unit);
        if (converted) {
            return this.number / converted;
        }
        throw new Error('Invalid unit conversion attempted.');
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    abs(out) {
        if (out) {
            return out.set(Math.abs(this.number), this.unit);
        }
        else {
            this._number = Math.abs(this._number);
            return this;
        }
    }
    /**
     * Returns the numeric value of this NumberUnit after conversion to a specified unit.
     * @param unit The unit to which to convert.
     * @returns The converted numeric value.
     * @throws Error if this NumberUnit's unit type cannot be converted to the specified unit.
     */
    asUnit(unit) {
        return this.unit.convertTo(this.number, unit);
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    compare(value, unit) {
        const converted = this.toNumberOfThisUnit(value, unit);
        if (converted === undefined) {
            throw new Error('Invalid unit conversion attempted.');
        }
        const diff = this.number - converted;
        if (Math.abs(diff) < 1e-14) {
            return 0;
        }
        return Math.sign(diff);
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    equals(value, unit) {
        const converted = this.toNumberOfThisUnit(value, unit);
        if (converted === undefined) {
            return false;
        }
        if (isNaN(converted) && this.isNaN()) {
            return true;
        }
        const diff = this.number - converted;
        return !isNaN(diff) && Math.abs(diff) < 1e-14;
    }
    /**
     * Checks whether this NumberUnit has a numeric value of NaN.
     * @returns Whether this NumberUnit has a numeric value of NaN.
     */
    isNaN() {
        return isNaN(this.number);
    }
    /**
     * Copies this NumberUnit.
     * @returns A copy of this NumberUnit.
     */
    copy() {
        return new NumberUnit(this.number, this.unit);
    }
}
/**
 * A read-only interface for a WT_NumberUnit.
 */
class NumberUnitReadOnly {
    /**
     * Constructor.
     * @param source - the source of the new read-only NumberUnit.
     */
    constructor(source) {
        this.source = source;
    }
    /**
     * Gets this NumberUnit's numeric value.
     * @returns This NumberUnit's numeric value.
     */
    get number() {
        return this.source.number;
    }
    /**
     * Gets this NumberUnit's unit type.
     * @returns This NumberUnit's unit type.
     */
    get unit() {
        return this.source.unit;
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    add(arg1, arg2, arg3) {
        const isArg2NumberUnit = arg2 instanceof NumberUnit;
        const out = (isArg2NumberUnit ? arg2 : arg3);
        if (typeof arg1 === 'number') {
            return this.source.add(arg1, arg2, out);
        }
        else {
            return this.source.add(arg1, out);
        }
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    subtract(arg1, arg2, arg3) {
        const isArg2NumberUnit = arg2 instanceof NumberUnit;
        const out = (isArg2NumberUnit ? arg2 : arg3);
        if (typeof arg1 === 'number') {
            return this.source.subtract(arg1, arg2, out);
        }
        else {
            return this.source.subtract(arg1, out);
        }
    }
    /**
     * Scales this NumberUnit by a unit-less factor and returns the result.
     * @param factor The factor by which to scale.
     * @param out The NumberUnit to which to write the result.
     * @returns The scaled value.
     */
    scale(factor, out) {
        return this.source.scale(factor, out);
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    ratio(arg1, arg2) {
        if (typeof arg1 === 'number') {
            return this.source.ratio(arg1, arg2);
        }
        else {
            return this.source.ratio(arg1);
        }
    }
    /**
     * Calculates the absolute value of this NumberUnit and returns the result.
     * @param out The NumberUnit to which to write the result.
     * @returns The absolute value.
     */
    abs(out) {
        return this.source.abs(out);
    }
    /**
     * Returns the numeric value of this NumberUnit after conversion to a specified unit.
     * @param unit The unit to which to convert.
     * @returns The converted numeric value.
     * @throws Error if this NumberUnit's unit type cannot be converted to the specified unit.
     */
    asUnit(unit) {
        return this.source.asUnit(unit);
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    compare(arg1, arg2) {
        if (typeof arg1 === 'number') {
            return this.source.compare(arg1, arg2);
        }
        else {
            return this.source.compare(arg1);
        }
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    equals(arg1, arg2) {
        if (typeof arg1 === 'number') {
            return this.source.equals(arg1, arg2);
        }
        else {
            return this.source.equals(arg1);
        }
    }
    /**
     * Checks whether this NumberUnit has a numeric value of NaN.
     * @returns Whether this NumberUnit has a numeric value of NaN.
     */
    isNaN() {
        return this.source.isNaN();
    }
    /**
     * Copies this NumberUnit.
     * @returns A copy of this NumberUnit.
     */
    copy() {
        return this.source.copy();
    }
}
/**
 * A unit of measurement.
 */
class AbstractUnit {
    /**
     * Constructor.
     * @param name The name of this unit.
     */
    constructor(name) {
        this.name = name;
    }
    /** @inheritdoc */
    canConvert(otherUnit) {
        return this.family === otherUnit.family;
    }
    /** @inheritdoc */
    createNumber(value) {
        return new NumberUnit(value, this);
    }
    /** @inheritdoc */
    equals(other) {
        return this.family === other.family && this.name === other.name;
    }
}
/**
 * A unit that can be converted to another unit of the same type via a fixed linear transformation.
 */
class SimpleUnit extends AbstractUnit {
    /**
     * Constructor.
     * @param family The family to which this unit belongs.
     * @param name The name of this unit.
     * @param scaleFactor The relative linear scale of the new unit compared to the standard unit of the same family.
     * @param zeroOffset The zero offset of the new unit compared to the standard unit of the same family.
     */
    constructor(family, name, scaleFactor, zeroOffset = 0) {
        super(name);
        this.family = family;
        this.scaleFactor = scaleFactor;
        this.zeroOffset = zeroOffset;
    }
    /** @inheritdoc */
    canConvert(otherUnit) {
        return otherUnit instanceof SimpleUnit && super.canConvert(otherUnit);
    }
    /** @inheritdoc */
    convertTo(value, toUnit) {
        if (!this.canConvert(toUnit)) {
            throw new Error(`Invalid conversion from ${this.name} to ${toUnit.name}.`);
        }
        return (value + this.zeroOffset) * (this.scaleFactor / toUnit.scaleFactor) - toUnit.zeroOffset;
    }
    /** @inheritdoc */
    convertFrom(value, fromUnit) {
        if (!this.canConvert(fromUnit)) {
            throw new Error(`Invalid conversion from ${fromUnit.name} to ${this.name}.`);
        }
        return (value + fromUnit.zeroOffset) * (fromUnit.scaleFactor / this.scaleFactor) - this.zeroOffset;
    }
}
/**
 * A unit of measure composed of the multiplicative combination of multiple elementary units.
 */
class CompoundUnit extends AbstractUnit {
    /**
     * Constructor.
     * @param family The family to which this unit belongs.
     * @param numerator An array of CompoundableUnits containing all the units in the numerator of the compound unit.
     * @param denominator An array of CompoundableUnits containing all the units in the denominator of the compound unit.
     * @param name The name of this unit. If not defined, one will be automatically generated.
     */
    constructor(family, numerator, denominator, name) {
        // if not specified, build name from component units.
        if (name === undefined) {
            name = '';
            let i = 0;
            while (i < numerator.length - 1) {
                name += `${numerator[i++].name}-`;
            }
            name += `${numerator[i].name}`;
            if (denominator.length > 0) {
                name += ' per ';
                i = 0;
                while (i < denominator.length - 1) {
                    name += `${denominator[i++].name}-`;
                }
                name += `${denominator[i].name}`;
            }
        }
        super(name);
        this.family = family;
        this.numerator = Array.from(numerator);
        this.denominator = Array.from(denominator);
        this.numerator.sort((a, b) => a.family.localeCompare(b.family));
        this.denominator.sort((a, b) => a.family.localeCompare(b.family));
        this.scaleFactor = this.getScaleFactor();
    }
    /**
     * Gets the scale factor for this unit.
     * @returns the scale factor for this unit.
     */
    getScaleFactor() {
        let factor = 1;
        factor = this.numerator.reduce((prev, curr) => prev * curr.scaleFactor, factor);
        factor = this.denominator.reduce((prev, curr) => prev / curr.scaleFactor, factor);
        return factor;
    }
    /** @inheritdoc */
    canConvert(otherUnit) {
        return otherUnit instanceof CompoundUnit && super.canConvert(otherUnit);
    }
    /** @inheritdoc */
    convertTo(value, toUnit) {
        if (!this.canConvert(toUnit)) {
            throw new Error(`Invalid conversion from ${this.name} to ${toUnit.name}.`);
        }
        return value * (this.scaleFactor / toUnit.scaleFactor);
    }
    /** @inheritdoc */
    convertFrom(value, fromUnit) {
        if (!this.canConvert(fromUnit)) {
            throw new Error(`Invalid conversion from ${fromUnit.name} to ${this.name}.`);
        }
        return value * (fromUnit.scaleFactor / this.scaleFactor);
    }
}
/**
 * Predefined unit families.
 */
var UnitFamily;
(function (UnitFamily) {
    UnitFamily["Distance"] = "distance";
    UnitFamily["Angle"] = "angle";
    UnitFamily["Duration"] = "duration";
    UnitFamily["Weight"] = "weight";
    UnitFamily["Volume"] = "volume";
    UnitFamily["Pressure"] = "pressure";
    UnitFamily["Temperature"] = "temperature";
    UnitFamily["TemperatureDelta"] = "temperature_delta";
    UnitFamily["Speed"] = "speed";
    UnitFamily["Acceleration"] = "acceleration";
    UnitFamily["WeightFlux"] = "weight_flux";
    UnitFamily["VolumeFlux"] = "volume_flux";
})(UnitFamily || (UnitFamily = {}));
/**
 * Predefined unit types.
 */
class UnitType {
}
UnitType.METER = new SimpleUnit(UnitFamily.Distance, 'meter', 1);
UnitType.FOOT = new SimpleUnit(UnitFamily.Distance, 'foot', 0.3048);
UnitType.KILOMETER = new SimpleUnit(UnitFamily.Distance, 'kilometer', 1000);
/** Statute mile. */
UnitType.MILE = new SimpleUnit(UnitFamily.Distance, 'mile', 1609.34);
/** Nautical mile. */
UnitType.NMILE = new SimpleUnit(UnitFamily.Distance, 'nautical mile', 1852);
/** Great-arc radian. The average radius of Earth. */
UnitType.GA_RADIAN = new SimpleUnit(UnitFamily.Distance, 'great arc radian', 6378100);
UnitType.RADIAN = new SimpleUnit(UnitFamily.Angle, 'radian', 1);
UnitType.DEGREE = new SimpleUnit(UnitFamily.Angle, 'degree', Math.PI / 180);
UnitType.ARC_MIN = new SimpleUnit(UnitFamily.Angle, 'minute', Math.PI / 180 / 60);
UnitType.ARC_SEC = new SimpleUnit(UnitFamily.Angle, 'second', Math.PI / 180 / 3600);
UnitType.MILLISECOND = new SimpleUnit(UnitFamily.Duration, 'millisecond', 0.001);
UnitType.SECOND = new SimpleUnit(UnitFamily.Duration, 'second', 1);
UnitType.MINUTE = new SimpleUnit(UnitFamily.Duration, 'minute', 60);
UnitType.HOUR = new SimpleUnit(UnitFamily.Duration, 'hour', 3600);
UnitType.KILOGRAM = new SimpleUnit(UnitFamily.Weight, 'kilogram', 1);
UnitType.POUND = new SimpleUnit(UnitFamily.Weight, 'pound', 0.453592);
UnitType.TON = new SimpleUnit(UnitFamily.Weight, 'ton', 907.185);
UnitType.TONNE = new SimpleUnit(UnitFamily.Weight, 'tonne', 1000);
/** Weight equivalent of one liter of fuel, using the generic conversion 1 gallon = 6.7 pounds. */
UnitType.LITER_FUEL = new SimpleUnit(UnitFamily.Weight, 'liter', 0.80283679);
/** Weight equivalent of one gallon of fuel, using the generic conversion 1 gallon = 6.7 pounds. */
UnitType.GALLON_FUEL = new SimpleUnit(UnitFamily.Weight, 'gallon', 3.0390664);
/** Weight equivalent of one imperial gallon of fuel, using the generic conversion 1 gallon = 6.7 pounds. */
UnitType.IMP_GALLON_FUEL = new SimpleUnit(UnitFamily.Weight, 'imperial gallon', 3.6497683);
UnitType.LITER = new SimpleUnit(UnitFamily.Volume, 'liter', 1);
UnitType.GALLON = new SimpleUnit(UnitFamily.Volume, 'gallon', 3.78541);
/** Hectopascal. */
UnitType.HPA = new SimpleUnit(UnitFamily.Pressure, 'hectopascal', 1);
/** Atmosphere. */
UnitType.ATM = new SimpleUnit(UnitFamily.Pressure, 'atmosphere', 1013.25);
/** Inch of mercury. */
UnitType.IN_HG = new SimpleUnit(UnitFamily.Pressure, 'inch of mercury', 33.8639);
/** Millimeter of mercury. */
UnitType.MM_HG = new SimpleUnit(UnitFamily.Pressure, 'millimeter of mercury', 1.33322);
UnitType.KELVIN = new SimpleUnit(UnitFamily.Temperature, 'kelvin', 1, 0);
UnitType.CELSIUS = new SimpleUnit(UnitFamily.Temperature, '° Celsius', 1, 273.15);
UnitType.FAHRENHEIT = new SimpleUnit(UnitFamily.Temperature, '° Fahrenheit', 5 / 9, 459.67);
UnitType.RANKINE = new SimpleUnit(UnitFamily.Temperature, '° Rankine', 5 / 9, 0);
/** Change in degrees Celsius. */
UnitType.DELTA_CELSIUS = new SimpleUnit(UnitFamily.TemperatureDelta, 'Δ° Celsius', 1);
/** Change in degrees Fahrenheit. */
UnitType.DELTA_FAHRENHEIT = new SimpleUnit(UnitFamily.TemperatureDelta, 'Δ° Fahrenheit', 5 / 9);
UnitType.KNOT = new CompoundUnit(UnitFamily.Speed, [UnitType.NMILE], [UnitType.HOUR], 'knot');
/** Kilometer per hour. */
UnitType.KPH = new CompoundUnit(UnitFamily.Speed, [UnitType.KILOMETER], [UnitType.HOUR]);
/** Miles per hour. */
UnitType.MPH = new CompoundUnit(UnitFamily.Speed, [UnitType.MILE], [UnitType.HOUR]);
/** Meter per minute. */
UnitType.MPM = new CompoundUnit(UnitFamily.Speed, [UnitType.METER], [UnitType.MINUTE]);
/** Meter per second. */
UnitType.MPS = new CompoundUnit(UnitFamily.Speed, [UnitType.METER], [UnitType.SECOND]);
/** Foot per minute. */
UnitType.FPM = new CompoundUnit(UnitFamily.Speed, [UnitType.FOOT], [UnitType.MINUTE]);
/** Foot per second. */
UnitType.FPS = new CompoundUnit(UnitFamily.Speed, [UnitType.FOOT], [UnitType.SECOND]);
/** Meter per minute per second. */
UnitType.MPM_PER_SEC = new CompoundUnit(UnitFamily.Acceleration, [UnitType.METER], [UnitType.MINUTE, UnitType.SECOND]);
/** Meter per second per second. */
UnitType.MPS_PER_SEC = new CompoundUnit(UnitFamily.Acceleration, [UnitType.METER], [UnitType.SECOND, UnitType.SECOND]);
/** Foot per minute per second. */
UnitType.FPM_PER_SEC = new CompoundUnit(UnitFamily.Acceleration, [UnitType.FOOT], [UnitType.MINUTE, UnitType.SECOND]);
/** Foot per second per second. */
UnitType.FPS_PER_SEC = new CompoundUnit(UnitFamily.Acceleration, [UnitType.FOOT], [UnitType.SECOND, UnitType.SECOND]);
/** Average gravitational acceleration on Earth at sea level. */
UnitType.G_ACCEL = new CompoundUnit(UnitFamily.Acceleration, [new SimpleUnit(UnitFamily.Distance, '9.80665 meter', 9.80665)], [UnitType.SECOND, UnitType.SECOND]);
/** Kilogram per hour. */
UnitType.KGH = new CompoundUnit(UnitFamily.WeightFlux, [UnitType.KILOGRAM], [UnitType.HOUR]);
/** Pound per hour. */
UnitType.PPH = new CompoundUnit(UnitFamily.WeightFlux, [UnitType.POUND], [UnitType.HOUR]);
/** Weight equivalent of one liter of fuel per hour, using the generic conversion 1 gallon = 6.7 pounds. */
UnitType.LPH_FUEL = new CompoundUnit(UnitFamily.WeightFlux, [UnitType.LITER_FUEL], [UnitType.HOUR]);
/** Weight equivalent of one gallon of fuel per hour, using the generic conversion 1 gallon = 6.7 pounds. */
UnitType.GPH_FUEL = new CompoundUnit(UnitFamily.WeightFlux, [UnitType.GALLON_FUEL], [UnitType.HOUR]);
/** Weight equivalent of one imperial gallon of fuel per hour, using the generic conversion 1 gallon = 6.7 pounds. */
UnitType.IGPH_FUEL = new CompoundUnit(UnitFamily.WeightFlux, [UnitType.IMP_GALLON_FUEL], [UnitType.HOUR]);

/**
 * A basic event-bus publisher.
 */
class BasePublisher {
    /**
     * Creates an instance of BasePublisher.
     * @param bus The common event bus.
     * @param pacer An optional pacer to control the rate of publishing.
     */
    constructor(bus, pacer = undefined) {
        this.bus = bus;
        this.publisher = this.bus.getPublisher();
        this.publishActive = false;
        this.pacer = pacer;
    }
    /**
     * Start publishing.
     */
    startPublish() {
        this.publishActive = true;
    }
    /**
     * Stop publishing.
     */
    stopPublish() {
        this.publishActive = false;
    }
    /**
     * Tells whether or not the publisher is currently active.
     * @returns True if the publisher is active, false otherwise.
     */
    isPublishing() {
        return this.publishActive;
    }
    /**
     * A callback called when the publisher receives an update cycle.
     */
    onUpdate() {
        return;
    }
    /**
     * Publish a message if publishing is acpive
     * @param topic The topic key to publish to.
     * @param data The data type for chosen topic.
     * @param sync Whether or not the event should be synced to other instruments. Defaults to `false`.
     * @param isCached Whether or not the event should be cached. Defaults to `true`.
     */
    publish(topic, data, sync = false, isCached = true) {
        if (this.publishActive && (!this.pacer || this.pacer.canPublish(topic, data))) {
            this.publisher.pub(topic, data, sync, isCached);
        }
    }
}
/**
 * A base class for publishers that need to handle simvars with built-in
 * support for pacing callbacks.
 */
class SimVarPublisher extends BasePublisher {
    /**
     * Create a SimVarPublisher
     * @param simVarMap A map of simvar event type keys to a SimVarDefinition.
     * @param bus The EventBus to use for publishing.
     * @param pacer An optional pacer to control the rate of publishing.
     */
    constructor(simVarMap, bus, pacer) {
        super(bus, pacer);
        this.resolvedSimVars = new Map();
        this.indexedSimVars = new Map();
        this.subscribed = new Set();
        for (const [topic, entry] of simVarMap) {
            if (entry.indexed) {
                this.indexedSimVars.set(topic, entry);
                this.resolveIndexedSimVar(topic, entry); // resolve indexed topic to its non-suffixed form
            }
            else {
                this.resolvedSimVars.set(topic, entry);
            }
        }
        const handleSubscribedTopic = (topic) => {
            if (this.resolvedSimVars.has(topic)) {
                // If topic matches an already resolved topic -> start publishing.
                this.onTopicSubscribed(topic);
            }
            else {
                // Check if topic matches indexed topic.
                this.tryMatchIndexedSubscribedTopic(topic);
            }
        };
        // Iterate over each subscribed topic on the bus to see if it matches any of our topics. If so, start publishing.
        this.bus.forEachSubscribedTopic(handleSubscribedTopic);
        // Listen to first-time topic subscriptions. If any of them match our topics, start publishing.
        this.bus.getSubscriber().on('event_bus_topic_first_sub').handle(handleSubscribedTopic);
    }
    /**
     * Checks if a subscribed topic matches one of this publisher's indexed topics, and if so resolves and starts
     * publishing the indexed topic.
     * @param topic The subscribed topic to check.
     */
    tryMatchIndexedSubscribedTopic(topic) {
        if (this.indexedSimVars.size === 0) {
            return;
        }
        if (!SimVarPublisher.INDEXED_REGEX.test(topic)) { // Don't generate an array if we don't have to.
            return;
        }
        const match = topic.match(SimVarPublisher.INDEXED_REGEX);
        const [, matchedTopic, index] = match;
        const entry = this.indexedSimVars.get(matchedTopic);
        if (entry) {
            this.onTopicSubscribed(this.resolveIndexedSimVar(matchedTopic, entry, parseInt(index)));
        }
    }
    /**
     * Resolves an indexed topic with an index, generating a version of the topic which is mapped to an indexed simvar.
     * The resolved indexed topic can then be published.
     * @param topic The topic to resolve.
     * @param entry The entry of the topic to resolve.
     * @param index The index with which to resolve the topic. If not defined, the topic will resolve to itself (without
     * a suffix) and will be mapped the index-1 version of its simvar.
     * @returns The resolved indexed topic.
     */
    resolveIndexedSimVar(topic, entry, index) {
        const resolvedTopic = index === undefined ? topic : `${topic}_${index}`;
        if (this.resolvedSimVars.has(resolvedTopic)) {
            return resolvedTopic;
        }
        this.resolvedSimVars.set(resolvedTopic, { name: entry.name.replace('#index#', `${index !== null && index !== void 0 ? index : 1}`), type: entry.type, map: entry.map });
        return resolvedTopic;
    }
    /**
     * Responds to when one of this publisher's topics is subscribed to for the first time.
     * @param topic The topic that was subscribed to.
     */
    onTopicSubscribed(topic) {
        if (this.subscribed.has(topic)) {
            return;
        }
        this.subscribed.add(topic);
        // Immediately publish the current value if publishing is active.
        if (this.publishActive) {
            this.publishTopic(topic);
        }
    }
    /**
     * NOOP - For backwards compatibility.
     * @deprecated
     * @param data Key of the event type in the simVarMap
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    subscribe(data) {
        return;
    }
    /**
     * NOOP - For backwards compatibility.
     * @deprecated
     * @param data Key of the event type in the simVarMap
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    unsubscribe(data) {
        return;
    }
    /**
     * Publish all subscribed data points to the bus.
     */
    onUpdate() {
        for (const topic of this.subscribed.values()) {
            this.publishTopic(topic);
        }
    }
    /**
     * Publishes data to the event bus for a topic.
     * @param topic The topic to publish.
     */
    publishTopic(topic) {
        const value = this.getValue(topic);
        if (value !== undefined) {
            this.publish(topic, value);
        }
    }
    /**
     * Gets the current value for a topic.
     * @param topic A topic.
     * @returns The current value for the specified topic.
     */
    getValue(topic) {
        const entry = this.resolvedSimVars.get(topic);
        if (entry === undefined) {
            return undefined;
        }
        return entry.map === undefined
            ? this.getSimVarValue(entry)
            : entry.map(this.getSimVarValue(entry));
    }
    /**
     * Gets the value of the SimVar
     * @param entry The SimVar definition entry
     * @returns The value of the SimVar
     */
    getSimVarValue(entry) {
        const svValue = SimVar.GetSimVarValue(entry.name, entry.type);
        if (entry.type === SimVarValueType.Bool) {
            return svValue === 1;
        }
        return svValue;
    }
}
SimVarPublisher.INDEXED_REGEX = /(.*)_([1-9]\d*)$/;

/**
 * Utility class for manipulating bit flags.
 */
class BitFlags {
    /**
     * Generates a bit flag with a boolean value of true at a specified index.
     * @param index The index of the flag. Must be between 0 and 32, inclusive.
     * @returns a bit flag.
     * @throws Error if index is out of bounds.
     */
    static createFlag(index) {
        if (index < 0 || index > 32) {
            throw new Error(`Invalid index ${index} for bit flag. Index must be between 0 and 32.`);
        }
        return 1 << index;
    }
    /**
     * Gets the inverse of some bit flags.
     * @param flags The bit flag group containing the flags to invert.
     * @param mask An optional bit mask to use when applying the inverse operation. The operation will only be performed
     * at the indexes where the mask has a value of 1 (true). If a mask is not specified, the operation will be performed
     * at all indexes.
     * @returns the inverse
     */
    static not(flags, mask = ~0) {
        return flags ^ mask;
    }
    /**
     * Gets the union of zero or more bit flags.
     * @param flags A list of bit flags.
     * @returns the union of the bit flags.
     */
    static union(...flags) {
        let result = 0;
        const len = flags.length;
        for (let i = 0; i < len; i++) {
            result |= flags[i];
        }
        return result;
    }
    /**
     * Gets the intersection of zero or more bit flags.
     * @param flags A list of bit flags.
     * @returns the intersection of the bit flags.
     */
    static intersection(...flags) {
        const len = flags.length;
        if (len === 0) {
            return 0;
        }
        let result = flags[0];
        for (let i = 1; i < len; i++) {
            result &= flags[i];
        }
        return result;
    }
    /**
     * Changes a bit flag group by setting values at specific indexes.
     * @param flags The bit flag group to change.
     * @param valuesToSet A bit flag group containing the values to set.
     * @param mask A mask defining the indexes to set. Only indexes at which the mask has a value of `1` (`true`) will
     * be set.
     * @returns The result of changing `flags` using the specified values and indexes.
     */
    static set(flags, valuesToSet, mask) {
        return (flags & ~mask) | (valuesToSet & mask);
    }
    /**
     * Checks if a bit flag group meets at least one condition from a list of conditions.
     * @param flags A bit flag group.
     * @param conditions The conditions to meet, as a bit flag group.
     * @returns whether the bit flag group meets at least one condition.
     */
    static isAny(flags, conditions) {
        return (flags & conditions) !== 0;
    }
    /**
     * Checks if a bit flag group meets all the conditions from a list of conditions.
     * @param flags A bit flag group.
     * @param conditions The conditions to meet, as a bit flag group.
     * @returns whether the bit flag group meets all the conditions.
     */
    static isAll(flags, conditions) {
        return (flags & conditions) === conditions;
    }
    /**
     * Iterates through a bit flag group and executes a callback function once for each flag.
     * @param flags A bit flag group.
     * @param callback A function which will be called once for each flag.
     * @param valueFilter The value on which to filter. If defined, only flags with values equal to the filter will be
     * iterated, otherwise all flags will be iterated regardless of their values.
     * @param startIndex The index of the flag at which to start (inclusive). Defaults to 0.
     * @param endIndex The index of the flag at which to end (exclusive). Defaults to 32.
     */
    static forEach(flags, callback, valueFilter, startIndex, endIndex) {
        startIndex = Utils.Clamp(startIndex !== null && startIndex !== void 0 ? startIndex : (startIndex = 0), 0, 32);
        endIndex = Utils.Clamp(endIndex !== null && endIndex !== void 0 ? endIndex : (endIndex = 32), 0, 32);
        for (let i = startIndex; i < endIndex; i++) {
            const value = (flags & (1 << i)) !== 0;
            if (valueFilter === undefined || valueFilter === value) {
                callback(value, i, flags);
            }
        }
    }
}

/**
 * A {@link Subscription} which executes a handler function every time it receives a notification.
 */
class HandlerSubscription {
    /**
     * Constructor.
     * @param handler This subscription's handler. The handler will be called each time this subscription receives a
     * notification from its source.
     * @param initialNotifyFunc A function which sends initial notifications to this subscription. If not defined, this
     * subscription will not support initial notifications.
     * @param onDestroy A function which is called when this subscription is destroyed.
     */
    constructor(handler, initialNotifyFunc, onDestroy) {
        this.handler = handler;
        this.initialNotifyFunc = initialNotifyFunc;
        this.onDestroy = onDestroy;
        this._isAlive = true;
        this._isPaused = false;
        this.canInitialNotify = initialNotifyFunc !== undefined;
    }
    /** @inheritdoc */
    get isAlive() {
        return this._isAlive;
    }
    /** @inheritdoc */
    get isPaused() {
        return this._isPaused;
    }
    /**
     * Sends an initial notification to this subscription.
     * @throws Error if this subscription is not alive.
     */
    initialNotify() {
        if (!this._isAlive) {
            throw new Error('HandlerSubscription: cannot notify a dead Subscription.');
        }
        this.initialNotifyFunc && this.initialNotifyFunc(this);
    }
    /** @inheritdoc */
    pause() {
        if (!this._isAlive) {
            throw new Error('Subscription: cannot pause a dead Subscription.');
        }
        this._isPaused = true;
        return this;
    }
    /** @inheritdoc */
    resume(initialNotify = false) {
        if (!this._isAlive) {
            throw new Error('Subscription: cannot resume a dead Subscription.');
        }
        if (!this._isPaused) {
            return this;
        }
        this._isPaused = false;
        if (initialNotify) {
            this.initialNotify();
        }
        return this;
    }
    /** @inheritdoc */
    destroy() {
        if (!this._isAlive) {
            return;
        }
        this._isAlive = false;
        this.onDestroy && this.onDestroy(this);
    }
}

/**
 * A pipe from an input subscribable to an output mutable subscribable. Each notification received by the pipe is used
 * to change the state of the output subscribable.
 */
class SubscribablePipe extends HandlerSubscription {
    // eslint-disable-next-line jsdoc/require-jsdoc
    constructor(from, to, arg3, arg4) {
        let handler;
        let onDestroy;
        if (typeof arg4 === 'function') {
            handler = (fromVal) => {
                to.set(arg3(fromVal, to.get()));
            };
            onDestroy = arg4;
        }
        else {
            handler = (fromVal) => {
                to.set(fromVal);
            };
            onDestroy = arg3;
        }
        super(handler, (sub) => { sub.handler(from.get()); }, onDestroy);
    }
}

/**
 * An abstract implementation of a subscribable which allows adding, removing, and notifying subscribers.
 */
class AbstractSubscribable {
    constructor() {
        this.isSubscribable = true;
        this.subs = [];
        this.notifyDepth = 0;
        /** A function which sends initial notifications to subscriptions. */
        this.initialNotifyFunc = this.notifySubscription.bind(this);
        /** A function which responds to when a subscription to this subscribable is destroyed. */
        this.onSubDestroyedFunc = this.onSubDestroyed.bind(this);
    }
    /** @inheritdoc */
    sub(handler, initialNotify = false, paused = false) {
        const sub = new HandlerSubscription(handler, this.initialNotifyFunc, this.onSubDestroyedFunc);
        this.subs.push(sub);
        if (paused) {
            sub.pause();
        }
        else if (initialNotify) {
            sub.initialNotify();
        }
        return sub;
    }
    /** @inheritdoc */
    unsub(handler) {
        const toDestroy = this.subs.find(sub => sub.handler === handler);
        toDestroy === null || toDestroy === void 0 ? void 0 : toDestroy.destroy();
    }
    /**
     * Notifies subscriptions that this subscribable's value has changed.
     */
    notify() {
        let needCleanUpSubs = false;
        this.notifyDepth++;
        const subLen = this.subs.length;
        for (let i = 0; i < subLen; i++) {
            try {
                const sub = this.subs[i];
                if (sub.isAlive && !sub.isPaused) {
                    this.notifySubscription(sub);
                }
                needCleanUpSubs || (needCleanUpSubs = !sub.isAlive);
            }
            catch (error) {
                console.error(`AbstractSubscribable: error in handler: ${error}`);
                if (error instanceof Error) {
                    console.error(error.stack);
                }
            }
        }
        this.notifyDepth--;
        if (needCleanUpSubs && this.notifyDepth === 0) {
            this.subs = this.subs.filter(sub => sub.isAlive);
        }
    }
    /**
     * Notifies a subscription of this subscribable's current state.
     * @param sub The subscription to notify.
     */
    notifySubscription(sub) {
        sub.handler(this.get());
    }
    /**
     * Responds to when a subscription to this subscribable is destroyed.
     * @param sub The destroyed subscription.
     */
    onSubDestroyed(sub) {
        // If we are not in the middle of a notify operation, remove the subscription.
        // Otherwise, do nothing and let the post-notify clean-up code handle it.
        if (this.notifyDepth === 0) {
            this.subs.splice(this.subs.indexOf(sub), 1);
        }
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    map(fn, equalityFunc, mutateFunc, initialVal) {
        return new MappedSubscribableClass(this, fn, equalityFunc !== null && equalityFunc !== void 0 ? equalityFunc : AbstractSubscribable.DEFAULT_EQUALITY_FUNC, mutateFunc, initialVal);
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    pipe(to, arg2, arg3) {
        let sub;
        let paused;
        if (typeof arg2 === 'function') {
            sub = new SubscribablePipe(this, to, arg2, this.onSubDestroyedFunc);
            paused = arg3 !== null && arg3 !== void 0 ? arg3 : false;
        }
        else {
            sub = new SubscribablePipe(this, to, this.onSubDestroyedFunc);
            paused = arg2 !== null && arg2 !== void 0 ? arg2 : false;
        }
        this.subs.push(sub);
        if (paused) {
            sub.pause();
        }
        else {
            sub.initialNotify();
        }
        return sub;
    }
}
/**
 * Checks if two values are equal using the strict equality operator.
 * @param a The first value.
 * @param b The second value.
 * @returns whether a and b are equal.
 */
AbstractSubscribable.DEFAULT_EQUALITY_FUNC = (a, b) => a === b;
/**
 * An implementation of {@link MappedSubscribable}.
 */
class MappedSubscribableClass extends AbstractSubscribable {
    /**
     * Constructor.
     * @param input This subscribable's input.
     * @param mapFunc The function which maps this subject's inputs to a value.
     * @param equalityFunc The function which this subject uses to check for equality between values.
     * @param mutateFunc The function which this subject uses to change its value.
     * @param initialVal The initial value of this subject.
     */
    constructor(input, mapFunc, equalityFunc, mutateFunc, initialVal) {
        super();
        this.input = input;
        this.mapFunc = mapFunc;
        this.equalityFunc = equalityFunc;
        this.isSubscribable = true;
        this._isAlive = true;
        this._isPaused = false;
        if (initialVal && mutateFunc) {
            this.value = initialVal;
            mutateFunc(this.value, this.mapFunc(this.input.get()));
            this.mutateFunc = (newVal) => { mutateFunc(this.value, newVal); };
        }
        else {
            this.value = this.mapFunc(this.input.get());
            this.mutateFunc = (newVal) => { this.value = newVal; };
        }
        this.inputSub = this.input.sub(inputValue => {
            this.updateValue(inputValue);
        }, true);
    }
    /** @inheritdoc */
    get isAlive() {
        return this._isAlive;
    }
    /** @inheritdoc */
    get isPaused() {
        return this._isPaused;
    }
    /**
     * Re-maps this subject's value from its input, and notifies subscribers if this results in a change to the mapped
     * value according to this subject's equality function.
     * @param inputValue The input value.
     */
    updateValue(inputValue) {
        const value = this.mapFunc(inputValue, this.value);
        if (!this.equalityFunc(this.value, value)) {
            this.mutateFunc(value);
            this.notify();
        }
    }
    /** @inheritdoc */
    get() {
        return this.value;
    }
    /** @inheritdoc */
    pause() {
        if (!this._isAlive) {
            throw new Error('MappedSubscribable: cannot pause a dead subscribable');
        }
        if (this._isPaused) {
            return this;
        }
        this.inputSub.pause();
        this._isPaused = true;
        return this;
    }
    /** @inheritdoc */
    resume() {
        if (!this._isAlive) {
            throw new Error('MappedSubscribable: cannot resume a dead subscribable');
        }
        if (!this._isPaused) {
            return this;
        }
        this._isPaused = false;
        this.inputSub.resume(true);
        return this;
    }
    /** @inheritdoc */
    destroy() {
        this._isAlive = false;
        this.inputSub.destroy();
    }
}

/**
 * 2D vector mathematical operations.
 */
class Vec2Math {
    // eslint-disable-next-line jsdoc/require-jsdoc
    static create(x, y) {
        const vec = new Float64Array(2);
        if (x !== undefined && y !== undefined) {
            vec[0] = x;
            vec[1] = y;
        }
        return vec;
    }
    /**
     * Gets the polar angle theta of a vector in radians.
     * @param vec - a vector.
     * @returns the polar angle theta of the vector.
     */
    static theta(vec) {
        return Math.atan2(vec[1], vec[0]);
    }
    /**
     * Sets the components of a vector.
     * @param x - the new x-component.
     * @param y - the new y-component.
     * @param vec - the vector to change.
     * @returns the vector after it has been changed.
     */
    static set(x, y, vec) {
        vec[0] = x;
        vec[1] = y;
        return vec;
    }
    /**
     * Sets the polar components of a vector.
     * @param r - the new length (magnitude).
     * @param theta - the new polar angle theta, in radians.
     * @param vec - the vector to change.
     * @returns the vector after it has been changed.
     */
    static setFromPolar(r, theta, vec) {
        vec[0] = r * Math.cos(theta);
        vec[1] = r * Math.sin(theta);
        return vec;
    }
    /**
     * Add one vector to another.
     * @param v1 The first vector.
     * @param v2 The second vector.
     * @param out The vector to write the results to.
     * @returns the vector sum.
     */
    static add(v1, v2, out) {
        out[0] = v1[0] + v2[0];
        out[1] = v1[1] + v2[1];
        return out;
    }
    /**
     * Subtracts one vector from another.
     * @param v1 The first vector.
     * @param v2 The second vector.
     * @param out The vector to write the results to.
     * @returns the vector difference.
     */
    static sub(v1, v2, out) {
        out[0] = v1[0] - v2[0];
        out[1] = v1[1] - v2[1];
        return out;
    }
    /**
     * Gets the dot product of two vectors.
     * @param v1 The first vector.
     * @param v2 The second vector.
     * @returns The dot product of the vectors.
     */
    static dot(v1, v2) {
        return v1[0] * v2[0] + v1[1] * v2[1];
    }
    /**
     * Multiplies a vector by a scalar.
     * @param v1 The vector to multiply.
     * @param scalar The scalar to apply.
     * @param out The vector to write the results to.
     * @returns The scaled vector.
     */
    static multScalar(v1, scalar, out) {
        out[0] = v1[0] * scalar;
        out[1] = v1[1] * scalar;
        return out;
    }
    /**
     * Gets the magnitude of a vector.
     * @param v1 The vector to get the magnitude for.
     * @returns the vector's magnitude.
     */
    static abs(v1) {
        return Math.hypot(v1[0], v1[1]);
    }
    /**
     * Normalizes the vector to a unit vector.
     * @param v1 The vector to normalize.
     * @param out The vector to write the results to.
     * @returns the normalized vector.
     */
    static normalize(v1, out) {
        const mag = Vec2Math.abs(v1);
        out[0] = v1[0] / mag;
        out[1] = v1[1] / mag;
        return out;
    }
    /**
     * Gets the normal of the supplied vector.
     * @param v1 The vector to get the normal for.
     * @param out The vector to write the results to.
     * @param counterClockwise Whether or not to get the counterclockwise normal.
     * @returns the normal vector.
     */
    static normal(v1, out, counterClockwise = false) {
        const x = v1[0];
        const y = v1[1];
        if (!counterClockwise) {
            out[0] = y;
            out[1] = -x;
        }
        else {
            out[0] = -y;
            out[1] = x;
        }
        return out;
    }
    /**
     * Gets the Euclidean distance between two vectors.
     * @param vec1 The first vector.
     * @param vec2 The second vector.
     * @returns the Euclidean distance between the two vectors.
     */
    static distance(vec1, vec2) {
        return Math.hypot(vec2[0] - vec1[0], vec2[1] - vec1[1]);
    }
    /**
     * Checks if two vectors are equal.
     * @param vec1 The first vector.
     * @param vec2 The second vector.
     * @returns Whether the two vectors are equal.
     */
    static equals(vec1, vec2) {
        return vec1[0] === vec2[0] && vec1[1] === vec2[1];
    }
    /**
     * Copies one vector to another.
     * @param from The vector from which to copy.
     * @param to The vector to which to copy.
     * @returns The changed vector.
     */
    static copy(from, to) {
        return Vec2Math.set(from[0], from[1], to);
    }
    /**
     * Checks if a point is within a polygon.
     * @param polygon The polygon to check against.
     * @param point The point to test.
     * @returns True if the point is within or on the polygon, false otherwise.
     * @throws An error if first and last points in a polygon are not the same.
     */
    static pointWithinPolygon(polygon, point) {
        //Adapted from https://github.com/rowanwins/point-in-polygon-hao
        let k = 0;
        let f = 0;
        let u1 = 0;
        let v1 = 0;
        let u2 = 0;
        let v2 = 0;
        let currentP = null;
        let nextP = null;
        const x = point[0];
        const y = point[1];
        const contourLen = polygon.length - 1;
        currentP = polygon[0];
        if (currentP[0] !== polygon[contourLen][0] &&
            currentP[1] !== polygon[contourLen][1]) {
            throw new Error('First and last coordinates in a ring must be the same');
        }
        u1 = currentP[0] - x;
        v1 = currentP[1] - y;
        for (let i = 0; i < polygon.length - 1; i++) {
            nextP = polygon[i + 1];
            v2 = nextP[1] - y;
            if ((v1 < 0 && v2 < 0) || (v1 > 0 && v2 > 0)) {
                currentP = nextP;
                v1 = v2;
                u1 = currentP[0] - x;
                continue;
            }
            u2 = nextP[0] - point[0];
            if (v2 > 0 && v1 <= 0) {
                f = (u1 * v2) - (u2 * v1);
                if (f > 0) {
                    k = k + 1;
                }
                else if (f === 0) {
                    return undefined;
                }
            }
            else if (v1 > 0 && v2 <= 0) {
                f = (u1 * v2) - (u2 * v1);
                if (f < 0) {
                    k = k + 1;
                }
                else if (f === 0) {
                    return undefined;
                }
            }
            else if (v2 === 0 && v1 < 0) {
                f = (u1 * v2) - (u2 * v1);
                if (f === 0) {
                    return undefined;
                }
            }
            else if (v1 === 0 && v2 < 0) {
                f = u1 * v2 - u2 * v1;
                if (f === 0) {
                    return undefined;
                }
            }
            else if (v1 === 0 && v2 === 0) {
                if (u2 <= 0 && u1 >= 0) {
                    return undefined;
                }
                else if (u1 <= 0 && u2 >= 0) {
                    return undefined;
                }
            }
            currentP = nextP;
            v1 = v2;
            u1 = u2;
        }
        if (k % 2 === 0) {
            return false;
        }
        return true;
    }
}
/**
 * 3D vector mathematical operations.
 */
class Vec3Math {
    // eslint-disable-next-line jsdoc/require-jsdoc
    static create(x, y, z) {
        const vec = new Float64Array(3);
        if (x !== undefined && y !== undefined && z !== undefined) {
            vec[0] = x;
            vec[1] = y;
            vec[2] = z;
        }
        return vec;
    }
    /**
     * Gets the spherical angle theta of a vector in radians.
     * @param vec - a vector.
     * @returns the spherical angle theta of the vector.
     */
    static theta(vec) {
        return Math.atan2(Math.hypot(vec[0], vec[1]), vec[2]);
    }
    /**
     * Gets the spherical angle phi of a vector in radians.
     * @param vec - a vector.
     * @returns the spherical angle phi of the vector.
     */
    static phi(vec) {
        return Math.atan2(vec[1], vec[0]);
    }
    /**
     * Sets the components of a vector.
     * @param x - the new x-component.
     * @param y - the new y-component.
     * @param z - the new z-component.
     * @param vec - the vector to change.
     * @returns the vector after it has been changed.
     */
    static set(x, y, z, vec) {
        vec[0] = x;
        vec[1] = y;
        vec[2] = z;
        return vec;
    }
    /**
     * Sets the spherical components of a vector.
     * @param r - the new length (magnitude).
     * @param theta - the new spherical angle theta, in radians.
     * @param phi - the new spherical angle phi, in radians.
     * @param vec - the vector to change.
     * @returns the vector after it has been changed.
     */
    static setFromSpherical(r, theta, phi, vec) {
        const sinTheta = Math.sin(theta);
        vec[0] = sinTheta * Math.cos(phi);
        vec[1] = sinTheta * Math.sin(phi);
        vec[2] = Math.cos(theta);
        return vec;
    }
    /**
     * Add one vector to another.
     * @param v1 The first vector.
     * @param v2 The second vector.
     * @param out The vector to write the results to.
     * @returns the vector sum.
     */
    static add(v1, v2, out) {
        out[0] = v1[0] + v2[0];
        out[1] = v1[1] + v2[1];
        out[2] = v1[2] + v2[2];
        return out;
    }
    /**
     * Subtracts one vector from another.
     * @param v1 The first vector.
     * @param v2 The second vector.
     * @param out The vector to write the results to.
     * @returns the vector difference.
     */
    static sub(v1, v2, out) {
        out[0] = v1[0] - v2[0];
        out[1] = v1[1] - v2[1];
        out[2] = v1[2] - v2[2];
        return out;
    }
    /**
     * Gets the dot product of two vectors.
     * @param v1 The first vector.
     * @param v2 The second vector.
     * @returns The dot product of the vectors.
     */
    static dot(v1, v2) {
        return v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2];
    }
    /**
     * Gets the cross product of two vectors.
     * @param v1 - the first vector.
     * @param v2 - the second vector.
     * @param out - the vector to which to write the result.
     * @returns the cross product.
     */
    static cross(v1, v2, out) {
        const x1 = v1[0];
        const y1 = v1[1];
        const z1 = v1[2];
        const x2 = v2[0];
        const y2 = v2[1];
        const z2 = v2[2];
        out[0] = y1 * z2 - z1 * y2;
        out[1] = z1 * x2 - x1 * z2;
        out[2] = x1 * y2 - y1 * x2;
        return out;
    }
    /**
     * Multiplies a vector by a scalar.
     * @param v1 The vector to multiply.
     * @param scalar The scalar to apply.
     * @param out The vector to write the results to.
     * @returns The scaled vector.
     */
    static multScalar(v1, scalar, out) {
        out[0] = v1[0] * scalar;
        out[1] = v1[1] * scalar;
        out[2] = v1[2] * scalar;
        return out;
    }
    /**
     * Gets the magnitude of a vector.
     * @param v1 The vector to get the magnitude for.
     * @returns the vector's magnitude.
     */
    static abs(v1) {
        return Math.hypot(v1[0], v1[1], v1[2]);
    }
    /**
     * Normalizes the vector to a unit vector.
     * @param v1 The vector to normalize.
     * @param out The vector to write the results to.
     * @returns the normalized vector.
     */
    static normalize(v1, out) {
        const mag = Vec3Math.abs(v1);
        out[0] = v1[0] / mag;
        out[1] = v1[1] / mag;
        out[2] = v1[2] / mag;
        return out;
    }
    /**
     * Gets the Euclidean distance between two vectors.
     * @param vec1 The first vector.
     * @param vec2 The second vector.
     * @returns the Euclidean distance between the two vectors.
     */
    static distance(vec1, vec2) {
        return Math.hypot(vec2[0] - vec1[0], vec2[1] - vec1[0], vec2[2] - vec1[2]);
    }
    /**
     * Checks if two vectors are equal.
     * @param vec1 The first vector.
     * @param vec2 The second vector.
     * @returns Whether the two vectors are equal.
     */
    static equals(vec1, vec2) {
        return vec1[0] === vec2[0] && vec1[1] === vec2[1] && vec1[2] === vec2[2];
    }
    /**
     * Copies one vector to another.
     * @param from The vector from which to copy.
     * @param to The vector to which to copy.
     * @returns the changed vector.
     */
    static copy(from, to) {
        return Vec3Math.set(from[0], from[1], from[2], to);
    }
}
/**
 * N-dimensional vector mathematical operations.
 */
class VecNMath {
    // eslint-disable-next-line jsdoc/require-jsdoc
    static create(length, ...components) {
        const vec = new Float64Array(length);
        for (let i = 0; i < length && components.length; i++) {
            vec[i] = components[i];
        }
        return vec;
    }
    /**
     * Sets the components of a vector.
     * @param vec The vector to change.
     * @param components The new components.
     * @returns The vector after it has been changed.
     */
    static set(vec, ...components) {
        for (let i = 0; i < vec.length && components.length; i++) {
            vec[i] = components[i];
        }
        return vec;
    }
    /**
     * Gets the magnitude of a vector.
     * @param vec The vector to get the magnitude for.
     * @returns The vector's magnitude.
     */
    static abs(vec) {
        return Math.hypot(...vec);
    }
    /**
     * Gets the dot product of two vectors.
     * @param v1 The first vector.
     * @param v2 The second vector.
     * @returns The dot product of the vectors.
     * @throws Error if the two vectors are of unequal lengths.
     */
    static dot(v1, v2) {
        if (v1.length !== v2.length) {
            throw new Error(`VecNMath: cannot compute dot product of two vectors of unequal length (${v1.length} and ${v2.length})`);
        }
        let dot = 0;
        const len = v1.length;
        for (let i = 0; i < len; i++) {
            dot += v1[i] * v2[i];
        }
        return dot;
    }
    /**
     * Normalizes a vector to a unit vector.
     * @param v1 The vector to normalize.
     * @param out The vector to write the results to.
     * @returns The normalized vector.
     */
    static normalize(v1, out) {
        const mag = Vec3Math.abs(v1);
        const len = v1.length;
        for (let i = 0; i < len; i++) {
            out[i] = v1[i] / mag;
        }
        return out;
    }
    /**
     * Checks if two vectors are equal.
     * @param vec1 The first vector.
     * @param vec2 The second vector.
     * @returns Whether the two vectors are equal.
     */
    static equals(vec1, vec2) {
        if (vec1.length !== vec2.length) {
            return false;
        }
        for (let i = 0; i < vec1.length; i++) {
            if (vec1[i] !== vec2[i]) {
                return false;
            }
        }
        return true;
    }
    /**
     * Copies one vector to another.
     * @param from The vector from which to copy.
     * @param to The vector to which to copy.
     * @returns The changed vector.
     * @throws Error if the vectors are of unequal lengths.
     */
    static copy(from, to) {
        if (from.length !== to.length) {
            throw new Error(`VecNMath: cannot copy a vector of length ${from.length} to a vector of length ${to.length}`);
        }
        to.set(from);
        return to;
    }
}

/**
 * A Subject which allows a 2D vector to be observed.
 */
class Vec2Subject extends AbstractSubscribable {
    /**
     * Constructor.
     * @param value The value of this subject.
     */
    constructor(value) {
        super();
        this.value = value;
        /** @inheritdoc */
        this.isMutableSubscribable = true;
    }
    /**
     * Creates a Vec2Subject.
     * @param initialVal The initial value.
     * @returns A Vec2Subject.
     */
    static create(initialVal) {
        return new Vec2Subject(initialVal);
    }
    /**
     * Creates a Vec2Subject.
     * @param initialVal The initial value.
     * @returns A Vec2Subject.
     * @deprecated Use `Vec2Subject.create()` instead.
     */
    static createFromVector(initialVal) {
        return new Vec2Subject(initialVal);
    }
    /** @inheritdoc */
    get() {
        return this.value;
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    set(arg1, arg2) {
        let x, y;
        if (typeof arg1 === 'number') {
            x = arg1;
            y = arg2;
        }
        else {
            x = arg1[0];
            y = arg1[1];
        }
        const equals = x === this.value[0] && y === this.value[1];
        if (!equals) {
            Vec2Math.set(x, y, this.value);
            this.notify();
        }
    }
}
/**
 * A Subject which allows a N-D vector to be observed.
 */
class VecNSubject extends AbstractSubscribable {
    /**
     * Constructor.
     * @param value The value of this subject.
     */
    constructor(value) {
        super();
        this.value = value;
        /** @inheritdoc */
        this.isMutableSubscribable = true;
    }
    /**
     * Creates a VecNSubject.
     * @param initialVal The initial value.
     * @returns A VecNSubject.
     */
    static create(initialVal) {
        return new VecNSubject(initialVal);
    }
    /**
     * Creates a VecNSubject.
     * @param initialVal The initial value.
     * @returns A VecNSubject.
     * @deprecated Use `VecNSubject.create()` instead.
     */
    static createFromVector(initialVal) {
        return new VecNSubject(initialVal);
    }
    /** @inheritdoc */
    get() {
        return this.value;
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    set(arg1, ...args) {
        let array;
        if (typeof arg1 === 'number') {
            array = args;
            args.unshift(arg1);
        }
        else {
            array = arg1;
        }
        if (array.length > this.value.length) {
            throw new RangeError(`VecNSubject: Cannot set ${array.length} components on a vector of length ${this.value.length}`);
        }
        let equals = true;
        const len = array.length;
        for (let i = 0; i < len; i++) {
            if (array[i] !== this.value[i]) {
                equals = false;
                break;
            }
        }
        if (!equals) {
            this.value.set(array);
            this.notify();
        }
    }
}

/**
 * A subscribable subject whose value can be freely manipulated.
 */
class Subject extends AbstractSubscribable {
    /**
     * Constructs an observable Subject.
     * @param value The initial value.
     * @param equalityFunc The function to use to check for equality.
     * @param mutateFunc The function to use to mutate the subject's value.
     */
    constructor(value, equalityFunc, mutateFunc) {
        super();
        this.value = value;
        this.equalityFunc = equalityFunc;
        this.mutateFunc = mutateFunc;
        this.isMutableSubscribable = true;
    }
    /**
     * Creates and returns a new Subject.
     * @param v The initial value of the subject.
     * @param equalityFunc The function to use to check for equality between subject values. Defaults to the strict
     * equality comparison (`===`).
     * @param mutateFunc The function to use to change the subject's value. If not defined, new values will replace
     * old values by variable assignment.
     * @returns A Subject instance.
     */
    static create(v, equalityFunc, mutateFunc) {
        return new Subject(v, equalityFunc !== null && equalityFunc !== void 0 ? equalityFunc : Subject.DEFAULT_EQUALITY_FUNC, mutateFunc);
    }
    /** @inheritdoc */
    notifySub(sub) {
        sub(this.value);
    }
    /**
     * Sets the value of this subject and notifies subscribers if the value changed.
     * @param value The new value.
     */
    set(value) {
        if (!this.equalityFunc(value, this.value)) {
            if (this.mutateFunc) {
                this.mutateFunc(this.value, value);
            }
            else {
                this.value = value;
            }
            this.notify();
        }
    }
    /**
     * Applies a partial set of properties to this subject's value and notifies subscribers if the value changed as a
     * result.
     * @param value The properties to apply.
     */
    apply(value) {
        let changed = false;
        for (const prop in value) {
            changed = value[prop] !== this.value[prop];
            if (changed) {
                break;
            }
        }
        Object.assign(this.value, value);
        changed && this.notify();
    }
    /** @inheritdoc */
    notify() {
        super.notify();
    }
    /**
     * Gets the value of this subject.
     * @returns The value of this subject.
     */
    get() {
        return this.value;
    }
}

/**
 * A 2D affine transformation. By default, Transform2D objects are initially created as identity transformations.
 */
class Transform2D {
    constructor() {
        this.array = new Float64Array([1, 0, 0, 0, 1, 0]);
    }
    /**
     * Gets the parameters of this transformation as a 6-tuple: `[scaleX, skewX, translateX, skewY, scaleY, translateY]`.
     * @returns The parameters of this transformation.
     */
    getParameters() {
        return this.array;
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    set(arg1, skewX, translateX, skewY, scaleY, translateY) {
        let scaleX = arg1;
        if (arg1 instanceof Transform2D) {
            [scaleX, skewX, translateX, skewY, scaleY, translateY] = arg1.array;
        }
        const array = this.array;
        array[0] = scaleX;
        array[1] = skewX;
        array[2] = translateX;
        array[3] = skewY;
        array[4] = scaleY;
        array[5] = translateY;
        return this;
    }
    /**
     * Sets the x scaling factor of this transformation.
     * @param value The new x scaling factor.
     * @returns This transformation, after it has been changed.
     */
    setScaleX(value) {
        this.array[0] = value;
        return this;
    }
    /**
     * Sets the y scaling factor of this transformation.
     * @param value The new y scaling factor.
     * @returns This transformation, after it has been changed.
     */
    setScaleY(value) {
        this.array[4] = value;
        return this;
    }
    /**
     * Sets the x and y scaling factors of this transformation.
     * @param x The new x scaling factor.
     * @param y The new y scaling factor.
     * @returns This transformation, after it has been changed.
     */
    setScale(x, y) {
        this.array[0] = x;
        this.array[4] = y;
        return this;
    }
    /**
     * Sets the x skew factor of this transformation.
     * @param value The new x skew factor.
     * @returns This transformation, after it has been changed.
     */
    setSkewX(value) {
        this.array[1] = value;
        return this;
    }
    /**
     * Sets the y skew factor of this transformation.
     * @param value The new y skew factor.
     * @returns This transformation, after it has been changed.
     */
    setSkewY(value) {
        this.array[3] = value;
        return this;
    }
    /**
     * Sets the x translation of this transformation.
     * @param value The new x translation.
     * @returns This transformation, after it has been changed.
     */
    setTranslateX(value) {
        this.array[2] = value;
        return this;
    }
    /**
     * Sets the y translation of this transformation.
     * @param value The new y translation.
     * @returns This transformation, after it has been changed.
     */
    setTranslateY(value) {
        this.array[5] = value;
        return this;
    }
    /**
     * Sets the x and y translations of this transformation.
     * @param x The new x translation.
     * @param y The new y translation.
     * @returns This transformation, after it has been changed.
     */
    setTranslate(x, y) {
        this.array[2] = x;
        this.array[5] = y;
        return this;
    }
    /**
     * Inverts this transformation.
     * @returns This transformation, after it has been inverted.
     */
    invert() {
        const array = this.array;
        const e_00 = array[0];
        const e_01 = array[1];
        const e_02 = array[2];
        const e_10 = array[3];
        const e_11 = array[4];
        const e_12 = array[5];
        const i_00 = e_11;
        const i_01 = -e_10;
        const i_10 = -e_01;
        const i_11 = e_00;
        const i_20 = e_01 * e_12 - e_02 * e_11;
        const i_21 = -(e_00 * e_12 - e_02 * e_10);
        const det = e_00 * i_00 + e_01 * i_01;
        return this.set(i_00 / det, i_10 / det, i_20 / det, i_01 / det, i_11 / det, i_21 / det);
    }
    /**
     * Copies this transformation.
     * @returns A copy of this transformation.
     */
    copy() {
        return new Transform2D().set(this);
    }
    /**
     * Applies this transformation to a 2D vector.
     * @param vec A 2D vector.
     * @param out The vector to which to write the result.
     * @returns The result of applying this transformation to `vec`.
     */
    apply(vec, out) {
        const array = this.array;
        const x = vec[0] * array[0] + vec[1] * array[1] + array[2];
        const y = vec[0] * array[3] + vec[1] * array[4] + array[5];
        return Vec2Math.set(x, y, out);
    }
    /**
     * Changes this transformation to the one that is the result of offsetting this transformation's origin.
     * @param x The x-coordinate of the offset origin.
     * @param y The y-coordinate of the offset origin.
     * @returns This transformation, after it has been changed.
     */
    offsetOrigin(x, y) {
        Transform2D.offsetOriginCache[0].toTranslation(-x, -y);
        Transform2D.offsetOriginCache[1] = this;
        Transform2D.offsetOriginCache[2].toTranslation(x, y);
        return Transform2D.concat(this, Transform2D.offsetOriginCache);
    }
    /**
     * Sets this transformation to the identity transformation.
     * @returns This transformation, after it has been changed.
     */
    toIdentity() {
        return this.set(1, 0, 0, 0, 1, 0);
    }
    /**
     * Sets this transformation to a translation.
     * @param x The x translation.
     * @param y The y translation.
     * @returns This transformation, after it has been changed.
     */
    toTranslation(x, y) {
        return this.set(1, 0, x, 0, 1, y);
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    toScale(x, y, originX, originY) {
        this.set(x, 0, 0, 0, y, 0);
        if (originX !== undefined && originY !== undefined) {
            this.offsetOrigin(originX, originY);
        }
        return this;
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    toRotation(theta, originX, originY) {
        const sin = Math.sin(theta);
        const cos = Math.cos(theta);
        this.set(cos, -sin, 0, sin, cos, 0);
        if (originX !== undefined && originY !== undefined) {
            this.offsetOrigin(originX, originY);
        }
        return this;
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    toReflection(theta, originX, originY) {
        const sin = Math.sin(2 * theta);
        const cos = Math.cos(2 * theta);
        this.set(cos, sin, 0, sin, -cos, 0);
        if (originX !== undefined && originY !== undefined) {
            this.offsetOrigin(originX, originY);
        }
        return this;
    }
    /**
     * Adds a translation to this transformation.
     * @param x The x translation.
     * @param y The y translation.
     * @param order The order in which to add the translation, relative to this existing transformation, either
     * `'before'` or `'after'`. Defaults to `'after'`.
     * @returns This transformation, after it has been changed.
     */
    addTranslation(x, y, order = 'after') {
        if (order === 'before') {
            Transform2D.addCache[0].toTranslation(x, y);
            Transform2D.addCache[1].set(this);
        }
        else {
            Transform2D.addCache[0].set(this);
            Transform2D.addCache[1].toTranslation(x, y);
        }
        return Transform2D.concat(this, Transform2D.addCache);
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    addScale(x, y, arg3, arg4, arg5) {
        let originX, originY, order;
        if (typeof arg3 === 'number') {
            originX = arg3;
            originY = arg4;
            order = arg5;
        }
        else {
            order = arg3;
        }
        if (order === 'before') {
            originX === undefined ? Transform2D.addCache[0].toScale(x, y) : Transform2D.addCache[0].toScale(x, y, originX, originY);
            Transform2D.addCache[1].set(this);
        }
        else {
            Transform2D.addCache[0].set(this);
            originX === undefined ? Transform2D.addCache[1].toScale(x, y) : Transform2D.addCache[1].toScale(x, y, originX, originY);
        }
        return Transform2D.concat(this, Transform2D.addCache);
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    addRotation(theta, arg2, arg3, arg4) {
        let originX, originY, order;
        if (typeof arg2 === 'number') {
            originX = arg2;
            originY = arg3;
            order = arg4;
        }
        else {
            order = arg2;
        }
        if (order === 'before') {
            originX === undefined ? Transform2D.addCache[0].toRotation(theta) : Transform2D.addCache[0].toRotation(theta, originX, originY);
            Transform2D.addCache[1].set(this);
        }
        else {
            Transform2D.addCache[0].set(this);
            originX === undefined ? Transform2D.addCache[1].toRotation(theta) : Transform2D.addCache[1].toRotation(theta, originX, originY);
        }
        return Transform2D.concat(this, Transform2D.addCache);
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    addReflection(theta, arg2, arg3, arg4) {
        let originX, originY, order;
        if (typeof arg2 === 'number') {
            originX = arg2;
            originY = arg3;
            order = arg4;
        }
        else {
            order = arg2;
        }
        if (order === 'before') {
            originX === undefined ? Transform2D.addCache[0].toReflection(theta) : Transform2D.addCache[0].toReflection(theta, originX, originY);
            Transform2D.addCache[1].set(this);
        }
        else {
            Transform2D.addCache[0].set(this);
            originX === undefined ? Transform2D.addCache[1].toReflection(theta) : Transform2D.addCache[1].toReflection(theta, originX, originY);
        }
        return Transform2D.concat(this, Transform2D.addCache);
    }
    /**
     * Concatenates one or more transformations and returns the result. Concatenating transformations `[A, B, ...]`
     * results in a transformation that is equivalent to first applying `A`, then applying `B`, etc. Note that this order
     * is the _opposite_ of the one resulting from multiplying the individual transformation _matrices_
     * `M_A * M_B * ...`.
     *
     * If the number of transformations to concatenate equals zero, the identity matrix is returned.
     * @param out The transformation to which to write the result.
     * @param transforms The transformations to concatenate, in order.
     * @returns The result of concatenating all transformations in `transforms`.
     */
    static concat(out, transforms) {
        if (transforms.length === 0) {
            return out.toIdentity();
        }
        if (transforms.length === 1) {
            return out.set(transforms[0]);
        }
        let index = 0;
        let next = transforms[index];
        const oldTransform = Transform2D.concatCache[0];
        const newTransform = Transform2D.concatCache[1].set(next);
        const oldArray = oldTransform.array;
        const newArray = newTransform.array;
        const end = transforms.length;
        while (++index < end) {
            next = transforms[index];
            const nextArray = next.array;
            oldTransform.set(newTransform);
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 2; j++) {
                    newArray[j * 3 + i] = oldArray[i] * nextArray[j * 3] + oldArray[3 + i] * nextArray[j * 3 + 1] + (i === 2 ? 1 : 0) * nextArray[j * 3 + 2];
                }
            }
        }
        return out.set(newTransform);
    }
}
Transform2D.offsetOriginCache = [new Transform2D(), undefined, new Transform2D()];
Transform2D.addCache = [new Transform2D(), new Transform2D()];
Transform2D.concatCache = [new Transform2D(), new Transform2D()];

/**
 * A 3D affine transformation. By default, Transform3D objects are initially created as identity transformations.
 */
class Transform3D {
    constructor() {
        this.array = new Float64Array([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0
        ]);
    }
    /**
     * Gets the parameters of this transformation as a 12-tuple:
     * `[scaleX, skewX(Y), skewX(Z), translateX, skewY(X), scaleY, skewY(Z), translateY, skewZ(X), skewZ(Y), scaleZ, translateZ]`.
     * @returns The parameters of this transformation.
     */
    getParameters() {
        return this.array;
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    set(arg1, skewXY, skewXZ, translateX, skewYX, scaleY, skewYZ, translateY, skewZX, skewZY, scaleZ, translateZ) {
        let scaleX = arg1;
        if (arg1 instanceof Transform3D) {
            [scaleX, skewXY, skewXZ, translateX, skewYX, scaleY, skewYZ, translateY, skewZX, skewZY, scaleZ, translateZ] = arg1.array;
        }
        const array = this.array;
        array[0] = scaleX;
        array[1] = skewXY;
        array[2] = skewXZ;
        array[3] = translateX;
        array[4] = skewYX;
        array[5] = scaleY;
        array[6] = skewYZ;
        array[7] = translateY;
        array[8] = skewZX;
        array[9] = skewZY;
        array[10] = scaleZ;
        array[11] = translateZ;
        return this;
    }
    /**
     * Sets the x scaling factor of this transformation.
     * @param value The new x scaling factor.
     * @returns This transformation, after it has been changed.
     */
    setScaleX(value) {
        this.array[0] = value;
        return this;
    }
    /**
     * Sets the y scaling factor of this transformation.
     * @param value The new y scaling factor.
     * @returns This transformation, after it has been changed.
     */
    setScaleY(value) {
        this.array[5] = value;
        return this;
    }
    /**
     * Sets the z scaling factor of this transformation.
     * @param value The new z scaling factor.
     * @returns This transformation, after it has been changed.
     */
    setScaleZ(value) {
        this.array[10] = value;
        return this;
    }
    /**
     * Sets the x and y scaling factors of this transformation.
     * @param x The new x scaling factor.
     * @param y The new y scaling factor.
     * @param z The new z scaling factor.
     * @returns This transformation, after it has been changed.
     */
    setScale(x, y, z) {
        this.array[0] = x;
        this.array[5] = y;
        this.array[10] = z;
        return this;
    }
    /**
     * Sets the x skew factor of this transformation.
     * @param y The new x skew factor along the y axis.
     * @param z The new x skew factor along the z axis.
     * @returns This transformation, after it has been changed.
     */
    setSkewX(y, z) {
        this.array[1] = y;
        this.array[2] = z;
        return this;
    }
    /**
     * Sets the y skew factor of this transformation.
     * @param x The new y skew factor along the x axis.
     * @param z The new y skew factor along the z axis.
     * @returns This transformation, after it has been changed.
     */
    setSkewY(x, z) {
        this.array[4] = x;
        this.array[6] = z;
        return this;
    }
    /**
     * Sets the z skew factor of this transformation.
     * @param x The new z skew factor along the x axis.
     * @param y The new z skew factor along the y axis.
     * @returns This transformation, after it has been changed.
     */
    setSkewZ(x, y) {
        this.array[8] = x;
        this.array[9] = y;
        return this;
    }
    /**
     * Sets the x translation of this transformation.
     * @param value The new x translation.
     * @returns This transformation, after it has been changed.
     */
    setTranslateX(value) {
        this.array[3] = value;
        return this;
    }
    /**
     * Sets the y translation of this transformation.
     * @param value The new y translation.
     * @returns This transformation, after it has been changed.
     */
    setTranslateY(value) {
        this.array[7] = value;
        return this;
    }
    /**
     * Sets the z translation of this transformation.
     * @param value The new z translation.
     * @returns This transformation, after it has been changed.
     */
    setTranslateZ(value) {
        this.array[11] = value;
        return this;
    }
    /**
     * Sets the x and y translations of this transformation.
     * @param x The new x translation.
     * @param y The new y translation.
     * @param z The new z translation.
     * @returns This transformation, after it has been changed.
     */
    setTranslate(x, y, z) {
        this.array[3] = x;
        this.array[7] = y;
        this.array[11] = z;
        return this;
    }
    /**
     * Inverts this transformation.
     * @returns This transformation, after it has been inverted.
     * @throws Error if this transformation cannot be inverted.
     */
    invert() {
        const array = this.array;
        const e_00 = array[0];
        const e_01 = array[1];
        const e_02 = array[2];
        const e_03 = array[3];
        const e_10 = array[4];
        const e_11 = array[5];
        const e_12 = array[6];
        const e_13 = array[7];
        const e_20 = array[8];
        const e_21 = array[9];
        const e_22 = array[10];
        const e_23 = array[11];
        const c_00 = e_11 * e_22 - e_12 * e_21;
        const c_01 = e_12 * e_20 - e_10 * e_22;
        const c_02 = e_10 * e_21 - e_11 * e_20;
        const c_10 = e_02 * e_21 - e_01 * e_22;
        const c_11 = e_00 * e_22 - e_02 * e_20;
        const c_12 = e_01 * e_20 - e_00 * e_21;
        const c_20 = e_01 * e_12 - e_02 * e_11;
        const c_21 = e_02 * e_10 - e_00 * e_12;
        const c_22 = e_00 * e_11 - e_01 * e_10;
        const det = e_00 * c_00 + e_01 * c_01 + e_02 * c_02;
        if (det === 0) {
            throw new Error(`Transform3D: cannot invert transformation with parameters: ${this.array}`);
        }
        const i_00 = c_00 / det;
        const i_01 = c_10 / det;
        const i_02 = c_20 / det;
        const i_10 = c_01 / det;
        const i_11 = c_11 / det;
        const i_12 = c_21 / det;
        const i_20 = c_02 / det;
        const i_21 = c_12 / det;
        const i_22 = c_22 / det;
        const i_03 = -(i_00 * e_03 + i_01 * e_13 + i_02 * e_23);
        const i_13 = -(i_10 * e_03 + i_11 * e_13 + i_12 * e_23);
        const i_23 = -(i_20 * e_03 + i_21 * e_13 + i_22 * e_23);
        return this.set(i_00, i_01, i_02, i_03, i_10, i_11, i_12, i_13, i_20, i_21, i_22, i_23);
    }
    /**
     * Copies this transformation.
     * @returns A copy of this transformation.
     */
    copy() {
        return new Transform3D().set(this);
    }
    /**
     * Applies this transformation to a 3D vector.
     * @param vec A 3D vector.
     * @param out The vector to which to write the result.
     * @returns The result of applying this transformation to `vec`.
     */
    apply(vec, out) {
        const array = this.array;
        const x = vec[0] * array[0] + vec[1] * array[1] + vec[2] * array[2] + array[3];
        const y = vec[0] * array[4] + vec[1] * array[5] + vec[2] * array[6] + array[7];
        const z = vec[0] * array[8] + vec[1] * array[9] + vec[2] * array[10] + array[11];
        return Vec3Math.set(x, y, z, out);
    }
    /**
     * Changes this transformation to the one that is the result of offsetting this transformation's origin.
     * @param x The x-coordinate of the offset origin.
     * @param y The y-coordinate of the offset origin.
     * @param z The z-coordinate of the offset origin.
     * @returns This transformation, after it has been changed.
     */
    offsetOrigin(x, y, z) {
        Transform3D.offsetOriginCache[0].toTranslation(-x, -y, -z);
        Transform3D.offsetOriginCache[1] = this;
        Transform3D.offsetOriginCache[2].toTranslation(x, y, z);
        return Transform3D.concat(this, Transform3D.offsetOriginCache);
    }
    /**
     * Sets this transformation to the identity transformation.
     * @returns This transformation, after it has been changed.
     */
    toIdentity() {
        return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0);
    }
    /**
     * Sets this transformation to a translation.
     * @param x The x translation.
     * @param y The y translation.
     * @param z The z translation.
     * @returns This transformation, after it has been changed.
     */
    toTranslation(x, y, z) {
        return this.set(1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z);
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    toScale(x, y, z, originX, originY, originZ) {
        this.set(x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0);
        if (originX !== undefined && originY !== undefined && originZ !== undefined) {
            this.offsetOrigin(originX, originY, originZ);
        }
        return this;
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    toRotationX(theta, originX, originY, originZ) {
        const sin = Math.sin(theta);
        const cos = Math.cos(theta);
        this.set(1, 0, 0, 0, 0, cos, -sin, 0, 0, sin, cos, 0);
        if (originX !== undefined && originY !== undefined && originZ !== undefined) {
            this.offsetOrigin(originX, originY, originZ);
        }
        return this;
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    toRotationY(theta, originX, originY, originZ) {
        const sin = Math.sin(theta);
        const cos = Math.cos(theta);
        this.set(cos, 0, sin, 0, 0, 1, 0, 0, -sin, 0, cos, 0);
        if (originX !== undefined && originY !== undefined && originZ !== undefined) {
            this.offsetOrigin(originX, originY, originZ);
        }
        return this;
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    toRotationZ(theta, originX, originY, originZ) {
        const sin = Math.sin(theta);
        const cos = Math.cos(theta);
        this.set(cos, -sin, 0, 0, sin, cos, 0, 0, 0, 0, 1, 0);
        if (originX !== undefined && originY !== undefined && originZ !== undefined) {
            this.offsetOrigin(originX, originY, originZ);
        }
        return this;
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    toRotation(theta, axisX, axisY, axisZ, originX, originY, originZ) {
        const abs = Math.hypot(axisX, axisY, axisZ);
        const ux = axisX / abs;
        const uy = axisY / abs;
        const uz = axisZ / abs;
        const ux_uy = ux * uy;
        const ux_uz = ux * uz;
        const uy_uz = uy * uz;
        const sin = Math.sin(theta);
        const cos = Math.cos(theta);
        const cosCompl = 1 - cos;
        this.set(cos + ux * ux * cosCompl, ux_uy * cosCompl - uz * sin, ux_uz * cosCompl * uy * sin, 0, ux_uy * cosCompl + uz * sin, cos + uy * uy * cosCompl, uy_uz * cosCompl - ux * sin, 0, ux_uz * cosCompl - uy * sin, uy_uz * cosCompl + ux * sin, cos + uz * uz * cosCompl, 0);
        if (originX !== undefined && originY !== undefined && originZ !== undefined) {
            this.offsetOrigin(originX, originY, originZ);
        }
        return this;
    }
    /**
     * Adds a translation to this transformation.
     * @param x The x translation.
     * @param y The y translation.
     * @param z The z translation.
     * @param order The order in which to add the translation, relative to this existing transformation, either
     * `'before'` or `'after'`. Defaults to `'after'`.
     * @returns This transformation, after it has been changed.
     */
    addTranslation(x, y, z, order = 'after') {
        if (order === 'before') {
            Transform3D.addCache[0].toTranslation(x, y, z);
            Transform3D.addCache[1].set(this);
        }
        else {
            Transform3D.addCache[0].set(this);
            Transform3D.addCache[1].toTranslation(x, y, z);
        }
        return Transform3D.concat(this, Transform3D.addCache);
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    addScale(x, y, z, arg4, arg5, arg6, arg7) {
        let originX, originY, originZ, order;
        if (typeof arg4 === 'number') {
            originX = arg4;
            originY = arg5;
            originZ = arg6;
            order = arg7;
        }
        else {
            order = arg4;
        }
        if (order === 'before') {
            originX === undefined ? Transform3D.addCache[0].toScale(x, y, z) : Transform3D.addCache[0].toScale(x, y, z, originX, originY, originZ);
            Transform3D.addCache[1].set(this);
        }
        else {
            Transform3D.addCache[0].set(this);
            originX === undefined ? Transform3D.addCache[1].toScale(x, y, z) : Transform3D.addCache[1].toScale(x, y, z, originX, originY, originZ);
        }
        return Transform3D.concat(this, Transform3D.addCache);
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    addRotationX(theta, arg2, arg3, arg4, arg5) {
        let originX, originY, originZ, order;
        if (typeof arg2 === 'number') {
            originX = arg2;
            originY = arg3;
            originZ = arg4;
            order = arg5;
        }
        else {
            order = arg2;
        }
        if (order === 'before') {
            originX === undefined ? Transform3D.addCache[0].toRotationX(theta) : Transform3D.addCache[0].toRotationX(theta, originX, originY, originZ);
            Transform3D.addCache[1].set(this);
        }
        else {
            Transform3D.addCache[0].set(this);
            originX === undefined ? Transform3D.addCache[1].toRotationX(theta) : Transform3D.addCache[1].toRotationX(theta, originX, originY, originZ);
        }
        return Transform3D.concat(this, Transform3D.addCache);
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    addRotationY(theta, arg2, arg3, arg4, arg5) {
        let originX, originY, originZ, order;
        if (typeof arg2 === 'number') {
            originX = arg2;
            originY = arg3;
            originZ = arg4;
            order = arg5;
        }
        else {
            order = arg2;
        }
        if (order === 'before') {
            originX === undefined ? Transform3D.addCache[0].toRotationY(theta) : Transform3D.addCache[0].toRotationY(theta, originX, originY, originZ);
            Transform3D.addCache[1].set(this);
        }
        else {
            Transform3D.addCache[0].set(this);
            originX === undefined ? Transform3D.addCache[1].toRotationY(theta) : Transform3D.addCache[1].toRotationY(theta, originX, originY, originZ);
        }
        return Transform3D.concat(this, Transform3D.addCache);
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    addRotationZ(theta, arg2, arg3, arg4, arg5) {
        let originX, originY, originZ, order;
        if (typeof arg2 === 'number') {
            originX = arg2;
            originY = arg3;
            originZ = arg4;
            order = arg5;
        }
        else {
            order = arg2;
        }
        if (order === 'before') {
            originX === undefined ? Transform3D.addCache[0].toRotationZ(theta) : Transform3D.addCache[0].toRotationZ(theta, originX, originY, originZ);
            Transform3D.addCache[1].set(this);
        }
        else {
            Transform3D.addCache[0].set(this);
            originX === undefined ? Transform3D.addCache[1].toRotationZ(theta) : Transform3D.addCache[1].toRotationZ(theta, originX, originY, originZ);
        }
        return Transform3D.concat(this, Transform3D.addCache);
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    addRotation(theta, axisX, axisY, axisZ, arg5, arg6, arg7, arg8) {
        let originX, originY, originZ, order;
        if (typeof arg5 === 'number') {
            originX = arg5;
            originY = arg6;
            originZ = arg7;
            order = arg8;
        }
        else {
            order = arg5;
        }
        if (order === 'before') {
            originX === undefined
                ? Transform3D.addCache[0].toRotation(theta, axisX, axisY, axisZ)
                : Transform3D.addCache[0].toRotation(theta, axisX, axisY, axisZ, originX, originY, originZ);
            Transform3D.addCache[1].set(this);
        }
        else {
            Transform3D.addCache[0].set(this);
            originX === undefined
                ? Transform3D.addCache[1].toRotation(theta, axisX, axisY, axisZ)
                : Transform3D.addCache[1].toRotation(theta, axisX, axisY, axisZ, originX, originY, originZ);
        }
        return Transform3D.concat(this, Transform3D.addCache);
    }
    /**
     * Concatenates one or more transformations and returns the result. Concatenating transformations `[A, B, ...]`
     * results in a transformation that is equivalent to first applying `A`, then applying `B`, etc. Note that this order
     * is the _opposite_ of the one resulting from multiplying the individual transformation _matrices_
     * `M_A * M_B * ...`.
     *
     * If the number of transformations to concatenate equals zero, the identity matrix is returned.
     * @param out The transformation to which to write the result.
     * @param transforms The transformations to concatenate, in order.
     * @returns The result of concatenating all transformations in `transforms`.
     */
    static concat(out, transforms) {
        if (transforms.length === 0) {
            return out.toIdentity();
        }
        if (transforms.length === 1) {
            return out.set(transforms[0]);
        }
        let index = 0;
        let next = transforms[index];
        const oldTransform = Transform3D.concatCache[0];
        const newTransform = Transform3D.concatCache[1].set(next);
        const oldArray = oldTransform.array;
        const newArray = newTransform.array;
        const end = transforms.length;
        while (++index < end) {
            next = transforms[index];
            const nextArray = next.array;
            oldTransform.set(newTransform);
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 3; j++) {
                    newArray[j * 4 + i] =
                        oldArray[i] * nextArray[j * 4]
                            + oldArray[4 + i] * nextArray[j * 4 + 1]
                            + oldArray[8 + i] * nextArray[j * 4 + 2]
                            + (i === 3 ? 1 : 0) * nextArray[j * 4 + 3];
                }
            }
        }
        return out.set(newTransform);
    }
}
Transform3D.offsetOriginCache = [new Transform3D(), undefined, new Transform3D()];
Transform3D.addCache = [new Transform3D(), new Transform3D()];
Transform3D.concatCache = [new Transform3D(), new Transform3D()];
[Vec3Math.create()];

/**
 * A utitlity class for basic math.
 */
class MathUtils {
    /**
     * Clamps a numerical value to the min/max range.
     * @param value The value to be clamped.
     * @param min The minimum.
     * @param max The maximum.
     *
     * @returns The clamped numerical value..
     */
    static clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }
    /**
     * Rounds a number.
     * @param value The number to round.
     * @param precision The precision with which to round. Defaults to `1`.
     * @returns The rounded number.
     */
    static round(value, precision = 1) {
        return Math.round(value / precision) * precision;
    }
    /**
     * Calculates the angular difference between two angles in the range `[0, 2 * pi)`. The calculation supports both
     * directional and non-directional differences. The directional difference is the angle swept from the start angle
     * to the end angle proceeding in the direction of increasing angle. The non-directional difference is the smaller
     * of the two angles swept from the start angle to the end angle proceeding in either direction.
     * @param start The starting angle, in radians.
     * @param end The ending angle, in radians.
     * @param directional Whether to calculate the directional difference. Defaults to `true`.
     * @returns The angular difference between the two angles, in radians, in the range `[0, 2 * pi)`.
     */
    static diffAngle(start, end, directional = true) {
        const diff = ((end - start) % MathUtils.TWO_PI + MathUtils.TWO_PI) % MathUtils.TWO_PI;
        return directional ? diff : Math.min(diff, MathUtils.TWO_PI - diff);
    }
    /**
     * Linearly interpolates a keyed value along one dimension.
     * @param x The key of the value to interpolate.
     * @param x0 The key of the first known value.
     * @param x1 The key of the second known value.
     * @param y0 The first known value.
     * @param y1 The second known value.
     * @param clampStart Whether to clamp the interpolated value to the first known value. Defaults to false.
     * @param clampEnd Whether to clamp the interpolated value to the second known value. Defaults to false.
     * @returns The interpolated value corresponding to the specified key.
     */
    static lerp(x, x0, x1, y0, y1, clampStart = false, clampEnd = false) {
        if (x0 !== x1 && y0 !== y1) {
            const fraction = MathUtils.clamp((x - x0) / (x1 - x0), clampStart ? 0 : -Infinity, clampEnd ? 1 : Infinity);
            return fraction * (y1 - y0) + y0;
        }
        else {
            return y0;
        }
    }
    /**
     * Linearly interpolates a keyed vector along one dimension. If the known vectors and the result vector have unequal
     * lengths, then only the components shared by all vectors are interpolated in the result.
     * @param out The object to which to write the result.
     * @param x The key of the vector to interpolate.
     * @param x0 The key of the first known vector.
     * @param x1 The key of the second known vector.
     * @param y0 The first known vector.
     * @param y1 The second known vector.
     * @param clampStart Whether to clamp the components of the interpolated vector to those of the first known vector.
     * Defaults to false.
     * @param clampEnd Whether to clamp the components of the interpolated vector to those of the second known vector.
     * Defaults to false.
     * @returns The interpolated vector corresponding to the specified key.
     */
    static lerpVector(out, x, x0, x1, y0, y1, clampStart = false, clampEnd = false) {
        const length = Math.min(y0.length, y1.length, out.length);
        for (let i = 0; i < length; i++) {
            out[i] = MathUtils.lerp(x, x0, x1, y0[i], y1[i], clampStart, clampEnd);
        }
        return out;
    }
}
/** Twice the value of pi. */
MathUtils.TWO_PI = Math.PI * 2;
/** Half the value of pi. */
MathUtils.HALF_PI = Math.PI / 2;

/**
 * A read-only wrapper for a GeoPoint.
 */
class GeoPointReadOnly {
    /**
     * Constructor.
     * @param source - the source of the new read-only point.
     */
    constructor(source) {
        this.source = source;
    }
    /**
     * The latitude of this point, in degrees.
     * @returns the latitude of this point.
     */
    get lat() {
        return this.source.lat;
    }
    /**
     * The longitude of this point, in degrees.
     * @returns the longitude of this point.
     */
    get lon() {
        return this.source.lon;
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    distance(arg1, arg2) {
        if (typeof arg1 === 'number') {
            return this.source.distance(arg1, arg2);
        }
        else {
            return this.source.distance(arg1);
        }
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    distanceRhumb(arg1, arg2) {
        if (typeof arg1 === 'number') {
            return this.source.distanceRhumb(arg1, arg2);
        }
        else {
            return this.source.distanceRhumb(arg1);
        }
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    bearingTo(arg1, arg2) {
        if (typeof arg1 === 'number') {
            return this.source.bearingTo(arg1, arg2);
        }
        else {
            return this.source.bearingTo(arg1);
        }
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    bearingFrom(arg1, arg2) {
        if (typeof arg1 === 'number') {
            return this.source.bearingFrom(arg1, arg2);
        }
        else {
            return this.source.bearingFrom(arg1);
        }
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    bearingRhumb(arg1, arg2) {
        if (typeof arg1 === 'number') {
            return this.source.bearingRhumb(arg1, arg2);
        }
        else {
            return this.source.bearingRhumb(arg1);
        }
    }
    /**
     * Offsets this point by an initial bearing and distance along a great circle.
     * @param bearing The initial true bearing (forward azimuth), in degrees, by which to offset.
     * @param distance The distance, in great-arc radians, by which to offset.
     * @param out The GeoPoint to which to write the result. If not supplied, a new GeoPoint object is created.
     * @returns The offset point.
     * @throws Error if argument `out` is undefined.
     */
    offset(bearing, distance, out) {
        if (!out) {
            throw new Error('Cannot mutate a read-only GeoPoint.');
        }
        return this.source.offset(bearing, distance, out);
    }
    /**
     * Offsets this point by a constant bearing and distance along a rhumb line.
     * @param bearing The true bearing, in degrees, by which to offset.
     * @param distance The distance, in great-arc radians, by which to offset.
     * @param out The GeoPoint to which to write the result. If not supplied, a new GeoPoint object is created.
     * @returns The offset point.
     * @throws Error if argument `out` is undefined.
     */
    offsetRhumb(bearing, distance, out) {
        if (!out) {
            throw new Error('Cannot mutate a read-only GeoPoint.');
        }
        return this.source.offsetRhumb(bearing, distance, out);
    }
    /**
     * Gets the antipode of this point.
     * @param out The GeoPoint ot which to write the result.
     * @returns The antipode of this point.
     * @throws Error if argument `out` is undefined.
     */
    antipode(out) {
        if (!out) {
            throw new Error('Cannot mutate a read-only GeoPoint.');
        }
        return this.source.antipode(out);
    }
    /**
     * Calculates the cartesian (x, y, z) representation of this point, in units of great-arc radians. By convention,
     * in the cartesian coordinate system the origin is at the center of the Earth, the positive x-axis passes through
     * 0 degrees N, 0 degrees E, and the positive z-axis passes through the north pole.
     * @param out The vector array to which to write the result.
     * @returns The cartesian representation of this point.
     */
    toCartesian(out) {
        return this.source.toCartesian(out);
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    equals(arg1, arg2, arg3) {
        if (typeof arg1 === 'number') {
            return this.source.equals(arg1, arg2, arg3);
        }
        else {
            return this.source.equals(arg1, arg2);
        }
    }
    /** @inheritdoc */
    copy(to) {
        return this.source.copy(to);
    }
}
/**
 * A point on Earth's surface. This class uses a spherical Earth model.
 */
class GeoPoint {
    /**
     * Constructor.
     * @param lat The latitude, in degrees.
     * @param lon The longitude, in degrees.
     */
    constructor(lat, lon) {
        this._lat = 0;
        this._lon = 0;
        this.set(lat, lon);
        this.readonly = new GeoPointReadOnly(this);
    }
    /**
     * The latitude of this point, in degrees.
     * @returns the latitude of this point.
     */
    get lat() {
        return this._lat;
    }
    /**
     * The longitude of this point, in degrees.
     * @returns the longitude of this point.
     */
    get lon() {
        return this._lon;
    }
    /**
     * Converts an argument list consisting of either a LatLonInterface or lat/lon coordinates into an equivalent
     * LatLonInterface.
     * @param arg1 Argument 1.
     * @param arg2 Argument 2.
     * @returns A LatLonInterface.
     */
    static asLatLonInterface(arg1, arg2) {
        if (typeof arg1 === 'number') {
            return GeoPoint.tempGeoPoint.set(arg1, arg2);
        }
        else {
            return arg1;
        }
    }
    /**
     * Converts an argument list consisting of either a 3D vector or x, y, z components into an equivalent 3D vector.
     * @param arg1 Argument 1.
     * @param arg2 Argument 2.
     * @param arg3 Argument 3.
     * @returns A 3D vector.
     */
    static asVec3(arg1, arg2, arg3) {
        if (typeof arg1 === 'number') {
            return Vec3Math.set(arg1, arg2, arg3, GeoPoint.tempVec3);
        }
        else {
            return arg1;
        }
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    set(arg1, arg2) {
        let lat, lon;
        if (typeof arg1 === 'number') {
            lat = arg1;
            lon = arg2;
        }
        else {
            lat = arg1.lat;
            lon = arg1.lon;
        }
        lat = GeoPoint.toPlusMinus180(lat);
        lon = GeoPoint.toPlusMinus180(lon);
        if (Math.abs(lat) > 90) {
            lat = 180 - lat;
            lat = GeoPoint.toPlusMinus180(lat);
            lon += 180;
            lon = GeoPoint.toPlusMinus180(lon);
        }
        this._lat = lat;
        this._lon = lon;
        return this;
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    setFromCartesian(arg1, arg2, arg3) {
        const vec = GeoPoint.asVec3(arg1, arg2, arg3);
        const theta = Vec3Math.theta(vec);
        const phi = Vec3Math.phi(vec);
        return this.set(90 - theta * Avionics.Utils.RAD2DEG, phi * Avionics.Utils.RAD2DEG);
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    distance(arg1, arg2) {
        const other = GeoPoint.asLatLonInterface(arg1, arg2);
        return GeoPoint.distance(this.lat, this.lon, other.lat, other.lon);
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    distanceRhumb(arg1, arg2) {
        const other = GeoPoint.asLatLonInterface(arg1, arg2);
        return GeoPoint.distanceRhumb(this.lat, this.lon, other.lat, other.lon);
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    bearingTo(arg1, arg2) {
        const other = GeoPoint.asLatLonInterface(arg1, arg2);
        return GeoPoint.initialBearing(this.lat, this.lon, other.lat, other.lon);
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    bearingFrom(arg1, arg2) {
        const other = GeoPoint.asLatLonInterface(arg1, arg2);
        return GeoPoint.finalBearing(other.lat, other.lon, this.lat, this.lon);
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    bearingRhumb(arg1, arg2) {
        const other = GeoPoint.asLatLonInterface(arg1, arg2);
        return GeoPoint.bearingRhumb(this.lat, this.lon, other.lat, other.lon);
    }
    /**
     * Offsets this point by an initial bearing and distance along a great circle.
     * @param bearing The initial true bearing (forward azimuth), in degrees, by which to offset.
     * @param distance The distance, in great-arc radians, by which to offset.
     * @param out The GeoPoint to which to write the result. By default this point.
     * @returns The offset point.
     */
    offset(bearing, distance, out) {
        const latRad = this.lat * Avionics.Utils.DEG2RAD;
        const lonRad = this.lon * Avionics.Utils.DEG2RAD;
        const sinLat = Math.sin(latRad);
        const cosLat = Math.cos(latRad);
        const sinBearing = Math.sin(bearing * Avionics.Utils.DEG2RAD);
        const cosBearing = Math.cos(bearing * Avionics.Utils.DEG2RAD);
        const angularDistance = distance;
        const sinAngularDistance = Math.sin(angularDistance);
        const cosAngularDistance = Math.cos(angularDistance);
        const offsetLatRad = Math.asin(sinLat * cosAngularDistance + cosLat * sinAngularDistance * cosBearing);
        const offsetLonDeltaRad = Math.atan2(sinBearing * sinAngularDistance * cosLat, cosAngularDistance - sinLat * Math.sin(offsetLatRad));
        const offsetLat = offsetLatRad * Avionics.Utils.RAD2DEG;
        const offsetLon = (lonRad + offsetLonDeltaRad) * Avionics.Utils.RAD2DEG;
        return (out !== null && out !== void 0 ? out : this).set(offsetLat, offsetLon);
    }
    /**
     * Offsets this point by a constant bearing and distance along a rhumb line.
     * @param bearing The true bearing, in degrees, by which to offset.
     * @param distance The distance, in great-arc radians, by which to offset.
     * @param out The GeoPoint to which to write the result. By default this point.
     * @returns The offset point.
     */
    offsetRhumb(bearing, distance, out) {
        const latRad = this.lat * Avionics.Utils.DEG2RAD;
        const lonRad = this.lon * Avionics.Utils.DEG2RAD;
        const bearingRad = bearing * Avionics.Utils.DEG2RAD;
        const deltaLat = distance * Math.cos(bearingRad);
        let offsetLat = latRad + deltaLat;
        let offsetLon;
        if (Math.abs(offsetLat) >= Math.PI / 2) {
            // you can't technically go past the poles along a rhumb line, so we will simply terminate the path at the pole
            offsetLat = Math.sign(offsetLat) * 90;
            offsetLon = 0; // since longitude is meaningless at the poles, we'll arbitrarily pick a longitude of 0 degrees.
        }
        else {
            const deltaPsi = GeoPoint.deltaPsi(latRad, offsetLat);
            const correction = GeoPoint.rhumbCorrection(deltaPsi, latRad, offsetLat);
            const deltaLon = distance * Math.sin(bearingRad) / correction;
            offsetLon = lonRad + deltaLon;
            offsetLat *= Avionics.Utils.RAD2DEG;
            offsetLon *= Avionics.Utils.RAD2DEG;
        }
        return (out !== null && out !== void 0 ? out : this).set(offsetLat, offsetLon);
    }
    /**
     * Gets the antipode of this point.
     * @param out The GeoPoint to which to write the results. By default this point.
     * @returns The antipode of this point.
     */
    antipode(out) {
        return (out !== null && out !== void 0 ? out : this).set(-this._lat, this._lon + 180);
    }
    /** @inheritdoc */
    toCartesian(out) {
        return GeoPoint.sphericalToCartesian(this, out);
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    equals(arg1, arg2, arg3) {
        const other = GeoPoint.asLatLonInterface(arg1, arg2);
        if (other) {
            if (isNaN(this._lat) && isNaN(this._lon) && isNaN(other.lat) && isNaN(other.lon)) {
                return true;
            }
            const tolerance = typeof arg1 === 'number' ? arg3 : arg2;
            const distance = this.distance(other);
            return !isNaN(distance) && distance <= (tolerance !== null && tolerance !== void 0 ? tolerance : GeoPoint.EQUALITY_TOLERANCE);
        }
        else {
            return false;
        }
    }
    /** @inheritdoc */
    copy(to) {
        return to ? to.set(this.lat, this.lon) : new GeoPoint(this.lat, this.lon);
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    static sphericalToCartesian(arg1, arg2, arg3) {
        const point = GeoPoint.asLatLonInterface(arg1, arg2);
        const theta = (90 - point.lat) * Avionics.Utils.DEG2RAD;
        const phi = point.lon * Avionics.Utils.DEG2RAD;
        return Vec3Math.setFromSpherical(1, theta, phi, arg3 !== null && arg3 !== void 0 ? arg3 : arg2);
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    static equals(arg1, arg2, arg3, arg4, arg5) {
        if (arg1 instanceof Float64Array) {
            return GeoPoint.distance(arg1, arg2) <= (arg3 !== null && arg3 !== void 0 ? arg3 : GeoPoint.EQUALITY_TOLERANCE);
        }
        else if (typeof arg1 === 'number') {
            return GeoPoint.distance(arg1, arg2, arg3, arg4) <= (arg5 !== null && arg5 !== void 0 ? arg5 : GeoPoint.EQUALITY_TOLERANCE);
        }
        else {
            return GeoPoint.distance(arg1, arg2) <= (arg3 !== null && arg3 !== void 0 ? arg3 : GeoPoint.EQUALITY_TOLERANCE);
        }
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    static distance(arg1, arg2, arg3, arg4) {
        if (arg1 instanceof Float64Array) {
            return Math.acos(Utils.Clamp(Vec3Math.dot(arg1, arg2), -1, 1));
        }
        else {
            let lat1, lon1, lat2, lon2;
            if (typeof arg1 === 'number') {
                lat1 = arg1;
                lon1 = arg2;
                lat2 = arg3;
                lon2 = arg4;
            }
            else {
                lat1 = arg1.lat;
                lon1 = arg1.lon;
                lat2 = arg2.lat;
                lon2 = arg2.lon;
            }
            lat1 *= Avionics.Utils.DEG2RAD;
            lon1 *= Avionics.Utils.DEG2RAD;
            lat2 *= Avionics.Utils.DEG2RAD;
            lon2 *= Avionics.Utils.DEG2RAD;
            // haversine formula
            const sinHalfDeltaLat = Math.sin((lat2 - lat1) / 2);
            const sinHalfDeltaLon = Math.sin((lon2 - lon1) / 2);
            const a = sinHalfDeltaLat * sinHalfDeltaLat + Math.cos(lat1) * Math.cos(lat2) * sinHalfDeltaLon * sinHalfDeltaLon;
            return 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        }
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    static distanceRhumb(arg1, arg2, arg3, arg4) {
        let lat1, lon1, lat2, lon2;
        if (typeof arg1 === 'number') {
            lat1 = arg1 * Avionics.Utils.DEG2RAD;
            lon1 = arg2 * Avionics.Utils.DEG2RAD;
            lat2 = arg3 * Avionics.Utils.DEG2RAD;
            lon2 = arg4 * Avionics.Utils.DEG2RAD;
        }
        else if (arg1 instanceof Float64Array) {
            const point1 = GeoPoint.tempGeoPoint.setFromCartesian(arg1);
            lat1 = point1.lat;
            lon1 = point1.lon;
            const point2 = GeoPoint.tempGeoPoint.setFromCartesian(arg2);
            lat2 = point2.lat;
            lon2 = point2.lon;
        }
        else {
            lat1 = arg1.lat;
            lon1 = arg1.lon;
            lat2 = arg2.lat;
            lon2 = arg2.lon;
        }
        const deltaLat = lat2 - lat1;
        let deltaLon = lon2 - lon1;
        const deltaPsi = GeoPoint.deltaPsi(lat1, lat2);
        const correction = GeoPoint.rhumbCorrection(deltaPsi, lat1, lat2);
        if (Math.abs(deltaLon) > Math.PI) {
            deltaLon += -Math.sign(deltaLon) * 2 * Math.PI;
        }
        return Math.sqrt(deltaLat * deltaLat + correction * correction * deltaLon * deltaLon);
    }
    /**
     * Calculates the initial true bearing (forward azimuth) from one point to another along the great circle connecting
     * the two.
     * @param lat1 The latitude of the initial point, in degrees.
     * @param lon1 The longitude of the initial point, in degrees.
     * @param lat2 The latitude of the final point, in degrees.
     * @param lon2 The longitude of the final point, in degrees.
     * @returns The initial true bearing, in degrees, from the initial point to the final point along the great circle
     * connecting the two.
     */
    static initialBearing(lat1, lon1, lat2, lon2) {
        lat1 *= Avionics.Utils.DEG2RAD;
        lat2 *= Avionics.Utils.DEG2RAD;
        lon1 *= Avionics.Utils.DEG2RAD;
        lon2 *= Avionics.Utils.DEG2RAD;
        const cosLat2 = Math.cos(lat2);
        const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * cosLat2 * Math.cos(lon2 - lon1);
        const y = Math.sin(lon2 - lon1) * cosLat2;
        const bearing = Math.atan2(y, x) * Avionics.Utils.RAD2DEG;
        return (bearing + 360) % 360; // enforce range [0, 360)
    }
    /**
     * Calculates the final true bearing from one point to another along the great circle connecting the two.
     * @param lat1 The latitude of the initial point, in degrees.
     * @param lon1 The longitude of the initial point, in degrees.
     * @param lat2 The latitude of the final point, in degrees.
     * @param lon2 The longitude of the final point, in degrees.
     * @returns The final true bearing, in degrees, from the initial point to the final point along the great circle
     * connecting the two.
     */
    static finalBearing(lat1, lon1, lat2, lon2) {
        return (GeoPoint.initialBearing(lat2, lon2, lat1, lon1) + 180) % 360;
    }
    /**
     * Calculates the constant true bearing from one point to another along the rhumb line connecting the two.
     * @param lat1 The latitude of the initial point, in degrees.
     * @param lon1 The longitude of the initial point, in degrees.
     * @param lat2 The latitude of the final point, in degrees.
     * @param lon2 The longitude of the final point, in degrees.
     * @returns The constant true bearing, in degrees, from the initial point to the final point along the rhumb line
     * connecting the two.
     */
    static bearingRhumb(lat1, lon1, lat2, lon2) {
        lat1 *= Avionics.Utils.DEG2RAD;
        lat2 *= Avionics.Utils.DEG2RAD;
        lon1 *= Avionics.Utils.DEG2RAD;
        lon2 *= Avionics.Utils.DEG2RAD;
        let deltaLon = lon2 - lon1;
        const deltaPsi = GeoPoint.deltaPsi(lat1, lat2);
        if (Math.abs(deltaLon) > Math.PI) {
            deltaLon += -Math.sign(deltaLon) * 2 * Math.PI;
        }
        return Math.atan2(deltaLon, deltaPsi) * Avionics.Utils.RAD2DEG;
    }
    /**
     * Converts an angle, in degrees, to an equivalent value in the range [-180, 180).
     * @param angle An angle in degrees.
     * @returns The angle's equivalent in the range [-180, 180).
     */
    static toPlusMinus180(angle) {
        return ((angle % 360) + 540) % 360 - 180;
    }
    /**
     * Calculates the difference in isometric latitude from a pair of geodetic (geocentric) latitudes.
     * @param latRad1 Geodetic latitude 1, in radians.
     * @param latRad2 Geodetic latitude 2, in radians.
     * @returns The difference in isometric latitude from latitude 1 to latitude 2, in radians.
     */
    static deltaPsi(latRad1, latRad2) {
        return Math.log(Math.tan(latRad2 / 2 + Math.PI / 4) / Math.tan(latRad1 / 2 + Math.PI / 4));
    }
    /**
     * Calculates the rhumb correction factor between two latitudes.
     * @param deltaPsi The difference in isometric latitude beween the two latitudes.
     * @param latRad1 Geodetic latitude 1, in radians.
     * @param latRad2 Geodetic latitude 2, in radians.
     * @returns The rhumb correction factor between the two latitudes.
     */
    static rhumbCorrection(deltaPsi, latRad1, latRad2) {
        return Math.abs(deltaPsi) > 1e-12 ? ((latRad2 - latRad1) / deltaPsi) : Math.cos(latRad1);
    }
}
/**
 * The default equality tolerance, defined as the maximum allowed distance between two equal points in great-arc
 * radians.
 */
GeoPoint.EQUALITY_TOLERANCE = 1e-7; // ~61 cm
GeoPoint.tempVec3 = new Float64Array(3);
GeoPoint.tempGeoPoint = new GeoPoint(0, 0);

/**
 * A circle on Earth's surface, defined as the set of points on the Earth's surface equidistant (as measured
 * geodetically) from a central point.
 */
class GeoCircle {
    /**
     * Constructor.
     * @param center The center of the new small circle, represented as a position vector in the standard geographic
     * cartesian reference system.
     * @param radius The radius of the new small circle in great-arc radians.
     */
    constructor(center, radius) {
        this._center = new Float64Array(3);
        this._radius = 0;
        this._sinRadius = 0;
        this.set(center, radius);
    }
    // eslint-disable-next-line jsdoc/require-returns
    /**
     * The center of this circle.
     */
    get center() {
        return this._center;
    }
    // eslint-disable-next-line jsdoc/require-returns
    /**
     * The radius of this circle, in great-arc radians.
     */
    get radius() {
        return this._radius;
    }
    /**
     * Checks whether this circle is a great circle, or equivalently, whether its radius is equal to pi / 2 great-arc
     * radians.
     * @returns Whether this circle is a great circle.
     */
    isGreatCircle() {
        return this._radius === Math.PI / 2;
    }
    /**
     * Calculates the length of an arc along this circle subtended by a central angle.
     * @param angle A central angle, in radians.
     * @returns The length of the arc subtended by the angle, in great-arc radians.
     */
    arcLength(angle) {
        return this._sinRadius * angle;
    }
    /**
     * Calculates the central angle which subtends an arc along this circle of given length.
     * @param length An arc length, in great-arc radians.
     * @returns The central angle which subtends an arc along this circle of the given length, in radians.
     */
    angularWidth(length) {
        return length / this._sinRadius;
    }
    /**
     * Sets the center and radius of this circle.
     * @param center The new center.
     * @param radius The new radius in great-arc radians.
     * @returns this circle, after it has been changed.
     */
    set(center, radius) {
        if (center instanceof Float64Array) {
            if (Vec3Math.abs(center) === 0) {
                // if center has no direction, arbitrarily set the center to 0 N, 0 E.
                Vec3Math.set(1, 0, 0, this._center);
            }
            else {
                Vec3Math.normalize(center, this._center);
            }
        }
        else {
            GeoPoint.sphericalToCartesian(center, this._center);
        }
        this._radius = Math.abs(radius) % Math.PI;
        this._sinRadius = Math.sin(this._radius);
        return this;
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    setAsGreatCircle(arg1, arg2) {
        this.set(GeoCircle._getGreatCircleNormal(arg1, arg2, GeoCircle.vec3Cache[0]), Math.PI / 2);
        return this;
    }
    /**
     * Reverses the direction of this circle. This sets the center of the circle to its antipode and the radius to its
     * complement with `Math.PI`.
     * @returns This circle, after it has been reversed.
     */
    reverse() {
        Vec3Math.multScalar(this._center, -1, this._center);
        this._radius = Math.PI - this._radius;
        return this;
    }
    /**
     * Gets the distance from a point to the center of this circle, in great-arc radians.
     * @param point The point to which to measure the distance.
     * @returns the distance from the point to the center of this circle.
     */
    distanceToCenter(point) {
        if (point instanceof Float64Array) {
            point = Vec3Math.normalize(point, GeoCircle.vec3Cache[0]);
        }
        else {
            point = GeoPoint.sphericalToCartesian(point, GeoCircle.vec3Cache[0]);
        }
        const dot = Vec3Math.dot(point, this._center);
        return Math.acos(Utils.Clamp(dot, -1, 1));
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    closest(point, out) {
        if (!(point instanceof Float64Array)) {
            point = GeoPoint.sphericalToCartesian(point, GeoCircle.vec3Cache[0]);
        }
        const offset = Vec3Math.multScalar(this._center, Math.cos(this._radius), GeoCircle.vec3Cache[1]);
        const dot = Vec3Math.dot(Vec3Math.sub(point, offset, GeoCircle.vec3Cache[2]), this._center);
        const planeProjected = Vec3Math.sub(point, Vec3Math.multScalar(this._center, dot, GeoCircle.vec3Cache[2]), GeoCircle.vec3Cache[2]);
        if (Vec3Math.dot(planeProjected, planeProjected) === 0 || Math.abs(Vec3Math.dot(planeProjected, this._center)) === 1) {
            // the point is equidistant from all points on this circle
            return out instanceof GeoPoint ? out.set(NaN, NaN) : Vec3Math.set(NaN, NaN, NaN, out);
        }
        const displacement = Vec3Math.multScalar(Vec3Math.normalize(Vec3Math.sub(planeProjected, offset, GeoCircle.vec3Cache[2]), GeoCircle.vec3Cache[2]), Math.sin(this._radius), GeoCircle.vec3Cache[2]);
        const closest = Vec3Math.add(offset, displacement, GeoCircle.vec3Cache[2]);
        return out instanceof Float64Array ? Vec3Math.normalize(closest, out) : out.setFromCartesian(closest);
    }
    /**
     * Calculates and returns the great-circle distance from a specified point to the closest point that lies on this
     * circle. In other words, calculates the shortest distance from a point to this circle. The distance is signed, with
     * positive distances representing deviation away from the center of the circle, and negative distances representing
     * deviation toward the center of the circle.
     * @param point A point, represented as either a position vector or lat/long coordinates.
     * @returns the great circle distance, in great-arc radians, from the point to the closest point on this circle.
     */
    distance(point) {
        const distanceToCenter = this.distanceToCenter(point);
        return distanceToCenter - this._radius;
    }
    /**
     * Checks whether a point lies on this circle.
     * @param point A point, represented as either a position vector or lat/long coordinates.
     * @param tolerance The error tolerance, in great-arc radians, of this operation. Defaults to
     * `GeoCircle.ANGULAR_TOLERANCE` if not specified.
     * @returns whether the point lies on this circle.
     */
    includes(point, tolerance = GeoCircle.ANGULAR_TOLERANCE) {
        const distance = this.distance(point);
        return Math.abs(distance) < tolerance;
    }
    /**
     * Checks whether a point lies within the boundary defined by this circle. This is equivalent to checking whether
     * the distance of the point from the center of this circle is less than or equal to this circle's radius.
     * @param point A point, represented as either a position vector or lat/long coordinates.
     * @param inclusive Whether points that lie on this circle should pass the check. True by default.
     * @param tolerance The error tolerance, in great-arc radians, of this operation. Defaults to
     * `GeoCircle.ANGULAR_TOLERANCE` if not specified.
     * @returns whether the point lies within the boundary defined by this circle.
     */
    encircles(point, inclusive = true, tolerance = GeoCircle.ANGULAR_TOLERANCE) {
        const distance = this.distance(point);
        return inclusive
            ? distance <= tolerance
            : distance < -tolerance;
    }
    /**
     * Gets the angular distance along an arc between two points that lie on this circle. The arc extends from the first
     * point to the second in a counterclockwise direction when viewed from above the center of the circle.
     * @param start A point on this circle which marks the beginning of an arc.
     * @param end A point on this circle which marks the end of an arc.
     * @param tolerance The error tolerance, in great-arc radians, when checking if `start` and `end` lie on this circle.
     * Defaults to `GeoCircle.ANGULAR_TOLERANCE` if not specified.
     * @param equalityTolerance The angular tolerance for considering the start and end points to be equal, in radians.
     * If the absolute (direction-agnostic) angular distance between the start and end points is less than or equal to
     * this value, then the zero will be returned. Defaults to `0`.
     * @returns the angular width of the arc between the two points, in radians.
     * @throws Error if either point does not lie on this circle.
     */
    angleAlong(start, end, tolerance = GeoCircle.ANGULAR_TOLERANCE, equalityTolerance = 0) {
        if (!(start instanceof Float64Array)) {
            start = GeoPoint.sphericalToCartesian(start, GeoCircle.vec3Cache[1]);
        }
        if (!(end instanceof Float64Array)) {
            end = GeoPoint.sphericalToCartesian(end, GeoCircle.vec3Cache[2]);
        }
        if (!this.includes(start, tolerance) || !this.includes(end, tolerance)) {
            throw new Error(`GeoCircle: at least one of the two specified arc end points does not lie on this circle (start point distance of ${this.distance(start)}, end point distance of ${this.distance(end)}, vs tolerance of ${tolerance}).`);
        }
        if (this._radius <= GeoCircle.ANGULAR_TOLERANCE) {
            return 0;
        }
        const startRadialNormal = Vec3Math.normalize(Vec3Math.cross(this._center, start, GeoCircle.vec3Cache[3]), GeoCircle.vec3Cache[3]);
        const endRadialNormal = Vec3Math.normalize(Vec3Math.cross(this._center, end, GeoCircle.vec3Cache[4]), GeoCircle.vec3Cache[4]);
        const angularDistance = Math.acos(Utils.Clamp(Vec3Math.dot(startRadialNormal, endRadialNormal), -1, 1));
        const isArcGreaterThanSemi = Vec3Math.dot(startRadialNormal, end) < 0;
        const angle = isArcGreaterThanSemi ? MathUtils.TWO_PI - angularDistance : angularDistance;
        return angle >= MathUtils.TWO_PI - equalityTolerance || angle <= equalityTolerance ? 0 : angle;
    }
    /**
     * Gets the distance along an arc between two points that lie on this circle. The arc extends from the first point
     * to the second in a counterclockwise direction when viewed from above the center of the circle.
     * @param start A point on this circle which marks the beginning of an arc.
     * @param end A point on this circle which marks the end of an arc.
     * @param tolerance The error tolerance, in great-arc radians, when checking if `start` and `end` lie on this circle.
     * Defaults to `GeoCircle.ANGULAR_TOLERANCE` if not specified.
     * @param equalityTolerance The tolerance for considering the start and end points to be equal, in great-arc radians.
     * If the absolute (direction-agnostic) along-arc distance between the start and end points is less than or equal to
     * this value, then the zero will be returned. Defaults to `0`.
     * @returns the length of the arc between the two points, in great-arc radians.
     * @throws Error if either point does not lie on this circle.
     */
    distanceAlong(start, end, tolerance = GeoCircle.ANGULAR_TOLERANCE, equalityTolerance = 0) {
        return this.arcLength(this.angleAlong(start, end, tolerance, this.angularWidth(equalityTolerance)));
    }
    /**
     * Calculates the true bearing along this circle at a point on the circle.
     * @param point A point on this circle.
     * @param tolerance The error tolerance, in great-arc radians, when checking if `point` lies on this circle. Defaults
     * to `GeoCircle.ANGULAR_TOLERANCE` if not specified.
     * @returns the bearing along this circle at the point.
     * @throws Error if the point does not lie on this circle.
     */
    bearingAt(point, tolerance = GeoCircle.ANGULAR_TOLERANCE) {
        if (!(point instanceof Float64Array)) {
            point = GeoPoint.sphericalToCartesian(point, GeoCircle.vec3Cache[1]);
        }
        if (!this.includes(point, tolerance)) {
            throw new Error(`GeoCircle: the specified point does not lie on this circle (distance of ${Math.abs(this.distance(point))} vs tolerance of ${tolerance}).`);
        }
        if (this._radius <= GeoCircle.ANGULAR_TOLERANCE || 1 - Math.abs(Vec3Math.dot(point, GeoCircle.NORTH_POLE)) <= GeoCircle.ANGULAR_TOLERANCE) {
            // Meaningful bearings cannot be defined along a circle with 0 radius (effectively a point) and at the north and south poles.
            return NaN;
        }
        const radialNormal = Vec3Math.normalize(Vec3Math.cross(this._center, point, GeoCircle.vec3Cache[2]), GeoCircle.vec3Cache[2]);
        const northNormal = Vec3Math.normalize(Vec3Math.cross(point, GeoCircle.NORTH_POLE, GeoCircle.vec3Cache[3]), GeoCircle.vec3Cache[3]);
        return (Math.acos(Utils.Clamp(Vec3Math.dot(radialNormal, northNormal), -1, 1)) * (radialNormal[2] >= 0 ? 1 : -1) * Avionics.Utils.RAD2DEG - 90 + 360) % 360;
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    offsetDistanceAlong(point, distance, out, tolerance = GeoCircle.ANGULAR_TOLERANCE) {
        const angle = distance / Math.sin(this.radius);
        return this._offsetAngleAlong(point, angle, out, tolerance);
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    offsetAngleAlong(point, angle, out, tolerance = GeoCircle.ANGULAR_TOLERANCE) {
        return this._offsetAngleAlong(point, angle, out, tolerance);
    }
    /**
     * Offsets a point on this circle by a specified angular distance. The direction of the offset for positive distances
     * is counterclockwise when viewed from above the center of this circle.
     * @param point The point to offset.
     * @param angle The angular distance by which to offset, in radians.
     * @param out A Float64Array or GeoPoint object to which to write the result.
     * @param tolerance The error tolerance, in great-arc radians, when checking if `point` lies on this circle. Defaults
     * to `GeoCircle.ANGULAR_TOLERANCE` if not specified.
     * @returns The offset point.
     * @throws Error if the point does not lie on this circle.
     */
    _offsetAngleAlong(point, angle, out, tolerance = GeoCircle.ANGULAR_TOLERANCE) {
        if (!(point instanceof Float64Array)) {
            point = GeoPoint.sphericalToCartesian(point, GeoCircle.vec3Cache[3]);
        }
        if (!this.includes(point, tolerance)) {
            throw new Error(`GeoCircle: the specified point does not lie on this circle (distance of ${Math.abs(this.distance(point))} vs tolerance of ${tolerance}).`);
        }
        if (this.radius === 0) {
            return out instanceof GeoPoint ? out.setFromCartesian(point) : Vec3Math.copy(point, out);
        }
        // Since point may not lie exactly on this circle due to error tolerance, project point onto this circle to ensure
        // the offset point lies exactly on this circle.
        point = this.closest(point, GeoCircle.vec3Cache[3]);
        const sin = Math.sin(angle / 2);
        const q0 = Math.cos(angle / 2);
        const q1 = sin * this._center[0];
        const q2 = sin * this._center[1];
        const q3 = sin * this._center[2];
        const q0Sq = q0 * q0;
        const q1Sq = q1 * q1;
        const q2Sq = q2 * q2;
        const q3Sq = q3 * q3;
        const q01 = q0 * q1;
        const q02 = q0 * q2;
        const q03 = q0 * q3;
        const q12 = q1 * q2;
        const q13 = q1 * q3;
        const q23 = q2 * q3;
        const rot_11 = q0Sq + q1Sq - q2Sq - q3Sq;
        const rot_12 = 2 * (q12 - q03);
        const rot_13 = 2 * (q13 + q02);
        const rot_21 = 2 * (q12 + q03);
        const rot_22 = q0Sq - q1Sq + q2Sq - q3Sq;
        const rot_23 = 2 * (q23 - q01);
        const rot_31 = 2 * (q13 - q02);
        const rot_32 = 2 * (q23 + q01);
        const rot_33 = (q0Sq - q1Sq - q2Sq + q3Sq);
        const x = point[0];
        const y = point[1];
        const z = point[2];
        const rotX = rot_11 * x + rot_12 * y + rot_13 * z;
        const rotY = rot_21 * x + rot_22 * y + rot_23 * z;
        const rotZ = rot_31 * x + rot_32 * y + rot_33 * z;
        return out instanceof Float64Array
            ? Vec3Math.set(rotX, rotY, rotZ, out)
            : out.setFromCartesian(Vec3Math.set(rotX, rotY, rotZ, GeoCircle.vec3Cache[2]));
    }
    /**
     * Calculates and returns the set of intersection points between this circle and another one, and writes the results
     * to an array of position vectors.
     * @param other The other circle to test for intersections.
     * @param out An array in which to store the results. The results will be stored at indexes 0 and 1. If these indexes
     * are empty, then new Float64Array objects will be created and inserted into the array.
     * @returns The number of solutions written to the out array. Either 0, 1, or 2.
     */
    intersection(other, out) {
        const center1 = this._center;
        const center2 = other._center;
        const radius1 = this._radius;
        const radius2 = other._radius;
        /**
         * Theory: We can model geo circles as the intersection between a sphere and the unit sphere (Earth's surface).
         * Therefore, the intersection of two geo circles is the intersection between two spheres AND the unit sphere.
         * First, we find the intersection of the two non-Earth spheres (which can either be a sphere, a circle, or a
         * point), then we find the intersection of that geometry with the unit sphere.
         */
        const dot = Vec3Math.dot(center1, center2);
        const dotSquared = dot * dot;
        if (dotSquared === 1) {
            // the two circles are concentric; either there are zero solutions or infinite solutions; either way we don't
            // write any solutions to the array.
            return 0;
        }
        // find the position vector to the center of the circle which defines the intersection of the two geo circle
        // spheres.
        const a = (Math.cos(radius1) - dot * Math.cos(radius2)) / (1 - dotSquared);
        const b = (Math.cos(radius2) - dot * Math.cos(radius1)) / (1 - dotSquared);
        const intersection = Vec3Math.add(Vec3Math.multScalar(center1, a, GeoCircle.vec3Cache[0]), Vec3Math.multScalar(center2, b, GeoCircle.vec3Cache[1]), GeoCircle.vec3Cache[0]);
        const intersectionLengthSquared = Vec3Math.dot(intersection, intersection);
        if (intersectionLengthSquared > 1) {
            // the two geo circle spheres do not intersect.
            return 0;
        }
        const cross = Vec3Math.cross(center1, center2, GeoCircle.vec3Cache[1]);
        const crossLengthSquared = Vec3Math.dot(cross, cross);
        if (crossLengthSquared === 0) {
            // this technically can't happen (since we already check if center1 dot center2 === +/-1 above, but just in
            // case...)
            return 0;
        }
        const offset = Math.sqrt((1 - intersectionLengthSquared) / crossLengthSquared);
        let solutionCount = 1;
        if (!out[0]) {
            out[0] = new Float64Array(3);
        }
        out[0].set(cross);
        Vec3Math.multScalar(out[0], offset, out[0]);
        Vec3Math.add(out[0], intersection, out[0]);
        if (offset > 0) {
            if (!out[1]) {
                out[1] = new Float64Array(3);
            }
            out[1].set(cross);
            Vec3Math.multScalar(out[1], -offset, out[1]);
            Vec3Math.add(out[1], intersection, out[1]);
            solutionCount++;
        }
        return solutionCount;
    }
    /**
     * Calculates and returns the set of intersection points between this circle and another one, and writes the results
     * to an array of GeoPoint objects.
     * @param other The other circle to test for intersections.
     * @param out An array in which to store the results. The results will be stored at indexes 0 and 1. If these indexes
     * are empty, then new GeoPoint objects will be created and inserted into the array.
     * @returns The number of solutions written to the out array. Either 0, 1, or 2.
     */
    intersectionGeoPoint(other, out) {
        const solutionCount = this.intersection(other, GeoCircle.intersectionCache);
        for (let i = 0; i < solutionCount; i++) {
            if (!out[i]) {
                out[i] = new GeoPoint(0, 0);
            }
            out[i].setFromCartesian(GeoCircle.intersectionCache[i]);
        }
        return solutionCount;
    }
    /**
     * Calculates and returns the number of intersection points between this circle and another one. Returns NaN if there
     * are an infinite number of intersection points.
     * @param other The other circle to test for intersections.
     * @param tolerance The error tolerance, in great-arc radians, of this operation. Defaults to
     * `GeoCircle.ANGULAR_TOLERANCE` if not specified.
     * @returns the number of intersection points between this circle and the other one.
     */
    numIntersectionPoints(other, tolerance = GeoCircle.ANGULAR_TOLERANCE) {
        const center1 = this.center;
        const center2 = other.center;
        const radius1 = this.radius;
        const radius2 = other.radius;
        const dot = Vec3Math.dot(center1, center2);
        const dotSquared = dot * dot;
        if (dotSquared === 1) {
            // the two circles are concentric; if they are the same circle there are an infinite number of intersections,
            // otherwise there are none.
            if (dot === 1) {
                // centers are the same
                return (Math.abs(this.radius - other.radius) <= tolerance) ? NaN : 0;
            }
            else {
                // centers are antipodal
                return (Math.abs(Math.PI - this.radius - other.radius) <= tolerance) ? NaN : 0;
            }
        }
        const a = (Math.cos(radius1) - dot * Math.cos(radius2)) / (1 - dotSquared);
        const b = (Math.cos(radius2) - dot * Math.cos(radius1)) / (1 - dotSquared);
        const intersection = Vec3Math.add(Vec3Math.multScalar(center1, a, GeoCircle.vec3Cache[0]), Vec3Math.multScalar(center2, b, GeoCircle.vec3Cache[1]), GeoCircle.vec3Cache[1]);
        const intersectionLengthSquared = Vec3Math.dot(intersection, intersection);
        if (intersectionLengthSquared > 1) {
            return 0;
        }
        const cross = Vec3Math.cross(center1, center2, GeoCircle.vec3Cache[1]);
        const crossLengthSquared = Vec3Math.dot(cross, cross);
        if (crossLengthSquared === 0) {
            return 0;
        }
        const sinTol = Math.sin(tolerance);
        return ((1 - intersectionLengthSquared) / crossLengthSquared > sinTol * sinTol) ? 2 : 1;
    }
    /**
     * Creates a new small circle from a lat/long coordinate pair and radius.
     * @param point The center of the new small circle.
     * @param radius The radius of the new small circle, in great-arc radians.
     * @returns a small circle.
     */
    static createFromPoint(point, radius) {
        return new GeoCircle(GeoPoint.sphericalToCartesian(point, GeoCircle.vec3Cache[0]), radius);
    }
    static createGreatCircle(arg1, arg2) {
        return new GeoCircle(GeoCircle._getGreatCircleNormal(arg1, arg2, GeoCircle.vec3Cache[0]), Math.PI / 2);
    }
    /* eslint-enable jsdoc/require-jsdoc */
    /**
     * Creates a new great circle defined by one point and a bearing offset. The new great circle will be equivalent to
     * the path projected from the point with the specified initial bearing (forward azimuth).
     * @param point A point that lies on the new great circle.
     * @param bearing The initial bearing from the point.
     * @returns a great circle.
     */
    static createGreatCircleFromPointBearing(point, bearing) {
        return new GeoCircle(GeoCircle.getGreatCircleNormalFromPointBearing(point, bearing, GeoCircle.vec3Cache[0]), Math.PI / 2);
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    static getGreatCircleNormal(arg1, arg2, out) {
        return GeoCircle._getGreatCircleNormal(arg1, arg2, out);
    }
    /**
     * Calculates a normal vector for a great circle given two points which lie on the circle, or a point and initial bearing.
     * @param arg1 A point that lies on the great circle.
     * @param arg2 A second point that lies on the great circle, or an initial bearing from the first point.
     * @param out The vector to which to write the result.
     * @returns the normal vector for the great circle.
     */
    static _getGreatCircleNormal(arg1, arg2, out) {
        if (typeof arg2 === 'number') {
            return GeoCircle.getGreatCircleNormalFromPointBearing(arg1, arg2, out);
        }
        else {
            return GeoCircle.getGreatCircleNormalFromPoints(arg1, arg2, out);
        }
    }
    /**
     * Calculates a normal vector for a great circle given two points which lie on the cirlce.
     * @param point1 The first point that lies on the great circle.
     * @param point2 The second point that lies on the great circle.
     * @param out The vector to which to write the result.
     * @returns the normal vector for the great circle.
     */
    static getGreatCircleNormalFromPoints(point1, point2, out) {
        if (!(point1 instanceof Float64Array)) {
            point1 = GeoPoint.sphericalToCartesian(point1, GeoCircle.vec3Cache[0]);
        }
        if (!(point2 instanceof Float64Array)) {
            point2 = GeoPoint.sphericalToCartesian(point2, GeoCircle.vec3Cache[1]);
        }
        return Vec3Math.normalize(Vec3Math.cross(point1, point2, out), out);
    }
    /**
     * Calculates a normal vector for a great circle given a point and initial bearing.
     * @param point A point that lies on the great circle.
     * @param bearing The initial bearing from the point.
     * @param out The vector to which to write the result.
     * @returns the normal vector for the great circle.
     */
    static getGreatCircleNormalFromPointBearing(point, bearing, out) {
        if (point instanceof Float64Array) {
            point = GeoCircle.tempGeoPoint.setFromCartesian(point);
        }
        const lat = point.lat * Avionics.Utils.DEG2RAD;
        const long = point.lon * Avionics.Utils.DEG2RAD;
        bearing *= Avionics.Utils.DEG2RAD;
        const sinLat = Math.sin(lat);
        const sinLon = Math.sin(long);
        const cosLon = Math.cos(long);
        const sinBearing = Math.sin(bearing);
        const cosBearing = Math.cos(bearing);
        const x = sinLon * cosBearing - sinLat * cosLon * sinBearing;
        const y = -cosLon * cosBearing - sinLat * sinLon * sinBearing;
        const z = Math.cos(lat) * sinBearing;
        return Vec3Math.set(x, y, z, out);
    }
}
GeoCircle.ANGULAR_TOLERANCE = 1e-7; // ~61cm
GeoCircle.NORTH_POLE = new Float64Array([0, 0, 1]);
GeoCircle.tempGeoPoint = new GeoPoint(0, 0);
GeoCircle.vec3Cache = [new Float64Array(3), new Float64Array(3), new Float64Array(3), new Float64Array(3), new Float64Array(3)];
GeoCircle.intersectionCache = [new Float64Array(3), new Float64Array(3)];

/**
 * Navigational mathematics functions.
 */
class NavMath {
    /**
     * Clamps a value to a min and max.
     * @param val The value to clamp.
     * @param min The minimum value to clamp to.
     * @param max The maximum value to clamp to.
     * @returns The clamped value.
     */
    static clamp(val, min, max) {
        return Math.min(Math.max(val, min), max);
    }
    /**
     * Normalizes a heading to a 0-360 range.
     * @param heading The heading to normalize.
     * @returns The normalized heading.
     */
    static normalizeHeading(heading) {
        if (isFinite(heading)) {
            return (heading % 360 + 360) % 360;
        }
        else {
            console.error(`normalizeHeading: Invalid heading: ${heading}`);
            return NaN;
        }
    }
    /**
     * Inverts a heading value by adding 180 and normalizing.
     * @param heading The heading to invert/reciprocate.
     * @returns The inverted/reciprocated heading.
     * */
    static reciprocateHeading(heading) {
        return NavMath.normalizeHeading(heading + 180);
    }
    /**
     * Gets the turn radius for a given true airspeed.
     * @param airspeedTrue The true airspeed of the plane, in knots.
     * @param bankAngle The bank angle of the plane, in degrees.
     * @returns The airplane turn radius, in meters.
     */
    static turnRadius(airspeedTrue, bankAngle) {
        return (Math.pow(airspeedTrue, 2) / (11.26 * Math.tan(bankAngle * Avionics.Utils.DEG2RAD)))
            / 3.2808399;
    }
    /**
     * Gets the required bank angle for a given true airspeed and turn radius.
     * @param airspeedTrue The true airspeed of the plane, in knots.
     * @param radius The airplane turn radius, in meters.
     * @returns The required bank angle, in degrees.
     */
    static bankAngle(airspeedTrue, radius) {
        const airspeedMS = airspeedTrue * 0.51444444;
        return Math.atan(Math.pow(airspeedMS, 2) / (radius * 9.80665)) * Avionics.Utils.RAD2DEG;
    }
    /**
     * Get the turn direction for a given course change.
     * @param startCourse The start course.
     * @param endCourse The end course.
     * @returns The turn direction for the course change.
     */
    static getTurnDirection(startCourse, endCourse) {
        return NavMath.normalizeHeading(endCourse - startCourse) > 180 ? 'left' : 'right';
    }
    /**
     * Converts polar radians to degrees north.
     * @param radians The radians to convert.
     * @returns The angle, in degrees north.
     */
    static polarToDegreesNorth(radians) {
        return NavMath.normalizeHeading((180 / Math.PI) * (Math.PI / 2 - radians));
    }
    /**
     * Converts degrees north to polar radians.
     * @param degrees The degrees to convert.
     * @returns The angle radians, in polar.
     */
    static degreesNorthToPolar(degrees) {
        return NavMath.normalizeHeading(degrees - 90) / (180 / Math.PI);
    }
    /**
     * Calculates the distance along an arc on Earth's surface. The arc begins at the intersection of the great circle
     * passing through the center of a circle of radius `radius` meters in the direction of 'startBearing', and ends at
     * the intersection of the great circle passing through the center of the circle in the direction of 'endBearing',
     * proceeding clockwise (as viewed from above).
     * @param startBearing The degrees of the start of the arc.
     * @param endBearing The degrees of the end of the arc.
     * @param radius The radius of the arc, in meters.
     * @returns The arc distance.
     */
    static calculateArcDistance(startBearing, endBearing, radius) {
        const angularWidth = ((endBearing - startBearing + 360) % 360) * Avionics.Utils.DEG2RAD;
        const conversion = UnitType.GA_RADIAN.convertTo(1, UnitType.METER);
        return angularWidth * Math.sin(radius / conversion) * conversion;
    }
    /**
     * Calculates the intersection of a line and a circle.
     * @param x1 The start x of the line.
     * @param y1 The start y of the line.
     * @param x2 The end x of the line.
     * @param y2 The end y of the line.
     * @param cx The circle center x.
     * @param cy The circle center y.
     * @param r The radius of the circle.
     * @param sRef The reference to the solution object to write the solution to.
     * @returns The number of solutions (0, 1 or 2).
     */
    static circleIntersection(x1, y1, x2, y2, cx, cy, r, sRef) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const a = dx * dx + dy * dy;
        const b = 2 * (dx * (x1 - cx) + dy * (y1 - cy));
        const c = (x1 - cx) * (x1 - cx) + (y1 - cy) * (y1 - cy) - r * r;
        const det = b * b - 4 * a * c;
        if (a < 0.0000001 || det < 0) {
            sRef.x1 = NaN;
            sRef.x2 = NaN;
            sRef.y1 = NaN;
            sRef.y2 = NaN;
            return 0;
        }
        else if (det == 0) {
            const t = -b / (2 * a);
            sRef.x1 = x1 + t * dx;
            sRef.y1 = y1 + t * dy;
            sRef.x2 = NaN;
            sRef.y2 = NaN;
            return 1;
        }
        else {
            const t1 = ((-b + Math.sqrt(det)) / (2 * a));
            sRef.x1 = x1 + t1 * dx;
            sRef.y1 = y1 + t1 * dy;
            const t2 = ((-b - Math.sqrt(det)) / (2 * a));
            sRef.x2 = x1 + t2 * dx;
            sRef.y2 = y1 + t2 * dy;
            return 2;
        }
    }
    /**
     * Gets the degrees north that a point lies on a circle.
     * @param cx The x point of the center of the circle.
     * @param cy The y point of the center of the circle.
     * @param x The x point to get the bearing for.
     * @param y The y point to get the bearing for.
     * @returns The angle in degrees north that the point is relative to the center.
     */
    static northAngle(cx, cy, x, y) {
        return NavMath.polarToDegreesNorth(Math.atan2(y - cy, x - cx));
    }
    /**
     * Checks if a degrees north bearing is between two other degrees north bearings.
     * @param bearing The bearing in degrees north to check.
     * @param start The start bearing in degrees north.
     * @param end The end bearing, in degrees north.
     * @returns True if the bearing is between the two provided bearings, false otherwise.
     */
    static bearingIsBetween(bearing, start, end) {
        const range = this.normalizeHeading(end - start);
        const relativeBearing = this.normalizeHeading(bearing - start);
        return relativeBearing >= 0 && relativeBearing <= range;
    }
    /**
     * Converts a degrees north heading to a degrees north turn circle angle.
     * @param heading The heading to convert.
     * @param turnDirection The direction of the turn.
     * @returns A degrees north turn circle angle.
     */
    static headingToAngle(heading, turnDirection) {
        return NavMath.normalizeHeading(heading + (turnDirection === 'left' ? 90 : -90));
    }
    /**
     * Converts a degrees north turn circle angle to a degrees north heading.
     * @param angle The turn circle angle to convert.
     * @param turnDirection The direction of the turn.
     * @returns A degrees north heading.
     */
    static angleToHeading(angle, turnDirection) {
        return NavMath.normalizeHeading(angle + (turnDirection === 'left' ? -90 : 90));
    }
    /**
     * Calculates the wind correction angle.
     * @param course The current plane true course.
     * @param airspeedTrue The current plane true airspeed.
     * @param windDirection The direction of the wind, in degrees true.
     * @param windSpeed The current speed of the wind.
     * @returns The calculated wind correction angle.
     */
    static windCorrectionAngle(course, airspeedTrue, windDirection, windSpeed) {
        const currCrosswind = windSpeed * (Math.sin((course * Math.PI / 180) - (windDirection * Math.PI / 180)));
        const windCorrection = 180 * Math.asin(currCrosswind / airspeedTrue) / Math.PI;
        return windCorrection;
    }
    /**
     * Calculates the cross track deviation from the provided leg fixes.
     * @param start The location of the starting fix of the leg.
     * @param end The location of the ending fix of the leg.
     * @param pos The current plane location coordinates.
     * @returns The amount of cross track deviation, in nautical miles.
     */
    static crossTrack(start, end, pos) {
        const path = NavMath.geoCircleCache[0].setAsGreatCircle(start, end);
        if (isNaN(path.center[0])) {
            return NaN;
        }
        return UnitType.GA_RADIAN.convertTo(path.distance(pos), UnitType.NMILE);
    }
    /**
     * Calculates the along-track distance from a starting point to another point along a great-circle track running
     * through the starting point.
     * @param start The start of the great-circle track.
     * @param end The end of the great-circle track.
     * @param pos The point for which to calculate the along-track distance.
     * @returns The along-track distance, in nautical miles.
     */
    static alongTrack(start, end, pos) {
        const path = NavMath.geoCircleCache[0].setAsGreatCircle(start, end);
        if (isNaN(path.center[0])) {
            return NaN;
        }
        const distance = path.distanceAlong(start, path.closest(pos, NavMath.vec3Cache[0]));
        return UnitType.GA_RADIAN.convertTo((distance + Math.PI) % (2 * Math.PI) - Math.PI, UnitType.NMILE);
    }
    /**
     * Calculates the desired track from the provided leg fixes.
     * @param start The location of the starting fix of the leg.
     * @param end The location of the ending fix of the leg.
     * @param pos The current plane location coordinates.
     * @returns The desired track, in degrees true.
     */
    static desiredTrack(start, end, pos) {
        const path = NavMath.geoCircleCache[0].setAsGreatCircle(start, end);
        if (isNaN(path.center[0])) {
            return NaN;
        }
        return path.bearingAt(path.closest(pos, NavMath.vec3Cache[0]));
    }
    /**
     * Gets the desired track for a given arc.
     * @param center The center of the arc.
     * @param turnDirection The direction of the turn.
     * @param pos The current plane position.
     * @returns The desired track.
     */
    static desiredTrackArc(center, turnDirection, pos) {
        const northAngle = NavMath.geoPointCache[0].set(pos).bearingFrom(center);
        //TODO: Clamp the arc angle to the start and end angles
        return NavMath.angleToHeading(northAngle, turnDirection);
    }
    /**
     * Gets the percentage along the arc path that the plane currently is.
     * @param start The start of the arc, in degrees north.
     * @param end The end of the arc, in degrees north.
     * @param center The center location of the arc.
     * @param turnDirection The direction of the turn.
     * @param pos The current plane position.
     * @returns The percentage along the arc the plane is.
     */
    static percentAlongTrackArc(start, end, center, turnDirection, pos) {
        const bearingFromCenter = NavMath.geoPointCache[0].set(center).bearingTo(pos);
        const sign = turnDirection === 'right' ? 1 : -1;
        const alpha = ((end - start) * sign + 360) % 360;
        const mid = (start + alpha / 2 * sign + 360) % 360;
        const rotBearing = ((bearingFromCenter - mid) + 540) % 360 - 180;
        const frac = rotBearing * sign / alpha + 0.5;
        return frac;
    }
    /**
     * Gets a position given an arc and a distance from the arc start.
     * @param start The start bearing of the arc.
     * @param center The center of the arc.
     * @param radius The radius of the arc.
     * @param turnDirection The turn direction for the arc.
     * @param distance The distance along the arc to get the position for.
     * @param out The position to write to.
     * @returns The position along the arc that was written to.
     */
    static positionAlongArc(start, center, radius, turnDirection, distance, out) {
        const convertedRadius = UnitType.GA_RADIAN.convertTo(Math.sin(UnitType.METER.convertTo(radius, UnitType.GA_RADIAN)), UnitType.METER);
        const theta = UnitType.RADIAN.convertTo(distance / convertedRadius, UnitType.DEGREE);
        const bearing = turnDirection === 'right' ? start + theta : start - theta;
        center.offset(NavMath.normalizeHeading(bearing), UnitType.METER.convertTo(radius, UnitType.GA_RADIAN), out);
        return out;
    }
    /**
     * Gets the cross track distance for a given arc.
     * @param center The center of the arc.
     * @param radius The radius of the arc, in meters.
     * @param pos The current plane position.
     * @returns The cross track distance, in NM.
     */
    static crossTrackArc(center, radius, pos) {
        return UnitType.METER.convertTo(radius, UnitType.NMILE) - UnitType.GA_RADIAN.convertTo(NavMath.geoPointCache[0].set(pos).distance(center), UnitType.NMILE);
    }
    /**
     * Gets the total difference in degrees between two angles.
     * @param a The first angle.
     * @param b The second angle.
     * @returns The difference between the two angles, in degrees.
     */
    static diffAngle(a, b) {
        let diff = b - a;
        while (diff > 180) {
            diff -= 360;
        }
        while (diff <= -180) {
            diff += 360;
        }
        return diff;
    }
    /**
     * Finds side a given sides b, c, and angles beta, gamma.
     * @param b The length of side b, as a trigonometric ratio.
     * @param c The length of side c, as a trigonometric ratio.
     * @param beta The angle, in radians, of the opposite of side b.
     * @param gamma The angle, in radians, of the opposite of side c
     * @returns The length of side a, as a trigonometric ratio.
     */
    static napierSide(b, c, beta, gamma) {
        return 2 * Math.atan(Math.tan(0.5 * (b - c))
            * (Math.sin(0.5 * (beta + gamma)) / Math.sin(0.5 * (beta - gamma))));
    }
    /**
     * Calculates a normal vector to a provided course in degrees north.
     * @param course The course in degrees north.
     * @param turnDirection The direction of the turn to orient the normal.
     * @param outVector The normal vector for the provided course.
     */
    static normal(course, turnDirection, outVector) {
        const normalCourse = NavMath.headingToAngle(course, turnDirection);
        const polarCourse = NavMath.degreesNorthToPolar(normalCourse);
        outVector[0] = Math.cos(polarCourse);
        outVector[1] = Math.sin(polarCourse);
    }
}
NavMath.vec3Cache = [new Float64Array(3)];
NavMath.geoPointCache = [new GeoPoint(0, 0), new GeoPoint(0, 0)];
NavMath.geoCircleCache = [new GeoCircle(new Float64Array(3), 0)];

/// <reference types="@microsoft/msfs-types/coherent/facilities" />
/**
 * A utility class for working with magnetic variation (magnetic declination).
 */
class MagVar {
    // eslint-disable-next-line jsdoc/require-jsdoc
    static get(arg1, arg2) {
        return MagVar.getMagVar(arg1, arg2);
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    static magneticToTrue(bearing, arg1, arg2) {
        return NavMath.normalizeHeading(bearing + (typeof arg1 === 'number' && arg2 === undefined ? arg1 : MagVar.getMagVar(arg1, arg2)));
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    static trueToMagnetic(bearing, arg1, arg2) {
        return NavMath.normalizeHeading(bearing - (typeof arg1 === 'number' && arg2 === undefined ? arg1 : MagVar.getMagVar(arg1, arg2)));
    }
    /**
     * Gets the magnetic variation (magnetic declination) at a specific point on Earth.
     * @param arg1 The query point, or the latitude of the query point.
     * @param arg2 The longitude of the query point.
     * @returns The magnetic variation (magnetic declination) at the point.
     */
    static getMagVar(arg1, arg2) {
        if (typeof Facilities === 'undefined') {
            // In case this code is executed before the Facilities class is created.
            return 0;
        }
        let lat, lon;
        if (typeof arg1 === 'number') {
            lat = arg1;
            lon = arg2;
        }
        else {
            lat = arg1.lat;
            lon = arg1.lon;
        }
        return Facilities.getMagVar(lat, lon);
    }
}

/**
 * A Subject which provides a {@link GeoPointInterface} value.
 */
class GeoPointSubject extends AbstractSubscribable {
    /**
     * Constructor.
     * @param value The value of this subject.
     * @param tolerance The tolerance of this subject's equality check, defined as the maximum allowed great-circle
     * distance between two equal points in great-arc radians. Defaults to {@link GeoPoint.EQUALITY_TOLERANCE}.
     */
    constructor(value, tolerance) {
        super();
        this.value = value;
        this.tolerance = tolerance;
        /** @inheritdoc */
        this.isMutableSubscribable = true;
    }
    /**
     * Creates a GeoPointSubject.
     * @param initialVal The initial value.
     * @param tolerance The tolerance of the subject's equality check, defined as the maximum allowed great-circle
     * distance between two equal points in great-arc radians. Defaults to {@link GeoPoint.EQUALITY_TOLERANCE}.
     * @returns A GeoPointSubject.
     */
    static create(initialVal, tolerance) {
        return new GeoPointSubject(initialVal, tolerance);
    }
    /**
     * Creates a GeoPointSubject.
     * @param initialVal The initial value.
     * @returns A GeoPointSubject.
     * @deprecated Use `GeoPointSubject.create()` instead.
     */
    static createFromGeoPoint(initialVal) {
        return new GeoPointSubject(initialVal);
    }
    /** @inheritdoc */
    get() {
        return this.value.readonly;
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    set(arg1, arg2) {
        const isArg1Number = typeof arg1 === 'number';
        const equals = isArg1Number ? this.value.equals(arg1, arg2, this.tolerance) : this.value.equals(arg1, this.tolerance);
        if (!equals) {
            isArg1Number ? this.value.set(arg1, arg2) : this.value.set(arg1);
            this.notify();
        }
    }
}

/**
 * A partial implementation of a MutableGeoProjection. Subclasses should use the projectRaw() and invertRaw() methods
 * to define the type of projection to be implemented.
 */
class AbstractGeoProjection {
    constructor() {
        this.center = new GeoPoint(0, 0);
        this.centerTranslation = new Float64Array(2);
        this.scaleFactor = UnitType.GA_RADIAN.convertTo(1, UnitType.NMILE); // 1 pixel = 1 nautical mile
        this.preRotation = new Float64Array(3);
        this.translation = new Float64Array(2);
        this.postRotation = 0;
        this.rotationSin = 0;
        this.rotationCos = 1;
        this.reflectY = 1;
        this.preRotationForwardTransform = new Transform3D();
        this.preRotationReverseTransform = new Transform3D();
        this.rotationCache = [new Transform3D(), new Transform3D()];
    }
    /** @inheritdoc */
    getCenter() {
        return this.center.readonly;
    }
    /** @inheritdoc */
    getScaleFactor() {
        return this.scaleFactor;
    }
    /** @inheritdoc */
    getPreRotation() {
        return this.preRotation;
    }
    /** @inheritdoc */
    getTranslation() {
        return this.translation;
    }
    /** @inheritdoc */
    getPostRotation() {
        return this.postRotation;
    }
    /** @inheritdoc */
    getReflectY() {
        return this.reflectY === -1;
    }
    /** @inheritdoc */
    setCenter(point) {
        this.center.set(point);
        this.updateCenterTranslation();
        return this;
    }
    /** @inheritdoc */
    setScaleFactor(factor) {
        this.scaleFactor = factor;
        return this;
    }
    /** @inheritdoc */
    setPreRotation(vec) {
        this.preRotation.set(vec);
        this.updatePreRotationTransforms();
        this.updateCenterTranslation();
        return this;
    }
    /** @inheritdoc */
    setTranslation(vec) {
        this.translation.set(vec);
        return this;
    }
    /** @inheritdoc */
    setPostRotation(rotation) {
        this.postRotation = rotation;
        this.rotationCos = Math.cos(rotation);
        this.rotationSin = Math.sin(rotation);
        return this;
    }
    /** @inheritdoc */
    setReflectY(val) {
        this.reflectY = val ? -1 : 1;
        return this;
    }
    /** @inheritdoc */
    copyParametersFrom(other) {
        return this.setCenter(other.getCenter())
            .setPreRotation(other.getPreRotation())
            .setScaleFactor(other.getScaleFactor())
            .setTranslation(other.getTranslation())
            .setPostRotation(other.getPostRotation())
            .setReflectY(other.getReflectY());
    }
    /**
     * Updates the pre-rotation transformation matrices.
     */
    updatePreRotationTransforms() {
        const phi = this.preRotation[1];
        const gamma = this.preRotation[2];
        this.rotationCache[0].toRotationX(gamma);
        this.rotationCache[1].toRotationY(-phi);
        Transform3D.concat(this.preRotationForwardTransform, this.rotationCache);
        this.preRotationReverseTransform.set(this.preRotationForwardTransform);
        this.preRotationReverseTransform.invert();
    }
    /**
     * Updates the translation vector to move the center of this projection to the origin.
     */
    updateCenterTranslation() {
        const centerArray = AbstractGeoProjection.vec2Cache[0];
        centerArray[0] = this.center.lon;
        centerArray[1] = this.center.lat;
        this.preRotateForward(centerArray, centerArray);
        this.projectRaw(centerArray, this.centerTranslation);
    }
    /**
     * Applies a forward rotation to a set of lat/lon coordinates using this projection's pre-projection rotation angles.
     * @param vec - the lat/lon coordinates to rotate, as a vector ([long, lat]).
     * @param out - the vector to which to write the result.
     * @returns the rotated lat/lon coordinates.
     */
    preRotateForward(vec, out) {
        const lambda = this.preRotation[0];
        const phi = this.preRotation[1];
        const gamma = this.preRotation[2];
        if (lambda === 0 && phi === 0 && gamma === 0) {
            out.set(vec);
            return out;
        }
        const lat = vec[1];
        const lon = vec[0];
        const rotatedLon = ((lon + lambda * Avionics.Utils.RAD2DEG) % 360 + 540) % 360 - 180; // enforce [-180, 180)
        if (phi === 0 && gamma === 0) {
            return Vec2Math.set(rotatedLon, lat, out);
        }
        const cartesianVec = GeoPoint.sphericalToCartesian(lat, rotatedLon, AbstractGeoProjection.vec3Cache[0]);
        const rotatedCartesianVec = this.preRotationForwardTransform.apply(cartesianVec, cartesianVec);
        const rotated = AbstractGeoProjection.geoPointCache[0].setFromCartesian(rotatedCartesianVec);
        return Vec2Math.set(rotated.lon, rotated.lat, out);
    }
    /**
     * Applies a reverse rotation to a set of lat/lon coordinates using this projection's pre-projection rotation angles.
     * @param vec - the lat/lon coordinates to rotate, as a vector ([long, lat]).
     * @param out - the vector to which to write the result.
     * @returns the rotated lat/lon coordinates.
     */
    preRotateReverse(vec, out) {
        const lambda = this.preRotation[0];
        const phi = this.preRotation[1];
        const gamma = this.preRotation[2];
        if (lambda === 0 && phi === 0 && gamma === 0) {
            out.set(vec);
            return out;
        }
        const lat = vec[1];
        const lon = vec[0];
        let rotatedLat = lat;
        let rotatedLon = lon;
        if (phi !== 0 || gamma !== 0) {
            const rotatedCartesianVec = GeoPoint.sphericalToCartesian(rotatedLat, rotatedLon, AbstractGeoProjection.vec3Cache[0]);
            const cartesianVec = this.preRotationReverseTransform.apply(rotatedCartesianVec, rotatedCartesianVec);
            const unrotated = AbstractGeoProjection.geoPointCache[0].setFromCartesian(cartesianVec);
            rotatedLat = unrotated.lat;
            rotatedLon = unrotated.lon;
        }
        rotatedLon = ((rotatedLon - lambda * Avionics.Utils.RAD2DEG) % 360 + 540) % 360 - 180; // enforce [-180, 180)
        return Vec2Math.set(rotatedLon, rotatedLat, out);
    }
    /** @inheritdoc */
    project(point, out) {
        if (point instanceof Float64Array) {
            out.set(point);
        }
        else {
            out[0] = point.lon;
            out[1] = point.lat;
        }
        this.preRotateForward(out, out);
        this.projectRaw(out, out);
        // translate projected center point to origin
        out[0] -= this.centerTranslation[0];
        out[1] -= this.centerTranslation[1];
        // apply y-reflection
        out[1] *= this.reflectY;
        // apply scale factor
        out[0] *= this.scaleFactor;
        out[1] *= this.scaleFactor;
        // apply post-projection rotation
        const x = out[0];
        const y = out[1];
        out[0] = x * this.rotationCos - y * this.rotationSin;
        out[1] = x * this.rotationSin + y * this.rotationCos;
        // apply post-projection translation
        out[0] += this.translation[0];
        out[1] += this.translation[1];
        return out;
    }
    /** @inheritdoc */
    invert(vec, out) {
        const projected = AbstractGeoProjection.vec2Cache[0];
        projected.set(vec);
        // invert post-projection translation
        projected[0] -= this.translation[0];
        projected[1] -= this.translation[1];
        // invert post-projection rotation
        const x = projected[0];
        const y = projected[1];
        projected[0] = x * this.rotationCos + y * this.rotationSin;
        projected[1] = -x * this.rotationSin + y * this.rotationCos;
        // invert scale factor
        projected[0] /= this.scaleFactor;
        projected[1] /= this.scaleFactor;
        // invert y-reflection
        projected[1] *= this.reflectY;
        // translate projected center point to default projected position
        projected[0] += this.centerTranslation[0];
        projected[1] += this.centerTranslation[1];
        const inverted = this.invertRaw(projected, projected);
        this.preRotateReverse(inverted, inverted);
        if (out instanceof Float64Array) {
            out.set(inverted);
            return out;
        }
        else {
            return out.set(inverted[1], inverted[0]);
        }
    }
}
AbstractGeoProjection.vec2Cache = [new Float64Array(2)];
AbstractGeoProjection.vec3Cache = [new Float64Array(3)];
AbstractGeoProjection.geoPointCache = [new GeoPoint(0, 0)];
/**
 * A Mercator projection.
 */
class MercatorProjection extends AbstractGeoProjection {
    /**
     * Applies a raw projection.
     * @param vec - a [lon, lat] vector describing the geographic point to project.
     * @param out - a 2D vector to which to write the result.
     * @returns the projected point.
     */
    projectRaw(vec, out) {
        out[0] = vec[0] * Avionics.Utils.DEG2RAD;
        out[1] = Math.log(Math.tan((90 + vec[1]) * Avionics.Utils.DEG2RAD / 2));
        return out;
    }
    /**
     * Inverts a raw projection.
     * @param vec - a 2D vector describing the projected point to invert.
     * @param out - a 2D vector to which to write the result.
     * @returns the inverted point.
     */
    invertRaw(vec, out) {
        out[0] = vec[0] * Avionics.Utils.RAD2DEG;
        out[1] = 2 * Math.atan(Math.exp(vec[1])) * Avionics.Utils.RAD2DEG - 90;
        return out;
    }
}

/**
 * Resamples projected great- and small-circle paths between defined endpoints into series of straight line segments and circular arcs.
 */
class GeoCircleResampler {
    /**
     * Constructor.
     * @param minDistance The minimum great-circle distance this resampler enforces between two adjacent resampled
     * points, in great-arc radians.
     * @param dpTolerance The Douglas-Peucker tolerance, in pixels, this resampler uses when deciding whether to discard
     * a resampled point during the simplification process.
     * @param maxDepth The maximum depth of the resampling algorithm used by this resampler. The number of resampled
     * points is bounded from above by `2^[maxDepth] - 1`.
     */
    constructor(minDistance, dpTolerance, maxDepth) {
        this.minDistance = minDistance;
        this.dpTolerance = dpTolerance;
        this.maxDepth = maxDepth;
        this.geoPointCache = [new GeoPoint(0, 0), new GeoPoint(0, 0)];
        this.vec2Cache = [new Float64Array(2), new Float64Array(2), new Float64Array(2)];
        this.vec3Cache = [new Float64Array(3), new Float64Array(3), new Float64Array(3), new Float64Array(3), new Float64Array(3)];
        this.startVector = {
            type: 'start',
            point: new GeoPoint(0, 0),
            projected: new Float64Array(2),
            index: 0
        };
        this.lineVector = {
            type: 'line',
            point: new GeoPoint(0, 0),
            projected: new Float64Array(2),
            index: 0
        };
        this.arcVector = {
            type: 'arc',
            point: new GeoPoint(0, 0),
            projected: new Float64Array(2),
            projectedArcCenter: new Float64Array(2),
            projectedArcRadius: 0,
            projectedArcStartAngle: 0,
            projectedArcEndAngle: 0,
            index: 0
        };
        this.state = {
            index: 0,
            prevX: 0,
            prevY: 0,
            vectorType: 'line',
            arcCenterX: 0,
            arcCenterY: 0,
            arcRadius: 0,
            isArcCounterClockwise: false
        };
        this.cosMinDistance = Math.cos(minDistance);
        this.dpTolSq = dpTolerance * dpTolerance;
    }
    /**
     * Resamples a projected great- or small-circle path.
     * @param projection The projection to use.
     * @param circle The geo circle along which the path lies.
     * @param start The start of the path.
     * @param end The end of the path.
     * @param handler A function to handle the resampled points. The function is called once for each resampled point,
     * in order.
     */
    resample(projection, circle, start, end, handler) {
        let startPoint, startVec, endPoint, endVec;
        if (start instanceof Float64Array) {
            startPoint = this.geoPointCache[0].setFromCartesian(start);
            startVec = start;
        }
        else {
            startPoint = start;
            startVec = GeoPoint.sphericalToCartesian(start, this.vec3Cache[0]);
        }
        if (end instanceof Float64Array) {
            endPoint = this.geoPointCache[0].setFromCartesian(end);
            endVec = end;
        }
        else {
            endPoint = end;
            endVec = GeoPoint.sphericalToCartesian(end, this.vec3Cache[1]);
        }
        const startLat = startPoint.lat;
        const startLon = startPoint.lon;
        const endLat = endPoint.lat;
        const endLon = endPoint.lon;
        const startProjected = projection.project(start, this.vec2Cache[0]);
        const endProjected = projection.project(end, this.vec2Cache[1]);
        const startX = startProjected[0];
        const startY = startProjected[1];
        const endX = endProjected[0];
        const endY = endProjected[1];
        this.startVector.point.set(startLat, startLon);
        Vec2Math.copy(startProjected, this.startVector.projected);
        handler(this.startVector);
        this.state.index = 1;
        this.state.prevX = startX;
        this.state.prevY = startY;
        this.state.vectorType = 'line';
        const state = this.resampleHelper(projection, circle, startLat, startLon, startVec[0], startVec[1], startVec[2], startX, startY, endLat, endLon, endVec[0], endVec[1], endVec[2], endX, endY, handler, 0, this.state);
        this.callHandler(handler, endLat, endLon, endX, endY, state);
    }
    /**
     * Resamples a projected great- or small-circle path. This method will recursively split the path into two halves
     * and resample the midpoint. Based on the projected position of the midpoint relative to those of the start and end
     * points, the projected path is modeled as either a straight line from the start to the end or a circular arc
     * connecting the start, end, and midpoints. Recursion continues as long as the maximum depth has not been reached
     * and at least one of the following conditions is met:
     * * The distance from the midpoint to the endpoints is greater than or equal to the minimum resampling distance.
     * * If the path is modeled as a line: the distance from the projected midpoint to the model line is greater than
     * this resampler's Douglas-Peucker tolerance.
     * * If the path is modeled as an arc: the distance from the projected one-quarter or the three-quarter point along
     * the path to the model arc is greater than this resampler's Douglas-Peucker tolerance.
     * @param projection The projection to use.
     * @param circle The geo circle along which the path lies.
     * @param lat1 The latitude of the start of the path, in degrees.
     * @param lon1 The longitude of the start of the path, in degrees.
     * @param x1 The x-component of the Cartesian position vector of the start of the path.
     * @param y1 The y-component of the Cartesian position vector of the start of the path.
     * @param z1 The z-component of the Cartesian position vector of the start of the path.
     * @param projX1 The x-component of the projected location of the start of the path, in pixels.
     * @param projY1 The y-component of the projected location of the start of the path, in pixels.
     * @param lat2 The latitude of the end of the path, in degrees.
     * @param lon2 The longitude of the end of the path, in degrees.
     * @param x2 The x-component of the Cartesian position vector of the end of the path.
     * @param y2 The y-component of the Cartesian position vector of the end of the path.
     * @param z2 The z-component of the Cartesian position vector of the end of the path.
     * @param projX2 The x-component of the projected location of the end of the path, in pixels.
     * @param projY2 The y-component of the projected location of the end of the path, in pixels.
     * @param handler A function to handle the resampled points.
     * @param depth The current depth of the resampling algorithm.
     * @param state The current state of the resampling algorithm.
     * @returns The index of the next resampled point.
     */
    resampleHelper(projection, circle, lat1, lon1, x1, y1, z1, projX1, projY1, lat2, lon2, x2, y2, z2, projX2, projY2, handler, depth, state) {
        if (depth >= this.maxDepth) {
            return state;
        }
        const startVec = Vec3Math.set(x1, y1, z1, this.vec3Cache[0]);
        const endVec = Vec3Math.set(x2, y2, z2, this.vec3Cache[1]);
        const angularWidth = circle.angleAlong(startVec, endVec, Math.PI);
        if (angularWidth <= GeoCircle.ANGULAR_TOLERANCE) {
            return state;
        }
        const midVec = circle.offsetAngleAlong(startVec, angularWidth / 2, this.vec3Cache[2]);
        const startProjected = Vec2Math.set(projX1, projY1, this.vec2Cache[0]);
        const endProjected = Vec2Math.set(projX2, projY2, this.vec2Cache[1]);
        const deltaProjected = Vec2Math.sub(endProjected, startProjected, this.vec2Cache[2]);
        const deltaProjectedDot = Vec2Math.dot(deltaProjected, deltaProjected);
        const midPoint = this.geoPointCache[0].setFromCartesian(midVec);
        const midProjected = projection.project(midPoint, this.vec2Cache[2]);
        const lat0 = midPoint.lat;
        const lon0 = midPoint.lon;
        const x0 = midVec[0];
        const y0 = midVec[1];
        const z0 = midVec[2];
        const projX0 = midProjected[0];
        const projY0 = midProjected[1];
        const A = projX2 - projX1;
        const B = projY2 - projY1;
        const C = projX1 * projX1 - projX2 * projX2 + projY1 * projY1 - projY2 * projY2;
        const D = projX0 - projX1;
        const E = projY0 - projY1;
        const F = projX1 * projX1 - projX0 * projX0 + projY1 * projY1 - projY0 * projY0;
        // Calculate the Douglas-Peucker metric
        const det = 2 * (A * E - B * D);
        const dpDisSq = (det * det / 4) / deltaProjectedDot;
        if (dpDisSq > this.dpTolSq) {
            // Attempt to model the projected path with an arc
            // Find the center of circle containing the arc passing through the projected start, end, and mid points.
            const arcCenterX = (B * F - C * E) / det;
            const arcCenterY = (C * D - A * F) / det;
            const arcRadius = Math.hypot(arcCenterX - projX1, arcCenterY - projY1);
            const startToEndVec = Vec3Math.set(A, B, 0, this.vec3Cache[3]);
            const centerToMidVec = Vec3Math.set(projX0 - arcCenterX, projY0 - arcCenterY, 0, this.vec3Cache[4]);
            const cross = Vec3Math.cross(startToEndVec, centerToMidVec, this.vec3Cache[4]);
            state.vectorType = 'arc';
            state.arcCenterX = arcCenterX;
            state.arcCenterY = arcCenterY;
            state.arcRadius = arcRadius;
            state.isArcCounterClockwise = cross[2] > 0;
        }
        else {
            state.vectorType = 'line';
        }
        const cosDistance = Vec3Math.dot(startVec, midVec);
        if (cosDistance > this.cosMinDistance) { // cosine of distance increases with decreasing distance
            // We are below the minimum distance required to continue resampling -> decide if we need to continue or if
            // the path can satisfactorily be modeled as either a straight line or a circular arc.
            if (state.vectorType === 'line') {
                // The path can be modeled as a line.
                return state;
            }
            // To find whether the path can be modeled as an arc, we need to project the one-quarter and three-quarter points
            // along the path and find the projected points' distances from the arc modeled above. If the distances are
            // within the D-P tolerance, then the path can be modeled as an arc.
            const query = circle.offsetAngleAlong(startVec, angularWidth / 4, this.geoPointCache[0]);
            const projectedQuery = projection.project(query, this.vec2Cache[0]);
            let distance = Math.hypot(projectedQuery[0] - state.arcCenterX, projectedQuery[1] - state.arcCenterY);
            if ((distance - state.arcRadius) * (distance - state.arcRadius) <= this.dpTolSq) {
                circle.offsetAngleAlong(startVec, 3 * angularWidth / 4, query);
                projection.project(query, projectedQuery);
                distance = Math.hypot(projectedQuery[0] - state.arcCenterX, projectedQuery[1] - state.arcCenterY);
                if ((distance - state.arcRadius) * (distance - state.arcRadius) <= this.dpTolSq) {
                    return state;
                }
            }
        }
        state = this.resampleHelper(projection, circle, lat1, lon1, x1, y1, z1, projX1, projY1, lat0, lon0, x0, y0, z0, projX0, projY0, handler, depth + 1, state);
        this.callHandler(handler, lat0, lon0, projX0, projY0, state);
        state.index++;
        state.prevX = projX0;
        state.prevY = projY0;
        return this.resampleHelper(projection, circle, lat0, lon0, x0, y0, z0, projX0, projY0, lat2, lon2, x2, y2, z2, projX2, projY2, handler, depth + 1, state);
    }
    /**
     * Calls a handler function for a resampled point.
     * @param handler The handler function to call.
     * @param lat The latitude of the resampled point, in degrees.
     * @param lon The longitude of the resampled point, in degrees.
     * @param projX The x-coordinate of the projected resampled point, in pixels.
     * @param projY The y-coordinate of the projected resampled point, in pixels.
     * @param state The current state of the resampling algorithm.
     */
    callHandler(handler, lat, lon, projX, projY, state) {
        let vector;
        if (state.vectorType === 'line') {
            vector = this.lineVector;
        }
        else {
            vector = this.arcVector;
            Vec2Math.set(state.arcCenterX, state.arcCenterY, vector.projectedArcCenter);
            vector.projectedArcRadius = state.arcRadius;
            vector.projectedArcStartAngle = Math.atan2(state.prevY - state.arcCenterY, state.prevX - state.arcCenterX);
            vector.projectedArcEndAngle = Math.atan2(projY - state.arcCenterY, projX - state.arcCenterX);
            if (vector.projectedArcEndAngle < vector.projectedArcStartAngle !== state.isArcCounterClockwise) {
                vector.projectedArcEndAngle += state.isArcCounterClockwise ? -MathUtils.TWO_PI : MathUtils.TWO_PI;
            }
        }
        vector.point.set(lat, lon);
        Vec2Math.set(projX, projY, vector.projected);
        vector.index = state.index;
        handler(vector);
    }
}

/**
 * The possible reference norths for navigation angle units.
 */
var NavAngleUnitReferenceNorth;
(function (NavAngleUnitReferenceNorth) {
    NavAngleUnitReferenceNorth["True"] = "true";
    NavAngleUnitReferenceNorth["Magnetic"] = "magnetic";
})(NavAngleUnitReferenceNorth || (NavAngleUnitReferenceNorth = {}));
/**
 * A basic implementation of a navigation angle unit.
 */
class BasicNavAngleUnit extends AbstractUnit {
    /**
     * Constructor.
     * @param referenceNorth The reference north of the new unit.
     * @param magVar The initial magnetic variation of the new unit.
     */
    constructor(referenceNorth, magVar) {
        super(referenceNorth === NavAngleUnitReferenceNorth.True ? 'true bearing' : 'magnetic bearing');
        /** @inheritdoc */
        this.family = 'navangle';
        this._magVar = 0;
        this._magVar = magVar;
    }
    /** @inheritdoc */
    get magVar() {
        return this._magVar;
    }
    /**
     * Checks whether this nav angle unit is relative to magnetic north.
     * @returns Whether this nav angle unit is relative to magnetic north.
     */
    isMagnetic() {
        return this.name === 'magnetic bearing';
    }
    /**
     * Converts a value of this unit to another unit. This unit's magnetic variation is used for the conversion.
     * @param value The value to convert.
     * @param toUnit The unit to which to convert.
     * @returns The converted value.
     * @throws Error if attempting an invalid conversion.
     */
    convertTo(value, toUnit) {
        if (!this.canConvert(toUnit)) {
            throw new Error(`Invalid conversion from ${this.name} to ${toUnit.name}.`);
        }
        if (!isFinite(value)) {
            return NaN;
        }
        if (this.isMagnetic() === toUnit.isMagnetic()) {
            return value;
        }
        return this.isMagnetic() ? MagVar.magneticToTrue(value, this.magVar) : MagVar.trueToMagnetic(value, this.magVar);
    }
    /**
     * Converts a value of another unit to this unit. This unit's magnetic variation is used for the conversion.
     * @param value The value to convert.
     * @param fromUnit The unit from which to convert.
     * @returns The converted value.
     * @throws Error if attempting an invalid conversion.
     */
    convertFrom(value, fromUnit) {
        if (!this.canConvert(fromUnit)) {
            throw new Error(`Invalid conversion from ${fromUnit.name} to ${this.name}.`);
        }
        if (!isFinite(value)) {
            return NaN;
        }
        if (this.isMagnetic() === fromUnit.isMagnetic()) {
            return value;
        }
        return this.isMagnetic() ? MagVar.trueToMagnetic(value, this.magVar) : MagVar.magneticToTrue(value, this.magVar);
    }
    /**
     * Sets this unit's magnetic variation.
     * @param magVar The magnetic variation to set, in degrees.
     */
    setMagVar(magVar) {
        this._magVar = magVar;
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    setMagVarFromLocation(arg1, arg2) {
        if (typeof arg1 === 'number') {
            this._magVar = MagVar.get(arg1, arg2);
        }
        else {
            this._magVar = MagVar.get(arg1);
        }
    }
    /** @inheritdoc */
    equals(other) {
        return other instanceof BasicNavAngleUnit && this.name === other.name && this.magVar === other.magVar;
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    static create(isMagnetic, arg2, arg3) {
        const referenceNorth = isMagnetic ? NavAngleUnitReferenceNorth.Magnetic : NavAngleUnitReferenceNorth.True;
        let magVar = 0;
        if (arg2 !== undefined) {
            if (typeof arg2 === 'number') {
                if (arg3 === undefined) {
                    magVar = arg2;
                }
                else {
                    magVar = MagVar.get(arg2, arg3);
                }
            }
            else {
                magVar = MagVar.get(arg2);
            }
        }
        return new BasicNavAngleUnit(referenceNorth, magVar);
    }
}
/**
 * A Subject which provides a navigation angle value.
 */
class BasicNavAngleSubject extends AbstractSubscribable {
    /**
     * Constructor.
     * @param value The value of this subject.
     */
    constructor(value) {
        super();
        this.value = value;
        /** @inheritdoc */
        this.isMutableSubscribable = true;
    }
    /**
     * Creates a BasicNavAngleSubject.
     * @param initialVal The initial value.
     * @returns A BasicNavAngleSubject.
     */
    static create(initialVal) {
        return new BasicNavAngleSubject(initialVal);
    }
    /** @inheritdoc */
    get() {
        return this.value.readonly;
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    set(arg1, arg2, arg3) {
        const isArg1Number = typeof arg1 === 'number';
        const isArg2Number = typeof arg2 === 'number';
        const isArg2LatLon = typeof arg2 === 'object' && 'lat' in arg2 && 'lon' in arg2;
        const unit = isArg1Number
            ? isArg2Number || isArg2LatLon || arg2 === undefined ? this.value.unit : arg2
            : arg1.unit;
        const oldMagVar = this.value.unit.magVar;
        const oldValue = this.value.number;
        if (isArg2LatLon) {
            this.value.unit.setMagVarFromLocation(arg2);
        }
        else if (isArg2Number) {
            if (typeof arg3 === 'number') {
                this.value.unit.setMagVarFromLocation(arg2, arg3);
            }
            else {
                this.value.unit.setMagVar(arg2);
            }
        }
        else {
            this.value.unit.setMagVar(unit.magVar);
        }
        if (isArg1Number) {
            this.value.set(arg1, unit);
        }
        else {
            this.value.set(arg1);
        }
        if ((!(isNaN(oldMagVar) && isNaN(this.value.unit.magVar)) && oldMagVar !== this.value.unit.magVar)
            || (!(isNaN(oldValue) && isNaN(this.value.number)) && oldValue !== this.value.number)) {
            this.notify();
        }
    }
}
BasicNavAngleSubject.TRUE_BEARING = BasicNavAngleUnit.create(false);

/**
 * A publisher for anti-ice system information.
 */
class AntiIcePublisher extends SimVarPublisher {
    /**
     * Creates an instance of an AntiIcePublisher.
     * @param bus The event bus to use with this instance.
     * @param pacer An optional pacer to use to control the rate of publishing.
     */
    constructor(bus, pacer) {
        const engineIndexedSimVars = [
            ['anti_ice_engine_switch_on', { name: 'ENG ANTI ICE', type: SimVarValueType.Bool }],
            ['anti_ice_prop_switch_on', { name: 'PROP DEICE SWITCH', type: SimVarValueType.Bool }]
        ];
        const simvars = new Map(AntiIcePublisher.nonIndexedSimVars);
        // add engine-indexed simvars
        const engineCount = SimVar.GetSimVarValue('NUMBER OF ENGINES', SimVarValueType.Number);
        for (const [topic, simvar] of engineIndexedSimVars) {
            for (let i = 1; i <= engineCount; i++) {
                simvars.set(`${topic}_${i}`, {
                    name: `${simvar.name}:${i}`,
                    type: simvar.type,
                    map: simvar.map
                });
            }
        }
        super(simvars, bus, pacer);
    }
}
AntiIcePublisher.nonIndexedSimVars = [
    ['anti_ice_structural_switch_on', { name: 'STRUCTURAL DEICE SWITCH', type: SimVarValueType.Bool }],
    ['anti_ice_windshield_switch_on', { name: 'WINDSHIELD DEICE SWITCH', type: SimVarValueType.Bool }]
];

/**
 * A basic implementation of {@link Consumer}.
 */
class BasicConsumer {
    /**
     * Creates an instance of a Consumer.
     * @param subscribe A function which subscribes a handler to the source of this consumer's events.
     * @param state The state for the consumer to track.
     * @param currentHandler The current build filter handler stack, if any.
     */
    constructor(subscribe, state = {}, currentHandler) {
        this.subscribe = subscribe;
        this.state = state;
        this.currentHandler = currentHandler;
        /** @inheritdoc */
        this.isConsumer = true;
        this.activeSubs = new Map();
    }
    /** @inheritdoc */
    handle(handler, paused = false) {
        let activeHandler;
        if (this.currentHandler !== undefined) {
            /**
             * The handler reference to store.
             * @param data The input data to the handler.
             */
            activeHandler = (data) => {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                this.currentHandler(data, this.state, handler);
            };
        }
        else {
            activeHandler = handler;
        }
        let activeSubArray = this.activeSubs.get(handler);
        if (!activeSubArray) {
            activeSubArray = [];
            this.activeSubs.set(handler, activeSubArray);
        }
        const onDestroyed = (destroyed) => {
            const activeSubsArray = this.activeSubs.get(handler);
            if (activeSubsArray) {
                activeSubsArray.splice(activeSubsArray.indexOf(destroyed), 1);
                if (activeSubsArray.length === 0) {
                    this.activeSubs.delete(handler);
                }
            }
        };
        const sub = new ConsumerSubscription(this.subscribe(activeHandler, paused), onDestroyed);
        // Need to handle the case where the subscription is destroyed immediately
        if (sub.isAlive) {
            activeSubArray.push(sub);
        }
        else if (activeSubArray.length === 0) {
            this.activeSubs.delete(handler);
        }
        return sub;
    }
    /** @inheritdoc */
    off(handler) {
        var _a;
        const activeSubArray = this.activeSubs.get(handler);
        if (activeSubArray) {
            (_a = activeSubArray.shift()) === null || _a === void 0 ? void 0 : _a.destroy();
            if (activeSubArray.length === 0) {
                this.activeSubs.delete(handler);
            }
        }
    }
    /** @inheritdoc */
    atFrequency(frequency, immediateFirstPublish = true) {
        const initialState = {
            previousTime: Date.now(),
            firstRun: immediateFirstPublish
        };
        return new BasicConsumer(this.subscribe, initialState, this.getAtFrequencyHandler(frequency));
    }
    /**
     * Gets a handler function for a 'atFrequency' filter.
     * @param frequency The frequency, in Hz, to cap to.
     * @returns A handler function for a 'atFrequency' filter.
     */
    getAtFrequencyHandler(frequency) {
        const deltaTimeTrigger = 1000 / frequency;
        return (data, state, next) => {
            const currentTime = Date.now();
            const deltaTime = currentTime - state.previousTime;
            if (deltaTimeTrigger <= deltaTime || state.firstRun) {
                while ((state.previousTime + deltaTimeTrigger) < currentTime) {
                    state.previousTime += deltaTimeTrigger;
                }
                if (state.firstRun) {
                    state.firstRun = false;
                }
                this.with(data, next);
            }
        };
    }
    /** @inheritdoc */
    withPrecision(precision) {
        return new BasicConsumer(this.subscribe, { lastValue: 0, hasLastValue: false }, this.getWithPrecisionHandler(precision));
    }
    /**
     * Gets a handler function for a 'withPrecision' filter.
     * @param precision The decimal precision to snap to.
     * @returns A handler function for a 'withPrecision' filter.
     */
    getWithPrecisionHandler(precision) {
        return (data, state, next) => {
            const dataValue = data;
            const multiplier = Math.pow(10, precision);
            const currentValueAtPrecision = Math.round(dataValue * multiplier) / multiplier;
            if (!state.hasLastValue || currentValueAtPrecision !== state.lastValue) {
                state.hasLastValue = true;
                state.lastValue = currentValueAtPrecision;
                this.with(currentValueAtPrecision, next);
            }
        };
    }
    /** @inheritdoc */
    whenChangedBy(amount) {
        return new BasicConsumer(this.subscribe, { lastValue: 0, hasLastValue: false }, this.getWhenChangedByHandler(amount));
    }
    /**
     * Gets a handler function for a 'whenChangedBy' filter.
     * @param amount The minimum amount threshold below which the consumer will not consume.
     * @returns A handler function for a 'whenChangedBy' filter.
     */
    getWhenChangedByHandler(amount) {
        return (data, state, next) => {
            const dataValue = data;
            const diff = Math.abs(dataValue - state.lastValue);
            if (!state.hasLastValue || diff >= amount) {
                state.hasLastValue = true;
                state.lastValue = dataValue;
                this.with(data, next);
            }
        };
    }
    /** @inheritdoc */
    whenChanged() {
        return new BasicConsumer(this.subscribe, { lastValue: '', hasLastValue: false }, this.getWhenChangedHandler());
    }
    /**
     * Gets a handler function for a 'whenChanged' filter.
     * @returns A handler function for a 'whenChanged' filter.
     */
    getWhenChangedHandler() {
        return (data, state, next) => {
            if (!state.hasLastValue || state.lastValue !== data) {
                state.hasLastValue = true;
                state.lastValue = data;
                this.with(data, next);
            }
        };
    }
    /** @inheritdoc */
    onlyAfter(deltaTime) {
        return new BasicConsumer(this.subscribe, { previousTime: Date.now() }, this.getOnlyAfterHandler(deltaTime));
    }
    /**
     * Gets a handler function for an 'onlyAfter' filter.
     * @param deltaTime The minimum delta time between events.
     * @returns A handler function for an 'onlyAfter' filter.
     */
    getOnlyAfterHandler(deltaTime) {
        return (data, state, next) => {
            const currentTime = Date.now();
            const timeDiff = currentTime - state.previousTime;
            if (timeDiff > deltaTime) {
                state.previousTime += deltaTime;
                this.with(data, next);
            }
        };
    }
    /**
     * Builds a handler stack from the current handler.
     * @param data The data to send in to the handler.
     * @param handler The handler to use for processing.
     */
    with(data, handler) {
        if (this.currentHandler !== undefined) {
            this.currentHandler(data, this.state, handler);
        }
        else {
            handler(data);
        }
    }
}
/**
 * A {@link Subscription} for a {@link BasicConsumer}.
 */
class ConsumerSubscription {
    /**
     * Constructor.
     * @param sub The event bus subscription backing this subscription.
     * @param onDestroy A function which is called when this subscription is destroyed.
     */
    constructor(sub, onDestroy) {
        this.sub = sub;
        this.onDestroy = onDestroy;
    }
    /** @inheritdoc */
    get isAlive() {
        return this.sub.isAlive;
    }
    /** @inheritdoc */
    get isPaused() {
        return this.sub.isPaused;
    }
    /** @inheritdoc */
    get canInitialNotify() {
        return this.sub.canInitialNotify;
    }
    /** @inheritdoc */
    pause() {
        this.sub.pause();
        return this;
    }
    /** @inheritdoc */
    resume(initialNotify = false) {
        this.sub.resume(initialNotify);
        return this;
    }
    /** @inheritdoc */
    destroy() {
        this.sub.destroy();
        this.onDestroy(this);
    }
}

/**
 * A typed container for subscribers interacting with the Event Bus.
 */
class EventSubscriber {
    /**
     * Creates an instance of an EventSubscriber.
     * @param bus The EventBus that is the parent of this instance.
     */
    constructor(bus) {
        this.bus = bus;
    }
    /**
     * Subscribes to a topic on the bus.
     * @param topic The topic to subscribe to.
     * @returns A consumer to bind the event handler to.
     */
    on(topic) {
        return new BasicConsumer((handler, paused) => {
            return this.bus.on(topic, handler, paused);
        });
    }
}

/// <reference types="@microsoft/msfs-types/js/simvar" />
var APLockType;
(function (APLockType) {
    APLockType[APLockType["Heading"] = 0] = "Heading";
    APLockType[APLockType["Nav"] = 1] = "Nav";
    APLockType[APLockType["Alt"] = 2] = "Alt";
    APLockType[APLockType["Bank"] = 3] = "Bank";
    APLockType[APLockType["WingLevel"] = 4] = "WingLevel";
    APLockType[APLockType["Vs"] = 5] = "Vs";
    APLockType[APLockType["Flc"] = 6] = "Flc";
    APLockType[APLockType["Pitch"] = 7] = "Pitch";
    APLockType[APLockType["Approach"] = 8] = "Approach";
    APLockType[APLockType["Backcourse"] = 9] = "Backcourse";
    APLockType[APLockType["Glideslope"] = 10] = "Glideslope";
    APLockType[APLockType["VNav"] = 11] = "VNav";
})(APLockType || (APLockType = {}));
/** base publisher for simvars */
class APSimVarPublisher extends SimVarPublisher {
    /**
     * Create an APSimVarPublisher
     * @param bus The EventBus to publish to
     * @param pacer An optional pacer to use to control the pace of publishing
     */
    constructor(bus, pacer = undefined) {
        super(APSimVarPublisher.simvars, bus, pacer);
    }
}
APSimVarPublisher.simvars = new Map([
    ['ap_heading_selected', { name: 'AUTOPILOT HEADING LOCK DIR:1', type: SimVarValueType.Degree }],
    ['ap_heading_selected_1', { name: 'AUTOPILOT HEADING LOCK DIR:1', type: SimVarValueType.Degree }],
    ['ap_heading_selected_2', { name: 'AUTOPILOT HEADING LOCK DIR:2', type: SimVarValueType.Degree }],
    ['ap_heading_selected_3', { name: 'AUTOPILOT HEADING LOCK DIR:3', type: SimVarValueType.Degree }],
    ['ap_altitude_selected', { name: 'AUTOPILOT ALTITUDE LOCK VAR:1', type: SimVarValueType.Feet }],
    ['ap_altitude_selected_1', { name: 'AUTOPILOT ALTITUDE LOCK VAR:1', type: SimVarValueType.Feet }],
    ['ap_altitude_selected_2', { name: 'AUTOPILOT ALTITUDE LOCK VAR:2', type: SimVarValueType.Feet }],
    ['ap_altitude_selected_3', { name: 'AUTOPILOT ALTITUDE LOCK VAR:3', type: SimVarValueType.Feet }],
    ['ap_master_status', { name: 'AUTOPILOT MASTER', type: SimVarValueType.Bool }],
    ['ap_yd_status', { name: 'AUTOPILOT YAW DAMPER', type: SimVarValueType.Bool }],
    ['ap_heading_hold', { name: 'AUTOPILOT HEADING LOCK', type: SimVarValueType.Bool }],
    ['ap_nav_hold', { name: 'AUTOPILOT NAV1 LOCK', type: SimVarValueType.Bool }],
    ['ap_bank_hold', { name: 'AUTOPILOT BANK HOLD', type: SimVarValueType.Bool }],
    ['ap_max_bank_id', { name: 'AUTOPILOT MAX BANK ID', type: SimVarValueType.Number }],
    ['ap_max_bank_value', { name: 'AUTOPILOT MAX BANK', type: SimVarValueType.Degree }],
    ['ap_wing_lvl_hold', { name: 'AUTOPILOT WING LEVELER', type: SimVarValueType.Bool }],
    ['ap_approach_hold', { name: 'AUTOPILOT APPROACH HOLD', type: SimVarValueType.Bool }],
    ['ap_backcourse_hold', { name: 'AUTOPILOT BACKCOURSE HOLD', type: SimVarValueType.Bool }],
    ['ap_vs_hold', { name: 'AUTOPILOT VERTICAL HOLD', type: SimVarValueType.Bool }],
    ['ap_flc_hold', { name: 'AUTOPILOT FLIGHT LEVEL CHANGE', type: SimVarValueType.Bool }],
    ['ap_alt_hold', { name: 'AUTOPILOT ALTITUDE LOCK', type: SimVarValueType.Bool }],
    ['ap_glideslope_hold', { name: 'AUTOPILOT GLIDESLOPE HOLD', type: SimVarValueType.Bool }],
    ['ap_pitch_hold', { name: 'AUTOPILOT PITCH HOLD', type: SimVarValueType.Bool }],
    ['ap_toga_hold', { name: 'AUTOPILOT TAKEOFF POWER ACTIVE', type: SimVarValueType.Bool }],
    ['ap_vs_selected', { name: 'AUTOPILOT VERTICAL HOLD VAR:1', type: SimVarValueType.FPM }],
    ['ap_fpa_selected', { name: 'L:WT_AP_FPA_Target:1', type: SimVarValueType.Degree }],
    ['ap_ias_selected', { name: 'AUTOPILOT AIRSPEED HOLD VAR', type: SimVarValueType.Knots }],
    ['ap_mach_selected', { name: 'AUTOPILOT MACH HOLD VAR', type: SimVarValueType.Number }],
    ['ap_selected_speed_is_mach', { name: 'AUTOPILOT MANAGED SPEED IN MACH', type: SimVarValueType.Bool }],
    ['ap_selected_speed_is_manual', { name: 'L:XMLVAR_SpeedIsManuallySet', type: SimVarValueType.Bool }],
    ['flight_director_bank', { name: 'AUTOPILOT FLIGHT DIRECTOR BANK', type: SimVarValueType.Degree }],
    ['flight_director_pitch', { name: 'AUTOPILOT FLIGHT DIRECTOR PITCH', type: SimVarValueType.Degree }],
    ['flight_director_is_active_1', { name: 'AUTOPILOT FLIGHT DIRECTOR ACTIVE:1', type: SimVarValueType.Bool }],
    ['flight_director_is_active_2', { name: 'AUTOPILOT FLIGHT DIRECTOR ACTIVE:2', type: SimVarValueType.Bool }],
    ['vnav_active', { name: 'L:XMLVAR_VNAVButtonValue', type: SimVarValueType.Bool }],
    ['ap_pitch_selected', { name: 'AUTOPILOT PITCH HOLD REF', type: SimVarValueType.Degree }]
]);

// Common definitions relevant to all radio types.
/** The basic radio types. */
var RadioType;
(function (RadioType) {
    RadioType["Com"] = "COM";
    RadioType["Nav"] = "NAV";
    RadioType["Adf"] = "ADF";
})(RadioType || (RadioType = {}));
/** The two frequency "banks", active and standby. */
var FrequencyBank;
(function (FrequencyBank) {
    FrequencyBank[FrequencyBank["Active"] = 0] = "Active";
    FrequencyBank[FrequencyBank["Standby"] = 1] = "Standby";
})(FrequencyBank || (FrequencyBank = {}));
/** COM frequency spacing on COM radios. */
var ComSpacing;
(function (ComSpacing) {
    /** 25Khz spacing */
    ComSpacing[ComSpacing["Spacing25Khz"] = 0] = "Spacing25Khz";
    /** 8.33Khz spacing */
    ComSpacing[ComSpacing["Spacing833Khz"] = 1] = "Spacing833Khz";
})(ComSpacing || (ComSpacing = {}));

/// <reference types="@microsoft/msfs-types/js/simvar" />
/**
 * A publisher of nav radio, ADF radio, GPS, and marker beacon-related sim var events.
 */
class NavProcSimVarPublisher extends SimVarPublisher {
    /**
     * Create a NavProcSimVarPublisher
     * @param bus The EventBus to publish to
     * @param pacer An optional pacer to use to control the pace of publishing
     */
    constructor(bus, pacer = undefined) {
        super(NavProcSimVarPublisher.simvars, bus, pacer);
    }
    /**
     * Creates an array of nav radio sim var event definitions for an indexed nav radio.
     * @param index The index of the nav radio.
     * @returns An array of nav radio sim var event definitions for the specified nav radio.
     */
    static createNavRadioDefinitions(index) {
        return [
            [`nav_signal_${index}`, { name: `NAV SIGNAL:${index}`, type: SimVarValueType.Number }],
            [`nav_obs_${index}`, { name: `NAV OBS:${index}`, type: SimVarValueType.Degree }],
            [`nav_has_dme_${index}`, { name: `NAV HAS DME:${index}`, type: SimVarValueType.Bool }],
            [`nav_has_nav_${index}`, { name: `NAV HAS NAV:${index}`, type: SimVarValueType.Bool }],
            [`nav_cdi_${index}`, { name: `NAV CDI:${index}`, type: SimVarValueType.Number }],
            [`nav_dme_${index}`, { name: `NAV DME:${index}`, type: SimVarValueType.NM }],
            [`nav_radial_${index}`, { name: `NAV RADIAL:${index}`, type: SimVarValueType.Degree }],
            [`nav_ident_${index}`, { name: `NAV IDENT:${index}`, type: SimVarValueType.String }],
            [`nav_to_from_${index}`, { name: `NAV TOFROM:${index}`, type: SimVarValueType.Enum }],
            [`nav_localizer_${index}`, { name: `NAV HAS LOCALIZER:${index}`, type: SimVarValueType.Bool }],
            [`nav_localizer_crs_${index}`, { name: `NAV LOCALIZER:${index}`, type: SimVarValueType.Number }],
            [`nav_loc_airport_ident_${index}`, { name: `NAV LOC AIRPORT IDENT:${index}`, type: SimVarValueType.String }],
            [`nav_loc_runway_designator_${index}`, { name: `NAV LOC RUNWAY DESIGNATOR:${index}`, type: SimVarValueType.Number }],
            [`nav_loc_runway_number_${index}`, { name: `NAV LOC RUNWAY NUMBER:${index}`, type: SimVarValueType.Number }],
            [`nav_glideslope_${index}`, { name: `NAV HAS GLIDE SLOPE:${index}`, type: SimVarValueType.Bool }],
            [`nav_gs_error_${index}`, { name: `NAV GLIDE SLOPE ERROR:${index}`, type: SimVarValueType.Degree }],
            [`nav_raw_gs_${index}`, { name: `NAV RAW GLIDE SLOPE:${index}`, type: SimVarValueType.Degree }],
            [`nav_lla_${index}`, { name: `NAV VOR LATLONALT:${index}`, type: SimVarValueType.LLA }],
            [`nav_dme_lla_${index}`, { name: `NAV DME LATLONALT:${index}`, type: SimVarValueType.LLA }],
            [`nav_gs_lla_${index}`, { name: `NAV GS LATLONALT:${index}`, type: SimVarValueType.LLA }],
            [`nav_magvar_${index}`, { name: `NAV MAGVAR:${index}`, type: SimVarValueType.Degree }]
        ];
    }
    /**
     * Creates an array of ADF radio sim var event definitions for an indexed ADF radio.
     * @param index The index of the ADF radio.
     * @returns An array of ADF radio sim var event definitions for the specified ADF radio.
     */
    static createAdfRadioDefinitions(index) {
        return [
            [`adf_signal_${index}`, { name: `ADF SIGNAL:${index}`, type: SimVarValueType.Number }],
            [`adf_bearing_${index}`, { name: `ADF RADIAL:${index}`, type: SimVarValueType.Degree }],
            [`adf_lla_${index}`, { name: `ADF LATLONALT:${index}`, type: SimVarValueType.LLA }]
        ];
    }
}
NavProcSimVarPublisher.simvars = new Map([
    ...NavProcSimVarPublisher.createNavRadioDefinitions(1),
    ...NavProcSimVarPublisher.createNavRadioDefinitions(2),
    ...NavProcSimVarPublisher.createNavRadioDefinitions(3),
    ...NavProcSimVarPublisher.createNavRadioDefinitions(4),
    ...NavProcSimVarPublisher.createAdfRadioDefinitions(1),
    ...NavProcSimVarPublisher.createAdfRadioDefinitions(2),
    ['gps_dtk', { name: 'GPS WP DESIRED TRACK', type: SimVarValueType.Degree }],
    ['gps_xtk', { name: 'GPS WP CROSS TRK', type: SimVarValueType.NM }],
    ['gps_wp', { name: 'GPS WP NEXT ID', type: SimVarValueType.NM }],
    ['gps_wp_bearing', { name: 'GPS WP BEARING', type: SimVarValueType.String }],
    ['gps_wp_distance', { name: 'GPS WP DISTANCE', type: SimVarValueType.NM }],
    ['mkr_bcn_state_simvar', { name: 'MARKER BEACON STATE', type: SimVarValueType.Number }],
    ['gps_obs_active_simvar', { name: 'GPS OBS ACTIVE', type: SimVarValueType.Bool }],
    ['gps_obs_value_simvar', { name: 'GPS OBS VALUE', type: SimVarValueType.Degree }]
]);
//
// Navigation event configurations
//
var NavSourceType;
(function (NavSourceType) {
    NavSourceType[NavSourceType["Nav"] = 0] = "Nav";
    NavSourceType[NavSourceType["Gps"] = 1] = "Gps";
    NavSourceType[NavSourceType["Adf"] = 2] = "Adf";
})(NavSourceType || (NavSourceType = {}));
//* ENUM for VOR To/From Flag */
var VorToFrom;
(function (VorToFrom) {
    VorToFrom[VorToFrom["OFF"] = 0] = "OFF";
    VorToFrom[VorToFrom["TO"] = 1] = "TO";
    VorToFrom[VorToFrom["FROM"] = 2] = "FROM";
})(VorToFrom || (VorToFrom = {}));
/** Marker beacon signal state. */
var MarkerBeaconState;
(function (MarkerBeaconState) {
    MarkerBeaconState[MarkerBeaconState["Inactive"] = 0] = "Inactive";
    MarkerBeaconState[MarkerBeaconState["Outer"] = 1] = "Outer";
    MarkerBeaconState[MarkerBeaconState["Middle"] = 2] = "Middle";
    MarkerBeaconState[MarkerBeaconState["Inner"] = 3] = "Inner";
})(MarkerBeaconState || (MarkerBeaconState = {}));

/// <reference types="@microsoft/msfs-types/js/common" />
/**
 * An event bus that can be used to publish data from backend
 * components and devices to consumers.
 */
class EventBus {
    /**
     * Creates an instance of an EventBus.
     * @param useAlternativeEventSync Whether or not to use generic listener event sync (default false).
     * If true, FlowEventSync will only work for gauges.
     * @param shouldResync Whether the eventbus should ask for a resync of all previously cached events (default true)
     */
    constructor(useAlternativeEventSync = false, shouldResync = true) {
        this._topicSubsMap = new Map();
        this._wildcardSubs = new Array();
        this._notifyDepthMap = new Map();
        this._wildcardNotifyDepth = 0;
        this._eventCache = new Map();
        this.onWildcardSubDestroyedFunc = this.onWildcardSubDestroyed.bind(this);
        this._busId = Math.floor(Math.random() * 2147483647);
        // fallback to flowevent when genericdatalistener not avail (su9)
        useAlternativeEventSync = (typeof RegisterGenericDataListener === 'undefined');
        const syncFunc = useAlternativeEventSync ? EventBusFlowEventSync : EventBusListenerSync;
        this._busSync = new syncFunc(this.pub.bind(this), this._busId);
        if (shouldResync === true) {
            this.syncEvent('event_bus', 'resync_request', false);
            this.on('event_bus', (data) => {
                if (data == 'resync_request') {
                    this.resyncEvents();
                }
            });
        }
    }
    /**
     * Subscribes to a topic on the bus.
     * @param topic The topic to subscribe to.
     * @param handler The handler to be called when an event happens.
     * @param paused Whether the new subscription should be initialized as paused. Defaults to `false`.
     * @returns The new subscription.
     */
    on(topic, handler, paused = false) {
        let subs = this._topicSubsMap.get(topic);
        if (subs === undefined) {
            this._topicSubsMap.set(topic, subs = []);
            this.pub('event_bus_topic_first_sub', topic, false, false);
        }
        const initialNotifyFunc = (sub) => {
            const lastState = this._eventCache.get(topic);
            if (lastState !== undefined) {
                sub.handler(lastState.data);
            }
        };
        const onDestroyFunc = (sub) => {
            var _a;
            // If we are not in the middle of a notify operation, remove the subscription.
            // Otherwise, do nothing and let the post-notify clean-up code handle it.
            if (((_a = this._notifyDepthMap.get(topic)) !== null && _a !== void 0 ? _a : 0) === 0) {
                const subsToSplice = this._topicSubsMap.get(topic);
                if (subsToSplice) {
                    subsToSplice.splice(subsToSplice.indexOf(sub), 1);
                }
            }
        };
        const sub = new HandlerSubscription(handler, initialNotifyFunc, onDestroyFunc);
        subs.push(sub);
        if (paused) {
            sub.pause();
        }
        else {
            sub.initialNotify();
        }
        return sub;
    }
    /**
     * Unsubscribes a handler from the topic's events.
     * @param topic The topic to unsubscribe from.
     * @param handler The handler to unsubscribe from topic.
     * @deprecated This method has been deprecated in favor of using the {@link Subscription} object returned by `.on()`
     * to manage subscriptions.
     */
    off(topic, handler) {
        const handlers = this._topicSubsMap.get(topic);
        const toDestroy = handlers === null || handlers === void 0 ? void 0 : handlers.find(sub => sub.handler === handler);
        toDestroy === null || toDestroy === void 0 ? void 0 : toDestroy.destroy();
    }
    /**
     * Subscribes to all topics.
     * @param handler The handler to subscribe to all events.
     * @returns The new subscription.
     */
    onAll(handler) {
        const sub = new HandlerSubscription(handler, undefined, this.onWildcardSubDestroyedFunc);
        this._wildcardSubs.push(sub);
        return sub;
    }
    /**
     * Unsubscribe the handler from all topics.
     * @param handler The handler to unsubscribe from all events.
     * @deprecated This method has been deprecated in favor of using the {@link Subscription} object returned by
     * `.onAll()` to manage subscriptions.
     */
    offAll(handler) {
        const toDestroy = this._wildcardSubs.find(sub => sub.handler === handler);
        toDestroy === null || toDestroy === void 0 ? void 0 : toDestroy.destroy();
    }
    /**
     * Publishes an event to the topic on the bus.
     * @param topic The topic to publish to.
     * @param data The data portion of the event.
     * @param sync Whether or not this message needs to be synced on local stoage.
     * @param isCached Whether or not this message will be resync'd across the bus on load.
     */
    pub(topic, data, sync = false, isCached = true) {
        var _a;
        if (isCached) {
            this._eventCache.set(topic, { data: data, synced: sync });
        }
        const subs = this._topicSubsMap.get(topic);
        if (subs !== undefined) {
            let needCleanUpSubs = false;
            const notifyDepth = (_a = this._notifyDepthMap.get(topic)) !== null && _a !== void 0 ? _a : 0;
            this._notifyDepthMap.set(topic, notifyDepth + 1);
            const len = subs.length;
            for (let i = 0; i < len; i++) {
                try {
                    const sub = subs[i];
                    if (sub.isAlive && !sub.isPaused) {
                        sub.handler(data);
                    }
                    needCleanUpSubs || (needCleanUpSubs = !sub.isAlive);
                }
                catch (error) {
                    console.error(`EventBus: error in handler: ${error}. topic: ${topic}. data: ${data}. sync: ${sync}. isCached: ${isCached}`, { error, topic, data, sync, isCached, subs });
                    if (error instanceof Error) {
                        console.error(error.stack);
                    }
                }
            }
            this._notifyDepthMap.set(topic, notifyDepth);
            if (needCleanUpSubs && notifyDepth === 0) {
                const filteredSubs = subs.filter(sub => sub.isAlive);
                this._topicSubsMap.set(topic, filteredSubs);
            }
        }
        // We don't know if anything is subscribed on busses in other instruments,
        // so we'll unconditionally sync if sync is true and trust that the
        // publisher knows what it's doing.
        if (sync) {
            this.syncEvent(topic, data, isCached);
        }
        // always push to wildcard handlers
        let needCleanUpSubs = false;
        this._wildcardNotifyDepth++;
        const wcLen = this._wildcardSubs.length;
        for (let i = 0; i < wcLen; i++) {
            const sub = this._wildcardSubs[i];
            if (sub.isAlive && !sub.isPaused) {
                sub.handler(topic, data);
            }
            needCleanUpSubs || (needCleanUpSubs = !sub.isAlive);
        }
        this._wildcardNotifyDepth--;
        if (needCleanUpSubs && this._wildcardNotifyDepth === 0) {
            this._wildcardSubs = this._wildcardSubs.filter(sub => sub.isAlive);
        }
    }
    /**
     * Responds to when a wildcard subscription is destroyed.
     * @param sub The destroyed subscription.
     */
    onWildcardSubDestroyed(sub) {
        // If we are not in the middle of a notify operation, remove the subscription.
        // Otherwise, do nothing and let the post-notify clean-up code handle it.
        if (this._wildcardNotifyDepth === 0) {
            this._wildcardSubs.splice(this._wildcardSubs.indexOf(sub), 1);
        }
    }
    /**
     * Re-sync all synced events
     */
    resyncEvents() {
        for (const [topic, event] of this._eventCache) {
            if (event.synced) {
                this.syncEvent(topic, event.data, true);
            }
        }
    }
    /**
     * Publish an event to the sync bus.
     * @param topic The topic to publish to.
     * @param data The data to publish.
     * @param isCached Whether or not this message will be resync'd across the bus on load.
     */
    syncEvent(topic, data, isCached) {
        this._busSync.sendEvent(topic, data, isCached);
    }
    /**
     * Gets a typed publisher from the event bus..
     * @returns The typed publisher.
     */
    getPublisher() {
        return this;
    }
    /**
     * Gets a typed subscriber from the event bus.
     * @returns The typed subscriber.
     */
    getSubscriber() {
        return new EventSubscriber(this);
    }
    /**
     * Get the number of subscribes for a given topic.
     * @param topic The name of the topic.
     * @returns The number of subscribers.
     **/
    getTopicSubscriberCount(topic) {
        var _a, _b;
        return (_b = (_a = this._topicSubsMap.get(topic)) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
    }
    /**
     * Executes a function once for each topic with at least one subscriber.
     * @param fn The function to execute.
     */
    forEachSubscribedTopic(fn) {
        this._topicSubsMap.forEach((subs, topic) => { subs.length > 0 && fn(topic, subs.length); });
    }
}
/**
 * An abstract class for bus sync implementations.
 */
class EventBusSyncBase {
    /**
     * Creates an instance of EventBusFlowEventSync.
     * @param recvEventCb A callback to execute when an event is received on the bus.
     * @param busId The ID of the bus.
     */
    constructor(recvEventCb, busId) {
        this.isPaused = false;
        this.lastEventSynced = -1;
        this.dataPackageQueue = [];
        this.recvEventCb = recvEventCb;
        this.busId = busId;
        this.hookReceiveEvent();
        /** Sends the queued up data packages */
        const sendFn = () => {
            if (!this.isPaused && this.dataPackageQueue.length > 0) {
                // console.log(`Sending ${this.dataPackageQueue.length} packages`);
                const syncDataPackage = {
                    busId: this.busId,
                    packagedId: Math.floor(Math.random() * 1000000000),
                    data: this.dataPackageQueue
                };
                if (this.executeSync(syncDataPackage)) {
                    this.dataPackageQueue.length = 0;
                }
                else {
                    console.warn('Failed to send sync data package');
                }
            }
            requestAnimationFrame(sendFn);
        };
        requestAnimationFrame(sendFn);
    }
    /**
     * Processes events received and sends them onto the local bus.
     * @param syncData The data package to process.
     */
    processEventsReceived(syncData) {
        if (this.busId !== syncData.busId) {
            // HINT: coherent events are still received twice, so check for this
            if (this.lastEventSynced !== syncData.packagedId) {
                this.lastEventSynced = syncData.packagedId;
                syncData.data.forEach((data) => {
                    try {
                        this.recvEventCb(data.topic, data.data !== undefined ? data.data : undefined, false, data.isCached);
                    }
                    catch (e) {
                        console.error(e);
                        if (e instanceof Error) {
                            console.error(e.stack);
                        }
                    }
                });
            }
        }
    }
    /**
     * Sends an event via flow events.
     * @param topic The topic to send data on.
     * @param data The data to send.
     * @param isCached Whether or not this event is cached.
     */
    sendEvent(topic, data, isCached) {
        // stringify data
        const dataObj = data;
        // build a data package
        const dataPackage = {
            topic: topic,
            data: dataObj,
            isCached: isCached
        };
        // queue data package
        this.dataPackageQueue.push(dataPackage);
    }
}
/**
 * A class that manages event bus synchronization via Flow Event Triggers.
 * DON'T USE this, it has bad performance implications.
 * @deprecated
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class EventBusCoherentSync extends EventBusSyncBase {
    /** @inheritdoc */
    executeSync(syncDataPackage) {
        // HINT: Stringifying the data again to circumvent the bad perf on Coherent interop
        try {
            this.listener.triggerToAllSubscribers(EventBusCoherentSync.EB_KEY, JSON.stringify(syncDataPackage));
            return true;
        }
        catch (error) {
            return false;
        }
    }
    /** @inheritdoc */
    hookReceiveEvent() {
        this.listener = RegisterViewListener(EventBusCoherentSync.EB_LISTENER_KEY, undefined, true);
        this.listener.on(EventBusCoherentSync.EB_KEY, (e) => {
            try {
                const evt = JSON.parse(e);
                this.processEventsReceived(evt);
            }
            catch (error) {
                console.error(error);
            }
        });
    }
}
EventBusCoherentSync.EB_KEY = 'eb.evt';
EventBusCoherentSync.EB_LISTENER_KEY = 'JS_LISTENER_SIMVARS';
/**
 * A class that manages event bus synchronization via Flow Event Triggers.
 */
class EventBusFlowEventSync extends EventBusSyncBase {
    /** @inheritdoc */
    executeSync(syncDataPackage) {
        // console.log('Sending sync package: ' + syncDataPackage.packagedId);
        try {
            LaunchFlowEvent('ON_MOUSERECT_HTMLEVENT', EventBusFlowEventSync.EB_LISTENER_KEY, this.busId.toString(), JSON.stringify(syncDataPackage));
            return true;
        }
        catch (error) {
            return false;
        }
    }
    /** @inheritdoc */
    hookReceiveEvent() {
        Coherent.on('OnInteractionEvent', (target, args) => {
            // identify if its a busevent
            if (args.length === 0 || args[0] !== EventBusFlowEventSync.EB_LISTENER_KEY || !args[2]) {
                return;
            }
            this.processEventsReceived(JSON.parse(args[2]));
        });
    }
}
EventBusFlowEventSync.EB_LISTENER_KEY = 'EB_EVENTS';
//// END GLOBALS DECLARATION
/**
 * A class that manages event bus synchronization via the Generic Data Listener.
 */
class EventBusListenerSync extends EventBusSyncBase {
    /** @inheritdoc */
    executeSync(syncDataPackage) {
        try {
            this.listener.send(EventBusListenerSync.EB_KEY, syncDataPackage);
            return true;
        }
        catch (error) {
            return false;
        }
    }
    /** @inheritdoc */
    hookReceiveEvent() {
        // pause the sync until the listener is ready
        this.isPaused = true;
        this.listener = RegisterGenericDataListener(() => {
            this.listener.onDataReceived(EventBusListenerSync.EB_KEY, (data) => {
                try {
                    this.processEventsReceived(data);
                }
                catch (error) {
                    console.error(error);
                }
            });
            this.isPaused = false;
        });
    }
}
EventBusListenerSync.EB_KEY = 'wt.eb.evt';
EventBusListenerSync.EB_LISTENER_KEY = 'JS_LISTENER_GENERICDATA';

/**
 * A publisher for publishing H:Events on the bus.
 */
class HEventPublisher extends BasePublisher {
    /**
     * Dispatches an H:Event to the event bus.
     * @param hEvent The H:Event to dispatch.
     * @param sync Whether this event should be synced (optional, default false)
     */
    dispatchHEvent(hEvent, sync = false) {
        // console.log(`dispaching hevent:  ${hEvent}`);
        this.publish('hEvent', hEvent, sync, false);
    }
}

/**
 * A subscribable subject which derives its value from an event consumer.
 */
class ConsumerSubject extends AbstractSubscribable {
    /**
     * Constructor.
     * @param consumer The event consumer from which this subject obtains its value. If null, this subject's value will
     * not be updated until its consumer is set to a non-null value.
     * @param initialVal This subject's initial value.
     * @param equalityFunc The function this subject uses check for equality between values.
     * @param mutateFunc The function this subject uses to change its value. If not defined, variable assignment is used
     * instead.
     */
    constructor(consumer, initialVal, equalityFunc, mutateFunc) {
        super();
        this.equalityFunc = equalityFunc;
        this.mutateFunc = mutateFunc;
        this.consumerHandler = this.onEventConsumed.bind(this);
        this._isPaused = false;
        this.isDestroyed = false;
        this.value = initialVal;
        this.consumerSub = consumer === null || consumer === void 0 ? void 0 : consumer.handle(this.consumerHandler);
    }
    // eslint-disable-next-line jsdoc/require-returns
    /**
     * Whether event consumption is currently paused for this subject. While paused, this subject's value will not
     * update.
     */
    get isPaused() {
        return this._isPaused;
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    static create(consumer, initialVal, equalityFunc, mutateFunc) {
        return new ConsumerSubject(consumer, initialVal, equalityFunc !== null && equalityFunc !== void 0 ? equalityFunc : AbstractSubscribable.DEFAULT_EQUALITY_FUNC, mutateFunc);
    }
    /**
     * Consumes an event.
     * @param value The value of the event.
     */
    onEventConsumed(value) {
        if (!this.equalityFunc(this.value, value)) {
            if (this.mutateFunc) {
                this.mutateFunc(this.value, value);
            }
            else {
                this.value = value;
            }
            this.notify();
        }
    }
    /**
     * Sets the consumer from which this subject derives its value. If the consumer is null, this subject's value will
     * not be updated until a non-null consumer is set.
     * @param consumer An event consumer.
     * @returns This subject, after its consumer has been set.
     */
    setConsumer(consumer) {
        var _a;
        if (this.isDestroyed) {
            return this;
        }
        (_a = this.consumerSub) === null || _a === void 0 ? void 0 : _a.destroy();
        this.consumerSub = consumer === null || consumer === void 0 ? void 0 : consumer.handle(this.consumerHandler, this._isPaused);
        return this;
    }
    /**
     * Pauses consuming events for this subject. Once paused, this subject's value will not be updated.
     * @returns This subject, after it has been paused.
     */
    pause() {
        var _a;
        if (this._isPaused) {
            return this;
        }
        (_a = this.consumerSub) === null || _a === void 0 ? void 0 : _a.pause();
        this._isPaused = true;
        return this;
    }
    /**
     * Resumes consuming events for this subject. Once resumed, this subject's value will be updated from consumed
     * events.
     * @returns This subject, after it has been resumed.
     */
    resume() {
        var _a;
        if (!this._isPaused) {
            return this;
        }
        this._isPaused = false;
        (_a = this.consumerSub) === null || _a === void 0 ? void 0 : _a.resume(true);
        return this;
    }
    /** @inheritdoc */
    get() {
        return this.value;
    }
    /**
     * Destroys this subject. Once destroyed, it will no longer consume events to update its value.
     */
    destroy() {
        var _a;
        (_a = this.consumerSub) === null || _a === void 0 ? void 0 : _a.destroy();
        this.isDestroyed = true;
    }
}

/// <reference types="@microsoft/msfs-types/pages/vcockpit/instruments/shared/utils/xmllogic" />
/** The kind of data to return. */
var CompositeLogicXMLValueType;
(function (CompositeLogicXMLValueType) {
    CompositeLogicXMLValueType[CompositeLogicXMLValueType["Any"] = 0] = "Any";
    CompositeLogicXMLValueType[CompositeLogicXMLValueType["Number"] = 1] = "Number";
    CompositeLogicXMLValueType[CompositeLogicXMLValueType["String"] = 2] = "String";
})(CompositeLogicXMLValueType || (CompositeLogicXMLValueType = {}));

/// <reference types="@microsoft/msfs-types/js/dataStorage" />
/* eslint-disable no-inner-declarations */
// eslint-disable-next-line @typescript-eslint/no-namespace
var DataStore;
(function (DataStore) {
    /**
     * Writes a keyed value to the data store.
     * @param key A key.
     * @param value The value to set.
     */
    function set(key, value) {
        SetStoredData(key, JSON.stringify(value));
    }
    DataStore.set = set;
    /**
     * Retrieves a keyed value from the data store.
     * @param key A key.
     * @returns the value stored under the key, or undefined if one could not be retrieved.
     */
    function get(key) {
        try {
            const string = GetStoredData(key);
            return JSON.parse(string);
        }
        catch (e) {
            return undefined;
        }
    }
    DataStore.get = get;
    /**
     * Removes a key from the data store.
     * @param key The key to remove.
     */
    function remove(key) {
        DeleteStoredData(key);
    }
    DataStore.remove = remove;
})(DataStore || (DataStore = {}));

/**
 * A utility class which provides the current game state.
 */
class GameStateProvider {
    /**
     * Constructor.
     */
    constructor() {
        this.gameState = Subject.create(undefined);
        window.document.addEventListener('OnVCockpitPanelAttributesChanged', this.onAttributesChanged.bind(this));
        this.onAttributesChanged();
    }
    /**
     * Responds to changes in document attributes.
     */
    onAttributesChanged() {
        var _a;
        if ((_a = window.parent) === null || _a === void 0 ? void 0 : _a.document.body.hasAttribute('gamestate')) {
            const attribute = window.parent.document.body.getAttribute('gamestate');
            if (attribute !== null) {
                this.gameState.set(GameState[attribute]);
                return;
            }
        }
        this.gameState.set(undefined);
    }
    /**
     * Gets a subscribable which provides the current game state.
     * @returns A subscribable which provides the current game state.
     */
    static get() {
        var _a;
        return ((_a = GameStateProvider.INSTANCE) !== null && _a !== void 0 ? _a : (GameStateProvider.INSTANCE = new GameStateProvider())).gameState;
    }
}

/**
 * A manager for key events. Allows key events to be triggered and intercepted, and also publishes intercepted key
 * events on the event bus.
 */
class KeyEventManager {
    /**
     * Constructor.
     * @param keyListener The Coherent key intercept view listener.
     * @param bus The event bus.
     */
    constructor(keyListener, bus) {
        this.keyListener = keyListener;
        this.bus = bus;
        Coherent.on('keyIntercepted', this.onKeyIntercepted.bind(this));
    }
    /**
     * Responds to key intercept events.
     * @param key The key that was intercepted.
     * @param value1 The second data value of the key event.
     * @param value0 The first data value of the key event.
     * @param value2 The third data value of the key event.
     */
    onKeyIntercepted(key, value1, value0, value2) {
        // Even though values are uint32, we will do what the sim does and pretend they're actually sint32
        if (value0 !== undefined && value0 >= 2147483648) {
            value0 -= 4294967296;
        }
        this.bus.pub('key_intercept', { key, value0, value1, value2 }, false, false);
    }
    /**
     * Triggers a key event.
     * @param key The key to trigger.
     * @param bypass Whether the event should bypass intercepts.
     * @param value0 The first data value of the key event. Defaults to `0`.
     * @param value1 The second data value of the key event. Defaults to `0`.
     * @param value2 The third data value of the key event. Defaults to `0`.
     * @returns A Promise which is fulfilled after the key event has been triggered.
     */
    triggerKey(key, bypass, value0 = 0, value1 = 0, value2 = 0) {
        return Coherent.call('TRIGGER_KEY_EVENT', key, bypass, value0, value1, value2);
    }
    /**
     * Enables interception for a key.
     * @param key The key to intercept.
     * @param passThrough Whether to pass the event through to the sim after it has been intercepted.
     */
    interceptKey(key, passThrough) {
        Coherent.call('INTERCEPT_KEY_EVENT', key, passThrough ? 0 : 1);
    }
    /**
     * Gets an instance of KeyEventManager. If an instance does not already exist, a new one will be created.
     * @param bus The event bus.
     * @returns A Promise which will be fulfilled with an instance of KeyEventManager.
     */
    static getManager(bus) {
        if (KeyEventManager.INSTANCE) {
            return Promise.resolve(KeyEventManager.INSTANCE);
        }
        if (!KeyEventManager.isCreatingInstance) {
            KeyEventManager.createInstance(bus);
        }
        return new Promise(resolve => {
            KeyEventManager.pendingPromiseResolves.push(resolve);
        });
    }
    /**
     * Creates an instance of KeyEventManager and fulfills all pending Promises to get the manager instance once
     * the instance is created.
     * @param bus The event bus.
     */
    static async createInstance(bus) {
        KeyEventManager.isCreatingInstance = true;
        KeyEventManager.INSTANCE = await KeyEventManager.create(bus);
        KeyEventManager.isCreatingInstance = false;
        for (let i = 0; i < KeyEventManager.pendingPromiseResolves.length; i++) {
            KeyEventManager.pendingPromiseResolves[i](KeyEventManager.INSTANCE);
        }
    }
    /**
     * Creates an instance of KeyEventManager.
     * @param bus The event bus.
     * @returns A Promise which is fulfilled with a new instance of KeyEventManager after it has been created.
     */
    static create(bus) {
        return new Promise((resolve, reject) => {
            const gameState = GameStateProvider.get();
            const sub = gameState.sub(state => {
                if (window['IsDestroying']) {
                    sub.destroy();
                    reject('KeyEventManager: cannot create a key intercept manager after the Coherent JS view has been destroyed');
                    return;
                }
                if (state === GameState.briefing || state === GameState.ingame) {
                    sub.destroy();
                    const keyListener = RegisterViewListener('JS_LISTENER_KEYEVENT', () => {
                        if (window['IsDestroying']) {
                            reject('KeyEventManager: cannot create a key intercept manager after the Coherent JS view has been destroyed');
                            return;
                        }
                        resolve(new KeyEventManager(keyListener, bus));
                    });
                }
            }, false, true);
            sub.resume(true);
        });
    }
}
KeyEventManager.isCreatingInstance = false;
KeyEventManager.pendingPromiseResolves = [];

/// <reference types="@microsoft/msfs-types/js/simplane" />
/**
 * The available facility frequency types.
 */
var FacilityFrequencyType;
(function (FacilityFrequencyType) {
    FacilityFrequencyType[FacilityFrequencyType["None"] = 0] = "None";
    FacilityFrequencyType[FacilityFrequencyType["ATIS"] = 1] = "ATIS";
    FacilityFrequencyType[FacilityFrequencyType["Multicom"] = 2] = "Multicom";
    FacilityFrequencyType[FacilityFrequencyType["Unicom"] = 3] = "Unicom";
    FacilityFrequencyType[FacilityFrequencyType["CTAF"] = 4] = "CTAF";
    FacilityFrequencyType[FacilityFrequencyType["Ground"] = 5] = "Ground";
    FacilityFrequencyType[FacilityFrequencyType["Tower"] = 6] = "Tower";
    FacilityFrequencyType[FacilityFrequencyType["Clearance"] = 7] = "Clearance";
    FacilityFrequencyType[FacilityFrequencyType["Approach"] = 8] = "Approach";
    FacilityFrequencyType[FacilityFrequencyType["Departure"] = 9] = "Departure";
    FacilityFrequencyType[FacilityFrequencyType["Center"] = 10] = "Center";
    FacilityFrequencyType[FacilityFrequencyType["FSS"] = 11] = "FSS";
    FacilityFrequencyType[FacilityFrequencyType["AWOS"] = 12] = "AWOS";
    FacilityFrequencyType[FacilityFrequencyType["ASOS"] = 13] = "ASOS";
    /** Clearance Pre-Taxi*/
    FacilityFrequencyType[FacilityFrequencyType["CPT"] = 14] = "CPT";
    /** Remote Clearance Delivery */
    FacilityFrequencyType[FacilityFrequencyType["GCO"] = 15] = "GCO";
})(FacilityFrequencyType || (FacilityFrequencyType = {}));
/** Additional Approach Types (additive to those defined in simplane). */
var AdditionalApproachType;
(function (AdditionalApproachType) {
    AdditionalApproachType[AdditionalApproachType["APPROACH_TYPE_VISUAL"] = 99] = "APPROACH_TYPE_VISUAL";
})(AdditionalApproachType || (AdditionalApproachType = {}));
/**
 * Flags indicating the approach fix type.
 */
var FixTypeFlags;
(function (FixTypeFlags) {
    FixTypeFlags[FixTypeFlags["None"] = 0] = "None";
    FixTypeFlags[FixTypeFlags["IAF"] = 1] = "IAF";
    FixTypeFlags[FixTypeFlags["IF"] = 2] = "IF";
    FixTypeFlags[FixTypeFlags["MAP"] = 4] = "MAP";
    FixTypeFlags[FixTypeFlags["FAF"] = 8] = "FAF";
    FixTypeFlags[FixTypeFlags["MAHP"] = 16] = "MAHP";
})(FixTypeFlags || (FixTypeFlags = {}));
/**
 * Flags indicating the rnav approach type.
 */
var RnavTypeFlags;
(function (RnavTypeFlags) {
    RnavTypeFlags[RnavTypeFlags["None"] = 0] = "None";
    RnavTypeFlags[RnavTypeFlags["LNAV"] = 1] = "LNAV";
    RnavTypeFlags[RnavTypeFlags["LNAVVNAV"] = 2] = "LNAVVNAV";
    RnavTypeFlags[RnavTypeFlags["LP"] = 4] = "LP";
    RnavTypeFlags[RnavTypeFlags["LPV"] = 8] = "LPV";
})(RnavTypeFlags || (RnavTypeFlags = {}));
/**
 * The class of airport facility.
 */
var AirportClass;
(function (AirportClass) {
    /** No other airport class could be identified. */
    AirportClass[AirportClass["None"] = 0] = "None";
    /** The airport has at least one hard surface runway. */
    AirportClass[AirportClass["HardSurface"] = 1] = "HardSurface";
    /** The airport has no hard surface runways. */
    AirportClass[AirportClass["SoftSurface"] = 2] = "SoftSurface";
    /** The airport has only water surface runways. */
    AirportClass[AirportClass["AllWater"] = 3] = "AllWater";
    /** The airport has no runways, but does contain helipads. */
    AirportClass[AirportClass["HeliportOnly"] = 4] = "HeliportOnly";
    /** The airport is a non-public use airport. */
    AirportClass[AirportClass["Private"] = 5] = "Private";
})(AirportClass || (AirportClass = {}));
/**
 * The class of an airport facility, expressed as a mask for nearest airport search session filtering.
 */
var AirportClassMask;
(function (AirportClassMask) {
    /** No other airport class could be identified. */
    AirportClassMask[AirportClassMask["None"] = 0] = "None";
    /** The airport has at least one hard surface runway. */
    AirportClassMask[AirportClassMask["HardSurface"] = 2] = "HardSurface";
    /** The airport has no hard surface runways. */
    AirportClassMask[AirportClassMask["SoftSurface"] = 4] = "SoftSurface";
    /** The airport has only water surface runways. */
    AirportClassMask[AirportClassMask["AllWater"] = 8] = "AllWater";
    /** The airport has no runways, but does contain helipads. */
    AirportClassMask[AirportClassMask["HeliportOnly"] = 16] = "HeliportOnly";
    /** The airport is a non-public use airport. */
    AirportClassMask[AirportClassMask["Private"] = 32] = "Private";
})(AirportClassMask || (AirportClassMask = {}));
/**
 * An enumeration of possible intersection types.
 */
var IntersectionType;
(function (IntersectionType) {
    IntersectionType[IntersectionType["None"] = 0] = "None";
    IntersectionType[IntersectionType["Named"] = 1] = "Named";
    IntersectionType[IntersectionType["Unnamed"] = 2] = "Unnamed";
    IntersectionType[IntersectionType["Vor"] = 3] = "Vor";
    IntersectionType[IntersectionType["NDB"] = 4] = "NDB";
    IntersectionType[IntersectionType["Offroute"] = 5] = "Offroute";
    IntersectionType[IntersectionType["IAF"] = 6] = "IAF";
    IntersectionType[IntersectionType["FAF"] = 7] = "FAF";
    IntersectionType[IntersectionType["RNAV"] = 8] = "RNAV";
    IntersectionType[IntersectionType["VFR"] = 9] = "VFR";
})(IntersectionType || (IntersectionType = {}));
var UserFacilityType;
(function (UserFacilityType) {
    UserFacilityType[UserFacilityType["RADIAL_RADIAL"] = 0] = "RADIAL_RADIAL";
    UserFacilityType[UserFacilityType["RADIAL_DISTANCE"] = 1] = "RADIAL_DISTANCE";
    UserFacilityType[UserFacilityType["LAT_LONG"] = 2] = "LAT_LONG";
})(UserFacilityType || (UserFacilityType = {}));
/**
 * ARINC 424 Leg Types
 */
var LegType;
(function (LegType) {
    /** An unknown leg type. */
    LegType[LegType["Unknown"] = 0] = "Unknown";
    /** An arc-to-fix leg. This indicates a DME arc leg to a specified fix.*/
    LegType[LegType["AF"] = 1] = "AF";
    /** A course-to-altitude leg. */
    LegType[LegType["CA"] = 2] = "CA";
    /**
     * A course-to-DME-distance leg. This leg is flown on a wind corrected course
     * to a specific DME distance from another fix.
     */
    LegType[LegType["CD"] = 3] = "CD";
    /** A course-to-fix leg.*/
    LegType[LegType["CF"] = 4] = "CF";
    /** A course-to-intercept leg. */
    LegType[LegType["CI"] = 5] = "CI";
    /** A course-to-radial intercept leg. */
    LegType[LegType["CR"] = 6] = "CR";
    /** A direct-to-fix leg, from an unspecified starting position. */
    LegType[LegType["DF"] = 7] = "DF";
    /**
     * A fix-to-altitude leg. A FA leg is flown on a track from a fix to a
     * specified altitude.
     */
    LegType[LegType["FA"] = 8] = "FA";
    /**
     * A fix-to-distance leg. This leg is flown on a track from a fix to a
     * specific distance from the fix.
     */
    LegType[LegType["FC"] = 9] = "FC";
    /**
     * A fix to DME distance leg. This leg is flown on a track from a fix to
     * a specific DME distance from another fix.
     */
    LegType[LegType["FD"] = 10] = "FD";
    /** A course-to-manual-termination leg. */
    LegType[LegType["FM"] = 11] = "FM";
    /** A hold-to-altitude leg. The hold is flown until a specified altitude is reached. */
    LegType[LegType["HA"] = 12] = "HA";
    /**
     * A hold-to-fix leg. This indicates one time around the hold circuit and
     * then an exit.
     */
    LegType[LegType["HF"] = 13] = "HF";
    /** A hold-to-manual-termination leg. */
    LegType[LegType["HM"] = 14] = "HM";
    /** Initial procedure fix. */
    LegType[LegType["IF"] = 15] = "IF";
    /** A procedure turn leg. */
    LegType[LegType["PI"] = 16] = "PI";
    /** A radius-to-fix leg, with endpoint fixes, a center fix, and a radius. */
    LegType[LegType["RF"] = 17] = "RF";
    /** A track-to-fix leg, from the previous fix to the terminator. */
    LegType[LegType["TF"] = 18] = "TF";
    /** A heading-to-altitude leg. */
    LegType[LegType["VA"] = 19] = "VA";
    /** A heading-to-DME-distance leg. */
    LegType[LegType["VD"] = 20] = "VD";
    /** A heading-to-intercept leg. */
    LegType[LegType["VI"] = 21] = "VI";
    /** A heading-to-manual-termination leg. */
    LegType[LegType["VM"] = 22] = "VM";
    /** A heading-to-radial intercept leg. */
    LegType[LegType["VR"] = 23] = "VR";
    /** A leg representing a lateral and vertical discontinuity in the flight plan. */
    LegType[LegType["Discontinuity"] = 99] = "Discontinuity";
    /** A leg representing a lateral and vertical discontinuity in the flight plan that does not prevent sequencing. */
    LegType[LegType["ThruDiscontinuity"] = 100] = "ThruDiscontinuity";
})(LegType || (LegType = {}));
/**
 * Types of altitude restrictions on procedure legs.
 */
var AltitudeRestrictionType;
(function (AltitudeRestrictionType) {
    AltitudeRestrictionType[AltitudeRestrictionType["Unused"] = 0] = "Unused";
    AltitudeRestrictionType[AltitudeRestrictionType["At"] = 1] = "At";
    AltitudeRestrictionType[AltitudeRestrictionType["AtOrAbove"] = 2] = "AtOrAbove";
    AltitudeRestrictionType[AltitudeRestrictionType["AtOrBelow"] = 3] = "AtOrBelow";
    AltitudeRestrictionType[AltitudeRestrictionType["Between"] = 4] = "Between";
})(AltitudeRestrictionType || (AltitudeRestrictionType = {}));
var LegTurnDirection;
(function (LegTurnDirection) {
    LegTurnDirection[LegTurnDirection["None"] = 0] = "None";
    LegTurnDirection[LegTurnDirection["Left"] = 1] = "Left";
    LegTurnDirection[LegTurnDirection["Right"] = 2] = "Right";
    LegTurnDirection[LegTurnDirection["Either"] = 3] = "Either";
})(LegTurnDirection || (LegTurnDirection = {}));
var AirwayType;
(function (AirwayType) {
    AirwayType[AirwayType["None"] = 0] = "None";
    AirwayType[AirwayType["Victor"] = 1] = "Victor";
    AirwayType[AirwayType["Jet"] = 2] = "Jet";
    AirwayType[AirwayType["Both"] = 3] = "Both";
})(AirwayType || (AirwayType = {}));
var NdbType;
(function (NdbType) {
    NdbType[NdbType["CompassPoint"] = 0] = "CompassPoint";
    NdbType[NdbType["MH"] = 1] = "MH";
    NdbType[NdbType["H"] = 2] = "H";
    NdbType[NdbType["HH"] = 3] = "HH";
})(NdbType || (NdbType = {}));
var VorType;
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
var RunwaySurfaceType;
(function (RunwaySurfaceType) {
    RunwaySurfaceType[RunwaySurfaceType["Concrete"] = 0] = "Concrete";
    RunwaySurfaceType[RunwaySurfaceType["Grass"] = 1] = "Grass";
    RunwaySurfaceType[RunwaySurfaceType["WaterFSX"] = 2] = "WaterFSX";
    RunwaySurfaceType[RunwaySurfaceType["GrassBumpy"] = 3] = "GrassBumpy";
    RunwaySurfaceType[RunwaySurfaceType["Asphalt"] = 4] = "Asphalt";
    RunwaySurfaceType[RunwaySurfaceType["ShortGrass"] = 5] = "ShortGrass";
    RunwaySurfaceType[RunwaySurfaceType["LongGrass"] = 6] = "LongGrass";
    RunwaySurfaceType[RunwaySurfaceType["HardTurf"] = 7] = "HardTurf";
    RunwaySurfaceType[RunwaySurfaceType["Snow"] = 8] = "Snow";
    RunwaySurfaceType[RunwaySurfaceType["Ice"] = 9] = "Ice";
    RunwaySurfaceType[RunwaySurfaceType["Urban"] = 10] = "Urban";
    RunwaySurfaceType[RunwaySurfaceType["Forest"] = 11] = "Forest";
    RunwaySurfaceType[RunwaySurfaceType["Dirt"] = 12] = "Dirt";
    RunwaySurfaceType[RunwaySurfaceType["Coral"] = 13] = "Coral";
    RunwaySurfaceType[RunwaySurfaceType["Gravel"] = 14] = "Gravel";
    RunwaySurfaceType[RunwaySurfaceType["OilTreated"] = 15] = "OilTreated";
    RunwaySurfaceType[RunwaySurfaceType["SteelMats"] = 16] = "SteelMats";
    RunwaySurfaceType[RunwaySurfaceType["Bituminous"] = 17] = "Bituminous";
    RunwaySurfaceType[RunwaySurfaceType["Brick"] = 18] = "Brick";
    RunwaySurfaceType[RunwaySurfaceType["Macadam"] = 19] = "Macadam";
    RunwaySurfaceType[RunwaySurfaceType["Planks"] = 20] = "Planks";
    RunwaySurfaceType[RunwaySurfaceType["Sand"] = 21] = "Sand";
    RunwaySurfaceType[RunwaySurfaceType["Shale"] = 22] = "Shale";
    RunwaySurfaceType[RunwaySurfaceType["Tarmac"] = 23] = "Tarmac";
    RunwaySurfaceType[RunwaySurfaceType["WrightFlyerTrack"] = 24] = "WrightFlyerTrack";
    //SURFACE_TYPE_LAST_FSX
    RunwaySurfaceType[RunwaySurfaceType["Ocean"] = 26] = "Ocean";
    RunwaySurfaceType[RunwaySurfaceType["Water"] = 27] = "Water";
    RunwaySurfaceType[RunwaySurfaceType["Pond"] = 28] = "Pond";
    RunwaySurfaceType[RunwaySurfaceType["Lake"] = 29] = "Lake";
    RunwaySurfaceType[RunwaySurfaceType["River"] = 30] = "River";
    RunwaySurfaceType[RunwaySurfaceType["WasteWater"] = 31] = "WasteWater";
    RunwaySurfaceType[RunwaySurfaceType["Paint"] = 32] = "Paint";
    // UNUSED
    // SURFACE_TYPE_ERASE_GRASS
})(RunwaySurfaceType || (RunwaySurfaceType = {}));
var RunwayLightingType;
(function (RunwayLightingType) {
    RunwayLightingType[RunwayLightingType["Unknown"] = 0] = "Unknown";
    RunwayLightingType[RunwayLightingType["None"] = 1] = "None";
    RunwayLightingType[RunwayLightingType["PartTime"] = 2] = "PartTime";
    RunwayLightingType[RunwayLightingType["FullTime"] = 3] = "FullTime";
    RunwayLightingType[RunwayLightingType["Frequency"] = 4] = "Frequency";
})(RunwayLightingType || (RunwayLightingType = {}));
var AirportPrivateType;
(function (AirportPrivateType) {
    AirportPrivateType[AirportPrivateType["Uknown"] = 0] = "Uknown";
    AirportPrivateType[AirportPrivateType["Public"] = 1] = "Public";
    AirportPrivateType[AirportPrivateType["Military"] = 2] = "Military";
    AirportPrivateType[AirportPrivateType["Private"] = 3] = "Private";
})(AirportPrivateType || (AirportPrivateType = {}));
var GpsBoolean;
(function (GpsBoolean) {
    GpsBoolean[GpsBoolean["Unknown"] = 0] = "Unknown";
    GpsBoolean[GpsBoolean["No"] = 1] = "No";
    GpsBoolean[GpsBoolean["Yes"] = 2] = "Yes";
})(GpsBoolean || (GpsBoolean = {}));
var VorClass;
(function (VorClass) {
    VorClass[VorClass["Unknown"] = 0] = "Unknown";
    VorClass[VorClass["Terminal"] = 1] = "Terminal";
    VorClass[VorClass["LowAlt"] = 2] = "LowAlt";
    VorClass[VorClass["HighAlt"] = 3] = "HighAlt";
    VorClass[VorClass["ILS"] = 4] = "ILS";
    VorClass[VorClass["VOT"] = 5] = "VOT";
})(VorClass || (VorClass = {}));
var FacilityType;
(function (FacilityType) {
    FacilityType["Airport"] = "LOAD_AIRPORT";
    FacilityType["Intersection"] = "LOAD_INTERSECTION";
    FacilityType["VOR"] = "LOAD_VOR";
    FacilityType["NDB"] = "LOAD_NDB";
    FacilityType["USR"] = "USR";
    FacilityType["RWY"] = "RWY";
    FacilityType["VIS"] = "VIS";
})(FacilityType || (FacilityType = {}));
var FacilitySearchType;
(function (FacilitySearchType) {
    FacilitySearchType[FacilitySearchType["All"] = 0] = "All";
    FacilitySearchType[FacilitySearchType["Airport"] = 1] = "Airport";
    FacilitySearchType[FacilitySearchType["Intersection"] = 2] = "Intersection";
    FacilitySearchType[FacilitySearchType["Vor"] = 3] = "Vor";
    FacilitySearchType[FacilitySearchType["Ndb"] = 4] = "Ndb";
    FacilitySearchType[FacilitySearchType["Boundary"] = 5] = "Boundary";
    FacilitySearchType[FacilitySearchType["User"] = 6] = "User";
    FacilitySearchType[FacilitySearchType["Visual"] = 7] = "Visual";
    FacilitySearchType[FacilitySearchType["AllExceptVisual"] = 8] = "AllExceptVisual";
})(FacilitySearchType || (FacilitySearchType = {}));
/**
 * A type of airspace boundary.
 */
var BoundaryType;
(function (BoundaryType) {
    BoundaryType[BoundaryType["None"] = 0] = "None";
    BoundaryType[BoundaryType["Center"] = 1] = "Center";
    BoundaryType[BoundaryType["ClassA"] = 2] = "ClassA";
    BoundaryType[BoundaryType["ClassB"] = 3] = "ClassB";
    BoundaryType[BoundaryType["ClassC"] = 4] = "ClassC";
    BoundaryType[BoundaryType["ClassD"] = 5] = "ClassD";
    BoundaryType[BoundaryType["ClassE"] = 6] = "ClassE";
    BoundaryType[BoundaryType["ClassF"] = 7] = "ClassF";
    BoundaryType[BoundaryType["ClassG"] = 8] = "ClassG";
    BoundaryType[BoundaryType["Tower"] = 9] = "Tower";
    BoundaryType[BoundaryType["Clearance"] = 10] = "Clearance";
    BoundaryType[BoundaryType["Ground"] = 11] = "Ground";
    BoundaryType[BoundaryType["Departure"] = 12] = "Departure";
    BoundaryType[BoundaryType["Approach"] = 13] = "Approach";
    BoundaryType[BoundaryType["MOA"] = 14] = "MOA";
    BoundaryType[BoundaryType["Restricted"] = 15] = "Restricted";
    BoundaryType[BoundaryType["Prohibited"] = 16] = "Prohibited";
    BoundaryType[BoundaryType["Warning"] = 17] = "Warning";
    BoundaryType[BoundaryType["Alert"] = 18] = "Alert";
    BoundaryType[BoundaryType["Danger"] = 19] = "Danger";
    BoundaryType[BoundaryType["NationalPark"] = 20] = "NationalPark";
    BoundaryType[BoundaryType["ModeC"] = 21] = "ModeC";
    BoundaryType[BoundaryType["Radar"] = 22] = "Radar";
    BoundaryType[BoundaryType["Training"] = 23] = "Training";
})(BoundaryType || (BoundaryType = {}));
/**
 * A type of airspace boundary altitude maxima.
 */
var BoundaryAltitudeType;
(function (BoundaryAltitudeType) {
    BoundaryAltitudeType[BoundaryAltitudeType["Unknown"] = 0] = "Unknown";
    BoundaryAltitudeType[BoundaryAltitudeType["MSL"] = 1] = "MSL";
    BoundaryAltitudeType[BoundaryAltitudeType["AGL"] = 2] = "AGL";
    BoundaryAltitudeType[BoundaryAltitudeType["Unlimited"] = 3] = "Unlimited";
})(BoundaryAltitudeType || (BoundaryAltitudeType = {}));
/**
 * A type of boundary geometry vector.
 */
var BoundaryVectorType;
(function (BoundaryVectorType) {
    BoundaryVectorType[BoundaryVectorType["None"] = 0] = "None";
    BoundaryVectorType[BoundaryVectorType["Start"] = 1] = "Start";
    BoundaryVectorType[BoundaryVectorType["Line"] = 2] = "Line";
    BoundaryVectorType[BoundaryVectorType["Origin"] = 3] = "Origin";
    BoundaryVectorType[BoundaryVectorType["ArcCW"] = 4] = "ArcCW";
    BoundaryVectorType[BoundaryVectorType["ArcCCW"] = 5] = "ArcCCW";
    BoundaryVectorType[BoundaryVectorType["Circle"] = 6] = "Circle";
})(BoundaryVectorType || (BoundaryVectorType = {}));
/**
 * Wind speed units used by METAR.
 */
var MetarWindSpeedUnits;
(function (MetarWindSpeedUnits) {
    MetarWindSpeedUnits[MetarWindSpeedUnits["Knot"] = 0] = "Knot";
    MetarWindSpeedUnits[MetarWindSpeedUnits["MeterPerSecond"] = 1] = "MeterPerSecond";
    MetarWindSpeedUnits[MetarWindSpeedUnits["KilometerPerHour"] = 2] = "KilometerPerHour";
})(MetarWindSpeedUnits || (MetarWindSpeedUnits = {}));
/** Visibility distance units used by METAR. */
var MetarVisibilityUnits;
(function (MetarVisibilityUnits) {
    MetarVisibilityUnits[MetarVisibilityUnits["Meter"] = 0] = "Meter";
    MetarVisibilityUnits[MetarVisibilityUnits["StatuteMile"] = 1] = "StatuteMile";
})(MetarVisibilityUnits || (MetarVisibilityUnits = {}));
/**
 * METAR cloud layer coverage/sky condition.
 */
var MetarCloudLayerCoverage;
(function (MetarCloudLayerCoverage) {
    MetarCloudLayerCoverage[MetarCloudLayerCoverage["SkyClear"] = 0] = "SkyClear";
    MetarCloudLayerCoverage[MetarCloudLayerCoverage["Clear"] = 1] = "Clear";
    MetarCloudLayerCoverage[MetarCloudLayerCoverage["NoSignificant"] = 2] = "NoSignificant";
    MetarCloudLayerCoverage[MetarCloudLayerCoverage["Few"] = 3] = "Few";
    MetarCloudLayerCoverage[MetarCloudLayerCoverage["Scattered"] = 4] = "Scattered";
    MetarCloudLayerCoverage[MetarCloudLayerCoverage["Broken"] = 5] = "Broken";
    MetarCloudLayerCoverage[MetarCloudLayerCoverage["Overcast"] = 6] = "Overcast";
})(MetarCloudLayerCoverage || (MetarCloudLayerCoverage = {}));
/**
 * METAR significant cloud types.
 */
var MetarCloudLayerType;
(function (MetarCloudLayerType) {
    MetarCloudLayerType[MetarCloudLayerType["Unspecified"] = -1] = "Unspecified";
    MetarCloudLayerType[MetarCloudLayerType["ToweringCumulus"] = 0] = "ToweringCumulus";
    MetarCloudLayerType[MetarCloudLayerType["Cumulonimbus"] = 1] = "Cumulonimbus";
    MetarCloudLayerType[MetarCloudLayerType["AltocumulusCastellanus"] = 2] = "AltocumulusCastellanus";
})(MetarCloudLayerType || (MetarCloudLayerType = {}));
/** METAR phenomenon types. */
var MetarPhenomenonType;
(function (MetarPhenomenonType) {
    MetarPhenomenonType[MetarPhenomenonType["None"] = 0] = "None";
    MetarPhenomenonType[MetarPhenomenonType["Mist"] = 1] = "Mist";
    MetarPhenomenonType[MetarPhenomenonType["Duststorm"] = 2] = "Duststorm";
    MetarPhenomenonType[MetarPhenomenonType["Dust"] = 3] = "Dust";
    MetarPhenomenonType[MetarPhenomenonType["Drizzle"] = 4] = "Drizzle";
    MetarPhenomenonType[MetarPhenomenonType["FunnelCloud"] = 5] = "FunnelCloud";
    MetarPhenomenonType[MetarPhenomenonType["Fog"] = 6] = "Fog";
    MetarPhenomenonType[MetarPhenomenonType["Smoke"] = 7] = "Smoke";
    MetarPhenomenonType[MetarPhenomenonType["Hail"] = 8] = "Hail";
    MetarPhenomenonType[MetarPhenomenonType["SmallHail"] = 9] = "SmallHail";
    MetarPhenomenonType[MetarPhenomenonType["Haze"] = 10] = "Haze";
    MetarPhenomenonType[MetarPhenomenonType["IceCrystals"] = 11] = "IceCrystals";
    MetarPhenomenonType[MetarPhenomenonType["IcePellets"] = 12] = "IcePellets";
    MetarPhenomenonType[MetarPhenomenonType["DustSandWhorls"] = 13] = "DustSandWhorls";
    MetarPhenomenonType[MetarPhenomenonType["Spray"] = 14] = "Spray";
    MetarPhenomenonType[MetarPhenomenonType["Rain"] = 15] = "Rain";
    MetarPhenomenonType[MetarPhenomenonType["Sand"] = 16] = "Sand";
    MetarPhenomenonType[MetarPhenomenonType["SnowGrains"] = 17] = "SnowGrains";
    MetarPhenomenonType[MetarPhenomenonType["Shower"] = 18] = "Shower";
    MetarPhenomenonType[MetarPhenomenonType["Snow"] = 19] = "Snow";
    MetarPhenomenonType[MetarPhenomenonType["Squalls"] = 20] = "Squalls";
    MetarPhenomenonType[MetarPhenomenonType["Sandstorm"] = 21] = "Sandstorm";
    MetarPhenomenonType[MetarPhenomenonType["UnknownPrecip"] = 22] = "UnknownPrecip";
    MetarPhenomenonType[MetarPhenomenonType["VolcanicAsh"] = 23] = "VolcanicAsh";
})(MetarPhenomenonType || (MetarPhenomenonType = {}));
/** METAR phenomenon intensities. */
var MetarPhenomenonIntensity;
(function (MetarPhenomenonIntensity) {
    MetarPhenomenonIntensity[MetarPhenomenonIntensity["Light"] = -1] = "Light";
    MetarPhenomenonIntensity[MetarPhenomenonIntensity["Normal"] = 0] = "Normal";
    MetarPhenomenonIntensity[MetarPhenomenonIntensity["Heavy"] = 1] = "Heavy";
})(MetarPhenomenonIntensity || (MetarPhenomenonIntensity = {}));
/**
 * Methods for working with FS ICAO strings.
 */
class ICAO {
    /**
     * Gets the facility type from an ICAO.
     * @param icao The icao to get the facility type for.
     * @returns The ICAO facility type.
     * @throws An error if the facility type cannot be determined.
     */
    static getFacilityType(icao) {
        switch (icao[0]) {
            case 'A':
                return FacilityType.Airport;
            case 'W':
                return FacilityType.Intersection;
            case 'V':
                return FacilityType.VOR;
            case 'N':
                return FacilityType.NDB;
            case 'U':
                return FacilityType.USR;
            case 'R':
                return FacilityType.RWY;
            case 'S':
                return FacilityType.VIS;
            default:
                throw new Error(`ICAO ${icao} has unknown type: ${icao[0]}`);
        }
    }
    /**
     * Returns the ident of the icao's associated airport. (ex. for terminal waypoints)
     * @param icao The icao to get the airport ident for.
     * @returns The airport ident.
     */
    static getAssociatedAirportIdent(icao) {
        return icao.substr(3, 4).trim();
    }
    /**
     * Checks whether an ICAO string defines a facility (optionally of a specific type).
     * @param icao An ICAO string.
     * @param type The specific facility type to check against. If not defined, this method will return `true` as long as
     * the ICAO string defines any valid facility type.
     * @returns Whether the given ICAO string defines a facility of the specified type.
     */
    static isFacility(icao, type) {
        switch (icao[0]) {
            case 'A':
                return type === undefined || type === FacilityType.Airport;
            case 'W':
                return type === undefined || type === FacilityType.Intersection;
            case 'V':
                return type === undefined || type === FacilityType.VOR;
            case 'N':
                return type === undefined || type === FacilityType.NDB;
            case 'U':
                return type === undefined || type === FacilityType.USR;
            case 'R':
                return type === undefined || type === FacilityType.RWY;
            case 'S':
                return type === undefined || type === FacilityType.VIS;
            default:
                return false;
        }
    }
    /**
     * Gets the ident for a given ICAO string.
     * @param icao The FS ICAO to get the ident for.
     * @returns The ICAO ident.
     */
    static getIdent(icao) {
        return icao.substr(7).trim();
    }
    /**
     * Gets the region code for a given ICAO string.
     * @param icao The FS ICAO to get the ident for.
     * @returns The two letter region code.
     */
    static getRegionCode(icao) {
        return icao.substr(1, 2).trim();
    }
}
/**
 * An empty ICAO.
 */
ICAO.emptyIcao = '            ';
/**
 * Utility functions for working with facilities.
 */
class FacilityUtils {
    /**
     * Checks whether a facility is of a given type.
     * @param facility The facility to check.
     * @param type The facility type to check against.
     * @returns Whether the facility is of the specified type.
     */
    static isFacilityType(facility, type) {
        // Need to check for the intersection version of VOR/NDB facilities - these facilities have identical ICAOs
        // to their VOR/NDB counterparts, so we need to manually check the __Type property on the facility object.
        if (facility['__Type'] === 'JS_FacilityIntersection') {
            return type === FacilityType.Intersection;
        }
        return ICAO.isFacility(facility.icao, type);
    }
    /**
     * Gets the magnetic variation at a facility, in degrees. If the facility is a VOR, the magnetic variation defined
     * by the VOR is returned. For all other facilities, the modeled magnetic variation at the location of the facility
     * is returned.
     * @param facility A facility.
     * @returns The magnetic variation at the specified facility, in degrees.
     */
    static getMagVar(facility) {
        if (FacilityUtils.isFacilityType(facility, FacilityType.VOR)) {
            return -facility.magneticVariation; // VOR facility magvar is positive west instead of the standard positive east
        }
        else {
            return MagVar.get(facility.lat, facility.lon);
        }
    }
    /**
     * Gets latitude/longitude coordinates corresponding to a radial and distance from a reference facility.
     * @param reference The reference facility.
     * @param radial The magnetic radial, in degrees.
     * @param distance The distance, in nautical miles.
     * @param out The GeoPoint object to which to write the result.
     * @returns The latitude/longitude coordinates corresponding to the specified radial and distance from the reference
     * facility.
     */
    static getLatLonFromRadialDistance(reference, radial, distance, out) {
        return FacilityUtils.geoPointCache[0].set(reference).offset(MagVar.magneticToTrue(radial, FacilityUtils.getMagVar(reference)), UnitType.NMILE.convertTo(distance, UnitType.GA_RADIAN), out);
    }
    /**
     * Gets latitude/longitude coordinates corresponding to the intersection of two facility radials.
     * @param reference1 The first reference facility.
     * @param radial1 The first magnetic radial, in degrees.
     * @param reference2 The second reference facility.
     * @param radial2 The second magnetic radial, in degrees.
     * @param out The GeoPoint object to which to write the result.
     * @returns The latitude/longitude coordinates corresponding to the intersection of the two specified radials. If
     * the specified radials do not intersect at a unique point, `NaN` is written to both `lat` and `lon`.
     */
    static getLatLonFromRadialRadial(reference1, radial1, reference2, radial2, out) {
        const magVar1 = FacilityUtils.getMagVar(reference1);
        const magVar2 = FacilityUtils.getMagVar(reference2);
        const radialCircle1 = FacilityUtils.geoCircleCache[0].setAsGreatCircle(reference1, MagVar.magneticToTrue(radial1, magVar1));
        const radialCircle2 = FacilityUtils.geoCircleCache[1].setAsGreatCircle(reference2, MagVar.magneticToTrue(radial2, magVar2));
        const radial1IncludesRef2 = radialCircle1.includes(reference2);
        const radial2IncludesRef1 = radialCircle2.includes(reference1);
        if (radial1IncludesRef2 && radial2IncludesRef1) {
            // Radials are parallel or antiparallel, and therefore do not have a unique intersection point.
            return out.set(NaN, NaN);
        }
        else if (radial1IncludesRef2) {
            // Reference 2 lies along the great circle of radial 1. The intersection point therefore is either reference 2
            // or its antipode. One of the two lies on the radial, and the other lies on the anti-radial.
            return radialCircle1.angleAlong(reference1, reference2, Math.PI) < Math.PI ? out.set(reference2) : out.set(reference2).antipode();
        }
        else if (radial2IncludesRef1) {
            // Reference 1 lies along the great circle of radial 2. The intersection point therefore is either reference 1
            // or its antipode. One of the two lies on the radial, and the other lies on the anti-radial.
            return radialCircle2.angleAlong(reference2, reference1, Math.PI) < Math.PI ? out.set(reference1) : out.set(reference1).antipode();
        }
        // Radials, unlike great circles, do not circumscribe the globe. Therefore, we choose the order of the intersection
        // operation carefully to ensure that the first solution (if it exists) is the "correct" intersection.
        const numIntersections = radialCircle1.encircles(reference2)
            ? radialCircle2.intersectionGeoPoint(radialCircle1, FacilityUtils.intersectionCache)
            : radialCircle1.intersectionGeoPoint(radialCircle2, FacilityUtils.intersectionCache);
        if (numIntersections === 0) {
            return out.set(NaN, NaN);
        }
        return out.set(FacilityUtils.intersectionCache[0]);
    }
}
FacilityUtils.geoPointCache = [new GeoPoint(0, 0)];
FacilityUtils.geoCircleCache = [new GeoCircle(Vec3Math.create(), 0), new GeoCircle(Vec3Math.create(), 0)];
FacilityUtils.intersectionCache = [new GeoPoint(0, 0), new GeoPoint(0, 0)];
[new GeoPoint(0, 0)];

var RunwaySurfaceCategory;
(function (RunwaySurfaceCategory) {
    RunwaySurfaceCategory[RunwaySurfaceCategory["Unknown"] = 1] = "Unknown";
    RunwaySurfaceCategory[RunwaySurfaceCategory["Hard"] = 2] = "Hard";
    RunwaySurfaceCategory[RunwaySurfaceCategory["Soft"] = 4] = "Soft";
    RunwaySurfaceCategory[RunwaySurfaceCategory["Water"] = 8] = "Water";
})(RunwaySurfaceCategory || (RunwaySurfaceCategory = {}));
/**
 * Methods for working with Runways and Runway Designations.
 */
class RunwayUtils {
    /**
     * Gets the letter for a runway designator.
     * @param designator A runway designator.
     * @param lowerCase Whether the letter should be lower case. False by default.
     * @returns The letter for the specified runway designator.
     */
    static getDesignatorLetter(designator, lowerCase = false) {
        const letter = RunwayUtils.RUNWAY_DESIGNATOR_LETTERS[designator];
        return lowerCase
            ? letter.toLowerCase()
            : letter;
    }
    /**
     * Creates an empty one-way runway.
     * @returns an empty one-way runway.
     */
    static createEmptyOneWayRunway() {
        return {
            parentRunwayIndex: -1,
            designation: '',
            direction: 36,
            runwayDesignator: RunwayDesignator.RUNWAY_DESIGNATOR_NONE,
            course: 0,
            elevation: 0,
            elevationEnd: 0,
            gradient: 0,
            latitude: 0,
            longitude: 0,
            length: 0,
            width: 0,
            startThresholdLength: 0,
            endThresholdLength: 0,
            surface: RunwaySurfaceType.Concrete,
            lighting: RunwayLightingType.Unknown
        };
    }
    /**
     * Utility method to return all of the one-way runways from a single airport facility
     * @param airport is the Airport Facility to evaluate
     * @returns all of the one-way runways in the airport facility, sorted.
     */
    static getOneWayRunwaysFromAirport(airport) {
        const runways = [];
        airport.runways.map((r, i) => RunwayUtils.getOneWayRunways(r, i)).forEach(d => {
            runways.push(d[0]);
            runways.push(d[1]);
        });
        runways.sort(RunwayUtils.sortRunways);
        return runways;
    }
    /**
     * Utility method to return two one-way runways from a single runway facility
     * @param runway is the AirportRunway object to evaluate
     * @param index is the index of the AirportRunway in the Facility
     * @returns splitRunways array of OneWayRunway objects
     */
    static getOneWayRunways(runway, index) {
        const splitRunways = [];
        const designations = runway.designation.split('-');
        for (let i = 0; i < designations.length; i++) {
            const runwayNumber = parseInt(designations[i]);
            let designator = RunwayDesignator.RUNWAY_DESIGNATOR_NONE;
            let course = 0;
            let thresholdDistanceFromCenter = 0;
            let thresholdElevation = 0;
            let endThresholdElevation = 0;
            let ilsFrequency;
            let startThresholdLength = 0, endThresholdLength = 0;
            if (i === 0) {
                designator = runway.designatorCharPrimary;
                course = runway.direction;
                thresholdDistanceFromCenter = (runway.length / 2) - runway.primaryThresholdLength;
                thresholdElevation = runway.primaryElevation;
                endThresholdElevation = runway.secondaryElevation;
                ilsFrequency = runway.primaryILSFrequency.freqMHz === 0 ? undefined : runway.primaryILSFrequency;
                startThresholdLength = runway.primaryThresholdLength;
                endThresholdLength = runway.secondaryThresholdLength;
            }
            else if (i === 1) {
                designator = runway.designatorCharSecondary;
                course = NavMath.normalizeHeading(runway.direction + 180);
                thresholdDistanceFromCenter = (runway.length / 2) - runway.secondaryThresholdLength;
                thresholdElevation = runway.secondaryElevation;
                endThresholdElevation = runway.primaryElevation;
                ilsFrequency = runway.secondaryILSFrequency.freqMHz === 0 ? undefined : runway.secondaryILSFrequency;
                startThresholdLength = runway.secondaryThresholdLength;
                endThresholdLength = runway.primaryThresholdLength;
            }
            const designation = RunwayUtils.getRunwayNameString(runwayNumber, designator);
            const coordinates = RunwayUtils.tempGeoPoint
                .set(runway.latitude, runway.longitude)
                .offset(course - 180, UnitType.METER.convertTo(thresholdDistanceFromCenter, UnitType.GA_RADIAN));
            splitRunways.push({
                parentRunwayIndex: index,
                designation,
                direction: runwayNumber,
                runwayDesignator: designator,
                course,
                elevation: thresholdElevation,
                elevationEnd: endThresholdElevation,
                gradient: (endThresholdElevation - thresholdElevation) / (runway.length - startThresholdLength - endThresholdLength) * 100,
                latitude: coordinates.lat,
                longitude: coordinates.lon,
                ilsFrequency,
                length: runway.length,
                width: runway.width,
                startThresholdLength,
                endThresholdLength,
                surface: runway.surface,
                lighting: runway.lighting
            });
        }
        return splitRunways;
    }
    /**
     * Gets a name for a paired runway. Names are formatted as dash-separated pairs of directional (one-way) runway
     * designations, with optional leading zero padding of the runway numbers. If the specified runway is not paired,
     * then the name will be the designation of the primary runway only.
     * @param runway A paired runway.
     * @param padded Whether the runway numbers should be padded with leading zeroes. Defaults to `true`.
     * @returns The name for the specified paired runway.
     */
    static getRunwayPairNameString(runway, padded = true) {
        const pad = padded ? 2 : 0;
        const dashIndex = runway.designation.search('-');
        const primary = `${(dashIndex < 0 ? runway.designation : runway.designation.substring(0, dashIndex)).padStart(pad)}${RunwayUtils.getDesignatorLetter(runway.designatorCharPrimary)}`;
        const secondary = dashIndex < 0 ? '' : `-${runway.designation.substring(dashIndex + 1).padStart(pad)}${RunwayUtils.getDesignatorLetter(runway.designatorCharSecondary)}`;
        return primary + secondary;
    }
    /**
     * Utility method to return the runway name from the number and designator (L/R/C/W)
     * @param runwayNumber is the integer part of a runway name (18, 26, 27, etc)
     * @param designator is the RunwayDesignator enum for the runway
     * @param padded Whether single-char runways should be 0-padded.
     * @param prefix A prefix to put before the runway name.
     * @returns the runway name string
     */
    static getRunwayNameString(runwayNumber, designator, padded = true, prefix = '') {
        let numberText = `${runwayNumber}`;
        if (padded) {
            numberText = numberText.padStart(2, '0');
        }
        return prefix + numberText + RunwayUtils.getDesignatorLetter(designator);
    }
    /**
     * Gets the primary runway number for a paired runway.
     * @param runway A paired runway.
     * @returns The primary runway number for the specified runway.
     */
    static getRunwayNumberPrimary(runway) {
        const dashIndex = runway.designation.search('-');
        if (dashIndex < 0) {
            return parseInt(runway.designation);
        }
        else {
            return parseInt(runway.designation.substring(0, dashIndex));
        }
    }
    /**
     * Gets the secondary runway number for a paired runway.
     * @param runway A paired runway.
     * @returns The secondary runway number for the specified runway, or `undefined` if the runway has no secondary
     * runway.
     */
    static getRunwayNumberSecondary(runway) {
        const dashIndex = runway.designation.search('-');
        if (dashIndex < 0) {
            return undefined;
        }
        else {
            return parseInt(runway.designation.substring(dashIndex + 1));
        }
    }
    /**
     * Gets a one-way runway from an airport that matches a runway designation by number and designator.
     * @param airport The airport facility in which to search for the match.
     * @param runwayNumber A runway number to match.
     * @param runwayDesignator A runway designator to match.
     * @returns The one-way runway which matches the designation, or undefined if no match could be found.
     */
    static matchOneWayRunway(airport, runwayNumber, runwayDesignator) {
        const length = airport.runways.length;
        for (let r = 0; r < length; r++) {
            const runway = airport.runways[r];
            const designation = runway.designation;
            const primaryRunwayNumber = parseInt(designation.split('-')[0]);
            const secondaryRunwayNumber = parseInt(designation.split('-')[1]);
            if (primaryRunwayNumber === runwayNumber && runway.designatorCharPrimary === runwayDesignator) {
                const oneWayRunways = RunwayUtils.getOneWayRunways(runway, r);
                return oneWayRunways[0];
            }
            else if (secondaryRunwayNumber === runwayNumber && runway.designatorCharSecondary === runwayDesignator) {
                const oneWayRunways = RunwayUtils.getOneWayRunways(runway, r);
                return oneWayRunways[1];
            }
        }
        return undefined;
    }
    /**
     * Gets a one-way runway from an airport that matches a runway designation string.
     * @param airport The airport facility in which to search for the match.
     * @param designation A runway designation.
     * @returns The one-way runway which matches the designation, or undefined if no match could be found.
     */
    static matchOneWayRunwayFromDesignation(airport, designation) {
        const length = airport.runways.length;
        for (let i = 0; i < length; i++) {
            const match = RunwayUtils.getOneWayRunways(airport.runways[i], i).find((r) => {
                return (r.designation === designation);
            });
            if (match) {
                return match;
            }
        }
        return undefined;
    }
    /**
     * Gets a one-way runway from an airport that matches a runway ident.
     * @param airport The airport facility in which to search for the match.
     * @param ident A runway ident.
     * @returns The one-way runway which matches the ident, or undefined if no match could be found.
     */
    static matchOneWayRunwayFromIdent(airport, ident) {
        return RunwayUtils.matchOneWayRunwayFromDesignation(airport, ident.substr(2).trim());
    }
    /**
     * Utility method to return the procedures for a given runway.
     * @param procedures The procedures for the airport.
     * @param runway The given runway to find procedures for.
     * @returns A list of approach procedures for the given runway.
     */
    static getProceduresForRunway(procedures, runway) {
        const oneways = new Array();
        // TODO Make the designation splitting logic a common routine too.
        const designations = runway.designation.split('-');
        for (let i = 0; i < designations.length; i++) {
            const runwayNumber = parseInt(designations[i]);
            let runwayName;
            if (i === 0) {
                runwayName = RunwayUtils.getRunwayNameString(runwayNumber, runway.designatorCharPrimary, false, '');
            }
            else {
                runwayName = RunwayUtils.getRunwayNameString(runwayNumber, runway.designatorCharSecondary, false, '');
            }
            oneways.push(runwayName);
        }
        const found = new Array();
        for (const procedure of procedures) {
            if (oneways.includes(procedure.runway.trim())) {
                found.push(procedure);
            }
            else if (procedure.runwayNumber === 0) {
                found.push(procedure);
            }
        }
        return found;
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    static getLocFrequency(airport, arg1, arg2) {
        let runway;
        if (typeof arg1 === 'string') {
            const matchedRunway = RunwayUtils.matchOneWayRunwayFromDesignation(airport, arg1);
            if (!matchedRunway) {
                return undefined;
            }
            runway = matchedRunway;
        }
        else if (typeof arg1 === 'number') {
            const matchedRunway = RunwayUtils.matchOneWayRunway(airport, arg1, arg2);
            if (!matchedRunway) {
                return undefined;
            }
            runway = matchedRunway;
        }
        else {
            runway = arg1;
        }
        const runwayDesignation = runway.designation;
        if (runway.ilsFrequency) {
            return runway.ilsFrequency;
        }
        for (let i = 0; i < airport.frequencies.length; i++) {
            // Note: drop the leading zero in the runway designation for the search because some third-party sceneries
            // format the frequency names without the leading zero.
            const match = airport.frequencies[i].name.search(runwayDesignation.replace(/^0/, ''));
            if (match > -1) {
                return airport.frequencies[i];
            }
        }
        return undefined;
    }
    /**
     * Gets the back course frequency for a runway.
     * @param airport The airport to which the query runway belongs.
     * @param runwayNumber The number of the query runway.
     * @param runwayDesignator The designator of the query runway.
     * @returns The bc frequency for the query runway, or undefined if one could not be found.
     */
    static getBcFrequency(airport, runwayNumber, runwayDesignator) {
        const matchedRunway = RunwayUtils.getOppositeOneWayRunway(airport, runwayNumber, runwayDesignator);
        if (!matchedRunway) {
            return undefined;
        }
        return RunwayUtils.getLocFrequency(airport, matchedRunway);
    }
    /**
     * Get the opposite one way runway from a runway number and designator.
     * @param airport The airport to which the query runway belongs.
     * @param runwayNumber The number of the query runway.
     * @param runwayDesignator The designator of the query runway.
     * @returns The opposite one way runway for the query runway, or undefined if one could not be found.
     */
    static getOppositeOneWayRunway(airport, runwayNumber, runwayDesignator) {
        const oppositeRunwayNumber = Math.round(NavMath.normalizeHeading(10 * (runwayNumber + 18)) / 10);
        let oppositeRunwayDesignator = RunwayDesignator.RUNWAY_DESIGNATOR_NONE;
        switch (runwayDesignator) {
            case RunwayDesignator.RUNWAY_DESIGNATOR_LEFT:
                oppositeRunwayDesignator = RunwayDesignator.RUNWAY_DESIGNATOR_RIGHT;
                break;
            case RunwayDesignator.RUNWAY_DESIGNATOR_RIGHT:
                oppositeRunwayDesignator = RunwayDesignator.RUNWAY_DESIGNATOR_LEFT;
                break;
            default:
                oppositeRunwayDesignator = runwayDesignator;
                break;
        }
        return RunwayUtils.matchOneWayRunway(airport, oppositeRunwayNumber, oppositeRunwayDesignator);
    }
    /**
     * A comparer for sorting runways by number, and then by L, C, and R.
     * @param r1 The first runway to compare.
     * @param r2 The second runway to compare.
     * @returns -1 if the first is before, 0 if equal, 1 if the first is after.
     */
    static sortRunways(r1, r2) {
        if (r1.direction === r2.direction) {
            let v1 = 0;
            if (r1.designation.indexOf('L') != -1) {
                v1 = 1;
            }
            else if (r1.designation.indexOf('C') != -1) {
                v1 = 2;
            }
            else if (r1.designation.indexOf('R') != -1) {
                v1 = 3;
            }
            let v2 = 0;
            if (r2.designation.indexOf('L') != -1) {
                v2 = 1;
            }
            else if (r2.designation.indexOf('C') != -1) {
                v2 = 2;
            }
            else if (r2.designation.indexOf('R') != -1) {
                v2 = 3;
            }
            return v1 - v2;
        }
        return r1.direction - r2.direction;
    }
    /**
     * Gets the ICAO string for the runway facility associated with a one-way runway.
     * @param airport The runway's parent airport, or the ICAO of the airport.
     * @param runway A one-way runway.
     * @returns the ICAO string for the runway facility associated with the one-way runway.
     */
    static getRunwayFacilityIcao(airport, runway) {
        const icao = typeof airport === 'string' ? airport : airport.icao;
        return `R  ${icao.substring(7, 11)}RW${runway.designation.padEnd(3, ' ')}`;
    }
    /**
     * Creates a runway waypoint facility from a runway.
     * @param airport The runway's parent airport.
     * @param runway A one-way runway.
     * @returns A runway waypoint facility corresponding to the runway.
     */
    static createRunwayFacility(airport, runway) {
        return {
            icao: RunwayUtils.getRunwayFacilityIcao(airport, runway),
            name: `Runway ${runway.designation}`,
            region: airport.region,
            city: airport.city,
            lat: runway.latitude,
            lon: runway.longitude,
            magvar: airport.magvar,
            runway
        };
    }
    /**
     * Gets an alpha code from a runway number.
     * @param number is the runway number.
     * @returns a letter.
     */
    static getRunwayCode(number) {
        const n = Math.round(number);
        return String.fromCharCode(48 + n + (n > 9 ? 7 : 0));
    }
    /**
     * Gets the runway surface category from a runway or runway surface type.
     * @param runway A runway or runway surface type.
     * @returns The surface category of the specified runway or runway surface type.
     */
    static getSurfaceCategory(runway) {
        const surface = typeof runway === 'object' ? runway.surface : runway;
        if (this.SURFACES_HARD.includes(surface)) {
            return RunwaySurfaceCategory.Hard;
        }
        else if (this.SURFACES_SOFT.includes(surface)) {
            return RunwaySurfaceCategory.Soft;
        }
        else if (this.SURFACES_WATER.includes(surface)) {
            return RunwaySurfaceCategory.Water;
        }
        else {
            return RunwaySurfaceCategory.Unknown;
        }
    }
}
RunwayUtils.RUNWAY_DESIGNATOR_LETTERS = {
    [RunwayDesignator.RUNWAY_DESIGNATOR_NONE]: '',
    [RunwayDesignator.RUNWAY_DESIGNATOR_LEFT]: 'L',
    [RunwayDesignator.RUNWAY_DESIGNATOR_RIGHT]: 'R',
    [RunwayDesignator.RUNWAY_DESIGNATOR_CENTER]: 'C',
    [RunwayDesignator.RUNWAY_DESIGNATOR_WATER]: 'W',
    [RunwayDesignator.RUNWAY_DESIGNATOR_A]: 'A',
    [RunwayDesignator.RUNWAY_DESIGNATOR_B]: 'B',
};
RunwayUtils.SURFACES_HARD = [
    RunwaySurfaceType.Asphalt,
    RunwaySurfaceType.Bituminous,
    RunwaySurfaceType.Brick,
    RunwaySurfaceType.Concrete,
    RunwaySurfaceType.Ice,
    RunwaySurfaceType.Macadam,
    RunwaySurfaceType.Paint,
    RunwaySurfaceType.Planks,
    RunwaySurfaceType.SteelMats,
    RunwaySurfaceType.Tarmac,
    RunwaySurfaceType.Urban,
];
RunwayUtils.SURFACES_SOFT = [
    RunwaySurfaceType.Coral,
    RunwaySurfaceType.Dirt,
    RunwaySurfaceType.Forest,
    RunwaySurfaceType.Grass,
    RunwaySurfaceType.GrassBumpy,
    RunwaySurfaceType.Gravel,
    RunwaySurfaceType.HardTurf,
    RunwaySurfaceType.LongGrass,
    RunwaySurfaceType.OilTreated,
    RunwaySurfaceType.Sand,
    RunwaySurfaceType.Shale,
    RunwaySurfaceType.ShortGrass,
    RunwaySurfaceType.Snow,
    RunwaySurfaceType.WrightFlyerTrack
];
RunwayUtils.SURFACES_WATER = [
    RunwaySurfaceType.WaterFSX,
    RunwaySurfaceType.Lake,
    RunwaySurfaceType.Ocean,
    RunwaySurfaceType.Pond,
    RunwaySurfaceType.River,
    RunwaySurfaceType.WasteWater,
    RunwaySurfaceType.Water
];
RunwayUtils.tempGeoPoint = new GeoPoint(0, 0);

/**
 * Types of airspaces.
 */
var AirspaceType;
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
    AirspaceType[AirspaceType["Nationalpark"] = 20] = "Nationalpark";
    AirspaceType[AirspaceType["ModeC"] = 21] = "ModeC";
    AirspaceType[AirspaceType["Radar"] = 22] = "Radar";
    AirspaceType[AirspaceType["Training"] = 23] = "Training";
    AirspaceType[AirspaceType["Max"] = 24] = "Max";
})(AirspaceType || (AirspaceType = {}));

/**
 * A viewlistener that gets autopilot mode information.
 */
var MSFSAPStates;
(function (MSFSAPStates) {
    MSFSAPStates[MSFSAPStates["LogicOn"] = 1] = "LogicOn";
    MSFSAPStates[MSFSAPStates["APOn"] = 2] = "APOn";
    MSFSAPStates[MSFSAPStates["FDOn"] = 4] = "FDOn";
    MSFSAPStates[MSFSAPStates["FLC"] = 8] = "FLC";
    MSFSAPStates[MSFSAPStates["Alt"] = 16] = "Alt";
    MSFSAPStates[MSFSAPStates["AltArm"] = 32] = "AltArm";
    MSFSAPStates[MSFSAPStates["GS"] = 64] = "GS";
    MSFSAPStates[MSFSAPStates["GSArm"] = 128] = "GSArm";
    MSFSAPStates[MSFSAPStates["Pitch"] = 256] = "Pitch";
    MSFSAPStates[MSFSAPStates["VS"] = 512] = "VS";
    MSFSAPStates[MSFSAPStates["Heading"] = 1024] = "Heading";
    MSFSAPStates[MSFSAPStates["Nav"] = 2048] = "Nav";
    MSFSAPStates[MSFSAPStates["NavArm"] = 4096] = "NavArm";
    MSFSAPStates[MSFSAPStates["WingLevel"] = 8192] = "WingLevel";
    MSFSAPStates[MSFSAPStates["Attitude"] = 16384] = "Attitude";
    MSFSAPStates[MSFSAPStates["ThrottleSpd"] = 32768] = "ThrottleSpd";
    MSFSAPStates[MSFSAPStates["ThrottleMach"] = 65536] = "ThrottleMach";
    MSFSAPStates[MSFSAPStates["ATArm"] = 131072] = "ATArm";
    MSFSAPStates[MSFSAPStates["YD"] = 262144] = "YD";
    MSFSAPStates[MSFSAPStates["EngineRPM"] = 524288] = "EngineRPM";
    MSFSAPStates[MSFSAPStates["TOGAPower"] = 1048576] = "TOGAPower";
    MSFSAPStates[MSFSAPStates["Autoland"] = 2097152] = "Autoland";
    MSFSAPStates[MSFSAPStates["TOGAPitch"] = 4194304] = "TOGAPitch";
    MSFSAPStates[MSFSAPStates["Bank"] = 8388608] = "Bank";
    MSFSAPStates[MSFSAPStates["FBW"] = 16777216] = "FBW";
    MSFSAPStates[MSFSAPStates["AvionicsManaged"] = 33554432] = "AvionicsManaged";
    MSFSAPStates[MSFSAPStates["None"] = -2147483648] = "None";
})(MSFSAPStates || (MSFSAPStates = {}));

/// <reference types="@microsoft/msfs-types/js/common" />
const airportIcaoRegionPattern = new RegExp(/^A../);
/**
 * A type map of facility type to facility search type.
 */
({
    /** Airport facility type. */
    [FacilityType.Airport]: FacilitySearchType.Airport,
    /** Intersection facility type. */
    [FacilityType.Intersection]: FacilitySearchType.Intersection,
    /** NDB facility type. */
    [FacilityType.NDB]: FacilitySearchType.Ndb,
    /** VOR facility type. */
    [FacilityType.VOR]: FacilitySearchType.Vor,
    /** USR facility type. */
    [FacilityType.USR]: FacilitySearchType.User,
    /** Visual facility type. */
    [FacilityType.VIS]: FacilitySearchType.Visual
});
/**
 * A class that handles loading facility data from the simulator.
 */
class FacilityLoader {
    /**
     * Creates an instance of the FacilityLoader.
     * @param facilityRepo A local facility repository.
     * @param onInitialized A callback to call when the facility loader has completed initialization.
     */
    constructor(facilityRepo, onInitialized = () => { }) {
        this.facilityRepo = facilityRepo;
        this.onInitialized = onInitialized;
        if (FacilityLoader.facilityListener === undefined) {
            FacilityLoader.facilityListener = RegisterViewListener('JS_LISTENER_FACILITY', () => {
                FacilityLoader.facilityListener.on('SendAirport', FacilityLoader.onFacilityReceived);
                FacilityLoader.facilityListener.on('SendIntersection', FacilityLoader.onFacilityReceived);
                FacilityLoader.facilityListener.on('SendVor', FacilityLoader.onFacilityReceived);
                FacilityLoader.facilityListener.on('SendNdb', FacilityLoader.onFacilityReceived);
                FacilityLoader.facilityListener.on('NearestSearchCompleted', FacilityLoader.onNearestSearchCompleted);
                setTimeout(() => FacilityLoader.init(), 2000);
            }, true);
        }
        this.awaitInitialization().then(() => this.onInitialized());
    }
    /**
     * Initializes this facility loader.
     */
    static init() {
        FacilityLoader.isInitialized = true;
        for (const resolve of this.initPromiseResolveQueue) {
            resolve();
        }
        this.initPromiseResolveQueue.length = 0;
    }
    /**
     * Waits until this facility loader is initialized.
     * @returns A Promise which is fulfilled when this facility loader is initialized.
     */
    awaitInitialization() {
        if (FacilityLoader.isInitialized) {
            return Promise.resolve();
        }
        else {
            return new Promise(resolve => {
                FacilityLoader.initPromiseResolveQueue.push(resolve);
            });
        }
    }
    /**
     * Retrieves a facility.
     * @param type The type of facility to retrieve.
     * @param icao The ICAO of the facility to retrieve.
     * @returns A Promise which will be fulfilled with the requested facility, or rejected if the facility could not be
     * retrieved.
     */
    getFacility(type, icao) {
        switch (type) {
            case FacilityType.USR:
            case FacilityType.RWY:
            case FacilityType.VIS:
                return this.getFacilityFromRepo(type, icao);
            default:
                return this.getFacilityFromCoherent(type, icao);
        }
    }
    // eslint-disable-next-line jsdoc/require-throws
    /**
     * Retrieves a facility from the local facility repository.
     * @param type The type of facility to retrieve.
     * @param icao The ICAO of the facility to retrieve.
     * @returns A Promise which will be fulfilled with the requested facility, or rejected if the facility could not be
     * retrieved.
     */
    async getFacilityFromRepo(type, icao) {
        const fac = this.facilityRepo.get(icao);
        if (fac) {
            return fac;
        }
        else if (type === FacilityType.RWY) {
            try {
                const airport = await this.getFacility(FacilityType.Airport, `A      ${icao.substr(3, 4)} `);
                const runway = RunwayUtils.matchOneWayRunwayFromIdent(airport, ICAO.getIdent(icao));
                if (runway) {
                    const runwayFac = RunwayUtils.createRunwayFacility(airport, runway);
                    this.facilityRepo.add(runwayFac);
                    return runwayFac;
                }
            }
            catch (e) {
                // noop
            }
        }
        throw `Facility ${icao} could not be found.`;
    }
    /**
     * Retrieves a facility from Coherent.
     * @param type The type of facility to retrieve.
     * @param icao The ICAO of the facility to retrieve.
     * @returns A Promise which will be fulfilled with the requested facility, or rejected if the facility could not be
     * retrieved.
     */
    async getFacilityFromCoherent(type, icao) {
        const isMismatch = ICAO.getFacilityType(icao) !== type;
        // Remove the region code from the icao
        if (type === FacilityType.Airport) {
            icao = icao.replace(airportIcaoRegionPattern, 'A  ');
        }
        let queue = FacilityLoader.requestQueue;
        let cache = FacilityLoader.facCache;
        if (isMismatch) {
            queue = FacilityLoader.mismatchRequestQueue;
            cache = FacilityLoader.typeMismatchFacCache;
        }
        if (!FacilityLoader.isInitialized) {
            await this.awaitInitialization();
        }
        const cachedFac = cache.get(icao);
        if (cachedFac !== undefined) {
            return Promise.resolve(cachedFac);
        }
        const currentTime = Date.now();
        let request = queue.get(icao);
        if (request === undefined || currentTime - request.timeStamp > 10000) {
            if (request !== undefined) {
                request.reject(`Facility request for ${icao} has timed out.`);
            }
            let resolve = undefined;
            let reject = undefined;
            const promise = new Promise((resolution, rejection) => {
                resolve = resolution;
                reject = rejection;
                Coherent.call(type, icao).then((isValid) => {
                    if (!isValid) {
                        rejection(`Facility ${icao} could not be found.`);
                        queue.delete(icao);
                    }
                });
            });
            request = { promise, timeStamp: currentTime, resolve: resolve, reject: reject };
            queue.set(icao, request);
        }
        return request.promise;
    }
    /**
     * Gets airway data from the sim.
     * @param airwayName The airway name.
     * @param airwayType The airway type.
     * @param icao The 12 character FS ICAO of at least one intersection in the airway.
     * @returns The retrieved airway.
     * @throws an error if no airway is returned
     */
    async getAirway(airwayName, airwayType, icao) {
        if (FacilityLoader.airwayCache.has(airwayName)) {
            const cachedAirway = FacilityLoader.airwayCache.get(airwayName);
            const match = cachedAirway === null || cachedAirway === void 0 ? void 0 : cachedAirway.waypoints.find((w) => {
                w.icao === icao;
            });
            if (match !== undefined && cachedAirway !== undefined) {
                return cachedAirway;
            }
        }
        const fac = await this.getFacility(FacilityType.Intersection, icao);
        const route = fac.routes.find((r) => r.name === airwayName);
        if (route !== undefined) {
            const airwayBuilder = new AirwayBuilder(fac, route, this);
            const status = await airwayBuilder.startBuild();
            if (status === AirwayStatus.COMPLETE) {
                const waypoints = airwayBuilder.waypoints;
                if (waypoints !== null) {
                    const airway = new AirwayObject(airwayName, airwayType);
                    airway.waypoints = [...waypoints];
                    FacilityLoader.addToAirwayCache(airway);
                    return airway;
                }
            }
        }
        throw new Error('Airway could not be found.');
    }
    /**
     * Starts a nearest facilities search session.
     * @param type The type of facilities for which to search.
     * @returns A Promise which will be fulfilled with the new nearest search session.
     */
    async startNearestSearchSession(type) {
        switch (type) {
            case FacilitySearchType.User:
            case FacilitySearchType.Visual:
                return this.startRepoNearestSearchSession(type);
            case FacilitySearchType.AllExceptVisual:
                return this.startCoherentNearestSearchSession(FacilitySearchType.All);
            default:
                return this.startCoherentNearestSearchSession(type);
        }
    }
    /**
     * Starts a sim-side nearest facilities search session through Coherent.
     * @param type The type of facilities for which to search.
     * @returns A Promise which will be fulfilled with the new nearest search session.
     */
    async startCoherentNearestSearchSession(type) {
        if (!FacilityLoader.isInitialized) {
            await this.awaitInitialization();
        }
        const sessionId = await Coherent.call('START_NEAREST_SEARCH_SESSION', type);
        let session;
        switch (type) {
            case FacilitySearchType.Airport:
                session = new NearestAirportSearchSession(sessionId);
                break;
            case FacilitySearchType.Intersection:
                session = new NearestIntersectionSearchSession(sessionId);
                break;
            case FacilitySearchType.Vor:
                session = new NearestVorSearchSession(sessionId);
                break;
            case FacilitySearchType.Boundary:
                session = new NearestBoundarySearchSession(sessionId);
                break;
            default:
                session = new CoherentNearestSearchSession(sessionId);
                break;
        }
        FacilityLoader.searchSessions.set(sessionId, session);
        return session;
    }
    /**
     * Starts a repository facilities search session.
     * @param type The type of facilities for which to search.
     * @returns A Promise which will be fulfilled with the new nearest search session.
     * @throws Error if the search type is not supported.
     */
    startRepoNearestSearchSession(type) {
        // Session ID doesn't really matter for these, so in order to not conflict with IDs from Coherent, we will set
        // them all to negative numbers
        const sessionId = FacilityLoader.repoSearchSessionId--;
        switch (type) {
            case FacilitySearchType.User:
                return new NearestRepoFacilitySearchSession(this.facilityRepo, sessionId);
            case FacilitySearchType.Visual:
                return new NearestRepoFacilitySearchSession(this.facilityRepo, sessionId);
            default:
                throw new Error();
        }
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    async getMetar(arg) {
        if (!FacilityLoader.isInitialized) {
            await this.awaitInitialization();
        }
        const ident = typeof arg === 'string' ? arg : ICAO.getIdent(arg.icao);
        const metar = await Coherent.call('GET_METAR_BY_IDENT', ident);
        return FacilityLoader.cleanMetar(metar);
    }
    /**
     * Searches for the METAR issued for the closest airport to a given location.
     * @param lat The latitude of the center of the search, in degrees.
     * @param lon The longitude of the center of the search, in degrees.
     * @returns The METAR issued for the closest airport to the given location, or undefined if none could be found.
     */
    async searchMetar(lat, lon) {
        if (!FacilityLoader.isInitialized) {
            await this.awaitInitialization();
        }
        const metar = await Coherent.call('GET_METAR_BY_LATLON', lat, lon);
        return FacilityLoader.cleanMetar(metar);
    }
    /**
     * Cleans up a raw METAR object.
     * @param raw A raw METAR object.
     * @returns A cleaned version of the raw METAR object, or undefined if the raw METAR is empty.
     */
    static cleanMetar(raw) {
        if (raw.icao === '') {
            return undefined;
        }
        raw.gust < 0 && delete raw.gust;
        raw.vertVis < 0 && delete raw.vertVis;
        isNaN(raw.altimeterA) && delete raw.altimeterA;
        raw.altimeterQ < 0 && delete raw.altimeterQ;
        isNaN(raw.slp) && delete raw.slp;
        return raw;
    }
    /**
     * Searches for ICAOs by their ident portion only.
     * @param filter The type of facility to filter by. Selecting ALL will search all facility type ICAOs.
     * @param ident The partial or complete ident to search for.
     * @param maxItems The maximum number of matches to return. Defaults to 40.
     * @returns An array of matched ICAOs. Exact matches are sorted before partial matches.
     */
    async searchByIdent(filter, ident, maxItems = 40) {
        if (!FacilityLoader.isInitialized) {
            await this.awaitInitialization();
        }
        let results;
        if (filter !== FacilitySearchType.User && filter !== FacilitySearchType.Visual) {
            const coherentFilter = filter === FacilitySearchType.AllExceptVisual ? FacilitySearchType.All : filter;
            results = await Coherent.call('SEARCH_BY_IDENT', ident, coherentFilter, maxItems);
        }
        else {
            results = [];
        }
        const facRepositorySearchTypes = FacilityLoader.facRepositorySearchTypes[filter];
        if (facRepositorySearchTypes) {
            this.facilityRepo.forEach(fac => {
                const facIdent = ICAO.getIdent(fac.icao);
                if (facIdent === ident) {
                    results.unshift(fac.icao);
                }
                else if (facIdent.startsWith(ident)) {
                    results.push(fac.icao);
                }
            }, facRepositorySearchTypes);
        }
        return results;
    }
    /**
     * Searches for facilities matching a given ident, and returns the matching facilities, with nearest at the beginning of the array.
     * @param filter The type of facility to filter by. Selecting ALL will search all facility type ICAOs, except for boundary facilities.
     * @param ident The exact ident to search for. (ex: DEN, KDEN, ITADO)
     * @param lat The latitude to find facilities nearest to.
     * @param lon The longitude to find facilities nearest to.
     * @param maxItems The maximum number of matches to return. Defaults to 40.
     * @returns An array of matching facilities, sorted by distance to the given lat/lon, with nearest at the beginning of the array.
     */
    async findNearestFacilitiesByIdent(filter, ident, lat, lon, maxItems = 40) {
        const results = await this.searchByIdent(filter, ident, maxItems);
        if (!results) {
            return [];
        }
        const promises = [];
        for (let i = 0; i < results.length; i++) {
            const icao = results[i];
            const facIdent = ICAO.getIdent(icao);
            if (facIdent === ident) {
                const facType = ICAO.getFacilityType(icao);
                promises.push(this.getFacility(facType, icao));
            }
        }
        const foundFacilities = await Promise.all(promises);
        if (foundFacilities.length > 1) {
            foundFacilities.sort((a, b) => GeoPoint.distance(lat, lon, a.lat, a.lon) - GeoPoint.distance(lat, lon, b.lat, b.lon));
            return foundFacilities;
        }
        else if (foundFacilities.length === 1) {
            return foundFacilities;
        }
        else {
            return [];
        }
    }
    /**
     * A callback called when a facility is received from the simulator.
     * @param facility The received facility.
     */
    static onFacilityReceived(facility) {
        const isMismatch = facility['__Type'] === 'JS_FacilityIntersection' && facility.icao[0] !== 'W';
        const queue = isMismatch ? FacilityLoader.mismatchRequestQueue : FacilityLoader.requestQueue;
        const request = queue.get(facility.icao);
        if (request !== undefined) {
            request.resolve(facility);
            FacilityLoader.addToFacilityCache(facility, isMismatch);
            queue.delete(facility.icao);
        }
    }
    /**
     * A callback called when a search completes.
     * @param results The results of the search.
     */
    static onNearestSearchCompleted(results) {
        const session = FacilityLoader.searchSessions.get(results.sessionId);
        if (session instanceof CoherentNearestSearchSession) {
            session.onSearchCompleted(results);
        }
    }
    /**
     * Adds a facility to the cache.
     * @param fac The facility to add.
     * @param isTypeMismatch Whether to add the facility to the type mismatch cache.
     */
    static addToFacilityCache(fac, isTypeMismatch) {
        const cache = isTypeMismatch ? FacilityLoader.typeMismatchFacCache : FacilityLoader.facCache;
        cache.set(fac.icao, fac);
        if (cache.size > FacilityLoader.MAX_FACILITY_CACHE_ITEMS) {
            cache.delete(cache.keys().next().value);
        }
    }
    /**
     * Adds an airway to the airway cache.
     * @param airway The airway to add.
     */
    static addToAirwayCache(airway) {
        FacilityLoader.airwayCache.set(airway.name, airway);
        if (FacilityLoader.airwayCache.size > FacilityLoader.MAX_AIRWAY_CACHE_ITEMS) {
            FacilityLoader.airwayCache.delete(FacilityLoader.airwayCache.keys().next().value);
        }
    }
}
FacilityLoader.MAX_FACILITY_CACHE_ITEMS = 1000;
FacilityLoader.MAX_AIRWAY_CACHE_ITEMS = 1000;
FacilityLoader.requestQueue = new Map();
FacilityLoader.mismatchRequestQueue = new Map();
FacilityLoader.facCache = new Map();
FacilityLoader.typeMismatchFacCache = new Map();
FacilityLoader.airwayCache = new Map();
FacilityLoader.searchSessions = new Map();
FacilityLoader.facRepositorySearchTypes = {
    [FacilitySearchType.All]: [FacilityType.USR, FacilityType.VIS],
    [FacilitySearchType.User]: [FacilityType.USR],
    [FacilitySearchType.Visual]: [FacilityType.VIS],
    [FacilitySearchType.AllExceptVisual]: [FacilityType.USR]
};
FacilityLoader.repoSearchSessionId = -1;
FacilityLoader.isInitialized = false;
FacilityLoader.initPromiseResolveQueue = [];
/**
 * A session for searching for nearest facilities through Coherent.
 */
class CoherentNearestSearchSession {
    /**
     * Creates an instance of a CoherentNearestSearchSession.
     * @param sessionId The ID of the session.
     */
    constructor(sessionId) {
        this.sessionId = sessionId;
        this.searchQueue = new Map();
    }
    /** @inheritdoc */
    searchNearest(lat, lon, radius, maxItems) {
        const promise = new Promise((resolve) => {
            Coherent.call('SEARCH_NEAREST', this.sessionId, lat, lon, radius, maxItems)
                .then((searchId) => {
                this.searchQueue.set(searchId, { promise, resolve });
            });
        });
        return promise;
    }
    /**
     * A callback called by the facility loader when a nearest search has completed.
     * @param results The search results.
     */
    onSearchCompleted(results) {
        const request = this.searchQueue.get(results.searchId);
        if (request !== undefined) {
            request.resolve(results);
            this.searchQueue.delete(results.searchId);
        }
    }
}
/**
 * A session for searching for nearest airports.
 */
class NearestAirportSearchSession extends CoherentNearestSearchSession {
    /**
     * Sets the filter for the airport nearest search.
     * @param showClosed Whether or not to show closed airports.
     * @param classMask A bitmask to determine which JS airport classes to show.
     */
    setAirportFilter(showClosed, classMask) {
        Coherent.call('SET_NEAREST_AIRPORT_FILTER', this.sessionId, showClosed ? 1 : 0, classMask);
    }
    /**
     * Sets the extended airport filters for the airport nearest search.
     * @param surfaceTypeMask A bitmask of allowable runway surface types.
     * @param approachTypeMask A bitmask of allowable approach types.
     * @param toweredMask A bitmask of untowered (1) or towered (2) bits.
     * @param minRunwayLength The minimum allowable runway length, in meters.
     */
    setExtendedAirportFilters(surfaceTypeMask, approachTypeMask, toweredMask, minRunwayLength) {
        Coherent.call('SET_NEAREST_EXTENDED_AIRPORT_FILTERS', this.sessionId, surfaceTypeMask, approachTypeMask, toweredMask, minRunwayLength);
    }
}
/**
 * Default filters for the nearest airports search session.
 */
NearestAirportSearchSession.Defaults = {
    ShowClosed: false,
    ClassMask: BitFlags.union(BitFlags.createFlag(AirportClass.HardSurface), BitFlags.createFlag(AirportClass.SoftSurface), BitFlags.createFlag(AirportClass.AllWater), BitFlags.createFlag(AirportClass.HeliportOnly), BitFlags.createFlag(AirportClass.Private)),
    SurfaceTypeMask: 2147483647,
    ApproachTypeMask: 2147483647,
    MinimumRunwayLength: 0,
    ToweredMask: 3
};
/**
 * A session for searching for nearest intersections.
 */
class NearestIntersectionSearchSession extends CoherentNearestSearchSession {
    /**
     * Sets the filter for the intersection nearest search.
     * @param typeMask A bitmask to determine which JS intersection types to show.
     */
    setIntersectionFilter(typeMask) {
        Coherent.call('SET_NEAREST_INTERSECTION_FILTER', this.sessionId, typeMask);
    }
}
/**
 * Default filters for the nearest intersections search session.
 */
NearestIntersectionSearchSession.Defaults = {
    TypeMask: BitFlags.union(BitFlags.createFlag(IntersectionType.Named), BitFlags.createFlag(IntersectionType.Unnamed), BitFlags.createFlag(IntersectionType.Offroute), BitFlags.createFlag(IntersectionType.IAF), BitFlags.createFlag(IntersectionType.FAF))
};
/**
 * A session for searching for nearest VORs.
 */
class NearestVorSearchSession extends CoherentNearestSearchSession {
    /**
     * Sets the filter for the VOR nearest search.
     * @param classMask A bitmask to determine which JS VOR classes to show.
     * @param typeMask A bitmask to determine which JS VOR types to show.
     */
    setVorFilter(classMask, typeMask) {
        Coherent.call('SET_NEAREST_VOR_FILTER', this.sessionId, classMask, typeMask);
    }
}
/**
 * Default filters for the nearest VORs search session.
 */
NearestVorSearchSession.Defaults = {
    ClassMask: BitFlags.union(BitFlags.createFlag(VorClass.Terminal), BitFlags.createFlag(VorClass.HighAlt), BitFlags.createFlag(VorClass.LowAlt)),
    TypeMask: BitFlags.union(BitFlags.createFlag(VorType.VOR), BitFlags.createFlag(VorType.DME), BitFlags.createFlag(VorType.VORDME), BitFlags.createFlag(VorType.VORTAC), BitFlags.createFlag(VorType.TACAN))
};
/**
 * A session for searching for nearest airspace boundaries.
 */
class NearestBoundarySearchSession extends CoherentNearestSearchSession {
    /**
     * Sets the filter for the boundary nearest search.
     * @param classMask A bitmask to determine which boundary classes to show.
     */
    setBoundaryFilter(classMask) {
        Coherent.call('SET_NEAREST_BOUNDARY_FILTER', this.sessionId, classMask);
    }
}
/**
 * A session for searching for nearest facilities that uses the facility repository.
 */
class NearestRepoFacilitySearchSession {
    /**
     * Creates an instance of a NearestUserSearchSession.
     * @param repo The facility repository in which to search.
     * @param sessionId The ID of the session.
     */
    constructor(repo, sessionId) {
        this.repo = repo;
        this.sessionId = sessionId;
        this.filter = undefined;
        this.cachedResults = new Set();
        this.searchId = 0;
    }
    /** @inheritdoc */
    searchNearest(lat, lon, radius, maxItems) {
        const radiusGAR = UnitType.METER.convertTo(radius, UnitType.GA_RADIAN);
        const results = this.repo.search(FacilityType.USR, lat, lon, radiusGAR, maxItems, [], this.filter);
        const added = [];
        for (let i = 0; i < results.length; i++) {
            const icao = results[i].icao;
            if (this.cachedResults.has(icao)) {
                this.cachedResults.delete(icao);
            }
            else {
                added.push(icao);
            }
        }
        const removed = Array.from(this.cachedResults);
        this.cachedResults.clear();
        for (let i = 0; i < results.length; i++) {
            this.cachedResults.add(results[i].icao);
        }
        return Promise.resolve({
            sessionId: this.sessionId,
            searchId: this.searchId++,
            added,
            removed
        });
    }
    /**
     * Sets the filter for this search session.
     * @param filter A function to filter the search results.
     */
    setUserFacilityFilter(filter) {
        this.filter = filter;
    }
}
/**
 * An airway.
 */
class AirwayObject {
    /** Builds a Airway
     * @param name - the name of the new airway.
     * @param type - the type of the new airway.
     */
    constructor(name, type) {
        this._waypoints = [];
        this._name = name;
        this._type = type;
    }
    /**
     * Gets the name of the airway
     * @returns the airway name
     */
    get name() {
        return this._name;
    }
    /**
     * Gets the type of the airway
     * @returns the airway type
     */
    get type() {
        return this._type;
    }
    /**
     * Gets the waypoints of this airway.
     * @returns the waypoints of this airway.
     */
    get waypoints() {
        return this._waypoints;
    }
    /**
     * Sets the waypoints of this airway.
     * @param waypoints is the array of waypoints.
     */
    set waypoints(waypoints) {
        this._waypoints = waypoints;
    }
}
/**
 * WT Airway Status Enum
 */
var AirwayStatus;
(function (AirwayStatus) {
    /**
     * @readonly
     * @property {number} INCOMPLETE - indicates waypoints have not been loaded yet.
     */
    AirwayStatus[AirwayStatus["INCOMPLETE"] = 0] = "INCOMPLETE";
    /**
     * @readonly
     * @property {number} COMPLETE - indicates all waypoints have been successfully loaded.
     */
    AirwayStatus[AirwayStatus["COMPLETE"] = 1] = "COMPLETE";
    /**
     * @readonly
     * @property {number} PARTIAL - indicates some, but not all, waypoints have been successfully loaded.
     */
    AirwayStatus[AirwayStatus["PARTIAL"] = 2] = "PARTIAL";
})(AirwayStatus || (AirwayStatus = {}));
/**
 * The Airway Builder.
 */
class AirwayBuilder {
    /** Creates an instance of the AirwayBuilder
     * @param _initialWaypoint is the initial intersection facility
     * @param _initialData is the intersection route to build from
     * @param facilityLoader is an instance of the facility loader
     */
    constructor(_initialWaypoint, _initialData, facilityLoader) {
        this._initialWaypoint = _initialWaypoint;
        this._initialData = _initialData;
        this.facilityLoader = facilityLoader;
        this._waypointsArray = [];
        this._hasStarted = false;
        this._isDone = false;
    }
    // constructor(private _initialWaypoint: IntersectionFacility, private _requestEntry: (entry: string) => Promise<IntersectionFacility>) {
    // }
    /**
     * Get whether this builder has started loading waypoints
     * @returns whether this builder has started
     */
    get hasStarted() {
        return this._hasStarted;
    }
    /**
     * Get whether this builder is done loading waypoints
     * @returns whether this builder is done loading waypoints
     */
    get isDone() {
        return this._isDone;
    }
    /**
     * Get the airway waypoints
     * @returns the airway waypoints, or null
     */
    get waypoints() {
        return this._waypointsArray;
    }
    /** Steps through the airway waypoints
     * @param stepForward is the direction to step; true = forward, false = backward
     * @param arrayInsertFunc is the arrayInsertFunc
     */
    async _step(stepForward, arrayInsertFunc) {
        let isDone = false;
        let current = this._initialData;
        while (!isDone && current) {
            const nextICAO = stepForward ? current.nextIcao : current.prevIcao;
            if (nextICAO && nextICAO.length > 0 && nextICAO[0] != ' ' && this._waypointsArray !== null
                && !this._waypointsArray.find(waypoint => waypoint.icao === nextICAO)) {
                const fac = await this.facilityLoader.getFacility(FacilityType.Intersection, nextICAO);
                arrayInsertFunc(fac);
                const next = fac.routes.find((route) => route.name === current.name);
                if (next !== undefined) {
                    current = next;
                }
                else {
                    isDone = true;
                }
            }
            else {
                isDone = true;
            }
        }
    }
    /** Steps Forward through the airway waypoints
     * @returns the step forward function
     */
    async _stepForward() {
        if (this._waypointsArray !== null) {
            return this._step(true, this._waypointsArray.push.bind(this._waypointsArray));
        }
    }
    /** Steps Backward through the airway waypoints
     * @returns the step backward function
     */
    async _stepBackward() {
        if (this._waypointsArray !== null) {
            return this._step(false, this._waypointsArray.unshift.bind(this._waypointsArray));
        }
    }
    /**
     * Sets the array into which this builder will load waypoints.
     * @param array is the array into which the builder will load waypoints
     */
    setWaypointsArray(array) {
        this._waypointsArray = array;
    }
    /**
     * Begins loading waypoints for this builder's parent airway.
     * @returns a Promise to return a status code corresponding to Airway.Status when this builder has
     * finished loading waypoints.
     */
    startBuild() {
        if (this.hasStarted) {
            return Promise.reject(new Error('Airway builder has already started building.'));
        }
        return new Promise(resolve => {
            this._hasStarted = true;
            if (this._waypointsArray !== null) {
                this._waypointsArray.push(this._initialWaypoint);
                Promise.all([
                    this._stepForward(),
                    this._stepBackward()
                ]).then(() => {
                    this._isDone = true;
                    resolve(AirwayStatus.COMPLETE);
                }).catch(() => {
                    this._isDone = true;
                    resolve(AirwayStatus.PARTIAL);
                });
            }
        });
    }
}

/**
 * Utility functions for working with arrays.
 */
class ArrayUtils {
    /**
     * Creates a new array with initialized values.
     * @param length The length of the new array.
     * @param init A function which generates initial values for the new array at each index.
     * @returns A new array of the specified length with initialized values.
     */
    static create(length, init) {
        const newArray = [];
        for (let i = 0; i < length; i++) {
            newArray[i] = init(i);
        }
        return newArray;
    }
    /**
     * Gets the element at a specific index in an array.
     * @param array An array.
     * @param index The index to access. Negative indexes are supported and access elements starting from the end of the
     * array (`-1` accesses the last element, `-2` the second to last element, etc).
     * @returns The element at the specified index in the array.
     * @throws RangeError if the index is out of bounds.
     */
    static at(array, index) {
        if (index < 0) {
            index += array.length;
        }
        if (index < 0 || index >= array.length) {
            throw new RangeError();
        }
        return array[index];
    }
    /**
     * Gets the element at a specific index in an array, or `undefined` if the index is out of bounds.
     * @param array An array.
     * @param index The index to access. Negative indexes are supported and access elements starting from the end of the
     * array (`-1` accesses the last element, `-2` the second to last element, etc).
     * @returns The element at the specified index in the array, or `undefined` if the index is out of bounds.
     */
    static peekAt(array, index) {
        if (index < 0) {
            index += array.length;
        }
        return array[index];
    }
    /**
     * Gets the first element of an array.
     * @param array An array.
     * @returns The first element of the specified array.
     * @throws RangeError if the array is empty.
     */
    static first(array) {
        if (array.length === 0) {
            throw new RangeError();
        }
        return array[0];
    }
    /**
     * Gets the first element of an array if it is not empty, or `undefined` otherwise.
     * @param array An array.
     * @returns The first element of an array if it is not empty, or `undefined` otherwise.
     */
    static peekFirst(array) {
        return array[0];
    }
    /**
     * Gets the last element of an array.
     * @param array An array.
     * @returns The last element of the specified array.
     * @throws RangeError if the array is empty.
     */
    static last(array) {
        if (array.length === 0) {
            throw new RangeError();
        }
        return array[array.length - 1];
    }
    /**
     * Gets the last element of an array if it is not empty, or `undefined` otherwise.
     * @param array An array.
     * @returns The last element of an array if it is not empty, or `undefined` otherwise.
     */
    static peekLast(array) {
        return array[array.length - 1];
    }
    /**
     * Checks if a certain element is included in an array.
     * @param array An array.
     * @param searchElement The element to search for.
     * @param fromIndex The position in this array at which to begin searching for `searchElement`.
     * @returns Whether the search element is included in the specified array.
     */
    static includes(array, searchElement, fromIndex) {
        return array.includes(searchElement, fromIndex);
    }
    /**
     * Checks if two arrays are equal to each other. This method considers two arrays `a` and `b` if their lengths are
     * equal and `a[i]` equals `b[i]` for every valid index `i`. All empty arrays are considered equal to one another.
     * @param a The first array.
     * @param b The second array.
     * @param equalsFunc The function to use to determine whether two array elements are equal to each other. Defaults
     * to a function which uses the strict equality operator (`===`).
     * @returns Whether the two specified arrays are equal.
     */
    static equals(a, b, equalsFunc = ArrayUtils.STRICT_EQUALS) {
        if (a.length !== b.length) {
            return false;
        }
        for (let i = 0; i < a.length; i++) {
            if (!equalsFunc(a[i], b[i])) {
                return false;
            }
        }
        return true;
    }
    /**
     * Creates a new array by mapping each element of an existing array using a mapping function, then flattening the
     * mapped elements to a maximum depth of one, leaving the original array intact.
     * @param array An array.
     * @param map A function which is called once on each element of the original array to map it to an arbitrary value.
     * @returns A new array which was created by mapping each element of the specified array, then flattening the mapped
     * elements to a maximum depth of one.
     */
    static flatMap(array, map) {
        const out = [];
        for (let i = 0; i < array.length; i++) {
            const mapped = map(array[i], i, array);
            if (Array.isArray(mapped)) {
                for (let j = 0; j < mapped.length; j++) {
                    out[out.length] = mapped[j];
                }
            }
            else {
                out[out.length] = mapped;
            }
        }
        return out;
    }
    /**
     * Creates a new array by flattening an existing array to a maximum depth, leaving the original array intact. The
     * process of flattening replaces each element in the array that is itself an array with the sequence of elements
     * found in the sub-array, recursively up to the maximum depth.
     * @param array An array.
     * @param depth The maximum depth to which to flatten. Values less than or equal to zero will result in no flattening
     * (in other words, a shallow copy of the original array will be returned). Defaults to `1`.
     * @returns A new array which was created by flattening the specified array to the specified maximum depth.
     */
    static flat(array, depth = 1) {
        const out = [];
        this.flatHelper(array, depth, 0, out);
        return out;
    }
    /**
     * Recursively flattens an array and writes the flattened sequence of elements into another array.
     * @param array The array to flatten.
     * @param maxDepth The maximum depth to which to flatten.
     * @param depth The current flattening depth.
     * @param out The array to which to write the flattened sequence of elements.
     */
    static flatHelper(array, maxDepth, depth, out) {
        for (let i = 0; i < array.length; i++) {
            const element = array[i];
            if (Array.isArray(element) && depth < maxDepth) {
                this.flatHelper(element, maxDepth, depth + 1, out);
            }
            else {
                out[out.length] = element;
            }
        }
    }
    /**
     * Performs a shallow copy of an array. After the operation is complete, the target array will have the same
     * length and the same elements in the same order as the source array.
     * @param source The array to copy.
     * @param target The array to copy into. If not defined, a new array will be created.
     * @returns The target array, after the source array has been copied into it.
     */
    static shallowCopy(source, target = []) {
        target.length = source.length;
        for (let i = 0; i < source.length; i++) {
            target[i] = source[i];
        }
        return target;
    }
    /**
     * Performs a binary search on a sorted array to find the index of the first or last element in the array whose
     * sorting order is equal to a query element. If no such element in the array exists, `-(index + 1)` is returned,
     * where `index` is the index at which the query element would be found if it were contained in the sorted array.
     * @param array An array.
     * @param element The element to search for.
     * @param comparator A function which determines the sorting order of elements in the array. The function should
     * return a negative number if the first element is to be sorted before the second, a positive number if the first
     * element is to be sorted after the second, or zero if both elements are to be sorted equivalently.
     * @param first If `true`, this method will find the first (lowest) matching index if there are multiple matching
     * indexes, otherwise this method will find the last (highest) matching index. Defaults to `true`.
     * @returns The index of the first (if `first` is `true`) or last (if `first` is `false`) element in the specified
     * array whose sorting order is equal to the query element, or `-(index + 1)`, where `index` is the index at which
     * the query element would be found if it were contained in the sorted array, if no element in the array has a
     * sorting order equal to the query.
     */
    static binarySearch(array, element, comparator, first = true) {
        let min = 0;
        let max = array.length;
        let index = Math.floor((min + max) / 2);
        while (min < max) {
            const compare = comparator(element, array[index]);
            if (compare < 0) {
                max = index;
            }
            else if (compare > 0) {
                min = index + 1;
            }
            else {
                const delta = first ? -1 : 1;
                while (index + delta >= 0 && index + delta < array.length && comparator(element, array[index + delta]) === 0) {
                    index += delta;
                }
                return index;
            }
            index = Math.floor((min + max) / 2);
        }
        return -(index + 1);
    }
    /**
     * Gets the length of the longest string in the array.
     * @param array The array to search in.
     * @returns length of the longest string
     */
    static getMaxStringLength(array) {
        return array.reduce((accum, curr) => curr.length > accum ? curr.length : accum, 0);
    }
}
ArrayUtils.STRICT_EQUALS = (a, b) => a === b;

/**
 * A binary min-heap. Each element added to the heap is ordered according to the value of an assigned key relative
 * to the keys of the other elements in the heap. The relative values of element keys are defined by a supplied
 * comparator function. Retrieval of the element with the smallest key (minimum element) is performed in constant time.
 * Removal of the minimum element and insertions are performed in logarithmic time. Additionally, this type of heap
 * supports combined insertion and removal operations (in either order) which are slightly more efficient than chaining
 * the two operations separately.
 */
class BinaryHeap {
    /**
     * Constructor.
     * @param comparator The function that this heap uses to compare the keys of its elements. The function returns 0 if
     * `a` and `b` share the same key, a negative number if `a` has a lower key than `b`, and a positive number if `a`
     * has a greater key than `b`.
     */
    constructor(comparator) {
        this.comparator = comparator;
        this.tree = [];
    }
    // eslint-disable-next-line jsdoc/require-returns
    /** The number of elements contained in this heap. */
    get size() {
        return this.tree.length;
    }
    /**
     * Finds the element in this heap with the smallest key.
     * @returns The element in this heap with the smallest key, or undefined if this heap is empty.
     */
    findMin() {
        return this.tree[0];
    }
    /**
     * Removes and returns the element in this heap with the smallest key.
     * @returns The removed element, or undefined if this heap is empty.
     */
    removeMin() {
        if (this.tree.length === 0) {
            return undefined;
        }
        const min = this.tree[0];
        this.swap(0, this.tree.length - 1);
        this.tree.length--;
        this.heapifyDown(0);
        return min;
    }
    /**
     * Inserts an element into this heap.
     * @param element The element to insert.
     * @returns This heap, after the element has been inserted.
     */
    insert(element) {
        this.tree.push(element);
        this.heapifyUp(this.tree.length - 1);
        return this;
    }
    /**
     * Inserts an element into this heap, then removes the element with the smallest key.
     * @param element The element to insert.
     * @returns The removed element.
     */
    insertAndRemoveMin(element) {
        if (this.tree.length === 0 || this.comparator(element, this.tree[0]) <= 0) {
            return element;
        }
        return this.removeMinAndInsert(element);
    }
    /**
     * Removes the element in this heap with the smallest key, then inserts a new element.
     * @param element The element to insert.
     * @returns The removed element, or undefined if this heap was empty before the new element was inserted.
     */
    removeMinAndInsert(element) {
        const min = this.tree[0];
        this.tree[0] = element;
        this.heapifyDown(0);
        return min;
    }
    /**
     * Removes all elements from this heap.
     * @returns This heap, after it has been cleared.
     */
    clear() {
        this.tree.length = 0;
        return this;
    }
    /**
     * Restores the heap property for this heap upwards from a node which potentially violates the property.
     * @param index The index of the node at which to begin the operation.
     */
    heapifyUp(index) {
        let parent = BinaryHeap.parent(index);
        while (parent >= 0 && this.comparator(this.tree[index], this.tree[parent]) < 0) {
            this.swap(parent, index);
            index = parent;
            parent = BinaryHeap.parent(index);
        }
    }
    /**
     * Restores the heap property for this heap downwards from a node which potentially violates the property.
     * @param index The index of the node at which to begin the operation.
     */
    heapifyDown(index) {
        const len = this.tree.length;
        while (index < len) {
            const left = BinaryHeap.left(index);
            const right = BinaryHeap.right(index);
            let needSwapFlags = 0;
            if (left < len && this.comparator(this.tree[index], this.tree[left]) > 0) {
                needSwapFlags |= 1;
            }
            if (right < len && this.comparator(this.tree[index], this.tree[right]) > 0) {
                needSwapFlags |= 2;
            }
            if (needSwapFlags === 3) {
                needSwapFlags = this.comparator(this.tree[left], this.tree[right]) <= 0 ? 1 : 2;
            }
            if (needSwapFlags === 0) {
                break;
            }
            const swapChild = needSwapFlags === 1 ? left : right;
            this.swap(index, swapChild);
            index = swapChild;
        }
    }
    /**
     * Swaps two nodes in this heap.
     * @param index1 The index of the first node.
     * @param index2 The index of the second node.
     */
    swap(index1, index2) {
        const old1 = this.tree[index1];
        this.tree[index1] = this.tree[index2];
        this.tree[index2] = old1;
    }
    /**
     * Finds the index of a node's parent.
     * @param index the index of the node for which to find the parent.
     * @returns The index of the query node's parent.
     */
    static parent(index) {
        return (index - 1) >> 1;
    }
    /**
     * Finds the index of a node's left child.
     * @param index The index of the node for which to find the child.
     * @returns The index of the query node's left child.
     */
    static left(index) {
        return index * 2 + 1;
    }
    /**
     * Finds the index of a node's right child.
     * @param index The index of the node for which to find the child.
     * @returns The idnex of the query node's right child.
     */
    static right(index) {
        return index * 2 + 2;
    }
}

/**
 * A k-dimensional search tree.
 */
class KdTree {
    /**
     * Constructor.
     * @param dimensionCount The number of dimensions supported by this tree. If this argument is not an integer, it will
     * be truncated to one.
     * @param keyFunc A function which generates keys from elements. Keys are an N-tuple of numbers, where N is equal to
     * the dimension count of this tree.
     * @throws Error if the dimension count is less than 2.
     */
    constructor(dimensionCount, keyFunc) {
        this.keyFunc = keyFunc;
        this.elements = [];
        this.keys = [];
        this.nodes = [];
        this.minDepth = -1;
        this.maxDepth = -1;
        this.dimensionCount = Math.trunc(dimensionCount);
        if (this.dimensionCount < 2) {
            throw new Error(`KdTree: cannot create a tree with ${this.dimensionCount} dimensions.`);
        }
        this.indexArrays = Array.from({ length: this.dimensionCount + 1 }, () => []);
        this.indexSortFuncs = Array.from({ length: this.dimensionCount }, (v, index) => {
            return (a, b) => {
                const aKey = this.keys[a];
                const bKey = this.keys[b];
                for (let i = 0; i < this.dimensionCount; i++) {
                    const dimension = (i + index) % this.dimensionCount;
                    if (aKey[dimension] < bKey[dimension]) {
                        return -1;
                    }
                    else if (aKey[dimension] > bKey[dimension]) {
                        return 1;
                    }
                }
                return 0;
            };
        });
        this.keyCache = [
            new Float64Array(this.dimensionCount)
        ];
    }
    // eslint-disable-next-line jsdoc/require-returns
    /** The number of elements in this tree. */
    get size() {
        return this.elements.length;
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    searchKey(key, radius, arg3, out, filter) {
        if (typeof arg3 === 'number') {
            return this.doResultsSearch(undefined, key, radius, arg3, out, filter);
        }
        else {
            this.doVisitorSearch(undefined, key, radius, arg3);
        }
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    search(element, radius, arg3, out, filter) {
        const key = this.keyFunc(element, this.keyCache[0]);
        if (typeof arg3 === 'number') {
            return this.doResultsSearch(element, key, radius, arg3, out, filter);
        }
        else {
            this.doVisitorSearch(element, key, radius, arg3);
        }
    }
    /**
     * Performs a tree search with a visitor function.
     * @param element The query element, or undefined if none exists.
     * @param key The query key.
     * @param radius The search radius.
     * @param visitor A visitor function. This function will be called once per element found within the search radius.
     * If the visitor returns `true`, then the search will continue; if the visitor returns `false`, the search will
     * immediately halt.
     */
    doVisitorSearch(element, key, radius, visitor) {
        const resultHandler = (elementIndex, elementInner, keyInner, distance, queryKey, queryElement) => {
            return visitor(elementInner, keyInner, distance, queryKey, queryElement);
        };
        const traversalHandler = (offsetFromPivot, searchRadius, child) => {
            return searchRadius + offsetFromPivot * child >= 0;
        };
        this.searchTree(element, key, radius, 0, 0, resultHandler, traversalHandler);
    }
    /**
     * Performs a tree search and returns an array of search results.
     * @param element The query element, or undefined if none exists.
     * @param key The query key.
     * @param radius The search radius.
     * @param maxResultCount The maximum number of search results to return.
     * @param out An array in which to store the search results.
     * @param filter A function to filter the search results.
     * @returns An array containing the search results, in order of increasing distance from the query key.
     */
    doResultsSearch(element, key, radius, maxResultCount, out, filter) {
        if (maxResultCount <= 0) {
            out.length = 0;
            return out;
        }
        const heap = new BinaryHeap((a, b) => KdTree.distance(key, this.keys[b], this.dimensionCount) - KdTree.distance(key, this.keys[a], this.dimensionCount));
        const resultHandler = (elementIndex, elementInner, keyInner, distance, queryKey, queryElement) => {
            if (!filter || filter(elementInner, keyInner, distance, queryKey, queryElement)) {
                if (heap.size === maxResultCount) {
                    heap.insertAndRemoveMin(elementIndex);
                }
                else {
                    heap.insert(elementIndex);
                }
            }
            return true;
        };
        const traversalHandler = (offsetFromPivot, searchRadius, child) => {
            let maxDist = searchRadius;
            if (heap.size === maxResultCount) {
                maxDist = Math.min(maxDist, KdTree.distance(key, this.keys[heap.findMin()], this.dimensionCount));
            }
            return maxDist + offsetFromPivot * child >= 0;
        };
        this.searchTree(element, key, radius, 0, 0, resultHandler, traversalHandler);
        out.length = heap.size;
        for (let i = out.length - 1; i >= 0; i--) {
            out[i] = this.elements[heap.removeMin()];
        }
        return out;
    }
    /**
     * Searches a subtree for elements whose keys are located near a query key.
     * @param element The query element, or undefined if none exists.
     * @param key The query key.
     * @param radius The search radius.
     * @param nodeIndex The index of the root of the subtree to search.
     * @param pivotDimension The dimension in which the root of the subtree is split.
     * @param resultHandler A function which will be called once per element found within the search radius. If the
     * function returns `true`, then the search will continue; if the function returns `false`, the search will
     * immediately halt.
     * @param traversalHandler A function which determines whether the search will proceed to a child node. If the
     * function returns `true`, the search will continue; if the function returns `false`, the search will skip the
     * child.
     * @returns `false` if the search was terminated prematurely by the `resultHandler` function, and `true` otherwise.
     */
    searchTree(element, key, radius, nodeIndex, pivotDimension, resultHandler, traversalHandler) {
        const elementIndex = this.nodes[nodeIndex];
        if (elementIndex === undefined) {
            return true;
        }
        const nodeKey = this.keys[elementIndex];
        const distanceFromNode = KdTree.distance(key, nodeKey, this.dimensionCount);
        if (distanceFromNode <= radius) {
            if (!resultHandler(elementIndex, this.elements[elementIndex], nodeKey, distanceFromNode, key, element)) {
                return false;
            }
        }
        const offsetFromPivot = key[pivotDimension] - nodeKey[pivotDimension];
        const nextPivotDimension = (pivotDimension + 1) % this.dimensionCount;
        const lesserNodeIndex = KdTree.lesser(nodeIndex);
        const greaterNodeIndex = KdTree.greater(nodeIndex);
        if (this.nodes[lesserNodeIndex] !== undefined && traversalHandler(offsetFromPivot, radius, -1)) {
            if (!this.searchTree(element, key, radius, lesserNodeIndex, nextPivotDimension, resultHandler, traversalHandler)) {
                return false;
            }
        }
        if (this.nodes[greaterNodeIndex] !== undefined && traversalHandler(offsetFromPivot, radius, 1)) {
            if (!this.searchTree(element, key, radius, greaterNodeIndex, nextPivotDimension, resultHandler, traversalHandler)) {
                return false;
            }
        }
        return true;
    }
    /**
     * Inserts an element into this tree. This operation will trigger a rebalancing if, after the insertion, the length
     * of this tree's longest branch is more than twice the length of the shortest branch.
     * @param element The element to insert.
     */
    insert(element) {
        const insertDepth = this.insertElementInTree(element) + 1;
        this.maxDepth = Math.max(this.maxDepth, insertDepth);
        if (insertDepth === this.minDepth + 1) {
            this.minDepth = KdTree.depth(this.nodes.indexOf(undefined, KdTree.leastIndexAtDepth(Math.max(0, this.minDepth))));
        }
        // Rebalance the tree if max depth is greater than twice the min depth.
        if (this.maxDepth + 1 > (this.minDepth + 1) * 2) {
            this.rebuild();
        }
    }
    /**
     * Inserts a batch of elements into this tree. This tree will be rebalanced after the elements are inserted.
     * @param elements An iterable of the elements to insert.
     */
    insertAll(elements) {
        for (const element of elements) {
            this.elements.push(element);
            this.keys.push(this.keyFunc(element, new Float64Array(this.dimensionCount)));
            const insertedIndex = this.elements.length - 1;
            for (let i = 0; i < this.dimensionCount; i++) {
                this.indexArrays[i].push(insertedIndex);
            }
        }
        this.rebuild();
    }
    /**
     * Inserts an element into this tree.
     * @param element The element to insert.
     * @returns The depth at which the element was inserted, with 0 being the depth of the root.
     */
    insertElementInTree(element) {
        const key = this.keyFunc(element, new Float64Array(this.dimensionCount));
        let index = 0;
        let depth = 0;
        let elementIndex;
        while ((elementIndex = this.nodes[index]) !== undefined) {
            const pivotDimension = depth % this.dimensionCount;
            const keyToCompare = key[pivotDimension];
            if (keyToCompare <= this.keys[elementIndex][pivotDimension]) {
                index = KdTree.lesser(index);
            }
            else {
                index = KdTree.greater(index);
            }
            depth++;
        }
        this.elements.push(element);
        this.keys.push(key);
        const insertedIndex = this.elements.length - 1;
        this.nodes[index] = insertedIndex;
        for (let i = 0; i < this.dimensionCount; i++) {
            this.indexArrays[i].push(insertedIndex);
        }
        return depth;
    }
    /**
     * Removes an element from this tree. This tree will be rebalanced after the element is removed.
     * @param element The element to remove.
     * @returns Whether the element was removed.
     */
    remove(element) {
        if (!this.removeElementFromArrays(element)) {
            return false;
        }
        this.resetIndexArrays();
        this.rebuild();
        return true;
    }
    /**
     * Removes a batch of elements from this tree. This tree will be rebalanced after the elements are removed.
     * @param elements An iterable of the elements to remove.
     * @returns Whether at least one element was removed.
     */
    removeAll(elements) {
        let removed = false;
        for (const element of elements) {
            removed = this.removeElementFromArrays(element) || removed;
        }
        if (removed) {
            this.resetIndexArrays();
            this.rebuild();
        }
        return removed;
    }
    /**
     * Removes an element and all references to it from this tree's arrays. This method does not change the structure
     * of this tree to reflect the removal of the element.
     * @param element The element to remove.
     * @returns Whether the element was removed.
     */
    removeElementFromArrays(element) {
        const index = this.elements.indexOf(element);
        if (index < 0) {
            return false;
        }
        const lastIndex = this.elements.length - 1;
        this.elements[index] = this.elements[lastIndex];
        this.keys[index] = this.keys[lastIndex];
        this.elements.length--;
        this.keys.length--;
        return true;
    }
    /**
     * Resets this tree's index arrays such that each array contains the indexes 0 to N-1 in order, where N is the
     * number of elements in the tree.
     */
    resetIndexArrays() {
        for (let i = 0; i < this.dimensionCount; i++) {
            const array = this.indexArrays[i];
            array.length = this.elements.length;
            for (let j = 0; j < array.length; j++) {
                array[j] = j;
            }
        }
    }
    /**
     * Removes elements from this tree, then inserts elements into this tree as a single operation. The tree will be
     * rebalanced at the end of the operation.
     *
     * Using this method is more efficient than calling `removeAll()` and `insertAll()` separately.
     * @param toRemove An iterable of the elements to remove.
     * @param toInsert An iterable of the elements to insert.
     */
    removeAndInsert(toRemove, toInsert) {
        let removed = false;
        for (const element of toRemove) {
            removed = this.removeElementFromArrays(element) || removed;
        }
        if (removed) {
            this.resetIndexArrays();
        }
        this.insertAll(toInsert);
    }
    /**
     * Rebuilds and balances this tree.
     */
    rebuild() {
        // clear the tree structure
        this.nodes.length = 0;
        if (this.size === 0) {
            return;
        }
        // sort index arrays
        for (let i = 0; i < this.dimensionCount; i++) {
            this.indexArrays[i].sort(this.indexSortFuncs[i]);
        }
        this.buildSubTree(0, 0, 0, this.indexArrays[0].length);
        const log = Math.log2(this.elements.length + 1);
        this.minDepth = Math.floor(log) - 1;
        this.maxDepth = Math.ceil(log) - 1;
    }
    /**
     * Builds a portion of this tree starting from a specified node using the element indexes stored in a specified
     * section of this tree's index arrays. The built subtree is guaranteed to be balanced. Before calling this method,
     * the index array at position 0 should contain keys sorted in the specified pivot dimension, the array at position
     * 1 should contain keys sorted in the dimension after the pivot dimension, etc (with the dimension wrapping back to
     * 0 when reaching `this.dimensionCount`).
     * @param nodeIndex The index of the tree node at which to start building the tree. The element associated with the
     * pivot key will be placed at this node.
     * @param pivotDimension The dimension in which to split the first level of the tree built by this method.
     * @param start The first index, inclusive, of the section of this tree's index arrays to use to build the tree.
     * @param end The last index, exclusive, of the section of this tree's index arrays to use to build the tree.
     */
    buildSubTree(nodeIndex, pivotDimension, start, end) {
        const tempArray = this.indexArrays[this.dimensionCount];
        const sortedArray = this.indexArrays[0];
        const medianIndex = Math.trunc((start + end) / 2);
        const medianKeyIndex = sortedArray[medianIndex];
        // Insert median into its position in the tree
        this.nodes[nodeIndex] = medianKeyIndex;
        if (end - start === 1) {
            return;
        }
        if (end - start <= 3) {
            const lesserIndex = medianIndex - 1;
            const greaterIndex = medianIndex + 1;
            if (lesserIndex >= start) {
                this.nodes[KdTree.lesser(nodeIndex)] = sortedArray[lesserIndex];
            }
            if (greaterIndex < end) {
                this.nodes[KdTree.greater(nodeIndex)] = sortedArray[greaterIndex];
            }
            return;
        }
        for (let i = start; i < end; i++) {
            tempArray[i] = sortedArray[i];
        }
        // Partition the index arrays not in the pivot dimension around the median key in the pivot dimension and at the
        // same time rotate the index arrays such that the index array sorted in the next pivot dimension is located at
        // index 0.
        for (let i = 1; i < this.dimensionCount; i++) {
            const targetArray = this.indexArrays[i - 1];
            const toPartitionArray = this.indexArrays[i];
            let lesserCount = 0;
            let greaterCount = 0;
            for (let j = start; j < end; j++) {
                const keyIndex = toPartitionArray[j];
                if (keyIndex === medianKeyIndex) {
                    targetArray[medianIndex] = keyIndex;
                }
                else {
                    const comparison = this.indexSortFuncs[pivotDimension](keyIndex, medianKeyIndex);
                    if (comparison <= 0) {
                        const index = start + (lesserCount++);
                        targetArray[index] = keyIndex;
                    }
                    else {
                        const index = medianIndex + 1 + (greaterCount++);
                        targetArray[index] = keyIndex;
                    }
                }
            }
        }
        // Copy the temporary array (now containing the sorted indexes in the pivot dimension) to the last index array.
        const newSortedArray = this.indexArrays[this.dimensionCount - 1];
        for (let i = start; i < end; i++) {
            newSortedArray[i] = tempArray[i];
        }
        const nextPivotDimension = (pivotDimension + 1) % this.dimensionCount;
        this.buildSubTree(KdTree.lesser(nodeIndex), nextPivotDimension, start, medianIndex);
        this.buildSubTree(KdTree.greater(nodeIndex), nextPivotDimension, medianIndex + 1, end);
    }
    /**
     * Removes all elements from this tree.
     */
    clear() {
        this.elements.length = 0;
        this.keys.length = 0;
        this.nodes.length = 0;
        for (let i = 0; i < this.indexArrays.length; i++) {
            this.indexArrays[i].length = 0;
        }
        this.minDepth = -1;
        this.maxDepth = -1;
    }
    /**
     * Finds the index of a node's parent.
     * @param index the index of the node for which to find the parent.
     * @returns The index of the query node's parent.
     */
    static parent(index) {
        return (index - 1) >> 1;
    }
    /**
     * Finds the index of a node's lesser child.
     * @param index The index of the node for which to find the child.
     * @returns The index of the query node's lesser child.
     */
    static lesser(index) {
        return index * 2 + 1;
    }
    /**
     * Finds the index of a node's greater child.
     * @param index The index of the node for which to find the child.
     * @returns The idnex of the query node's greater child.
     */
    static greater(index) {
        return index * 2 + 2;
    }
    /**
     * Finds the least index of any node located at a given depth.
     * @param depth The depth for which to get the least index. The root of the tree lies at depth 0.
     * @returns The least index of any node located at the specified depth.
     */
    static leastIndexAtDepth(depth) {
        return 1 << depth - 1;
    }
    /**
     * Finds the depth at which a node lies.
     * @param index The index of the node for which to find the depth.
     * @returns The depth at which the node lies. The root of the tree lies at depth 0.
     */
    static depth(index) {
        return Math.trunc(Math.log2(index + 1));
    }
    /**
     * Calculates the Euclidean distance between two keys.
     * @param key1 The first key.
     * @param key2 The second key.
     * @param dimensionCount The number of dimensions in which to calculate the distance.
     * @returns The Euclidean distance between the two keys.
     */
    static distance(key1, key2, dimensionCount) {
        let sumSq = 0;
        for (let i = 0; i < dimensionCount; i++) {
            const diff = key1[i] - key2[i];
            sumSq += diff * diff;
        }
        return Math.sqrt(sumSq);
    }
}

/**
 * A spatial tree which is keyed on points on Earth's surface and allows searching for elements based on the great-
 * circle distances from their keys to a query point.
 */
class GeoKdTree {
    /**
     * Constructor.
     * @param keyFunc A function which generates keys from elements. Keys are cartesian representations of points on
     * Earth's surface.
     * @throws Error if the dimension count is less than 2.
     */
    constructor(keyFunc) {
        this.keyFunc = keyFunc;
        this.cartesianTree = new KdTree(3, (element, out) => {
            const vec = this.keyFunc(element, GeoKdTree.vec3Cache[0]);
            out[0] = vec[0];
            out[1] = vec[1];
            out[2] = vec[2];
            return out;
        });
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    search(arg1, arg2, arg3, arg4, arg5, arg6) {
        let center, radius;
        let argA, argB, argC;
        if (typeof arg1 === 'number') {
            center = GeoPoint.sphericalToCartesian(arg1, arg2, GeoKdTree.vec3Cache[1]);
            radius = arg3;
            argA = arg4;
            argB = arg5;
            argC = arg6;
        }
        else if (!(arg1 instanceof Float64Array)) {
            center = GeoPoint.sphericalToCartesian(arg1, GeoKdTree.vec3Cache[1]);
            radius = arg2;
            argA = arg3;
            argB = arg4;
            argC = arg5;
        }
        else {
            center = arg1;
            radius = arg2;
            argA = arg3;
            argB = arg4;
            argC = arg5;
        }
        const radiusCartesian = Math.sqrt(2 * (1 - Math.cos(Utils.Clamp(radius, 0, Math.PI))));
        if (typeof argA === 'number') {
            return this.doResultsSearch(center, radiusCartesian, argA, argB, argC);
        }
        else {
            this.doVisitorSearch(center, radiusCartesian, argA);
        }
    }
    /**
     * Performs a tree search with a visitor function.
     * @param center The query point.
     * @param radiusCartesian The query radius.
     * @param visitor A visitor function. This function will be called once per element found within the search radius.
     * If the visitor returns `true`, then the search will continue; if the visitor returns `false`, the search will
     * immediately halt.
     */
    doVisitorSearch(center, radiusCartesian, visitor) {
        this.cartesianTree.searchKey(center, radiusCartesian, (element, key) => {
            const vec = Vec3Math.set(key[0], key[1], key[2], GeoKdTree.vec3Cache[2]);
            const greatCircleDist = GeoPoint.distance(vec, center);
            return visitor(element, vec, greatCircleDist, center);
        });
    }
    /**
     * Performs a tree search and returns an array of search results.
     * @param center The query point.
     * @param radiusCartesian The query radius.
     * @param maxResultCount The maximum number of search results to return.
     * @param out An array in which to store the search results.
     * @param filter A function to filter the search results.
     * @returns An array containing the search results, in order of increasing distance from the query key.
     */
    doResultsSearch(center, radiusCartesian, maxResultCount, out, filter) {
        const cartesianFilter = filter
            ? (element, key) => {
                const vec = Vec3Math.set(key[0], key[1], key[2], GeoKdTree.vec3Cache[2]);
                const greatCircleDist = GeoPoint.distance(vec, center);
                return filter(element, vec, greatCircleDist, center);
            }
            : undefined;
        return this.cartesianTree.searchKey(center, radiusCartesian, maxResultCount, out, cartesianFilter);
    }
    /**
     * Inserts an element into this tree. This operation will trigger a rebalancing if, after the insertion, the length
     * of this tree's longest branch is more than twice the length of the shortest branch.
     * @param element The element to insert.
     */
    insert(element) {
        this.cartesianTree.insert(element);
    }
    /**
     * Inserts a batch of elements into this tree. This tree will be rebalanced after the elements are inserted.
     * @param elements An iterable of the elements to insert.
     */
    insertAll(elements) {
        this.cartesianTree.insertAll(elements);
    }
    /**
     * Removes an element from this tree. This tree will be rebalanced after the element is removed.
     * @param element The element to remove.
     * @returns Whether the element was removed.
     */
    remove(element) {
        return this.cartesianTree.remove(element);
    }
    /**
     * Removes a batch of elements from this tree. This tree will be rebalanced after the elements are removed.
     * @param elements An iterable of the elements to remove.
     * @returns Whether at least one element was removed.
     */
    removeAll(elements) {
        return this.cartesianTree.removeAll(elements);
    }
    /**
     * Removes elements from this tree, then inserts elements into this tree as a single operation. The tree will be
     * rebalanced at the end of the operation.
     *
     * Using this method is more efficient than calling `removeAll()` and `insertAll()` separately.
     * @param toRemove An iterable of the elements to remove.
     * @param toInsert An iterable of the elements to insert.
     */
    removeAndInsert(toRemove, toInsert) {
        this.cartesianTree.removeAndInsert(toRemove, toInsert);
    }
    /**
     * Rebuilds and balances this tree.
     */
    rebuild() {
        this.cartesianTree.rebuild();
    }
    /**
     * Removes all elements from this tree.
     */
    clear() {
        this.cartesianTree.clear();
    }
}
GeoKdTree.vec3Cache = [new Float64Array(3), new Float64Array(3), new Float64Array(3), new Float64Array(3)];

/**
 * Types of subscribable array change event.
 */
var SubscribableArrayEventType;
(function (SubscribableArrayEventType) {
    /** An element was added. */
    SubscribableArrayEventType["Added"] = "Added";
    /** An element was removed. */
    SubscribableArrayEventType["Removed"] = "Removed";
    /** The array was cleared. */
    SubscribableArrayEventType["Cleared"] = "Cleared";
})(SubscribableArrayEventType || (SubscribableArrayEventType = {}));

/**
 * An array-like class to observe changes in a list of objects.
 * @class ArraySubject
 * @template T
 */
class AbstractSubscribableArray {
    constructor() {
        this.subs = [];
        this.notifyDepth = 0;
        /** A function which sends initial notifications to subscriptions. */
        this.initialNotifyFunc = this.initialNotify.bind(this);
        /** A function which responds to when a subscription to this subscribable is destroyed. */
        this.onSubDestroyedFunc = this.onSubDestroyed.bind(this);
    }
    /** @inheritdoc */
    sub(handler, initialNotify = false, paused = false) {
        const sub = new HandlerSubscription(handler, this.initialNotifyFunc, this.onSubDestroyedFunc);
        this.subs.push(sub);
        if (paused) {
            sub.pause();
        }
        else if (initialNotify) {
            sub.initialNotify();
        }
        return sub;
    }
    /** @inheritdoc */
    unsub(handler) {
        const toDestroy = this.subs.find(sub => sub.handler === handler);
        toDestroy === null || toDestroy === void 0 ? void 0 : toDestroy.destroy();
    }
    /**
     * Gets an item from the array.
     * @param index Thex index of the item to get.
     * @returns An item.
     * @throws
     */
    get(index) {
        const array = this.getArray();
        if (index > array.length - 1) {
            throw new Error('Index out of range');
        }
        return array[index];
    }
    /**
     * Tries to get the value from the array.
     * @param index The index of the item to get.
     * @returns The value or undefined if not found.
     */
    tryGet(index) {
        return this.getArray()[index];
    }
    /**
     * Notifies subscriptions of a change in the array.
     * @param index The index that was changed.
     * @param type The type of subject event.
     * @param modifiedItem The item modified by the operation.
     */
    notify(index, type, modifiedItem) {
        let needCleanUpSubs = false;
        this.notifyDepth++;
        const subLen = this.subs.length;
        for (let i = 0; i < subLen; i++) {
            try {
                const sub = this.subs[i];
                if (sub.isAlive && !sub.isPaused) {
                    sub.handler(index, type, modifiedItem, this.getArray());
                }
                needCleanUpSubs || (needCleanUpSubs = !sub.isAlive);
            }
            catch (error) {
                console.error(`ArraySubject: error in handler: ${error}`);
                if (error instanceof Error) {
                    console.error(error.stack);
                }
            }
        }
        this.notifyDepth--;
        if (needCleanUpSubs && this.notifyDepth === 0) {
            this.subs = this.subs.filter(sub => sub.isAlive);
        }
    }
    /**
     * Notifies a subscription of this array's current state.
     * @param sub The subscription to notify.
     */
    initialNotify(sub) {
        const array = this.getArray();
        sub.handler(0, SubscribableArrayEventType.Added, array, array);
    }
    /**
     * Responds to when a subscription to this array is destroyed.
     * @param sub The destroyed subscription.
     */
    onSubDestroyed(sub) {
        // If we are not in the middle of a notify operation, remove the subscription.
        // Otherwise, do nothing and let the post-notify clean-up code handle it.
        if (this.notifyDepth === 0) {
            this.subs.splice(this.subs.indexOf(sub), 1);
        }
    }
}

/**
 * Types of facility repository sync events.
 */
var FacilityRepositorySyncType;
(function (FacilityRepositorySyncType) {
    FacilityRepositorySyncType["Add"] = "Add";
    FacilityRepositorySyncType["Remove"] = "Remove";
    FacilityRepositorySyncType["DumpRequest"] = "DumpRequest";
    FacilityRepositorySyncType["DumpResponse"] = "DumpResponse";
})(FacilityRepositorySyncType || (FacilityRepositorySyncType = {}));
/**
 * A repository of facilities.
 */
class FacilityRepository {
    /**
     * Constructor.
     * @param bus The event bus.
     */
    constructor(bus) {
        this.bus = bus;
        this.publisher = this.bus.getPublisher();
        this.repos = new Map();
        this.trees = {
            [FacilityType.USR]: new GeoKdTree(FacilityRepository.treeKeyFunc),
            [FacilityType.VIS]: new GeoKdTree(FacilityRepository.treeKeyFunc),
        };
        this.ignoreSync = false;
        bus.getSubscriber().on(FacilityRepository.SYNC_TOPIC).handle(this.onSyncEvent.bind(this));
        // Request a dump from any existing instances on other instruments to initialize the repository.
        this.pubSyncEvent({
            type: FacilityRepositorySyncType.DumpRequest, uid: this.lastDumpRequestUid = Math.random() * Number.MAX_SAFE_INTEGER
        });
    }
    /**
     * Gets the number of facilities stored in this repository.
     * @param types The types of facilities to count. Defaults to all facility types.
     * @returns The number of facilities stored in this repository.
     */
    size(types) {
        var _a, _b;
        let size = 0;
        if (types === undefined) {
            for (const repo of this.repos.values()) {
                size += repo.size;
            }
        }
        else {
            for (let i = 0; i < types.length; i++) {
                size += (_b = (_a = this.repos.get(types[i])) === null || _a === void 0 ? void 0 : _a.size) !== null && _b !== void 0 ? _b : 0;
            }
        }
        return size;
    }
    /**
     * Retrieves a facility from this repository.
     * @param icao The ICAO of the facility to retrieve.
     * @returns The requested user facility, or undefined if it was not found in this repository.
     */
    get(icao) {
        var _a;
        if (!ICAO.isFacility(icao)) {
            return undefined;
        }
        return (_a = this.repos.get(ICAO.getFacilityType(icao))) === null || _a === void 0 ? void 0 : _a.get(icao);
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    search(type, lat, lon, radius, arg5, out, filter) {
        if (type !== FacilityType.USR && type !== FacilityType.VIS) {
            throw new Error(`FacilityRepository: spatial searches are not supported for facility type ${type}`);
        }
        if (typeof arg5 === 'number') {
            return this.trees[type].search(lat, lon, radius, arg5, out, filter);
        }
        else {
            this.trees[type].search(lat, lon, radius, arg5);
        }
    }
    /**
     * Adds a facility to this repository and all other repositories synced with this one. If this repository already
     * contains a facility with the same ICAO as the facility to add, the existing facility will be replaced with the
     * new one.
     * @param fac The facility to add.
     * @throws Error if the facility has an invalid ICAO.
     */
    add(fac) {
        if (!ICAO.isFacility(fac.icao)) {
            throw new Error(`FacilityRepository: invalid facility ICAO ${fac.icao}`);
        }
        this.addToRepo(fac);
        this.pubSyncEvent({ type: FacilityRepositorySyncType.Add, facs: [fac] });
    }
    /**
     * Adds multiple facilities from this repository and all other repositories synced with this one. For each added
     * facility, if this repository already contains a facility with the same ICAO, the existing facility will be
     * replaced with the new one.
     * @param facs The facilities to add.
     */
    addMultiple(facs) {
        this.addMultipleToRepo(facs);
        this.pubSyncEvent({ type: FacilityRepositorySyncType.Add, facs: Array.from(facs) });
    }
    /**
     * Removes a facility from this repository and all other repositories synced with this one.
     * @param fac The facility to remove, or the ICAO of the facility to remove.
     * @throws Error if the facility has an invalid ICAO.
     */
    remove(fac) {
        const icao = typeof fac === 'string' ? fac : fac.icao;
        if (!ICAO.isFacility(icao)) {
            throw new Error(`FacilityRepository: invalid facility ICAO ${icao}`);
        }
        this.removeFromRepo(icao);
        this.pubSyncEvent({ type: FacilityRepositorySyncType.Remove, facs: [icao] });
    }
    /**
     * Removes multiple facilities from this repository and all other repositories synced with this one.
     * @param facs The facilities to remove, or the ICAOs of the facilties to remove.
     */
    removeMultiple(facs) {
        this.removeMultipleFromRepo(facs);
        this.pubSyncEvent({ type: FacilityRepositorySyncType.Remove, facs: facs.map(fac => typeof fac === 'object' ? fac.icao : fac) });
    }
    /**
     * Iterates over every facility in this respository with a visitor function.
     * @param fn A visitor function.
     * @param types The types of facilities over which to iterate. Defaults to all facility types.
     */
    forEach(fn, types) {
        var _a;
        if (types === undefined) {
            for (const repo of this.repos.values()) {
                repo.forEach(fn);
            }
        }
        else {
            for (let i = 0; i < types.length; i++) {
                (_a = this.repos.get(types[i])) === null || _a === void 0 ? void 0 : _a.forEach(fn);
            }
        }
    }
    /**
     * Adds a facility to this repository.
     * @param fac The facility to add.
     */
    addToRepo(fac) {
        const facilityType = ICAO.getFacilityType(fac.icao);
        let repo = this.repos.get(facilityType);
        if (repo === undefined) {
            this.repos.set(facilityType, repo = new Map());
        }
        const existing = repo.get(fac.icao);
        repo.set(fac.icao, fac);
        if (facilityType === FacilityType.USR || facilityType === FacilityType.VIS) {
            if (existing === undefined) {
                this.trees[facilityType].insert(fac);
            }
            else {
                this.trees[facilityType].removeAndInsert([existing], [fac]);
            }
        }
        if (existing === undefined) {
            this.publisher.pub('facility_added', fac, false, false);
        }
        else {
            this.publisher.pub(`facility_changed_${fac.icao}`, fac, false, false);
            this.publisher.pub('facility_changed', fac, false, false);
        }
    }
    /**
     * Adds multiple facilities to this repository.
     * @param facs The facilities to add.
     */
    addMultipleToRepo(facs) {
        if (facs.length === 0) {
            return;
        }
        const addedFacilities = [];
        const changedFacilitiesRemoved = [];
        const changedFacilitiesAdded = [];
        for (let i = 0; i < facs.length; i++) {
            const fac = facs[i];
            const facilityType = ICAO.getFacilityType(fac.icao);
            let repo = this.repos.get(facilityType);
            if (repo === undefined) {
                this.repos.set(facilityType, repo = new Map());
            }
            const existing = repo.get(fac.icao);
            repo.set(fac.icao, fac);
            if (existing === undefined) {
                addedFacilities.push(fac);
            }
            else {
                changedFacilitiesRemoved.push(existing);
                changedFacilitiesAdded.push(fac);
            }
        }
        const addedUserFacilities = facs.filter(fac => FacilityUtils.isFacilityType(fac, FacilityType.USR));
        if (addedUserFacilities.length > 0) {
            const removedUserFacilities = changedFacilitiesRemoved.filter(fac => FacilityUtils.isFacilityType(fac, FacilityType.USR));
            this.trees[FacilityType.USR].removeAndInsert(removedUserFacilities, addedUserFacilities);
        }
        const addedVisFacilities = facs.filter(fac => FacilityUtils.isFacilityType(fac, FacilityType.VIS));
        if (addedVisFacilities.length > 0) {
            const removedVisFacilities = changedFacilitiesRemoved.filter(fac => FacilityUtils.isFacilityType(fac, FacilityType.VIS));
            this.trees[FacilityType.VIS].removeAndInsert(removedVisFacilities, addedVisFacilities);
        }
        for (let i = 0; i < addedFacilities.length; i++) {
            const fac = addedFacilities[i];
            this.publisher.pub('facility_added', fac, false, false);
        }
        for (let i = 0; i < changedFacilitiesAdded.length; i++) {
            const fac = changedFacilitiesAdded[i];
            this.publisher.pub(`facility_changed_${fac.icao}`, fac, false, false);
            this.publisher.pub('facility_changed', fac, false, false);
        }
    }
    /**
     * Removes a facility from this repository.
     * @param fac The facility to remove, or the ICAO of the facility to remove.
     */
    removeFromRepo(fac) {
        const icao = typeof fac === 'string' ? fac : fac.icao;
        const facilityType = ICAO.getFacilityType(icao);
        const repo = this.repos.get(ICAO.getFacilityType(icao));
        if (repo === undefined) {
            return;
        }
        const facilityInRepo = repo.get(icao);
        if (facilityInRepo === undefined) {
            return;
        }
        repo.delete(icao);
        if (facilityType === FacilityType.USR || facilityType === FacilityType.VIS) {
            this.trees[facilityType].remove(facilityInRepo);
        }
        this.publisher.pub(`facility_removed_${icao}`, facilityInRepo, false, false);
        this.publisher.pub('facility_removed', facilityInRepo, false, false);
    }
    /**
     * Removes multiple facilities from this repository.
     * @param facs The facilities to remove, or the ICAOs of the facilities to remove.
     */
    removeMultipleFromRepo(facs) {
        if (facs.length === 0) {
            return;
        }
        const removedFacilities = [];
        for (let i = 0; i < facs.length; i++) {
            const fac = facs[i];
            const icao = typeof fac === 'string' ? fac : fac.icao;
            const repo = this.repos.get(ICAO.getFacilityType(icao));
            if (repo === undefined) {
                continue;
            }
            const facilityInRepo = repo.get(icao);
            if (facilityInRepo === undefined) {
                continue;
            }
            repo.delete(icao);
            removedFacilities.push(facilityInRepo);
        }
        const removedUserFacilities = removedFacilities.filter(fac => FacilityUtils.isFacilityType(fac, FacilityType.USR));
        if (removedUserFacilities.length > 0) {
            this.trees[FacilityType.USR].removeAll(removedUserFacilities);
        }
        const removedVisFacilities = removedFacilities.filter(fac => FacilityUtils.isFacilityType(fac, FacilityType.VIS));
        if (removedVisFacilities.length > 0) {
            this.trees[FacilityType.VIS].removeAll(removedVisFacilities);
        }
        for (let i = 0; i < removedFacilities.length; i++) {
            const removedFac = removedFacilities[i];
            this.publisher.pub(`facility_removed_${removedFac.icao}`, removedFac, false, false);
            this.publisher.pub('facility_removed', removedFac, false, false);
        }
    }
    /**
     * Publishes a facility added or removed sync event over the event bus.
     * @param data The event data.
     */
    pubSyncEvent(data) {
        this.ignoreSync = true;
        this.publisher.pub(FacilityRepository.SYNC_TOPIC, data, true, false);
        this.ignoreSync = false;
    }
    /**
     * A callback which is called when a sync event occurs.
     * @param data The event data.
     */
    onSyncEvent(data) {
        if (this.ignoreSync) {
            return;
        }
        switch (data.type) {
            case FacilityRepositorySyncType.DumpResponse:
                // Only accept responses to your own dump requests.
                if (data.uid !== this.lastDumpRequestUid) {
                    break;
                }
                else {
                    this.lastDumpRequestUid = undefined;
                }
            // eslint-disable-next-line no-fallthrough
            case FacilityRepositorySyncType.Add:
                if (data.facs.length === 1) {
                    this.addToRepo(data.facs[0]);
                }
                else {
                    this.addMultipleToRepo(data.facs);
                }
                break;
            case FacilityRepositorySyncType.Remove:
                if (data.facs.length === 1) {
                    this.removeFromRepo(data.facs[0]);
                }
                else {
                    this.removeMultipleFromRepo(data.facs);
                }
                break;
            case FacilityRepositorySyncType.DumpRequest:
                // Don't respond to your own dump requests.
                if (data.uid !== this.lastDumpRequestUid) {
                    const facs = [];
                    this.forEach(fac => facs.push(fac));
                    this.pubSyncEvent({ type: FacilityRepositorySyncType.DumpResponse, uid: data.uid, facs });
                }
                break;
        }
    }
    /**
     * Gets an instance of FacilityRepository.
     * @param bus The event bus.
     * @returns an instance of FacilityRepository.
     */
    static getRepository(bus) {
        var _a;
        return (_a = FacilityRepository.INSTANCE) !== null && _a !== void 0 ? _a : (FacilityRepository.INSTANCE = new FacilityRepository(bus));
    }
}
FacilityRepository.SYNC_TOPIC = 'facilityrepo_sync';
FacilityRepository.treeKeyFunc = (fac, out) => {
    return GeoPoint.sphericalToCartesian(fac, out);
};

/**
 * Possible types of hold entries
 */
var HoldEntryType;
(function (HoldEntryType) {
    HoldEntryType[HoldEntryType["Direct"] = 0] = "Direct";
    HoldEntryType[HoldEntryType["Teardrop"] = 1] = "Teardrop";
    HoldEntryType[HoldEntryType["Parallel"] = 2] = "Parallel";
    HoldEntryType[HoldEntryType["None"] = 3] = "None";
})(HoldEntryType || (HoldEntryType = {}));
var HoldMaxSpeedRule;
(function (HoldMaxSpeedRule) {
    HoldMaxSpeedRule[HoldMaxSpeedRule["Faa"] = 0] = "Faa";
    HoldMaxSpeedRule[HoldMaxSpeedRule["Icao"] = 1] = "Icao";
})(HoldMaxSpeedRule || (HoldMaxSpeedRule = {}));

/**
 * Utility methods for working with Subscribables.
 */
class SubscribableUtils {
    /**
     * Checks if a query is a subscribable.
     * @param query A query.
     * @returns Whether the query is a subscribable.
     */
    static isSubscribable(query) {
        return typeof query === 'object' && query !== null && query.isSubscribable === true;
    }
    /**
     * Checks if a query is a mutable subscribable.
     * @param query A query.
     * @returns Whether the query is a mutable subscribable.
     */
    static isMutableSubscribable(query) {
        return typeof query === 'object' && query !== null && query.isMutableSubscribable === true;
    }
    /**
     * Converts a value to a subscribable.
     *
     * If the `excludeSubscribables` argument is `true` and the value is already a subscribable, then the value is
     * returned unchanged. Otherwise, a new subscribable whose state is always equal to the value will be created and
     * returned.
     * @param value The value to convert to a subscribable.
     * @param excludeSubscribables Whether to return subscribable values as-is instead of wrapping them in another
     * subscribable.
     * @returns A subscribable.
     */
    static toSubscribable(value, excludeSubscribables) {
        if (excludeSubscribables && SubscribableUtils.isSubscribable(value)) {
            return value;
        }
        else {
            return Subject.create(value);
        }
    }
}
/**
 * A numeric equality function which returns `true` if and only if two numbers are strictly equal or if they are both
 * `NaN`.
 * @param a The first number to compare.
 * @param b The second number to compare.
 * @returns Whether the two numbers are strictly equal or both `NaN`.
 */
SubscribableUtils.NUMERIC_NAN_EQUALITY = (a, b) => a === b || (isNaN(a) && isNaN(b));

/* eslint-disable @typescript-eslint/no-non-null-assertion */
/**
 * A type map of search type to concrete facility loader query type.
 */
new Map([
    [FacilitySearchType.Airport, FacilityType.Airport],
    [FacilitySearchType.Intersection, FacilityType.Intersection],
    [FacilitySearchType.Vor, FacilityType.VOR],
    [FacilitySearchType.Ndb, FacilityType.NDB],
    [FacilitySearchType.User, FacilityType.USR]
]);
/**
 * A wrapper for a {@link NearestSearchSession} that automatically adjusts the number of
 * search results requested from the sim to minimize search load while still attempting to
 * provide the total number of results needed by the user.
 */
class AdaptiveNearestSubscription extends AbstractSubscribableArray {
    /**
     * Creates an instance of AdaptiveNearestSubscription.
     * @param innerSubscription A {@link NearestSubscription} to use as our inner search.
     * @param absoluteMaxItems The maximum number of results to request in any search.
     */
    constructor(innerSubscription, absoluteMaxItems) {
        super();
        this.innerSubscription = innerSubscription;
        this.sortFunc = (a, b) => this.pos.distance(a) - this.pos.distance(b);
        /** The array that holds the results of our latest search. */
        this.facilities = [];
        /** The number of items we are requesting from the inner search to meet current demands. */
        this.derivedMaxItems = 0;
        /** Whether we have a search in progress already. */
        this.searchInProgress = false;
        /** A reusable GeoPoint for sorting by distance. */
        this.pos = new GeoPoint(0, 0);
        this.diffMap = new Map();
        this.updatePromiseResolves = [];
        this.absoluteMaxItems = SubscribableUtils.toSubscribable(absoluteMaxItems, true);
    }
    /** @inheritdoc */
    get length() {
        return this.facilities.length;
    }
    /** @inheritdoc */
    getArray() {
        return this.facilities;
    }
    /** @inheritdoc */
    get started() {
        return this.innerSubscription.started;
    }
    /** @inheritdoc */
    awaitStart() {
        return this.innerSubscription.awaitStart();
    }
    /** @inheritdoc */
    start() {
        return this.innerSubscription.start();
    }
    /** @inheritdoc */
    update(lat, lon, radius, maxItems) {
        return new Promise(resolve => {
            this.updatePromiseResolves.push(resolve);
            if (this.searchInProgress) {
                return;
            }
            this.doUpdate(lat, lon, radius, maxItems);
        });
    }
    /**
     * Executes an update of the nearest search subscription.
     * @param lat The latitude of the current search position.
     * @param lon The longitude of the current search position.
     * @param radius The radius of the search, in meters.
     * @param maxItems The maximum number of items to return in the search.
     */
    async doUpdate(lat, lon, radius, maxItems) {
        this.searchInProgress = true;
        this.pos.set(lat, lon);
        maxItems = Math.max(0, maxItems);
        if (maxItems > this.derivedMaxItems) {
            this.derivedMaxItems = maxItems;
        }
        // When the subscription updates, any changes from airports added or removed cause
        // onSourceChanged below to trigger.   That will update our facilites store, because
        // it means the airport is no longer in the raw search data.
        await this.innerSubscription.update(lat, lon, radius, this.derivedMaxItems);
        if (this.innerSubscription.length > maxItems) {
            // We have more returned facilities in our search than the user has asked for.
            // Begin a ramp-down of our search size. Ramp down is less aggressive than
            // ramp up to avoid flapping between the two states.
            this.derivedMaxItems = Math.max(Math.round(this.derivedMaxItems - (this.derivedMaxItems * AdaptiveNearestSubscription.RAMP_DOWN_FACTOR)), maxItems);
        }
        else {
            // We have either exactly enough or too few facilities.  If we have too few, ramp
            // up our search size until we either have enough or hit the maximum allowed search
            // quantity.
            const absoluteMaxItems = this.absoluteMaxItems.get();
            while (this.innerSubscription.length < maxItems && this.derivedMaxItems < absoluteMaxItems) {
                this.derivedMaxItems = Math.min(Math.round(this.derivedMaxItems * AdaptiveNearestSubscription.RAMP_UP_FACTOR), absoluteMaxItems);
                await this.innerSubscription.update(lat, lon, radius, this.derivedMaxItems);
            }
        }
        if (this.innerSubscription.length > maxItems) {
            if (maxItems > 1) {
                // Filter out the farthest results until we have exactly as many results as the user has asked for.
                const sorted = Array.from(this.innerSubscription.getArray()).sort(this.sortFunc);
                sorted.length = maxItems;
                this.diffAndNotify(sorted);
            }
            else if (maxItems === 1) {
                this.diffAndNotify([this.findNearest(this.innerSubscription.getArray())]);
            }
            else {
                this.diffAndNotify(AdaptiveNearestSubscription.EMPTY_ARRAY);
            }
        }
        else {
            this.diffAndNotify(this.innerSubscription.getArray());
        }
        this.searchInProgress = false;
        this.updatePromiseResolves.forEach(resolve => { resolve(); });
        this.updatePromiseResolves.length = 0;
    }
    /**
     * Finds the nearest facility in an array.
     * @param array A non-empty array of facilities.
     * @returns The nearest facility in the specified array.
     */
    findNearest(array) {
        let nearest = array[0];
        let nearestDistance = this.pos.distance(nearest);
        for (let i = 1; i < array.length; i++) {
            const fac = array[i];
            const distance = this.pos.distance(fac);
            if (distance < nearestDistance) {
                nearest = fac;
                nearestDistance = distance;
            }
        }
        return nearest;
    }
    /**
     * Diffs a new facility array against this subscription's current facility array, makes the necessary changes to
     * the current facility array so that it contains the same facilities as the new one, and notifies subscribers of the
     * changes.
     * @param newArray A new facility array.
     */
    diffAndNotify(newArray) {
        if (this.facilities.length === 0 && newArray.length === 0) {
            // Old and new arrays are both empty. Nothing to do.
            return;
        }
        if (newArray.length === 0) {
            // New array is empty. Clear the old array.
            this.facilities.length = 0;
            this.notify(0, SubscribableArrayEventType.Cleared);
            return;
        }
        if (this.facilities.length === 0) {
            // Old array is empty. Add every item from the new array in order.
            for (let i = 0; i < newArray.length; i++) {
                this.facilities[i] = newArray[i];
            }
            this.facilities.length = newArray.length;
            this.notify(0, SubscribableArrayEventType.Added, this.facilities);
            return;
        }
        // Remove every item from the old array that is not in the new array.
        for (let i = 0; i < newArray.length; i++) {
            this.diffMap.set(newArray[i].icao, newArray[i]);
        }
        for (let i = this.facilities.length - 1; i >= 0; i--) {
            const old = this.facilities[i];
            if (this.diffMap.has(old.icao)) {
                this.diffMap.delete(old.icao);
            }
            else {
                this.facilities.splice(i, 1);
                this.notify(i, SubscribableArrayEventType.Removed, old);
            }
        }
        // Add every item from the new array that is not in the old array (these items are now contained in diffMap).
        for (const toAdd of this.diffMap.values()) {
            this.facilities.push(toAdd);
            this.notify(this.facilities.length - 1, SubscribableArrayEventType.Added, toAdd);
        }
        this.diffMap.clear();
    }
}
AdaptiveNearestSubscription.RAMP_UP_FACTOR = 1.33;
AdaptiveNearestSubscription.RAMP_DOWN_FACTOR = 0.1;
AdaptiveNearestSubscription.EMPTY_ARRAY = [];
[new GeoCircle(new Float64Array(3), 0)];
new BinaryHeap((a, b) => b.distanceToFarthestVector - a.distanceToFarthestVector);

/**
 * A task queue backed by an array.
 */
class ArrayTaskQueue {
    /**
     * Constructor.
     * @param tasks The array of tasks in this queue.
     */
    constructor(tasks) {
        this.tasks = tasks;
        this.head = 0;
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    hasNext() {
        return this.head < this.tasks.length;
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    next() {
        return this.tasks[this.head++];
    }
}

/**
 * A process which dispatches tasks in a task queue potentially over multiple frames.
 */
class ThrottledTaskQueueProcess {
    /**
     * Constructor.
     * @param queue The queue to process.
     * @param handler A handler which defines the behavior of this process.
     */
    constructor(queue, handler) {
        this.queue = queue;
        this.handler = handler;
        this._hasStarted = false;
        this._hasEnded = false;
        this._shouldAbort = false;
    }
    /**
     * Checks whether this process has been started.
     * @returns whether this process has been started.
     */
    hasStarted() {
        return this._hasStarted;
    }
    /**
     * Checks whether this process has ended.
     * @returns whether this process has ended.
     */
    hasEnded() {
        return this._hasEnded;
    }
    /**
     * Starts this process.
     */
    start() {
        this._hasStarted = true;
        this.processQueue(0);
    }
    /**
     * Processes the queue.
     * @param elapsedFrameCount The number of frames elapsed since queue processing started.
     */
    processQueue(elapsedFrameCount) {
        let dispatchCount = 0;
        const t0 = performance.now();
        while (!this._shouldAbort && this.queue.hasNext()) {
            if (this.handler.canContinue(elapsedFrameCount, dispatchCount, performance.now() - t0)) {
                const task = this.queue.next();
                task();
                dispatchCount++;
            }
            else {
                break;
            }
        }
        if (this._shouldAbort) {
            return;
        }
        if (!this.queue.hasNext()) {
            this.handler.onFinished(elapsedFrameCount);
            this._hasEnded = true;
        }
        else {
            this.handler.onPaused(elapsedFrameCount);
            requestAnimationFrame(this.processQueue.bind(this, elapsedFrameCount + 1));
        }
    }
    /**
     * Aborts this process. Has no effect if the process has not been started or if it has already ended.
     */
    abort() {
        if (this._hasStarted && !this._hasEnded) {
            this.handler.onAborted();
            this._shouldAbort = true;
            this._hasEnded = true;
        }
    }
}

/**
 * A nearest search session for boundaries (airspaces) in the form of LodBoundary objects.
 */
class NearestLodBoundarySearchSession {
    /**
     * Constructor.
     * @param cache The boundary cache this search session uses.
     * @param session The nearest boundary facility search session this search session uses.
     * @param frameBudget The maximum amount of time allotted per frame to retrieve and process LodBoundary objects, in
     * milliseconds.
     */
    constructor(cache, session, frameBudget) {
        this.cache = cache;
        this.session = session;
        this.frameBudget = frameBudget;
    }
    /**
     * Searches for the nearest boundaries around a specified location.
     * @param lat The latitude of the search center, in degrees.
     * @param lon The longitude of the search center, in degrees.
     * @param radius The radius of the search, in meters.
     * @param maxItems The maximum number of items for which to search.
     * @returns The nearest search results.
     */
    async searchNearest(lat, lon, radius, maxItems) {
        const facilityResults = await this.session.searchNearest(lat, lon, radius, maxItems);
        const results = { added: [], removed: facilityResults.removed };
        const tasks = facilityResults.added.map((fac, index) => () => { results.added[index] = this.cache.get(fac); });
        await new Promise(resolve => {
            const taskQueue = new ThrottledTaskQueueProcess(new ArrayTaskQueue(tasks), new NearestLodBoundarySearchTaskQueueHandler(this.frameBudget, resolve));
            taskQueue.start();
        });
        return results;
    }
    /**
     * Sets this session's boundary class filter. The new filter takes effect with the next search executed in this
     * session.
     * @param classMask A bitmask defining the boundary classes to include in the search (`0`: exclude, `1`: include).
     * The bit index for each boundary class is equal to the value of the corresponding `BoundaryType` enum.
     */
    setFilter(classMask) {
        this.session.setBoundaryFilter(classMask);
    }
}
/**
 * A throttled task queue handler for retrieving and creating new LodBoundary objects in response to a nearest search.
 */
class NearestLodBoundarySearchTaskQueueHandler {
    /**
     * Constructor.
     * @param frameBudget The maximum amount of time allotted per frame to retrieve and process LodBoundary objects, in
     * milliseconds.
     * @param resolve The Promise resolve function this handler will call when the task queue is finished.
     */
    constructor(frameBudget, resolve) {
        this.frameBudget = frameBudget;
        this.resolve = resolve;
    }
    /** @inheritdoc */
    onStarted() {
        // noop
    }
    /** @inheritdoc */
    canContinue(elapsedFrameCount, dispatchedTaskCount, timeElapsed) {
        return timeElapsed < this.frameBudget;
    }
    /** @inheritdoc */
    onPaused() {
        // noop
    }
    /** @inheritdoc */
    onFinished() {
        this.resolve();
    }
    /** @inheritdoc */
    onAborted() {
        // noop
    }
}

/**
 * The transition type to which a flight path vector belongs.
 */
var FlightPathVectorFlags;
(function (FlightPathVectorFlags) {
    FlightPathVectorFlags[FlightPathVectorFlags["None"] = 0] = "None";
    /** A turn to a specific course. */
    FlightPathVectorFlags[FlightPathVectorFlags["TurnToCourse"] = 1] = "TurnToCourse";
    /** An arcing turn to a specific point. */
    FlightPathVectorFlags[FlightPathVectorFlags["Arc"] = 2] = "Arc";
    /** A direct course to a specific point. */
    FlightPathVectorFlags[FlightPathVectorFlags["Direct"] = 4] = "Direct";
    /** A path to intercept a specific course. */
    FlightPathVectorFlags[FlightPathVectorFlags["InterceptCourse"] = 8] = "InterceptCourse";
    /** Inbound leg of a hold. */
    FlightPathVectorFlags[FlightPathVectorFlags["HoldInboundLeg"] = 16] = "HoldInboundLeg";
    /** Outbound leg of a hold. */
    FlightPathVectorFlags[FlightPathVectorFlags["HoldOutboundLeg"] = 32] = "HoldOutboundLeg";
    /** A direct hold entry. */
    FlightPathVectorFlags[FlightPathVectorFlags["HoldDirectEntry"] = 64] = "HoldDirectEntry";
    /** A teardrop hold entry. */
    FlightPathVectorFlags[FlightPathVectorFlags["HoldTeardropEntry"] = 128] = "HoldTeardropEntry";
    /** A parallel hold entry. */
    FlightPathVectorFlags[FlightPathVectorFlags["HoldParallelEntry"] = 256] = "HoldParallelEntry";
    /** A course reversal. */
    FlightPathVectorFlags[FlightPathVectorFlags["CourseReversal"] = 512] = "CourseReversal";
    /** A turn from one leg to another. */
    FlightPathVectorFlags[FlightPathVectorFlags["LegToLegTurn"] = 1024] = "LegToLegTurn";
    /** An anticipated turn from one leg to another. */
    FlightPathVectorFlags[FlightPathVectorFlags["AnticipatedTurn"] = 2048] = "AnticipatedTurn";
    /** A fallback path. */
    FlightPathVectorFlags[FlightPathVectorFlags["Fallback"] = 4096] = "Fallback";
})(FlightPathVectorFlags || (FlightPathVectorFlags = {}));
/**
 * A prototype for signalling application-specific type metadata for plan segments.
 */
var FlightPlanSegmentType;
(function (FlightPlanSegmentType) {
    FlightPlanSegmentType["Origin"] = "Origin";
    FlightPlanSegmentType["Departure"] = "Departure";
    FlightPlanSegmentType["Enroute"] = "Enroute";
    FlightPlanSegmentType["Arrival"] = "Arrival";
    FlightPlanSegmentType["Approach"] = "Approach";
    FlightPlanSegmentType["Destination"] = "Destination";
    FlightPlanSegmentType["MissedApproach"] = "MissedApproach";
    FlightPlanSegmentType["RandomDirectTo"] = "RandomDirectTo";
})(FlightPlanSegmentType || (FlightPlanSegmentType = {}));
/**
 * A segment of a flight plan.
 */
class FlightPlanSegment {
    /**
     * Creates a new FlightPlanSegment.
     * @param segmentIndex The index of the segment within the flight plan.
     * @param offset The leg offset within the original flight plan that
     * the segment starts at.
     * @param legs The legs in the flight plan segment.
     * @param segmentType The type of segment this is.
     * @param airway The airway associated with this segment, if any.
     */
    constructor(segmentIndex, offset, legs, segmentType = FlightPlanSegmentType.Enroute, airway) {
        this.segmentIndex = segmentIndex;
        this.offset = offset;
        this.legs = legs;
        this.segmentType = segmentType;
        this.airway = airway;
    }
}
/** An empty flight plan segment. */
FlightPlanSegment.Empty = new FlightPlanSegment(-1, -1, []);
/**
 * Bitflags describing a leg definition.
 */
var LegDefinitionFlags;
(function (LegDefinitionFlags) {
    LegDefinitionFlags[LegDefinitionFlags["None"] = 0] = "None";
    LegDefinitionFlags[LegDefinitionFlags["DirectTo"] = 1] = "DirectTo";
    LegDefinitionFlags[LegDefinitionFlags["MissedApproach"] = 2] = "MissedApproach";
    LegDefinitionFlags[LegDefinitionFlags["Obs"] = 4] = "Obs";
    LegDefinitionFlags[LegDefinitionFlags["VectorsToFinal"] = 8] = "VectorsToFinal";
    LegDefinitionFlags[LegDefinitionFlags["VectorsToFinalFaf"] = 16] = "VectorsToFinalFaf";
})(LegDefinitionFlags || (LegDefinitionFlags = {}));
/**
 * Vertical flight phase.
 */
var VerticalFlightPhase;
(function (VerticalFlightPhase) {
    VerticalFlightPhase["Climb"] = "Climb";
    VerticalFlightPhase["Descent"] = "Descent";
})(VerticalFlightPhase || (VerticalFlightPhase = {}));
var SpeedUnit;
(function (SpeedUnit) {
    SpeedUnit[SpeedUnit["IAS"] = 0] = "IAS";
    SpeedUnit[SpeedUnit["MACH"] = 1] = "MACH";
})(SpeedUnit || (SpeedUnit = {}));
/** Types of speed restrictions on legs. */
var SpeedRestrictionType;
(function (SpeedRestrictionType) {
    SpeedRestrictionType[SpeedRestrictionType["Unused"] = 0] = "Unused";
    SpeedRestrictionType[SpeedRestrictionType["At"] = 1] = "At";
    SpeedRestrictionType[SpeedRestrictionType["AtOrAbove"] = 2] = "AtOrAbove";
    SpeedRestrictionType[SpeedRestrictionType["AtOrBelow"] = 3] = "AtOrBelow";
    SpeedRestrictionType[SpeedRestrictionType["Between"] = 4] = "Between";
})(SpeedRestrictionType || (SpeedRestrictionType = {}));

/**
 * Utility class for working with flight path calculations.
 */
class FlightPathUtils {
    /**
     * Creates an empty arc vector.
     * @returns An empty arc vector.
     */
    static createEmptyCircleVector() {
        return {
            vectorType: 'circle',
            flags: FlightPathVectorFlags.None,
            radius: 0,
            centerX: 1,
            centerY: 0,
            centerZ: 0,
            startLat: 0,
            startLon: 0,
            endLat: 0,
            endLon: 0,
            distance: 0
        };
    }
    /**
     * Sets the parameters of a circle vector.
     * @param vector The circle vector to set.
     * @param circle The GeoCircle defining the vector's path.
     * @param start The start of the vector.
     * @param end The end of the vector.
     * @param flags The flags to set on the vector.
     * @returns The circle vector, after its parameters have been set.
     */
    static setCircleVector(vector, circle, start, end, flags) {
        vector.flags = flags;
        vector.radius = circle.radius;
        vector.centerX = circle.center[0];
        vector.centerY = circle.center[1];
        vector.centerZ = circle.center[2];
        vector.distance = UnitType.GA_RADIAN.convertTo(circle.distanceAlong(start, end, Math.PI), UnitType.METER);
        start instanceof Float64Array && (start = FlightPathUtils.geoPointCache[0].setFromCartesian(start));
        end instanceof Float64Array && (end = FlightPathUtils.geoPointCache[1].setFromCartesian(end));
        vector.startLat = start.lat;
        vector.startLon = start.lon;
        vector.endLat = end.lat;
        vector.endLon = end.lon;
        return vector;
    }
    /**
     * Checks whether a circle vector describes a great-circle path.
     * @param vector A flight path circle vector.
     * @returns Whether the vector describes a great-circle path.
     */
    static isVectorGreatCircle(vector) {
        return vector.radius === Math.PI / 2;
    }
    /**
     * Sets the parameters of a GeoCircle from a flight path circle vector.
     * @param vector A flight path circle vector.
     * @param out The GeoCircle to set.
     * @returns The GeoCircle, after its parameters have been set.
     */
    static setGeoCircleFromVector(vector, out) {
        return out.set(Vec3Math.set(vector.centerX, vector.centerY, vector.centerZ, FlightPathUtils.vec3Cache[0]), vector.radius);
    }
    /**
     * Gets the direction of a turn described by a flight path circle vector.
     * @param vector The flight path circle vector describing the turn.
     * @returns The direction of the turn described by the flight path circle vector.
     */
    static getVectorTurnDirection(vector) {
        return vector.radius > MathUtils.HALF_PI ? 'right' : 'left';
    }
    /**
     * Gets the radius of a turn described by a flight path circle vector.
     * @param vector The flight path circle vector describing the turn.
     * @returns The radius of the turn described by the flight path circle vector, in great-arc radians.
     */
    static getVectorTurnRadius(vector) {
        return Math.min(vector.radius, Math.PI - vector.radius);
    }
    /**
     * Gets the initial true course bearing of a flight path vector.
     * @param vector A flight path vector.
     * @returns The initial true course bearing of the vector, or undefined if one could not be calculated.
     */
    static getVectorInitialCourse(vector) {
        return FlightPathUtils.setGeoCircleFromVector(vector, FlightPathUtils.geoCircleCache[0]).bearingAt(FlightPathUtils.geoPointCache[0].set(vector.startLat, vector.startLon), Math.PI);
    }
    /**
     * Gets the final true course bearing of a flight path vector.
     * @param vector A flight path vector.
     * @returns The final true course bearing of the vector, or `undefined` if one could not be calculated.
     */
    static getVectorFinalCourse(vector) {
        return FlightPathUtils.setGeoCircleFromVector(vector, FlightPathUtils.geoCircleCache[0]).bearingAt(FlightPathUtils.geoPointCache[0].set(vector.endLat, vector.endLon), Math.PI);
    }
    /**
     * Gets the true course for a flight plan leg.
     * @param leg A flight plan leg.
     * @param point The location from which to get magnetic variation if `magVarFacility` is not defined.
     * @param magVarFacility The VOR facility which defines the magnetic variation used for the leg's course.
     * @returns The true course for the specified flight plan leg.
     */
    static getLegTrueCourse(leg, point, magVarFacility) {
        if (leg.trueDegrees) {
            return leg.course;
        }
        const magVar = magVarFacility
            ? -magVarFacility.magneticVariation // The sign of magnetic variation on VOR facilities is the opposite of the standard east = positive convention.
            : Facilities.getMagVar(point.lat, point.lon);
        return NavMath.normalizeHeading(leg.course + magVar);
    }
    /**
     * Gets the final position of a calculated leg.
     * @param legCalc A set of leg calculations.
     * @param out The GeoPoint object to which to write the result.
     * @returns The final position of the leg, or `undefined` if one could not be obtained.
     */
    static getLegFinalPosition(legCalc, out) {
        if (legCalc.endLat !== undefined && legCalc.endLon !== undefined) {
            return out.set(legCalc.endLat, legCalc.endLon);
        }
        return undefined;
    }
    /**
     * Gets the final true course of a calculated leg.
     * @param legCalc A set of leg calculations.
     * @returns The final true course of the leg, or `undefined` if one could not be obtained.
     */
    static getLegFinalCourse(legCalc) {
        if (legCalc.flightPath.length > 0) {
            const vector = legCalc.flightPath[legCalc.flightPath.length - 1];
            return this.getVectorFinalCourse(vector);
        }
        return undefined;
    }
    /**
     * Gets the circle describing the path of a turn.
     * @param center The center of the turn.
     * @param radius The radius of the turn, in great-arc radians.
     * @param turnDirection The direction of the turn.
     * @param out A GeoCircle object to which to write the result.
     * @returns The circle describing the path of the turn.
     */
    static getTurnCircle(center, radius, turnDirection, out) {
        out.set(center, radius);
        if (turnDirection === 'right') {
            out.reverse();
        }
        return out;
    }
    /**
     * Reverses the direction of a turn circle while keeping the turn center and turn radius constant.
     * @param circle The turn circle to reverse.
     * @param out A GeoCircle object to which to write the result.
     * @returns A turn circle which has the same turn center and turn radius, but the opposite direction as `circle`.
     */
    static reverseTurnCircle(circle, out) {
        return out.set(Vec3Math.multScalar(circle.center, -1, FlightPathUtils.vec3Cache[0]), Math.PI - circle.radius);
    }
    /**
     * Gets the direction of a turn described by a circle.
     * @param circle The geo circle describing the turn.
     * @returns The direction of the turn described by the circle.
     */
    static getTurnDirectionFromCircle(circle) {
        return circle.radius > MathUtils.HALF_PI ? 'right' : 'left';
    }
    /**
     * Gets the radius of a turn described by a circle.
     * @param circle The geo circle describing the turn.
     * @returns The radius of the turn described by the circle, in great-arc radians.
     */
    static getTurnRadiusFromCircle(circle) {
        return Math.min(circle.radius, Math.PI - circle.radius);
    }
    /**
     * Gets the center of a turn described by a circle.
     * @param circle The geo circle describing the turn.
     * @param out A GeoPoint or 3D vector object to which to write the result.
     * @returns The center of a turn described by the circle.
     */
    static getTurnCenterFromCircle(circle, out) {
        return (circle.radius > MathUtils.HALF_PI
            ? out instanceof Float64Array
                ? Vec3Math.multScalar(circle.center, -1, out)
                : out.setFromCartesian(-circle.center[0], -circle.center[1], -circle.center[2])
            : out instanceof Float64Array
                ? Vec3Math.copy(circle.center, out)
                : out.setFromCartesian(circle.center));
    }
    /**
     * Calculates and returns a circle describing a turn starting from a path at a specified point.
     * @param start The starting point of the turn.
     * @param path The circle describing the path from which the turn starts.
     * @param turnRadius The radius of the turn, in great-arc radians.
     * @param turnDirection The direction of the turn.
     * @param out A GeoCircle object to which to write the result.
     * @returns The circle describing the path of the specified turn.
     */
    static getTurnCircleStartingFromPath(start, path, turnRadius, turnDirection, out) {
        if (!(start instanceof Float64Array)) {
            start = GeoPoint.sphericalToCartesian(start, FlightPathUtils.vec3Cache[0]);
        }
        const radius = turnDirection === 'left'
            ? turnRadius
            : Math.PI - turnRadius;
        const turnStartToCenterNormal = Vec3Math.cross(start, path.center, FlightPathUtils.vec3Cache[1]);
        const turnStartToCenterPath = FlightPathUtils.geoCircleCache[0].set(turnStartToCenterNormal, MathUtils.HALF_PI);
        const turnCenter = turnStartToCenterPath.offsetDistanceAlong(start, radius, FlightPathUtils.vec3Cache[1], Math.PI);
        return out.set(turnCenter, radius);
    }
    /**
     * Gets the signed distance along an arc from a defined start point to a query point. The start, query, and end
     * points will be projected onto the arc's parent circle if they do not already lie on it. A negative distance
     * indicates that the query point lies somewhere before the start of the arc but after the point on the arc's parent
     * circle that is diametrically opposed to the midpoint of the arc.
     * @param circle The arc's parent circle.
     * @param start The start point of the arc.
     * @param end The end point of the arc.
     * @param pos The query point.
     * @param tolerance The error tolerance, in great-arc radians, when checking if `start` and `query` are equal.
     * Defaults to `GeoCircle.ANGULAR_TOLERANCE` if not specified.
     * @returns The signed distance along the arc from the start point to the query point, in great-arc radians.
     */
    static getAlongArcSignedDistance(circle, start, end, pos, tolerance = GeoCircle.ANGULAR_TOLERANCE) {
        const posAngularDistance = circle.angleAlong(start, pos, Math.PI);
        if (Math.min(posAngularDistance, MathUtils.TWO_PI - posAngularDistance) <= tolerance) {
            return 0;
        }
        const endAngularDistance = circle.angleAlong(start, end, Math.PI);
        return circle.arcLength((posAngularDistance - (endAngularDistance / 2) + Math.PI) % MathUtils.TWO_PI - Math.PI + endAngularDistance / 2);
    }
    /**
     * Gets the normalized distance along an arc from a defined start point to a query point. The start, query, and end
     * points will be projected onto the arc's parent circle if they do not already lie on it. The distance is normalized
     * such that 1 equals the arc length from the start point to the end point. A negative distance indicates that the
     * query point lies somewhere before the start of the arc but after the point on the arc's parent circle that is
     * diametrically opposed to the midpoint of the arc.
     * @param circle The arc's parent circle.
     * @param start The start point of the arc.
     * @param end The end point of the arc.
     * @param pos The query point.
     * @param tolerance The error tolerance, in great-arc radians, when checking if `start` and `query` are equal.
     * Defaults to `GeoCircle.ANGULAR_TOLERANCE` if not specified.
     * @returns The normalized distance along the arc from the start point to the query point.
     */
    static getAlongArcNormalizedDistance(circle, start, end, pos, tolerance = GeoCircle.ANGULAR_TOLERANCE) {
        const posAngularDistance = circle.angleAlong(start, pos, Math.PI);
        if (Math.min(posAngularDistance, MathUtils.TWO_PI - posAngularDistance) <= tolerance) {
            return 0;
        }
        const endAngularDistance = circle.angleAlong(start, end, Math.PI);
        if (Math.min(endAngularDistance, MathUtils.TWO_PI - endAngularDistance) <= tolerance) {
            return posAngularDistance >= Math.PI ? -Infinity : Infinity;
        }
        return ((posAngularDistance - (endAngularDistance / 2) + Math.PI) % MathUtils.TWO_PI - Math.PI) / endAngularDistance + 0.5;
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    static isPointAlongArc(circle, start, end, pos, inclusive = true, tolerance = GeoCircle.ANGULAR_TOLERANCE) {
        const angularTolerance = circle.angularWidth(tolerance);
        if (typeof end !== 'number') {
            end = circle.angleAlong(start, end, Math.PI, angularTolerance);
        }
        if (inclusive && Math.abs(end) >= MathUtils.TWO_PI - angularTolerance) {
            return true;
        }
        const angle = circle.angleAlong(start, pos, Math.PI);
        if (inclusive && angle >= MathUtils.TWO_PI - angularTolerance) {
            return true;
        }
        const signedDiff = (angle - end) * (end >= 0 ? 1 : -1);
        return inclusive ? signedDiff <= angularTolerance : signedDiff < -angularTolerance;
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    static projectVelocityToCircle(speed, position, direction, projectTo) {
        if (projectTo.radius <= GeoCircle.ANGULAR_TOLERANCE) {
            return NaN;
        }
        if (speed === 0) {
            return 0;
        }
        if (!(position instanceof Float64Array)) {
            position = GeoPoint.sphericalToCartesian(position, FlightPathUtils.vec3Cache[0]);
        }
        const velocityPath = typeof direction === 'number'
            ? FlightPathUtils.geoCircleCache[0].setAsGreatCircle(position, direction)
            : direction.isGreatCircle()
                ? direction
                : FlightPathUtils.geoCircleCache[0].setAsGreatCircle(position, FlightPathUtils.geoCircleCache[0].setAsGreatCircle(direction.center, position).center);
        const sign = velocityPath.encircles(projectTo.center) ? 1 : -1;
        const velocityPathNormal = Vec3Math.copy(velocityPath.center, FlightPathUtils.vec3Cache[1]);
        const projectedRadialNormal = FlightPathUtils.geoCircleCache[0].setAsGreatCircle(projectTo.center, position).center;
        const dot = Vec3Math.dot(projectedRadialNormal, velocityPathNormal);
        const sinTheta = Math.sqrt(1 - MathUtils.clamp(dot * dot, 0, 1));
        return speed * sinTheta * sign;
    }
    /**
     * Resolves the ingress to egress vectors for a set of flight plan leg calculations. This operation will populate the
     * `ingressToEgress` array with a sequence of vectors connecting the ingress transition to the egress transition
     * while following the flight path defined by the vectors in the `flightPath` array.
     * @param legCalc A set of flight plan leg calculations.
     * @returns The flight plan leg calculations, after the ingress to egress vectors have been resolved.
     */
    static resolveIngressToEgress(legCalc) {
        var _a, _b, _c, _d, _e, _f;
        var _g, _h, _j, _k, _l, _m;
        const vectors = legCalc.ingressToEgress;
        let vectorIndex = 0;
        let flightPathVectorIndex = Math.max(0, legCalc.ingressJoinIndex);
        const lastIngressVector = legCalc.ingress[legCalc.ingress.length - 1];
        const ingressJoinVector = legCalc.flightPath[legCalc.ingressJoinIndex];
        const firstEgressVector = legCalc.egress[0];
        const egressJoinVector = legCalc.flightPath[legCalc.egressJoinIndex];
        if (lastIngressVector && ingressJoinVector) {
            // Check if the last ingress vector joins the base flight path before the end of a vector. If so, we need to
            // replace the base flight path vector the ingress joins with a shortened version starting where the ingress
            // ends.
            const ingressEnd = FlightPathUtils.geoPointCache[0].set(lastIngressVector.endLat, lastIngressVector.endLon);
            const ingressJoinVectorStart = FlightPathUtils.geoPointCache[1].set(ingressJoinVector.startLat, ingressJoinVector.startLon);
            const ingressJoinVectorEnd = legCalc.ingressJoinIndex === legCalc.egressJoinIndex && firstEgressVector
                ? FlightPathUtils.geoPointCache[2].set(firstEgressVector.startLat, firstEgressVector.startLon)
                : FlightPathUtils.geoPointCache[2].set(ingressJoinVector.endLat, ingressJoinVector.endLon);
            const ingressJoinVectorCircle = FlightPathUtils.setGeoCircleFromVector(ingressJoinVector, FlightPathUtils.geoCircleCache[0]);
            const ingressEndAlongVectorDistance = FlightPathUtils.getAlongArcNormalizedDistance(ingressJoinVectorCircle, ingressJoinVectorStart, ingressJoinVectorEnd, ingressEnd);
            const normalizedTolerance = GeoCircle.ANGULAR_TOLERANCE / UnitType.METER.convertTo(ingressJoinVector.distance, UnitType.GA_RADIAN);
            if (ingressEndAlongVectorDistance < 1 - normalizedTolerance) {
                // Ingress joins the base flight path before the end of the joined vector.
                if (ingressEndAlongVectorDistance > normalizedTolerance) {
                    // Ingress joins the base flight path after the start of the joined vector.
                    ingressJoinVectorCircle.closest(ingressEnd, ingressEnd);
                    FlightPathUtils.setCircleVector((_a = vectors[_g = vectorIndex++]) !== null && _a !== void 0 ? _a : (vectors[_g] = FlightPathUtils.createEmptyCircleVector()), ingressJoinVectorCircle, ingressEnd, ingressJoinVectorEnd, ingressJoinVector.flags);
                }
                else {
                    // Ingress joins the base flight path at or before the start of the joined vector.
                    Object.assign((_b = vectors[_h = vectorIndex++]) !== null && _b !== void 0 ? _b : (vectors[_h] = FlightPathUtils.createEmptyCircleVector()), ingressJoinVector);
                }
            }
            flightPathVectorIndex++;
        }
        const end = Math.min(legCalc.flightPath.length, legCalc.egressJoinIndex < 0 ? Infinity : legCalc.egressJoinIndex);
        for (let i = flightPathVectorIndex; i < end; i++) {
            Object.assign((_c = vectors[_j = vectorIndex++]) !== null && _c !== void 0 ? _c : (vectors[_j] = FlightPathUtils.createEmptyCircleVector()), legCalc.flightPath[i]);
            flightPathVectorIndex++;
        }
        if (flightPathVectorIndex === legCalc.egressJoinIndex && egressJoinVector) {
            if (firstEgressVector) {
                // Check if the first egress vector joins the base flight path in after the start of a vector. If so, we need
                // to replace the base flight path vector the egress joins with a shortened version starting where the egress
                // starts.
                const egressStart = FlightPathUtils.geoPointCache[0].set(firstEgressVector.startLat, firstEgressVector.startLon);
                const egressJoinVectorStart = FlightPathUtils.geoPointCache[1].set(egressJoinVector.startLat, egressJoinVector.startLon);
                const egressJoinVectorEnd = FlightPathUtils.geoPointCache[2].set(egressJoinVector.endLat, egressJoinVector.endLon);
                const egressJoinVectorCircle = FlightPathUtils.setGeoCircleFromVector(egressJoinVector, FlightPathUtils.geoCircleCache[0]);
                const egressStartAlongVectorDistance = FlightPathUtils.getAlongArcNormalizedDistance(egressJoinVectorCircle, egressJoinVectorStart, egressJoinVectorEnd, egressStart);
                const normalizedTolerance = GeoCircle.ANGULAR_TOLERANCE / UnitType.METER.convertTo(egressJoinVector.distance, UnitType.GA_RADIAN);
                if (egressStartAlongVectorDistance > normalizedTolerance) {
                    // Egress joins the base flight path after the start of the joined vector.
                    if (egressStartAlongVectorDistance < 1 - normalizedTolerance) {
                        // Egress joins the base flight path before the end of the joined vector.
                        egressJoinVectorCircle.closest(egressStart, egressStart);
                        FlightPathUtils.setCircleVector((_d = vectors[_k = vectorIndex++]) !== null && _d !== void 0 ? _d : (vectors[_k] = FlightPathUtils.createEmptyCircleVector()), egressJoinVectorCircle, egressJoinVectorStart, egressStart, egressJoinVector.flags);
                    }
                    else {
                        // Egress joins the base flight path at or after the end of the joined vector.
                        Object.assign((_e = vectors[_l = vectorIndex++]) !== null && _e !== void 0 ? _e : (vectors[_l] = FlightPathUtils.createEmptyCircleVector()), egressJoinVector);
                    }
                }
            }
            else {
                // There is no egress, but there is a base flight path vector flagged as the vector with which the egress
                // joins. This is technically an invalid state, but we can easily just treat this as a regular "no-egress"
                // case and copy the entire egress join vector into the resolved vectors array.
                Object.assign((_f = vectors[_m = vectorIndex++]) !== null && _f !== void 0 ? _f : (vectors[_m] = FlightPathUtils.createEmptyCircleVector()), egressJoinVector);
            }
        }
        vectors.length = vectorIndex;
        return legCalc;
    }
}
FlightPathUtils.vec3Cache = [new Float64Array(3), new Float64Array(3)];
FlightPathUtils.geoPointCache = [new GeoPoint(0, 0), new GeoPoint(0, 0), new GeoPoint(0, 0)];
FlightPathUtils.geoCircleCache = [new GeoCircle(new Float64Array(3), 0)];
[new GeoCircle(new Float64Array(3), 0)];
[new GeoPoint(0, 0), new GeoPoint(0, 0), new GeoPoint(0, 0)];
[new GeoCircle(new Float64Array(3), 0)];
[new GeoPoint(0, 0), new GeoPoint(0, 0), new GeoPoint(0, 0)];
[new GeoCircle(new Float64Array(3), 0)];
[new GeoCircle(new Float64Array(3), 0), new GeoCircle(new Float64Array(3), 0)];
[
    new GeoCircle(new Float64Array(3), 0),
    new GeoCircle(new Float64Array(3), 0),
    new GeoCircle(new Float64Array(3), 0),
    new GeoCircle(new Float64Array(3), 0),
    new GeoCircle(new Float64Array(3), 0)
];
[new GeoCircle(new Float64Array(3), 0), new GeoCircle(new Float64Array(3), 0), new GeoCircle(new Float64Array(3), 0)];
[
    new GeoCircle(new Float64Array(3), 0), new GeoCircle(new Float64Array(3), 0), new GeoCircle(new Float64Array(3), 0)
];
[
    new GeoCircle(new Float64Array(3), 0), new GeoCircle(new Float64Array(3), 0),
    new GeoCircle(new Float64Array(3), 0), new GeoCircle(new Float64Array(3), 0)
];
[
    new GeoPoint(0, 0), new GeoPoint(0, 0), new GeoPoint(0, 0), new GeoPoint(0, 0), new GeoPoint(0, 0),
    new GeoPoint(0, 0), new GeoPoint(0, 0), new GeoPoint(0, 0), new GeoPoint(0, 0), new GeoPoint(0, 0)
];
[new GeoCircle(new Float64Array(3), 0)];
[new GeoPoint(0, 0), new GeoPoint(0, 0)];
[new GeoCircle(new Float64Array(3), 0), new GeoCircle(new Float64Array(3), 0)];
[
    LegType.AF,
    LegType.RF,
    LegType.PI
];
[new GeoPoint(0, 0), new GeoPoint(0, 0), new GeoPoint(0, 0), new GeoPoint(0, 0), new GeoPoint(0, 0)];
[
    new GeoCircle(new Float64Array(3), 0), new GeoCircle(new Float64Array(3), 0),
    new GeoCircle(new Float64Array(3), 0), new GeoCircle(new Float64Array(3), 0)
];
[new GeoPoint(0, 0), new GeoPoint(0, 0)];
({
    geoPoint: [new GeoPoint(0, 0), new GeoPoint(0, 0), new GeoPoint(0, 0), new GeoPoint(0, 0), new GeoPoint(0, 0)],
    geoCircle: [new GeoCircle(new Float64Array(3), 0), new GeoCircle(new Float64Array(3), 0)]
});
/** Array of "to altitude" leg types. */
[LegType.CA, LegType.FA, LegType.VA];
/** Array of "heading to" leg types. */
[LegType.VA, LegType.VD, LegType.VI, LegType.VM, LegType.VR];
/** Array of "hold" leg types. */
[LegType.HA, LegType.HF, LegType.HM];
/** Array of manual termination leg types that end in a discontinuity. */
[LegType.FM, LegType.VM];
/** Array of discontinuity leg types. */
[LegType.Discontinuity, LegType.ThruDiscontinuity];

/**
 * Modes for calculating airplane speed for use in flight path calculations.
 */
var FlightPathAirplaneSpeedMode;
(function (FlightPathAirplaneSpeedMode) {
    /** The default airplane speed is always used. */
    FlightPathAirplaneSpeedMode["Default"] = "Default";
    /** Ground speed is used. */
    FlightPathAirplaneSpeedMode["GroundSpeed"] = "GroundSpeed";
    /** True airspeed is used. */
    FlightPathAirplaneSpeedMode["TrueAirspeed"] = "TrueAirspeed";
    /** True airspeed plus wind speed is used. */
    FlightPathAirplaneSpeedMode["TrueAirspeedPlusWind"] = "TrueAirspeedPlusWind";
})(FlightPathAirplaneSpeedMode || (FlightPathAirplaneSpeedMode = {}));

var LegEventType;
(function (LegEventType) {
    LegEventType["Added"] = "Added";
    LegEventType["Removed"] = "Removed";
    LegEventType["Changed"] = "Changed";
})(LegEventType || (LegEventType = {}));
var SegmentEventType;
(function (SegmentEventType) {
    SegmentEventType["Added"] = "Added";
    SegmentEventType["Removed"] = "Removed";
    SegmentEventType["Changed"] = "Changed";
    SegmentEventType["Inserted"] = "Inserted";
})(SegmentEventType || (SegmentEventType = {}));
var ActiveLegType;
(function (ActiveLegType) {
    ActiveLegType["Lateral"] = "Lateral";
    ActiveLegType["Vertical"] = "Vertical";
    ActiveLegType["Calculating"] = "Calculating";
})(ActiveLegType || (ActiveLegType = {}));
var OriginDestChangeType;
(function (OriginDestChangeType) {
    OriginDestChangeType["OriginAdded"] = "OriginAdded";
    OriginDestChangeType["OriginRemoved"] = "OriginRemoved";
    OriginDestChangeType["DestinationAdded"] = "DestinationAdded";
    OriginDestChangeType["DestinationRemoved"] = "DestinationRemoved";
})(OriginDestChangeType || (OriginDestChangeType = {}));

/**
 * An implementation of {@link SubEventInterface}.
 */
class SubEvent {
    constructor() {
        this.subs = [];
        this.notifyDepth = 0;
        this.onSubDestroyedFunc = this.onSubDestroyed.bind(this);
    }
    /** @inheritdoc */
    on(handler, paused = false) {
        const sub = new HandlerSubscription(handler, undefined, this.onSubDestroyedFunc);
        this.subs.push(sub);
        if (paused) {
            sub.pause();
        }
        return sub;
    }
    /** @inheritdoc */
    off(handler) {
        const toDestroy = this.subs.find(sub => sub.handler === handler);
        toDestroy === null || toDestroy === void 0 ? void 0 : toDestroy.destroy();
    }
    /** @inheritdoc */
    clear() {
        this.notifyDepth++;
        for (let i = 0; i < this.subs.length; i++) {
            this.subs[i].destroy();
        }
        this.notifyDepth--;
        if (this.notifyDepth === 0) {
            this.subs.length = 0;
        }
    }
    /** @inheritdoc */
    notify(sender, data) {
        let needCleanUpSubs = false;
        this.notifyDepth++;
        const subLen = this.subs.length;
        for (let i = 0; i < subLen; i++) {
            try {
                const sub = this.subs[i];
                if (sub.isAlive && !sub.isPaused) {
                    sub.handler(sender, data);
                }
                needCleanUpSubs || (needCleanUpSubs = !sub.isAlive);
            }
            catch (error) {
                console.error(`SubEvent: error in handler: ${error}`);
                if (error instanceof Error) {
                    console.error(error.stack);
                }
            }
        }
        this.notifyDepth--;
        if (needCleanUpSubs && this.notifyDepth === 0) {
            this.subs = this.subs.filter(sub => sub.isAlive);
        }
    }
    /**
     * Responds to when a subscription to this event is destroyed.
     * @param sub The destroyed subscription.
     */
    onSubDestroyed(sub) {
        // If we are not in the middle of a notify operation, remove the subscription.
        // Otherwise, do nothing and let the post-notify clean-up code handle it.
        if (this.notifyDepth === 0) {
            this.subs.splice(this.subs.indexOf(sub), 1);
        }
    }
}

/**
 * A collection of unique string waypoint type keys.
 */
var WaypointTypes;
(function (WaypointTypes) {
    WaypointTypes["Custom"] = "Custom";
    WaypointTypes["Airport"] = "Airport";
    WaypointTypes["NDB"] = "NDB";
    WaypointTypes["VOR"] = "VOR";
    WaypointTypes["Intersection"] = "Intersection";
    WaypointTypes["Runway"] = "Runway";
    WaypointTypes["User"] = "User";
    WaypointTypes["Visual"] = "Visual";
    WaypointTypes["FlightPlan"] = "FlightPlan";
    WaypointTypes["VNAV"] = "VNAV";
})(WaypointTypes || (WaypointTypes = {}));
/**
 * An abstract implementation of Waypoint.
 */
class AbstractWaypoint {
    // eslint-disable-next-line jsdoc/require-jsdoc
    equals(other) {
        return this.uid === other.uid;
    }
}
/**
 * A basic implementation of {@link FacilityWaypoint}.
 */
class BasicFacilityWaypoint extends AbstractWaypoint {
    /**
     * Constructor.
     * @param facility The facility associated with this waypoint.
     * @param bus The event bus.
     */
    constructor(facility, bus) {
        super();
        this.bus = bus;
        /** @inheritdoc */
        this.isFacilityWaypoint = true;
        this._facility = Subject.create(facility);
        this._location = GeoPointSubject.createFromGeoPoint(new GeoPoint(facility.lat, facility.lon));
        this._type = BasicFacilityWaypoint.getType(facility);
        const facType = ICAO.getFacilityType(facility.icao);
        if (facType === FacilityType.VIS || facType === FacilityType.USR) {
            // These types of facilities can be mutated. So we need to listen to the event bus for change events and respond
            // accordingly.
            this.facChangeSub = this.bus.getSubscriber()
                .on(`facility_changed_${facility.icao}`)
                .handle(newFacility => {
                this._facility.set(newFacility);
                this._location.set(newFacility.lat, newFacility.lon);
            });
        }
    }
    /** @inheritdoc */
    get location() {
        return this._location;
    }
    /** @inheritdoc */
    get uid() {
        return this.facility.get().icao;
    }
    /** @inheritdoc */
    get type() {
        return this._type;
    }
    // eslint-disable-next-line jsdoc/require-returns
    /**
     * The facility associated with this waypoint.
     */
    get facility() {
        return this._facility;
    }
    /**
     * Gets a waypoint type from a facility.
     * @param facility A facility.
     * @returns The waypoint type corresponding to the facility.
     */
    static getType(facility) {
        switch (ICAO.getFacilityType(facility.icao)) {
            case FacilityType.Airport:
                return WaypointTypes.Airport;
            case FacilityType.Intersection:
                return WaypointTypes.Intersection;
            case FacilityType.NDB:
                return WaypointTypes.NDB;
            case FacilityType.RWY:
                return WaypointTypes.Runway;
            case FacilityType.USR:
                return WaypointTypes.User;
            case FacilityType.VIS:
                return WaypointTypes.Visual;
            case FacilityType.VOR:
                return WaypointTypes.VOR;
            default:
                return WaypointTypes.User;
        }
    }
}
/**
 * A flight path waypoint.
 */
class FlightPathWaypoint extends AbstractWaypoint {
    // eslint-disable-next-line jsdoc/require-jsdoc
    constructor(arg1, arg2, arg3, arg4, arg5) {
        super();
        if (typeof arg1 === 'number') {
            this._location = GeoPointSubject.create(new GeoPoint(arg1, arg2));
            this._uid = `${FlightPathWaypoint.UID_PREFIX}_${arg4}`;
            this.leg = arg3;
            this.ident = arg5;
        }
        else {
            this._location = arg1;
            this._uid = `${FlightPathWaypoint.UID_PREFIX}_${arg3}`;
            this.leg = arg2;
            this.ident = arg4;
        }
    }
    /** @inheritdoc */
    get location() {
        return this._location;
    }
    /** @inheritdoc */
    get uid() {
        return this._uid;
    }
    /** @inheritdoc */
    get type() { return WaypointTypes.FlightPlan; }
}
FlightPathWaypoint.UID_PREFIX = 'FLPTH';
/**
 * A VNAV waypoint.
 */
class VNavWaypoint extends AbstractWaypoint {
    /**
     * Constructor.
     * @param leg The leg that the VNAV waypoint is contained in.
     * @param distanceFromEnd The distance along the flight path from the end of the leg to the location of the waypoint,
     * in meters.
     * @param uid A unique ID to assign to the VNAV waypoint.
     * @param ident This waypoint's ident string.
     */
    constructor(leg, distanceFromEnd, uid, ident) {
        super();
        this.ident = ident;
        this._uid = uid;
        this._location = GeoPointSubject.create(this.getWaypointLocation(leg, distanceFromEnd, new GeoPoint(0, 0)));
    }
    /** @inheritdoc */
    get type() { return WaypointTypes.VNAV; }
    /** @inheritdoc */
    get location() {
        return this._location;
    }
    /** @inheritdoc */
    get uid() {
        return this._uid;
    }
    /**
     * Sets this waypoint's location.
     * @param leg The leg that the waypoint resides in.
     * @param distanceFromEnd The distance along the flight path from the end of the leg to the location of the waypoint,
     * in meters.
     */
    setLocation(leg, distanceFromEnd) {
        this._location.set(this.getWaypointLocation(leg, distanceFromEnd, VNavWaypoint.geoPointCache[0]));
    }
    /**
     * Gets the waypoint's location in space.
     * @param leg The leg that the waypoint resides in.
     * @param distanceFromEnd The distance along the flight path from the end of the leg to the location of the waypoint,
     * in meters.
     * @param out The GeoPoint object to which to write the location.
     * @returns The waypoint's location.
     */
    getWaypointLocation(leg, distanceFromEnd, out) {
        var _a, _b;
        if (leg.calculated !== undefined) {
            const vectors = [...leg.calculated.ingress, ...leg.calculated.ingressToEgress, ...leg.calculated.egress];
            let vectorIndex = vectors.length - 1;
            while (vectorIndex >= 0) {
                const vector = vectors[vectorIndex];
                const vectorDistance = vector.distance;
                if (vectorDistance >= distanceFromEnd) {
                    const end = GeoPoint.sphericalToCartesian(vector.endLat, vector.endLon, VNavWaypoint.vec3Cache[0]);
                    return FlightPathUtils.setGeoCircleFromVector(vector, VNavWaypoint.geoCircleCache[0])
                        .offsetDistanceAlong(end, UnitType.METER.convertTo(-distanceFromEnd, UnitType.GA_RADIAN), out, Math.PI);
                }
                else {
                    distanceFromEnd -= vectorDistance;
                }
                vectorIndex--;
            }
            if (vectors.length > 0) {
                out.set(vectors[0].startLat, vectors[0].startLon);
            }
            else {
                out.set((_a = leg.calculated.endLat) !== null && _a !== void 0 ? _a : 0, (_b = leg.calculated.endLon) !== null && _b !== void 0 ? _b : 0);
            }
        }
        return out;
    }
}
VNavWaypoint.vec3Cache = [new Float64Array(3)];
VNavWaypoint.geoPointCache = [new GeoPoint(0, 0)];
VNavWaypoint.geoCircleCache = [new GeoCircle(new Float64Array(3), 0)];

/**
 * A default implementation of {@link FacilityWaypointCache}.
 */
class DefaultFacilityWaypointCache {
    /**
     * Constructor.
     * @param bus The event bus.
     * @param size The maximum size of this cache.
     */
    constructor(bus, size) {
        this.bus = bus;
        this.size = size;
        this.cache = new Map();
    }
    /** @inheritdoc */
    get(facility) {
        const key = DefaultFacilityWaypointCache.getFacilityKey(facility);
        let existing = this.cache.get(key);
        if (!existing) {
            existing = new BasicFacilityWaypoint(facility, this.bus);
            this.addToCache(key, existing);
        }
        return existing;
    }
    /**
     * Adds a waypoint to this cache. If the size of the cache is greater than the maximum after the new waypoint is
     * added, a waypoint will be removed from the cache in FIFO order.
     * @param key The key of the waypoint to add.
     * @param waypoint The waypoint to add.
     */
    addToCache(key, waypoint) {
        this.cache.set(key, waypoint);
        if (this.cache.size > this.size) {
            this.cache.delete(this.cache.keys().next().value);
        }
    }
    /**
     * Gets a FacilityWaypointCache instance.
     * @param bus The event bus.
     * @returns A FacilityWaypointCache instance.
     */
    static getCache(bus) {
        var _a;
        return (_a = DefaultFacilityWaypointCache.INSTANCE) !== null && _a !== void 0 ? _a : (DefaultFacilityWaypointCache.INSTANCE = new DefaultFacilityWaypointCache(bus, 1000));
    }
    /**
     * Gets the cache key for a facility.
     * @param facility A facility.
     * @returns The cache key for the specified facility.
     */
    static getFacilityKey(facility) {
        if (FacilityUtils.isFacilityType(facility, FacilityType.Intersection) && ICAO.getFacilityType(facility.icao) !== FacilityType.Intersection) {
            return `mismatch.${facility.icao}`;
        }
        return facility.icao;
    }
}

/**
 * Utility class for generating common functions for mapping subscribables.
 */
class SubscribableMapFunctions {
    /**
     * Generates a function which maps an input to itself.
     * @returns A function which maps an input to itself.
     */
    static identity() {
        return (input) => input;
    }
    /**
     * Generates a function which maps an input boolean to its negation.
     * @returns A function which maps an input boolean to its negation.
     */
    static not() {
        return (input) => !input;
    }
    /**
     * Generates a function which maps an input number to its negation.
     * @returns A function which maps an input number to its negation.
     */
    static negate() {
        return (input) => -input;
    }
    /**
     * Generates a function which maps an input number to its absolute value.
     * @returns A function which maps an input number to its absolute value.
     */
    static abs() {
        return Math.abs;
    }
    /**
     * Generates a function which maps an input number to a rounded version of itself at a certain precision.
     * @param precision The precision to which to round the input.
     * @returns A function which maps an input number to a rounded version of itself at the specified precision.
     */
    static withPrecision(precision) {
        return SubscribableUtils.isSubscribable(precision)
            ? (input) => {
                const precisionVal = precision.get();
                return Math.round(input / precisionVal) * precisionVal;
            }
            : (input) => {
                return Math.round(input / precision) * precision;
            };
    }
    /**
     * Generates a function which maps an input number to itself if and only if it differs from the previous mapped value
     * by a certain amount, and to the previous mapped value otherwise.
     * @param threshold The minimum difference between the input and the previous mapped value required to map the input
     * to itself.
     * @returns A function which maps an input number to itself if and only if it differs from the previous mapped value
     * by the specified amount, and to the previous mapped value otherwise.
     */
    static changedBy(threshold) {
        return SubscribableUtils.isSubscribable(threshold)
            ? (input, currentVal) => currentVal === undefined || Math.abs(input - currentVal) >= threshold.get() ? input : currentVal
            : (input, currentVal) => currentVal === undefined || Math.abs(input - currentVal) >= threshold ? input : currentVal;
    }
    /**
     * Generates a function which maps an input number to itself up to a maximum frequency, and to the previous mapped
     * value otherwise.
     * @param freq The maximum frequency at which to map the input to itself, in hertz.
     * @param timeFunc A function which gets the current time in milliseconds. Defaults to `Date.now()`.
     * @returns A function which maps an input number to itself up to the specified maximum frequency, and to the
     * previous mapped value otherwise.
     */
    static atFrequency(freq, timeFunc = Date.now) {
        let t0;
        let timeRemaining = 0;
        if (SubscribableUtils.isSubscribable(freq)) {
            return (input, currentVal) => {
                let returnValue = currentVal !== null && currentVal !== void 0 ? currentVal : input;
                const currentTime = timeFunc();
                const dt = currentTime - (t0 !== null && t0 !== void 0 ? t0 : (t0 = currentTime));
                t0 = currentTime;
                timeRemaining -= dt;
                if (timeRemaining <= 0) {
                    const period = 1000 / freq.get();
                    timeRemaining = period + timeRemaining % period;
                    returnValue = input;
                }
                return returnValue;
            };
        }
        else {
            const period = 1000 / freq;
            return (input, currentVal) => {
                let returnValue = currentVal !== null && currentVal !== void 0 ? currentVal : input;
                const currentTime = timeFunc();
                const dt = currentTime - (t0 !== null && t0 !== void 0 ? t0 : (t0 = currentTime));
                t0 = currentTime;
                timeRemaining -= dt;
                if (timeRemaining <= 0) {
                    timeRemaining = period + timeRemaining % period;
                    returnValue = input;
                }
                return returnValue;
            };
        }
    }
}

/**
 * A subscribable subject that is a mapped stream from one or more input subscribables.
 */
class MappedSubject extends AbstractSubscribable {
    /**
     * Creates a new MappedSubject.
     * @param mapFunc The function which maps this subject's inputs to a value.
     * @param equalityFunc The function which this subject uses to check for equality between values.
     * @param mutateFunc The function which this subject uses to change its value.
     * @param initialVal The initial value of this subject.
     * @param inputs The subscribables which provide the inputs to this subject.
     */
    constructor(mapFunc, equalityFunc, mutateFunc, initialVal, ...inputs) {
        super();
        this.mapFunc = mapFunc;
        this.equalityFunc = equalityFunc;
        this.isSubscribable = true;
        this._isAlive = true;
        this._isPaused = false;
        this.inputs = inputs;
        this.inputValues = inputs.map(input => input.get());
        if (initialVal && mutateFunc) {
            this.value = initialVal;
            mutateFunc(this.value, this.mapFunc(this.inputValues, undefined));
            this.mutateFunc = (newVal) => { mutateFunc(this.value, newVal); };
        }
        else {
            this.value = this.mapFunc(this.inputValues, undefined);
            this.mutateFunc = (newVal) => { this.value = newVal; };
        }
        this.inputSubs = this.inputs.map((input, index) => input.sub(inputValue => {
            this.inputValues[index] = inputValue;
            this.updateValue();
        }));
    }
    /** @inheritdoc */
    get isAlive() {
        return this._isAlive;
    }
    /** @inheritdoc */
    get isPaused() {
        return this._isPaused;
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    static create(...args) {
        let mapFunc, equalityFunc, mutateFunc, initialVal;
        if (typeof args[0] === 'function') {
            // Mapping function was supplied.
            mapFunc = args.shift();
            if (typeof args[0] === 'function') {
                equalityFunc = args.shift();
            }
            else {
                equalityFunc = AbstractSubscribable.DEFAULT_EQUALITY_FUNC;
            }
            if (typeof args[0] === 'function') {
                mutateFunc = args.shift();
                initialVal = args.shift();
            }
        }
        else {
            mapFunc = MappedSubject.IDENTITY_MAP;
            equalityFunc = MappedSubject.NEVER_EQUALS;
        }
        return new MappedSubject(mapFunc, equalityFunc, mutateFunc, initialVal, ...args);
    }
    /**
     * Re-maps this subject's value from its input, and notifies subscribers if this results in a change to the mapped
     * value according to this subject's equality function.
     */
    updateValue() {
        const value = this.mapFunc(this.inputValues, this.value);
        if (!this.equalityFunc(this.value, value)) {
            this.mutateFunc(value);
            this.notify();
        }
    }
    /** @inheritdoc */
    get() {
        return this.value;
    }
    /** @inheritdoc */
    pause() {
        if (!this._isAlive) {
            throw new Error('MappedSubject: cannot pause a dead subject');
        }
        if (this._isPaused) {
            return this;
        }
        for (let i = 0; i < this.inputSubs.length; i++) {
            this.inputSubs[i].pause();
        }
        this._isPaused = true;
        return this;
    }
    /** @inheritdoc */
    resume() {
        if (!this._isAlive) {
            throw new Error('MappedSubject: cannot resume a dead subject');
        }
        if (!this._isPaused) {
            return this;
        }
        this._isPaused = false;
        for (let i = 0; i < this.inputSubs.length; i++) {
            this.inputValues[i] = this.inputs[i].get();
            this.inputSubs[i].resume();
        }
        this.updateValue();
        return this;
    }
    /** @inheritdoc */
    destroy() {
        this._isAlive = false;
        for (let i = 0; i < this.inputSubs.length; i++) {
            this.inputSubs[i].destroy();
        }
    }
}
MappedSubject.IDENTITY_MAP = SubscribableMapFunctions.identity();
MappedSubject.NEVER_EQUALS = () => false;

/**
 * Types of changes made to {@link SubscribableSet}.
 */
var SubscribableSetEventType;
(function (SubscribableSetEventType) {
    /** A key was added. */
    SubscribableSetEventType["Added"] = "Added";
    /** A key was deleted. */
    SubscribableSetEventType["Deleted"] = "Deleted";
})(SubscribableSetEventType || (SubscribableSetEventType = {}));

/**
 * An array-like class to observe changes in a list of objects.
 * @class ArraySubject
 * @template T
 */
class ArraySubject extends AbstractSubscribableArray {
    /**
     * Constructs an observable array.
     * @param arr The initial array elements.
     */
    constructor(arr) {
        super();
        this.array = arr;
    }
    // eslint-disable-next-line jsdoc/require-returns
    /** The length of this array. */
    get length() {
        return this.array.length;
    }
    /**
     * Creates and returns a new observable array.
     * @static
     * @template AT The type of the array items.
     * @param arr The initial array elements.
     * @returns A new instance of SubjectArray.
     */
    static create(arr = []) {
        return new ArraySubject(arr);
    }
    /**
     * Inserts a new item at the end or the specified index.
     * @param item The item to insert.
     * @param index The optional index to insert the item to. Will add the item at then end if index not given.
     */
    insert(item, index) {
        if (index === undefined || index > this.array.length - 1) {
            index = this.array.length;
            this.array.push(item);
        }
        else {
            this.array.splice(index, 0, item);
        }
        this.notify(index, SubscribableArrayEventType.Added, item);
    }
    /**
     * Inserts items of an array beginning at the specified index.
     * @param [index] The index to begin inserting the array items.
     * @param arr The array to insert.
     */
    insertRange(index = 0, arr) {
        this.array.splice(index, 0, ...arr);
        this.notify(index, SubscribableArrayEventType.Added, arr);
    }
    /**
     * Removes the item at the specified index.
     * @param index The index of the item to remove.
     */
    removeAt(index) {
        const removedItem = this.array.splice(index, 1);
        this.notify(index, SubscribableArrayEventType.Removed, removedItem[0]);
    }
    /**
     * Removes the given item from the array.
     * @param item The item to remove.
     * @returns Returns a boolean indicating if the item was found and removed.
     */
    removeItem(item) {
        const index = this.array.indexOf(item);
        if (index > -1) {
            this.removeAt(index);
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * Replaces all items in the array with the new array.
     * @param arr The array.
     */
    set(arr) {
        this.clear();
        this.insertRange(0, arr);
    }
    /**
     * Clears all data in the array.
     */
    clear() {
        this.array.length = 0;
        this.notify(0, SubscribableArrayEventType.Cleared);
    }
    /**
     * Gets the array.
     * @returns The array.
     */
    getArray() {
        return this.array;
    }
}

/**
 * A object-valued subscribable subject which supports setting individual properties on the object and notifying
 * subscribers of any changes to those properties.
 */
class ObjectSubject {
    /**
     * Constructs an observable object Subject.
     * @param obj The initial object.
     */
    constructor(obj) {
        this.obj = obj;
        this.isSubscribable = true;
        this.isMutableSubscribable = true;
        this.subs = [];
        this.notifyDepth = 0;
        this.initialNotifyFunc = this.initialNotify.bind(this);
        this.onSubDestroyedFunc = this.onSubDestroyed.bind(this);
    }
    /**
     * Creates and returns a new ObjectSubject.
     * @param v The initial value of the subject.
     * @returns An ObjectSubject instance.
     */
    static create(v) {
        return new ObjectSubject(v);
    }
    /**
     * Gets this subject's object.
     * @returns This subject's object.
     */
    get() {
        return this.obj;
    }
    /** @inheritdoc */
    sub(handler, initialNotify = false, paused = false) {
        const sub = new HandlerSubscription(handler, this.initialNotifyFunc, this.onSubDestroyedFunc);
        this.subs.push(sub);
        if (paused) {
            sub.pause();
        }
        else if (initialNotify) {
            sub.initialNotify();
        }
        return sub;
    }
    /** @inheritdoc */
    unsub(handler) {
        const toDestroy = this.subs.find(sub => sub.handler === handler);
        toDestroy === null || toDestroy === void 0 ? void 0 : toDestroy.destroy();
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    set(arg1, value) {
        if (typeof arg1 === 'object') {
            for (const prop in arg1) {
                if (prop in this.obj) {
                    this.set(prop, arg1[prop]);
                }
            }
        }
        else {
            const oldValue = this.obj[arg1];
            if (value !== oldValue) {
                this.obj[arg1] = value;
                this.notify(arg1, oldValue);
            }
        }
    }
    /**
     * Notifies subscriptions that one of the properties of this subject's object has changed.
     * @param key The property of the object that changed.
     * @param oldValue The old value of the property that changed.
     */
    notify(key, oldValue) {
        let needCleanUpSubs = false;
        this.notifyDepth++;
        const subLen = this.subs.length;
        for (let i = 0; i < subLen; i++) {
            try {
                const sub = this.subs[i];
                if (sub.isAlive && !sub.isPaused) {
                    sub.handler(this.obj, key, this.obj[key], oldValue);
                }
                needCleanUpSubs || (needCleanUpSubs = !sub.isAlive);
            }
            catch (error) {
                console.error(`ObjectSubject: error in handler: ${error}`);
                if (error instanceof Error) {
                    console.error(error.stack);
                }
            }
        }
        this.notifyDepth--;
        if (needCleanUpSubs && this.notifyDepth === 0) {
            this.subs = this.subs.filter(sub => sub.isAlive);
        }
    }
    /**
     * Notifies a subscription of this subject's current state.
     * @param sub The subscription to notify.
     */
    initialNotify(sub) {
        for (const key in this.obj) {
            const v = this.obj[key];
            sub.handler(this.obj, key, v, v);
        }
    }
    /**
     * Responds to when a subscription to this subscribable is destroyed.
     * @param sub The destroyed subscription.
     */
    onSubDestroyed(sub) {
        // If we are not in the middle of a notify operation, remove the subscription.
        // Otherwise, do nothing and let the post-notify clean-up code handle it.
        if (this.notifyDepth === 0) {
            this.subs.splice(this.subs.indexOf(sub), 1);
        }
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    map(fn, equalityFunc, mutateFunc, initialVal) {
        const mapFunc = (inputs, previousVal) => fn(inputs[0], previousVal);
        return mutateFunc
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            ? MappedSubject.create(mapFunc, equalityFunc, mutateFunc, initialVal, this)
            : MappedSubject.create(mapFunc, equalityFunc !== null && equalityFunc !== void 0 ? equalityFunc : AbstractSubscribable.DEFAULT_EQUALITY_FUNC, this);
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    pipe(to, arg2, arg3) {
        let sub;
        let paused;
        if (typeof arg2 === 'function') {
            sub = new SubscribablePipe(this, to, arg2, this.onSubDestroyedFunc);
            paused = arg3 !== null && arg3 !== void 0 ? arg3 : false;
        }
        else {
            sub = new SubscribablePipe(this, to, this.onSubDestroyedFunc);
            paused = arg2 !== null && arg2 !== void 0 ? arg2 : false;
        }
        this.subs.push(sub);
        if (paused) {
            sub.pause();
        }
        else {
            sub.initialNotify();
        }
        return sub;
    }
}
new SubEvent();
new SubEvent();

var IcaoSearchFilter;
(function (IcaoSearchFilter) {
    IcaoSearchFilter[IcaoSearchFilter["ALL"] = 0] = "ALL";
    IcaoSearchFilter[IcaoSearchFilter["AIRPORT"] = 1] = "AIRPORT";
    IcaoSearchFilter[IcaoSearchFilter["VOR"] = 2] = "VOR";
    IcaoSearchFilter[IcaoSearchFilter["NDB"] = 3] = "NDB";
    IcaoSearchFilter[IcaoSearchFilter["INTERSECTION"] = 4] = "INTERSECTION";
    IcaoSearchFilter[IcaoSearchFilter["USR"] = 5] = "USR";
})(IcaoSearchFilter || (IcaoSearchFilter = {}));

/// <reference types="@microsoft/msfs-types/js/simvar" />
/**
 * A publisher for electrical information.
 */
class ElectricalPublisher extends SimVarPublisher {
    /**
     * Create an ElectricalPublisher
     * @param bus The EventBus to publish to
     * @param pacer An optional pacer to use to control the rate of publishing
     */
    constructor(bus, pacer = undefined) {
        super(ElectricalPublisher.simvars, bus, pacer);
        this.flightStarted = false;
        this.avBusList = ['elec_av1_bus', 'elec_av2_bus'];
        for (const topic of this.avBusList) {
            if (bus.getTopicSubscriberCount(topic)) {
                this.subscribed.add(topic);
            }
        }
        bus.getSubscriber().on('event_bus_topic_first_sub').handle((event) => {
            if (this.avBusList.includes(event)) {
                this.subscribed.add(event);
            }
        });
        // When not starting cold and dark (on runway or in air), electrical power simvars are not properly initialized
        // during loading, so we will ignore all power data until the game enters briefing state.
        const gameStateSub = GameStateProvider.get().sub(state => {
            if (state === GameState.briefing || state === GameState.ingame) {
                gameStateSub.destroy();
                this.flightStarted = true;
            }
        }, false, true);
        gameStateSub.resume(true);
    }
    /** @inheritdoc */
    onUpdate() {
        if (this.flightStarted) {
            super.onUpdate();
            if (this.av1BusLogic && this.subscribed.has('elec_av1_bus')) {
                this.publish('elec_av1_bus', this.av1BusLogic.getValue() !== 0);
            }
            if (this.av2BusLogic && this.subscribed.has('elec_av2_bus')) {
                this.publish('elec_av2_bus', this.av2BusLogic.getValue() !== 0);
            }
        }
    }
    /**
     * Sets the logic element to use for the avionics 1 bus.
     * @param logicElement The logic element to use.
     */
    setAv1Bus(logicElement) {
        this.av1BusLogic = logicElement;
    }
    /**
     * Sets the logic element to use for the avionics 2 bus.
     * @param logicElement The logic element to use.
     */
    setAv2Bus(logicElement) {
        this.av2BusLogic = logicElement;
    }
}
ElectricalPublisher.simvars = new Map([
    ['elec_master_battery', { name: 'ELECTRICAL MASTER BATTERY', type: SimVarValueType.Bool }],
    ['elec_circuit_avionics_on_1', { name: 'CIRCUIT AVIONICS ON:1', type: SimVarValueType.Bool }],
    ['elec_circuit_avionics_on_2', { name: 'CIRCUIT AVIONICS ON:2', type: SimVarValueType.Bool }],
    ['elec_circuit_navcom1_on', { name: 'CIRCUIT NAVCOM1 ON', type: SimVarValueType.Bool }],
    ['elec_circuit_navcom2_on', { name: 'CIRCUIT NAVCOM2 ON', type: SimVarValueType.Bool }],
    ['elec_circuit_navcom3_on', { name: 'CIRCUIT NAVCOM3 ON', type: SimVarValueType.Bool }],
    ['elec_bus_main_v', { name: 'ELECTRICAL MAIN BUS VOLTAGE', type: SimVarValueType.Volts }],
    ['elec_bus_main_a', { name: 'ELECTRICAL MAIN BUS AMPS', type: SimVarValueType.Amps }],
    ['elec_bus_avionics_v', { name: 'ELECTRICAL AVIONICS BUS VOLTAGE', type: SimVarValueType.Volts }],
    ['elec_bus_avionics_a', { name: 'ELECTRICAL AVIONICS BUS AMPS', type: SimVarValueType.Amps }],
    ['elec_bus_genalt_1_v', { name: 'ELECTRICAL GENALT BUS VOLTAGE:1', type: SimVarValueType.Volts }],
    ['elec_bus_genalt_2_v', { name: 'ELECTRICAL GENALT BUS VOLTAGE:2', type: SimVarValueType.Volts }],
    ['elec_bus_genalt_1_a', { name: 'ELECTRICAL GENALT BUS AMPS:1', type: SimVarValueType.Amps }],
    ['elec_bus_genalt_2_a', { name: 'ELECTRICAL GENALT BUS AMPS:2', type: SimVarValueType.Amps }],
    ['elec_bat_a_1', { name: 'ELECTRICAL BATTERY LOAD:1', type: SimVarValueType.Amps }],
    ['elec_bat_v_1', { name: 'ELECTRICAL BATTERY VOLTAGE:1', type: SimVarValueType.Volts }],
    ['elec_bat_a_2', { name: 'ELECTRICAL BATTERY LOAD:2', type: SimVarValueType.Amps }],
    ['elec_bat_v_2', { name: 'ELECTRICAL BATTERY VOLTAGE:2', type: SimVarValueType.Volts }]
]);

/**
 * Flight timer modes.
 */
var FlightTimerMode;
(function (FlightTimerMode) {
    FlightTimerMode[FlightTimerMode["CountingDown"] = 0] = "CountingDown";
    FlightTimerMode[FlightTimerMode["CountingUp"] = 1] = "CountingUp";
})(FlightTimerMode || (FlightTimerMode = {}));

/**
 * SBAS group names.
 */
var SBASGroupName;
(function (SBASGroupName) {
    /** Wide Area Augmentation System (USA). */
    SBASGroupName["WAAS"] = "WAAS";
    /** European Geostationary Navigation Overlay Service (EU). */
    SBASGroupName["EGNOS"] = "EGNOS";
    /** GPS Aided Geo Augmented Navigation System (India). */
    SBASGroupName["GAGAN"] = "GAGAN";
    /** Multi-functional Satellite Augmentation System (Japan). */
    SBASGroupName["MSAS"] = "MSAS";
})(SBASGroupName || (SBASGroupName = {}));
/**
 * Possible state on GPS satellites.
 */
var GPSSatelliteState;
(function (GPSSatelliteState) {
    /** There is no current valid state. */
    GPSSatelliteState["None"] = "None";
    /** The satellite is out of view and cannot be reached. */
    GPSSatelliteState["Unreachable"] = "Unreachable";
    /** The satellite has been found and data is being downloaded. */
    GPSSatelliteState["Acquired"] = "Acquired";
    /** The satellite is faulty. */
    GPSSatelliteState["Faulty"] = "Faulty";
    /** The satellite has been found, data is downloaded, but is not presently used in the GPS solution. */
    GPSSatelliteState["DataCollected"] = "DataCollected";
    /** The satellite is being active used in the GPS solution. */
    GPSSatelliteState["InUse"] = "InUse";
    /** The satellite is being active used in the GPS solution and SBAS differential corrections are being applied. */
    GPSSatelliteState["InUseDiffApplied"] = "InUseDiffApplied";
})(GPSSatelliteState || (GPSSatelliteState = {}));
/**
 * Possible {@link GPSSatComputer} states.
 */
var GPSSystemState;
(function (GPSSystemState) {
    /** The GPS receiver is trying to locate satellites. */
    GPSSystemState["Searching"] = "Searching";
    /** The GPS receiver has found satellites and is acquiring a solution. */
    GPSSystemState["Acquiring"] = "Acquiring";
    /** A 3D solution has been acquired. */
    GPSSystemState["SolutionAcquired"] = "SolutionAcquired";
    /** A 3D solution using differential computations has been acquired. */
    GPSSystemState["DiffSolutionAcquired"] = "DiffSolutionAcquired";
})(GPSSystemState || (GPSSystemState = {}));
/**
 * Possible SBAS connection states.
 */
var GPSSystemSBASState;
(function (GPSSystemSBASState) {
    /** SBAS is disabled. */
    GPSSystemSBASState["Disabled"] = "Disabled";
    /** SBAS is enabled but not receiving differential corrections. */
    GPSSystemSBASState["Inactive"] = "Inactive";
    /** SBAS is enabled and is receiving differential corrections. */
    GPSSystemSBASState["Active"] = "Active";
})(GPSSystemSBASState || (GPSSystemSBASState = {}));

/** Minimums Modes */
var MinimumsMode;
(function (MinimumsMode) {
    MinimumsMode[MinimumsMode["OFF"] = 0] = "OFF";
    MinimumsMode[MinimumsMode["BARO"] = 1] = "BARO";
    MinimumsMode[MinimumsMode["RA"] = 2] = "RA";
    MinimumsMode[MinimumsMode["TEMP_COMP_BARO"] = 3] = "TEMP_COMP_BARO";
})(MinimumsMode || (MinimumsMode = {}));
/** A publisher for minimums simvar events. */
class MinimumsSimVarPublisher extends SimVarPublisher {
    /**
     * @inheritdoc
     */
    constructor(bus) {
        super(MinimumsSimVarPublisher.simvars, bus);
    }
}
MinimumsSimVarPublisher.simvars = new Map([
    ['decision_height_feet', { name: 'DECISION HEIGHT', type: SimVarValueType.Feet }],
    ['decision_altitude_feet', { name: 'DECISION ALTITUDE MSL', type: SimVarValueType.Feet }],
    ['minimums_mode', { name: 'L:WT_MINIMUMS_MODE', type: SimVarValueType.Number }]
]);

/**
 * A publisher of NAV, COM, ADF radio and marker beacon tuning-related sim var events.
 */
class NavComSimVarPublisher extends SimVarPublisher {
    /**
     * Create a NavComSimVarPublisher
     * @param bus The EventBus to publish to
     * @param pacer An optional pacer to use to control the pace of publishing
     */
    constructor(bus, pacer = undefined) {
        super(NavComSimVarPublisher.simvars, bus, pacer);
    }
    /**
     * Creates an array of nav radio sim var event definitions for an indexed nav radio.
     * @param index The index of the nav radio.
     * @returns An array of nav radio sim var event definitions for the specified nav radio.
     */
    static createNavRadioDefinitions(index) {
        return [
            [`nav_active_frequency_${index}`, { name: `NAV ACTIVE FREQUENCY:${index}`, type: SimVarValueType.MHz }],
            [`nav_standby_frequency_${index}`, { name: `NAV STANDBY FREQUENCY:${index}`, type: SimVarValueType.MHz }],
            [`nav_signal_${index}`, { name: `NAV SIGNAL:${index}`, type: SimVarValueType.Number }],
            [`nav_sound_${index}`, { name: `NAV SOUND:${index}`, type: SimVarValueType.Bool }],
            [`nav_ident_${index}`, { name: `NAV IDENT:${index}`, type: SimVarValueType.String }],
            [`nav_volume_${index}`, { name: `NAV VOLUME:${index}`, type: SimVarValueType.Percent }],
        ];
    }
    /**
     * Creates an array of com radio sim var event definitions for an indexed com radio.
     * @param index The index of the com radio.
     * @returns An array of com radio sim var event definitions for the specified com radio.
     */
    static createComRadioDefinitions(index) {
        return [
            [`com_active_frequency_${index}`, { name: `COM ACTIVE FREQUENCY:${index}`, type: SimVarValueType.MHz }],
            [`com_standby_frequency_${index}`, { name: `COM STANDBY FREQUENCY:${index}`, type: SimVarValueType.MHz }],
            [`com_active_facility_name_${index}`, { name: `COM ACTIVE FREQ NAME:${index}`, type: SimVarValueType.String }],
            [`com_active_facility_type_${index}`, { name: `COM ACTIVE FREQ TYPE:${index}`, type: SimVarValueType.String }],
            [`com_active_facility_ident_${index}`, { name: `COM ACTIVE FREQ IDENT:${index}`, type: SimVarValueType.String }],
            // Note: 'COM RECEIVE' is whether the radio is receiving OR transmitting,
            // whereas 'COM RECEIVE EX1' is exclusively its receiving state.
            [`com_receive_${index}`, { name: `COM RECEIVE EX1:${index}`, type: SimVarValueType.Bool }],
            [`com_status_${index}`, { name: `COM STATUS:${index}`, type: SimVarValueType.Number }],
            [`com_transmit_${index}`, { name: `COM TRANSMIT:${index}`, type: SimVarValueType.Bool }],
            [`com_spacing_mode_${index}`, { name: `COM SPACING MODE:${index}`, type: SimVarValueType.Enum }],
            [`com_volume_${index}`, { name: `COM VOLUME:${index}`, type: SimVarValueType.Percent }],
        ];
    }
    /**
     * Creates an array of ADF radio sim var event definitions for an indexed ADF radio.
     * @param index The index of the ADF radio.
     * @returns An array of ADF radio sim var event definitions for the specified ADF radio.
     */
    static createAdfRadioDefinitions(index) {
        return [
            [`adf_active_frequency_${index}`, { name: `ADF ACTIVE FREQUENCY:${index}`, type: SimVarValueType.KHz }],
            [`adf_standby_frequency_${index}`, { name: `ADF STANDBY FREQUENCY:${index}`, type: SimVarValueType.KHz }],
            [`adf_sound_${index}`, { name: `ADF SOUND:${index}`, type: SimVarValueType.Bool }],
            [`adf_volume_${index}`, { name: `ADF VOLUME:${index}`, type: SimVarValueType.Percent }],
            [`adf_ident_${index}`, { name: `ADF IDENT:${index}`, type: SimVarValueType.String }],
            [`adf_signal_${index}`, { name: `ADF SIGNAL:${index}`, type: SimVarValueType.Number }],
        ];
    }
}
NavComSimVarPublisher.simvars = new Map([
    ...NavComSimVarPublisher.createNavRadioDefinitions(1),
    ...NavComSimVarPublisher.createNavRadioDefinitions(2),
    ...NavComSimVarPublisher.createNavRadioDefinitions(3),
    ...NavComSimVarPublisher.createNavRadioDefinitions(4),
    ...NavComSimVarPublisher.createComRadioDefinitions(1),
    ...NavComSimVarPublisher.createComRadioDefinitions(2),
    ...NavComSimVarPublisher.createComRadioDefinitions(3),
    ...NavComSimVarPublisher.createAdfRadioDefinitions(1),
    ...NavComSimVarPublisher.createAdfRadioDefinitions(2),
    ['marker_beacon_hisense_on', { name: 'MARKER BEACON SENSITIVITY HIGH', type: SimVarValueType.Bool }],
    ['marker_beacon_sound', { name: 'MARKER SOUND', type: SimVarValueType.Bool }]
]);

/**
 * A publisher for pitot tube information.
 */
class PitotPublisher extends SimVarPublisher {
    /**
     * Creates an instance of an PitotPublisher.
     * @param bus The event bus to use with this instance.
     * @param pitotCount The number of pitot tubes to support.
     * @param pacer An optional pacer to use to control the rate of publishing.
     */
    constructor(bus, pitotCount, pacer) {
        const indexedSimVars = [
            ['pitot_heat_switch_on', { name: 'PITOT HEAT SWITCH', type: SimVarValueType.Bool }]
        ];
        const simvars = new Map(PitotPublisher.nonIndexedSimVars);
        // add pitot-indexed simvars
        for (const [topic, simvar] of indexedSimVars) {
            for (let i = 1; i <= pitotCount; i++) {
                simvars.set(`${topic}_${i}`, {
                    name: `${simvar.name}:${i}`,
                    type: simvar.type,
                    map: simvar.map
                });
            }
        }
        super(simvars, bus, pacer);
    }
}
PitotPublisher.nonIndexedSimVars = [
    ['pitot_heat_on', { name: 'PITOT HEAT', type: SimVarValueType.Bool }],
    ['pitot_icing_pct', { name: 'PITOT ICE PCT', type: SimVarValueType.Percent }]
];

/**
 * A publisher for Pressurization information.
 */
class PressurizationPublisher extends SimVarPublisher {
    /**
     * Create an PressurizationPublisher
     * @param bus The EventBus to publish to
     * @param pacer An optional pacer to use to control the rate of publishing
     */
    constructor(bus, pacer = undefined) {
        super(PressurizationPublisher.simvars, bus, pacer);
    }
    /**
     * Updates the ADC publisher.
     */
    onUpdate() {
        super.onUpdate();
    }
}
PressurizationPublisher.simvars = new Map([
    ['cabin_altitude', { name: 'PRESSURIZATION CABIN ALTITUDE', type: SimVarValueType.Feet }],
    ['cabin_altitude_rate', { name: 'PRESSURIZATION CABIN ALTITUDE RATE', type: SimVarValueType.FPM }],
    ['pressure_diff', { name: 'PRESSURIZATION PRESSURE DIFFERENTIAL', type: SimVarValueType.PSI }]
]);

/**
 * A simple timer for handling debounce.
 */
class DebounceTimer {
    constructor() {
        this.timer = null;
    }
    /**
     * Checks whether an action is pending on this timer.
     * @returns Whether an action is pending on this timer.
     */
    isPending() {
        return this.timer !== null;
    }
    /**
     * Schedules an action. Waits for a specified amount of time, and executes the action only if no other action is
     * scheduled on this timer during the delay.
     * @param action The action to schedule.
     * @param delay The debounce delay, in milliseconds.
     */
    schedule(action, delay) {
        this.clear();
        this.timer = setTimeout(() => {
            this.timer = null;
            action();
        }, delay);
    }
    /**
     * Clears this timer of any pending actions. Actions that are cleared will not be executed.
     */
    clear() {
        if (this.timer === null) {
            return;
        }
        clearTimeout(this.timer);
        this.timer = null;
    }
}

/** Transponder modes. */
var XPDRMode;
(function (XPDRMode) {
    XPDRMode[XPDRMode["OFF"] = 0] = "OFF";
    XPDRMode[XPDRMode["STBY"] = 1] = "STBY";
    XPDRMode[XPDRMode["TEST"] = 2] = "TEST";
    XPDRMode[XPDRMode["ON"] = 3] = "ON";
    XPDRMode[XPDRMode["ALT"] = 4] = "ALT";
    XPDRMode[XPDRMode["GROUND"] = 5] = "GROUND";
})(XPDRMode || (XPDRMode = {}));
new GeoPoint(0, 0);

/**
 * A controler for automated backlighting levels based upon the angle of the sun in the sky.
 */
class BacklightLevelController {
    /**
     * Creates an automatic backlight controller.
     * @param bus The event bus.
     * @param paused Whether the controller should be initially paused. Defaults to `false`.
     * @param minIntensity The maximum intensity commanded by the controller. Defaults to 0.
     * @param maxIntensity The minimum intensity commanded by the controller. Defaults to 1.
     */
    constructor(bus, paused = false, minIntensity = BacklightLevelController.DEFAULT_MIN_INTENSITY, maxIntensity = BacklightLevelController.DEFAULT_MAX_INTENSITY) {
        this.simTime = ConsumerSubject.create(null, 0);
        this.ppos = new Float64Array(3);
        this.needRecalcAuto = true;
        this.lastSimTime = 0;
        this.paused = false;
        this._intensity = Subject.create(0);
        this.intensity = this._intensity;
        this._autoMinIntensity = minIntensity;
        this._autoMaxIntensity = maxIntensity;
        this._autoIntensityRange = this.autoMaxIntensity - this.autoMinIntensity;
        this.needRecalcAuto = true;
        const sub = bus.getSubscriber();
        this.simTime.setConsumer(sub.on('simTime'));
        this.pposSub = sub.on('gps-position').atFrequency(BacklightLevelController.AUTO_UPDATE_REALTIME_FREQ).handle(this.onPPosChanged.bind(this));
        this.updateSub = sub.on('realTime').atFrequency(BacklightLevelController.AUTO_UPDATE_REALTIME_FREQ).handle(this.onUpdate.bind(this));
        this.setPaused(paused);
    }
    /**
     * Get the max auto intensity value
     * @returns The maximum intensity applied by the auto backlight.
     */
    get autoMaxIntensity() {
        return this._autoMaxIntensity;
    }
    /**
     * Set the max auto intensity value.
     * @param max_intensity The maximum intensity applied by auto backlight.
     */
    set autoMaxIntensity(max_intensity) {
        this._autoMaxIntensity = max_intensity;
        this._autoIntensityRange = this._autoMaxIntensity - this._autoMinIntensity;
        this.needRecalcAuto = true;
    }
    /**
     * Get the min auto intensity value
     * @returns THe minimum intensity applied by the auto backlight.
     */
    get autoMinIntensity() {
        return this._autoMinIntensity;
    }
    /**
     * Set the min auto intensity value.
     * @param min_intensity The minimum intensity applied by the auto backlight.
     */
    set autoMinIntensity(min_intensity) {
        this._autoMinIntensity = min_intensity;
        this._autoIntensityRange = this._autoMinIntensity - min_intensity;
        this.needRecalcAuto = true;
    }
    /**
     * Pause or unpause real-time processing.
     * @param paused Whether to pause or not.
     */
    setPaused(paused) {
        if (paused !== this.paused) {
            this.paused = paused;
            if (paused) {
                this.updateSub.pause();
                this.pposSub.pause();
                this.simTime.pause();
                this.needRecalcAuto = false;
            }
            else {
                this.needRecalcAuto = true;
                this.simTime.resume();
                this.pposSub.resume(true);
                this.updateSub.resume(true);
            }
        }
    }
    /**
     * A callback which is called when the user's location changes.
     * @param ppos The new plane position.
     */
    onPPosChanged(ppos) {
        const pposVec = GeoPoint.sphericalToCartesian(ppos.lat, ppos.long, BacklightLevelController.tempVec3);
        if (Vec3Math.dot(pposVec, this.ppos) >= 1 - 1e-4) { // ~600 m
            return;
        }
        Vec3Math.copy(pposVec, this.ppos);
        this.needRecalcAuto = true;
    }
    /**
     * Updates this controller's commanded backlight intensity if necessary.
     */
    onUpdate() {
        const simTime = this.simTime.get();
        this.needRecalcAuto || (this.needRecalcAuto = Math.abs(simTime - this.lastSimTime) >= BacklightLevelController.AUTO_UPDATE_SIMTIME_THRESHOLD);
        if (this.needRecalcAuto) {
            this.needRecalcAuto = false;
            this.updateAutoBacklightIntensity(simTime);
        }
    }
    /**
     * Updates this controller's commanded backlight intensity according to the auto setting algorithm.
     * @param simTime The current sim time.
     */
    updateAutoBacklightIntensity(simTime) {
        this.lastSimTime = simTime;
        const subSolarPoint = BacklightLevelController.calculateSubSolarPoint(simTime, BacklightLevelController.tempVec3);
        const sinSolarAngle = Vec3Math.dot(this.ppos, subSolarPoint);
        const sinSolarAngleClamped = Utils.Clamp(sinSolarAngle, BacklightLevelController.AUTO_MIN_SOLAR_ANGLE_SIN, BacklightLevelController.AUTO_MAX_SOLAR_ANGLE_SIN);
        const intensityFrac = (sinSolarAngleClamped - BacklightLevelController.AUTO_MIN_SOLAR_ANGLE_SIN) / BacklightLevelController.AUTO_SOLAR_ANGLE_RANGE_SIN;
        this._intensity.set(this._autoMinIntensity + intensityFrac * this._autoIntensityRange);
    }
    /**
     * Calculates the subsolar point (the point on Earth's surface directly below the Sun, where solar zenith angle = 0)
     * given a specific time.
     * @param time A UNIX timestamp in milliseconds.
     * @param out A Float64Array object to which to write the result.
     * @returns The subsolar point at the specified time.
     */
    static calculateSubSolarPoint(time, out) {
        // Source: Zhang, T et al. https://doi.org/10.1016/j.renene.2021.03.047
        const PI2 = 2 * Math.PI;
        const days = (time - BacklightLevelController.EPOCH) / BacklightLevelController.DAY;
        const daysFrac = days - Math.floor(days);
        const L = (4.895055 + 0.01720279 * days);
        const g = (6.240041 + 0.01720197 * days);
        const lambda = L + 0.033423 * Math.sin(g) + 0.000349 * Math.sin(2 * g);
        const epsilon = 0.40910518 - 6.98e-9 * days;
        const rAscension = Math.atan2(Math.cos(epsilon) * Math.sin(lambda), Math.cos(lambda));
        const declination = Math.asin(Math.sin(epsilon) * Math.sin(lambda));
        // equation of time in days.
        const E = (((L - rAscension) % PI2 + 3 * Math.PI) % PI2 - Math.PI) * 0.159155;
        const lat = declination * Avionics.Utils.RAD2DEG;
        const lon = -15 * (daysFrac - 0.5 + E) * 24;
        return GeoPoint.sphericalToCartesian(lat, lon, out);
    }
}
BacklightLevelController.AUTO_MAX_SOLAR_ANGLE = 3; // The solar altitude angle at which auto backlight reaches maximum intensity.
BacklightLevelController.AUTO_MIN_SOLAR_ANGLE = -8; // The solar altitude angle at which auto backlight reaches minimum intensity.
BacklightLevelController.AUTO_MAX_SOLAR_ANGLE_SIN = Math.sin(BacklightLevelController.AUTO_MAX_SOLAR_ANGLE * Avionics.Utils.DEG2RAD);
BacklightLevelController.AUTO_MIN_SOLAR_ANGLE_SIN = Math.sin(BacklightLevelController.AUTO_MIN_SOLAR_ANGLE * Avionics.Utils.DEG2RAD);
BacklightLevelController.AUTO_SOLAR_ANGLE_RANGE_SIN = BacklightLevelController.AUTO_MAX_SOLAR_ANGLE_SIN - BacklightLevelController.AUTO_MIN_SOLAR_ANGLE_SIN;
BacklightLevelController.AUTO_UPDATE_REALTIME_FREQ = 10; // max frequency (Hz) of auto backlight level updates in real time
BacklightLevelController.AUTO_UPDATE_SIMTIME_THRESHOLD = 60000; // minimum interval (ms) between auto backlight level updates in sim time
BacklightLevelController.EPOCH = 946684800000; // Jan 1, 2000 00:00:00 UTC
BacklightLevelController.DAY = 86400000; // milliseconds in one day
BacklightLevelController.DEFAULT_MIN_INTENSITY = 0;
BacklightLevelController.DEFAULT_MAX_INTENSITY = 1;
BacklightLevelController.tempVec3 = new Float64Array(3);

/// <reference types="@microsoft/msfs-types/pages/vcockpit/instruments/shared/utils/xmllogic" />
/** The acceptable priority types for a given annunciation. */
var AnnunciationType;
(function (AnnunciationType) {
    AnnunciationType[AnnunciationType["Warning"] = 0] = "Warning";
    AnnunciationType[AnnunciationType["Caution"] = 1] = "Caution";
    AnnunciationType[AnnunciationType["Advisory"] = 2] = "Advisory";
    AnnunciationType[AnnunciationType["SafeOp"] = 3] = "SafeOp";
})(AnnunciationType || (AnnunciationType = {}));

/* eslint-disable no-inner-declarations */
/** A releative render position. */
var RenderPosition;
(function (RenderPosition) {
    RenderPosition[RenderPosition["Before"] = 0] = "Before";
    RenderPosition[RenderPosition["After"] = 1] = "After";
    RenderPosition[RenderPosition["In"] = 2] = "In";
})(RenderPosition || (RenderPosition = {}));
/**
 * A display component in the component framework.
 * @typedef P The type of properties for this component.
 * @typedef C The type of context that this component might have.
 */
class DisplayComponent {
    /**
     * Creates an instance of a DisplayComponent.
     * @param props The propertis of the component.
     */
    constructor(props) {
        /** The context on this component, if any. */
        this.context = undefined;
        /** The type of context for this component, if any. */
        this.contextType = undefined;
        this.props = props;
    }
    /**
     * A callback that is called before the component is rendered.
     */
    onBeforeRender() { return; }
    /**
     * A callback that is called after the component is rendered.
     * @param node The component's VNode.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onAfterRender(node) { return; }
    /**
     * Destroys this component.
     */
    destroy() { return; }
    /**
     * Gets a context data subscription from the context collection.
     * @param context The context to get the subscription for.
     * @returns The requested context.
     * @throws An error if no data for the specified context type could be found.
     */
    getContext(context) {
        if (this.context !== undefined && this.contextType !== undefined) {
            const index = this.contextType.indexOf(context);
            return this.context[index];
        }
        throw new Error('Could not find the provided context type.');
    }
}
/**
 * A reference to a component or element node.
 */
class NodeReference {
    constructor() {
        /** The internal reference instance. */
        this._instance = null;
    }
    /**
     * The instance of the element or component.
     * @returns The instance of the element or component.
     */
    get instance() {
        if (this._instance !== null) {
            return this._instance;
        }
        throw new Error('Instance was null.');
    }
    /**
     * Sets the value of the instance.
     */
    set instance(val) {
        this._instance = val;
    }
    /**
     * Gets the instance, or null if the instance is not populated.
     * @returns The component or element instance.
     */
    getOrDefault() {
        return this._instance;
    }
}
/**
 * Provides a context of data that can be passed down to child components via a provider.
 */
class Context {
    /**
     * Creates an instance of a Context.
     * @param defaultValue The default value of this context.
     */
    constructor(defaultValue) {
        this.defaultValue = defaultValue;
        /**
         * The provider component that can be set to a specific context value.
         * @param props The props of the provider component.
         * @returns A new context provider.
         */
        this.Provider = (props) => new ContextProvider(props, this);
    }
}
/**
 * A provider component that can be set to a specific context value.
 */
class ContextProvider extends DisplayComponent {
    /**
     * Creates an instance of a ContextProvider.
     * @param props The props on the component.
     * @param parent The parent context instance for this provider.
     */
    constructor(props, parent) {
        super(props);
        this.parent = parent;
    }
    /** @inheritdoc */
    render() {
        var _a;
        const children = (_a = this.props.children) !== null && _a !== void 0 ? _a : [];
        return FSComponent.buildComponent(FSComponent.Fragment, this.props, ...children);
    }
}
/**
 * The FS component namespace.
 */
// eslint-disable-next-line @typescript-eslint/no-namespace
var FSComponent;
(function (FSComponent) {
    /**
     * Valid SVG element tags.
     */
    const svgTags = {
        'circle': true,
        'clipPath': true,
        'color-profile': true,
        'cursor': true,
        'defs': true,
        'desc': true,
        'ellipse': true,
        'g': true,
        'image': true,
        'line': true,
        'linearGradient': true,
        'marker': true,
        'mask': true,
        'path': true,
        'pattern': true,
        'polygon': true,
        'polyline': true,
        'radialGradient': true,
        'rect': true,
        'stop': true,
        'svg': true,
        'text': true
    };
    /**
     * A fragment of existing elements with no specific root.
     * @param props The fragment properties.
     * @returns The fragment children.
     */
    function Fragment(props) {
        return props.children;
    }
    FSComponent.Fragment = Fragment;
    /**
     * Builds a JSX based FSComponent.
     * @param type The DOM element tag that will be built.
     * @param props The properties to apply to the DOM element.
     * @param children Any children of this DOM element.
     * @returns The JSX VNode for the component or element.
     */
    // eslint-disable-next-line no-inner-declarations
    function buildComponent(type, props, ...children) {
        let vnode = null;
        if (typeof type === 'string') {
            let element;
            if (svgTags[type] !== undefined) {
                element = document.createElementNS('http://www.w3.org/2000/svg', type);
            }
            else {
                element = document.createElement(type);
            }
            if (props !== null) {
                for (const key in props) {
                    if (key === 'ref' && props.ref !== undefined) {
                        props.ref.instance = element;
                    }
                    else {
                        const prop = props[key];
                        if (key === 'class' && typeof prop === 'object' && 'isSubscribableSet' in prop) {
                            // Bind CSS classes to a subscribable set
                            prop.sub((set, eventType, modifiedKey) => {
                                if (eventType === SubscribableSetEventType.Added) {
                                    element.classList.add(modifiedKey);
                                }
                                else {
                                    element.classList.remove(modifiedKey);
                                }
                            }, true);
                        }
                        else if (typeof prop === 'object' && 'isSubscribable' in prop) {
                            if (key === 'style' && prop instanceof ObjectSubject) {
                                // Bind CSS styles to an object subject.
                                prop.sub((v, style, newValue) => {
                                    element.style.setProperty(style.toString(), newValue);
                                }, true);
                            }
                            else {
                                // Bind an attribute to a subscribable.
                                prop.sub((v) => {
                                    element.setAttribute(key, v);
                                }, true);
                            }
                        }
                        else {
                            element.setAttribute(key, prop);
                        }
                    }
                }
            }
            vnode = {
                instance: element,
                props: props,
                children: null
            };
            vnode.children = createChildNodes(vnode, children);
        }
        else if (typeof type === 'function') {
            if (children !== null && props === null) {
                props = {
                    children: children
                };
            }
            else if (props !== null) {
                props.children = children;
            }
            if (typeof type === 'function' && type.name === Fragment.name) {
                let childNodes = type(props);
                //Handle the case where the single fragment children is an array of nodes passsed down from above
                while (childNodes !== null && childNodes.length === 1 && Array.isArray(childNodes[0])) {
                    childNodes = childNodes[0];
                }
                vnode = {
                    instance: null,
                    props,
                    children: childNodes
                };
            }
            else {
                let instance;
                const pluginSystem = (window._pluginSystem);
                try {
                    instance = type(props);
                }
                catch (_a) {
                    let pluginInstance = undefined;
                    if (pluginSystem !== undefined) {
                        pluginInstance = pluginSystem.onComponentCreating(type, props);
                    }
                    if (pluginInstance !== undefined) {
                        instance = pluginInstance;
                    }
                    else {
                        instance = new type(props);
                    }
                }
                if (props !== null && props.ref !== null && props.ref !== undefined) {
                    props.ref.instance = instance;
                }
                if (instance.contextType !== undefined) {
                    instance.context = instance.contextType.map(c => Subject.create(c.defaultValue));
                }
                if (pluginSystem !== undefined) {
                    pluginSystem.onComponentCreated(instance);
                }
                vnode = {
                    instance,
                    props,
                    children: [instance.render()]
                };
            }
        }
        return vnode;
    }
    FSComponent.buildComponent = buildComponent;
    /**
     * Creates the collection of child VNodes.
     * @param parent The parent VNode.
     * @param children The JSX children to convert to nodes.
     * @returns A collection of child VNodes.
     */
    function createChildNodes(parent, children) {
        let vnodes = null;
        if (children !== null && children !== undefined && children.length > 0) {
            vnodes = [];
            for (const child of children) {
                if (child !== null) {
                    if (child instanceof Array) {
                        const arrayNodes = createChildNodes(parent, child);
                        if (arrayNodes !== null) {
                            vnodes.push(...arrayNodes);
                        }
                    }
                    else if (typeof child === 'object') {
                        if ('isSubscribable' in child) {
                            const node = {
                                instance: child,
                                children: null,
                                props: null,
                                root: undefined,
                            };
                            child.sub((v) => {
                                if (node.root !== undefined) {
                                    // TODO workaround. gotta find a solution for the text node vanishing when text is empty
                                    node.root.nodeValue = (v === '' || v === null || v === undefined)
                                        ? ' '
                                        : v.toString();
                                }
                            });
                            vnodes.push(node);
                        }
                        else {
                            vnodes.push(child);
                        }
                    }
                    else if (typeof child === 'string' || typeof child === 'number') {
                        vnodes.push(createStaticContentNode(child));
                    }
                }
            }
        }
        return vnodes;
    }
    FSComponent.createChildNodes = createChildNodes;
    /**
     * Creates a static content VNode.
     * @param content The content to create a node for.
     * @returns A static content VNode.
     */
    function createStaticContentNode(content) {
        return {
            instance: content,
            children: null,
            props: null
        };
    }
    FSComponent.createStaticContentNode = createStaticContentNode;
    /**
     * Renders a VNode to a DOM element.
     * @param node The node to render.
     * @param element The DOM element to render to.
     * @param position The RenderPosition to put the item in.
     */
    function render(node, element, position = RenderPosition.In) {
        if (node.children && node.children.length > 0 && element !== null) {
            const componentInstance = node.instance;
            if (componentInstance !== null && componentInstance.onBeforeRender !== undefined) {
                componentInstance.onBeforeRender();
            }
            if (node.instance instanceof HTMLElement || node.instance instanceof SVGElement) {
                insertNode(node, position, element);
            }
            else {
                if (position === RenderPosition.After) {
                    for (let i = node.children.length - 1; i >= 0; i--) {
                        if (node.children[i] === undefined || node.children[i] === null) {
                            continue;
                        }
                        insertNode(node.children[i], position, element);
                    }
                }
                else {
                    for (let i = 0; i < node.children.length; i++) {
                        if (node.children[i] === undefined || node.children[i] === null) {
                            continue;
                        }
                        insertNode(node.children[i], position, element);
                    }
                }
            }
            const instance = node.instance;
            if (instance instanceof ContextProvider) {
                visitNodes(node, (n) => {
                    if (n === undefined || n === null) {
                        return false;
                    }
                    const nodeInstance = n.instance;
                    if (nodeInstance !== null && nodeInstance.contextType !== undefined) {
                        const contextSlot = nodeInstance.contextType.indexOf(instance.parent);
                        if (contextSlot >= 0) {
                            if (nodeInstance.context === undefined) {
                                nodeInstance.context = [];
                            }
                            nodeInstance.context[contextSlot].set(instance.props.value);
                        }
                        if (nodeInstance instanceof ContextProvider && nodeInstance !== instance && nodeInstance.parent === instance.parent) {
                            return true;
                        }
                    }
                    return false;
                });
            }
            if (componentInstance !== null && componentInstance.onAfterRender !== undefined) {
                const pluginSystem = (window._pluginSystem);
                componentInstance.onAfterRender(node);
                if (pluginSystem !== undefined) {
                    pluginSystem.onComponentRendered(node);
                }
            }
        }
    }
    FSComponent.render = render;
    /**
     * Inserts a node into the DOM.
     * @param node The node to insert.
     * @param position The position to insert the node in.
     * @param element The element to insert relative to.
     */
    function insertNode(node, position, element) {
        var _a, _b, _c, _d, _e, _f;
        if (node.instance instanceof HTMLElement || node.instance instanceof SVGElement) {
            switch (position) {
                case RenderPosition.In:
                    element.appendChild(node.instance);
                    node.root = (_a = element.lastChild) !== null && _a !== void 0 ? _a : undefined;
                    break;
                case RenderPosition.Before:
                    element.insertAdjacentElement('beforebegin', node.instance);
                    node.root = (_b = element.previousSibling) !== null && _b !== void 0 ? _b : undefined;
                    break;
                case RenderPosition.After:
                    element.insertAdjacentElement('afterend', node.instance);
                    node.root = (_c = element.nextSibling) !== null && _c !== void 0 ? _c : undefined;
                    break;
            }
            if (node.children !== null) {
                for (const child of node.children) {
                    insertNode(child, RenderPosition.In, node.instance);
                }
            }
        }
        else if (typeof node.instance === 'string'
            || (typeof node.instance === 'object'
                && node.instance !== null &&
                'isSubscribable' in node.instance)) {
            let toRender;
            if (typeof node.instance === 'string') {
                toRender = node.instance;
            }
            else {
                toRender = node.instance.get();
                if (toRender === '') {
                    toRender = ' '; // prevent disappearing text node
                }
            }
            switch (position) {
                case RenderPosition.In:
                    element.insertAdjacentHTML('beforeend', toRender);
                    node.root = (_d = element.lastChild) !== null && _d !== void 0 ? _d : undefined;
                    break;
                case RenderPosition.Before:
                    element.insertAdjacentHTML('beforebegin', toRender);
                    node.root = (_e = element.previousSibling) !== null && _e !== void 0 ? _e : undefined;
                    break;
                case RenderPosition.After:
                    element.insertAdjacentHTML('afterend', toRender);
                    node.root = (_f = element.nextSibling) !== null && _f !== void 0 ? _f : undefined;
                    break;
            }
        }
        else if (Array.isArray(node)) {
            if (position === RenderPosition.After) {
                for (let i = node.length - 1; i >= 0; i--) {
                    render(node[i], element, position);
                }
            }
            else {
                for (let i = 0; i < node.length; i++) {
                    render(node[i], element, position);
                }
            }
        }
        else {
            render(node, element, position);
        }
    }
    /**
     * Render a node before a DOM element.
     * @param node The node to render.
     * @param element The element to render boeore.
     */
    function renderBefore(node, element) {
        render(node, element, RenderPosition.Before);
    }
    FSComponent.renderBefore = renderBefore;
    /**
     * Render a node after a DOM element.
     * @param node The node to render.
     * @param element The element to render after.
     */
    function renderAfter(node, element) {
        render(node, element, RenderPosition.After);
    }
    FSComponent.renderAfter = renderAfter;
    /**
     * Remove a previously rendered element.  Currently, this is just a simple
     * wrapper so that all of our high-level "component maniuplation" state is kept
     * in the FSComponent API, but it's not doing anything other than a simple
     * remove() on the element.   This can probably be enhanced.
     * @param element The element to remove.
     */
    function remove(element) {
        if (element !== null) {
            element.remove();
        }
    }
    FSComponent.remove = remove;
    /**
     * Creates a component or element node reference.
     * @returns A new component or element node reference.
     */
    function createRef() {
        return new NodeReference();
    }
    FSComponent.createRef = createRef;
    /**
     * Creates a new context to hold data for passing to child components.
     * @param defaultValue The default value of this context.
     * @returns A new context.
     */
    function createContext(defaultValue) {
        return new Context(defaultValue);
    }
    FSComponent.createContext = createContext;
    /**
     * Visits VNodes with a supplied visitor function within the given children tree.
     * @param node The node to visit.
     * @param visitor The visitor function to inspect VNodes with. Return true if the search should stop at the visited
     * node and not proceed any further down the node's children.
     */
    function visitNodes(node, visitor) {
        if (node === undefined || node === null) {
            return;
        }
        const stopVisitation = visitor(node);
        if (!stopVisitation && node.children !== undefined && node.children !== null) {
            for (let i = 0; i < node.children.length; i++) {
                const child = node.children[i];
                if (Array.isArray(child)) {
                    for (let childIndex = 0; childIndex < child.length; childIndex++) {
                        visitNodes(child[childIndex], visitor);
                    }
                }
                else {
                    visitNodes(child, visitor);
                }
            }
        }
        return;
    }
    FSComponent.visitNodes = visitNodes;
    /**
     * Parses a space-delimited CSS class string into an array of CSS classes.
     * @param classString A space-delimited CSS class string.
     * @param filter A function which filters parsed classes. For each class, the function should return `true` if the
     * class should be included in the output array and `false` otherwise.
     * @returns An array of CSS classes derived from the specified CSS class string.
     */
    function parseCssClassesFromString(classString, filter) {
        return classString.split(' ').filter(str => str !== '' && (filter === undefined || filter(str)));
    }
    FSComponent.parseCssClassesFromString = parseCssClassesFromString;
    /**
     * Binds a {@link MutableSubscribableSet} to a subscribable set of CSS classes. CSS classes added to and removed from
     * the subscribed set will also be added to and removed from the bound set, with the exception of a set of reserved
     * classes. The presence or absence of any of the reserved classes in the bound set is not affected by the subscribed
     * set; these reserved classes may be freely added to and removed from the bound set.
     * @param setToBind The set to bind.
     * @param classesToSubscribe A set of CSS classes to which to subscribe.
     * @param reservedClasses An iterable of reserved classes.
     * @returns The newly created subscription to the subscribed CSS class set.
     */
    function bindCssClassSet(setToBind, classesToSubscribe, reservedClasses) {
        const reservedClassSet = new Set(reservedClasses);
        if (reservedClassSet.size === 0) {
            return classesToSubscribe.sub((set, type, key) => {
                if (type === SubscribableSetEventType.Added) {
                    setToBind.add(key);
                }
                else {
                    setToBind.delete(key);
                }
            }, true);
        }
        else {
            return classesToSubscribe.sub((set, type, key) => {
                if (reservedClassSet.has(key)) {
                    return;
                }
                if (type === SubscribableSetEventType.Added) {
                    setToBind.add(key);
                }
                else {
                    setToBind.delete(key);
                }
            }, true);
        }
    }
    FSComponent.bindCssClassSet = bindCssClassSet;
    /**
     * Traverses a VNode tree in depth-first order and destroys the first {@link DisplayComponent} encountered in each
     * branch of the tree.
     * @param root The root of the tree to traverse.
     */
    function shallowDestroy(root) {
        FSComponent.visitNodes(root, node => {
            if (node !== root && node.instance instanceof DisplayComponent) {
                node.instance.destroy();
                return true;
            }
            return false;
        });
    }
    FSComponent.shallowDestroy = shallowDestroy;
    /**
     * An empty callback handler.
     */
    FSComponent.EmptyHandler = () => { return; };
})(FSComponent || (FSComponent = {}));
FSComponent.Fragment;

/// <reference types="@microsoft/msfs-types/js/common" />
/**
 * A FSComponent that displays the MSFS Bing Map, weather radar, and 3D terrain.
 */
class BingComponent extends DisplayComponent {
    constructor() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        super(...arguments);
        this.modeFlags = this.props.mode === EBingMode.HORIZON ? 4 : 0;
        this.isListenerRegistered = false;
        this.imgRef = FSComponent.createRef();
        this.uid = 0;
        this._isBound = false;
        this._isAwake = true;
        this.isDestroyed = false;
        this.pos = new LatLong(0, 0);
        this.radius = 10;
        this.resolution = (_a = this.props.resolution) !== null && _a !== void 0 ? _a : Vec2Subject.create(Vec2Math.create(BingComponent.DEFAULT_RESOLUTION, BingComponent.DEFAULT_RESOLUTION));
        this.earthColors = (_b = this.props.earthColors) !== null && _b !== void 0 ? _b : ArraySubject.create(ArrayUtils.create(2, () => BingComponent.hexaToRGBColor('#000000')));
        this.earthColorsElevationRange = (_c = this.props.earthColorsElevationRange) !== null && _c !== void 0 ? _c : Vec2Subject.create(Vec2Math.create(0, 30000));
        this.skyColor = (_d = this.props.skyColor) !== null && _d !== void 0 ? _d : Subject.create(BingComponent.hexaToRGBColor('#000000'));
        this.reference = (_e = this.props.reference) !== null && _e !== void 0 ? _e : Subject.create(EBingReference.SEA);
        this.wxrMode = (_f = this.props.wxrMode) !== null && _f !== void 0 ? _f : Subject.create({ mode: EWeatherRadar.OFF, arcRadians: 0.5 });
        this.wxrColors = (_g = this.props.wxrColors) !== null && _g !== void 0 ? _g : ArraySubject.create(Array.from(BingComponent.DEFAULT_WEATHER_COLORS));
        this.isoLines = (_h = this.props.isoLines) !== null && _h !== void 0 ? _h : Subject.create(false);
        this.wxrColorsArray = [];
        this.wxrRateArray = [];
        this.resolutionHandler = (resolution) => {
            Coherent.call('SET_MAP_RESOLUTION', this.uid, resolution[0], resolution[1]);
            // The sim ignores position/radius updates within a certain number of frames of sending a resolution change, so we
            // will keep trying to send pending updates for a few frames after any resolution change.
            this.positionRadiusInhibitFramesRemaining = BingComponent.POSITION_RADIUS_INHIBIT_FRAMES;
            if (!this.positionRadiusInhibitTimer.isPending()) {
                this.positionRadiusInhibitTimer.schedule(this.processPendingPositionRadius, 0);
            }
        };
        this.earthColorsHandler = () => {
            const colors = this.earthColors.getArray();
            if (colors.length < 2) {
                return;
            }
            Coherent.call('SET_MAP_HEIGHT_COLORS', this.uid, colors);
        };
        this.earthColorsElevationRangeHandler = () => {
            const colors = this.earthColors.getArray();
            if (colors.length < 2) {
                return;
            }
            // The way the map assigns colors to elevations is as follows:
            // ----------------------------------------------------------------------------------
            // - altitude range = MIN to MAX
            // - colors = array of length N >= 2 (colors[0] is the water color)
            // - STEP = (MAX - MIN) / N
            // - colors[i] is assigned to elevations from MIN + STEP * i to MIN + STEP * (i + 1)
            // - colors[1] is also assigned to all elevations < MIN + STEP
            // - colors[N - 1] is also assigned to all elevations > MIN + STEP * N
            // ----------------------------------------------------------------------------------
            const range = this.earthColorsElevationRange.get();
            const terrainColorCount = colors.length - 1;
            const desiredElevationStep = (range[1] - range[0]) / Math.max(terrainColorCount - 1, 1);
            const requiredMin = range[0] - desiredElevationStep;
            const requiredMax = range[1] + desiredElevationStep;
            Coherent.call('SET_MAP_ALTITUDE_RANGE', this.uid, requiredMin, requiredMax);
        };
        this.skyColorHandler = (color) => {
            Coherent.call('SET_MAP_CLEAR_COLOR', this.uid, color);
        };
        this.referenceHandler = (reference) => {
            const flags = this.modeFlags | (reference === EBingReference.PLANE ? 1 : 0);
            this.mapListener.trigger('JS_BIND_BINGMAP', this.props.id, flags);
        };
        this.wxrModeHandler = (wxrMode) => {
            Coherent.call('SHOW_MAP_WEATHER', this.uid, wxrMode.mode, wxrMode.arcRadians);
        };
        this.wxrColorsHandler = () => {
            const array = this.wxrColors.getArray();
            if (array.length === 0) {
                return;
            }
            this.wxrColorsArray.length = array.length;
            this.wxrRateArray.length = array.length;
            for (let i = 0; i < array.length; i++) {
                this.wxrColorsArray[i] = array[i][0];
                this.wxrRateArray[i] = array[i][1];
            }
            Coherent.call('SET_MAP_WEATHER_RADAR_COLORS', this.uid, this.wxrColorsArray, this.wxrRateArray);
        };
        this.isoLinesHandler = (showIsolines) => {
            Coherent.call('SHOW_MAP_ISOLINES', this.uid, showIsolines);
        };
        this.setCurrentMapParamsTimer = null;
        this.positionRadiusInhibitFramesRemaining = 0;
        this.isPositionRadiusPending = false;
        this.positionRadiusInhibitTimer = new DebounceTimer();
        this.processPendingPositionRadius = () => {
            if (this.isPositionRadiusPending) {
                Coherent.call('SET_MAP_PARAMS', this.uid, this.pos, this.radius, 1);
            }
            if (--this.positionRadiusInhibitFramesRemaining > 0) {
                this.positionRadiusInhibitTimer.schedule(this.processPendingPositionRadius, 0);
            }
            else {
                this.isPositionRadiusPending = false;
            }
        };
        /**
         * A callback called when the listener is fully bound.
         * @param binder The binder from the listener.
         * @param uid The unique ID of the bound map.
         */
        this.onListenerBound = (binder, uid) => {
            if (this.isDestroyed) {
                return;
            }
            if (binder.friendlyName === this.props.id) {
                // console.log('Bing map listener bound.');
                this.binder = binder;
                this.uid = uid;
                if (this._isBound) {
                    return;
                }
                this._isBound = true;
                Coherent.call('SHOW_MAP', uid, true);
                const pause = !this._isAwake;
                this.earthColorsSub = this.earthColors.sub(() => {
                    this.earthColorsHandler();
                    this.earthColorsElevationRangeHandler();
                }, true, pause);
                this.earthColorsElevationRangeSub = this.earthColorsElevationRange.sub(this.earthColorsElevationRangeHandler, true, pause);
                this.skyColorSub = this.skyColor.sub(this.skyColorHandler, true, pause);
                this.referenceSub = this.reference.sub(this.referenceHandler, true, pause);
                this.wxrModeSub = this.wxrMode.sub(this.wxrModeHandler, true, pause);
                this.wxrColorsSub = this.wxrColors.sub(this.wxrColorsHandler, true, pause);
                this.resolutionSub = this.resolution.sub(this.resolutionHandler, true, pause);
                this.isoLinesSub = this.isoLines.sub(this.isoLinesHandler, true, pause);
                // Only when not SVT, send in initial map params (even if we are asleep), because a bing instance that doesn't
                // have params initialized causes GPU perf issues.
                if (this.modeFlags !== 4) {
                    Coherent.call('SET_MAP_PARAMS', this.uid, this.pos, this.radius, 1);
                }
                this.props.onBoundCallback && this.props.onBoundCallback(this);
            }
        };
        /**
         * A callback called when the map image is updated.
         * @param uid The unique ID of the bound map.
         * @param imgSrc The img tag src attribute to assign to the bing map image.
         */
        this.onMapUpdate = (uid, imgSrc) => {
            if (this.binder !== undefined && this.uid === uid && this.imgRef.instance !== null) {
                if (this.imgRef.instance.src !== imgSrc) {
                    this.imgRef.instance.src = imgSrc;
                }
            }
        };
        /**
         * Calls the position and radius set function to set map parameters.
         */
        this.setCurrentMapParams = () => {
            this.setPositionRadius(this.pos, this.radius);
        };
    }
    /**
     * Checks whether this Bing component has been bound.
     * @returns whether this Bing component has been bound.
     */
    isBound() {
        return this._isBound;
    }
    /**
     * Checks whether this Bing component is awake.
     * @returns whether this Bing component is awake.
     */
    isAwake() {
        return this._isAwake;
    }
    /** @inheritdoc */
    onAfterRender() {
        if (window['IsDestroying']) {
            this.destroy();
            return;
        }
        const gameStateSubscribable = GameStateProvider.get();
        const gameState = gameStateSubscribable.get();
        if (gameState === GameState.briefing || gameState === GameState.ingame) {
            this.registerListener();
        }
        else {
            this.gameStateSub = gameStateSubscribable.sub(state => {
                var _a;
                if (this.isDestroyed) {
                    return;
                }
                if (state === GameState.briefing || state === GameState.ingame) {
                    (_a = this.gameStateSub) === null || _a === void 0 ? void 0 : _a.destroy();
                    this.registerListener();
                }
            });
        }
        window.addEventListener('OnDestroy', this.destroy.bind(this));
    }
    /**
     * Registers this component's Bing map listener.
     */
    registerListener() {
        var _a;
        if (((_a = this.props.delay) !== null && _a !== void 0 ? _a : 0) > 0) {
            setTimeout(() => {
                if (this.isDestroyed) {
                    return;
                }
                this.mapListener = RegisterViewListener('JS_LISTENER_MAPS', this.onListenerRegistered.bind(this));
            }, this.props.delay);
        }
        else {
            this.mapListener = RegisterViewListener('JS_LISTENER_MAPS', this.onListenerRegistered.bind(this));
        }
    }
    /**
     * A callback called when this component's Bing map listener is registered.
     */
    onListenerRegistered() {
        if (this.isDestroyed || this.isListenerRegistered) {
            return;
        }
        this.mapListener.on('MapBinded', this.onListenerBound);
        this.mapListener.on('MapUpdated', this.onMapUpdate);
        this.isListenerRegistered = true;
        this.mapListener.trigger('JS_BIND_BINGMAP', this.props.id, this.modeFlags);
    }
    /**
     * Wakes this Bing component. Upon awakening, this component will synchronize its state from when it was put to sleep
     * to the Bing instance to which it is bound.
     */
    wake() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        this._isAwake = true;
        if (!this._isBound) {
            return;
        }
        this.setCurrentMapParams();
        // Only when not SVT, periodically send map params to Coherent in case another BingComponent binds to the same
        // bing instance and sends in the initial params set and overrides our params.
        if (this.modeFlags !== 4) {
            this.setCurrentMapParamsTimer = setInterval(this.setCurrentMapParams, 200);
        }
        (_a = this.earthColorsSub) === null || _a === void 0 ? void 0 : _a.resume(true);
        (_b = this.earthColorsElevationRangeSub) === null || _b === void 0 ? void 0 : _b.resume(true);
        (_c = this.skyColorSub) === null || _c === void 0 ? void 0 : _c.resume(true);
        (_d = this.referenceSub) === null || _d === void 0 ? void 0 : _d.resume(true);
        (_e = this.wxrModeSub) === null || _e === void 0 ? void 0 : _e.resume(true);
        (_f = this.wxrColorsSub) === null || _f === void 0 ? void 0 : _f.resume(true);
        (_g = this.resolutionSub) === null || _g === void 0 ? void 0 : _g.resume(true);
        (_h = this.isoLinesSub) === null || _h === void 0 ? void 0 : _h.resume(true);
    }
    /**
     * Puts this Bing component to sleep. While asleep, this component cannot make changes to the Bing instance to which
     * it is bound.
     */
    sleep() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        this._isAwake = false;
        if (!this._isBound) {
            return;
        }
        if (this.setCurrentMapParamsTimer !== null) {
            clearInterval(this.setCurrentMapParamsTimer);
        }
        (_a = this.earthColorsSub) === null || _a === void 0 ? void 0 : _a.pause();
        (_b = this.earthColorsElevationRangeSub) === null || _b === void 0 ? void 0 : _b.pause();
        (_c = this.skyColorSub) === null || _c === void 0 ? void 0 : _c.pause();
        (_d = this.referenceSub) === null || _d === void 0 ? void 0 : _d.pause();
        (_e = this.wxrModeSub) === null || _e === void 0 ? void 0 : _e.pause();
        (_f = this.wxrColorsSub) === null || _f === void 0 ? void 0 : _f.pause();
        (_g = this.resolutionSub) === null || _g === void 0 ? void 0 : _g.pause();
        (_h = this.isoLinesSub) === null || _h === void 0 ? void 0 : _h.pause();
    }
    /**
     * Sets the center position and radius.
     * @param pos The center position.
     * @param radius The radius, in meters.
     */
    setPositionRadius(pos, radius) {
        this.pos = pos;
        this.radius = Math.max(radius, 10); // Not sure if bad things happen when radius is 0, so we just clamp it to 10 meters.
        if (this._isBound && this._isAwake) {
            if (this.positionRadiusInhibitFramesRemaining > 0) {
                this.isPositionRadiusPending = true;
            }
            else {
                Coherent.call('SET_MAP_PARAMS', this.uid, this.pos, this.radius, 1);
            }
        }
    }
    /** @inheritdoc */
    render() {
        var _a;
        return (FSComponent.buildComponent("img", { ref: this.imgRef, src: '', style: 'position: absolute; left: 0; top: 0; width: 100%; height: 100%;', class: (_a = this.props.class) !== null && _a !== void 0 ? _a : '' }));
    }
    /** @inheritdoc */
    destroy() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        this.isDestroyed = true;
        this._isBound = false;
        if (this.setCurrentMapParamsTimer !== null) {
            clearInterval(this.setCurrentMapParamsTimer);
        }
        (_a = this.gameStateSub) === null || _a === void 0 ? void 0 : _a.destroy();
        (_b = this.earthColorsSub) === null || _b === void 0 ? void 0 : _b.destroy();
        (_c = this.earthColorsElevationRangeSub) === null || _c === void 0 ? void 0 : _c.destroy();
        (_d = this.skyColorSub) === null || _d === void 0 ? void 0 : _d.destroy();
        (_e = this.referenceSub) === null || _e === void 0 ? void 0 : _e.destroy();
        (_f = this.wxrModeSub) === null || _f === void 0 ? void 0 : _f.destroy();
        (_g = this.wxrColorsSub) === null || _g === void 0 ? void 0 : _g.destroy();
        (_h = this.resolutionSub) === null || _h === void 0 ? void 0 : _h.destroy();
        (_j = this.isoLinesSub) === null || _j === void 0 ? void 0 : _j.destroy();
        (_k = this.mapListener) === null || _k === void 0 ? void 0 : _k.off('MapBinded', this.onListenerBound);
        (_l = this.mapListener) === null || _l === void 0 ? void 0 : _l.off('MapUpdated', this.onMapUpdate);
        (_m = this.mapListener) === null || _m === void 0 ? void 0 : _m.trigger('JS_UNBIND_BINGMAP', this.props.id);
        this.isListenerRegistered = false;
        this.imgRef.instance.src = '';
        (_o = this.imgRef.instance.parentNode) === null || _o === void 0 ? void 0 : _o.removeChild(this.imgRef.instance);
        super.destroy();
    }
    /**
     * Resets the img element's src attribute.
     */
    resetImgSrc() {
        const imgRef = this.imgRef.getOrDefault();
        if (imgRef !== null) {
            const currentSrc = imgRef.src;
            imgRef.src = '';
            imgRef.src = currentSrc;
        }
    }
    /**
     * Converts an HTML hex color string to a numerical RGB value, as `R + G * 256 + B * 256^2`.
     * @param hexColor The hex color string to convert.
     * @returns The numerical RGB value equivalent of the specified hex color string, as `R + G * 256 + B * 256^2`.
     */
    static hexaToRGBColor(hexColor) {
        const hexStringColor = hexColor;
        let offset = 0;
        if (hexStringColor[0] === '#') {
            offset = 1;
        }
        const r = parseInt(hexStringColor.substr(0 + offset, 2), 16);
        const g = parseInt(hexStringColor.substr(2 + offset, 2), 16);
        const b = parseInt(hexStringColor.substr(4 + offset, 2), 16);
        return BingComponent.rgbColor(r, g, b);
    }
    /**
     * Converts a numerical RGB value to an HTML hex color string.
     * @param rgb The numerical RGB value to convert, as `R + G * 256 + B * 256^2`.
     * @param poundPrefix Whether to include the pound (`#`) prefix in the converted string. Defaults to `true`.
     * @returns The HTML hex color string equivalent of the specified numerical RGB value.
     */
    static rgbToHexaColor(rgb, poundPrefix = true) {
        const b = Math.floor((rgb % (256 * 256 * 256)) / (256 * 256));
        const g = Math.floor((rgb % (256 * 256)) / 256);
        const r = rgb % 256;
        return `${poundPrefix ? '#' : ''}${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }
    /**
     * Converts RGB color components to a numerical RGB value, as `R + G * 256 + B * 256^2`.
     * @param r The red component, from 0 to 255.
     * @param g The green component, from 0 to 255.
     * @param b The blue component, from 0 to 255.
     * @returns The numerical RGB value of the specified components, as `R + G * 256 + B * 256^2`.
     */
    static rgbColor(r, g, b) {
        return 256 * 256 * b + 256 * g + r;
    }
    /**
     * Converts an HTML hex color string to a numerical RGBA value, as `R + G * 256 + B * 256^2 + A * 256^3`.
     * @param hexColor The hex color string to convert.
     * @returns The numerical RGBA value equivalent of the specified hex color string, as
     * `R + G * 256 + B * 256^2 + A * 256^3`.
     */
    static hexaToRGBAColor(hexColor) {
        const hexStringColor = hexColor;
        let offset = 0;
        if (hexStringColor[0] === '#') {
            offset = 1;
        }
        const r = parseInt(hexStringColor.substr(0 + offset, 2), 16);
        const g = parseInt(hexStringColor.substr(2 + offset, 2), 16);
        const b = parseInt(hexStringColor.substr(4 + offset, 2), 16);
        const a = parseInt(hexStringColor.substr(6 + offset, 2), 16);
        return BingComponent.rgbaColor(r, g, b, a);
    }
    /**
     * Converts a numerical RGBA value to an HTML hex color string.
     * @param rgba The numerical RGBA value to convert, as `R + G * 256 + B * 256^2 + A * 256^3`.
     * @param poundPrefix Whether to include the pound (`#`) prefix in the converted string. Defaults to `true`.
     * @returns The HTML hex color string equivalent of the specified numerical RGBA value.
     */
    static rgbaToHexaColor(rgba, poundPrefix = true) {
        const a = Math.floor((rgba % (256 * 256 * 256 * 256)) / (256 * 256 * 256));
        const b = Math.floor((rgba % (256 * 256 * 256)) / (256 * 256));
        const g = Math.floor((rgba % (256 * 256)) / 256);
        const r = rgba % 256;
        return `${poundPrefix ? '#' : ''}${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}${a.toString(16).padStart(2, '0')}`;
    }
    /**
     * Converts RGBA color components to a numerical RGBA value, as `R + G * 256 + B * 256^2 + A * 256^3`.
     * @param r The red component, from 0 to 255.
     * @param g The green component, from 0 to 255.
     * @param b The blue component, from 0 to 255.
     * @param a The alpha component, from 0 to 255.
     * @returns The numerical RGBA value of the specified components, as `R + G * 256 + B * 256^2 + A * 256^3`.
     */
    static rgbaColor(r, g, b, a) {
        return 256 * 256 * 256 * a + 256 * 256 * b + 256 * g + r;
    }
    /**
     * Creates a full Bing component earth colors array. The earth colors array will contain the specified water color
     * and terrain colors (including interpolated values between the explicitly defined ones, as necessary).
     * @param waterColor The desired water color, as a hex string with the format `#hhhhhh`.
     * @param terrainColors An array of desired terrain colors at specific elevations. Elevations should be specified in
     * feet and colors as hex strings with the format `#hhhhhh`.
     * @param minElevation The minimum elevation to which to assign a color, in feet. Defaults to 0.
     * @param maxElevation The maximum elevation to which to assign a color, in feet. Defaults to 30000.
     * @param stepCount The number of terrain color steps. Defaults to 61.
     * @returns a full Bing component earth colors array.
     */
    // eslint-disable-next-line jsdoc/require-jsdoc
    static createEarthColorsArray(waterColor, terrainColors, minElevation = 0, maxElevation = 30000, stepCount = 61) {
        const earthColors = [BingComponent.hexaToRGBColor(waterColor)];
        const curve = new Avionics.Curve();
        curve.interpolationFunction = Avionics.CurveTool.StringColorRGBInterpolation;
        for (let i = 0; i < terrainColors.length; i++) {
            curve.add(terrainColors[i].elev, terrainColors[i].color);
        }
        const elevationStep = (maxElevation - minElevation) / Math.max(stepCount - 1, 1);
        for (let i = 0; i < stepCount; i++) {
            const color = curve.evaluate(minElevation + i * elevationStep);
            earthColors[i + 1] = BingComponent.hexaToRGBColor(color);
        }
        return earthColors;
    }
}
/** The default resolution of the Bing Map along both horizontal and vertical axes, in pixels. */
BingComponent.DEFAULT_RESOLUTION = 1024;
BingComponent.DEFAULT_WEATHER_COLORS = [
    [BingComponent.hexaToRGBAColor('#00000000'), 0.5],
    [BingComponent.hexaToRGBAColor('#004d00ff'), 2.75],
    [BingComponent.hexaToRGBAColor('#cb7300ff'), 12.5],
    [BingComponent.hexaToRGBAColor('#ff0000ff'), 12.5]
];
BingComponent.POSITION_RADIUS_INHIBIT_FRAMES = 10;

var DurationDisplayFormat;
(function (DurationDisplayFormat) {
    /** hh:mm:ss. */
    DurationDisplayFormat[DurationDisplayFormat["hh_mm_ss"] = 0] = "hh_mm_ss";
    /** hh:mm. */
    DurationDisplayFormat[DurationDisplayFormat["hh_mm"] = 1] = "hh_mm";
    /** mm:ss. */
    DurationDisplayFormat[DurationDisplayFormat["mm_ss"] = 2] = "mm_ss";
    /** hh:mm if value is greater or equal to 1 hour, otherwise mm:ss. */
    DurationDisplayFormat[DurationDisplayFormat["hh_mm_or_mm_ss"] = 3] = "hh_mm_or_mm_ss";
})(DurationDisplayFormat || (DurationDisplayFormat = {}));
var DurationDisplayDelim;
(function (DurationDisplayDelim) {
    /** Colon (`:`). */
    DurationDisplayDelim[DurationDisplayDelim["Colon"] = 0] = "Colon";
    /** `:` if hh:mm:ss or mm:ss, `+` if hh:mm. */
    DurationDisplayDelim[DurationDisplayDelim["ColonOrCross"] = 1] = "ColonOrCross";
    /** Space (` `). */
    DurationDisplayDelim[DurationDisplayDelim["Space"] = 2] = "Space";
})(DurationDisplayDelim || (DurationDisplayDelim = {}));
/**
 * A component which displays duration values.
 */
class DurationDisplay extends DisplayComponent {
    /** @inheritdoc */
    constructor(props) {
        super(props);
        this.value = ('isSubscribable' in this.props.value)
            ? this.props.value
            : Subject.create(this.props.value);
        this.options = Object.assign({}, DurationDisplay.DEFAULT_OPTIONS, this.props.options);
        this.negativeSign = this.options.useMinusSign ? '−' : '-';
        this.positiveSign = this.options.forceSign ? '+' : '';
        this.text = Subject.create('');
        switch (this.options.delim) {
            case DurationDisplayDelim.Colon:
                this.delim = ':';
                break;
            case DurationDisplayDelim.Space:
                this.delim = ' ';
                break;
            default:
                this.delim = '';
        }
    }
    /** @inheritdoc */
    onAfterRender() {
        this.valueSub = this.value.sub(this.onValueChanged.bind(this), true);
    }
    /**
     * A callback which is called when this component's bound value changes.
     * @param value The new value.
     */
    onValueChanged(value) {
        this.setDisplay(value);
    }
    /**
     * Displays this component's current value.
     * @param value The current value.
     */
    setDisplay(value) {
        let text;
        if (value.isNaN()) {
            text = this.options.nanString;
        }
        else {
            let hrText = '';
            let minText = '';
            let secText = '';
            let hrUnitText = '';
            let minUnitText = '';
            let secUnitText = '';
            let hrDelim = '';
            let minDelim = '';
            const valueAsSeconds = Math.abs(value.asUnit(UnitType.SECOND));
            const isNegative = value.number < 0;
            let hours = Math.floor(valueAsSeconds / 3600);
            if (this.options.format != DurationDisplayFormat.mm_ss && !(this.options.format === DurationDisplayFormat.hh_mm_or_mm_ss && hours == 0)) {
                hrText = hours.toFixed(0);
                if (this.options.delim === DurationDisplayDelim.ColonOrCross) {
                    if (this.options.format === DurationDisplayFormat.hh_mm_or_mm_ss || this.options.format === DurationDisplayFormat.hh_mm) {
                        hrDelim = '+';
                    }
                    else {
                        hrDelim = ':';
                    }
                }
                else {
                    hrDelim = this.delim;
                }
            }
            const hoursInMinutes = hours * 60;
            let minutes;
            let seconds;
            if (this.options.format === DurationDisplayFormat.hh_mm || (this.options.format === DurationDisplayFormat.hh_mm_or_mm_ss && hours !== 0)) {
                minutes = valueAsSeconds / 60 - hoursInMinutes;
                minText = this.options.numberFormatter(minutes);
            }
            else {
                minutes = Math.floor(valueAsSeconds / 60 - hoursInMinutes);
                minText = minutes.toFixed(0);
                minDelim = this.options.delim === DurationDisplayDelim.ColonOrCross ? ':' : this.delim;
                seconds = valueAsSeconds - (hoursInMinutes + minutes) * 60;
                secText = this.options.numberFormatter(seconds);
            }
            if (secText && secText.replace(/\b0+/, '').substring(0, 2) === '60') {
                seconds = parseFloat(secText) - 60;
                minutes++;
                secText = this.options.numberFormatter(seconds);
                minText = `${minutes}`;
            }
            if (minText && minText.replace(/\b0+/, '').substring(0, 2) === '60' && hrText) {
                if (secText) {
                    minutes = 0;
                    minText = '00';
                }
                else {
                    minutes = parseFloat(minText) - 60;
                    minText = this.options.numberFormatter(minutes);
                }
                hours++;
                hrText = `${hours}`;
            }
            // pad parts with leading zeroes
            if (hrText) {
                hrText = hrText.padStart(this.options.pad, '0');
                if (secText) {
                    minText = minText.padStart(2, '0');
                    secText = DurationDisplay.padIntegerPart(secText.replace(/^0+/, ''), 2, '0');
                }
                else {
                    minText = DurationDisplay.padIntegerPart(minText.replace(/^0+/, ''), 2, '0');
                }
            }
            else {
                minText = minText.padStart(this.options.pad, '0');
                secText = DurationDisplay.padIntegerPart(secText.replace(/^0+/, ''), 2, '0');
            }
            // format units
            if (this.options.showUnits) {
                hrText && (hrUnitText = this.options.unitFormatter(parseFloat(hrText), UnitType.HOUR));
                minUnitText = this.options.unitFormatter(parseFloat(minText), UnitType.MINUTE);
                secText && (secUnitText = this.options.unitFormatter(parseFloat(secText), UnitType.SECOND));
            }
            // compute sign
            const sign = isNegative ? this.negativeSign : this.positiveSign;
            text = `${sign}${hrText}${hrUnitText}${hrDelim}${minText}${minUnitText}${minDelim}${secText}${secUnitText}`;
        }
        this.text.set(text);
    }
    /**
     * Pads the integer part of a string which represents a number.
     * @param str A string which represents a number.
     * @param maxLength The length to which the integer part of the string will be padded.
     * @param fillString The string with which to pad the original string.
     * @returns a new string which is the result of padding the original string.
     */
    static padIntegerPart(str, maxLength, fillString) {
        const decimalIndex = str.indexOf('.');
        return str.padStart(decimalIndex < 0 ? maxLength : str.length - decimalIndex + maxLength, fillString);
    }
    /** @inheritdoc */
    render() {
        var _a;
        return (FSComponent.buildComponent("div", { class: (_a = this.props.class) !== null && _a !== void 0 ? _a : '', style: 'white-space: nowrap;' }, this.text));
    }
    /** @inheritdoc */
    destroy() {
        var _a;
        (_a = this.valueSub) === null || _a === void 0 ? void 0 : _a.destroy();
    }
}
/** Default formatting options. */
DurationDisplay.DEFAULT_OPTIONS = {
    pad: 0,
    format: DurationDisplayFormat.hh_mm_ss,
    delim: DurationDisplayDelim.Colon,
    showUnits: false,
    numberFormatter: (value) => value.toFixed(0),
    unitFormatter: (value, unit) => unit.name[0],
    useMinusSign: false,
    forceSign: false,
    nanString: ''
};

var DmsDirection;
(function (DmsDirection) {
    DmsDirection["NORTH"] = "N";
    DmsDirection["SOUTH"] = "S";
    DmsDirection["WEST"] = "W";
    DmsDirection["EAST"] = "E";
})(DmsDirection || (DmsDirection = {}));

/**
 * The item position to focus a component's children when performing a focus operation.
 */
var FocusPosition;
(function (FocusPosition) {
    /** The component's most recently focused descendants will be focused. */
    FocusPosition["MostRecent"] = "MostRecent";
    /** The first focus-able child at each node in the descendant tree will be focused. */
    FocusPosition["First"] = "First";
    /** The last focus-able child at each node in the descendant tree will be focused. */
    FocusPosition["Last"] = "Last";
    /** No child components will be focused. */
    FocusPosition["None"] = "None";
})(FocusPosition || (FocusPosition = {}));
/**
 * A strategy to focus a component's children as part of a blur reconciliation operation.
 */
var BlurReconciliation;
(function (BlurReconciliation) {
    /** The component's first focus-able child will be focused. */
    BlurReconciliation["First"] = "First";
    /** The component's last focus-able child will be focused. */
    BlurReconciliation["Last"] = "Last";
    /**
     * The component's next focus-able child after the child that was blurred will be focused. If no such child exists,
     * then the last focus-able child before the child that was blurred will be focused.
     */
    BlurReconciliation["Next"] = "Next";
    /**
     * The component's last focus-able child before the child that was blurred will be focused. If no such child exists,
     * then the next focus-able child after the child that was blurred will be focused.
     */
    BlurReconciliation["Prev"] = "Prev";
    /** No child components will be focused. */
    BlurReconciliation["None"] = "None";
})(BlurReconciliation || (BlurReconciliation = {}));

/**
 * The different types of horizon projection changes.
 */
var HorizonProjectionChangeType;
(function (HorizonProjectionChangeType) {
    HorizonProjectionChangeType[HorizonProjectionChangeType["Position"] = 1] = "Position";
    HorizonProjectionChangeType[HorizonProjectionChangeType["Altitude"] = 2] = "Altitude";
    HorizonProjectionChangeType[HorizonProjectionChangeType["Heading"] = 4] = "Heading";
    HorizonProjectionChangeType[HorizonProjectionChangeType["Pitch"] = 8] = "Pitch";
    HorizonProjectionChangeType[HorizonProjectionChangeType["Roll"] = 16] = "Roll";
    HorizonProjectionChangeType[HorizonProjectionChangeType["Offset"] = 32] = "Offset";
    HorizonProjectionChangeType[HorizonProjectionChangeType["ProjectedSize"] = 64] = "ProjectedSize";
    HorizonProjectionChangeType[HorizonProjectionChangeType["Fov"] = 128] = "Fov";
    HorizonProjectionChangeType[HorizonProjectionChangeType["FovEndpoints"] = 256] = "FovEndpoints";
    HorizonProjectionChangeType[HorizonProjectionChangeType["ScaleFactor"] = 512] = "ScaleFactor";
    HorizonProjectionChangeType[HorizonProjectionChangeType["ProjectedOffset"] = 1024] = "ProjectedOffset";
    HorizonProjectionChangeType[HorizonProjectionChangeType["OffsetCenterProjected"] = 2048] = "OffsetCenterProjected";
})(HorizonProjectionChangeType || (HorizonProjectionChangeType = {}));
[Vec2Math.create()];
[Vec3Math.create()];
[new GeoPoint(0, 0)];
[Vec3Math.create()];

/**
 * A base component for map layers.
 */
class MapLayer extends DisplayComponent {
    constructor() {
        super(...arguments);
        this._isVisible = true;
    }
    /**
     * Checks whether this layer is visible.
     * @returns whether this layer is visible.
     */
    isVisible() {
        return this._isVisible;
    }
    /**
     * Sets this layer's visibility.
     * @param val Whether this layer should be visible.
     */
    setVisible(val) {
        if (this._isVisible === val) {
            return;
        }
        this._isVisible = val;
        this.onVisibilityChanged(val);
    }
    /**
     * This method is called when this layer's visibility changes.
     * @param isVisible Whether the layer is now visible.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onVisibilityChanged(isVisible) {
        // noop
    }
    /**
     * This method is called when this layer is attached to its parent map component.
     */
    onAttached() {
        // noop
    }
    /**
     * This method is called when this layer's parent map is woken.
     */
    onWake() {
        // noop
    }
    /**
     * This method is called when this layer's parent map is put to sleep.
     */
    onSleep() {
        // noop
    }
    /**
     * This method is called when the map projection changes.
     * @param mapProjection - this layer's map projection.
     * @param changeFlags The types of changes made to the projection.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onMapProjectionChanged(mapProjection, changeFlags) {
        // noop
    }
    /**
     * This method is called once every map update cycle.
     * @param time The current time as a UNIX timestamp.
     * @param elapsed The elapsed time, in milliseconds, since the last update.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onUpdated(time, elapsed) {
        // noop
    }
    /**
     * This method is called when this layer is detached from its parent map component.
     */
    onDetached() {
        // noop
    }
}

/**
 * The different types of map projection changes.
 */
var MapProjectionChangeType;
(function (MapProjectionChangeType) {
    MapProjectionChangeType[MapProjectionChangeType["Target"] = 1] = "Target";
    MapProjectionChangeType[MapProjectionChangeType["Center"] = 2] = "Center";
    MapProjectionChangeType[MapProjectionChangeType["TargetProjected"] = 4] = "TargetProjected";
    MapProjectionChangeType[MapProjectionChangeType["Range"] = 8] = "Range";
    MapProjectionChangeType[MapProjectionChangeType["RangeEndpoints"] = 16] = "RangeEndpoints";
    MapProjectionChangeType[MapProjectionChangeType["ScaleFactor"] = 32] = "ScaleFactor";
    MapProjectionChangeType[MapProjectionChangeType["Rotation"] = 64] = "Rotation";
    MapProjectionChangeType[MapProjectionChangeType["ProjectedSize"] = 128] = "ProjectedSize";
    MapProjectionChangeType[MapProjectionChangeType["ProjectedResolution"] = 256] = "ProjectedResolution";
})(MapProjectionChangeType || (MapProjectionChangeType = {}));
UnitType.GA_RADIAN.convertTo(1, UnitType.NMILE);
new GeoPoint(0, 0);
new GeoPoint(0, 0);
[Vec3Math.create()];

/**
 * A path stream which does nothing on any input.
 */
class NullPathStream {
    /**
     * Does nothing.
     */
    beginPath() {
        // noop
    }
    /**
     * Does nothing.
     */
    moveTo() {
        // noop
    }
    /**
     * Does nothing.
     */
    lineTo() {
        // noop
    }
    /**
     * Does nothing.
     */
    bezierCurveTo() {
        // noop
    }
    /**
     * Does nothing.
     */
    quadraticCurveTo() {
        // noop
    }
    /**
     * Does nothing.
     */
    arc() {
        // noop
    }
    /**
     * Does nothing.
     */
    closePath() {
        // noop
    }
}
/** An instance of a {@link NullPathStream}. */
NullPathStream.INSTANCE = new NullPathStream();
/**
 * An abstract implementation of a path stream which sends a transformed version of its input to be consumed by another
 * stream.
 */
class AbstractTransformingPathStream {
    /**
     * Constructor.
     * @param consumer The path stream that consumes this stream's transformed output.
     */
    constructor(consumer) {
        this.consumer = consumer;
    }
    /** @inheritdoc */
    getConsumer() {
        return this.consumer;
    }
    /** @inheritdoc */
    setConsumer(consumer) {
        this.consumer = consumer;
    }
}

/**
 * Bitflags describing the relative location of a point with respect to a rectangular bounding box.
 */
var Outcode;
(function (Outcode) {
    Outcode[Outcode["Inside"] = 0] = "Inside";
    Outcode[Outcode["Left"] = 1] = "Left";
    Outcode[Outcode["Top"] = 2] = "Top";
    Outcode[Outcode["Right"] = 4] = "Right";
    Outcode[Outcode["Bottom"] = 8] = "Bottom";
})(Outcode || (Outcode = {}));
/**
 * A path stream which performs clipping to an axis-aligned rectangular bounding box before sending the clipped path
 * to another stream. Clipping is only supported for path segments added via the `lineTo()` and `arc()` methods. Path
 * segments added via `bezierCurveTo()` and `quadraticCurveTo()` will be passed to the consumer stream unclipped.
 */
class ClippedPathStream extends AbstractTransformingPathStream {
    /**
     * Constructor.
     * @param consumer The path stream that consumes this stream's transformed output.
     * @param bounds A subscribable which provides the clipping bounds for this stream, as `[left, top, right, bottom]`.
     * Whenever the clipping bounds change, the state of this stream will be reset, as if `beginPath()` were called.
     */
    constructor(consumer, bounds) {
        super(consumer);
        this.bounds = bounds;
        this.boundsHandler = this.onBoundsChanged.bind(this);
        this.boundsLines = [
            new Float64Array(3),
            new Float64Array(3),
            new Float64Array(3),
            new Float64Array(3)
        ];
        this.isBoundingRectNonZero = false;
        this.firstPoint = new Float64Array([NaN, NaN]);
        this.prevPoint = new Float64Array([NaN, NaN]);
        this.prevPointOutcode = 0;
        bounds.sub(this.boundsHandler, true);
    }
    /** @inheritdoc */
    beginPath() {
        this.reset();
        this.consumer.beginPath();
    }
    /** @inheritdoc */
    moveTo(x, y) {
        if (!this.isBoundingRectNonZero) {
            return;
        }
        if (!(isFinite(x) && isFinite(y))) {
            return;
        }
        if (this.prevPoint[0] === x && this.prevPoint[1] === y) {
            return;
        }
        if (isNaN(this.firstPoint[0])) {
            Vec2Math.set(x, y, this.firstPoint);
        }
        Vec2Math.set(x, y, this.prevPoint);
        this.prevPointOutcode = this.getOutcode(x, y);
        if (this.prevPointOutcode === 0) {
            this.consumer.moveTo(x, y);
        }
    }
    /** @inheritdoc */
    lineTo(x, y) {
        if (!this.isBoundingRectNonZero) {
            return;
        }
        if (!(isFinite(x) && isFinite(y))) {
            return;
        }
        if (this.prevPoint[0] === x && this.prevPoint[1] === y) {
            return;
        }
        if (isNaN(this.prevPoint[0])) {
            this.moveTo(x, y);
            return;
        }
        const outcode = this.getOutcode(x, y);
        if ((this.prevPointOutcode | outcode) === 0) {
            // Both the previous point and current point are within bounds.
            this.consumer.lineTo(x, y);
        }
        else if ((this.prevPointOutcode & outcode) === 0) {
            // One or both of the previous point and current point are out of bounds, and the line connecting them may
            // cross through the bounding rect
            const bounds = this.bounds.get();
            const line = ClippedPathStream.getLineCoordinates(this.prevPoint[0], this.prevPoint[1], x, y, ClippedPathStream.vec3Cache[1]);
            let entryPoint, exitPoint;
            const outcodeOr = this.prevPointOutcode | outcode;
            if ((outcodeOr & ~(Outcode.Left | Outcode.Right)) === 0 || (outcodeOr & ~(Outcode.Top | Outcode.Bottom)) === 0) {
                // The connecting line does not cross zones diagonally -> no need to check if the intersection of the line and
                // boundary falls outside the bounds of the orthogonal axis.
                // find entry point
                for (let i = 0; i < 4; i++) {
                    if (this.prevPointOutcode & (1 << i)) {
                        entryPoint = ClippedPathStream.findLineLineIntersection(line, this.boundsLines[i], ClippedPathStream.vec2Cache[0]);
                        break;
                    }
                }
                // find exit point
                for (let i = 0; i < 4; i++) {
                    if (outcode & (1 << i)) {
                        exitPoint = ClippedPathStream.findLineLineIntersection(line, this.boundsLines[i], ClippedPathStream.vec2Cache[1]);
                        break;
                    }
                }
            }
            else {
                // find entry point
                for (let i = 0; i < 4; i++) {
                    if (this.prevPointOutcode & (1 << i)) {
                        const boundsAxisIndex = i % 2;
                        const intersection = ClippedPathStream.findLineLineIntersection(line, this.boundsLines[i], ClippedPathStream.vec2Cache[0]);
                        if (intersection && intersection[boundsAxisIndex] >= bounds[boundsAxisIndex] && intersection[boundsAxisIndex] <= bounds[boundsAxisIndex + 2]) {
                            entryPoint = intersection;
                            break;
                        }
                    }
                }
                // find exit point
                for (let i = 0; i < 4; i++) {
                    if (outcode & (1 << i)) {
                        const boundsAxisIndex = i % 2;
                        const intersection = ClippedPathStream.findLineLineIntersection(line, this.boundsLines[i], ClippedPathStream.vec2Cache[1]);
                        if (intersection && intersection[boundsAxisIndex] >= bounds[boundsAxisIndex] && intersection[boundsAxisIndex] <= bounds[boundsAxisIndex + 2]) {
                            exitPoint = intersection;
                            break;
                        }
                    }
                }
            }
            if (entryPoint) {
                this.consumer.moveTo(entryPoint[0], entryPoint[1]);
            }
            if (exitPoint) {
                this.consumer.lineTo(exitPoint[0], exitPoint[1]);
            }
            else if (outcode === Outcode.Inside) {
                this.consumer.lineTo(x, y);
            }
        }
        Vec2Math.set(x, y, this.prevPoint);
        this.prevPointOutcode = outcode;
    }
    /** @inheritdoc */
    bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
        if (!this.isBoundingRectNonZero) {
            return;
        }
        if (!(isFinite(x) && isFinite(y) && isFinite(cp1x) && isFinite(cp1y) && isFinite(cp2x) && isFinite(cp2y))) {
            return;
        }
        if (isNaN(this.prevPoint[0])) {
            this.moveTo(x, y);
            return;
        }
        if (this.prevPointOutcode !== Outcode.Inside) {
            this.consumer.moveTo(this.prevPoint[0], this.prevPoint[1]);
        }
        this.consumer.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
        Vec2Math.set(x, y, this.prevPoint);
        this.prevPointOutcode = this.getOutcode(x, y);
    }
    /** @inheritdoc */
    quadraticCurveTo(cpx, cpy, x, y) {
        if (!this.isBoundingRectNonZero) {
            return;
        }
        if (!(isFinite(x) && isFinite(y) && isFinite(cpx) && isFinite(cpy))) {
            return;
        }
        if (isNaN(this.prevPoint[0])) {
            this.moveTo(x, y);
            return;
        }
        if (this.prevPointOutcode !== Outcode.Inside) {
            this.consumer.moveTo(this.prevPoint[0], this.prevPoint[1]);
        }
        this.consumer.quadraticCurveTo(cpx, cpy, x, y);
        Vec2Math.set(x, y, this.prevPoint);
        this.prevPointOutcode = this.getOutcode(x, y);
    }
    /** @inheritdoc */
    arc(x, y, radius, startAngle, endAngle, counterClockwise = false) {
        if (!this.isBoundingRectNonZero) {
            return;
        }
        if (!(isFinite(x) && isFinite(y) && isFinite(radius) && isFinite(startAngle) && isFinite(endAngle))) {
            return;
        }
        if (radius === 0 || startAngle === endAngle) {
            return;
        }
        const pi2 = 2 * Math.PI;
        const directionSign = counterClockwise ? -1 : 1;
        if (Math.sign(endAngle - startAngle) !== directionSign) {
            // Replicate behavior of canvas context arc() when the sign of the difference between start and end angles
            // doesn't match the counterClockwise flag.
            const angleDiff = ((counterClockwise ? startAngle - endAngle : endAngle - startAngle) % pi2 + pi2) % pi2;
            endAngle = startAngle + angleDiff * directionSign;
        }
        // Clamp to 2pi because we don't need to draw anything past a full circle.
        const angularWidth = Math.min(pi2, (endAngle - startAngle) * directionSign);
        const bounds = this.bounds.get();
        const radiusSq = radius * radius;
        const startPoint = Vec2Math.add(Vec2Math.set(x, y, ClippedPathStream.vec2Cache[2]), Vec2Math.setFromPolar(radius, startAngle, ClippedPathStream.vec2Cache[0]), ClippedPathStream.vec2Cache[2]);
        const startPointOutcode = this.getOutcode(startPoint[0], startPoint[1]);
        const endPoint = Vec2Math.add(Vec2Math.set(x, y, ClippedPathStream.vec2Cache[3]), Vec2Math.setFromPolar(radius, endAngle, ClippedPathStream.vec2Cache[0]), ClippedPathStream.vec2Cache[3]);
        const endPointOutcode = this.getOutcode(endPoint[0], endPoint[1]);
        if (isNaN(this.prevPoint[0])) {
            this.moveTo(startPoint[0], startPoint[1]);
        }
        else if (!Vec2Math.equals(this.prevPoint, startPoint)) {
            this.lineTo(startPoint[0], startPoint[1]);
        }
        // find all intersections of the arc circle with the clipping bounds; there can be up to 8 (two for each boundary
        // line)
        const intersections = ClippedPathStream.intersectionCache;
        let intersectionCount = 0;
        for (let i = 0; i < 4; i++) {
            const axisCoordIndex = i % 2;
            const crossAxisCoordIndex = (i + 1) % 2;
            const centerAxisCoord = i % 2 === 0 ? x : y;
            const centerCrossAxisCoord = i % 2 === 0 ? y : x;
            const deltaToBound = bounds[i] - centerAxisCoord;
            if (Math.abs(deltaToBound) < radius) {
                const crossAxisBoundMin = bounds[crossAxisCoordIndex];
                const crossAxisBoundMax = bounds[crossAxisCoordIndex + 2];
                //const radialOffset = Math.acos(deltaToBound / radius);
                const crossAxisOffset = Math.sqrt(radiusSq - deltaToBound * deltaToBound);
                let intersectionRadialOffset;
                {
                    const intersectionCrossAxisCoord = centerCrossAxisCoord + crossAxisOffset;
                    if (intersectionCrossAxisCoord >= crossAxisBoundMin && intersectionCrossAxisCoord <= crossAxisBoundMax) {
                        const intersection = intersections[intersectionCount];
                        intersection.point[axisCoordIndex] = bounds[i];
                        intersection.point[crossAxisCoordIndex] = intersectionCrossAxisCoord;
                        const radial = axisCoordIndex * Math.PI / 2 + (intersectionRadialOffset !== null && intersectionRadialOffset !== void 0 ? intersectionRadialOffset : (intersectionRadialOffset = Math.acos(deltaToBound / radius))) * (axisCoordIndex === 0 ? 1 : -1);
                        intersection.radial = (radial + pi2) % pi2; // [0, 2 * pi)
                        intersectionCount++;
                    }
                }
                {
                    const intersectionCrossAxisCoord = centerCrossAxisCoord - crossAxisOffset;
                    if (intersectionCrossAxisCoord >= crossAxisBoundMin && intersectionCrossAxisCoord <= crossAxisBoundMax) {
                        const intersection = intersections[intersectionCount];
                        intersection.point[axisCoordIndex] = bounds[i];
                        intersection.point[crossAxisCoordIndex] = intersectionCrossAxisCoord;
                        const radial = axisCoordIndex * Math.PI / 2 - (intersectionRadialOffset !== null && intersectionRadialOffset !== void 0 ? intersectionRadialOffset : (intersectionRadialOffset = Math.acos(deltaToBound / radius))) * (axisCoordIndex === 0 ? 1 : -1);
                        intersection.radial = (radial + pi2) % pi2; // [0, 2 * pi)
                        intersectionCount++;
                    }
                }
            }
        }
        // Begin at the start radial, then in order (either clockwise or counterclockwise depending on the arc direction)
        // iterate through the intersection points. At each intersection, move to the point if we are currently out of
        // bounds or path an arc from the last visited radial to the point if we are inbounds. Every time we visit an
        // intersection we go from out of bounds to in bounds and vice versa. Stop when the radial to the intersection
        // is past the end radial of the arc.
        let isOutside = startPointOutcode !== Outcode.Inside;
        const startAngleNormalized = ((startAngle % pi2) + pi2) % pi2; // [0, 2 * pi)
        let lastRadial = startAngleNormalized;
        let intersectionStartIndex = -1;
        let minAngularDiff = Infinity;
        for (let i = 0; i < intersectionCount; i++) {
            const angularDiff = ((intersections[i].radial - startAngleNormalized) * directionSign + pi2) % pi2;
            if (angularDiff < minAngularDiff) {
                intersectionStartIndex = i;
                minAngularDiff = angularDiff;
            }
        }
        if (intersectionStartIndex >= 0) {
            for (let i = 0; i < intersectionCount; i++) {
                const index = (intersectionStartIndex + intersectionCount + i * directionSign) % intersectionCount;
                const intersection = intersections[index];
                if (((intersection.radial - startAngleNormalized) * directionSign + pi2) % pi2 >= angularWidth) {
                    break;
                }
                if (isOutside) {
                    this.consumer.moveTo(intersection.point[0], intersection.point[1]);
                }
                else {
                    const segmentAngularWidth = ((intersection.radial - lastRadial) * directionSign + pi2) % pi2;
                    this.consumer.arc(x, y, radius, lastRadial, lastRadial + segmentAngularWidth * directionSign, counterClockwise);
                }
                isOutside = !isOutside;
                lastRadial = intersection.radial;
            }
        }
        const endAngleNormalized = (startAngleNormalized + angularWidth * directionSign + pi2) % pi2; // [0, 2 * pi)
        if (!isOutside) {
            const segmentAngularWidth = ((endAngleNormalized - lastRadial) * directionSign + pi2) % pi2;
            this.consumer.arc(x, y, radius, lastRadial, lastRadial + segmentAngularWidth * directionSign, counterClockwise);
            if (Math.abs((endAngleNormalized - endAngle) % pi2) > 1e-14) {
                // This can happen if we clamped the angular width to 2pi -> we need to move the current point to the actual
                // end point to keep the state of the consumer stream consistent with ours.
                this.consumer.moveTo(endPoint[0], endPoint[1]);
            }
        }
        Vec2Math.copy(endPoint, this.prevPoint);
        this.prevPointOutcode = endPointOutcode;
    }
    /** @inheritdoc */
    closePath() {
        if (!isNaN(this.firstPoint[0])) {
            this.lineTo(this.firstPoint[0], this.firstPoint[1]);
        }
    }
    /**
     * Resets the state of this stream.
     */
    reset() {
        Vec2Math.set(NaN, NaN, this.firstPoint);
        Vec2Math.set(NaN, NaN, this.prevPoint);
        this.prevPointOutcode = 0;
    }
    /**
     * Gets the Cohen-Sutherland outcode for a point.
     * @param x The x-coordinate of the query point.
     * @param y The y-coordinate of the query point.
     * @returns The outcode for the point.
     */
    getOutcode(x, y) {
        const bounds = this.bounds.get();
        let code = 0;
        if (x < bounds[0]) {
            code |= Outcode.Left;
        }
        else if (x > bounds[2]) {
            code |= Outcode.Right;
        }
        if (y < bounds[1]) {
            code |= Outcode.Top;
        }
        else if (y > bounds[3]) {
            code |= Outcode.Bottom;
        }
        return code;
    }
    /**
     * Handles clipping bounds change events.
     */
    onBoundsChanged() {
        const bounds = this.bounds.get();
        Vec3Math.set(1, 0, -bounds[0], this.boundsLines[0]);
        Vec3Math.set(0, 1, -bounds[1], this.boundsLines[1]);
        Vec3Math.set(1, 0, -bounds[2], this.boundsLines[2]);
        Vec3Math.set(0, 1, -bounds[3], this.boundsLines[3]);
        this.isBoundingRectNonZero = bounds[0] < bounds[2] && bounds[1] < bounds[3];
        this.beginPath();
    }
    /**
     * Destroys this stream.
     */
    destroy() {
        this.bounds.unsub(this.boundsHandler);
    }
    /**
     * Gets the line coordinate vector for a line passing through two points.
     * @param x1 The x-coordinate of the first point on the line.
     * @param y1 The y-coordinate of the first point on the line.
     * @param x2 The x-coordinate of the second point on the line.
     * @param y2 The y-coordinate of the second point on the line.
     * @param out A Float64Array object to which to write the result.
     * @returns The line coordinate vector of the line passing through the two points.
     */
    static getLineCoordinates(x1, y1, x2, y2, out) {
        const a = y1 - y2;
        const b = x2 - x1;
        const c = -(a * x1 + b * y1);
        return Vec3Math.set(a, b, c, out);
    }
    /**
     * Finds the intersection point between two lines in 2D Euclidean space.
     * @param line1 The line coordinate vector of the first line.
     * @param line2 The line coordinate vector of the second line.
     * @param out A Float64Array object to which to write the result.
     * @returns The intersection point of the two lines, or undefined if the two lines are parallel.
     */
    static findLineLineIntersection(line1, line2, out) {
        const cross = Vec3Math.cross(line1, line2, ClippedPathStream.vec3Cache[0]);
        const w = cross[2];
        if (w === 0) {
            return undefined;
        }
        return Vec2Math.set(cross[0] / w, cross[1] / w, out);
    }
}
ClippedPathStream.vec2Cache = [new Float64Array(2), new Float64Array(2), new Float64Array(2), new Float64Array(2)];
ClippedPathStream.vec3Cache = [new Float64Array(3), new Float64Array(3)];
ClippedPathStream.intersectionCache = Array.from({ length: 8 }, () => {
    return { point: new Float64Array(2), radial: 0 };
});

/**
 * A path stream which transforms a path stream in geographic spherical coordinates to one in projected planar
 * coordinates.
 */
class GeoProjectionPathStream extends AbstractTransformingPathStream {
    // eslint-disable-next-line jsdoc/require-jsdoc
    constructor(consumer, projection, arg1, arg2, arg3) {
        super(consumer);
        this.projection = projection;
        this.firstPoint = new GeoPoint(NaN, NaN);
        this.prevPoint = new GeoPoint(NaN, NaN);
        this.prevPointProjected = new Float64Array(2);
        this.resampleHandler = this.onResampled.bind(this);
        if (arg1 instanceof GeoCircleResampler) {
            this.resampler = arg1;
        }
        else {
            this.resampler = new GeoCircleResampler(arg1, arg2, arg3);
        }
    }
    /**
     * Gets the projection used by this stream.
     * @returns The projection used by this stream.
     */
    getProjection() {
        return this.projection;
    }
    /**
     * Sets the projection used by this stream.
     * @param projection A projection.
     */
    setProjection(projection) {
        this.projection = projection;
    }
    /** @inheritdoc */
    beginPath() {
        this.reset();
        this.consumer.beginPath();
    }
    /**
     * Moves to a specified point.
     * @param lon The longitude of the point to which to move, in degrees.
     * @param lat The latitude of the point to which to move, in degrees.
     */
    moveTo(lon, lat) {
        if (!(isFinite(lon) && isFinite(lat))) {
            return;
        }
        if (isNaN(this.firstPoint.lat)) {
            this.firstPoint.set(lat, lon);
        }
        this.prevPoint.set(lat, lon);
        const projected = this.projection.project(this.prevPoint, this.prevPointProjected);
        this.consumer.moveTo(projected[0], projected[1]);
    }
    /**
     * Paths a great-circle arc from the current point to a specified point.
     * @param lon The longitude of the end point, in degrees.
     * @param lat The latitude of the end point, in degrees.
     * @throws Error if the specified point is antipodal to the last pathed point.
     */
    lineTo(lon, lat) {
        if (!(isFinite(lon) && isFinite(lat))) {
            return;
        }
        if (!isNaN(this.prevPoint.lat) && this.prevPoint.equals(lat, lon)) {
            return;
        }
        if (isNaN(this.prevPoint.lat)) {
            this.moveTo(lon, lat);
            return;
        }
        const point = GeoProjectionPathStream.geoPointCache[0].set(lat, lon);
        const circle = GeoProjectionPathStream.geoCircleCache[0].setAsGreatCircle(this.prevPoint, point);
        if (!isFinite(circle.center[0])) {
            throw new Error(`Cannot unambiguously path a great circle from ${this.prevPoint.lat} lat, ${this.prevPoint.lon} lon to ${lat} lat, ${lon} lon`);
        }
        this.resampler.resample(this.projection, circle, this.prevPoint, point, this.resampleHandler);
        this.prevPoint.set(lat, lon);
    }
    /**
     * Not supported by this path stream.
     * @throws Error when called.
     */
    bezierCurveTo() {
        throw new Error('GeodesicResamplerStream: bezierCurveTo() is not supported');
    }
    /**
     * Not supported by this path stream.
     * @throws Error when called.
     */
    quadraticCurveTo() {
        throw new Error('GeodesicResamplerStream: quadraticCurveTo() is not supported');
    }
    /**
     * Paths a small-circle arc.
     * @param lon The longitude of the center of the circle containing the arc, in degrees.
     * @param lat The latitude of the center of the circle containing the arc, in degrees.
     * @param radius The radius of the arc, in great-arc radians.
     * @param startAngle If the center of the circle containing the arc is not one of the poles, the true bearing, in
     * degrees, from the center of the circle to the start of the arc; otherwise the longitude, in degrees, of the start
     * of the arc.
     * @param endAngle If the center of the circle containing the arc is not one of the poles, the true bearing, in
     * degrees, from the center of the circle to the end of the arc; otherwise the longitude, in degrees, of the end of
     * the arc.
     * @param counterClockwise Whether the arc should be drawn counterclockwise. False by default.
     */
    arc(lon, lat, radius, startAngle, endAngle, counterClockwise) {
        if (!(isFinite(lon) && isFinite(lat) && isFinite(radius) && isFinite(startAngle) && isFinite(endAngle))) {
            return;
        }
        if (radius === 0 || Math.abs(startAngle - endAngle) <= GeoCircle.ANGULAR_TOLERANCE * Avionics.Utils.RAD2DEG) {
            return;
        }
        if (MathUtils.diffAngle(startAngle * Avionics.Utils.DEG2RAD, endAngle * Avionics.Utils.DEG2RAD, false) <= GeoCircle.ANGULAR_TOLERANCE) {
            // Since we early return above if startAngle and endAngle are equal, hitting this case means they are a multiple
            // of 360 degrees apart. The resampler will interpret them as being the same point and won't draw a full circle
            // so we will split the arc into two.
            const midAngle = startAngle + 180 * Math.sign(endAngle - startAngle);
            this.arc(lon, lat, radius, startAngle, midAngle, counterClockwise);
            this.arc(lon, lat, radius, midAngle, endAngle, counterClockwise);
            return;
        }
        const center = GeoProjectionPathStream.geoPointCache[1].set(lat, lon);
        const start = GeoProjectionPathStream.geoPointCache[2];
        const end = GeoProjectionPathStream.geoPointCache[3];
        if (Math.abs(lat) >= 90 - GeoCircle.ANGULAR_TOLERANCE * Avionics.Utils.RAD2DEG) {
            // The center of the arc circle is one of the poles
            const circleLat = Math.sign(lat) * (MathUtils.HALF_PI - radius) * Avionics.Utils.RAD2DEG;
            start.set(circleLat, startAngle);
            end.set(circleLat, endAngle);
        }
        else {
            center.offset(startAngle, radius, start);
            center.offset(endAngle, radius, end);
        }
        if (isNaN(start.lat) || isNaN(start.lon) || isNaN(end.lat) || isNaN(end.lon)) {
            return;
        }
        if (isNaN(this.prevPoint.lat)) {
            this.moveTo(start.lon, start.lat);
        }
        else if (!start.equals(this.prevPoint)) {
            this.lineTo(start.lon, start.lat);
        }
        const circle = GeoProjectionPathStream.geoCircleCache[0].set(center, radius);
        if (!counterClockwise) {
            circle.reverse();
        }
        this.resampler.resample(this.projection, circle, start, end, this.resampleHandler);
        this.prevPoint.set(end);
    }
    /**
     * Paths a great-circle arc from the current point to the first point defined by the current path.
     */
    closePath() {
        if (!isNaN(this.firstPoint.lat)) {
            this.lineTo(this.firstPoint.lon, this.firstPoint.lat);
        }
    }
    /**
     * Resets the state of this stream.
     */
    reset() {
        this.firstPoint.set(NaN, NaN);
        this.prevPoint.set(NaN, NaN);
    }
    /**
     * Handles resampled points.
     * @param vector A vector which describes the projected path terminating at the resampled point.
     */
    onResampled(vector) {
        switch (vector.type) {
            case 'start':
                return;
            case 'line':
                this.consumer.lineTo(vector.projected[0], vector.projected[1]);
                break;
            case 'arc':
                this.consumer.arc(vector.projectedArcCenter[0], vector.projectedArcCenter[1], vector.projectedArcRadius, vector.projectedArcStartAngle, vector.projectedArcEndAngle, vector.projectedArcStartAngle > vector.projectedArcEndAngle);
                break;
        }
        Vec2Math.copy(vector.projected, this.prevPointProjected);
    }
}
GeoProjectionPathStream.geoPointCache = [new GeoPoint(0, 0), new GeoPoint(0, 0), new GeoPoint(0, 0), new GeoPoint(0, 0)];
GeoProjectionPathStream.geoCircleCache = [new GeoCircle(new Float64Array(3), 0)];

/**
 * A {@link TransformingPathStream} which applies an affine transformation to its input.
 *
 * The types of transformation supported by this class are:
 * * Translation.
 * * Uniform scaling.
 * * Rotation.
 */
class AffineTransformPathStream extends AbstractTransformingPathStream {
    constructor() {
        super(...arguments);
        this.transform = new Transform2D();
        this.concatCache = [];
        this.scale = 1;
        this.rotation = 0;
    }
    /**
     * Adds a translation to this stream's transformation.
     * @param x The x translation.
     * @param y The y translation.
     * @param order The order in which to add the translation (defaults to `'after'`):
     * * `'before'` - Applies the translation before this stream's current transformation.
     * * `'after'` - Applies the translation after this stream's current transformation.
     * @returns This stream, after its transformation has been changed.
     */
    addTranslation(x, y, order = 'after') {
        const translation = AffineTransformPathStream.transformCache[0].toTranslation(x, y);
        if (order === 'before') {
            this.concatCache[0] = translation;
            this.concatCache[1] = this.transform;
        }
        else {
            this.concatCache[0] = this.transform;
            this.concatCache[1] = translation;
        }
        Transform2D.concat(this.transform, this.concatCache);
        return this;
    }
    /**
     * Adds a uniform scaling to this stream's transformation.
     * @param factor The scaling factor.
     * @param order The order in which to add the translation (defaults to `'after'`):
     * * `'before'` - Applies the scaling before this stream's current transformation.
     * * `'after'` - Applies the scaling after this stream's current transformation.
     * @returns This stream, after its transformation has been changed.
     */
    addScale(factor, order = 'after') {
        const scale = AffineTransformPathStream.transformCache[0].toScale(factor, factor);
        if (order === 'before') {
            this.concatCache[0] = scale;
            this.concatCache[1] = this.transform;
        }
        else {
            this.concatCache[0] = this.transform;
            this.concatCache[1] = scale;
        }
        Transform2D.concat(this.transform, this.concatCache);
        this.updateScaleRotation();
        return this;
    }
    /**
     * Adds a rotation to this stream's transformation.
     * @param angle The rotation angle, in radians.
     * @param order The order in which to add the translation (defaults to `'after'`):
     * * `'before'` - Applies the rotation before this stream's current transformation.
     * * `'after'` - Applies the rotation after this stream's current transformation.
     * @returns This stream, after its transformation has been changed.
     */
    addRotation(angle, order = 'after') {
        const rotation = AffineTransformPathStream.transformCache[0].toRotation(angle);
        if (order === 'before') {
            this.concatCache[0] = rotation;
            this.concatCache[1] = this.transform;
        }
        else {
            this.concatCache[0] = this.transform;
            this.concatCache[1] = rotation;
        }
        Transform2D.concat(this.transform, this.concatCache);
        this.updateScaleRotation();
        return this;
    }
    /**
     * Resets this stream's transformation to the identity transformation.
     * @returns This stream, after its transformation has been changed.
     */
    resetTransform() {
        this.transform.toIdentity();
        this.updateScaleRotation();
        return this;
    }
    /** @inheritdoc */
    beginPath() {
        this.consumer.beginPath();
    }
    /** @inheritdoc */
    moveTo(x, y) {
        const transformed = this.applyTransform(x, y);
        this.consumer.moveTo(transformed[0], transformed[1]);
    }
    /** @inheritdoc */
    lineTo(x, y) {
        const transformed = this.applyTransform(x, y);
        this.consumer.lineTo(transformed[0], transformed[1]);
    }
    /** @inheritdoc */
    bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
        const cp1Transformed = this.applyTransform(cp1x, cp1y);
        cp1x = cp1Transformed[0];
        cp1y = cp1Transformed[1];
        const cp2Transformed = this.applyTransform(cp2x, cp2y);
        cp2x = cp2Transformed[0];
        cp2y = cp2Transformed[1];
        const endTransformed = this.applyTransform(x, y);
        x = endTransformed[0];
        y = endTransformed[1];
        this.consumer.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
    }
    /** @inheritdoc */
    quadraticCurveTo(cpx, cpy, x, y) {
        const cpTransformed = this.applyTransform(cpx, cpy);
        cpx = cpTransformed[0];
        cpy = cpTransformed[1];
        const endTransformed = this.applyTransform(x, y);
        x = endTransformed[0];
        y = endTransformed[1];
        this.consumer.quadraticCurveTo(cpx, cpy, x, y);
    }
    /** @inheritdoc */
    arc(x, y, radius, startAngle, endAngle, counterClockwise) {
        const transformed = this.applyTransform(x, y);
        this.consumer.arc(transformed[0], transformed[1], radius * this.scale, startAngle + this.rotation, endAngle + this.rotation, counterClockwise);
    }
    /** @inheritdoc */
    closePath() {
        this.consumer.closePath();
    }
    /**
     * Updates this stream's cached scale and rotation values from its transformation.
     */
    updateScaleRotation() {
        const params = this.transform.getParameters();
        this.scale = Math.sqrt(params[0] * params[0] + params[3] * params[3]);
        this.rotation = Math.atan2(params[3], params[0]);
    }
    /**
     * Applies this stream's transformation to a point.
     * @param x The x-coordinate of the point to transform.
     * @param y The y-coordinate of the point to transform.
     * @returns The transformed point.
     */
    applyTransform(x, y) {
        const vec = Vec2Math.set(x, y, AffineTransformPathStream.vec2Cache[0]);
        return this.transform.apply(vec, vec);
    }
}
AffineTransformPathStream.vec2Cache = [new Float64Array(2)];
AffineTransformPathStream.transformCache = [new Transform2D()];

/**
 * A stack of {@link TransformingPathStream}s. Inputs are passed through the entire stack from top to bottom before the
 * final transformed output is sent to a consuming stream.
 */
class TransformingPathStreamStack extends AbstractTransformingPathStream {
    constructor() {
        super(...arguments);
        this.stack = [];
    }
    /**
     * Adds a transforming path stream to the top of this stack.
     * @param stream A transforming path stream.
     */
    push(stream) {
        var _a;
        stream.setConsumer((_a = this.stack[this.stack.length - 1]) !== null && _a !== void 0 ? _a : this.consumer);
        this.stack.push(stream);
    }
    /**
     * Removes the top-most path stream from this stack. The removed stream will have its consumer set to
     * {@link NullPathStream.INSTANCE}.
     * @returns The removed path stream, or undefined if this stack was empty.
     */
    pop() {
        const removed = this.stack.pop();
        removed === null || removed === void 0 ? void 0 : removed.setConsumer(NullPathStream.INSTANCE);
        return removed;
    }
    /**
     * Adds a transforming path stream to the bottom of this stack.
     * @param stream A transforming path stream.
     */
    unshift(stream) {
        const displaced = this.stack[0];
        displaced === null || displaced === void 0 ? void 0 : displaced.setConsumer(stream);
        stream.setConsumer(this.consumer);
        this.stack.unshift(stream);
    }
    /**
     * Removes the bottom-most path stream from this stack. The removed stream will have its consumer set to
     * {@link NullPathStream.INSTANCE}.
     * @returns The removed path stream, or undefined if this stack was empty.
     */
    shift() {
        var _a;
        const removed = this.stack.shift();
        removed === null || removed === void 0 ? void 0 : removed.setConsumer(NullPathStream.INSTANCE);
        (_a = this.stack[0]) === null || _a === void 0 ? void 0 : _a.setConsumer(this.consumer);
        return removed;
    }
    /** @inheritdoc */
    setConsumer(consumer) {
        var _a;
        (_a = this.stack[0]) === null || _a === void 0 ? void 0 : _a.setConsumer(consumer);
        super.setConsumer(consumer);
    }
    /** @inheritdoc */
    beginPath() {
        var _a;
        ((_a = this.stack[this.stack.length - 1]) !== null && _a !== void 0 ? _a : this.consumer).beginPath();
    }
    /** @inheritdoc */
    moveTo(x, y) {
        var _a;
        ((_a = this.stack[this.stack.length - 1]) !== null && _a !== void 0 ? _a : this.consumer).moveTo(x, y);
    }
    /** @inheritdoc */
    lineTo(x, y) {
        var _a;
        ((_a = this.stack[this.stack.length - 1]) !== null && _a !== void 0 ? _a : this.consumer).lineTo(x, y);
    }
    /** @inheritdoc */
    bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
        var _a;
        ((_a = this.stack[this.stack.length - 1]) !== null && _a !== void 0 ? _a : this.consumer).bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
    }
    /** @inheritdoc */
    quadraticCurveTo(cpx, cpy, x, y) {
        var _a;
        ((_a = this.stack[this.stack.length - 1]) !== null && _a !== void 0 ? _a : this.consumer).quadraticCurveTo(cpx, cpy, x, y);
    }
    /** @inheritdoc */
    arc(x, y, radius, startAngle, endAngle, counterClockwise) {
        var _a;
        ((_a = this.stack[this.stack.length - 1]) !== null && _a !== void 0 ? _a : this.consumer).arc(x, y, radius, startAngle, endAngle, counterClockwise);
    }
    /** @inheritdoc */
    closePath() {
        this.stack[this.stack.length - 1].closePath();
    }
}

/**
 * A stack of {@link TransformingPathStream}s which transforms an input in spherical geographic coordinates to planar
 * projected coordinates. The stack contains two sub-stacks: a pre-projected stack which transforms the path before
 * it is projected, and a post-projected stack which transforms the projected path before it is sent to the consumer.
 * Transforming streams can be added to the top and bottom of each sub-stack. The input will be passed through each
 * stream in the pre-projected stack from top to bottom, then projected, then passed through each stream in the post-
 * projected stack from top to bottom, and the final transformed output will be passed to the consumer.
 */
class GeoProjectionPathStreamStack extends AbstractTransformingPathStream {
    // eslint-disable-next-line jsdoc/require-jsdoc
    constructor(consumer, projection, arg1, arg2, arg3) {
        super(consumer);
        this.postStack = new TransformingPathStreamStack(consumer);
        if (arg1 instanceof GeoCircleResampler) {
            this.projectionStream = new GeoProjectionPathStream(this.postStack, projection, arg1);
        }
        else {
            this.projectionStream = new GeoProjectionPathStream(this.postStack, projection, arg1, arg2, arg3);
        }
        this.preStack = new TransformingPathStreamStack(this.projectionStream);
    }
    /**
     * Gets the projection used by this stream.
     * @returns The projection used by this stream.
     */
    getProjection() {
        return this.projectionStream.getProjection();
    }
    /**
     * Sets the projection used by this stream.
     * @param projection A projection.
     */
    setProjection(projection) {
        this.projectionStream.setProjection(projection);
    }
    /**
     * Adds a transforming path stream to the top of the pre-projected stack.
     * @param stream A transforming path stream.
     */
    pushPreProjected(stream) {
        this.preStack.push(stream);
    }
    /**
     * Removes the top-most path stream from the pre-projected stack. The removed stream will have its consumer set to
     * {@link NullPathStream.INSTANCE}.
     * @returns The removed path stream, or undefined if this stack was empty.
     */
    popPreProjected() {
        return this.preStack.pop();
    }
    /**
     * Adds a transforming path stream to the bottom of the pre-projected stack.
     * @param stream A transforming path stream.
     */
    unshiftPreProjected(stream) {
        this.preStack.unshift(stream);
    }
    /**
     * Removes the bottom-most path stream from the pre-projected stack. The removed stream will have its consumer set to
     * {@link NullPathStream.INSTANCE}.
     * @returns The removed path stream, or undefined if this stack was empty.
     */
    shiftPreProjected() {
        return this.preStack.shift();
    }
    /**
     * Adds a transforming path stream to the top of the post-projected stack.
     * @param stream A transforming path stream.
     */
    pushPostProjected(stream) {
        this.postStack.push(stream);
    }
    /**
     * Removes the top-most path stream from the post-projected stack. The removed stream will have its consumer set to
     * {@link NullPathStream.INSTANCE}.
     * @returns The removed path stream, or undefined if this stack was empty.
     */
    popPostProjected() {
        return this.postStack.pop();
    }
    /**
     * Adds a transforming path stream to the bottom of the post-projected stack.
     * @param stream A transforming path stream.
     */
    unshiftPostProjected(stream) {
        this.postStack.unshift(stream);
    }
    /**
     * Removes the bottom-most path stream from the post-projected stack. The removed stream will have its consumer set
     * to {@link NullPathStream.INSTANCE}.
     * @returns The removed path stream, or undefined if this stack was empty.
     */
    shiftPostProjected() {
        return this.postStack.shift();
    }
    /** @inheritdoc */
    setConsumer(consumer) {
        this.postStack.setConsumer(consumer);
        super.setConsumer(consumer);
    }
    /** @inheritdoc */
    beginPath() {
        this.preStack.beginPath();
    }
    /** @inheritdoc */
    moveTo(x, y) {
        this.preStack.moveTo(x, y);
    }
    /** @inheritdoc */
    lineTo(x, y) {
        this.preStack.lineTo(x, y);
    }
    /** @inheritdoc */
    bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
        this.preStack.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
    }
    /** @inheritdoc */
    quadraticCurveTo(cpx, cpy, x, y) {
        this.preStack.quadraticCurveTo(cpx, cpy, x, y);
    }
    /** @inheritdoc */
    arc(x, y, radius, startAngle, endAngle, counterClockwise) {
        this.preStack.arc(x, y, radius, startAngle, endAngle, counterClockwise);
    }
    /** @inheritdoc */
    closePath() {
        this.preStack.closePath();
    }
}
[new GeoPoint(0, 0), new GeoPoint(0, 0)];

/**
 * Parts of a flight plan leg path to render.
 */
var FlightPathLegRenderPart;
(function (FlightPathLegRenderPart) {
    /** None. */
    FlightPathLegRenderPart[FlightPathLegRenderPart["None"] = 0] = "None";
    /** The ingress transition. */
    FlightPathLegRenderPart[FlightPathLegRenderPart["Ingress"] = 1] = "Ingress";
    /** The base path. */
    FlightPathLegRenderPart[FlightPathLegRenderPart["Base"] = 2] = "Base";
    /** The egress transition. */
    FlightPathLegRenderPart[FlightPathLegRenderPart["Egress"] = 4] = "Egress";
    /** The entire leg path. */
    FlightPathLegRenderPart[FlightPathLegRenderPart["All"] = 7] = "All";
})(FlightPathLegRenderPart || (FlightPathLegRenderPart = {}));
[new GeoPoint(0, 0), new GeoPoint(0, 0)];
[new GeoCircle(new Float64Array(3), 0)];
[new GeoCircle(new Float64Array(3), 0), new GeoCircle(new Float64Array(3), 0)];
[new GeoCircle(new Float64Array(3), 0)];
[new GeoCircle(new Float64Array(3), 0)];
[new GeoPoint(0, 0)];
[new GeoPoint(0, 0)];
[new Transform2D(), new Transform2D()];
[new GeoPoint(0, 0), new GeoPoint(0, 0)];
[Vec2Math.create(), Vec2Math.create()];
[Vec3Math.create(), Vec3Math.create()];

/**
 * Map own airplane icon orientations.
 */
var MapOwnAirplaneIconOrientation;
(function (MapOwnAirplaneIconOrientation) {
    MapOwnAirplaneIconOrientation["HeadingUp"] = "HeadingUp";
    MapOwnAirplaneIconOrientation["TrackUp"] = "TrackUp";
    MapOwnAirplaneIconOrientation["MapUp"] = "MapUp";
})(MapOwnAirplaneIconOrientation || (MapOwnAirplaneIconOrientation = {}));

/**
 * An abstract implementation of {@link CssTransform}
 */
class AbstractCssTransform {
    /**
     * Constructor.
     * @param initialParams The transform's initial parameters.
     */
    constructor(initialParams) {
        this.params = new Float64Array(initialParams);
        this.cachedParams = new Float64Array(initialParams);
    }
    /** @inheritdoc */
    resolve() {
        if (this.stringValue !== undefined && VecNMath.equals(this.params, this.cachedParams)) {
            return this.stringValue;
        }
        VecNMath.copy(this.params, this.cachedParams);
        this.stringValue = this.buildString(this.params);
        return this.stringValue;
    }
}
/**
 * A CSS `matrix` transform.
 */
class CssMatrixTransform extends AbstractCssTransform {
    /**
     * Creates a new instance of a CSS `matrix` transform, initialized to the identity transformation.
     */
    constructor() {
        super(CssMatrixTransform.DEFAULT_PARAMS);
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    set(arg1, skewY, skewX, scaleY, translateX, translateY) {
        let scaleX;
        if (typeof arg1 === 'number') {
            scaleX = arg1;
        }
        else {
            [scaleX, skewX, skewY, scaleY, translateX, translateY] = arg1.getParameters();
        }
        this.params[0] = scaleX;
        this.params[1] = skewY;
        this.params[2] = skewX;
        this.params[3] = scaleY;
        this.params[4] = translateX;
        this.params[5] = translateY;
    }
    /** @inheritdoc */
    buildString(params) {
        return `matrix(${params.join(', ')})`;
    }
}
CssMatrixTransform.DEFAULT_PARAMS = [1, 0, 0, 1, 0, 0];
/**
 * A CSS `rotate` transform.
 */
class CssRotateTransform extends AbstractCssTransform {
    /**
     * Creates a new instance of a CSS `rotate` transform, initialized to zero rotation.
     * @param unit The angle unit to use for this transform.
     */
    constructor(unit) {
        super(CssRotateTransform.DEFAULT_PARAMS);
        this.unit = unit;
    }
    /**
     * Sets this transform's rotation angle.
     * @param angle The angle to set.
     * @param precision The precision with which to set the angle. A value of `0` denotes infinite precision. Defaults
     * to `0`.
     */
    set(angle, precision = 0) {
        this.params[0] = precision === 0 ? angle : MathUtils.round(angle, precision);
    }
    /** @inheritdoc */
    buildString(params) {
        return `rotate(${params[0]}${this.unit})`;
    }
}
CssRotateTransform.DEFAULT_PARAMS = [0];
/**
 * A CSS `rotate3d` transform.
 */
class CssRotate3dTransform extends AbstractCssTransform {
    /**
     * Creates a new instance of a CSS `rotate3d` transform, initialized to zero rotation about the z axis.
     * @param unit The angle unit to use for this transform.
     */
    constructor(unit) {
        super(CssRotate3dTransform.DEFAULT_PARAMS);
        this.unit = unit;
    }
    /**
     * Sets this transform's rotation.
     * @param x The x component of the rotation axis vector.
     * @param y The y component of the rotation axis vector.
     * @param z The z component of the rotation axis vector.
     * @param angle The rotation angle to set.
     * @param precision The precision with which to set the angle. A value of `0` denotes infinite precision. Defaults
     * to `0`.
     */
    set(x, y, z, angle, precision = 0) {
        this.params[0] = x;
        this.params[1] = y;
        this.params[2] = z;
        this.params[3] = precision === 0 ? angle : MathUtils.round(angle, precision);
    }
    /** @inheritdoc */
    buildString(params) {
        return `rotate3d(${params[0]}, ${params[1]}, ${params[2]}, ${params[3]}${this.unit})`;
    }
}
CssRotate3dTransform.DEFAULT_PARAMS = [0, 0, 1, 0];
/**
 * A CSS `translateX` transform.
 */
class CssTranslateXTransform extends AbstractCssTransform {
    /**
     * Creates a new instance of a CSS `translateX` transform, initialized to zero translation.
     * @param unit The unit to use for this transform.
     */
    constructor(unit) {
        super(CssTranslateXTransform.DEFAULT_PARAMS);
        this.unit = unit;
    }
    /**
     * Sets this transform's translation.
     * @param x The translation to set.
     * @param precision The precision with which to set the translation. A value of `0` denotes infinite precision.
     * Defaults to `0`.
     */
    set(x, precision = 0) {
        this.params[0] = precision === 0 ? x : MathUtils.round(x, precision);
    }
    /** @inheritdoc */
    buildString(params) {
        return `translateX(${params[0]}${this.unit})`;
    }
}
CssTranslateXTransform.DEFAULT_PARAMS = [0];
/**
 * A CSS `translateY` transform.
 */
class CssTranslateYTransform extends AbstractCssTransform {
    /**
     * Creates a new instance of a CSS `translateY` transform, initialized to zero translation.
     * @param unit The unit to use for this transform.
     */
    constructor(unit) {
        super(CssTranslateYTransform.DEFAULT_PARAMS);
        this.unit = unit;
    }
    /**
     * Sets this transform's translation.
     * @param y The translation to set.
     * @param precision The precision with which to set the translation. A value of `0` denotes infinite precision.
     * Defaults to `0`.
     */
    set(y, precision = 0) {
        this.params[0] = precision === 0 ? y : MathUtils.round(y, precision);
    }
    /** @inheritdoc */
    buildString(params) {
        return `translateY(${params[0]}${this.unit})`;
    }
}
CssTranslateYTransform.DEFAULT_PARAMS = [0];
/**
 * A CSS `translateZ` transform.
 */
class CssTranslateZTransform extends AbstractCssTransform {
    /**
     * Creates a new instance of a CSS `translateZ` transform, initialized to zero translation.
     * @param unit The unit to use for this transform.
     */
    constructor(unit) {
        super(CssTranslateZTransform.DEFAULT_PARAMS);
        this.unit = unit;
    }
    /**
     * Sets this transform's translation.
     * @param z The translation to set.
     * @param precision The precision with which to set the translation. A value of `0` denotes infinite precision.
     * Defaults to `0`.
     */
    set(z, precision = 0) {
        this.params[0] = precision === 0 ? z : MathUtils.round(z, precision);
    }
    /** @inheritdoc */
    buildString(params) {
        return `translateZ(${params[0]}${this.unit})`;
    }
}
CssTranslateZTransform.DEFAULT_PARAMS = [0];
/**
 * A CSS `translate` transform.
 */
class CssTranslateTransform extends AbstractCssTransform {
    /**
     * Creates a new instance of a CSS `translate` transform, initialized to zero translation.
     * @param unitX The unit to use for this transform's x translation.
     * @param unitY The unit to use for this transform's y translation. Defaults to the same unit as the x translation.
     */
    constructor(unitX, unitY = unitX) {
        super(CssTranslateTransform.DEFAULT_PARAMS);
        this.unitX = unitX;
        this.unitY = unitY;
    }
    /**
     * Sets this transform's translation.
     * @param x The x translation to set.
     * @param y The y translation to set.
     * @param precisionX The precision with which to set the x translation. A value of `0` denotes infinite precision.
     * Defaults to `0`.
     * @param precisionY The precision with which to set the y translation. A value of `0` denotes infinite precision.
     * Defaults to the x translation precision value.
     */
    set(x, y, precisionX = 0, precisionY = precisionX) {
        this.params[0] = precisionX === 0 ? x : MathUtils.round(x, precisionX);
        this.params[1] = precisionY === 0 ? y : MathUtils.round(y, precisionY);
    }
    /** @inheritdoc */
    buildString(params) {
        return `translate(${params[0]}${this.unitX}, ${params[1]}${this.unitY})`;
    }
}
CssTranslateTransform.DEFAULT_PARAMS = [0, 0];
/**
 * A CSS `translate3d` transform.
 */
class CssTranslate3dTransform extends AbstractCssTransform {
    /**
     * Creates a new instance of a CSS `translate3d` transform, initialized to zero translation.
     * @param unitX The unit to use for this transform's x translation.
     * @param unitY The unit to use for this transform's y translation. Defaults to the same unit as the x translation.
     * @param unitZ The unit to use for this transform's z translation. Defaults to the same unit as the x translation.
     */
    constructor(unitX, unitY = unitX, unitZ = unitX) {
        super(CssTranslate3dTransform.DEFAULT_PARAMS);
        this.unitX = unitX;
        this.unitY = unitY;
        this.unitZ = unitZ;
    }
    /**
     * Sets this transform's translation.
     * @param x The x translation to set.
     * @param y The y translation to set.
     * @param z The z translation to set.
     * @param precisionX The precision with which to set the x translation. A value of `0` denotes infinite precision.
     * Defaults to `0`.
     * @param precisionY The precision with which to set the y translation. A value of `0` denotes infinite precision.
     * Defaults to the x translation precision value.
     * @param precisionZ The precision with which to set the z translation. A value of `0` denotes infinite precision.
     * Defaults to the x translation precision value.
     */
    set(x, y, z, precisionX = 0, precisionY = precisionX, precisionZ = precisionX) {
        this.params[0] = precisionX === 0 ? x : MathUtils.round(x, precisionX);
        this.params[1] = precisionY === 0 ? y : MathUtils.round(y, precisionY);
        this.params[2] = precisionZ === 0 ? z : MathUtils.round(z, precisionZ);
    }
    /** @inheritdoc */
    buildString(params) {
        return `translate3d(${params[0]}${this.unitX}, ${params[1]}${this.unitY}, ${params[2]}${this.unitZ})`;
    }
}
CssTranslate3dTransform.DEFAULT_PARAMS = [0, 0, 0];
/**
 * A CSS `scaleX` transform.
 */
class CssScaleXTransform extends AbstractCssTransform {
    /**
     * Creates a new instance of a CSS `scaleX` transform, initialized to the identity scaling.
     */
    constructor() {
        super(CssScaleXTransform.DEFAULT_PARAMS);
    }
    /**
     * Sets this transform's scaling.
     * @param x The scaling to set.
     * @param precision The precision with which to set the scaling. A value of `0` denotes infinite precision. Defaults
     * to `0`.
     */
    set(x, precision = 0) {
        this.params[0] = precision === 0 ? x : MathUtils.round(x, precision);
    }
    /** @inheritdoc */
    buildString(params) {
        return `scaleX(${params[0]})`;
    }
}
CssScaleXTransform.DEFAULT_PARAMS = [1];
/**
 * A CSS `scaleY` transform.
 */
class CssScaleYTransform extends AbstractCssTransform {
    /**
     * Creates a new instance of a CSS `scaleY` transform, initialized to the identity scaling.
     */
    constructor() {
        super(CssScaleYTransform.DEFAULT_PARAMS);
    }
    /**
     * Sets this transform's scaling.
     * @param y The scaling to set.
     * @param precision The precision with which to set the scaling. A value of `0` denotes infinite precision. Defaults
     * to `0`.
     */
    set(y, precision = 0) {
        this.params[0] = precision === 0 ? y : MathUtils.round(y, precision);
    }
    /** @inheritdoc */
    buildString(params) {
        return `scaleY(${params[0]})`;
    }
}
CssScaleYTransform.DEFAULT_PARAMS = [1];
/**
 * A CSS `scaleZ` transform.
 */
class CssScaleZTransform extends AbstractCssTransform {
    /**
     * Creates a new instance of a CSS `scaleZ` transform, initialized to the identity scaling.
     */
    constructor() {
        super(CssScaleZTransform.DEFAULT_PARAMS);
    }
    /**
     * Sets this transform's scaling.
     * @param z The scaling to set.
     * @param precision The precision with which to set the scaling. A value of `0` denotes infinite precision. Defaults
     * to `0`.
     */
    set(z, precision = 0) {
        this.params[0] = precision === 0 ? z : MathUtils.round(z, precision);
    }
    /** @inheritdoc */
    buildString(params) {
        return `scaleZ(${params[0]})`;
    }
}
CssScaleZTransform.DEFAULT_PARAMS = [1];
/**
 * A CSS `scale` transform.
 */
class CssScaleTransform extends AbstractCssTransform {
    /**
     * Creates a new instance of a CSS `scale` transform, initialized to the identity scaling.
     */
    constructor() {
        super(CssScaleTransform.DEFAULT_PARAMS);
    }
    /**
     * Sets this transform's scaling.
     * @param x The x scaling to set.
     * @param y The y scaling to set.
     * @param precisionX The precision with which to set the x scaling. A value of `0` denotes infinite precision.
     * Defaults to `0`.
     * @param precisionY The precision with which to set the y scaling. A value of `0` denotes infinite precision.
     * Defaults to the x scaling precision value.
     */
    set(x, y, precisionX = 0, precisionY = precisionX) {
        this.params[0] = precisionX === 0 ? x : MathUtils.round(x, precisionX);
        this.params[1] = precisionY === 0 ? y : MathUtils.round(y, precisionY);
    }
    /** @inheritdoc */
    buildString(params) {
        return `scale(${params[0]}, ${params[1]})`;
    }
}
CssScaleTransform.DEFAULT_PARAMS = [1, 1];
/**
 * A CSS `scale3d` transform.
 */
class CssScale3dTransform extends AbstractCssTransform {
    /**
     * Creates a new instance of a CSS `scale3d` transform, initialized to the identity scaling.
     */
    constructor() {
        super(CssScale3dTransform.DEFAULT_PARAMS);
    }
    /**
     * Sets this transform's scaling.
     * @param x The x scaling to set.
     * @param y The y scaling to set.
     * @param z The z scaling to set.
     * @param precisionX The precision with which to set the x scaling. A value of `0` denotes infinite precision.
     * Defaults to `0`.
     * @param precisionY The precision with which to set the y scaling. A value of `0` denotes infinite precision.
     * Defaults to the x scaling precision value.
     * @param precisionZ The precision with which to set the z scaling. A value of `0` denotes infinite precision.
     * Defaults to the x scaling precision value.
     */
    set(x, y, z, precisionX = 0, precisionY = precisionX, precisionZ = precisionX) {
        this.params[0] = precisionX === 0 ? x : MathUtils.round(x, precisionX);
        this.params[1] = precisionY === 0 ? y : MathUtils.round(y, precisionY);
        this.params[2] = precisionZ === 0 ? z : MathUtils.round(y, precisionZ);
    }
    /** @inheritdoc */
    buildString(params) {
        return `scale3d(${params[0]}, ${params[1]}, ${params[2]})`;
    }
}
CssScale3dTransform.DEFAULT_PARAMS = [1, 1, 1];
/**
 * A concatenated chain of CSS transforms.
 */
class CssTransformChain {
    /**
     * Creates a new chain of CSS transforms.
     * @param transforms The individual child transforms that will constitute the new transform chain. The order of
     * the children passed to the constructor determines the order of concatenation. Concatenation follows the standard
     * CSS transform convention: for a concatenation of transforms `[A, B, C]`, the resulting transformation is
     * equivalent to the one produced by multiplying the transformation matrices in the order `(A * B) * C`.
     */
    constructor(...transforms) {
        this.stringValues = [];
        this.transforms = transforms;
    }
    /**
     * Gets one of this chain's child transforms.
     * @param index The index of the child to get.
     * @returns The child transform at the specified index in this chain.
     * @throws RangeError if `index` is out of bounds.
     */
    getChild(index) {
        if (index < 0 || index >= this.transforms.length) {
            throw new RangeError();
        }
        return this.transforms[index];
    }
    /** @inheritdoc */
    resolve() {
        let needRebuildString = false;
        for (let i = 0; i < this.transforms.length; i++) {
            const stringValue = this.transforms[i].resolve();
            if (this.stringValues[i] !== stringValue) {
                this.stringValues[i] = stringValue;
                needRebuildString = true;
            }
        }
        if (needRebuildString || this.chainedStringValue === undefined) {
            this.chainedStringValue = this.stringValues.join(' ');
        }
        return this.chainedStringValue;
    }
}
/**
 * A subscribable subject whose value is a CSS transform string resolved from a {@link CssTransform}.
 */
class CssTransformSubject extends AbstractSubscribable {
    /**
     * Constructor.
     * @param transform The new subject's CSS transform.
     */
    constructor(transform) {
        super();
        this._transform = transform;
        this.stringValue = transform.resolve();
        this.transform = transform;
    }
    /** @inheritdoc */
    get() {
        return this.stringValue;
    }
    /**
     * Resolves this subject's CSS transform to a CSS transform string, and sets this subject's value to the resolved
     * string. If this changes this subject's value, subscribers will be notified.
     */
    resolve() {
        const stringValue = this._transform.resolve();
        if (stringValue !== this.stringValue) {
            this.stringValue = stringValue;
            this.notify();
        }
    }
    /**
     * Creates a new instance of {@link CssTransformSubject} whose value is resolved from a CSS transform.
     * @param transform A CSS transform.
     * @returns A new instance of {@link CssTransformSubject} whose value is resolved from the specified CSS transform.
     */
    static create(transform) {
        return new CssTransformSubject(transform);
    }
}
/**
 * A utility class for building CSS transforms.
 */
class CssTransformBuilder {
    /**
     * Creates a new instance of a CSS `matrix` transform, initialized to the identity transformation.
     * @returns A new instance of a CSS `matrix` transform, initialized to the identity transformation.
     */
    static matrix() {
        return new CssMatrixTransform();
    }
    /**
     * Creates a new instance of a CSS `rotate` transform, initialized to zero rotation.
     * @param unit The angle unit to use for the new transform.
     * @returns A new instance of a CSS `rotate` transform, initialized to zero rotation.
     */
    static rotate(unit) {
        return new CssRotateTransform(unit);
    }
    /**
     * Creates a new instance of a CSS `rotate3d` transform, initialized to zero rotation about the z axis.
     * @param unit The angle unit to use for the new transform.
     * @returns A new instance of a CSS `rotate3d` transform, initialized to zero rotation about the z axis.
     */
    static rotate3d(unit) {
        return new CssRotate3dTransform(unit);
    }
    /**
     * Creates a new instance of a CSS `translateX` transform, initialized to zero translation.
     * @param unit The unit to use for the new transform.
     * @returns A new instance of a CSS `translateX` transform, initialized to zero translation.
     */
    static translateX(unit) {
        return new CssTranslateXTransform(unit);
    }
    /**
     * Creates a new instance of a CSS `translateY` transform, initialized to zero translation.
     * @param unit The unit to use for the new transform.
     * @returns A new instance of a CSS `translateY` transform, initialized to zero translation.
     */
    static translateY(unit) {
        return new CssTranslateYTransform(unit);
    }
    /**
     * Creates a new instance of a CSS `translateZ` transform, initialized to zero translation.
     * @param unit The unit to use for the new transform.
     * @returns A new instance of a CSS `translateZ` transform, initialized to zero translation.
     */
    static translateZ(unit) {
        return new CssTranslateZTransform(unit);
    }
    /**
     * Creates a new instance of a CSS `translate` transform, initialized to zero translation.
     * @param unitX The unit to use for the new transform's x translation.
     * @param unitY The unit to use for the new transform's y translation.
     * @returns A new instance of a CSS `translate` transform, initialized to zero translation.
     */
    static translate(unitX, unitY) {
        return new CssTranslateTransform(unitX, unitY);
    }
    /**
     * Creates a new instance of a CSS `translate3d` transform, initialized to zero translation.
     * @param unitX The unit to use for the new transform's x translation.
     * @param unitY The unit to use for the new transform's y translation.
     * @param unitZ The unit to use for the new transform's z translation.
     * @returns A new instance of a CSS `translate3d` transform, initialized to zero translation.
     */
    static translate3d(unitX, unitY, unitZ) {
        return new CssTranslate3dTransform(unitX, unitY, unitZ);
    }
    /**
     * Creates a new instance of a CSS `scaleX` transform, initialized to the identity scaling.
     * @returns A new instance of a CSS `scaleX` transform, initialized to the identity scaling.
     */
    static scaleX() {
        return new CssScaleXTransform();
    }
    /**
     * Creates a new instance of a CSS `scaleY` transform, initialized to the identity scaling.
     * @returns A new instance of a CSS `scaleY` transform, initialized to the identity scaling.
     */
    static scaleY() {
        return new CssScaleYTransform();
    }
    /**
     * Creates a new instance of a CSS `scaleZ` transform, initialized to the identity scaling.
     * @returns A new instance of a CSS `scaleZ` transform, initialized to the identity scaling.
     */
    static scaleZ() {
        return new CssScaleZTransform();
    }
    /**
     * Creates a new instance of a CSS `scale` transform, initialized to the identity scaling.
     * @returns A new instance of a CSS `scale` transform, initialized to the identity scaling.
     */
    static scale() {
        return new CssScaleTransform();
    }
    /**
     * Creates a new instance of a CSS `scale3d` transform, initialized to the identity scaling.
     * @returns A new instance of a CSS `scale3d` transform, initialized to the identity scaling.
     */
    static scale3d() {
        return new CssScale3dTransform();
    }
    /**
     * Concatenates zero or more CSS transformations.
     * @param transforms The individual transforms to concatentate. The order of the transforms passed to the function
     * determines the order of concatenation. Concatenation follows the standard CSS transform convention: for a
     * concatenation of transforms `[A, B, C]`, the resulting transformation is equivalent to the one produced by
     * multiplying the transformation matrices in the order `(A * B) * C`.
     * @returns A new {@link CssTransformChain} object representing the concatenation of the specified transforms.
     */
    static concat(...transforms) {
        return new CssTransformChain(...transforms);
    }
}

/**
 * A utility class for creating number formatters.
 *
 * Each number formatter is a function which generates output strings from input numeric values. The formatting
 * behavior of a formatter is defined by its options. Please refer to the {@link NumberFormatterOptions} type
 * documentation for more information on each individual option.
 */
class NumberFormatter {
    /**
     * Formats a number to a string.
     * @param number The number to format.
     * @param opts Options describing how to format the number.
     * @returns The formatted string representation of the specified number.
     */
    static formatNumber(number, opts) {
        if (isNaN(number)) {
            return opts.nanString;
        }
        const { precision, roundFunc, maxDigits, forceDecimalZeroes, pad, showCommas, useMinusSign, forceSign, cache } = opts;
        const sign = number < 0 ? -1 : 1;
        const abs = Math.abs(number);
        let rounded = abs;
        if (precision !== 0) {
            rounded = roundFunc(abs / precision) * precision;
        }
        if (cache) {
            if (opts.cachedString !== undefined && opts.cachedNumber === rounded) {
                return opts.cachedString;
            }
            opts.cachedNumber = rounded;
        }
        const signText = sign === -1
            ? useMinusSign ? '−' : '-'
            : '+';
        let formatted;
        if (precision != 0) {
            const precisionString = `${precision}`;
            const decimalIndex = precisionString.indexOf('.');
            if (decimalIndex >= 0) {
                formatted = rounded.toFixed(precisionString.length - decimalIndex - 1);
            }
            else {
                formatted = `${rounded}`;
            }
        }
        else {
            formatted = `${abs}`;
        }
        let decimalIndex = formatted.indexOf('.');
        if (!forceDecimalZeroes && decimalIndex >= 0) {
            formatted = formatted.replace(NumberFormatter.TRAILING_ZERO_REGEX, '');
            if (formatted.indexOf('.') == formatted.length - 1) {
                formatted = formatted.substring(0, formatted.length - 1);
            }
        }
        decimalIndex = formatted.indexOf('.');
        if (decimalIndex >= 0 && formatted.length - 1 > maxDigits) {
            const shift = Math.max(maxDigits - decimalIndex, 0);
            const shiftPrecision = Math.pow(0.1, shift);
            formatted = (roundFunc(abs / shiftPrecision) * shiftPrecision).toFixed(shift);
        }
        if (pad === 0) {
            formatted = formatted.replace(NumberFormatter.LEADING_ZERO_REGEX, '.');
        }
        else if (pad > 1) {
            decimalIndex = formatted.indexOf('.');
            if (decimalIndex < 0) {
                decimalIndex = formatted.length;
            }
            formatted = formatted.padStart(pad + formatted.length - decimalIndex, '0');
        }
        if (showCommas) {
            const parts = formatted.split('.');
            parts[0] = parts[0].replace(NumberFormatter.COMMAS_REGEX, ',');
            formatted = parts.join('.');
        }
        formatted = ((forceSign || signText !== '+') ? signText : '') + formatted;
        if (cache) {
            opts.cachedString = formatted;
        }
        return formatted;
    }
    /**
     * Creates a function which formats numeric values to strings. The formatting behavior of the function can be
     * customized using a number of options. Please refer to the {@link NumberFormatterOptions} type documentation for
     * more information on each individual option.
     * @param options Options to customize the formatter. Options not explicitly defined will be set to the following
     * default values:
     * * `precision = 0`
     * * `round = 0`
     * * `maxDigits = Infinity`
     * * `forceDecimalZeroes = true`
     * * `pad = 1`
     * * `showCommas = false`
     * * `useMinusSign = false`
     * * `forceSign = false`
     * * `nanString = 'NaN'`
     * * `cache = false`
     * @returns A function which formats numeric values to strings.
     */
    static create(options) {
        const optsToUse = Object.assign({}, NumberFormatter.DEFAULT_OPTIONS, options);
        optsToUse.roundFunc = NumberFormatter.roundFuncs[optsToUse.round];
        return (number) => {
            return NumberFormatter.formatNumber(number, optsToUse);
        };
    }
}
NumberFormatter.DEFAULT_OPTIONS = {
    precision: 0,
    round: 0,
    maxDigits: Infinity,
    forceDecimalZeroes: true,
    pad: 1,
    showCommas: false,
    useMinusSign: false,
    forceSign: false,
    nanString: 'NaN',
    cache: false
};
NumberFormatter.roundFuncs = {
    [-1]: Math.floor,
    [0]: Math.round,
    [1]: Math.ceil
};
NumberFormatter.TRAILING_ZERO_REGEX = /0+$/;
NumberFormatter.LEADING_ZERO_REGEX = /^0\./;
NumberFormatter.COMMAS_REGEX = /\B(?=(\d{3})+(?!\d))/g;

/**
 * A path stream which builds SVG path strings from its input path commands.
 */
class SvgPathStream {
    /**
     * Constructor.
     * @param precision The precision of this stream. All coordinates will be rounded to this stream's precision when
     * building the SVG path string. A value of `0` indicates infinite precision. Defaults to `0`.
     */
    constructor(precision = 0) {
        this.svgPath = '';
        this.firstPoint = new Float64Array([NaN, NaN]);
        this.prevPoint = new Float64Array([NaN, NaN]);
        this.precision = precision;
        this.formatter = NumberFormatter.create({ precision, forceDecimalZeroes: false });
    }
    /**
     * Gets the SVG path string describing all path commands consumed by this stream since the last call to
     * `beginPath()`.
     * @returns The SVG path string describing all path commands consumed by this stream since the last call to
     * `beginPath()`.
     */
    getSvgPath() {
        return this.svgPath.trim();
    }
    /**
     * Gets the precision of this stream. All coordinates will be rounded to this stream's precision when building the
     * SVG path string. A value of `0` indicates infinite precision.
     * @returns The precision of this stream.
     */
    getPrecision() {
        return this.precision;
    }
    /**
     * Sets the precision of this stream. All coordinates will be rounded to this stream's precision when building the
     * SVG path string. A value of `0` indicates infinite precision.
     * @param precision The precision of this stream. Negative numbers will be converted to their absolute values.
     */
    setPrecision(precision) {
        this.precision = Math.abs(precision);
        this.formatter = NumberFormatter.create({ precision: this.precision, forceDecimalZeroes: false });
    }
    /** @inheritdoc */
    beginPath() {
        this.reset();
    }
    /** @inheritdoc */
    moveTo(x, y) {
        if (!(isFinite(x) && isFinite(y))) {
            return;
        }
        if (isNaN(this.firstPoint[0])) {
            Vec2Math.set(x, y, this.firstPoint);
        }
        this.svgPath += `M ${this.formatter(x)} ${this.formatter(y)} `;
        Vec2Math.set(x, y, this.prevPoint);
    }
    /** @inheritdoc */
    lineTo(x, y) {
        if (!(isFinite(x) && isFinite(y))) {
            return;
        }
        if (isNaN(this.prevPoint[0])) {
            this.moveTo(x, y);
            return;
        }
        this.svgPath += `L ${this.formatter(x)} ${this.formatter(y)} `;
        Vec2Math.set(x, y, this.prevPoint);
    }
    /** @inheritdoc */
    bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
        if (!(isFinite(x) && isFinite(y) && isFinite(cp1x) && isFinite(cp1y) && isFinite(cp2x) && isFinite(cp2y))) {
            return;
        }
        if (isNaN(this.prevPoint[0])) {
            this.moveTo(x, y);
            return;
        }
        this.svgPath += `C ${this.formatter(cp1x)} ${this.formatter(cp1y)} ${this.formatter(cp2x)} ${this.formatter(cp2y)} ${this.formatter(x)} ${this.formatter(y)} `;
        Vec2Math.set(x, y, this.prevPoint);
    }
    /** @inheritdoc */
    quadraticCurveTo(cpx, cpy, x, y) {
        if (!(isFinite(x) && isFinite(y) && isFinite(cpx) && isFinite(cpy))) {
            return;
        }
        if (isNaN(this.prevPoint[0])) {
            this.moveTo(x, y);
            return;
        }
        this.svgPath += `Q ${this.formatter(cpx)} ${this.formatter(cpy)} ${this.formatter(x)} ${this.formatter(y)} `;
        Vec2Math.set(x, y, this.prevPoint);
    }
    /** @inheritdoc */
    arc(x, y, radius, startAngle, endAngle, counterClockwise) {
        if (!(isFinite(x) && isFinite(y) && isFinite(radius) && isFinite(startAngle) && isFinite(endAngle))) {
            return;
        }
        const directionSign = counterClockwise ? -1 : 1;
        if (Math.sign(endAngle - startAngle) !== directionSign) {
            // Replicate behavior of canvas context arc() when the sign of the difference between start and end angles
            // doesn't match the counterClockwise flag.
            const angleDiff = counterClockwise ? MathUtils.diffAngle(endAngle, startAngle) : MathUtils.diffAngle(startAngle, endAngle);
            endAngle = startAngle + angleDiff * directionSign;
        }
        // Clamp to 2pi because we don't need to draw anything past a full circle.
        const angularWidth = Math.min(MathUtils.TWO_PI, (endAngle - startAngle) * directionSign);
        if (angularWidth === MathUtils.TWO_PI) {
            // SVG arc commands cannot draw a full circle, so we need to split the circle into two half circles
            const midAngle = startAngle + Math.PI * directionSign;
            this.arc(x, y, radius, startAngle, midAngle, counterClockwise);
            this.arc(x, y, radius, midAngle, startAngle, counterClockwise);
            return;
        }
        const startPoint = Vec2Math.add(Vec2Math.set(x, y, SvgPathStream.vec2Cache[0]), Vec2Math.setFromPolar(radius, startAngle, SvgPathStream.vec2Cache[2]), SvgPathStream.vec2Cache[0]);
        if (isNaN(this.prevPoint[0])) {
            this.moveTo(startPoint[0], startPoint[1]);
        }
        else if (!Vec2Math.equals(this.prevPoint, startPoint)) {
            this.lineTo(startPoint[0], startPoint[1]);
        }
        const endPoint = Vec2Math.add(Vec2Math.set(x, y, SvgPathStream.vec2Cache[1]), Vec2Math.setFromPolar(radius, endAngle, SvgPathStream.vec2Cache[2]), SvgPathStream.vec2Cache[1]);
        const radiusString = this.formatter(radius);
        this.svgPath += `A ${radiusString} ${radiusString} 0 ${angularWidth > Math.PI ? 1 : 0} ${counterClockwise ? 0 : 1} ${this.formatter(endPoint[0])} ${this.formatter(endPoint[1])} `;
        Vec2Math.copy(endPoint, this.prevPoint);
    }
    /** @inheritdoc */
    closePath() {
        if (!isNaN(this.firstPoint[0])) {
            this.lineTo(this.firstPoint[0], this.firstPoint[1]);
        }
    }
    /**
     * Resets the state of this stream.
     */
    reset() {
        Vec2Math.set(NaN, NaN, this.firstPoint);
        Vec2Math.set(NaN, NaN, this.prevPoint);
        this.svgPath = '';
    }
}
SvgPathStream.vec2Cache = [new Float64Array(2), new Float64Array(2), new Float64Array(2), new Float64Array(2)];

/**
 * A collection of common keys used by the MapSystem API.
 */
class MapSystemKeys {
}
MapSystemKeys.TargetControl = 'targetControlModerator';
MapSystemKeys.RotationControl = 'rotationControlModerator';
MapSystemKeys.RangeControl = 'rangeControlModerator';
MapSystemKeys.ClockUpdate = 'clockUpdate';
MapSystemKeys.OwnAirplaneProps = 'ownAirplaneProps';
MapSystemKeys.AutopilotProps = 'autopilotProps';
MapSystemKeys.AltitudeArc = 'altitudeArc';
MapSystemKeys.TerrainColors = 'terrainColors';
MapSystemKeys.Weather = 'weather';
MapSystemKeys.FollowAirplane = 'followAirplane';
MapSystemKeys.Rotation = 'rotation';
MapSystemKeys.OwnAirplaneIcon = 'ownAirplaneIcon';
MapSystemKeys.OwnAirplaneIconOrientation = 'ownAirplaneIconOrientation';
MapSystemKeys.TextLayer = 'text';
MapSystemKeys.TextManager = 'textManager';
MapSystemKeys.Bing = 'bing';
MapSystemKeys.WaypointRenderer = 'waypointRenderer';
MapSystemKeys.IconFactory = 'iconFactory';
MapSystemKeys.LabelFactory = 'labelFactory';
MapSystemKeys.NearestWaypoints = 'nearestWaypoints';
MapSystemKeys.FlightPlan = 'flightPlan';
MapSystemKeys.FlightPlanner = 'flightPlanner';
MapSystemKeys.FlightPathRenderer = 'flightPathRenderer';
MapSystemKeys.Airspace = 'airspace';
MapSystemKeys.AirspaceManager = 'airspaceRenderManager';
MapSystemKeys.Traffic = 'traffic';
MapSystemKeys.DataIntegrity = 'dataIntegrity';

/**
 * An implementation of MapCanvasLayerCanvasInstance.
 */
class MapCanvasLayerCanvasInstanceClass {
    /**
     * Creates a new canvas instance.
     * @param canvas The canvas element.
     * @param context The canvas 2D rendering context.
     * @param isDisplayed Whether the canvas is displayed.
     */
    constructor(canvas, context, isDisplayed) {
        this.canvas = canvas;
        this.context = context;
        this.isDisplayed = isDisplayed;
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    reset() {
        const width = this.canvas.width;
        this.canvas.width = 0;
        this.canvas.width = width;
    }
}
/**
 * A layer which uses a canvas to draw graphics.
 */
class MapCanvasLayer extends MapLayer {
    constructor() {
        super(...arguments);
        this.displayCanvasRef = FSComponent.createRef();
        this.width = 0;
        this.height = 0;
        this.displayCanvasContext = null;
        this.isInit = false;
    }
    /**
     * Gets this layer's display canvas instance.
     * @returns This layer's display canvas instance.
     * @throws Error if this layer's display canvas instance has not been initialized.
     */
    get display() {
        if (!this._display) {
            throw new Error('MapCanvasLayer: attempted to access display before it was initialized');
        }
        return this._display;
    }
    /**
     * Gets this layer's buffer canvas instance.
     * @returns This layer's buffer canvas instance.
     * @throws Error if this layer's buffer canvas instance has not been initialized.
     */
    get buffer() {
        if (!this._buffer) {
            throw new Error('MapCanvasLayer: attempted to access buffer before it was initialized');
        }
        return this._buffer;
    }
    /**
     * Attempts to get this layer's display canvas instance.
     * @returns This layer's display canvas instance, or undefined if it has not been initialized.
     */
    tryGetDisplay() {
        return this._display;
    }
    /**
     * Attempts to get this layer's buffer canvas instance.
     * @returns This layer's buffer canvas instance, or undefined if it has not been initialized.
     */
    tryGetBuffer() {
        return this._buffer;
    }
    /**
     * Gets the width of the canvas element, in pixels.
     * @returns the width of the canvas element.
     */
    getWidth() {
        return this.width;
    }
    /**
     * Gets the height of the canvas element, in pixels.
     * @returns the height of the canvas element.
     */
    getHeight() {
        return this.height;
    }
    /**
     * Sets the width of the canvas element, in pixels.
     * @param width The new width.
     */
    setWidth(width) {
        if (width === this.width) {
            return;
        }
        this.width = width;
        if (this.isInit) {
            this.updateCanvasSize();
        }
    }
    /**
     * Sets the height of the canvas element, in pixels.
     * @param height The new height.
     */
    setHeight(height) {
        if (height === this.height) {
            return;
        }
        this.height = height;
        if (this.isInit) {
            this.updateCanvasSize();
        }
    }
    /**
     * Copies the contents of the buffer to the display. Has no effect if this layer does not have a buffer.
     */
    copyBufferToDisplay() {
        if (!this.isInit || !this.props.useBuffer) {
            return;
        }
        this.display.context.drawImage(this.buffer.canvas, 0, 0, this.width, this.height);
    }
    /**
     * A callback called after the component renders.
     */
    onAfterRender() {
        this.displayCanvasContext = this.displayCanvasRef.instance.getContext('2d');
    }
    // eslint-disable-next-line jsdoc/require-jsdoc, @typescript-eslint/no-unused-vars
    onVisibilityChanged(isVisible) {
        if (this.isInit) {
            this.updateCanvasVisibility();
        }
    }
    /**
     * Updates this layer according to its current visibility.
     */
    updateFromVisibility() {
        this.display.canvas.style.display = this.isVisible() ? 'block' : 'none';
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    onAttached() {
        this.initCanvasInstances();
        this.isInit = true;
        this.updateCanvasVisibility();
        this.updateCanvasSize();
    }
    /**
     * Initializes this layer's canvas instances.
     */
    initCanvasInstances() {
        this._display = this.createCanvasInstance(this.displayCanvasRef.instance, this.displayCanvasContext, true);
        if (this.props.useBuffer) {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            this._buffer = this.createCanvasInstance(canvas, context, false);
        }
    }
    /**
     * Creates a canvas instance.
     * @param canvas The canvas element.
     * @param context The canvas 2D rendering context.
     * @param isDisplayed Whether the canvas is displayed.
     * @returns a canvas instance.
     */
    createCanvasInstance(canvas, context, isDisplayed) {
        return new MapCanvasLayerCanvasInstanceClass(canvas, context, isDisplayed);
    }
    /**
     * Updates the canvas element's size.
     */
    updateCanvasSize() {
        const displayCanvas = this.display.canvas;
        displayCanvas.width = this.width;
        displayCanvas.height = this.height;
        displayCanvas.style.width = `${this.width}px`;
        displayCanvas.style.height = `${this.height}px`;
        if (this._buffer) {
            const bufferCanvas = this._buffer.canvas;
            bufferCanvas.width = this.width;
            bufferCanvas.height = this.height;
        }
    }
    /**
     * Updates the visibility of the display canvas.
     */
    updateCanvasVisibility() {
        this.display.canvas.style.display = this.isVisible() ? 'block' : 'none';
    }
    /** @inheritdoc */
    render() {
        var _a;
        return (FSComponent.buildComponent("canvas", { ref: this.displayCanvasRef, class: (_a = this.props.class) !== null && _a !== void 0 ? _a : '', width: '0', height: '0', style: 'position: absolute;' }));
    }
}

/**
 * A canvas map layer whose size and position is synced with the map projection window.
 */
class MapSyncedCanvasLayer extends MapCanvasLayer {
    // eslint-disable-next-line jsdoc/require-jsdoc
    onAttached() {
        super.onAttached();
        this.updateFromProjectedSize(this.props.mapProjection.getProjectedSize());
    }
    /**
     * Updates this layer according to the current size of the projected map window.
     * @param projectedSize The size of the projected map window.
     */
    updateFromProjectedSize(projectedSize) {
        this.setWidth(projectedSize[0]);
        this.setHeight(projectedSize[1]);
        const displayCanvas = this.display.canvas;
        displayCanvas.style.left = '0px';
        displayCanvas.style.top = '0px';
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    onMapProjectionChanged(mapProjection, changeFlags) {
        if (BitFlags.isAll(changeFlags, MapProjectionChangeType.ProjectedSize)) {
            this.updateFromProjectedSize(mapProjection.getProjectedSize());
        }
    }
}

/**
 * A map layer which displays an altitude intercept arc.
 */
class MapAltitudeArcLayer extends MapLayer {
    constructor() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        super(...arguments);
        this.layerRef = FSComponent.createRef();
        this.arcAngularWidth = ((_a = this.props.arcAngularWidth) !== null && _a !== void 0 ? _a : MapAltitudeArcLayer.DEFAULT_ARC_ANGULAR_WIDTH) * Avionics.Utils.DEG2RAD;
        this.arcRadius = (_b = this.props.arcRadius) !== null && _b !== void 0 ? _b : MapAltitudeArcLayer.DEFAULT_ARC_RADIUS;
        this.strokeWidth = (_c = this.props.strokeWidth) !== null && _c !== void 0 ? _c : MapAltitudeArcLayer.DEFAULT_STROKE_WIDTH;
        this.strokeStyle = (_d = this.props.strokeStyle) !== null && _d !== void 0 ? _d : MapAltitudeArcLayer.DEFAULT_STROKE_STYLE;
        this.strokeLineCap = (_e = this.props.strokeLineCap) !== null && _e !== void 0 ? _e : MapAltitudeArcLayer.DEFAULT_STROKE_LINECAP;
        this.outlineWidth = (_f = this.props.outlineWidth) !== null && _f !== void 0 ? _f : MapAltitudeArcLayer.DEFAULT_OUTLINE_WIDTH;
        this.outlineStyle = (_g = this.props.outlineStyle) !== null && _g !== void 0 ? _g : MapAltitudeArcLayer.DEFAULT_OUTLINE_STYLE;
        this.outlineLineCap = (_h = this.props.outlineLineCap) !== null && _h !== void 0 ? _h : MapAltitudeArcLayer.DEFAULT_OUTLINE_LINECAP;
        this.ownAirplanePropsModule = this.props.model.getModule(MapSystemKeys.OwnAirplaneProps);
        this.autopilotModule = this.props.model.getModule(MapSystemKeys.AutopilotProps);
        this.vsPrecisionFpm = ('isSubscribable' in this.props.verticalSpeedPrecision)
            ? this.vsPrecisionMap = this.props.verticalSpeedPrecision.map(v => v.asUnit(UnitType.FPM))
            : Subject.create(this.props.verticalSpeedPrecision.asUnit(UnitType.FPM));
        this.vsThresholdFpm = ('isSubscribable' in this.props.verticalSpeedThreshold)
            ? this.vsThresholdMap = this.props.verticalSpeedThreshold.map(v => v.asUnit(UnitType.FPM))
            : Subject.create(this.props.verticalSpeedThreshold.asUnit(UnitType.FPM));
        this.altDevThresholdFeet = ('isSubscribable' in this.props.altitudeDeviationThreshold)
            ? this.altDevThresholdMap = this.props.altitudeDeviationThreshold.map(v => v.asUnit(UnitType.FOOT))
            : Subject.create(this.props.altitudeDeviationThreshold.asUnit(UnitType.FOOT));
        this.vsFpm = this.ownAirplanePropsModule.verticalSpeed.map(vs => vs.asUnit(UnitType.FPM));
        this.vsFpmQuantized = MappedSubject.create(([vsFpm, precision]) => {
            return Math.round(vsFpm / precision) * precision;
        }, this.vsFpm, this.vsPrecisionFpm);
        this.projectedPlanePosition = Vec2Subject.create(Vec2Math.create());
        this.projectPlanePositionHandler = () => {
            const projected = this.props.mapProjection.project(this.ownAirplanePropsModule.position.get(), MapAltitudeArcLayer.vec2Cache[0]);
            this.projectedPlanePosition.set(projected);
        };
        this.isArcVisibleDynamic = MappedSubject.create(([vsFpm, alt, selectedAlt, vsThreshold, altDevThresholdFeet]) => {
            if (Math.abs(vsFpm) < vsThreshold) {
                return false;
            }
            const altDevFeet = selectedAlt.asUnit(UnitType.FOOT) - alt.asUnit(UnitType.FOOT);
            return Math.abs(altDevFeet) >= altDevThresholdFeet && altDevFeet * vsFpm > 0;
        }, this.vsFpmQuantized, this.ownAirplanePropsModule.altitude, this.autopilotModule.selectedAltitude, this.vsThresholdFpm, this.altDevThresholdFeet).pause();
        this.projectedArcPosition = Vec2Subject.create(Vec2Math.create());
        this.projectedArcAngle = Subject.create(0);
        this.needUpdate = false;
        this.subscriptions = [];
    }
    /** @inheritdoc */
    onVisibilityChanged(isVisible) {
        var _a;
        (_a = this.layerRef.getOrDefault()) === null || _a === void 0 ? void 0 : _a.setVisible(isVisible);
        if (isVisible) {
            this.needUpdate = true;
        }
    }
    /** @inheritdoc */
    onAttached() {
        var _a, _b;
        this.layerRef.instance.onAttached();
        this.subscriptions.push(this.ownAirplanePropsModule.position.sub(this.projectPlanePositionHandler));
        const scheduleUpdate = () => { this.needUpdate = true; };
        const altitudeArcModule = this.props.model.getModule(MapSystemKeys.AltitudeArc);
        const dataIntegrityModule = this.props.model.getModule(MapSystemKeys.DataIntegrity);
        this.isArcVisibleStatic = MappedSubject.create(([show, isGpsValid, isAdcValid]) => {
            return show && isGpsValid && isAdcValid;
        }, altitudeArcModule.show, (_a = dataIntegrityModule === null || dataIntegrityModule === void 0 ? void 0 : dataIntegrityModule.gpsSignalValid) !== null && _a !== void 0 ? _a : Subject.create(true), (_b = dataIntegrityModule === null || dataIntegrityModule === void 0 ? void 0 : dataIntegrityModule.adcSignalValid) !== null && _b !== void 0 ? _b : Subject.create(true));
        const isArcVisibleDynamicSub = this.isArcVisibleDynamic.sub(isVisible => { this.setVisible(isVisible); }, false, true);
        this.isArcVisibleStatic.sub(isVisible => {
            if (isVisible) {
                this.isArcVisibleDynamic.resume();
                isArcVisibleDynamicSub.resume(true);
            }
            else {
                this.isArcVisibleDynamic.pause();
                isArcVisibleDynamicSub.pause();
                this.setVisible(false);
            }
        }, true);
        this.subscriptions.push(this.projectedPlanePosition.sub(scheduleUpdate), this.ownAirplanePropsModule.trackTrue.sub(scheduleUpdate), this.ownAirplanePropsModule.groundSpeed.sub(scheduleUpdate), this.ownAirplanePropsModule.altitude.sub(scheduleUpdate));
        this.vsFpmQuantized.sub(scheduleUpdate);
        this.subscriptions.push(this.autopilotModule.selectedAltitude.sub(scheduleUpdate, true));
        this.layerRef.instance.setVisible(this.isVisible());
    }
    /** @inheritdoc */
    onMapProjectionChanged(mapProjection, changeFlags) {
        this.layerRef.instance.onMapProjectionChanged(mapProjection, changeFlags);
        this.projectPlanePositionHandler();
        this.needUpdate = true;
    }
    /** @inheritdoc */
    onUpdated() {
        if (!this.needUpdate || !this.isVisible()) {
            return;
        }
        const track = this.ownAirplanePropsModule.trackTrue.get();
        const groundSpeed = this.ownAirplanePropsModule.groundSpeed.get();
        const altitude = this.ownAirplanePropsModule.altitude.get();
        const selectedAltitude = this.autopilotModule.selectedAltitude.get();
        const vsFpm = this.vsFpmQuantized.get();
        const timeToAltitudeMinute = (selectedAltitude.asUnit(UnitType.FOOT) - altitude.asUnit(UnitType.FOOT)) / vsFpm;
        const distanceToAltitudeFeet = groundSpeed.asUnit(UnitType.FPM) * timeToAltitudeMinute;
        const distancePx = UnitType.FOOT.convertTo(distanceToAltitudeFeet, UnitType.GA_RADIAN) / this.props.mapProjection.getProjectedResolution();
        const projectedTrackAngle = track * Avionics.Utils.DEG2RAD + this.props.mapProjection.getRotation() - MathUtils.HALF_PI;
        const projectedPlanePos = this.projectedPlanePosition.get();
        const projectedArcPos = Vec2Math.add(Vec2Math.setFromPolar(distancePx, projectedTrackAngle, MapAltitudeArcLayer.vec2Cache[0]), projectedPlanePos, MapAltitudeArcLayer.vec2Cache[0]);
        this.projectedArcPosition.set(projectedArcPos);
        this.projectedArcAngle.set(projectedTrackAngle);
        this.layerRef.instance.onUpdated();
        this.needUpdate = false;
    }
    /** @inheritdoc */
    render() {
        const props = {
            ref: this.layerRef,
            model: this.props.model,
            mapProjection: this.props.mapProjection,
            arcAngularWidth: this.arcAngularWidth,
            arcRadius: this.arcRadius,
            strokeWidth: this.strokeWidth,
            strokeStyle: this.strokeStyle,
            strokeLineCap: this.strokeLineCap,
            outlineWidth: this.outlineWidth,
            outlineStyle: this.outlineStyle,
            outlineLineCap: this.outlineLineCap,
            projectedArcPosition: this.projectedArcPosition,
            projectedArcAngle: this.projectedArcAngle
        };
        return this.props.renderMethod === 'canvas'
            ? (FSComponent.buildComponent(MapAltitudeArcCanvasLayer, Object.assign({}, props))) : (FSComponent.buildComponent(MapAltitudeArcSvgLayer, Object.assign({}, props)));
    }
    /** @inheritdoc */
    destroy() {
        var _a, _b, _c, _d, _e;
        (_a = this.layerRef.getOrDefault()) === null || _a === void 0 ? void 0 : _a.destroy();
        (_b = this.vsPrecisionMap) === null || _b === void 0 ? void 0 : _b.destroy();
        (_c = this.vsThresholdMap) === null || _c === void 0 ? void 0 : _c.destroy();
        (_d = this.altDevThresholdMap) === null || _d === void 0 ? void 0 : _d.destroy();
        this.vsFpm.destroy();
        (_e = this.isArcVisibleStatic) === null || _e === void 0 ? void 0 : _e.destroy();
        this.isArcVisibleDynamic.destroy();
        this.subscriptions.forEach(sub => sub.destroy());
        super.destroy();
    }
}
MapAltitudeArcLayer.DEFAULT_ARC_ANGULAR_WIDTH = 60; // degrees
MapAltitudeArcLayer.DEFAULT_ARC_RADIUS = 64; // px
MapAltitudeArcLayer.DEFAULT_STROKE_WIDTH = 2; // px
MapAltitudeArcLayer.DEFAULT_STROKE_STYLE = 'cyan';
MapAltitudeArcLayer.DEFAULT_STROKE_LINECAP = 'butt';
MapAltitudeArcLayer.DEFAULT_OUTLINE_WIDTH = 1; // px
MapAltitudeArcLayer.DEFAULT_OUTLINE_STYLE = '#505050';
MapAltitudeArcLayer.DEFAULT_OUTLINE_LINECAP = 'butt';
MapAltitudeArcLayer.vec2Cache = [new Float64Array(2), new Float64Array(2)];
/**
 * A map layer which draws an altitude intercept arc using canvas.
 */
class MapAltitudeArcCanvasLayer extends MapLayer {
    constructor() {
        super(...arguments);
        this.arcHalfAngularWidth = this.props.arcAngularWidth / 2;
        this.totalArcThickness = this.props.strokeWidth + this.props.outlineWidth * 2;
        this.canvasLayerRef = FSComponent.createRef();
        this.subscriptions = [];
        this.needUpdate = false;
    }
    /** @inheritdoc */
    onVisibilityChanged(isVisible) {
        var _a, _b;
        if (isVisible) {
            this.needUpdate = true;
        }
        else {
            (_b = (_a = this.canvasLayerRef.getOrDefault()) === null || _a === void 0 ? void 0 : _a.tryGetDisplay()) === null || _b === void 0 ? void 0 : _b.clear();
        }
    }
    /** @inheritdoc */
    onAttached() {
        this.canvasLayerRef.instance.onAttached();
        const scheduleUpdate = () => { this.needUpdate = true; };
        this.subscriptions.push(this.props.projectedArcPosition.sub(scheduleUpdate, false), this.props.projectedArcAngle.sub(scheduleUpdate, false));
        this.needUpdate = true;
    }
    /** @inheritdoc */
    onMapProjectionChanged(mapProjection, changeFlags) {
        this.canvasLayerRef.instance.onMapProjectionChanged(mapProjection, changeFlags);
    }
    /** @inheritdoc */
    onUpdated() {
        if (!this.needUpdate || !this.isVisible()) {
            return;
        }
        const arcPos = this.props.projectedArcPosition.get();
        const display = this.canvasLayerRef.instance.display;
        display.clear();
        // Do not draw the arc if it is out of bounds.
        const projectedSize = this.props.mapProjection.getProjectedSize();
        const arcX = arcPos[0];
        const arcY = arcPos[1];
        const twiceRadius = this.props.arcRadius * 2;
        if (arcX <= -twiceRadius
            || arcX >= projectedSize[0] + twiceRadius
            || arcY <= -twiceRadius
            || arcY >= projectedSize[1] + twiceRadius) {
            return;
        }
        display.context.beginPath();
        const projectedArcAngle = this.props.projectedArcAngle.get();
        const center = Vec2Math.add(Vec2Math.setFromPolar(-this.props.arcRadius, projectedArcAngle, MapAltitudeArcCanvasLayer.vec2Cache[0]), arcPos, MapAltitudeArcCanvasLayer.vec2Cache[0]);
        const arcStart = Vec2Math.add(Vec2Math.setFromPolar(this.props.arcRadius, projectedArcAngle - this.arcHalfAngularWidth, MapAltitudeArcCanvasLayer.vec2Cache[1]), center, MapAltitudeArcCanvasLayer.vec2Cache[1]);
        display.context.moveTo(arcStart[0], arcStart[1]);
        display.context.arc(center[0], center[1], this.props.arcRadius, projectedArcAngle - this.arcHalfAngularWidth, projectedArcAngle + this.arcHalfAngularWidth);
        if (this.props.outlineWidth > 0) {
            display.context.lineWidth = this.totalArcThickness;
            display.context.strokeStyle = this.props.outlineStyle;
            display.context.lineCap = this.props.outlineLineCap;
            display.context.stroke();
        }
        if (this.props.strokeWidth > 0) {
            display.context.lineWidth = this.props.strokeWidth;
            display.context.strokeStyle = this.props.strokeStyle;
            display.context.lineCap = this.props.strokeLineCap;
            display.context.stroke();
        }
        this.needUpdate = false;
    }
    /** @inheritdoc */
    render() {
        return (FSComponent.buildComponent(MapSyncedCanvasLayer, { ref: this.canvasLayerRef, model: this.props.model, mapProjection: this.props.mapProjection }));
    }
    /** @inheritdoc */
    destroy() {
        var _a;
        (_a = this.canvasLayerRef.getOrDefault()) === null || _a === void 0 ? void 0 : _a.destroy();
        this.subscriptions.forEach(sub => sub.destroy());
        super.destroy();
    }
}
MapAltitudeArcCanvasLayer.vec2Cache = [new Float64Array(2), new Float64Array(2)];
/**
 * A map layer which draws an altitude intercept arc using SVG.
 */
class MapAltitudeArcSvgLayer extends MapLayer {
    constructor() {
        super(...arguments);
        this.arcHalfAngularWidth = this.props.arcAngularWidth / 2;
        this.totalArcThickness = this.props.strokeWidth + this.props.outlineWidth * 2;
        this.width = this.props.arcRadius * (1 - Math.cos(this.arcHalfAngularWidth)) + this.totalArcThickness + 2;
        this.height = 2 * this.props.arcRadius * Math.sin(Math.min(this.arcHalfAngularWidth, MathUtils.HALF_PI)) + this.totalArcThickness + 2;
        this.svgStyle = ObjectSubject.create({
            'display': '',
            'position': 'absolute',
            'left': `${(this.totalArcThickness / 2 + 1) - this.width}px`,
            'top': `${-this.height / 2}px`,
            'width': `${this.width}px`,
            'height': `${this.height}px`,
            'transform': 'translate3d(0px, 0px, 0px) rotate(0rad)',
            'transform-origin': `${this.width - (this.totalArcThickness / 2 + 1)}px ${this.height / 2}px`
        });
        this.svgTransform = CssTransformBuilder.concat(CssTransformBuilder.translate3d('px'), CssTransformBuilder.rotate('rad'));
        this.needUpdate = false;
        this.subscriptions = [];
    }
    /** @inheritdoc */
    onVisibilityChanged(isVisible) {
        if (isVisible) {
            this.needUpdate = true;
        }
        else {
            this.svgStyle.set('display', 'none');
        }
    }
    /** @inheritdoc */
    onAttached() {
        const scheduleUpdate = () => { this.needUpdate = true; };
        this.subscriptions.push(this.props.projectedArcPosition.sub(scheduleUpdate, false), this.props.projectedArcAngle.sub(scheduleUpdate, false));
    }
    /** @inheritdoc */
    onUpdated() {
        if (!this.needUpdate || !this.isVisible()) {
            return;
        }
        const arcPos = this.props.projectedArcPosition.get();
        // Hide the arc if it is out of bounds.
        const projectedSize = this.props.mapProjection.getProjectedSize();
        const arcX = arcPos[0];
        const arcY = arcPos[1];
        const twiceRadius = this.props.arcRadius * 2;
        if (arcX <= -twiceRadius
            || arcX >= projectedSize[0] + twiceRadius
            || arcY <= -twiceRadius
            || arcY >= projectedSize[1] + twiceRadius) {
            this.svgStyle.set('display', 'none');
        }
        else {
            this.svgStyle.set('display', '');
            this.svgTransform.getChild(0).set(arcX, arcY, 0, 0.1);
            this.svgTransform.getChild(1).set(this.props.projectedArcAngle.get(), 1e-4);
            this.svgStyle.set('transform', this.svgTransform.resolve());
        }
        this.needUpdate = false;
    }
    /** @inheritdoc */
    render() {
        const svgPathStream = new SvgPathStream(0.01);
        const transformPathStream = new AffineTransformPathStream(svgPathStream);
        // Top of the arc is at (0, 0), so the center is at (-radius, 0).
        transformPathStream.beginPath();
        transformPathStream
            .addRotation(-this.arcHalfAngularWidth)
            .addTranslation(-this.props.arcRadius, 0);
        transformPathStream.moveTo(this.props.arcRadius, 0);
        transformPathStream.arc(0, 0, this.props.arcRadius, 0, this.props.arcAngularWidth);
        const path = svgPathStream.getSvgPath();
        return (FSComponent.buildComponent("svg", { viewBox: `${(this.totalArcThickness / 2 + 1) - this.width} ${-this.height / 2} ${this.width} ${this.height}`, style: this.svgStyle },
            FSComponent.buildComponent("path", { d: path, fill: "none", stroke: this.props.outlineStyle, "stroke-width": this.totalArcThickness, "stroke-linecap": this.props.outlineLineCap }),
            FSComponent.buildComponent("path", { d: path, fill: 'none', stroke: this.props.strokeStyle, "stroke-width": this.props.strokeWidth, "stroke-linecap": this.props.strokeLineCap })));
    }
    /** @inheritdoc */
    destroy() {
        this.subscriptions.forEach(sub => sub.destroy());
        super.destroy();
    }
}

/**
 * Implementation of MapCachedCanvasLayerReference.
 */
class MapCachedCanvasLayerReferenceClass {
    constructor() {
        this._center = new GeoPoint(0, 0);
        this._scaleFactor = 1;
        this._rotation = 0;
    }
    /** @inheritdoc */
    get center() {
        return this._center.readonly;
    }
    /** @inheritdoc */
    get scaleFactor() {
        return this._scaleFactor;
    }
    /** @inheritdoc */
    get rotation() {
        return this._rotation;
    }
    /**
     * Syncs this reference with the current state of a map projection.
     * @param mapProjection The map projection with which to sync.
     */
    syncWithMapProjection(mapProjection) {
        this._center.set(mapProjection.getCenter());
        this._scaleFactor = mapProjection.getScaleFactor();
        this._rotation = mapProjection.getRotation();
    }
    /**
     * Syncs this reference with another reference.
     * @param reference - the reference with which to sync.
     */
    syncWithReference(reference) {
        this._center.set(reference.center);
        this._scaleFactor = reference.scaleFactor;
        this._rotation = reference.rotation;
    }
}
/**
 * Implementation of MapCachedCanvasLayerTransform.
 */
class MapCachedCanvasLayerTransformClass {
    constructor() {
        this._scale = 0;
        this._rotation = 0;
        this._translation = new Float64Array(2);
        this._margin = 0;
        this._marginRemaining = 0;
    }
    /** @inheritdoc */
    get scale() {
        return this._scale;
    }
    /** @inheritdoc */
    get rotation() {
        return this._rotation;
    }
    /** @inheritdoc */
    get translation() {
        return this._translation;
    }
    /** @inheritdoc */
    get margin() {
        return this._margin;
    }
    /** @inheritdoc */
    get marginRemaining() {
        return this._marginRemaining;
    }
    /**
     * Updates this transform given the current map projection and a reference.
     * @param mapProjection The current map projection.
     * @param reference The reference to use.
     * @param referenceMargin The reference margin, in pixels.
     */
    update(mapProjection, reference, referenceMargin) {
        this._scale = mapProjection.getScaleFactor() / reference.scaleFactor;
        this._rotation = mapProjection.getRotation() - reference.rotation;
        mapProjection.project(reference.center, this._translation);
        Vec2Math.sub(this._translation, mapProjection.getCenterProjected(), this._translation);
        this._margin = referenceMargin * this._scale;
        this._marginRemaining = this._margin - Math.max(Math.abs(this._translation[0]), Math.abs(this._translation[1]));
    }
    /**
     * Copies another transform's parameters to this one.
     * @param other The other transform.
     */
    copyFrom(other) {
        this._scale = other.scale;
        this._rotation = other.rotation;
        this._translation.set(other.translation);
        this._margin = other.margin;
    }
}
/**
 * An implementation of MapCachedCanvasLayerCanvasInstance.
 */
class MapCachedCanvasLayerCanvasInstanceClass extends MapCanvasLayerCanvasInstanceClass {
    /**
     * Creates a new canvas instance.
     * @param canvas The canvas element.
     * @param context The canvas 2D rendering context.
     * @param isDisplayed Whether the canvas is displayed.
     * @param getReferenceMargin A function which gets this canvas instance's reference margin, in pixels. The reference
     * margin is the maximum amount of translation allowed without invalidation at a scale factor of 1.
     */
    constructor(canvas, context, isDisplayed, getReferenceMargin) {
        super(canvas, context, isDisplayed);
        this.getReferenceMargin = getReferenceMargin;
        this._reference = new MapCachedCanvasLayerReferenceClass();
        this._transform = new MapCachedCanvasLayerTransformClass();
        this._isInvalid = false;
        this._geoProjection = new MercatorProjection();
        this.canvasTransform = CssTransformSubject.create(CssTransformBuilder.concat(CssTransformBuilder.scale(), CssTransformBuilder.translate('px'), CssTransformBuilder.rotate('rad')));
        this.canvasTransform.sub(transform => { this.canvas.style.transform = transform; }, true);
    }
    /** @inheritdoc */
    get reference() {
        return this._reference;
    }
    /** @inheritdoc */
    get transform() {
        return this._transform;
    }
    /** @inheritdoc */
    get isInvalid() {
        return this._isInvalid;
    }
    /** @inheritdoc */
    get geoProjection() {
        return this._geoProjection;
    }
    /** @inheritdoc */
    syncWithMapProjection(mapProjection) {
        const projectedCenter = Vec2Math.set(this.canvas.width / 2, this.canvas.height / 2, MapCachedCanvasLayerCanvasInstanceClass.tempVec2_1);
        this._reference.syncWithMapProjection(mapProjection);
        this._geoProjection.copyParametersFrom(mapProjection.getGeoProjection()).setTranslation(projectedCenter);
        this._transform.update(mapProjection, this.reference, this.getReferenceMargin());
        this._isInvalid = false;
        if (this.isDisplayed) {
            this.transformCanvasElement();
        }
    }
    /** @inheritdoc */
    syncWithCanvasInstance(other) {
        this._reference.syncWithReference(other.reference);
        this._geoProjection.copyParametersFrom(other.geoProjection);
        this._transform.copyFrom(other.transform);
        this._isInvalid = other.isInvalid;
        if (this.isDisplayed && !this._isInvalid) {
            this.transformCanvasElement();
        }
    }
    /**
     * Updates this canvas instance's transform given the current map projection.
     * @param mapProjection The current map projection.
     */
    updateTransform(mapProjection) {
        this._transform.update(mapProjection, this.reference, this.getReferenceMargin());
        if (!this._isInvalid) {
            const scaleFactorRatio = mapProjection.getScaleFactor() / this._reference.scaleFactor;
            this._isInvalid = scaleFactorRatio >= MapCachedCanvasLayerCanvasInstanceClass.SCALE_INVALIDATION_THRESHOLD
                || scaleFactorRatio <= 1 / MapCachedCanvasLayerCanvasInstanceClass.SCALE_INVALIDATION_THRESHOLD
                || this._transform.marginRemaining < 0;
        }
        if (this.isDisplayed && !this._isInvalid) {
            this.transformCanvasElement();
        }
    }
    /**
     * Transforms this instance's canvas element.
     */
    transformCanvasElement() {
        const transform = this.transform;
        const offsetX = transform.translation[0] / transform.scale;
        const offsetY = transform.translation[1] / transform.scale;
        this.canvasTransform.transform.getChild(0).set(transform.scale, transform.scale, 0.001);
        this.canvasTransform.transform.getChild(1).set(offsetX, offsetY, 0.1);
        this.canvasTransform.transform.getChild(2).set(transform.rotation, 1e-4);
        this.canvasTransform.resolve();
    }
    /** @inheritdoc */
    invalidate() {
        this._isInvalid = true;
        this.clear();
    }
}
MapCachedCanvasLayerCanvasInstanceClass.SCALE_INVALIDATION_THRESHOLD = 1.2;
MapCachedCanvasLayerCanvasInstanceClass.tempVec2_1 = new Float64Array(2);
/**
 * A canvas map layer whose image can be cached and transformed as the map projection changes.
 */
class MapCachedCanvasLayer extends MapCanvasLayer {
    /** @inheritdoc */
    constructor(props) {
        super(props);
        this.size = 0;
        this.referenceMargin = 0;
        this.needUpdateTransforms = false;
        this.props.overdrawFactor = Math.max(1, this.props.overdrawFactor);
    }
    /**
     * Gets the size, in pixels, of this layer's canvas.
     * @returns the size of this layer's canvas.
     */
    getSize() {
        return this.size;
    }
    /**
     * Gets the reference translation margin, in pixels, of this layer's display canvas. This value is the maximum amount
     * the display canvas can be translated in the x or y direction at a scale factor of 1 without invalidation.
     * @returns the reference translation margin of this layer's display canvas.
     */
    getReferenceMargin() {
        return this.referenceMargin;
    }
    /** @inheritdoc */
    onAttached() {
        super.onAttached();
        this.updateFromProjectedSize(this.props.mapProjection.getProjectedSize());
        this.needUpdateTransforms = true;
    }
    /** @inheritdoc */
    createCanvasInstance(canvas, context, isDisplayed) {
        return new MapCachedCanvasLayerCanvasInstanceClass(canvas, context, isDisplayed, this.getReferenceMargin.bind(this));
    }
    /**
     * Updates this layer according to the current size of the projected map window.
     * @param projectedSize The size of the projected map window.
     */
    updateFromProjectedSize(projectedSize) {
        const projectedWidth = projectedSize[0];
        const projectedHeight = projectedSize[1];
        const diag = Math.hypot(projectedWidth, projectedHeight);
        this.size = diag * this.props.overdrawFactor;
        this.referenceMargin = (this.size - diag) / 2;
        this.setWidth(this.size);
        this.setHeight(this.size);
        const posX = (projectedWidth - this.size) / 2;
        const posY = (projectedHeight - this.size) / 2;
        const displayCanvas = this.display.canvas;
        displayCanvas.style.left = `${posX}px`;
        displayCanvas.style.top = `${posY}px`;
    }
    /** @inheritdoc */
    onMapProjectionChanged(mapProjection, changeFlags) {
        var _a;
        if (BitFlags.isAll(changeFlags, MapProjectionChangeType.ProjectedSize)) {
            this.updateFromProjectedSize(mapProjection.getProjectedSize());
            this.display.invalidate();
            (_a = this.tryGetBuffer()) === null || _a === void 0 ? void 0 : _a.invalidate();
        }
        this.needUpdateTransforms = true;
    }
    /** @inheritdoc */
    onUpdated(time, elapsed) {
        super.onUpdated(time, elapsed);
        if (!this.needUpdateTransforms) {
            return;
        }
        this.updateTransforms();
    }
    /**
     * Updates this layer's canvas instances' transforms.
     */
    updateTransforms() {
        var _a;
        const mapProjection = this.props.mapProjection;
        this.display.updateTransform(mapProjection);
        (_a = this.tryGetBuffer()) === null || _a === void 0 ? void 0 : _a.updateTransform(mapProjection);
        this.needUpdateTransforms = false;
    }
}

/* eslint-disable @typescript-eslint/no-non-null-assertion */
/**
 * A layer which draws an own airplane icon. The icon is positioned at the projected location of the airplane and is
 * rotated to match the airplane's heading.
 */
class MapOwnAirplaneLayer extends MapLayer {
    constructor() {
        super(...arguments);
        this.imageFilePath = SubscribableUtils.isSubscribable(this.props.imageFilePath)
            ? this.props.imageFilePath.map(SubscribableMapFunctions.identity())
            : this.props.imageFilePath;
        this.style = ObjectSubject.create({
            display: '',
            position: 'absolute',
            left: '0px',
            top: '0px',
            width: '0px',
            height: '0px',
            transform: 'translate3d(0, 0, 0) rotate(0deg)',
            'transform-origin': '50% 50%'
        });
        this.ownAirplanePropsModule = this.props.model.getModule('ownAirplaneProps');
        this.ownAirplaneIconModule = this.props.model.getModule('ownAirplaneIcon');
        this.iconSize = SubscribableUtils.toSubscribable(this.props.iconSize, true);
        this.iconAnchor = SubscribableUtils.toSubscribable(this.props.iconAnchor, true);
        this.iconOffset = Vec2Math.create();
        this.visibilityBounds = VecNMath.create(4);
        this.iconTransform = CssTransformBuilder.concat(CssTransformBuilder.translate3d('px'), CssTransformBuilder.rotate('deg'));
        this.isGsAboveTrackThreshold = this.ownAirplanePropsModule.groundSpeed.map(gs => gs.asUnit(UnitType.KNOT) >= 5).pause();
        this.showIcon = true;
        this.isInsideVisibilityBounds = true;
        this.planeRotation = 0;
        this.needUpdateVisibility = false;
        this.needUpdatePositionRotation = false;
    }
    /** @inheritdoc */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onVisibilityChanged(isVisible) {
        this.needUpdateVisibility = true;
        this.needUpdatePositionRotation = this.showIcon = isVisible && this.ownAirplaneIconModule.show.get();
    }
    /** @inheritdoc */
    onAttached() {
        this.showSub = this.ownAirplaneIconModule.show.sub(show => {
            this.needUpdateVisibility = true;
            this.needUpdatePositionRotation = this.showIcon = show && this.isVisible();
        });
        this.positionSub = this.ownAirplanePropsModule.position.sub(() => {
            this.needUpdatePositionRotation = this.showIcon;
        });
        this.headingSub = this.ownAirplanePropsModule.hdgTrue.sub(hdg => {
            this.planeRotation = hdg;
            this.needUpdatePositionRotation = this.showIcon;
        }, false, true);
        this.trackSub = this.ownAirplanePropsModule.trackTrue.sub(track => {
            this.planeRotation = track;
            this.needUpdatePositionRotation = this.showIcon;
        }, false, true);
        this.trackThresholdSub = this.isGsAboveTrackThreshold.sub(isAboveThreshold => {
            if (isAboveThreshold) {
                this.headingSub.pause();
                this.trackSub.resume(true);
            }
            else {
                this.trackSub.pause();
                this.headingSub.resume(true);
            }
        }, false, true);
        this.iconSizeSub = this.iconSize.sub(size => {
            this.style.set('width', `${size}px`);
            this.style.set('height', `${size}px`);
            this.updateOffset();
        }, true);
        this.iconAnchorSub = this.iconAnchor.sub(() => {
            this.updateOffset();
        });
        this.orientationSub = this.ownAirplaneIconModule.orientation.sub(orientation => {
            switch (orientation) {
                case MapOwnAirplaneIconOrientation.HeadingUp:
                    this.isGsAboveTrackThreshold.pause();
                    this.trackThresholdSub.pause();
                    this.trackSub.pause();
                    this.headingSub.resume(true);
                    break;
                case MapOwnAirplaneIconOrientation.TrackUp:
                    this.headingSub.pause();
                    this.trackSub.pause();
                    this.isGsAboveTrackThreshold.resume();
                    this.trackThresholdSub.resume(true);
                    break;
                default:
                    this.needUpdatePositionRotation = this.showIcon;
                    this.isGsAboveTrackThreshold.pause();
                    this.trackThresholdSub.pause();
                    this.headingSub.pause();
                    this.trackSub.pause();
                    this.planeRotation = 0;
            }
        }, true);
        this.needUpdateVisibility = true;
        this.needUpdatePositionRotation = true;
    }
    /**
     * Updates the icon's offset from the projected position of the airplane.
     */
    updateOffset() {
        const anchor = this.iconAnchor.get();
        this.iconOffset.set(anchor);
        Vec2Math.multScalar(this.iconOffset, -this.iconSize.get(), this.iconOffset);
        this.style.set('left', `${this.iconOffset[0]}px`);
        this.style.set('top', `${this.iconOffset[1]}px`);
        this.style.set('transform-origin', `${anchor[0] * 100}% ${anchor[1] * 100}%`);
        this.updateVisibilityBounds();
    }
    /**
     * Updates the boundaries within the map's projected window that define a region such that if the airplane's
     * projected position falls outside of it, the icon is not visible and therefore does not need to be updated.
     */
    updateVisibilityBounds() {
        const size = this.iconSize.get();
        // Find the maximum possible protrusion of the icon from its anchor point, defined as the distance from the
        // anchor point to the farthest point within the bounds of the icon. This farthest point is always one of the
        // four corners of the icon.
        const maxProtrusion = Math.max(Math.hypot(this.iconOffset[0], this.iconOffset[1]), // top left corner
        Math.hypot(this.iconOffset[0] + size, this.iconOffset[1]), // top right corner
        Math.hypot(this.iconOffset[0] + size, this.iconOffset[1] + size), // bottom right corner
        Math.hypot(this.iconOffset[0], this.iconOffset[1] + size));
        const boundsOffset = maxProtrusion + 50; // Add some additional buffer
        const projectedSize = this.props.mapProjection.getProjectedSize();
        this.visibilityBounds[0] = -boundsOffset;
        this.visibilityBounds[1] = -boundsOffset;
        this.visibilityBounds[2] = projectedSize[0] + boundsOffset;
        this.visibilityBounds[3] = projectedSize[1] + boundsOffset;
        this.needUpdatePositionRotation = this.showIcon;
    }
    /** @inheritdoc */
    onMapProjectionChanged(mapProjection, changeFlags) {
        if (BitFlags.isAll(changeFlags, MapProjectionChangeType.ProjectedSize)) {
            this.updateVisibilityBounds();
        }
        this.needUpdatePositionRotation = this.showIcon;
    }
    /** @inheritdoc */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onUpdated(time, elapsed) {
        if (this.needUpdatePositionRotation) {
            this.updateIconPositionRotation();
            this.needUpdatePositionRotation = false;
            this.needUpdateVisibility = false;
        }
        else if (this.needUpdateVisibility) {
            this.updateIconVisibility();
            this.needUpdateVisibility = false;
        }
    }
    /**
     * Updates the airplane icon's visibility.
     */
    updateIconVisibility() {
        this.style.set('display', this.isInsideVisibilityBounds && this.showIcon ? '' : 'none');
    }
    /**
     * Updates the airplane icon's projected position and rotation.
     */
    updateIconPositionRotation() {
        const projected = this.props.mapProjection.project(this.ownAirplanePropsModule.position.get(), MapOwnAirplaneLayer.vec2Cache[0]);
        this.isInsideVisibilityBounds = this.props.mapProjection.isInProjectedBounds(projected, this.visibilityBounds);
        // If the projected position of the icon is far enough out of bounds that the icon is not visible, do not bother to
        // update the icon.
        if (this.isInsideVisibilityBounds) {
            let rotation;
            switch (this.ownAirplaneIconModule.orientation.get()) {
                case MapOwnAirplaneIconOrientation.HeadingUp:
                case MapOwnAirplaneIconOrientation.TrackUp:
                    rotation = this.planeRotation + this.props.mapProjection.getRotation() * Avionics.Utils.RAD2DEG;
                    break;
                default:
                    rotation = 0;
            }
            this.iconTransform.getChild(0).set(projected[0], projected[1], 0, 0.1);
            this.iconTransform.getChild(1).set(rotation, 0.1);
            this.style.set('transform', this.iconTransform.resolve());
        }
        this.updateIconVisibility();
    }
    /** @inheritdoc */
    render() {
        var _a;
        return (FSComponent.buildComponent("img", { src: this.imageFilePath, class: (_a = this.props.class) !== null && _a !== void 0 ? _a : '', style: this.style }));
    }
    /** @inheritdoc */
    destroy() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (SubscribableUtils.isSubscribable(this.imageFilePath)) {
            this.imageFilePath.destroy();
        }
        this.isGsAboveTrackThreshold.destroy();
        (_a = this.showSub) === null || _a === void 0 ? void 0 : _a.destroy();
        (_b = this.positionSub) === null || _b === void 0 ? void 0 : _b.destroy();
        (_c = this.headingSub) === null || _c === void 0 ? void 0 : _c.destroy();
        (_d = this.trackSub) === null || _d === void 0 ? void 0 : _d.destroy();
        (_e = this.trackThresholdSub) === null || _e === void 0 ? void 0 : _e.destroy();
        (_f = this.iconSizeSub) === null || _f === void 0 ? void 0 : _f.destroy();
        (_g = this.iconAnchorSub) === null || _g === void 0 ? void 0 : _g.destroy();
        (_h = this.orientationSub) === null || _h === void 0 ? void 0 : _h.destroy();
        super.destroy();
    }
}
MapOwnAirplaneLayer.vec2Cache = [Vec2Math.create()];

/**
 * A layer which draws airspaces.
 */
class MapAirspaceLayer extends MapLayer {
    constructor() {
        var _a, _b;
        super(...arguments);
        this.canvasLayerRef = FSComponent.createRef();
        this.clipBoundsSub = VecNSubject.createFromVector(new Float64Array(4));
        this.facLoader = new FacilityLoader(FacilityRepository.getRepository(this.props.bus), async () => {
            this.searchSession = new NearestLodBoundarySearchSession(this.props.lodBoundaryCache, await this.facLoader.startNearestSearchSession(FacilitySearchType.Boundary), 0.5);
            this.isAttached && this.scheduleSearch(0, true);
        });
        this.searchedAirspaces = new Map();
        this.searchDebounceDelay = (_a = this.props.searchDebounceDelay) !== null && _a !== void 0 ? _a : MapAirspaceLayer.DEFAULT_SEARCH_DEBOUNCE_DELAY;
        this.renderTimeBudget = (_b = this.props.renderTimeBudget) !== null && _b !== void 0 ? _b : MapAirspaceLayer.DEFAULT_RENDER_TIME_BUDGET;
        this.activeRenderProcess = null;
        this.renderTaskQueueHandler = {
            renderTimeBudget: this.renderTimeBudget,
            // eslint-disable-next-line jsdoc/require-jsdoc
            onStarted() {
                // noop
            },
            // eslint-disable-next-line jsdoc/require-jsdoc
            canContinue(elapsedFrameCount, dispatchedTaskCount, timeElapsed) {
                return timeElapsed < this.renderTimeBudget;
            },
            // eslint-disable-next-line jsdoc/require-jsdoc
            onPaused: this.onRenderPaused.bind(this),
            // eslint-disable-next-line jsdoc/require-jsdoc
            onFinished: this.onRenderFinished.bind(this),
            // eslint-disable-next-line jsdoc/require-jsdoc
            onAborted: this.onRenderAborted.bind(this)
        };
        this.searchDebounceTimer = 0;
        this.isSearchScheduled = false;
        this.needRefilter = false;
        this.isSearchBusy = false;
        this.lastDesiredSearchRadius = 0; // meters
        this.lastSearchRadius = 0; // meters
        this.isRenderScheduled = false;
        this.isBackgroundRenderScheduled = false;
        this.isDisplayInvalidated = true;
        this.isAttached = false;
    }
    /** @inheritdoc */
    onAttached() {
        this.canvasLayerRef.instance.onAttached();
        this.updateClipBounds();
        this.clippedPathStream = new ClippedPathStream(this.canvasLayerRef.instance.buffer.context, this.clipBoundsSub);
        this.props.maxSearchRadius.sub(radius => {
            const radiusMeters = radius.asUnit(UnitType.METER);
            if (radiusMeters < this.lastSearchRadius || radiusMeters > this.lastDesiredSearchRadius) {
                this.scheduleSearch(0, false);
            }
        });
        this.props.maxSearchItemCount.sub(() => { this.scheduleSearch(0, false); });
        this.initModuleListeners();
        this.isAttached = true;
        this.searchSession && this.scheduleSearch(0, true);
    }
    /**
     * Initializes this layer's airspace module property listeners.
     */
    initModuleListeners() {
        const airspaceModule = this.props.model.getModule('airspace');
        for (const type of Object.values(airspaceModule.show)) {
            type.sub(this.onAirspaceTypeShowChanged.bind(this));
        }
    }
    /** @inheritdoc */
    onMapProjectionChanged(mapProjection, changeFlags) {
        this.canvasLayerRef.instance.onMapProjectionChanged(mapProjection, changeFlags);
        if (BitFlags.isAll(changeFlags, MapProjectionChangeType.ProjectedSize)) {
            this.updateClipBounds();
        }
    }
    /**
     * Updates this layer's canvas clipping bounds.
     */
    updateClipBounds() {
        const size = this.canvasLayerRef.instance.getSize();
        this.clipBoundsSub.set(-MapAirspaceLayer.CLIP_BOUNDS_BUFFER, -MapAirspaceLayer.CLIP_BOUNDS_BUFFER, size + MapAirspaceLayer.CLIP_BOUNDS_BUFFER, size + MapAirspaceLayer.CLIP_BOUNDS_BUFFER);
    }
    /**
     * Schedules a search. If a search was previously scheduled but not yet executed, this new scheduled search will
     * replace the old one.
     * @param delay The delay, in milliseconds, before the search is executed.
     * @param refilter Whether to update the search's boundary class filter.
     */
    scheduleSearch(delay, refilter) {
        if (!this.searchSession) {
            return;
        }
        this.searchDebounceTimer = delay;
        this.isSearchScheduled = true;
        this.needRefilter || (this.needRefilter = refilter);
    }
    /**
     * Schedules a render to be executed during the next update cycle.
     */
    scheduleRender() {
        this.isRenderScheduled = true;
    }
    /**
     * Searches for airspaces around the map center. After the search is complete, the list of search results is filtered
     * and, if necessary, rendered.
     * @param refilter Whether to update the search's boundary class filter.
     */
    async searchAirspaces(refilter) {
        this.isSearchBusy = true;
        const center = this.props.mapProjection.getCenter();
        const drawableDiag = this.canvasLayerRef.instance.display.canvas.width * Math.SQRT2;
        this.lastDesiredSearchRadius = UnitType.GA_RADIAN.convertTo(this.props.mapProjection.getProjectedResolution() * drawableDiag / 2, UnitType.METER);
        this.lastSearchRadius = Math.min(this.props.maxSearchRadius.get().asUnit(UnitType.METER), this.lastDesiredSearchRadius);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const session = this.searchSession;
        refilter && session.setFilter(this.getBoundaryFilter());
        const results = await session.searchNearest(center.lat, center.lon, this.lastSearchRadius, this.props.maxSearchItemCount.get());
        for (let i = 0; i < results.added.length; i++) {
            const airspace = results.added[i];
            this.searchedAirspaces.set(airspace.facility.id, airspace);
        }
        for (let i = 0; i < results.removed.length; i++) {
            this.searchedAirspaces.delete(results.removed[i]);
        }
        this.isSearchBusy = false;
        this.scheduleRender();
    }
    /**
     * Gets the boundary class filter based on the current airspace type visibility settings.
     * @returns The boundary class filter based on the current airspace type visibility settings.
     */
    getBoundaryFilter() {
        const module = this.props.model.getModule('airspace');
        const show = module.show;
        let filter = 0;
        for (const type in show) {
            if (show[type].get()) {
                filter |= module.showTypes[type];
            }
        }
        return filter;
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    onUpdated(time, elapsed) {
        this.canvasLayerRef.instance.onUpdated(time, elapsed);
        this.updateFromInvalidation();
        this.updateScheduledRender();
        this.updateScheduledSearch(elapsed);
    }
    /**
     * Checks if the display and buffer canvases have been invalidated, and if so, clears them and schedules a render.
     */
    updateFromInvalidation() {
        const canvasLayer = this.canvasLayerRef.instance;
        const display = canvasLayer.display;
        const buffer = canvasLayer.buffer;
        const needBackgroundRender = !this.isBackgroundRenderScheduled
            && !this.activeRenderProcess
            && (display.transform.marginRemaining / display.transform.margin <= MapAirspaceLayer.BACKGROUND_RENDER_MARGIN_THRESHOLD);
        const shouldScheduleSearch = needBackgroundRender
            || display.isInvalid
            || (buffer.isInvalid && this.activeRenderProcess);
        this.isBackgroundRenderScheduled || (this.isBackgroundRenderScheduled = needBackgroundRender);
        if (display.isInvalid) {
            this.isDisplayInvalidated = true;
            this.isBackgroundRenderScheduled = false;
            display.clear();
            display.syncWithMapProjection(this.props.mapProjection);
        }
        if (buffer.isInvalid) {
            if (this.activeRenderProcess) {
                this.activeRenderProcess.abort();
                this.cleanUpRender();
            }
            buffer.clear();
            buffer.syncWithMapProjection(this.props.mapProjection);
        }
        if (shouldScheduleSearch) {
            this.scheduleSearch(this.searchDebounceDelay, false);
        }
    }
    /**
     * If a search is scheduled, decrements the delay timer and if necessary, executes the search.
     * @param elapsed The time elapsed, in milliseconds, since the last update.
     */
    updateScheduledSearch(elapsed) {
        if (!this.isSearchScheduled) {
            return;
        }
        this.searchDebounceTimer = Math.max(0, this.searchDebounceTimer - elapsed);
        if (this.searchDebounceTimer === 0 && !this.isSearchBusy) {
            this.searchAirspaces(this.needRefilter);
            this.isSearchScheduled = false;
            this.needRefilter = false;
        }
    }
    /**
     * Executes a render if one is scheduled.
     */
    updateScheduledRender() {
        if (!this.isRenderScheduled) {
            return;
        }
        this.startRenderProcess();
        this.isRenderScheduled = false;
        this.isBackgroundRenderScheduled = false;
    }
    /**
     * Syncs this layer's display canvas instance with the current map projection and renders this layer's airspaces to
     * the display.
     */
    startRenderProcess() {
        const canvasLayer = this.canvasLayerRef.instance;
        if (this.activeRenderProcess) {
            this.activeRenderProcess.abort();
        }
        const buffer = canvasLayer.buffer;
        buffer.clear();
        buffer.syncWithMapProjection(this.props.mapProjection);
        this.props.airspaceRenderManager.clearRegisteredAirspaces();
        for (const airspace of this.searchedAirspaces.values()) {
            if (this.isAirspaceInBounds(airspace, buffer)) {
                this.props.airspaceRenderManager.registerAirspace(airspace);
            }
        }
        const lod = this.selectLod(this.props.mapProjection.getProjectedResolution());
        this.activeRenderProcess = this.props.airspaceRenderManager.prepareRenderProcess(buffer.geoProjection, buffer.context, this.renderTaskQueueHandler, lod, this.clippedPathStream);
        this.activeRenderProcess.start();
    }
    /**
     * Checks whether an airspace is within the projected bounds of a cached canvas instance.
     * @param airspace An airspace.
     * @param canvas A cached canvas instance.
     * @returns Whether the airspace is within the projected bounds of the cached canvas instance.
     */
    isAirspaceInBounds(airspace, canvas) {
        const corner = MapAirspaceLayer.geoPointCache[0];
        const cornerProjected = MapAirspaceLayer.vec2Cache[0];
        let minX, maxX, minY, maxY;
        canvas.geoProjection.project(corner.set(airspace.facility.topLeft.lat, airspace.facility.topLeft.long), cornerProjected);
        minX = maxX = cornerProjected[0];
        minY = maxY = cornerProjected[1];
        canvas.geoProjection.project(corner.set(airspace.facility.topLeft.lat, airspace.facility.bottomRight.long), cornerProjected);
        minX = Math.min(minX, cornerProjected[0]);
        maxX = Math.max(maxX, cornerProjected[0]);
        minY = Math.min(minY, cornerProjected[1]);
        maxY = Math.max(maxY, cornerProjected[1]);
        canvas.geoProjection.project(corner.set(airspace.facility.bottomRight.lat, airspace.facility.bottomRight.long), cornerProjected);
        minX = Math.min(minX, cornerProjected[0]);
        maxX = Math.max(maxX, cornerProjected[0]);
        minY = Math.min(minY, cornerProjected[1]);
        maxY = Math.max(maxY, cornerProjected[1]);
        canvas.geoProjection.project(corner.set(airspace.facility.bottomRight.lat, airspace.facility.topLeft.long), cornerProjected);
        minX = Math.min(minX, cornerProjected[0]);
        maxX = Math.max(maxX, cornerProjected[0]);
        minY = Math.min(minY, cornerProjected[1]);
        maxY = Math.max(maxY, cornerProjected[1]);
        const width = canvas.canvas.width;
        const height = canvas.canvas.height;
        return minX < width
            && maxX > 0
            && minY < height
            && maxY > 0;
    }
    /**
     * Selects an LOD level based on projected map resolution.
     * @param resolution A projected map resolution, in great-arc radians per pixel.
     * @returns An LOD level based on the projected map resolution.
     */
    selectLod(resolution) {
        const thresholds = this.props.lodBoundaryCache.lodDistanceThresholds;
        let i = thresholds.length - 1;
        while (i >= 0) {
            if (resolution * 2 >= thresholds[i]) {
                break;
            }
            i--;
        }
        return i;
    }
    /**
     * Cleans up the active render process.
     */
    cleanUpRender() {
        this.canvasLayerRef.instance.buffer.reset();
        this.activeRenderProcess = null;
    }
    /**
     * Renders airspaces from the buffer to the display.
     */
    renderAirspacesToDisplay() {
        const display = this.canvasLayerRef.instance.display;
        const buffer = this.canvasLayerRef.instance.buffer;
        display.clear();
        display.syncWithCanvasInstance(buffer);
        this.canvasLayerRef.instance.copyBufferToDisplay();
    }
    /**
     * This method is called when the airspace render process pauses.
     */
    onRenderPaused() {
        if (this.isDisplayInvalidated) {
            this.renderAirspacesToDisplay();
        }
    }
    /**
     * This method is called when the airspace render process finishes.
     */
    onRenderFinished() {
        this.renderAirspacesToDisplay();
        this.cleanUpRender();
        this.isDisplayInvalidated = false;
    }
    /**
     * This method is called when the airspace render process is aborted.
     */
    onRenderAborted() {
        this.cleanUpRender();
    }
    /**
     * This method is called when an airspace show property changes.
     */
    onAirspaceTypeShowChanged() {
        this.scheduleSearch(0, true);
    }
    /** @inheritdoc */
    render() {
        return (FSComponent.buildComponent(MapCachedCanvasLayer, { ref: this.canvasLayerRef, model: this.props.model, mapProjection: this.props.mapProjection, useBuffer: true, overdrawFactor: Math.SQRT2 }));
    }
}
MapAirspaceLayer.DEFAULT_SEARCH_DEBOUNCE_DELAY = 500; // milliseconds
MapAirspaceLayer.DEFAULT_RENDER_TIME_BUDGET = 0.2; // milliseconds per frame
MapAirspaceLayer.BACKGROUND_RENDER_MARGIN_THRESHOLD = 0.1; // relative to total margin
MapAirspaceLayer.CLIP_BOUNDS_BUFFER = 10; // number of pixels from edge of canvas to extend the clipping bounds, in pixels
MapAirspaceLayer.geoPointCache = [new GeoPoint(0, 0)];
MapAirspaceLayer.vec2Cache = [new Float64Array(2)];

/**
 * An abstract implementation of a map layer which displays waypoints (airports, navaids, and intersections) within a
 * search radius.
 */
class MapNearestWaypointsLayer extends MapLayer {
    constructor() {
        var _a;
        super(...arguments);
        this.canvasLayerRef = FSComponent.createRef();
        this.searchDebounceDelay = (_a = this.props.searchDebounceDelay) !== null && _a !== void 0 ? _a : 500;
        this.facLoader = new FacilityLoader(FacilityRepository.getRepository(this.props.bus), this.onFacilityLoaderInitialized.bind(this));
        this.searchRadius = 0;
        this.searchMargin = 0;
        this.userFacilityHasChanged = false;
        /** A set of the ICAOs of all waypoints that should be rendered. */
        this.icaosToRender = new Set();
        /** A map of rendered waypoints from their ICAOs. */
        this.cachedRenderedWaypoints = new Map();
        this.isInit = false;
        this.facilityRepoSubs = [];
    }
    /**
     * A callback called when the facility loaded finishes initialization.
     */
    onFacilityLoaderInitialized() {
        Promise.all([
            this.facLoader.startNearestSearchSession(FacilitySearchType.Airport),
            this.facLoader.startNearestSearchSession(FacilitySearchType.Vor),
            this.facLoader.startNearestSearchSession(FacilitySearchType.Ndb),
            this.facLoader.startNearestSearchSession(FacilitySearchType.Intersection),
            this.facLoader.startNearestSearchSession(FacilitySearchType.User)
        ]).then((value) => {
            const [airportSession, vorSession, ndbSession, intSession, userSession] = value;
            this.onSessionsStarted(airportSession, vorSession, ndbSession, intSession, userSession);
        });
    }
    /**
     * A callback called when the nearest facility search sessions have been started.
     * @param airportSession The airport search session.
     * @param vorSession The VOR search session.
     * @param ndbSession The NDB search session.
     * @param intSession The intersection search session.
     * @param userSession The user facility search session.
     */
    onSessionsStarted(airportSession, vorSession, ndbSession, intSession, userSession) {
        const callback = this.processSearchResults.bind(this);
        this.facilitySearches = {
            [FacilitySearchType.Airport]: new MapNearestWaypointsLayerSearch(airportSession, callback),
            [FacilitySearchType.Vor]: new MapNearestWaypointsLayerSearch(vorSession, callback),
            [FacilitySearchType.Ndb]: new MapNearestWaypointsLayerSearch(ndbSession, callback),
            [FacilitySearchType.Intersection]: new MapNearestWaypointsLayerSearch(intSession, callback),
            [FacilitySearchType.User]: new MapNearestWaypointsLayerSearch(userSession, callback)
        };
        const sub = this.props.bus.getSubscriber();
        // Watch for changes to user facilities so that we can trigger search refreshes to ensure that the layer does not
        // display outdated user waypoints.
        this.facilityRepoSubs.push(sub.on('facility_added').handle(fac => {
            if (ICAO.isFacility(fac.icao, FacilityType.USR)) {
                this.userFacilityHasChanged = true;
            }
        }), sub.on('facility_changed').handle(fac => {
            if (ICAO.isFacility(fac.icao, FacilityType.USR)) {
                this.userFacilityHasChanged = true;
            }
        }), sub.on('facility_removed').handle(fac => {
            if (ICAO.isFacility(fac.icao, FacilityType.USR)) {
                this.userFacilityHasChanged = true;
            }
        }));
        this.props.onSessionsStarted && this.props.onSessionsStarted(airportSession, vorSession, ndbSession, intSession, userSession);
        if (this.isInit) {
            this._tryRefreshAllSearches(this.getSearchCenter(), this.searchRadius);
        }
    }
    /** @inheritdoc */
    onAttached() {
        super.onAttached();
        this.canvasLayerRef.instance.onAttached();
        this.doInit();
        this.isInit = true;
        this._tryRefreshAllSearches(this.getSearchCenter(), this.searchRadius);
    }
    /**
     * Initializes this layer.
     */
    doInit() {
        this.initWaypointRenderer();
        this.updateSearchRadius();
    }
    /**
     * Gets the search center for the waypoint searches on this layer.
     * @returns The waypoint search center geo point.
     */
    getSearchCenter() {
        return this.props.getSearchCenter ? this.props.getSearchCenter(this.props.mapProjection) : this.props.mapProjection.getCenter();
    }
    /**
     * Initializes this layer's waypoint renderer.
     */
    initWaypointRenderer() {
        this.props.initRenderer && this.props.initRenderer(this.props.waypointRenderer, this.canvasLayerRef.instance);
    }
    /** Forces a refresh of all the waypoints. */
    refreshWaypoints() {
        this.tryRefreshAllSearches(undefined, undefined, true);
        this.cachedRenderedWaypoints.forEach(w => {
            this.props.deregisterWaypoint(w, this.props.waypointRenderer);
        });
        this.cachedRenderedWaypoints.forEach(w => {
            this.props.registerWaypoint(w, this.props.waypointRenderer);
        });
    }
    /** @inheritdoc */
    onMapProjectionChanged(mapProjection, changeFlags) {
        this.canvasLayerRef.instance.onMapProjectionChanged(mapProjection, changeFlags);
        if (BitFlags.isAny(changeFlags, MapProjectionChangeType.Range | MapProjectionChangeType.RangeEndpoints | MapProjectionChangeType.ProjectedSize)) {
            this.updateSearchRadius();
            this._tryRefreshAllSearches(this.getSearchCenter(), this.searchRadius);
        }
        else if (BitFlags.isAll(changeFlags, MapProjectionChangeType.Center)) {
            this._tryRefreshAllSearches(this.getSearchCenter(), this.searchRadius);
        }
    }
    /**
     * Updates the desired nearest facility search radius based on the current map projection.
     */
    updateSearchRadius() {
        let mapHalfDiagRange = Vec2Math.abs(this.props.mapProjection.getProjectedSize()) * this.props.mapProjection.getProjectedResolution() / 2;
        //Limit lower end of radius so that even at high zooms the surrounding area waypoints are captured.
        mapHalfDiagRange = Math.max(mapHalfDiagRange, UnitType.NMILE.convertTo(5, UnitType.GA_RADIAN));
        this.searchRadius = mapHalfDiagRange * MapNearestWaypointsLayer.SEARCH_RADIUS_OVERDRAW_FACTOR;
        this.searchMargin = mapHalfDiagRange * (MapNearestWaypointsLayer.SEARCH_RADIUS_OVERDRAW_FACTOR - 1);
    }
    /** @inheritdoc */
    onUpdated(time, elapsed) {
        var _a;
        // If a user facility was added, changed, or removed, schedule a user waypoint search refresh so that we always
        // have the latest user facility data.
        if (this.userFacilityHasChanged) {
            const search = (_a = this.facilitySearches) === null || _a === void 0 ? void 0 : _a[FacilitySearchType.User];
            if (search !== undefined) {
                this.userFacilityHasChanged = false;
                this.scheduleSearchRefresh(FacilitySearchType.User, search, this.getSearchCenter(), this.searchRadius);
            }
        }
        this.updateSearches(elapsed);
    }
    /**
     * Updates this layer's facility searches.
     * @param elapsed The elapsed time, in milliseconds, since the last update.
     */
    updateSearches(elapsed) {
        if (!this.facilitySearches) {
            return;
        }
        this.facilitySearches[FacilitySearchType.Airport].update(elapsed);
        this.facilitySearches[FacilitySearchType.Vor].update(elapsed);
        this.facilitySearches[FacilitySearchType.Ndb].update(elapsed);
        this.facilitySearches[FacilitySearchType.Intersection].update(elapsed);
        this.facilitySearches[FacilitySearchType.User].update(elapsed);
    }
    /**
     * Attempts to refresh all of the nearest facility searches. Searches will only be refreshed if the desired search
     * radius is different from the last refreshed search radius or the desired search center is outside of the margin
     * of the last refreshed search center.
     * @param center The center of the search area. Defaults to this layer's automatically calculated search center.
     * @param radius The radius of the search area, in great-arc radians. Defaults to this layer's automatically
     * calculated search radius.
     * @param force Whether to force a refresh of all waypoints. Defaults to false.
     */
    tryRefreshAllSearches(center, radius, force) {
        center !== null && center !== void 0 ? center : (center = this.getSearchCenter());
        radius !== null && radius !== void 0 ? radius : (radius = this.searchRadius);
        this._tryRefreshAllSearches(center, radius, force);
    }
    /**
     * Attempts to refresh a nearest search. The search will only be refreshed if the desired search radius is different
     * from the last refreshed search radius or the desired search center is outside of the margin of the last refreshed
     * search center.
     * @param type The type of nearest search to refresh.
     * @param center The center of the search area. Defaults to this layer's automatically calculated search center.
     * @param radius The radius of the search area, in great-arc radians. Defaults to this layer's automatically
     * calculated search radius.
     * @param force Whether to force a refresh of all waypoints. Defaults to false.
     */
    tryRefreshSearch(type, center, radius, force) {
        center !== null && center !== void 0 ? center : (center = this.getSearchCenter());
        radius !== null && radius !== void 0 ? radius : (radius = this.searchRadius);
        this._tryRefreshSearch(type, center, radius, force);
    }
    /**
     * Attempts to refresh all of the nearest facility searches.
     * @param center The center of the search area.
     * @param radius The radius of the search area, in great-arc radians.
     * @param force Whether to force a refresh of all waypoints. Defaults to false.
     */
    _tryRefreshAllSearches(center, radius, force) {
        this._tryRefreshSearch(FacilitySearchType.Airport, center, radius, force);
        this._tryRefreshSearch(FacilitySearchType.Vor, center, radius, force);
        this._tryRefreshSearch(FacilitySearchType.Ndb, center, radius, force);
        this._tryRefreshSearch(FacilitySearchType.Intersection, center, radius, force);
        this._tryRefreshSearch(FacilitySearchType.User, center, radius, force);
    }
    /**
     * Attempts to refresh a nearest search. The search will only be refreshed if `this.shouldRefreshSearch()` returns
     * true and and the desired search radius is different from the last refreshed search radius or the desired search
     * center is outside of the margin of the last refreshed search center.
     * @param type The type of nearest search to refresh.
     * @param center The center of the search area.
     * @param radius The radius of the search area, in great-arc radians.
     * @param force Whether to force a refresh of all waypoints. Defaults to false.
     */
    _tryRefreshSearch(type, center, radius, force) {
        const search = this.facilitySearches && this.facilitySearches[type];
        if (!search || (!force && !this.shouldRefreshSearch(type, center, radius))) {
            return;
        }
        const radiusLimit = this.props.searchRadiusLimit ? this.props.searchRadiusLimit(type, center, radius) : undefined;
        if (radiusLimit !== undefined && isFinite(radiusLimit)) {
            radius = Math.min(radius, Math.max(0, radiusLimit));
        }
        if (force || search.lastRadius !== radius || search.lastCenter.distance(center) >= this.searchMargin) {
            this.scheduleSearchRefresh(type, search, center, radius);
        }
    }
    /**
     * Checks whether one of this layer's searches should be refreshed.
     * @param type The type of nearest search to refresh.
     * @param center The center of the search area.
     * @param radius The radius of the search area, in great-arc radians.
     * @returns Whether the search should be refreshed.
     */
    shouldRefreshSearch(type, center, radius) {
        return this.props.shouldRefreshSearch ? this.props.shouldRefreshSearch(type, center, radius) : true;
    }
    /**
     * Schedules a refresh of this one of this layer's searches.
     * @param type The type of nearest search to refresh.
     * @param search The search to refresh.
     * @param center The center of the search area.
     * @param radius The radius of the search area, in great-arc radians.
     */
    scheduleSearchRefresh(type, search, center, radius) {
        const itemLimit = this.props.searchItemLimit ? this.props.searchItemLimit(type, center, radius) : 100;
        search.scheduleRefresh(center, radius, itemLimit, this.searchDebounceDelay);
    }
    /**
     * Processes nearest facility search results. New facilities are registered, while removed facilities are
     * deregistered.
     * @param results Nearest facility search results.
     */
    processSearchResults(results) {
        if (!results) {
            return;
        }
        const numAdded = results.added.length;
        for (let i = 0; i < numAdded; i++) {
            const icao = results.added[i];
            if (icao === undefined || icao === ICAO.emptyIcao) {
                continue;
            }
            this.registerIcao(icao);
        }
        const numRemoved = results.removed.length;
        for (let i = 0; i < numRemoved; i++) {
            const icao = results.removed[i];
            if (icao === undefined || icao === ICAO.emptyIcao) {
                continue;
            }
            this.deregisterIcao(icao);
        }
    }
    /**
     * Registers an ICAO string with this layer. Once an ICAO is registered, its corresponding facility is drawn to this
     * layer using a waypoint renderer.
     * @param icao The ICAO string to register.
     */
    async registerIcao(icao) {
        this.icaosToRender.add(icao);
        try {
            const facility = await this.facLoader.getFacility(ICAO.getFacilityType(icao), icao);
            if (!this.icaosToRender.has(icao)) {
                return;
            }
            this.registerWaypointWithRenderer(this.props.waypointRenderer, facility);
        }
        catch (_a) {
            // noop
        }
    }
    /**
     * Registers a facility with this layer's waypoint renderer.
     * @param renderer This layer's waypoint renderer.
     * @param facility The facility to register.
     */
    registerWaypointWithRenderer(renderer, facility) {
        const waypoint = this.props.waypointForFacility(facility);
        this.cachedRenderedWaypoints.set(facility.icao, waypoint);
        this.props.registerWaypoint(waypoint, renderer);
    }
    /**
     * Deregisters an ICAO string from this layer.
     * @param icao The ICAO string to deregister.
     */
    async deregisterIcao(icao) {
        this.icaosToRender.delete(icao);
        try {
            const facility = await this.facLoader.getFacility(ICAO.getFacilityType(icao), icao);
            if (this.icaosToRender.has(icao)) {
                return;
            }
            this.deregisterWaypointWithRenderer(this.props.waypointRenderer, facility);
        }
        catch (_a) {
            if (this.icaosToRender.has(icao)) {
                return;
            }
            // If we can't find the facility from the ICAO, it could be that the facility has been removed, in which case
            // we grab the cached waypoint (the waypoint that was most recently registered with the renderer under the
            // removed ICAO) and deregister it.
            const cachedWaypoint = this.cachedRenderedWaypoints.get(icao);
            if (cachedWaypoint !== undefined) {
                this.cachedRenderedWaypoints.delete(icao);
                this.props.deregisterWaypoint(cachedWaypoint, this.props.waypointRenderer);
            }
        }
    }
    /**
     * Deregisters a facility from this layer's waypoint renderer.
     * @param renderer This layer's waypoint renderer.
     * @param facility The facility to deregister.
     */
    deregisterWaypointWithRenderer(renderer, facility) {
        const waypoint = this.props.waypointForFacility(facility);
        this.cachedRenderedWaypoints.delete(facility.icao);
        this.props.deregisterWaypoint(waypoint, renderer);
    }
    /** @inheritdoc */
    setVisible(val) {
        super.setVisible(val);
        this.canvasLayerRef.instance.setVisible(val);
    }
    /** @inheritdoc */
    render() {
        var _a;
        return (FSComponent.buildComponent(MapSyncedCanvasLayer, { ref: this.canvasLayerRef, model: this.props.model, mapProjection: this.props.mapProjection, class: (_a = this.props.class) !== null && _a !== void 0 ? _a : '' }));
    }
    /** @inheritdoc */
    destroy() {
        var _a;
        (_a = this.canvasLayerRef.getOrDefault()) === null || _a === void 0 ? void 0 : _a.destroy();
        this.facilityRepoSubs.forEach(sub => { sub.destroy(); });
        super.destroy();
    }
}
MapNearestWaypointsLayer.SEARCH_RADIUS_OVERDRAW_FACTOR = Math.SQRT2;
/**
 * A nearest facility search for MapAbstractNearestWaypointsLayer.
 */
class MapNearestWaypointsLayerSearch {
    /**
     * Constructor.
     * @param session The session used by this search.
     * @param refreshCallback A callback which is called every time the search refreshes.
     */
    constructor(session, refreshCallback) {
        this.session = session;
        this.refreshCallback = refreshCallback;
        this._lastCenter = new GeoPoint(0, 0);
        this._lastRadius = 0;
        this.maxItemCount = 0;
        this.refreshDebounceTimer = 0;
        this.isRefreshScheduled = false;
    }
    // eslint-disable-next-line jsdoc/require-returns
    /**
     * The center of this search's last refresh.
     */
    get lastCenter() {
        return this._lastCenter.readonly;
    }
    // eslint-disable-next-line jsdoc/require-returns
    /**
     * The radius of this search's last refresh, in great-arc radians.
     */
    get lastRadius() {
        return this._lastRadius;
    }
    /**
     * Schedules a refresh of this search.  If a refresh was previously scheduled but not yet executed, this new
     * scheduled refresh will replace the old one.
     * @param center The center of the search area.
     * @param radius The radius of the search area, in great-arc radians.
     * @param maxItemCount The maximum number of results returned by the refresh.
     * @param delay The delay, in milliseconds, before the refresh is executed.
     */
    scheduleRefresh(center, radius, maxItemCount, delay) {
        this._lastCenter.set(center);
        this._lastRadius = radius;
        this.maxItemCount = maxItemCount;
        if (!this.isRefreshScheduled) {
            this.refreshDebounceTimer = delay;
            this.isRefreshScheduled = true;
        }
    }
    /**
     * Updates this search. Executes any pending refreshes if their delay timers have expired.
     * @param elapsed The elapsed time, in milliseconds, since the last update.
     */
    update(elapsed) {
        if (!this.isRefreshScheduled) {
            return;
        }
        this.refreshDebounceTimer = Math.max(0, this.refreshDebounceTimer - elapsed);
        if (this.refreshDebounceTimer === 0) {
            this.refresh();
            this.isRefreshScheduled = false;
        }
    }
    /**
     * Refreshes this search.
     * @returns a Promise which is fulfilled when the refresh completes.
     */
    async refresh() {
        const results = await this.session.searchNearest(this._lastCenter.lat, this._lastCenter.lon, UnitType.GA_RADIAN.convertTo(this._lastRadius, UnitType.METER), this.maxItemCount);
        this.refreshCallback(results);
    }
}

/**
 * A map layer that draws a line between two points. The line is drawn in projected coordinate space, so it will always
 * be straight on the projected map.
 */
class MapLineLayer extends MapSyncedCanvasLayer {
    constructor() {
        var _a, _b, _c, _d, _e, _f;
        super(...arguments);
        this.strokeWidth = (_a = this.props.strokeWidth) !== null && _a !== void 0 ? _a : MapLineLayer.DEFAULT_STROKE_WIDTH;
        this.strokeStyle = (_b = this.props.strokeStyle) !== null && _b !== void 0 ? _b : MapLineLayer.DEFAULT_STROKE_STYLE;
        this.strokeDash = (_c = this.props.strokeDash) !== null && _c !== void 0 ? _c : MapLineLayer.DEFAULT_STROKE_DASH;
        this.outlineWidth = (_d = this.props.outlineWidth) !== null && _d !== void 0 ? _d : MapLineLayer.DEFAULT_OUTLINE_WIDTH;
        this.outlineStyle = (_e = this.props.outlineStyle) !== null && _e !== void 0 ? _e : MapLineLayer.DEFAULT_OUTLINE_STYLE;
        this.outlineDash = (_f = this.props.outlineDash) !== null && _f !== void 0 ? _f : MapLineLayer.DEFAULT_OUTLINE_DASH;
        this.vec = new Float64Array([0, 0]);
        this.isUpdateScheduled = false;
    }
    /** @inheritdoc */
    onAttached() {
        super.onAttached();
        this.props.start.sub(() => { this.scheduleUpdate(); });
        this.props.end.sub(() => { this.scheduleUpdate(); });
        this.scheduleUpdate();
    }
    /** @inheritdoc */
    onMapProjectionChanged(mapProjection, changeFlags) {
        super.onMapProjectionChanged(mapProjection, changeFlags);
        this.scheduleUpdate();
    }
    /**
     * Schedules the layer for a draw update.
     */
    scheduleUpdate() {
        this.isUpdateScheduled = true;
    }
    /** @inheritdoc */
    onUpdated(time, elapsed) {
        super.onUpdated(time, elapsed);
        if (this.isUpdateScheduled) {
            this.display.clear();
            const start = this.props.start.get();
            const end = this.props.end.get();
            if (start !== null && end !== null) {
                const [x1, y1] = start instanceof Float64Array ? start : this.props.mapProjection.project(start, this.vec);
                const [x2, y2] = end instanceof Float64Array ? end : this.props.mapProjection.project(end, this.vec);
                this.drawLine(x1, y1, x2, y2);
            }
            this.isUpdateScheduled = false;
        }
    }
    /**
     * Draws this layer's line.
     * @param x1 The x coordinate of the start of the line.
     * @param y1 The y coordinate of the start of the line.
     * @param x2 The x coordinate of the end of the line.
     * @param y2 The y coordinate of the end of the line.
     */
    drawLine(x1, y1, x2, y2) {
        const context = this.display.context;
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        if (this.outlineWidth > 0) {
            this.stroke(context, this.strokeWidth + this.outlineWidth * 2, this.outlineStyle, this.outlineDash);
        }
        if (this.strokeWidth > 0) {
            this.stroke(context, this.strokeWidth, this.strokeStyle, this.strokeDash);
        }
    }
    /**
     * Applies a stroke to a canvas rendering context.
     * @param context A canvas rendering context.
     * @param width The width of the stroke, in pixels.
     * @param style The style of the stroke.
     * @param dash The dash array of the stroke.
     */
    stroke(context, width, style, dash) {
        context.lineWidth = width;
        context.strokeStyle = style;
        context.setLineDash(dash);
        context.stroke();
    }
}
MapLineLayer.DEFAULT_STROKE_WIDTH = 2; // px
MapLineLayer.DEFAULT_STROKE_STYLE = 'white';
MapLineLayer.DEFAULT_STROKE_DASH = [];
MapLineLayer.DEFAULT_OUTLINE_WIDTH = 0; // px
MapLineLayer.DEFAULT_OUTLINE_STYLE = 'black';
MapLineLayer.DEFAULT_OUTLINE_DASH = [];

/**
 * An enumeration of possible map rotation types.
 */
var MapRotation;
(function (MapRotation) {
    /** Map up position does not follow a defined pattern. */
    MapRotation["Undefined"] = "Undefined";
    /** Map up position points towards true north. */
    MapRotation["NorthUp"] = "NorthUp";
    /** Map up position points towards the current airplane track. */
    MapRotation["TrackUp"] = "TrackUp";
    /** Map up position points towards the current airplane heading. */
    MapRotation["HeadingUp"] = "HeadingUp";
    /** Map up position points towards the current nav desired track. */
    MapRotation["DtkUp"] = "DtkUp";
})(MapRotation || (MapRotation = {}));

/**
 * Waypoint roles used by the map system waypoint display system.
 */
var MapSystemWaypointRoles;
(function (MapSystemWaypointRoles) {
    /** The normal waypoint display role. */
    MapSystemWaypointRoles["Normal"] = "Normal";
    /** The waypoint role for displaying waypoints along the flight plan. */
    MapSystemWaypointRoles["FlightPlan"] = "FlightPlan";
})(MapSystemWaypointRoles || (MapSystemWaypointRoles = {}));

/**
 * A map system layer that draws the flight plan.
 */
class MapSystemFlightPlanLayer extends MapLayer {
    constructor() {
        var _a;
        super(...arguments);
        this.instanceId = MapSystemFlightPlanLayer.instanceId++;
        this.flightPathLayerRef = FSComponent.createRef();
        this.waypointLayerRef = FSComponent.createRef();
        this.defaultRoleId = (_a = this.props.waypointRenderer.getRoleFromName(MapSystemWaypointRoles.FlightPlan)) !== null && _a !== void 0 ? _a : 0;
        this.planModule = this.props.model.getModule(MapSystemKeys.FlightPlan);
        this.waypointPrefix = `${MapSystemFlightPlanLayer.WAYPOINT_PREFIX}_${this.instanceId}`;
        this.legWaypoints = new Map();
        this.waypointsUpdating = false;
        this.waypointId = 0;
        this.facLoader = new FacilityLoader(FacilityRepository.getRepository(this.props.bus));
        this.facWaypointCache = DefaultFacilityWaypointCache.getCache(this.props.bus);
        this.clipBounds = VecNSubject.create(new Float64Array(4));
        this.clippedPathStream = new ClippedPathStream(NullPathStream.INSTANCE, this.clipBounds);
        this.pathStreamStack = new GeoProjectionPathStreamStack(NullPathStream.INSTANCE, this.props.mapProjection.getGeoProjection(), Math.PI / 12, 0.25, 8);
        this.updateScheduled = false;
    }
    /** @inheritdoc */
    onAttached() {
        this.flightPathLayerRef.instance.onAttached();
        this.waypointLayerRef.instance.onAttached();
        this.pathStreamStack.pushPostProjected(this.clippedPathStream);
        this.pathStreamStack.setConsumer(this.flightPathLayerRef.instance.display.context);
        this.initWaypointRenderer();
        this.planModule.getPlanSubjects(this.props.planIndex).flightPlan.sub(() => this.updateScheduled = true);
        this.planModule.getPlanSubjects(this.props.planIndex).planCalculated.on(() => this.updateScheduled = true);
        this.planModule.getPlanSubjects(this.props.planIndex).planChanged.on(() => this.updateScheduled = true);
        this.planModule.getPlanSubjects(this.props.planIndex).activeLeg.sub(() => this.updateScheduled = true);
        this.props.waypointRenderer.onRolesAdded.on(() => this.initWaypointRenderer());
        super.onAttached();
    }
    /**
     * Initializes the waypoint renderer for this layer.
     */
    initWaypointRenderer() {
        let hasDefaultRole = false;
        const flightPlanRoles = this.props.waypointRenderer.getRoleNamesByGroup(`${MapSystemWaypointRoles.FlightPlan}_${this.props.planIndex}`);
        for (let i = 0; i < flightPlanRoles.length; i++) {
            const roleId = this.props.waypointRenderer.getRoleFromName(flightPlanRoles[i]);
            if (roleId !== undefined) {
                this.props.waypointRenderer.setCanvasContext(roleId, this.waypointLayerRef.instance.display.context);
                this.props.waypointRenderer.setIconFactory(roleId, this.props.iconFactory);
                this.props.waypointRenderer.setLabelFactory(roleId, this.props.labelFactory);
                if (!hasDefaultRole) {
                    this.props.flightPathRenderer.defaultRoleId = roleId;
                    hasDefaultRole = true;
                }
            }
        }
    }
    /** @inheritdoc */
    onUpdated(time, elapsed) {
        this.flightPathLayerRef.instance.onUpdated(time, elapsed);
        this.waypointLayerRef.instance.onUpdated(time, elapsed);
        if (this.isVisible()) {
            const display = this.flightPathLayerRef.instance.display;
            if (display.isInvalid) {
                display.clear();
                display.syncWithMapProjection(this.props.mapProjection);
                this.updateScheduled = true;
            }
            if (this.updateScheduled) {
                if (!this.waypointsUpdating) {
                    this.updateWaypoints();
                }
                const context = display.context;
                display.clear();
                const plan = this.planModule.getPlanSubjects(this.props.planIndex).flightPlan.get();
                if (plan !== undefined) {
                    this.pathStreamStack.setProjection(display.geoProjection);
                    this.props.flightPathRenderer.render(plan, undefined, undefined, context, this.pathStreamStack);
                }
                this.updateScheduled = false;
            }
        }
    }
    /** @inheritdoc */
    onMapProjectionChanged(mapProjection, changeFlags) {
        this.flightPathLayerRef.instance.onMapProjectionChanged(mapProjection, changeFlags);
        this.waypointLayerRef.instance.onMapProjectionChanged(mapProjection, changeFlags);
        const size = this.flightPathLayerRef.instance.getSize();
        this.clipBounds.set(-MapSystemFlightPlanLayer.CLIP_BOUNDS_BUFFER, -MapSystemFlightPlanLayer.CLIP_BOUNDS_BUFFER, size + MapSystemFlightPlanLayer.CLIP_BOUNDS_BUFFER, size + MapSystemFlightPlanLayer.CLIP_BOUNDS_BUFFER);
    }
    /** @inheritdoc */
    setVisible(val) {
        super.setVisible(val);
        this.waypointLayerRef.instance.setVisible(val);
        this.flightPathLayerRef.instance.setVisible(val);
    }
    /**
     * Updates waypoints for the flight plan.
     * @throws An error if the waypoints are already updating.
     */
    async updateWaypoints() {
        if (this.waypointsUpdating) {
            throw new Error('A flight plan waypoint update is already in progress.');
        }
        this.waypointsUpdating = true;
        const flightPlan = this.planModule.getPlanSubjects(this.props.planIndex).flightPlan.get();
        const activeLegIndex = this.planModule.getPlanSubjects(this.props.planIndex).activeLeg.get();
        if (flightPlan === undefined) {
            for (const legWaypoint of this.legWaypoints.values()) {
                const [waypoint, roleId] = legWaypoint;
                this.props.waypointRenderer.deregister(waypoint, roleId, MapSystemWaypointRoles.FlightPlan);
            }
            this.legWaypoints.clear();
            this.waypointsUpdating = false;
            return;
        }
        const activeLeg = flightPlan.tryGetLeg(activeLegIndex);
        const legsToDisplay = new Map();
        let legIndex = 0;
        for (const leg of flightPlan.legs()) {
            let roleId = this.defaultRoleId;
            const handler = this.props.flightPathRenderer.legWaypointHandlers.get(this.props.planIndex);
            if (handler !== undefined) {
                roleId = handler(flightPlan, leg, activeLeg, legIndex, activeLegIndex);
            }
            if (roleId !== 0) {
                legsToDisplay.set(leg, roleId);
            }
            legIndex++;
        }
        // Remove records of legs that are no longer in the set of legs to display.
        for (const leg of this.legWaypoints) {
            const [legDefinition, legWaypoint] = leg;
            const [waypoint, roleId] = legWaypoint;
            if (!legsToDisplay.has(legDefinition)) {
                this.props.waypointRenderer.deregister(waypoint, roleId, MapSystemWaypointRoles.FlightPlan);
                this.legWaypoints.delete(legDefinition);
            }
        }
        const waypointRefreshes = [];
        // Create or refresh waypoints to display
        for (const leg of legsToDisplay) {
            waypointRefreshes.push(this.buildPlanWaypoint(leg[0], leg[1]));
        }
        await Promise.all(waypointRefreshes);
        this.waypointsUpdating = false;
    }
    /**
     * Builds or refreshes a flight plan waypoint.
     * @param leg The leg to build the waypoint for.
     * @param roleId The role ID to assign to the waypoint.
     */
    async buildPlanWaypoint(leg, roleId) {
        switch (leg.leg.type) {
            case LegType.CD:
            case LegType.VD:
            case LegType.CR:
            case LegType.VR:
            case LegType.FC:
            case LegType.FD:
            case LegType.FA:
            case LegType.CA:
            case LegType.VA:
            case LegType.FM:
            case LegType.VM:
            case LegType.CI:
            case LegType.VI:
                await this.buildTerminatorWaypoint(leg, roleId);
                break;
            case LegType.Discontinuity:
            case LegType.ThruDiscontinuity:
                break;
            default:
                await this.buildFixWaypoint(leg, roleId);
                break;
        }
    }
    /**
     * Builds a flight path terminator based waypoint.
     * @param leg The leg to build the waypoint for.
     * @param roleId The role ID to assign to the waypoint.
     */
    async buildTerminatorWaypoint(leg, roleId) {
        var _a, _b, _c, _d, _e, _f;
        const currentLeg = this.legWaypoints.get(leg);
        if (currentLeg !== undefined) {
            const [waypoint, currentRoleId] = currentLeg;
            const lastVector = (_a = leg.calculated) === null || _a === void 0 ? void 0 : _a.flightPath[((_b = leg.calculated) === null || _b === void 0 ? void 0 : _b.flightPath.length) - 1];
            if (lastVector !== undefined) {
                if (!waypoint.location.get().equals(lastVector.endLat, lastVector.endLon)) {
                    this.props.waypointRenderer.deregister(waypoint, currentRoleId, MapSystemWaypointRoles.FlightPlan);
                    const ident = (_c = leg.name) !== null && _c !== void 0 ? _c : '';
                    const newWaypoint = new FlightPathWaypoint(lastVector.endLat, lastVector.endLon, leg, `${this.waypointPrefix}_${this.waypointId++}_${ident}`, ident);
                    this.legWaypoints.set(leg, [newWaypoint, roleId]);
                    this.props.waypointRenderer.register(newWaypoint, roleId, MapSystemWaypointRoles.FlightPlan);
                }
                else if (currentRoleId !== roleId) {
                    this.props.waypointRenderer.deregister(waypoint, currentRoleId, MapSystemWaypointRoles.FlightPlan);
                    this.props.waypointRenderer.register(waypoint, roleId, MapSystemWaypointRoles.FlightPlan);
                    this.legWaypoints.set(leg, [waypoint, roleId]);
                }
            }
            else {
                this.props.waypointRenderer.deregister(waypoint, currentRoleId, MapSystemWaypointRoles.FlightPlan);
            }
        }
        else {
            const lastVector = (_d = leg.calculated) === null || _d === void 0 ? void 0 : _d.flightPath[((_e = leg.calculated) === null || _e === void 0 ? void 0 : _e.flightPath.length) - 1];
            if (lastVector !== undefined) {
                const ident = (_f = leg.name) !== null && _f !== void 0 ? _f : '';
                const newWaypoint = new FlightPathWaypoint(lastVector.endLat, lastVector.endLon, leg, `${this.waypointPrefix}_${this.waypointId++}_${ident}`, ident);
                this.legWaypoints.set(leg, [newWaypoint, roleId]);
                this.props.waypointRenderer.register(newWaypoint, roleId, MapSystemWaypointRoles.FlightPlan);
            }
        }
    }
    /**
     * Builds a standard facility fix waypoint for flight plan waypoint display.
     * @param leg The leg to build the waypoint for.
     * @param roleId The role ID to assign to the waypoint.
     */
    async buildFixWaypoint(leg, roleId) {
        var _a;
        const legWaypoint = this.legWaypoints.get(leg);
        if (legWaypoint === undefined) {
            const facIcao = leg.leg.fixIcao;
            let facility;
            try {
                facility = await this.facLoader.getFacility(ICAO.getFacilityType(facIcao), facIcao);
            }
            catch (err) {
                /* continue */
            }
            if (facility !== undefined) {
                const waypoint = this.facWaypointCache.get(facility);
                const ident = (_a = leg.name) !== null && _a !== void 0 ? _a : '';
                const newWaypoint = new FlightPathWaypoint(waypoint.location, leg, `${this.waypointPrefix}_${this.waypointId++}_${ident}`, ident);
                this.props.waypointRenderer.register(newWaypoint, roleId, MapSystemWaypointRoles.FlightPlan);
                this.legWaypoints.set(leg, [newWaypoint, roleId]);
            }
        }
        else {
            const [waypoint, currentRoleId] = legWaypoint;
            if (currentRoleId !== roleId) {
                this.props.waypointRenderer.deregister(waypoint, currentRoleId, MapSystemWaypointRoles.FlightPlan);
                this.props.waypointRenderer.register(waypoint, roleId, MapSystemWaypointRoles.FlightPlan);
                this.legWaypoints.set(leg, [waypoint, roleId]);
            }
        }
    }
    /** @inheritdoc */
    render() {
        var _a, _b;
        return (FSComponent.buildComponent(FSComponent.Fragment, null,
            FSComponent.buildComponent(MapCachedCanvasLayer, { ref: this.flightPathLayerRef, model: this.props.model, mapProjection: this.props.mapProjection, overdrawFactor: Math.SQRT2, class: (_a = this.props.class) !== null && _a !== void 0 ? _a : '' }),
            FSComponent.buildComponent(MapSyncedCanvasLayer, { ref: this.waypointLayerRef, model: this.props.model, mapProjection: this.props.mapProjection, class: (_b = this.props.class) !== null && _b !== void 0 ? _b : '' })));
    }
}
MapSystemFlightPlanLayer.WAYPOINT_PREFIX = 'MapSystemFplLayer';
MapSystemFlightPlanLayer.CLIP_BOUNDS_BUFFER = 10;
MapSystemFlightPlanLayer.instanceId = 0;

/**
 * ADS-B operating modes.
 */
var AdsbOperatingMode;
(function (AdsbOperatingMode) {
    AdsbOperatingMode["Standby"] = "Standby";
    AdsbOperatingMode["Surface"] = "Surface";
    AdsbOperatingMode["Airborne"] = "Airborne";
})(AdsbOperatingMode || (AdsbOperatingMode = {}));

/**
 * TCAS operating modes.
 */
var TcasOperatingMode;
(function (TcasOperatingMode) {
    TcasOperatingMode["Off"] = "Off";
    TcasOperatingMode["Standby"] = "Standby";
    TcasOperatingMode["TAOnly"] = "TAOnly";
    TcasOperatingMode["TA_RA"] = "TA/RA";
    TcasOperatingMode["Test"] = "Test";
    TcasOperatingMode["Failed"] = "Failed";
})(TcasOperatingMode || (TcasOperatingMode = {}));
/**
 * TCAS alert level.
 */
var TcasAlertLevel;
(function (TcasAlertLevel) {
    TcasAlertLevel[TcasAlertLevel["None"] = 0] = "None";
    TcasAlertLevel[TcasAlertLevel["ProximityAdvisory"] = 1] = "ProximityAdvisory";
    TcasAlertLevel[TcasAlertLevel["TrafficAdvisory"] = 2] = "TrafficAdvisory";
    TcasAlertLevel[TcasAlertLevel["ResolutionAdvisory"] = 3] = "ResolutionAdvisory";
})(TcasAlertLevel || (TcasAlertLevel = {}));
/**
 * Bit flags describing TCAS resolution advisories.
 */
var TcasResolutionAdvisoryFlags;
(function (TcasResolutionAdvisoryFlags) {
    /** A corrective resolution advisory. Requires a change in the own airplane's vertical speed. */
    TcasResolutionAdvisoryFlags[TcasResolutionAdvisoryFlags["Corrective"] = 1] = "Corrective";
    /** An upward sense resolution advisory. Commands a vertical speed above a certain value. */
    TcasResolutionAdvisoryFlags[TcasResolutionAdvisoryFlags["UpSense"] = 2] = "UpSense";
    /** A downward sense resolution advisory. Commands a vertical speed below a certain value. */
    TcasResolutionAdvisoryFlags[TcasResolutionAdvisoryFlags["DownSense"] = 4] = "DownSense";
    /** A resolution advisory which crosses an intruder's altitude. */
    TcasResolutionAdvisoryFlags[TcasResolutionAdvisoryFlags["Crossing"] = 8] = "Crossing";
    /** A CLIMB resolution advisory. Commands a positive vertical speed above 1500 FPM. */
    TcasResolutionAdvisoryFlags[TcasResolutionAdvisoryFlags["Climb"] = 16] = "Climb";
    /** A DESCEND resolution advisory. Commands a negative vertical speed below -1500 FPM. */
    TcasResolutionAdvisoryFlags[TcasResolutionAdvisoryFlags["Descend"] = 32] = "Descend";
    /** An INCREASE CLIMB or INCREASE DESCENT resolution advisory. Commands a vertical speed above 2500 FPM or below -2500 FPM. */
    TcasResolutionAdvisoryFlags[TcasResolutionAdvisoryFlags["Increase"] = 64] = "Increase";
    /** A CLIMB or DESCEND resolution advisory that reverses sense. Commands a vertical speed above 1500 FPM or below -1500 FPM. */
    TcasResolutionAdvisoryFlags[TcasResolutionAdvisoryFlags["Reversal"] = 128] = "Reversal";
    /** A corrective REDUCE CLIMB resolution advisory. Commands a vertical speed of 0 FPM or less. */
    TcasResolutionAdvisoryFlags[TcasResolutionAdvisoryFlags["ReduceClimb"] = 256] = "ReduceClimb";
    /** A corrective REDUCE DESCENT resolution advisory. Commands a vertical speed of 0 FPM or more. */
    TcasResolutionAdvisoryFlags[TcasResolutionAdvisoryFlags["ReduceDescent"] = 512] = "ReduceDescent";
    /** A preventative DO NOT CLIMB resolution advisory. Commands a non-positive vertical speed. */
    TcasResolutionAdvisoryFlags[TcasResolutionAdvisoryFlags["DoNotClimb"] = 1024] = "DoNotClimb";
    /** A preventative DO NOT DESCEND resolution advisory. Commands a non-negative vertical speed. */
    TcasResolutionAdvisoryFlags[TcasResolutionAdvisoryFlags["DoNotDescend"] = 2048] = "DoNotDescend";
})(TcasResolutionAdvisoryFlags || (TcasResolutionAdvisoryFlags = {}));
/**
 * Types of TCAS resolution advisories.
 */
var TcasResolutionAdvisoryType;
(function (TcasResolutionAdvisoryType) {
    /** Upward sense, positive, corrective, required vertical speed 1500 to 2000 fpm. */
    TcasResolutionAdvisoryType["Climb"] = "Climb";
    /** Upward sense, positive, corrective, crosses intruder altitude, required vertical speed 1500 to 2000 fpm. */
    TcasResolutionAdvisoryType["CrossingClimb"] = "CrossingClimb";
    /** Upward sense, positive, corrective, required vertical speed 1500 to 4400 fpm. */
    TcasResolutionAdvisoryType["MaintainClimb"] = "MaintainClimb";
    /** Upward sense, positive, corrective, crosses intruder altitude, required vertical speed 1500 to 2000 fpm. */
    TcasResolutionAdvisoryType["CrossingMaintainClimb"] = "CrossingMaintainClimb";
    /** Upward sense, positive, corrective, required vertical speed 2500 to 3000 fpm. */
    TcasResolutionAdvisoryType["IncreaseClimb"] = "IncreaseClimb";
    /** Upward sense, positive, corrective, transition from downward sense, required vertical speed 1500 to 2000 fpm. */
    TcasResolutionAdvisoryType["ReversalClimb"] = "ReversalClimb";
    /** Upward sense, negative, corrective, required vertical speed >= 0 fpm. */
    TcasResolutionAdvisoryType["ReduceDescent"] = "ReduceDescent";
    /** Upward sense, negative, preventative, required vertical speed >= 0 fpm. */
    TcasResolutionAdvisoryType["DoNotDescend0"] = "DoNotDescend0";
    /** Upward sense, negative, preventative, required vertical speed >= -500 fpm. */
    TcasResolutionAdvisoryType["DoNotDescend500"] = "DoNotDescend500";
    /** Upward sense, negative, preventative, required vertical speed >= -1000 fpm. */
    TcasResolutionAdvisoryType["DoNotDescend1000"] = "DoNotDescend1000";
    /** Upward sense, negative, preventative, required vertical speed >= -1500 fpm. */
    TcasResolutionAdvisoryType["DoNotDescend1500"] = "DoNotDescend1500";
    /** Upward sense, negative, preventative, required vertical speed >= -2000 fpm. */
    TcasResolutionAdvisoryType["DoNotDescend2000"] = "DoNotDescend2000";
    /** Downward sense, positive, corrective, required vertical speed -1500 to -2000 fpm. */
    TcasResolutionAdvisoryType["Descend"] = "Descend";
    /** Downward sense, positive, corrective, crosses intruder altitude, required vertical speed -1500 to -2000 fpm. */
    TcasResolutionAdvisoryType["CrossingDescend"] = "CrossingDescend";
    /** Downward sense, positive, corrective, required vertical speed -1500 to -4400 fpm. */
    TcasResolutionAdvisoryType["MaintainDescend"] = "MaintainDescend";
    /** Downward sense, positive, corrective, crosses intruder altitude, required vertical speed -1500 to -4400 fpm. */
    TcasResolutionAdvisoryType["CrossingMaintainDescend"] = "CrossingMaintainDescend";
    /** Downward sense, positive, corrective, required vertical speed -2500 to -3000 fpm. */
    TcasResolutionAdvisoryType["IncreaseDescend"] = "IncreaseDescend";
    /** Downward sense, positive, corrective, transition from upward sense, required vertical speed -1500 to -2000 fpm. */
    TcasResolutionAdvisoryType["ReversalDescend"] = "ReversalDescend";
    /** Downward sense, negative, corrective, required vertical speed <= 0 fpm. */
    TcasResolutionAdvisoryType["ReduceClimb"] = "ReduceClimb";
    /** Downward sense, negative, preventative, required vertical speed <= 0 fpm. */
    TcasResolutionAdvisoryType["DoNotClimb0"] = "DoNotClimb0";
    /** Downward sense, negative, preventative, required vertical speed <= 500 fpm. */
    TcasResolutionAdvisoryType["DoNotClimb500"] = "DoNotClimb500";
    /** Downward sense, negative, preventative, required vertical speed <= 1000 fpm. */
    TcasResolutionAdvisoryType["DoNotClimb1000"] = "DoNotClimb1000";
    /** Downward sense, negative, preventative, required vertical speed <= 1500 fpm. */
    TcasResolutionAdvisoryType["DoNotClimb1500"] = "DoNotClimb1500";
    /** Downward sense, negative, preventative, required vertical speed <= 2000 fpm. */
    TcasResolutionAdvisoryType["DoNotClimb2000"] = "DoNotClimb2000";
    /** Clear of conflict. */
    TcasResolutionAdvisoryType["Clear"] = "Clear";
})(TcasResolutionAdvisoryType || (TcasResolutionAdvisoryType = {}));
({
    initialResponseTime: UnitType.SECOND.createNumber(5),
    initialAcceleration: UnitType.G_ACCEL.createNumber(0.25),
    subsequentResponseTime: UnitType.SECOND.createNumber(2.5),
    subsequentAcceleration: UnitType.G_ACCEL.createNumber(0.35)
});
UnitType.KNOT.createNumber(30);
UnitType.FPM.convertTo(1500, UnitType.MPS);
UnitType.FPM.convertTo(2500, UnitType.MPS);
({
    [TcasResolutionAdvisoryType.Clear]: {
        flags: 0,
        minVerticalSpeed: -Infinity,
        maxVerticalSpeed: Infinity
    },
    [TcasResolutionAdvisoryType.Climb]: {
        flags: TcasResolutionAdvisoryFlags.UpSense | TcasResolutionAdvisoryFlags.Climb | TcasResolutionAdvisoryFlags.Corrective,
        minVerticalSpeed: 1500,
        maxVerticalSpeed: 2000
    },
    [TcasResolutionAdvisoryType.MaintainClimb]: {
        flags: TcasResolutionAdvisoryFlags.UpSense | TcasResolutionAdvisoryFlags.Climb,
        minVerticalSpeed: 1500,
        maxVerticalSpeed: 4400
    },
    [TcasResolutionAdvisoryType.CrossingClimb]: {
        flags: TcasResolutionAdvisoryFlags.UpSense | TcasResolutionAdvisoryFlags.Climb | TcasResolutionAdvisoryFlags.Crossing | TcasResolutionAdvisoryFlags.Corrective,
        minVerticalSpeed: 1500,
        maxVerticalSpeed: 2000
    },
    [TcasResolutionAdvisoryType.CrossingMaintainClimb]: {
        flags: TcasResolutionAdvisoryFlags.UpSense | TcasResolutionAdvisoryFlags.Climb | TcasResolutionAdvisoryFlags.Crossing,
        minVerticalSpeed: 1500,
        maxVerticalSpeed: 4400
    },
    [TcasResolutionAdvisoryType.IncreaseClimb]: {
        flags: TcasResolutionAdvisoryFlags.UpSense | TcasResolutionAdvisoryFlags.Climb | TcasResolutionAdvisoryFlags.Increase | TcasResolutionAdvisoryFlags.Corrective,
        minVerticalSpeed: 2500,
        maxVerticalSpeed: 3000
    },
    [TcasResolutionAdvisoryType.ReversalClimb]: {
        flags: TcasResolutionAdvisoryFlags.UpSense | TcasResolutionAdvisoryFlags.Climb | TcasResolutionAdvisoryFlags.Reversal | TcasResolutionAdvisoryFlags.Corrective,
        minVerticalSpeed: 1500,
        maxVerticalSpeed: 2000
    },
    [TcasResolutionAdvisoryType.ReduceDescent]: {
        flags: TcasResolutionAdvisoryFlags.UpSense | TcasResolutionAdvisoryFlags.ReduceDescent | TcasResolutionAdvisoryFlags.Corrective,
        minVerticalSpeed: 0,
        maxVerticalSpeed: Infinity
    },
    [TcasResolutionAdvisoryType.DoNotDescend0]: {
        flags: TcasResolutionAdvisoryFlags.UpSense | TcasResolutionAdvisoryFlags.DoNotDescend,
        minVerticalSpeed: 0,
        maxVerticalSpeed: Infinity
    },
    [TcasResolutionAdvisoryType.DoNotDescend500]: {
        flags: TcasResolutionAdvisoryFlags.UpSense | TcasResolutionAdvisoryFlags.DoNotDescend,
        minVerticalSpeed: -500,
        maxVerticalSpeed: Infinity
    },
    [TcasResolutionAdvisoryType.DoNotDescend1000]: {
        flags: TcasResolutionAdvisoryFlags.UpSense | TcasResolutionAdvisoryFlags.DoNotDescend,
        minVerticalSpeed: -1000,
        maxVerticalSpeed: Infinity
    },
    [TcasResolutionAdvisoryType.DoNotDescend1500]: {
        flags: TcasResolutionAdvisoryFlags.UpSense | TcasResolutionAdvisoryFlags.DoNotDescend,
        minVerticalSpeed: -1500,
        maxVerticalSpeed: Infinity
    },
    [TcasResolutionAdvisoryType.DoNotDescend2000]: {
        flags: TcasResolutionAdvisoryFlags.UpSense | TcasResolutionAdvisoryFlags.DoNotDescend,
        minVerticalSpeed: -2000,
        maxVerticalSpeed: Infinity
    },
    [TcasResolutionAdvisoryType.Descend]: {
        flags: TcasResolutionAdvisoryFlags.DownSense | TcasResolutionAdvisoryFlags.Descend | TcasResolutionAdvisoryFlags.Corrective,
        minVerticalSpeed: -2000,
        maxVerticalSpeed: -1500
    },
    [TcasResolutionAdvisoryType.MaintainDescend]: {
        flags: TcasResolutionAdvisoryFlags.DownSense | TcasResolutionAdvisoryFlags.Descend,
        minVerticalSpeed: -4400,
        maxVerticalSpeed: -1500
    },
    [TcasResolutionAdvisoryType.CrossingDescend]: {
        flags: TcasResolutionAdvisoryFlags.DownSense | TcasResolutionAdvisoryFlags.Descend | TcasResolutionAdvisoryFlags.Crossing | TcasResolutionAdvisoryFlags.Corrective,
        minVerticalSpeed: -2000,
        maxVerticalSpeed: -1500
    },
    [TcasResolutionAdvisoryType.CrossingMaintainDescend]: {
        flags: TcasResolutionAdvisoryFlags.DownSense | TcasResolutionAdvisoryFlags.Descend | TcasResolutionAdvisoryFlags.Crossing,
        minVerticalSpeed: -4400,
        maxVerticalSpeed: -1500
    },
    [TcasResolutionAdvisoryType.IncreaseDescend]: {
        flags: TcasResolutionAdvisoryFlags.DownSense | TcasResolutionAdvisoryFlags.Descend | TcasResolutionAdvisoryFlags.Increase | TcasResolutionAdvisoryFlags.Corrective,
        minVerticalSpeed: -3000,
        maxVerticalSpeed: -2500
    },
    [TcasResolutionAdvisoryType.ReversalDescend]: {
        flags: TcasResolutionAdvisoryFlags.DownSense | TcasResolutionAdvisoryFlags.Descend | TcasResolutionAdvisoryFlags.Reversal | TcasResolutionAdvisoryFlags.Corrective,
        minVerticalSpeed: -2000,
        maxVerticalSpeed: -1500
    },
    [TcasResolutionAdvisoryType.ReduceClimb]: {
        flags: TcasResolutionAdvisoryFlags.DownSense | TcasResolutionAdvisoryFlags.ReduceClimb | TcasResolutionAdvisoryFlags.Corrective,
        minVerticalSpeed: -Infinity,
        maxVerticalSpeed: 0
    },
    [TcasResolutionAdvisoryType.DoNotClimb0]: {
        flags: TcasResolutionAdvisoryFlags.DownSense | TcasResolutionAdvisoryFlags.DoNotClimb,
        minVerticalSpeed: -Infinity,
        maxVerticalSpeed: 0
    },
    [TcasResolutionAdvisoryType.DoNotClimb500]: {
        flags: TcasResolutionAdvisoryFlags.DownSense | TcasResolutionAdvisoryFlags.DoNotClimb,
        minVerticalSpeed: -Infinity,
        maxVerticalSpeed: 500
    },
    [TcasResolutionAdvisoryType.DoNotClimb1000]: {
        flags: TcasResolutionAdvisoryFlags.DownSense | TcasResolutionAdvisoryFlags.DoNotClimb,
        minVerticalSpeed: -Infinity,
        maxVerticalSpeed: 1000
    },
    [TcasResolutionAdvisoryType.DoNotClimb1500]: {
        flags: TcasResolutionAdvisoryFlags.DownSense | TcasResolutionAdvisoryFlags.DoNotClimb,
        minVerticalSpeed: -Infinity,
        maxVerticalSpeed: 1500
    },
    [TcasResolutionAdvisoryType.DoNotClimb2000]: {
        flags: TcasResolutionAdvisoryFlags.DownSense | TcasResolutionAdvisoryFlags.DoNotClimb,
        minVerticalSpeed: -Infinity,
        maxVerticalSpeed: 2000
    },
});
({
    protectedRadius: UnitType.NMILE.createNumber(6),
    protectedHeight: UnitType.FOOT.createNumber(1200)
});
[
    {
        tau: UnitType.SECOND.createNumber(20),
        protectedRadius: UnitType.NMILE.createNumber(0.3),
        protectedHeight: UnitType.FOOT.createNumber(850)
    },
    {
        tau: UnitType.SECOND.createNumber(25),
        protectedRadius: UnitType.NMILE.createNumber(0.33),
        protectedHeight: UnitType.FOOT.createNumber(850)
    },
    {
        tau: UnitType.SECOND.createNumber(30),
        protectedRadius: UnitType.NMILE.createNumber(0.48),
        protectedHeight: UnitType.FOOT.createNumber(850)
    },
    {
        tau: UnitType.SECOND.createNumber(40),
        protectedRadius: UnitType.NMILE.createNumber(0.75),
        protectedHeight: UnitType.FOOT.createNumber(850)
    },
    {
        tau: UnitType.SECOND.createNumber(45),
        protectedRadius: UnitType.NMILE.createNumber(1),
        protectedHeight: UnitType.FOOT.createNumber(850)
    },
    {
        tau: UnitType.SECOND.createNumber(48),
        protectedRadius: UnitType.NMILE.createNumber(1.3),
        protectedHeight: UnitType.FOOT.createNumber(850)
    },
    {
        tau: UnitType.SECOND.createNumber(48),
        protectedRadius: UnitType.NMILE.createNumber(1.3),
        protectedHeight: UnitType.FOOT.createNumber(1200)
    }
];
[
    {
        tau: UnitType.SECOND.createNumber(15),
        protectedRadius: UnitType.NMILE.createNumber(0.2),
        protectedHeight: UnitType.FOOT.createNumber(600),
        alim: UnitType.FOOT.createNumber(300),
        hmd: UnitType.NMILE.createNumber(0.4)
    },
    {
        tau: UnitType.SECOND.createNumber(15),
        protectedRadius: UnitType.NMILE.createNumber(0.2),
        protectedHeight: UnitType.FOOT.createNumber(600),
        alim: UnitType.FOOT.createNumber(300),
        hmd: UnitType.NMILE.createNumber(0.4)
    },
    {
        tau: UnitType.SECOND.createNumber(20),
        protectedRadius: UnitType.NMILE.createNumber(0.35),
        protectedHeight: UnitType.FOOT.createNumber(600),
        alim: UnitType.FOOT.createNumber(300),
        hmd: UnitType.NMILE.createNumber(0.57)
    },
    {
        tau: UnitType.SECOND.createNumber(25),
        protectedRadius: UnitType.NMILE.createNumber(0.55),
        protectedHeight: UnitType.FOOT.createNumber(600),
        alim: UnitType.FOOT.createNumber(350),
        hmd: UnitType.NMILE.createNumber(0.74)
    },
    {
        tau: UnitType.SECOND.createNumber(30),
        protectedRadius: UnitType.NMILE.createNumber(0.8),
        protectedHeight: UnitType.FOOT.createNumber(600),
        alim: UnitType.FOOT.createNumber(400),
        hmd: UnitType.NMILE.createNumber(0.82)
    },
    {
        tau: UnitType.SECOND.createNumber(35),
        protectedRadius: UnitType.NMILE.createNumber(1.1),
        protectedHeight: UnitType.FOOT.createNumber(700),
        alim: UnitType.FOOT.createNumber(600),
        hmd: UnitType.NMILE.createNumber(0.98)
    },
    {
        tau: UnitType.SECOND.createNumber(35),
        protectedRadius: UnitType.NMILE.createNumber(1.1),
        protectedHeight: UnitType.FOOT.createNumber(800),
        alim: UnitType.FOOT.createNumber(700),
        hmd: UnitType.NMILE.createNumber(0.98)
    }
];

/**
 * Traffic alert level modes.
 */
var MapTrafficAlertLevelVisibility;
(function (MapTrafficAlertLevelVisibility) {
    MapTrafficAlertLevelVisibility[MapTrafficAlertLevelVisibility["Other"] = 1] = "Other";
    MapTrafficAlertLevelVisibility[MapTrafficAlertLevelVisibility["ProximityAdvisory"] = 2] = "ProximityAdvisory";
    MapTrafficAlertLevelVisibility[MapTrafficAlertLevelVisibility["TrafficAdvisory"] = 4] = "TrafficAdvisory";
    MapTrafficAlertLevelVisibility[MapTrafficAlertLevelVisibility["ResolutionAdvisory"] = 8] = "ResolutionAdvisory";
    MapTrafficAlertLevelVisibility[MapTrafficAlertLevelVisibility["All"] = 15] = "All";
})(MapTrafficAlertLevelVisibility || (MapTrafficAlertLevelVisibility = {}));

/**
 * A map layer which displays traffic intruders.
 */
class MapSystemTrafficLayer extends MapLayer {
    constructor() {
        var _a;
        super(...arguments);
        this.iconLayerRef = FSComponent.createRef();
        this.trafficModule = this.props.model.getModule(MapSystemKeys.Traffic);
        this.intruderIcons = {
            [TcasAlertLevel.None]: new Map(),
            [TcasAlertLevel.ProximityAdvisory]: new Map(),
            [TcasAlertLevel.TrafficAdvisory]: new Map(),
            [TcasAlertLevel.ResolutionAdvisory]: new Map()
        };
        this.needHandleOffscaleOob = this.props.offScaleIntruders !== undefined || this.props.oobIntruders !== undefined;
        this.oobOffset = (_a = this.props.oobOffset) !== null && _a !== void 0 ? _a : Subject.create(VecNMath.create(4));
        this.oobBounds = VecNSubject.createFromVector(VecNMath.create(4));
        this.isInit = false;
    }
    /** @inheritdoc */
    onVisibilityChanged(isVisible) {
        var _a, _b;
        if (!isVisible) {
            if (this.isInit) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                this.iconLayerRef.instance.display.clear();
            }
            (_a = this.props.offScaleIntruders) === null || _a === void 0 ? void 0 : _a.clear();
            (_b = this.props.oobIntruders) === null || _b === void 0 ? void 0 : _b.clear();
        }
    }
    /** @inheritdoc */
    onAttached() {
        this.iconLayerRef.instance.onAttached();
        this.oobOffset.sub(this.updateOobBounds.bind(this), true);
        this.trafficModule.operatingMode.sub(this.updateVisibility.bind(this));
        this.trafficModule.show.sub(this.updateVisibility.bind(this), true);
        this.initCanvasStyles();
        this.initIntruders();
        this.initTCASHandlers();
        this.isInit = true;
    }
    /**
     * Initializes canvas styles.
     */
    initCanvasStyles() {
        this.props.initCanvasStyles && this.props.initCanvasStyles(this.iconLayerRef.instance.display.context);
    }
    /**
     * Initializes all currently existing TCAS intruders.
     */
    initIntruders() {
        const intruders = this.trafficModule.tcas.getIntruders();
        const len = intruders.length;
        for (let i = 0; i < len; i++) {
            this.onIntruderAdded(intruders[i]);
        }
    }
    /**
     * Initializes handlers to respond to TCAS events.
     */
    initTCASHandlers() {
        const tcasSub = this.props.context.bus.getSubscriber();
        tcasSub.on('tcas_intruder_added').handle(this.onIntruderAdded.bind(this));
        tcasSub.on('tcas_intruder_removed').handle(this.onIntruderRemoved.bind(this));
        tcasSub.on('tcas_intruder_alert_changed').handle(this.onIntruderAlertLevelChanged.bind(this));
    }
    /** @inheritdoc */
    onMapProjectionChanged(mapProjection, changeFlags) {
        this.iconLayerRef.instance.onMapProjectionChanged(mapProjection, changeFlags);
        if (BitFlags.isAll(changeFlags, MapProjectionChangeType.ProjectedSize)) {
            this.initCanvasStyles();
            this.updateOobBounds();
        }
    }
    /**
     * Updates the boundaries of the intruder out-of-bounds area.
     */
    updateOobBounds() {
        const projectedSize = this.props.mapProjection.getProjectedSize();
        const oobOffset = this.oobOffset.get();
        this.oobBounds.set(oobOffset[0], oobOffset[1], projectedSize[0] - oobOffset[2], projectedSize[1] - oobOffset[3]);
    }
    /** @inheritdoc */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onUpdated(time, elapsed) {
        if (!this.isVisible()) {
            return;
        }
        this.redrawIntruders();
    }
    /**
     * Redraws all tracked intruders.
     */
    redrawIntruders() {
        const alertLevelVisFlags = this.trafficModule.alertLevelVisibility.get();
        const offScaleRange = this.trafficModule.offScaleRange.get();
        const oobBounds = this.oobBounds.get();
        const iconDisplay = this.iconLayerRef.instance.display;
        iconDisplay.clear();
        for (let i = 0; i < MapSystemTrafficLayer.DRAW_GROUPS.length; i++) {
            const group = MapSystemTrafficLayer.DRAW_GROUPS[i];
            if (BitFlags.isAll(alertLevelVisFlags, group.alertLevelVisFlag)) {
                this.intruderIcons[group.alertLevel].forEach(icon => {
                    var _a, _b, _c, _d, _e, _f;
                    icon.draw(this.props.mapProjection, iconDisplay.context, offScaleRange);
                    if (this.needHandleOffscaleOob) {
                        if (icon.isOffScale) {
                            (_a = this.props.oobIntruders) === null || _a === void 0 ? void 0 : _a.delete(icon.intruder);
                            (_b = this.props.offScaleIntruders) === null || _b === void 0 ? void 0 : _b.add(icon.intruder);
                        }
                        else if (!this.props.mapProjection.isInProjectedBounds(icon.projectedPos, oobBounds)) {
                            (_c = this.props.offScaleIntruders) === null || _c === void 0 ? void 0 : _c.delete(icon.intruder);
                            (_d = this.props.oobIntruders) === null || _d === void 0 ? void 0 : _d.add(icon.intruder);
                        }
                        else {
                            (_e = this.props.offScaleIntruders) === null || _e === void 0 ? void 0 : _e.delete(icon.intruder);
                            (_f = this.props.oobIntruders) === null || _f === void 0 ? void 0 : _f.delete(icon.intruder);
                        }
                    }
                });
            }
            else if (this.needHandleOffscaleOob) {
                this.intruderIcons[group.alertLevel].forEach(icon => {
                    var _a, _b;
                    (_a = this.props.offScaleIntruders) === null || _a === void 0 ? void 0 : _a.delete(icon.intruder);
                    (_b = this.props.oobIntruders) === null || _b === void 0 ? void 0 : _b.delete(icon.intruder);
                });
            }
        }
    }
    /**
     * Updates this layer's visibility.
     */
    updateVisibility() {
        const operatingMode = this.trafficModule.tcas.getOperatingMode();
        this.setVisible(this.trafficModule.show.get()
            && (operatingMode === TcasOperatingMode.TAOnly
                || operatingMode === TcasOperatingMode.TA_RA
                || operatingMode === TcasOperatingMode.Test));
    }
    /**
     * A callback which is called when a TCAS intruder is added.
     * @param intruder The new intruder.
     */
    onIntruderAdded(intruder) {
        const icon = this.props.iconFactory(intruder, this.props.context);
        this.intruderIcons[intruder.alertLevel.get()].set(intruder, icon);
    }
    /**
     * A callback which is called when a TCAS intruder is removed.
     * @param intruder The removed intruder.
     */
    onIntruderRemoved(intruder) {
        var _a, _b;
        (_a = this.props.offScaleIntruders) === null || _a === void 0 ? void 0 : _a.delete(intruder);
        (_b = this.props.oobIntruders) === null || _b === void 0 ? void 0 : _b.delete(intruder);
        this.intruderIcons[intruder.alertLevel.get()].delete(intruder);
    }
    /**
     * A callback which is called when the alert level of a TCAS intruder is changed.
     * @param intruder The intruder.
     */
    onIntruderAlertLevelChanged(intruder) {
        let oldAlertLevel;
        let view = this.intruderIcons[oldAlertLevel = TcasAlertLevel.None].get(intruder);
        view !== null && view !== void 0 ? view : (view = this.intruderIcons[oldAlertLevel = TcasAlertLevel.ProximityAdvisory].get(intruder));
        view !== null && view !== void 0 ? view : (view = this.intruderIcons[oldAlertLevel = TcasAlertLevel.TrafficAdvisory].get(intruder));
        view !== null && view !== void 0 ? view : (view = this.intruderIcons[oldAlertLevel = TcasAlertLevel.ResolutionAdvisory].get(intruder));
        if (view) {
            this.intruderIcons[oldAlertLevel].delete(intruder);
            this.intruderIcons[intruder.alertLevel.get()].set(intruder, view);
        }
    }
    /** @inheritdoc */
    render() {
        var _a;
        return (FSComponent.buildComponent(MapSyncedCanvasLayer, { ref: this.iconLayerRef, model: this.props.model, mapProjection: this.props.mapProjection, class: (_a = this.props.class) !== null && _a !== void 0 ? _a : '' }));
    }
}
MapSystemTrafficLayer.DRAW_GROUPS = [
    { alertLevelVisFlag: MapTrafficAlertLevelVisibility.Other, alertLevel: TcasAlertLevel.None },
    { alertLevelVisFlag: MapTrafficAlertLevelVisibility.ProximityAdvisory, alertLevel: TcasAlertLevel.ProximityAdvisory },
    { alertLevelVisFlag: MapTrafficAlertLevelVisibility.TrafficAdvisory, alertLevel: TcasAlertLevel.TrafficAdvisory },
    { alertLevelVisFlag: MapTrafficAlertLevelVisibility.ResolutionAdvisory, alertLevel: TcasAlertLevel.ResolutionAdvisory },
];
[new GeoPoint(0, 0)];

/** The acceptable priority types for a given warning. */
var WarningType;
(function (WarningType) {
    WarningType[WarningType["Warning"] = 0] = "Warning";
    WarningType[WarningType["Caution"] = 1] = "Caution";
    WarningType[WarningType["Test"] = 2] = "Test";
    WarningType[WarningType["SoundOnly"] = 3] = "SoundOnly";
})(WarningType || (WarningType = {}));

/**
 * The style of cursor to use on a circular gauge.
 * This is treated as though it may have multiple options in the original
 * source.  For the sake of future expansion we'll make this an enum even
 * though it currently only has one option.  Maybe it can be used for future
 * expansion.
 */
var XMLCircularGaugeCursor;
(function (XMLCircularGaugeCursor) {
    /** Starting the enum at 1 to match its value in the stock XMLEngineDisplay.js */
    XMLCircularGaugeCursor[XMLCircularGaugeCursor["Triangle"] = 1] = "Triangle";
})(XMLCircularGaugeCursor || (XMLCircularGaugeCursor = {}));
/**
 * The possible locations for value text.
 * This is treated as though it may have multiple options in the original
 * source.  For the sake of future expansion we'll make this an enum even
 * though it currently only has one option.  Maybe it can be used for future
 * expansion.
 */
var XMLCircularGaugeValuePos;
(function (XMLCircularGaugeValuePos) {
    /** Starting the enum at 1 to match its value in the stock XMLEngineDisplay.js */
    XMLCircularGaugeValuePos[XMLCircularGaugeValuePos["End"] = 1] = "End";
})(XMLCircularGaugeValuePos || (XMLCircularGaugeValuePos = {}));

/**
 * This provides the valid values for the ValuePos tag on a horizontal gauge.
 */
var XMLHorizontalGaugeValuePos;
(function (XMLHorizontalGaugeValuePos) {
    /** Starting the enum at 1 to match its value in the stock XMLEngineDisplay.js */
    XMLHorizontalGaugeValuePos[XMLHorizontalGaugeValuePos["End"] = 1] = "End";
    XMLHorizontalGaugeValuePos[XMLHorizontalGaugeValuePos["Right"] = 2] = "Right";
})(XMLHorizontalGaugeValuePos || (XMLHorizontalGaugeValuePos = {}));

/**
 * This provides the valid values for the ValuePos tag on a vertical gauge.
 */
var XMLVerticalGaugeValuePos;
(function (XMLVerticalGaugeValuePos) {
    /** Starting the enum at 1 to match its value in the stock XMLEngineDisplay.js */
    XMLVerticalGaugeValuePos[XMLVerticalGaugeValuePos["None"] = 1] = "None";
})(XMLVerticalGaugeValuePos || (XMLVerticalGaugeValuePos = {}));

/**
 * The possible locations for value text.
 * This is treated as though it may have multiple options in the original
 * source.  For the sake of future expansion we'll make this an enum even
 * though it currently only has one option.  Maybe it can be used for future
 * expansion.
 */
var XMLDoubleHorizontalGaugeValuePos;
(function (XMLDoubleHorizontalGaugeValuePos) {
    /** Starting the enum at 2 to match its value in the stock XMLEngineDisplay.js */
    XMLDoubleHorizontalGaugeValuePos[XMLDoubleHorizontalGaugeValuePos["Right"] = 2] = "Right";
})(XMLDoubleHorizontalGaugeValuePos || (XMLDoubleHorizontalGaugeValuePos = {}));

/// <reference types="@microsoft/msfs-types/pages/vcockpit/instruments/shared/utils/xmllogic" />
/**
 * The type of gauges available, as defined in XMLEngineDisplay.js.
 */
var XMLGaugeType;
(function (XMLGaugeType) {
    XMLGaugeType["Circular"] = "Circular";
    XMLGaugeType["Horizontal"] = "Horizontal";
    XMLGaugeType["DoubleHorizontal"] = "DoubleHorizontal";
    XMLGaugeType["Vertical"] = "Vertical";
    XMLGaugeType["DoubleVertical"] = "DoubleVertical";
    XMLGaugeType["Text"] = "Text";
    XMLGaugeType["ColumnGroup"] = "ColumnGroup";
    XMLGaugeType["Column"] = "Column";
    XMLGaugeType["Cylinder"] = "Cylinder";
    XMLGaugeType["TwinCylinder"] = "TwinCylinder";
})(XMLGaugeType || (XMLGaugeType = {}));

/** An alert can be either new or acknowledged. */
var AlertState;
(function (AlertState) {
    /** A newly arrived, unackowledged alert message. */
    AlertState[AlertState["New"] = 0] = "New";
    /** An alert message that has been acknowledged. */
    AlertState[AlertState["Acked"] = 1] = "Acked";
})(AlertState || (AlertState = {}));

var APVerticalModes;
(function (APVerticalModes) {
    APVerticalModes[APVerticalModes["NONE"] = 0] = "NONE";
    APVerticalModes[APVerticalModes["PITCH"] = 1] = "PITCH";
    APVerticalModes[APVerticalModes["VS"] = 2] = "VS";
    APVerticalModes[APVerticalModes["FLC"] = 3] = "FLC";
    APVerticalModes[APVerticalModes["ALT"] = 4] = "ALT";
    APVerticalModes[APVerticalModes["PATH"] = 5] = "PATH";
    APVerticalModes[APVerticalModes["GP"] = 6] = "GP";
    APVerticalModes[APVerticalModes["GS"] = 7] = "GS";
    APVerticalModes[APVerticalModes["CAP"] = 8] = "CAP";
    APVerticalModes[APVerticalModes["TO"] = 9] = "TO";
    APVerticalModes[APVerticalModes["GA"] = 10] = "GA";
    APVerticalModes[APVerticalModes["FPA"] = 11] = "FPA";
    APVerticalModes[APVerticalModes["FLARE"] = 12] = "FLARE";
})(APVerticalModes || (APVerticalModes = {}));
var APLateralModes;
(function (APLateralModes) {
    APLateralModes[APLateralModes["NONE"] = 0] = "NONE";
    APLateralModes[APLateralModes["ROLL"] = 1] = "ROLL";
    APLateralModes[APLateralModes["LEVEL"] = 2] = "LEVEL";
    APLateralModes[APLateralModes["GPSS"] = 3] = "GPSS";
    APLateralModes[APLateralModes["HEADING"] = 4] = "HEADING";
    APLateralModes[APLateralModes["VOR"] = 5] = "VOR";
    APLateralModes[APLateralModes["LOC"] = 6] = "LOC";
    APLateralModes[APLateralModes["BC"] = 7] = "BC";
    APLateralModes[APLateralModes["ROLLOUT"] = 8] = "ROLLOUT";
    APLateralModes[APLateralModes["NAV"] = 9] = "NAV";
    APLateralModes[APLateralModes["TO"] = 10] = "TO";
    APLateralModes[APLateralModes["GA"] = 11] = "GA";
    APLateralModes[APLateralModes["HEADING_HOLD"] = 12] = "HEADING_HOLD";
    APLateralModes[APLateralModes["TRACK"] = 13] = "TRACK";
    APLateralModes[APLateralModes["TRACK_HOLD"] = 14] = "TRACK_HOLD";
})(APLateralModes || (APLateralModes = {}));
var APAltitudeModes;
(function (APAltitudeModes) {
    APAltitudeModes[APAltitudeModes["NONE"] = 0] = "NONE";
    APAltitudeModes[APAltitudeModes["ALTS"] = 1] = "ALTS";
    APAltitudeModes[APAltitudeModes["ALTV"] = 2] = "ALTV";
})(APAltitudeModes || (APAltitudeModes = {}));

var APStates;
(function (APStates) {
    APStates[APStates["None"] = 0] = "None";
    APStates[APStates["APActive"] = 1] = "APActive";
    APStates[APStates["YawDamper"] = 2] = "YawDamper";
    APStates[APStates["Heading"] = 4] = "Heading";
    APStates[APStates["Nav"] = 8] = "Nav";
    APStates[APStates["NavArmed"] = 16] = "NavArmed";
    APStates[APStates["Approach"] = 32] = "Approach";
    APStates[APStates["ApproachArmed"] = 64] = "ApproachArmed";
    APStates[APStates["Backcourse"] = 128] = "Backcourse";
    APStates[APStates["BackcourseArmed"] = 256] = "BackcourseArmed";
    APStates[APStates["Alt"] = 512] = "Alt";
    APStates[APStates["AltS"] = 1024] = "AltS";
    APStates[APStates["AltV"] = 2048] = "AltV";
    APStates[APStates["VS"] = 4096] = "VS";
    APStates[APStates["FLC"] = 8192] = "FLC";
    APStates[APStates["GP"] = 16384] = "GP";
    APStates[APStates["GPArmed"] = 32768] = "GPArmed";
    APStates[APStates["GS"] = 65536] = "GS";
    APStates[APStates["GSArmed"] = 131072] = "GSArmed";
    APStates[APStates["Path"] = 262144] = "Path";
    APStates[APStates["PathArmed"] = 524288] = "PathArmed";
    APStates[APStates["PathInvalid"] = 1048576] = "PathInvalid";
    APStates[APStates["Pitch"] = 2097152] = "Pitch";
    APStates[APStates["Roll"] = 4194304] = "Roll";
    APStates[APStates["VNAV"] = 8388608] = "VNAV";
    APStates[APStates["ATSpeed"] = 16777216] = "ATSpeed";
    APStates[APStates["ATMach"] = 33554432] = "ATMach";
    APStates[APStates["ATArmed"] = 67108864] = "ATArmed";
    APStates[APStates["FD"] = 134217728] = "FD";
})(APStates || (APStates = {}));

/**
 * The state of a given plane director.
 */
var DirectorState;
(function (DirectorState) {
    /** The plane director is not currently armed or active. */
    DirectorState["Inactive"] = "Inactive";
    /** The plane director is currently armed. */
    DirectorState["Armed"] = "Armed";
    /** The plane director is currently active. */
    DirectorState["Active"] = "Active";
})(DirectorState || (DirectorState = {}));
/* eslint-disable @typescript-eslint/no-empty-function */
/**
 * A plane director that provides no behavior.
 */
class EmptyDirector {
    constructor() {
        /** No-op. */
        this.onActivate = () => { };
        /** No-op */
        this.onArm = () => { };
        this.state = DirectorState.Inactive;
    }
    /** No-op. */
    activate() { }
    /** No-op. */
    deactivate() { }
    /** No-op. */
    update() { }
    /** No-op. */
    arm() { }
}
/** An instance of the empty plane director. */
EmptyDirector.instance = new EmptyDirector();

/**
 * The current vertical navigation state.
 */
var VNavState;
(function (VNavState) {
    /** VNAV Disabled. */
    VNavState[VNavState["Disabled"] = 0] = "Disabled";
    /** VNAV Enabled and Inactive. */
    VNavState[VNavState["Enabled_Inactive"] = 1] = "Enabled_Inactive";
    /** VNAV Enabled and Active. */
    VNavState[VNavState["Enabled_Active"] = 2] = "Enabled_Active";
})(VNavState || (VNavState = {}));
/**
 * The current VNAV path mode.
 */
var VNavPathMode;
(function (VNavPathMode) {
    /** VNAV path is not active. */
    VNavPathMode[VNavPathMode["None"] = 0] = "None";
    /** VNAV path is armed for capture. */
    VNavPathMode[VNavPathMode["PathArmed"] = 1] = "PathArmed";
    /** VNAV path is actively navigating. */
    VNavPathMode[VNavPathMode["PathActive"] = 2] = "PathActive";
    /** The current VNAV path is not valid. */
    VNavPathMode[VNavPathMode["PathInvalid"] = 3] = "PathInvalid";
})(VNavPathMode || (VNavPathMode = {}));
/**
 * The current Approach Guidance Mode.
 */
var ApproachGuidanceMode;
(function (ApproachGuidanceMode) {
    /** VNAV is not currently following approach guidance. */
    ApproachGuidanceMode[ApproachGuidanceMode["None"] = 0] = "None";
    /** VNAV has armed ILS glideslope guidance for capture. */
    ApproachGuidanceMode[ApproachGuidanceMode["GSArmed"] = 1] = "GSArmed";
    /** VNAV is actively following ILS glideslope guidance. */
    ApproachGuidanceMode[ApproachGuidanceMode["GSActive"] = 2] = "GSActive";
    /** VNAV RNAV glidepath guidance is armed for capture. */
    ApproachGuidanceMode[ApproachGuidanceMode["GPArmed"] = 3] = "GPArmed";
    /** VNAV is actively follow RNAV glidepath guidance. */
    ApproachGuidanceMode[ApproachGuidanceMode["GPActive"] = 4] = "GPActive";
})(ApproachGuidanceMode || (ApproachGuidanceMode = {}));
/**
 * The current VNAV altitude capture type.
 */
var VNavAltCaptureType;
(function (VNavAltCaptureType) {
    /** Altitude capture is not armed. */
    VNavAltCaptureType[VNavAltCaptureType["None"] = 0] = "None";
    /** Altitude will capture the selected altitude. */
    VNavAltCaptureType[VNavAltCaptureType["Selected"] = 1] = "Selected";
    /** Altitude will capture the VANV target altitude. */
    VNavAltCaptureType[VNavAltCaptureType["VNAV"] = 2] = "VNAV";
})(VNavAltCaptureType || (VNavAltCaptureType = {}));
/**
 * The current state of VNAV availability from the director.
 */
var VNavAvailability;
(function (VNavAvailability) {
    VNavAvailability["Available"] = "Available";
    VNavAvailability["InvalidLegs"] = "InvalidLegs";
})(VNavAvailability || (VNavAvailability = {}));

/**
 * LNAV transition modes.
 */
var LNavTransitionMode;
(function (LNavTransitionMode) {
    /** LNAV is attempting to track a non-transition vector. */
    LNavTransitionMode[LNavTransitionMode["None"] = 0] = "None";
    /** LNAV is attempting to track an ingress vector. */
    LNavTransitionMode[LNavTransitionMode["Ingress"] = 1] = "Ingress";
    /** LNAV is attempting to track an egress vector. */
    LNavTransitionMode[LNavTransitionMode["Egress"] = 2] = "Egress";
    /**
     * LNAV is attempting to track a non-transition vector prior to where the ingress transition joins the base flight
     * path after deactivating suspend mode.
     */
    LNavTransitionMode[LNavTransitionMode["Unsuspend"] = 3] = "Unsuspend";
})(LNavTransitionMode || (LNavTransitionMode = {}));
/**
 * Sim var names for LNAV data.
 */
var LNavVars;
(function (LNavVars) {
    /** The current desired track, in degrees true. */
    LNavVars["DTK"] = "L:WTAP_LNav_DTK";
    /**
     * The current crosstrack error. Negative values indicate deviation to the left, as viewed when facing in the
     * direction of the track. Positive values indicate deviation to the right.
     */
    LNavVars["XTK"] = "L:WTAP_LNav_XTK";
    /** Whether LNAV is tracking a path. */
    LNavVars["IsTracking"] = "L:WTAP_LNav_Is_Tracking";
    /** The global leg index of the flight plan leg LNAV is currently tracking. */
    LNavVars["TrackedLegIndex"] = "L:WTAP_LNav_Tracked_Leg_Index";
    /** The currently active LNAV transition mode. */
    // eslint-disable-next-line @typescript-eslint/no-shadow
    LNavVars["TransitionMode"] = "L:WTAP_LNav_Transition_Mode";
    /** The index of the vector LNAV is currently tracking. */
    LNavVars["TrackedVectorIndex"] = "L:WTAP_LNav_Tracked_Vector_Index";
    /** The current course LNAV is attempting to steer, in degrees true. */
    LNavVars["CourseToSteer"] = "L:WTAP_LNav_Course_To_Steer";
    /** Whether LNAV sequencing is suspended. */
    LNavVars["IsSuspended"] = "L:WTAP_LNav_Is_Suspended";
    /**
     * The along-track distance from the start of the currently tracked leg to the plane's present position. A negative
     * distance indicates the plane is before the start of the leg.
     */
    LNavVars["LegDistanceAlong"] = "L:WTAP_LNav_Leg_Distance_Along";
    /**
     * The along-track distance remaining in the currently tracked leg. A negative distance indicates the plane is past
     * the end of the leg.
     */
    LNavVars["LegDistanceRemaining"] = "L:WTAP_LNav_Leg_Distance_Remaining";
    /**
     * The along-track distance from the start of the currently tracked vector to the plane's present position. A
     * negative distance indicates the plane is before the start of the vector.
     */
    LNavVars["VectorDistanceAlong"] = "L:WTAP_LNav_Vector_Distance_Along";
    /**
     * The along-track distance remaining in the currently tracked vector. A negative distance indicates the plane is
     * past the end of the vector.
     */
    LNavVars["VectorDistanceRemaining"] = "L:WTAP_LNav_Vector_Distance_Remaining";
    /**
     * The along-track distance from the current vector end where LNAV will sequence to the next vector.
     * A positive value means the vector will be sequenced this distance prior to the vector end.
     */
    LNavVars["VectorAnticipationDistance"] = "L:WTAP_LNav_Vector_Anticipation_Distance";
    /** The current along-track ground speed of the airplane. */
    LNavVars["AlongTrackSpeed"] = "L:WTAP_LNav_Along_Track_Speed";
})(LNavVars || (LNavVars = {}));
/**
 * A publisher for LNAV sim var events.
 */
class LNavSimVarPublisher extends SimVarPublisher {
    /**
     * Constructor.
     * @param bus The event bus to which to publish.
     */
    constructor(bus) {
        super(LNavSimVarPublisher.simvars, bus);
    }
}
LNavSimVarPublisher.simvars = new Map([
    ['lnav_dtk', { name: LNavVars.DTK, type: SimVarValueType.Degree }],
    ['lnav_xtk', { name: LNavVars.XTK, type: SimVarValueType.NM }],
    ['lnav_is_tracking', { name: LNavVars.IsTracking, type: SimVarValueType.Bool }],
    ['lnav_tracked_leg_index', { name: LNavVars.TrackedLegIndex, type: SimVarValueType.Number }],
    ['lnav_transition_mode', { name: LNavVars.TransitionMode, type: SimVarValueType.Number }],
    ['lnav_tracked_vector_index', { name: LNavVars.TrackedVectorIndex, type: SimVarValueType.Number }],
    ['lnav_course_to_steer', { name: LNavVars.CourseToSteer, type: SimVarValueType.Degree }],
    ['lnav_is_suspended', { name: LNavVars.IsSuspended, type: SimVarValueType.Bool }],
    ['lnav_leg_distance_along', { name: LNavVars.LegDistanceAlong, type: SimVarValueType.NM }],
    ['lnav_leg_distance_remaining', { name: LNavVars.LegDistanceRemaining, type: SimVarValueType.NM }],
    ['lnav_vector_distance_along', { name: LNavVars.VectorDistanceAlong, type: SimVarValueType.NM }],
    ['lnav_vector_distance_remaining', { name: LNavVars.VectorDistanceRemaining, type: SimVarValueType.NM }],
    ['lnav_vector_anticipation_distance', { name: LNavVars.VectorAnticipationDistance, type: SimVarValueType.NM }],
    ['lnav_along_track_speed', { name: LNavVars.AlongTrackSpeed, type: SimVarValueType.Knots }]
]);

/**
 * Sim var names for VNAV data.
 */
var VNavVars;
(function (VNavVars) {
    /** The vertical deviation in feet. */
    VNavVars["VerticalDeviation"] = "L:WTAP_VNav_Vertical_Deviation";
    /** The VNAV target altitude in feet. */
    VNavVars["TargetAltitude"] = "L:WTAP_VNav_Target_Altitude";
    /** The VNAV path mode. */
    VNavVars["PathMode"] = "L:WTAP_VNav_Path_Mode";
    /** The VNAV State. */
    VNavVars["VNAVState"] = "L:WTAP_VNav_State";
    /** Whether a VNAV Path Exists for the current leg. */
    VNavVars["PathAvailable"] = "L:WTAP_VNav_Path_Available";
    /** The VNAV current altitude capture type. */
    VNavVars["CaptureType"] = "L:WTAP_VNav_Alt_Capture_Type";
    /** The distance to the next TOD in meters, or -1 if one does not exist. */
    VNavVars["TODDistance"] = "L:WTAP_VNav_Distance_To_TOD";
    /** The distance to the next BOD in meters, or -1 if one does not exist. */
    VNavVars["BODDistance"] = "L:WTAP_VNav_Distance_To_BOD";
    /** The index of the leg for the next TOD. */
    VNavVars["TODLegIndex"] = "L:WTAP_VNav_TOD_Leg_Index";
    /** The distance from the end of the TOD leg that the TOD is, in meters. */
    VNavVars["TODDistanceInLeg"] = "L:WTAP_VNav_TOD_Distance_In_Leg";
    /** The index of the leg for the next BOD. */
    VNavVars["BODLegIndex"] = "L:WTAP_VNav_BOD_Leg_Index";
    /** The distance to the next TOC in meters, or -1 if one does not exist. */
    VNavVars["TOCDistance"] = "L:WTAP_VNav_Distance_To_TOC";
    /** The distance to the next BOC in meters, or -1 if one does not exist. */
    VNavVars["BOCDistance"] = "L:WTAP_VNav_Distance_To_BOC";
    /** The index of the leg for the next TOC. */
    VNavVars["TOCLegIndex"] = "L:WTAP_VNav_TOC_Leg_Index";
    /** The distance from the end of the TOC leg that the TOC is, in meters. */
    VNavVars["TOCDistanceInLeg"] = "L:WTAP_VNav_TOC_Distance_In_Leg";
    /** The index of the leg for the next BOC. */
    VNavVars["BOCLegIndex"] = "L:WTAP_VNav_BOC_Leg_Index";
    /** The index of the leg for the next constraint. */
    VNavVars["CurrentConstraintLegIndex"] = "L:WTAP_VNav_Constraint_Leg_Index";
    /** The current constraint altitude, in feet. */
    VNavVars["CurrentConstraintAltitude"] = "L:WTAP_VNav_Constraint_Altitude";
    /** The next constraint altitude, in feet. */
    VNavVars["NextConstraintAltitude"] = "L:WTAP_VNav_Next_Constraint_Altitude";
    /** The current required flight path angle, in degrees. */
    VNavVars["FPA"] = "L:WTAP_VNav_FPA";
    /** The required VS to the current constraint, in FPM. */
    VNavVars["RequiredVS"] = "L:WTAP_VNAV_Required_VS";
    /** The VNAV approach guidance mode. */
    VNavVars["GPApproachMode"] = "L:WTAP_GP_Approach_Mode";
    /** The current LPV vertical deviation in feet. */
    VNavVars["GPVerticalDeviation"] = "L:WTAP_GP_Vertical_Deviation";
    /** The current remaining LPV distance in meters. */
    VNavVars["GPDistance"] = "L:WTAP_GP_Distance";
    /** The current LPV FPA, in degrees. */
    VNavVars["GPFpa"] = "L:WTAP_GP_FPA";
    /** The required VS to the current constraint, in FPM. */
    VNavVars["GPRequiredVS"] = "L:WTAP_GP_Required_VS";
    /** The approach glidepath service level. */
    VNavVars["GPServiceLevel"] = "L:WTAP_GP_Service_Level";
})(VNavVars || (VNavVars = {}));
/** A publisher for VNAV sim var events. */
class VNavSimVarPublisher extends SimVarPublisher {
    /**
     * Create a VNavSimVarPublisher
     * @param bus The EventBus to publish to
     */
    constructor(bus) {
        super(VNavSimVarPublisher.simvars, bus);
    }
    /**
     * Publish a control event.
     * @param event The event from ControlEvents.
     * @param value The value of the event.
     */
    publishEvent(event, value) {
        this.publish(event, value, true);
    }
}
VNavSimVarPublisher.simvars = new Map([
    ['vnav_vertical_deviation', { name: VNavVars.VerticalDeviation, type: SimVarValueType.Feet }],
    ['vnav_target_altitude', { name: VNavVars.TargetAltitude, type: SimVarValueType.Feet }],
    ['vnav_path_mode', { name: VNavVars.PathMode, type: SimVarValueType.Number }],
    ['vnav_path_available', { name: VNavVars.PathAvailable, type: SimVarValueType.Bool }],
    ['vnav_state', { name: VNavVars.VNAVState, type: SimVarValueType.Number }],
    ['vnav_altitude_capture_type', { name: VNavVars.CaptureType, type: SimVarValueType.Number }],
    ['vnav_tod_distance', { name: VNavVars.TODDistance, type: SimVarValueType.Meters }],
    ['vnav_tod_leg_distance', { name: VNavVars.TODDistanceInLeg, type: SimVarValueType.Meters }],
    ['vnav_bod_distance', { name: VNavVars.BODDistance, type: SimVarValueType.Meters }],
    ['vnav_tod_global_leg_index', { name: VNavVars.TODLegIndex, type: SimVarValueType.Number }],
    ['vnav_bod_global_leg_index', { name: VNavVars.BODLegIndex, type: SimVarValueType.Number }],
    ['vnav_toc_distance', { name: VNavVars.TOCDistance, type: SimVarValueType.Meters }],
    ['vnav_toc_leg_distance', { name: VNavVars.TOCDistanceInLeg, type: SimVarValueType.Meters }],
    ['vnav_boc_distance', { name: VNavVars.BOCDistance, type: SimVarValueType.Meters }],
    ['vnav_toc_global_leg_index', { name: VNavVars.TOCLegIndex, type: SimVarValueType.Number }],
    ['vnav_boc_global_leg_index', { name: VNavVars.BOCLegIndex, type: SimVarValueType.Number }],
    ['vnav_constraint_global_leg_index', { name: VNavVars.CurrentConstraintLegIndex, type: SimVarValueType.Number }],
    ['vnav_constraint_altitude', { name: VNavVars.CurrentConstraintAltitude, type: SimVarValueType.Feet }],
    ['vnav_next_constraint_altitude', { name: VNavVars.NextConstraintAltitude, type: SimVarValueType.Feet }],
    ['vnav_fpa', { name: VNavVars.FPA, type: SimVarValueType.Degree }],
    ['vnav_required_vs', { name: VNavVars.RequiredVS, type: SimVarValueType.FPM }],
    ['gp_approach_mode', { name: VNavVars.GPApproachMode, type: SimVarValueType.Number }],
    ['gp_vertical_deviation', { name: VNavVars.GPVerticalDeviation, type: SimVarValueType.Feet }],
    ['gp_distance', { name: VNavVars.GPDistance, type: SimVarValueType.Feet }],
    ['gp_fpa', { name: VNavVars.GPFpa, type: SimVarValueType.Degree }],
    ['gp_required_vs', { name: VNavVars.GPRequiredVS, type: SimVarValueType.FPM }],
    ['gp_service_level', { name: VNavVars.GPServiceLevel, type: SimVarValueType.Number }]
]);
UnitType.GA_RADIAN.convertTo(GeoCircle.ANGULAR_TOLERANCE, UnitType.METER);

/**
 * Sim var names for LNAV-related data.
 */
var LNavDataVars;
(function (LNavDataVars) {
    /** The current nominal desired track, in degrees true. */
    LNavDataVars["DTKTrue"] = "L:WT_LNavData_DTK_True";
    /** The current nominal desired track, in degrees magnetic. */
    LNavDataVars["DTKMagnetic"] = "L:WT_LNavData_DTK_Mag";
    /**
     * The current nominal crosstrack error. Negative values indicate deviation to the left, as viewed when facing in the
     * direction of the track. Positive values indicate deviation to the right.
     */
    LNavDataVars["XTK"] = "L:WT_LNavData_XTK";
    /** The current CDI scale. */
    LNavDataVars["CDIScale"] = "L:WT_LNavData_CDI_Scale";
    /** The nominal bearing to the next waypoint currently tracked by LNAV, in degrees true. */
    LNavDataVars["WaypointBearingTrue"] = "L:WT_LNavData_Waypoint_Bearing_True";
    /** The nominal bearing to the next waypoint currently tracked by LNAV, in degrees magnetic. */
    LNavDataVars["WaypointBearingMagnetic"] = "L:WT_LNavData_Waypoint_Bearing_Mag";
    /** The nominal distance remaining to the next waypoint currently tracked by LNAV. */
    LNavDataVars["WaypointDistance"] = "L:WT_LNavData_Waypoint_Distance";
    /** The nominal distance remaining to the destination. */
    LNavDataVars["DestinationDistance"] = "L:WT_LNavData_Destination_Distance";
})(LNavDataVars || (LNavDataVars = {}));
/**
 * A publisher for LNAV-related data sim var events.
 */
class LNavDataSimVarPublisher extends SimVarPublisher {
    /**
     * Constructor.
     * @param bus The event bus to which to publish.
     */
    constructor(bus) {
        super(LNavDataSimVarPublisher.simvars, bus);
    }
}
LNavDataSimVarPublisher.simvars = new Map([
    ['lnavdata_dtk_true', { name: LNavDataVars.DTKTrue, type: SimVarValueType.Degree }],
    ['lnavdata_dtk_mag', { name: LNavDataVars.DTKMagnetic, type: SimVarValueType.Degree }],
    ['lnavdata_xtk', { name: LNavDataVars.XTK, type: SimVarValueType.NM }],
    ['lnavdata_cdi_scale', { name: LNavDataVars.CDIScale, type: SimVarValueType.NM }],
    ['lnavdata_waypoint_bearing_true', { name: LNavDataVars.WaypointBearingTrue, type: SimVarValueType.Degree }],
    ['lnavdata_waypoint_bearing_mag', { name: LNavDataVars.WaypointBearingMagnetic, type: SimVarValueType.Degree }],
    ['lnavdata_waypoint_distance', { name: LNavDataVars.WaypointDistance, type: SimVarValueType.NM }],
    ['lnavdata_destination_distance', { name: LNavDataVars.DestinationDistance, type: SimVarValueType.NM }]
]);

/** AP Mode Types */
var APModeType;
(function (APModeType) {
    APModeType[APModeType["LATERAL"] = 0] = "LATERAL";
    APModeType[APModeType["VERTICAL"] = 1] = "VERTICAL";
    APModeType[APModeType["APPROACH"] = 2] = "APPROACH";
})(APModeType || (APModeType = {}));

/**
 * Autothrottle target modes.
 */
var AutothrottleTargetMode;
(function (AutothrottleTargetMode) {
    /** No target. */
    AutothrottleTargetMode["None"] = "None";
    /** Autothrottle targets a specific airspeed. */
    AutothrottleTargetMode["Speed"] = "Speed";
    /** Autothrottle targets a specific engine power setting. */
    AutothrottleTargetMode["Power"] = "Power";
    /** Autothrottle targets a specific throttle lever position. */
    AutothrottleTargetMode["ThrottlePos"] = "ThrottlePos";
})(AutothrottleTargetMode || (AutothrottleTargetMode = {}));

/**
 * Represents possible lifetimes for FmcPages
 */
var FmcPageLifecyclePolicy;
(function (FmcPageLifecyclePolicy) {
    /**
     * Page is only created and initialized once, the first time it is navigated to, the reloaded and resumed.
     */
    FmcPageLifecyclePolicy[FmcPageLifecyclePolicy["Singleton"] = 0] = "Singleton";
    /**
     * Page is re-created and re-initialized every time it is navigated to.
     */
    FmcPageLifecyclePolicy[FmcPageLifecyclePolicy["Transient"] = 1] = "Transient";
})(FmcPageLifecyclePolicy || (FmcPageLifecyclePolicy = {}));
/**
 * Configures the {@link FmcPageLifecyclePolicy} for this page
 */
FmcPageLifecyclePolicy.Singleton;

/**
 * The state of an avionics system.
 */
var AvionicsSystemState;
(function (AvionicsSystemState) {
    AvionicsSystemState["Off"] = "Off";
    AvionicsSystemState["Initializing"] = "Initializing";
    AvionicsSystemState["On"] = "On";
    AvionicsSystemState["Failed"] = "Failed";
})(AvionicsSystemState || (AvionicsSystemState = {}));

/**
 * A class that wraps the actual instrumenet implementation and handles the sim's vcockpit lifecycle.
 */
class FsBaseInstrument extends BaseInstrument {
    /**
     * A callback called when the element is attached to the DOM.
     */
    connectedCallback() {
        super.connectedCallback();
        this.fsInstrument = this.constructInstrument();
    }
    /**
     * Update method called by BaseInstrument
     */
    Update() {
        super.Update();
        if (this.fsInstrument) {
            this.fsInstrument.Update();
        }
    }
    /** @inheritdoc */
    onInteractionEvent(_args) {
        if (this.fsInstrument) {
            this.fsInstrument.onInteractionEvent(_args);
        }
    }
    /** @inheritdoc */
    onGameStateChanged(oldState, newState) {
        super.onGameStateChanged(oldState, newState);
        if (this.fsInstrument) {
            this.fsInstrument.onGameStateChanged(oldState, newState);
        }
    }
    /** @inheritdoc */
    onFlightStart() {
        super.onFlightStart();
        if (this.fsInstrument) {
            this.fsInstrument.onFlightStart();
        }
    }
    /** @inheritdoc */
    onSoundEnd(soundEventId) {
        super.onSoundEnd(soundEventId);
        if (this.fsInstrument) {
            this.fsInstrument.onSoundEnd(soundEventId);
        }
    }
    /**
     * Whether or not the instrument is interactive (a touchscreen instrument).
     * @returns True
     */
    get isInteractive() {
        return false;
    }
}

let nxNotificationsListener;
var NotificationType;
(function (NotificationType) {
    NotificationType["Message"] = "MESSAGE";
    NotificationType["Subtitles"] = "SUBTITLES";
})(NotificationType || (NotificationType = {}));
var NotificationTheme;
(function (NotificationTheme) {
    NotificationTheme["Tips"] = "TIPS";
    NotificationTheme["Gameplay"] = "GAMEPLAY";
    NotificationTheme["System"] = "SYSTEM";
})(NotificationTheme || (NotificationTheme = {}));
var NotificationImage;
(function (NotificationImage) {
    NotificationImage["Notification"] = "IMAGE_NOTIFICATION";
    NotificationImage["Score"] = "IMAGE_SCORE";
})(NotificationImage || (NotificationImage = {}));
/**
 * Notification utility class to create a notification event and element
 *
 * Usage:
 * import { NotificationManager } from '@shared/notification';
 * ...
 * const notification = new NotificationManager();
 * notification.showNotification({ message: 'Your notification here!' });
*/
class NotificationManager {
    constructor() {
        this.notifications = [];
        this.eventBus = new EventBus();
        KeyEventManager.getManager(this.eventBus).then((man) => {
            this.manager = man;
            this.registerIntercepts();
        });
    }
    registerIntercepts() {
        this.manager.interceptKey('PAUSE_TOGGLE', true);
        this.manager.interceptKey('PAUSE_ON', true);
        this.manager.interceptKey('PAUSE_OFF', true);
        this.manager.interceptKey('PAUSE_SET', true);
        const subscriber = this.eventBus.getSubscriber();
        subscriber.on('key_intercept').handle((keyData) => {
            switch (keyData.key) {
                case 'PAUSE_TOGGLE':
                case 'PAUSE_ON':
                case 'PAUSE_OFF':
                case 'PAUSE_SET':
                    this.notifications.forEach((notif) => {
                        notif.hideNotification();
                    });
                    this.notifications.length = 0;
                    break;
            }
        });
    }
    showNotification(params = {}) {
        const notif = new Notification();
        notif.showNotification(params);
        this.notifications.push(notif);
    }
}
class Notification {
    /**
     * Creates a Notification
     */
    constructor() {
        const title = 'A32NX ALERT';
        this.time = new Date().getTime();
        this.params = {
            id: `${title}_${this.time}`,
            title,
            type: NotificationType.Message,
            theme: NotificationTheme.Gameplay,
            image: NotificationImage.Notification,
            description: 'Default Message',
            timeout: 10000,
            time: this.time,
        };
    }
    /**
     * Modify the display data for this Notification
     * @param params Parameters for the notification
     */
    setData(params = {}) {
        if (params.title) {
            this.params.title = params.title;
            this.params.id = `${params.title}_${new Date().getTime()}`;
        }
        if (params.type) {
            this.params.type = params.type;
        }
        if (params.theme) {
            this.params.theme = params.theme;
        }
        if (params.image) {
            this.params.image = params.image;
        }
        if (params.message) {
            this.params.description = params.message;
        }
        if (params.timeout) {
            this.params.timeout = params.timeout;
        }
    }
    /**
     * Show notification with given or already initiated parametrs.
     * @param params Parameters for the notification
     */
    showNotification(params = {}) {
        this.setData(params);
        if (!nxNotificationsListener) {
            nxNotificationsListener = RegisterViewListener('JS_LISTENER_NOTIFICATIONS');
        }
        nxNotificationsListener.triggerToAllSubscribers('SendNewNotification', this.params);
        setTimeout(() => {
            // TODO FIXME: May break in the future, check every update
            this.hideNotification();
        }, this.params.timeout);
    }
    hideNotification() {
        nxNotificationsListener.triggerToAllSubscribers('HideNotification', this.params.type, null, this.params.id);
    }
}

// Copyright (c) 2023 FlyByWire Simulations
class ExtrasSimVarPublisher extends SimVarPublisher {
    constructor(bus, pacer) {
        super(ExtrasSimVarPublisher.simVars, bus, pacer);
    }
}
ExtrasSimVarPublisher.simVars = new Map([
    ['ecp_to_config_pushbutton', { name: 'L:A32NX_BTN_TOCONFIG', type: SimVarValueType.Bool }],
    ['fwc_flight_phase', { name: 'L:A32NX_FWC_FLIGHT_PHASE', type: SimVarValueType.Number }],
]);

// Copyright (c) 2023 FlyByWire Simulations
/**
 * Monitors cockpit pushbuttons that may be written externally to ensure they are not "stuck" because
 * the external writer failed to set them back to 0.
 */
class PushbuttonCheck {
    constructor(bus, notification) {
        this.bus = bus;
        this.notification = notification;
        this.sub = this.bus.getSubscriber();
        this.fwcFlightPhase = ConsumerSubject.create(null, 1);
        this.toConfButton = ConsumerSubject.create(null, false);
        this.toConfTimer = new DebounceTimer();
        this.toConfButtonInCruise = MappedSubject.create(([toConf, phase]) => toConf && phase === 6, this.toConfButton, this.fwcFlightPhase);
        this.toConfMessageShown = false;
    }
    connectedCallback() {
        this.toConfButtonInCruise.sub(this.onToConfigPushbutton.bind(this));
        this.fwcFlightPhase.setConsumer(this.sub.on('fwc_flight_phase'));
        this.toConfButton.setConsumer(this.sub.on('ecp_to_config_pushbutton'));
    }
    onToConfigPushbutton(pressed) {
        if (pressed && !this.toConfTimer.isPending() && !this.toConfMessageShown) {
            this.toConfTimer.schedule(() => {
                this.toConfMessageShown = true;
                this.notification.showNotification({
                    title: 'ECP Pushbutton Held',
                    // eslint-disable-next-line max-len
                    message: 'The TO CONF pushbutton has been held for a long time!\n\nIf you have external hardware or software controlling this variable (L:A32NX_BTN_TOCONFIG), please check that it is setup to write the variable to 0 when the button is released.',
                    theme: NotificationTheme.Tips,
                });
            }, PushbuttonCheck.TO_CONFIG_MAX_PRESS_TIME);
        }
        else if (!pressed) {
            this.toConfTimer.clear();
        }
    }
}
/** Maximum time in ms that TO CONF can be pressed before it is considered "stuck" */
PushbuttonCheck.TO_CONFIG_MAX_PRESS_TIME = 30000;

/**
 * PopUp utility class to create a pop-up UI element
 *
 * Usage:
 * import { PopUp } from '@shared/popup';
 * ...
 * const popup = new PopUp();
 * popup.showPopUp("CRITICAL SETTING CHANGED", "Your message here", "small", yesFunc, noFunc);
 * popup.showInformation("CRITICAL MESSAGE", "Your message here", "small", yesFunc);
 */
class PopUpDialog {
    /**
     * Creates a Popup
     */
    constructor() {
        const title = 'A32NX POPUP';
        const time = new Date().getTime();
        this.popupListener = undefined;
        this.params = {
            __Type: 'SNotificationParams',
            buttons: [new NotificationButton('TT:MENU.YES', `A32NX_POP_${title}_${time}_YES`), new NotificationButton('TT:MENU.NO', `A32NX_POP_${title}_${time}_NO`)],
            style: 'normal',
            displayGlobalPopup: true,
            contentData: 'Default Message',
            contentUrl: '',
            contentTemplate: '',
            id: `${title}_${time}`,
            title,
            time,
        };
    }
    /**
     * Pass Popup display data to Coherent
     * @param params
     */
    /* eslint-disable no-underscore-dangle */
    _showPopUp(params = {}) {
        Coherent.trigger('SHOW_POP_UP', params);
    }
    /**
     * Show popup with given or already initiated parameters
     * @param {string} title Title for popup - will show in menu bar
     * @param {string} message Popup message
     * @param {string} style Style/Type of popup. Valid types are small|normal|big|big-help
     * @param {function} callbackYes Callback function -> YES button is clicked.
     * @param {function} callbackNo Callback function -> NO button is clicked.
     */
    showPopUp(title, message, style, callbackYes, callbackNo) {
        if (title) {
            this.params.title = title;
        }
        if (message) {
            this.params.contentData = message;
        }
        if (style) {
            this.params.style = style;
        }
        if (callbackYes) {
            const yes = (typeof callbackYes === 'function') ? callbackYes : () => callbackYes;
            Coherent.on(`A32NX_POP_${this.params.id}_YES`, () => {
                Coherent.off(`A32NX_POP_${this.params.id}_YES`, null, null);
                yes();
            });
        }
        if (callbackNo) {
            const no = (typeof callbackNo === 'function') ? callbackNo : () => callbackNo;
            Coherent.on(`A32NX_POP_${this.params.id}_NO`, () => {
                Coherent.off(`A32NX_POP_${this.params.id}_NO`, null, null);
                no();
            });
        }
        if (!this.popupListener) {
            this.popupListener = RegisterViewListener('JS_LISTENER_POPUP', this._showPopUp.bind(null, this.params));
        }
        else {
            this._showPopUp(this.params);
        }
    }
    /**
     * Show information with given or already initiated parameters
     * @param {string} title Title for popup - will show in menu bar
     * @param {string} message Popup message
     * @param {string} style Style/Type of popup. Valid types are small|normal|big|big-help
     * @param {function} callback Callback function -> OK button is clicked.
     */
    showInformation(title, message, style, callback) {
        if (title) {
            this.params.title = title;
        }
        if (message) {
            this.params.contentData = message;
        }
        if (style) {
            this.params.style = style;
        }
        if (callback) {
            const yes = (typeof callback === 'function') ? callback : () => callback;
            Coherent.on(`A32NX_POP_${this.params.id}_YES`, () => {
                Coherent.off(`A32NX_POP_${this.params.id}_YES`, null, null);
                yes();
            });
        }
        this.params.buttons = [new NotificationButton('TT:MENU.OK', `A32NX_POP_${this.params.id}_YES`)];
        if (!this.popupListener) {
            this.popupListener = RegisterViewListener('JS_LISTENER_POPUP', this._showPopUp.bind(null, this.params));
        }
        else {
            this._showPopUp(this.params);
        }
    }
}

// Copyright (c) 2022 FlyByWire Simulations
// SPDX-License-Identifier: GPL-3.0
/**
 * The AircraftPresetsList class is used to get the name of a preset from the preset ID.
 * These need to align with the IDs in the Presets C++ WASM and the AircraftPresets.tsx in the EFB.
 * WASM: src/presets/src/Aircraft/AircraftProcedures.h
 */
class AircraftPresetsList {
    static getPresetName(presetID) {
        const index = presetID - 1;
        if (index < 0 || index > AircraftPresetsList.list.length) {
            return '';
        }
        return AircraftPresetsList.list[index].name;
    }
}
AircraftPresetsList.list = [
    { index: 1, name: 'Cold & Dark' },
    { index: 2, name: 'Powered' },
    { index: 3, name: 'Ready for Pushback' },
    { index: 4, name: 'Ready for Taxi' },
    { index: 5, name: 'Ready for Takeoff' },
];

// Copyright (c) 2022 FlyByWire Simulations
/**
 * This class is used to intercept the key events for the engine auto start and engine auto shutdown.
 *
 * Additional key events can be added in the registerIntercepts() method.
 */
class KeyInterceptor {
    constructor(bus, notification) {
        this.bus = bus;
        this.notification = notification;
        this.dialogVisible = false;
        this.eventBus = bus;
        KeyEventManager.getManager(this.eventBus).then((manager) => {
            this.keyInterceptManager = manager;
            this.registerIntercepts();
        });
        console.log('KeyInterceptor: Created');
    }
    connectedCallback() {
        // empty
    }
    startPublish() {
        console.log('KeyInterceptor: startPublish()');
    }
    update() {
        // empty
    }
    registerIntercepts() {
        this.keyInterceptManager.interceptKey('ENGINE_AUTO_START', false);
        this.keyInterceptManager.interceptKey('ENGINE_AUTO_SHUTDOWN', false);
        const subscriber = this.eventBus.getSubscriber();
        subscriber.on('key_intercept').handle((keyData) => {
            switch (keyData.key) {
                case 'ENGINE_AUTO_START':
                    console.log('KeyInterceptor: ENGINE_AUTO_START');
                    this.engineAutoStartAction();
                    break;
                case 'ENGINE_AUTO_SHUTDOWN':
                    console.log('KeyInterceptor: ENGINE_AUTO_SHUTDOWN');
                    this.engineAutoStopAction();
                    break;
            }
        });
    }
    engineAutoStartAction() {
        if (!this.dialogVisible) {
            // If loading already in progress show a notification and return
            if (this.isAlreadyLoading())
                return;
            // Show a dialog to ask user to load a preset or cancel
            this.dialogVisible = true;
            const dialog = new PopUpDialog();
            const presetID = 4; // "Ready for Taxi"
            dialog.showPopUp('Ctrl+E Not supported', `<div style="font-size: 120%; text-align: left;">
                           Engine Auto Start is not supported by the A32NX.<br/>
                           <br/>
                           Do you want to you use the flyPad's Aircraft Presets to set the aircraft to
                           <strong>"${AircraftPresetsList.getPresetName(presetID)}"</strong>?
                         </div>`, 'small', () => this.loadPreset(presetID), () => this.dialogVisible = false);
        }
    }
    engineAutoStopAction() {
        if (this.isAlreadyLoading())
            return;
        // If engines are running show a dialog to ask user to load a preset or cancel
        if (!this.dialogVisible && this.isOneEngineRunning()) {
            this.dialogVisible = true;
            const dialog = new PopUpDialog();
            const presetID = 2;
            dialog.showPopUp('Shift+Ctrl+E Not supported', `<div style="font-size: 120%; text-align: left;">
                               Engine Auto Shutdown is not supported by the A32NX.<br/>
                               <br/>
                               Do you want to you use the flyPad's Aircraft Presets to set the aircraft to
                               <strong>"${AircraftPresetsList.getPresetName(presetID)}"</strong>?
                             </div>`, 'small', () => this.loadPreset(presetID), () => this.dialogVisible = false);
        }
    }
    isAlreadyLoading() {
        const loadingInProgress = SimVar.GetSimVarValue('L:A32NX_AIRCRAFT_PRESET_LOAD', 'Number');
        if (loadingInProgress > 0) {
            this.notification.showNotification({
                title: 'Aircraft Presets',
                message: `Loading Preset is already in progress "${(AircraftPresetsList.getPresetName(loadingInProgress))}"`,
                type: NotificationType.Message,
                timeout: 1500,
            });
            return true;
        }
        return false;
    }
    isOneEngineRunning() {
        const engine1N1 = SimVar.GetSimVarValue('L:A32NX_ENGINE_N1:1', 'Number');
        const engine2N1 = SimVar.GetSimVarValue('L:A32NX_ENGINE_N1:2', 'Number');
        return engine1N1 > 0.1 || engine2N1 > 0.1;
    }
    loadPreset(presetID) {
        console.log(`Setting aircraft preset to ${AircraftPresetsList.getPresetName(presetID)}`);
        SimVar.SetSimVarValue('L:A32NX_AIRCRAFT_PRESET_LOAD', 'Number', presetID);
        this.dialogVisible = false;
    }
}

const debug = (
  typeof process === 'object' &&
  process.env &&
  process.env.NODE_DEBUG &&
  /\bsemver\b/i.test(process.env.NODE_DEBUG)
) ? (...args) => console.error('SEMVER', ...args)
  : () => {};

var debug_1 = debug;

// Note: this is the semver.org version of the spec that it implements
// Not necessarily the package version of this code.
const SEMVER_SPEC_VERSION = '2.0.0';

const MAX_LENGTH$1 = 256;
const MAX_SAFE_INTEGER$1 = Number.MAX_SAFE_INTEGER ||
/* istanbul ignore next */ 9007199254740991;

// Max safe segment length for coercion.
const MAX_SAFE_COMPONENT_LENGTH = 16;

var constants = {
  SEMVER_SPEC_VERSION,
  MAX_LENGTH: MAX_LENGTH$1,
  MAX_SAFE_INTEGER: MAX_SAFE_INTEGER$1,
  MAX_SAFE_COMPONENT_LENGTH,
};

function createCommonjsModule(fn, basedir, module) {
	return module = {
		path: basedir,
		exports: {},
		require: function (path, base) {
			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
		}
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var re_1 = createCommonjsModule(function (module, exports) {
const { MAX_SAFE_COMPONENT_LENGTH } = constants;

exports = module.exports = {};

// The actual regexps go on exports.re
const re = exports.re = [];
const src = exports.src = [];
const t = exports.t = {};
let R = 0;

const createToken = (name, value, isGlobal) => {
  const index = R++;
  debug_1(name, index, value);
  t[name] = index;
  src[index] = value;
  re[index] = new RegExp(value, isGlobal ? 'g' : undefined);
};

// The following Regular Expressions can be used for tokenizing,
// validating, and parsing SemVer version strings.

// ## Numeric Identifier
// A single `0`, or a non-zero digit followed by zero or more digits.

createToken('NUMERICIDENTIFIER', '0|[1-9]\\d*');
createToken('NUMERICIDENTIFIERLOOSE', '[0-9]+');

// ## Non-numeric Identifier
// Zero or more digits, followed by a letter or hyphen, and then zero or
// more letters, digits, or hyphens.

createToken('NONNUMERICIDENTIFIER', '\\d*[a-zA-Z-][a-zA-Z0-9-]*');

// ## Main Version
// Three dot-separated numeric identifiers.

createToken('MAINVERSION', `(${src[t.NUMERICIDENTIFIER]})\\.` +
                   `(${src[t.NUMERICIDENTIFIER]})\\.` +
                   `(${src[t.NUMERICIDENTIFIER]})`);

createToken('MAINVERSIONLOOSE', `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` +
                        `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` +
                        `(${src[t.NUMERICIDENTIFIERLOOSE]})`);

// ## Pre-release Version Identifier
// A numeric identifier, or a non-numeric identifier.

createToken('PRERELEASEIDENTIFIER', `(?:${src[t.NUMERICIDENTIFIER]
}|${src[t.NONNUMERICIDENTIFIER]})`);

createToken('PRERELEASEIDENTIFIERLOOSE', `(?:${src[t.NUMERICIDENTIFIERLOOSE]
}|${src[t.NONNUMERICIDENTIFIER]})`);

// ## Pre-release Version
// Hyphen, followed by one or more dot-separated pre-release version
// identifiers.

createToken('PRERELEASE', `(?:-(${src[t.PRERELEASEIDENTIFIER]
}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`);

createToken('PRERELEASELOOSE', `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]
}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`);

// ## Build Metadata Identifier
// Any combination of digits, letters, or hyphens.

createToken('BUILDIDENTIFIER', '[0-9A-Za-z-]+');

// ## Build Metadata
// Plus sign, followed by one or more period-separated build metadata
// identifiers.

createToken('BUILD', `(?:\\+(${src[t.BUILDIDENTIFIER]
}(?:\\.${src[t.BUILDIDENTIFIER]})*))`);

// ## Full Version String
// A main version, followed optionally by a pre-release version and
// build metadata.

// Note that the only major, minor, patch, and pre-release sections of
// the version string are capturing groups.  The build metadata is not a
// capturing group, because it should not ever be used in version
// comparison.

createToken('FULLPLAIN', `v?${src[t.MAINVERSION]
}${src[t.PRERELEASE]}?${
  src[t.BUILD]}?`);

createToken('FULL', `^${src[t.FULLPLAIN]}$`);

// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
// common in the npm registry.
createToken('LOOSEPLAIN', `[v=\\s]*${src[t.MAINVERSIONLOOSE]
}${src[t.PRERELEASELOOSE]}?${
  src[t.BUILD]}?`);

createToken('LOOSE', `^${src[t.LOOSEPLAIN]}$`);

createToken('GTLT', '((?:<|>)?=?)');

// Something like "2.*" or "1.2.x".
// Note that "x.x" is a valid xRange identifer, meaning "any version"
// Only the first item is strictly required.
createToken('XRANGEIDENTIFIERLOOSE', `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
createToken('XRANGEIDENTIFIER', `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`);

createToken('XRANGEPLAIN', `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})` +
                   `(?:\\.(${src[t.XRANGEIDENTIFIER]})` +
                   `(?:\\.(${src[t.XRANGEIDENTIFIER]})` +
                   `(?:${src[t.PRERELEASE]})?${
                     src[t.BUILD]}?` +
                   `)?)?`);

createToken('XRANGEPLAINLOOSE', `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})` +
                        `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` +
                        `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` +
                        `(?:${src[t.PRERELEASELOOSE]})?${
                          src[t.BUILD]}?` +
                        `)?)?`);

createToken('XRANGE', `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`);
createToken('XRANGELOOSE', `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`);

// Coercion.
// Extract anything that could conceivably be a part of a valid semver
createToken('COERCE', `${'(^|[^\\d])' +
              '(\\d{1,'}${MAX_SAFE_COMPONENT_LENGTH}})` +
              `(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?` +
              `(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?` +
              `(?:$|[^\\d])`);
createToken('COERCERTL', src[t.COERCE], true);

// Tilde ranges.
// Meaning is "reasonably at or greater than"
createToken('LONETILDE', '(?:~>?)');

createToken('TILDETRIM', `(\\s*)${src[t.LONETILDE]}\\s+`, true);
exports.tildeTrimReplace = '$1~';

createToken('TILDE', `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`);
createToken('TILDELOOSE', `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`);

// Caret ranges.
// Meaning is "at least and backwards compatible with"
createToken('LONECARET', '(?:\\^)');

createToken('CARETTRIM', `(\\s*)${src[t.LONECARET]}\\s+`, true);
exports.caretTrimReplace = '$1^';

createToken('CARET', `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`);
createToken('CARETLOOSE', `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`);

// A simple gt/lt/eq thing, or just "" to indicate "any version"
createToken('COMPARATORLOOSE', `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`);
createToken('COMPARATOR', `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`);

// An expression to strip any whitespace between the gtlt and the thing
// it modifies, so that `> 1.2.3` ==> `>1.2.3`
createToken('COMPARATORTRIM', `(\\s*)${src[t.GTLT]
}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true);
exports.comparatorTrimReplace = '$1$2$3';

// Something like `1.2.3 - 1.2.4`
// Note that these all use the loose form, because they'll be
// checked against either the strict or loose comparator form
// later.
createToken('HYPHENRANGE', `^\\s*(${src[t.XRANGEPLAIN]})` +
                   `\\s+-\\s+` +
                   `(${src[t.XRANGEPLAIN]})` +
                   `\\s*$`);

createToken('HYPHENRANGELOOSE', `^\\s*(${src[t.XRANGEPLAINLOOSE]})` +
                        `\\s+-\\s+` +
                        `(${src[t.XRANGEPLAINLOOSE]})` +
                        `\\s*$`);

// Star ranges basically just allow anything at all.
createToken('STAR', '(<|>)?=?\\s*\\*');
// >=0.0.0 is like a star
createToken('GTE0', '^\\s*>=\\s*0\\.0\\.0\\s*$');
createToken('GTE0PRE', '^\\s*>=\\s*0\\.0\\.0-0\\s*$');
});

// parse out just the options we care about so we always get a consistent
// obj with keys in a consistent order.
const opts = ['includePrerelease', 'loose', 'rtl'];
const parseOptions = options =>
  !options ? {}
  : typeof options !== 'object' ? { loose: true }
  : opts.filter(k => options[k]).reduce((o, k) => {
    o[k] = true;
    return o
  }, {});
var parseOptions_1 = parseOptions;

const numeric = /^[0-9]+$/;
const compareIdentifiers$1 = (a, b) => {
  const anum = numeric.test(a);
  const bnum = numeric.test(b);

  if (anum && bnum) {
    a = +a;
    b = +b;
  }

  return a === b ? 0
    : (anum && !bnum) ? -1
    : (bnum && !anum) ? 1
    : a < b ? -1
    : 1
};

const rcompareIdentifiers = (a, b) => compareIdentifiers$1(b, a);

var identifiers = {
  compareIdentifiers: compareIdentifiers$1,
  rcompareIdentifiers,
};

const { MAX_LENGTH, MAX_SAFE_INTEGER } = constants;
const { re, t } = re_1;


const { compareIdentifiers } = identifiers;
class SemVer {
  constructor (version, options) {
    options = parseOptions_1(options);

    if (version instanceof SemVer) {
      if (version.loose === !!options.loose &&
          version.includePrerelease === !!options.includePrerelease) {
        return version
      } else {
        version = version.version;
      }
    } else if (typeof version !== 'string') {
      throw new TypeError(`Invalid Version: ${version}`)
    }

    if (version.length > MAX_LENGTH) {
      throw new TypeError(
        `version is longer than ${MAX_LENGTH} characters`
      )
    }

    debug_1('SemVer', version, options);
    this.options = options;
    this.loose = !!options.loose;
    // this isn't actually relevant for versions, but keep it so that we
    // don't run into trouble passing this.options around.
    this.includePrerelease = !!options.includePrerelease;

    const m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL]);

    if (!m) {
      throw new TypeError(`Invalid Version: ${version}`)
    }

    this.raw = version;

    // these are actually numbers
    this.major = +m[1];
    this.minor = +m[2];
    this.patch = +m[3];

    if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
      throw new TypeError('Invalid major version')
    }

    if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
      throw new TypeError('Invalid minor version')
    }

    if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
      throw new TypeError('Invalid patch version')
    }

    // numberify any prerelease numeric ids
    if (!m[4]) {
      this.prerelease = [];
    } else {
      this.prerelease = m[4].split('.').map((id) => {
        if (/^[0-9]+$/.test(id)) {
          const num = +id;
          if (num >= 0 && num < MAX_SAFE_INTEGER) {
            return num
          }
        }
        return id
      });
    }

    this.build = m[5] ? m[5].split('.') : [];
    this.format();
  }

  format () {
    this.version = `${this.major}.${this.minor}.${this.patch}`;
    if (this.prerelease.length) {
      this.version += `-${this.prerelease.join('.')}`;
    }
    return this.version
  }

  toString () {
    return this.version
  }

  compare (other) {
    debug_1('SemVer.compare', this.version, this.options, other);
    if (!(other instanceof SemVer)) {
      if (typeof other === 'string' && other === this.version) {
        return 0
      }
      other = new SemVer(other, this.options);
    }

    if (other.version === this.version) {
      return 0
    }

    return this.compareMain(other) || this.comparePre(other)
  }

  compareMain (other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options);
    }

    return (
      compareIdentifiers(this.major, other.major) ||
      compareIdentifiers(this.minor, other.minor) ||
      compareIdentifiers(this.patch, other.patch)
    )
  }

  comparePre (other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options);
    }

    // NOT having a prerelease is > having one
    if (this.prerelease.length && !other.prerelease.length) {
      return -1
    } else if (!this.prerelease.length && other.prerelease.length) {
      return 1
    } else if (!this.prerelease.length && !other.prerelease.length) {
      return 0
    }

    let i = 0;
    do {
      const a = this.prerelease[i];
      const b = other.prerelease[i];
      debug_1('prerelease compare', i, a, b);
      if (a === undefined && b === undefined) {
        return 0
      } else if (b === undefined) {
        return 1
      } else if (a === undefined) {
        return -1
      } else if (a === b) {
        continue
      } else {
        return compareIdentifiers(a, b)
      }
    } while (++i)
  }

  compareBuild (other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options);
    }

    let i = 0;
    do {
      const a = this.build[i];
      const b = other.build[i];
      debug_1('prerelease compare', i, a, b);
      if (a === undefined && b === undefined) {
        return 0
      } else if (b === undefined) {
        return 1
      } else if (a === undefined) {
        return -1
      } else if (a === b) {
        continue
      } else {
        return compareIdentifiers(a, b)
      }
    } while (++i)
  }

  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc (release, identifier) {
    switch (release) {
      case 'premajor':
        this.prerelease.length = 0;
        this.patch = 0;
        this.minor = 0;
        this.major++;
        this.inc('pre', identifier);
        break
      case 'preminor':
        this.prerelease.length = 0;
        this.patch = 0;
        this.minor++;
        this.inc('pre', identifier);
        break
      case 'prepatch':
        // If this is already a prerelease, it will bump to the next version
        // drop any prereleases that might already exist, since they are not
        // relevant at this point.
        this.prerelease.length = 0;
        this.inc('patch', identifier);
        this.inc('pre', identifier);
        break
      // If the input is a non-prerelease version, this acts the same as
      // prepatch.
      case 'prerelease':
        if (this.prerelease.length === 0) {
          this.inc('patch', identifier);
        }
        this.inc('pre', identifier);
        break

      case 'major':
        // If this is a pre-major version, bump up to the same major version.
        // Otherwise increment major.
        // 1.0.0-5 bumps to 1.0.0
        // 1.1.0 bumps to 2.0.0
        if (
          this.minor !== 0 ||
          this.patch !== 0 ||
          this.prerelease.length === 0
        ) {
          this.major++;
        }
        this.minor = 0;
        this.patch = 0;
        this.prerelease = [];
        break
      case 'minor':
        // If this is a pre-minor version, bump up to the same minor version.
        // Otherwise increment minor.
        // 1.2.0-5 bumps to 1.2.0
        // 1.2.1 bumps to 1.3.0
        if (this.patch !== 0 || this.prerelease.length === 0) {
          this.minor++;
        }
        this.patch = 0;
        this.prerelease = [];
        break
      case 'patch':
        // If this is not a pre-release version, it will increment the patch.
        // If it is a pre-release it will bump up to the same patch version.
        // 1.2.0-5 patches to 1.2.0
        // 1.2.0 patches to 1.2.1
        if (this.prerelease.length === 0) {
          this.patch++;
        }
        this.prerelease = [];
        break
      // This probably shouldn't be used publicly.
      // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
      case 'pre':
        if (this.prerelease.length === 0) {
          this.prerelease = [0];
        } else {
          let i = this.prerelease.length;
          while (--i >= 0) {
            if (typeof this.prerelease[i] === 'number') {
              this.prerelease[i]++;
              i = -2;
            }
          }
          if (i === -1) {
            // didn't increment anything
            this.prerelease.push(0);
          }
        }
        if (identifier) {
          // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
          // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
          if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
            if (isNaN(this.prerelease[1])) {
              this.prerelease = [identifier, 0];
            }
          } else {
            this.prerelease = [identifier, 0];
          }
        }
        break

      default:
        throw new Error(`invalid increment argument: ${release}`)
    }
    this.format();
    this.raw = this.version;
    return this
  }
}

var semver = SemVer;

const compare = (a, b, loose) =>
  new semver(a, loose).compare(new semver(b, loose));

var compare_1 = compare;

var bind = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};

// utils is a library of generic helper functions non-specific to axios

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
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
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
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
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
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
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
  }

  // Force an array if not already something iterable
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
function merge(/* obj1, obj2, obj3, ... */) {
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
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
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
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};

var cookies = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
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
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);

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
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
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

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

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

  if (!headers) { return parsed; }

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

var isURLSameOrigin = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
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

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
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
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);

var xhr = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;
    var responseType = config.responseType;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !responseType || responseType === 'text' ||  responseType === 'json' ?
        request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
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
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend);
      };
    }

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(
        timeoutErrorMessage,
        config,
        config.transitional && config.transitional.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
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
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType;
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
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
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
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

    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data) || (headers && headers['Content-Type'] === 'application/json')) {
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

    if (strictJSONParsing || (forcedJSONParsing && utils.isString(data) && data.length)) {
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
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData.call(
    config,
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults_1.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData.call(
      config,
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
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
  var defaultToConfig2Keys = [
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',
    'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'
  ];
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

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys)
    .concat(directMergeKeys);

  var otherKeys = Object
    .keys(config1)
    .concat(Object.keys(config2))
    .filter(function filterAxiosKeys(key) {
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

var validators$1 = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function(type, i) {
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
  }

  // eslint-disable-next-line func-names
  return function(value, opt, opts) {
    if (validator === false) {
      throw new Error(formatMessage(opt, ' has been removed in ' + version));
    }

    if (isDeprecated && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(
        formatMessage(
          opt,
          ' has been deprecated since v' + version + ' and will be removed in the near future'
        )
      );
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

  config = mergeConfig(this.defaults, config);

  // Set config.method
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
  }

  // filter out skipped interceptors
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
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
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
  return (typeof payload === 'object') && (payload.isAxiosError === true);
};

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios_1(defaultConfig);
  var instance = bind(Axios_1.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios_1.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios$1 = createInstance(defaults_1);

// Expose Axios class to allow class inheritance
axios$1.Axios = Axios_1;

// Factory for creating new instances
axios$1.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios$1.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios$1.Cancel = Cancel_1;
axios$1.CancelToken = CancelToken_1;
axios$1.isCancel = isCancel;

// Expose all/spread
axios$1.all = function all(promises) {
  return Promise.all(promises);
};
axios$1.spread = spread;

// Expose isAxiosError
axios$1.isAxiosError = isAxiosError;

var axios_1 = axios$1;

// Allow use of default import syntax in TypeScript
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

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
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
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function get(url, headers) {
    return axios.get(url.href, { headers: headers })
        .then(function (res) { return res.data; });
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

var GitVersions = /** @class */ (function () {
    function GitVersions() {
    }
    GitVersions.getNewestCommit = function (user, repo, branch) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!user || !repo || !branch) {
                    throw new Error('Missing argument');
                }
                return [2 /*return*/, get(new URL("/api/v1/git-versions/" + user + "/" + repo + "/branches/" + branch, NXApi.url))
                        .then(function (res) { return (__assign(__assign({}, res), { timestamp: new Date(res.timestamp) })); })];
            });
        });
    };
    GitVersions.getReleases = function (user, repo, includePreReleases, skip, take) {
        return __awaiter(this, void 0, void 0, function () {
            var takePreReleasesArg, skipArg, takeArg;
            return __generator(this, function (_a) {
                if (!user || !repo) {
                    throw new Error('Missing argument');
                }
                if (skip < 0 || take < 0) {
                    throw new Error("skip or take cannot be negative");
                }
                takePreReleasesArg = "?includePreReleases=" + (includePreReleases === true);
                skipArg = skip !== undefined ? "&skip=" + skip : "";
                takeArg = take !== undefined ? "&take=" + take : "";
                return [2 /*return*/, get(new URL("/api/v1/git-versions/" + user + "/" + repo + "/releases" + takePreReleasesArg + skipArg + takeArg, NXApi.url))
                        .then(function (res) { return res.map(function (rel) { return (__assign(__assign({}, rel), { publishedAt: new Date(rel.publishedAt) })); }); })];
            });
        });
    };
    GitVersions.getPulls = function (user, repo) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!user || !repo) {
                    throw new Error('Missing argument');
                }
                return [2 /*return*/, get(new URL("/api/v1/git-versions/" + user + "/" + repo + "/pulls", NXApi.url))];
            });
        });
    };
    GitVersions.getArtifact = function (user, repo, pull) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!user || !repo || !pull) {
                    throw new Error('Missing argument');
                }
                return [2 /*return*/, get(new URL("/api/v1/git-versions/" + user + "/" + repo + "/pulls/" + pull + "/artifact", NXApi.url))];
            });
        });
    };
    return GitVersions;
}());

/** @class */ ((function (_super) {
    __extends(TelexNotConnectedError, _super);
    function TelexNotConnectedError() {
        return _super.call(this, 'TELEX is not connected') || this;
    }
    return TelexNotConnectedError;
})(Error));

var NXApi = /** @class */ (function () {
    function NXApi() {
    }
    NXApi.url = new URL('https://api.flybywiresim.com');
    return NXApi;
}());

// Copyright (c) 2022 FlyByWire Simulations
var KnowBranchNames;
(function (KnowBranchNames) {
    KnowBranchNames["rel"] = "Stable";
    KnowBranchNames["dev"] = "Development";
    KnowBranchNames["exp"] = "Experimental";
})(KnowBranchNames || (KnowBranchNames = {}));
/**
 *  Provides functions to the check the version of the aircraft against the
 *  published GitHub version
 */
class AircraftVersionChecker {
    /**
     * Checks if the aircraft version is outdated and shows a popup if it is.
     *
     * @returns true if the aircraft version has been checked, false if no check has been commenced.
     */
    static async checkVersion() {
        console.log('Checking aircraft version');
        this.notification = new NotificationManager();
        // reset previous check data
        this.versionChecked = false;
        this.setOutdatedVersionFlag(false);
        // Retrieve the version info from a32nx_build_info.json and GitHub
        await this.initialize();
        // assert all version info is available
        if (!(this.buildInfo && this.releaseInfo && this.newestCommit && this.newestExpCommit)) {
            console.error('Not all version information available. Skipping version check.');
            return false;
        }
        try {
            const versionInfo = this.getVersionInfo(this.buildInfo.version);
            if (this.checkOutdated(versionInfo)) {
                this.setOutdatedVersionFlag(true);
                console.log('Aircraft version outdated');
            }
            else {
                console.log('Aircraft version ok');
            }
            this.versionChecked = true;
        }
        catch (error) {
            console.error('Version comparison failed: ', error);
        }
        return this.versionChecked;
    }
    /**
     * Reads the a32nx_build_info.json file and returns the data a BuildInfo object.
     * It returns a cached version if it has been read before as the file is not expected to change
     * during the MSFS session.
     *
     * @returns Promise on a BuildInfo object
     */
    static async getBuildInfo() {
        if (this.buildInfo) {
            return this.buildInfo;
        }
        await fetch('/VFS/a32nx_build_info.json').then((response) => {
            response.json().then((json) => {
                this.buildInfo = ({
                    built: json.built,
                    ref: json.ref,
                    sha: json.sha,
                    actor: json.actor,
                    eventName: json.event_name,
                    prettyReleaseName: json.pretty_release_name,
                    version: json.version,
                });
            });
        });
        return this.buildInfo;
    }
    /**
     * Parses the version string and returns the version info as VersionInfoData object.
     * Note: public because of jest test
     *
     * @param versionString as provided by the a32nx_build_info.json file.
     * @throws Error if the version string is not in the correct format.
     */
    static getVersionInfo(versionString) {
        const matchBuildInfo = versionString.match(/^v?((\d+)\.(\d+)\.(\d+))-(.*)\.(.{7})$/);
        if (matchBuildInfo) {
            return {
                version: matchBuildInfo[1],
                major: parseInt(matchBuildInfo[2], 10),
                minor: parseInt(matchBuildInfo[3], 10),
                patch: parseInt(matchBuildInfo[4], 10),
                branch: matchBuildInfo[5],
                commit: matchBuildInfo[6],
            };
        }
        throw new Error('Invalid version format');
    }
    /**
     * Retrieves the various versions from the current aircraft and GitHub and stores them in class variables.
     *
     * @private
     */
    static async initialize() {
        this.releaseInfo = await GitVersions.getReleases('flybywiresim', 'a32nx', false, 0, 1);
        this.newestCommit = await GitVersions.getNewestCommit('flybywiresim', 'a32nx', 'master');
        this.newestExpCommit = await GitVersions.getNewestCommit('flybywiresim', 'a32nx', 'experimental');
        this.buildInfo = await AircraftVersionChecker.getBuildInfo();
    }
    /**
     * Checks if the given version is outdated and shows a notification if it is.
     *
     * @param versionInfo
     * @returns true if the version is outdated, false otherwise.
     * @private
     */
    static checkOutdated(versionInfo) {
        // Set branchName to the long versions of the aircraft edition names
        const branchName = KnowBranchNames[versionInfo.branch] || versionInfo.branch;
        // Check if main version is outdated
        if (compare_1(versionInfo.version, this.releaseInfo[0].name) < 0) {
            console.log(`New version available: ${versionInfo.version} ==> ${this.releaseInfo[0].name}`);
            this.showVersionPopup('', versionInfo.version, this.releaseInfo[0].name);
            return true;
        }
        // If the user's version is equal or newer than the latest release then check if
        // the edition is Development or Experimental and if the commit is older than
        // {maxAge} days after the latest release to show notification
        const maxAge = 3;
        const timestampAircraft = new Date(this.buildInfo.built);
        if ((branchName === KnowBranchNames.dev)
            && (versionInfo.commit !== this.newestCommit.shortSha)
            && (this.addDays(timestampAircraft, maxAge) < this.newestCommit.timestamp)) {
            this.showNotification(versionInfo, timestampAircraft, branchName, this.newestCommit);
            return true;
        }
        if ((branchName === KnowBranchNames.exp)
            && (versionInfo.commit !== this.newestExpCommit.shortSha)
            && (this.addDays(timestampAircraft, maxAge) < this.newestExpCommit.timestamp)) {
            this.showNotification(versionInfo, timestampAircraft, branchName, this.newestExpCommit);
            return true;
        }
        return false;
    }
    /**
     * Adds a given number of days to a given Date object
     *
     * @param date
     * @param days
     * @private
     */
    static addDays(date, days) {
        const result = new Date(date);
        result.setDate(date.getDate() + days);
        return result;
    }
    /**
     * Displays a popup with the version information.
     *
     * @param versionInfo
     * @param timestampAircraft
     * @param branchName
     * @param commitInfo
     * @private
     */
    static showNotification(versionInfo, timestampAircraft, branchName, commitInfo) {
        const currentVersionStr = `${versionInfo.version}-${versionInfo.branch}.${versionInfo.commit} (${timestampAircraft.toUTCString()})`;
        const releaseVersionStr = `${versionInfo.version}-${versionInfo.branch}.${commitInfo.shortSha} (${commitInfo.timestamp.toUTCString()})`;
        console.log(`New commit available: ${currentVersionStr} ==> ${releaseVersionStr}`);
        this.showVersionPopup(branchName, currentVersionStr, releaseVersionStr);
    }
    /**
     * Show a version info modal if the aircraft version is outdated
     *
     * @param branchName
     * @param currentVersion
     * @param releaseVersion
     * @private
     */
    static showVersionPopup(branchName, currentVersion, releaseVersion) {
        // TODO: Make translation work - move translation from EFB to shared
        const dialog = new PopUpDialog();
        dialog.showInformation('New Version Available', `<div style="font-size: 120%; text-align: left;">
                        You are using the ${branchName} edition with version: <br>
                        <strong>${currentVersion}</strong><br><br>

                        Latest ${branchName} version is <br>
                        <strong>${releaseVersion}</strong><br/><br/>

                        Please update your aircraft using the FlyByWire Installer.
                    </div>`, 'normal', () => {
        });
    }
    /**
     *Set the L:A32NX_OUTDATED_VERSION flag to true or false
     *
     * @param b
     * @private
     */
    static setOutdatedVersionFlag(b) {
        SimVar.SetSimVarValue('L:A32NX_OUTDATED_VERSION', 'Bool', b ? 1 : 0);
    }
    /**
     * Returns true if at least one valid version check has been done. This can be called before
     * calling checkVersion to avoid checking multiple times.
     *
     * @returns true if at least one valid version check has been done.
     */
    static get isVersionChecked() {
        return this.versionChecked;
    }
}
AircraftVersionChecker.versionChecked = false;

// Copyright (c) 2022 FlyByWire Simulations
/**
 * This class is used to check the version of the aircraft and display a warning if it is too old.
 */
class VersionCheck {
    constructor(bus) {
        this.bus = bus;
        console.log('VersionCheck: Created');
    }
    connectedCallback() {
        // empty
    }
    startPublish() {
        console.log('VersionCheck: startPublish()');
        AircraftVersionChecker.checkVersion();
    }
    update() {
        // empty
    }
}

// Copyright (c) 2022 FlyByWire Simulations
/**
 * This is the main class for the extras-host instrument.
 *
 * It provides an environment for non-aircraft non-wasm systems/modules to run in.
 *
 * Usage:
 *  - Add new modules as private readonly members of this class.
 *  - Add the modules to the constructor.
 *  - Add the modules to the connectedCallback() method.
 *  - Add the modules to the Update() method.
 *
 * Each module must implement the following methods:
 * - `constructor` to get access to the system-wide EventBus
 * - `connectedCallback` which is called after the simulator set up everything. These functions will also add the subscribtion to special events.
 * - `startPublish` which is called as soon as the simulator starts running. It will also start publishing the simulator variables onto the EventBus
 * - `update` is called in every update call of the simulator, but only after `startPublish` is called
 */
class ExtrasHost extends BaseInstrument {
    constructor() {
        super();
        /**
         * "mainmenu" = 0
         * "loading" = 1
         * "briefing" = 2
         * "ingame" = 3
         */
        this.gameState = 0;
        this.bus = new EventBus();
        this.hEventPublisher = new HEventPublisher(this.bus);
        this.simVarPublisher = new ExtrasSimVarPublisher(this.bus);
        this.notificationManager = new NotificationManager();
        this.pushbuttonCheck = new PushbuttonCheck(this.bus, this.notificationManager);
        this.versionCheck = new VersionCheck(this.bus);
        this.keyInterceptor = new KeyInterceptor(this.bus, this.notificationManager);
        console.log('A32NX_EXTRASHOST: Created');
    }
    get templateID() {
        return 'A32NX_EXTRASHOST';
    }
    getDeltaTime() {
        return this.deltaTime;
    }
    onInteractionEvent(args) {
        this.hEventPublisher.dispatchHEvent(args[0]);
    }
    connectedCallback() {
        super.connectedCallback();
        this.pushbuttonCheck.connectedCallback();
        this.versionCheck.connectedCallback();
        this.keyInterceptor.connectedCallback();
    }
    Update() {
        super.Update();
        if (this.gameState !== GameState.ingame) {
            const gs = this.getGameState();
            if (gs === GameState.ingame) {
                this.hEventPublisher.startPublish();
                this.versionCheck.startPublish();
                this.keyInterceptor.startPublish();
                this.simVarPublisher.startPublish();
            }
            this.gameState = gs;
        }
        else {
            this.simVarPublisher.onUpdate();
        }
        this.versionCheck.update();
        this.keyInterceptor.update();
    }
}
registerInstrument('extras-host', ExtrasHost);
