require('dotenv').config();
const fs = require('fs-extra');

const source = process.env.BUILD_DIR_NAME ? 'external/a320ceo/' + process.env.BUILD_DIR_NAME : 'external/a320ceo';
console.log('installManifest source is: ' + source);

const installManifest = fs.readJSONSync('./build-a320ceo/out/lvfr-horizonsim-airbus-a320-ceo/install.json');
installManifest.source = source;
fs.writeJSONSync('./build-a320ceo/out/lvfr-horizonsim-airbus-a320-ceo/install.json', installManifest);