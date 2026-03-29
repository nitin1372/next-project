"use client";

import ProductSectionSlider from "./ProductSectionSlider";
import { midrangeProductIds } from "@/data/homeSections";

export default function Midrangessmartphones() {
  return (
      <div className="flex items-center justify-center">
    <ProductSectionSlider
      title="Mid Range Smartphones"
      productIds={midrangeProductIds}
      imageOnly
    />
    </div>

  );
}
