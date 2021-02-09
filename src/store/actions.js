import {
    RECEIVE_ADDRESS,
    RECEIVE_SHOPS,
    RECEIVE_CATEGORYS,
    RECEIVE_USER_INFO,
    RESET_USER_INFO,
    RECEIVE_GOODS,
    RECEIVE_RATINGS,
    RECEIVE_INFO,
    ADD_COUNT,
    REDUCE_COUNT,
    DELETE_CAR_FOOD,
    RECEIVE_SEARCH_SHOPS
} from './mutation-types'

import {
    reqAddress,
    reqCategorys,
    reqShops,
    reqUserInfo,
    reqLogout,
    reqShopGoods,
    reqShopRatings,
    reqShopInfo,
    reqSearchShops,
  } from '../api'
import { call } from 'file-loader'
import state from './state'

export default{
    //异步获取地址
   async getAddress({commit,state}){
        //发送异步Ajax请求
        const geohash = state.latitude+','+state.longitude
        const result = await reqAddress(geohash)
        //根据结果提交一个mutilation
           if (result.code===0) {
               const address=result.data
               commit(RECEIVE_ADDRESS,{address})
         }       
    },
    //异步获取食品分类
    async getCategorys({commit}){
        //发送异步Ajax请求
        const result = await reqCategorys()
        //根据结果提交一个mutilation
           if (result.code===0) {
               const categorys=result.data
               commit(RECEIVE_CATEGORYS,{categorys})
         }       
    },

    //异步获取商家
    async getShops({commit,state}){
        //发送异步Ajax请求
        const latitude=state.latitude
        const longitude=state.longitude
        const result = await reqShops(longitude,latitude)
        //根据结果提交一个mutilation
           if (result.code===0) {
               const shops=result.data
               commit(RECEIVE_SHOPS,{shops})
         }       
    },

    //同步记录用户信息
    saveUser({commit},userInfo){
        commit(RECEIVE_USER_INFO,{userInfo})
    },

    //异步获取用户信息
    async getUserInfo({commit}){
        const result = await reqUserInfo()
        if(result.code===0){
            const userInfo = result.data
            commit(RECEIVE_USER_INFO,{userInfo})
        }
    },

    //异步登出
    async logout({commit}){
        const result = await reqLogout()
        if ((result.code===0)) {
            commit(RESET_USER_INFO)
        }
    },

    //异步获取商家商品列表
    async getShopGoods({commit},callback){
        const result = await reqShopGoods()
        if(result.code===0){
            const goods =result.data
            commit(RECEIVE_GOODS,{goods})
            callback && callback()
            
        } 
    },

    //异步获取商家评论列表
    async getShopRatings({commit},callback){
       const result =await reqShopRatings()
       if(result.code===0){
           const ratings = result.data
           commit(RECEIVE_RATINGS,{ratings})
           callback && callback()
       }
    },

    //异步获取店铺信息
    async getShopInfo({commit},callback){
       const result=await reqShopInfo()
       if(result.code===0){
           const info = result.data
           commit(RECEIVE_INFO,{info})
           callback&&callback()
       }
    },

    //同步更新food中的count属性
    updatFoodCount({commit},{isAdd,food}){
        if(isAdd){
           commit(ADD_COUNT,{food})
        }else{
           commit(REDUCE_COUNT,{food}) 
        }
    },

    //同步删除购物车列表
    deleteCarFood({commit}){
        commit(DELETE_CAR_FOOD)
    },

    //异步获取搜索列表信息    
    async searchInfo({commit,state},keyword){
        const geohash = state.latitude+','+state.longitude
        const result = await reqSearchShops(geohash,keyword)
        if(result.code===0){
            const searchInfo = result.data
            commit(RECEIVE_SEARCH_SHOPS,{searchInfo})
        }
    }

    

}