const urlServer = "http://localhost:5000/api";

export const userRequest = {
  register: `${urlServer}/users/register`,
  login: `${urlServer}/users/login`,
  logout: `${urlServer}/users/logout`,
};

export const productRequest = {
  getAll: `${urlServer}/products/all`,
  getById: `${urlServer}/products`,
  create: `${urlServer}/products/create`,
  update: `${urlServer}/products/update`,
  delete: `${urlServer}/products/delete`,
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