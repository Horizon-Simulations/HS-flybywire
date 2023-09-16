// Copyright (c) 2022-2023 Horizon Simulations
//
// SPDX-License-Identifier: GPL-3.0
import React, { useState } from 'react';
import { getAirframeType } from '../../Efb';
import { A318ServicesPage } from './Service/A318/ServicesPage';
import { A320ServicesPage } from './Service/A320/ServicesPage';


export const ServicesPage = () => {
    const [airframe] = useState(getAirframeType());
    switch ((airframe !== null ? airframe : 'A320_214')) {
    case 'A318_115':
        return (
            <A318ServicesPage />
        );
    case 'A318_ACJ':
        return (
            <A318ServicesPage />
        );
    case 'A318_BAW':
        return (
            <A318ServicesPage />
        );
    case 'A319_115':
        return (
            <A320ServicesPage />
        );
    case 'A319_115_ACJ':
        return (
            <A320ServicesPage />
        );
    case 'A319_133':
        return (
            <A320ServicesPage />
        );
     case 'A319_133_ACJ':
         return (
            <A320ServicesPage />
         );
    case 'A320_214':
        return (
            <A320ServicesPage />
        );
    case 'A320_214_SL':
        return (
            <A320ServicesPage />
        );
    case 'A320_232':
        return (
            <A320ServicesPage />
        );
    case 'A320_232_SL':
         return (
            <A320ServicesPage />
         );
    case 'A321_251N':
        return (
            <A320ServicesPage />
        );
    case 'A321_251N_LR':
        return (
            <A320ServicesPage />
        );
    case 'A321_271N':
        return (
            <A320ServicesPage />
        );
     case 'A321_271N_LR':
         return (
            <A320ServicesPage />
         );
    default:
        return (
            <A320ServicesPage />
        );
    }
}