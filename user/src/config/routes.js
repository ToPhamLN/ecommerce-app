import HomePage from "../pages/Home/HomPage";
import LoginPage from "../pages/Login/LoginPage";
import RegisterPage from "../pages/Register/RegisterPage";
import ProductPage from "../pages/Product/ProductPage";
import OrderPage from "../pages/Order/OrderPage";
import PaymentPage from "../pages/Payment/PaymentPage";
import CategoryPage from "../pages/Category/CategoryPage";
import BrandPage from "../pages/Brand/BrandPage";
import CartPage from "../pages/Cart/CartPage";
import UpdateCart from "../pages/Cart/UpdateCart";
import FeedPage from "../pages/Feed/FeedPage";
export const routes = {
  login: "/login",
  register: "/register",
  home: "/",
  feed: "/feed",
  productId: "/products/:productId",
  order: "/order",
  payment: "/payment",
  category: "/category",
  brand: "/brand",
  cart: "/cart",
  cartId: "/cart/:cartId",
};

export const publicRoutes = [
  { path: routes.login, component: LoginPage },
  { path: routes.register, component: RegisterPage },
  { path: routes.home, component: HomePage },
];

export const privateRoutes = [
  { path: routes.feed, component: FeedPage },
  { path: routes.productId, component: ProductPage },
  { path: routes.order, component: OrderPage },
  { path: routes.payment, component: PaymentPage },
  { path: routes.category, component: CategoryPage },
  { path: routes.brand, component: BrandPage },
  { path: routes.cart, component: CartPage },
  { path: routes.cartId, component: UpdateCart },
];
