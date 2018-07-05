<template>
    <div class="headd">
        <div class="back" @click="goBack"></div>
        <h1>{{title}}</h1>
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    created(){
        this.$store.commit('selechange',4)
        this.$store.commit('_change',{
            _topshow: false,
            _bottshow: false,
        })
    },
    methods: {
        goBack(){
            this.$router.goBack()
        },
    },
    props: ['title']
}
    
</script>
<style lang="scss">
.headd{
  position: fixed;
  left: 0;top: 0;z-index: 100;
  height: 44px;width: 100%;
  background-image: url(/static/img/vip/navigationbar@2xs.png);
  background-size: 100%;
  .back{
    position: absolute;
    left: 15px;top: 15px;
    width: 20px;height: 20px;
    background-image: url(/static/img/nav_fanhui@3x.png);
    background-repeat: no-repeat;
    background-size: 100%;
  }
  h1{
    font-size: 17px;color: #fff;
    text-align: center;font-weight: normal;
    line-height: 44px;
  }
}
</style>