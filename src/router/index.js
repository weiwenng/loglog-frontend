import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"
import Sales from "../views/Sales.vue"
import Order from "../views/Order.vue"
import Menu from "../views/Menu.vue";
import Checklist from "../views/Checklist.vue"
import OrderDetail from "../components/OrderDetail.vue"
import Warehouse from "../views/Warehouse.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/sales",
    name: "Sales",
    component: Sales,
  },
  {
    path: "/order",
    name: "Order",
    component: Order,
  },
  {
    path: "/order/:id",
    name: "OrderDetail",
    component: OrderDetail,
    props: (route) => ({ id: parseInt(route.params.id) }),
  },
  {
    path: "/menu",
    name: "Menu",
    component: Menu,
  },
  {
    path: "/warehouse",
    name: "Warehouse",
    component: Warehouse,
  },
  {
    path: "/checklist",
    name: "Checklist",
    component: Checklist,
  },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router