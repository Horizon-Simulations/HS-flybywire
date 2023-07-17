# This CMakeLists.txt file is used only for syntax highlighting and navigating
# through the code in an IDE. It is not used for building the project.

cmake_minimum_required(VERSION 3.19)
project(flybywire-a32nx)

set(CMAKE_CXX_STANDARD 20)
set(MSFS_SDK "C:\\MSFS SDK")
set(FBW_ROOT ${CMAKE_SOURCE_DIR})

# include sub directories
include_directories(
        ${PROJECT_SOURCE_DIR}/build_a318ceo/src/wasm/fadec_a320_cfm
        ${PROJECT_SOURCE_DIR}/build_a318ceo/src/wasm/fbw_a320
        ${PROJECT_SOURCE_DIR}/build_a318ceo/src/wasm/flypad-backend
        ${PROJECT_SOURCE_DIR}/fbw-common/src/wasm/fadec_common
        ${PROJECT_SOURCE_DIR}/fbw-common/src/wasm/fbw_common
)

add_subdirectory(./build_a318ceo/src/wasm/fadec_a320)
add_subdirectory(./build_a318ceo/src/wasm/fbw_a320)
add_subdirectory(./build_a318ceo/src/wasm/flypad-backend)
