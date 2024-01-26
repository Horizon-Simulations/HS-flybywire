class CDUAocMenu {
    static ShowPage(mcdu) {
        mcdu.clearDisplay();
        mcdu.page.Current = mcdu.page.AOCMenu;
        mcdu.setTemplate([
            ["AOC MENU"],
            [""],
            ["<INIT/PRES", "FREE TEXT>"],
            ["", ""],
            ["<WX REQUEST"],
            ["", "RECEIVED\xa0"],
            ["<ATIS", "MESSAGES>"],
            ["", "SENT\xa0"],
            ["", "MESSAGES>"],
            [""],
            ["", "DIVERSION>[color]inop"],
            ["\xa0ATSU DLK"],
            ["<RETURN", "MISC>[color]inop"]
        ]);

        mcdu.leftInputDelay[1] = () => {
            return mcdu.getDelaySwitchPage();
        };
        mcdu.onLeftInput[1] = () => {
            CDUAocRequestsWeather.ShowPage(mcdu);
        };
        mcdu.leftInputDelay[2] = () => {
            return mcdu.getDelaySwitchPage();
        };
        mcdu.onLeftInput[2] = () => {
            CDUAocRequestsAtis.ShowPage(mcdu);
        };
        mcdu.leftInputDelay[5] = () => {
            return mcdu.getDelaySwitchPage();
        };
        mcdu.onLeftInput[5] = () => {
            CDUAtsuMenu.ShowPage(mcdu);
        };
        mcdu.rightInputDelay[0] = () => {
            return mcdu.getDelaySwitchPage();
        };
        mcdu.onRightInput[0] = () => {
            CDUAocFreeText.ShowPage(mcdu);
        };
        mcdu.rightInputDelay[2] = () => {
            return mcdu.getDelaySwitchPage();
        };
        mcdu.onRightInput[2] = () => {
            CDUAocMessagesReceived.ShowPage(mcdu);
        };
        mcdu.rightInputDelay[3] = () => {
            return mcdu.getDelaySwitchPage();
        };
        mcdu.onRightInput[3] = () => {
            CDUAocMessagesSent.ShowPage(mcdu);
        };
        mcdu.onLeftInput[0] = () => {
            CDUAocInit.ShowPage(mcdu);
        };
    }
}
