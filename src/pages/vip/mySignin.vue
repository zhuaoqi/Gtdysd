<template>
	<div class="sigain_page">
    <div class="sigin_header">
      <h1>我的签到
        <div class="back" @click="goBack"></div>
      </h1>
      <div class="user_" v-if="user_info">
        <span :style="{'background-image': 'url('+user_info.avatar+')'}">
          <img :src="user_info.headframe.img">
        </span>
        <span class="user_mas"> 
          <p>{{user_info.nickname}}<span class="lv_">LV {{user_info.level}}</span></p>
        </span>
      </div>
      <div class="Signin">
        <h5>{{new Date().toLocaleDateString()}}</h5>
        <div class="_Signin">
          <span>
            <img @click="prevPage" v-show="Signin_le != 0" src="/static/img/vip/common_icon_more_s@2xl.png">
          </span>
          <div>
            <div class="_date clearfix" :style="{'transform': 'translateX(-'+ Signin_le +'rem)'}">
              <span v-for="item in Datelist" :class="item.issign == 1 ? 'isSignin' : 'noSignin'">{{item.date.split('.')[1]}}</span>
            </div>
          </div>
          <span>
            <img @click="nexPage" v-show="Signin_le < 12" src="/static/img/vip/common_icon_more@2x.png">
          </span>
        </div>
        <p class="tip">*你已累计签到{{daraor.num}}天 <template v-if="daraor.num<24">在签到{{daraor.tedata()}}便可获得抽取宝箱的机会</template><template v-else>本月已获得全部宝箱</template></p>
        <div class="sihin_butt">
          <p v-if="islgin" style="background-color:#ff640a;" @click="Signin">签到</p>
          <p v-else style='background-color:#dddddd' >已签到</p>
          <p @click="Supplement">补签</p>
        </div>
      </div>
      <div class="rule" @click="rule_b = true; mask = true">
        <span></span>&nbsp;签到规则
      </div>
    </div>
    <div style="height: 1.65rem"></div>
    <main>
      <div class="reward">
        <div class="_tit">奖励说明</div>
        <div class="box border_t">
          <div class="box1">
            <div>
              <p>累计签到3天</p>
              <img :src="daraor.num>=3?'/static/img/vip/img_woodenbox_s@2x.png':'/static/img/vip/img_woodenbox@2x.png'">
              <p>木质宝箱</p>
            </div>
            <div>
              <p>累计签到10天</p>
              <img :src="daraor.num>=10?'/static/img/vip/img_whitegoldbox_s@2x.png':'/static/img/vip/img_whitegoldbox@2x.png'">
              <p>白银宝箱</p>
            </div>
          </div>
          <div class="box2">
            <div>
              <p>累计签到17天</p>
              <img :src="daraor.num>=17?'/static/img/vip/diamonds_box_s@2x.png':'/static/img/vip/diamonds_box@2x.png'">
              <p>钻石宝箱</p>
            </div>
            <div>
              <p>累计签到24天</p>
              <img :src="daraor.num>=24?'/static/img/vip/king_box_s@2x.png':'/static/img/vip/king_box@2x.png'">
              <p>王者宝箱</p>
            </div>
          </div>
        </div>
      </div>
    </main>
    <!-- 引用模块 -->
    <div class="rule_box" v-show="rule_b" :class="rule_b? 'feoss': ''"  @touchmove.prevent>
      <div>签到规则
        <span @click="rule_b = false;mask = false "></span>
      </div>
      <div class="rule_b">
        <p>1. 会员用户每日可签到一次, 每次签到将获得10积分、3点经验。</p>
        <p>2. 连续签到将会获得海量福利。</p>
        <p>3. 会员3级将会获得补签功能，可以自行选择要补签的日期。</p>
      </div>
    </div>
    <!-- 打开宝盒 -->
    <open-box :islook="isopbox" :data="boxtype" v-on:isclose =" mask = false; isopbox = false"></open-box>
    <!-- 签到补签 -->
    <type-img :islook="isclose" v-on:isclose="close" :data="maskObj"></type-img>
    <div v-show="mask" @touchmove.prevent class="mask"></div>
  </div>
</template>

<script>
import { Toast,Indicator } from 'mint-ui'
import fromTyet_img from '../../components/frameType_img'
import openBox from '../../components/openBox'
export default {
	data() {
		return {
      isclose: false,
			Signin_le: 0,
      rule_b: false,//签到规则
      islgin: true,//签到
      mask: false, //遮罩层
      isopbox: false,
      maskObj :{
        type: 'Signin',
        src:'/static/img/vip/signin_success@2x.png',
        data:{
          fen:'',
          exp: ''
        }
      },
      Datelist: '',
      daraor: {
        num:0,
        tedata: ()=>{}
      },
      user_info: null,
      boxtype:{
        type: '',
        tit: ''
      }
		}
	},
  created(){
    this.$store.commit('selechange',4)
    this.$store.commit('_change',{
      _topshow: false,
      _bottshow: true,
    })
    this.$axios.post('/',{method:'member.index.userinfo'}).then( (res) => {
      this.user_info = res.data.data.user_info
    })
    
  },
	methods: {
    goBack(){
      this.$router.goBack()
    },
    nexPage(){
      this.Signin_le+= 3.08
    },
    prevPage(){
      this.Signin_le-= 3.08
    },
    Signin(){ // 签到
      Indicator.open();
      this.$axios.post('/',{method:'member.sign.signin',date:'',retroactive: 0, is_active: 0}).then( (res) => {
        Indicator.close();
        if(res.data.status == 0){
          this.maskObj.data.fen = res.data.data.score
          this.maskObj.data.exp = res.data.data.epx
          this.isclose = true
          this.mask = true
          this.islgin = false
          this.daraor.num = res.data.data.signday
          this.Datelist[new Date().getDate()-1].issign = 1
        }else Toast(res.data.msg)
      })
    },
    Supplement(){
      this.$router.push('/vip/Supplement')
    },
    close(v){
      this.isclose = v
      this.mask = false
      let logdata = Number(this.daraor.num)
      if(logdata == 3){
        this.boxtype = {
          type: 0,
          tit: '木质宝箱'
        }
        this.isopbox = true
        this.mask = true
      }else if(logdata == 10){
        this.boxtype = {
          type: 1,
          tit: '白银宝箱'
        }
        this.isopbox = true
        this.mask = true
      }else if(logdata == 17){
        this.boxtype = {
          type: 2,
          tit: '钻石宝箱'
        }
        this.isopbox = true
        this.mask = true
      }else if(logdata == 24){
        this.boxtype = {
          type: 3,
          tit: '王者宝箱'
        }
        this.isopbox = true
        this.mask = true
      }
      
    }
	},
  mounted(){
      this.$axios.post('/',{method:'member.sign.signlist'}).then( (res) => {
        let datel = res.data.data.list
        this.Datelist = datel;
        for(let i in datel) {
          if(datel[i].istoday){
            this.Signin_le = 3.08 * (parseInt((Number(i)+1)/7))
            if(datel[i].issign == 1){
              this.islgin = false
            }
          }
        }
        this.daraor = {
          num: res.data.data.num,
          tedata: ()=>{
            if(this.daraor.num<3){
              return 3 - this.daraor.num
            }else if(this.daraor.num<10){
              return 10 - this.daraor.num
            }else if(this.daraor.num<17){
              return 17 - this.daraor.num
            }else if(this.daraor.num<24){
              return 24 - this.daraor.num
            }
          }
        }
      })
  },
  components:{
    typeImg: fromTyet_img,
    openBox: openBox
  }
}
	
</script>
<style lang="scss">
.sigain_page{
    background-color: #fff;
  .sigin_header{
      width:100%;height: 2.73rem;
      background-image: url(/static/img/bg_member2@2x.png);
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
       right: 15px; top: 50px;
       color: #fff;font-size: 11px;
       span{
          display: inline-block;
          width: 12px; height: 12px;
          background-image: url(/static/img/vip/common_icon_explain@2x.png);
          background-size: 100%;
          vertical-align: -20%;
       }
    }
  .user_{
        color: #fff;width: 100%;
        text-align: center;
        >span{
          display: block;
        }
        >span:first-child{
          width: 120px;height:120px;
          margin: 0 auto;
          background-size: 55px;
          background-repeat: no-repeat;
          background-position: 33px 33px;
          position: relative;
          img{
           width: 100%;
          }
        }
        .user_mas{
          .lv_{
            vertical-align: 0%;
            display: inline-block;
            font-size: 10px;height: 14px;
            line-height: 17px;
            margin-left: 10px;
            background-color: #ff8ac9;
            border-radius: 3px;
            padding:0 3px;
          }
        }
    }
  .Signin{
        position: absolute;
        left: 0.14rem;bottom: -1.55rem;
        width: 3.5rem;border-radius: 13px;
        padding: 17px 7px 32px 7px;
        font-size: 12px;
        background-color: #fff;
        box-shadow: 0px 6px 20px -5px rgba(255,93,0,.2);
        h5{
          text-align: center;
        }
        ._Signin{
          margin-top: 22px;
          display: -webkit-box;
          box-pack: justify;
          -webkit-box-pack: justify;
          >div{
            width: 3.08rem;
            overflow: hidden;
          }
          ._date{
            width: 13.7rem;
            transition: transform 0.5s;
            >span{
              display: block;float: left;
              margin: 0 0.05rem;
              width: 0.34rem;height: 0.4rem;
              line-height: 0.4rem;
              text-align: center;color: #fff;
              font-size: 15px;
              background-size: 100%;
            }
            .isSignin{
              background-image: url(/static/img/vip/bg_signin_selected@2x.png);
            }
            .noSignin{
              background-image: url(/static/img/vip/bg_signin_normal@2x.png);
            }
          }
          >span{
            display: block;width: 0.12rem;
            img{
              width: 100%;margin-top: 10px;
            }
          }
        }
        .tip{
          text-align: center;
          color: #909090; font-size: 9px;
          margin: 0.27rem 0;
        }
        .sihin_butt{
          width: 2.8rem; margin: 0 auto;
          display: -webkit-box;
          box-pack: justify;
          -webkit-box-pack: justify;
          p{
            width: 1.2rem;height: 0.33rem;
            line-height: 0.33rem;
            border-radius: 16px;font-size: 15px;
            text-align: center;
            color: #fff;
          }
          p:last-child{
            border: 1px solid #ff640a;
            color: #ff640a;
          }
        }
    }
  }
  .reward{
    padding: 0 0.15rem;
    .box{
      padding:0.2rem 0.12rem 0 0.12rem;
      position: relative;
      >div{
        display: -webkit-box;
        box-pack: justify;
        -webkit-box-pack: justify;
        >div{
          width: 1.43rem;height: 1.6rem;
          padding: 0.16rem 0;
          border-radius: 6px;
          text-align: center;
          >img{
            width: 50%;
            margin-top:0.15rem;
          }
          >p{
            color: #fff;
            font-size: 14px;
          }
          p:last-child{
            margin-top: 0.12rem;
          }
        }
      }
      .box1{
        div:first-child{
          background-color:#faa1a6;
        }
        div:last-child{
          background-color:#9fb3ff;
        }
      }
      .box2{
        margin-top:0.2rem;
        div:first-child{
          background-color:#cca5e3;
        }
        div:last-child{
          background-color:#fea169;
        }
      }
    }
  }
  .rule_box{
    position: fixed;
    top: 18%;left: 0.2rem;
    width: 3.3rem;z-index: 101;
    padding: 0.2rem 0;
    line-height: 45px;
    text-align: center;
    
    >div:first-child{
      width: 100%;height: 0.69rem;
      color: #fff;font-size: 15px;
      transform: translateY(40px);
      background-image: url(/static/img/vip/bg_decorate@2x.png);
      background-size: 100%;
      position: relative;
      span{
        display: inline-block;
        position: absolute;
        right: 0.23rem;top:0.3rem;
        width: 20px; height: 20px;
        background-image: url(/static/img/vip/common_icon_close@2x.png);
        background-size: 100%;
      }
    }
    .rule_b{
      width: 2.8rem;margin: 0 auto;
      border-radius: 6px;
      padding: 0.6rem 0.13rem 0.65rem;
      background-color: #fff;
      text-align: left;
      p{
        line-height: 26px;
      }
    }
  }
}
</style>