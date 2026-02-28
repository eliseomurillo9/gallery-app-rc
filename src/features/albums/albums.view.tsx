import "./album.css";
import { Portrait } from "./components/portrait/Portrait";
import type { Album } from "@/types/Album";
import { useEffect, useState } from "react";
import { getUserAlbums } from "@services/albumService";
import {userStore} from "@/store/user.ts";

export function AlbumsView() {
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    const userAlbums = async () => {
      const {success, error, data } = await getUserAlbums(userStore.getUser().id);

      if (!success) {
        console.error("Failed to fetch albums", error);
        return;
      }
      setAlbums(data ?? []);
    };

    userAlbums()
  }, []);
  return (
    <div className="album-view">
      {albums.map((album: Album) => (
        <Portrait
          key={album.id}
          imgHref={album.portrait}
          name={album.title}
          totalPhotos={album.itemsQuantity}
          albumId={album.id}
        />
      ))}
    </div>
  );
}
