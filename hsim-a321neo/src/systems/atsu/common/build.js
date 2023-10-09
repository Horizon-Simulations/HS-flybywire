'use strict';

const esbuild = require('esbuild');
const path = require('path');
const { createModuleBuild } = require('#build-utils');

const rootDir = path.join(__dirname, '..', '..', '..', '..', '..');
const outFile = 'build-a321neo/out/lvfr-horizonsim-airbus-a321-neo/html_ui/JS/A21NHS/atsu/common.js';
const srcDir = 'fbw-common/src/systems/datalink/common';

esbuild.build(createModuleBuild('build-a321neo', 'AtsuCommon', path.join(rootDir, srcDir, '/src/index.ts'), outFile, path.join(rootDir, srcDir)));
