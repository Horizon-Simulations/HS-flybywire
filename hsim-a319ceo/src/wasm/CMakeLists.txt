
# folder structure
set(OUTPUT_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}/../../out/lvfr-horizonsim-airbus-a319-ceo/SimObjects/Airplanes/A319ceoCFM/panel)

# add compiler definitions
add_definitions(-DA32NX)

add_subdirectory(extra-backend-a32nx)

# FIXME: remove the if-clause as soon as all components are using CMake
if (WIN32)
    add_subdirectory(fadec_a319cfm)
    add_subdirectory(fadec_a319iae)
    add_subdirectory(fbw_a320)
endif ()
