'use strict';

const esbuild = require('esbuild');
const path = require('path');
const { createModuleBuild } = require('#build-utils');

const outFile = 'build-a320ceo/out/lvfr-horizonsim-airbus-a320-ceo/html_ui/JS/A320HS/atsu/fmsclient.js';

esbuild.build(createModuleBuild ('build-a320ceo', 'AtsuFmsClient', path.join(__dirname, 'src/index.ts'), outFile, __dirname));