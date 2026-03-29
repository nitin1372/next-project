export const getProductGallery = (product) => {
  const baseImages =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : [product.image].filter(Boolean);

  const gallery = [...baseImages].filter(Boolean);

  while (gallery.length > 0 && gallery.length < 4) {
    gallery.push(baseImages[gallery.length % baseImages.length] || baseImages[0]);
  }

  return gallery.length > 0 ? gallery.slice(0, 4) : ["/logo1.png"];
};
