<template>
  <div class="mail_page">
    <mt-navbar v-model="selected">
      <mt-tab-item id="1"><img src="/static/img/1@2x.png">正在进行</mt-tab-item>
      <mt-tab-item id="2"><img src="/static/img/2@2x.png">即将开始</mt-tab-item>
      <mt-tab-item id="3"><img src="/static/img/3@2x.png">已经结束</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <div class="active">
          <img src="/static/img/banneraaa.jpg" alt="">
          <div>
            <p>玩转世界杯 百万豪礼享不停</p>
            <p>活动时间：2018-06-17 - 2018-07-15</p>
            <p>游戏玩家的狂欢夜</p>
            <div class="border" style="position: relative;margin-top: 0.1rem;"></div>
            <mt-cell title="点击查看详情" to="/active_1" is-link ></mt-cell>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
       <div class="active">
          <img src="/static/img/img_activity@2x.png" alt="">
          <div>
            <p>最强王者助力团</p>
            <p>活动时间：2018年3月29日-2018年4月8日</p>
            <p><i>邀请好友评论 领王者荣耀1688点券任意皮肤</i></p>
            <div class="actover">已结束</div>
            
          </div>
        </div>
        <div class="active">
          <img src="/static/img/img_activity2@2x.png" alt="">
          <div>
            <p>王者荣耀 互动交友平台来袭</p>
            <p>活动时间：2018年3月16日-2018年3月26日</p>
            <p>开启冒险 领王者荣耀30点券</p>
            <div class="actover">已结束</div>
            
          </div>
        </div>
        <div class="active">
          <img src="http://gtdysd.com/static/img/Active/mxj.jpg" alt="">
          <div>
            <p>冒险家召集令</p>
            <p>活动时间：2018年1月22日-2018年2月28日</p>
            <p>新的冒险征途 从百万现金奖励开始！</p>
            <div class="actover">已结束</div>
            
          </div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
export default {
  data (){
    return {
     selected: '1'
    }
  },
  created(){
    this.$store.commit('_change',{
      _title  : '我的活动',
      _topshow: true,
      _bottshow: true,
    })

    this.$store.commit('selechange',2)
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
  .mail_page{
    .mint-tab-item-label{
      font-size: 14px;
      >img{
        display: inline-block;
        width: 19px;height: 19px;
        margin-right: 7px;
        vertical-align: -25%;
      }
    }
    .mint-tab-container{
      padding: 0.15rem;
      padding-top: 0;
      .mint-tab-container-item{
        padding: 0;
      }
    }
    .mint-navbar{
      position: relative;
    }
    .mint-navbar .mint-tab-item.is-selected:after{
      position: absolute;
      content: '';
      width: 0.54rem;left: 0.48rem;
      bottom: 0px;
      background: #e65400;
      border-radius: 0.02rem;
      }
    .active{
      padding: 0.16rem 0.16rem 0.08rem 0.16rem;
      width: 100%;margin-top: 0.2rem;
      background-color: #fff;
      border-radius: 6px;
      box-shadow: 0px 2px 10px 0px rgba(255, 93, 0, 0.2);
      >img{
        width: 100%;
      }
      >div{
        text-align: left;
        color: #000;line-height: 25px;
        >p:first-child{
          margin-top: 0.1rem;
        }
      }
      .mint-cell-wrapper{
        padding: 0 0.15rem 0 0;
        .mint-cell-title{
          span{
            margin: 0;
          }
        }
        .mint-cell-allow-right::after{
          right: 5px;
        }
      }
      .actover{
        width: 100%;height: 0.44rem;
        background-color: #dcdcdc;
        margin-bottom: 0.1rem;margin-top: 0.2rem;
        color: #333;text-align: center;
        font-size: 15px;line-height: 0.44rem;
      }
    }
  }
</style>
