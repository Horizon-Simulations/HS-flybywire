'use strict';

const esbuild = require('esbuild');
const path = require('path');
const { createModuleBuild } = require('#build-utils');

const outFile = 'build-a318ceo/out/lvfr-horizonsim-airbus-a318-ceo/html_ui/JS/A318HS/atsu/fmsclient.js';

esbuild.build(createModuleBuild ('build-a318ceo', 'AtsuFmsClient', path.join(__dirname, '/src/index.ts'), outFile, __dirname));