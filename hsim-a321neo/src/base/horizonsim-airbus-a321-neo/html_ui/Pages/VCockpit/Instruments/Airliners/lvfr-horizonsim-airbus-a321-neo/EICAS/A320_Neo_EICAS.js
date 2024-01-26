class A320_Neo_EICAS extends Airliners.BaseEICAS {
    get templateID() {
        return "A320_Neo_EICAS";
    }

    // This js file has 2 intances at runtime, 1 upper screen and 1 lower
    get isTopScreen() {
        return this.urlConfig.index === 1;
    }

    get isBottomScreen() {
        return this.urlConfig.index === 2;
    }

    // The following two functions can be called from anywhere on the EICAS
    static isOnTopScreen() {
        const eicas = document.getElementsByTagName("a320-neo-eicas-element");
        if (!eicas.length) {
            return false;
        }
        return eicas[0].isTopScreen;
    }

    static isOnBottomScreen() {
        const eicas = document.getElementsByTagName("a320-neo-eicas-element");
        if (!eicas.length) {
            return false;
        }
        return eicas[0].isBottomScreen;
    }

    changePage(_pageName) {
        let pageName = _pageName.toUpperCase();
        const isOnGround = SimVar.GetSimVarValue("GEAR IS ON GROUND","Bool");
        for (let i = 0; i < this.lowerScreenPages.length; i++) {
            //skip CRZ and go back to ENG Page
            if (this.lowerScreenPages[i].name == "CRZ" && isOnGround) {
                pageName = "ENG";
                //The index of the ENG page is 0 so loop counter will point to correct index without triggering a new iteration.
                i = 0;
            }
            if (this.lowerScreenPages[i].name == pageName) {
                let pageIndex = i;
                if (pageIndex == this.currentPage) {
                    pageName = this.pageNameWhenUnselected;
                    pageIndex = -1;
                }

                this.currentPage = pageIndex;
                break;
            }
        }
        this.SwitchToPageName(this.LOWER_SCREEN_GROUP_NAME, pageName);
        //SimVar.SetSimVarValue("L:A32NX_ECAM_SD_CURRENT_PAGE_INDEX", "number", this.currentPage);
    }

    createLowerScreenPages() {
        this.addIndependentElementContainer(new Airliners.EICASScreen("BottomScreenCommon", "BottomScreen", "eicas-common-display"));
        this.createLowerScreenPage("ENG", "BottomScreen", "a32nx-eng-page-element");
        this.createLowerScreenPage("BLEED", "BottomScreen", "a32nx-bleed-page-element");
        this.createLowerScreenPage("PRESS", "BottomScreen", "a32nx-press-page-element");
        this.createLowerScreenPage("ELEC", "BottomScreen", "a32nx-elec-page-element");
        this.createLowerScreenPage("HYD", "BottomScreen", "a32nx-hyd-page-element");
        this.createLowerScreenPage("FUEL", "BottomScreen", "a32nx-fuel-page-element");
        this.createLowerScreenPage("APU", "BottomScreen", "a32nx-apu-page-element");
        this.createLowerScreenPage("COND", "BottomScreen", "a32nx-cond-page-element");
        this.createLowerScreenPage("DOOR", "BottomScreen", "a32nx-door-page-element");
        this.createLowerScreenPage("WHEEL", "BottomScreen", "a32nx-wheel-page-element");
        this.createLowerScreenPage("FTCL", "BottomScreen", "a32nx-fctl-page-element");
        this.createLowerScreenPage("STS", "BottomScreen", "a32nx-status-page-element");
        this.createLowerScreenPage("CRZ", "BottomScreen", "a32nx-crz-page-element");
    }

    getLowerScreenChangeEventNamePrefix() {
        return "ECAM_CHANGE_PAGE_";
    }

    Init() {
        super.Init();
        this.getDeltaTime = A32NX_Util.createDeltaTimeCalculator(this._lastTime);
        this.currentPage = -1;
        this.ecamAllButtonTimer = 1000;
        this.ecamAllButtonTimerStarted = false;

        this.pageNameWhenUnselected = "DOOR";

        this.ecamFCTLTimer = -1;

        this.changePage("FUEL"); // MODIFIED

        this.lastAPUMasterState = 0; // MODIFIED
        this.ApuAboveThresholdTimer = -1; // MODIFIED
        this.MainEngineStarterOffTimer = -1;
        this.CrzCondTimer = 60;
        this.PrevFailPage = -1;

        this.doorVideoWrapper = this.querySelector("#door-video-wrapper");

        this.lowerEngTestDiv = this.querySelector("#Eicas2EngTest");
        this.lowerEngMaintDiv = this.querySelector("#Eicas2MaintMode");

        this.doorVideoPressed = false;
        this.doorVideoEnabled = false;

        // Using ternary in case the LVar is undefined
        this.poweredDuringPreviousUpdate = SimVar.GetSimVarValue("L:A32NX_COLD_AND_DARK_SPAWN", "Bool") ? 0 : 1;

        this.changePage("DOOR"); // MODIFIED
        this.changePage("DOOR"); // This should get the ECAM into the "unselected" state

        SimVar.SetSimVarValue("LIGHT POTENTIOMETER:7", "number", 0);
        SimVar.SetSimVarValue("LIGHT POTENTIOMETER:84", "number", 0);
        SimVar.SetSimVarValue("LIGHT POTENTIOMETER:85", "number", 0);
        SimVar.SetSimVarValue("LIGHT POTENTIOMETER:86", "number", 0);
        SimVar.SetSimVarValue("LIGHT POTENTIOMETER:87", "number", 0.1);
        SimVar.SetSimVarValue("LIGHT POTENTIOMETER:88", "number", 0.1);
        SimVar.SetSimVarValue("LIGHT POTENTIOMETER:89", "number", 0.1);
        SimVar.SetSimVarValue("LIGHT POTENTIOMETER:90", "number", 0.1);
        SimVar.SetSimVarValue("LIGHT POTENTIOMETER:91", "number", 0.1);
        SimVar.SetSimVarValue("LIGHT POTENTIOMETER:92", "number", 0.1);
        SimVar.SetSimVarValue("LIGHT POTENTIOMETER:93", "number", 0.1);

        this.ecamAllButtonPrevState = false;
        this.updateThrottler = new UpdateThrottler(500);

        this.displayUnit = new DisplayUnit(
            this.querySelector("#Electricity"),
            () => {
                return SimVar.GetSimVarValue("L:A32NX_ELEC_AC_2_BUS_IS_POWERED", "Bool");
            },
            () => parseInt(NXDataStore.get("CONFIG_SELF_TEST_TIME", "15")),
            93,
            this.querySelector("#BottomSelfTest")
        );
    }

    onUpdate() {
        let deltaTime = this.getDeltaTime();
        super.onUpdate(deltaTime);

        const ecamAllButtonBeingPushed = SimVar.GetSimVarValue("L:A32NX_ECAM_ALL_Push_IsDown", "Bool");

        deltaTime = this.updateThrottler.canUpdate(deltaTime, this.displayUnit.isJustNowTurnedOn() || ecamAllButtonBeingPushed);
        if (deltaTime === -1) {
            return;
        }

        this.displayUnit.update(deltaTime);

        this.updateDoorVideoState();

        // Engineering self-tests
        updateDisplayDMC("EICAS2", this.lowerEngTestDiv, this.lowerEngMaintDiv);

        //Determine displayed page when no button is selected
        const prevPage = this.pageNameWhenUnselected;

        const fwcFlightPhase = SimVar.GetSimVarValue("L:A32NX_FWC_FLIGHT_PHASE", "Enum");

        switch (fwcFlightPhase) {
            case 10:
            case 1:
                this.CrzCondTimer = 60;
                this.pageNameWhenUnselected = "DOOR";
                //TODO: Emergency Generator Test displays ELEC
                //Needs system implementation (see A320_NEO_INTERIOR Component ID EMER_ELEC_PWR [LVar: L:A32NX_EMERELECPWR_GEN_TEST])
                this.checkApuPage(deltaTime);
                this.checkEnginePage(deltaTime);
                break;
            case 2:
                const sidestickPosX = SimVar.GetSimVarValue("L:A32NX_SIDESTICK_POSITION_X", "Number");
                const sidestickPosY = SimVar.GetSimVarValue("L:A32NX_SIDESTICK_POSITION_Y", "Number");
                const rudderPos = SimVar.GetSimVarValue("RUDDER PEDAL POSITION", "Position");
                const controlsMoved = Math.abs(sidestickPosX) > 0.05 || Math.abs(sidestickPosY) > 0.05 || Math.abs(rudderPos) > 0.2;

                this.pageNameWhenUnselected = "WHEEL";
                // When controls are moved > threshold, show FCTL page for 20s
                if (controlsMoved) {
                    this.pageNameWhenUnselected = "FTCL";
                    this.ecamFCTLTimer = 20;
                } else if (this.ecamFCTLTimer >= 0) {
                    this.pageNameWhenUnselected = "FTCL";
                    this.ecamFCTLTimer -= deltaTime / 1000;
                }
                this.checkApuPage(deltaTime);
                this.checkEnginePage(deltaTime);
                break;
            case 3:
            case 4:
            case 5:
                this.pageNameWhenUnselected = "ENG";
                break;
            case 6:
            case 7:
            case 8:
            case 9:
                const isGearExtended = SimVar.GetSimVarValue("GEAR TOTAL PCT EXTENDED", "percent") > 0.95;
                const ToPowerSet = Math.max(SimVar.GetSimVarValue("L:A32NX_AUTOTHRUST_TLA:1", "number"), SimVar.GetSimVarValue("L:A32NX_AUTOTHRUST_TLA:2", "number")) >= 35 && SimVar.GetSimVarValue("ENG N1 RPM:1", "Percent") > 15 && SimVar.GetSimVarValue("ENG N1 RPM:2", "Percent") > 15;
                const spoilerOrFlapsDeployed = SimVar.GetSimVarValue("L:A32NX_FLAPS_HANDLE_INDEX", "number") !== 0 || SimVar.GetSimVarValue("L:A32NX_SPOILERS_HANDLE_POSITION", "percent") !== 0;

                if (isGearExtended && (Simplane.getAltitude() < 16000)) {
                    this.pageNameWhenUnselected = "WHEEL";
                    this.checkApuPage(deltaTime);
                    this.checkEnginePage(deltaTime);
                    break;
                    // Else check for CRZ
                }

                if ((spoilerOrFlapsDeployed || ToPowerSet)) {
                    if (this.CrzCondTimer <= 0) {
                        this.pageNameWhenUnselected = "CRZ";
                        this.checkApuPage(deltaTime);
                        this.checkEnginePage(deltaTime);
                    } else {
                        this.CrzCondTimer -= deltaTime / 1000;
                    }
                } else if (!spoilerOrFlapsDeployed && !ToPowerSet) {
                    this.pageNameWhenUnselected = "CRZ";
                    this.checkApuPage(deltaTime);
                    this.checkEnginePage(deltaTime);
                }
                break;
            default:
                // Sometimes happens when loading in, in which case we have to initialise pageNameWhenUnselected here.
                this.pageNameWhenUnselected = "DOOR";
                break;
        }

        const sFailPage = SimVar.GetSimVarValue("L:A32NX_ECAM_SFAIL", "Enum");

        if (sFailPage != -1) {
            this.pageNameWhenUnselected = this.lowerScreenPages[sFailPage].name;

            // Disable user selected page when new failure detected
            if (this.PrevFailPage !== sFailPage) {
                this.currentPage = -1;
                //SimVar.SetSimVarValue("L:A32NX_ECAM_SD_CURRENT_PAGE_INDEX", "number", -1);
            }
        }

        // switch page when desired page was changed, or new Failure detected
        if ((this.pageNameWhenUnselected != prevPage && this.currentPage == -1) || (this.PrevFailPage !== sFailPage)) {
            this.SwitchToPageName(this.LOWER_SCREEN_GROUP_NAME, this.pageNameWhenUnselected);
        }

        if (ecamAllButtonBeingPushed && !this.ecamAllButtonPrevState) { // button press
            this.changePage(this.lowerScreenPages[(this.currentPage + 1) % this.lowerScreenPages.length].name);
            this.ecamCycleInterval = setInterval(() => {
                this.changePage(this.lowerScreenPages[(this.currentPage + 1) % this.lowerScreenPages.length].name);
            }, 1000);
        } else if (!ecamAllButtonBeingPushed && this.ecamAllButtonPrevState) { // button release
            clearInterval(this.ecamCycleInterval);
        }

        this.ecamAllButtonPrevState = ecamAllButtonBeingPushed;
        this.PrevFailPage = sFailPage;
    }

    checkEnginePage(deltaTime) {
        const engModeSel = SimVar.GetSimVarValue("L:XMLVAR_ENG_MODE_SEL", "number");
        const eng1State = SimVar.GetSimVarValue("L:A32NX_ENGINE_STATE:1", "number");
        const eng2State = SimVar.GetSimVarValue("L:A32NX_ENGINE_STATE:2", "number");
        const oneEngOff = eng1State !== 1 || eng2State !== 1;

        if (engModeSel === 0 || (oneEngOff && engModeSel === 2) || this.MainEngineStarterOffTimer >= 0) {
            // Show ENG until >10 seconds after both engines are fully started
            if (engModeSel === 0 || (oneEngOff && engModeSel === 2)) {
                this.MainEngineStarterOffTimer = 10;
            } else if (this.MainEngineStarterOffTimer >= 0) {
                this.MainEngineStarterOffTimer -= deltaTime / 1000;
            }
            this.pageNameWhenUnselected = "ENG";
        }
    }

    checkApuPage(deltaTime) {
        const currentAPUMasterState = SimVar.GetSimVarValue("L:A32NX_OVHD_APU_MASTER_SW_PB_IS_ON", "Bool");
        const apuRpm = Arinc429Word.fromSimVarValue("L:A32NX_APU_N");
        if (currentAPUMasterState && apuRpm.isNormalOperation() && (apuRpm.value <= 95 || this.ApuAboveThresholdTimer >= 0)) {
            // Show APU on Lower ECAM until 15s after RPM > 95%
            if (this.ApuAboveThresholdTimer <= 0 && apuRpm.value <= 95) {
                this.ApuAboveThresholdTimer = 15;
            } else if (apuRpm.value > 95) {
                this.ApuAboveThresholdTimer -= deltaTime / 1000;
            }
            this.pageNameWhenUnselected = "APU";
        }
    }

    updateDoorVideoState() {
        const doorVideoEnabledNow = SimVar.GetSimVarValue("L:A32NX_OVHD_COCKPITDOORVIDEO_TOGGLE", "Bool") === 1;
        const doorVideoPressedNow = SimVar.GetSimVarValue("L:PUSH_DOORPANEL_VIDEO", "Bool") === 1;

        if (this.doorVideoEnabled !== doorVideoEnabledNow || this.doorVideoPressed !== doorVideoPressedNow) {
            this.doorVideoEnabled = doorVideoEnabledNow;
            this.doorVideoPressed = doorVideoPressedNow;

            this.setDoorVideo();
        }
    }

    setDoorVideo() {
        this.doorVideoWrapper.style.visibility = this.doorVideoEnabled && this.doorVideoPressed ? "visible" : "hidden";
    }

    SwitchToPageName(_menu, _page) {
        if (this.doorVideoPressed) {
            SimVar.SetSimVarValue("L:PUSH_DOORPANEL_VIDEO", "Bool", 0);
        }

        super.SwitchToPageName(_menu, _page);
    }
}

registerInstrument("a320-neo-eicas-element", A320_Neo_EICAS);
