<template>
  <div class="mycontact_page">
    <div @click= "openinput(1)">
      <mt-cell title="微信" is-link>
          <span v-if="!contact.weixin">请输入微信号</span>
          <span v-else style="color: #333">{{contact.weixin}}</span>
      </mt-cell>
    </div>
    <div @click="openinput(2)">
      <mt-cell title="邮箱" is-link>
          <span v-if="!contact.email">请输入邮箱号</span>
          <span v-else style="color: #333">{{contact.email}}</span>
      </mt-cell>
    </div>
    <div @click= "openinput(3)">
      <mt-cell title="QQ" is-link>
          <span v-if="!contact.qq">请输入QQ号</span>
          <span v-else style="color: #333">{{contact.qq}}</span>
      </mt-cell>
    </div>
    <div @click= "openinput(4)">
      <mt-cell title="手机号" is-link>
          <span v-if="!contact.phone">请输入手机号</span>
          <span v-else style="color: #333">{{contact.phone}}</span>
      </mt-cell>
    </div>
    <div class="button">
      <button type="button" @click="seve()">保存</button>
    </div>
  </div>
</template>

<script>
import { Toast, Indicator, MessageBox } from 'mint-ui';
export default {
  data (){
    return {
      contact:{},
      user_info: {}
    }
  },
  created(){
    if(localStorage.getItem('user_info')){
      this.user_info =  JSON.parse(localStorage.getItem('user_info'));
    }
    this.$axios.post('/',{method:'usercenter.user.addressinfo',gt_id: this.user_info.gt_id }).then((res)=>{
        if(res.data.status == 0 ){
          this.contact = res.data.data
        }
    })
    this.$store.commit('selechange',4)
    this.$store.commit('_change',{
      _logo   : false,
      _title  : '联系方式',
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
      let contact = this.contact 
      if(contact.qq == '' && contact.email == '' && contact.phone == '' && contact.weixin == ""){
        Toast('请输入信息');
        return
      }
      Indicator.open('保存中...');
      this.$axios.post('/',{method:'usercenter.user.addressupdate',wechat: contact.weixin, qq: contact.qq, phone: contact.phone, email: contact.email }).then((res)=>{
          Indicator.close();
          if(res.data.status == 0 ){
            var cc = Toast({ message: '操作成功',iconClass: 'icon-success'});
            setTimeout(()=>{cc.close(); },1000)
          }else Toast(res.data.msg)
      })
      setTimeout(() => {
        
        
      }, 1000);
      
    },
    openinput(val){
      switch (Number(val)){
        case 1:
         MessageBox.prompt('请输入微信号','提示',{ inputValidator: (val) => {  
            if (val === null) {  
              return true;
            }  
            return !(val.length < 5 || val.length > 16)  
          }, inputErrorMessage: '长度必须在5~16位',inputPlaceholder:'请输入 5 - 16位字符串',inputType: 'text'}).then(({ value, action }) => {
            this.contact.weixin = value
            Indicator.open();
            setTimeout(function(){Indicator.close()}, 200)
          });
        
        break;
        case 2:
          MessageBox.prompt('请输入邮箱号','提示',{inputPlaceholder:'请输入邮箱号',inputType: 'email'}).then(({ value, action }) => {
            this.contact.email = value
            Indicator.open();
            setTimeout(function(){Indicator.close()}, 200)
          });
        break;
        case 3:
          MessageBox.prompt('请输入QQ号','提示',{inputPlaceholder:'请输入QQ号',inputType: 'number'}).then(({ value, action }) => {
            this.contact.qq = value
            Indicator.open();
            setTimeout(function(){Indicator.close()}, 200)
          });
        break;
        case 4:
          MessageBox.prompt('请输入手机号','提示',{inputValidator: (val) => {if (val === null) {  
              return true;
            }  
            return !(val.length < 11 || val.length > 11)  
          }, inputErrorMessage: '长度必须在11位',inputPlaceholder:'请输入手机号',inputType: 'number'}).then(({ value, action }) => {
            this.contact.phone = value
            Indicator.open();
            setTimeout(function(){Indicator.close()}, 200)
          });
        break;
      }
    }
  },
  computed: {

  },
  components: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"> 
  .mycontact_page{
    margin-top: 0.1rem;
    .mint-cell:last-child{
      background-image: none;
    }
  .mint-cell:first-child .mint-cell-wrapper {
    background-origin: content-box;
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
}
</style>
