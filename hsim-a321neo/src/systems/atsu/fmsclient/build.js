'use strict';

const esbuild = require('esbuild');
const path = require('path');
const { esbuildModuleBuild } = require('#build-utils');

const outFile = 'build-a321neo/out/lvfr-horizonsim-airbus-a321-neo/html_ui/JS/A21NHS/atsu/fmsclient.js';

esbuild.build(esbuildModuleBuild('build-a321neo', 'AtsuFmsClient', path.join(__dirname, 'src/index.ts'), outFile));