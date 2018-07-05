<template>
  <div class="undefind_page">
    <div class="unded">
      <h1></h1>
      <img src="/static/img/img_prompt@2x.png" alt="404">
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
    this.$store.commit('selechange',4)
    this.$store.commit('_change',{
      _logo   : false,
      _title  : '404',
      _search : false,
      _topshow: true,
      _msg    : false,
      _bottshow: true,
      _regain : false,
      _back   : false
    })
  },
  methods: {
  
  },
 
  components: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"> 
  .undefind_page{
   .unded{
    text-align: center;
    margin-top: 1.5rem;
    img{
      width:80%;
    }
   }
  }
</style>
