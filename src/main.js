import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import VuePageTransition from 'vue-page-transition'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import AddProduct from "./components/AddProdct.vue";
import Welcome from "./components/Welcome.vue";
import Products from "./components/Products.vue";
import Category from "./components/Category.vue";
import UploadFile from "./components/UploadFile.vue";

// import AddCategory from "./components/AddCategory.vue";


Vue.use(VuePageTransition)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.config.productionTip = false
Vue.use(VueRouter)
const routes=new VueRouter({
  routes:[
    {
      path:'/addProduct',
      component: AddProduct

    },
    {
      path:'/welcome',
      component: Welcome
    },
    {
      path:'/products',
      component: Products
    },
    {
      path:'/category',
      component: Category
    },
    {
      path:'/upload',
      component: UploadFile
    },
   
  ],
 
  
  
})
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink, concat } from 'apollo-link';

const GC_AUTH_TOKEN='apollo-token';
const token = localStorage.getItem(GC_AUTH_TOKEN) || null
const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: `Bearer ${token}`
    }
  })
  return forward(operation)
})

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:8000/graphql',
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
export  const apolloClient = new ApolloClient({
  // link: httpLink,
  link: concat(authMiddleware, httpLink),
  cache,
})

import VueApollo from 'vue-apollo'

Vue.use(VueApollo)
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})
new Vue({
 router: routes,
 apolloProvider,
  render: h => h(App), 
}).$mount('#app')
