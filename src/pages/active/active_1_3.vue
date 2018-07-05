<template>
  <div class="active1_3_">
    <img @click="$router.push('/active_1')" src="/static/img/btn_fanhui@2x.png">
    <div>
      <img src="/static/img/active/active1_2/_01.png" alt="">
      <img src="/static/img/active/active1_2/_02.png" alt="">
      <img src="/static/img/active/active1_2/_03.png" alt="">
      <img src="/static/img/active/active1_2/_05.png" alt="">
    </div>
  </div>
</template>

<script>


import { Toast } from 'mint-ui'

export default {
  data (){
    return {
     
    }
  },
  created(){

  },
  mounted(){
   
  },
  methods: {

   
  },
  components: {
   
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"> 
  .active1_3_{
    position: relative;
    >img{
      width: 0.93rem;
      position: absolute;
      top: 0.2rem;left: 0.1rem;
    }
    >div{
      >img{
        font-size: 0;
        display: block;
        width: 100%;
      }
    }
  }
</style>
