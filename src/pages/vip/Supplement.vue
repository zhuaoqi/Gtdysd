<template>
    <div class="Supplement" :style="{'height':height}">
        <vip-pahead :title="'补签'"></vip-pahead>
        <main>
            <h1>{{new Date().toLocaleDateString()}}</h1>
            <div class="date">
                <span v-for="item in suppList" @click="getDate(item)" :class="selectDate == item ? 'isselect': ''">{{item.split('.')[1]}}</span>
            </div>
            <button type="button" :style="{'background-color':!selectDate?'':'#ff5a00' }" :disabled ="selectDate == null " @click="Supplement">确定</button>
        </main>
        <open-box :islook="isopbox" :data="boxtype" v-on:isclose =" mask = false; isopbox = false"></open-box>
        <!-- 签到补签 -->
        <type-img :islook="isclose" v-on:isclose="close" :data="maskObj"></type-img>
        <div v-show="mask" @touchmove.prevent class="mask"></div>
    </div>
</template>

<script>
import { Toast,Indicator } from 'mint-ui'
import fromTyet_img from '../../components/frameType_img'
import openBox from '../../components/openBox'
import vip_pahead from '../../components/vippageHead'
export default {
    data() {
        return {
            selectDate: null,
            height: '',
            isclose: false,
            boxtype:{},
            mask: false,
            isopbox: false,
            maskObj:{},
            suppList: [],
            daraor : null
        }
    },
    created(){
        this.height = document.body.clientHeight + 'px'
        this.$store.commit('selechange',4)
        this.$store.commit('_change',{
            _topshow: false,
            _bottshow: true,
        })
    },
    methods: {
      getDate(e){
        this.selectDate = e
        
      },
      close(v){
          this.isclose = v
          this.mask = false
          let logdata = Number(this.daraor)
          if(logdata == 3){
            this.boxtype = {
              type: 0,
              tit: '木质宝箱'
            }
            this.isopbox = true
            this.mask = true
          }else if(logdata == 10){
            this.boxtype = {
              type: 1,
              tit: '白银宝箱'
            }
            this.isopbox = true
            this.mask = true
          }else if(logdata == 17){
            this.boxtype = {
              type: 2,
              tit: '钻石宝箱'
            }
            this.isopbox = true
            this.mask = true
          }else if(logdata == 24){
            this.boxtype = {
              type: 3,
              tit: '王者宝箱'
            }
            this.isopbox = true
            this.mask = true
          }
          
        },
      Supplement(){ // 补签
          Indicator.open();
          this.$axios.post('/',{method:'member.sign.signin',date:this.selectDate,retroactive: 1, is_active: 0}).then( (res) => {
            Indicator.close();
            if(res.data.status == 0){
                this.daraor = res.data.data.signday
                this.maskObj = {
                    type: 'Signin',
                    src:'/static/img/vip/signin_success_s@2x.png',
                    data:{
                        fen: res.data.data.score,
                        exp: res.data.data.epx
                    }
                }
                this.isclose = true
                this.mask = true
                this.islgin = false
            }else Toast(res.data.msg)
          })
      }
    },
    mounted(){
        Indicator.open();
        this.$axios.post('/',{method:'member.sign.signlist'}).then( (res) => {
            Indicator.close();
            if(res.data.status == 0){
                let data = res.data.data.list,dd = []
                for (let i in data) {
                    if(data[i].issign == 0){
                        if(data[i].istoday){
                                break; 
                        }
                        dd.push(data[i].date)
                    }
                }
                this.suppList = dd
            }
        })
    },
    components:{
        typeImg: fromTyet_img,
        openBox: openBox,
        vipPahead: vip_pahead  
      }
}
    
</script>
<style lang="scss">
.Supplement{
  height: 100vh;
  background-color: #fff;
  >main{
    margin-top: 44px;
    h1{
        line-height: 60px;
        text-align: center;
    }
    .date{
        padding: 0 0.25rem;
        span{
            display: inline-block;
            width: 0.44rem; height: 0.44rem;
            border-radius: 50%;color: #000;
            background-color: #eee;text-align: center;
            line-height: 0.44rem;
            margin: 7px 10px;
        }
        .isselect{
            color: #fff;
            background-image:linear-gradient(top,#ff7902,#ffa13d);
        }
    }
    button{
        display: block;
        width: 3rem;height: 0.45rem;
        margin: 0 auto;color: #fff;
        margin-top: 0.4rem;font-size: 17px;
        background-color: #b5b5b5;
        border-radius: 22px;
    }
  }
}
</style>