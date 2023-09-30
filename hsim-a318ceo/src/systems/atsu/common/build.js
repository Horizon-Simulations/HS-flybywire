'use strict';

const esbuild = require('esbuild');
const path = require('path');
const { esbuildModuleBuild } = require('#build-utils');

const rootDir = path.join(__dirname, '..', '..', '..', '..');
const outFile = 'build-a318ceo/out/lvfr-horizonsim-airbus-a318-ceo/html_ui/JS/A318HS/atsu/common.js';

esbuild.build(esbuildModuleBuild('build-a318ceo', 'AtsuCommon', path.join(rootDir, '../fbw-common/src/systems/datalink/common/src/index.ts'), outFile));
