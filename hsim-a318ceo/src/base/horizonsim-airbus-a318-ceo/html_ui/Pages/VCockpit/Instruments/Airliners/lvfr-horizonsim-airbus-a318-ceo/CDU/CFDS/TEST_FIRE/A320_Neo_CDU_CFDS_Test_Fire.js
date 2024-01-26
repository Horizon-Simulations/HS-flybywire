class CDUCfdsTestFire {
    static ShowPage(mcdu) {
        mcdu.clearDisplay();
        mcdu.setTemplate([
            ["SYSTEM REPORT / TEST"],
            ["", "", "FIRE PROT"],
            ["<FDU 1[color]inop"],
            [""],
            ["<FDU 2[color]inop"],
            [""],
            ["<FDU APU[color]inop"],
            [""],
            ["<SDCU[color]inop"],
            [""],
            [""],
            [""],
            ["<RETURN[color]cyan"]
        ]);

        mcdu.leftInputDelay[5] = () => {
            return mcdu.getDelaySwitchPage();
        };
        mcdu.onLeftInput[5] = () => {
            CDUCfdsTestMenu.ShowPage(mcdu);
        };
    }
}
