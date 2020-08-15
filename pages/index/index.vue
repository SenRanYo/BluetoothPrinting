<template>
	<view class="container">
		<button class="cu-btn margin-bottom-20" type="default" :disabled="isSearch" @tap="initBluetooth">搜索蓝牙</button>
		<button class="cu-btn margin-bottom-20" type="default">关闭搜索</button>
		<button class="cu-btn margin-bottom-20" type="default" @tap="handleTest">测试打印</button>

		<view class="flex align-center justify-between text-bold font-30 margin-tb-30">
			<text class="">蓝牙列表</text>
			<view class="flex align-center">
				<text class="cuIcon-loading2 loading-icon" v-if="isSearch"></text>
				<text class="text-line margin-left-10">{{ statusText }}</text>
			</view>
		</view>
		<view class="flex flex-direction">
			<view class="flex align-center justify-between margin-bottom-20 solid-4 padding-10 radius-8 animation-slide-left" v-for="(item, index) in list" :key="index">
				<view class="flex flex-direction">
					<text class="">名称: {{ item.name }}</text>
					<text class="">备注名: {{ item.nickName }}</text>
					<text class="">设备ID: {{ item.deviceId }}</text>
					<text class="">信号强度: {{ item.RSSI }} {{ formatRSSI(item.RSSI) }}</text>
				</view>
				<button class="cu-btn connect-button" type="default" @tap="connectBluetooth(item)">连接</button>
			</view>
		</view>
	</view>
</template>

<script>
import _ from 'lodash'
import print from '../../components/print/print.js'
import Bluetooth from '../../components/print/bluetooth.js'
export default {
	data() {
		return {
			isSearch: false,
			statusText: '',
			list: [],
			lastDeviceId: '',
			serviceId: '',
			characteristics: '',
			ble: null
		}
	},
	onLoad() {
		this.ble = new Bluetooth()
	},
	computed: {
		formatRSSI() {
			return function(RSSI) {
				RSSI = Math.abs(RSSI)
				if (RSSI < 60) {
					return '极好'
				} else if (RSSI > 60 && RSSI < 70) {
					return '很好'
				} else if (RSSI > 70 && RSSI < 80) {
					return '好'
				} else if (RSSI > 80 && RSSI < 90) {
					return '一般'
				} else if (RSSI > 90 && RSSI < 100) {
					return '差'
				} else if (RSSI > 100 && RSSI < 150) {
					return '极差'
				}
			}
		}
	},
	methods: {
		initBluetooth() {
			this.ble.init(res => {
				this.isSearch = true;
				this.statusText = '正在搜索';
				this.ble.onSearch(list => {
					this.list = list
				})
			})
		},
		connectBluetooth(item) {
			this.ble.connecte(item.deviceId, res => {
				this.isSearch = false;
				this.statusText = '已连接';
				// console.log(this.ble.deviceId);
				// console.log(this.ble.lastDeviceId);
				// console.log(this.ble.serviceId);
				// console.log(this.ble.services);
				// console.log(this.ble.characteristicId);
			})
		},
		handleTest() {
			//标签模式
			var command = print.printer.createNew()
			command.receive()
			this.senBlData(this.ble.deviceId, this.ble.serviceId, this.ble.characteristicId, command.getData())
			
		},
		senBlData(deviceId, serviceId, characteristicId, uint8Array) {
			uni.showToast({
				icon:'loading',
				title:'正在打印',
				mask:true
			})
			
			this.ble.print(uint8Array,res => {
				uni.hideLoading()
				console.log('打印完毕');
			})
		},
	}
}
</script>

<style scoped lang="scss">
.container {
	padding: 30rpx;
	.cu-btn {
		height: 80rpx;
		color: #ffffff;
		font-size: 30rpx;
		background-color: #06d078;
	}
	.connect-button {
		height: 60rpx;
		color: #ffffff;
		font-size: 30rpx;
		margin-right: 30rpx;
		background-color: #06d078;
	}
	.loading-icon {
		animation: turn 1s linear infinite;
	}
	@keyframes turn {
		0% {
			-webkit-transform: rotate(0deg);
		}
		25% {
			-webkit-transform: rotate(90deg);
		}
		50% {
			-webkit-transform: rotate(180deg);
		}
		75% {
			-webkit-transform: rotate(270deg);
		}
		100% {
			-webkit-transform: rotate(360deg);
		}
	}
}
</style>
