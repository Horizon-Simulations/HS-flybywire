// Copyright (c) 2021-2023 FlyByWire Simulations
//
// SPDX-License-Identifier: GPL-3.0

/* eslint-disable max-len */
import React, { useState } from 'react';
import { Units, usePersistentProperty, useSimVar } from '@flybywiresim/fbw-sdk';
import { getAirframeType } from '../../../Efb';
import { A318Payload } from './A318_115/A318Payload';
import { ACJPayload } from './A318_ACJ/A318Payload';
import { BAWPayload } from './A318_BAW/A318Payload';
import { A319CFMPayload } from './A319_115/A319Payload';
import { A319CFMACJPayload } from './A319_115_ACJ/A319Payload';
import { A319IAEPayload } from './A319_133/A319Payload';
import { A319IAEACJPayload } from './A319_133_ACJ/A319Payload';
import { A320CFMPayload } from './A320_214/A320Payload';
import { A320CFMSLPayload } from './A320_214_SL/A320Payload';
import { A320IAEPayload } from './A320_232/A320Payload';
import { A320IAESLPayload } from './A320_232_SL/A320Payload';
import { A21NLEAPPayload } from './A21N_251N/A21NPayload';
import { A21NLEAPLRPayload } from './A21N_251N_LR/A21NPayload';
import { A21NLEAPFLEXPayload } from './A21N_251NX/A21NPayload';
import { A21NPWPayload } from './A21N_271N/A21NPayload';
import { A21NPWLRPayload } from './A21N_271N_LR/A21NPayload';
import { A21NPWFLEXPayload } from './A21N_271NX/A21NPayload';
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
    const payloadImported = useAppSelector((state) => state.simbrief.payloadImported);

    const simbriefDataLoaded = isSimbriefDataLoaded();

    const [massUnitForDisplay] = useState(Units.usingMetric ? 'KGS' : 'LBS');

    switch (getAirframeType()) {
    case 'A318_115':
        return (
            <A318Payload
                simbriefUnits={simbriefUnits}
                simbriefBagWeight={simbriefBagWeight}
                simbriefPaxWeight={simbriefPaxWeight}
                simbriefPax={simbriefPax}
                simbriefBag={simbriefBag}
                simbriefFreight={simbriefFreight}
                simbriefDataLoaded={simbriefDataLoaded}
                payloadImported={payloadImported}
                massUnitForDisplay={massUnitForDisplay}
                isOnGround={isOnGround}
                boardingStarted={boardingStarted}
                boardingRate={boardingRate}
                setBoardingStarted={setBoardingStarted}
                setBoardingRate={setBoardingRate}
            />
        );
    case 'A318_ACJ':
        return (
            <ACJPayload
                simbriefUnits={simbriefUnits}
                simbriefBagWeight={simbriefBagWeight}
                simbriefPaxWeight={simbriefPaxWeight}
                simbriefPax={simbriefPax}
                simbriefBag={simbriefBag}
                simbriefFreight={simbriefFreight}
                simbriefDataLoaded={simbriefDataLoaded}
                payloadImported={payloadImported}
                massUnitForDisplay={massUnitForDisplay}
                isOnGround={isOnGround}
                boardingStarted={boardingStarted}
                boardingRate={boardingRate}
                setBoardingStarted={setBoardingStarted}
                setBoardingRate={setBoardingRate}
            />
        );
    case 'A318_BAW':
        return (
            <BAWPayload
                simbriefUnits={simbriefUnits}
                simbriefBagWeight={simbriefBagWeight}
                simbriefPaxWeight={simbriefPaxWeight}
                simbriefPax={simbriefPax}
                simbriefBag={simbriefBag}
                simbriefFreight={simbriefFreight}
                simbriefDataLoaded={simbriefDataLoaded}
                payloadImported={payloadImported}
                massUnitForDisplay={massUnitForDisplay}
                isOnGround={isOnGround}
                boardingStarted={boardingStarted}
                boardingRate={boardingRate}
                setBoardingStarted={setBoardingStarted}
                setBoardingRate={setBoardingRate}
            />
        );
    case 'A319_115':
        return (
            <A319CFMPayload
                simbriefUnits={simbriefUnits}
                simbriefBagWeight={simbriefBagWeight}
                simbriefPaxWeight={simbriefPaxWeight}
                simbriefPax={simbriefPax}
                simbriefBag={simbriefBag}
                simbriefFreight={simbriefFreight}
                simbriefDataLoaded={simbriefDataLoaded}
                payloadImported={payloadImported}
                massUnitForDisplay={massUnitForDisplay}
                isOnGround={isOnGround}
                boardingStarted={boardingStarted}
                boardingRate={boardingRate}
                setBoardingStarted={setBoardingStarted}
                setBoardingRate={setBoardingRate}
            />
        );
    case 'A319_115_ACJ':
        return (
            <A319CFMACJPayload
                simbriefUnits={simbriefUnits}
                simbriefBagWeight={simbriefBagWeight}
                simbriefPaxWeight={simbriefPaxWeight}
                simbriefPax={simbriefPax}
                simbriefBag={simbriefBag}
                simbriefFreight={simbriefFreight}
                simbriefDataLoaded={simbriefDataLoaded}
                payloadImported={payloadImported}
                massUnitForDisplay={massUnitForDisplay}
                isOnGround={isOnGround}
                boardingStarted={boardingStarted}
                boardingRate={boardingRate}
                setBoardingStarted={setBoardingStarted}
                setBoardingRate={setBoardingRate}
            />
        );
    case 'A319_133':
        return (
            <A319IAEPayload
                simbriefUnits={simbriefUnits}
                simbriefBagWeight={simbriefBagWeight}
                simbriefPaxWeight={simbriefPaxWeight}
                simbriefPax={simbriefPax}
                simbriefBag={simbriefBag}
                simbriefFreight={simbriefFreight}
                simbriefDataLoaded={simbriefDataLoaded}
                payloadImported={payloadImported}
                massUnitForDisplay={massUnitForDisplay}
                isOnGround={isOnGround}
                boardingStarted={boardingStarted}
                boardingRate={boardingRate}
                setBoardingStarted={setBoardingStarted}
                setBoardingRate={setBoardingRate}
            />
        );
    case 'A319_133_ACJ':
        return (
            <A319IAEACJPayload
                simbriefUnits={simbriefUnits}
                simbriefBagWeight={simbriefBagWeight}
                simbriefPaxWeight={simbriefPaxWeight}
                simbriefPax={simbriefPax}
                simbriefBag={simbriefBag}
                simbriefFreight={simbriefFreight}
                simbriefDataLoaded={simbriefDataLoaded}
                payloadImported={payloadImported}
                massUnitForDisplay={massUnitForDisplay}
                isOnGround={isOnGround}
                boardingStarted={boardingStarted}
                boardingRate={boardingRate}
                setBoardingStarted={setBoardingStarted}
                setBoardingRate={setBoardingRate}
            />
        );
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
                payloadImported={payloadImported}
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
                payloadImported={payloadImported}
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
                payloadImported={payloadImported}
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
                payloadImported={payloadImported}
                massUnitForDisplay={massUnitForDisplay}
                isOnGround={isOnGround}
                boardingStarted={boardingStarted}
                boardingRate={boardingRate}
                setBoardingStarted={setBoardingStarted}
                setBoardingRate={setBoardingRate}
            />
        );
    case 'A321_251N':
        return (
            <A21NLEAPPayload
                simbriefUnits={simbriefUnits}
                simbriefBagWeight={simbriefBagWeight}
                simbriefPaxWeight={simbriefPaxWeight}
                simbriefPax={simbriefPax}
                simbriefBag={simbriefBag}
                simbriefFreight={simbriefFreight}
                simbriefDataLoaded={simbriefDataLoaded}
                payloadImported={payloadImported}
                massUnitForDisplay={massUnitForDisplay}
                isOnGround={isOnGround}
                boardingStarted={boardingStarted}
                boardingRate={boardingRate}
                setBoardingStarted={setBoardingStarted}
                setBoardingRate={setBoardingRate}
            />
        );
    case 'A321_251N_LR':
        return (
            <A21NLEAPLRPayload
                simbriefUnits={simbriefUnits}
                simbriefBagWeight={simbriefBagWeight}
                simbriefPaxWeight={simbriefPaxWeight}
                simbriefPax={simbriefPax}
                simbriefBag={simbriefBag}
                simbriefFreight={simbriefFreight}
                simbriefDataLoaded={simbriefDataLoaded}
                payloadImported={payloadImported}
                massUnitForDisplay={massUnitForDisplay}
                isOnGround={isOnGround}
                boardingStarted={boardingStarted}
                boardingRate={boardingRate}
                setBoardingStarted={setBoardingStarted}
                setBoardingRate={setBoardingRate}
            />
        );
    case 'A321_251NX':
        return (
            <A21NLEAPFLEXPayload
                simbriefUnits={simbriefUnits}
                simbriefBagWeight={simbriefBagWeight}
                simbriefPaxWeight={simbriefPaxWeight}
                simbriefPax={simbriefPax}
                simbriefBag={simbriefBag}
                simbriefFreight={simbriefFreight}
                simbriefDataLoaded={simbriefDataLoaded}
                payloadImported={payloadImported}
                massUnitForDisplay={massUnitForDisplay}
                isOnGround={isOnGround}
                boardingStarted={boardingStarted}
                boardingRate={boardingRate}
                setBoardingStarted={setBoardingStarted}
                setBoardingRate={setBoardingRate}
            />
        );
    case 'A321_271N':
        return (
            <A21NPWPayload
                simbriefUnits={simbriefUnits}
                simbriefBagWeight={simbriefBagWeight}
                simbriefPaxWeight={simbriefPaxWeight}
                simbriefPax={simbriefPax}
                simbriefBag={simbriefBag}
                simbriefFreight={simbriefFreight}
                simbriefDataLoaded={simbriefDataLoaded}
                payloadImported={payloadImported}
                massUnitForDisplay={massUnitForDisplay}
                isOnGround={isOnGround}
                boardingStarted={boardingStarted}
                boardingRate={boardingRate}
                setBoardingStarted={setBoardingStarted}
                setBoardingRate={setBoardingRate}
            />
        );
    case 'A321_271N_LR':
        return (
            <A21NPWLRPayload
                simbriefUnits={simbriefUnits}
                simbriefBagWeight={simbriefBagWeight}
                simbriefPaxWeight={simbriefPaxWeight}
                simbriefPax={simbriefPax}
                simbriefBag={simbriefBag}
                simbriefFreight={simbriefFreight}
                simbriefDataLoaded={simbriefDataLoaded}
                payloadImported={payloadImported}
                massUnitForDisplay={massUnitForDisplay}
                isOnGround={isOnGround}
                boardingStarted={boardingStarted}
                boardingRate={boardingRate}
                setBoardingStarted={setBoardingStarted}
                setBoardingRate={setBoardingRate}
            />
        );
    case 'A321_271NX':
        return (
            <A21NPWFLEXPayload
                simbriefUnits={simbriefUnits}
                simbriefBagWeight={simbriefBagWeight}
                simbriefPaxWeight={simbriefPaxWeight}
                simbriefPax={simbriefPax}
                simbriefBag={simbriefBag}
                simbriefFreight={simbriefFreight}
                simbriefDataLoaded={simbriefDataLoaded}
                payloadImported={payloadImported}
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
            <A21NLEAPPayload
                simbriefUnits={simbriefUnits}
                simbriefBagWeight={simbriefBagWeight}
                simbriefPaxWeight={simbriefPaxWeight}
                simbriefPax={simbriefPax}
                simbriefBag={simbriefBag}
                simbriefFreight={simbriefFreight}
                simbriefDataLoaded={simbriefDataLoaded}
                payloadImported={payloadImported}
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
