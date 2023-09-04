// Copyright (c) 2021-2023 FlyByWire Simulations
//
// SPDX-License-Identifier: GPL-3.0

/* eslint-disable max-len */
import React, { useState } from 'react';
import { Units, usePersistentProperty, useSimVar } from '@flybywiresim/fbw-sdk';
import { getAirframeType } from '../../../Efb';
import { A320CFMPayload } from './A320_214/A320Payload';
import { A320CFMSLPayload } from './A320_214_SL/A320Payload';
import { A320IAEPayload } from './A320_232/A320Payload';
import { A320IAESLPayload } from './A320_232_SL/A320Payload';
import { useAppSelector } from '../../../Store/store';
import { isSimbriefDataLoaded } from '../../../Store/features/simBrief';

export const Payload = () => {
    const simbriefUnits = useAppSelector((state) => state.simbrief.data.units);
    const simbriefBagWeight = parseInt(useAppSelector((state) => state.simbrief.data.weights.bagWeight));
    const simbriefPaxWeight = parseInt(useAppSelector((state) => state.simbrief.data.weights.passengerWeight));
    const simbriefPax = parseInt(useAppSelector((state) => state.simbrief.data.weights.passengerCount));
    const simbriefBag = parseInt(useAppSelector((state) => state.simbrief.data.weights.bagCount));
    const simbriefFreight = parseInt(useAppSelector((state) => state.simbrief.data.weights.freight));

    const [isOnGround] = useSimVar('SIM ON GROUND', 'Bool', 8_059);
    const [boardingStarted, setBoardingStarted] = useSimVar('L:A32NX_BOARDING_STARTED_BY_USR', 'Bool', 509);
    const [boardingRate, setBoardingRate] = usePersistentProperty('CONFIG_BOARDING_RATE', 'REAL');

    const simbriefDataLoaded = isSimbriefDataLoaded();

    const [massUnitForDisplay] = useState(Units.usingMetric ? 'KGS' : 'LBS');

    switch (getAirframeType()) {
    case 'A320_214':
        return (
            <A320CFMPayload
                simbriefUnits={simbriefUnits}
                simbriefBagWeight={simbriefBagWeight}
                simbriefPaxWeight={simbriefPaxWeight}
                simbriefPax={simbriefPax}
                simbriefBag={simbriefBag}
                simbriefFreight={simbriefFreight}
                simbriefDataLoaded={simbriefDataLoaded}
                massUnitForDisplay={massUnitForDisplay}
                isOnGround={isOnGround}
                boardingStarted={boardingStarted}
                boardingRate={boardingRate}
                setBoardingStarted={setBoardingStarted}
                setBoardingRate={setBoardingRate}
            />
        );
    case 'A320_214_SL':
        return (
            <A320CFMSLPayload
                simbriefUnits={simbriefUnits}
                simbriefBagWeight={simbriefBagWeight}
                simbriefPaxWeight={simbriefPaxWeight}
                simbriefPax={simbriefPax}
                simbriefBag={simbriefBag}
                simbriefFreight={simbriefFreight}
                simbriefDataLoaded={simbriefDataLoaded}
                massUnitForDisplay={massUnitForDisplay}
                isOnGround={isOnGround}
                boardingStarted={boardingStarted}
                boardingRate={boardingRate}
                setBoardingStarted={setBoardingStarted}
                setBoardingRate={setBoardingRate}
            />
        );
    case 'A320_232':
        return (
            <A320IAEPayload
                simbriefUnits={simbriefUnits}
                simbriefBagWeight={simbriefBagWeight}
                simbriefPaxWeight={simbriefPaxWeight}
                simbriefPax={simbriefPax}
                simbriefBag={simbriefBag}
                simbriefFreight={simbriefFreight}
                simbriefDataLoaded={simbriefDataLoaded}
                massUnitForDisplay={massUnitForDisplay}
                isOnGround={isOnGround}
                boardingStarted={boardingStarted}
                boardingRate={boardingRate}
                setBoardingStarted={setBoardingStarted}
                setBoardingRate={setBoardingRate}
            />
        );
    case 'A320_232_SL':
        return (
            <A320IAESLPayload
                simbriefUnits={simbriefUnits}
                simbriefBagWeight={simbriefBagWeight}
                simbriefPaxWeight={simbriefPaxWeight}
                simbriefPax={simbriefPax}
                simbriefBag={simbriefBag}
                simbriefFreight={simbriefFreight}
                simbriefDataLoaded={simbriefDataLoaded}
                massUnitForDisplay={massUnitForDisplay}
                isOnGround={isOnGround}
                boardingStarted={boardingStarted}
                boardingRate={boardingRate}
                setBoardingStarted={setBoardingStarted}
                setBoardingRate={setBoardingRate}
            />
        );
    default:
        return (
            <A320CFMPayload
                simbriefUnits={simbriefUnits}
                simbriefBagWeight={simbriefBagWeight}
                simbriefPaxWeight={simbriefPaxWeight}
                simbriefPax={simbriefPax}
                simbriefBag={simbriefBag}
                simbriefFreight={simbriefFreight}
                simbriefDataLoaded={simbriefDataLoaded}
                massUnitForDisplay={massUnitForDisplay}
                isOnGround={isOnGround}
                boardingStarted={boardingStarted}
                boardingRate={boardingRate}
                setBoardingStarted={setBoardingStarted}
                setBoardingRate={setBoardingRate}
            />
        );
    }
};