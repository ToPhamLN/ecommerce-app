const urlServer = "http://localhost:5000/api";

export const userRequest = {
  register: `${urlServer}/users/register`,
  login: `${urlServer}/users/login`,
  logout: `${urlServer}/users/logout`,
};

export const cartRequest = {
  create: `${urlServer}/carts/create`,
  getAll: `${urlServer}/carts/sell/all`,
  getById: `${urlServer}/carts/`,
  updateCart: `${urlServer}/carts/update`,
  delete: `${urlServer}/carts/delete`,
};

export const productRequest = {
  getAll: `${urlServer}/products/all`,
  getById: `${urlServer}/products`,
  create: `${urlServer}/products/create`,
  update: `${urlServer}/products/update`,
  delete: `${urlServer}/products/delete`,
  getByIdSell: `${urlServer}/products/sell`,
  getAllSell: `${urlServer}/products/sell/all`,
};

export const orderRequest = {
  create: `${urlServer}/orders/create`,
  getAllSell: `${urlServer}/orders/all`,
  getById: `${urlServer}/orders/`,
  update: `${urlServer}/orders/update`,
  delete: `${urlServer}/orders/delete`,
  currentcy: `${urlServer}/orders/currentcy`,
};

export const brandRequest = {
  getAll: `${urlServer}/brands/all`,
  getById: `${urlServer}/brands`,
  create: `${urlServer}/brands/create`,
  update: `${urlServer}/brands/update`,
  delete: `${urlServer}/brands/delete`,
};

export const categoryRequest = {
  getAll: `${urlServer}/categories/all`,
  getById: `${urlServer}/categories`,
  create: `${urlServer}/categories/create`,
  update: `${urlServer}/categories/update`,
  delete: `${urlServer}/categories/delete`,
};

export const discountRequest = {
  getAll: `${urlServer}/discounts/all`,
  getById: `${urlServer}/discounts`,
  create: `${urlServer}/discounts/create`,
  update: `${urlServer}/discounts/update`,
  delete: `${urlServer}/discounts/delete`,
};

export const reviewRequest = {
  create: `${urlServer}/reviews/create`,
  getAll: `${urlServer}/reviews/all`,
  getById: `${urlServer}/reviews/`,
  update: `${urlServer}/reviews/update`,
  delete: `${urlServer}/reviews/delete`,
};
