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
                name: 'A318ceoCFM_Textures',
                sourceDir: './SimObjects/Airplanes/A318ceoCFM/texture'
            }, {
                name: 'A318ceoCFM_TextureAFR',
                sourceDir: './SimObjects/Airplanes/A318ceoCFM/texture.AFR'
            }, {
                name: 'A318ceoCFM_TextureAFR2',
                sourceDir: './SimObjects/Airplanes/A318ceoCFM/texture.AFR2'
            }, {
                name: 'A318ceoCFM_TextureAVA',
                sourceDir: './SimObjects/Airplanes/A318ceoCFM/texture.AVA'
            }, {
                name: 'A318ceoCFM_TextureEWG',
                sourceDir: './SimObjects/Airplanes/A318ceoCFM/texture.EWG'
            }, {
                name: 'A318ceoCFM_TextureFFT1',
                sourceDir: './SimObjects/Airplanes/A318ceoCFM/texture.FFT1'
            }, {
                name: 'A318ceoCFM_TextureFFT2',
                sourceDir: './SimObjects/Airplanes/A318ceoCFM/texture.FFT2'
            }, {
                name: 'A318ceoCFM_TextureFFT3',
                sourceDir: './SimObjects/Airplanes/A318ceoCFM/texture.FFT3'
            }, {
                name: 'A318ceoCFM_TextureFFT4',
                sourceDir: './SimObjects/Airplanes/A318ceoCFM/texture.FFT4'
            }, {
                name: 'A318ceoCFM_TextureGWI',
                sourceDir: './SimObjects/Airplanes/A318ceoCFM/texture.GWI'
            }, {
                name: 'A318ceoCFM_TextureIBE',
                sourceDir: './SimObjects/Airplanes/A318ceoCFM/texture.IBE'
            }, {
                name: 'A318ceoCFM_TextureLAN',
                sourceDir: './SimObjects/Airplanes/A318ceoCFM/texture.LAN'
            }, {
                name: 'A318ceoCFM_TextureMXA',
                sourceDir: './SimObjects/Airplanes/A318ceoCFM/texture.MXA'
            }, {
                name: 'A318ceoCFM_TextureNWA',
                sourceDir: './SimObjects/Airplanes/A318ceoCFM/texture.NWA'
            }, {
                name: 'A318ceoCFM_TextureROT',
                sourceDir: './SimObjects/Airplanes/A318ceoCFM/texture.ROT'
            }, {
                name: 'A318ceoCFM_TextureSAB',
                sourceDir: './SimObjects/Airplanes/A318ceoCFM/texture.SAB'
            }, {
                name: 'A318ceoCFM_TextureSWR',
                sourceDir: './SimObjects/Airplanes/A318ceoCFM/texture.SWR'
            }, {
                name: 'A318ceoCFM_TextureTWA',
                sourceDir: './SimObjects/Airplanes/A318ceoCFM/texture.TWA'
            }, {
                name: 'A318ceoCFM_TextureUAL',
                sourceDir: './SimObjects/Airplanes/A318ceoCFM/texture.UAL'
            }, {
                name: 'A318ceoCFM_TextureUSA',
                sourceDir: './SimObjects/Airplanes/A318ceoCFM/texture.USA'
            }, {
                name: 'A318ceoCFM_Sound',
                sourceDir: './SimObjects/Airplanes/A318ceoCFM/sound'
            }, {
                name: 'A318ceoCFM_Model',
                sourceDir: './SimObjects/Airplanes/A318ceoCFM/model'
            }, {
                name: 'A318ceoCFM_Panels',
                sourceDir: './SimObjects/Airplanes/A318ceoCFM/panel'
            }, {
                name: 'A318cjCFM_Textures',
                sourceDir: './SimObjects/Airplanes/A318cjCFM/texture'
            }, {
                name: 'A318cjCFM_TextureANK',
                sourceDir: './SimObjects/Airplanes/A318cjCFM/texture.ANK'
            }, {
                name: 'A318cjCFM_TextureAWC',
                sourceDir: './SimObjects/Airplanes/A318cjCFM/texture.AWC'
            }, {
                name: 'A318cjCFM_TextureBAW',
                sourceDir: './SimObjects/Airplanes/A318cjCFM/texture.BAW'
            }, {
                name: 'A318cjCFM_TextureCKH',
                sourceDir: './SimObjects/Airplanes/A318cjCFM/texture.CKH'
            }, {
                name: 'A318cjCFM_TextureCLJ',
                sourceDir: './SimObjects/Airplanes/A318cjCFM/texture.CLJ'
            }, {
                name: 'A318cjCFM_TextureGJU',
                sourceDir: './SimObjects/Airplanes/A318cjCFM/texture.GJU'
            }, {
                name: 'A318cjCFM_TextureMID',
                sourceDir: './SimObjects/Airplanes/A318cjCFM/texture.MID'
            }, {
                name: 'A318cjCFM_TextureSVA',
                sourceDir: './SimObjects/Airplanes/A318cjCFM/texture.SVA'
            }, {
                name: 'A318cjCFM_TextureUEC',
                sourceDir: './SimObjects/Airplanes/A318cjCFM/texture.UEC'
            }, {
                name: 'A318cjCFM_TextureYAL',
                sourceDir: './SimObjects/Airplanes/A318cjCFM/texture.YAL'
            }, {
                name: 'AA318cjCFM_TextureZLJ',
                sourceDir: './SimObjects/Airplanes/A318cjCFM/texture.ZLJ'
            }, {
                name: 'A318cjCFM_Sound',
                sourceDir: './SimObjects/Airplanes/A318cjCFM/sound'
            }, {
                name: 'A318cjCFM_Model',
                sourceDir: './SimObjects/Airplanes/A318cjCFM/model'
            }, {
                name: 'A318cjCFM_ModelBAW',
                sourceDir: './SimObjects/Airplanes/A318cjCFM/model.BAW'
            }, {
                name: 'A318cjCFM_ModelMID',
                sourceDir: './SimObjects/Airplanes/A318cjCFM/model.MID'
            }, {
                name: 'A318cjCFM_Panel',
                sourceDir: './SimObjects/Airplanes/A318cjCFM/panel'
            }, {
                name: 'A318cjCFM_PanelBAW',
                sourceDir: './SimObjects/Airplanes/A318cjCFM/panel.BAW'
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