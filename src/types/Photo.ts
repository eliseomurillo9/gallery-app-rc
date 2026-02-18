export type Photo = {
  id?: number;
  creationDate: string;
  url: string;
  metadata?: Metadata;
};

type Metadata = {
  phone: string;
  iso: string;
  exposure: string;
  time: string;
  lens: string;
};

export type AlbumPhoto = {
  id: number;
  url: string;
  albumId: number;
};
