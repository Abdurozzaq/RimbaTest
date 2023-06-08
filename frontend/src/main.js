import { createApp } from 'vue'
import App from './App.vue'

import {createRouter, createWebHistory} from 'vue-router'  

import ItemList from './components/item/ItemList.vue'
import AddItem from './components/item/AddItem.vue'
import EditItem from './components/item/EditItem.vue'
import CustomerList from './components/customer/CustomerList.vue'
import AddCustomer from './components/customer/AddCustomer.vue'
import EditCustomer from './components/customer/EditCustomer.vue'
import SalesList from './components/sales/SalesList.vue'
import DetailSales from './components/sales/DetailSales.vue'
import AddSales from './components/sales/AddSales.vue'

const routes = [
  {
    path: '/',
    name: 'ItemList',
    component: ItemList,
  },
  {
    path: '/items/add',
    name: 'AddItem',
    component: AddItem,
  },
  {
    path: '/items/edit/:id',
    name: 'EditItem',
    component: EditItem,
  },
  {
    path: '/customers',
    name: 'CustomerList',
    component: CustomerList,
  },
  {
    path: '/customers/add',
    name: 'AddCustomer',
    component: AddCustomer,
  },
  {
    path: '/customers/edit/:id',
    name: 'EditCustomer',
    component: EditCustomer,
  },
  {
    path: '/sales',
    name: 'SalesList',
    component: SalesList,
  },
  {
    path: '/sales/detail/:id',
    name: 'DetailSales',
    component: DetailSales,
  },
  {
    path: '/sales/add',
    name: 'AddSales',
    component: AddSales,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
createApp(App).use(router).mount('#app')