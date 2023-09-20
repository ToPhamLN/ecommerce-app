import LoginPage from "../pages/Login/LoginPage";
import RegisterPage from "../pages/Register/RegisterPage";
import DashboardPage from "../pages/Dashboard/DashboardPage";
const routes = {
  login: "/login",
  register: "/register",
  dashboard: "/dashboard",
};

export const publicRoutes = [
  { path: routes.login, component: LoginPage },
  { path: routes.register, component: RegisterPage },
];

export const privateRoutes = [
  { path: routes.dashboard, component: DashboardPage },
];
