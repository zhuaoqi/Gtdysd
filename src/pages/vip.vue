<template>
  <div class="vip_page">
    <vip-heard :title="'会员中心'" :isback = "false"></vip-heard>
    <div style="height: 0.96rem">
    </div>
    <main>
      <div class="_main">
        <div @click="go('/vip/grade')">
          <img src="/static/img/vip2/icon_grade@2x.png">
          <span>我的等级</span>
        </div>
        <div @click="go('/vip/Signin')">
          <img src="/static/img/vip2/icon_sign@2x.png">
          <span>我的签到</span>
        </div>
        <div @click="go('/vip/camp')">
          <img src="/static/img/vip2/icon_camp@2x.png">
          <span>我的阵营</span>
        </div>
        <div @click="go('/vip/gift')">
          <img src="/static/img/vip2/icon_gift@2x.png">
          <span>我的礼物</span>
        </div>
        <div @click="go('/vip/integral')">
          <img src="/static/img/vip2/icon_score@2x.png">
          <span>我的积分</span>
        </div>
        <div @click="go('/vip/treasureBox')">
          <img src="/static/img/vip2/icon_treasureBox@2x.png">
          <span>我的宝盒</span>
        </div>
        <div>
          <img src="/static/img/vip2/icon_expect@2x.png">
          <span>尽请期待</span>
        </div>
      </div>
      
    </main>
  </div>
</template>

<script>
import vip_heard from './../components/vipheader'
export default {
  data (){
    return {
    }
  },
  created(){
    this.$store.commit('selechange',1)
    this.$store.commit('_change',{
      _topshow: false,
      _bottshow: true,
    })
  },
  methods: {
    go(path){
      this.$router.push(path)
    }
  },
  components: {
    vipHeard: vip_heard
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"> 
  .vip_page{
    background-color: #fff;
    ._main{
      font-size: 0px;
      border-top: 1px solid #dcdcdc;
      >div{
        display: inline-block;
        width: 33.3333%; height: 1.23rem;
        border-right: 1px solid #dcdcdc; 
        border-bottom: 1px solid #dcdcdc; 
        background-color: #fff;
        text-align: center;
        img{
          width: 45px;
          margin-top: 28px;
        }
        span{
          margin-top: 5px;
          font-size: 14px;
          color: #333;
          display: block;
        }
      }
   }
  }
</style>
