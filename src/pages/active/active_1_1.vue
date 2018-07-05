<template>
  <div class="active1_1_page">
    <div class="div_cen_1">
       <div class="goindex" @click="$router.goBack() || $router.push('/active_1')"></div>
      <p v-if="!usermsg">勇者大人你好， 请<span @click="$router.push('/logo?redirect=%2Factive_1%2Factive_1')">【登录】</span></p>
      <p v-else>欢迎您* {{usermsg.nickname}},&nbsp;<span @click="quit">【退出登录】</span></p>
    </div>
    <div class="div_cen_2">
    </div>
    <div class="div_cen_3">
      <div class="prtext">
        <p><span>1</span>当天的比赛需提前一天进行竞猜，每日23.59刷新次日赛程。</p>
        <p><span>2</span>每猜对一次即可获得一次“竞猜抽奖”的抽奖机会。</p>
        <p><span>3</span>抽奖机会可进行累计，每一阶段抽奖机会清零。</p>
      </div>
      <div class="box_ra">
        <div v-for="i in guesslist">
          <img class="img_left" :src="i.gid1info.img+'?x-oss-process=image/resize,m_fill,h_54,w_54'">
          <img class="img_right" :src="i.gid2info.img+'?x-oss-process=image/resize,m_fill,h_54,w_54'">
          <div class="img_top">
            <span>{{i.startdata.split(' ')[0]}}</span>
            <span>{{i.startdata.split(' ')[1]}}</span>
          </div>
          <div class="img_bot">
            <span @click="guesslistli(i.id,i.gid1)" :style="{'background-image': i.guess.gid==i.gid1?'url(/static/img/active/active1_2/sheng1.png)':'url(/static/img/active/active1_2/sheng.png)'}"></span> 
            <span @click="guesslistli(i.id,-1)" :style="{'background-image': i.guess.gid == -1?'url(/static/img/active/active1_2/ping.png)':'url(/static/img/active/active1_2/pingk.png)'}"></span> 
            <span @click="guesslistli(i.id,i.gid2)" :style="{'background-image': i.guess.gid==i.gid2?'url(/static/img/active/active1_2/sheng1.png':'url(/static/img/active/active1_2/sheng.png)'}"></span> 
          </div>
          <div class="couteb">
            <p>{{i.gid1info.title}}</p>
            <p style="font-size: 16px;font-weight: blod;">VS</p>
            <p>{{i.gid2info.title}}</p>
          </div>
        </div>
        <img style="margin-top:0.95rem" v-if="!guesslist[1]" src="/static/img/active/active1_2//weikais@2x.png">
        <img v-if="!guesslist[2]" src="/static/img/active/active1_2/weikais@2x.png">
        <img v-if="!guesslist[3]" src="/static/img/active/active1_2/weikais@2x.png">
      </div>
      <div class="div_cen_4">
      <div class="div_4box" :class="rotate? 'rotate':''">
        <ul :style="{'transform':'rotateX(-'+edg.one+'deg)'}">
          <li v-for="(i,index) in img"  :style="{'transform': 'rotateX('+(index+1)*60+'deg) translateZ('+110+'px)'}">
            <img :src="i">
          </li>
        </ul>
        <ul :style="{'transform':'rotateX(-'+edg.two+'deg)'}">
          <li v-for="(i,index) in img"  :style="{'transform': 'rotateX('+(index+1)*60+'deg) translateZ('+110+'px)'}">
            <img :src="i">
          </li>
        </ul>
        <ul :style="{'transform':'rotateX(-'+edg.tree+'deg)'}">
          <li v-for="(i,index) in img"  :style="{'transform': 'rotateX('+(index+1)*60+'deg) translateZ('+110+'px)'}">
            <img :src="i">
          </li>
        </ul>
      </div>
      <div class="_4num">
        <img src="/static/img/active/active1_2/qiu.png" ><span style="margin-left: 0.02rem;">0</span>
      </div>
      <div class="butt" @click="tiger"> </div>
      <div class="p_list">
        <div class="prize_list">
            <p>用户名</p>
            <p>联系方式</p>
            <p>奖品</p>
        </div>
        <div class="prize_listbox">
          <div v-for = "i in tigerlist.awardlist">
              <span>{{i.name}}</span>
              <span>{{i.phone}}</span>
              <span>{{i.award}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="div_cen_5">
      <img src="" >
      <img src="/static/img/active/active1_2/ipx.png" >
      <img src="/static/img/active/active1_2/mitv.png" >
      <img src="/static/img/active/active1_2/cloudtable.png" >
      <img src="/static/img/active/active1_2/吉祥物.png" >
      <img src="/static/img/active/active1_2/beer.png" >
      <img src="/static/img/active/active1_2/手环.png" >
      <img src="/static/img/active/active1_2/football.png" >
      <img src="/static/img/active/active1_2/积分.png" >
    </div>
    <div class="div_cen_6">
      <div v-if="tigerlist!=[]" class="div_cen_6d" :class="isanima?'isanima': ''">
        <div>
          <img :src="'/static/img/active/active1_2/'+stagelist.befdata['A'][0].type+'.png'">
        </div>
        <div>
          <div v-for="(i,index) in stagelist.befdata['A']">
            <img :src="i.img">
            <div>
              <p>{{i.title}}</p>
              <img @click="guessing(i.type,i.id,index,1)" :src="i.isselect==0?'/static/img/active/active1_2/btn_support@2x.png':'/static/img/active/active1_2/btn_support_s@2x.png'" >
            </div>
          </div>
        </div>
        <div style="margin-top: 0.42rem;">
          <img :src="'/static/img/active/active1_2/'+stagelist.befdata['B'][0].type+'.png'">
        </div>
        <div>
          <div v-for="(i,index) in stagelist.befdata['B']">
            <img :src="i.img">
            <div>
              <p>{{i.title}}</p>
              <img @click="guessing(i.type,i.id,index,2)" :src="i.isselect==0?'/static/img/active/active1_2/btn_support@2x.png':'/static/img/active/active1_2/btn_support_s@2x.png'" >
            </div>
          </div>
        </div>

      </div>
      <span @click="commit" class="bu"></span>
      <div class="pages">
        <span @click="nextpage(1)">1</span>
        <span @click="nextpage(2)">2</span>
        <span @click="nextpage(3)">3</span>
        <span @click="nextpage(4)">4</span>
      </div>
    </div>
      <div style="color: #fff;text-align: center;width: 100%;position: absolute;bottom: 0.3rem;left: 0;font-size: 12px;background-color:#0377bc;">
        <p>本活动最终解释权归GT电娱时代所有</p>
        <p style="margin-top:0.1rem">©2017 电娱时代 上海动娱网络科技有限公司 <br>沪ICP备15050271号-2</p>
      </div>
    </div>
    
    <exchange  style="position: fixed;" :islook="success" v-on:isclose="close" :tit="succesSrc"></exchange>
    <div style="position: fixed;" v-show="mask" @touchmove.prevent class="mask"></div>
  </div>
</template>

<script>
import activeExchange from '../../components/activeExchange'
import Exchange from '../../components/Exchange'
import messageBox from '../../components/messageBox'
import base64 from 'js-base64';
import { Toast,Indicator } from 'mint-ui'

export default {
  data (){
    return {
      isanima: false,
      usermsg: null,
      stagelist:{
        befdata:{},
        alldata: {},
      },
      guesslist: [],
      tigerlist:[],
      select:[],
      img:[
      '/static/img/active/active1_2/baiweipijiu-0.png',
      '/static/img/active/active1_2/jixiangwu-0.png',
      '/static/img/active/active1_2/shijiebeizuqiu-0.png',
      '/static/img/active/active1_2/shouchiyuntai-0.png',
      '/static/img/active/active1_2/xiaomiTV-0.png',
      '/static/img/active/active1_2/xiaomiSH2-0.png',
      ],
      imgs:['73','69','71','72','68','70'],
     //imgs:['45','41','43','44','40','42'],
      edg:{
        one:0,
        two: 0,
        tree: 0
      },
      pushgr:{},
      end: 0,
      success: false,
      succesSrc:{
      },
      mask: false,
      rotate: true,
      dend: 0
    }
  },
  created(){
    this.$store.commit('_change',{
      _topshow: false,
      _bottshow: false,
    })
    if(localStorage.getItem("is_login")){
        this.usermsg =  JSON.parse(localStorage.getItem('user_info'));
    }
  },
  mounted(){
    this.$axios.post('/',{method:'action.guess.stagelist'}).then( (res) => {
      if(res.data.status == 0){
        let data =res.data.data.data
        let newad = {}
        Object.keys(data).forEach(function(key){
           if(!newad[key]){
            newad[key] = {}
          }
           let arr ={}
            data[key].forEach((item,index)=>{arr[index] = item})
            newad[key] = arr
        });
      
      this.stagelist.alldata = newad
        this.stagelist.befdata['A'] = this.stagelist.alldata['A']
        this.stagelist.befdata['B'] = this.stagelist.alldata['B']
      }
    })
   this.tetguee()
   this.$axios.post('/',{method:'worldcup.lottery.tigerlist'}).then( (res) => {
      if(res.data.status == 0){
       this.tigerlist = res.data.data
      }
    })
   this.$axios.post('/',{method:'worldcup.lottery.tigercount'}).then( (res) => {//可抽奖记数
      if(res.data.status == 0){
       this.dend = res.data.data
      }
    })
  },
  methods: {
   quit(){
      this.$axios.post('/',{method:'usercenter.login.logout'}).then( (res) => {
        if(res.data.status == 0){
          this.deg = 0;
          location.reload()
          localStorage.clear();
          Toast('退出账号成功')
        }else Toast(res.data.msg)
      })
    },
    commit(){
      let data = this.stagelist.alldata
      let end = 0
      let ddddd = {}
      Object.keys(data).forEach(function(key){
           Object.keys(data[key]).forEach(function(ddd){
            if(data[key][ddd].isselect){
              if(ddddd[key]){
                 ddddd[key]= ddddd[key]+','+data[key][ddd].id
              }else ddddd[key] = data[key][ddd].id
            }
               if(data[key][ddd].isselect == true){
                end++
               }
          })
      })
      if(end < 16){
        Toast('请选择16支球队')
        return
      }
      this.$axios.post('/',{method:'action.guess.addstage',gids: Base64.encode(JSON.stringify(ddddd))}).then( (res) => {
        if(res.data.status == 0){
          Toast('提交成功')
        }else Toast(res.data.msg)
      })
    },
    guesslistli(id ,gid){
      this.$axios.post('/',{method:'action.guess.addguess',cid:id,gid:gid}).then( (res) => {
        if(res.data.status == 0){
          Toast('竞猜成功')
          this.tetguee()
        }else Toast(res.data.msg)
      })
    },
    close(){
      this.success = false
      this.mask = false
    },
    nextpage(num){
      this.isanima = true
      setTimeout(()=>{
        this.isanima = false
      },200)
      switch (num){
        case 1:
        this.stagelist.befdata["A"]=this.stagelist.alldata['A']
        this.stagelist.befdata["B"]=this.stagelist.alldata['B']
        
        break;
        case 2:
          this.stagelist.befdata["A"]=this.stagelist.alldata['C']
          this.stagelist.befdata["B"]=this.stagelist.alldata['D']
        
        break;
        case 3:
          this.stagelist.befdata["A"]=this.stagelist.alldata['E']
        this.stagelist.befdata["B"]=this.stagelist.alldata['F']
      
        break;
        case 4:
          this.stagelist.befdata["A"]=this.stagelist.alldata['G']
        this.stagelist.befdata["B"]=this.stagelist.alldata['H']
        break;
      }
    },
    guessing(type,id,index,num){
      let and = 0
      if(this.stagelist.alldata[type][index].isselect == 1){
        this.stagelist.alldata[type][index].isselec = true
      }
      for(let i in this.stagelist.alldata[type]){
        if(this.stagelist.alldata[type][i].isselect == true || this.stagelist.alldata[type][i].isselect == 1){
          and+= 1
        }
      }
      if (false == this.stagelist.alldata[type][index].isselect ||  0 == this.stagelist.alldata[type][index].isselect || undefined == this.stagelist.alldata[type][index].isselect) {
        if(and >= 2){
          Toast('最多选择两支')
          return
        }
      }
      this.stagelist.alldata[type][index].isselect =  !this.stagelist.alldata[type][index].isselect
    },
    tetguee(){
      this.$axios.post('/',{method:'action.guess.guesslist',type: '1'}).then( (res) => {
        if(res.data.status == 0){
          console.log(res)
         //this.guesslist = res.data.data
        }
      })
    },
    tiger(){
      Toast('活动已结束~')
      // this.rotate = false
      // this.edg.one = 0
      // this.edg.two = 0
      // this.edg.tree =0
      //  Indicator.open();
      //  this.$axios.post('/',{method:'worldcup.lottery.tiger',is_double: '0'}).then( (res) => {
      //   Indicator.close();
      //   this.rotate = true
      //   if(res.data.status == 0){
      //     this.dend--
      //     let int = this.imgs.indexOf(res.data.data.key);
      //     if(int < 0){
      //      this.edg.one = 720 + 60*Math.ceil(Math.random()*5) 
      //      this.edg.two = 1080 
      //      this.edg.tree =1440 + 60*Math.ceil(Math.random()*5) 
      //     }else{
      //         this.edg.one = 360 + 60*int
      //         this.edg.two = 720 + 60*int
      //         this.edg.tree =1080 + 60*int
      //     }
      //     setTimeout(()=>{
      //       this.succesSrc = res.data.data.name
      //       this.success = true
      //       this.mask = true
      //     }, 4200)
      //   }else Toast(res.data.msg)
      // })
    }
  },
  components: {
    exchange: activeExchange,
    messageBox: messageBox
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"> 
  .active1_1_page{
    .div_cen_1{
      width: 100%;height: 4.05rem;position: relative;
      background-image: url(/static/img/active/active1_2/page1.png);
      background-repeat: no-repeat;
      background-size: 100%;
      .goindex{
        position: absolute;
        top: 0.3rem;left:0.2rem;
        width: 1.03rem;height:0.33rem;
        background-image: url('/static/img/active/active1_2/btn_fanhui@2x.png');
        background-size: 100%;background-repeat: no-repeat;
      }
      >p{
        display: block;width: 100%;
        position: absolute;text-align: center;
        left: 0;bottom: 1.2rem;color: #fff;font-size: 14px;
        padding: 0 10px;
      }
    }
    .div_cen_2{
      width: 100%;height: 3.16rem;position: relative;
      background-image: url(/static/img/active/active1_2/page2.png);
      background-repeat: no-repeat;
      background-size: 100%;

    }
    .div_cen_3{
      width: 100%;height: 31.27rem;position: relative;
      background-image: url(/static/img/active/active1_2/1_02.png);
      background-repeat: no-repeat;
      background-size: 100%;
      .prtext{
         position: absolute; left: 0.15rem;top: 0.02rem;
         color: #fff;font-size: 11px;border: 1px dashed #ddd;
         width: 3.45rem;padding: 0.15rem;border-radius: 12px;
         >p{
          display: flex;line-height: 25px;
          align-items:center;
          span{
            display: inline-block;color: #0377bc;
            margin-right: 20px;
            width: 0.13rem;height: 0.13rem;border-radius: 50%;
            background-color: #fff;font-size: 9px;
            text-align: center;line-height: 0.16rem;
          }
         }
      }
      .box_ra{
         position: absolute; left: 0.15rem;top: 1.52rem;
         color: #fff;width: 3.45rem;
         >img{
          width: 3.525rem; margin-top:0.5rem;
         }
         >div{
          width: 100%;height: 0.32rem;
          background-color: #fff;
          margin-top: 1.1rem;
          position: relative;
          .couteb{
            padding: 0 0.64rem;border-radius: 12px;
            color: #000;font-size: 16px;font-weight: bold;
            line-height: 0.32rem;
            display: flex;justify-content: space-between;
          }
          .img_left{
            width: 0.54rem;border-radius: 50%;
            position: absolute;left:-8px;bottom: -8px;
          }
          .img_right{border-radius: 50%;
            position: absolute;right: -8px;bottom: -8px;
          }
          .img_top{
            width: 1.46rem;height: 0.2rem;
            background-color: #66bc41;border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            position: absolute;left:0.92rem;top: -0.2rem;
            padding:0 0.25rem;line-height: 0.2rem;
            display: flex;justify-content: space-between;
          }
          .img_bot{
            width: 2.35rem;
            position: absolute;left:0.53rem;bottom: -0.44rem;
            display: flex;justify-content: space-between;
            >span{
              display: block;height:0.44rem;width: 0.4rem;
              background-repeat: no-repeat;background-size: 100%;
            }
          }

         }
         >div:first-child{
            margin-top: 0.4rem;
          }
       }
    }

    .div_cen_4{
      position: absolute;left: 0;
      top: 15.13rem;
      width: 100%;height: 2.21rem;
      .p_list{
        width: 3.08rem;
        position: absolute; left: 0.2rem;bottom: 0.16rem;
        box-shadow: inset 0px -41px 45px -20px rgba(0,0,0,.3); 
        padding:0.1rem;padding-bottom: 0.1rem;
         .prize_list{
            width: 100%;text-align:center ;color: #fff;
            font-size: 11px; height: 0.25rem;font-weight: normal;
            p{
              display: inline-block;
              width: 30%;
          }
        }
        .prize_listbox{
          overflow: auto;height: 0.9rem;
          >div{
            width: 100%;text-align: center;
            font-size: 11px;color: #fff;
            line-height: 25px;
            >span{
              display: inline-block;
              width: 30%;
            }
          }
        }
      }
      ._4num{
         position: absolute; left: 0.25rem;bottom: 1.65rem;
         
         >span{
          position: absolute;font-size: 17px;color: #fff;
          right: 0.26rem;top:0;line-height: 0.28rem;
         }
      }
      .butt{
        position: absolute; right: 0.55rem;bottom: 1.65rem;
         width: 0.92rem;height: 0.31rem;
         background-image: url(/static/img/active/active1_2/立即抽奖.png);
         background-size: 100%;
       }
       .rotate{
          ul:nth-child(1){
            transition: transform 3s cubic-bezier(0,.4,.8,1);
          }
          ul:nth-child(2){
            animation-delay:2s;
            transition: transform 3s cubic-bezier(0,.4,.8,1);
          }
          ul:nth-child(3){
            animation-delay:4s;
            transition: transform 4s cubic-bezier(0,.4,.8,1);
          }
        }
       .div_4box{
        width: 2.96rem;height: 0.97rem;
        position: absolute; left: 0.26rem;top: -0.88rem;
        display: flex;justify-content:space-between;
        padding: 0.04rem 0.15rem;overflow: hidden;
        
        >ul{
          width: 0.8rem;height: 100%;color: #fff;
          transform-style:preserve-3d;
          transform:rotateZ(-90deg);
          position: relative;
          >li{
            background-color:#fff;width: 80px;
            position: absolute;left: 0;top: 0;
            >img{
              width: 100%;
            }
          }
        }
        
       }
    }
    .div_cen_5{
      position: absolute;
      left: 0; top: 18.29rem;
      width: 100%;height: 4.25rem;
      img:nth-child(1){
        position: absolute;
        left: 1.05rem;top:0.1rem;
      }
      img:nth-child(2){
        position: absolute;
        left: 0.15rem;top:0.65rem;
      }
      img:nth-child(3){
        position: absolute;
        left: 1.43rem;top:0.65rem;
      }
      img:nth-child(4){
        position: absolute;
        left: 2.76rem;top:0.65rem;
      }
      img:nth-child(5){
        position: absolute;
        left: 0.25rem;top:1.75rem;
      }
      img:nth-child(6){
        position: absolute;
        left: 1.24rem;top:1.85rem;
      }
      img:nth-child(7){
        position: absolute;
        left:2.8rem;top:1.8rem;
      }
      img:nth-child(8){
        position: absolute;
        left:0.96rem;bottom:0.45rem;
      }
      img:nth-child(9){
        position: absolute;
        left:2.2rem;bottom:0.45rem;
      }
    }
    .div_cen_6{
      position: absolute;
      left: 0;top: 22.30rem;
      width: 100%;height: 8.78rem;
      .div_cen_6d{
        position: absolute; left: 0;top: 1.42rem;
        width: 100%;padding: 0 0.17rem;
        >div{
          display: flex;flex-wrap:wrap;
          >div{
            width: 50%;height: 0.48rem;
            padding-right: 0.1rem;margin-top: 0.28rem;
            display: flex;justify-content: space-between;
            >img{width: 0.74rem;border: 1px solid #fff;}
            >div img{width: 0.72rem}
            p{
              color: #fff;font-size: 16px;line-height: 25px;
            }
          } 
        }
      }
      .pages{
        width: 100%; position: absolute; 
        left: 0;bottom: 2.15rem;
        display: flex;justify-content:center ;
        span{
          display: inline-block;width: 0.54rem;font-size: 16px;
          height: 0.33rem;background-image: url(/static/img/active/active1_2/btn_selected.png);
          text-align: center;margin: 0 0.1rem;line-height: 0.33rem;
          color: #fff;
        }
      }
      >.bu{
        width: 1.71rem;height: 0.28rem;
        position: absolute; background-image: url(/static/img/active/active1_2/tijiao@2x.png);
        background-size: 100%;background-repeat: no-repeat;
        left: 1rem;bottom: 1.5rem;
      }
    }

  }
  @keyframes fn{
        0% {transform:rotateX(-0deg) ;}
          100%{ ;}

      }
  @keyframes fa{
        0% {transform:rotateX(-0deg) ;}
          100%{transform:rotateX(-360deg);}

      }
  @keyframes fb{
        0% {transform:rotateX(-0deg) ;}
          100%{transform:rotateX(-360deg);}

      }
</style>
