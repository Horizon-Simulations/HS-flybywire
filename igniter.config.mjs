import { ExecTask, TaskOfTasks } from "@flybywiresim/igniter";
import { getInstrumentsIgniterTasks } from "./fbw-a21n/src/systems/instruments/buildSrc/igniter/tasks.mjs";

export default new TaskOfTasks("all", [
    // A21N Task
    new TaskOfTasks("a21n", [
        // Prepare the out folder and any other pre tasks.
        // Currently, these can be run in parallel but in the future, we may need to run them in sequence if there are any dependencies.
        new TaskOfTasks("preparation", [
            new ExecTask("copy-base-files", "npm run build-a21n:copy-base-files"),
            new ExecTask("efb-translation", "npm run build-a21n:efb-translation")
        ], true),

        // Group all typescript and react build tasks together.
        new TaskOfTasks("build", [
            new ExecTask("behavior",
                "npm run build-a21n:behavior",
                [
                    "fbw-a21n/src/behavior",
                    "fbw-a21n/out/lvfr-horizonsim-a21n-fbw/ModelBehaviorDefs/a21n/generated"
                ]),

            new TaskOfTasks('atsu', [
                new ExecTask(
                    'common',
                    'npm run build-a21n:atsu-common',
                    [
                        'fbw-a21n/src/systems/atsu/common',
                        'fbw-a21n/out/flybywire-aircraft-a320-neo/html_ui/JS/hsim-a21n/atsu/common.js'
                    ]
                ),
                new ExecTask(
                    'fmsclient',
                    'npm run build-a21n:atsu-fms-client',
                    [
                        'fbw-a21n/src/systems/atsu/common',
                        'fbw-a21n/src/systems/atsu/fmsclient',
                        'fbw-a21n/out/lvfr-horizonsim-a21n-fbw/html_ui/JS/hsim-a21n/atsu/fmsclient.js'
                    ]
                ),
            ]),
            new ExecTask(
                'systems-host',
                'npm run build-a21n:systems-host',
                [
                    'fbw-a21n/src/systems/systems-host',
                    'fbw-common/src/systems/datalink',
                    'ffbw-a21n/out/lvfr-horizonsim-a21n-fbw/html_ui/Pages/VCockpit/Instruments/A21N/SystemsHost'
                ]
            ),
            new ExecTask("failures",
                "npm run build-a21n:failures",
                [
                    "fbw-a21n/src/systems/failures",
                    "fbw-a21n/out/lvfr-horizonsim-a21n-fbw/html_ui/JS/hsim-a21n/failures/failures.js"
                ]),
            new ExecTask("fmgc",
                "npm run build-a21n:fmgc",
                [
                    "fbw-a21n/src/systems/fmgc",
                    "fbw-a21n/out/lvfr-horizonsim-a21n-fbw/html_ui/JS/hsim-a21n/fmgc"
                ]),
            new ExecTask("sentry-client",
                "npm run build-a21n:sentry-client",
                [
                    "fbw-a21n/src/systems/sentry-client",
                    "fbw-a21n/out/lvfr-horizonsim-a21n-fbw/html_ui/JS/hsim-a21n/sentry-client"
                ]),
            new ExecTask("simbridge-client",
                "npm run build-a21n:simbridge-client",
                [
                    "fbw-a21n/src/systems/simbridge-client",
                    "fbw-a21n/out/lvfr-horizonsim-a21n-fbw/html_ui/JS/hsim-a21n/simbridge-client"
                ]),
            new ExecTask("tcas",
                "npm run build-a21n:tcas",
                [
                    "fbw-a21n/src/systems/tcas",
                    "fbw-a21n/out/lvfr-horizonsim-a21n-fbw/html_ui/JS/hsim-a21n/tcas"
                ]),

            new TaskOfTasks("instruments", getInstrumentsIgniterTasks(), true),
        ], true),

        // Create final package meta files.
        new TaskOfTasks("dist", [
            new ExecTask("metadata", "npm run build-a21n:metadata"),
            new ExecTask("manifests", "npm run build-a21n:manifest")
        ])
    ]),
]);