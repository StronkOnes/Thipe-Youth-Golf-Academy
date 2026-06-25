// This file provides type definitions for Vite's environment variables.
// The `<reference types="vite/client" />` directive was removed to fix a
// project configuration issue where the type definitions could not be found.

interface ImportMetaEnv {
    // Add any other environment variables here
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
