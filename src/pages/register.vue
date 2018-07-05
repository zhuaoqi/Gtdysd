<template>
  <div class="logo_page">
    <div class="from_p">
          <input type="txet" v-model="user.name"  :placeholder="placeholder" name="">
          <div>
            <input type="number" placeholder="验证码" v-model="user.code">
            <button class="getcode" type="button" ref="button" @click="getcode">获取验证码</button>
          </div>
          <input type="password" placeholder="请输入密码 (6-24位字符)" v-model="user.password">
        </div>
        <mt-button style="margin-top:16px;font-family: 'Microsoft YaHei'" type="primary" size="large" @click="register" :disabled='gobutt '>注册并登陆</mt-button>
  </div>
</template>

<script>
import md5 from 'md5'
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui'
 import { deepClone } from '../assets/js/g.js'
export default {
  data (){
    return {
     user: {
      name: '',
      password: '',
      code: ''
     },
     gobutt: true,
     placeholder: "请输入手机号/邮箱"
    }
  },
  created(){
    if(this.$route.query.name){
        this.placeholder = '请输入手机号'
      }
    this.$store.commit('selechange',4)
    this.$store.commit('_change',{
      _logo   : false,
      _title  : '注册',
      _search : false,
      _topshow: true,
      _msg    : false,
      _bottshow: true,
      _regain : false,
      _back   : true
    })
  },
  methods: {
    goto(){
      this.$router.goBack()
    },
    getcode(){
      let dom = this.$refs.button;
      let tim = 59;let type = 0  
      let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      let em = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (myreg.test(this.user.name))type = 1; 
      if (em.test(this.user.name))type = 2; 
      if(type == 0){
        Toast('手机号码或邮箱格式错误')
        return
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
      if(type == 1){
        this.$axios.post('/',{method:'auth.code.smssend',type: 1,mobile: this.user.name}).then((res)=>{
            if(res.data.status == 0){
              Toast('验证码发送成功')
            }
        })
      }else{
        this.$axios.post('/',{method:'auth.code.smtpsend',type: 1,email: this.user.name}).then((res)=>{
            if(res.data.status == 0){
              Toast('验证码发送成功')
            }
        })
      }
      
    },
    register(){
      if(this.user.name == '' || this.user.password == '' || this.user.code == ''){
        return false
      }
      let _this = this;
      let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      let ty;
      if (!myreg.test(_this.user.name)){ty = 2} else { ty = 1}
      Indicator.open();
      let data = {
        type: ty,
        access: _this.user.name,
        password: md5(md5("SMARTSCENE." + _this.user.password)),
        code: _this.user.code,
        method: 'usercenter.login.add' 
      }
      if(this.$route.query.name){
        data.method = 'usercenter.login.addicode' 
        data.icode = this.$route.query.name
      }
      let tdeepData = deepClone(data)
      this.$axios.post('/',tdeepData).then((res)=>{
          Indicator.close();
          if(res.data.status == 0){
            localStorage.setItem('to_ken', res.data.data.token);
            localStorage.setItem('is_login', true);
            localStorage.setItem('user_info', JSON.stringify( res.data.data.user_info));
            Toast({
              message: '注册成功',
              iconClass: 'icon-success',
              duration: 1500
            });
             setTimeout(()=>{
               _this.$router.push({ name: 'appIndex',query: { type: true}})
            },2000)
          }else{
             _this.user.password = '';
            Toast(res.data.msg)
          } 
          
      })
    }
  },
  watch:{
    user:{//深度监听，可监听到对象、数组的变化
            handler(val, oldVal){
                if(!this.user.name == '' && !this.user.password == '' && !this.user.code == ''){
                  this.gobutt = false
                }else this.gobutt = true
            },
            deep:true
        }
  },
  components: {

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
