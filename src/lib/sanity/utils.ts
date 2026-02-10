import { createImageUrlBuilder, type ImageUrlBuilder } from "@sanity/image-url";
import { sanityClient } from "sanity:client";

const imageUrlBuilder = createImageUrlBuilder(sanityClient);

export const getImageUrl = (source: any): string | undefined => {
  if (source && source.asset) {
    const image = imageUrlBuilder
      .image(source)
      .auto("format")
      .quality(80)
      .url();
    return image;
  }

  return undefined;
};
