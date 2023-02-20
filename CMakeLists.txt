# This CMakeLists.txt file is used only for syntax highlighting and navigating
# through the code in an IDE. It is not used for building the project.

cmake_minimum_required(VERSION 3.19)
project(flybywire-a32nx)

set(CMAKE_CXX_STANDARD 20)
set(MSFS_SDK "C:\\MSFS SDK")
set(FBW_ROOT ${CMAKE_SOURCE_DIR})

# include sub directories
include_directories(
        ${PROJECT_SOURCE_DIR}/fbw-a21n/src/wasm/fadec_a21n
        ${PROJECT_SOURCE_DIR}/fbw-a21n/src/wasm/fbw_a21n
        ${PROJECT_SOURCE_DIR}/fbw-a21n/src/wasm/flypad-backend
        ${PROJECT_SOURCE_DIR}/fbw-a318/src/wasm/fadec_a318
        ${PROJECT_SOURCE_DIR}/fbw-a318/src/wasm/fbw_a318
        ${PROJECT_SOURCE_DIR}/fbw-a318/src/wasm/flypad-backend
        ${PROJECT_SOURCE_DIR}/fbw-a319/src/wasm/fadec_a319
        ${PROJECT_SOURCE_DIR}/fbw-a319/src/wasm/fbw_a319
        ${PROJECT_SOURCE_DIR}/fbw-a319/src/wasm/flypad-backend
        ${PROJECT_SOURCE_DIR}/fbw-common/src/wasm/fadec_common
        ${PROJECT_SOURCE_DIR}/fbw-common/src/wasm/fbw_common
)

add_subdirectory(./fbw-a21n/src/wasm/fadec_a21n)
add_subdirectory(./fbw-a21n/src/wasm/fbw_a21n)
add_subdirectory(./fbw-a21n/src/wasm/flypad-backend)
add_subdirectory(./fbw-a318/src/wasm/fadec_a318)
add_subdirectory(./fbw-a318/src/wasm/fbw_a318)
add_subdirectory(./fbw-a318/src/wasm/flypad-backend)
add_subdirectory(./fbw-a319/src/wasm/fadec_a319)
add_subdirectory(./fbw-a319/src/wasm/fbw_a319)
add_subdirectory(./fbw-a319/src/wasm/flypad-backend)