"use client";

import ProductSectionSlider from "./ProductSectionSlider";
import { budgetProductIds } from "@/data/homeSections";

export default function BudgetSmartphones() {
  return (
  <div className="flex items-center justify-center">
    <ProductSectionSlider
      title="Budget Smartphones Deals"
      productIds={budgetProductIds}
      imageOnly
    />
    </div>
  );
}
