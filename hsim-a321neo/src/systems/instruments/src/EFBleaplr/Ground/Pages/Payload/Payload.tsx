// Copyright (c) 2021-2023 FlyByWire Simulations
//
// SPDX-License-Identifier: GPL-3.0

/* eslint-disable max-len */
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import {
    Shuffle,
    ArrowLeftRight,
    BoxArrowRight,
    BriefcaseFill,
    CloudArrowDown,
    PersonFill,
    StopCircleFill,
} from 'react-bootstrap-icons';
import { useSimVar, Units, SeatFlags, useSeatFlags, usePersistentNumberProperty, usePersistentProperty } from '@flybywiresim/fbw-sdk';
import { round } from 'lodash';
import { CargoWidget } from './Seating/CargoWidget';
import { ChartWidget } from './Chart/ChartWidget';
import { CargoStationInfo, PaxStationInfo } from './Seating/Constants';
import { t } from '../../../translation';
import { TooltipWrapper } from '../../../UtilComponents/TooltipWrapper';
import { SimpleInput } from '../../../UtilComponents/Form/SimpleInput/SimpleInput';
import Loadsheet from './Loadsheet/a21nlrwv071.json';
import Card from '../../../UtilComponents/Card/Card';
import { SelectGroup, SelectItem } from '../../../UtilComponents/Form/Select';
import { SeatMapWidget } from './Seating/SeatMapWidget';
import { isSimbriefDataLoaded } from '../../../Store/features/simBrief';
import { PromptModal, useModals } from '../../../UtilComponents/Modals/Modals';
import { useAppSelector } from '../../../Store/store';

export const Payload = () => {
    const { usingMetric } = Units;
    const { showModal } = useModals();

    const [aFlags] = useSeatFlags(`L:${Loadsheet.seatMap[0].simVar}`, Loadsheet.seatMap[0].capacity);
    const [bFlags] = useSeatFlags(`L:${Loadsheet.seatMap[1].simVar}`, Loadsheet.seatMap[1].capacity);
    const [cFlags] = useSeatFlags(`L:${Loadsheet.seatMap[2].simVar}`, Loadsheet.seatMap[2].capacity);
    const [dFlags] = useSeatFlags(`L:${Loadsheet.seatMap[3].simVar}`, Loadsheet.seatMap[3].capacity);
    const [eFlags] = useSeatFlags(`L:${Loadsheet.seatMap[4].simVar}`, Loadsheet.seatMap[4].capacity);

    const [aFlagsDesired, setAFlagsDesired] = useSeatFlags(`L:${Loadsheet.seatMap[0].simVar}_DESIRED`, Loadsheet.seatMap[0].capacity);
    const [bFlagsDesired, setBFlagsDesired] = useSeatFlags(`L:${Loadsheet.seatMap[1].simVar}_DESIRED`, Loadsheet.seatMap[1].capacity);
    const [cFlagsDesired, setCFlagsDesired] = useSeatFlags(`L:${Loadsheet.seatMap[2].simVar}_DESIRED`, Loadsheet.seatMap[2].capacity);
    const [dFlagsDesired, setDFlagsDesired] = useSeatFlags(`L:${Loadsheet.seatMap[3].simVar}_DESIRED`, Loadsheet.seatMap[3].capacity);
    const [eFlagsDesired, setEFlagsDesired] = useSeatFlags(`L:${Loadsheet.seatMap[4].simVar}_DESIRED`, Loadsheet.seatMap[4].capacity);

    const activeFlags = useMemo(() => [aFlags, bFlags, cFlags, dFlags, eFlags], [aFlags, bFlags, cFlags, dFlags, eFlags]);
    const desiredFlags = useMemo(() => [aFlagsDesired, bFlagsDesired, cFlagsDesired, dFlagsDesired, eFlagsDesired], [aFlagsDesired, bFlagsDesired, cFlagsDesired, dFlagsDesired, eFlagsDesired]);
    const setDesiredFlags = useMemo(() => [setAFlagsDesired, setBFlagsDesired, setCFlagsDesired, setDFlagsDesired, setEFlagsDesired], []);

    const [fwdBag] = useSimVar(`L:${Loadsheet.cargoMap[0].simVar}`, 'Number', 200);
    const [aftCont] = useSimVar(`L:${Loadsheet.cargoMap[1].simVar}`, 'Number', 200);
    const [aftBag] = useSimVar(`L:${Loadsheet.cargoMap[2].simVar}`, 'Number', 200);
    const [aftBulk] = useSimVar(`L:${Loadsheet.cargoMap[3].simVar}`, 'Number', 200);

    const [fwdBagDesired, setFwdBagDesired] = useSimVar(`L:${Loadsheet.cargoMap[0].simVar}_DESIRED`, 'Number', 200);
    const [aftContDesired, setAftContDesired] = useSimVar(`L:${Loadsheet.cargoMap[1].simVar}_DESIRED`, 'Number', 200);
    const [aftBagDesired, setAftBagDesired] = useSimVar(`L:${Loadsheet.cargoMap[2].simVar}_DESIRED`, 'Number', 200);
    const [aftBulkDesired, setAftBulkDesired] = useSimVar(`L:${Loadsheet.cargoMap[3].simVar}_DESIRED`, 'Number', 200);

    const cargo = useMemo(() => [fwdBag, aftCont, aftBag, aftBulk], [fwdBag, aftCont, aftBag, aftBulk]);
    const cargoDesired = useMemo(() => [fwdBagDesired, aftContDesired, aftBagDesired, aftBulkDesired], [fwdBagDesired, aftContDesired, aftBagDesired, aftBulkDesired]);
    const setCargoDesired = useMemo(() => [setFwdBagDesired, setAftContDesired, setAftBagDesired, setAftBulkDesired], []);

    const massUnitForDisplay = usingMetric ? 'KGS' : 'LBS';

    const simbriefDataLoaded = isSimbriefDataLoaded();
    const [boardingStarted, setBoardingStarted] = useSimVar('L:A32NX_BOARDING_STARTED_BY_USR', 'Bool', 200);
    const [boardingRate, setBoardingRate] = usePersistentProperty('CONFIG_BOARDING_RATE', 'REAL');
    const [paxWeight, setPaxWeight] = useSimVar('L:A32NX_WB_PER_PAX_WEIGHT', 'Kilograms', 200);
    const [paxBagWeight, setPaxBagWeight] = useSimVar('L:A32NX_WB_PER_BAG_WEIGHT', 'Kilograms', 200);
    const [galToKg] = useSimVar('FUEL WEIGHT PER GALLON', 'Kilograms', 2_000);
    // const [destEfob] = useSimVar('L:A32NX_DESTINATION_FUEL_ON_BOARD', 'Kilograms', 5_000);

    const [emptyWeight] = useSimVar('A:EMPTY WEIGHT', 'Kilograms', 2_000);

    const [stationSize, setStationLen] = useState<number[]>([]);
    const maxPax = useMemo(() => ((stationSize && stationSize.length > 0) ? stationSize.reduce((a, b) => a + b) : -1), [stationSize]);

    // Calculate Total Pax from Pax Flags
    const totalPax = useMemo(() => {
        let p = 0;
        activeFlags.forEach((flag) => {
            p += flag.getTotalFilledSeats();
        });
        return p;
    }, [...activeFlags]);

    const totalPaxDesired = useMemo(() => {
        let p = 0;
        desiredFlags.forEach((flag) => {
            p += flag.getTotalFilledSeats();
        });
        return p;
    }, [...desiredFlags]);

    const totalCargoDesired = useMemo(() => ((cargoDesired && cargoDesired.length > 0) ? cargoDesired.reduce((a, b) => a + b) : -1), [...cargoDesired]);

    const [cargoStationWeights, setCargoStationWeight] = useState<number[]>([]);

    const totalCargo = useMemo(() => ((cargo && cargo.length > 0) ? cargo.reduce((a, b) => a + b) : -1), [...cargo]);
    const maxCargo = useMemo(() => ((cargoStationWeights && cargoStationWeights.length > 0) ? cargoStationWeights.reduce((a, b) => a + b) : -1), [cargoStationWeights]);

    const [centerCurrent] = useSimVar('FUEL TANK CENTER QUANTITY', 'Gallons', 7_000);
    const [LInnCurrent] = useSimVar('FUEL TANK LEFT MAIN QUANTITY', 'Gallons', 7_000);
    const [LOutCurrent] = useSimVar('FUEL TANK LEFT AUX QUANTITY', 'Gallons', 7_000);
    const [RInnCurrent] = useSimVar('FUEL TANK RIGHT MAIN QUANTITY', 'Gallons', 7_000);
    const [ROutCurrent] = useSimVar('FUEL TANK RIGHT AUX QUANTITY', 'Gallons', 7_000);
    const [act1Current] = useSimVar('FUELSYSTEM TANK QUANTITY:6', 'Gallons', 7_000 );
    const [act2Current] = useSimVar('FUELSYSTEM TANK QUANTITY:7', 'Gallons', 7_000 );

    const fuel = [centerCurrent, LInnCurrent, LOutCurrent, RInnCurrent, ROutCurrent, act1Current, act2Current];

    // Units
    // Weight/CG
    // TODO FIXME: Move all ZFW and GW calculations to rust - Will be refactored in phase 2
    const [zfw, setZfw] = useState(0);
    const [zfwCg, setZfwCg] = useState(0);
    // FIXME boarding refactor phase 2
    const [zfwDesired, setZfwDesired] = useSimVar('L:A32NX_AIRFRAME_ZFW_DESIRED', 'number', 200);
    // FIXME boarding refactor phase 2
    const [zfwDesiredCg, setZfwDesiredCg] = useSimVar('L:A32NX_AIRFRAME_ZFW_CG_PERCENT_MAC_DESIRED', 'number', 200);
    const [gw, setGw] = useState(emptyWeight);
    const [gwDesired, setGwDesired] = useState(emptyWeight);
    const [cg, setCg] = useState(25);
    const [totalDesiredWeight, setTotalDesiredWeight] = useState(0);
    const [desiredCg, setDesiredCg] = useState(0);
    const [mlw, setMlw] = useState(0);
    const [mlwCg, setMlwCg] = useState(0);
    const [mlwDesired, setMlwDesired] = useState(0);
    const [mlwDesiredCg, setMlwDesiredCg] = useState(0);

    const [seatMap] = useState<PaxStationInfo[]>(Loadsheet.seatMap);
    const [cargoMap] = useState<CargoStationInfo[]>(Loadsheet.cargoMap);

    const totalCurrentGallon = useMemo(() => round(Math.max(LInnCurrent + LOutCurrent + RInnCurrent + ROutCurrent + centerCurrent, 0)), [fuel]);

    const [showSimbriefButton, setShowSimbriefButton] = useState(false);
    const simbriefUnits = useAppSelector((state) => state.simbrief.data.units);
    const simbriefBagWeight = parseInt(useAppSelector((state) => state.simbrief.data.weights.bagWeight));
    const simbriefPaxWeight = parseInt(useAppSelector((state) => state.simbrief.data.weights.passengerWeight));
    const simbriefPax = parseInt(useAppSelector((state) => state.simbrief.data.weights.passengerCount));
    const simbriefBag = parseInt(useAppSelector((state) => state.simbrief.data.weights.bagCount));
    const simbriefFreight = parseInt(useAppSelector((state) => state.simbrief.data.weights.freight));

    const [displayZfw, setDisplayZfw] = useState(true);

    // GSX
    const [gsxPayloadSyncEnabled] = usePersistentNumberProperty('GSX_PAYLOAD_SYNC', 0);
    const [_, setGsxNumPassengers] = useSimVar('L:FSDT_GSX_NUMPASSENGERS', 'Number');
    const [gsxBoardingState] = useSimVar('L:FSDT_GSX_BOARDING_STATE', 'Number');
    const [gsxDeBoardingState] = useSimVar('L:FSDT_GSX_DEBOARDING_STATE', 'Number');
    const gsxStates = {
        AVAILABLE: 1,
        NOT_AVAILABLE: 2,
        BYPASSED: 3,
        REQUESTED: 4,
        PERFORMING: 5,
        COMPLETED: 6,
    };

    const setSimBriefValues = () => {
        if (simbriefUnits === 'kgs') {
            setPaxBagWeight(simbriefBagWeight);
            setPaxWeight(simbriefPaxWeight);
            setTargetPax(simbriefPax > maxPax ? maxPax : simbriefPax);
            setTargetCargo(simbriefBag, simbriefFreight, simbriefBagWeight);
        } else {
            setPaxBagWeight(Units.poundToKilogram(simbriefBagWeight));
            setPaxWeight(Units.poundToKilogram(simbriefPaxWeight));
            setTargetPax(simbriefPax);
            setTargetCargo(simbriefBag, Units.poundToKilogram(simbriefFreight), Units.poundToKilogram(simbriefBagWeight));
        }
    };

    const [busDC2] = useSimVar('L:A32NX_ELEC_DC_2_BUS_IS_POWERED', 'Bool', 2_000);
    const [busDCHot1] = useSimVar('L:A32NX_ELEC_DC_HOT_1_BUS_IS_POWERED', 'Bool', 2_000);
    const [simGroundSpeed] = useSimVar('GPS GROUND SPEED', 'knots', 2_000);
    const [isOnGround] = useSimVar('SIM ON GROUND', 'Bool', 2_000);
    const [eng1Running] = useSimVar('ENG COMBUSTION:1', 'Bool', 2_000);
    const [eng2Running] = useSimVar('ENG COMBUSTION:2', 'Bool', 2_000);
    const [coldAndDark, setColdAndDark] = useState<boolean>(true);

    const chooseDesiredSeats = useCallback((stationIndex: number, fillSeats: boolean = true, numChoose: number) => {
        const seatFlags: SeatFlags = desiredFlags[stationIndex];
        if (fillSeats) {
            seatFlags.fillEmptySeats(numChoose);
        } else {
            seatFlags.emptyFilledSeats(numChoose);
        }

        setDesiredFlags[stationIndex](seatFlags);
    }, [...desiredFlags]);

    const setTargetPax = useCallback((numOfPax: number) => {
        setGsxNumPassengers(numOfPax);

        if (!stationSize || numOfPax === totalPaxDesired || numOfPax > maxPax || numOfPax < 0) return;

        let paxRemaining = numOfPax;

        const fillStation = (stationIndex: number, percent: number, paxToFill: number) => {
            const sFlags: SeatFlags = desiredFlags[stationIndex];
            const toBeFilled = Math.min(Math.trunc(percent * paxToFill), stationSize[stationIndex]);

            paxRemaining -= toBeFilled;

            const planSeatedPax = sFlags.getTotalFilledSeats();
            chooseDesiredSeats(
                stationIndex,
                (toBeFilled > planSeatedPax),
                Math.abs(toBeFilled - planSeatedPax),
            );
        };

        for (let i = seatMap.length - 1; i > 0; i--) {
            fillStation(i, seatMap[i].fill, numOfPax);
        }
        fillStation(0, 1, paxRemaining);
    }, [maxPax, ...stationSize, ...seatMap, totalPaxDesired]);

    const setTargetCargo = useCallback((numberOfPax: number, freight: number, perBagWeight: number = paxBagWeight) => {
        const bagWeight = numberOfPax * perBagWeight;
        const loadableCargoWeight = Math.min(bagWeight + Math.round(freight), maxCargo);

        let remainingWeight = loadableCargoWeight;

        async function fillCargo(station: number, percent: number, loadableCargoWeight: number) {
            const c = Math.round(percent * loadableCargoWeight);
            remainingWeight -= c;
            setCargoDesired[station](c);
        }

        for (let i = cargoDesired.length - 1; i > 0; i--) {
            fillCargo(i, cargoStationWeights[i] / maxCargo, loadableCargoWeight);
        }
        fillCargo(0, 1, remainingWeight);
    }, [maxCargo, ...cargoStationWeights, ...cargoMap, ...cargoDesired, paxBagWeight]);

    const calculatePaxMoment = useCallback(() => {
        let paxMoment = 0;
        activeFlags.forEach((stationFlag, i) => {
            paxMoment += stationFlag.getTotalFilledSeats() * paxWeight * seatMap[i].position;
        });
        return paxMoment;
    }, [paxWeight, seatMap, ...activeFlags]);

    const calculatePaxDesiredMoment = useCallback(() => {
        let paxMoment = 0;
        desiredFlags.forEach((stationFlag, i) => {
            paxMoment += stationFlag.getTotalFilledSeats() * paxWeight * seatMap[i].position;
        });

        return paxMoment;
    }, [paxWeight, seatMap, ...desiredFlags]);

    const calculateCargoMoment = useCallback(() => {
        let cargoMoment = 0;
        cargo.forEach((station, i) => {
            cargoMoment += station * cargoMap[i].position;
        });
        return cargoMoment;
    }, [...cargo, cargoMap]);

    const calculateCargoDesiredMoment = useCallback(() => {
        let cargoMoment = 0;
        cargoDesired.forEach((station, i) => {
            cargoMoment += station * cargoMap[i].position;
        });
        return cargoMoment;
    }, [...cargoDesired, cargoMap]);

    const calculateCg = useCallback((mass: number, moment: number) => -100 * ((moment / mass - Loadsheet.specs.leMacZ) / Loadsheet.specs.macSize), []);

    const processZfw = useCallback((newZfw) => {
        let paxCargoWeight = newZfw - emptyWeight;

        // Load pax first
        const pWeight = paxWeight + paxBagWeight;
        const newPax = Math.min(Math.round(paxCargoWeight / pWeight), maxPax);

        paxCargoWeight -= newPax * pWeight;
        const newCargo = Math.min(paxCargoWeight, maxCargo);

        setTargetPax(newPax);
        setTargetCargo(newPax, newCargo);
    }, [emptyWeight, paxWeight, paxBagWeight, maxPax, maxCargo]);

    const processGw = useCallback((newGw) => {
        const totalFuel = round(totalCurrentGallon * galToKg);
        let paxCargoWeight = newGw - emptyWeight - totalFuel;

        // Load pax first
        const pWeight = paxWeight + paxBagWeight;
        const newPax = Math.min(Math.round(paxCargoWeight / pWeight), maxPax);

        paxCargoWeight -= newPax * pWeight;
        const newCargo = Math.min(paxCargoWeight, maxCargo);

        setTargetPax(newPax);
        setTargetCargo(newPax, newCargo);
    }, [emptyWeight, paxWeight, paxBagWeight, maxPax, maxCargo, totalCurrentGallon]);

    const onClickCargo = useCallback((cargoStation, e) => {
        if (gsxPayloadSyncEnabled === 1 && boardingStarted) {
            return;
        }
        const cargoPercent = Math.min(Math.max(0, e.nativeEvent.offsetX / cargoMap[cargoStation].progressBarWidth), 1);
        setCargoDesired[cargoStation](Math.round(cargoMap[cargoStation].weight * cargoPercent));
    }, [cargoMap]);

    const onClickSeat = useCallback((stationIndex: number, seatId: number) => {
        if (gsxPayloadSyncEnabled === 1 && boardingStarted) {
            return;
        }

        // TODO FIXME: This calculation does not work correctly if user clicks on many seats in rapid succession
        const oldPaxBag = totalPaxDesired * paxBagWeight;
        const freight = Math.max(totalCargoDesired - oldPaxBag, 0);

        const seatFlags: SeatFlags = desiredFlags[stationIndex];
        seatFlags.toggleSeatId(seatId);
        setDesiredFlags[stationIndex](seatFlags);

        let newPaxDesired = 0;
        desiredFlags.forEach((flag) => {
            newPaxDesired += flag.getTotalFilledSeats();
        });

        setTargetCargo(newPaxDesired, freight);
    }, [
        paxBagWeight,
        totalCargoDesired,
        ...cargoDesired,
        ...desiredFlags, ...stationSize,
        totalPaxDesired,
    ]);

    const handleDeboarding = useCallback(() => {
        if (!boardingStarted) {
            showModal(
                <PromptModal
                    title={`${t('Ground.Payload.DeboardConfirmationTitle')}`}
                    bodyText={`${t('Ground.Payload.DeboardConfirmationBody')}`}
                    confirmText={`${t('Ground.Payload.DeboardConfirmationConfirm')}`}
                    cancelText={`${t('Ground.Payload.DeboardConfirmationCancel')}`}
                    onConfirm={() => {
                        setTargetPax(0);
                        setTargetCargo(0, 0);
                        setBoardingStarted(true);
                    }}
                />,
            );
            return;
        }
        setBoardingStarted(false);
    }, [totalPaxDesired, totalPax, totalCargo, boardingStarted, totalCargoDesired]);

    const calculateBoardingTime = useMemo(() => {
        // factors taken from payload.rs TODO: Simvar
        let boardingRateMultiplier = 0;
        if (boardingRate === 'REAL') {
            boardingRateMultiplier = 5;
        } else if (boardingRate === 'FAST') {
            boardingRateMultiplier = 1;
        }

        // factors taken from payload.rs TODO: Simvar
        const cargoWeightPerWeightStep = 60;

        const differentialPax = Math.abs(totalPaxDesired - totalPax);
        const differentialCargo = Math.abs(totalCargoDesired - totalCargo);

        const estimatedPaxBoardingSeconds = differentialPax * boardingRateMultiplier;
        const estimatedCargoLoadingSeconds = (differentialCargo / cargoWeightPerWeightStep) * boardingRateMultiplier;

        return Math.max(estimatedPaxBoardingSeconds, estimatedCargoLoadingSeconds);
    }, [totalPaxDesired, totalPax, totalCargoDesired, totalCargo, boardingRate]);

    const boardingStatusClass = useMemo(() => {
        if (!boardingStarted) {
            return 'text-theme-highlight';
        }
        return (totalPaxDesired * paxWeight + totalCargoDesired) >= (totalPax * paxWeight + totalCargo) ? 'text-green-500' : 'text-yellow-500';
    }, [boardingStarted, paxWeight, totalCargoDesired, totalCargo, totalPaxDesired, totalPax]);

    // Init
    useEffect(() => {
        if (paxWeight === 0) {
            setPaxWeight(Math.round(Loadsheet.specs.pax.defaultPaxWeight));
        }
        if (paxBagWeight === 0) {
            setPaxBagWeight(Math.round(Loadsheet.specs.pax.defaultBagWeight));
        }
    }, []);

    // Set Cold and Dark State
    useEffect(() => {
        if (simGroundSpeed > 0.1 || eng1Running || eng2Running || !isOnGround || (!busDC2 && !busDCHot1)) {
            setColdAndDark(false);
        } else {
            setColdAndDark(true);
        }
    }, [simGroundSpeed, eng1Running, eng2Running, isOnGround, busDC2, busDCHot1]);

    useEffect(() => {
        if (boardingRate !== 'INSTANT') {
            if (!coldAndDark) {
                setBoardingRate('INSTANT');
            }
        }
    }, [coldAndDark, boardingRate]);

    // Init the seating map
    useEffect(() => {
        const stationSize: number[] = [];
        for (let i = 0; i < seatMap.length; i++) {
            stationSize.push(0);
        }
        seatMap.forEach((station, i) => {
            stationSize[i] = station.capacity;
        });
        setStationLen(stationSize);
    }, [seatMap]);

    // Init the cargo map
    useEffect(() => {
        const cargoSize: number[] = [];
        for (let i = 0; i < cargoMap.length; i++) {
            cargoSize.push(0);
        }
        cargoMap.forEach((station, index) => {
            cargoSize[index] = station.weight;
        });
        setCargoStationWeight(cargoSize);
    }, [cargoMap]);

    useEffect(() => {
        if (gsxPayloadSyncEnabled === 1) {
            switch (gsxBoardingState) {
            // If boarding has been requested, performed or completed
            case gsxStates.REQUESTED:
            case gsxStates.PERFORMING:
            case gsxStates.COMPLETED:
                setBoardingStarted(true);
                break;
            default:
                break;
            }
        }
    }, [gsxBoardingState]);

    useEffect(() => {
        if (gsxPayloadSyncEnabled === 1) {
            switch (gsxDeBoardingState) {
            case gsxStates.REQUESTED:
                // If Deboarding has been requested, set target pax to 0 for boarding backend
                setTargetPax(0);
                setTargetCargo(0, 0);
                setBoardingStarted(true);
                break;
            case gsxStates.PERFORMING:
                // If deboarding is being performed
                setBoardingStarted(true);
                break;
            case gsxStates.COMPLETED:
                // If deboarding is completed
                setBoardingStarted(false);
                break;
            default:
                break;
            }
        }
    }, [gsxDeBoardingState]);

    useEffect(() => {
        let simbriefStatus = false;
        if (simbriefUnits === 'kgs') {
            simbriefStatus = (simbriefDataLoaded
                && (
                    simbriefPax !== totalPaxDesired
                    || Math.abs(simbriefFreight + simbriefBag * simbriefBagWeight - totalCargoDesired) > 3.0
                    || Math.abs(simbriefPaxWeight - paxWeight) > 3.0
                    || Math.abs(simbriefBagWeight - paxBagWeight) > 3.0
                )
            );
        } else {
            simbriefStatus = (simbriefDataLoaded
                && (
                    simbriefPax !== totalPaxDesired
                    || Math.abs(Units.poundToKilogram(simbriefFreight + simbriefBag * simbriefBagWeight) - totalCargoDesired) > 3.0
                    || Math.abs(Units.poundToKilogram(simbriefPaxWeight) - paxWeight) > 3.0
                    || Math.abs(Units.poundToKilogram(simbriefBagWeight) - paxBagWeight) > 3.0
                )
            );
        }

        if (gsxPayloadSyncEnabled === 1) {
            if (boardingStarted) {
                setShowSimbriefButton(false);
                return;
            }

            setShowSimbriefButton(simbriefStatus);
            return;
        }
        setShowSimbriefButton(simbriefStatus);
    }, [
        simbriefUnits,
        simbriefFreight,
        simbriefBag,
        simbriefBagWeight,
        paxWeight, paxBagWeight,
        totalPaxDesired, totalCargoDesired,
        simbriefDataLoaded,
        boardingStarted,
        gsxPayloadSyncEnabled,
    ]);

    useEffect(() => {
        // TODO FIXME: Move all this logic into rust
        // Note: Looks messy after phase 1 refactor, will be fixed by deprecating this and moving all calculations into rust
        const centerTankMoment = -20.53;
        const innerTankMoment = -20.73;
        const outerTankMoment = -16.9;
        const act1TankMoment = -18.53;
        const act2TankMoment = -22.53;
        // Adjust ZFW CG Values based on payload
        const newZfw = emptyWeight + totalPax * paxWeight + totalCargo;
        const newZfwDesired = emptyWeight + totalPaxDesired * paxWeight + totalCargoDesired;
        const newZfwMoment = Loadsheet.specs.emptyPosition * emptyWeight + calculatePaxMoment() + calculateCargoMoment();
        const newZfwDesiredMoment = Loadsheet.specs.emptyPosition * emptyWeight + calculatePaxDesiredMoment() + calculateCargoDesiredMoment();
        const newZfwCg = calculateCg(newZfw, newZfwMoment);
        const newZfwDesiredCg = calculateCg(newZfwDesired, newZfwDesiredMoment);
        const totalFuel = round(totalCurrentGallon * galToKg);

        const totalFuelMoment = centerCurrent * galToKg * centerTankMoment + (LOutCurrent + ROutCurrent) * galToKg * outerTankMoment + (LInnCurrent + RInnCurrent) * galToKg * innerTankMoment + act1Current * galToKg * act1TankMoment + act2Current * galToKg * act2TankMoment;
        const newGw = newZfw + totalFuel;
        const newGwDesired = newZfwDesired + totalFuel;
        const newTotalMoment = newZfwMoment + totalFuelMoment;
        const newCg = calculateCg(newGw, newTotalMoment);

        const newTotalWeightDesired = newZfwDesired + totalFuel;
        const newTotalDesiredMoment = newZfwDesiredMoment + totalFuelMoment;
        const newDesiredCg = calculateCg(newTotalWeightDesired, newTotalDesiredMoment);

        setZfw(newZfw);
        setZfwCg(newZfwCg);
        setZfwDesired(newZfwDesired);
        setZfwDesiredCg(newZfwDesiredCg);
        setGw(newGw);
        setGwDesired(newGwDesired);
        setCg(newCg);
        setTotalDesiredWeight(newTotalWeightDesired);
        setDesiredCg(newDesiredCg);
        // TODO: Predicted MLDW
        setMlw(newGw);
        setMlwCg(newCg);
        setMlwDesired(newTotalWeightDesired);
        setMlwDesiredCg(newDesiredCg);
    }, [
        ...desiredFlags, ...activeFlags,
        ...cargo, ...cargoDesired,
        ...fuel,
        paxWeight, paxBagWeight,
        emptyWeight,
    ]);

    const remainingTimeString = () => {
        const minutes = Math.round(calculateBoardingTime / 60);
        const seconds = calculateBoardingTime % 60;
        const padding = seconds < 10 ? '0' : '';
        return `${minutes}:${padding}${seconds.toFixed(0)} ${t('Ground.Payload.EstimatedDurationUnit')}`;
    };

    return (
        <div>
            <div className="relative h-content-section-reduced">
                <div className="mb-10">
                    <SeatMapWidget seatMap={seatMap} desiredFlags={desiredFlags} activeFlags={activeFlags} onClickSeat={onClickSeat} canvasX={243} canvasY={78} />
                </div>
                <CargoWidget cargo={cargo} cargoDesired={cargoDesired} cargoMap={cargoMap} cargoStationSize={cargoStationWeights} onClickCargo={onClickCargo} />

                <div className="flex relative right-0 flex-row justify-between px-4 mt-16">
                    <div className="flex flex-col flex-grow pr-24">
                        <div className="flex flex-row w-full">
                            <Card className="w-full col-1" childrenContainerClassName={`w-full ${simbriefDataLoaded ? 'rounded-r-none' : ''}`}>
                                <table className="w-full table-fixed">
                                    <thead className="px-8 mx-2 w-full border-b">
                                        <tr className="py-2">
                                            <th scope="col" className="py-2 px-4 w-2/5 font-medium text-left text-md">
                                                {' '}
                                            </th>
                                            <th scope="col" className="py-2 px-4 w-1/2 font-medium text-left text-md">
                                                {t('Ground.Payload.Planned')}
                                            </th>
                                            <th scope="col" className="py-2 px-4 w-1/4 font-medium text-left text-md">
                                                {t('Ground.Payload.Current')}
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr className="h-2" />
                                        <tr>
                                            <td className="px-4 font-light whitespace-nowrap text-md">
                                                {t('Ground.Payload.Passengers')}
                                            </td>
                                            <td className="mx-8">
                                                <TooltipWrapper text={`${t('Ground.Payload.TT.MaxPassengers')} ${maxPax}`}>
                                                    <div className={`px-4 font-light whitespace-nowrap text-md ${(gsxPayloadSyncEnabled === 1 && boardingStarted) ? 'pointer-events-none' : ''}`}>
                                                        <PayloadValueInput
                                                            min={0}
                                                            max={maxPax > 0 ? maxPax : 999}
                                                            value={totalPaxDesired}
                                                            onBlur={(x) => {
                                                                if (!Number.isNaN(parseInt(x) || parseInt(x) === 0)) {
                                                                    setTargetPax(parseInt(x));
                                                                    setTargetCargo(parseInt(x), 0);
                                                                }
                                                            }}
                                                            unit="PAX"
                                                            disabled={gsxPayloadSyncEnabled === 1 && boardingStarted}
                                                        />
                                                    </div>
                                                </TooltipWrapper>
                                            </td>
                                            <td className="px-4 w-20 font-mono font-light whitespace-nowrap text-md">
                                                <PayloadValueUnitDisplay value={totalPax} padTo={3} unit="PAX" />
                                            </td>
                                        </tr>

                                        <tr>
                                            <td className="px-4 font-light whitespace-nowrap text-md">
                                                {t('Ground.Payload.Cargo')}
                                            </td>
                                            <td>
                                                <TooltipWrapper text={`${t('Ground.Payload.TT.MaxCargo')} ${Units.kilogramToUser(maxCargo).toFixed(0)} ${massUnitForDisplay}`}>
                                                    <div className={`px-4 font-light whitespace-nowrap text-md ${(gsxPayloadSyncEnabled === 1 && boardingStarted) ? 'pointer-events-none' : ''}`}>
                                                        <PayloadValueInput
                                                            min={0}
                                                            max={maxCargo > 0 ? Math.round(Units.kilogramToUser(maxCargo)) : 99999}
                                                            value={Units.kilogramToUser(totalCargoDesired)}
                                                            onBlur={(x) => {
                                                                if (!Number.isNaN(parseInt(x)) || parseInt(x) === 0) {
                                                                    setTargetCargo(0, Units.userToKilogram(parseInt(x)));
                                                                }
                                                            }}
                                                            unit={massUnitForDisplay}
                                                            disabled={gsxPayloadSyncEnabled === 1 && boardingStarted}
                                                        />
                                                    </div>
                                                </TooltipWrapper>
                                            </td>
                                            <td className="px-4 w-20 font-mono font-light whitespace-nowrap text-md">
                                                <PayloadValueUnitDisplay value={Units.kilogramToUser(totalCargo)} padTo={5} unit={massUnitForDisplay} />
                                            </td>
                                        </tr>

                                        <tr>
                                            <td className="px-4 font-light whitespace-nowrap text-md">
                                                {displayZfw ? t('Ground.Payload.ZFW') : t('Ground.Payload.GW')}
                                            </td>
                                            <td>
                                                {(displayZfw
                                                    ? (
                                                        <TooltipWrapper text={`${t('Ground.Payload.TT.MaxZFW')} ${Units.kilogramToUser(Loadsheet.specs.weights.maxZfw).toFixed(0)} ${massUnitForDisplay}`}>
                                                            <div className={`px-4 font-light whitespace-nowrap text-md ${(gsxPayloadSyncEnabled === 1 && boardingStarted) ? 'pointer-events-none' : ''}`}>
                                                                <PayloadValueInput
                                                                    min={Math.round(Units.kilogramToUser(emptyWeight))}
                                                                    max={Math.round(Units.kilogramToUser(Loadsheet.specs.weights.maxZfw))}
                                                                    value={Units.kilogramToUser(zfwDesired)}
                                                                    onBlur={(x) => {
                                                                        if (!Number.isNaN(parseInt(x)) || parseInt(x) === 0) processZfw(Units.userToKilogram(parseInt(x)));
                                                                    }}
                                                                    unit={massUnitForDisplay}
                                                                    disabled={gsxPayloadSyncEnabled === 1 && boardingStarted}
                                                                />
                                                            </div>
                                                        </TooltipWrapper>
                                                    )
                                                    : (
                                                        <TooltipWrapper text={`${t('Ground.Payload.TT.MaxGW')} ${Units.kilogramToUser(Loadsheet.specs.weights.maxGw).toFixed(0)} ${massUnitForDisplay}`}>
                                                            <div className={`px-4 font-light whitespace-nowrap text-md ${(gsxPayloadSyncEnabled === 1 && boardingStarted) ? 'pointer-events-none' : ''}`}>
                                                                <PayloadValueInput
                                                                    min={Math.round(Units.kilogramToUser(emptyWeight))}
                                                                    max={Math.round(Units.kilogramToUser(Loadsheet.specs.weights.maxGw))}
                                                                    value={Units.kilogramToUser(gwDesired)}
                                                                    onBlur={(x) => {
                                                                        if (!Number.isNaN(parseInt(x)) || parseInt(x) === 0) processGw(Units.userToKilogram(parseInt(x)));
                                                                    }}
                                                                    unit={massUnitForDisplay}
                                                                    disabled={gsxPayloadSyncEnabled === 1 && boardingStarted}
                                                                />
                                                            </div>
                                                        </TooltipWrapper>
                                                    )
                                                )}
                                            </td>
                                            <td className="px-4 w-20 font-mono whitespace-nowrap text-md">
                                                <PayloadValueUnitDisplay
                                                    value={displayZfw ? Units.kilogramToUser(zfw) : Units.kilogramToUser(gw)}
                                                    padTo={5}
                                                    unit={massUnitForDisplay}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 font-light whitespace-nowrap text-md">
                                                <div className="flex relative flex-row justify-start items-center">
                                                    <div>
                                                        {t(displayZfw ? 'Ground.Payload.ZFWCG' : 'Ground.Payload.GWCG')}
                                                    </div>
                                                    <div className="ml-auto">
                                                        <button
                                                            type="button"
                                                            className={`flex justify-center rounded-lg items-center ml-auto w-12 h-8
                                                                text-theme-highlight bg-current`}
                                                            onClick={() => setDisplayZfw(!displayZfw)}
                                                        >
                                                            <div className="text-theme-body">
                                                                <Shuffle size={24} />
                                                            </div>
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <TooltipWrapper text={displayZfw ? `${t('Ground.Payload.TT.MaxZFWCG')} ${Loadsheet.specs.weights.maxZfwCg}%` : `${t('Ground.Payload.TT.MaxGWCG')} ${Loadsheet.specs.weights.maxGwCg}%`}>
                                                    <div className="px-4 font-mono whitespace-nowrap text-md">
                                                        {/* TODO FIXME: Setting pax/cargo given desired ZFWCG, ZFW, total pax, total cargo */}
                                                        <div className="py-4 px-3 rounded-md transition">
                                                            <PayloadPercentUnitDisplay value={displayZfw ? zfwDesiredCg : desiredCg} />
                                                        </div>
                                                        {/*
                                                            <SimpleInput
                                                                className="my-2 w-24"
                                                                number
                                                                disabled
                                                                min={0}
                                                                max={maxPax > 0 ? maxPax : 999}
                                                                value={zfwCg.toFixed(2)}
                                                                onBlur={{(x) => processZfwCg(x)}
                                                            />
                                                        */}
                                                    </div>
                                                </TooltipWrapper>
                                            </td>
                                            <td className="px-4 font-mono whitespace-nowrap text-md">
                                                <PayloadPercentUnitDisplay value={displayZfw ? zfwCg : cg} />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <hr className="mb-4 border-gray-700" />

                                <div className="flex flex-row justify-start items-center">
                                    <TooltipWrapper text={t('Ground.Payload.TT.PerPaxWeight')}>
                                        <div className={`flex relative flex-row items-center font-light text-medium ${(gsxPayloadSyncEnabled === 1 && boardingStarted) ? 'pointer-events-none' : ''}`}>
                                            <PersonFill size={25} className="mx-3" />
                                            <SimpleInput
                                                className={`w-24 ${(gsxPayloadSyncEnabled === 1 && boardingStarted) ? 'cursor-not-allowed placeholder-theme-body text-theme-body' : ''}`}
                                                number
                                                min={Math.round(Loadsheet.specs.pax.minPaxWeight)}
                                                max={Math.round(Loadsheet.specs.pax.maxPaxWeight)}
                                                placeholder={Math.round(Loadsheet.specs.pax.defaultPaxWeight).toString()}
                                                value={Units.kilogramToUser(paxWeight).toFixed(0)}
                                                onBlur={(x) => {
                                                    if (!Number.isNaN(parseInt(x)) || parseInt(x) === 0) setPaxWeight(Units.userToKilogram(parseInt(x)));
                                                }}
                                            />
                                            <div className="absolute top-2 right-3 text-lg text-gray-400">{massUnitForDisplay}</div>
                                        </div>
                                    </TooltipWrapper>

                                    <TooltipWrapper text={t('Ground.Payload.TT.PerPaxBagWeight')}>
                                        <div className={`flex relative flex-row items-center font-light text-medium ${(gsxPayloadSyncEnabled === 1 && boardingStarted) ? 'pointer-events-none' : ''}`}>
                                            <BriefcaseFill size={25} className="mx-3" />
                                            <SimpleInput
                                                className={`w-24 ${(gsxPayloadSyncEnabled === 1 && boardingStarted) ? 'cursor-not-allowed placeholder-theme-body text-theme-body' : ''}`}
                                                number
                                                min={Math.round(Loadsheet.specs.pax.minBagWeight)}
                                                max={Math.round(Loadsheet.specs.pax.maxBagWeight)}
                                                placeholder={Math.round(Loadsheet.specs.pax.defaultBagWeight).toString()}
                                                value={Units.kilogramToUser(paxBagWeight).toFixed(0)}
                                                onBlur={(x) => {
                                                    if (!Number.isNaN(parseInt(x)) || parseInt(x) === 0) setPaxBagWeight(Units.userToKilogram(parseInt(x)));
                                                }}
                                            />
                                            <div className="absolute top-2 right-3 text-lg text-gray-400">{massUnitForDisplay}</div>
                                        </div>
                                    </TooltipWrapper>
                                    {gsxPayloadSyncEnabled !== 1 && (
                                        <>
                                            <TooltipWrapper text={t('Ground.Payload.TT.StartBoarding')}>
                                                <button
                                                    type="button"
                                                    className={`flex justify-center rounded-lg items-center ml-auto w-24 h-12
                                                        ${boardingStatusClass} bg-current`}
                                                    onClick={() => setBoardingStarted(!boardingStarted)}
                                                >
                                                    <div className="text-theme-body">
                                                        <ArrowLeftRight size={32} className={boardingStarted ? 'hidden' : ''} />
                                                        <StopCircleFill size={32} className={boardingStarted ? '' : 'hidden'} />
                                                    </div>
                                                </button>
                                            </TooltipWrapper>

                                            <TooltipWrapper text={t('Ground.Payload.TT.StartDeboarding')}>
                                                <button
                                                    type="button"
                                                    className={`flex justify-center items-center ml-1 w-16 h-12 text-theme-highlight bg-current rounded-lg
                                                        ${totalPax === 0 && totalCargo === 0 && 'opacity-20 pointer-events-none'}`}
                                                    onClick={() => handleDeboarding()}
                                                >
                                                    <div className="text-theme-body">
                                                        {' '}
                                                        <BoxArrowRight size={32} className={`${boardingStarted && 'opacity-20 pointer-events-none'} : ''}`} />
                                                    </div>
                                                </button>
                                            </TooltipWrapper>
                                        </>
                                    )}
                                </div>
                            </Card>

                            {showSimbriefButton
                                && (
                                    <TooltipWrapper text={t('Ground.Payload.TT.FillPayloadFromSimbrief')}>
                                        <div
                                            className={`flex justify-center items-center px-2 h-auto text-theme-body
                                                       hover:text-theme-highlight bg-theme-highlight hover:bg-theme-body
                                                       rounded-md rounded-l-none border-2 border-theme-highlight transition duration-100`}
                                            onClick={setSimBriefValues}
                                        >
                                            <CloudArrowDown size={26} />
                                        </div>
                                    </TooltipWrapper>
                                )}
                        </div>
                        {(gsxPayloadSyncEnabled !== 1) && (
                            <div className="flex flex-row mt-4">
                                <Card className="w-full h-full" childrenContainerClassName="flex flex-col w-full h-full">
                                    <div className="flex flex-row justify-between items-center">
                                        <div className="flex font-medium">
                                            {t('Ground.Payload.BoardingTime')}
                                            <span className="flex relative flex-row items-center ml-2 text-sm font-light">
                                                (
                                                {remainingTimeString()}
                                                )
                                            </span>
                                        </div>

                                        <SelectGroup>
                                            <SelectItem
                                                selected={boardingRate === 'INSTANT'}
                                                onSelect={() => setBoardingRate('INSTANT')}
                                            >
                                                {t('Settings.Instant')}
                                            </SelectItem>

                                            <TooltipWrapper text={`${!coldAndDark ? t('Ground.Fuel.TT.AircraftMustBeColdAndDarkToChangeRefuelTimes') : ''}`}>
                                                <div>
                                                    <SelectItem
                                                        className={`${!coldAndDark && 'opacity-20'}`}
                                                        selected={boardingRate === 'FAST'}
                                                        disabled={!coldAndDark}
                                                        onSelect={() => setBoardingRate('FAST')}
                                                    >
                                                        {t('Settings.Fast')}
                                                    </SelectItem>
                                                </div>
                                            </TooltipWrapper>

                                            <div>
                                                <SelectItem
                                                    className={`${!coldAndDark && 'opacity-20'}`}
                                                    selected={boardingRate === 'REAL'}
                                                    disabled={!coldAndDark}
                                                    onSelect={() => setBoardingRate('REAL')}
                                                >
                                                    {t('Settings.Real')}
                                                </SelectItem>
                                            </div>
                                        </SelectGroup>
                                    </div>
                                </Card>

                                {/* <Card className="h-full w-fit" childrenContainerClassName="h-full w-fit rounded-r-none"> */}
                                {/* */}
                                {/* </Card> */}
                            </div>
                        )}
                        {gsxPayloadSyncEnabled === 1 && (
                            <div className="pt-6 pl-2">
                                {t('Ground.Payload.GSXPayloadSyncEnabled')}
                            </div>
                        )}
                    </div>
                    <div className="border border-theme-accent col-1">
                        <ChartWidget
                            width={525}
                            height={511}
                            envelope={Loadsheet.chart.performanceEnvelope}
                            limits={Loadsheet.chart.chartLimits}
                            cg={boardingStarted ? Math.round(cg * 100) / 100 : Math.round(desiredCg * 100) / 100}
                            gw={boardingStarted ? Math.round(gw) : Math.round(totalDesiredWeight)}
                            mldwCg={boardingStarted ? Math.round(mlwCg * 100) / 100 : Math.round(mlwDesiredCg * 100) / 100}
                            mldw={boardingStarted ? Math.round(mlw) : Math.round(mlwDesired)}
                            zfwCg={boardingStarted ? Math.round(zfwCg * 100) / 100 : Math.round(zfwDesiredCg * 100) / 100}
                            zfw={boardingStarted ? Math.round(zfw) : Math.round(zfwDesired)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

interface PayloadValueInputProps {
    min: number,
    max: number,
    value: number
    onBlur: (v: string) => void,
    unit: string,
    disabled?: boolean
}

const PayloadValueInput: FC<PayloadValueInputProps> = ({ min, max, value, onBlur, unit, disabled }) => (
    <div className="relative w-44">
        <SimpleInput
            className={`my-2 w-full font-mono ${(disabled ? 'cursor-not-allowed placeholder-theme-body text-theme-body' : '')}`}
            fontSizeClassName="text-2xl"
            number
            min={min}
            max={max}
            value={value.toFixed(0)}
            onBlur={onBlur}
        />
        <div className="flex absolute top-0 right-3 items-center h-full font-mono text-2xl text-gray-400">{unit}</div>
    </div>
);

interface NumberUnitDisplayProps {
    /**
     * The value to show
     */
    value: number,

    /**
     * The amount of leading zeroes to pad with
     */
    padTo: number,

    /**
     * The unit to show at the end
     */
    unit: string,
}

const PayloadValueUnitDisplay: FC<NumberUnitDisplayProps> = ({ value, padTo, unit }) => {
    const fixedValue = value.toFixed(0);
    const leadingZeroCount = Math.max(0, padTo - fixedValue.length);

    return (
        <span className="flex items-center">
            <span className="flex justify-end pr-2 w-20 text-2xl">
                <span className="text-2xl text-gray-400">{'0'.repeat(leadingZeroCount)}</span>
                {fixedValue}
            </span>
            {' '}
            <span className="text-2xl text-gray-500">{unit}</span>
        </span>
    );
};

const PayloadPercentUnitDisplay: FC<{value: number}> = ({ value }) => {
    const fixedValue = value.toFixed(2);

    return (
        <span className="flex items-center">
            <span className="flex justify-end pr-2 w-20 text-2xl">
                {fixedValue}
            </span>
            {' '}
            <span className="text-2xl text-gray-500">%</span>
        </span>
    );
};
