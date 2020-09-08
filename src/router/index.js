import MainLayout from "../layout";
// GeneralViews
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Brokers from "../pages/Brokers";
import Agencies from "../pages/Agencies";
import ProductDetails from "../pages/ProductDetails";

export const authRoutes = [
  {
    path: "/",
    component: Brokers,
    name: "Brokers",
    icon: "team",
    showAlways: true,
  },
  {
    path: "/agencies",
    component: Agencies,
    name: "Agencies",
    icon: "shop",
    showAlways: true,
  },
  {
    path: "/product/:productSlug",
    component: ProductDetails,
    name: "Product details",
    icon: "team",
    showAlways: false,
  },
];
export const baseRoutes = [
  {
    path: "/login",
    component: Login,
    name: "Dashboard",
    noAuth: true,
  },
  {
    path: "/sign-up",
    component: SignUp,
    name: "Sign Up",
    noAuth: true,
  },
  {
    path: "/",
    component: MainLayout,
    name: "Main Layout",
  },
];
