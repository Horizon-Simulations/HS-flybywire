require('dotenv').config();
const fs = require('fs-extra');

const source = process.env.BUILD_DIR_NAME ? 'external/a319ceo/' + process.env.BUILD_DIR_NAME : 'external/a319ceo';
console.log('installManifest source is: ' + source);

const installManifest = fs.readJSONSync('./build-a319ceo/out/lvfr-horizonsim-airbus-a319-ceo/install.json');
installManifest.source = source;
fs.writeJSONSync('./build-a319ceo/out/lvfr-horizonsim-airbus-a319-ceo/install.json', installManifest);