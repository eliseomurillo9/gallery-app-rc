import { LOCAL_STORAGE_KEYS } from "@/constants/storage";
import { userStore } from "../store/user";
import type { User } from "../types/User";
import { getStorageItem, setStorageItem } from "./storageService";

export function authUser(userEmail: User["email"]) {
  try {
    const users = getStorageItem(LOCAL_STORAGE_KEYS.USERS);

    const user = users.data.find((user: User) => user.email === userEmail);
    console.log("Found user:", user);
    if (!user) {
      throw new Error("User not found, try continue as guest");
    }
    console.log("Authenticated user:", user);
    setStorageItem(LOCAL_STORAGE_KEYS.LOGGED_USER, user);
    userStore.setUser(user);
  } catch (error: unknown) {
    console.log(error);
  }
}

export function isUserAuthenticated(): boolean {
  try {
    const user = getStorageItem(LOCAL_STORAGE_KEYS.LOGGED_USER);
    if (!user) {
      return false;
    }

    // If user exists in local storage, update the user store 
    userStore.setUser(user); // this avoids two requests in the UI component
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
