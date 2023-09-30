import { ClockEvents, EventBus, DisplayComponent, FSComponent, Subject, Subscribable, VNode } from '@microsoft/msfs-sdk';
import { EwdSimvars } from './shared/EwdSimvarPublisher';
import { GaugeComponent, GaugeMarkerComponent, GaugeMaxComponent, ThrottlePositionDonutComponent, valueRadianAngleConverter } from '../MsfsAvionicsCommon/gauges';
import { Layer } from '../MsfsAvionicsCommon/Layer';

import './style.scss';

export const getEprFromN1Value = (n1: number): number => {
    // ((n1 - 19) * (1.6 - 1) / (110 - 19)) + 1
    return ((n1 - 19) * 0.6 / 91) + 1;
};

interface AvailRevProps {
    bus: EventBus;
    engine: 1 | 2;
}
export class AvailRev extends DisplayComponent<AvailRevProps> {
    private visibility = Subject.create('hidden');

    private revClass = Subject.create('');

    private revText = Subject.create('');

    private revVisible = Subject.create('hidden');

    private availVisible = Subject.create('hidden');

    private fadec: boolean = false;

    private n1: number = 0;

    private idleN1: number = 0;

    private reverserInTransit: boolean = false;

    private reverserDeployed: boolean = false;

    private state: number = 0;

    onAfterRender(node: VNode): void {
        super.onAfterRender(node);

        const sub = this.props.bus.getSubscriber<ClockEvents & EwdSimvars>();

        sub.on(`engine${this.props.engine}Fadec`).whenChanged().handle((f) => {
            this.fadec = f;
        });

        sub.on(`engine${this.props.engine}N1`).whenChanged().handle((n1) => {
            this.n1 = n1;
        });

        sub.on('idleN1').whenChanged().handle((n1) => {
            this.idleN1 = n1;
        });

        sub.on(`engine${this.props.engine}ReverserTransit`).whenChanged().handle((rev) => {
            this.reverserInTransit = rev;
        });

        sub.on(`engine${this.props.engine}ReverserDeployed`).whenChanged().handle((rev) => {
            this.reverserDeployed = rev;
        });

        sub.on(`engine${this.props.engine}State`).whenChanged().handle((state) => {
            this.state = state;
        });

        sub.on('realTime').handle((_t) => {
            const availVisible = this.n1 > Math.floor(this.idleN1) && this.state === 2;
            const isVisible = (availVisible || this.reverserInTransit || this.reverserDeployed) || !this.fadec;
            const revReady = this.fadec && this.reverserDeployed;

            this.visibility.set(isVisible ? 'visible' : 'hidden');
            this.availVisible.set(availVisible ? 'visible' : 'hidden');
            this.revVisible.set(((this.reverserInTransit || this.reverserDeployed) && !availVisible) || !this.fadec ? 'visible' : 'hidden');
            this.revText.set(this.fadec ? 'REV' : 'XX');
            this.revClass.set(revReady ? 'Huge Center Green' : 'Huge Center Amber');
        });
    }

    render(): VNode {
        return (
            <g visibility={this.visibility}>
                <rect x={-44} y={-14} width={96} height={32} class="DarkGreyBox BackgroundFill" />
                <text class={this.revClass} visibility={this.revVisible} x={0} y={11}>{this.revText}</text>
                <text class="Huge End Green" visibility={this.availVisible} x={52} y={11}>AVAIL</text>
            </g>
        );
    }
}

interface N1CommandAndTrendProps {
    bus: EventBus;
    engine: 1 | 2;
    radius: number;
    startAngle: Subscribable<number>;
    endAngle: Subscribable<number>;
    min: number;
    max: number;
    gaugeEpr: Subscribable<number>;
}
export class N1CommandAndTrend extends DisplayComponent<N1CommandAndTrendProps> {
    private visible = Subject.create(false);

    private autoThrustStatus: number = 0;

    private eprActual: number = 0;

    private eprCommand: number = 0;

    private startAngle: number = 0;

    private endAngle: number = 0;

    private eprCommandGauge = Subject.create(0);

    private startAngleGauge = Subject.create(0);

    private startAngleTrend = Subject.create(0);

    private endAngleGauge = Subject.create(0);

    private endAngleTrend = Subject.create(0);

    private eprCommandStartX = Subject.create(0);

    private eprCommandStartY = Subject.create(0);

    private eprCommandEndX = Subject.create(0);

    private eprCommandEndY = Subject.create(0);

    constructor(props: N1CommandAndTrendProps) {
        super(props);

        this.startAngle = this.props.startAngle.get();
        this.endAngle = this.props.endAngle.get();
    }

    onAfterRender(node: VNode): void {
        super.onAfterRender(node);

        const sub = this.props.bus.getSubscriber<ClockEvents & EwdSimvars>();

        this.props.gaugeEpr.sub((epr) => {
            this.eprActual = epr;
        });

        sub.on('autoThrustStatus').whenChanged().handle((s) => {
            this.autoThrustStatus = s;
        });

        sub.on(`autoThrustCommand${this.props.engine}`).whenChanged().handle((n1) => {
            const eprVal = getEprFromN1Value(n1);
            this.eprCommand = eprVal;
            this.eprCommandGauge.set(eprVal);
        });

        sub.on('realTime').atFrequency(10).handle((_t) => {
            const isVisible = this.autoThrustStatus === 2 && Math.abs(this.eprActual - this.eprCommand) > 0.01;
            this.visible.set(isVisible);
            if (isVisible) {
                const n1Command = this.eprCommand;
                const n1ActualXY = valueRadianAngleConverter(this.eprActual, this.props.min, this.props.max, this.endAngle, this.startAngle, true);
                const n1CommandXY = valueRadianAngleConverter(n1Command, this.props.min, this.props.max, this.endAngle, this.startAngle, true);
                const n1CommandArrow = valueRadianAngleConverter(n1Command, this.props.min, this.props.max, this.endAngle, this.startAngle, false);
                const n1CommandPlusArrow = valueRadianAngleConverter(
                    n1Command,
                    this.props.min,
                    this.props.max,
                    (this.eprActual > n1Command ? n1CommandXY.angle : n1CommandXY.angle + 20),
                    (this.eprActual > n1Command ? n1CommandXY.angle - 24 : n1CommandXY.angle),
                    false,
                );

                this.startAngleTrend.set(this.eprActual > n1Command ? n1CommandXY.angle : n1ActualXY.angle);
                this.endAngleTrend.set(this.eprActual > n1Command ? n1ActualXY.angle : n1CommandXY.angle);

                this.startAngleGauge.set(this.eprActual > n1Command ? n1CommandXY.angle - 20 : n1CommandXY.angle);
                this.endAngleGauge.set(this.eprActual > n1Command ? n1CommandXY.angle : n1CommandXY.angle + 20);

                this.eprCommandStartX.set(n1CommandArrow.x * this.props.radius * 0.50);
                this.eprCommandStartY.set(n1CommandArrow.y * this.props.radius * 0.50);

                this.eprCommandEndX.set(n1CommandPlusArrow.x * this.props.radius * 0.50);
                this.eprCommandEndY.set(n1CommandPlusArrow.y * this.props.radius * 0.50);
            }
        });
    }

    render(): VNode {
        const radiusDivide = this.props.radius / 5;
        const commandAndTrendRadius = [
            this.props.radius - radiusDivide,
            this.props.radius - (2 * radiusDivide),
            this.props.radius - (3 * radiusDivide),
            this.props.radius - (4 * radiusDivide)];

        return (
            <Layer x={0} y={0} visible={this.visible}>
                <GaugeMarkerComponent
                    value={this.eprCommandGauge}
                    x={0}
                    y={0}
                    min={this.props.min}
                    max={this.props.max}
                    radius={this.props.radius}
                    startAngle={this.props.startAngle}
                    endAngle={this.props.endAngle}
                    multiplierOuter={0.8}
                    class="GreenLine"
                    indicator
                />
                <GaugeMarkerComponent
                    value={this.eprCommandGauge}
                    x={0}
                    y={0}
                    min={this.props.min}
                    max={this.props.max}
                    radius={this.props.radius}
                    startAngle={this.startAngleGauge}
                    endAngle={this.endAngleGauge}
                    multiplierOuter={0.51}
                    class="GreenLine"
                    indicator
                />
                <line x1={this.eprCommandStartX} y1={this.eprCommandStartY} x2={this.eprCommandEndX} y2={this.eprCommandEndY} class="GreenLine" />

                <GaugeComponent x={0} y={0} radius={commandAndTrendRadius[0]} startAngle={this.startAngleTrend} endAngle={this.endAngleTrend} class="GreenLine" />
                <GaugeComponent x={0} y={0} radius={commandAndTrendRadius[1]} startAngle={this.startAngleTrend} endAngle={this.endAngleTrend} class="GreenLine" />
                <GaugeComponent x={0} y={0} radius={commandAndTrendRadius[2]} startAngle={this.startAngleTrend} endAngle={this.endAngleTrend} class="GreenLine" />
                <GaugeComponent x={0} y={0} radius={commandAndTrendRadius[3]} startAngle={this.startAngleTrend} endAngle={this.endAngleTrend} class="GreenLine" />
            </Layer>
        );
    }
}

interface N1Props {
    bus: EventBus;
    engine: 1 | 2;
    x: number;
    y: number;
}
export class N1 extends DisplayComponent<N1Props> {
    private inactiveVisibility = Subject.create('hidden');

    private activeVisibility = Subject.create('hidden');

    private textN1Int = Subject.create('');

    private textN1Fract = Subject.create('');

    private readonly gaugeStartAngle = Subject.create(220);

    private readonly gaugeStartAngleRed = Subject.create(50);

    private readonly gaugeEndAngle = Subject.create(70);

    private gaugeN1Limit = Subject.create(0);

    private gaugeN1 = Subject.create(0);

    private throttle = Subject.create(0);

    onAfterRender(node: VNode): void {
        super.onAfterRender(node);

        const sub = this.props.bus.getSubscriber<EwdSimvars>();

        sub.on(`engine${this.props.engine}Fadec`).whenChanged().handle((f) => {
            this.inactiveVisibility.set(f ? 'hidden' : 'visible');
            this.activeVisibility.set(f ? 'visible' : 'hidden');
        });

        sub.on(`engine${this.props.engine}N1`).whenChanged().handle((n1) => {
            const n1Parts = n1.toFixed(1).split('.', 2);
            this.textN1Int.set(n1Parts[0]);
            this.textN1Fract.set(n1Parts[1]);

            this.gaugeN1.set(Math.max(Math.min(n1, 110), 20) / 10);
        });

        sub.on('autoThrustLimitToga').whenChanged().handle((n1) => {
            this.gaugeN1Limit.set(Math.abs(n1 / 10));
        });

        sub.on(`autoThrustTLA${this.props.engine}`).whenChanged().handle((tla) => {
            this.throttle.set(Math.max(Math.min(tla, 110), 20) / 10);
        });
    }

    render(): VNode {
        const gaugeMin = 1.6;
        const gaugeMax = 11;
        const gaugeRadius = 66;

        return (
            <Layer x={this.props.x} y={this.props.y}>
                <g visibility={this.inactiveVisibility}>
                    <GaugeComponent
                        x={0}
                        y={0}
                        radius={gaugeRadius}
                        startAngle={this.gaugeStartAngle}
                        endAngle={this.gaugeEndAngle}
                        class="GaugeComponent GaugeInactive"
                    />
                    <text class="Standard End Amber" x={48} y={46}>XX</text>
                </g>
                <g visibility={this.activeVisibility}>
                    <text class="Huge End Green" x={44} y={47}>{this.textN1Int}</text>
                    <text class="Large End Green" x={56} y={46}>.</text>
                    <text class="Standard End Green" x={72} y={46}>{this.textN1Fract}</text>

                    <GaugeComponent
                        x={0}
                        y={0}
                        radius={gaugeRadius}
                        startAngle={this.gaugeStartAngle}
                        endAngle={this.gaugeEndAngle}
                        class="GaugeComponent Gauge"
                    >
                        <GaugeComponent
                            x={0}
                            y={0}
                            radius={gaugeRadius}
                            startAngle={this.gaugeStartAngleRed}
                            endAngle={this.gaugeEndAngle}
                            class="GaugeComponent Gauge RedLine"
                        />

                        <GaugeMarkerComponent
                            x={0}
                            y={0}
                            value={Subject.create(2)}
                            min={gaugeMin}
                            max={gaugeMax}
                            radius={gaugeRadius}
                            startAngle={this.gaugeStartAngle}
                            endAngle={this.gaugeEndAngle}
                            class="GaugeText Gauge"
                            multiplierInner={0.9}
                        />
                        <GaugeMarkerComponent
                            value={Subject.create(5)}
                            x={0}
                            y={0}
                            min={gaugeMin}
                            max={gaugeMax}
                            radius={gaugeRadius}
                            startAngle={this.gaugeStartAngle}
                            endAngle={this.gaugeEndAngle}
                            class="GaugeText Gauge Medium"
                            textClass="Standard"
                            useCentralAlignmentBaseline={false}
                            showValue
                            textNudgeY={17}
                            textNudgeX={8}
                            multiplierInner={0.9}
                        />
                        <GaugeMarkerComponent
                            value={Subject.create(6)}
                            x={0}
                            y={0}
                            min={gaugeMin}
                            max={gaugeMax}
                            radius={gaugeRadius}
                            startAngle={this.gaugeStartAngle}
                            endAngle={this.gaugeEndAngle}
                            class="GaugeText Gauge"
                            multiplierInner={0.9}
                        />
                        <GaugeMarkerComponent
                            value={Subject.create(7)}
                            x={0}
                            y={0}
                            min={gaugeMin}
                            max={gaugeMax}
                            radius={gaugeRadius}
                            startAngle={this.gaugeStartAngle}
                            endAngle={this.gaugeEndAngle}
                            class="GaugeText Gauge"
                            multiplierInner={0.9}
                        />
                        <GaugeMarkerComponent
                            value={Subject.create(8)}
                            x={0}
                            y={0}
                            min={gaugeMin}
                            max={gaugeMax}
                            radius={gaugeRadius}
                            startAngle={this.gaugeStartAngle}
                            endAngle={this.gaugeEndAngle}
                            class="GaugeText Gauge"
                            multiplierInner={0.9}
                        />
                        <GaugeMarkerComponent
                            value={Subject.create(9)}
                            x={0}
                            y={0}
                            min={gaugeMin}
                            max={gaugeMax}
                            radius={gaugeRadius}
                            startAngle={this.gaugeStartAngle}
                            endAngle={this.gaugeEndAngle}
                            class="GaugeText Gauge"
                            multiplierInner={0.9}
                        />
                        <GaugeMarkerComponent
                            value={Subject.create(10)}
                            x={0}
                            y={0}
                            min={gaugeMin}
                            max={gaugeMax}
                            radius={gaugeRadius}
                            startAngle={this.gaugeStartAngle}
                            endAngle={this.gaugeEndAngle}
                            class="GaugeText Gauge Medium"
                            textClass="Standard"
                            useCentralAlignmentBaseline={false}
                            showValue
                            textNudgeY={15}
                            textNudgeX={-28}
                            multiplierInner={0.9}
                        />
                        <GaugeMarkerComponent
                            value={Subject.create(11)}
                            x={0}
                            y={0}
                            min={gaugeMin}
                            max={gaugeMax}
                            radius={gaugeRadius}
                            startAngle={this.gaugeStartAngle}
                            endAngle={this.gaugeEndAngle}
                            class="GaugeText Gauge RedLine"
                            multiplierInner={0.9}
                        />

                        <GaugeMarkerComponent
                            value={this.gaugeN1}
                            x={0}
                            y={0}
                            min={gaugeMin}
                            max={gaugeMax}
                            radius={gaugeRadius}
                            startAngle={this.gaugeStartAngle}
                            endAngle={this.gaugeEndAngle}
                            class="GaugeIndicator Gauge"
                            indicator
                            roundLinecap
                        />
                    </GaugeComponent>
                </g>
            </Layer>
        );
    }
}

export class EPR extends DisplayComponent<N1Props> {
    private inactiveVisibility = Subject.create('hidden');

    private activeVisibility = Subject.create('hidden');

    private textEprInt = Subject.create('');

    private textEprFract = Subject.create('');

    private readonly gaugeStartAngle = Subject.create(220);

    private readonly gaugeEndAngle = Subject.create(100);

    private gaugeEprLimit = Subject.create(0);

    private gaugeEpr = Subject.create(0);

    private throttle = Subject.create(0);

    onAfterRender(node: VNode): void {
        super.onAfterRender(node);

        const sub = this.props.bus.getSubscriber<EwdSimvars>();

        sub.on(`engine${this.props.engine}Fadec`).whenChanged().handle((f) => {
            this.inactiveVisibility.set(f ? 'hidden' : 'visible');
            this.activeVisibility.set(f ? 'visible' : 'hidden');
        });

        sub.on(`engine${this.props.engine}N1`).whenChanged().handle((n1) => {
            const eprVal = Math.max(getEprFromN1Value(n1), 1);
            const n1Parts = eprVal.toFixed(3).split('.', 2);
            this.textEprInt.set(n1Parts[0]);
            this.textEprFract.set(n1Parts[1]);

            this.gaugeEpr.set(Math.min(eprVal, 1.60));
        });

        sub.on('autoThrustLimitToga').whenChanged().handle((n1) => {
            const eprVal = getEprFromN1Value(n1);
            this.gaugeEprLimit.set(Math.abs(eprVal));
        });

        sub.on(`autoThrustTLA${this.props.engine}`).whenChanged().handle((tla) => {
            const eprVal = getEprFromN1Value(tla);
            this.throttle.set(Math.max(Math.min(eprVal, 1.60), 1));
        });
    }

    render(): VNode {
        const gaugeMin = 0.97;
        const gaugeMax = 1.65;
        const gaugeRadius = 66;

        //#main-elec text.Small {
        //   font-size: 16.875px;
        // }

        return (
            <Layer x={this.props.x} y={this.props.y}>
                <g visibility={this.inactiveVisibility}>
                    <GaugeComponent
                        x={0}
                        y={0}
                        radius={gaugeRadius}
                        startAngle={this.gaugeStartAngle}
                        endAngle={this.gaugeEndAngle}
                        class="GaugeComponent GaugeInactive"
                    />
                    <AvailRev bus={this.props.bus} engine={this.props.engine} />
                    <text class="Standard End Amber" x={48} y={46}>XX</text>
                </g>
                <g visibility={this.activeVisibility}>
                    <text class="Huge End Green" x={21} y={47}>{this.textEprInt}</text>
                    <text class="Large End Green" x={30} y={46}>.</text>
                    <text class="Standard End Green" x={72} y={46}>{this.textEprFract}</text>

                    <GaugeComponent
                        x={0}
                        y={0}
                        radius={gaugeRadius}
                        startAngle={this.gaugeStartAngle}
                        endAngle={this.gaugeEndAngle}
                        class="GaugeComponent Gauge"
                    >
                        <rect x={-10} y={18} width={90} height={34} class="DarkGreyBox" />

                        <GaugeMarkerComponent
                            x={0}
                            y={0}
                            value={Subject.create(1.0)}
                            min={gaugeMin}
                            max={gaugeMax}
                            radius={gaugeRadius}
                            startAngle={this.gaugeStartAngle}
                            endAngle={this.gaugeEndAngle}
                            class="GaugeText Gauge Medium"
                            textClass="Small"
                            useCentralAlignmentBaseline={false}
                            showValue
                            textNudgeY={1}
                            textNudgeX={6}
                            multiplierInner={0.9}
                        />
                        <GaugeMarkerComponent
                            x={0}
                            y={0}
                            value={Subject.create(1.1)}
                            min={gaugeMin}
                            max={gaugeMax}
                            radius={gaugeRadius}
                            startAngle={this.gaugeStartAngle}
                            endAngle={this.gaugeEndAngle}
                            class="GaugeText Gauge"
                            multiplierInner={0.9}
                        />
                        <GaugeMarkerComponent
                            value={Subject.create(1.2)}
                            x={0}
                            y={0}
                            min={gaugeMin}
                            max={gaugeMax}
                            radius={gaugeRadius}
                            startAngle={this.gaugeStartAngle}
                            endAngle={this.gaugeEndAngle}
                            class="GaugeText Gauge Medium"
                            textClass="Small"
                            useCentralAlignmentBaseline={false}
                            showValue
                            textNudgeY={18}
                            textNudgeX={1}
                            multiplierInner={0.9}
                        />
                        <GaugeMarkerComponent
                            value={Subject.create(1.3)}
                            x={0}
                            y={0}
                            min={gaugeMin}
                            max={gaugeMax}
                            radius={gaugeRadius}
                            startAngle={this.gaugeStartAngle}
                            endAngle={this.gaugeEndAngle}
                            class="GaugeText Gauge"
                            multiplierInner={0.9}
                        />
                        <GaugeMarkerComponent
                            value={Subject.create(1.4)}
                            x={0}
                            y={0}
                            min={gaugeMin}
                            max={gaugeMax}
                            radius={gaugeRadius}
                            startAngle={this.gaugeStartAngle}
                            endAngle={this.gaugeEndAngle}
                            class="GaugeText Gauge Medium"
                            textClass="Small"
                            useCentralAlignmentBaseline={false}
                            showValue
                            textNudgeY={20}
                            textNudgeX={-21}
                            multiplierInner={0.9}
                        />
                        <GaugeMarkerComponent
                            value={Subject.create(1.5)}
                            x={0}
                            y={0}
                            min={gaugeMin}
                            max={gaugeMax}
                            radius={gaugeRadius}
                            startAngle={this.gaugeStartAngle}
                            endAngle={this.gaugeEndAngle}
                            class="GaugeText Gauge"
                            multiplierInner={0.9}
                        />
                        <GaugeMarkerComponent
                            value={Subject.create(1.6)}
                            x={0}
                            y={0}
                            min={gaugeMin}
                            max={gaugeMax}
                            radius={gaugeRadius}
                            startAngle={this.gaugeStartAngle}
                            endAngle={this.gaugeEndAngle}
                            class="GaugeText Gauge Medium"
                            textClass="Small"
                            useCentralAlignmentBaseline={false}
                            showValue
                            textNudgeY={6}
                            textNudgeX={-36}
                            multiplierInner={0.9}
                        />

                        <GaugeMarkerComponent
                            value={this.gaugeEprLimit}
                            x={0}
                            y={0}
                            min={gaugeMin}
                            max={gaugeMax}
                            radius={gaugeRadius}
                            startAngle={this.gaugeStartAngle}
                            endAngle={this.gaugeEndAngle}
                            class="GaugeThrustLimitIndicator Gauge"
                        />
                        <GaugeMaxComponent
                            value={this.gaugeEprLimit}
                            x={0}
                            y={0}
                            min={gaugeMin}
                            max={gaugeMax}
                            radius={gaugeRadius}
                            startAngle={this.gaugeStartAngle}
                            endAngle={this.gaugeEndAngle}
                            class="GaugeThrustLimitIndicatorFill Gauge"
                        />
                        <GaugeMarkerComponent
                            value={this.gaugeEpr}
                            x={0}
                            y={0}
                            min={gaugeMin}
                            max={gaugeMax}
                            radius={gaugeRadius}
                            startAngle={this.gaugeStartAngle}
                            endAngle={this.gaugeEndAngle}
                            class="GaugeIndicator Gauge"
                            indicator
                            roundLinecap
                        />

                        <AvailRev bus={this.props.bus} engine={this.props.engine} />

                        <N1CommandAndTrend
                            bus={this.props.bus}
                            engine={this.props.engine}
                            min={gaugeMin}
                            max={gaugeMax}
                            radius={gaugeRadius}
                            startAngle={this.gaugeStartAngle}
                            endAngle={this.gaugeEndAngle}
                            gaugeEpr={this.gaugeEpr}
                        />
                    </GaugeComponent>

                    <ThrottlePositionDonutComponent
                        value={this.throttle}
                        x={0}
                        y={0}
                        min={gaugeMin}
                        max={gaugeMax}
                        radius={gaugeRadius * 1.03}
                        startAngle={this.gaugeStartAngle}
                        endAngle={this.gaugeEndAngle}
                        class="DonutThrottleIndicator"
                    />
                </g>
            </Layer>
        );
    }
}