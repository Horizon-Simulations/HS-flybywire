// Copyright (c) 2021-2023 FlyByWire Simulations
//
// SPDX-License-Identifier: GPL-3.0

'use strict';

const esbuild = require('esbuild');
const path = require('path');

require('dotenv').config();

const rootDir = path.join(__dirname, '..', '..', '..');
const outFile = 'out/lvfr-horizonsim-airbus-a321-neo/html_ui/JS/A21NHS/sentry-client/sentry-client.js';

const isProductionBuild = process.env.A32NX_PRODUCTION_BUILD === '1';

esbuild.build({
    absWorkingDir: __dirname,

    define: { 'DEBUG': 'false', 'process.env.SENTRY_DSN': `'${process.env.SENTRY_DSN}'` },

    entryPoints: ['src/index.ts'],
    bundle: true,
    treeShaking: false,
    minify: isProductionBuild,

    outfile: path.join(rootDir, outFile),

    format: 'iife',

    sourcemap: isProductionBuild ? 'linked' : undefined,

    // Target approximate CoherentGT WebKit version
    target: 'safari11',
});
