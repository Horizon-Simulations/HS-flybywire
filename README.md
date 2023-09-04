![FlyByWire Simulations](./branding/Horizon_Simulations.png)
# Horizon Simulations - FlyByWire - LVFR A318ceo A319ceo A320ceo A321neo

The FlyByWire Compatibility for LatinVFR Airbus series is a project based on [FlyByWire Simulations](https://flybywiresim.com/) A32NX Project.

The following aircraft configuration is currently simulated or targeted:

### A321neo (LR) CFM LEAP

 ```
 Model       A321-251N
 Engine      CFM LEAP 1A-32
 APU         APS3200
 FMS         Honeywell Release H3
 FWC Std.    H2F9C
 RA          Honeywell ALA-52B
 TAWS        Honeywell EGPWS
 ACAS        Honeywell TPA-100B
 ATC         Honeywell TRA-100B
 MMR         Honeywell iMMR
 WXR         Honeywell RDR-4000
 ```

 ### A321neo (LR) Pratt & Whitney

 ```
 Model       A321-271N
 Engine      Pratt & Whitney PW1130G-JM
 APU         APS3200
 FMS         Honeywell Release H3
 FWC Std.    H2F9C
 RA          Honeywell ALA-52B
 TAWS        Honeywell EGPWS
 ACAS        Honeywell TPA-100B
 ATC         Honeywell TRA-100B
 MMR         Honeywell iMMR
 WXR         Honeywell RDR-4000
 ```

 ### A318-100 CFM (ceo)

 ```
 Model       A318-115
 Engine      CFM56-5B7
 APU         APS3200
 FMS         Honeywell Release H3
 FWC Std.    H2F9C
 RA          Honeywell ALA-52B
 TAWS        Honeywell EGPWS
 ACAS        Honeywell TPA-100B
 ATC         Honeywell TRA-100B
 MMR         Honeywell iMMR
 WXR         Honeywell RDR-4000
 ```

 ### A319-100 CFM (ceo)

 ```
 Model       A319-115
 Engine      CFM56-5B5
 APU         APS3200
 FMS         Honeywell Release H3
 FWC Std.    H2F9C
 RA          Honeywell ALA-52B
 TAWS        Honeywell EGPWS
 ACAS        Honeywell TPA-100B
 ATC         Honeywell TRA-100B
 MMR         Honeywell iMMR
 WXR         Honeywell RDR-4000
 ```

  ### A319-100 IAE (ceo)

 ```
 Model       A319-133
 Engine      IAE V2524-A5
 APU         APS3200
 FMS         Honeywell Release H3
 FWC Std.    H2F9C
 RA          Honeywell ALA-52B
 TAWS        Honeywell EGPWS
 ACAS        Honeywell TPA-100B
 ATC         Honeywell TRA-100B
 MMR         Honeywell iMMR
 WXR         Honeywell RDR-4000
 ```

 ### A320-200 CFM (ceo)

 ```
 Model       A320-214
 Engine      CFM56-5B4/P
 APU         APS3200
 FMS         Honeywell Release H3
 FWC Std.    H2F9C
 RA          Honeywell ALA-52B
 TAWS        Honeywell EGPWS
 ACAS        Honeywell TPA-100B
 ATC         Honeywell TRA-100B
 MMR         Honeywell iMMR
 WXR         Honeywell RDR-4000
 ```

  ### A320-200 IAE (ceo)

 ```
 Model       A320-232
 Engine      IAE V2527-A5
 APU         APS3200
 FMS         Honeywell Release H3
 FWC Std.    H2F9C
 RA          Honeywell ALA-52B
 TAWS        Honeywell EGPWS
 ACAS        Honeywell TPA-100B
 ATC         Honeywell TRA-100B
 MMR         Honeywell iMMR
 WXR         Honeywell RDR-4000
 ```

## How to build
Make sure docker are isntalled. Prefferably with WSL2 backend.

### Software requirements
- Docker Desktop or native on WSL2
- NodeJS (latest LTS version)
- Git for Windows

### 1. First, run following command on powershell. This will install the A32NX docker images and node modules.

For powershell:
```shell
npm install --save-dev
git submodule init
git submodule update flybywire
.\scripts\dev-env\run.cmd ./scripts/setup.sh
```
For Git Bash/Linux:
```shell
npm install --save-dev
git submodule init
git submodule update flybywire
./scripts/dev-env/run.sh ./scripts/setup.sh
```
### 2. As next step we will copy the original source files and copy-over our source files.
#### A318ceo
For powershell:
```shell
.\scripts\dev-env\run.cmd ./scripts/copy_a318hs.sh
```
For Git Bash/Linux:
```shell
./scripts/dev-env/run.sh ./scripts/copy_a318hs.sh
```
#### A319ceo
For powershell:
```shell
.\scripts\dev-env\run.cmd ./scripts/copy_a319hs.sh
```
For Git Bash/Linux:
```shell
./scripts/dev-env/run.sh ./scripts/copy_a319hs.sh
```
#### A320ceo
For powershell:
```shell
.\scripts\dev-env\run.cmd ./scripts/copy_a320hs.sh
```
For Git Bash/Linux:
```shell
./scripts/dev-env/run.sh ./scripts/copy_a320hs.sh
```
#### A321neo
For powershell:
```shell
.\scripts\dev-env\run.cmd ./scripts/copy_a321hs.sh
```
For Git Bash/Linux:
```shell
./scripts/dev-env/run.sh ./scripts/copy_a321hs.sh
```
### 3. Build all A32NX module by running following command on powershell.
#### A318ceo
For powershell:
```shell
.\scripts\dev-env\run.cmd ./scripts/build_a318hs.sh
```
For Git Bash/Linux:
```shell
./scripts/dev-env/run.sh ./scripts/build_a318hs.sh
```
#### A319ceo
For powershell:
```shell
.\scripts\dev-env\run.cmd ./scripts/build_a319hs.sh
```
For Git Bash/Linux:
```shell
./scripts/dev-env/run.sh ./scripts/build_a319hs.sh
```
#### A320ceo
For powershell:
```shell
.\scripts\dev-env\run.cmd ./scripts/build_a320hs.sh
```
For Git Bash/Linux:
```shell
./scripts/dev-env/run.sh ./scripts/build_a320hs.sh
```
#### A321neo
For powershell:
```shell
.\scripts\dev-env\run.cmd ./scripts/build_a321hs.sh
```
For Git Bash/Linux:
```shell
./scripts/dev-env/run.sh ./scripts/build_a321hs.sh
```

### 4. The package is now ready to use. Copy the folder "build_a32x/out/lvfr-horizonsim-airbus-axx" to your CommunityPackage folder in MSFS.

### (Optional) If you want to use the MSFS Dev Tools you can run the following command (after build completed) to copy the files to the PackageSources.

For powershell:
```shell
.\scripts\dev-env\run.cmd ./scripts/package.sh
```
For Git Bash/Linux:
```shell
./scripts/dev-env/run.sh ./scripts/package.sh
```


 ## License

Original source code assets present in this repository are licensed under the GNU GPLv3.

Microsoft Flight Simulator © Microsoft Corporation. The Horizon Simulations LVFR Airbus was created under Microsoft's "Game Content Usage Rules" using assets from Microsoft Flight Simulator, and it is not endorsed by or affiliated with Microsoft.
