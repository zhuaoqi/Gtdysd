<template>
  <div class="active1_2_page">
    <div ref = 'dddd' class="div_cen_1">
      <div class="goindex" @click="$router.push('/active_1')"></div>
      <img src="/static/img/active/active_1_2/bg@2x.png">
      <p v-if="!usermsg">勇者大人你好， 请<span @click="$router.push('/logo?redirect=%2Factive_1%2Fdetails_2')">【登录】</span></p>
      <p v-else>欢迎您* {{usermsg.nickname}},&nbsp;<span @click="quit">【退出登录】</span></p>
    </div>
    <div class="div_cen_2">
      <div style="text-align: center;">
        <img style="width: 3rem;" src="/static/img/active/active_1_2/1标题@2x.png">
      </div>
      <div class="dd_2">
        <img src="/static/img/active/active_1_2/组赛1@2x.png">
        <div>
          <img src="/static/img/active/active_1_2/组赛2@2x.png">
          <img src="/static/img/active/active_1_2/组赛3@2x.png">
        </div>
      </div>
      <img style="width: 100%;margin-top:0.55rem;" src="/static/img/active/active_1_2/gre@2x.png">
      <div class="bul">
        <p><span class="he">1</span><span>每日0:00、10:00、18:00都会更新掷骰机会（该机会不会累积）。</span></p>
        <p><span class="he">2</span><span>每日0:00平台更新当日的幸运国家及幸运城市。玩家角色移动到相应的幸运城市会触发夺宝小游戏环节,完成游戏后可获得相应的礼品。</span></p>
        <p><span class="he">3</span><span>若触发的幸运城市对应到了该国的幸运国家,可能额外获得抽取奖品翻倍的机会。</span></p>
      </div>
      <div v-if="lucky" class="tedy">
        <div>
          <div>今日幸运国家</div>
          <div style="margin-left: 0.3rem;">
            <p>{{lucky.country.name}}</p>
            <img style="width: 0.5rem;" :src="lucky.country.img">
          </div>
        </div>
        <div style="margin-top: 0.1rem;">
          <div>今日幸运城市</div>
          <div>
            <p>{{lucky.luckcityid.split(',')[0]}}</p>
          </div>
          <div>
            <p>{{lucky.luckcityid.split(',')[1]}}</p>
          </div>
          <div>
            <p>{{lucky.luckcityid.split(',')[2]}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="game">
      <div class="sanzi">
        <div>
          <p>掷骰时间段：</p>
          <p>00:00~10:00</p>
          <p>10:00~18:00</p>
          <p>18:00~24:00</p>
        </div>
        <div @click="nuclic && gifinf()">
          <img :src="ging?'/static/img/active/active_1_2/SZ0'+ging+'.png':'/static/img/active/active_1_2/SZ-GIF.gif'">
        </div>
        <img style="position: relative;right: 0.1rem;top: 0.62rem;width: 0.45rem;height: 0.45rem;" src="/static/img/active/active_1_2/shou@2x.png">
      </div>
      <div class="game_a" ref="roll">
        <div>
          <img style="width: 131px;height: 139px;" src="/static/img/active/active_1_2/btn_kaishi@2x.png" alt="">
        </div>
        <div class="roll">
          <div v-for="(item,index) in Json" v-if="index < maxnum+5" @click="detaroll(index)">
            <img :src="item.img" >
            <img :style="{'opacity': maxnum == index? '1': 1}" :src="item.simg" >
          </div>
          <img src="/static/img/active/active_1_2/suo@2x.png">
        </div>
      </div>
      <div class="rengif" ref="gif"></div>
    </div>
    <div class="div_cen_3">
      <img style="width: 100%;" src="/static/img/active/active_1_2/cao@2x.png">
      <div class="div_1">
        <img src="/static/img/active/active_1_2/z.png">
        <div class="bul">
          <b>竞猜规则</b>
          <p><span class="he">1</span><span>需提前一天进行竞猜，比赛开始前停止竞猜。</span></p>
          <p><span class="he">2</span><span>竞猜成功即可获得一次“竞猜抽奖”的抽奖机会。</span></p>
          <p><span class="he">3</span><span>抽奖机会可进行累计，每一阶段（共三阶段）抽奖机会清零。</span></p>
        </div>
      </div>
      <div class="div_2">
        <div v-for="item in Guessinglist">
          <p>{{item.startdata}}</p>
          <div class="gr">
            <div style="text-align: right;">
              <span style="padding-right: 4px">{{item.gid1info.title}}</span>
              <img :src="item.gid1info.img">
            </div>
            <img src="/static/img/active/active_1_2/VS@2x.png" alt="">
            <div style="text-align: left;">
              <img :src="item.gid2info.img">
              <span style="padding-left: 4px">{{item.gid2info.title}}</span>
            </div>     
          </div>
          <div v-if="item.guess" class="competition">
            <img :src="item.guess.gid == item.gid1?'/static/img/active/active_1_2/b@2x.png':'/static/img/active/active_1_2/a2@2x.png'">
            <img :src="item.guess.gid == item.gid2?'/static/img/active/active_1_2/b@2x.png':'/static/img/active/active_1_2/a2@2x.png'">
          </div>
          <div v-else class="competition">
            <img src="/static/img/active/active_1_2/a2@2x.png">
            <img src="/static/img/active/active_1_2/a2@2x.png">
          </div>
          <div class="score">
            <input v-if="item.guess" readonly v-model="item.guess.res1" />
            <input v-else type="number" v-model="item.res1" />
            <p>猜比分</p>
            <input v-if="item.guess" readonly v-model="item.guess.res2" />   
            <input v-else type="number" v-model="item.res2" />   
          </div>
          <img @click="item.guess || commitGuess(item.id,item.res1,item.res2)" style="width: 1.37rem;margin-top: 0.15rem;" :src="!item.guess?'/static/img/active/active_1_2/btn@2x.png':'/static/img/active/active_1_2/btn2@2x.png'">
        </div>
      </div>
    </div>
    <div class="gin_game">
      <div class="coujiang">
          <div class="div_4box" :class="rotate? 'rotate':''">
            <ul :style="{'transform':'rotateX(-'+edg.one+'deg)'}">
              <li v-for="(i,index) in img"  :style="{'transform': 'rotateX('+(index+1)*45+'deg) translateZ('+180+'px)'}">
                <img :src="i">
              </li>
            </ul>
            <ul :style="{'transform':'rotateX(-'+edg.two+'deg)'}">
              <li v-for="(i,index) in img"  :style="{'transform': 'rotateX('+(index+1)*45+'deg) translateZ('+180+'px)'}">
                <img :src="i">
              </li>
            </ul>
            <ul :style="{'transform':'rotateX(-'+edg.tree+'deg)'}">
              <li v-for="(i,index) in img"  :style="{'transform': 'rotateX('+(index+1)*45+'deg) translateZ('+180+'px)'}">
                <img :src="i">
              </li>
            </ul>
          </div>
          <div class="_4num">
            <img src="/static/img/active/active_1_2/qiu@2x(1).png" >
            <span class="isap" style="margin-left: 0.02rem;">{{endo.goldenball}}</span>
            <span class="isap2" style="margin-left: 0.02rem;">{{endo.silverball}}</span>
          </div>
          <div class="butt" @click="nulclick && tiger()"> </div>
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
      <img style="width: 96%;margin-top: 0.1rem;" src="/static/img/active/active_1_2/tt@2x.png">
    </div> 
    <div class="div_cen_4">
      <img style="width: 2.3rem" src="/static/img/active/active_1_2/ddd@2x.png">
      <div class="bul">
          <p><span class="he">1</span><span>通过分享链接召唤小伙伴前来助力，点亮全部图标即可获得奖励！</span></p>
          <p><span class="he">2</span><span>前来助力的好友要拥有GT电娱时代平台账号（仅限手机号注册）。</span></p>
          <p><span class="he">3</span><span>好友需在gt官网将个人信息地址需改为同城。</span></p>
      </div>
      <img style="width: 3.32rem;margin-top: 0.4rem;" src="/static/img/active/active_1_2/shijian@2x(2).png" >
      <div class="pul" @click="committ"></div>
      <img style="width: 1.12rem;position: absolute;right: 0.1rem;bottom: 1.96rem;" src="/static/img/active/active_1_2/ren@2x.png" >
      <img style="width: 1.98rem;margin-top: 0.9rem;margin-left: 0.1rem;" src="/static/img/active/active_1_2/beer@2x.png" >
      <div style="color: #fff;text-align: center;width: 100%;position: absolute;bottom: 0.3rem;left: 0;font-size: 12px;">
        <p>本活动最终解释权归GT电娱时代所有</p>
        <p style="margin-top:0.1rem">©2017 电娱时代 上海动娱网络科技有限公司 <br>沪ICP备15050271号-2</p>
      </div>
    </div> 
    <div v-show="toTop" class="gotop" @click="gotop"></div>
    <div v-show="tan" class="cutmsg" :class="tan ? 'feomCss': ''"  @touchmove.prevent>
      <div class="close" @click="tan = false"></div>
      <div class="nav"> 
          <span :class="active=='1'? 'aa': ''" @click = "active = '1'">城市介绍</span>
          <span :class="active=='2'? 'aa': ''" @click = "active = '2'">球星介绍</span>
      </div>  
      <mt-tab-container v-model="active">
        <mt-tab-container-item id="1">
          <p>城市介绍：</p>
          <span>{{tanData.citydesc}}</span>
          <p>景点介绍：</p>
          <span>{{tanData.spotdesc}}</span>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <p>球星介绍：</p>
          <span>{{tanData.stardesc}}</span>
          
        </mt-tab-container-item>
      </mt-tab-container>
      <div v-if="thisaddr" class="thisaddr">
        <p>共&nbsp;{{thisaddr.count}}&nbsp;位用户到达该城市</p>
        <div v-if="thisaddr.list">
          <img v-for="(i,index) in thisaddr.list" @click="$router.push({ name: 'othersIndex',query: { uid: i.gt_id}})" :src="i.avatar" v-if="index<5">
        </div>
      </div> 
    </div>
    <div v-if="isAnswer" class="Answer" :class="isAnswer ? 'feomCss': ''" @touchmove.prevent>
      <img style="width: 2.75rem;margin-top: 0.28rem;margin-bottom: 0.3rem;" src="/static/img/active/active_1_2/ziti@2x.png">
      <div v-if="dati" class="ref">
        <b>游戏规则</b> 
        <p>1.此活动一共5题；</p>
        <p>2.在90秒内总共答对5题即可获得游戏奖励；</p>
        <p>3.回答正确将进入下一题；</p>
        <p>4.回答错误任可继续答题，答题完成后将获得参与奖；</p>
      </div>
      <div v-if="!dati && !isaaa" class="Answer_a">
        <div class="Answer_d">{{s}}s</div>
        <mt-tab-container v-model="active_a" style="color: #000">
          <mt-tab-container-item v-for="(item,index) in getQuestion" :id="String(index+1)" :key="index">
            <span>{{index+1}}</span>
            <div style="text-align: left;margin-top: 0.1rem;font-weight: bold;padding:0 0.18rem;font-size: 15px;">
              {{item.title}}
            </div>
            <div>
              <mt-radio v-model="value" :options="item.answer" align="left"></mt-radio>
            </div>
          </mt-tab-container-item>
         
        </mt-tab-container>
        <div v-if="out" class="out">
          <p>抱歉，您已落榜</p>
          <div>
            <img @click="out =false;err = false" src="/static/img/active/active_1_2/jixu@2x.png" alt="">
            <img @click="isAnswer =false" src="/static/img/active/active_1_2/likai@2x.png" alt="">
          </div>
        </div>
      </div>
      <div v-if="isaaa" class="Answer_c" style="padding-top: 0.17rem; ">
        <p>您的回答</p>
        <p v-if ="err" style="font-size: 18px;font-weight: bold;">答对{{errmsg.res}}道题</p>
        <p v-else style="font-size: 18px;font-weight: bold;">全部正确</p>
        <div v-if="!err" style="margin-top: 0.38rem;color: #000;font-size: 14px;">
          <p style="line-height: 0.3rem;">恭喜获得“<span style="color: #f56a0a">{{errmsg}}</span>”</p>
          <p>请到“我的礼物”查看、兑换</p> 
        </div>
        <div v-else style="margin-top: 0.38rem;color: #000;font-size: 14px;">
          <p style="line-height: 0.3rem;">{{errmsg.msg}}</p>
        </div>
      </div>
      <div v-if="isaaa" style="margin-top: 0.35rem" class="aimg">
        <img @click="isAnswer = false" src="/static/img/active/active_1_2/quxiao@2x.png" alt="">
        <img @click="$router.push('/vip/gift')" src="/static/img/active/active_1_2/qianwang@2x.png" alt="">
      </div>
      <img @click="openAnswer" style="width: 1.57rem;margin-top:0.27rem;" v-show="dati" src="/static/img/active/active_1_2/btn_dati@2x.png" alt=""><!-- 开始答题 -->
      <img @click="nextopic" style="width: 1.57rem;margin-top:0.27rem;" v-show="!dati && !isaaa && !err"src="/static/img/active/active_1_2/xiayiti@2x.png" alt=""><!-- 下一题 -->
    </div>
    <exchange  style="position: fixed;" :islook="success" :type="jifen" v-on:isclose="close" :tit="succesSrc"></exchange>
    <div style="position: fixed;" v-show="mask" @touchmove.prevent class="mask"></div>
  </div>
</template>

<script>
import activeExchange from '../../components/activeExchange'
import { Toast,Indicator } from 'mint-ui'
import { Radio } from 'mint-ui';
import Vue from 'vue'
import Json from '../../../static/json/board.json'
Vue.component(Radio.name, Radio);
export default {
  data (){
    return {
      jifen: false,
      Json: Json,
      isaaa: false,
      usermsg: null,
      tigerlist:[],
      img:[
      '/static/img/active/active_1_2/gt7@2x.png',
      '/static/img/active/active_1_2/gt3@2x.png',
      '/static/img/active/active_1_2/gt4@2x.png',
      '/static/img/active/active_1_2/gt6@2x.png',
      '/static/img/active/active_1_2/gt1@2x.png',
      '/static/img/active/active_1_2/gt5@2x.png',
      '/static/img/active/active_1_2/gt8@2x.png',
      '/static/img/active/active_1_2/gt2@2x.png',
      ],
      imgs:['77','78','80','81','79','82','83','76'],
      edg:{
        one:0,
        two: 0,
        tree: 0
      },
      success: false,
      succesSrc:{
      },
      mask: false,
      rotate: true,
      toTop: true,
      dataTimer: null,
      active: "1",
      endo: {
        goldenball: 0,
        silverball: 0
      },
      tan: false,
      ging: 1,
      left: 0,
      Answer_cen: false,
      active_a: '1',
      s: '00',
      value: '',
      isAnswer: false,
      getQuestion: [],
      dati: true,
      err: false,
      out: false,
      Guessinglist:[],
      errmsg: '',
      lucky: null,
      tanData: [],
      thisaddr:null,
      nulclick: true,
      nuclic: true,
      isleft: true,
      maxnum : 0
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
     window.onscroll = ()=>{ 
          let curHeight = document.documentElement.scrollTop || document.body.scrollTop;  // 得到当前高度  
          let viewHeight = document.documentElement.clientHeight; 
          if (curHeight > viewHeight + 100) {  
            this.toTop = true;
          }else this.toTop = false
      };
      this.getguesslist()
      this.$axios.post('/',{method:'worldcup.lottery.tigercount'}).then((res) => {//可抽奖记数
        if(res.data.status == 0){
         this.endo = res.data.data
        }
      })
      this.$axios.post('/',{method:'worldcup.board.userlocation'}).then((res) => {
        if(res.data.status == 0){
          this.maxnum = Number(res.data.data.data.location.self)
          let dom = this.$refs.roll
          this.lucky = res.data.data.data
          setTimeout(()=>{
            this.left = 145+(this.maxnum-1)*107
            dom.scrollLeft = 145+(this.maxnum-1)*107
          },2000)
        }else Toast(res.data.msg)
      })
      //this.$refs.gif.style.animationPlayState = "paused"
      this.$axios.post('/',{method:'worldcup.lottery.tigerlist'}).then( (res) => {
        if(res.data.status == 0){
         this.tigerlist = res.data.data
        }
      })
  },
  methods: {
   quit(){
      this.$axios.post('/',{method:'usercenter.login.logout'}).then((res) => {
        if(res.data.status == 0){
          this.deg = 0;
          location.reload()
          localStorage.clear();
          Toast('退出账号成功')
        }else Toast(res.data.msg)
      })
    },
    committ(){
      this.$router.push('/active_1/city')
    },
    detaroll(index){
      this.tan = true
      this.tanData = Json[index]
      this.$axios.post('/',{method:'worldcup.board.userlist',p:'1',pagesize: '21',location: index}).then( (res) => {
        if(res.data.status == 0){
          this.thisaddr = res.data.data.data
        }
      })
    },
    commitGuess(id,res1,res2){
      this.$axios.post('/',{method:'action.guess.addguess',cid:id,res1: res1,res2: res2}).then( (res) => {
        if(res.data.status == 0){
          Toast('提交成功')
          this.getguesslist()
        }else Toast(res.data.msg)
      })
    },
    getguesslist(){
      this.$axios.post('/',{method:'action.guess.guesslist'}).then( (res) => {
        if(res.data.status == 0){
         this.Guessinglist = res.data.data
        }
      })
    },
   openAnswer(){
    let ss = 59
    if(sell){
      clearInterval(sell)
    }
    this.dati = false
    this.isaaa = false
    this.err = false
    this.iAnswer()
    let sell = setInterval(()=>{
      this.s = ss-=1
      if(ss<10){
        this.s = '0' + this.s
      }
      if(ss==0){
        clearInterval(sell)
      }
    },1000)
   },
   nextopic(){
    if(!this.value){
      Toast('选择不能为空')
      return
    }
    this.active_a = Number(this.active_a)+1
    if(this.active_a == '6'){
      this.isaaa = true
    }
    this.$axios.post('/',{method:'worldcup.question.pushAnswer',ques_id:this.getQuestion[Number(this.active_a)-2].id,ques_ans:this.value}).then( (res) => {
      this.value = ''
      if(res.data.status == 0){
        if (this.isaaa) {
          this.errmsg = res.data.data.data.good_name
        }
        this.value = ''
      }else{
        this.out = true
        this.err = true
        if (this.isaaa) {
          let dat = JSON.parse(res.data.msg)
          this.errmsg = dat
        }      
      }
    })
    this.active_a = String(this.active_a)
   },
   gifinf(){
    this.ging = 0;
    let dom = this.$refs.roll
    if(this.isleft){
      this.isleft = false
      this.$refs.gif.style.transform = 'translateX(125px)'
    }
    this.nuclic = false
    this.$axios.post('/',{method:'worldcup.board.board'}).then( (res) => {
      if(res.data.status == 0){
        let tddat = res.data.data.data.sum
        //this.$refs.gif.style.animationPlayState = "running"
        setTimeout(()=>{
           this.maxnum = tddat
           this.ging = res.data.data.data.stepnum
           let ste = setInterval(()=>{
            dom.scrollLeft = this.left+=5
            if(this.left>145 + (tddat-1)*107){
              //this.$refs.gif.style.animationPlayState = "paused"
              clearInterval(ste)
            }
          },5)
        },3000)
        setTimeout(()=>{
          this.jifen = false
          switch(res.data.data.data.type){
            case 1:
              this.jifen = true
              this.succesSrc = res.data.data.data.num + '   积分'
              this.success = true
              this.mask = true
              break;
            case 2:
              this.isAnswer = true
              this.isaaa = false
              this.dati= true
              this.out = false
              this.active_a = '1'
              this.ss = '00'
              break;
          }
          this.nuclic = true
        },3500)
     }else Toast(res.data.msg)
    })
   },
   iAnswer(){
     this.$axios.post('/',{method:'worldcup.question.getQuestion'}).then( (res) => {
      if(res.data.status == 0){
        for(let i =0; i<res.data.data.length;i++){
           let newarr = []
           Object.keys(res.data.data[i].answer).forEach((key,index)=>{
            newarr[index] = {
              label: res.data.data[i].answer[key],
              value: key
            }
          });
          res.data.data[i].answer = newarr
        }
        this.getQuestion = res.data.data
      }
     })
   },
   close(){
    this.success = false
    this.mask = false
   },
   tiger(){
      this.rotate = false
      this.edg.one = 0
      this.edg.two = 0
      this.edg.tree =0
      let is_ble = '0'
      if(this.endo.goldenball == '0' && this.endo.silverball=="0"){
        Toast('抽奖次数已用完~')
        return
      }
      if(this.endo.goldenball){
        is_ble = '1'
        this.endo.goldenball = Number(this.endo.goldenball)-1
      }else{
        this.endo.silverball = Number(this.endo.silverball)-1
      }
       Indicator.open();
       this.nulclick = false
      this.$axios.post('/',{method:'worldcup.lottery.tiger',is_double: is_ble}).then( (res) => {
        Indicator.close();
         this.rotate = true
         if(res.data.status == 0){
          let int = this.imgs.indexOf(res.data.data.key)+1;//res.data.data.key
          this.edg.one = 360 + 45*int 
          this.edg.two = 720 + 45*int
          this.edg.tree =1080 + 45*int
          setTimeout(()=>{
            this.jifen = false
            if(int == 7){
              this.jifen = true
            }
            this.succesSrc = res.data.data.name
            this.success = true
            this.mask = true
            this.nulclick = true
          }, 4200)
        }else Toast(res.data.msg)
      })
    },
    gotop(){ 
      var tar_y =0
      var timer = setTimeout(()=>{
          var current_y = document.documentElement.scrollTop || document.body.scrollTop;  // 得到当前高度   
          let step = 40
          var dist = Math.floor((tar_y-current_y)/step)  
          var next_y = current_y+dist  
          if(next_y>tar_y){  
              window.scrollTo(0,next_y)  
              this.gotop(tar_y)  
          }  
          else{  
              window.scrollTo(0,tar_y)  
          }  
      },1)  
    }
  },
  components: {
    exchange: activeExchange,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"> 
  .active1_2_page{
     background-image: url(/static/img/active/active_1_2/bg_02.png);
     background-size: 100%;
     .gotop{
      position: fixed;bottom: 0.8rem;right: 0.2rem;
      width: 0.42rem;height: 0.42rem;
      background-image: url(/static/img/active/active_1_2/fanhui@2x.png);
      background-repeat: no-repeat;background-size: 100%;
     }
    .div_cen_1{
      width: 100%;height: 3.18rem;position: relative;
      >img{
        width: 100%;margin-top:0.25rem;
      }
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
        left: 0;bottom: 0.25rem;color: #fff;font-size: 14px;
        padding: 0 10px;
      }
    }
    .div_cen_2{
      .dd_2{
        text-align: center;
        margin-top:0.3rem;
        >img{
          width: 1.99rem;
        }
        >div{
          margin-top:0.2rem;
          >img{
            width: 1.78rem;
          }
          
        }
      }
      
      .tedy{
        width: 3.45rem;margin: 0 auto;margin-top: 0.18rem;
        background: rgba(0,0,0,.3);border-radius: 8px;
        padding: 0.15rem 0.07rem;color: #fff;
        >div{
          display: flex;justify-content:space-between;
          min-width: 0.6rem;text-align: center;
          >img{
            width: 0.44rem;margin-top:0.05rem;
          }
        }
        >div:first-child{
          justify-content: flex-start;
          display: flex;flex-direction: row;
        }
      }
    }
    .Answer{
      height: 100vh;width: 100vw;
      text-align: center;color: #fff;
      position: fixed;left:0;top: 0;
      background: rgba(84,184,70,.9);
      .ref{
        text-align: left;
        padding: 0 0.33rem;
        b{font-size: 16px;margin: 0.1rem 0;display: block;}
        >p{
          line-height: 0.3rem;
        }
      }
      .aimg{
        width: 2.46rem;margin: 0 auto;
        img{
          width: 1.1rem;height: 0.42rem;
        }
        display: flex;justify-content:space-between;
      }
    }
    .Answer_c{
      width: 3.54rem;height: 2.21rem;
      background-image: url(/static/img/active/active_1_2/bg2@2x.png);
      background-size: 100%;margin: 0 auto;
      background-repeat: no-repeat;
    }
    .Answer_a{
      width: 3.6rem;height: 2rem;
      background-image: url(/static/img/active/active_1_2/dati@2x.png);
      background-size: 100%;margin: 0 auto;
      background-repeat: no-repeat;
      .mint-tab-container-item{
        padding: 0;
        >span{
          text-align: center;line-height: 0.4rem;color: #c65607;font-size: 24px;font-weight: bold;
        }
        .mint-radiolist-title{
          margin: 0;
        }
        .mint-radiolist{
          display: flex;flex-direction: row; flex-wrap: wrap;
          >a{
            width: 50%;background: rgba(0,0,0,0);
            .mint-radiolist-label{
              text-align: left;font-size: 12px;
            }
          }
        }
      }
      .out{
        width: 2.5rem;height: 1.46rem;padding-top:0.5rem;position: absolute;
        left: 0.58rem;top: 3.1rem;
        background-image:  url(/static/img/active/active_1_2/shiwu@2x.png);
        background-origin: no-repeat;background-size: 100%;
         p{
            color: #000;
          }
        >div{
          padding: 0.3rem;
          display: flex;justify-content:space-between;
          >img{
            width: 0.86rem;height: 0.4rem;
          }
        }
      }
    }
    .Answer_d{
      position: absolute;right: 0.12rem;top: 2.4rem;
      background-image: url(/static/img/active/active_1_2/time@2x.png);
      background-repeat: no-repeat; background-size: 100%;
      width: 0.86rem;height: 0.45rem;font-size:30px;letter-spacing: 0.06rem;
      letter-spacing: 0.12rem;line-height: 0.45rem;
      text-indent: 0.06rem;
    }
    .game{
      .sanzi{
        width: 3.45rem;margin: 0 auto;
        margin-top: 0.18rem;position: relative;
        display: flex; flex-direction: row;
        >div:first-child{
          width:1.9rem;font-size: 18px;
          height: 1.1remrem;margin-right: 0.4rem;
          padding: 0.15rem 0.12rem;
          border-radius: 12px;
          color: #fff;font-size: 12px;
          border: 1px dashed #ddd;
          p{
            line-height: 0.2rem;
          }
        }
        img{
          width: 0.74rem;
        }
      }
      .game_a{
        padding-left: 7px;overflow: auto;
        margin-top: 0.75rem;
        display: flex;flex-direction: row;
        .roll{
          align-items:center;margin-left:7px;
          display: flex;flex-direction: row;
          >div{
            position: relative;
            width: 100px; height: 100px;border-radius: 6px;
            padding: 5px;margin-left: 7px;
            border: 1px solid #3b9e27;
            background: rgba(0,0,0,.5);
            >img{
             position: absolute; width: 90%;transition: opacity 0.5s;
            }
          }
        }
      }
      .rengif{
          width: 0.55rem;height: 1.15rem;background-size: 100%;
          transition: all 3s;
          animation: heartburst 0.5s infinite both;
        }
    }
    .div_cen_3{
      .div_1{
        text-align: center;
        img{
          width: 1.25rem;margin-top: 0.55rem;margin-bottom: 0.15rem;
        }
        .bul>b{
          display: block;
          font-size:23px;margin-bottom: 0.1rem;
        }
      }
      .div_2{
        text-align: center;color: #fff;
        
        >div{
          padding: 0.15rem 0;width: 3.7rem;
          margin: 0 auto;background: rgba(0,0,0,0.3);
          border-radius: 12px;margin-top: 0.21rem;
          >p{
            font-size: 18px;
          }
          .gr{
            margin: 0.1rem 0;
            display: flex;justify-content:center;
            >img{
              width: 0.29rem;height: 0.41rem;
              margin: 0 0.1rem;
            }
            >div{
              width: 1.6rem;
              img{
                height: 0.41rem;border: 1px solid #fff;
              }
            }
          }
          .competition{
            width: 1.78rem;margin: 0.12rem auto;
            margin-top: 0.45rem;
            display: flex;justify-content:space-between;
            img{
              width: 0.55rem;height: 0.27rem;
            }
          }
          .score{
            width: 1.86rem;margin: 0 auto;
            display:flex;justify-content:space-between;
            >input{
              display: block;width: 0.64rem;height: 0.45rem;color: #000;
              line-height: 0.45rem;background-color: #fff;
              font-size: 18px;text-align:center;border-radius: 0;
            }
            p{
              line-height: 0.45rem;
            }
          }
        }
        
      }
    }
    .gin_game{
      width: 100%;height: 8.16rem;text-align: center;
      .coujiang{
        height: 4.02rem;background-image: url(/static/img/active/active_1_2/jiqi@2x.png);
        background-repeat: no-repeat;background-size: 100%;
        position: relative;
        .p_list{
          width: 3.06rem;
          position: absolute; left: 0.25rem;bottom: 0.3rem;
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
             position: absolute; left: 0.31rem;bottom: 1.88rem;
             >span{
              position: absolute;font-size: 17px;color: #fff;
              line-height: 0.33rem;
             }
            .isap{
              left: 0.53rem; top:0;
             }
            .isap2{
              right: 0.14rem;top:0;
             }
             img{
              width: 1.63rem;height: 0.3rem;
             }
          }
          .butt{
            position: absolute; right: 0.48rem;bottom: 1.88rem;
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
          position: absolute; left: 0.3rem;top: 0.75rem;
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
    }
    .div_cen_4{
      margin-top: 0.5rem;height: 8.36rem;
      text-align: center;position: relative;
      .pul{
        width: 1.73rem;height: 0.4rem;margin: 0 auto;
        margin-top: 0.45rem;
        background-image: url(/static/img/active/active_1_2/baom@2x.png);
        background-size: 100%;background-repeat: no-repeat;
      }
    }
    .bul{
         color: #fff;font-size: 12px;border: 1px dashed #ddd;
         margin: 0 auto;margin-top: 0.1rem;text-align: left;
         width: 3.45rem;padding: 0.15rem;border-radius: 12px;
         >p{
         line-height: 25px;align-items: flex-start;
         display: inline-flex;flex-direction: row;
         span{
          width: 2.78rem;
         }
        .he{
          color: #0377bc;margin-top: 0.06rem;
          margin-right: 0.15rem; 
          width: 0.14rem;height: 0.14rem;border-radius: 50%;
          background-color: #fff;font-size: 9px;
          text-align: center;line-height: 0.18rem;
        }
       }
      }
      
      .cutmsg{
        position: fixed;padding: 0.14rem;
        top: 12%;left: 0.14rem;color: #fff;
        width: 3.45rem;height: 5rem;
        background: rgba(0,0,0,.8);
        border: 1px solid #fff;border-radius: 6px;
        .mint-tab-container-item{
          min-height: 3.58rem;overflow: auto;
        }
        .nav{
          span{
            font-weight: bold;padding: 1px 3px;
            display: inline-block;border: 1px solid #fff;
            border-radius: 5px;
          }
          .aa{
            background-color: #fff;color: rgb(0,0,0);
          }

        }
        .close{
            display: inline-block;
            position: absolute;
            right: 0.22rem;
            top: 0.17rem;
            width: 30px;
            height: 30px;
            background-image: url(/static/img/vip/common_icon_close@2x.png);
            background-size: 100%;
          }
          .thisaddr{
            >p{
              padding: 0.1rem 0;font-size: 15px;
            }
            >div{
              overflow: auto;
              display: flex; flex-direction: row;
              >img{
                width: 0.4rem;height: 0.4rem;
                border-radius: 50%;margin-right: 0.2rem;
              }
            }
          }
        .mint-tab-container-item{
          padding: 0;
          p{
            padding: 0.1rem 0;font-size: 15px;
          }
        }
      }

  }
 @keyframes heartburst {
   0%{
      background-image: url(/static/img/active/active_1_2/人1.png);
   }
   33% {
      background-image: url(/static/img/active/active_1_2/人2.png);
   }
   66% {
      background-image: url(/static/img/active/active_1_2/人3.png);
   }
   100%{
      background-image: url(/static/img/active/active_1_2/人1.png);
   }
 }
 @-webkit-keyframes heartburst {
   0%{
      background-image: url(/static/img/active/active_1_2/人1.png);
   }
   33% {
      background-image: url(/static/img/active/active_1_2/人2.png);
   }
   66% {
      background-image: url(/static/img/active/active_1_2/人3.png);
   }
   100%{
      background-image: url(/static/img/active/active_1_2/人1.png);
   }
 }
 @-o-keyframes heartburst {
   0%{
      background-image: url(/static/img/active/active_1_2/人1.png);
   }
   33% {
      background-image: url(/static/img/active/active_1_2/人2.png);
   }
   66% {
      background-image: url(/static/img/active/active_1_2/人3.png);
   }
   100%{
      background-image: url(/static/img/active/active_1_2/人1.png);
   }
 }
 @-moz-keyframes heartburst {
   0%{
      background-image: url(/static/img/active/active_1_2/人1.png);
   }
   33% {
      background-image: url(/static/img/active/active_1_2/人2.png);
   }
   66% {
      background-image: url(/static/img/active/active_1_2/人3.png);
   }
   100%{
      background-image: url(/static/img/active/active_1_2/人1.png);
   }
 }
 @keyframes heartburst {
   0%{
      background-image: url(/static/img/active/active_1_2/人1.png);
   }
   33% {
      background-image: url(/static/img/active/active_1_2/人2.png);
   }
   66% {
      background-image: url(/static/img/active/active_1_2/人3.png);
   }
   100%{
      background-image: url(/static/img/active/active_1_2/人1.png);
   }
 }

</style>
