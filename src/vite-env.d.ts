/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_API_VERSION_URL: string;
  readonly VITE_ONLY_OFFICE_SERVER_URL: string;
  readonly VITE_APP_ERI_DOMAIN: string;
  readonly VITE_APP_ERI_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
