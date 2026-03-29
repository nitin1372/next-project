"use client";

import ProductSectionSlider from "./ProductSectionSlider";
import { premiumProductIds } from "@/data/homeSections";

export default function Premimusmartphones() {
  return (
    <div className="flex items-center justify-center">
    <ProductSectionSlider
      title="Premium Smartphones Deals"
      productIds={premiumProductIds}
      imageOnly
    />
    </div>
  );
}
