<template>
	<div class="reg">
		<div class="reg-area">
		<span class="msg">{{msg}}</span>
			<el-input v-model="phone" placeholder="电话号"></el-input>
			<el-input v-model="psw" placeholder="密码"></el-input>
			<el-button class="reg-btn" type="success" @click="va()">注册</el-button>
		</div>
	</div>
	

</template>

<script >
	export default {
		data(){
			return {
				phone:'',
				psw:'',
				msg:''
			}
		},
		methods:{
			va(){
				let regphone=/^[1][3,4,5,7,8][0-9]{9}$/
				let regpsw=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{6,16}$/
				let phone = localStorage.getItem(this.phone)
				if(!regphone.test(this.phone)){
					this.msg = "请输入正确电话号"
				}else if(phone){
					this.msg = "该号码已经注册"
				}else if(!regpsw.test(this.psw)){
					this.msg = "密码包含大写小写数字且6-16位"
				}else {
					localStorage.setItem(this.phone,this.psw)
					this.msg = "注册成功"
					setTimeout(()=>{
						this.$emit('watchChild')
					},1000)
				}
			}
		}
	}
</script>
<style lang="stylus" scoped>
.reg
	position:absolute
	top:0
	left:100%
	height:100%
	width:100%
	z-index:1000
	display:flex
	justify-content:center
	align-items:center
	background: rgba(0,0,0,0.8)
	.reg-area
		z-index: 1001
		width:60%
		justify-content:center
		.el-input
			margin-bottom:.5rem
		.reg-btn
			width:100%
	.msg
		color:red
		font-size:.3rem


</style>
