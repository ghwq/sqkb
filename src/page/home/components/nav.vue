<template>
	<div class="nav" >
      <el-tabs v-model="Nav" @tab-click="handleClick">
      <el-tab-pane label="今日精选" name="0">
        <HomeSub1 :list = "homeinfo"></HomeSub1>
      </el-tab-pane>
      <template v-for="item of homeinfo[0]" >
        <el-tab-pane :label="item.name" :name="String(item.cate_collection_id)" :key="item.cate_collection_id" >
          <HomeSub :list ="subinfo" :loading="load"></HomeSub>
        </el-tab-pane>
      </template>
      
      
    </el-tabs>
		
	</div>
</template>
<script>
import HomeSub1 from './subhome1'
import HomeSub from './subhome'

export default {
    components:{
      HomeSub1,
      HomeSub
  	},
    data() {
      return {
        Nav: '0',
        homeinfo:[],
        subinfo:[],
        load:true
      };
    },
    created(){
      this.getHomeInfo()
      this.getSubInfo()
    },
    methods: {
      handleClick(tab, event) {
        this.subinfo = []
        this.getSubInfo(this.Nav)
      },
      getHomeInfo() {
        var _this = this;
        this.$http.all([
          this.$http.get('https://bird.ioliu.cn/v2/?url=http://mobile.sqkb.com/tab'),
          this.$http.get('https://bird.ioliu.cn/v2/?url=http://mobile.sqkb.com/operateElement?moduleKey=zhekou_index_banner&cateId=0'),
          this.$http.get('https://bird.ioliu.cn/v2/?url=http://mobile.sqkb.com/topic?sortType=7&page=0&pageSize=20')
          ]).then(this.$http.spread(function (Res, Res2,Res3) {
              _this.homeinfo.push(Res.data.data.tab_element,Res2.data.data.zhekou_index_banner,Res3.data.data.topic_list)
        }));
      },
      getSubInfo(nav) {
        var _this = this;
        this.load = true;
        this.$http.all([
          this.$http.get('https://bird.ioliu.cn/v1/?url=http://mobile.sqkb.com/operateElement?moduleKey=zhekou_cate_minipic&cateId='+nav),
          this.$http.get('https://bird.ioliu.cn/v2/?url=http://mobile.sqkb.com/topicByCate?sortType=7&page=0&pageSize=20&cateCollectionId='+nav+'&couponPage=0')
          ]).then(this.$http.spread(function (Res, Res2) {
              _this.subinfo.push(Res.data.data.zhekou_cate_minipic,Res2.data.data.coupon_list)
              _this.load = false;
        }));
      }
    },
    mounted () {
      
  	}
};
</script>
<style lang="stylus" scoped>

</style>