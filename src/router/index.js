//路由器对象模块
import Vue from 'vue'
import vueRouter from 'vue-router'

// import MSite from '../pages/MSite/MSite'
// import Order from '../pages/Order/Order'
// import Profile from '../pages/Profile/Profile'
// import Search from '../pages/Search/Search'

//路由组件懒加载
const MSite = ()=>import('../pages/MSite/MSite')
const Order = ()=>import('../pages/Order/Order')
const Profile = ()=>import('../pages/Profile/Profile')
const Search = ()=>import('../pages/Search/Search')

import Login from '../pages/Login/Login'
import Shop from '../pages/Shop/Shop'
import ShopGoods from '../pages/Shop/ShopGoods/Shopgoods'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo'

Vue.use(vueRouter)

export default new vueRouter({
    routes:[
        {
            path:'/msite', 
            component:MSite, //懒加载MSite变成函数，请求后才会执行，不会自动加载
            meta:{
                showFooter:true
            }
        },

        {
            path:'/search',
            component:Search,
            meta:{
                showFooter:true
            }
        },

        {
            path:'/order',
            component:Order,
            meta:{
                showFooter:true
            }
        },

        {
            path:'/profile',
            component:Profile,
            meta:{
                showFooter:true
            }
        },
        {
            path:'/login',
            component:Login
        },
        {
            path:'/',
            redirect:'/msite'
        },

        {
            path:'/shop',
            component:Shop,
            children:[
                {
                  path:'/shop/shopgoods',
                  component:ShopGoods
                },

                {
                    path:'/shop/shopratings',
                    component:ShopRatings
                  },

                  {
                    path:'/shop/shopinfo',
                    component:ShopInfo
                  },
                  {
                      path:'',
                      redirect:'/shop/shopgoods'
                  }

            ]

        }

        

        
    ]
})