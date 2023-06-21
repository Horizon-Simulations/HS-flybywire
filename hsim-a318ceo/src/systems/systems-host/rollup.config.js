'use strict';

import ts from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

const { join } = require('path');

const root = join(__dirname, '..', '..', '..', '..');
console.log('Root: ', root);

export default {
    input: join(__dirname, 'index.tsx'),
    output: {
        dir: join(root, 'build-a318ceo/out/horizonsim-lvfr-airbus-a318-ceo/html_ui/Pages/VCockpit/Instruments/A318HS/SystemsHost'),
        format: 'es',
    },
    plugins: [
        resolve({ browser: true }),
        commonjs({ include: /node_modules/ }),
        json(),
        ts(),
    ],
};
