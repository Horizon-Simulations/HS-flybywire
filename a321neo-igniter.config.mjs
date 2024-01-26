import { ExecTask, TaskOfTasks } from "@flybywiresim/igniter";
import { getInstrumentsIgniterTasks } from "./build-a321neo/src/systems/instruments/buildSrc/igniter/tasks.mjs";

export default new TaskOfTasks("all", [
    new TaskOfTasks("A21NHS", [
        // Prepare the out folder and any other pre tasks.
        // Currently, these can be run in parallel but in the future, we may need to run them in sequence if there are any dependencies.
        new TaskOfTasks(
            "preparation",
            [
                //new ExecTask("copy-base-files", "npm run build-a321neo:copy-base-files"),
                new ExecTask(
                    "copy-cargo-config",
                    "npm run build-a321neo:copy-cargo-config"
                ),
                new ExecTask(
                    "copy-cmake-config",
                    "npm run build-a321neo:copy-cmake-config"
                ),
                new TaskOfTasks(
                    "localization",
                    [
                        new ExecTask(
                            "efb-translation",
                            "npm run build-a321neo:efb-translation"
                        ),
                        new ExecTask(
                            "locPak-translation",
                            "npm run build-a321neo:locPak-translation"
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
                // new ExecTask("model", "npm run build-a321neo:model", [
                //     "build-a321neo/src/model",
                //     "build-a321neo/out/horizonsim-airbus-a321-neo/SimObjects/AirPlanes/A321neoLEAP/model",
                // ]),
                new ExecTask("behavior", "npm run build-a321neo:behavior", [
                    "build-a321neo/src/behavior",
                    "build-a321neo/out/horizonsim-airbus-a321-neo/ModelBehaviorDefs/A21NHS/generated",
                ]),

                new TaskOfTasks("atsu", [
                    new ExecTask(
                        "common",
                        "npm run build-a321neo:atsu-common",
                        [
                            "build-a321neo/src/systems/atsu/common",
                            "build-a321neo/out/horizonsim-airbus-a321-neo/html_ui/JS/A21NHS/atsu/common.js",
                        ]
                    ),
                    new ExecTask(
                        "fmsclient",
                        "npm run build-a321neo:atsu-fms-client",
                        [
                            "build-a321neo/src/systems/atsu/common",
                            "build-a321neo/src/systems/atsu/fmsclient",
                            "build-a321neo/out/horizonsim-airbus-a321-neo/html_ui/JS/A21NHS/atsu/fmsclient.js",
                        ]
                    ),
                ]),
                new ExecTask(
                    "extras-host",
                    "npm run build-a321neo:extras-host",
                    [
                        "build-a321neo/src/systems/extras-host",
                        "build-a321neo/out/horizonsim-airbus-a321-neo/html_ui/Pages/VCockpit/Instruments/A21NHS/ExtrasHost",
                    ]
                ),
                new ExecTask("failures", "npm run build-a321neo:failures", [
                    "build-a321neo/src/systems/failures",
                    "build-a321neo/out/horizonsim-airbus-a321-neo/html_ui/JS/A21NHS/failures/failures.js",
                ]),
                new ExecTask("fmgc-leap", "npm run build-a321neo:fmgc", [
                    "build-a321neo/src/systems/fmgc",
                    "build-a321neo/out/horizonsim-airbus-a321-neo/html_ui/JS/A21NHS/fmgc",
                ]),
                new ExecTask("fmgc-pw", "npm run build-a321neo:fmgcPW", [
                    "build-a321neo/src/systems/fmgcPW",
                    "build-a321neo/out/horizonsim-airbus-a321-neo/html_ui/JS/A21NHS/fmgc",
                ]),
                new ExecTask(
                    "sentry-client",
                    "npm run build-a321neo:sentry-client",
                    [
                        "build-a321neo/src/systems/sentry-client",
                        "build-a321neo/out/horizonsim-airbus-a321-neo/html_ui/JS/A21NHS/sentry-client",
                    ]
                ),
                new ExecTask(
                    "simbridge-client",
                    "npm run build-a321neo:simbridge-client",
                    [
                        "build-a321neo/src/systems/simbridge-client",
                        "build-a321neo/out/horizonsim-airbus-a321-neo/html_ui/JS/A21NHS/simbridge-client",
                    ]
                ),
                new ExecTask(
                    "systems-host",
                    "npm run build-a321neo:systems-host",
                    [
                        "build-a321neo/src/systems/systems-host",
                        "fbw-common/src/systems/datalink",
                        "build-a321neo/out/horizonsim-airbus-a321-neo/html_ui/Pages/VCockpit/Instruments/A21NHS/SystemsHost",
                    ]
                ),
                new ExecTask("tcas", "npm run build-a321neo:tcas", [
                    "build-a321neo/src/systems/tcas",
                    "build-a321neo/out/horizonsim-airbus-a321-neo/html_ui/JS/A21NHS/tcas",
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
                new ExecTask("fadec-leap", "npm run build-a321neo:fadec-leap", [
                    "build-a321neo/src/wasm/fadec_a320leap",
                    "fbw-common/src/wasm/fbw_common",
                    "fbw-common/src/wasm/fadec_common",
                    "build-a321neo/out/horizonsim-airbus-a321-neo/SimObjects/Airplanes/Horizon_A321_251N/panel/fadec.wasm",
                ]),
                new ExecTask("fadec-pw", "npm run build-a321neo:fadec-pw", [
                    "build-a321neo/src/wasm/fadec_a320pw",
                    "fbw-common/src/wasm/fbw_common",
                    "fbw-common/src/wasm/fadec_common",
                    "build-a321neo/out/horizonsim-airbus-a321-neo/SimObjects/Airplanes/Horizon_A321_271N/panel/fadec.wasm",
                ]),
                new ExecTask("fbw", "npm run build-a321neo:fbw", [
                    "build-a321neo/src/wasm/fbw_a320",
                    "fbw-common/src/wasm/fbw_common",
                    "build-a321neo/out/horizonsim-airbus-a321-neo/SimObjects/Airplanes/Horizon_A321_251N/panel/fbw.wasm",
                ]),
                new ExecTask(
                    "systems-terronnd",
                    [
                        "npm run build-a321neo:terronnd",
                    ],
                    [
                        "fbw-common/src/wasm/terronnd",
                        "build-a321neo/out/horizonsim-airbus-a321-neo/SimObjects/Airplanes/Horizon_A321_251N/panel/terronnd.wasm",
                        "fbw-common/src/wasm/terronnd/out/terronnd.wasm",
                    ]
                ),
                new ExecTask(
                    "extra-backend-a32nx",
                    "npm run build-a321neo:cpp-wasm-cmake",
                    [
                        'fbw-common/src/wasm/cpp-msfs-framework',
                        'fbw-common/src/wasm/extra-backend',
                        "build-a321neo/src/wasm/extra-backend-a32nx",
                        "build-a321neo/out/horizonsim-airbus-a321-neo/SimObjects/Airplanes/Horizon_A321_251N/panel/extra-backend-a32nx.wasm",
                    ]
                ),
                new ExecTask("systems",
                "npm run build-a321neo:systems",
                [
                    "build-a321neo/src/wasm/systems",
                    "fbw-common/src/wasm/systems",
                    "Cargo.lock",
                    "Cargo.toml",
                    "build-a321neo/out/horizonsim-airbus-a321-neo/SimObjects/Airplanes/Horizon_A321_251N/panel/systems.wasm"
                ]),
            ],
            true
        ),
        // Copy generated wasm to variants (as for now)
        new TaskOfTasks(
            "copy",
            [
                new ExecTask("model", "npm run build-a321neo:copy-model"),
                new ExecTask("fadec-leap", "npm run build-a321neo:copy-fadec-leap"),
                new ExecTask("fadec-pw", "npm run build-a321neo:copy-fadec-pw"),
                new ExecTask("fbw", "npm run build-a321neo:copy-fbw"),
                new ExecTask(
                    "extra-backend-a32nx",
                    "npm run build-a321neo:copy-extra-backend-a32nx"
                ),
                new ExecTask("systems", "npm run build-a321neo:copy-systems"),
                new ExecTask("terronnd", "npm run build-a321neo:copy-terronnd"),
            ],
            true
        ),

        // Create final package meta files.
        new TaskOfTasks(
            "dist",
            [
                new ExecTask("metadata", "npm run build-a321neo:metadata"),
                new ExecTask("manifests", "npm run build-a321neo:manifest"),
            ],
            true
        ),
    ]),
]);
