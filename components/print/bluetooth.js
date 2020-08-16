import _ from 'lodash'

class Bluetooth {
	constructor() {
		this.deviceId = '';
		this.lastDeviceId = '';
		this.serviceId = '';
		this.services = '';
		this.characteristicId = '';
	}

	// 初始化蓝牙
	init(callback) {
		callback = callback || function() {};
		uni.openBluetoothAdapter({
			success: res => {
				// 初始化成功后获取本机蓝牙适配器状态
				uni.getBluetoothAdapterState({
					success: res => {
						// 蓝牙适配器可用
						if (res.available) {
							// 没有正在搜索设备
							if (!res.discovering) {
								// 开始搜寻附近的蓝牙外围设备
								uni.startBluetoothDevicesDiscovery({
									success: res => {
										// 开始搜索时监听蓝牙连接和断开事件
										this.onState()
										callback()
									},
									fail: err => {
										if (err.errCode == 0) return;
										this.handleError(err.errCode)
									}
								})
							}
						} else {
							this.toast('本机蓝牙不可用');
						}
					},
					fail: err => {
						if (err.errCode == 0) return;
						this.handleError(err.errCode)
					}
				})
			},
			fail: err => {
				if (err.errCode == 0) return;
				this.handleError(err.errCode)
			}
		});
	}

	// 连接蓝牙
	connecte(deviceId, callback) {
		callback = callback || function() {};
		uni.showToast({
			title: '连接蓝牙...',
			icon: 'loading',
			duration: 99999,
			mask: true
		})

		// 判断在连接之前是否已经连接蓝牙如果已经连接先断开
		if (this.lastDeviceId) {
			uni.closeBLEConnection({
				deviceId: this.lastDeviceId,
				success: (res) => {},
				fail: (err) => {
					console.log(err);
				}
			})
		}

		// 这里延时下在连接
		setTimeout(() => {
			// 开始连接
			uni.createBLEConnection({
				deviceId: deviceId, // deviceId是连接时传入进来的
				success: res => {
					// 连接成功记录连接ID
					this.lastDeviceId = deviceId
					this.deviceId = deviceId
					// 连接成功停止继续搜索蓝牙设备
					this.stopDevicesDiscovery()
					// 延时获取连接蓝牙所有服务
					setTimeout(() => {
						// 获取已连接设备的所有服务
						uni.getBLEDeviceServices({
							deviceId: deviceId,
							success: async res => {
								// 获取服务成功遍历可写入的服务
								for (let i = 0; i < res.services.length; i++) {
									let serviceId = res.services[i].uuid
									// 遍历获取蓝牙设备某个服务中所有特征值
									let result = await this.findWrite(deviceId, serviceId)
									if (result) {
										uni.hideToast()
										uni.showToast({
											icon: 'success',
											title: '蓝牙连接成功',
											mask: true
										})
										this.openNotify(deviceId, serviceId, this.characteristicId)
										callback()
										break
									}
								}
							},
							fail: err => {
								if (err.errCode == 0) return;
								this.handleError(err.errCode)
							}
						})
					}, 2000)
				},
				fail: err => {
					if (err.errCode == 0) return;
					this.handleError(err.errCode)
				}
			})
		}, 200)
	}

	// 打印数据
	async print(uint8Array, callback) {
		callback = callback || function() {};
		uint8Array = _.chunk(uint8Array, 20)
		for (let i = 0, len = uint8Array.length; i < len; i++) {
			let buffer = new ArrayBuffer(uint8Array[i].length)
			let dataView = new DataView(buffer)
			for (let j = 0, len = uint8Array[i].length; j < len; j++) {
				dataView.setUint8(j, uint8Array[i][j])
			}
			await this.writeCommand(buffer)
			if (i + 1 == len) callback()
		}
	}

	// 同步写入指令
	writeCommand(buffer) {
		return new Promise((resolve, reject) => {
			uni.writeBLECharacteristicValue({
				deviceId: this.deviceId,
				serviceId: this.serviceId,
				characteristicId: this.characteristicId,
				value: buffer,
				success: (res) => {
					resolve(true)
				},
				fail: (err) => {
					if (err.errCode == 0) return;
					this.handleError(err.errCode)
					reject(false)
				}
			})
		})
	}

	// 查找写入服务特征
	findWrite(deviceId, serviceId) {
		return new Promise(resolve => {
			uni.getBLEDeviceCharacteristics({
				deviceId: deviceId,
				serviceId: serviceId,
				success: (res) => {
					for (let c = 0; c < res.characteristics.length; c++) {
						// 如果特征值的写入属性为真记录特征ID
						if (res.characteristics[c].properties.write && res.characteristics[c].properties.notify) {
							this.serviceId = serviceId
							this.characteristicId = res.characteristics[c].uuid
							resolve(true)
							break
						}
					}
					resolve(false)
				}
			})
		})
	}

	// 停止搜索蓝牙设备
	stopDevicesDiscovery(callback) {
		callback = callback || function() {};
		uni.stopBluetoothDevicesDiscovery({
			success: e => {
				callback()
			},
			fail: e => {
				if (err.errCode == 0) return;
				this.handleError(err.errCode)
			}
		})
	};

	// 监听搜索蓝牙设备
	onSearch(callback) {
		callback = callback || function() {};
		uni.onBluetoothDeviceFound(devices => {
			uni.getBluetoothDevices({
				success: res => {
					let list = res.devices.filter(item => {
						if (item.name && item.name != '未知设备') {
							return true
						}
					})
					list.forEach(item => {
						item.nickName = item.name
						item.connect = false
					})
					this.services = list
					callback(list);
				}
			})
		})
	};

	// 启用低功耗蓝牙设备特征值变化时的 notify 功能，订阅特征值
	openNotify(deviceId, serviceId, characteristicId) {
		setTimeout(() => {
			uni.notifyBLECharacteristicValueChange({
				state: true, // 启用 notify 功能
				// 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
				deviceId,
				// 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
				serviceId,
				// 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
				characteristicId,
				success: (res) => {
					uni.onBLECharacteristicValueChange((res) => {
						console.log('监听到通知', res);
						console.log(this.ab2hex(res.value))
					})
				},
				fail: (err) => {
					if (err.errCode == 0) return;
					this.handleError(err.errCode)
				}
			})
		}, 500)

	}

	// ArrayBuffer转16进度字符串示例
	ab2hex(buffer) {
		const hexArr = Array.prototype.map.call(
			new Uint8Array(buffer),
			function(bit) {
				return ('00' + bit.toString(16)).slice(-2)
			}
		)
		return hexArr.join('')
	}

	// 读取低功耗蓝牙设备的特征值的二进制数据值
	readValue() {
		uni.readBLECharacteristicValue({
			// 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
			deviceId: this.deviceId,
			// 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
			serviceId: this.serviceId,
			// 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
			characteristicId: this.characteristicId,
			success: (res) => {}
		})
	}

	// 监听蓝牙连接和断开
	onState() {
		uni.onBLEConnectionStateChange(res => {
			if (res.connected) {
				// uni.showToast({
				// 	icon: 'success',
				// 	title: '蓝牙连接成功'
				// })
			} else {
				// toast('蓝牙断开连接')
			}
		})
	};

	// 关闭蓝牙
	close() {
		uni.closeBluetoothAdapter({
			success: (res) => {
				uni.showToast({
					icon:'none',
					title:'蓝牙已关闭'
				})
			},
			fail: (err) => {
				if (err.errCode == 0) return;
				this.handleError(err.errCode)
			}
		})
	};

	// 处理蓝牙错误代码
	handleError(code, errMsg = '未知错误') {
		uni.hideLoading()
		switch (code) {
			case 10000:
				this.toast('未初始化蓝牙适配器')
				break
			case 10001:
				this.toast('未检测到蓝牙，请打开蓝牙重试！')
				break
			case 10002:
				this.toast('没有找到指定设备')
				break
			case 10003:
				this.toast('连接失败')
				break
			case 10004:
				this.toast('没有找到指定服务')
				break
			case 10005:
				this.toast('没有找到指定特征值')
				break
			case 10006:
				this.toast('当前连接已断开')
				break
			case 10007:
				this.toast('当前特征值不支持此操作')
				break
			case 10008:
				this.toast('其余所有系统上报的异常')
				break
			case 10009:
				this.toast('Android 系统特有，系统版本低于 4.3 不支持 BLE')
				break
			default:
				this.toast(code)
		}
	}

	// 提示消息
	toast(content, showCancel = false) {
		uni.showModal({
			title: '提示',
			content,
			showCancel
		})
	}
}

export default Bluetooth
