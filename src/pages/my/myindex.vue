<template>
  <div class="my_page" :style="{'height':height}">
    <div class="user_">
      <div v-if="!Authentication" class="n_user">
          <p>hi~ 等你好久了</p>
          <div>
            <p @click="goto('/logo')">登录</p>
            <p @click="goto('/register')">注册</p>
          </div>
      </div>
      <div v-else class="Authen_user">
          <div @click="chenge_port">
            <img :src="user_info.avatar || changUrl" alt="">
          </div>
          <input type="file" style="display: none" ccept="image/gif, image/jpeg" ref="input_hi"  @change="change">
          <div class="name">
            <span>{{user_info.nickname}}</span>
            <span v-show="user_info.gender != 3" :class="{'sex_woman': user_info.gender==2,'sex_man':user_info.gender==1}"></span>
          </div>
          <span>{{user_info.motto}}</span>
      </div>
    </div>
    <div class="sel_list" style="padding-bottom: 44px;">
      <div style="margin-bottom: 0.1rem;" >
        <mt-cell title="我的地盘" is-link to="/myhome">
          <img slot="icon" src="/static/img/my_icon_wodedipan@3x.png" width="17" height="17">
        </mt-cell>
        <mt-cell title="我的资料" is-link to="/mydata">
          <img slot="icon" src="/static/img/my_icon_wodeziliao@3x.png" width="17" height="17">
        </mt-cell>
        <mt-cell title="我的消息" is-link to="/my/massage">
          <img slot="icon" src="/static/img/my_icon_wodexiaoxi@3x.png" width="17" height="17">
        </mt-cell>
        <!-- <mt-cell title="我的相册" is-link to="/my/post">
          <img slot="icon" src="/static/img/my_icon_wodexiangce@3x.png" width="17" height="17">
        </mt-cell>
        <mt-cell title="玩的会员" is-link to="/my/vip">
          <img slot="icon" src="/static/img/my_icon_wodehuiyuan@3x.png" width="17" height="17">
        </mt-cell> -->
        <mt-cell style="margin-top: 0.1rem;" title="关于我们" is-link to="/about">
          <img slot="icon" src="/static/img/my_icon_guanyuwomen@3x.png" width="17" height="17">
        </mt-cell>
        <mt-cell title="系统设置" is-link to="/sysconfig">
          <img slot="icon" src="/static/img/my_icon_xitongshezhi@3x.png" width="17" height="17">
        </mt-cell>
        <div @click="clear">
          <mt-cell title="清除缓存">
            <span style="color: green"><div :class="{'mint-spinner-snake': clearaa}" style="border-top-color: rgb(204, 204, 204);border-left-color: rgb(204, 204, 204);border-bottom-color: rgb(204, 204, 204);height: 20px;width: 20px;">
            </div></span>
            <img slot="icon" src="/static/img/my_icon_qingchuhuancun@3x.png" width="17" height="17">
          </mt-cell>
        </div>
      </div>
    </div>
    <div class="container" v-show="panel">
      <div>
        <img id="image" :src="url" alt="Picture">
      </div>
      <button type="button" id="button" @click="crop">确定</button>
    </div>
  </div>
</template>

<script>

import { Toast,Indicator } from 'mint-ui'
import Cropper from 'cropperjs'
export default {
  data (){
    return {
      changUrl: '/static/img/morentouxiang --icon.png',
      Authentication: null,
      clearaa: false,
      user_info: {},
      panel: false,
      url: '',
      cropper:'',
      picValue: ''
    }
  },
  created(){
    if(localStorage.getItem('user_info')){
      this.user_info =  JSON.parse(localStorage.getItem('user_info'));
    }
    this.$store.commit('selechange',3)
    this.$store.commit('_change',{
      _logo   : false,
      _title  : '个人主页',
      _search : false,
      _topshow: false,
      _msg    : false,
      _bottshow: true,
      _regain : false,
      _back   : false
    })
    this.Authentication = Boolean(window.localStorage.getItem("is_login"))
  },
  methods: {
    clear(){
      let el = this
      el.clearaa = true
      setTimeout(function(){
        let cl = Math.random()*30
        el.clearaa = false
        Toast('清除成功 '+ cl.toFixed(2) + ' MB')
      },1000)
    },
    goto(path){
      this.$router.push(path)
    },
    chenge_port(){
      this.$refs.input_hi.click()
    },
    getObjectURL (file) {
      var url = null ; 
      if (window.createObjectURL!=undefined) { // basic
        url = window.createObjectURL(file) ;
      } else if (window.URL!=undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file) ;
      } else if (window.webkitURL!=undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file) ;
      }
      return url ;
    },
    change(e){
      let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        this.panel = true;
        this.picValue = files[0];
        
        this.url = this.getObjectURL(this.picValue);
        //每次替换图片要重新得到新的url
        if(this.cropper){
          this.cropper.replace(this.url);
      }
      this.panel = true;
    },
    crop(){
       this.panel = false;
        var croppedCanvas;
        var roundedCanvas;
        if (!this.croppable) {
          return;
        }
        // Crop
        croppedCanvas = this.cropper.getCroppedCanvas();
        // Round
        roundedCanvas = this.getRoundedCanvas(croppedCanvas);

        this.changUrl = roundedCanvas.toDataURL();
        this.postImg()
    },
    getRoundedCanvas (sourceCanvas) {
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');
      var width = sourceCanvas.width;
      var height = sourceCanvas.height;
      canvas.width = width;
      canvas.height = height;
      context.imageSmoothingEnabled = true;
      context.drawImage(sourceCanvas, 0, 0, width, height);
      context.globalCompositeOperation = 'destination-in';
      context.beginPath();
      context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
      context.fill();
      return canvas;
    },
    encode(unencoded) {
      return encodeURIComponent(unencoded).replace(/'/g,"%27").replace(/"/g,"%22"); 
    },
    postImg () {
      let data = this.encode(this.changUrl);
        Indicator.open();
        this.$axios.post('/',{method:'note.uploadimg.uploadBase64',data:data,type:'header',filename:this.picValue.name}).then((res)=>{
          if(res.data.status == 0){
            this.$axios.post('/',{method:'usercenter.user.headimg',img:res.data.data.url}).then((aas)=>{
              Indicator.close();
              if(aas.data.status == 0){
                Toast('头像上传成功~')
                let obj = JSON.parse(localStorage.getItem('user_info'));
                obj.avatar = res.data.data.url
                localStorage.setItem("user_info", JSON.stringify(obj))
                this.user_info.avatar = res.data.data.url
              }else Toast(aas.data.msg)
            })
          }else Toast(res.data.msg)
        })
    }
  },
  mounted () {
    //初始化这个裁剪框
    var self = this;
    var image = document.getElementById('image');
    this.cropper = new Cropper(image, {
      aspectRatio: 1,
      viewMode: 1,
      background:false,
      zoomable:false,
      ready: function () {
        self.croppable = true;
      }
    });
  },
  computed: {
    height(){
      return this.$store.state.height
    }
  },
  components: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"> 
  .my_page{
     background-color: #eee;
    .mint-spinner-snake {
        -webkit-animation: mint-spinner-rotate .8s infinite linear;
        animation: mint-spinner-rotate .8s infinite linear;
        border: 3px solid transparent;
        border-radius: 50%;
    }
    .mint-cell:first-child .mint-cell-wrapper {
        background-origin: content-box;
    }
    .user_{
      height: 2rem;
      background-image:url('/static/img/beijing.jpg');
      background-size: 100%;
      background-repeat: no-repeat;
      position: relative;
      >div{
        position: absolute;
      }
      .n_user{
        height: 1rem;
        width: 1.84rem;
        bottom:0; left:0.875rem;
        color: #fff;
        font-size:0.16rem;
        text-align:center;
        padding: 0 0 0.24rem 0;
        >div{
          margin-top: 0.25rem;
          display:box;
          display:-webkit-box;
          box-pack: justify;
          -webkit-box-pack: justify;
          p{
            border-radius: 40px;
            background: rgba(255,255,255,0.5);
            height: 0.32rem;width:0.74rem;
            line-height: 0.32rem;
          }
        }
      }
      .Authen_user{
        height: 1.38rem;
        width: 2.4rem;
        bottom:0; left:0.65rem;
        text-align: center;
        color: #fff;
        div:first-child{
          height: 0.65rem;
          width: 0.65rem;
          overflow: hidden;
          margin: 0 auto;
          img{
            width: 100%;
            border-radius: 50%;
          }
        }
        .name{
          margin: 0.1rem 0;
          span{
            font-size: 0.16rem;
          }
          
        }
      }
    }
    #button {
      position: absolute;
      right: 10px;
      top: 10px;
      width: 80px;
      height: 40px;
      border:none;
      border-radius: 5px;
      background:white;
    }
   .picture {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover; 
    }
   .container {
        z-index: 99;
        position: fixed;
        padding-top: 60px;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background:rgba(0,0,0,1);
    }

   #image {
      max-width: 100%;
    }

    .cropper-view-box,.cropper-face {
      border-radius: 50%;
    }
    /*!
     * Cropper.js v1.0.0-rc
     * https://github.com/fengyuanchen/cropperjs
     *
     * Copyright (c) 2017 Fengyuan Chen
     * Released under the MIT license
     *
     * Date: 2017-03-25T12:02:21.062Z
     */

    .cropper-container {
      font-size: 0;
      line-height: 0;

      position: relative;

      -webkit-user-select: none;

         -moz-user-select: none;

          -ms-user-select: none;

              user-select: none;

      direction: ltr;
      -ms-touch-action: none;
          touch-action: none
    }

    .cropper-container img {
      /* Avoid margin top issue (Occur only when margin-top <= -height) */
      display: block;
      min-width: 0 !important;
      max-width: none !important;
      min-height: 0 !important;
      max-height: none !important;
      width: 100%;
      height: 100%;
      image-orientation: 0deg
    }

    .cropper-wrap-box,
    .cropper-canvas,
    .cropper-drag-box,
    .cropper-crop-box,
    .cropper-modal {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }

    .cropper-wrap-box {
      overflow: hidden;
    }

    .cropper-drag-box {
      opacity: 0;
      background-color: #fff;
    }

    .cropper-modal {
      opacity: .5;
      background-color: #000;
    }

    .cropper-view-box {
      display: block;
      overflow: hidden;

      width: 100%;
      height: 100%;

      outline: 1px solid #39f;
      outline-color: rgba(51, 153, 255, 0.75);
    }

    .cropper-dashed {
      position: absolute;

      display: block;

      opacity: .5;
      border: 0 dashed #eee
    }

    .cropper-dashed.dashed-h {
      top: 33.33333%;
      left: 0;
      width: 100%;
      height: 33.33333%;
      border-top-width: 1px;
      border-bottom-width: 1px
    }

    .cropper-dashed.dashed-v {
      top: 0;
      left: 33.33333%;
      width: 33.33333%;
      height: 100%;
      border-right-width: 1px;
      border-left-width: 1px
    }

    .cropper-center {
      position: absolute;
      top: 50%;
      left: 50%;

      display: block;

      width: 0;
      height: 0;

      opacity: .75
    }

    .cropper-center:before,
      .cropper-center:after {
      position: absolute;
      display: block;
      content: ' ';
      background-color: #eee
    }

    .cropper-center:before {
      top: 0;
      left: -3px;
      width: 7px;
      height: 1px
    }

    .cropper-center:after {
      top: -3px;
      left: 0;
      width: 1px;
      height: 7px
    }

    .cropper-face,
    .cropper-line,
    .cropper-point {
      position: absolute;

      display: block;

      width: 100%;
      height: 100%;

      opacity: .1;
    }

    .cropper-face {
      top: 0;
      left: 0;

      background-color: #fff;
    }

    .cropper-line {
      background-color: #39f
    }

    .cropper-line.line-e {
      top: 0;
      right: -3px;
      width: 5px;
      cursor: e-resize
    }

    .cropper-line.line-n {
      top: -3px;
      left: 0;
      height: 5px;
      cursor: n-resize
    }

    .cropper-line.line-w {
      top: 0;
      left: -3px;
      width: 5px;
      cursor: w-resize
    }

    .cropper-line.line-s {
      bottom: -3px;
      left: 0;
      height: 5px;
      cursor: s-resize
    }

    .cropper-point {
      width: 5px;
      height: 5px;

      opacity: .75;
      background-color: #39f
    }

    .cropper-point.point-e {
      top: 50%;
      right: -3px;
      margin-top: -3px;
      cursor: e-resize
    }

    .cropper-point.point-n {
      top: -3px;
      left: 50%;
      margin-left: -3px;
      cursor: n-resize
    }

    .cropper-point.point-w {
      top: 50%;
      left: -3px;
      margin-top: -3px;
      cursor: w-resize
    }

    .cropper-point.point-s {
      bottom: -3px;
      left: 50%;
      margin-left: -3px;
      cursor: s-resize
    }

    .cropper-point.point-ne {
      top: -3px;
      right: -3px;
      cursor: ne-resize
    }

    .cropper-point.point-nw {
      top: -3px;
      left: -3px;
      cursor: nw-resize
    }

    .cropper-point.point-sw {
      bottom: -3px;
      left: -3px;
      cursor: sw-resize
    }

    .cropper-point.point-se {
      right: -3px;
      bottom: -3px;
      width: 20px;
      height: 20px;
      cursor: se-resize;
      opacity: 1
    }

    @media (min-width: 768px) {

      .cropper-point.point-se {
        width: 15px;
        height: 15px
      }
    }

    @media (min-width: 992px) {

      .cropper-point.point-se {
        width: 10px;
        height: 10px
      }
    }

    @media (min-width: 1200px) {

      .cropper-point.point-se {
        width: 5px;
        height: 5px;
        opacity: .75
      }
    }

    .cropper-point.point-se:before {
      position: absolute;
      right: -50%;
      bottom: -50%;
      display: block;
      width: 200%;
      height: 200%;
      content: ' ';
      opacity: 0;
      background-color: #39f
    }

    .cropper-invisible {
      opacity: 0;
    }

    .cropper-bg {
      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');
    }

    .cropper-hide {
      position: absolute;

      display: block;

      width: 0;
      height: 0;
    }

    .cropper-hidden {
      display: none !important;
    }

    .cropper-move {
      cursor: move;
    }

    .cropper-crop {
      cursor: crosshair;
    }

    .cropper-disabled .cropper-drag-box,
    .cropper-disabled .cropper-face,
    .cropper-disabled .cropper-line,
    .cropper-disabled .cropper-point {
      cursor: not-allowed;
    }

    }


  @-webkit-keyframes mint-spinner-rotate {
  0% {
      -webkit-transform: rotate(0deg);
              transform: rotate(0deg);
  }
  100% {
      -webkit-transform: rotate(360deg);
              transform: rotate(360deg);
  }
  }
  @keyframes mint-spinner-rotate {
  0% {
      -webkit-transform: rotate(0deg);
              transform: rotate(0deg);
  }
  100% {
      -webkit-transform: rotate(360deg);
              transform: rotate(360deg);
  }
}

</style>
