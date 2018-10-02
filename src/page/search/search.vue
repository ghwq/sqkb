<template>
  <div class="search">
    <div class="search-area">
      <router-link to='/' >
      <span class="iconfont jt">&#xe6bc;</span>
      </router-link>
      <div class="search-box">
        <span class="iconfont search-icon">&#xe655;</span>
        <input type="search" class="search-txt" placeholder="请输入商品名称或淘宝标题" v-model="keyword" @keyup.enter="enter()">
      </div>
    </div>
    <div class="hot-area" v-show="!keywordshow">
      <div class="title">大家都在搜</div>
        <li v-for="item of searinfo" class="hotword" @click="hotword($event)">
          {{item.title}}
        </li>
    </div>
    <div class="keywordshow" v-show="keywordshow">
      <div class="search-item" v-if="!search_res">
        <li class="keyword-list" v-for="item of keywordlist" @click="keywordclick($event)">
          <span>{{item}}</span>
        </li>
      </div>

      <div class="search-res" v-if="search_res">
        <div class="good" v-for="item of search_res" :key="item.coupon_id">
          <img :src="item.thumbnail_pic" alt="">
            <div class="good-info">
              <div class="good-info-title">
                <p class="free-shipping"></p>
                <p class="title">{{item.title}}</p>
              </div>
              <div class="good-info-price">
                <span>原价¥{{item.raw_price}}</span>
                <span>月销{{item.month_sales>10000?((item.month_sales)/10000).toFixed(2)+"万":item.month_sales}}</span>
                <span class="iconfont" @click="addCart(item)">&#xe611;</span>
              </div>
              <div class="good-info-coupon">
                <p class="coupon-price">券后¥<em class="sell-price">{{item.zk_price}}</em></p>
                <span class="quan" v-if="item.ticket">{{item.ticket.coupon_price}}元券</span>
                <span class="quan" v-else>{{item.discount}}折</span>
              </div>
          </div>
      </div>
      </div>

    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'

export default {

  name: 'search',
  components: {
  },
  data () {
    return {
      keyword:'',
      keywordlist:[],
      searinfo:[],
      keywordshow:false,
      search_res:[]
    }
  },
  computed: {
  },
  created(){
    this.getSearInfo()
  },
  mounted () {

  },
  methods: {
    ...mapActions(['addCart']),
    getSearInfo(){
      let _this = this
      this.$http.get('https://bird.ioliu.cn/v2/?url=http://mobile.sqkb.com/search/operateElement?moduleKey=search_hot_word&pageSize=50').then((res)=>{
          console.log(res.data)
          _this.searinfo = res.data.data.search_hot_word
      })
    },
    hotword(event){
      this.keyword = event.target.innerText
      setTimeout(this.enter(),500)
    },
    enter(){
      this.$http.get('https://bird.ioliu.cn/v1/?url=http://mobile.sqkb.com/search/searchResultData?sortType=7&word='+this.keyword+'&page=0&pageSize=20').then((res)=>{
        this.search_res = res.data.data.coupon_list
      })
      this.itemshow = false
    },
    keywordclick(){
      this.keyword = event.target.innerText
      this.enter()
    }
  },
  activated () {
   
  },
  watch:{
      keyword(val){
        this.itemshow = true
        this.search_res = ''
        if(val){
          this.$http.get('https://bird.ioliu.cn/v1/?url=http://mobile.sqkb.com/search/searchSuggestWordData?word='+val).then((res)=>{
              this.keywordlist =res.data.data.list
              console.log(this.keywordlist)
          })
          this.keywordshow = true
        }else{
          this.keywordshow = false
        }
        
      }
  }
}
</script>

<style lang="stylus" scoped>
.search
  .search-area
    display:flex
    padding:.1rem .2rem
    border-bottom:.03rem solid #eee
    .jt
      padding-right:.1rem
      font-size:.6rem
    .search-box
      display:flex
      flex:1
      background-color:#f7f7f7
      padding:.1rem .2rem
      border-radius:.1rem
      .search-icon
        margin-right:.2rem
      .search-txt
        background-color:#f7f7f7
        flex:1
  .hot-area
    padding:.1rem .3rem
    .title
      padding: .4rem 0 .31rem
      color: #999
    .hotword
      background-color:#eee
      display:inline-block
      padding:.2rem
      margin: .2rem
      border-radius:.05rem
  .keywordshow
    .keyword-list
      border-bottom:.03rem solid #eee
      padding:.3rem
      span
        font-size:.3rem
  .search-res
      width:100%
      display:flex
      flex-wrap:wrap
      background:#eee
      .good
        width:49%
        height:5rem
        margin-bottom:.2rem
        background:white
        position:relative
      .good:nth-child(2n+1)
        margin-right:2%
      img
        background:center no-repeat
        background-size:cover
        width:100%
        height:3.2rem
      .good-info
        height:1.8rem
        padding:0.1rem .15rem 0
        .good-info-title
          .free-shipping
            background:url(http://ms1.sqkb.com/dist/image/before/free-icon2-80ce515b49.png) center no-repeat
            float:left
            height:.3rem
            width:.5rem
            background-size:100% auto
          .title
            padding:0px 5px
            font-size:.26rem
            text-align:left
            color:#000
            display:-webkit-box
            -webkit-box-orient: vertical
            -webkit-line-clamp: 2
            overflow: hidden
        .good-info-price
          position:absolute
          bottom:.75rem
          width:90%
          color:#999
          margin: 5px 0
          height: .28rem
          span
            font-size:.22rem
            float:left
          span.iconfont
            color:red
            float:right
            font-size:.5rem
        .good-info-coupon
          position:absolute
          bottom:.1rem
          width:90%
          .coupon-price
            color:#fb0505
            float:left
            font-size:.2rem
            em
              font-weight:800
              font-size:.4rem
              margin-left:.1rem
          .quan
            float: right
            font-size: .24rem
            height:.44rem
            line-height:.44rem
            background: url(http://ms1.sqkb.com/dist/image/before/quan_bg-1748afdb99.png) center no-repeat
            background-size:1.3rem .4rem
            width: 1.4rem
            color: #fff
            text-align: center

</style>
