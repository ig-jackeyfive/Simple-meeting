<template>
	<view class="box ">
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">学号/工号</view>
				<input placeholder="请输入学号/工号" name="input" v-model="temp.userId"></input>
			</view>
			<!-- 			<view class="cu-form-group margin-top">
				<view class="title">姓名</view>
				<input placeholder="请输入内容" name="input" v-model="temp.username"></input>
			</view> -->
			<view class="cu-form-group margin-top">
				<view class="title">密码</view>
				<input type="password" placeholder="请输入密码" name="input" v-model="temp.password"></input>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">密码</view>
				<input type="password" placeholder="请再次输入密码" name="input" v-model="temp.password1"></input>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">邮箱</view>
				<input placeholder="你的邮箱" name="input" v-model="email"></input>
				<button class='cu-btn bg-green shadow' @click="sendEmail">发送验证码</button>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">验证码</view>
				<input placeholder="邮箱验证码" name="input" v-model="codeInput"></input>
				<button class='cu-btn bg-green shadow' @click="verifyEmail">验证验证码</button>
			</view>
			<view class="padding flex flex-direction">
				<!-- <button class="cu-btn bg-grey lg" @click="goIndex">登录</button> -->
				<button class="cu-btn bg-cyan margin-top-sm lg" @click="update">确认修改</button>
				<!-- <button class="cu-btn bg-red margin-tb-sm lg" @click="goRegister">没有账号？去注册</button> -->
			</view>
			<message ref="Message"></message>



		</form>

	</view>

</template>

<script>
	export default {
		data() {
			return {
				sended:false,//是否发送了验证码
				picker: ['学生', '老师'],
				index: 0,
				title: 'Hello',
				code: '', //验证码
				codeInput: '', //用户输入的验证码
				email: '', //邮箱
				temp: {
					userId: '',
					password: '',
					password1: '',
					school: '',
					tel: ''
				}
			}
		},
		onLoad() {

		},
		methods: {
			//验证验证码是否正确
			verifyEmail() {
				if (!this.codeInput) {
					this.$refs['Message'].warn({
						content: '请输入验证码',
						duration: 3000,
						background: true
					})
				} else if (!this.code) {
					this.$refs['Message'].warn({
						content: '请先发送验证码',
						duration: 3000,
						background: true
					})
				} else {
					if (this.code == this.codeInput) {
						this.$refs['Message'].success({
							content: '验证通过',
							duration: 3000,
							background: true
						})
					} else {
						this.$refs['Message'].error({
							content: '验证码错误',
							duration: 3000,
							background: true
						})
					}
				}
			},
			//通过邮箱发送验证码
			sendEmail() {
				if (this.email) {
					//有邮箱
					uni.request({
						url: `http://tu71ajix.xiaomy.net:29998/sendEmail?toAddress=${this.email}`, //仅为示例，并非真实接口地址。
						// data: {
						// 	text: 'uni.request'
						// },
						header: {
							'custom-header': 'hello' //自定义请求头信息
						},
						method: 'post',
						fail: (err) => {
							this.$refs['Message'].error({
								content: '发送失败！请检查邮箱是否输入正确',
								duration: 5000,
								background: true
							})
						},
						success: (res) => {
							if (res.statusCode == 200) {
								this.$refs['Message'].success({
									content: '验证码已发送至您的邮箱中，请注意查看',
									duration: 5000,
									background: true
								})
								this.sended=true
								this.code = res.data
							}
							console.log(res)
						}
					})
				} else {
					this.$refs['Message'].warn({
						content: '请输入正确的邮箱',
						duration: 3000,
						background: true
					})
				}
			},
			//修改密码
			update() {
				if (!this.temp.userId || !this.temp.password || !this.temp.password1 || !this.email || !this.codeInput) {
					this.$refs['Message'].warn({
						content: '请将表单填写完整！',
						duration: 3000,
						background: true
					})
				}else if (this.temp.password !== this.temp.password1) {
					this.$refs['Message'].warn({
						content: '两次密码输入不相同',
						duration: 3000,
						background: true
					})
				} else if(!this.sended){
					this.$refs['Message'].warn({
						content: '请先发送验证码',
						duration: 3000,
						background: true
					})
				}else if(this.code!=this.codeInput.trim()){
					this.$refs['Message'].warn({
						content: '验证码错误',
						duration: 3000,
						background: true
					})
					
				}else {
					uni.request({
						url: `http://tu71ajix.xiaomy.net:29998/user/change?userId=${this.temp.userId}&userPassword=${this.temp.password}`, //仅为示例，并非真实接口地址。
						// data: {
						// 	text: 'uni.request'
						// },
						header: {
							'custom-header': 'hello' //自定义请求头信息
						},
						method: 'put',
						fail: (err) => {
							this.$refs['Message'].error({
								content: '发送失败！请检查邮箱是否输入正确',
								duration: 5000,
								background: true
							})
						},
						success: (res) => {
							if (res.statusCode == 200) {
								this.$refs['Message'].success({
									content: '修改密码成功！',
									duration: 5000,
									background: true
								})
								setTimeout(()=>{
									uni.redirectTo({
										url:'/pages/login/login'
									})
								},3000)
								
							}
							console.log(res)
						}
					})
					console.log('修改密码')
				}

			}


		}
	}
</script>

<style>
	.box {
		padding: 20upx 50upx;
	}
</style>
