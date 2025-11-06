export async function initUserInfo(): Promise<void> {
  try {
    if (window.localStorage.getItem("users") && window.localStorage.getItem("photos") && window.localStorage.getItem("albums")) {
      return;
    }
    const users = await import("../assets/data/users.json");
    const photos = await import("../assets/data/photos.json");
    const albums =  await import("../assets/data/albums.json");

    if (!users || !photos || !albums) {
      throw Error("Error initializing the app information");
    }

    window.localStorage.setItem("users", JSON.stringify(users));
    window.localStorage.setItem("photo", JSON.stringify(photos));
    window.localStorage.setItem("albums", JSON.stringify(albums));
  } catch (error: unknown) {
    console.error("Error fetching user:", error);
  }
}
