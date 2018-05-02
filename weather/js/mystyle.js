

var app={
	init(){
		var _this=this
		this.getData(function(data){
			_this.bindEvent()
			_this.render(data)
			
		})
	},
	bindEvent(){
		$$("#app .tabs>li").forEach(function(tab){
			tab.onclick=function(){
				$$("#app .tabs>li").forEach(function(node){
					node.classList.remove("active")
				})
				this.classList.add("active")
				var index=[].indexOf.call($$("#app .tabs>li"),this)
				//console.log(index)
				$$("#app .panels>li").forEach(function(panel){
					panel.classList.remove("active")
				})
				$$("#app .panels>li")[index].classList.add("active")
				
			}
		})

	},
	render(data){
		//console.log(data)
		$("#app .location .city").innerText=data.weather[0].city_name
		$$("#app .panels>li")[0].innerText=data.weather[0].today.suggestion.car_washing.details
		$$("#app .panels>li")[1].innerText=data.weather[0].today.suggestion.dressing.details
		$$("#app .panels>li")[2].innerText=data.weather[0].today.suggestion.flu.details
		$$("#app .panels>li")[3].innerText=data.weather[0].today.suggestion.restriction.details
		$$("#app .panels>li")[4].innerText=data.weather[0].today.suggestion.sport.details
		$$("#app .panels>li")[5].innerText=data.weather[0].today.suggestion.travel.details
		$$("#app .panels>li")[6].innerText=data.weather[0].today.suggestion.uv.details
		var last_update=new Date()
		$("#app .location .time").innerText=fixTime(last_update.getHours()+":"+last_update.getMinutes())
		$("#app .detail .temperature").innerText=data.weather[0].now.air_quality.city.o3
		var date=new Date(data.weather[0].future[0].date)
		$("#app .detail .date").innerText=(date.getMonth()+1)+"月"+date.getDate()+"日"+data.weather[0].future[0].day
		
		
		$("#app .current .more").innerText=data.weather[0].now.text
		$("#app .current .weather-pic img").src=weahterImg(data.weather[0].now.text)
		
		for(var index=0;index<(data.weather[0].future).length-1;index++){
			$$("#app .future .week")[index].innerText=data.weather[0].future[index+1].day
			$$("#app .future .weather-pic img")[index].src=weahterImg(data.weather[0].future[index+1].text)
			$$("#app .future .more")[index].innerText=data.weather[0].future[index+1].text
			$$("#app .future .temperature")[index].innerText=data.weather[0].future[index+1].low+"~"+data.weather[0].future[index+1].high
		
		}

	},
	getData(callback){
		var xhr=new XMLHttpRequest()
		xhr.open('Get','https://weixin.jirengu.com/weather?key=study_javascript_in_jirengu.com','true')
		xhr.send()
		xhr.onload=function(){
			callback(JSON.parse(xhr.responseText))
			
		}
	}
}

app.init()

function fixTime(t){
	if(t.toString()===1){
		return '0'+t
	}
	return t
}
function weahterImg(wstatus){
	switch(wstatus){
		case "多云/多云":
			$("#app .weather-pic img").src="../weather/iconfont/icon_duoyun.png"
			
			return $("#app .weather-pic img").src
			break
		case "晴/晴":
			$("#app .weather-pic img").src="../weather/iconfont/icon_qing.png"
			return $("#app .weather-pic img").src
			break
		case "晴/多云":
			$("#app .weather-pic img").src="../weather/iconfont/icon_qing.png"
			return $("#app .weather-pic img").src
			break
		case "多云/晴":
			$("#app .weather-pic img").src="../weather/iconfont/icon_duoyun.png"
			return $("#app .weather-pic img").src
			break
		case "小雨":
			$("#app .weather-pic img").src="../weather/iconfont/icon_xiaoyu.png"
			return $("#app .weather-pic img").src
			break
		case "大雨":
			$("#app .weather-pic img").src="../weather/iconfont/icon_dayu.png"
			return $("#app .weather-pic img").src
			break
		case "阴":
			$("#app .weather-pic img").src="../weather/iconfont/icon_yintian.png"
			return $("#app .weather-pic img").src
			break
		case "浮尘":
			$("#app .weather-pic img").src="../weather/iconfont/icon_duoyun.png"
			return $("#app .weather-pic img").src
			break
		
	}
	
}

function $(selection){
	return document.querySelector(selection)
}
function $$(selection){
	return document.querySelectorAll(selection)
}
