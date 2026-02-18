import type {AlbumPhoto} from "./Photo";

export interface Album {
  id: number;
  title: string;
  portrait: string;
  itemsQuantity: number;
  photos: AlbumPhoto[]
}

export type UserAlbum = Omit<Album, 'photos'>;

