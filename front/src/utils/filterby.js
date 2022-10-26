export const filterby = (products, value, prop) => {
  if (value === "all") return products;
  let prodfilt = products.filter((p) => p[prop] === value);
  return prodfilt;
};
