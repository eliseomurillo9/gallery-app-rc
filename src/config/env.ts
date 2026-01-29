const requireEnv = (name: string, value: string | undefined): string =>{
  if (!value) {
    throw new Error(`Missing env variable: ${name}`);
  }
  return value;
}

export const ENV = {
  BASE_URL: requireEnv("VITE_API_BASE_URL", import.meta.env.VITE_API_BASE_URL)
} as const

