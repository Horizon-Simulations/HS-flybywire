require('dotenv').config();
const fs = require('fs-extra');

const source = process.env.BUILD_DIR_NAME ? 'external/a321neo/' + process.env.BUILD_DIR_NAME : 'external/a321neo';
console.log('installManifest source is: ' + source);

const installManifest = fs.readJSONSync('./build-a321neo/out/lvfr-horizonsim-airbus-a321-neo/install.json');
installManifest.source = source;
fs.writeJSONSync('./build-a321neo/out/lvfr-horizonsim-airbus-a321-neo/install.json', installManifest);