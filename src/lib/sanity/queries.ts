export const HOME_QUERY = `*[_type == "vra.home"] | order(_createdAt asc) [0] {
  ...,
  photoshoots[]->{
    _id,
    title,
    description,
    images[] {
      _key,
      alt,
      "url": asset->url,
    }
  }
}`;
