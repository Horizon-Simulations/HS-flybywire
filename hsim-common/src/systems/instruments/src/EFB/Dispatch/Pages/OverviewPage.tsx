// Copyright (c) 2021-2023 FlyByWire Simulations
//
// SPDX-License-Identifier: GPL-3.0
import React from 'react';
import { getAirframeType } from '../../Efb';
import { A318OverviewPage } from './Overview/A318_115/A318Overview';
import { A318ACJOverviewPage } from './Overview//A318CJ_115/A318ACJOverview';
import { A319CFMOverviewPage } from './Overview/A319_115/A319CFMOverview';
import { A319CFMACJOverviewPage } from './Overview/A319CJ_115/A319CFMACJOverview';
import { A319IAEOverviewPage } from './Overview/A319_133/A319IAEOverview';
import { A319IAEACJOverviewPage } from './Overview/A319CJ_133/A319IAEACJOverview';
import { A320CFMOverviewPage } from './Overview/A320_214/A320CFMOverview';
import { A320IAEOverviewPage } from './Overview/A320_232/A320IAEOverview';
import { A21NLEAPOverviewPage } from './Overview/A21N_251N/A21NLEAPOverview';
import { A21NLEAPLROverviewPage } from './Overview/A21N_251N_LR/A21NLEAPLROverview';
import { A21NPWOverviewPage } from './Overview/A21N_271N/A21NPWOverview';
import { A21NPWLROverviewPage } from './Overview/A21N_271N_LR/A21NPWLROverview';

export const OverviewPage = () => {
    switch (getAirframeType()) {
    case 'A318_115':
        return (
            <A318OverviewPage />
        );
    case 'A318_ACJ':
        return (
            <A318ACJOverviewPage />
        );
    case 'A318_BAW':
        return (
            <A318ACJOverviewPage />
        );
    case 'A319_115':
        return (
            <A319CFMOverviewPage />
        );
    case 'A319_115_ACJ':
        return (
            <A319CFMACJOverviewPage />
        );
    case 'A319_133':
        return (
            <A319IAEOverviewPage />
        );
     case 'A319_133_ACJ':
         return (
            <A319IAEACJOverviewPage />
         );
    case 'A320_214':
        return (
            <A320CFMOverviewPage />
        );
    case 'A320_214_SL':
        return (
            <A320CFMOverviewPage />
        );
    case 'A320_232':
        return (
            <A320IAEOverviewPage />
        );
    case 'A320_232_SL':
         return (
            <A320IAEOverviewPage />
         );
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