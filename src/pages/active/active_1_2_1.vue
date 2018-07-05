<template>
  <div class="active1_2_1_page">
    <div class="div_cen_1">
      <div class="goindex" @click="$router.push('/active_1/details_2')"></div>
      <img src="/static/img/active/active1_2_1/biaoti@2x.png">
      <p v-if="!usermsg">勇者大人你好， 请<span @click="$router.push('/logo?redirect=%2Factive_1%2Fcity')">【登录】</span></p>
      <p v-else>欢迎您* {{usermsg.nickname}},&nbsp;<span @click="quit">【退出登录】</span></p>
    </div>
    <div class="div_cen_2">
      <img style="width: 1.7rem;position: absolute;left: 0.6rem;top: -0.17rem;" src="/static/img/active/active1_2_1/guize@2x.png">
      <div class="cen">
        <div class="hea"></div>
        <div class="text">
          <p>1.点击下方“发起集结”分享链接召唤小伙伴前来助力，点亮全部图标即可获得价值198元喜力桶装啤酒！</p> 
          <p>2.前来助力的好友需拥有GT电娱时代平台账号（仅限手机号注册）。</p>
          <p>3.好友需在gt官网将个人信息地址需改为同城。</p>
          <img src="/static/img/active/active1_2_1/wenzi@2x.png">
        </div>
      </div>
      <img style="width: 2.35rem;position: absolute;left: 0.8rem;top: 3.31rem;" src="/static/img/active/active1_2_1/biaot@2x.png">
      <div class="cen" style="margin-top: 0.42rem;">
        <div class="hea"></div>

        <!--  邀请人 -->
        <template v-if="!cid"><!-- !cid -->
          <div class="toux">
            <img v-if="isjijie" @click="copey = true; mask = true" style="position: absolute;right: 0.3rem;top: 0.25rem;width: 0.91rem;" src="/static/img/active/active1_2_1/btn_2@2x.png" >
            <div class="toux_s">
              <img :src="usermsg.avatar?usermsg.avatar:'/static/img/active/active1_2_1/touxing@2x.png'">
            </div>
            <p>{{usermsg.nickname}}</p> 
            <div class="selec" @click="!isjijie && selecip()">
              <span v-if="mAddress.length!=0">{{mAddress.join(' ')}}</span>
              <span v-else>请选择你所在的城市{{mAddress}}</span>
            </div>
            <div v-if = "!isjijie" @click="jijie" class="commit" style='background-image:url(/static/img/active/active1_2_1/btn@2x.png)'></div>
            <div v-else @click="count >= 10 && commita()"  class="commit" :style="{'background-image': count >= 10 ? 'url(/static/img/active/active1_2_1/btn_5@2x.png)' : 'url(/static/img/active/active1_2_1/btn_4@2x.png)'}"></div>
          </div>
          <div class="list">
            <ul>
              <li v-for="item in userlist">
                <img :src="item.avatar ? item.avatar : '/static/img/active/active1_2_1/touxing@2x.png'">
                <p>{{item.nickname}}</p>
              </li>
            </ul>
          </div>
        </template>

       <!--  被邀请人 -->
        <template v-else>
          <div class="toux">
            <div class="toux_s">
              <img :src="otheuser.avatar?otheuser.avatar:'/static/img/active/active1_2_1/touxing@2x.png'">
            </div>
            <p>{{otheuser.nickname}}</p> 
            <div class="selec">
              <span>{{cipp.province}}&nbsp;{{cipp.city}}</span>
            </div>
          </div>
          <div class="list">
            <ul>
              <li v-for="item in userlist">
                <img :src="item.avatar ? item.avatar : '/static/img/active/active1_2_1/touxing@2x.png'">
                <p>{{item.nickname}}</p>
                <div v-if="!item" @click="help"></div>
              </li>
            </ul>
          </div>
        </template>
        <img style="width: 3.29rem;margin-top: 0.5rem;margin-bottom: 0.08rem;" src="/static/img/active/active1_2_1/beer@2x.png">
      </div>
      <div style="height: 1.2rem;position: relative;">
        <div style="color: #fff;text-align: center;width: 100%;position: absolute;bottom: 0.3rem;left: 0;font-size: 12px;">
          <p>本活动最终解释权归GT电娱时代所有</p>
          <p style="margin-top:0.1rem">©2017 电娱时代 上海动娱网络科技有限公司 <br>沪ICP备15050271号-2</p>
        </div>
      </div>
    </div>


    <div style="position: fixed;" v-show="mask" @touchmove.prevent class="mask"></div>
    <!-- 分享页面弹框 -->
    <div class="copey"  :class="copey ? 'feomCss': ''" @touchmove.prevent v-show="copey">
      <div class="copeycen" ref="cop" >{{url_push}}</div>
      <p>*如复制不成功，请手动复制</p>
      <button v-clipboard:copy="url_push"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError">复制</button>
    </div>
    <!-- 助力不成功弹框 -->
    <div class="zhuli"  :class="zhuli ? 'feomCss': ''" @touchmove.prevent v-show="zhuli">
      <img style="width: 1.44rem;" src="/static/img/active/active1_2_1/zhuli@2x.png">
      <p>与发起人填写的城市有误<br>是否前往修改？</p>
      <div class="butt">
        <div @click="$route.push('/my/information')"></div>
        <div @click="zhuli= false;mask = false"></div>
      </div>
    </div>
    <!-- 绑定手机号弹框 -->
    <div class="shouji" :class="shouji ? 'feomCss': ''" @touchmove.prevent v-show="shouji">
      <img style="width: 1.44rem;" src="/static/img/active/active1_2_1/bangd@2x.png">
      <p>根据《国家网络安全》规定<br>现需要您配合完成账号实名认证</p>
      <input type="phone" v-model="phone">
      <div class="input">
        <input type="number" v-model="code">
        <button type="button" :class="Verification?'':'isbu'" @click="Verification && getVerification()">获取验证码</button>
      </div>
      <img @click="confio" style="width: 2.07rem;" src="/static/img/active/active1_2_1/btn_sure@2x.png">
    </div>
    <!-- 提交成功弹框 -->
    <div class="chengg" :class="chengg ? 'feomCss': ''" @touchmove.prevent v-show="chengg">
      <img style="width: 1.44rem;" src="/static/img/active/active1_2_1/comm@2x.png">
      <p>需要您前往<br>会员中心“礼物”页面领取奖品<br>确认完毕即可发放奖品。</p>
      <div class="erwei">
        <p>关注电娱时代公众号<br>即可获得更多福利资讯</p>
        <img src="/static/img/active/active1_2_1/erweima@2x.png">
      </div>
      <div class="butt" style="margin-top: 0.1rem;">
        <div @click="$route.push('/vip')"></div>
        <div @click="chengg= false;mask = false"></div>
      </div>
    </div>
    <!-- 二脊联动  -->
    <div class="seleadd" :class="selectAdd?'isselect': ''">
            <div class="weui-picker__hd">
                <div class="weui-picker__action" @click="configa(false)">取消</div> 
                <div class="weui-picker__action" @click="configa(true)">确定</div>
            </div>
            <mt-picker v-show="selectAdd" :slots="myAddressSlots" :visibleIteount="7" @change="onMyAddressChange"></mt-picker>
        </div>
  </div>
</template>

<script>
import { Toast,Indicator } from 'mint-ui'
import VueClipboard from 'vue-clipboard2'
import myaddress from '../../../static/json/address.json'
import base64 from 'js-base64';
export default {
  data (){
    return {
      selectAdd: false,
      Verification: true,
      chengg: false,
      shouji: false,
      zhuli: false,
      mask: false,
      copey: false,
      usermsg: '',
      url_push: '',
      isjijie: false,
      userlist:[],
      phone:'',
      code:'',
      cid: '',
      otheuser: '',
      count: 0,
      mAddress: [],
      Address: [],
      myAddressSlots:[
        {
          flex: 1,
          values: Object.keys(myaddress),  //省份数组
          className: 'slot1',
          textAlign: 'center'
        }, {
          divider: true,
          content: '-',
          className: 'slot2'
        }, {
          flex: 1,
          values: [],
          className: 'slot3',
          textAlign: 'center'
        }
      ],
      cipp:{}
    }
  },
  created(){
    this.$store.commit('_change',{
      _topshow: false,
      _bottshow: false,
    })
    this.cid = this.$route.query.citywide ? base64.Base64.decode(this.$route.query.citywide) : ''
    if(localStorage.getItem("is_login")){
        this.usermsg =  JSON.parse(localStorage.getItem('user_info'));
    }
  },
  mounted(){
    this.$axios.post('/',{method:'member.index.userinfo'}).then( (res) => {
        if(res.data.status == 0){
          if(res.data.data.user_info.province){
            this.$set(this.mAddress,0,res.data.data.user_info.province)
            this.$set(this.mAddress,1,res.data.data.user_info.city)
          }         
        }
      })
    //查询助力情况
   this.getzhuli()
  },
  methods: {
    help(){ //助力
      this.$axios.post('/',{method:'worldcup.citywide.support',c_id: this.cid}).then((res) => {
        if(res.data.status == 0){
          Toast({message: '助力成功',iconClass: 'icon-success',duration: 1500});
        }else if(res.data.status == 203){
          this.shouji = true
          this.mask = true
        }else if(res.data.status == 202){
          this.zhuli = true
          this.mask = true
        }else Toast(res.data.msg)
      })
    },
    getzhuli(){
       this.$axios.post('/',{method:'worldcup.citywide.actiontype',c_id: this.cid}).then( (res) => {
        if(res.data.status == 0){
          this.otheuser = res.data.data
          this.userlist = res.data.data.user
          this.isjijie = res.data.data.id
          this.count = res.data.data.count
          this.cipp.province = res.data.data.province
          this.cipp.city = res.data.data.city
          this.url_push = 'http://11.11.11.106:8080/index.html#/active_1/city?citywide=' + base64.Base64.encode(res.data.data.id)
        }else Toast(res.data.msg)
      })
    },
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
    selecip(){
      this.selectAdd = true; this.mask = true
    },
    onCopy: function (e) {
      this.copey = false; this.mask = false
      Toast('链接已复制粘贴板！ 快去分享吧')
    },
    onError: function (e) {
      this.copey = false; this.mask = false
      Toast('游览器不支持一键复制， 请长按复制')
    },
    onMyAddressChange(picker, values) {
     if(myaddress[values[0]]){  //这个判断类似于v-if的效果（可以不加，但是vue会报错，很不爽）
        picker.setSlotValues(1,Object.keys(myaddress[values[0]])); // Object.keys()会返回一个数组，当前省的数组
        picker.setSlotValues(2,myaddress[values[0]][values[1]]); // 区/县数据就是一个数组
        this.Address = values;
      }
    },
    configa(type){
        this.mask = false
        if (type) {
            this.mAddress = this.Address
            this.selectAdd = false
        }else{
            this.selectAdd = false
            this.Address = ''
        }
    },
    jijie(){
      if(this.mAddress[0] == ''||this.mAddress[1]=='' ){
        Toast('请选择你的城市')
      }
      Indicator.open()
      this.$axios.post('/',{method:'worldcup.citywide.sponsor',province:this.mAddress[0],city: this.mAddress[1]}).then((res) => {
        Indicator.close()
        if(res.data.status == 0){
          this.url_push = 'http://m.gtdysd.com/index.html#/active_1/city?citywide=' + res.data.data
          this.copey = true;
          this.mask = true
        }else if(res.data.status == 205){
          this.shouji = true
          this.mask = true
        }else Toast(res.data.msg)
      })
    },
    getVerification(){ //获取严重呢干
      let myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      if (!myreg.test(this.phone)){
        Toast('手机号码格式错误');return false
      }
      this.Verification = false
      Indicator.open()
      this.$axios.post('/',{method:'worldcup.citywide.sendCode',access:this.phone}).then((res) => {
        Indicator.close()
        if(res.data.status == 0){
          Toast('验证码已发送');
        }else Toast('发送失败')
      })
    },
    confio(){// 绑定手机
      if(this.code == '' || this.phone ==''){
        Toast('请输入验证码或手机号')
        return false
      }
      Indicator.open()
      this.$axios.post('/',{method:'worldcup.citywide.binding',access:this.phone,code: this.code}).then((res) => {
        Indicator.close()
        if(res.data.status == 0){
          this.shouji = false
          this.mask = false
          Toast('绑定成功，请重新发起集结')
        }else if(res.data.status == 204 ){
          this.Verification = true
          Toast(res.data.msg)
        }else Toast(res.data.msg)
      })
    },
    commita(){
      this.$axios.post('/',{method:'worldcup.citywide.endsponsor',c_id: this.isjijie}).then((res) => {
        if(res.data.status == 0){
          this.chengg = true
          this.getzhuli()
        }else Toast(res.data.msg)
      })
    }
  },
  components: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"> 
  .active1_2_1_page{
    background-image: url(/static/img/active/active_1_2/bg_02.png);
    background-size: 100%;
    .div_cen_1{
       width: 100%;height: 3.9rem;position: relative;
       >img{
        width: 100%;
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
      position: relative;
      .cen{
        width: 3.63rem;border: 1px solid #60ca1f;
        border-radius: 3px;text-align: center;
        margin: 0 auto;
        .hea{
          height: 0.45rem;background:rgba(82,188,17,0.5);
          border-bottom: 1px solid #60ca1f;
        }
        .text{
          padding: 0.27rem 0.23rem;background:rgba(82,188,17,0.3);
          color: #fff;line-height: 0.25rem;text-align: left;
          >img{
            width: 3.08rem;margin-top: 0.1rem;
          }
        }
        .toux{
          position: relative;color: #fff;
          .toux_s{
            border-radius: 50%;width: 0.87rem;margin:  0 auto;
            margin-top: 0.32rem;border: 1px solid #60ca1f;
            >img{
              width: 0.87rem;border-radius: 50%;
            }
          }
          .selec{
            width: 2.12rem;height: 0.39rem;color: #fff;
            background: url('/static/img/active/active1_2_1/weizhi@2x.png');
            background-repeat: no-repeat;background-size: 100%;margin:  0 auto;
            margin-top: 0.17rem;
            span{
              display: block;
              line-height: 0.39rem;margin-left: 0.45rem;
            }
          }
          .commit{
            width: 2.24rem;height: 0.51rem;margin:  0 auto;
            background-repeat: no-repeat;background-size: 100%;
            margin-top: 0.12rem;
          }
        }
        .list{
          margin-top: 0.2rem;
          >ul{
            display: flex;flex-wrap:wrap;
            li{
              width: 0.65rem;margin-left: 0.07rem;color: #fff;
              text-align: center;min-height: 1.04rem;
              margin-top: 0.15rem;
              p{
                white-space: nowrap;overflow: hidden;
                text-overflow: ellipsis;
              }
              img{
                width: 100%;border-radius: 50%;
                margin-bottom: 0.18rem;
              }
              >div{
                width: 0.6rem;height: 0.21rem;margin: 0 auto;
                background-image: url('/static/img/active/active1_2_1/btn_6@2x.png');
                background-repeat: no-repeat;background-size: 100%;
              }
            }
            li:first-child{
              margin-left: 0.04rem;
            }
            li:nth-child(6){
              margin-left: 0.04rem;
            }
          }
        }
      }
    }
   .copey{
      position: fixed;top: 25%;left: 0.275rem;
      background-image: url('/static/img/active/active1_2_1/bg@2x.png');
      background-size: 100%;background-repeat: no-repeat;
      z-index: 101;width: 3.2rem;border-radius: 12px;
      >p{
        text-align: center;margin-top: 0.1rem;
        font-size:12px;
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
    .zhuli{
      position: fixed;top: 25%;left: 0.275rem;width: 3.2rem;
      padding: 0.2rem 0.4rem;text-align: center;
      background-color: #fff;border-radius: 12px;z-index: 101;
      >p{
        margin: 0.2rem;font-size: 15px;
      }
    }
    .shouji{
      position: fixed;top: 25%;left: 0.275rem;width: 3.2rem;
      padding: 0.2rem 0.18rem;text-align: center;
      background-color: #fff;border-radius: 12px;z-index: 101;
      >p{
        margin: 0.2rem;font-size: 13px;
      }
      .input{
        display: flex;justify-content:space-between;
        margin-top: 0.15rem;margin-bottom: 0.2rem;
        .isbu{
          background-color: #dadada;
        }
        input{
          width: 63%;
        }
        button{
          background-color: #4bbe25;color: #fff;
          width: 35%;border-radius: 6px;
        }
      }
    }
    .chengg{
      position: fixed;top: 25%;left: 0.275rem;width: 3.2rem;
      padding: 0.2rem 0.28rem;text-align: center;
      background-color: #fff;border-radius: 12px;z-index: 101;
      >p{
        margin: 0.2rem;font-size: 14px;color: #e65400;
        line-height: 0.2rem;
      }
      .erwei{
        display: flex;justify-content:space-between;
        align-items:center;
        p{
          color: #ababab;
        }
        img{
          width: 0.95rem;height:0.93rem;
        }
      }
    }
    .butt{
        display: flex;justify-content:space-between;
        div{
          width: 1.12rem;height: 0.43rem;
          background-repeat: no-repeat;background-size: 100%;
        }
        div:first-child{
          background-image: url('/static/img/active/active1_2_1/btn_qianwang@2x.png');
        }
        div:last-child{
          background-image: url('/static/img/active/active1_2_1/btn_quxiao@2x.png');
        }
      }
    .seleadd{
        position: fixed;width: 100%;
        left: 0; bottom: 0;
        z-index: 5000;background-color: #fff;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        -webkit-transform: translateY(100%);
        transform: translateY(100%);
        -webkit-transition: -webkit-transform .3s;
        transition: -webkit-transform .3s;
        transition: transform .3s;
        transition: transform .3s, -webkit-transform .3s;
        transition: transform .3s,-webkit-transform .3s;
    }
    .isselect{
        -webkit-transform: translateY(0%);
        transform: translateY(0%);
    }
    .picker-items{
        font-size: 14px;
        .picker-slot{
            font-size: 14px;
        }
    }
    .weui-picker__hd {
        display:-webkit-box;display:-webkit-flex;
        display:-ms-flexbox;
        display:flex;padding:12px 15px;
        background-color:#fff;
        position:relative;
        text-align:center;font-size:15px
    }
    .weui-picker__hd:after {
        content:" ";position:absolute;
        left:0;bottom:0;right:0;height:1px;
        border-bottom:1px solid #e5e5e5;
        color:#e5e5e5;-webkit-transform-origin:0 100%;
        transform-origin:0 100%;
        -webkit-transform:scaleY(.5);
        transform:scaleY(.5)}
    .weui-picker__action {
        display:block;-webkit-box-flex:1;
        -webkit-flex:1;-ms-flex:1;
        flex:1;color:#e65400
    }
    .weui-picker__action:first-child {
        text-align:left;color:#888
    }
    .weui-picker__action:last-child {
        text-align:right
    }
 }

</style>
