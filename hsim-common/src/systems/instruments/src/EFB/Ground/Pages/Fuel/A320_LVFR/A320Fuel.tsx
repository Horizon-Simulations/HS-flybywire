// Copyright (c) 2023-2024 FlyByWire Simulations
// SPDX-License-Identifier: GPL-3.0

/* eslint-disable max-len */
import { Units, usePersistentNumberProperty, usePersistentProperty, useSimVar } from '@flybywiresim/fbw-sdk';
import { OverWingOutline, ProgressBar, SelectGroup, SelectItem, SimpleInput, TooltipWrapper, getAirframeType, t } from '@flybywiresim/flypad'; // BE CAREFUL
import { round } from 'lodash';
import Slider from 'rc-slider';
import React, { useState } from 'react';
import { CloudArrowDown, PlayFill, StopCircleFill } from 'react-bootstrap-icons';
import { FuelCapacity } from './Constants'; //CUSTOM LOOKUP BY HORIZON SIMULATIONS

interface TankReadoutProps {
    title: string;
    current: number;
    target: number;
    capacity: number;
    currentUnit: string;
    tankValue: number;
    convertedFuelValue: number;
    className?: string;
    inlinedTitle?: boolean;
    width?: number;
}

const TankReadoutWidget = ({ title, current, target, capacity, currentUnit, tankValue, convertedFuelValue, className, inlinedTitle, width = 366 }: TankReadoutProps) => {
    const getFuelBarPercent = (curr: number, max: number) => (Math.max(curr, 0) / max) * 100;

    return (
        <div className={`bg-theme-body w-min space-y-3 overflow-hidden p-4 ${className}`} style={{ width: `${width}px` }}>
            <div className={inlinedTitle ? 'flex flex-row items-center justify-between' : undefined}>
                <h2>{title}</h2>
                <p>{`${convertedFuelValue}/${round(tankValue)} ${currentUnit}`}</p>
            </div>
            <ProgressBar
                height="20px"
                width={`${width - 40}px`}
                displayBar={false}
                completedBarBegin={getFuelBarPercent(target, capacity)}
                isLabelVisible={false}
                bgcolor="var(--color-highlight)"
                completed={(Math.max(current, 0) / capacity) * 100}
            />
        </div>
    );
};

interface FuelProps {
    simbriefDataLoaded: boolean,
    simbriefPlanRamp: number,
    simbriefUnits: string,
    massUnitForDisplay: string,
    convertUnit: number,
    isOnGround: boolean,
}
export const A320Fuel: React.FC<FuelProps> = ({
    simbriefDataLoaded,
    simbriefPlanRamp,
    simbriefUnits,
    massUnitForDisplay,
    convertUnit,
    isOnGround,
}) => {
    const [airframe] = useState(getAirframeType());
    const TOTAL_FUEL_GALLONS = FuelCapacity[(airframe !== null ? airframe : 'A320_214')].total;
    const OUTER_CELL_GALLONS = FuelCapacity[(airframe !== null ? airframe : 'A320_214')].outer_cell;
    const INNER_CELL_GALLONS = FuelCapacity[(airframe !== null ? airframe : 'A320_214')].inner_cell;
    const CENTER_TANK_GALLONS = FuelCapacity[(airframe !== null ? airframe : 'A320_214')].center;
    const ACT1_TANK_GALLONS = FuelCapacity[(airframe !== null ? airframe : 'A320_214')].act1;
    const ACT2_TANK_GALLONS = FuelCapacity[(airframe !== null ? airframe : 'A320_214')].act2;
    const ACT4_TANK_GALLONS = FuelCapacity[(airframe !== null ? airframe : 'A320_214')].act4;
    const wingTotalRefuelTimeSeconds = 1020;
    const CenterTotalRefuelTimeSeconds = 1200;

    const [galToKg] = useSimVar('FUEL WEIGHT PER GALLON', 'kilograms', 1_000);
    const outerCell = () => OUTER_CELL_GALLONS * galToKg * convertUnit;
    const outerCells = () => outerCell() * 2;
    const innerCell = () => INNER_CELL_GALLONS * galToKg * convertUnit;
    const innerCells = () => innerCell() * 2;
    const centerTank = () => CENTER_TANK_GALLONS * galToKg * convertUnit;
    const ACT1Tank = () => ACT1_TANK_GALLONS * galToKg * convertUnit;
    const ACT2Tank = () => ACT2_TANK_GALLONS * galToKg * convertUnit;
    const ACT4Tank = () => ACT4_TANK_GALLONS * galToKg * convertUnit;
    const totalFuel = () => centerTank() + innerCells() + outerCells()+ ACT1Tank() + ACT2Tank() + ACT4Tank();
    const [eng1Running] = useSimVar('ENG COMBUSTION:1', 'Bool', 1_000);
    const [eng2Running] = useSimVar('ENG COMBUSTION:2', 'Bool', 1_000);
    const [refuelRate, setRefuelRate] = usePersistentProperty('REFUEL_RATE_SETTING');
    const [sliderValue, setSliderValue] = useSimVar('L:A32NX_FUEL_DESIRED_PERCENT', 'Number');
    const [inputValue, setInputValue] = useSimVar('L:A32NX_FUEL_DESIRED', 'Number');
    const [totalTarget, setTotalTarget] = useSimVar('L:A32NX_FUEL_TOTAL_DESIRED', 'Number');
    const [refuelStartedByUser, setRefuelStartedByUser] = useSimVar('L:A32NX_REFUEL_STARTED_BY_USR', 'Bool');
    const [centerTarget, setCenterTarget] = useSimVar('L:A32NX_FUEL_CENTER_DESIRED', 'Number');
    const [LInnTarget, setLInnTarget] = useSimVar('L:A32NX_FUEL_LEFT_MAIN_DESIRED', 'Number');
    const [LOutTarget, setLOutTarget] = useSimVar('L:A32NX_FUEL_LEFT_AUX_DESIRED', 'Number');
    const [RInnTarget, setRInnTarget] = useSimVar('L:A32NX_FUEL_RIGHT_MAIN_DESIRED', 'Number');
    const [ROutTarget, setROutTarget] = useSimVar('L:A32NX_FUEL_RIGHT_AUX_DESIRED', 'Number');
    const [ACT1Target, setACT1Target] = useSimVar('L:A32NX_FUEL_CENTER2_DESIRED', 'Number');
    const [ACT2Target, setACT2Target] = useSimVar('L:A32NX_FUEL_CENTER3_DESIRED', 'Number');
    const [ACT4Target, setACT4Target] = useSimVar('L:A32NX_FUEL_EXTERNAL1_DESIRED', 'Number');
    const [centerCurrent] = useSimVar('FUEL TANK CENTER QUANTITY', 'Gallons', 1_000);
    const [LInnCurrent] = useSimVar('FUEL TANK LEFT MAIN QUANTITY', 'Gallons', 1_000);
    const [LOutCurrent] = useSimVar('FUEL TANK LEFT AUX QUANTITY', 'Gallons', 1_000);
    const [RInnCurrent] = useSimVar('FUEL TANK RIGHT MAIN QUANTITY', 'Gallons', 1_000);
    const [ROutCurrent] = useSimVar('FUEL TANK RIGHT AUX QUANTITY', 'Gallons', 1_000);
    const [ACT1Current] = useSimVar('FUEL TANK CENTER2 QUANTITY', 'Gallons', 1_000);
    const [ACT2Current] = useSimVar('FUEL TANK CENTER3 QUANTITY', 'Gallons', 1_000);
    const [ACT4Current] = useSimVar('FUEL TANK EXTERNAL1 QUANTITY', 'Gallons', 1_000);

    // GSX
    const [gsxFuelSyncEnabled] = usePersistentNumberProperty('GSX_FUEL_SYNC', 0);
    const [gsxFuelHoseConnected] = useSimVar('L:FSDT_GSX_FUELHOSE_CONNECTED', 'Number');
    const [gsxRefuelState] = useSimVar('L:FSDT_GSX_REFUELING_STATE', 'Number');

    const gsxRefuelActive = () => (gsxRefuelState === 4 || gsxRefuelState === 5);

    const canRefuel = () => !(eng1Running || eng2Running || !isOnGround);

    const airplaneCanRefuel = () => {
        if (refuelRate !== '2') {
            if (!canRefuel()) {
                setRefuelRate('2');
            }
        }

        if (gsxFuelSyncEnabled === 1) {
            if (gsxFuelHoseConnected === 1 || refuelRate === '2') {
                return true;
            }

            // In-flight refueling with GSX Sync enabled
            return !canRefuel() && refuelRate === '2';
        }
        return true;
    };

    const currentWingFuel = () => round(Math.max((LInnCurrent + (LOutCurrent) + (RInnCurrent) + (ROutCurrent)), 0));
    const targetWingFuel = () => round(Math.max((LInnTarget + (LOutTarget) + (RInnTarget) + (ROutTarget)), 0));
    const convertToGallon = (curr : number) => curr * (1 / convertUnit) * (1 / galToKg);
    const totalCurrentGallon = () => round(Math.max((LInnCurrent + (LOutCurrent) + (RInnCurrent) + (ROutCurrent) + (centerCurrent) + (ACT1Current) + (ACT2Current) + (ACT4Current)), 0));

    const totalCurrent = () => {
        if (round(totalTarget) === totalCurrentGallon()) {
            return inputValue;
        }
        const val = round(totalCurrentGallon() * getFuelMultiplier());
        if (centerCurrent > 0 && centerCurrent < CENTER_TANK_GALLONS) {
            return round(val + convertUnit);
        }
        return val;
    };

    const formatRefuelStatusLabel = () => {
        if (airplaneCanRefuel()) {
            if (round(totalTarget) === totalCurrentGallon()) {
                return `(${t('Ground.Fuel.Completed')})`;
            }
            if (refuelStartedByUser) {
                return ((totalTarget) > (totalCurrentGallon())) ? `(${t('Ground.Fuel.Refueling')}...)` : `(${t('Ground.Fuel.Defueling')}...)`;
            }
            return `(${t('Ground.Fuel.ReadyToStart')})`;
        }
        if (gsxFuelSyncEnabled === 1) {
            if (!gsxRefuelActive()) {
                return `(${t('Ground.Fuel.GSXFuelSyncEnabled')})`;
            }

            return '';
        }
        return `(${t('Ground.Fuel.Unavailable')})`;
    };

    const formatRefuelStatusClass = () => {
        if (airplaneCanRefuel()) {
            if (round(totalTarget) === totalCurrentGallon() || !refuelStartedByUser) {
                if (refuelStartedByUser) {
                    setRefuelStartedByUser(false);
                }
                return 'text-theme-highlight';
            }
            return ((totalTarget) > (totalCurrentGallon())) ? 'text-green-500' : 'text-yellow-500';
        }
        if (gsxFuelSyncEnabled && !gsxRefuelActive()) {
            return 'text-theme-highlight';
        }
        return 'text-theme-accent';
    };

    const getFuelMultiplier = () => galToKg * convertUnit;

    const formatFuelFilling = (curr: number, max: number) => {
        const percent = (Math.max(curr, 0) / max) * 100;
        return `linear-gradient(to top, var(--color-highlight) ${percent}%,#ffffff00 0%)`;
    };

    const convertFuelValue = (curr: number) => round(round(Math.max(curr, 0)) * getFuelMultiplier());

    const convertFuelValueCenter = (curr: number) => {
        if (curr < 1) {
            return 0;
        }
        if (curr === CENTER_TANK_GALLONS) {
            return convertFuelValue(curr);
        }
        return round(convertFuelValue(curr) + convertUnit);
    };

    const setDesiredFuel = (fuel: number) => {
        fuel -= (OUTER_CELL_GALLONS) * 2;
        const outerTank = (((OUTER_CELL_GALLONS) * 2) + Math.min(fuel, 0)) / 2;
        setLOutTarget(outerTank);
        setROutTarget(outerTank);
        if (fuel <= 0) {
            setLInnTarget(0);
            setRInnTarget(0);
            setCenterTarget(0);
            setACT1Target(0);
            setACT2Target(0);
            setACT4Target(0);
            return;
        }
        fuel -= (INNER_CELL_GALLONS) * 2;
        const innerTank = (((INNER_CELL_GALLONS) * 2) + Math.min(fuel, 0)) / 2;
        setLInnTarget(innerTank);
        setRInnTarget(innerTank);
        if (fuel <= 0) {
            setCenterTarget(0);
            setACT1Target(0);
            setACT2Target(0);
            setACT4Target(0);
            return;
        }
        setCenterTarget(fuel);
    };

    const updateDesiredFuel = (value: string) => {
        let fuel = 0;
        let originalFuel = 0;
        if (value.length > 0) {
            originalFuel = parseInt(value);
            fuel = convertToGallon(originalFuel);
            if (originalFuel > totalFuel()) {
                originalFuel = round(totalFuel());
            }
            setInputValue(originalFuel);
        }
        if (fuel > TOTAL_FUEL_GALLONS) {
            fuel = TOTAL_FUEL_GALLONS + 2;
        }
        setTotalTarget(fuel);
        setSliderValue((fuel / TOTAL_FUEL_GALLONS) * 100);
        setDesiredFuel(fuel);
    };

    const updateSlider = (value: number) => {
        if (value < 2) {
            value = 0;
        }
        setSliderValue(value);
        const fuel = Math.round(totalFuel() * (value / 100));
        updateDesiredFuel(fuel.toString());
    };

    const calculateEta = () => {
        if (round(totalTarget) === totalCurrentGallon() || refuelRate === '2') { // instant
            return ' 0';
        }
        let estimatedTimeSeconds = 0;
        const totalWingFuel = TOTAL_FUEL_GALLONS - CENTER_TANK_GALLONS;
        const differentialFuelWings = Math.abs(currentWingFuel() - targetWingFuel());
        const differentialFuelCenter = Math.abs(centerTarget - centerCurrent);
        const estimatedTimeSecondsWing = (differentialFuelWings / totalWingFuel) * wingTotalRefuelTimeSeconds;
        const estimatedTimeSecondsCenter = (differentialFuelCenter / CENTER_TANK_GALLONS) * CenterTotalRefuelTimeSeconds;
        estimatedTimeSeconds = Math.max(estimatedTimeSecondsWing, estimatedTimeSecondsCenter);
        if (refuelRate === '1') { // fast
            estimatedTimeSeconds /= 5;
        }
        if (estimatedTimeSeconds < 35) {
            return ' 0.5';
        }
        return ` ${Math.round(estimatedTimeSeconds / 60)}`;
    };

    const switchRefuelState = () => {
        if (airplaneCanRefuel()) {
            setRefuelStartedByUser(!refuelStartedByUser);
        }
    };

    const handleFuelAutoFill = () => {
        let fuelToLoad: number;

        if (Units.usingMetric) {
            if (simbriefUnits === 'kgs') {
                fuelToLoad = roundUpNearest100(simbriefPlanRamp);
            } else {
                fuelToLoad = roundUpNearest100(Units.poundToKilogram(simbriefPlanRamp));
            }
        } else if (simbriefUnits === 'kgs') {
            fuelToLoad = roundUpNearest100(Units.kilogramToPound(simbriefPlanRamp));
        } else {
            fuelToLoad = roundUpNearest100(simbriefPlanRamp);
        }

        updateDesiredFuel(fuelToLoad.toString());
    };

    const roundUpNearest100 = (plannedFuel: number) => Math.ceil(plannedFuel / 100) * 100;

    return (
        <div className="h-content-section-reduced relative mt-6 flex flex-col justify-between">
            <div className="z-30">
                <div className="absolute inset-x-0 top-0 mx-auto flex flex-col items-center space-y-3">
                    <TankReadoutWidget
                        title={t('Ground.Fuel.TotalFuel')}
                        current={totalCurrent()}
                        target={totalTarget}
                        capacity={totalFuel()}
                        currentUnit={massUnitForDisplay}
                        tankValue={totalFuel()}
                        convertedFuelValue={totalCurrent()}
                        className="border-theme-accent overflow-hidden rounded-2xl border-2"
                        inlinedTitle
                        width={420}
                    />
                    <TankReadoutWidget
                        title={t('Ground.Fuel.CenterTank')}
                        current={centerCurrent}
                        target={centerTarget}
                        capacity={CENTER_TANK_GALLONS}
                        currentUnit={massUnitForDisplay}
                        tankValue={centerTank()}
                        convertedFuelValue={convertFuelValueCenter(centerCurrent)}
                        className="border-theme-accent overflow-hidden rounded-2xl border-2"
                        inlinedTitle
                        width={420}
                    />
                </div>
                <div className="absolute inset-x-0 top-40 flex flex-row justify-between">
                    <div className="divide-theme-accent border-theme-accent w-min divide-y overflow-hidden rounded-2xl border-2">
                        <TankReadoutWidget
                            title={t('Ground.Fuel.LeftInnerTank')}
                            current={LInnCurrent}
                            target={LInnTarget}
                            capacity={INNER_CELL_GALLONS}
                            currentUnit={massUnitForDisplay}
                            tankValue={innerCell()}
                            convertedFuelValue={convertFuelValue(LInnCurrent)}
                        />
                        <TankReadoutWidget
                            title={t('Ground.Fuel.LeftOuterTank')}
                            current={LOutCurrent}
                            target={LOutTarget}
                            capacity={OUTER_CELL_GALLONS}
                            currentUnit={massUnitForDisplay}
                            tankValue={outerCell()}
                            convertedFuelValue={convertFuelValueCenter(LOutCurrent)}
                        />
                    </div>
                    <div className="divide-theme-accent border-theme-accent w-min divide-y overflow-hidden rounded-2xl border-2">
                        <TankReadoutWidget
                            title={t('Ground.Fuel.RightInnerTank')}
                            current={RInnCurrent}
                            target={RInnTarget}
                            capacity={INNER_CELL_GALLONS}
                            currentUnit={massUnitForDisplay}
                            tankValue={innerCell()}
                            convertedFuelValue={convertFuelValueCenter(RInnCurrent)}
                        />
                        <TankReadoutWidget
                            title={t('Ground.Fuel.RightOuterTank')}
                            current={ROutCurrent}
                            target={ROutTarget}
                            capacity={OUTER_CELL_GALLONS}
                            currentUnit={massUnitForDisplay}
                            tankValue={outerCell()}
                            convertedFuelValue={convertFuelValueCenter(ROutCurrent)}
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center justify-end">
                {/* FIXME TODO: Replace with Tailwind JIT values later */}
                <div className="absolute inset-x-0 bottom-0" style={{ transform: 'translate(0px, -150px)' }}>
                    <OverWingOutline className="absolute bottom-0 left-0 z-20" />

                    <div
                        className="absolute z-20"
                        style={{ width: '137px', height: '110px', bottom: '243px', left: '572px', background: formatFuelFilling(centerCurrent, CENTER_TANK_GALLONS) }}
                    />
                    <div
                        className="absolute z-0"
                        style={{ width: '310px', height: '215px', bottom: '140px', left: '260px', background: formatFuelFilling(LInnCurrent, INNER_CELL_GALLONS) }}
                    />
                    <div
                        className="absolute z-0"
                        style={{ width: '310px', height: '215px', bottom: '140px', right: '260px', background: formatFuelFilling(RInnCurrent, INNER_CELL_GALLONS) }}
                    />
                    <div
                        className="absolute z-0"
                        style={{ width: '122px', height: '98px', bottom: '100px', left: '138px', background: formatFuelFilling(LOutCurrent, OUTER_CELL_GALLONS) }}
                    />
                    <div
                        className="absolute z-0"
                        style={{ width: '122px', height: '98px', bottom: '100px', right: '138px', background: formatFuelFilling(ROutCurrent, OUTER_CELL_GALLONS) }}
                    />
                    {/* tl overlay */}
                    <div
                        className="bottom-overlay-t-y left-overlay-tl -rotate-26.5 bg-theme-body absolute z-10"
                        style={{ transform: 'rotate(-26.5deg)', width: '490px', height: '140px', bottom: '240px', left: '82px' }}
                    />
                    {/* tr overlay */}
                    <div
                        className="bottom-overlay-t-y right-overlay-tr rotate-26.5 bg-theme-body absolute z-10"
                        style={{ transform: 'rotate(26.5deg)', width: '490px', height: '140px', bottom: '240px', right: '82px' }}
                    />
                    {/* bl overlay */}
                    <div
                        className="bottom-overlay-b-y left-overlay-bl -rotate-18.5 bg-theme-body absolute z-10"
                        style={{ transform: 'rotate(-18.5deg)', width: '484px', height: '101px', bottom: '78px', left: '144px' }}
                    />
                    {/* br overlay */}
                    <div
                        className="bottom-overlay-b-y right-overlay-br rotate-18.5 bg-theme-body absolute z-10"
                        style={{ transform: 'rotate(18.5deg)', width: '484px', height: '101px', bottom: '78px', right: '144px' }}
                    />
                </div>

                <div className="border-theme-accent border-2 absolute bottom-0 left-0 z-10 flex max-w-3xl flex-row overflow-x-hidden rounded-2xl border">
                    <div className="space-y-4 px-5 py-3">
                        <div className="flex flex-row items-center justify-between">
                            <div className="flex flex-row items-center space-x-3">
                                <h2 className="font-medium">{t('Ground.Fuel.Refuel')}</h2>
                                <p className={formatRefuelStatusClass()}>{formatRefuelStatusLabel()}</p>
                            </div>
                            <p>{`${t('Ground.Fuel.EstimatedDuration')}: ${calculateEta()}`}</p>
                        </div>
                        <div className="flex flex-row items-center space-x-6">
                            <Slider
                                style={{ width: '28rem' }}
                                value={sliderValue}
                                onChange={updateSlider}
                            />
                            <div className="flex flex-row">
                                <div className="relative">
                                    <SimpleInput
                                        className={`w-32 ${simbriefDataLoaded && 'rounded-r-none'}`}
                                        placeholder={round(totalFuel()).toString()}
                                        number
                                        min={0}
                                        max={round(totalFuel())}
                                        value={inputValue}
                                        onChange={(x) => updateDesiredFuel(x)}
                                    />
                                    <div className="absolute right-4 top-2 text-lg text-gray-400">{massUnitForDisplay}</div>
                                </div>
                                {simbriefDataLoaded && (
                                    <TooltipWrapper text={t('Ground.Fuel.TT.FillBlockFuelFromSimBrief')}>
                                        <div
                                            className="border-theme-highlight bg-theme-highlight text-theme-body hover:bg-theme-body hover:text-theme-highlight flex h-auto items-center justify-center rounded-md rounded-l-none border-2 px-2 transition duration-100"
                                            onClick={simbriefDataLoaded ? handleFuelAutoFill : undefined}
                                        >
                                            <CloudArrowDown size={26} />
                                        </div>
                                    </TooltipWrapper>
                                )}
                            </div>
                        </div>
                    </div>

                    {(!gsxFuelSyncEnabled || refuelRate === '2') && (
                        <div
                            className={`flex w-20 items-center justify-center ${formatRefuelStatusClass()} bg-current`}
                            onClick={() => switchRefuelState()}
                        >
                            <div className={`${airplaneCanRefuel() ? 'text-white' : 'text-theme-unselected'}`}>
                                <PlayFill size={50} className={refuelStartedByUser ? 'hidden' : ''} />
                                <StopCircleFill size={50} className={refuelStartedByUser ? '' : 'hidden'} />
                            </div>
                        </div>
                    )}
                </div>

                <div className="border-theme-accent absolute bottom-0 right-6 flex flex-col items-center justify-center space-y-2 overflow-x-hidden rounded-2xl border px-6 py-3">
                    <h2 className="flex font-medium">{t('Ground.Fuel.RefuelTime')}</h2>

                    <SelectGroup>
                        <SelectItem selected={canRefuel() ? refuelRate === '2' : !canRefuel()} onSelect={() => setRefuelRate('2')}>{t('Settings.Instant')}</SelectItem>

                        <TooltipWrapper text={`${!canRefuel() && t('Ground.Fuel.TT.AircraftMustBeColdAndDarkToChangeRefuelTimes')}`}>
                            <div>
                                <SelectItem className={`${!canRefuel() && 'opacity-20'}`} disabled={!canRefuel()} selected={refuelRate === '1'} onSelect={() => setRefuelRate('1')}>{t('Settings.Fast')}</SelectItem>
                            </div>
                        </TooltipWrapper>

                        <TooltipWrapper text={`${!canRefuel() && t('Ground.Fuel.TT.AircraftMustBeColdAndDarkToChangeRefuelTimes')}`}>
                            <div>
                                <SelectItem className={`${!canRefuel() && 'opacity-20'}`} disabled={!canRefuel()} selected={refuelRate === '0'} onSelect={() => setRefuelRate('0')}>{t('Settings.Real')}</SelectItem>
                            </div>
                        </TooltipWrapper>
                    </SelectGroup>
                </div>
            </div>
        </div>
    );
};
