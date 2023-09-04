// Copyright (c) 2021-2023 FlyByWire Simulations
//
// SPDX-License-Identifier: GPL-3.0
import React from 'react';
import { A318OverviewPage } from './Overview/A318Overview';
import { A318ACJOverviewPage } from './Overview/A318ACJOverview';
import { A318BAWOverviewPage } from './Overview/A318BAWOverview';
import { getAirframeType } from '../../Efb';

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
            <A318BAWOverviewPage />
        );
    default:
        return (
            <A318OverviewPage />
        );
    }
}