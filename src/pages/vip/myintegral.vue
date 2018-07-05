<template>
	<div class="myinteg_page">
    <div class="myinteg_header">
      <h1>我的积分
        <div class="back" @click="goBack"></div>
      </h1>
      <div class="user_">
        <div>
          <span>{{integral}}</span>
          <p>当前积分</p>
        </div>
      </div>
      <div class="rule" @click="$router.push('/vip/earnPoints')">
        +赚积分
      </div>
      <p class="Record" @click="$router.push('/vip/bilityrecord')">积分兑换记录</p>
    </div>
    <main>
      <div class="reward ">
        <div class="_tit">
          <span>奖励说明</span>
          <div>
            <span></span>
            <p @click="nexPage">换一批</p>
          </div>
        </div>
        <div style="position: relative;" class="border"></div>
        <div class="rewardList" :class="isanima? 'isanima': ''">
          <div v-for = 'item in exchangeList.befdata'>
            <div>
              <img :src="item.ico">
              <p>{{item.price*10}}积分</p>
              <p>{{item.price}}积分</p>
            </div>
            <p>{{item.title}}</p>
            <button type="button" @click="reward(item.id)">立即兑换</button>
          </div>
        </div>
      </div>
      <div style="margin-top: 13px;background-color: #fff;padding: 0 11px;padding-bottom: 20px;">
        <div class="_tit">积分排行</div>
        <ul class="Rankinglist">
          <li v-for="(item,index) in ranking">
            <span>
              <img v-if="index+1 == 1" src="/static/img/vip/LV_1@2x.png">
              <img v-else-if="index+1 == 2" src="/static/img/vip/LV_2@2x.png">
              <img v-else-if="index+1 == 3" src="/static/img/vip/LV_3@2x.png">
              <template v-else>{{index + 1}}</template>
            </span>
            <span>
              <img :src="item.avatar?item.avatar: '/static/img/morentouxiang --icon.png'">
            </span>
            <span>{{item.nickname}}</span>
            <span><!-- Lv{{item.level}} --></span>
            <span>{{item.score}}</span>
          </li>
        </ul>
      </div>
    </main>
    <!-- 引用模块 -->
   <message-box :islook="isopbox" :data="message" v-on:confirm="confirm"></message-box>
   <exchange  :islook="success" :data="succesSrc"></exchange>
   <div v-show="mask" @touchmove.prevent class="mask"  @click="success && clickEvent()"></div>
  </div>
</template>

<script>
import { Toast,Indicator } from 'mint-ui'

import Exchange from '../../components/Exchange'
import messageBox from '../../components/messageBox'
export default {
	data() {
		return {
      mask: false, //遮罩层
      isopbox: false,
      success: false,
      message :{
        tit: '确定要兑换该权益吗？',
        msg:''
      },
      succesSrc:{
        img:'/static/img/vip/choosebutton_selected@2x.png',
        msg: '恭喜您，兑换成功！'
      },
      integral: 0,
      exchangeList:{
         befpage: 1,
         allpage: 0,
         befdata: [],
         alldata: []
      },
      isanima: false,
      stodata:{
      },
      ranking: []
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
    goBack(){
      this.$router.goBack()
    },
    confirm(data){
      this.isopbox = false
      this.mask = false
      if(data){
        Indicator.open();
        this.$axios.post('/',{method:'member.score.addOrder',shop_id:this.stodata.id}).then( (res) => {
            Indicator.close();
            if(res.data.status == 0){
                this.integral -= res.data.data.price
                this.success = true
                this.mask = true
            }else Toast(res.data.msg)
        })
      }
   },
   reward(id,ral){
      this.stodata={
        id: id,
      }
      this.mask = true
      this.isopbox = true
   },
   clickEvent(){
      this.mask = false
      this.success = false
   },
   nexPage(){
      this.isanima = true
      let data = this.exchangeList
      if(data.befpage == data.allpage){
        data.befpage = 0
      }
      data.befpage = data.befpage+1
      data.befdata = data.alldata.slice((data.befpage-1)*4,data.befpage*4)
      setTimeout(()=>{
        this.isanima = false
      },200)
   }
	},
  mounted(){
      this.$axios.post('/',{method:'member.score.getScore'}).then( (res) => {
          if(res.data.status == 0){
            this.integral = res.data.data
          }
      })
      this.$axios.post('/',{method:'member.score.showGoods'}).then( (res) => {
          if(res.data.status == 0){
            this.exchangeList.alldata = res.data.data
            this.exchangeList.befdata = res.data.data.slice(0,4)
            this.exchangeList.allpage = Math.ceil(res.data.data.length/4) 
          }
      })
      this.$axios.post('/',{method:'member.score.showlist'}).then( (res) => {
          if(res.data.status == 0){
            this.ranking = res.data.data
          }
      })
  },
  components:{
    exchange: Exchange,
    messageBox: messageBox
  }
}
	
</script>
<style lang="scss">
.myinteg_page{
  
  .myinteg_header{
      width:100%;height: 2.31rem;
      background-image: url(/static/img/bg_member@2x.png);
      background-size: 100%;
      background-repeat: no-repeat;
      position: relative;
      >h1{
        height: 44px;text-align: center;
        line-height: 44px;color: #fff;
        font-weight: normal;
        font-size: 18px;
        position: relative;
        .back{
          position: absolute;
          left: 15px; top: 15px;
          width: 20px;height: 20px;
          background-image: url(/static/img/nav_fanhui@3x.png);
          background-repeat: no-repeat;
          background-size: 100%;
        }
     }
     .rule{
       position: absolute;
       width: 80px;height: 34px;
       font-size: 15px;text-align: center;
       right: 0; top: 50px;
       background: rgba(255,255,255,.6);
       border-top-left-radius: 50px;
       border-bottom-left-radius: 50px;
       line-height: 34px;
       color: #fff;
       
    }
  .user_{
     display: flex;
     justify-content: center;
     >div{
      width: 120px;height: 109px;
      background-image: url(/static/img/vip/bg_integral1@2x.png);
      background-size: 100%;margin-top: 0.12rem;
      position: relative;
      text-align: center;
      >span{
        line-height: 100px;color: #ff5f03;
        font-size: 28px;font-weight: bold;
      }
      >p{
        font-size: 12px;
        position: absolute;
        left: 38px;bottom: 9px;
        color: #fff;
      }
     }
    }
    .Record{
      position: absolute;
      right: 14px; bottom: 16px;
      font-size: 11px;color: #333;
    }
  }
 .reward{
  background-color: #fff;
  padding: 0 0.17rem;
  ._tit{
    position: relative;
    display: flex;
    justify-content: space-between;
    >div>span{
      display: inline-block;
      width: 12px;height: 12px;
      background-image: url(/static/img/vip/common_icon_refresh@2x.png);
      background-repeat: no-repeat;
      background-size: 100%;
      vertical-align: -5%;
    }
    >div>p{
      display: inline-block;
      color: #909090;font-size: 11px;
    }
  }
 }
 .rewardList{
    position: relative;
    height: 3.88rem;
    >div{
      position: absolute;
      width: 1.59rem;height: 1.73rem;
      text-align: center;
      border: 1px solid #dcdcdc;
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
      box-shadow: 1px 1px 1px rgba(250,157,34,.1);
      >div{
        height: 0.9rem;
        display:flex;
        justify-content:center;
        align-items:center;
        position: relative;

        >img{
          width: 100%;
        }
        >p:nth-child(2){
          left: 0;bottom: 0.15rem;text-decoration:line-through;
          font-size: 11px;color: #fff;
          width: 0.58rem;height: 0.17rem;
          background-image: url(/static/img/vip/bg_integral@2x.png);
          position: absolute;text-align: center;
          line-height: 0.22rem;
        }
        >p:nth-child(3){
          left: 0;bottom: -0.03rem;
          width: 0.63rem;height: 0.2rem;
          font-size: 11px;color: #fff;
          background-image: url(/static/img/vip/bg_integral_s@2x.png);
          position: absolute;text-align: center;
          line-height: 0.25rem;
        }
      }
      >p{
        line-height: 40px;color: #333;
      }
      >button{
          height: 0.27rem;width: 0.77rem;
          display: block;margin: 0 auto;
          padding: 0 0.13rem;font-size: 11px;
          border-radius: 16px;
          border: 1px solid #ff600a;
          line-height: 0.27rem;
          color: #ec6700;
      }
    }
    >div:nth-child(1){
      left: 0;top: 0.16rem;
    }
    >div:nth-child(2){
      left: 1.8rem;top: 0.16rem;
    }
    >div:nth-child(3){
      left: 0;top: 1.98rem;
    }
    >div:nth-child(4){
      left: 1.8rem;top: 1.98rem;
    }
 }
 .Rankinglist{
  li{
     width: 100%;height: 0.4rem;
     border-radius: 6px;padding: 0 0.1rem;
     display: flex;margin-bottom: 0.14rem;
     align-items: center;
     flex-direction: row;
     box-shadow: 4px 4px 12px -5px rgba(255, 93, 0, 0.2);
     span:nth-child(1){
      width: 0.21rem;text-align: center;
      >img{width: 0.21rem;font-size: 18px;}
     }
     span:nth-child(2){
      >img{width: 0.32rem;margin-left: 0.15rem;}
     }
     span:nth-child(3){
      width: 1.03rem;margin-left: 0.15rem;font-size: 12px;
      
     }
     span:nth-child(4){
      width: 1.06rem;font-size: 10px;
      color: #e65400;font-style: italic;
     }
     span:nth-child(5){
      font-size: 12px;color: #333;
     }
   }
 }
}


</style>