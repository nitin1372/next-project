import brands, { allProducts } from "@/data/brands";

const normalizeValue = (value = "") =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9+]+/g, " ")
    .trim();

const collapseValue = (value = "") => normalizeValue(value).replace(/\s+/g, "");

const getMeaningfulTerms = (value = "") => {
  const terms = normalizeValue(value).split(" ").filter(Boolean);

  return terms.filter((term) => term.length > 1 || terms.length === 1);
};

const createSearchBlob = (parts) =>
  parts
    .filter(Boolean)
    .map((part) => normalizeValue(part))
    .filter(Boolean)
    .join(" ");

const includesAllTerms = (text, query) => {
  const normalizedText = normalizeValue(text);
  const terms = getMeaningfulTerms(query);

  return terms.every((term) => normalizedText.includes(term));
};

const matchesQuery = (text, query) => {
  const normalizedText = normalizeValue(text);
  const normalizedQuery = normalizeValue(query);
  const collapsedText = collapseValue(text);
  const collapsedQuery = collapseValue(query);

  if (!normalizedQuery) {
    return false;
  }

  if (collapsedQuery.length > 1 && collapsedText.includes(collapsedQuery)) {
    return true;
  }

  if (normalizedText.includes(normalizedQuery)) {
    return true;
  }

  return includesAllTerms(normalizedText, normalizedQuery);
};

const getMatchScore = (text, query) => {
  const normalizedText = normalizeValue(text);
  const normalizedQuery = normalizeValue(query);
  const collapsedText = collapseValue(text);
  const collapsedQuery = collapseValue(query);

  if (!normalizedQuery) {
    return -1;
  }

  if (normalizedText === normalizedQuery || collapsedText === collapsedQuery) {
    return 500;
  }

  if (
    normalizedText.startsWith(normalizedQuery) ||
    collapsedText.startsWith(collapsedQuery)
  ) {
    return 400;
  }

  if (normalizedText.includes(` ${normalizedQuery}`)) {
    return 300;
  }

  if (collapsedQuery.length > 1 && collapsedText.includes(collapsedQuery)) {
    return 250;
  }

  if (normalizedText.includes(normalizedQuery)) {
    return 200;
  }

  if (includesAllTerms(normalizedText, normalizedQuery)) {
    return 100 + getMeaningfulTerms(normalizedQuery).length;
  }

  return -1;
};

const getBrandText = (brand) =>
  createSearchBlob([brand.label, brand.slug, `${brand.label} phones`, `${brand.label} mobiles`]);

const getProductText = (product) => {
  const brand = brands.find((item) => item.slug === product.brand);
  const description = Array.isArray(product.description)
    ? product.description.join(" ")
    : "";
  const keywords = Array.isArray(product.searchKeywords)
    ? product.searchKeywords.join(" ")
    : "";
  const combinedNames = [
    `${brand?.label || product.brand} ${product.name}`,
    `${product.brand} ${product.name}`,
    `${product.name} ${brand?.label || product.brand}`,
  ];

  return createSearchBlob([
    product.name,
    product.brand,
    brand?.label,
    `${brand?.label || product.brand} phones`,
    `${brand?.label || product.brand} mobiles`,
    ...combinedNames,
    description,
    keywords,
    product.storage,
    product.ram,
  ]);
};

const sortByRelevance = (items, getText, query) =>
  items
    .map((item) => ({
      item,
      score: getMatchScore(getText(item), query),
      text: getText(item),
    }))
    .filter(({ score }) => score >= 0)
    .sort((first, second) => second.score - first.score || first.text.length - second.text.length)
    .map(({ item }) => item);

export const getBrandBySlug = (slug) =>
  brands.find((brand) => brand.slug === slug);

export const searchCatalog = (query, options = {}) => {
  const normalizedQuery = normalizeValue(query);
  const { brandLimit, productLimit } = options;

  if (!normalizedQuery) {
    return {
      brandMatches: [],
      productMatches: [],
    };
  }

  const brandMatches = sortByRelevance(
    brands.filter((brand) => matchesQuery(getBrandText(brand), normalizedQuery)),
    getBrandText,
    normalizedQuery
  );

  const productMatches = sortByRelevance(
    allProducts.filter((product) => matchesQuery(getProductText(product), normalizedQuery)),
    getProductText,
    normalizedQuery
  );

  return {
    brandMatches:
      typeof brandLimit === "number"
        ? brandMatches.slice(0, brandLimit)
        : brandMatches,
    productMatches:
      typeof productLimit === "number"
        ? productMatches.slice(0, productLimit)
        : productMatches,
  };
};
