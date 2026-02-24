import { createImageUrlBuilder, type ImageUrlBuilder } from "@sanity/image-url";
import { sanityClient } from "sanity:client";

const imageUrlBuilder = createImageUrlBuilder(sanityClient);

const VALID_IMAGE_SIZES: string[] = [
  "320w",
  "480w",
  "768w",
  "1024w",
  "1280w",
  "1536w",
  "1920w",
  "2048w",
]

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

export const getResponsiveImageLinks = (source: any): string[] => {
  const links: string[] = [];

  if (source && source.asset) {
    VALID_IMAGE_SIZES.forEach((size) => {
      const width = parseInt(size.replace("w", ""));

      const link = imageUrlBuilder
        .image(source)
        .auto("format")
        .quality(80)
        .width(width)
        .url();

      links.push(link);
    });
  }

  return links;
}

export const getImageSrcSet = (source: any): { srcSet: string; sizes: string; } => {
  const links = getResponsiveImageLinks(source);
  const srcSet = VALID_IMAGE_SIZES.map((size, index) => `${links[index]} ${size}`).join(", ");
  const sizes = VALID_IMAGE_SIZES.map((size) => `(max-width: ${parseInt(size.replace("w", ""))}px) ${size}`).join(", ");

  return { srcSet, sizes };
}