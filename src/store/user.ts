import type { User } from "../types/User";
class UserStore {
  private static instance: UserStore;
  private user: User | null = null;

  private constructor() {}

  public static getUserInstance() {
    if (!UserStore.instance) {
      UserStore.instance = new UserStore();
    }
    return UserStore.instance;
  }
  public setUser(userInfo: User): void {
    console.log("Setting user:", userInfo);
    this.user = userInfo;
  }

  public getUser(): User {
    if (!this.user) {
      throw new Error("User not set");
    }
    console.log("Getting user:", this.user);
    return this.user;
  }
}

export const userStore = UserStore.getUserInstance();
