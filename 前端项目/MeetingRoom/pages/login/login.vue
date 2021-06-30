<template>
	<view class="box ">
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">学号/工号</view>
				<input placeholder="请输入内容" name="input" v-model="temp.userId"></input>
			</view>
			<!-- 			<view class="cu-form-group margin-top">
				<view class="title">姓名</view>
				<input placeholder="请输入内容" name="input" v-model="temp.username"></input>
			</view> -->
			<view class="cu-form-group margin-top">
				<view class="title">密码</view>
				<input type="password" placeholder="请输入密码" name="input" v-model="temp.password"></input>
			</view>

			<view class="padding flex flex-direction">
				<button class="cu-btn bg-grey lg" @click="goIndex">登录</button>
				<button class="cu-btn bg-cyan margin-top-sm lg" @click="goUpdate">忘记密码？去更改</button>
				<button class="cu-btn bg-red margin-tb-sm lg" @click="goRegister">没有账号？去注册</button>
			</view>
			<message ref="Message"></message>



		</form>

	</view>

</template>

<script>
	export default {
		data() {
			return {
				picker: ['学生', '老师'],
				index: 0,
				title: 'Hello',
				code: '', //验证码
				codeInput: '', //用户输入的验证码
				email: '', //邮箱
				temp: {
					userId: '',
					password: '',
					school: '',
					tel: ''
				}
			}
		},
		onLoad() {

		},
		methods: {
			goIndex() {
				console.log(this.temp.userId)
				console.log(this.temp.password)
				uni.request({
					url: `http://tu71ajix.xiaomy.net:29998/user/login?userId=${this.temp.userId}&userPassword=${this.temp.password}`, //仅为示例，并非真实接口地址。
					// data: {
					// 	text: 'uni.request'
					// },
					header: {
						'custom-header': 'hello' //自定义请求头信息
					},
					timeout: 5000,
					fail: (err) => {
						this.$refs['Message'].error({
							content: '服务器或者网络貌似出了一点问题',
							duration: 3000,
							background: true
						})
					},
					success: (res) => {
						console.log(res.data);
						console.log(res.code);

						if (res.data.code == 200) {
							uni.setStorage({
							    key: 'userId',
							    data: this.temp.userId,
							    success: function () {
							        console.log('用户Id保存success');
							    }
							});
							this.$refs['Message'].success({
								content: '登录成功，欢迎' + res.data.value.userName,
								duration: 2000,
								background: true
							})
							setTimeout(() => {
								uni.redirectTo({
									url: '/pages/index/index'
								})
							}, 3000)
						} else if (res.data.code == 502) {
							this.$refs['Message'].warn({
								content: res.data.value,
								duration: 3000,
								background: true
							})
						} else {
							this.$refs['Message'].warn({
								content: res.data.value,
								duration: 3000,
								background: true
							})
						}
						// this.text = 'request success';
					}
				});

			},
			//去修改密码页面
			goUpdate() {
				uni.navigateTo({
					url: '/pages/update/update'
				})
			},
			goRegister() {
				uni.navigateTo({
					url: '/pages/register/register'
				})
			}
		}
	}
</script>

<style>
	.box {
		padding: 20upx 50upx;
	}
</style>
