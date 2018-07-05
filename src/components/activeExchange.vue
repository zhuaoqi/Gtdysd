<template>
    <div v-show="islook" class="activeBox" :class="islook? 'feomCss': ''"  @touchmove.prevent>
      
       <div class="close" @click="close"></div>
       <div class="txt">
           <p style="text-align: center">获得 {{ tit }}！</p>
           <p style="margin-top: 15px;line-height: 22px;">请到 "我的礼物" 中进行</p>
           <p>查看丶兑换</p>
           <div>
               <p style="color: #999">如发现疑问</p>
               <a style="color: #ed6e27" :href="'tel:'+ phone[parseInt(Math.random()*5)]">点击联系官方客服</a>
           </div>
           <span style="display: none;">{{type}}</span>
       </div>
       <div class="cofin">
           <button @click="close" type="button" style="background-color: #c92414">取消</button>
           <button @click="gose(type)" type="button" style="background-color: #4abf24">前往</button>
       </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            phone: ['15800839326','17317520286','13162300806','13166263195','13817538957']
        }
    },
    methods: {
       close(){
         this.$emit('isclose', false)
       },
       gose(ty){
        if(ty){
          this.$router.push('/vip/integral')
        }else{
          this.$router.push('/vip/gift')
        }
        
       }
    },
    props: ['islook','tit','type']
}
    
</script>
<style lang="scss">
.activeBox{
    position: fixed;
    top: 18%;left: 0.2rem;
    z-index: 101;width: 3.2rem;
    height: 3.97rem;background-image: url(/static/img/bg_tanchuang@2x.png);
    background-size: 100%;background-repeat: no-repeat;
    
    .close{
        display: inline-block;
        position: absolute;
        right: 0.05rem;top:0.17rem;
        width: 30px; height: 30px;
        background-image: url(/static/img/vip/common_icon_close@2x.png);
        background-size: 100%;
    }
    .txt{
        position: absolute;color: #000;
        top: 1.5rem;left: 1.08rem;
        font-size: 12px;text-align: center;
        font-weight: bold;
        >div{
            font-size: 11px;
            line-height: 18px;
            margin-top: 0.1rem;
        }
    }
    .cofin{
        width: 2.08rem;color: #333;
        position: absolute;
        bottom: 0.18rem;left: 0.66rem;
        display: flex;justify-content: space-between;
        >button{
            width: 0.94rem;height: 0.36rem;
            border: 1px solid #fff;color: #fff;
            border-radius: 12px;font-size: 18px;
        }
    }
}
.reted{
    animation: rotate 2s infinite;
}
@keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}
</style>