<template>
	<div class="box_rule" :style="{'height':height + 'px'}">
		<vip-pahead :title="'宝箱规则'"></vip-pahead>
		<h4>宝箱介绍</h4>
		<div>
			<p>宝箱分为木质宝箱、白金宝箱、钻石宝箱、王者宝箱。</p>
			<p>目前宝箱获取渠道为：每日签到。</p>
			<p>目前宝箱获取渠道为：每日签到。</p>
			<p>宝箱钥匙可以通过发帖、点赞、回复、活动、积分商城等方式获得。</p>
			<p>宝箱奖励每月更新一次，其中包含Q币、经验值、积分、视频网站会员等。</p>
		</div>
		<h4>礼物说明</h4>
		<h5>木质宝箱</h5>
		<div class="rule">
			<span v-for="item in data[1]">{{item}}</span>
		</div>
		<h5>白银宝箱</h5>
		<div class="rule">
			<span v-for="item in data[2]">{{item}}</span>
		</div>
		<h5>钻石宝箱</h5>
		<div class="rule">
			<span v-for="item in data[3]">{{item}}</span>
		</div>
		<h5>王者宝箱</h5>
		<div class="rule">
			<span v-for="item in data[4]">{{item}}</span>
		</div>
	</div>
</template>

<script>
import vip_pahead from '../../components/vippageHead'

export default {
	data() {
		return {
			height: 0,
			data: []
        }
	},
	created(){
		this.height = document.body.clientHeight 
	},
	mounted(){
		this.$axios.post('/',{method:'member.box.boxlottery'}).then( (res) => {
	      if(res.data.status == 0){
	        if(res.data.status == 0){
	        	this.data = res.data.data
	        }
	      }
	    })
	},
	methods: {
	   
	},
	components:{
	    vipPahead: vip_pahead  
	},
}
	
</script>
<style lang="scss">
.box_rule{
	padding-top: 64px;
	background-color: #fff;
	line-height: 0.25rem;
	h4{
		padding: 0 0.25rem;
		color: #333;font-size: 0.15rem;
	}
	>div{
		padding: 0 0.25rem;
		color: #6a6a6a;font-size: 0.12rem;
		
	}
	.rule{

		display: flex;flex-wrap: wrap;
		>span{
			line-height: 0.18rem;padding: 0 0.05rem;
			background-color: #eee;margin-top: 0.05rem;
			color: #666;margin-right: 0.1rem;
		}
		
	}
	h5{
		margin-top: 0.1rem;
		padding: 0 0.25rem;color: #333;
		font-size: 0.14rem;
	}
}
</style>