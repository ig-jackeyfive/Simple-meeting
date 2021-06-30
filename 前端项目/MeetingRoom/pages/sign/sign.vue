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
			<view class="padding flex">
				<button class="flex-sub cu-btn padding-sm margin-xs bg-red lg" @click="cantJoin()">无法参加</button>
				<button class="flex-sub cu-btn padding-sm margin-xs bg-blue lg" @click="confirmJoin()">确认参加</button>
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
			cantJoin(){
				console.log('无法参加')
			},
			confirmJoin(){
				console.log('确认参加')
			}


		}
	}
</script>

<style>
	.box {
		padding: 20upx 50upx;
	}
</style>
