import utils from './time.js'
var encode = require("./encoding.js");

// 获取文本长度区分中英文
function strSize(str) {
	return str.replace(/[\u0391-\uFFE5]/g, "aa").length
}

function splitStr(str, length = 10) {
	if(str.length < length) return str;
	let strArr = [];
	let index = length;
	let strLength = str.length;
	let strArrLength = strLength / length;
	for (let i = 0; i < strArrLength; i++) {
		strArr.push(str.substring(i * length,(i + 1) * length))
	}
	return strArr;
}

var printer = {
	createNew: function() {
		var data = "";
		var printer = {};
		var command = [];
		printer.name = "标签模式";
		printer.addCommand = function(content) { // 将指令转成数组装起
			var code = new encode.TextEncoder('GB18030', {
				NONSTANDARD_allowLegacyEncoding: true
			}).encode(content + '\r\n');
			for (let i = 0; i < code.length; ++i) {
				command.push(code[i])
			};
		};

		printer.receive = function() { //测试模板1
			printer.addCommand('! 0 200 200 800 1') //标签面积
			// printer.addCommand(`TEXT 24 1 220 25         ${}`)
			printer.addCommand('TEXT 24 1 340 22 ' + utils.timeFormat(new Date, 'yyyy/mm/dd hh:MM:ss'))
			printer.addCommand('SETBOLD 1')
			printer.addCommand('TEXT 24 3,1 0 60 如影随行')
			printer.addCommand('SETBOLD 0')
			printer.addCommand('TEXT 24 1 475 60 普货包裹')
			printer.addCommand('LINE 0 100 575 100 2')
			printer.addCommand('BOX 0 100 575 760 2')
			// 寄件人
			printer.addCommand('TEXT 24 1 20 120 寄')
			printer.addCommand('TEXT 24 1 20 150 件')
			printer.addCommand('TEXT 24 1 20 180 人')
			printer.addCommand('TEXT 24 1 80 120 珂攀     18000000000')
			let textArr = splitStr('福建省福州市台江区义务街道福建省福州市台福建省福州市台江区义务街道福建省福州市台',20);
			textArr.forEach((item,index) => {
				printer.addCommand(`TEXT 24 1 80 ${150 + index * 30} ${item}`)
			})
			printer.addCommand('LINE 60 100 60 490 1')
			printer.addCommand('LINE 0 220 575 220 2')
			// 收件人
			printer.addCommand('TEXT 24 1 20 240 收')
			printer.addCommand('TEXT 24 1 20 270 件')
			printer.addCommand('TEXT 24 1 20 300 人')
			printer.addCommand('TEXT 24 1 80 240 珂攀     18000000000')
			printer.addCommand('TEXT 24 1 80 270 福建省福州市台江区义务街道福建省福州市台')
			printer.addCommand('TEXT 24 1 80 300 江区义务街道550号万科')
			printer.addCommand('LINE 0 340 575 340 2')
			// 货物信息
			printer.addCommand('TEXT 24 1 20 360 货')
			printer.addCommand('TEXT 24 1 20 390 物')
			printer.addCommand('TEXT 24 1 20 420 信')
			printer.addCommand('TEXT 24 1 20 450 息')
			printer.addCommand('TEXT 24 1 80 365 货物：测试货物名称测试货物名称')
			printer.addCommand('TEXT 24 1 80 400 件数：10    重量：20.00    体积：20.00')
			printer.addCommand('TEXT 24 1 80 435 到付：20.00')
			printer.addCommand('LINE 0 490 575 490 2')

			// 选择项
			printer.addCommand('TEXT 24 1 20 500 √配送上楼  √特殊入仓')
			printer.addCommand('TEXT 24 1 20 535 √签收单返还')
			printer.addCommand('TEXT 24 1 20 570 √货物价值声明：5000元')
			printer.addCommand('LINE 300 490 300 610 1')

			// 签名
			printer.addCommand('TEXT 24 1 320 500 签名：')
			printer.addCommand('LINE 0 610 575 610 2')

			// 客服电话
			printer.addCommand('TEXT 24 1 10 625 客服电话：4000913313')
			printer.addCommand('LINE 270 610 270 760 1')
			printer.addCommand('LINE 0 660 270 660 2')
			// // 二维码
			printer.addCommand('B QR 0 670 M 2 U 4')
			printer.addCommand('MA,QR code ABC123')
			printer.addCommand('ENDQR')
			// 二维码提示信息
			printer.addCommand('TEXT 55 1 125 670 扫描左侧的小程序')
			printer.addCommand('TEXT 55 1 125 700 二维码登陆亿都出')
			printer.addCommand('TEXT 55 1 125 730 行进行快递寄件')

			// 条码
			printer.addCommand('BARCODE-TEXT 24 0 5')
			printer.addCommand('BARCODE 93 1 1 80 285 635 123456789-1')
			printer.addCommand('BARCODE-TEXT OFF')

			printer.addCommand('FORM')
			printer.addCommand('PRINT')
		};

		printer.goods = function(data) { //测试模板1
			printer.addCommand('! 0 200 200 780 1') //标签面积
			printer.addCommand('TEXT 24 1 220 22 ' + utils.timeFormat(new Date, 'yyyy/mm/dd hh:MM:ss') + '      1/3')
			printer.addCommand('SETBOLD 1')
			printer.addCommand('TEXT 24 3,1 0 65 如影随行')
			printer.addCommand('SETBOLD 0')
			switch (data.expressType) {
				case 'CITY_AIRPORT':
					printer.addCommand('TEXT 24 1 450 65 行李箱包裹')
					break;
				case 'AIRPORT_CITY':
					printer.addCommand('TEXT 24 1 450 65 行李箱包裹')
					break;
				case 'XM_AVIATION':
					printer.addCommand('TEXT 24 1 450 65 行李箱包裹')
					break;
				case 'GENERAL_CARGO':
					printer.addCommand('TEXT 24 1 450 65 普货包裹')
					break;
				default:
					printer.addCommand('TEXT 24 1 450 65 普货包裹')
					break;
			}
			printer.addCommand('LINE 0 110 575 110 2')
			printer.addCommand('BOX 0 110 575 760 2')
			printer.addCommand('CENTER')
			printer.addCommand('BARCODE-TEXT 24 0 5')
			printer.addCommand('BARCODE 128 1 2 60 0 120 ' + data.no)
			printer.addCommand('BARCODE-TEXT OFF')
			printer.addCommand('LEFT')
			printer.addCommand('LINE 0 210 575 210 2')

			printer.addCommand('SETBOLD 1')
			printer.addCommand('BOX 20 220 70 270 4')
			printer.addCommand('TEXT 24 3,1 20 230 集')
			printer.addCommand('TEXT 24 1 90 230 福州市')
			printer.addCommand('SETBOLD 0')

			printer.addCommand('SETBOLD 1')
			printer.addCommand('BOX 200 220 250 270 4')
			printer.addCommand('TEXT 24 3,1 200 230 末')
			printer.addCommand('TEXT 24 1 270 230 亿都镇')
			printer.addCommand('SETBOLD 0')
			printer.addCommand('LINE 0 280 575 280 2')

			printer.addCommand('BOX 20 290 70 340 2')
			printer.addCommand('SETBOLD 1')
			printer.addCommand('TEXT 24 3,1 20 300 收')
			printer.addCommand(`TEXT 24 1 90 308 ${data.deliveryName}   ${data.deliveryPhone}`)
			printer.addCommand('SETBOLD 0')
			printer.addCommand(`TEXT 24 1 0 353 ${data.deliveryAddress}`)
			printer.addCommand('LINE 0 430 575 430 2')

			printer.addCommand('BOX 20 440 70 490 2')
			printer.addCommand('SETBOLD 1')
			printer.addCommand('TEXT 24 3,1 20 450 寄')
			printer.addCommand(`TEXT 24 1 90 458 ${data.name}   ${data.phone}`)
			printer.addCommand('SETBOLD 0')
			printer.addCommand(`TEXT 24 1 0 503 ${data.province}${data.city}${data.area}${data.address}`)
			printer.addCommand('LINE 0 580 575 580 2')

			printer.addCommand('TEXT 24 1 10 590 客服电话：4000913313')
			printer.addCommand('LINE 0 620 270 620 2')
			// 二维码
			printer.addCommand('B QR 0 640 M 2 U 3')
			printer.addCommand('MA,https://mp.weixin.qq.com/a/~aBex189QHXKD0liyS_QetQ~~')
			printer.addCommand('ENDQR')

			printer.addCommand('TEXT 55 1 125 660 扫描左侧的小程序')
			printer.addCommand('TEXT 55 1 125 690 二维码登陆亿都出')
			printer.addCommand('TEXT 55 1 125 720 行进行快递寄件')

			printer.addCommand('LINE 270 580 270 760 2')

			printer.addCommand('BARCODE-TEXT 24 0 5')
			printer.addCommand(`BARCODE 93 1 1 80 286 640 12930529703`)
			printer.addCommand('BARCODE-TEXT OFF')

			printer.addCommand('FORM')
			printer.addCommand('PRINT')
		};

		printer.goods1 = function(data) { //测试模板1
			printer.addCommand('! 0 200 200 780 1') //标签面积
			printer.addCommand('TEXT 24 1 230 22 ' + utils.timeFormat(new Date, 'yyyy/mm/dd hh:MM:ss') + '      1/3')
			printer.addCommand('SETBOLD 1')
			printer.addCommand('TEXT 24 3,1 0 65 如影随行')
			printer.addCommand('SETBOLD 0')
			printer.addCommand('TEXT 24 1 450 65 行李箱包裹')
			printer.addCommand('LINE 0 110 575 110 2')
			printer.addCommand('BOX 0 110 575 760 2')
			printer.addCommand('CENTER')
			printer.addCommand('BARCODE-TEXT 24 0 5')
			printer.addCommand('BARCODE 128 1 2 60 0 120 123456789-1')
			printer.addCommand('BARCODE-TEXT OFF')
			printer.addCommand('LEFT')
			printer.addCommand('LINE 0 210 575 210 2')

			printer.addCommand('SETBOLD 1')
			printer.addCommand('BOX 20 220 70 270 2')
			printer.addCommand('TEXT 24 3,1 20 230 集')
			printer.addCommand('TEXT 24 1 90 230 福州市')
			printer.addCommand('SETBOLD 0')

			printer.addCommand('SETBOLD 1')
			printer.addCommand('BOX 200 220 250 270 2')
			printer.addCommand('TEXT 24 3,1 200 230 末')
			printer.addCommand('TEXT 24 1 270 230 亿都镇')
			printer.addCommand('SETBOLD 0')
			printer.addCommand('LINE 0 280 575 280 2')

			printer.addCommand('BOX 20 290 70 340 2')
			printer.addCommand('SETBOLD 1')
			printer.addCommand('TEXT 24 3,1 20 300 收')
			printer.addCommand('TEXT 24 1 90 308 珂攀   18000000000')
			printer.addCommand('SETBOLD 0')
			let getAddress = splitStr('福建省福州市台江区义务街道550号万科金融小区街道550号万科金融小区',24);
			getAddress.forEach((item,index) => {
				printer.addCommand(`TEXT 24 1 20 ${353 + index * 30} ${item}`)
			})
			printer.addCommand('LINE 0 430 575 430 2')

			printer.addCommand('BOX 20 440 70 490 2')
			printer.addCommand('SETBOLD 1')
			printer.addCommand('TEXT 24 3,1 20 450 寄')
			printer.addCommand('TEXT 24 1 90 458 金地   18000000000')
			printer.addCommand('SETBOLD 0')
			let sendAddress = splitStr('福建省福州市台江区义务街道550号万科金融小区街道550号万科金融小区',24);
			sendAddress.forEach((item,index) => {
				printer.addCommand(`TEXT 24 1 20 ${503 + index * 30} ${item}`)
			})
			printer.addCommand('LINE 0 580 575 580 2')

			printer.addCommand('TEXT 24 1 10 600 客服电话：4000913313')
			printer.addCommand('LINE 0 640 270 640 2')
			// 二维码
			printer.addCommand('B QR 0 660 M 2 U 4')
			printer.addCommand('MA,QR code ABC123')
			printer.addCommand('ENDQR')

			printer.addCommand('TEXT 55 1 125 660 扫描左侧的小程序')
			printer.addCommand('TEXT 55 1 125 690 二维码登陆亿都出')
			printer.addCommand('TEXT 55 1 125 720 行进行快递寄件')

			printer.addCommand('LINE 270 580 270 760 2')

			printer.addCommand('BARCODE-TEXT 24 0 5')
			printer.addCommand('BARCODE 93 1 1 80 285 620 123456789-1')
			printer.addCommand('BARCODE-TEXT OFF')

			printer.addCommand('FORM')
			printer.addCommand('PRINT')
		};


		printer.setSize = function(pageWidght, pageHeight) { //设置页面大小
			data = "SIZE " + pageWidght.toString() + " mm" + "," + pageHeight.toString() + " mm" + "\r\n";
			printer.addCommand(data)
		};

		printer.setSpeed = function(printSpeed) { //设置打印机速度
			data = "SPEED " + printSpeed.toString() + "\r\n";
			printer.addCommand(data)
		};

		printer.setDensity = function(printDensity) { //设置打印机浓度
			data = "DENSITY " + printDensity.toString() + "\r\n";
			printer.addCommand(data)
		};

		printer.setGap = function(printGap) { //传感器
			data = "GAP " + printGap.toString() + " mm\r\n";
			printer.addCommand(data)
		};

		printer.setCountry = function(country) { //选择国际字符集
			/*
			001:USA
			002:French
			003:Latin America
			034:Spanish
			039:Italian
			044:United Kingdom
			046:Swedish
			047:Norwegian
			049:German
			 */
			data = "COUNTRY " + country + "\r\n";
			printer.addCommand(data)
		};

		printer.setCodepage = function(codepage) { //选择国际代码页
			/*
			8-bit codepage 字符集代表
			437:United States
			850:Multilingual
			852:Slavic
			860:Portuguese
			863:Canadian/French
			865:Nordic
			Windows code page
			1250:Central Europe
			1252:Latin I
			1253:Greek
			1254:Turkish
			以下代码页仅限于 12×24 dot 英数字体
			WestEurope:WestEurope
			Greek:Greek
			Hebrew:Hebrew
			EastEurope:EastEurope
			Iran:Iran
			IranII:IranII
			Latvian:Latvian
			Arabic:Arabic
			Vietnam:Vietnam
			Uygur:Uygur
			Thai:Thai
			1252:Latin I
			1257:WPC1257
			1251:WPC1251
			866:Cyrillic
			858:PC858
			747:PC747
			864:PC864
			1001:PC100
			*/
			data = "CODEPAGE " + codepage + "\r\n";
			printer.addCommand(data)
		}

		printer.setCls = function() { //清除打印机缓存
			data = "CLS" + "\r\n";
			printer.addCommand(data)
		};

		printer.setFeed = function(feed) { //将纸向前推出n
			data = "FEED " + feed + "\r\n";
			printer.addCommand(data)
		};

		printer.setBackFeed = function(backup) { //将纸向后回拉n
			data = "BACKFEED " + backup + "\r\n";
			printer.addCommand(data)
		}

		printer.setDirection = function(direction) { //设置打印方向，参考编程手册  
			data = "DIRECTION " + direction + "\r\n";
			printer.addCommand(data)
		};

		printer.setReference = function(x, y) { //设置坐标原点，与打印方向有关
			data = "REFERENCE " + x + "," + y + "\r\n";
			printer.addCommand(data)
		};

		printer.setFromfeed = function() { //根据Size进一张标签纸
			data = "FORMFEED \r\n";
			printer.addCommand(data)
		};

		printer.setHome = function() { //根据Size找到下一张标签纸的位置
			data = "HOME \r\n";
			printer.addCommand(data)
		};

		printer.setSound = function(level, interval) { //控制蜂鸣器
			data = "SOUND " + level + "," + interval + "\r\n";
			printer.addCommand(data)
		};

		printer.setLimitfeed = function(limit) { // 检测垂直间距
			data = "LIMITFEED " + limit + "\r\n";
			printer.addCommand(data)
		};

		printer.setBar = function(x, y, width, height) { //绘制线条
			data = "BAR " + x + "," + y + "," + width + "," + height + "\r\n"
			printer.addCommand(data)
		};



		printer.setBox = function(x_start, y_start, x_end, y_end, thickness) { //绘制方框
			data = "BOX " + x_start + "," + y_start + "," + x_end + "," + y_end + "," + thickness + "\r\n";
			printer.addCommand(data)
		};

		printer.setErase = function(x_start, y_start, x_width, y_height) { //清除指定区域的数据
			data = "ERASE " + x_start + "," + y_start + "," + x_width + "," + y_height + "\r\n";
			printer.addCommand(data)
		};

		printer.setReverse = function(x_start, y_start, x_width, y_height) { //将指定的区域反相打印
			data = "REVERSE " + x_start + "," + y_start + "," + x_width + "," + y_height + "\r\n";
			printer.addCommand(data)
		};

		printer.setText = function(x, y, font, x_, y_, str) { //打印文字
			data = "TEXT 55 1 0 20 测试"
			printer.addCommand(data)
		};

		printer.setQR = function(x, y, level, width, mode, content) { //打印二维码
			data = "QRCODE " + x + "," + y + "," + level + "," + width + "," + mode + "," + 0 + ",\"" + content + "\"\r\n"
			printer.addCommand(data)
		};

		printer.setBar = function(x, y, codetype, height, readable, narrow, wide, content) { //打印条形码
			data = "BARCODE " + x + "," + y + ",\"" + codetype + "\"," + height + "," + readable + "," + 0 + "," + narrow +
				"," + wide + ",\"" + content + "\"\r\n"
			printer.addCommand(data)
		};

		printer.setBitmap = function(x, y, mode, res) { //添加图片，res为画布参数
			console.log(res)
			var width = parseInt((res.width + 7) / 8 * 8 / 8)
			var height = res.height;
			var time = 1;
			var temp = res.data.length - width * 32;
			var pointList = []
			console.log(width + "--" + height)
			data = "BITMAP " + x + "," + y + "," + width + "," + height + "," + mode + ","
			printer.addCommand(data)
			for (var i = 0; i < height; ++i) {
				console.log(temp)
				for (var j = 0; j < width; ++j) {
					for (var k = 0; k < 32; k += 4) {
						if (res.data[temp] == 0 && res.data[temp + 1] == 0 && res.data[temp + 2] == 0 && res.data[temp + 3] == 0) {
							pointList.push(1)
						} else {
							pointList.push(0)
						}
						temp += 4
					}
				}
				time++
				temp = res.data.length - width * 32 * time
			}
			for (var i = 0; i < pointList.length; i += 8) {
				var p = pointList[i] * 128 + pointList[i + 1] * 64 + pointList[i + 2] * 32 + pointList[i + 3] * 16 + pointList[i +
					4] * 8 + pointList[i + 5] * 4 + pointList[i + 6] * 2 + pointList[i + 7]
				command.push(p)
			}
		}

		printer.setPagePrint = function() { //打印页面
			data = "PRINT \r\n"
			printer.addCommand(data)
		};
		//获取打印数据
		printer.getData = function() {
			return command;
		};

		return printer;
	}
};

module.exports.printer = printer;
