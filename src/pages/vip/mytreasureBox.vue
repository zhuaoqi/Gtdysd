<template>
  <div class="myBox_page">
    <vip-heard :title="'我的宝箱'"  :isback = "true"  :type="Obj"></vip-heard>
    <div style="height: 0.5rem;background-color: #fff;"></div>
    <main>
      <div class="_tit">
          <span>已有的钥匙</span>
        </div>
        <div style="position: relative;" class="border"></div>
        <div class="key">
          <div>
            <div>
              <p>木质钥匙</p>
              <p>{{keylist[0].num}} 把</p>
            </div>
            <img src="/static/img/vip/woodiness_key@2x.png">
          </div>
          <div>
            <div>
              <p>白金钥匙</p>
              <p>{{keylist[1].num}} 把</p>
            </div>
            <img src="/static/img/vip/platinum_key@2x.png">
          </div>
          <div>
            <div>
              <p>钻石钥匙</p>
              <p>{{keylist[2].num}} 把</p>
            </div>
            <img src="/static/img/vip/diamonds_key@2x.png">
          </div>
          <div>
            <div>
              <p>王者钥匙</p>
              <p>{{keylist[3].num}} 把</p>
            </div>
            <img src="/static/img/vip/king_key@2x.png">
          </div>
        </div>
        <div class="_tit" style="margin-top: 0.1rem;">
          <span>已有的宝箱</span>
          <div>
            <p @click="$router.push('/vip/boxrule')">宝箱规则<span></span></p>
          </div>
        </div>
        <div style="position: relative;" class="border"></div>
        <div class="box_box">
          <p>未过期</p>
          <p v-if="boxlist.allpage > 1" @click="nexPage"><span></span>换一批</p>
        </div>
        <div v-if="boxlist.befdata.length != 0" class="box" :style="{'min-height':boxlist.alldata.length > 2 ?'2rem': 0}" :class="isanima? 'isanima': ''">
          <div v-for="item in boxlist.befdata" :class="'box_'+item.level">
            <div>
              <p>{{item.name}}</p>
              <button @click="openBox(item.level, item.box_code)">开启宝箱</button>
            </div>
            <img :src="item.img">
          </div>
        </div>
        <div v-else class="nosto">
          <img src="/static/img/vip/icon_overdue@2x.png">
          <p>偷偷告诉你，连续签到即可获得宝箱</p>
        </div>
        <p style="margin: 0.16rem 0;font-size: 14px;color: #646464">已过期</p>
        <div v-if="odbox.length != 0" class="oldbox">
          <div v-for="i in odbox":style="{'background-image':'url('+ i +')'}">
            <img src="/static/img/vip/img_overdue@2x.png">
          </div>
        </div>
        <div v-else class="nosto">
          <img src="/static/img/vip/icon_overdue@2x.png">
          <p>当前还没有过期的物品哦</p>
        </div>
        <div style="height: 0.6rem"></div>
    </main>
    <!-- 引用模块 -->
    <open-boxs :islook="isopbox" :data="boxtype" v-on:isclose =" mask = false; isopbox = false"></open-boxs>
    <message-box :islook="boxshow" v-on:confirm="confirm" :data="openbox_ms"></message-box>
    <div v-show="mask" @touchmove.prevent class="mask"  @click="typeText  && clickEvent()"></div>
    <typeText :islook="typeText" :data="{type: 1}"></typeText>
  </div>
</template>

<script>
import vip_heard from '../../components/vipheader'
import { Toast,Indicator } from 'mint-ui'
import openBoxs from '../../components/openBox'
import messageBox from '../../components/messageBox'
import fromTyet_text from '../../components/frameType_text'

export default {
  data (){
    return {
     Obj:{
      tit: '领取记录',
      path: '/vip/Conveboslist'
     },
     keylist: {
      '0':{num:0},
      '1':{num:0},
      '2':{num:0},
      '3':{num:0},
     },
     isopbox: false,
     mask: false,
     boxtype:{
      type: 4,
      tit: ''
     },
     boxlist:{
         befpage: 1,
         allpage: 0,
         befdata: [],
         alldata: []
      },
      isanima: false,
      odbox: [],
      boxshow: false,
      openbox_ms:{
        tit:'',
      },
      box_: {
        box_code: ''
      },
      typeText: false
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
    openBox(level,id){
      this.box_.box_code = id
      this.box_.type = Number(level)+3

      switch (Number(level)){
        case 1:
          this.openbox_ms.tit = '确认消耗一把木质钥匙兑换吗？'
        break;
        case 2:
          this.openbox_ms.tit = '确认消耗一把白金钥匙兑换吗？'
        break;
        case 3:
          this.openbox_ms.tit = '确认消耗一把钻石钥匙兑换吗？'
        break;
        case 4:
          this.openbox_ms.tit = '确认消耗一把王者钥匙兑换吗？'
        break;
      }
      this.boxshow = true
      this.mask = true
    },
    nexPage(){
      this.isanima = true
      let data = this.boxlist
      if(data.befpage == data.allpage){
        data.befpage = 0
      }
      data.befpage = data.befpage+1
      data.befdata = data.alldata.slice((data.befpage-1)*4,data.befpage*4)
      setTimeout(()=>{
        this.isanima = false
      },200)
   },
   confirm(type){
      this.boxshow = false
      this.mask = false
    if(type){
        Indicator.open()
        this.$axios.post('/',{method:'member.box.openbox', box_code: this.box_.box_code}).then( (res) => {
        	
          Indicator.close()
          if(res.data.status == 0){
            this.getbox()
            this.boxtype.tit = res.data.data.name
            this.boxtype.type =  this.box_.type
        	this.keylist[this.box_.type - 4].num-=1
            this.isopbox = true
            this.mask = true
          }else if(res.data.status == 202){
            this.typeText = true
            this.mask = true
          }else Toast(res.data.msg)
        })
    }
   },
   getbox(){
    this.$axios.post('/',{method:'member.box.boxmore',state: 1, firstrow: 1,pagesize: 100}).then( (res) => {
      if(res.data.status == 0){
          let data = res.data.data.data
          for (let a in data) {
            if(data[a].level == 1){
              data[a].img = '/static/img/vip/img_woodenbox_s@2x.png'
            }else if(data[a].level == 2){
              data[a].img = '/static/img/vip/img_whitegoldbox_s@2x.png'
            }else if(data[a].level == 3){
              data[a].img = '/static/img/vip/diamonds_box_s@2x.png'
            }else if(data[a].level == 4){
              data[a].img = '/static/img/vip/king_box_s@2x.png'
            }
          }
          this.boxlist.alldata = res.data.data.data
          this.boxlist.befdata = res.data.data.data.slice(0,4)
          this.boxlist.allpage = Math.ceil(res.data.data.count/4) 
      }else Toast(res.data.msg)
    })
   },
   clickEvent(){
    this.typeText = false;
    this.mask = false;
   }
  },
  mounted(){
    this.$axios.post('/',{method:'member.box.keylist'}).then( (res) => {
      if(res.data.status == 0){
        this.keylist = res.data.data
      }else Toast(res.data.msg)
    })
    this.getbox()
    this.$axios.post('/',{method:'member.box.boxmore',state: 3, firstrow: 1,pagesize: 3}).then( (res) => {
      if(res.data.status == 0){
          let data = res.data.data.data
          let nedata = []
          for (let a in data) {
            if(data[a].level == 1){
              nedata[a] = '/static/img/vip/img_woodenbox@2x.png'
            }else if(data[a].level == 2){
              nedata[a] = '/static/img/vip/img_whitegoldbox@2x.png'
            }else if(data[a].level == 3){
              nedata[a] = '/static/img/vip/diamonds_box@2x.png'
            }else if(data[a].level == 4){
              nedata[a] = '/static/img/vip/king_box_s@2x.png'
            }
          }
          this.odbox = []//nedata
          
      }else Toast(res.data.msg)
    })
  },
  components: {
    vipHeard: vip_heard,
    openBoxs: openBoxs,
    messageBox: messageBox,
    typeText: fromTyet_text
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"> 
  .myBox_page{
   >main{
    background-color: #fff;
    padding: 0 0.17rem;
    ._tit{
      position: relative;
      display: flex;
      justify-content: space-between;
      >div>p{
        display: inline-block;
        border: 1px solid #909090;
        padding: 1px 7px;color: #909090;
        border-radius: 16px;
        display: inline-block;
        line-height: 17px;
        color: #909090;font-size: 11px;
        display: inline-flex;
        align-items:center;
        >span{
            margin-left: 3px;
            width: 6px;height: 9px;
            background-image: url(/static/img/vip/icon_more@2x.png);
            background-size: 100%;
        }
      }
    }
    .key{
      display: flex;
      flex-wrap: wrap;
      >div{
        width: 1.67rem;height: 0.84rem;
        padding: 0.12rem;margin-top: 0.17rem;
        border-radius: 6px;
        display: flex;justify-content: space-between;
        >img{
          width: 0.46rem;height: 0.5rem;
        }
        >div{
          padding-top: 5px;
          text-align: center;font-size: 16px;
          color: #fff;line-height: 25px;
        }
      }
      >div:nth-child(1){
        background-color: #73d5ff;
      }
      >div:nth-child(2){
        margin-left: 0.07rem;
        background-color: #f58680;
      }
      >div:nth-child(3){
        background-color: #9f81fd;
      }
      >div:nth-child(4){
        margin-left: 0.07rem;
        background-color: #f97e8c;
      }

   }
   .box{
      display: flex;
      flex-wrap: wrap;
      >div{
        width: 1.67rem;height: 0.84rem;
        padding: 0.12rem;margin-top: 0.16rem;
        background-color: #9f81fd;
        border-radius: 6px;
        display: flex;justify-content: space-between;
        >img{
          width: 0.6rem;height: 0.5rem;
          margin-top: 0.05rem;
        }
        >div{
          text-align: center;font-size: 17px;
          color: #fff;line-height: 25px;
          >button{
            font-size: 10px;margin-top: 0.08rem;
            border-radius: 12px;
            padding: 3px 0.13rem;color: #fff;

          }
        }
      }
      .box_1{
        background-color: #f2d923;
        >div>button{
          background-color: #fff;
          color: #ffb400;
        }
      }
      .box_2{

        background-color: #ffdecb;
        >div>button{
          background-color: #fff;
          color: #ff5d00;
        }
      }
      .box_3{
        background-color: #febb7d;
        >div>button{
          background-color: #fff;
          color: #ff7b00;
        }
      }
      .box_4{
        
        background-color: #ffb0f7;
        >div>button{
          background-color: #fff;
          color: #ff00e5;
        }
      }
      >div:nth-child(even){
        margin-left: 0.07rem;
      }
   }
   .box_box{
    margin-top: 0.16rem;
    display: flex;justify-content: space-between;
    >p{
      color: #646464;
      span{
        display: inline-block;
        width: 12px;margin-right: 5px;
        height: 12px;
        background-image: url(/static/img/vip/common_icon_refresh@2x.png);
        background-repeat: no-repeat;
        background-size: 100%;
        vertical-align: -8%;
      }
      
    }
   }
   .oldbox{
    display: flex;flex-direction: row;
    >div{
      width: 1.05rem;height: 1.1rem;
      border-radius: 5px;
      border: 1px solid #d0d0d0;
      justify-content:center;
      margin-left: 0.13rem;
      background-repeat: no-repeat;
      background-size: 70%;
      background-position: 50% 50%;
      position: relative;
      >img{
        position: absolute;
        width: 0.4rem;
        right: 0.1rem;bottom: 0.1rem;
      }
    }
    >div:first-child{
      margin-left: 0
    }
   }
  }
}
</style>
