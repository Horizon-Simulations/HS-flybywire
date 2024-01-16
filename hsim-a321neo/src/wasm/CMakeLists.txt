
# folder structure
set(OUTPUT_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}/../../../build-a321neo/out/lvfr-horizonsim-airbus-a321-neo/SimObjects/Airplanes/A321neoLEAP/panel)

# add compiler definitions
add_definitions(-DA32NX)

add_subdirectory(extra-backend-a32nx)

# FIXME: remove the if-clause as soon as all components are using CMake
if (WIN32)
    add_subdirectory(fadec_a320leap)
    add_subdirectory(fadec_a320pw)
    add_subdirectory(fbw_a320)
endif ()
