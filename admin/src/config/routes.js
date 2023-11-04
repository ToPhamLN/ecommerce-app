import LoginPage from "../pages/Login/LoginPage";
import RegisterPage from "../pages/Register/RegisterPage";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import ProductPage from "../pages/Product/ProductPage";
import CreateProduct from "../pages/Product/CreateProduct";
import UpdateProduct from "../pages/Product/UpdateProduct";
import ProductItem from "../pages/Product/ProductItem";
import ProcessPage from "../pages/Process/ProcessPage";
import OrderPage from "../pages/Order/OrderPage";
import PaymentPage from "../pages/Payment/PaymentPage";
import CategoryPage from "../pages/Category/CategoryPage";
import UpdateCategory from "../pages/Category/UpdateCategory";
import BrandPage from "../pages/Brand/BrandPage";
import UpdateBrand from "../pages/Brand/UpdateBrand";
import DiscountPage from "../pages/Discount/DiscountPage";
import UpdateDiscount from "../pages/Discount/UpdateDiscount";
import GoodsInfo from "../pages/Process/GoodsInfo";
import ProfilePage from "../pages/Profile/ProfilePage";
import UserPage from "../pages/User/UserPage";
import FeedbackPage from "../pages/Feedback/FeedbackPage";
import FeedbackView from "../pages/Feedback/FeedbackView";
import OrderView from "../pages/Order/OrderView";

export const routes = {
  login: "/login",
  register: "/register",
  profile: "/profile",
  dashboard: "/",
  process: "/good",
  processId: "/good/:cartId",
  order: "/order",
  orderId: "/order/:orderId",
  payment: "/payment",
  product: "/product",
  createProduct: "/product/create",
  productId: "/product/:productId",
  productItem: "/products/:productId",
  productUpdate: "/product/:productId/update",
  category: "/category",
  categoryId: "/category/:categoryId",
  brand: "/brand",
  brandId: "/brand/:brandId",
  discount: "/discount",
  discountId: "/discount/:discountId",
  user: "/user",
  feedback: "/feedback",
  feedbackId: "/feedback/:feedbackId",
};

export const publicRoutes = [
  { path: routes.login, component: LoginPage },
  { path: routes.register, component: RegisterPage },
];

export const privateRoutes = [
  { path: routes.profile, component: ProfilePage },
  { path: routes.dashboard, component: DashboardPage },
  { path: routes.process, component: ProcessPage },
  { path: routes.processId, component: GoodsInfo },
  { path: routes.order, component: OrderPage },
  { path: routes.orderId, component: OrderView },
  { path: routes.payment, component: PaymentPage },
  { path: routes.product, component: ProductPage },
  { path: routes.productUpdate, component: UpdateProduct },
  { path: routes.createProduct, component: CreateProduct },
  { path: routes.productItem, component: ProductItem },
  { path: routes.category, component: CategoryPage },
  { path: routes.categoryId, component: UpdateCategory },
  { path: routes.brand, component: BrandPage },
  { path: routes.brandId, component: UpdateBrand },
  { path: routes.discount, component: DiscountPage },
  { path: routes.discountId, component: UpdateDiscount },
  { path: routes.user, component: UserPage },
  { path: routes.feedback, component: FeedbackPage },
  { path: routes.feedbackId, component: FeedbackView },
];
