<!--
 * @Author: your name
 * @Date: 2020-10-30 19:23:16
 * @LastEditTime: 2020-12-06 22:12:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /uniapp/myproject/src/pages/appointment/appointment.vue
-->
<template>
	<view>
		<view class="u-page">
			<view class="form">
				<form>
					<view class="cu-form-group margin-top">
						<view class="title">会议名称</view>
						<input placeholder="请输入内容" name="inout" v-model="meetingName"></input>
					</view>
					<view class="cu-form-group margin-top">
						<view class="title">会议描述</view>
						<input placeholder="请输入内容" name="input" v-model="meetingDescription"></input>
					</view>

					<view class="cu-form-group margin-top padding-tb-lg">
						<view class="title">会议时间:</view>
						<view class="margin text-cut basis-sm">
							<text class="padding">
								{{rangetime[0]}} - {{rangetime[1]}}
							</text>
						</view>
						<button class="cu-btn padding bg-green shadow" type="primary"
							@click="DatePicker('rangetime')">日期时间</button>
					</view>
					<mx-date-picker :show="showPicker" :type="type" :value="value" :show-tips="true" :begin-text="'开始'"
						:end-text="'结束'" :show-seconds="true" @confirm="ed" @cancel="ed" />
					<!-- <view class="cu-bar bg-white margin-top">
						<view class="action">
							图片上传
						</view>
						<view class="action">
							{{imgList.length}}/1
						</view>
					</view>
					<view class="cu-form-group">
						<view class="grid col-4 grid-square flex-sub">
							<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage"
								:data-url="imgList[index]">
								<image :src="imgList[index]" mode="aspectFill"></image>
								<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
									<text class='cuIcon-close'></text>
								</view>
							</view>
							<view class="solids" @tap="ChooseImage" v-if="imgList.length<1">
								<text class='cuIcon-cameraadd'></text>
							</view>
						</view>
					</view> -->
					<view class="padding flex flex-direction">
						<button class="cu-btn bg-green lg" @click="submit()">提交</button>
					</view>
				</form>
				<message ref="Message"></message>
			</view>
			<!-- 			<view class="foot">
				<u-upload ref="uUpload" @on-change="up(lists)" :action="1" max-count="1" :auto-upload="false"
					:file-list="fileList"></u-upload>
				<u-button size="medium" type="primary" @click="submit">提交</u-button>
			</view> -->
		</view>

	</view>
</template>

<script>
	import MxDatePicker from "@/components/mx-datepicker/mx-datepicker.vue";
	export default {
		components: {
			MxDatePicker
		},
		data() {
			return {
				//时间选择器相关
				showPicker: false,
				date: '2019/01/01',
				time: '15:00:12',
				datetime: '2019/01/01 15:00:12',
				range: ['2019/01/01', '2019/01/06'],
				// rangetime: ['2019/01/08 14:00', '2019/01/16 13:59'],
				rangetime: [this.nowTime(), this.nowTime()],
				type: 'rangetime',
				value: '',


				userId: '',
				meetingDescription: '',
				meetingName: '',
				timeBegin: '',
				timeEnd: '',
				fileList: [],
				current: 0,
				rules: {
					people: [{
						required: true,
						message: '人数必须为数字',
						type: "number",
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change', 'blur'],
					}],
				}
			}
		},
		onLoad() {
			uni.getStorage({
				key: 'userId',
				success: res => {
					console.log(res.data);
					this.userId = res.data
				}
			});

		},
		created() {

		},
		onReady() {

			// this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			nowTime() { //获取当前时间
				let now = new Date();
				let _month = (10 > (now.getMonth() + 1)) ? '0' + (now.getMonth() + 1) : now.getMonth() + 1;
				let _day = (10 > now.getDate()) ? '0' + now.getDate() : now.getDate();
				let _hour = (10 > now.getHours()) ? '0' + now.getHours() : now.getHours();
				let _minute = (10 > now.getMinutes()) ? '0' + now.getMinutes() : now.getMinutes();
				let _second = (10 > now.getSeconds()) ? '0' + now.getSeconds() : now.getSeconds();
				return now.getFullYear() + '-' + _month + '-' + _day + ' ' + _hour + ':' + _minute + ':' + _second;
			},
			DatePicker(type) { //显示
				this.type = type;
				this.showPicker = true;
				this.value = this[type];
			},
			ed(e) { //选择
				this.showPicker = false;
				if (e) {
					this[this.type] = e.value;
					//选择的值
					console.log('value => ' + e.value);
					//原始的Date对象
					console.log('date => ' + e.date);
				}
			},
			//提交
			submit() {
				console.log('rangetime', this.rangetime[0])
				console.log('nowTime', this.nowTime())
				
				
				console.log('userId', this.userId)
				this.timeBegin = this.rangetime[0].replace(/\//g, '-')
				if(this.timeBegin<this.nowTime()){
					return this.$refs['Message'].warn({
						content: '日期时间不能在当前时间之前！',
						duration: 3000,
						background: true
					})
				}
				this.timeEnd = this.rangetime[1].replace(/\//g, '-')
				console.log(this.timeBegin)
				console.log(this.timeEnd)
				if (!this.meetingDescription || !this.meetingName || !this.timeBegin || !this.timeEnd) {
					this.$refs['Message'].warn({
						content: '请将表单填写完整！',
						duration: 3000,
						background: true
					})
				} else {

					uni.request({
							url: `http://tu71ajix.xiaomy.net:29998/meeting/create?userId=${this.userId}`, //仅为示例，并非真实接口地址。
							data: {
								meetingDescription: this.meetingDescription,
								meetingName: this.meetingName,
								timeBegin: this.timeBegin,
								timeEnd: this.timeEnd
							},
							header: {
								'Content-Type': 'application/json'
							},
							method: 'POST',
							fail: (err) => {
								this.$refs['Message'].error({
									content: '添加失败！',
									duration: 5000,
									background: true
								})
							},
							success: (res) => {
								res = res.data
								if (res.code == 200) {
									this.$refs['Message'].success({
										content: res.value,
										duration: 5000,
										background: true
									})
									setTimeout(() => {
					
										uni.redirectTo({
											url: "/pages/index/index"
										})
									}, 1000)
					
								} else {
									this.$refs['Message'].warn({
										content: res.value,
										duration: 5000,
										background: true
									})
								}
								console.log(res)
							}
						})
					}


			},
			//删除照片
			DelImg(e) {
				console.log(e)
				uni.showModal({
					title: '提示',
					content: '您确定要删除此项吗？',
					cancelText: '取消',
					confirmText: '是的',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},


			// //现在照片
			// ChooseImage() {
			// 	uni.chooseImage({
			// 		count: 4, //默认9
			// 		sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			// 		sourceType: ['album'], //从相册选择
			// 		success: (res) => {
			// 			if (this.imgList.length != 0) {
			// 				this.imgList = this.imgList.concat(res.tempFilePaths)
			// 			} else {
			// 				this.imgList = res.tempFilePaths
			// 			}
			// 		}
			// 	});
			// },
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			add() {
				let loginRules = [{
						name: 'tel',
						required: true,
						type: 'phone',
						errmsg: '请输入正确的手机号'
					},
					{
						name: 'pwd',
						type: 'required',
						errmsg: '请输入密码'
					},
					{
						name: 'pwd',
						type: 'pwd',
						errmsg: '密码须是6～16位字符'
					},
					{
						name: 'pwd2',
						type: 'eq',
						eqName: 'pwd',
						required: true,
						errmsg: '两次输入密码不一致'
					},
					{
						name: 'telCode',
						type: 'required',
						errmsg: '请输入验证码'
					},
					{
						name: 'telCode',
						type: 'lengthRange',
						min: 6,
						max: 6,
						errmsg: '请正确输入验证码'
					}
				]
				let valLoginRes = this.$validate.validate(this.userInfo, loginRules)
				if (!valLoginRes.isOk) {
					uni.showToast({
						icon: 'none',
						title: valLoginRes.errmsg
					})
					return false
				}
			},
			// submit1() {
			// 	var myDate = new Date();
			// 	this.fileList = this.$refs.uUpload.lists
			// 	let newRoom = {
			// 		configurationInformation: this.aptmForm.info,
			// 		populationCapacity: this.aptmForm.people,
			// 		roomLocation: this.aptmForm.site,
			// 		roomName: this.aptmForm.name,
			// 		roomPhoto: `${myDate.getTime()}.jpg`
			// 	}
			// 	console.log(newRoom);
			// },
		}
	}
</script>

<style>
	.form {
		margin: 10rpx;
	}

	.foot {
		text-align: center;
	}
</style>
