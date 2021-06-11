<template>
	<view class="box ">
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">组织人</view>
				<input placeholder="请输入内容" name="input"></input>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">会议主题</view>
				<input placeholder="请输入内容" name="input" v-model="temp.name"></input>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">会议地点</view>
				<input placeholder="请输入内容" name="input" v-model="temp.tel"></input>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">会议日期</view>
				<input placeholder="请输入内容" name="input" v-model="temp.date"></input>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">会议时间</view>
				<input placeholder="请输入内容" name="input" v-model="temp.school"></input>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">会议备注</view>
				<input placeholder="请输入内容" name="input" v-model="temp.school"></input>
			</view>

			<view class="padding flex flex-direction">
				<button class="cu-btn bg-blue lg" @click="modify()">确认修改</button>
			</view>



		</form>

	</view>

</template>

<script>
	export default {
		data() {
			return {
				index: 0,
				title: 'Hello',
				temp: {
					school: '',
					tel: ''
				}
			}
		},
		onLoad() {

		},
		methods: {


		}
	}
</script>

<style>
	.box {
		padding: 20upx 50upx;
	}
</style>
