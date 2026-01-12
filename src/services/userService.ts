import { LOCAL_STORAGE_KEYS } from "../constants/storage";

const { localStorage } = globalThis;
export async function initUserInfo(): Promise<void> {
  try {
    if (
      localStorage.getItem("users") &&
      localStorage.getItem("photos") &&
      localStorage.getItem("albums")
    ) {
      return;
    }
    const users = await import("../assets/data/users.json");
    const photos = await import("../assets/data/photos.json");
    const albums = await import("../assets/data/albums.json");

    if (!users || !photos || !albums) {
      throw new Error("Error initializing the app information");
    }

    localStorage.setItem(LOCAL_STORAGE_KEYS.USERS, JSON.stringify(users));
    localStorage.setItem(LOCAL_STORAGE_KEYS.PHOTOS, JSON.stringify(photos));
    localStorage.setItem(LOCAL_STORAGE_KEYS.ALBUMS, JSON.stringify(albums));
  } catch (error: unknown) {
    console.error("Error fetching user:", error);
  }
}
