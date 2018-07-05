<template>
    <div v-show="islook" class="feomType_img" :class="islook? 'feomCss': ''"  @touchmove.prevent>
        <img :src="data.src">
        <p v-if ="data.type == 'Signin'"><span>+{{data.data.fen}}</span> 积分&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>+{{data.data.exp}}</span> 经验</p>
        <div v-else-if ="data.type == 'Receive'" class="sess">
            <p>恭喜您，领取成功</p>
            <p>{{data.msg}}</p>
        </div>
        <span class="butt" @click="close">我知道了</span>
    </div>
</template>

<script>
export default {
    data() {
        return {
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
.feomType_img{
    position: fixed;
    top: 30%;left: 0.57rem;
    width: 2.6rem;z-index: 101;
    padding: 0.2rem 0;
    text-align: center;
    border-radius: 6px;
    background-color: #fff;
    
    >img{
        width: 1.21rem;
    }
    >p{
        font-size: 10px;
        color: #b6b6b6;
        margin-top: 12px;
        span{
            font-size: 14px;
            color: #e65400;
        }
    }
    .sess{
        font-size: 14px;
        color: #e65400;
        p{
            margin-top: 12px;
        }
    }
    .butt{
        height: 0.3rem;width: 1.2rem;
        display: block;margin:  0 auto;
        padding: 0 0.25rem;border-radius: 16px;
        border: 1px solid #ff600a;
        line-height: 0.3rem;margin-top: 0.25rem;
        color: #ec6700;
    }
}
</style>