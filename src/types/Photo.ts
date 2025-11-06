export type Photo = {
  uuid: string;
  creationDate: string;
  link: string;
  metadata: Metadata;
};

type Metadata = {
  phone: string;
  iso: string;
  exposure: string;
  time: string;
  lens: string;
}