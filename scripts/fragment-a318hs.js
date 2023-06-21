const fragmenter = require('@flybywiresim/fragmenter');
const fs = require('fs');

const execute = async () => {
    try {
        const result = await fragmenter.pack({
            packOptions: { splitFileSize: 102_760_448, keepCompleteModulesAfterSplit: false },
            baseDir: './build-a318ceo/out/lvfr-horizonsim-airbus-a318-ceo',
            outDir: './build-a318ceo/out/build-modules',
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
                sourceDir: './SimObjects/Airplanes/lvfr-horizonsim-airbus-a318-ceo/texture'
            }, {
                name: 'Sound',
                sourceDir: './SimObjects/Airplanes/lvfr-horizonsim-airbus-a318-ceo/sound'
            }, {
                name: 'Model',
                sourceDir: './SimObjects/Airplanes/lvfr-horizonsim-airbus-a318-ceo/model'
            }, {
                name: 'Panels',
                sourceDir: './SimObjects/Airplanes/lvfr-horizonsim-airbus-a318-ceo/panel'
            }, {
                name: 'ContentInfo',
                sourceDir: './ContentInfo'
            }]
        });
        console.log(result);
        console.log(fs.readFileSync('./build-a318ceo/out/build-modules/modules.json').toString());
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

execute();