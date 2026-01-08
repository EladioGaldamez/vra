export type Photoshoot = {
  _id: string;
  title: string;
  description?: string;
  images: {
    _key: string;
    alt: string;
    url: string;
  }[];
};
