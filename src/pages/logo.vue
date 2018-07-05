<template>
  <div class="logo_page">
    <div id="user_m">
      <input type="text" autofocus placeholder="请输入你的手机号/邮箱" v-model="user.name" value="" ref="pop">
    </div>
    <input style="margin-top:16px;border-radius:4px;" type="password" autofocus placeholder="请输入你密码" v-model="user.password" value="" ref="pp">
    <mt-button style="margin-top:16px;font-family: 'Microsoft YaHei'" type="primary" size="large" @click="logo" :disabled = 'gobutt'>登录</mt-button>
    <span>
      <router-link to="/regain">忘记密码？</router-link>
    </span>
    <div class="clear"></div>
    <!-- <div class="logo_d2">
      <span class="left"></span>
      <span class="title">其他登录方式</span>
      <span class="right"></span>
    </div> -->
    <!-- <div class="Thirdparty">
        <a @click="third(1)">
          <img src="/static/img/weixinicon@2x.png" alt="">
          <p>微信登录</p>
        </a>
        <a @click="third(2)">
          <img src="/static/img/qqicon@2x.png" alt="">
          <p>QQ登录</p>
        </a>
        <a @click="third(3)">
          <img src="/static/img/weibo@2x.png" alt="">
          <p>微博登录</p>
        </a>
    </div> -->
  </div>
</template>

<script>


import md5 from 'md5'
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui'
export default {
  data (){
    return {
      focu: false,
      gobutt: true,
      user:{
        name: '',
        password: ''
      }
    }
  },
  created(){
    this.$store.commit('selechange',4)
    this.$store.commit('_change',{
      _logo   : false,
      _title  : '登录',
      _search : false,
      _topshow: true,
      _msg    : false,
      _bottshow: true,
      _regain : true,
      _back   : true
    })
  },
  methods: {
   logo(){

    if(this.user.name == '' || this.user.password == ''){
      Toast('请输入用户名和密码')
      return false
    }
    let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    let ty;
    if (!myreg.test(this.user.name)){ty = 2} else { ty = 1}
    Indicator.open();
    this.$axios.post('/',{method:'usercenter.login.login',type: ty,access: this.user.name,password: md5(md5("SMARTSCENE." + this.user.password))}).then((res)=>{
      Indicator.close();
      if(res.data.status == 0){
        localStorage.setItem('to_ken', res.data.data.token);
        localStorage.setItem('is_login', true);
        localStorage.setItem('user_info', JSON.stringify( res.data.data.user_info));
        Toast({message: '登录成功',iconClass: 'icon-success',duration: 1500});
        if(this.$route.query.redirect){
          setTimeout(()=>{this.$router.push(this.$route.query.redirect) },1500)
          return
        }else{
          setTimeout(()=>{this.$router.push({ name: 'appIndex',params: { type: true}}) },1500)
          return
        }
        this.user.password = '';
        
      }else Toast(res.data.msg)
    })
   },
   third(type){
    switch (type){
      case 1: 
        break
      case 2:
         this.$axios.get(url,{}).then(function(res){
            console.log(res)
          }).catch(function(err){
            console.log(err)
          })
        break
      case 3:
        break
    }  
   }
  },
  watch:{
    user:{//深度监听，可监听到对象、数组的变化
            handler(val, oldVal){
                if(!this.user.name == '' && !this.user.password == ''){
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
    #user_m{
      width: 100%;
      display: inline-table;
      // >div{
      //   background-color: #f5f7fa;
      //   color: rgb(51,51,51);
      //   vertical-align: middle;
      //   display: table-cell;
      //   position: relative;
      //   border: 1px solid #dcdfe6;
      //   border-radius: 4px;
      //   border-right: 0;
      //   border-top-right-radius: 0;
      //   border-bottom-right-radius: 0;
      //   padding: 0 20px;
      //   width: 1px;
      //   white-space: nowrap;
      // }
    }
    .logo_d2{
      text-align:center;
      margin:0.69rem 0 0.51rem 0;
      color: rgb(114,114,114);
      >span{
         display:inline-block;
      }
      .left,.right{
        width: 0.95rem;
        height: 1px;
        border-top: 1px solid #dcdcdc;
        vertical-align: middle;
      }
      .title{
        padding:0 0.1rem;
      }
    }
    >span{
      display:block;
      float:right;
      padding:10px 0; 
      a{
          color: rgb(230,28,0);
         }
    }
  }
  .Thirdparty{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    >a{
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      text-align:center;
      img{
        width:0.5rem;
      }
      p{
        color:rgb(114,114,114);
        padding:0.08rem 0;
      }
    }
  }
</style>
