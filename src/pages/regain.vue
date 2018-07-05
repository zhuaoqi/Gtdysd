<template>
  <div class="logo_page">
    <mt-navbar v-model="sel">
      <mt-tab-item style="margin-right:10px;" id="1">手机找回</mt-tab-item>
      <mt-tab-item style="margin-left:10px;" id="2">邮箱找回</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="sel">
      <mt-tab-container-item style="padding-left:0" id="1">
        <div class="from_p">
          <input type="number" placeholder="请输入你的手机号" v-model="phone.tel" name="">
          <div>
            <input type="number" placeholder="验证码" v-model="phone.code">
            <button class="getcode" type="button" ref='button0' @click="getcode(0)">获取验证码</button>
          </div>
          <input type="password" placeholder="设置新密码 (6-24位字符)" v-model="phone.lodpass">
          <input type="password" placeholder="确认新密码 (6-24位字符)" v-model="phone.newpass">
        </div>
        <mt-button style="margin-top:16px;font-family: 'Microsoft YaHei'" type="primary" size="large" :disabled="gobutt" @click="send(0)">完成</mt-button>
      </mt-tab-container-item>
      <mt-tab-container-item style="padding-left:0" id="2">
        <div class="from_p">
          <input type="email" placeholder="强输入你的邮箱号" v-model="email.tel">
          <div>
            <input type="number" placeholder="验证码" v-model="email.code">
            <button class="getcode" type="button" ref='button1' @click="getcode(1)">获取验证码</button>
          </div> 
          <input type="password" placeholder="设置新密码 (6-24位字符)" v-model="email.lodpass">
          <input type="password" placeholder="确认新密码 (6-24位字符)" v-model="email.newpass">
        </div>
        <mt-button style="margin-top:16px;font-family: 'Microsoft YaHei'" type="primary" size="large" :disabled="gobutt1" @click="send(1)">完成</mt-button>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import md5 from 'md5'
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui'
export default {
  data (){
    return {
      sel: "1",
      phone:{
        tel:'',
        code: '',
        lodpass:'',
        newpass:''
      },
      email:{
        tel:'',
        code: '',
        lodpass:'',
        newpass:''
      },
      gobutt: true,
      gobutt1: true
    }
  },
  created(){
    this.$store.commit('selechange',4)
    this.$store.commit('_change',{
      _logo   : false,
      _title  : '找回密码',
      _search : false,
      _topshow: true,
      _msg    : false,
      _bottshow: false,
      _regain : false,
      _back   : true
    })
  },
  methods: {
    goto(){
      this.$router.goBack()
    },
    getcode(type){
      let dom = this.$refs['button'+type];
      let tim = 59;
      let _this = this
      let myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      let em = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if(type == 0){
        if (!myreg.test(_this.phone.tel)){Toast('手机号码格式错误');return false}
        this.$axios.post('/',{method:'auth.code.smssend',type: 2,mobile: _this.phone.tel}).then(function(res){
            if(res.data.status == 0){
              Toast('验证码发送成功')
            }else Toast(res.data.msg)
            
        }).catch(function(err){
           Toast(err.data.msg)
           _this.phone.tel = ''
        })
      }else if(type == 1){
        if (!em.test(_this.email.tel)){Toast('邮箱格式错误');return false}
        this.$axios.post('/',{method:'auth.code.smtpsend',type: 2,email: _this.email.tel}).then(function(res){
            Toast(res.data.msg)
        }).catch(function(err){
          Toast('未知错误')
           _this.email.tel = ''
        })
      }
      dom.setAttribute('disabled', true)
      dom.innerText = 60 + '秒后重试'
      let settime = setInterval(()=>{
         dom.innerText = (tim--) + '秒后重试'
         if(tim == 0){
          clearTimeout(settime)
          dom.removeAttribute('disabled')
          dom.innerText ='获取验证码'
          dom.style.backgroundColor = '#e65400'
         } 
      },1000)
      dom.style.backgroundColor = '#dcdcdc'
    },
    send(type){
      let name,pass,codea;
      let _this = this
      switch (type){
        case 0:
          name = _this.phone.tel
          pass = md5(md5("SMARTSCENE." + _this.phone.newpass))
          codea = _this.phone.code
          if(_this.phone.lodpass != _this.phone.newpass){
            Toast('输入的密码不一致')
            return false
          }
          break
        case 1:
          name = _this.email.code
          pass = md5(md5("SMARTSCENE." + _this.email.newpass))
          codea = _this.email.tel
          if(_this.email.lodpass != _this.email.newpass){
            Toast('输入的密码不一致')
            return false
          }
          break
      }
      Indicator.open();
      this.$axios.post('/',{method:'usercenter.user.checkForget',auth: name,passone:pass,code:codea}).then(function(res){
          Indicator.close();
          if(res.data.status == 0){
            Toast({
              message: '密码更改成功',
              iconClass: 'icon-success',
              duration: 1500
            });
            setTimeout(()=>{
                _this.$router.push('/logo')
            },2000)
          }else Toast(res.data.msg)
      }).catch(function(err){
          Toast('未知错误')
           _this.email.tel = ''
      })
    }
  },
  computed: {

  },
  watch:{
    phone:{//深度监听，可监听到对象、数组的变化
        handler(val, oldVal){
            if(!this.phone.tel == '' && !this.phone.code == '' && !this.phone.lodpass == '' && !this.phone.newpass == ''){
              this.gobutt = false
            }else this.gobutt = true
        },
        deep:true
    },
    email:{//深度监听，可监听到对象、数组的变化
        handler(val, oldVal){
           if(!this.email.tel == '' && !this.email.code == '' && !this.email.lodpass == '' && !this.email.newpass == ''){
              this.gobutt1 = false
            }else this.gobutt1 = true
        },
        deep:true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"> 
  .logo_page{
    padding:0.31rem 0.27rem 0 0.27rem;
    .mint-navbar .mint-tab-item {
      padding:13px 0;
    }
    .mint-tab-item-label{
      font-size:16px;
      color:#333;
    }
    .mint-navbar .mint-tab-item.is-selected:after{
          content: '';
          width: 0.9rem;
          height: 0.03rem;
          position: absolute;
          bottom: 0px;
          left: 0.3rem;
          background: #e65400;
          border-radius: 0.02rem;
    }
  }
  .from_p{
    margin-top:8px;
    >div{
      position: relative;
    }
    .getcode{
      position: absolute;
      right:0; top: 6px;;
    }
    input{
      margin: 0.05rem 0;
    }
  }
</style>

