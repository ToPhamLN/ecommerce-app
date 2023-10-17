import HomePage from "../pages/Home/HomPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import LoginPage from "../pages/Login/LoginPage";
import RegisterPage from "../pages/Register/RegisterPage";
import ProductPage from "../pages/Product/ProductPage";
import OrderPage from "../pages/Order/OrderPage";
import CartPage from "../pages/Cart/CartPage";
import UpdateCart from "../pages/Cart/UpdateCart";
import GoodsPage from "../pages/Goods/GoodsPage";
import GoodsInfo from "../pages/Goods/GoodsInfo";

export const routes = {
  login: "/login",
  register: "/register",
  home: "/",
  profile: "/profile",
  productId: "/products/:productId",
  order: "/order",
  goods: "/goods",
  goodsId: "/goods/:cartId",
  cart: "/cart",
  cartId: "/cart/:cartId",
};

export const publicRoutes = [
  { path: routes.login, component: LoginPage },
  { path: routes.register, component: RegisterPage },
  { path: routes.home, component: HomePage },
];

export const privateRoutes = [
  { path: routes.productId, component: ProductPage },
  { path: routes.order, component: OrderPage },
  { path: routes.cart, component: CartPage },
  { path: routes.cartId, component: UpdateCart },
  { path: routes.goods, component: GoodsPage },
  { path: routes.goodsId, component: GoodsInfo },
  { path: routes.profile, component: ProfilePage },
];
