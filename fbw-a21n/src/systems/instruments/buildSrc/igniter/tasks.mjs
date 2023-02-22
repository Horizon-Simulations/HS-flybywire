import fs from 'fs';
import { join } from 'path';
import { ExecTask } from '@flybywiresim/igniter';
import { Directories } from '../directories.mjs';

export function getInstrumentsIgniterTasks() {
    const baseInstruments = fs.readdirSync(join(Directories.instruments, 'src'), { withFileTypes: true })
        .filter((d) => d.isDirectory() && fs.existsSync(join(Directories.instruments, 'src', d.name, 'config.json')));

    return baseInstruments.map(({ name }) => new ExecTask(
        name,
        `cd fbw-a21n && mach build -f ${name}`,
        [
            join('fbw-a21n/src/systems/instruments/src', name),
            'fbw-a21n/src/systems/instruments/src/Common',
            join('fbw-a21n/out/lvfr-horizonsim-a21n-fbw/html_ui/Pages/VCockpit/Instruments/A21N', name),
        ],
    ));
}
