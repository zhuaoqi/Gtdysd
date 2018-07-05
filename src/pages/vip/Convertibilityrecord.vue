<template>
  <div class="bilityrecord">
    <vip-pahead :title="'兑换记录'"></vip-pahead>
    <div class="main">
      <ul>
        <li v-for="item in bilityrecord" style="margin-top: 0;" class="border">
          <div>
            <p>{{item.gname}}</p>
            <p>{{item.create_time}}</p>
          </div>
          <div class="marry"><span></span> -{{item.price}}</div>
        </li>
       
      </ul>
    </div>
  </div>
</template>

<script>
import vip_pahead from '../../components/vippageHead'

export default {
  data (){
    return {
      bilityrecord: ''
    }
  },
  created(){
    this.$store.commit('_change',{
      _topshow: false,
      _bottshow: false,
    })
    this.$store.commit('selechange',4)
  },
  methods: {
    
  },
  mounted(){
    this.$axios.post('/',{method:'member.score.scoreLog'}).then( (res) => {
          if(res.data.status == 0){
            this.bilityrecord = res.data.data.data
          }
    })
  },
  components:{
    vipPahead: vip_pahead  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"> 
  .bilityrecord{
    padding-top: 44px;
    background-color: #fff;
    .main{
      padding: 0 0.15rem;
      >ul{
        li{
          padding: 0 0.15rem 0 0.07rem;
          width: 100%;height: 0.7rem;
          display: flex;justify-content: space-between;
          align-items:center;position: relative;
          >div{
            color: #333;font-size: 16px;
            line-height: 25px;
            >p:last-child{
              color: #9f9e9e;font-size: 13px;
            }
          }
        }
      }
    }
  }
</style>
