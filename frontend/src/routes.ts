import AddProduct from "./views/AddProduct";
import Home from "./views/Home";
import User from "./views/User";

export const routes = Object.freeze([
    {
        path:"/",
        component: Home,
    },
    {
        path:"/user/:id",
        component: User,
    },
    {
        path:"/add-product",
        component: AddProduct,
    }
]);

export const navRoutes = Object.freeze([
    {
        path:"/",
        name: "Home"
    },
]);