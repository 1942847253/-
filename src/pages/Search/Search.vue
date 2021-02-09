<template>
		<section class="search">
		  <header-top title="搜索"></header-top>
			<form class="search_form" @submit.prevent="search"> 
        <input type="search" placeholder="请输入商家名称" class="search_input" v-model="keyword"> 
        <input type="submit"
				 class="search_submit"> </form>
			<section class="list" v-if="!noSearchInfo">
				<ul class="list_container">
					<router-link to="/shop" tag="li" class="list_li" v-for="(info,index) in searchInfo" :key="index">
						<section class="item_left"> <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.res.jmbbs.com%2Fattachment%2Fforum%2F201906%2F24%2F135227gz22kwp1rp12zcc2.jpg&refer=http%3A%2F%2Fimg.res.jmbbs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615126754&t=01f6cf755d31c212daa4984c166c7ddb" class="restaurant_img">
						</section>
						<section class="item_right">
							<div class="item_right_text">
								<p><span>{{info.name}}</span> </p>
								<p>月售 {{info.recent_order_num}} 单</p>
								<p>20 元起送 / 距离 {{info.distance}}</p>
							</div>
						</section>
					</router-link>
				</ul>
			</section>
      <div class="search_none" v-else>很抱歉！无搜索结果</div>
		</section>
</template>

<script>
  import {mapState} from 'vuex'
  import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'

  export default {
    data() {
      return {
        keyword: '',
        noSearchInfo:false
      }
    },

    computed: {
      ...mapState(['searchInfo'])
    },

    methods: {
      search() {
        const keyword = this.keyword.trim()
        if(keyword){
          
          this.$store.dispatch('searchInfo',keyword)
        }
      },
    },

    watch: {
      searchInfo(value) {
        if(value.length===0){
          this.noSearchInfo=true
        }else{
          this.noSearchInfo=false
        }
      },
    },

    components: { 
      HeaderTop
     },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .search
    width 100%
    height 100%
    overflow hidden
    .search_form
      clearFix()
      margin-top 45px
      background-color #fff
      padding 12px 8px
      input
        height 35px
        padding 0 4px
        border-radius 2px
        font-weight bold
        outline none
        &.search_input
          float left
          width 79%
          border 4px solid #f2f2f2
          font-size 14px
          color #333
          background-color #f2f2f2
        &.search_submit
          float right
          width 18%
          border 4px solid #02a774
          font-size 16px
          color #fff
          background-color #02a774

    .list
      .list_container
        background-color: #fff;
        .list_li
          display: flex;
          justify-content: center;
          padding: 10px
          border-bottom: 1px solid $bc;
          .item_left
            margin-right: 10px
            .restaurant_img
              width 50px
              height 50px
              display block
          .item_right
            font-size 12px
            flex 1
            .item_right_text
              p
                line-height 12px
                margin-bottom 6px
                &:last-child
                  margin-bottom 0
    .search_none
      margin: 0 auto
      color: #333
      background-color: #fff
      text-align: center
      margin-top: 0.125rem
</style>