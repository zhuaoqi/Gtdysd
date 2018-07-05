<template>
	<div class="select-lables-img">

		<div class="lables">
	        <span style="padding: 0.05rem 0.05rem 0 0;background-color: #fff">标签</span>
	        <span @click="toggle(1)" :class="{'is': ins == 1}">手机游戏</span>
	        <span @click="toggle(2)" :class="{'is': ins == 2}">网络游戏</span>
	        <span @click="toggle(3)" :class="{'is': ins == 3}">单机游戏</span>
	        <div v-show="lables" @click="lables = false"></div>
	    </div>
		<div v-show="lables" class="lables_msg" :class="{'donghua': lables}">
	      <div>
	        <p>标签选择</p>
	        <div class="mas clearfix">
	          <span v-for="(item,index) in biaoqian.lables1" @click="select1(index,item)" :class="{'is': biaoqian.islables1 == index}">{{item}}</span>
	        </div>
	        <div class="border" style="position: relative;margin-top: 0.1rem;margin-bottom: 0.1rem;"></div>
	        <div class="mas clearfix">
	          <span v-for="(item,index) in biaoqian.lables2" @click="select2(index,item)" :class="{'is': biaoqian.islables2 == index}">{{item}}</span>
	        </div>
	      </div>
	      <button class="selesend" type="button" @click="getsend">完成</button>
	    </div>
	    <div v-show="lables" @click="lables = false;"  @touchmove.prevent class="bgd"></div>
	</div>
	
</template>

<script>
var select1 = null, select2 = null;
export default {
	data() {
		return {
			lables: false,
      ins: ''
		}
	},
	methods: {
	    select1(index,item){
	      select1 = item
	      this.biaoqian.islables1 = index
	    },
	    select2(index,item){
	      select2 = item
	      this.biaoqian.islables2 = index
	    },
	    getsend(){
	    	this.lables = false;
	    	let sed = [select1,select2]
	    	this.$emit('getlables', sed)
	    },
      toggle(v){
        this.lables = true; this.ins = v
        this.$emit('togglelables', v)
      }
	},
	props: {
		biaoqian:{
			type: Object,
			required: true
		}
	}
}
	
</script>
<style lang="scss">
.select-lables-img{
 .lables{
    display: inline-block;
    position: relative;
    span{
      border-radius: 0.15rem;
      background-color: #f5f5f5;
    }
    .is{
      color: #fff;      
      background-color: #ff5e00;
    }
    >div{
      position: absolute;right: -20px;;top: 4px;
      width: 20px; height: 20px;
      background-image: url(/static/img/game_icon_shanchu@2x.png);
      background-size: 100%;
    }
  }
}
.lables_msg{
    position: fixed;
    top: 30%;
    left: 5%;
    background-color: #fff;
    width: 90%;
    border-radius: 3px;
    font-size: 16px;
    z-index: 2118;
    padding: 0.15rem;
    .mas span{
      color: #2c3e50;
      padding: 0.05rem 0.1rem;
      margin-right: 0.06rem;
      float: left;
      margin-top: 0.1rem;
      border-radius: 0.15rem;
      background-color: #f5f5f5;
      font-size: 12px;
    }
   .mas .is{
        color: #fff;      
        background-color: #ff5e00;
    }
    >div{
      p{
        color: #e65400;
        margin-bottom: 0.1rem;
      }
    }
    .selesend{
    	height: 0.3rem;
    	width: 2rem;
    	display: block;
    	color: #fff;
    	background-color: #e65400;
    	margin: 0 auto;
    	border-radius: 30px;
    	margin-top: 0.2rem;
    	font-size: 14px;line-height: 0.3rem;
    }
}
.bgd{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.6;
    background: #000;
    z-index: 2012;
}
</style>