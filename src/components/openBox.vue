<template>
    <div v-show="islook" class="openBox" :class="islook? 'feomCss': ''"  @touchmove.prevent>
       <div class="bg_box"  :class="islook? 'reted': ''"></div>
       <img :src="box_img[data.type]">
       <div class="joy">
           恭喜你获得 {{data.tit}}
       </div>
       <div class="close" @click="close"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            box_img:[
                '/static/img/vip/img_woodenbox_s@2x.png',
                '/static/img/vip/img_whitegoldbox_s@2x.png',
                '/static/img/vip/diamonds_box_s@2x.png',
                '/static/img/vip/king_box_s@2x.png',
                '/static/img/vip/woodenbox_open@2x.png',
                '/static/img/vip/whitegoldbox_open@2x.png',
                '/static/img/vip/diamondbox_open@2x.png',
                '/static/img/vip/kingsbox_open@2x.png',
                '/static/img/vip/1R.png',
            ]
        }
    },
    methods: {
       close(){
         this.$emit('isclose', false)
       }
    },
    props: ['islook','data']
}
    
</script>
<style lang="scss">
.openBox{
    position: fixed;
    top: 25%;left: 0.49rem;
    z-index: 101;
    .bg_box{
        width: 2.8rem;height: 2.9rem;
        background-image: url(/static/img/vip/bg_lighteffect@2x.png);
        background-size: 100%;
        background-repeat: no-repeat;
    }
    >img{
        position: absolute;
        left: 0.85rem; top: 0.9rem;
        width: 1.1rem;
    }
    .joy{
        width: 100%;height: 0.58rem;
        background-image: url(/static/img/vip/bg_img@2x.png);
        background-size: 100%;
        transform: translateY(-0.54rem);
        text-align: center;
        line-height: 0.4rem;
        color: #fff;font-size: 15px;

    }
    .close{
        display: inline-block;
        position: absolute;
        right: 0.2rem;top:0.3rem;
        width: 25px; height: 25px;
        background-image: url(/static/img/vip/common_icon_close@2x.png);
        background-size: 100%;
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