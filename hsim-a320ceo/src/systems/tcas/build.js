// Copyright (c) 2021-2023 FlyByWire Simulations
//
// SPDX-License-Identifier: GPL-3.0

'use strict';

const esbuild = require('esbuild');
const path = require('path');
const { esbuildModuleBuild } = require('#build-utils');

const outFile = 'build-a320ceo/out/lvfr-horizonsim-airbus-a320-ceo/html_ui/JS/A320HS/tcas/tcas.js';

esbuild.build(esbuildModuleBuild('build-a320ceo', undefined, path.join(__dirname, 'src/index.ts'), outFile));
