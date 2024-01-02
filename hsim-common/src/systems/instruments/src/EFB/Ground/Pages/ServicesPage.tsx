// Copyright (c) 2022-2023 Horizon Simulations
//
// SPDX-License-Identifier: GPL-3.0
import React, { useState } from 'react';
import { getAirframeType } from '../../Efb';
import { A318Services } from './Services/A318_100/A318Services';
import { A319Services } from './Services/A319_100/A319Services';
import { A320Services } from './Services/A320_200/A320Services';
import { A321Services } from './Services/A321_200/A321Services';


export const ServicesPage = () => {
    const [airframe] = useState(getAirframeType());
    switch (airframe) {
    case 'A318_115':
        return (
            <A318Services />
        );
    case 'A318_ACJ':
        return (
            <A318Services />
        );
    case 'A318_BAW':
        return (
            <A318Services />
        );
    case 'A319_115':
        return (
            <A319Services />
        );
    case 'A319_115_ACJ':
        return (
            <A319Services />
        );
    case 'A319_133':
        return (
            <A319Services />
        );
     case 'A319_133_ACJ':
         return (
            <A319Services />
         );
    case 'A320_214':
        return (
            <A320Services />
        );
    case 'A320_214_SL':
        return (
            <A320Services />
        );
    case 'A320_232':
        return (
            <A320Services />
        );
    case 'A320_232_SL':
         return (
            <A320Services />
         );
    case 'A321_251N':
        return (
            <A321Services />
        );
    case 'A321_251N_LR':
        return (
            <A321Services />
        );
    case 'A321_271N':
        return (
            <A321Services />
        );
     case 'A321_271N_LR':
         return (
            <A321Services />
         );
    default:
        return (
            <A320Services />
        );
    }
};