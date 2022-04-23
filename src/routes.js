// @mui icons
import Icon from "@mui/material/Icon";
import Dashboard from "./layout/Dashboard";
import Category from "./layout/Category/Category";
import Tags from "./layout/Tags/Tags";
import Products from "./layout/Products/Products";
import ProductForm from "./layout/Products/ProductForm";
import Users from "./layout/Users/Users";
import Posts from "./layout/Posts/Posts";
import Login from "./layout/Login/Login";
import PostForm from "./layout/Posts/PostForm";
import DeleteIcon from '@mui/icons-material/Delete';

const routes = [
  {
    type: "title",
    name: "General",
    title: "General",
    key: "general",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  }, {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <DeleteIcon />,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Add Product",
    key: "products-add",
    icon:  <DeleteIcon />,
    route: "/products/new",
    component: <ProductForm />,
    ui: false
  },
  {
    type: "collapse",
    name: "Edit Product",
    key: "products-edit",
    icon:  <DeleteIcon />,
    route: "/products/:productId",
    component: <ProductForm />,
    ui: false
  },
  {
    type: "collapse",
    name: "Products",
    key: "products",
    icon:  <DeleteIcon />,
    route: "/products",
    component: <Products />,
  },
  {
    type: "collapse",
    name: "Add Post",
    key: "post-add",
    icon:  <DeleteIcon />,
    route: "/post/new",
    component: <PostForm />,
    ui: false
  },
  {
    type: "collapse",
    name: "Edit Post",
    key: "post-edit",
    icon:  <DeleteIcon />,
    route: "/post/:postId",
    component: <PostForm />,
    ui: false
  },
  {
    type: "collapse",
    name: "Posts",
    key: "posts",
    icon:  <DeleteIcon />,
    route: "/posts",
    component: <Posts />,
  },
  {
    type: "collapse",
    name: "Category",
    key: "category",
    icon:  <DeleteIcon />,
    route: "/category",
    component: <Category />,
  },
  {
    type: "collapse",
    name: "Tags",
    key: "tags",
    icon:  <DeleteIcon />,
    route: "/tags",
    component: <Tags />,
  },
  {
    type: "collapse",
    name: "Users",
    key: "users",
    icon:  <DeleteIcon />,
    route: "/users",
    component: <Users />,
  },
  {
    name: "Login",
    key: "login",
    route: "/login",
    component: <Login />,
  },
];

export default routes;
