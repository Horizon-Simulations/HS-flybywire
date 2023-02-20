import React from 'react';
import { toNumber, last } from 'lodash';
import { t } from '../../translation';
import { TODCalculator } from '../../Service/TODCalculator';
import Card from '../../UtilComponents/Card/Card';
import { TOD_CALCULATION_TYPE } from '../../Enum/TODCalculationType';
import { useAppSelector } from '../../Store/store';

export const Result = ({ className }: {className: string}) => {
    const calculationInput = useAppSelector((state) => state.todCalculator.calculation.input) ?? 0;
    const calculationType = useAppSelector((state) => state.todCalculator.calculation.type) ?? TOD_CALCULATION_TYPE.DISTANCE;
    const targetAltitude = useAppSelector((state) => state.todCalculator.targetAltitude) ?? 0;
    const groundSpeed = useAppSelector((state) => state.todCalculator.groundSpeed) ?? [];
    const currentAltitude = useAppSelector((state) => state.todCalculator.currentAltitude) ?? 0;

    const todCalculator = new TODCalculator(toNumber(currentAltitude), toNumber(targetAltitude), groundSpeed);
    const currentGroundSpeed = last(groundSpeed).groundSpeed;

    if (calculationType === undefined || calculationType === null) {
        return null;
    }

    const results = ({
        [TOD_CALCULATION_TYPE.DISTANCE]: [
            {
                headerText: `${t('Performance.TopOfDescent.Result.DesiredVerticalSpeed')}`,
                footerText: '',
                unit: `${t('Performance.TopOfDescent.Data.UnitFtMin')}`,
                calculate: () => Math.round(todCalculator.calculateVS(calculationInput)),
            },
            {
                headerText: `${t('Performance.TopOfDescent.Result.DesiredDescentAngle')}`,
                footerText: '',
                unit: `${t('Performance.TopOfDescent.Data.UnitAngleDegrees')}`,
                calculate: () => -Math.round(todCalculator.calculateDegree(calculationInput)),
            },
        ],
        [TOD_CALCULATION_TYPE.VERTICAL_SPEED]: [
            {
                headerText: `${t('Performance.TopOfDescent.Result.StartYourDescentAbout')}`,
                footerText: `${t('Performance.TopOfDescent.Result.BeforeTarget')}`,
                unit: 'NM',
                calculate: () => Math.round(todCalculator.calculateDistance(Math.abs(calculationInput), 'FTM')),
            },
        ],
        [TOD_CALCULATION_TYPE.FLIGHT_PATH_ANGLE]: [
            {
                headerText: `${t('Performance.TopOfDescent.Result.StartYourDescentAbout')}`,
                footerText: `${t('Performance.TopOfDescent.Result.BeforeTarget')}`,
                unit: 'NM',
                calculate: () => Math.round(todCalculator.calculateDistance(Math.abs(calculationInput), 'DEGREE')),
            },
        ],
    }[calculationType]);

    const inputDataValid = targetAltitude
        && currentAltitude
        && (targetAltitude < currentAltitude)
        && targetAltitude >= 0
        && calculationInput
        && currentGroundSpeed > 0;

    const calculationValid = (value) => !Number.isNaN(value) && Number.isFinite(value);

    const calculations = results.map(({ calculate }) => calculate());
    const validCalculations = calculations.filter((value) => calculationValid(value));

    if (!inputDataValid && !validCalculations.length) return null;

    return (
        <Card title={t('Performance.TopOfDescent.Result.Title')} childrenContainerClassName="flex-1 flex flex-col justify-center px-0" className={className}>
            {results.map(({ headerText, footerText, calculate, unit }) => {
                const calculation = calculate();

                if (calculationValid(calculation)) {
                    return (
                        <div
                            key={headerText}
                            className="flex flex-col justify-center items-center mb-10 last:mb-0"
                        >
                            <h1 className="mb-4 text-2xl font-medium text-center">{headerText}</h1>

                            <span className="text-6xl whitespace-nowrap">
                                {calculation}
                            </span>
                            <span className="text-2xl whitespace-nowrap">
                                {unit}
                            </span>

                            {!!footerText && <span className="mt-4 text-2xl font-medium ">{footerText}</span>}
                        </div>
                    );
                }

                return <></>;
            })}
        </Card>
    );
};
