interface EnvConfig {
  apiBaseUrl: string;
  apiVersionUrl: string;
  onlyOfficeServerUrl: string;
  eriDomain: string;
  eriApiKey: string;
}

function getEnvVar(key: keyof ImportMetaEnv, fallback?: string): string {
  const value = import.meta.env[key];
  if (!value && !fallback) {
    if (import.meta.env.MODE === "development" && key === "VITE_API_BASE_URL") {
      return "";
    }
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value ?? fallback!;
}

export const envConfig: EnvConfig = {
  apiBaseUrl: getEnvVar("VITE_API_BASE_URL", ""),
  apiVersionUrl: getEnvVar("VITE_API_VERSION_URL"),
  onlyOfficeServerUrl: getEnvVar("VITE_ONLY_OFFICE_SERVER_URL"),
  eriDomain: getEnvVar("VITE_APP_ERI_DOMAIN"),
  eriApiKey: getEnvVar("VITE_APP_ERI_API_KEY"),
};
