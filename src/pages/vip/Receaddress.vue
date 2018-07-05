<template>
    <div class="address_page">
        <vip-pahead :title="'收货地址'"></vip-pahead>
        <div class="selec">
            <mt-field label="姓名：" placeholder="请输入真实姓名" v-model="userData.username"></mt-field>
            <mt-field label="手机号：" placeholder="请输11位手机号" type="tel" v-model="userData.phone"></mt-field>
            <mt-field label="QQ：" placeholder="请输入QQ号" v-model="userData.QQ"></mt-field>
            <mt-field label="邮编：" placeholder="请输入邮编号码" type="number" v-model="userData.emailzip"></mt-field>
            <mt-field label="邮箱：" placeholder="请输入邮箱号码" type="email" v-model="userData.email"></mt-field>
            <span class="mint-cell" @click="selectAdd = true;mack = true">
                <div class="mint-cell-wrapper">
                    <div class="cell-title">
                        <span class="mint-cell-text">地址：</span>
                        
                    </div>
                    <div class="mint-cell-value" style="padding-left: 15px;">
                        <div v-if="!userData.address" style="color: #C7C7CD;">请选择您的地址</div>
                        <p v-else class="addersP">{{userData.address.join('-')}}</p>
                        <i class="mint-cell-allow-right"></i>
                    </div>
                </div>
            </span>
<!--             <mt-field label="地址：" placeholder="请选择您的地址" v-model="userData.address"></mt-field> -->
        <mt-field label="详细地址：" placeholder="请输入详细地址"  v-model="userData.introduction"></mt-field>
        <button type="button" class="btn" @click="commit">确认并提交</button>
        </div>
        
        
        <div class="seleadd" :class="selectAdd?'isselect': ''">
            <div class="weui-picker__hd">
                <div class="weui-picker__action" @click="configa(false)">取消</div> 
                <div class="weui-picker__action" @click="configa(true)">确定</div>
            </div>
            <mt-picker v-show="selectAdd" :slots="myAddressSlots" :visibleIteount="7" @change="onMyAddressChange"></mt-picker>
        </div>
        <div v-show="mack" @touchmove.prevent class="mask"></div>
    </div>
</template>

<script>
import { Field } from 'mint-ui';
import vip_pahead from '../../components/vippageHead'
import myaddress from '../../../static/json/address.json'
import { Toast,Indicator } from 'mint-ui'
export default {
    data() {
        return {
           selectAdd: false,
           mack: false,
           isclose: false,
           userData:{
            username: '',
            phone: '',
            QQ: '',
            email: '',
            address: '',
            introduction: '',
            emailzip: ''
           },
           myAddressSlots:[
              {
                flex: 1,
                defaultIndex: 1,    
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
              },
              {
                divider: true,
                content: '-',
                className: 'slot4'
              },
              {
                flex: 1,
                values: [],
                className: 'slot5',
                textAlign: 'center'
              }
            ],
           myAddress:'',
           maskObj:{
            type: 'Receive',
            src: '/static/img/vip/remind_success@2x.png',
            msg: '可在兑换记录中查看！'
          }
        }
        
    },
    created(){
        this.$store.commit('selechange',4)
        this.$store.commit('_change',{
            _topshow: false,
            _bottshow: true,
        })
    },
    methods: {
     onMyAddressChange(picker, values) {
       if(myaddress[values[0]]){  //这个判断类似于v-if的效果（可以不加，但是vue会报错，很不爽）
          picker.setSlotValues(1,Object.keys(myaddress[values[0]])); // Object.keys()会返回一个数组，当前省的数组
          picker.setSlotValues(2,myaddress[values[0]][values[1]]); // 区/县数据就是一个数组
          this.myAddress = values;
        }
      },
      configa(type){
        this.mack = false
        if (type) {
            this.userData.address = this.myAddress
            this.selectAdd = false
        }else{
            this.selectAdd = false
            this.myAddress = ''
        }
      },
      commit(){
        let data = this.userData
        Indicator.open()
        this.$axios.post('/',{method:'member.depot.addAddress',real_name:data.username, real_zip_code: data.emailzip,real_phone: data.phone, real_address: data.address,real_details_address: data.introduction,real_qq:data.QQ,real_email: data.email}).then( (res) => {
          Indicator.close()
          if(res.data.status == 0){
            Toast({message: '操作成功',iconClass: 'icon-success',duration: 1400});
            setTimeout(()=>{
                this.$router.goBack()
            },1500)
          }else Toast(res.data.status)
        })
      },
    },
    mounted(){
      this.$nextTick(() => { //vue里面全部加载好了再执行的函数  （类似于setTimeout）
        this.myAddressSlots[0].defaultIndex = 0  
      })
      this.$axios.post('/',{method:'member.depot.address'}).then( (res) => {
          if(res.data.status == 0){
            let data = res.data.data
            this.userData = {
                username: data.real_name,
                phone: data.real_phone,
                QQ: data.real_qq,
                emailzip: data.real_zip_code,
                email: data.real_email,
                address: data.real_address.split(','),
                introduction: data.real_details_address,
            }
            this.myAddress = data.real_address.split(',')
          }
      })
    },
    components:{
     vipPahead: vip_pahead,
    }
}
    
</script>
<style lang="scss">
.address_page{
    .selec{
        background-color: #fff;
        margin-top: 10px;
        padding-bottom: 44px;
    }
    padding-top: 44px;
    .mint-field.is-textarea{
        height: auto;
        .mint-cell-wrapper{
            height: auto;
        }
    }
    .mint-cell:last-child{
        background-size: 92% 1px;
    }
    .btn{
        display: block;margin-top: 40px;
        width: 3rem; height: 0.45rem;
        margin: 0 auto;
        color: #fff;
        margin-top: 0.4rem;
        font-size: 17px;
        background-color: #e65400;
        border-radius: 22px;
    }
    .mint-cell .cell-title{
      width: 105px;
    }
    .addersP{
        width:2rem;
        overflow:hidden;
        text-overflow:ellipsis;
        -o-text-overflow:ellipsis;
        -webkit-text-overflow:ellipsis;
        -moz-text-overflow:ellipsis;
        white-space:nowrap;
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