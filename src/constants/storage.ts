export const LOCAL_STORAGE_KEYS = {
  PHOTOS: 'vaultoria:photos',
  ALBUMS: 'vaultoria:albums',
  USERS: 'vaultoria:users',
  LOGGED_USER: 'vaultoria:user'
} as const;

export type LocalStorageKeys = typeof LOCAL_STORAGE_KEYS[keyof typeof LOCAL_STORAGE_KEYS];