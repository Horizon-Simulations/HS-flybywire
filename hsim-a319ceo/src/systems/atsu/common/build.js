'use strict';

const esbuild = require('esbuild');
const path = require('path');
const { esbuildModuleBuild } = require('#build-utils');

const rootDir = path.join(__dirname, '..', '..', '..', '..');
const outFile = 'build-a319ceo/out/lvfr-horizonsim-airbus-a319-ceo/html_ui/JS/A319HS/atsu/common.js';

esbuild.build(esbuildModuleBuild('build-a319ceo', 'AtsuCommon', path.join(rootDir, '../fbw-common/src/systems/datalink/common/src/index.ts'), outFile));
