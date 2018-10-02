<template>
	<div class="swiper">
	  <el-carousel indicator-position="outside" >
	    <el-carouselItem v-for="item in banner" :key="item.element_id">
        <img class="pic" :src="item.pic" alt="">
	    </el-carouselItem>
	  </el-carousel>
	</div>

</template>

<script type="">
  export default {
    props:{
      banner:Array
    }

  }

</script>

<style>
.swiper{

}
.el-carousel__container{
	height: 3rem;
}
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item {
    background-size:cover;
    background-repeat: no-repeat;
    background-position: center;
  }
  .pic{
    height: 3rem;
    width: 100%;
  }

</style>