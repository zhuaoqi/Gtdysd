<template>
    <div v-show="islook" class="messageBox" :class="islook? 'feomCss': ''"  @touchmove.prevent>
        <div>
            <p>{{data.tit}}</p>
            <span>{{data.msg}}</span>
        </div>
       <div class="quit">
           <button type="button" @click="confirm(false)">取消</button>
           <button type="button" style="border-left: 1px solid #dcdcdc;color: #e65400;" @click="confirm(true)">确认</button>
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
       confirm(type){
        this.$emit('confirm',type)
       }
    },
    props: ['islook','data']
}
    
</script>
<style lang="scss">
.messageBox{
    position: fixed;
    top: 35%;left: 0.525rem;
    z-index: 120;
    padding-top: 0.4rem;
    background-color: #fff;
    width: 2.7rem;
    border-radius: 3px;
    -webkit-user-select: none;
    overflow: hidden;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    text-align: center;
    div:first-child{
        padding-bottom: 0.2rem;
        border-bottom: 1px solid #dcdcdc;
        p{
        font-size: 14px;color: #000;
        }
        span{
            display: block;
            font-size: 12px;
            margin-top: 0.12rem;
        }
    }
    .quit{
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        height: 40px;
        line-height: 40px;

        button{
            line-height: 35px;
            display: block;
            background-color: #fff;
            -webkit-box-flex: 1;
            -ms-flex: 1;
            flex: 1;
            margin: 0;
            border: 0;
        }
    }
}
</style>