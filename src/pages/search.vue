<template>
  <div class="myvip_page">
    <img src="/static/img/wind.png" alt="">
    <p>尽请期待...</p>
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
      _title  : '帖子搜索',
      _search : false,
      _topshow: true,
      _bottshow: true,
      _regain : false,
      _back   : true
    })
    this.$store.commit('selechange',4)
  },
  methods: {
    
  },
  computed: {
  },
  components: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"> 
  .myvip_page{
    text-align:center;
    img{
      width:80%;
    }
  }
</style>
