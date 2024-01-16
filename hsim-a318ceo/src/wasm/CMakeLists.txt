
# folder structure
set(OUTPUT_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}/../../../build-a318ceo/out/lvfr-horizonsim-airbus-a318-ceo/SimObjects/Airplanes/A318ceoCFM/panel)

# add compiler definitions
add_definitions(-DA32NX)

add_subdirectory(extra-backend-a32nx)

# FIXME: remove the if-clause as soon as all components are using CMake
if (WIN32)
    add_subdirectory(fadec_a318cfm)
    add_subdirectory(fbw_a320)
endif ()
