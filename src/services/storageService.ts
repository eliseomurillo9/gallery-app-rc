import type { LocalStorageKeys } from "@/constants/storage";
import type { Photo, UserPhoto } from "@/types/Photo";
import type { User } from "@/types/User";

type StorageValue = Photo | Photo[] | User | UserPhoto[] | UserPhoto ;
export const getStorageItem = (key: LocalStorageKeys) => {
  const item = globalThis.localStorage.getItem(key);

  if (!item) {
    throw new Error(`Item with key ${key} not found in storage`);
  }
  return JSON.parse(item);
}

export const setStorageItem = (key: LocalStorageKeys, value: StorageValue) => {
  globalThis.localStorage.setItem(key, JSON.stringify(value));

  const updatedItem = getStorageItem(key);
  return updatedItem;
}