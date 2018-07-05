<template>
  <div class="grade_page">
    <vip-heard :title="'我的等级'"  :isback = "true"></vip-heard>
    <div style="height: 0.5rem"></div>
    <main>
      <div class="_tit">当前等级特权</div>
      <div class="gradevip clearfix" v-if="usermsg" style="min-height: 1.08rem;">
        <div v-for="item in usermsg.thisp">
          <img :src="item.img">
          <span>{{item.title}}</span>
        </div>
      </div>
      <div v-else style="min-height: 1.17rem;" class="imgcenter">
        <!-- <img src="/static/img/vip/jiazai.gif" style="width: 2.5rem;"> -->
      </div>
      <div class="_tit">下一等级特权</div>
      <div class="gradevip clearfix" v-if="usermsg">
        <div v-for="item in usermsg.nextp" style="float: left;">
          <img :src="item.img">
          <span>{{item.title}}</span>
        </div>
       
      </div>
      <div class="_tit">如何快速升级？</div>
      <div class="gradevip clearfix">
        <div>
          <img src="/static/img/vip/icon_sign@2x.png">
          <span>签到</span>
        </div>
        <div>
          <img src="/static/img/vip/icon_post_@2x.png">
          <span>发帖</span>
        </div>
        <div>
          <img src="/static/img/vip/icon_commen@2x.png">
          <span>评论</span>
        </div>
        <div>
          <img src="/static/img/vip/icon_treasureBox@2x.png">
          <span>宝箱</span>
        </div>
        <div>
          <img src="/static/img/vip/icon_activity@2x.png">
          <span>活动</span>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import vip_heard from '../../components/vipheader'
export default {
  data (){
    return {
     usermsg: null
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
    this.$axios.post('/',{method:'member.index.userLevel'}).then( (res) => {
        if(res.data.status == 0){
          this.usermsg = res.data.data
  
        }
      })
  },
  components: {
    vipHeard: vip_heard
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"> 
  .grade_page{
    background-color: #fff;
   >main{
    padding-top: 0.16rem;
    padding: 15px;
    padding-top: 0;
    margin-bottom: 30px;
    .gradevip{
      font-size: 0;
      border-left: 1px solid #ececec; 
      >div{
        display:block; float: left;
        width: 33.33%;height: 1.08rem;
        border: 1px solid #ececec;  
        border-left: 0;
        background-color: #fff;
        text-align: center;
        padding-top: 20px;
        img{
          width: 44px;
        }
        span{
          display: block;
         
          height: 19px;
          margin-top: 4px;
          font-size: 14px;
          color: #333;
        }
      }
    }
   }
  }
</style>
