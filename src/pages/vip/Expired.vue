<template>
    <div class="unclaimed_page">
        <vip-pahead :title="'已过期'"></vip-pahead>
        <main>
            <div v-for="i in 10" class="unclaimed_list">
                <div class="box border">
                    <img src="/static/img/vip/remind_success@2x.png">
                    <div>
                        <h5>腾讯DNF黑钻</h5>
                        <p>奖励多奖励</p>
                        <span>2250积分</span>
                    </div>
                </div>
                <div class="butt">
                    <button type="button">已过期</button>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import vip_pahead from '../../components/vippageHead'

export default {
    data() {
        return {
           
        }
    },
    created(){
       
        this.$store.commit('selechange',4)
        this.$store.commit('_change',{
            _topshow: false,
            _bottshow: true,
        })
    },
    methods: {
     
    },
    components:{
      vipPahead: vip_pahead  
    }
}
    
</script>
<style lang="scss">
.unclaimed_page{
    padding: 0 0.13rem 0 0.23rem;
    padding-top: 44px;
    background-color: #fff;
    .unclaimed_list{
        padding: 0.26rem 0 ;
        display:flex;
        justify-content:space-between;
        position: relative;
        .box{
            display: flex;
            flex-direction: row;
            img{
                width: 0.56rem;height: 54px;
            }
            >div{
                line-height: 22px;
                margin-left: 22px;
                h5{
                    color: #000;
                    font-size: 15px;
                }
                p{
                    color: #959595;font-size: 12px;

                }
                span{
                    color: #ff5d00;font-size: 13px;
                }
            }
        }
        .butt{
            button{
                margin-top: 20px;
                padding: 3px 9px;
                border: 1px solid #909090;
                color: #909090;
                border-radius: 16px;
            }
            
        }
    }
 
}
</style>