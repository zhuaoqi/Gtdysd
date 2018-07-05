<template>
  <div class="mycamp_page">
    <vip-pahead :title="'我的阵营'"></vip-pahead>
    <img src="/static/img/wind.png" alt="">
    <p>尽请期待...</p>
  </div>
</template>

<script>
import vip_pahead from '../../components/vippageHead'

export default {
  data (){
    return {
     
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
  computed: {
  },
  components:{
    vipPahead: vip_pahead  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"> 
  .mycamp_page{
    text-align:center;
    >img{
      margin-top:80px;
      width:80%;
    }
  }
</style>
