<template>
  <div class="active1_page">
    <div class="acti_header">
      <div class="goindex" @click="$router.push('/')"></div>
      <div>
        <p v-if="!usermsg">勇者大人您好， 请<span @click="$router.push('/logo?redirect=%2Factive_1')">【登录】</span></p>
        <p v-else>欢迎您&nbsp;{{usermsg.nickname}},&nbsp;<span @click="quit">【退出登录】</span></p>
        <div class="rows" style="margin-top: 0.45rem;">
          <div>
            <div v-for="(item,inf) in rowslist" :key="inf">
              <div class="head">
                <span v-if="item.start_time_status_id == '1'" style="background-color: #66bc41">未开始</span>
                <span v-else-if="item.start_time_status_id == '2'" style="background-color: #66bc41 ">正在进行</span>
                <span v-else style="background-color:#cd2027 ">已结束</span>
                <span>{{item.start_time_str}}</span>
              </div>
              <div class="cent">
                <img :src="item.gid1Info[1]+'?x-oss-process=image/resize,m_fill,h_54,w_54'" >
                <span>{{item.res1}}-{{item.res2}}</span>
                <img :src="item.gid2Info[1]+'?x-oss-process=image/resize,m_fill,h_54,w_54'" >
              </div>
              <p>
                <span>{{item.gid1Info[0]}}</span>
                <span>{{item.gid2Info[0]}}</span>
              </p>
            </div>
          </div>
        </div>
        <img @click="$router.push('/active_1/active1list')" src="/static/img/active/active1/saicehng@2x.png" >
       
      </div>
    </div>
    <div class="acti_cen_1">
      <div>
        <div>
          <img src="/static/img/active/active1/susai1@2x.png">
        </div>
        <div style="margin-top: 0.2rem">
          <img @click="$router.push('/active_1/details_2')" src="/static/img/active/active1/zusai2@2x(1).png">
          <img src="/static/img/active/active1/zusai3@2x(1).png">
        </div>
      </div>
    </div>
    <div class="acti_cen_2">
      <img :class="rotate? 'rotate': ''" src="/static/img/active/active1/zhizhen@2x.png" :style="{'transform': 'rotate('+ deg +'deg)'}">
      <div class="ada" v-if="count == 0" @click="free_one" :data-ins="'现有积分'+Score" style="background-image:url(/static/img/active/active1/btn_2@ax.png)"></div>
      <div v-else @click="free_one" :data-ins="'现有积分'+Score" style="background-image: url(/static/img/active/active1/btn_1@2x.png)"></div>
     
    </div>
    <div class="acti_cen_3">
       <span @click="copeyfun"></span>
      <div class="acti_cen_3_1"> <span>{{count}}</span></div>
      <img style="position: absolute;left: 0.25rem;top: 0.6rem;width: 1.21rem" src="/static/img/active/active1/guize@2x.png" alt="">
      <div class="prtext">
        <p><span>1</span>每日登录获取一次抽奖机会</p>
        <p><span>2</span>每多邀请一位好友注册成功后即可获得一次抽奖机会</p>
        <p><span>3</span>消耗1500积分获取一次抽奖机会</p>
      </div>
      <img style="position: absolute;left: 0.25rem;top: 3rem;width: 1.21rem" src="/static/img/active/active1/mingdan@2x.png" alt="">
      <div class="p_list">
        <div class="prize_list">
            <p><span>用户名</span></p>
            <p><span>电话</span></p>
            <p><span>奖品</span></p>
        </div>
        <div class="prize_listbox">
          <div v-for = "i in awardlist">
              <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{i.name}}</span>
              <span>{{i.phone}}</span>
              <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{i.award}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="acti_cen_4">
      <div>
        <div :class="isanima? 'isanima': ''" v-for="i in giflist.befdata">
          <img style="width: 0.65rem;" :src="i.img">
          <div class="cen_4_1">
            <p>{{i.title}}</p>
            <img @click="Support(i.id)" :src="i.is_supp? '/static/img/active/active1/jingcai@2x (2).png': '/static/img/active/active1/btn_support_s@2x(2).png'">
          </div>
          <img style="width: 0.42rem" :src="'/static/img/active/active1/jiubei-'+i.people_num_scale +'.png'" >
          <div class="cen_4_2">
            {{i.people_num}}人
          </div>
        </div>
      </div>
      <img @click="nexPAge" src="/static/img/active/active1/huan.png">
    </div>
    <div class="acti_cen_5">
      <div class="texta">
        <div class="textasss clearfix">
          <textarea placeholder="快来畅谈世界杯吧" v-model="commss"></textarea>
          <div><span @click="pushcomm"></span></div>
        </div>
        <div class="message">
          <p>留言墙</p>
          <p @click="godel">查看原帖 ></p>
        </div>
        <div class="user_list">
          <ul>
            <li v-for="i in comments">
              <div>
                <img :src="i.avatar || 'http://m.gtdysd.com/static/img/morentouxiang%20--icon.png'">
                <p>{{i.nickname}}</p>
                <span v-if="i.gender == 3"></span>
                <span v-else :class="i.gender == 1?'sex_man': 'sex_woman'"></span>
              </div>
              <p>{{i.content}}</p>
            </li>
          </ul>
        </div>
      </div>
      <div style="color: #fff;text-align: center;width: 100%;position: absolute;bottom: 0.3rem;left: 0;font-size: 12px;">
        <p>本活动最终解释权归GT电娱时代所有</p>
        <p style="margin-top:0.1rem">©2017 电娱时代 上海动娱网络科技有限公司 <br>沪ICP备15050271号-2</p>
      </div>
    </div>
   <exchange  style="position: fixed;" :islook="success" v-on:isclose="close" :tit="succesSrc"></exchange>
   <div style="position: fixed;" v-show="mask" @touchmove.prevent class="mask"  @click="copey && clickEvent()"></div>
    <message-box style="position: fixed;" :islook="boxshow" v-on:confirm="confirm" :data="{tit:'你已经没有抽奖次数',msg:'是否消耗1500积分？'}"></message-box>
    <div class="copey"  :class="copey ? 'feomCss': ''" @touchmove.prevent v-show="copey">
      <div class="head"></div>
      <div class="copeycen" ref="cop" >{{url_push}}</div>
      <button v-clipboard:copy="url_push"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError">复制</button>
    </div>
    <div v-show="tan" class="tan" :class="tan ? 'feomCss': ''" @touchmove.prevent>
      <div v-if="befguessing.befdata" class="box" :class="isanima? 'isanima': ''" v-for="item in befguessing.befdata">
        <div class="hea">
          <span>{{item.start_time}}</span>
          <span v-if="item.state == '3'" style="background-color: #b5b5b5;">未开始</span>
          <span v-else :style="{'background-color':item.state == '2'?'#cd2127': '#66bc41'}">{{item.state == '2'?'竞猜失败': '竞猜成功'}}</span>
        </div>
        <div class="cent">
          <img :src="item.country1.img+'?x-oss-process=image/resize,m_fill,h_54,w_54'">
          <span>{{item.country1.res}} - {{item.country2.res}}</span>
          <img :src="item.country2.img+'?x-oss-process=image/resize,m_fill,h_54,w_54'">
        </div>
        <p>
          <span>{{item.country1.name}}</span>
          <span>{{item.country2.name}}</span>
        </p>
      </div>
      <div class="close" @click="mask = false;tan = false"></div>
      <div class="but">
        <img @click="nextBef" src="/static/img/active/active1/组10@2x.png">
        <img @click="parBef" src="/static/img/active/active1/组11@2x.png">
      </div>
    </div>
    <div v-show="maska" style="position: fixed;z-index: 2001"  @click="tannnnnn = false;maska = false;" class="mask"></div>
    <div v-show="tannnnnn" class="tannnnnn" @touchmove.prevent>
      <div class="close" @click="tannnnnn = false;maska = false;"></div>
        <h5>补偿公告</h5>
        <p>于2018年6月30日10时开始，因网站服务器出现问题，导致用户无法正常体验网站。在此期间参与的用户将获得下列补偿：</p>
        <p>1.因世界杯第二阶段“世界杯寻宝”可无限掷筛子问题的：用户回到未掷筛状态，在此期间获得的积分将清零。
补偿：7月2号给予多一次掷筛机会，并额外赠送1500积分。</p>
        <p>2.在“大富翁”中完成隐藏答题任务，只给予第一次答对的奖励。</p>
        <p>3.对于造成的不便我们深感抱歉，如有问题联系客服电娱时代客服 QQ:2827184309 客服电话  {{ phone[parseInt(Math.random()*5)]}}</p>
        <p>PS：客服工作日：周一至周五，每天10:00-19:00，也可以在官网首页右下角悬浮按钮，点击意见反馈，进行问题提交，我们将尽快给于回复。</p>
    </div>
    </div>
    
  </div>
</template>
<script>
import activeExchange from '../../components/activeExchange'
import messageBox from '../../components/messageBox'
import { Toast,Indicator } from 'mint-ui'
import VueClipboard from 'vue-clipboard2'
import base64 from 'js-base64';
export default {
  data (){
    return {
      phone: ['15800839326','17317520286','13162300806','13166263195','13817538957'],
      tannnnnn: false,
      maska: false,
      Score: 0,
      tan: false,
      copey: false,
      boxshow: false,
      rotate: false,
      deg: 0,
      mask: false,
      success: false,
      usermsg: null,
      rowslist: [],
      giflist: {
        befpage: 1,
        allpage: 0,
        befdata: [],
        alldata: []
      },
      succesSrc:{
      },
      isanima: false,
      awardlist:[],
      ardlist: ['61',"64","66","65","60","62","67","63"],
      count: 1,
      comments: [],
      commss: '',
      boxtype:{
        tit : '100积分',
        type :  8
      },
      url_push: null,
      befguessing:{
        befpage: 1,
        allpage: 0,
        befdata: [],
        alldata: []
      }
    }
  },
  created(){
    this.$store.commit('selechange',4)
    this.$store.commit('_change',{
      _topshow: false,
      _bottshow: false,
    })
  },
  mounted(){
     if(!localStorage.getItem('tann')){ // 紧急公告
      this.tannnnnn = true
      this.maska = true
      localStorage.setItem('tann','true')
    }  
    if(localStorage.getItem("is_login")){
          this.$axios.post('/',{method:'member.score.getScore'}).then( (res) => {
              if(res.data.status == 0){
                this.Score = res.data.data
              }
          })
          this.usermsg =  JSON.parse(localStorage.getItem('user_info'));
          this.url_push = 'http://m.gtdysd.com/index.html#/register?name=' + Base64.encode(this.usermsg.gt_id)
      }
    if(!sessionStorage.getItem('tan')){
      this.$axios.post('/',{method:'action.guess.userguess'}).then( (res) => {
        if(res.data.status == 0){
          this.tan = true
          this.mask = true
          this.befguessing.alldata = res.data.data
          this.befguessing.befdata = res.data.data.slice(0,2)
          this.befguessing.allpage = Math.ceil(res.data.data.length/2) 
          sessionStorage.setItem('tan','true')
        }
      })
    }     
    this.$axios.post('/',{method:'action.index.getGameInfo'}).then( (res) => {
      if(res.data.status == 0){
        this.rowslist  = res.data.data
      }else Toast(res.data.msg)
    })
    this.$axios.post('/',{method:'worldcup.lottery.rotorlist'}).then( (res) => {
      if(res.data.status == 0){
        this.awardlist = res.data.data.awardlist
      }else Toast(res.data.msg)
    })
    this.getdata()
    this.$axios.post('/',{method:'note.comment.comments'}).then( (res) => {
      if(res.data.status == 0){
        this.comments = res.data.data
      }else Toast(res.data.msg)
    })
    if(localStorage.getItem("is_login")){
      this.$axios.post('/',{method:'worldcup.lottery.rotorcount'}).then( (res) => {
        if(res.data.status == 0){
          this.count = res.data.data
        }else Toast(res.data.msg)
      })
    }
  },
  methods: {
   free_one(){
     if(!localStorage.getItem("is_login")){
          Toast('你好，请先登录~')
          setTimeout(()=>{this.$router.push('/logo?redirect=%2Factive_1')},500)
          return
      }
      this.rotate = false
      this.deg = 0;
      if(this.count == 0){
        this.boxshow = true
        this.mask = true
        return
      }
      Indicator.open();
      this.$axios.post('/',{method:'worldcup.lottery.rotor'}).then((res)=>{
        Indicator.close();
        if(res.data.status == 0){
          this.deg = 0;
          this.count = res.data.data.count 
          let int = this.ardlist.indexOf(res.data.data.key)+1;
           this.rotate = true
           this.deg = 3600 + parseInt(Math.random()*(int*45-(int-1)*45+1)+(int-1)*45)
           setTimeout(()=>{
            this.succesSrc = res.data.data.name
            this.success = true
            this.mask = true
           },3000)
        }else Toast(res.data.msg)
      })
   },
   clickEvent(){
     this.mask = false
     this.copey = false
   },
   quit(){
      this.$axios.post('/',{method:'usercenter.login.logout'}).then( (res) => {
        if(res.data.status == 0){
          localStorage.clear();
          location.reload()
          Toast('退出账号成功')
        }else Toast(res.data.msg)
      })
    },
    godel(){
      this.$router.push({
        name: 'details',
        query: {
          notid: 'MTIyXzIwXzEx',
        }
      })
    },
    pushcomm(){
      if(this.commss == ''){
        Toast('请输入内容') 
        return
      }
      this.$axios.post('/',{method:'note.comment.addcomment',content: this.commss}).then( (res) => {
        if(res.data.status == 0){
          Toast('发布成功') 
          this.commss = ''
          location.reload()
        }else Toast(res.data.msg)
      })
    },
    confirm(ty){
      this.boxshow = false
      this.mask = false
      if(ty){
       this.rotate = true
        this.$axios.post('/',{method:'worldcup.lottery.rotor'}).then((res)=>{
          if(res.data.status == 0){
            this.Score -= 1500
            let int = this.ardlist.indexOf(res.data.data.key)+1;
             this.deg = 3600 + parseInt(Math.random()*(int*45-(int-1)*45+1)+(int-1)*45)
             setTimeout(()=>{
              this.succesSrc = res.data.data.name
              this.success = true
              this.mask = true
             },3000)
          }else Toast(res.data.msg)
        })
      }
    },
    nexPAge(){
      this.isanima = true
      let data = this.giflist
      if(data.befpage == data.allpage){
        data.befpage = 0
      }
      data.befpage = data.befpage+1
      data.befdata = data.alldata.slice((data.befpage-1)*5,data.befpage*5)
      setTimeout(()=>{
        this.isanima = false
      },200)
    },
    Support(id){
      this.$axios.post('/',{method:'action.index.support',gid: id}).then( (res) => {
        if(res.data.status == 0){
          this.getdata()
          Toast('支持成功！')
        }else Toast(res.data.msg)
      })
    },
    getdata(){
      this.$axios.post('/',{method:'action.index.getGroupInfo'}).then( (res) => {
        if(res.data.status == 0){
          this.giflist.alldata = res.data.data
          this.giflist.befdata = res.data.data.slice(0,5)
          this.giflist.allpage = Math.ceil(res.data.data.length/5) 
        }else Toast(res.data.msg)
      })
    },
    close(type){
      this.success = false
      this.mask = false
    },
    copeyfun(){
      if(this.url_push != null){
        this.copey = true
        this.mask = true
      }else{
        Toast('你好，请先登录~')
        setTimeout(()=>{this.$router.push('/logo?redirect=%2Factive_1')},500)
      }
    },
    onCopy: function (e) {
      this.copey = false; this.mask = false
      Toast('链接已复制粘贴板！ 快去分享吧')
    },
    onError: function (e) {
      this.copey = false; this.mask = false
      Toast('游览器不支持一键复制， 请长按复制')
    },
    nextBef(){
      this.isanima = true
      let data = this.befguessing
      if(data.befpage == 1){
        data.befpage = data.allpage+1
      }
      data.befpage = data.befpage-1
      data.befdata = data.alldata.slice((data.befpage-1)*2,data.befpage*2)
      setTimeout(()=>{
        this.isanima = false
      },200)
    },
    parBef(){
      this.isanima = true
      let data = this.befguessing
      if(data.befpage == data.allpage){
        data.befpage = 0
      }
      data.befpage = data.befpage+1
      data.befdata = data.alldata.slice((data.befpage-1)*2,data.befpage*2)
      setTimeout(()=>{
        this.isanima = false
      },200)
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
  .active1_page{
    >div{
      position: relative;
    }
   .tan{
    position: fixed;top: 15%;left: 0.14rem;
    width: 3.47rem;height: 5.08rem;z-index: 120;
    padding: 0.3rem 0.16rem;text-align: center;
    background-image: url(/static/img/active/active1/bg_popup@2x.png);
    background-size: 100%;background-repeat: no-repeat;
    .close{
        display: inline-block;
        position: absolute;
        right: 0.05rem;top: -0.5rem;
        width: 30px; height: 30px;
        background-color: rgba(0,0,0,0);
        background-image: url(/static/img/vip/common_icon_close@2x.png);
        background-size: 100%;
    }
    .but{
      display: flex;justify-content:space-between;
      width: 3rem;margin: 0 auto;
      margin-top: 0.2rem;
      >img{
        width: 0.94rem;height:0.35rem;
      }
    }
    .box{
      width: 3.14rem;height: 1.48rem;
      margin-top: 0.25rem;
      background-color: #eeeeee;
      .hea{
        width: 100%;height: 0.45rem;
        display: flex;flex-direction: row;
        >span{
          display: block;height: 0.45rem;
          font-size: 14px;color: #fff;
          line-height: 0.45rem;font-weight: bold;
        }
          span:first-child{
          width: 66%;background-color: #0377bc;
        }
          span:last-child{
          width: 34%;
        }
      }
     .cent{
        width: 1.6rem;height: 0.43rem;margin: 0 auto;
        padding: 0 4px;
        margin-top: 0.17rem; display: flex;justify-content:space-between;
        background-image: url(/static/img/active/active1/img@2x.png);
        background-repeat: no-repeat;
        background-size: 100%; align-items:center;
        >img{
          width: 0.37rem;height: 0.37rem;border-radius: 50%;
        }
        >span{
          font-size: 16px;font-weight: bold;
          color: #fff;
        }
      }
      >p{
        margin-top: 0.1rem;
        padding:0 0.8rem 0.13rem;color: #000;
        display: flex;justify-content:space-between;
      }
    }
    >div:first-child{
      margin-top: 0.5rem;
    }
    >img{
      width: 1.41rem;margin-top: 0.2rem;
    }
   }
   .tannnnnn{
      width: 3.4rem;
      position: fixed;z-index: 2002;
      top: 18%;left: 0.2rem;
      background-color: #fff;
      padding: 0.25rem 0.15rem;border-radius: 6px;
      >p{
        line-height: 0.25rem;
        margin: 0.05rem 0;
      }
      >h5{
        font-size: 15px;
      }
      .close{
          display: inline-block;
          position: absolute;
          right: 0.05rem;top:-0.4rem;
          width: 30px; height: 30px;
          background-image: url(/static/img/vip/common_icon_close@2x.png);
          background-size: 100%;
      }
    }
   .acti_header{
    width: 100%; height: 5.57rem;
    background-image: url(/static/img/active/active1/_01.jpg);
    background-size: 100%;background-repeat: no-repeat;
     .goindex{
       position: absolute;
        top: 0.3rem;left:2.55rem;
        width: 1.03rem;height:0.33rem;
        background-image: url('/static/img/active/active1/btn@2x.png');
        background-size: 100%;background-repeat: no-repeat;
    }
    >div{
      display: block;width: 100%;
      position: absolute;text-align: center;
      left: 0;bottom: 0.84rem;
      padding: 0 10px;
      >p{
        color: #fff;font-size: 14px;
      }
      >img{
        position: absolute;width: 1.5rem;
        bottom: -0.6rem;left:1.15rem;
      }
      .rows{
        overflow: auto;width: 100%;
        >div{
          width: 18rem;
          display: flex;flex-direction: row;
          >div{
            width: 1.76rem;height:100%;
            border: 1px solid #fff;
            border-radius: 3px;background-color: #fff;
            margin-left: 0.02rem;
              .head{
               display: flex;flex-direction: row;
                >span{
                  display: block;height: 0.37rem;
                  font-size: 14px;color: #fff;
                  line-height: 0.37rem;font-weight: bold;
                }
                span:first-child{
                  width: 38%;background-color: #66bc41;
                }
                span:last-child{
                  width: 62%;background-color: #0377bc;
                }
              }
              .cent{
                width: 1.57rem;height: 0.43rem;margin: 0 auto;
                padding: 0 3px;
                margin-top: 0.17rem; display: flex;justify-content:space-between;
                background-image: url(/static/img/active/active1/img@2x.png);
                background-repeat: no-repeat;
                background-size: 100%; align-items:center;
                >img{
                  width: 0.37rem;border-radius: 50%;
                }
                >span{
                  font-size: 16px;font-weight: bold;
                  color: #fff;
                }
              }
              >p{
                padding: 0.05rem 0.13rem;color: #000;
                display: flex;justify-content:space-between;
              }
            }
          }
          div:first-child{
            margin-left: 0;
          }
        }
    }
   }
   .acti_cen_1{
    width: 100%;height: 4.85rem;
    background-image: url(/static/img/active/active1/_02.png);
    background-size: 100%;background-repeat: no-repeat;
    position: relative;
    >div{
      position: absolute;
      left: 0.07rem;top: 2.1rem;
      text-align: center;
      >div{
        img{
          width: 1.785rem;
        }
      }
    }
   }
   .acti_cen_2{
    width: 100%;height: 5.56rem;
    background-image: url(/static/img/active/active1/_03.png);
    background-size: 100%;background-repeat: no-repeat;
    position: relative;
    >img{
      width: 0.54rem;position: absolute;
      left: 1.6rem;bottom: 1.9rem;
      transform-origin: 50% 70%;
    }
    >div{
      width: 0.67rem;height: 0.33rem;
      position: absolute;background-repeat: no-repeat;
      background-size: 100%;
      left: 1.53rem;bottom: 2rem;
    }
    
   }
   .acti_cen_2>.ada:after{
      content:attr(data-ins);font-size: 8px;
      text-align: center;
      width: 1rem;height: 10px;color: #fff;
      position: absolute;bottom: 0.05rem;left: -0.16rem;
   }
   .acti_cen_3{
    width: 100%;height: 8.12rem;
    background-image: url(/static/img/active/active1/_04.png);
    background-size: 100%;background-repeat: no-repeat;
    position: relative;
    >span{
      width: 1.5rem;height: 0.24rem;
      background-image: url(/static/img/active/active1/haoyou@2x.png);
      background-size: 100%;
      position: absolute;background-repeat: no-repeat;
      left: 1.1rem;top: 0.1rem;
    }
   
    .acti_cen_3_1{
      width: 1.33rem;height: 0.41rem;
      position: absolute;left: 1.2rem;top: -0.5rem;
      background-image: url(/static/img/active/active1/btn_mianfei@2x.png);
      background-size: 100%;
      >span{
        display: inline-block;
        width: 100%;
        padding-left: 0.68rem;
        font-size: 20px;color: #fff;
        font-weight: bold;
        line-height: 0.38rem;
      }
    }
    .prtext{
       position: absolute; left: 5%;top: 1.3rem;
       color: #fff;font-size: 11px;
       >p{
        display: flex;line-height: 25px;
        align-items:center;
        span{
          display: inline-block;color: #0377bc;
          margin-right: 20px;margin-left: 10px;
          width: 0.13rem;height: 0.13rem;border-radius: 50%;
          background-color: #fff;font-size: 9px;
          text-align: center;line-height: 0.16rem;
        }
       }
      
    }
    .p_list{
      width: 90%;border: 1px dashed #ddd;border-radius: 12px;
      position: absolute; left: 5%;bottom: 2.25rem;
      box-shadow: inset 0px -41px 45px -20px rgba(0,0,0,.3); 
      padding: 0.15rem 0.15rem;padding-bottom: 0.1rem;
    }
    .prize_list{
      width: 100%;text-align:center ;color: #fff;
      font-size: 11px; height: 0.3rem;font-weight: normal;
      p{
         display: inline-block;
          width: 0.9rem;
           span{
            display: inline-block;line-height: 0.22rem;
            background-color: #03649e;
            width: 0.55rem;height: 0.2rem;
            border-radius: 12px;
          }
      }
    }
    .prize_listbox{
      overflow: auto;height: 1.34rem;
      >div{
        width: 100%;text-align: center;
        font-size: 11px;color: #fff;
        line-height: 30px;
        display: flex;align-items: center;
        span{
          display: inline-block;
          width: 1rem;
        }
      }
    }
   }
   .acti_cen_4{
    width: 100%;height: 6.57rem;
    background-image: url(/static/img/active/active1/_05.png);
    background-size: 100%;background-repeat: no-repeat;
    position: relative;
    >img{
      position: absolute;width: 1.5rem;
      bottom: 0;left: 1.15rem;
    }
    >div{
      width: 3.43rem;position: absolute;
      left: 0.16rem;
      >div{
        display: flex; align-items:center;justify-content:space-between;
        width: 100%;height: 0.74rem;padding: 0 0.13rem;margin-top: 0.42rem;
        background-image: url('/static/img/active/active1/bg@2x.png');
        background-repeat: no-repeat;background-size: 100%;
       .cen_4_1{
        p{
          color: #000;line-height: 25px;
        }
          img{
            width: 0.72rem;
          }
        }
        .cen_4_2{
          width: 50px;height: 50px;
          background-color: #0377bc;
          border-radius: 50%;color: #fff;
          text-align: center;line-height: 50px;
        }
      }
    }
   }
   .acti_cen_5{
    width: 100%;height: 7.2rem;
    background-image: url(/static/img/active/active1/_06.png);
    background-size: 100%;background-repeat: no-repeat;
    position: relative;
    .texta{
       width: 3.43rem;position: absolute;
      left: 0.16rem;top: 0.6rem;
      .textasss{
        background-color: #fff;
        border-radius: 6px;padding: 0.1rem;
         >textarea{
          height: 1.29rem;width: 100%;
          border: 0;font-size: 10px;
        }
        >div>span{
          width: 0.7rem;height: 0.28rem;
          background-image: url('/static/img/active/active1/6@2x.png');
          background-repeat: no-repeat;background-size: 100%;
          float: right;
        }
      }
    }
    .message{
      height:0.5rem;display: flex;
      justify-content:space-between;
      align-items:center;font-size: 14px;
      color: #fff;
    }
    .user_list{
      padding: 10px;
      border: 1px dashed #ddd;
      border-radius: 12px;color: #fff; 
      max-height: 3.1rem;overflow: auto;
      ul>li{
        >div{
          display: flex; flex-direction: row;
          align-items:center;height: 0.3rem;
         >img{width: 0.2rem;border-radius: 50%;}
         >p{margin: 0 5px;font-size: 10px;}
         .sex_man{
          width: 0.14rem;height: 0.14rem;vertical-align: 0%;
         }
        }
        >p{
          font-size: 12px;display: inline-block;
          line-height: 0.25rem;
        }
      }
    }
   }
    .copey{
      position: fixed;top: 30%;left: 0.275rem;
      z-index: 101;width: 3.2rem;border-radius: 12px;
      background-color: #fff;
      .head{
        position: absolute;width: 2.31rem;height: 0.61rem;
        left: -0.15rem;top: -0.18rem;
        background-image: url(/static/img/active/active1_2/zhaungshi@2x.png);
        background-size: 100%;background-repeat: no-repeat;
      }
      .copeycen{
        width: 2.6rem; word-wrap: break-word;
        text-align: center;
        margin: 0 auto;line-height: 28px;
        margin-top: 0.6rem;color: #000;
        padding: 0.12rem;font-size: 15px;
        background-color: #ebebeb;
      }
      >button{
        width: 2.08rem;height: 0.44rem;display: block;
        background-color: #4abf24;margin: 0 auto;
        margin-top: 0.1rem;margin-bottom: 0.1rem;
        color: #fff;border: 1px solid #85f532;
        border-radius: 12px;
      }
    }
  }

  .rotate{
    transition: transform 3s cubic-bezier(0,.4,.8,1);
    
  }
</style>
