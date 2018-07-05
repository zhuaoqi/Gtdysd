<template>
  <div class="earnPoints_page">
    <vip-pahead :title="'赚积分'"></vip-pahead>
    <div class="main">
      <ul>
        <li style="margin-top: 0">
          <div>
            <img src="/static/img/vip2/icon_Signin@2x.png">
            <div>
              <p>签到</p>
              <span>每日可以赚积分上限20</span>
            </div>
          </div>
          <div class="marry"><span></span> +20</div>
        </li>
        <li>
          <div>
            <img src="/static/img/vip2/integral_icon_post@2x.png">
            <div>
              <p>发帖</p>
              <span>每日可以赚积分上限50</span>
            </div>
          </div>
          <div class="marry"><span></span> +5</div>
        </li>
        <li>
          <div>
            <img src="/static/img/vip2/integral_icon_comment@2x.png">
            <div>
              <p>评论</p>
              <span>每日可以赚积分上限120</span>
            </div>
          </div>
          <div class="marry"><span></span> +3</div>
        </li>
        <li>
          <div>
            <img src="/static/img/vip2/integral_icon_fabulous@2x.png">
            <div>
              <p>点赞</p>
              <span>每日可以赚积分上限40</span>
            </div>
          </div>
          <div class="marry"><span></span> +2</div>
        </li>
        <li>
          <div>
            <img src="/static/img/vip2/integral_icon_activity@2x.png">
            <div>
              <p>活动</p>
              <span>上限/</span>
            </div>
          </div>
          <div class="marry" style="font-size: 15px;"><span></span> 非固定</div>
        </li>
        <li>
          <div>
            <img src="/static/img/vip2/integral_icon_fill@2x.png">
            <div>
              <p>邀请注册<span>(尽请期待)</span></p>
              <span>无上限</span>
            </div>
          </div>
          <div class="marry"><span></span> +100</div>
        </li>
        <li>
          <div>
            <img src="/static/img/vip2/icon_Signin@2x.png">
            <div>
              <p>信息填充<span>(尽请期待)</span></p>
              <span>一次性</span>
            </div>
          </div>
          <div class="marry"><span></span> +100</div>
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
  .earnPoints_page{
    padding-top: 44px;
    .main{
      padding: 0 0.15rem;
      padding-top: 0.2rem;
      >ul{
        li{
          width: 100%;height: 0.77rem;margin-top: 8px;
          display: flex;justify-content: space-between;
          align-items:center;padding: 0 0.15rem 0 0.07rem;
          background-color: #fff;
          >div:first-child{
            display: flex;
            flex-direction: row;
            img{
              width: 0.45rem;height: 0.45rem;margin-right: 0.1rem;
            }
            p{
              font-size: 15px; color: #333;font-weight: bold;margin-top: 0.02rem;
              >span{
              margin-left: 5px;
            }
            }
            span{
              display: inline-block;
              font-size: 12px; color: #909090;margin-top: 0.07rem;
            }
          }
          .marry{
            display: flex;align-items:center;
            font-size: 17px;color: #ffd000;
            >span{
              display: inline-block;margin-right: 5px;
              width: 0.25rem;height: 0.25rem;
              background-image:url('/static/img/vip2/icon_score@2x.png');
              background-size: 100%;
            }
          }
        }
      }
    }
  }
</style>
