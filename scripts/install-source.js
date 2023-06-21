require('dotenv').config();
const fs = require('fs-extra');

const source = process.env.BUILD_DIR_NAME ? 'external/a318HS/' + process.env.BUILD_DIR_NAME : 'external/a318HS';
console.log('installManifest source is: ' + source);

const installManifest = fs.readJSONSync('./a318HS/out/horizonsim-lvfr-airbus-a318-ceo/install.json');
installManifest.source = source;
fs.writeJSONSync('./build-a318ceo/out/horizonsim-lvfr-airbus-a318-ceo/install.json', installManifest);
