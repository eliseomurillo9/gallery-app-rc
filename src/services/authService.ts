import { LOCAL_STORAGE_KEYS } from "@/constants/storage";
import type { User } from "../types/User";
import { getStorageItem } from "./storageService";
import { ENV } from "@/config/env";

const BASE_URL = ENV.BASE_URL;

export async function authUser(userEmail: User["email"]) {
  try {
    const fetchUser = await fetch(
      `${BASE_URL}/user`
    );

    const users: User[] = await fetchUser.json();

    const user = users.find((user) => user.email === userEmail);
    if (!user) {
      throw new Error("User not found, try continue as guest");
    }
    globalThis.localStorage.setItem(LOCAL_STORAGE_KEYS.LOGGED_USER, JSON.stringify({'id': user.id, 'name': user.name, 'email': user.email, 'avatar': user.avatar}));
    return user;
  } catch (error: unknown) {
    console.log(error);
  }
}

export function isUserAuthenticated(): boolean {
  const user = globalThis.localStorage.getItem(LOCAL_STORAGE_KEYS.LOGGED_USER);
  return !!user;
}

export const getLocalUserInfo = () =>  getStorageItem(LOCAL_STORAGE_KEYS.LOGGED_USER);
