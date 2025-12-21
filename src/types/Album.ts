import type { UserPhoto } from "./Photo";

export interface Album {
  id: number;
  title: string;
  portrait: string;
  itemsQuantity: number;
  photos: UserPhoto[]
}

export type UserAlbum = Omit<Album, 'photos'>;

