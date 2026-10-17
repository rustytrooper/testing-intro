const products = require('../../src/data/products');
const { sortProductsByPrice } = require('../../src/catalog');

describe('sortProductsByPrice', () => {
  test("все товары c 'asc' сортируются как [3, 6, 5, 4, 2, 1]", () => {
    expect(sortProductsByPrice(products, 'asc')).toEqual([products[2], products[5], products[4], products[3], products[1], products[0]]);
  });
  test('все товары без направления сортируются как [3, 6, 5, 4, 2, 1]', () => {
    expect(sortProductsByPrice(products)).toEqual([products[2], products[5], products[4], products[3], products[1], products[0]]);
  });
  test("товары [1, 3, 4] c 'asc' сортируются как [3, 4, 1]", () => {
    expect(sortProductsByPrice([products[0], products[2], products[3],], 'asc')).toEqual([products[2], products[3], products[0]]);
  });
  test("все товары c 'desc' сортируются как [1, 2, 4, 5, 6, 3]", () => {
    expect(sortProductsByPrice(products, 'desc')).toEqual([products[0], products[1], products[3], products[4], products[5], products[2]]);
  });
  test("товары [3, 1, 4] c 'desc' сортируются как [1, 4, 3]", () => {
    expect(sortProductsByPrice([products[2], products[0], products[3],], 'desc')).toEqual([products[0], products[3], products[2]]);
  });
  test("товары [5, 2, 6] c 'desc' сортируются как [2, 5, 6]", () => {
    expect(sortProductsByPrice([products[4], products[1], products[5],], 'desc')).toEqual([products[1], products[4], products[5]]);
  });
  test("'asc' не меняет исходный массив [1, 3, 4]", () => {
     const result = sortProductsByPrice([products[0], products[2], products[3]], 'asc');
     expect(result.map((p) => p.id)).toEqual([3, 4, 1]);
  });
  test("'desc' не меняет исходный массив [1, 3, 4]", () => {
     const result = sortProductsByPrice([products[0], products[2], products[3]], 'desc');
     expect(result.map((p) => p.id)).toEqual([1, 4, 3]);
  });
  test('направление по умолчанию не меняет исходный массив всех товаров', () => {
    const originalOrder = products.map((p) => p.id); 
    sortProductsByPrice(products);
    expect(products.map((p) => p.id)).toEqual(originalOrder);
  });
});
