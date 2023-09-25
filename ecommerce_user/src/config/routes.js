import LoginPage from "../pages/Login/LoginPage";
import RegisterPage from "../pages/Register/RegisterPage";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import ProductPage from "../pages/Product/ProductPage";
import ProcessPage from "../pages/Process/ProcessPage";
import OrderPage from "../pages/Order/OrderPage";
import PaymentPage from "../pages/Payment/PaymentPage";
import CategoryPage from "../pages/Category/CategoryPage";
import BrandPage from "../pages/Brand/BrandPage";
export const routes = {
  login: "/login",
  register: "/register",
  dashboard: "/dashboard",
  product: "/product",
  process: "/process",
  order: "/order",
  payment: "/payment",
  category: "/category",
  brand: "/brand",
};

export const publicRoutes = [
  { path: routes.login, component: LoginPage },
  { path: routes.register, component: RegisterPage },
];

export const privateRoutes = [
  { path: routes.dashboard, component: DashboardPage },
  { path: routes.product, component: ProductPage },
  { path: routes.process, component: ProcessPage },
  { path: routes.order, component: OrderPage },
  { path: routes.payment, component: PaymentPage },
  { path: routes.category, component: CategoryPage },
  { path: routes.brand, component: BrandPage },
];
