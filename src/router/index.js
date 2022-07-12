import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"
import Sales from "../views/Sales.vue"
import Stocks from "../views/Stocks.vue"
import Menu from "../views/Menu.vue";
import Checklist from "../views/Checklist.vue"
import StocksDetail from "../components/StocksDetail.vue"

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
    path: "/stocks",
    name: "Stocks",
    component: Stocks,
  },
  {
    path: "/stocks/:id",
    name: "StocksDetail",
    component: StocksDetail,
    props: route => ({ id: parseInt(route.params.id)}),
  },
  {
    path: "/menu",
    name: "Menu",
    component: Menu,
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