/* Copyright (c) 2015 Nordic Semiconductor. All Rights Reserved.
 *
 * The information contained herein is confidential property of Nordic Semiconductor. The use,
 * copying, transfer or disclosure of such information is prohibited except by express written
 * agreement with Nordic Semiconductor.
 *
 */

#ifndef PLATFORM_H__
#define PLATFORM_H__

#ifdef __cplusplus
#define EXTERN_C extern "C"
#else
#define EXTERN_C
#endif

#ifdef __cplusplus
extern "C" {
#endif

#ifdef _WIN32
    #ifdef SD_RPC_EXPORTS
        #define SD_RPC_API EXTERN_C __declspec(dllexport)
    #else
        #define SD_RPC_API EXTERN_C __declspec(dllimport)
    #endif
#else
    #ifdef SD_RPC_EXPORTS
        #define SD_RPC_API EXTERN_C __attribute__((visibility("default")))
    #else
        #define SD_RPC_API EXTERN_C
    #endif
#endif

#ifdef __cplusplus
}
#endif

#endif // PLATFORM_H__