<template>
	<div class="select-Emoticons">
    <div class="look" v-show="islook">
      <img v-for="(val,id) in Expression" :src="val" @click="isimg(id)">
    </div>
	</div>
</template>

<script>
var select1 = null, select2 = null;
export default {
	data() {
		return {
          Expression:{
            "[m:1]": "/static/img/biaoqing/aoman.gif",
            "[m:2]": "/static/img/biaoqing/baiyan.gif",
            "[m:3]": "/static/img/biaoqing/bang.gif",
            "[m:4]": "/static/img/biaoqing/bishi.gif",
            "[m:5]": "/static/img/biaoqing/bizui.gif",
            "[m:6]": "/static/img/biaoqing/daku.gif",
            "[m:7]": "/static/img/biaoqing/daxiao.gif",
            "[m:8]": "/static/img/biaoqing/fengdou.gif",
            "[m:9]": "/static/img/biaoqing/ganga.gif",
            "[m:10]": "/static/img/biaoqing/guzhang.gif",
            "[m:11]": "/static/img/biaoqing/hanxiao.gif",
            "[m:12]": "/static/img/biaoqing/hanyan.gif",
            "[m:13]": "/static/img/biaoqing/huaji.gif",
            "[m:14]": "/static/img/biaoqing/huaixiao.gif",
            "[m:15]": "/static/img/biaoqing/jingkong.gif",
            "[m:16]": "/static/img/biaoqing/jong.gif",
            "[m:17]": "/static/img/biaoqing/keai.gif",
            "[m:18]": "/static/img/biaoqing/liulei.gif",
            "[m:19]": "/static/img/biaoqing/nanguo.gif",
            "[m:20]": "/static/img/biaoqing/piezui.gif",
            "[m:21]": "/static/img/biaoqing/qinqin.gif",
            "[m:22]": "/static/img/biaoqing/se.gif",
            "[m:23]": "/static/img/biaoqing/shengqi.gif",
            "[m:24]": "/static/img/biaoqing/shuijiao.gif",
            "[m:25]": "/static/img/biaoqing/tiaopi.gif",
            "[m:26]": "/static/img/biaoqing/weixiao.gif",
            "[m:27]": "/static/img/biaoqing/weiqu.gif",
            "[m:28]": "/static/img/biaoqing/wuyu.gif",
            "[m:29]": "/static/img/biaoqing/xia.gif",
            "[m:30]": "/static/img/biaoqing/ye.gif",
            "[m:31]": "/static/img/biaoqing/yiwen.gif",
            "[m:32]": "/static/img/biaoqing/yun.gif",
            "[m:33]": "/static/img/biaoqing/zaijian.gif",
            "[m:34]": "/static/img/biaoqing/zhouma.gif",
            "[m:35]": "/static/img/biaoqing/zhuakuang.gif"
          }
		}
	},
	methods: {
	   isimg(id){
          var createImg = document.createElement('img');
          createImg.src = this.Expression[id]
          this.$emit('getExpression', createImg)
        },
	},
	props: ['islook']
}
	
</script>
<style lang="scss">
.select-Emoticons{
  .look{
    background-color: #fff;
    img{
      margin: 0.05rem 0.03rem 0.05rem 0.05rem;
      display: inline-block;

    }
  }
}
</style>