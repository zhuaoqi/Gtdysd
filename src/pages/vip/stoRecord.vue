<template>
    <div class="stoRecord">
        <vip-pahead :title="'兑换记录'"></vip-pahead>
        <main>
            <div v-if="getUseDepot" class="unclaimed_list">
                <div class="box border" v-for="item in getUseDepot">
                    <div>
                        <h5>{{item.title}}</h5>
                        <p>{{item.update_time}}</p>
                    </div>
                </div>
            </div>
            <div v-else style="text-align: center;padding: 20px;">
              空
            </div>
        </main>
    </div>
</template>

<script>
import vip_pahead from '../../components/vippageHead'
import { Toast } from 'mint-ui'

export default {
    data() {
        return {
           getUseDepot: null
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
    mounted(){
      this.$axios.post('/',{method:'member.depot.getUseDepot'}).then( (res) => {
        if(res.data.status == 0){
          this.getUseDepot = res.data.data.data
        }else Toast(res.data.msg)
      })
    },
    components:{
      vipPahead: vip_pahead  
    }
}
    
</script>
<style lang="scss">
.stoRecord{
    padding: 0 0.13rem 0 0.23rem;
    padding-top: 44px;
    background-color: #fff;
    .unclaimed_list{
        >div{
          display: flex;
          align-items: center;
          height: 0.77rem;
          line-height: 25px;
          position: relative;
          h5{
            font-size: 16px;
          }
          p{
            font-size: 13px;
            color: #909090;
          }
        }
    }
 
}
</style>