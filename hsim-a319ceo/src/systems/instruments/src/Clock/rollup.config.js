'use strict';

import ts from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import scss from 'rollup-plugin-scss';

const { join } = require('path');

const root = join(__dirname, '..', '..', '..', '..', '..', '..');

export default {
    input: join(__dirname, 'instrument.tsx'),
    output: {
        file: join(root, 'build-A321EC/out/qbitsim-aircraft-a321-251/html_ui/Pages/VCockpit/Instruments/A321EC/Clock/instrument.js'),
        format: 'es',
    },
    plugins: [
        scss({ output: join(root, 'build-A321EC/out/qbitsim-aircraft-a321-251/html_ui/Pages/VCockpit/Instruments/A321EC/Clock/clock.css') }),
        resolve(),
        ts(),
    ],
};
