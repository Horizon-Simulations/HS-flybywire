// Copyright (c) 2023-2024 FlyByWire Simulations
// SPDX-License-Identifier: GPL-3.0

/* eslint-disable max-len */
import { Units, useSimVar } from '@flybywiresim/fbw-sdk';
import { isSimbriefDataLoaded } from '@flybywiresim/flypad';
import React, { useState } from 'react';
import { useAppSelector } from '../../../Store/store';
import { A320Fuel } from './A320_LVFR/A320Fuel';

export const Fuel = () => {
    const [isOnGround] = useSimVar('SIM ON GROUND', 'Bool', 8_059);
    const simbriefUnits = useAppSelector((state) => state.simbrief.data.units);
    const simbriefPlanRamp = useAppSelector((state) => state.simbrief.data.fuels.planRamp);

    const simbriefDataLoaded = isSimbriefDataLoaded();

    const [massUnitForDisplay] = useState(Units.usingMetric ? 'KGS' : 'LBS');
    const [convertUnit] = useState(Units.usingMetric ? 1 : (1 / 0.4535934));


    return (
        <A320Fuel
            simbriefDataLoaded={simbriefDataLoaded}
            simbriefUnits={simbriefUnits}
            simbriefPlanRamp={simbriefPlanRamp}
            massUnitForDisplay={massUnitForDisplay}
            convertUnit={convertUnit}
            isOnGround={isOnGround}
        />
    );
};
