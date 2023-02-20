'use strict';

import ts from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import scss from 'rollup-plugin-scss';

const { join } = require('path');

const root = join(__dirname, '..', '..', '..', '..', '..', '..');

export default {
    input: join(__dirname, 'instrument.tsx'),
    output: {
        file: join(root, 'fbw-a32nx/out/flybywire-aircraft-a320-neo/html_ui/Pages/VCockpit/Instruments/A32NX/Clock/instrument.js'),
        format: 'es',
    },
    plugins: [
        scss({ output: join(root, 'fbw-a32nx/out/flybywire-aircraft-a320-neo/html_ui/Pages/VCockpit/Instruments/A32NX/Clock/clock.css') }),
        resolve(),
        ts(),
    ],
};
