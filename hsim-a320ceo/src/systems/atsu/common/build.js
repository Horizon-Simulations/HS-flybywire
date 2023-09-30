'use strict';

const esbuild = require('esbuild');
const path = require('path');
const { esbuildModuleBuild } = require('#build-utils');

const rootDir = path.join(__dirname, '..', '..', '..', '..');
const outFile = 'build-a320ceo/out/lvfr-horizonsim-airbus-a320-ceo/html_ui/JS/A320HS/atsu/common.js';

esbuild.build(esbuildModuleBuild('build-a320ceo', 'AtsuCommon', path.join(rootDir, '../fbw-common/src/systems/datalink/common/src/index.ts'), outFile));
