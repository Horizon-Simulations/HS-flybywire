// Copyright (c) 2021-2023 FlyByWire Simulations
//
// SPDX-License-Identifier: GPL-3.0
import React from 'react';
import { A21NLEAPOverviewPage } from './Overview/A21NLEAPOverview';
import { A21NLEAPLROverviewPage } from './Overview/A21NLEAPLROverview';
import { A21NPWOverviewPage } from './Overview/A21NPWOverview';
import { A21NPWLROverviewPage } from './Overview/A21NPWLROverview';
import { getAirframeType } from '../../Efb';

export const OverviewPage = () => {
    switch (getAirframeType()) {
    case 'A321_251N':
        return (
            <A21NLEAPOverviewPage />
        );
    case 'A321_251N_LR':
        return (
            <A21NLEAPLROverviewPage />
        );
    case 'A321_271N':
        return (
            <A21NPWOverviewPage />
        );
     case 'A321_271N_LR':
         return (
            <A21NPWLROverviewPage />
         );
    default:
        return (
            <A21NLEAPOverviewPage />
        );
    }
}