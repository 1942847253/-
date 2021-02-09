<template>
  <div>
         <section class="msite">
        <!--首页头部-->
        <header-top :title="address.name">
          <router-link :to="userInfo._id?'/userinfo':'/search'" class="header_search" slot="left">
            <i class="iconfont icon-sousuo"></i>
          </router-link>
          <router-link :to="userInfo._id?'/profile':'/login'" class="header_login" slot="right">
            <span class="header_login_text" v-if="!userInfo._id">
              登录|注册
            </span>
            <span class="header_login_text" v-else>
              <i class="iconfont icon-person"></i>
            </span>           
          </router-link>
         
            
          
        </header-top>
        <!--首页导航-->
        <nav class="msite_nav">
          <div class="swiper-container" v-if="categorys.length>0">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(categorys,index) in categorysArr" :key="index">
                <a href="javascript:" class="link_to_food" v-for="(category,index) in categorys" :key="index">
                  <div class="food_container">
                    <img :src="baseImageUrl+category.image_url">
                  </div>
                  <span>{{category.title}}</span>
                </a>
              </div>
              
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination" slot="pagination"></div>
          </div>
          <img src="./images/msite_back.svg" alt="back" v-else>
        </nav>
        <!--首页附近商家-->
        <div class="msite_shop_list">
          <div class="shop_header">
            <i class="iconfont icon-xuanxiang"></i>
            <span class="shop_header_title">附近商家</span>
          </div>
          <shop-list></shop-list>
          
        </div>
      </section>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
  import Swiper from 'swiper'
  import 'swiper/swiper-bundle.css'
  import ShopList from '../../components/ShopList/ShopList.vue'

  export default {
    data() {
      return {
        baseImageUrl: 'http://fuss10.elemecdn.com',
      };
    },

    computed: {
      ...mapState(['address','categorys','userInfo']),

      //categorys一维数组生成一个二维数组，二维数组的长度为8
      categorysArr(){
        const {categorys} = this
        //准备一个空的二维数组
        const bigArr=[]
        //准备一个小数组(最大长度为8)
        let minArr=[]
        categorys.forEach(c=>{       
          //如果小数组满了，创建一个新的
          if(minArr.length===8){
            minArr=[]
          }
          //如果minArr是空的，将小数组保存到大数组
          if(minArr.length===0){
            bigArr.push(minArr)
          }
          minArr.push(c)
          
        })
        return bigArr
        
      },
    },

    watch: {
        categorys(value) {
          //界面更新就立即创建swiper对象，实现轮播效果
          this.$nextTick(()=>{ //一旦完成界面更新，立即调用(词条语句要写咋数据更新之后)
          new Swiper('.swiper-container',{
          loop:true, //可以实现无缝滑屏
          //分页器
          pagination:{
            el:'.swiper-pagination',
          },
       })
      })
    },    
   },

    mounted() {
      this.$store.dispatch('getCategorys') 
      this.$store.dispatch('getShops')
    },
    components: { 
      HeaderTop,
      ShopList
     },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"

 .header {
  background-color: #02a774;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 45px;
}
 .header   .header_search {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  width: 10%;
  height: 50%;
}
 .header   .header_search .icon-sousuo {
  font-size: 25px;
  color: #fff;
}
 .header   .header_title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  color: #fff;
  text-align: center;
  margin-left: -5%;
}
 .header   .header_title .header_title_text {
  font-size: 20px;
  color: #fff;
  display: block;
}
 .header   .header_login {
  font-size: 14px;
  color: #fff;
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
}
 .header   .header_login .header_login_text {
  color: #fff;
}
    .msite .msite_nav {
  position: relative;
  margin-top: 45px;
  height: 200px;
  background: #fff;
}
    .msite .msite_nav::before {
  content: '';
  position: absolute;
  z-index: 200;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background-color: #e4e4e4;
  transform: scaleY(0.5);
}
    .msite .msite_nav .swiper-container {
  width: 100%;
  height: 100%;
}
    .msite .msite_nav .swiper-container .swiper-wrapper {
  width: 100%;
  height: 100%;
}
    .msite .msite_nav .swiper-container .swiper-wrapper .swiper-slide {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
}
    .msite .msite_nav .swiper-container .swiper-wrapper .swiper-slide .link_to_food {
  width: 25%;
}
    .msite .msite_nav .swiper-container .swiper-wrapper .swiper-slide .link_to_food .food_container {
  display: block;
  width: 100%;
  text-align: center;
  padding-bottom: 10px;
  font-size: 0;
}
    .msite .msite_nav .swiper-container .swiper-wrapper .swiper-slide .link_to_food .food_container img {
  display: inline-block;
  width: 50px;
  height: 50px;
}
    .msite .msite_nav .swiper-container .swiper-wrapper .swiper-slide .link_to_food span {
  display: block;
  width: 100%;
  text-align: center;
  font-size: 13px;
  color: #666;
}
    .msite .msite_nav .swiper-container .swiper-pagination >span.swiper-pagination-bullet-active {
  background: #02a774;
}
    .msite .msite_shop_list {
  position: relative;
  margin-top: 10px;
  background: #fff;
}
    .msite .msite_shop_list::before {
  content: '';
  position: absolute;
  z-index: 200;
  left: 0;
  top: 0;
  width: 100%;
  height: 1px;
  background-color: #e4e4e4;
}
    .msite .msite_shop_list .shop_header {
  padding: 10px 10px 0;
}
    .msite .msite_shop_list .shop_header .shop_icon {
  margin-left: 5px;
  color: #999;
}
    .msite .msite_shop_list .shop_header .shop_header_title {
  color: #999;
  font-size: 14px;
  line-height: 20px;
}
 
</style>
