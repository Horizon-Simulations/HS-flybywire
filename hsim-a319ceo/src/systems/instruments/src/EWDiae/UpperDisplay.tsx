// Copyright (c) 2021-2023 FlyByWire Simulations
//
// SPDX-License-Identifier: GPL-3.0

import { EventBus, DisplayComponent, FSComponent, Subject, VNode } from '@microsoft/msfs-sdk';
import { NXDataStore } from '@flybywiresim/fbw-sdk';
import { AFloor } from './AFloor';
import { Egt } from './EGT';
import { FF } from './FF';
import { FOB } from './FOB';
import { Idle } from './Idle';
import { Layer } from '../MsfsAvionicsCommon/Layer';
import { EPR, N1 } from './N1';
import { N2 } from './N2';
import { N1Limit } from './N1Limit';
import { PacksNaiWai } from './PacksNaiWai';
import { Slats } from './Slats';

interface UpperDisplayProps {
    bus: EventBus;
}
export class UpperDisplay extends DisplayComponent<UpperDisplayProps> {
    private usingMetric = Subject.create(false);

    onAfterRender(node: VNode): void {
        super.onAfterRender(node);

        NXDataStore.getAndSubscribe('CONFIG_USING_METRIC_UNIT', ((_k, v) => {
            this.usingMetric.set(v === '1');
        }), '1');
    }

    render(): VNode {
        return (
            <>
                <AFloor bus={this.props.bus} />
                <Idle bus={this.props.bus} />
                <N1Limit bus={this.props.bus} />
                <PacksNaiWai bus={this.props.bus} />

                <Layer x={0} y={96}>
                    <EPR bus={this.props.bus} engine={1} x={234} y={0} />
                    <EPR bus={this.props.bus} engine={2} x={534} y={0} />
                    <text class="Large Center" x={387} y={26}>EPR</text>
                </Layer>

                <Layer x={0} y={248}>
                    <Egt bus={this.props.bus} engine={1} x={234} y={0} />
                    <Egt bus={this.props.bus} engine={2} x={533} y={0} />
                    <text class="Large Center" x={385} y={-16}>EGT</text>
                    <text class="Medium Center Cyan" x={379} y={6}>&deg;C</text>
                </Layer>

                <Layer x={0} y={360}>
                    <N1 bus={this.props.bus} engine={1} x={234} y={0} />
                    <N1 bus={this.props.bus} engine={2} x={534} y={0} />
                    <text class="Large Center" x={387} y={26}>N1</text>
                    <text class="Medium Center Cyan" x={384} y={45}>%</text>
                </Layer>

                <Layer x={0} y={248}>
                    <text class="Large Left" x={40} y={0}>FF</text>
                    <text class="Standard Left Cyan" x={76} y={0}>
                        {this.usingMetric.map((m) => (m ? 'KG' : 'LBS'))}
                        /H
                    </text>
                    <FF bus={this.props.bus} engine={1} x={123} y={30} metric={this.usingMetric} />
                    <text class="Large Left" x={640} y={0}>FF</text>
                    <text class="Standard Left Cyan" x={676} y={0}>
                        {this.usingMetric.map((m) => (m ? 'KG' : 'LBS'))}
                        /H
                    </text>
                    <FF bus={this.props.bus} engine={2} x={723} y={30} metric={this.usingMetric} />
                </Layer>

                <Layer x={0} y={350}>
                    <text class="Large Left" x={60} y={0}>N2</text>
                    <text class="Medium Left Cyan" x={95} y={0}>%</text>
                    <N2 bus={this.props.bus} engine={1} x={47} y={-16} />
                    <text class="Large Left" x={660} y={0}>N2</text>
                    <text class="Medium Left Cyan" x={695} y={0}>%</text>
                    <N2 bus={this.props.bus} engine={2} x={647} y={-16} />
                </Layer>

                <FOB bus={this.props.bus} x={40} y={490} metric={this.usingMetric} />

                <Slats bus={this.props.bus} />
            </>
        );
    }
}
