require('dotenv').config();
const fs = require('fs-extra');

const source = process.env.BUILD_DIR_NAME ? 'external/a321EC/' + process.env.BUILD_DIR_NAME : 'external/a321EC';
console.log('installManifest source is: ' + source);

const installManifest = fs.readJSONSync('./a321EC/out/headwindsim-aircraft-a321-251N/install.json');
installManifest.source = source;
fs.writeJSONSync('./build-a321EC/out/headwindsim-aircraft-a321-251N/install.json', installManifest);
