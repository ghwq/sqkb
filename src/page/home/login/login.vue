<template>
	<div class="login" >
		<div class="login-area">
			<p class="err">{{err_msg}}</p>
			<div class="phone">
				<span class="iconfont">&#xe637;</span>
				<input type="text" placeholder="请输入手机号" v-model="phone" @blur="check_phone()">
			</div>
			<div class="password">
				<span class="iconfont">&#xe65e;</span>
				<input type="text" placeholder="请输入密码" v-model="psw" @blur="check_psw()">
			</div>
			<div class="yzm">
				<span class="iconfont">&#xe624;</span>
				<input type="text" placeholder="请输入验证码" v-model="yzm"  @blur="check_yzm()" >
				<el-button type="primary" class="get_yzm" @click="get_yzm()" :disabled="disabled">{{yzm1}}</el-button>
			</div>
			<div class="main">
				<a href="">忘记密码</a>
				<a @click="go_reg()">马上注册</a>
			</div>
			<el-button type="primary" round class="login-btn" @click="login()" :disabled="disableds">登录</el-button>
		</div>
	</div>
</template>
<script>
import Bus from '@/assets/js/bus.js'

	export default {
		components:{
		},
		data () {
			return {
				phone:'',
				psw:'',
				yzm:'',
				c_yzm:'',
				err_msg:'',
				yzm1:'获取验证码',
				disabled:true,
				disableds:true
			}
		},
		methods:{
			check_phone(){
				let myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
				if(!myreg.test(this.phone)){
					this.err_msg = "请输入正确电话号"
				}else{
					this.err_msg = ''
					this.disabled = false
				}
			},
			check_psw(){
				let myreg=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{6,16}$/;
				if(!myreg.test(this.psw)){
					this.err_msg = "密码包含大写小写数字且6-16位"
				}else{
					this.err_msg = ''
				}
			},
			check_yzm(){
				if(this.yzm != this.c_yzm){
					this.err_msg = "验证码错误"
				}else{
					this.err_msg = ''
					this.disableds = false
				}
			},
			get_yzm(){
				let num=""
				for(let i=0;i<4;i++){
					num+=Math.floor(Math.random()*10)
				}
				this.c_yzm = num
				alert("获取到的验证码是:"+num)
				this.disabled = true
				this.time()
			},
			time(){
				let s = 10
				let	_this = this
					let int = setInterval(function(){
						if(s==0){
							_this.yzm1 = "重新获取"
							_this.disabled = false
							clearInterval(int)
						}else{
							_this.yzm1 = s+"秒后重新获取"
							s--
						}
					},1000)
			},
			go_reg(){
				this.$emit('watchChild','0')
			},
			login(){
				if(!this.disableds){
					var phone = this.phone
					var psw = this.psw
					let user = localStorage.getItem(phone)
					if(!this.err_msg&&phone&&psw){
						if(!user){
							this.err_msg = "不存在手机号码"
						}else if(psw != user){
							this.err_msg = "密码错误"
						}{	
							sessionStorage.phone = phone
							this.err_msg = "登录成功,跳转中"
							setTimeout(()=>{
								this.$emit('watchChild','150%')
								Bus.$emit('msg', phone)
							},1000)
						}
					}else{
						this.err_msg = "登录信息不正确"
					}
				}else{
						return;
					}
				}
		}



	}

</script>

<style lang="stylus" scoped>
input
	padding:.1rem .4rem
	flex:1
	background:rgba(0,0,0,0)
	color:white
	border-bottom:1px solid #fff
.err
	position:absolute
	top:-1rem
	text-align:center
	width:100%
	color:red
	font-size:.35rem
input::-webkit-input-placeholder
	color: #ff6600
.iconfont
	font-size:.6rem
	padding-right:.5rem

.login
	position:absolute
	top:0
	left:0
	height:100%
	width:100%
	background:rgba(0,0,0,.8)
	z-index:1000
	color:#fff
	display:flex
	justify-content:center
	align-items:center
	div
		margin-top:.5rem
		position:relative
	.login-area
		width:90%
		left:0
		.main
			justify-content: space-between
		div
			display:flex
			.get_yzm
				position:absolute
				right:0
				bottom:4px
		.login-btn
			margin:.8rem auto 0
			display: flex;
			padding:10px 1.5rem
			font-size:.35rem
			letter-spacing:.3rem



</style>
