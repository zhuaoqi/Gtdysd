<template>
	<div class="vip_heard">
      <h1>{{title}}
        <div v-if = "isback" class="back" @click="goBack"></div>
      </h1>
      <div class="user_">
        <span :style="{'background-image':'url('+usermsg.avatar +')'}">
          <img :src="usermsg.headframe ? usermsg.headframe.img:''">
        </span>
        <span class="user_mas"> 
          <p v-if="usermsg.nickname">{{usermsg.nickname}}<span :class="usermsg.gender == '1'? 'sex_man': 'sex_woman'"></span></p>
          <p v-else>请先登录<span></span></p>
          <span class="grade">LV {{usermsg.level?usermsg.level : 0}}</span>
        </span>
        <div v-if="!type" class="tootzs">
            <p>当前经验&nbsp;{{usermsg.exp || 0}}</p>
            <p>据升级还需&nbsp;{{usermsg.nextexp || 0}}</p>
            <div class="angle"></div>
        </div>
        <div v-else class="tootzs2" @click="$router.push(type.path)">
          <span></span>&nbsp;{{type.tit}}
        </div>
      </div>
      <div class="experience">
        <var class="linebg">
          <div class="line">
            <p v-for="i in 11" :class="i-1 > usermsg.percent/10 ? 'exper':'isexper'"></p>
          </div>
          <div class="Percentage" :style="{'left': percent?percent-5 + '%': 0}">{{percent}}%</div>
          <div class="after" :style="{'width': percent + '%'}"></div>
        </var>
        <div class="_title">
            <p></p>
            <p></p>
        </div>
      </div>
      <div class="Triangle"></div>
    </div>
</template>

<script>

export default {
	data() {
		return {
			usermsg: {
	        	avatar:'http://gtdysd.com/static/img/Index/tx.png'
		    },
		    percent: 0
		}
	},
	methods: {
    goBack(){
      this.$router.goBack()
    },
    conputer(val){
      if(val == '0'){
        return
      }
      let a = 0;
      let interval = setInterval(()=>{ 
        a += 1;
        this.percent = a
        if(a == val){clearInterval(interval)}
      },15)
    }
	},
  mounted(){
    if(localStorage.getItem("is_login")){
      this.$axios.post('/',{method:'member.index.userinfo'}).then( (res) => {
        if(res.data.status == 0){
          this.usermsg = res.data.data.user_info
          this.conputer(this.usermsg.percent)
        }
      })
    }
    
  },
	props: ['title','isback', 'type']
}
	
</script>
<style lang="scss">
  .vip_heard{
      width:100%;height: 2.31rem;
      background-image: url(/static/img/bg_member@2x.png);
      background-size: 100%;
      background-repeat: no-repeat;
      position: relative;
      background-color: #fff;
      >h1{
        height: 44px;text-align: center;
        line-height: 44px;color: #fff;
        font-weight: normal;
        font-size: 18px;
        position: relative;
        .back{
          position: absolute;
          left: 15px; top: 15px;
          width: 20px;height: 20px;
          background-image: url(/static/img/nav_fanhui@3x.png);
          background-repeat: no-repeat;
          background-size: 100%;
        }
      }
      .user_{
        color: #fff;
        width: 100%;height: 1.1rem;
        margin-top: 0.07rem;
        padding-left: 17px;
        >span{
          display: block;
          float: left;
        }
        >span:first-child{
          width: 120px;height:120px;
          background-size: 55px;
          background-repeat: no-repeat;
          background-position: 33px 33px;
          position: relative;
          img{
           width: 100%;
          }
        }
        .user_mas{
          margin-top: 0.4rem;
        }
        .tootzs{
          float: right;height: 50px;
          padding: 10px 6px 10px 14px;
          font-size: 12px;margin-right: 11px;
          border-radius: 5px;
          background-color: rgba(255,255,255,0.5);
          position: relative;
          .angle{
            position: absolute;
            left: -17px;top: 14px;
            width:0px;height:0px;
            border-right: 7px solid rgba(255, 255, 255, 0.5);
            border-top: 10px solid rgba(255, 255, 255, 0);
            border-left: 10px solid rgba(255, 255, 255, 0);
            border-bottom: 10px solid rgba(255, 255, 255, 0);
          }
        }
        .tootzs2{
          float: right;margin-right: 19px;
          font-size: 11px;
          span{
            display: inline-block;
            width: 12px; height: 12px;
            background-image: url(/static/img/vip/common_icon_explain@2x.png);
            background-size: 100%;
            vertical-align: -20%;
          }
        }
      }

      .grade{
        display: block;
        width: 50px;height: 25px;
        background-image: url(/static/img/vip2/bg_level@2x.png);
        background-repeat: no-repeat;
        background-size: 100%;
        padding-left: 8px;margin-top:6px;
        font-size: 12px;line-height: 26px;
        font-weight: 500;
        font-style: italic;
      }
      .experience{
        position: absolute;
        bottom: -0.48rem; left: 0.1rem;
        width: 3.55rem; height: 0.9rem;
        background-color: rgba(255,255,255, 0.9);
        border-radius: 10px;
        padding: 0 5px;
        box-shadow: 0px 6px 20px -5px rgba(255,93,0,.2);
        .linebg{
          display: block;
          width: 100%;height: 3px;
          background-color: #afafaf;
          position: relative;
          margin-top: 40px;
          .Percentage{
            position:absolute;
            bottom: 16px;left: 0;
            font-size: 10px;
            text-align: center;color: #e75500;
            width: 37px; height: 22px;
            line-height: 17px;
            background-image: url(/static/img/vip2/prompt@2x.png);
            background-size: 100%;
          }
          .after{
             height: 3px; width: 0%;
             background-color: red;
          }
        }
        
        .line{
          position: absolute;
          left: 0; top: -9px;
          width: 100%;
          z-index: 2;
          display: -webkit-box;
          box-pack: justify;
          -webkit-box-pack: justify;
          .isexper{
            background-image: url(/static/img/vip2/theball@2x.png);
            background-size: 100%;
            
          }
          .isexper:nth-child(1){
            animation: openexp .2s;
          }
          .isexper:nth-child(2){
            animation: openexp .4s;
          }
          .isexper:nth-child(3){
            animation: openexp .6s;
          }
          .isexper:nth-child(4){
            animation: openexp .8s;
          }
          .isexper:nth-child(5){
            animation: openexp 1s;
          }
          .isexper:nth-child(6){
            animation: openexp 1.2s;
          }
          .isexper:nth-child(7){
            animation: openexp 1.4s;
          }
          .isexper:nth-child(8){
            animation: openexp 1.6s;
          }
          .isexper:nth-child(9){
            animation: openexp 1.8s;
          }
          .isexper:nth-child(10){
            animation: openexp 2s;
          }
          .isexper:nth-child(11){
            animation: openexp 2.2s;
          }
          .exper{
            background-image: url(/static/img/vip2/theball_s@2x.png);
            background-size: 100%;
          }
          p{
            height: 20px;width: 20px;
            border-radius: 50%;
          }
        }
        ._title{
          display: -webkit-box;
          box-pack: justify;
          -webkit-box-pack: justify;
          margin-top: 15px;
        }
      }
      .Triangle{
        position: absolute;
        left: 0.6rem;bottom: 0.41rem;
        width:0px;height:0px;
        border-top:0;
        border-right:15px solid  rgba(0,0,0,0);
        border-bottom:7px solid rgba(255,255,255,0.9);
        border-left:15px solid  rgba(0,0,0,0);
      }
   }
   @keyframes openexp {
     0% { background-image: url(/static/img/vip2/theball_s@2x.png); }
     60% { background-image: url(/static/img/vip2/theball_s@2x.png); }
     100%{ background-image: url(/static/img/vip2/theball@2x.png); }
   }
</style>