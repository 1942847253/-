import Vue from 'vue'
import { strategy } from 'webpack-merge'
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

export default{
    [RECEIVE_ADDRESS](state,{address}){
        state.address=address
    },

    [RECEIVE_CATEGORYS](state,{categorys}){
        state.categorys=categorys
    },

    [RECEIVE_SHOPS](state,{shops}){
        state.shops=shops
    },

    [RECEIVE_USER_INFO](state,{userInfo}){
        state.userInfo=userInfo
    },

    [RESET_USER_INFO](state){
        state.userInfo={}
    },

    [RECEIVE_GOODS](state,{goods}){
        state.goods=goods
    },

    [RECEIVE_RATINGS](state,{ratings}){
        state.ratings=ratings
    },

    [RECEIVE_INFO](state,{info}){
        state.info=info
    },

    [ADD_COUNT](state,{food}){
        if(!food.count){ //第一次点击增加
           //food.count=1 //新增的属性不能用这个语法
           Vue.set(food, 'count', 1)
           state.carFoods.push(food)
        }else{
           food.count++
        }
    },

    [REDUCE_COUNT](state,{food}){
        if(food.count>0){
            food.count--
            if(food.count===0){
                state.carFoods.splice(state.carFoods.indexOf(food),1)
            }
        }
    },

    [DELETE_CAR_FOOD](state){
        state.carFoods.forEach(food =>food.count=0)
        state.carFoods=[]
    },

    [RECEIVE_SEARCH_SHOPS](state,{searchInfo}){
        state.searchInfo=searchInfo
    }

}