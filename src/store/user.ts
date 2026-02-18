import type { User } from "../types/User";
import {getLocalUserInfo} from "@services/authService.ts";
class UserStore {
  private static instance: UserStore;
  private user: User = {} as User;
  private readonly listeners: Set<() => void> = new Set();

  private constructor() {}

  public static getUserInstance() {
    if (!UserStore.instance) {
      UserStore.instance = new UserStore();
    }
    return UserStore.instance;
  }
  public setUser(userInfo: User): void {
    this.user = userInfo;
    console.log("Setting user:", userInfo);
    this.listeners.forEach((listener) => listener());
  }

  public getUser() {
    return this.user;
  }

  public loadUser(): void {
    try {
      this.user = getLocalUserInfo() ?? {};
    } catch (error) {
        console.error("Error loading user:", error);
    }
  }

  public isUserAuthenticated(): boolean {
    return !!Object.keys(this.user).length
  }

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };
}

export const userStore = UserStore.getUserInstance();
