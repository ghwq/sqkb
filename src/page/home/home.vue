<template>
  <div>
    <HomeHeader @watchChild="logshow=true"></HomeHeader>
    <HomeNav></HomeNav>
    <span class="iconfont huojian" @click="backtop" v-show="huojian">&#xe62c;</span>
    <div class="log-reg" ref="left" v-show="logshow">
    <span class="iconfont" @click="close()">&#xe62d;</span>
      <Login @watchChild="go_reg"></Login>
      <Reg @watchChild="go_log"></Reg>
    </div>
  </div>
</template>

<script>
import HomeHeader from './components/Header'
import HomeNav from './components/Nav'
import Login from './login/login'
import Reg from '@/page/home/login/reg'

export default {
  name: 'Home',
  components: {
    HomeHeader,
    HomeNav,
    Login,
    Reg
  },
  data () {
    return {
      huojian:false,
      logshow:false
    }
  },
  computed: {

  },
  created(){
  },
  mounted () {
      this.TabsContentHeight();
      this.hj_scroll();
  },
  methods: {
    TabsContentHeight(){
        let winH = window.innerHeight || document.documentElement.clientHeight;
        let Con = this.$el.querySelector(".el-tabs__content");
        let HeaderH = this.$el.querySelector(".header").offsetHeight;
        let TabsH = this.$el.querySelector(".el-tabs__header").offsetHeight;
        Con.style.height = winH - TabsH - HeaderH -63 +"px";
      },
      backtop(){
        let wins = document.querySelector('.el-tabs__content');
        var gotoTop= function(){
          var currentPosition = wins.scrollTop;
          currentPosition -= 10;
          if (currentPosition > 0) {
            wins.scrollTop-=currentPosition/20;
          }
          else {
            wins.scrollTop=0;
            clearInterval(timer);
          }
        }
        var timer=setInterval(gotoTop,5);
      },
      hj_scroll(){
        let _this =this
          this.$el.querySelector(".el-tabs__content").addEventListener('scroll',function(){
          let scrollTop = _this.$el.querySelector(".el-tabs__content").scrollTop;
            if(scrollTop>100){
              _this.huojian = true
            }else{
              _this.huojian = false
            }
          })
      },
      go_reg(num){
        this.$refs.left.style.left = num
      },
      go_log(){
        this.$refs.left.style.left = '0'
      },
      close(){
        this.logshow = false
      }
  },
  activated () {
   
  }
}
</script>

<style >
.huojian{font-size: .7rem!important;position: fixed;bottom: 2rem;right: .5rem;
  background:#383636;color: white;border-radius: 50%;padding: .1rem;opacity: .85}
.log-reg{
    left: 0%;width: 100%;height: 100%;
    position: absolute;transition: 1s all;top: 0;
}
.log-reg>span.iconfont{
  color: white;position:absolute;top: 1rem;left:.8rem;
  z-index:1002;font-size: .6rem
}
</style>
