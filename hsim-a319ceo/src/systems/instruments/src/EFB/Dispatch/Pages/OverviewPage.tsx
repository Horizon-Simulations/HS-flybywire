// Copyright (c) 2021-2023 FlyByWire Simulations
//
// SPDX-License-Identifier: GPL-3.0
import React from 'react';
import { A319CFMOverviewPage } from './Overview/A319CFMOverview';
import { A319CFMACJOverviewPage } from './Overview/A319CFMACJOverview';
import { A319IAEOverviewPage } from './Overview/A319IAEOverview';
import { A319IAEACJOverviewPage } from './Overview/A319IAEACJOverview';
import { getAirframeType } from '../../Efb';

export const OverviewPage = () => {
    switch (getAirframeType()) {
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
    default:
        return (
            <A319CFMOverviewPage />
        );
    }
}