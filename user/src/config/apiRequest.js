const urlServer = "http://localhost:5000/api";

export const userRequest = {
  register: `${urlServer}/users/register`,
  login: `${urlServer}/users/login`,
  logout: `${urlServer}/users/logout`,
  getProfile: `${urlServer}/users/profile`,
  updateAvatar: `${urlServer}/users/avatar`,
  auth: `${urlServer}/users/auth`,
  search: `${urlServer}/users/search`,
  updateAuth: `${urlServer}/users/auth`,
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

export const reviewRequest = {
  create: `${urlServer}/reviews/create`,
  getAll: `${urlServer}/reviews/all`,
  getById: `${urlServer}/reviews`,
  update: `${urlServer}/reviews/update`,
  delete: `${urlServer}/reviews/delete`,
  like: `${urlServer}/reviews/like`,
};

export const feedbackRequest = {
  create: `${urlServer}/feedbacks/create`,
  getAll: `${urlServer}/feedbacks/all`,
  getById: `${urlServer}/feedbacks`,
  update: `${urlServer}/feedbacks/update`,
  delete: `${urlServer}/feedbacks/delete`,
};

export const notificationsRequest = {
  create: `${urlServer}/notifications/create`,
  readed: `${urlServer}/notifications/update`,
  getAll: `${urlServer}/notifications/all`,
  delete: `${urlServer}/notifications/delete`,
};

export const conversationRequest = {
  create: `${urlServer}/conversations/create`,
  getAll: `${urlServer}/conversations/all`,
  delete: `${urlServer}/conversations/delete`,
};

export const messageRequest = {
  create: `${urlServer}/messages/create`,
  getByConversation: `${urlServer}/messages`,
};
export const posterRequest = {
  create: `${urlServer}/posters/create`,
  update: `${urlServer}/posters/update`,
  getAll: `${urlServer}/posters/all`,
  getById: `${urlServer}/posters`,
  delete: `${urlServer}/posters/delete`,
};
