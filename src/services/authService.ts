import { LOCAL_STORAGE_KEYS } from "@/constants/storage";
import { userStore } from "../store/user";
import type { User } from "../types/User";
import { getStorageItem, setStorageItem } from "./storageService";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

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

    userStore.setUser(user);
    setStorageItem(LOCAL_STORAGE_KEYS.LOGGED_USER, user);

    return user;
  } catch (error: unknown) {
    console.log(error);
  }
}

export function isUserAuthenticated(): boolean {
  const user = globalThis.localStorage.getItem(LOCAL_STORAGE_KEYS.LOGGED_USER);
  return !!user;
}

export function hydrateUser() {
  const user = getStorageItem(LOCAL_STORAGE_KEYS.LOGGED_USER);

  // If user exists in local storage, update the user store
  userStore.setUser(user); // this avoids two requests in the UI component
}
