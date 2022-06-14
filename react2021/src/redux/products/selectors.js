export const getProductByIdSelector = (store, id) => {
    return store.products.productsList.find((product) => product.id === id);
  };

export const getSelectedProduct = (store) => {
    return store.products.selectedProduct;
  };