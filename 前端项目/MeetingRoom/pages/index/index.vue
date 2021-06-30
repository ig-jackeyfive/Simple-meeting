<template>
	<view class="content">
		<scroll-view scroll-x class="bg-olive nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in tablist"
					:key="index" @tap="tabSelect" :data-id="index">
					{{item}}
				</view>
			</view>
		</scroll-view>
		<view class="">
			<view class="" v-if="TabCur==0">
				<zy-search :isFocus="false" :hostList="searchList" @getSearchText="getSearchText"></zy-search>
				<view class="margin">
					<button class="cu-btn padding bg-green shadow" type="primary"
						@click="DatePicker('rangetime')">会议时间段</button>

				</view>
				<view class="" v-show="isSelect">
					<view class="basis-lg">
						<text class="padding text-cyan">
							起始时间：
						</text>
						<text class="padding">
							{{rangetime[0]}}
						</text>
					</view>
					<view class="basis-lg margin-tb-sm">
						<text class="padding text-cyan">
							结束时间：
						</text>
						<text class="padding">
							{{rangetime[1]}}
						</text>
					</view>
				</view>
				<mx-date-picker :show="showPicker" :type="type" :value="value" :show-tips="true" :begin-text="'开始'"
					:end-text="'结束'" :show-seconds="true" @confirm="ed" @cancel="ed" />
				<view class="cu-card case no-card" v-for="(item,index) in meetings" :key="index">
					<view class="cu-item shadow">
						<!-- 						<view class="image" @click="goDetail()">
							<image src="https://pic.imgdb.cn/item/60bce54d8355f7f718a6f7a5.png"
								mode="widthFix"></image>
							<view class="cu-tag bg-blue">进行中···</view>
							<view class="cu-bar bg-shadeBottom"> <text
									class="text-cut">我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。</text></view>
						</view> -->
						<view class="cu-list image menu-avatar margin" @click="goDetail(item.meetingId)">
							<view class="cu-item">
								<view class="cu-avatar round lg"
									style="background-image:url(https://pic.imgdb.cn/item/60bce54d8355f7f718a6f7a5.png);">
								</view>
								<view class="content flex-sub">
									<view class="text-grey"><text>{{item.meetingName}}</text> <text
											class="text-cut margin-left-lg text-bold">{{item.meetingDescription==null?'':item.meetingDescription}}</text>
										<view class="cu-tag bg-blue">{{statusMap[item.status]}}</view>
									</view>

									<view class="text-gray text-sm flex justify-between">
										{{item.timeBegin}}
										<!-- 										<view class="text-gray text-sm">
											<text class="cuIcon-attentionfill margin-lr-xs"></text> 10
											<text class="cuIcon-appreciatefill margin-lr-xs"></text> 20
											<text class="cuIcon-messagefill margin-lr-xs"></text> 30
										</view> -->
									</view>
									<view class="text-gray text-sm flex justify-between">
										{{item.timeEnd}}
										<!-- 										<view class="text-gray text-sm">
											<text class="cuIcon-attentionfill margin-lr-xs"></text> 10
											<text class="cuIcon-appreciatefill margin-lr-xs"></text> 20
											<text class="cuIcon-messagefill margin-lr-xs"></text> 30
										</view> -->
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="" v-else-if="TabCur==1">
				<view class="action padding text-center">
					<view class="cu-btn lines-green round shadow" @click="addMeet()">
						添加会议
					</view>
				</view>
			</view>
			<view class="" v-else-if="TabCur==2">
				<form>
					<message ref="Message"></message>
					<view class="cu-form-group margin-top">
						<view class="title">签到码</view>
						<input name="input" v-model="meetingId"></input>
					</view>
					<view class="margin-top flex-sub">
						<button class="cu-btn padding-sm margin-xs bg-green " @click="getLocation">获取位置</button>
						<text class="text-blue">当前位置(经纬度)：</text>
						<text v-if="longitude||latitude">{{'('+longitude+','+latitude+')'}}</text>
					</view>
					<view class="margin-top flex flex-direction">
						<button class="cu-btn padding-sm margin-xs bg-blue lg" @click="sign()">签到</button>
					</view>
				</form>

			</view>

			<view class="" v-else-if="TabCur==3">
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">
						<text class="cuIcon-title text-blue"></text>所有会议
					</view>
				</view>
				<!-- 会议卡片 -->
				<view class="cu-card case no-card" v-for="(item,index) in meetings" :key="index">
					<view class="cu-item shadow">
						<!-- 						<view class="image" @click="goDetail()">
								<image src="https://pic.imgdb.cn/item/60bce54d8355f7f718a6f7a5.png"
									mode="widthFix"></image>
								<view class="cu-tag bg-blue">进行中···</view>
								<view class="cu-bar bg-shadeBottom"> <text
										class="text-cut">我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。</text></view>
							</view> -->
						<view class="cu-list image menu-avatar margin" @click="goDetail(item.meetingId)">
							<view class="cu-item">
								<view class="cu-avatar round lg"
									style="background-image:url(https://pic.imgdb.cn/item/60bce54d8355f7f718a6f7a5.png);">
								</view>
								<view class="content flex-sub">
									<view class="text-grey"><text>{{item.meetingName}}</text> <text
											class="text-cut margin-left-lg text-bold">{{item.meetingDescription==null?'':item.meetingDescription}}</text>
										<view class="cu-tag bg-blue">{{statusMap[item.status]}}</view>
									</view>

									<view class="text-gray text-sm flex justify-between">
										{{item.timeBegin}}
										<!-- 										<view class="text-gray text-sm">
												<text class="cuIcon-attentionfill margin-lr-xs"></text> 10
												<text class="cuIcon-appreciatefill margin-lr-xs"></text> 20
												<text class="cuIcon-messagefill margin-lr-xs"></text> 30
											</view> -->
									</view>
									<view class="text-gray text-sm flex justify-between">
										{{item.timeEnd}}
										<!-- 										<view class="text-gray text-sm">
												<text class="cuIcon-attentionfill margin-lr-xs"></text> 10
												<text class="cuIcon-appreciatefill margin-lr-xs"></text> 20
												<text class="cuIcon-messagefill margin-lr-xs"></text> 30
											</view> -->
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<message ref="Message"></message>
		</view>
	</view>
</template>

<script>
	import zySearch from '../../components/zy-search/zy-search.vue';
	import MxDatePicker from "@/components/mx-datepicker/mx-datepicker.vue";
	export default {
		components: {
			"zy-search": zySearch,
			MxDatePicker
		},
		data() {
			return {
				isSelect:false,
				//搜索框值
				input: '',
				//时间选择器相关
				showPicker: false,
				date: '2019/01/01',
				time: '15:00:12',
				datetime: '2019/01/01 15:00:12',
				range: ['2019/01/01', '2019/01/06'],
				// rangetime: ['2019/01/08 14:00', '2019/01/16 13:59'],
				rangetime: [this.nowTime(),this.nowTime()],
				type: 'rangetime',
				value: '',

				timeBegin: '',
				timeEnd: '',

				statusMap: ['未开始', '进行中', '已结束'], //会议状态map
				userId: '',

				meetingId: '',
				longitude: '', //经度
				latitude: '', //纬度
				TabCur: 0,
				scrollLeft: 0,
				tablist: ['查询', '预约', '签到', '我的会议'],
				meetings: [{
					"meetingId": '',
					"meetingName": '',
					"timeBegin": "",
					"timeEnd": "",
					"longitude": null,
					"latitude": null,
					"radius": null,
					"status": 0,
					"meetingDescription": ''
				}, ],
				searchList: ['123', '213'],
				title: 'Hello',
				ColorList: this.ColorList,
			}
		},
		onLoad() {
			wx.getSetting({
				success:res=>{
					console.log(res)
				},
				fail:err=>{
					console.log(err)
				}
			})
			uni.getStorage({
				key: 'userId',
				success: res => {
					console.log(res.data);
					this.userId = res.data
					this.userId = Number(this.userId)
					console.log('userId', typeof this.userId)
				}
			});
			this.meetings = []
			console.log('首页加载了')

			/*
			    type     {string}    默认值'wgs84'			 
			    altitude {Boolean}   返回高度信息（比较鸡肋）			 
			    success  {Function}  成功回调			 
			    geocode  {Boolean}   返回省市信息（仅APP中有效）			 
			    fail     {Function}  失败回调		 
			    complete {Function}  返回结果回调 成功/失败都会触发
			*/
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
					this.isSelect=true
					this[this.type] = e.value;
					this.timeBegin = this.rangetime[0].replace(/\//g, '-')
					this.timeEnd = this.rangetime[1].replace(/\//g, '-')
					console.log(this.timeBegin)
					console.log(this.timeEnd)
					this.query0(this.input, this.timeBegin, this.timeEnd)
					//选择的值
					console.log('value => ' + e.value);
					//原始的Date对象
					console.log('date => ' + e.date);
				}
			},
			getSearchText(text) {
				console.log('input', text)
				this.input = text
				this.query0(text)
			},
			// 直接传递消息内容
			// this.$refs['Message'].info('我是消息')
			// this.$refs['Message'].success('我是消息')
			// this.$refs['Message'].error('我是消息')
			// this.$refs['Message'].warn('我是消息')
			sign() {
				if (this.longitude && this.latitude) {
					uni.request({
						url: `http://tu71ajix.xiaomy.net:29998/meeting/signUp`, //仅为示例，并非真实接口地址。
						data: {
							latitude: this.latitude,
							longitude: this.longitude,
							meetingId: parseInt(this.meetingId),
							userId: this.userId
						},
						header: {
							// 'Content-Type': 'application/json'
							'Content-Type': 'application/x-www-form-urlencoded'

						},
						method: 'POST',
						fail: (err) => {
							this.$refs['Message'].error({
								content: '签到失败！',
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

					console.log('签到')
				} else {
					this.$refs['Message'].warn({
						content: '请先获取位置信息',
						duration: 1000,
						background: true
					})
				}
			},
			getLocation() {
				// 自定义单个消息的样式
				console.log('获取位置···')
				wx.getLocation({
					type: 'wgs84 ',
					success: (res) => {
						this.$refs['Message'].success({
							content: '获取位置成功',
							duration: 1000,
							background: true
						})
						this.longitude = res.longitude
						this.latitude = res.latitude
						console.log('经度：' + res.longitude);
						console.log('纬度：' + res.latitude);

					}
				});
			},
			goDetail(meetingId) {
				uni.navigateTo({
					url: `/pages/detail/detail?meetingId=${meetingId}`
				})
			},
			addMeet() {
				uni.navigateTo({
					url: "/pages/appointment/appointment"
				})
			},
			query0(key, timebegin = '', timeEnd = '') {
				console.log('key:', key, 'timebegin', timebegin, 'timeEnd', timeEnd)
				uni.request({
					url: `http://tu71ajix.xiaomy.net:29998/meeting/search`, //仅为示例，并非真实接口地址。
				
					data: {
						meetingName: key,
						page: 1,
						size: 10000,
						timeBegin: timebegin,
						// timeBegin: timebegin,
						// timeEnd: timeEnd
						timeEnd: timeEnd
					},
					
					header: {
						'Content-Type': 'application/json'
					},
					method: 'POST',
					fail: (err) => {
						this.$refs['Message'].error({
							content: '获取数据失败！',
							duration: 5000,
							background: true
						})
					},
					success: (res) => {
						res = res.data
						console.log(res)
						if (res.code == 200) {
							this.meetings = res.value
							this.$refs['Message'].success({
								content: '获取数据成功!',
								duration: 5000,
								background: true
							})
						} else {
							this.$refs['Message'].warn({
								content: res.value,
								duration: 5000,
								background: true
							})
						}

					}
				})
			},
			query3() {
				uni.request({
					url: `http://tu71ajix.xiaomy.net:29998/meeting/searchByUserId?userId=${this.userId}`, //仅为示例，并非真实接口地址。
					header: {
						'Content-Type': 'application/json'
					},
					method: 'POST',
					fail: (err) => {
						this.$refs['Message'].error({
							content: '获取数据失败！',
							duration: 5000,
							background: true
						})
					},
					success: (res) => {
						res = res.data
						if (res.code == 200) {
							this.meetings = res.value
							console.log(this.meetings)
							this.$refs['Message'].success({
								content: '获取数据成功!',
								duration: 5000,
								background: true
							})
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

			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60

				switch (this.TabCur) {
					case 0:
						this.meetings = []
						break;
					case 1:
						break;
					case 2:
						uni.getLocation({
							type: 'wgs84 ',
							success: res => {
								this.$refs['Message'].success({
									content: '获取位置成功!',
									duration: 3000,
									background: true
								})
								this.longitude = res.longitude
								this.latitude = res.latitude
								console.log('经度：' + res.longitude);
								console.log('纬度：' + res.latitude);
							}
						});
						break;
					case 3:
						this.query3()
						break;

				}

			}
		},


	}
</script>

<style>
	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
