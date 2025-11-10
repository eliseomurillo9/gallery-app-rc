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
    this.user = userInfo;
  }

  public getUser(): User | undefined {
    if (!this.user) {
      return;
    }
    return this.user;
  }

  public getUserPhotos() {
    if (!this.user?.photos) {
      return;
    }

    return this.user.photos;
  }

  public getUserAlbums() {
    if (!this.user?.albums) {
      return;
    }

    return this.user.albums;
  }
}

export const userStore = UserStore.getUserInstance();
