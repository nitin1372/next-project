"use client";

import ProductSectionSlider from "./ProductSectionSlider";
import { exploreProductIds } from "@/data/homeSections";

export default function Moreexplore() {
  return (
          <div className="flex items-center justify-center">
    <ProductSectionSlider

      title="More to Explore"
      productIds={exploreProductIds}
       imageOnly
    />
    </div>
  );
}
