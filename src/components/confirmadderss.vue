<template>
    <div v-show="islook" class="confirmAddress" :class="islook? 'feomCss': ''"  @touchmove.prevent>
        <div class="check">
            <input class="mint-checkbox-input" type="checkbox" v-model="value">
            <div>
                <span style="margin-top: 20px;" class="mint-checkbox-core" :class="value ? 'ischeck': ''" @click="value = !value "></span>
            </div>
            <div class="userm" @click="$router.push('/vip/Receaddress')">
                <p>{{data.real_name}}<span>{{data.real_address}}</span></p>
                <p style="margin-top: 13px;">{{data.real_phone}}</p>
            </div>
            <span @click="$router.push('/vip/Receaddress')">
                <img src="/static/img/vip/common_icon_more@2x.png">
            </span>
        </div>
       <div class="quit">
           <button type="button" @click="confirm(false)">取消</button>
           <button type="button" style="border-left: 1px solid #dcdcdc;color: #e65400;" @click="!value || confirm(true)">确认</button>
       </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            value: false
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
.confirmAddress{
    position: fixed;
    top: 35%;left: 0.525rem;
    z-index: 120;
    padding-top: 0.31rem;
    background-color: #fff;
    width: 2.7rem;
    border-radius: 3px;
    -webkit-user-select: none;
    overflow: hidden;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    div:first-child{
       
    }
    .quit{
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        height: 40px;
        line-height: 40px;
        border-top: 1px solid #dcdcdc;
        button{
            line-height: 35px;
            display: block;
            background-color: #fff;
            -webkit-box-flex: 1;
            -ms-flex: 1;flex: 1;
            margin: 0;border: 0;
        }
    }

    .check{
        padding: 0 14px;
        padding-bottom: 0.25rem;
        display: flex;
        justify-content: space-between;
        >span{
            display: block;
            width: 0.12rem;
            img{
                width: 100%;
                margin-top: 15px;
            }
        }
        >div{
            font-size: 16px;
            text-align: left;
            p{
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
            >p>span{
                margin-left: 15px;
                font-size: 12px;
            }
        }
        .userm{
            width: 1.8rem;
        }
        .ischeck{
            background-color: #26a2ff;
            border-color: #26a2ff;
        }
        .ischeck:after{
                border-color: #fff;
    -webkit-transform: rotate(45deg) scale(1);
    transform: rotate(45deg) scale(1);
        }
    }
}
</style>