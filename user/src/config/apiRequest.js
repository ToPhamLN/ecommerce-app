const urlServer = "http://localhost:5000/api";

export const userRequest = {
  register: `${urlServer}/users/register`,
  login: `${urlServer}/users/login`,
  logout: `${urlServer}/users/logout`,
};

export const productRequest = {
  getAllSell: `${urlServer}/products/sell/all`,
  getByIdSell: `${urlServer}/products/sell`,
};

export const brandRequest = {
  getAll: `${urlServer}/brands/all`,
  getById: `${urlServer}/brands`,
};

export const categoryRequest = {
  getAll: `${urlServer}/categories/all`,
  getById: `${urlServer}/categories`,
};

export const cartRequest = {
  create: `${urlServer}/carts/create`,
  getAll: `${urlServer}/carts/sell/all`,
  getById: `${urlServer}/carts/`,
  updateCart: `${urlServer}/carts/update`,
  delete: `${urlServer}/carts/delete`,
};

export const discountRequest = {
  code: `${urlServer}/discounts/code`,
  usecode: `${urlServer}/discounts/usecode`,
  getAll: `${urlServer}/discounts/all`,
  getById: `${urlServer}/discounts`,
  create: `${urlServer}/discounts/create`,
  update: `${urlServer}/discounts/update`,
  delete: `${urlServer}/discounts/delete`,
};

export const orderRequest = {
  create: `${urlServer}/orders/create`,
  getAllSell: `${urlServer}/orders/all`,
  getById: `${urlServer}/orders/`,
  update: `${urlServer}/orders/update`,
  delete: `${urlServer}/orders/delete`,
};
