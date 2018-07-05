<template>
  <div class="pushtext_page">
    <div class="input">
      <input type="textarea" autofocus placeholder="请输入文章标题">
      <div class="border" style="position: relative;"></div>
      <div ref="textareaHtml" class="textarea" contenteditable="true" placeholder="说些什么吧..." @focus="islook = false"></div>
      <div class="clearfix videobox" style="padding-bottom: 0.2rem;">
        <div v-for="(item,index) of videos">
          <video ref="video" :src="item">
          </video>
          <div @click="play(index)"></div>
        </div>
        <img style="width: 0.9rem;" @click.stop="addPic" src="/static/img/game_icon_tianjiatupian@2x.png" />
      </div>
      <input type="file" accept="video/*" @change="onFileChange" ref="inputl" preload="true" x5-video-player-type="h5" x5-vide 
o-player-fullscreen="true" style="display: none">
    </div>
    <div class="bottom_labe" :class="{'Expression': islook}">
      <select-label :biaoqian="biaoqian" v-on:getlables="getlables"></select-label>
      <div style="position: relative; margin-top: 0.1rem;" class="border"></div>
      <div class="push_img">
        <img src="/static/img/game_fenxiang_icon_biaoqing@3x.png" @click="openlook">
      </div>
      <img-select v-on:getExpression="getExpression" :islook ="islook"></img-select>
    </div>
  </div>
</template>

<script>
import selectLables from '../components/selectlables'
import imglode from '../components/imglode'
import img from '../components/Emoticons'
export default {
  data (){
    return {
      islook: false,
      closelable: false,
      textareaHtml: '',
      biaoqian: {
          lables1: ['单机全部','单机全部','单机全部','单机全部','单机全部','单机全部'],
          lables2: ['单机全部','单机全部','单机全部','单机全部','单机全部','单机全部'],
          islables1: null,
          islables2: null
      },
      videos:[]
   }
  },
  created(){
    this.$store.commit('selechange',4)
    this.$store.commit('_change',{
      _logo   : false,
      _title  : '推送视频',
      _search : false,
      _topshow: true,
      _msg    : false,
      _bottshow: false,
      _regain : false,
      _back   : false,
      _cancel : true,
      _send   : true
    })
  },
  methods: {
    goBack(){
      this.$router.goBack()
    },
    openlook(){
      //this.$refs.textareaHtml.focus()
      this.islook = true
    },
    getlables(data){
      console.log(data)
      //this.$refs.textareaHtml.appendChild(createImg)
    },
    getExpression(data){
      this.$refs.textareaHtml.appendChild(data)
    },
    addPic(e) {
      this.$refs.inputl.click()
      return false;
    },
    onFileChange(e){
      var files = e.target.files || e.dataTransfer.files;
      if(!files.length) return;
      this.createVideo(files, e);
    },
    createVideo(file, e){
      alert(this.getFileURL(file[0]))
      this.videos.push(this.getFileURL(file[0]))
    },
    getFileURL(file) {
      var getUrl = null;
      if (window.createObjectURL != undefined) { // basic
        getUrl = window.createObjectURL(file);
      } else if (window.URL != undefined) { // mozilla(firefox)
        getUrl = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) { // webkit or chrome
        getUrl = window.webkitURL.createObjectURL(file);
      }
      return getUrl;
    },
    play(el){
      if(this.isIOS()){
        this.$refs.video[el].play()
      }
      this.launchFullscreen(this.$refs.video[el])
    },
    launchFullscreen(element){
    　　//进入全屏
    　　if(element.requestFullscreen) {
    　　　　element.requestFullscreen();
    　　} else if(element.mozRequestFullScreen) {
    　　　　element.mozRequestFullScreen();
    　　} else if(element.msRequestFullscreen){ 
    　　　　element.msRequestFullscreen(); 
    　　} else if(element.oRequestFullscreen){
    　　　　element.oRequestFullscreen();
    　　} else if(element.webkitRequestFullscreen){
    　　　　element.webkitRequestFullScreen();
    　　}else{
    　　　　var docHtml = document.documentElement;
    　　　　var docBody = document.body;
    　　　　var videobox = document.getElementById('video');
    　　　　var cssText = 'width:100%;height:100%;overflow:hidden;';
    　　　　docHtml.style.cssText = cssText;
    　　　　docBody.style.cssText = cssText;
    　　　　videobox.style.cssText = cssText+';'+'margin:0px;padding:0px;';
    　　　　document.IsFullScreen = true;
    　　}
    },
    exitFullscreen(){
      //退出全屏
    　　if (document.exitFullscreen) {
    　　　　document.exitFullscreen();
    　　} else if (document.msExitFullscreen) {
    　　　　document.msExitFullscreen();
    　　} else if (document.mozCancelFullScreen) {
    　　　　document.mozCancelFullScreen();
    　　} else if(document.oRequestFullscreen){
    　　　　document.oCancelFullScreen();
    　　}else if (document.webkitExitFullscreen){
    　　　　document.webkitExitFullscreen();
    　　}else{
    　　　　var docHtml = document.documentElement;
    　　　　var docBody = document.body;
    　　　　var videobox = document.getElementById('video');
    　　　　docHtml.style.cssText = "";
    　　　　docBody.style.cssText = "";
    　　　　videobox.style.cssText = "";
    　　　　document.IsFullScreen = false;
    　　}
    },
    isIOS(){
      let u = navigator.userAgent, app = navigator.appVersion;
      let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
      let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
          return false
      }
      if (isIOS) {
          return true
      }
    }
  },
  mounted(){

  },
  components: {
    imglode: imglode,
    selectLabel: selectLables,
    imgSelect: img
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"> 
input::-webkit-input-placeholder{
    color: #909090;
  }
input::-moz-placeholder{   /* Mozilla Firefox 19+ */
    color: #909090;
}
input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
    color: #909090;
}
input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
    color: #909090;
}
div[contenteditable]:empty:before{
    content: attr(placeholder);
    color: #909090;
}
div[contenteditable]:focus{
    content:none;
}
.pushtext_page{
  background-color: #fff;
  padding: 0 0.15rem;
  .input{
    input{
      border: 0;color: #333333;
      height: 0.5rem;padding: 0;
      font-size: 16px;
    }
    >.textarea{
      width: 100%;min-height: 1.8rem;
      padding-top: 0.1rem;
      outline: none;
      line-height: 25px;
    }
  }
  .videobox{
    >div{
      width: 0.9rem; height: 0.9rem;float: left;
      position: relative;overflow: hidden;
      >div{
        background-image: url(/static/img/game_icon_bofang@3x.png);
        background-size: 100%;
        position: absolute;
        top: 0; left: 0; bottom: 0; right: 0; 
        border-radius: 50%;margin: auto;
        width: 0.3rem;height: 0.3rem;
        background-color: rgba(0,0,0,.6)
      }
    }
    >img{
      float: left
    }
  }
}
.bottom_labe{
  position: fixed;
  background-color: #fff;
  bottom: 0; left: 0;
  padding: 0 0.15rem;
  padding-top: 0.1rem;
  height: 0.95rem;width: 100%;
  transition: transform 0.5s;
  span{
    color: #2c3e50;
    padding: 0.05rem 0.1rem;
    font-size: 0.11rem;
    margin-right: 0.06rem;
    float: left;
  }

  .push_img{
    height: 0.5rem;line-height: 0.5rem;
    img{
      width: 0.18rem;
    }
  }
  .look{
    background-color: #fff;
    img{
      margin: 0.05rem 0.03rem 0.05rem 0.05rem;
      display: inline-block;

    }
  }
}
.Expression{
  transform: translateY(-2.2rem);
}


.donghua{
  animation: change 0.3s;
}

@keyframes change {
    0% {
        opacity: 0.1;
        -webkit-transform: scale(0.5);
        -ms-transform: scale(0.5);
        transform: scale(0.5);
    }
    70% {
        opacity: 0.7;
        -webkit-transform: scale(1.2);
        -ms-transform: scale(1.2);
        transform: scale(1.2);
    }
    100% {
        opacity: 1;
        -webkit-transform: scale(1);
        -ms-transform: scale(1);
        transform: scale(1);
    }
}
</style>
