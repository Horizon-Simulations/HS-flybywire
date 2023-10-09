// Copyright (c) 2021-2023 FlyByWire Simulations
//
// SPDX-License-Identifier: GPL-3.0

'use strict';

const esbuild = require('esbuild');
const path = require('path');
const { createModuleBuild  } = require('#build-utils');

const outFile = 'build-a319ceo/out/lvfr-horizonsim-airbus-a319-ceo/html_ui/JS/A319HS/simbridge-client/simbridge-client.js';

esbuild.build(createModuleBuild('build-a319ceo', 'SimBridgeClient', path.join(__dirname, 'src/index.ts'), outFile, __dirname));
