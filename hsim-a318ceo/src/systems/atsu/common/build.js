'use strict';

const esbuild = require('esbuild');
const path = require('path');
const { createModuleBuild } = require('#build-utils');

const rootDir = path.join(__dirname, '..', '..', '..', '..', '..');
const outFile = 'build-a318ceo/out/lvfr-horizonsim-airbus-a318-ceo/html_ui/JS/A318HS/atsu/common.js';
const srcDir = 'fbw-common/src/systems/datalink/common';

esbuild.build(createModuleBuild('build-a318ceo', 'AtsuCommon', path.join(rootDir, srcDir, '/src/index.ts'), outFile, path.join(rootDir, srcDir)));
