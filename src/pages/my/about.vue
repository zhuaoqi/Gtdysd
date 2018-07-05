<template>
  <div class="about_page" :style="{'height':height}">
    <div class="box">
      <img src="/static/img/dianyu--icon@2x.png" style="width: 1rem;" alt="">
      <p style="margin-top: 0.1rem">版本号 1.0</p>
    </div>
    <div class="box1">
      <p>上海动娱网络科技有限公司</p>
      <span>021 - 123456</span>
    </div>
  </div>
</template>

<script>
export default {
  data (){
    return {
     
    }
  },
  created(){
    this.$store.commit('_change',{
      _logo   : false,
      _title  : '关于我们',
      _search : false,
      _topshow: true,
      _bottshow: false,
      _regain : false,
      _back   : true
    })
    this.$store.commit('selechange',4)
  },
  methods: {
    
  },
  computed: {
    height(){
      return parseInt(this.$store.state.height) - 44 +'px'
    }
  },
  components: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"> 
  .about_page{
    position: relative;
    text-align:center;
    font-size: 14px;
    color: #646464;
    img{
      width:80%;
    }
    .box{
      margin-top: 1rem;
    }
    .box1{
      position: absolute;
      bottom: 0.2rem;left: 0;right: 0;
    }
  }
</style>
