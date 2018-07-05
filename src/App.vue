<template>
  <div id="app">
    <!--Header-->
    <mt-header v-show="store._topshow" fixed :title="store. _title">\
      <mt-button v-show="store._back" slot="left" id="back" @click="$router.goBack()"></mt-button>
      <mt-button v-show="store._goinx" slot="left" id="gobink" @click="$router.push('/')"></mt-button>
      <mt-button v-show="store._cancel" slot="left" @click="goBack">取消</mt-button>
      <mt-button v-show="store._logo" slot="left" @click="goto_('/logo')">登录</mt-button>
      <mt-button v-show="store._search" slot="right" @click="goto_('/search')" id="sear"></mt-button>
      <mt-button v-show="store._msg" slot="right" id="msgs"></mt-button>
      <mt-button v-show="store._send" slot="right" @click="send()">发送</mt-button>
      <mt-button v-show="store._regain" slot="right" @click="goto_('/register')">注册</mt-button>
    </mt-header>
    <!--router-->
    <router-view ref="aaa"/>
    <!--footer-->
    <div v-show='false'>{{selecte}} </div>
    <mt-tabbar v-show="store._bottshow" class='border_t' fixed v-model="selected">
      <mt-tab-item v-for="(item,index) of src" :id="index" :key="index">
        <img slot="icon" :src="selected != index ? item.src : item.issrc">{{item.tit}}
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
function getheight(){
  let height_ = document.body.clientHeight
  let width_ = document.body.clientWidth
  return { height : height_ - 55 + "px", width : width_} 
}
import { Transformation, deepClone} from './assets/js/g.js'
export default {
  name: 'App',
  data() {
    return {
      src:[{
        tit:'游戏圈',
        rout:'/',
        src:"/static/img/tab_youxiquan.png",
        issrc:"/static/img/tab_youxiquan_s@3x.png"
      },{
        tit:"会员",
        rout:'/vip',
        src:"/static/img/tab_huiyuan@3x.png",
        issrc:"/static/img/tab_huiyuan_s@3x.png"
      },{
        tit:"活动",
        rout:'/mailList',
        src:"/static/img/tab_huodong2x.png",
        issrc:"/static/img/tad_huodong_s@2x.png"
      },{
        tit:"我的",
        rout:'/home',
        src:"/static/img/tab_my@3x.png",
        issrc:"/static/img/tab_my_s@3x.png"
      }],
      transitionName: "",
      selected: 0
    }
  },
  mounted(){
    this.$store.commit('sys',{
      height: getheight().height,
      width: getheight().width
    })
    this.selected = this.$store.state.sele;
  },
  computed:{
    store(){
      let data = {
        _logo: this.$store.state._logo,
        _msg: this.$store.state._msg,
        _topshow: this.$store.state._topshow,
        _bottshow: this.$store.state._bottshow,
        _title: this.$store.state._title,
        _search: this.$store.state._search,
        _regain : this.$store.state._regain,
        _back   : this.$store.state._back,
        _goinx   : this.$store.state._goinx,
        _cancel : this.$store.state._cancel,
        _send   : this.$store.state._send
      }
      return data
    },
    selecte(){
      let dat = this.$store.state.sele
      this.selected = dat
      return dat
    },
    isligin(){
      return this.$store.state.islogo
    },
  },
  methods: {
    goBack(){
      this.$router.goBack()
    },
    goto_(val){
      this.$router.push(val)
    },
    send(){
       let data = this.$refs.aaa.$refs.bbb.$data.sendnote
       let type = this.$refs.aaa.$refs.bbb.$data.type
       switch(type){
        case 'text':
           if(data.title == ''){
            Toast('请输入文章标题'); return
           }else if(data.contents == ''){
            Toast('请输入文章内容'); return
           } else if(data.game_name == null || data.tag_type == null){
            Toast('请选择游戏标签'); return
           }
          break;
        case 'img':           
           if(data.title == ''){
            Toast('请输入文章标题'); return
           }else if(data.img == '' || data.uurl == ''){
            Toast('请选择要发布的图片'); return
           }else if(data.game_name == null || data.tag_type == null){
            Toast('请选择游戏标签'); return
           }
           data.img = data.img.join(',')
           data.uurl = data.uurl.join(',')
          break;
        case 'share':
           if(data.contents == ''){
            Toast('请输入评论内容'); return
           } 
          break;
       }
       data.contents = Transformation(data.contents)
       let va = deepClone(data)
       this.$axios.post('/',va).then((res) => {
          if(res.data.status == 0){
            if(type== 'share' ){
              Toast('分享成功')
            }else Toast('发帖成功')
            setTimeout(()=>{
              this.$router.push('/')
            },1000)
          }else Toast(res.data.msg)
       })
    }
  },
  watch: {
    selected (val, oldval) {
      this.$router.push(this.src[val].rout)
    }
  },
  updated(){

  },
  beforeRouteUpdate (to, from, next) {
      let isBack = this.$router.isBack
      if (isBack) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-left'
      }
      this.$router.isBack = false
      next()
    }
}
</script>

<style scoped>
  #sear{
    width: 20px; height: 20px;
    background-image: url(/static/img/nav_sousuo.png);
    background-repeat: no-repeat;
    background-size: 100%;
    margin-right: 20px;
  }
 #msgs{
    width: 20px; height: 20px;
    background-image: url(/static/img/nav_tongzhi.png);
    background-repeat: no-repeat;
    background-size: 100%;
 }
 #back{
    width: 20px;
    height: 20px;
    background-image: url(/static/img/nav_fanhui@3x.png);
    background-repeat: no-repeat;
    background-size: 100%;
 }
  #gobink{
    width: 20px;
    height: 20px;
    background-image: url(/static/img/nav_fanhui@3x.png);
    background-repeat: no-repeat;
    background-size: 100%;
 }
</style>
