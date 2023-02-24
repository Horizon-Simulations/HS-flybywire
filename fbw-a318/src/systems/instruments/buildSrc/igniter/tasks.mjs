import fs from 'fs';
import { join } from 'path';
import { ExecTask } from '@flybywiresim/igniter';
import { Directories } from '../directories.mjs';

export function getInstrumentsIgniterTasks() {
    const baseInstruments = fs.readdirSync(join(Directories.instruments, 'src'), { withFileTypes: true })
        .filter((d) => d.isDirectory() && fs.existsSync(join(Directories.instruments, 'src', d.name, 'config.json')));

    return baseInstruments.map(({ name }) => new ExecTask(
        name,
        `cd fbw-a318 && mach build -f ${name}`,
        [
            join('fbw-a318/src/systems/instruments/src', name),
            'fbw-a318/src/systems/instruments/src/Common',
            join('fbw-a318/out/lvfr-horizonsim-a318-fbw/html_ui/Pages/VCockpit/Instruments/A32NX', name),
        ],
    ));
}
