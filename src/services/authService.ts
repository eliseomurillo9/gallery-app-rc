import { LOCAL_STORAGE_KEYS } from "@/constants/storage";
import { userStore } from "../store/user";
import type { User } from "../types/User";

export function authUser(userEmail: User['email']) {
  const users = window.localStorage.getItem(LOCAL_STORAGE_KEYS.USERS);

  if (!users) {
    throw Error("Users not found, try reloading the page")
  }
  const user = JSON.parse(users).data.find((user: User) => user.email === userEmail)

  if (!user) {
    throw Error('User not found, try continue as guest')
  }
  
  window.localStorage.setItem(LOCAL_STORAGE_KEYS.LOGGED_USER, JSON.stringify(user))
  userStore.setUser(user)
}

export function isUserAuthenticated(): boolean {
  const userString = window.localStorage.getItem(LOCAL_STORAGE_KEYS.LOGGED_USER);
  if (!userString) {
    return false;
  }
  const user: User = JSON.parse(userString);
  userStore.setUser(user);
  return true;
}