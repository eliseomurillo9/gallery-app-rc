import type { User } from "../types/User";
class UserStore {
  private static instance: UserStore;
  private user: User | null = null;

  private constructor() {}

  public static getUserInstance() {
    if (!UserStore.instance) {
      console.log('not instance')
      UserStore.instance = new UserStore()
    }
    console.log("instance")
    return UserStore.instance;
  }
  public setUser(userInfo: User): void {
    console.log("SeTting user info")
    this.user = userInfo;
  }

  public getUser(): User | undefined{
    console.log("getting user info")
    if (!this.user) {
      return;
    }
    return this.user;
  }
}

export const userStore = UserStore.getUserInstance();