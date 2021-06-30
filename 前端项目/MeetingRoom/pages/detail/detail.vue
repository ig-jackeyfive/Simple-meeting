<template>
	<view class="box ">
		<form>
			<!-- 			<view class="cu-form-group margin-top">
				<view class="title">组织人</view>
				<input placeholder="请输入内容" name="input"></input>
			</view> -->
			<view class="cu-form-group margin-top">
				<view class="title">会议名称</view>
				<view class="margin text-cut basis-lg">
					<text class="padding">
						{{meeting.meetingName}}
					</text>
				</view>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">会议描述</view>
				<view class="margin text-cut basis-lg">
					<text class="padding">
						{{meeting.meetingDescription==null?'无':meeting.meetingDescription}}
					</text>
				</view>
			</view>
			<view class="cu-form-group margin-top padding-tb-lg">
				<view class="title">会议开始时间:</view>
				<view class="margin text-cut basis-lg">
					<text class="padding">
						{{meeting.timeBegin}}
					</text>
				</view>
			</view><view class="cu-form-group margin-top padding-tb-lg">
				<view class="title">会议开始时间:</view>
				<view class="margin text-cut basis-lg">
					<text class="padding">
						{{meeting.timeEnd}}
					</text>
				</view>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">会议签到码</view>
				<view class="margin text-cut basis-lg">
					<text class="padding">
						{{meeting.meetingId}}
					</text>
				</view>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">会议状态</view>
				<view class="margin text-cut basis-lg">
					<text class="padding">
						{{statusMap[meeting.status]}}
					</text>
				</view>
			</view>
			<view class="cu-form-group margin-top" v-if="meeting.status!==2">
				<view class="title">会议人员：</view>
<!-- 				<view class="margin text-cut basis-lg">
					
				</view> -->
			</view>
			
			 <t-table @change="change" v-if="meeting.status==2">
			                <t-tr>
			                    <t-th>序号</t-th>
			                    <t-th>学号</t-th>
			                    <t-th>姓名</t-th>
			                    <t-th>身份</t-th>
								
			                </t-tr>
			                <t-tr v-for="item,index in tableList" :key="item.id">
			                    <t-td>{{ index+1}}</t-td>
			                    <t-td>{{ item.userId }}</t-td>
			                    <t-td>{{ item.userName }}</t-td>
			                    <t-td>{{ index==0?'发布人':'参与者'}}</t-td>
			                </t-tr>
			            </t-table>
			<view class="cu-bar bg-white solid-bottom margin-top" v-else>
				<view class="action">
					<text class="cuIcon-title text-blue"></text>会议结束后才能查看签到人员
				</view>
			</view>
			<!--
			<view class="cu-form-group margin-top">
				<view class="title">导出参会人员</view>
				<button class="cu-btn bg-green shadow" @click="exportExcel()">导出excel</button>
			</view> -->

<!-- 			<view class="padding flex flex-direction">
				<button class="cu-btn bg-grey lg" @click="goIndex()">结束会议</button>
				<button class="cu-btn bg-red margin-tb-sm lg" @click="goRegister()">取消预约</button>
			</view> -->
			<message ref="Message"></message>



		</form>

	</view>

</template>

<script>
	    import tTable from '@/components/t-table/t-table.vue';
	    import tTh from '@/components/t-table/t-th.vue';
	    import tTr from '@/components/t-table/t-tr.vue';
	    import tTd from '@/components/t-table/t-td.vue';
	export default {
		components: {
		           tTable,
		           tTh,
		           tTr,
		           tTd
		       },
		data() {
			 
			return {
				tableList:[{
      "userId": 123,
      "userName": "123",
      "userPassword": null,
      "userEmail": null,
	  "status":'发起人'
    }],
				statusMap: ['未开始', '进行中', '已结束'], //会议状态map
				meetingId:'',
				picker: ['学生', '老师'],
				index: 0,
				title: 'Hello',
				temp: {
					school: '',
					tel: ''
				},
				meeting: {
					"meetingId": '',
					"meetingName": "",
					"timeBegin": "",
					"timeEnd": "",
					"longitude": null,
					"latitude": null,
					"radius": null,
					"status": 0,
					"meetingDescription": ''
				},
			}
		},
		onLoad(options) {
			console.log(options)
			this.meetingId=options.meetingId
			uni.request({
				url: `http://tu71ajix.xiaomy.net:29998/meeting/search`, //仅为示例，并非真实接口地址。
				header: {
					'Content-Type': 'application/json'
				},
				method: 'POST',
				data: {
					meetingName: '',
					page: 1,
					size: 10000,
					timeBegin: '',
					timeEnd: ''
				},
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
					if (res.code == 200 && res.value!==null) {
						res.value.forEach(item=>{
							if(item.meetingId==this.meetingId){
								this.meeting=item
								console.log('meeting',this.meeting)
							}
						})
						this.$refs['Message'].success({
							content: '获取数据成功!',
							duration: 5000,
							background: true
						})
					} else if(res.value==null){
						this.meeting={}
					}else{
						this.$refs['Message'].warn({
							content: res.value,
							duration: 5000,
							background: true
						})
					}

				}
			})
		},
		onShow(){
			uni.request({
				url: `http://tu71ajix.xiaomy.net:29998/meeting/selectUserByMeetingId`, //仅为示例，并非真实接口地址。
				// header: {
				// 	'Content-Type': 'application/json'
				// },
				// method: 'POST',
				data: {
					meetingId: this.meetingId,
				},
				fail: (err) => {
					this.$refs['Message'].error({
						content: '获取数据失败！',
						duration: 5000,
						background: true
					})
				},
				success: (res) => {
					
					res = res.data
					console.log('table',res)
					if (res.code == 200 && res.value!==null) {
						this.tableList=res.value
						console.log('tableList',this.tableList)
					} else if(res.value==null){
						this.tableList=[]
					}else{
						this.$refs['Message'].warn({
							content: res.value,
							duration: 5000,
							background: true
						})
					}
			
				}
			})
		},
		methods: {
			exportExcel() {
				console.log('导出excel')
			},
			goIndex() {
				uni.redirectTo({
					url: '/pages/index/index'
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
