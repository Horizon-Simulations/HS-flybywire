import { ExecTask, TaskOfTasks } from "@flybywiresim/igniter";
import { getInstrumentsIgniterTasks } from "./build-a320ceo/src/systems/instruments/buildSrc/igniter/tasks.mjs";

export default new TaskOfTasks("all", [
    new TaskOfTasks("A320HS", [
        // Prepare the out folder and any other pre tasks.
        // Currently, these can be run in parallel but in the future, we may need to run them in sequence if there are any dependencies.
        new TaskOfTasks(
            "preparation",
            [
                //new ExecTask("copy-base-files", "npm run build-a320ceo:copy-base-files"),
                new ExecTask(
                    "copy-cargo-config",
                    "npm run build-a320ceo:copy-cargo-config"
                ),
                new ExecTask(
                    "copy-cmake-config",
                    "npm run build-a320ceo:copy-cmake-config"
                ),
                new TaskOfTasks(
                    "localization",
                    [
                        new ExecTask(
                            "efb-translation",
                            "npm run build-a320ceo:efb-translation"
                        ),
                        new ExecTask(
                            "locPak-translation",
                            "npm run build-a320ceo:locPak-translation"
                        ),
                    ],
                    true
                ),
            ],
            false
        ),

        // Group all typescript and react build tasks together.
        new TaskOfTasks(
            "build",
            [
                // new ExecTask("model", "npm run build-a320ceo:model", [
                //     "build-a320ceo/src/model",
                //     "build-a320ceo/out/horizonsim-airbus-a320-ceo/SimObjects/AirPlanes/Horizon_A320_214/model",
                // ]),
                new ExecTask("behavior", "npm run build-a320ceo:behavior", [
                    "build-a320ceo/src/behavior",
                    "build-a320ceo/out/horizonsim-airbus-a320-ceo/ModelBehaviorDefs/A320HS/generated",
                ]),

                new TaskOfTasks("atsu", [
                    new ExecTask(
                        "common",
                        "npm run build-a320ceo:atsu-common",
                        [
                            "build-a320ceo/src/systems/atsu/common",
                            "build-a320ceo/out/horizonsim-airbus-a320-ceo/html_ui/JS/A320HS/atsu/common.js",
                        ]
                    ),
                    new ExecTask(
                        "fmsclient",
                        "npm run build-a320ceo:atsu-fms-client",
                        [
                            "build-a320ceo/src/systems/atsu/common",
                            "build-a320ceo/src/systems/atsu/fmsclient",
                            "build-a320ceo/out/horizonsim-airbus-a320-ceo/html_ui/JS/A320HS/atsu/fmsclient.js",
                        ]
                    ),
                ]),
                new ExecTask(
                    "extras-host",
                    "npm run build-a320ceo:extras-host",
                    [
                        "build-a320ceo/src/systems/extras-host",
                        "build-a320ceo/out/horizonsim-airbus-a320-ceo/html_ui/Pages/VCockpit/Instruments/A320HS/ExtrasHost",
                    ]
                ),
                new ExecTask("failures", "npm run build-a320ceo:failures", [
                    "build-a320ceo/src/systems/failures",
                    "build-a320ceo/out/horizonsim-airbus-a320-ceo/html_ui/JS/A320HS/failures/failures.js",
                ]),
                new ExecTask("fmgc", "npm run build-a320ceo:fmgc", [
                    "build-a320ceo/src/systems/fmgc",
                    "build-a320ceo/out/horizonsim-airbus-a320-ceo/html_ui/JS/A320HS/fmgc",
                ]),
                new ExecTask("fmgcCFMSL", "npm run build-a320ceo:fmgcCFMSL", [
                    "build-a320ceo/src/systems/fmgcCFMSL",
                    "build-a320ceo/out/horizonsim-airbus-a320-ceo/html_ui/JS/A320HS/fmgc",
                ]),
                new ExecTask("fmgcIAE", "npm run build-a320ceo:fmgcIAE", [
                    "build-a320ceo/src/systems/fmgcIAE",
                    "build-a320ceo/out/horizonsim-airbus-a320-ceo/html_ui/JS/A320HS/fmgc",
                ]),
                new ExecTask("fmgcIAESL", "npm run build-a320ceo:fmgcIAESL", [
                    "build-a320ceo/src/systems/fmgcIAESL",
                    "build-a320ceo/out/horizonsim-airbus-a320-ceo/html_ui/JS/A320HS/fmgc",
                ]),
                new ExecTask(
                    "sentry-client",
                    "npm run build-a320ceo:sentry-client",
                    [
                        "build-a320ceo/src/systems/sentry-client",
                        "build-a320ceo/out/horizonsim-airbus-a320-ceo/html_ui/JS/A320HS/sentry-client",
                    ]
                ),
                new ExecTask(
                    "simbridge-client",
                    "npm run build-a320ceo:simbridge-client",
                    [
                        "build-a320ceo/src/systems/simbridge-client",
                        "build-a320ceo/out/horizonsim-airbus-a320-ceo/html_ui/JS/A320HS/simbridge-client",
                    ]
                ),
                new ExecTask(
                    "systems-host",
                    "npm run build-a320ceo:systems-host",
                    [
                        "build-a320ceo/src/systems/systems-host",
                        "fbw-common/src/systems/datalink",
                        "build-a320ceo/out/horizonsim-airbus-a320-ceo/html_ui/Pages/VCockpit/Instruments/A320HS/SystemsHost",
                    ]
                ),
                new ExecTask("tcas", "npm run build-a320ceo:tcas", [
                    "build-a320ceo/src/systems/tcas",
                    "build-a320ceo/out/horizonsim-airbus-a320-ceo/html_ui/JS/A320HS/tcas",
                ]),

                new TaskOfTasks(
                    "instruments",
                    getInstrumentsIgniterTasks(),
                    true
                ),
            ],
            true
        ),

        // Group all WASM build tasks together but separate from the rest of the tasks as build run more stable like this.
        new TaskOfTasks(
            "wasm",
            [
                new ExecTask("fadec-cfm", "npm run build-a320ceo:fadec-cfm", [
                    "build-a320ceo/src/wasm/fadec_a320cfm",
                    "fbw-common/src/wasm/fbw_common",
                    "fbw-common/src/wasm/fadec_common",
                    "build-a320ceo/out/horizonsim-airbus-a320-ceo/SimObjects/Airplanes/Horizon_A320_214/panel/fadec.wasm",
                ]),
                new ExecTask("fadec-iae", "npm run build-a320ceo:fadec-iae", [
                    "build-a320ceo/src/wasm/fadec_a320iae",
                    "fbw-common/src/wasm/fbw_common",
                    "fbw-common/src/wasm/fadec_common",
                    "build-a320ceo/out/horizonsim-airbus-a320-ceo/SimObjects/Airplanes/Horizon_A320_232/panel/fadec.wasm",
                ]),
                new ExecTask("fbw", "npm run build-a320ceo:fbw", [
                    "build-a320ceo/src/wasm/fbw_a320",
                    "fbw-common/src/wasm/fbw_common",
                    "build-a320ceo/out/horizonsim-airbus-a320-ceo/SimObjects/Airplanes/Horizon_A320_214/panel/fbw.wasm",
                ]),
                new ExecTask(
                    "systems-terronnd",
                    [
                        "npm run build-a320ceo:terronnd",
                    ],
                    [
                        "fbw-common/src/wasm/terronnd",
                        "build-a320ceo/out/horizonsim-airbus-a320-ceo/SimObjects/Airplanes/Horizon_A320_214/panel/terronnd.wasm",
                        "fbw-common/src/wasm/terronnd/out/terronnd.wasm",
                    ]
                ),
                new ExecTask(
                    "extra-backend-a32nx",
                    "npm run build-a320ceo:cpp-wasm-cmake",
                    [
                        'fbw-common/src/wasm/cpp-msfs-framework',
                        'fbw-common/src/wasm/extra-backend',
                        "build-a320ceo/src/wasm/extra-backend-a32nx",
                        "build-a320ceo/out/horizonsim-airbus-a320-ceo/SimObjects/Airplanes/Horizon_A320_214/panel/extra-backend-a32nx.wasm",
                    ]
                ),
                new ExecTask("systems",
                "npm run build-a320ceo:systems",
                [
                    "build-a320ceo/src/wasm/systems",
                    "fbw-common/src/wasm/systems",
                    "Cargo.lock",
                    "Cargo.toml",
                    "build-a320ceo/out/horizonsim-airbus-a320-ceo/SimObjects/Airplanes/Horizon_A320_214/panel/systems.wasm"
                ]),
            ],
            true
        ),
        // Copy generated wasm to variants (as for now)
        new TaskOfTasks(
            "copy",
            [
                new ExecTask("model", "npm run build-a320ceo:copy-model"),
                new ExecTask("fadec-cfm", "npm run build-a320ceo:copy-fadec-cfm"),
                new ExecTask("fadec-iae", "npm run build-a320ceo:copy-fadec-iae"),
                new ExecTask("fbw", "npm run build-a320ceo:copy-fbw"),
                new ExecTask(
                    "extra-backend-a32nx",
                    "npm run build-a320ceo:copy-extra-backend-a32nx"
                ),
                new ExecTask("systems", "npm run build-a320ceo:copy-systems"),
                new ExecTask("terronnd", "npm run build-a320ceo:copy-terronnd"),
            ],
            true
        ),

        // Create final package meta files.
        new TaskOfTasks(
            "dist",
            [
                new ExecTask("metadata", "npm run build-a320ceo:metadata"),
                new ExecTask("manifests", "npm run build-a320ceo:manifest"),
            ],
            true
        ),
    ]),
]);
