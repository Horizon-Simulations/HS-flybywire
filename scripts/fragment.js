const fragmenter = require('@flybywiresim/fragmenter');
const fs = require('fs');

const execute = async () => {
    try {
        const result = await fragmenter.pack({
            packOptions: { splitFileSize: 102_760_448, keepCompleteModulesAfterSplit: false },
            baseDir: './build-a321EC/out/headwindsim-aircraft-a330-900',
            outDir: './build-a321EC/out/build-modules',
            modules: [{
                name: 'effects',
                sourceDir: './effects'
            }, {
                name: 'html_ui',
                sourceDir: './html_ui'
            }, {
                name: 'ModelBehaviorDefs',
                sourceDir: './ModelBehaviorDefs'
            }, {
                name: 'Textures',
                sourceDir: './SimObjects/Airplanes/qbitsim-aircraft-a321-251/texture'
            }, {
                name: 'TextureAIB',
                sourceDir: './SimObjects/Airplanes/qbitsim-aircraft-a321-251/texture.AIB'
            }, {
                name: 'Livery',
                sourceDir: './SimObjects/Airplanes/_Headwind_A330neo-LIVERY'
            }, {
                name: 'Sound',
                sourceDir: './SimObjects/Airplanes/qbitsim-aircraft-a321-251/sound'
            }, {
                name: 'Model',
                sourceDir: './SimObjects/Airplanes/qbitsim-aircraft-a321-251/model'
            }, {
                name: 'Panels',
                sourceDir: './SimObjects/Airplanes/qbitsim-aircraft-a321-251/panel'
            }, {
                name: 'ACJModel',
                sourceDir: './SimObjects/Airplanes/Headwind_ACJ330_900/model'
            }, {
                name: 'ACJPanel',
                sourceDir: './SimObjects/Airplanes/Headwind_ACJ330_900/panel'
            }, {
                name: 'ACJSound',
                sourceDir: './SimObjects/Airplanes/Headwind_ACJ330_900/sound'
            }, {
                name: 'ACJTextures',
                sourceDir: './SimObjects/Airplanes/Headwind_ACJ330_900/texture'
            }, {
                name: 'ContentInfo',
                sourceDir: './ContentInfo'
            }]
        });
        console.log(result);
        console.log(fs.readFileSync('./build-a321EC/out/build-modules/modules.json').toString());
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

execute();