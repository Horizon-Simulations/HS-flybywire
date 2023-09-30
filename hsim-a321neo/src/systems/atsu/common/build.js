'use strict';

const esbuild = require('esbuild');
const path = require('path');
const { esbuildModuleBuild } = require('#build-utils');

const rootDir = path.join(__dirname, '..', '..', '..', '..');
const outFile = 'build-a321neo/out/lvfr-horizonsim-airbus-a321-neo/html_ui/JS/A21NHS/atsu/common.js';

esbuild.build(esbuildModuleBuild('build-a321neo', 'AtsuCommon', path.join(rootDir, '../fbw-common/src/systems/datalink/common/src/index.ts'), outFile));
