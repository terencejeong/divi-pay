import Vue from "vue";
import Router from "vue-router";
import Welcome from "@/components/Welcome";
import Accounts from "@/components/Accounts"
import Transaction from "@/components/Transaction"

Vue.use(Router);

export default new Router({
  mode:'history',
  routes: [
    {
      path: "/",
      name: "Welcome",
      component: Welcome
    },
    {
    path:'/accounts',
    name: "Accounts",
    component: Accounts
  },
  {
    path: '/transaction',
    name: "Transaction",
    component: Transaction
  }
  ]
});
