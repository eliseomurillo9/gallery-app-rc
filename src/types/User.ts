export type User = {
  id: number;
  name: string;
  email: string;
  avatar: string;
  photos: Array<{
    id: number;
    url: string;
  }>;
  albums: Array<{
    id: number;
    title: string;
    portrait: string;
    itemsQuantity: number;
  }>;
};
