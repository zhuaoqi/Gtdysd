<template>
  <div class="mycamp_page">
    <vip-heard :title="'我的礼物'" :isback = "true" :type="Obj"></vip-heard>
    <div style="height: 0.5rem;background-color: #fff;"></div>
    <main>
        <div class="_tit">兑换的礼物</div>
        <div class="reward border_t">
            <p>待领取</p>
            <div v-show="nouse.allpage > 1" @click="nextpage" ><span></span>换一批 </div>
          </div>
        <div v-if="nouse.befdata.length > 0">
          <div class="unclaimed" :class="isanima? 'isanima': ''">
            <div v-for="item in nouse.befdata">
              <img :src="item.data.ico">
              <p>{{item.desc}}</p>
              <button v-if="!item.Receive" type="button" @click="Receive(item.id)">立即领取</button>
              <button v-else type="button" style="color: #ddd; border: 1px solid #ddd;">已领取</button>
            </div>
          </div>
        </div>
        <div v-else class="nosto">
            <img src="/static/img/vip/icon_empty@2x.png">
            <p>偷偷告诉你，连续签到即可获得宝箱</p>
        </div>
    </main>
    <div style="height: 14px"></div>
    <div style="padding: 0 0.16rem;background-color: #fff;">
        <div class="reward">
          <p>已过期</p>
          <p v-show="end.length > 2" @click="$router.push('/vip/Expired')"><span>更多 <span></span></span></p>
        </div>
        <div v-if="end.length > 0">
          <div class="Expired">
            <div v-for="item in end" :style="{'background-image':'url('+ item.data.ico +')'}">
              <img src="/static/img/vip/img_overdue@2x.png">
            </div>
          </div>
        </div>
        <div v-else class="nosto">
          <img src="/static/img/vip/icon_overdue@2x.png">
          <p>当前还没有过期的物品哦</p>
        </div>
        <div style="height: 30px;"></div>
    </div>
    <div v-show="mask" @touchmove.prevent class="mask"></div>
    <message-box :islook="boxshow" v-on:confirm="confirm" :data="{tit:'你还未添加收货地址',msg:'是否现在去添加？'}"></message-box>
    <confirm-address :islook="confirmaddress" v-on:confirm="confirmadd" :data="address"></confirm-address>
    <typeImg  :islook="isclose" v-on:isclose="close" :data="maskObj"></typeImg>
  </div>
</template>

<script>
import fromTyet_img from '../../components/frameType_img'
import messageBox from '../../components/messageBox'
import confirmAddress from '../../components/confirmadderss'
import vip_heard from '../../components/vipheader'
import { Toast,Indicator } from 'mint-ui'
import { deepClone } from '../../assets/js/g.js'
export default {
  data (){
    return {
      isclose: false,
      isanima: false,
      mask: false,
      boxshow: false,
      confirmaddress: false,
      Obj:{
        type: 'Signin',
        src: '/static/img/vip/signin_success@2x.png',
        tit: '兑换记录',
        path: '/vip/stoRecord',// 领取记录
      },
      maskObj:{
        type: 'Receive',
        src: '/static/img/vip/remind_success@2x.png',
        msg: ''
      },
      nouse: {
      	befpage: 1,
	    allpage: 0,
	    befdata: [],
	    alldata: []
      },//礼物
      end: [],
      address: {},
      nouseid:'',

    }
  },
  created(){
    this.$store.commit('_change',{
      _topshow: false,
      _bottshow: true,
    })
    this.$store.commit('selechange',4)
  },
  methods: {
    close(t){
      this.isclose = t
      this.mask = false
    },
    Receive(id){
      Indicator.open()
      this.$axios.post('/',{method:'member.depot.address'}).then( (res) => {
          Indicator.close()
          if(res.data.status == 0){
            let data = res.data.data
            if(data.real_name == "" || data.real_zip_code == "" || data.real_qq == "" || data.real_phone == "" || data.real_address ==""){
              this.mask = true
              this.boxshow = true
            }else{
              this.nouseid = id
              this.address = {
                real_name: data.real_name,
                real_zip_code: data.real_zip_code,
                real_phone: data.real_phone,
                real_address: data.real_address,
                real_details_address: data.real_details_address,
                real_qq: data.real_qq,
                real_email: data.real_email
              }
              this.confirmaddress = true
              this.mask = true
            }
          }
            
        })
    },
    nextpage(){
    	this.isanima = true
	    let data = this.nouse
	    if(data.befpage == data.allpage){
	        data.befpage = 0
	    }
	    data.befpage = data.befpage+1  
	    data.befdata = data.alldata.slice((data.befpage-1)*2,data.befpage*2)
	    setTimeout(()=>{
	      this.isanima = false
	    },200)
    },
    confirm(boole){
      if(boole){
          this.boxshow = false
          this.mask = false
          setTimeout(()=>{
            this.$router.push('/vip/Receaddress')
          },100)
      }else{
         this.boxshow = false
         this.mask = false
      }
    },
    confirmadd(boole){
      this.confirmaddress = false
      this.mask = false
      if(boole){
        let data = this.address
        data.depotid = this.nouseid
        data.method = 'member.depot.sendRealGift'
        let datas = deepClone(data)
        this.$axios.post('/',datas).then( (res) => {
          if(res.data.status == 0){
          	this.getgift()
            this.maskObj.msg ='可在兑换记录中查看！'
            this.isclose = true
            this.mask = true
            for(let i in this.nouse){
                if(this.nouse[i].id == data.depotid){
                  this.nouse[i].Receive = true
                }
            }
          }else Toast(res.data.msg)
        })
      }
      
    },
    getgift(){
    	this.$axios.post('/',{method:'member.depot.getdepot'}).then( (res) => {
	      if(res.data.status == 0){
	        this.nouse.alldata = res.data.data.nouse
	        this.nouse.befdata = res.data.data.nouse.slice(0,2)
	        this.nouse.allpage =  Math.ceil(res.data.data.nouse.length/2) 
	      }
	    })
    }
  },
  mounted(){
    this.getgift()
  },
  components:{
    vipHeard: vip_heard,
    typeImg: fromTyet_img,
    messageBox: messageBox,
    confirmAddress: confirmAddress
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"> 
  .mycamp_page{
    
    main{
      background-color: #fff;
      padding: 0 0.16rem;
    }
   .reward{
      height: 44px;line-height: 44px;
      position: relative;
      display: -webkit-box;
      box-pack: justify;
      -webkit-box-pack: justify;
      p:first-child{
        color: #333;font-size: 13px;
      }
       p:last-child{
        color: #909090;font-size: 10px;
        >span{
          border: 1px solid #909090;
          border-radius: 12px;line-height: 20px;
          height: 20px;padding: 0 10px;
          display: inline-flex;
          align-items:center;
          >span{
            margin-left: 3px;
            width: 6px;height: 9px;
            background-image: url(/static/img/vip/icon_more@2x.png);
            background-size: 100%;
          }
        }
      }
      >div{
      	color: #646464;font-size: 13px;
      	>span{
      		display: inline-block;
	        width: 12px;margin-right: 5px;
	        height: 12px;
	        background-image: url(/static/img/vip/common_icon_refresh@2x.png);
	        background-repeat: no-repeat;
	        background-size: 100%;
	        vertical-align: -8%;
      	}
      }
   }
   .unclaimed{
      display: flex;
      justify-content: space-between;
      padding-bottom: 0.2rem;
      >div{
        width: 1.57rem;height: 1.7rem;
        border: 1px solid #ddd;
        border-radius: 3px;
        text-align: center;
        img{
          width: 100%;
        }
        p{
          color: #333;font-size: 13px;
          margin: 10px 0;
        }
        button{
          display: inline-block;
          margin-top: 8px;
          padding: 5px 23px;color: #ff5d00;
          border: 1px solid #ff5d00;
          border-radius: 16px;
        }
      }
   }
   .Expired{
      display: flex;
      justify-content: space-between;
      >div{
        width: 0.95rem;height: 0.6rem;
        position: relative;overflow: hidden;
        background-repeat: no-repeat;
        background-size: 100%;
        img{
          position: absolute;
          width: 0.38rem;
          bottom: -5px;right: -5px;
        }
      }
   }
  }
</style>
