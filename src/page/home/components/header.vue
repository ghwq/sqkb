<template>
	<div class="header">
    <router-link to='/search' class="stz">
		<div class="search-input" >
			<span class="iconfont search-icon">&#xe655;</span>
			搜索优惠券
		</div>
	</router-link>
		<div class="userimg" @click="getuser()" >
		<span class="iconfont userimg-icon" v-show="uimgshow">&#xe645;</span>
			<el-popover
			    placement="bottom"
			    :title="phone"
			    width="70"
			    trigger="click"
			    content="退出" v-show="!uimgshow">
			    <img src="@/assets/img/user.jpg" slot="reference" class="user-tx">
			</el-popover>
		</div>
	</div>
</template>
<script type="">
import Bus from '@/assets/js/bus.js'
	export default {
		data(){
			return {
				visible: false,
				phone:'',
				uimgshow:true,
				state:false
			}
		},
		methods:{
			getuser(){
				let ssp = sessionStorage.phone
				if(ssp){
					this.phone = ssp
				}else{
					this.$emit('watchChild')					
				}
			}
		},
		mounted() {
			Bus.$on('msg', (e) => {
				let ssp = sessionStorage.phone
				if(e == ssp){
					this.state = true
				}else{
					return;
				}
			})
		},
		watch:{
			state:function(){
				this.uimgshow = false
			}
		}

	}

</script>
<style lang='stylus'>
	.header
		display:flex
		flex-direction:row
		background-image: linear-gradient(to right,#ff7438,#ff1f1f)
		height:1rem
		.stz
			flex:1
			-webkit-box-flex:1
		.search-input
			height:0.6rem
			margin-top: .2rem
			border-radius: .1rem
			margin-left:.3rem
			background-color: rgba(255,255,255,.3)
			line-height:0.6rem
			text-align:center
			color:white
			.search-icon
				font-size:.4rem
		.userimg
			min-width:1.2rem
			background:red
			.userimg-icon
				line-height:1rem
				font-size:.6rem
				margin:.2rem
				color:white
			.user-tx
				width:1rem
				height:.8rem
				border-radius:50%
				position:absolute
				right:.1rem
				top:.1rem
</style>
