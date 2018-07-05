<template>
	<div v-if="islook" class="feomType_text" :class="islook? 'feomCss': ''"  @touchmove.prevent>
		<img src="/static/img/vip/sign_fail@2x.png">
		<div v-if = "data.type == 1" style="margin-top: 0.2rem">
			<p>您还没有对应的钥匙</p>
			<p>快用积分兑换吧</p>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
        }
	},
	methods: {
	   
	},
	props: ['islook','data']
}
	
</script>
<style lang="scss">
.feomType_text{
	position: fixed;
	top: 30%;left: 0.57rem;
	width: 2.6rem;z-index: 101;
	padding: 0.2rem 0;
	text-align: center;
	border-radius: 6px;
	background-color: #fff;
	>img{
		width: 0.54rem;
	}
	p{
		font-size: 16px;color: #333;
		line-height: 25px;
	}
}
</style>