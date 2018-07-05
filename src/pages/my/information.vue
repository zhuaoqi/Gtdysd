<template>
  <div class="information_page">
    <div @click="openMsgBox(1)">
      <mt-cell title="个人信息">
        {{user_info.gt_id}}
      </mt-cell>
    </div>
    <div @click="openMsgBox(2)">
      <mt-cell title="昵称" is-link>
        <span style="color: #333">{{user_info.nickname}}</span>
      </mt-cell>
    </div>
    <div @click="openMsgBox(3)">
      <mt-cell title="性别" is-link>
        <span v-if="user_info.gender == '3'">
          请选择你的性别
        </span> 
        <span v-else style="color: #333">{{user_info.gender == 1 ? '男': '女'}}</span>
      </mt-cell>
    </div>
    <div @click="openMsgBox(4)">
      <mt-cell title="所在地" is-link>
        <span v-if="user_info.province ==''">
           请选择地区
      </span> 
        <span v-else style="color: #333">{{user_info.province + '-' +user_info.city + '-' + user_info.area}}</span>
      </mt-cell>
    </div>
    <div @click="openMsgBox(5)">
      <mt-cell title="生日" is-link>
        <span v-if="user_info.birthday == ''">
          请选择生日
        </span>
        <span v-else style="color: #333">{{user_info.birthday}}</span>
      </mt-cell>
    </div>
    <div @click="openMsgBox(6)">
      <mt-cell title="血型" is-link>
        <span v-if="user_info.blood == ''">
          请选择血型
        </span>
        <span v-else style="color: #333">{{user_info.blood}}</span>
      </mt-cell>
    </div>
    <div @click="openMsgBox(7)">
      <mt-cell title="座右铭" is-link>
        <span v-if="user_info.motto==''">这个人很懒什么都没有留下</span>
        <span v-else style="white-space: nowrap; overflow: hidden;white-space: nowrap;text-overflow: ellipsis;width: 1.92rem;color: #333;text-align:right" >{{user_info.motto}}</span>
      </mt-cell>
    </div>
    <!--<div @click="openMsgBox(8)">
      <mt-cell title="游戏ID" is-link>
        请选择游戏信息
      </mt-cell>
    </div>-->
    <!-- 生日选择 -->
    <wv-picker
      :visible.sync="Birthdayshow"
      :columns="Birthdayselect"
      value-key="name"
      @confirm="confirmBirt"
    />
    <!-- 性别选择 -->
    <wv-picker
      :visible.sync="sexShow"
      :columns="sex"
      value-key="name"
      @confirm="confirmSex"
    />
    <!-- 血型选择 -->
    <wv-picker
      :visible.sync="BloodType"
      :columns="Bloods"
      @confirm="confirBlood"
    />
    <!-- 地区选择 -->
    <wv-picker
      :visible.sync="addressPickerShow"
      ref="addressPicker"
      :columns="addressColumns"
      @change="onAddressChange"
      @confirm="confirmAddress"
    />

    <div v-show="aasa">
      <div :class="[aasa? 'showblas': '', 'textareassdd']">
        <div class="_hander">
          提示
        </div>
        <div class="mas">
          请输入你的座右铭
        </div>
        <div class="textar">
          <div>
            <textarea v-model="user_info.motto" maxlength="30"></textarea>
            <div> {{user_info.motto.length}}/{{30}}</div>
          </div>
        </div>
        <div class="mint-msgbox-btns">
          <button class="mint-msgbox-btn mint-msgbox-cancel " @click="aasa = false;idbg = false">取消</button> 
          <button class="mint-msgbox-btn mint-msgbox-confirm" @click="confirtarea">确定</button></div>
      </div>
    </div>
    <!--<div v-show="idshow">
      <div :class="[idshow ? 'showblas': '', 'textarea']">
        <div class="_hander">
          游戏ID
        </div>
        <div class="slet">
          <select multiple>
            <option value="">手游</option>
            <option value="">bbb</option>
            <option value="">aaa</option>
            <option value="">bbb</option>
            <option value="">aaa</option>
            <option value="">bbb</option>
          </select>
        </div>
        <div class="mint-msgbox-btns">
          <button class="mint-msgbox-btn mint-msgbox-cancel " @click="idshow = false;idbg = false">取消</button> 
          <button class="mint-msgbox-btn mint-msgbox-confirm" @click="confirid">确定</button></div>
      </div>
    </div>-->
    <div v-show="idbg" @click="aasa = false;idbg = false;idshow = false" :class="[idbg? 'showbg': '', 'bgs']"></div>
    <div class="button">
      <button type="button" @click="seve()">保存</button>
    </div>
  </div>
</template>

<script>
import { Picker } from 'we-vue';
import Vue from 'vue';
import { Toast,Indicator,MessageBox } from 'mint-ui';
import chinaAreaData from 'china-area-data'
import myaddress from '../../../static/json/address.json'
const provinces = myaddress
Vue.component(Picker.name, Picker)
// 获取某一省下的市
const getCities = (province) => {
  let provinceCode
  for (let i in chinaAreaData[86]) {
    if (province === chinaAreaData[86][i]) {
      provinceCode = i
      break
    }
  }
  return typeof chinaAreaData[provinceCode] === 'object' ? Object.values(chinaAreaData[provinceCode]) : []
}
// 获取某一市下的区/县
function getAreas (province, city) {
  let provinceCode, cityCode
  for (let i in chinaAreaData[86]) {
    if (province === chinaAreaData[86][i]) {
      provinceCode = i
      break
    }
  }
  for (let i in chinaAreaData[provinceCode]) {
    if (city === chinaAreaData[provinceCode][i]) {
      cityCode = i
      break
    }
  }
  if (chinaAreaData[cityCode]) {
    return typeof chinaAreaData[cityCode] === 'object' ? Object.values(chinaAreaData[cityCode]) : []
  } else {
    // 只有两级的情况
    return []
  }
}
function PrefixInteger(num, n) {
      return (Array(n).join(0) + num).slice(-n);
}
function year(){
      let years = [];
      for(let a = 0;a < 110; a++){
        years.unshift(1900 + a)
      }
      return years
    }
function day(){
  let days = [];
    for(let a = 0;a < 30; a++){
      let v = a+1
      days.push(PrefixInteger(v,2))
    }
    return days
}
export default {
  data (){
    return {
      value:'' ,
      user_info: null,
      idshow: false,
     aasa: false,
     idbg: false,
     addressPickerShow: false,
     Birthdayshow: false,
     sexShow: false,
     BloodType: false,
     sex:[{
      values: [{
        name: '男',
        price: 1
      },{
        name: '女',
        price: 2
      }],
      defaultIndex: 2
     }],   
    addressColumns: [{
          values: provinces
        },
        {
          values: getCities('湖北省')
        },
        {
          values: getAreas('湖北省', '宜昌市')
        }],
    Birthdayselect: [{
      values: year(),
      defaultIndex: 10
    },{
      values: [
              '01',
              '02',
              '03',
              '04',
              '05',
              '06',
              '07',
              '08',
              '09',
              '10',
              '11',
              '12',
            ],
      defaultIndex: 0
    },{
      values: day(),
      defaultIndex: 0
    }],
    sex:[{
      values: [{
        name: '男',
        price: 1
      },{
        name: '女',
        price: 2
      }],
      defaultIndex: 1
     }], 
    Bloods:[{
      values: [
      'A',
      'B',
      'AB',
      'O',
      ],
      defaultIndex: 2
    }]
    }
  },
  created(){
    if(localStorage.getItem('user_info')){
      this.user_info =  JSON.parse(localStorage.getItem('user_info'));
    }
    this.$store.commit('selechange',4);
    this.$store.commit('_change',{
      _logo   : false,
      _title  : '个人信息',
      _search : false,
      _topshow: true,
      _msg    : false,
      _bottshow: true,
      _regain : false,
      _back   : true
    })
  },
  methods: {
    seve(){
      if(this.user_info.nickname == '') {
        Toast('请输入你的昵称')
        return
      }
      let user_info = this.user_info
      Indicator.open('保存中...');
      user_info.motto = user_info.motto == "" ? '这个人很懒什么都没有留下' : user_info.motto
      user_info.gender = user_info.gender == "男" ? '1' : '2'
      this.$axios.post('/',{method:'usercenter.user.userupdate',nickname:user_info.nickname, gender: user_info.gender, province: user_info.province, city: user_info.city, area: user_info.area, birthday: user_info.birthday, blood: user_info.blood, motto: user_info.motto}).then((res)=>{
          Indicator.close();
          console.log(res)
          if(res.data.status == 0){
            var cc = Toast({message: '操作成功',iconClass: 'icon-success'});
            setTimeout(()=>{
              cc.close();
            },1000)
            this.$axios.post('/',{method:'usercenter.login.info'}).then((res)=>{
                if(res.data.status == 0 ){
                  this.user_info = res.data.data
                  localStorage.setItem("user_info", JSON.stringify(res.data.data))
                }
            })
          } else Toast(res.data.msg);
      })
     
    },
    openMsgBox(val){
      switch (Number(val)){

        case 1:
          // MessageBox.prompt('请输入姓名').then(({ value, action }) => {
          //   this.massage.name = value
          //   Indicator.open();
          //   setTimeout(function(){Indicator.close()}, 200)
          // });
          break;
        case 2:
          MessageBox.prompt('请输入新的昵称','更改昵称',{ inputValidator: (val) => {  
            if (val === null) {  
              return false;
            }  
            return !(val.length < 2 || val.length > 6)  
          }, inputErrorMessage: '昵称长度必须在2~6位',inputPlaceholder:'请输入 2 - 6位字符串'}).then(({ value, action }) => {

            this.user_info.nickname = value
            Indicator.open();
            setTimeout(function(){Indicator.close()}, 200)
          });
          break;
        case 3:
          this.sexShow = true
          break;
        case 4:
          this.addressPickerShow = true
          break;
        case 5:
         this.Birthdayshow = true
         break;
        case 6:
         this.BloodType = true
         break;
        case 7:
         this.aasa = true
         this.idbg = true
         break;
        case 8:
          this.idshow = true
          this.idbg = true
          break;
      }

    },
    confirmBirt (picker, value) {
      console.log(picker.getValues())
        this.user_info.birthday = picker.getValues().join('-')
    },
    confirmSex(picker){
      this.user_info.gender = picker.getValues()[0].name == '男'? '1': '2'
    },
    confirBlood(picker){
       console.log(picker.getValues()[0])
      this.user_info.blood = picker.getValues()[0]
    },
    confirtarea(){
      this.aasa = false
      this.idbg = false
    },
    onAddressChange (picker, addressValues, slotIndex) {
      if (slotIndex === 0) {
        const cities = getCities(addressValues[0])
        picker.setColumnValues(1, cities)
        picker.setColumnValues(2, getAreas(addressValues[0], cities[0]))
      } else if (slotIndex === 1) {
        picker.setColumnValues(2, getAreas(addressValues[0], addressValues[1]))
      }
    },
    confirmAddress (picker) {
      console.log(picker.getValues())
      let add = picker.getValues()
      this.user_info.province = add[0]
      this.user_info.city = add[1]
      this.user_info.area = add[2] || ''

    },
    confirid(){
      this.idshow = false
      this.idbg = false
    }
  },
  computed: {

  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.addressPicker.setValues(['湖北省', '宜昌市', '长阳土家族自治县'])
    })
  },
  components: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"> 
  .information_page{
    margin-top: 0.1rem;
    .mint-cell:last-child{
      background-image: none;
    }
    .mint-cell-value{
      color: #909090;
    }
  }
/*! * WeUI v1.1.2 (https://github.com/weui/weui) * Copyright 2017 Tencent,Inc. * Licensed under the MIT license */html {-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}

input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration {display:none}
.weui-picker {position:fixed;width:100%;left:0;bottom:0;z-index:5000;-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-transform:translateY(100%);transform:translateY(100%);-webkit-transition:-webkit-transform .3s;transition:-webkit-transform .3s;transition:transform .3s;transition:transform .3s,-webkit-transform .3s}
.weui-picker__hd {display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;padding:9px 15px;background-color:#fff;position:relative;text-align:center;font-size:17px}
.weui-picker__hd:after {content:" ";position:absolute;left:0;bottom:0;right:0;height:1px;border-bottom:1px solid #e5e5e5;color:#e5e5e5;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(.5);transform:scaleY(.5)}
.weui-picker__action {display:block;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;color:#e65400}
.weui-picker__action:first-child {text-align:left;color:#888}
.weui-picker__action:last-child {text-align:right}
.weui-picker__bd {display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;position:relative;background-color:#fff;height:238px;overflow:hidden}
.weui-picker__group {-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;position:relative;height:100%}
.weui-picker__mask {top:0;height:100%;margin:0 auto;background:-webkit-linear-gradient(top,hsla(0,0%,100%,.95),hsla(0,0%,100%,.6)),-webkit-linear-gradient(bottom,hsla(0,0%,100%,.95),hsla(0,0%,100%,.6));background:-webkit-gradient(linear,left top,left bottom,from(hsla(0,0%,100%,.95)),to(hsla(0,0%,100%,.6))),-webkit-gradient(linear,left bottom,left top,from(hsla(0,0%,100%,.95)),to(hsla(0,0%,100%,.6)));background:linear-gradient(180deg,hsla(0,0%,100%,.95),hsla(0,0%,100%,.6)),linear-gradient(0deg,hsla(0,0%,100%,.95),hsla(0,0%,100%,.6));background-position:top,bottom;background-size:100% 102px;background-repeat:no-repeat;-webkit-transform:translateZ(0);transform:translateZ(0)}
.weui-picker__indicator,.weui-picker__mask {position:absolute;left:0;width:100%;z-index:3}
.weui-picker__indicator {height:34px;top:102px}
.weui-picker__indicator:before {top:0;border-top:1px solid #e5e5e5;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5)}
.weui-picker__indicator:after,.weui-picker__indicator:before {content:" ";position:absolute;left:0;right:0;height:1px;color:#e5e5e5}
.weui-picker__indicator:after {bottom:0;border-bottom:1px solid #e5e5e5;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(.5);transform:scaleY(.5)}
.weui-picker__content {position:absolute;top:0;left:0;width:100%}
.weui-picker__item {padding:0;height:34px;line-height:34px;text-align:center;color:#000;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}
.weui-picker__item_disabled {color:#999}
@-webkit-keyframes a {0% {-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}
to {-webkit-transform:translateZ(0);transform:translateZ(0)}
}
@keyframes a {0% {-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}
to {-webkit-transform:translateZ(0);transform:translateZ(0)}
}
.weui-animate-slide-up {-webkit-animation:a ease .3s forwards;animation:a ease .3s forwards}
@-webkit-keyframes b {0% {-webkit-transform:translateZ(0);transform:translateZ(0)}
to {-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}
}
@keyframes b {0% {-webkit-transform:translateZ(0);transform:translateZ(0)}
to {-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}
}
.weui-animate-slide-down {-webkit-animation:b ease .3s forwards;animation:b ease .3s forwards}
@-webkit-keyframes c {0% {opacity:0}
to {opacity:1}
}
@keyframes c {0% {opacity:0}
to {opacity:1}
}
.weui-animate-fade-in {-webkit-animation:c ease .3s forwards;animation:c ease .3s forwards}
@-webkit-keyframes d {0% {opacity:1}
to {opacity:0}
}
@keyframes d {0% {opacity:1}
to {opacity:0}
}

.weui-picker[data-v-4b095bae] {-webkit-transform:none;transform:none}
.wv-picker-column-divider[data-v-55a8055c] {-webkit-transform:translateY(106px);transform:translateY(106px)}
.weui-mask, .weui-mask_transparent {
    position: fixed;
    z-index: 1000;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
}
.weui-mask {
    background: rgba(0,0,0,.6);
}

.mint-msgbox-btns{
    height: 60px;
    display: block;
    padding: 15px 20px 15px;
    button:first-child{
    float: left;
    background-color: #dcdcdc;
    }
     button:last-child{
      float: right;
      color: #fff;
      background-color: #e65400;
    }
}
.mint-msgbox-input input{
  max-height: 40px;
}
 .mint-msgbox-btn{
  width: 0.9rem;
  height: 0.3rem;
  line-height: 0.3rem;
  color: #fff;
  font-size: 14px;
  border-radius: 60px;
}



.textareassdd{
    position: fixed;
    top: 30%;
    left: 8%;
    background-color: #fff;
    width: 85%;
    border-radius: 3px;
    font-size: 16px;
    z-index: 2018;

    ._hander{
      padding: 15px 0 0;
      text-align: center;
      padding-left: 0;
      margin-bottom: 0;
      font-size: 16px;
      font-weight: 700;
      color: #333;
    }
    .mas{
      color: #999;
      margin: 0;
      text-align: center;
      line-height: 36px;
    }
    .textar{
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      flex: 1;
      padding: 10px 15px;
      textarea{
        display: block;
        border: 0;
        resize: none;
        width: 100%;
        color: inherit;
        font-size: 0.14rem;
        line-height: inherit;
        outline: 0;
        padding: 5px;
        height: 1rem;
      }
       >div{
         border:1px solid #e5e5e5;
         >div{
            color: #b2b2b2;
            text-align: right;
          }
       }
    }
}
.button{
  width: 100%;margin-top:0.75rem;
  button{
    display: block;outline: 0;
    overflow: hidden;border: 0;
    width: 3rem;height: 0.45rem;
    margin: 0 auto;border-radius: 30px;
    background-color:#e65400;
    color: #fff;font-size: 0.2rem;
    line-height: 0.45rem;
  }
}
.slet{
  width: 2rem; margin: 0 auto;
  select{
    width: 100%;
  }
}
.bgs{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background: #000;
    z-index: 2012;
    opacity: 0.1;
    transition: all 0.5s;
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
.showblas{
  animation: change 0.3s linear;
}
.showbg{
  opacity: 0.6;
}


</style>
