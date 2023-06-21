import { ExecTask, TaskOfTasks } from "@flybywiresim/igniter";
import * as A321EC from "./build-a321EC/src/systems/instruments/buildSrc/igniter/tasks.mjs";

export default new TaskOfTasks("all", [
    new TaskOfTasks("A321EC", [
        // Prepare the out folder and any other pre tasks.
        // Currently, these can be run in parallel but in the future, we may need to run them in sequence if there are any dependencies.
        new TaskOfTasks("preparation", [
            //new ExecTask("copy-base-files", "npm run build-a321EC:copy-base-files"),
            new TaskOfTasks("localization", [
                new ExecTask("efb-translation", "npm run build-a321EC:efb-translation"),
                new ExecTask("locPak-translation", "npm run build-a321EC:locPak-translation")
            ], true),
        ], false),

        new TaskOfTasks("A321EC", [
            // Group all typescript and react build tasks together.
            new TaskOfTasks("build", [
                new ExecTask("model",
                    "npm run build-a321EC:model",
                    [
                        "build-a321EC/src/model",
                        "build-a321EC/out/qbitsim-aircraft-a321-251/SimObjects/Airplanes/qbitsim-aircraft-a321-251/model"
                    ]),
                new ExecTask("behavior",
                    "npm run build-a321EC:behavior",
                    [
                        "build-a321EC/src/behavior",
                        "build-a321EC/out/qbitsim-aircraft-a321-251/ModelBehaviorDefs/A321EC/generated"
                    ]),
                new TaskOfTasks('atsu', [
                    new ExecTask(
                        'common',
                        'npm run build-a321EC:atsu-common',
                        [
                            'build-a321EC/src/systems/atsu/common',
                            'build-a321EC/out/qbitsim-aircraft-a321-251/html_ui/JS/A321EC/atsu/common.js'
                        ]
                    ),
                    new ExecTask(
                        'fmsclient',
                        'npm run build-a321EC:atsu-fms-client',
                        [
                            'build-a321EC/src/systems/atsu/common',
                            'build-a321EC/src/systems/atsu/fmsclient',
                            'build-a321EC/out/qbitsim-aircraft-a321-251/html_ui/JS/A321EC/atsu/fmsclient.js'
                        ]
                    ),
                ]),
                new ExecTask(
                    'extras-host',
                    'npm run build-a321EC:extras-host',
                    [
                        'build-a321EC/src/systems/extras-host',
                        'build-a321EC/out/qbitsim-aircraft-a321-251/html_ui/Pages/VCockpit/Instruments/A321EC/ExtrasHost'
                    ]
                ),
                new ExecTask("failures",
                    "npm run build-a321EC:failures",
                    [
                        "build-a321EC/src/systems/failures",
                        "build-a321EC/out/qbitsim-aircraft-a321-251/html_ui/A321EC_JS/failures/failures.js"
                    ]),
                new ExecTask("fmgc",
                    "npm run build-a321EC:fmgc",
                    [
                        "build-a321EC/src/systems/fmgc",
                        "build-a321EC/out/qbitsim-aircraft-a321-251/html_ui/A321EC_JS/fmgc"
                    ]),
                new ExecTask("sentry-client",
                    "npm run build-a321EC:sentry-client",
                    [
                        "build-a321EC/src/systems/sentry-client",
                        "build-a321EC/out/qbitsim-aircraft-a321-251/html_ui/A321EC_JS/sentry-client"
                    ]),
                new ExecTask("simbridge-client",
                    "npm run build-a321EC:simbridge-client",
                    [
                        "build-a321EC/src/systems/simbridge-client",
                        "build-a321EC/out/qbitsim-aircraft-a321-251/html_ui/A321EC_JS/simbridge-client"
                    ]),
                new ExecTask(
                    'systems-host',
                    'npm run build-a321EC:systems-host',
                    [
                        'build-a321EC/src/systems/systems-host',
                        'build-common/src/systems/datalink',
                        'build-a321EC/out/qbitsim-aircraft-a321-251/html_ui/Pages/VCockpit/Instruments/A321EC/SystemsHost'
                    ]
                ),
                new ExecTask("tcas",
                    "npm run build-a321EC:tcas",
                    [
                        "build-a321EC/src/systems/tcas",
                        "build-a321EC/out/qbitsim-aircraft-a321-251/html_ui/A321EC_JS/tcas"
                    ]),

                new TaskOfTasks("instruments", A321EC.getInstrumentsIgniterTasks(), true),
            ], true),

            // Group all WASM build tasks together but separate from the rest of the tasks as build run more stable like this.
            new TaskOfTasks("wasm", [
                new ExecTask("systems",
                    "npm run build-a321EC:systems",
                    [
                        "build-a321EC/src/wasm/systems",
                        "build-common/src/wasm/systems",
                        "Cargo.lock",
                        "Cargo.toml",
                        "build-a321EC/out/qbitsim-aircraft-a321-251/SimObjects/Airplanes/qbitsim-aircraft-a321-251/panel/systems.wasm"
                    ]),
                new ExecTask("systems-fadec",
                    "npm run build-a321EC:fadec",
                    [
                        "build-a321EC/src/wasm/fadec_a320",
                        "build-common/src/wasm/fbw_common",
                        "build-common/src/wasm/fadec_common",
                        "build-a321EC/out/qbitsim-aircraft-a321-251/SimObjects/Airplanes/qbitsim-aircraft-a321-251/panel/fadec.wasm"
                    ]),
                new ExecTask("systems-fbw",
                    "npm run build-a321EC:fbw",
                    [
                        "build-a321EC/src/wasm/fbw_a320",
                        "build-common/src/wasm/fbw_common",
                        "build-a321EC/out/qbitsim-aircraft-a321-251/SimObjects/Airplanes/qbitsim-aircraft-a321-251/panel/fbw.wasm"
                    ]),
                new ExecTask("systems-terronnd", [
                    "build-common/src/wasm/terronnd/build.sh",
                    "wasm-opt -O1 -o build-a321EC/out/qbitsim-aircraft-a321-251/SimObjects/Airplanes/qbitsim-aircraft-a321-251/panel/terronnd.wasm build-common/src/wasm/terronnd/out/terronnd.wasm"
                ], [
                    "build-common/src/wasm/terronnd",
                    "build-a321EC/out/qbitsim-aircraft-a321-251/SimObjects/Airplanes/qbitsim-aircraft-a321-251/panel/terronnd.wasm",
                    "build-common/src/wasm/terronnd/out/terronnd.wasm",
                ]),
                new ExecTask("flypad-backend",
                    "npm run build-a321EC:flypad-backend",
                    [
                        "build-a321EC/src/wasm/flypad-backend",
                        "build-common/src/wasm/fbw_common",
                        "build-a321EC/out/qbitsim-aircraft-a321-251/SimObjects/Airplanes/qbitsim-aircraft-a321-251/panel/flypad-backend.wasm"
                    ])
            ], true),
        ]),

        // Create final package meta files.
        new TaskOfTasks("dist", [
            new ExecTask("metadata", "npm run build-a321EC:metadata"),
            new ExecTask("manifests", "npm run build-a321EC:manifest")
        ])
    ]),
]);