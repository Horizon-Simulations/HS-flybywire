class A320_Neo_CDU_SelectWptPage {
    static ShowPage(mcdu, waypoints, callback, page = 0) {
        mcdu.clearDisplay();
        mcdu.page.Current = mcdu.page.SelectWptPage;
        const rows = [
            ["", 'FREQ', 'LAT/LONG'],
            [""],
            [""],
            [""],
            [""],
            [""],
            [""],
            [""],
            [""],
            [""],
            [""],
            ["<RETURN"]
        ];
        function calculateDistance(w) {
            const planeLla = new LatLongAlt(SimVar.GetSimVarValue("PLANE LATITUDE", "degree latitude"), SimVar.GetSimVarValue("PLANE LONGITUDE", "degree longitude"));
            return Avionics.Utils.computeGreatCircleDistance(planeLla, w.infos.coordinates);
        }

        const orderedWaypoints = [...waypoints].sort((a, b) => calculateDistance(a) - calculateDistance(b));

        for (let i = 0; i < 5; i++) {
            const w = orderedWaypoints[i + 5 * page];
            if (w) {
                let t = "";
                let freq = "";
                if (w.icao[0] === "V") {
                    t = " VOR";
                    freq = (w.infos.frequencyMHz) ? fastToFixed(w.infos.frequencyMHz, 2).toString() : " ";
                } else if (w.icao[0] === "N") {
                    t = " NDB";
                    freq = (w.infos.frequencyMHz) ? fastToFixed(w.infos.frequencyMHz, 2).toString() : " ";
                } else if (w.icao[0] === "A") {
                    t = " AIRPORT";
                    freq = " ";
                }

                const latString = `${Math.abs(w.infos.coordinates.lat).toFixed(0).padStart(2, "0")}${w.infos.coordinates.lat >= 0 ? 'N' : 'S'}`;
                const longString = `${Math.abs(w.infos.coordinates.long).toFixed(0).padStart(3, "0")}${w.infos.coordinates.long >= 0 ? 'E' : 'W'}`;

                const dist = Math.min(calculateDistance(w), 9999);

                rows[2 * i].splice(0, 1, "{green}" + dist.toFixed(0) + "{end}NM");
                rows[2 * i + 1] = ["*" + w.ident + "[color]cyan", freq + "[color]green", `${latString}/${longString}[color]green`];
                mcdu.onLeftInput[i] = () => {
                    callback(w);
                };
                mcdu.onRightInput[i] = () => {
                    callback(w);
                };
                mcdu.onLeftInput[5] = () => {
                    if (mcdu.returnPageCallback) {
                        mcdu.returnPageCallback();
                    } else {
                        console.error("A return page callback was expected but not declared. Add a returnPageCallback to page: " + mcdu.page.Current);
                    }
                };
            }
        }
        mcdu.setTemplate([
            ["DUPLICATE NAMES", (page + 1).toFixed(0), Math.ceil(orderedWaypoints.length / 5).toFixed(0)],
            ...rows,
            [""]
        ]);
        mcdu.onPrevPage = () => {
            if (page > 0) {
                A320_Neo_CDU_SelectWptPage.ShowPage(mcdu, orderedWaypoints, callback, page - 1);
            }
        };
        mcdu.onNextPage = () => {
            if (page < Math.floor(waypoints.length / 5)) {
                A320_Neo_CDU_SelectWptPage.ShowPage(mcdu, orderedWaypoints, callback, page + 1);
            }
        };
    }
}
