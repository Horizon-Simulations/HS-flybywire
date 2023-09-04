// Copyright (c) 2021-2023 FlyByWire Simulations
//
// SPDX-License-Identifier: GPL-3.0
import React from 'react';
import { A320CFMOverviewPage } from './Overview/A320CFMOverview';
import { A320CFMSLOverviewPage } from './Overview/A320CFMSLOverview';
import { A320IAEOverviewPage } from './Overview/A320IAEOverview';
import { A320IAESLOverviewPage } from './Overview/A320IAESLOverview';
import { getAirframeType } from '../../Efb';

export const OverviewPage = () => {
    switch (getAirframeType()) {
    case 'A320_214':
        return (
            <A320CFMOverviewPage />
        );
    case 'A320_214_SL':
        return (
            <A320CFMSLOverviewPage />
        );
    case 'A320_232':
        return (
            <A320IAEOverviewPage />
        );
     case 'A320_232_SL':
         return (
            <A320IAESLOverviewPage />
         );
    default:
        return (
            <A320CFMOverviewPage />
        );
    }
}