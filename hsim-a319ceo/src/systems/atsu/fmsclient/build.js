'use strict';

const esbuild = require('esbuild');
const path = require('path');
const { esbuildModuleBuild } = require('#build-utils');

const outFile = 'build-a319ceo/out/lvfr-horizonsim-airbus-a319-ceo/html_ui/JS/A319HS/atsu/fmsclient.js';

esbuild.build(esbuildModuleBuild('build-a319ceo', 'AtsuFmsClient', path.join(__dirname, 'src/index.ts'), outFile));