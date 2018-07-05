<template>
  <div class="sign">
    <p>添加描述兴趣，爱好游戏等方面的词语，让更多人找到你，让你找到更多同类，最多添加6个标签</p>
    <button @click="addlabel">+ 自定义标签</button>
    <div class="m-sign clearfix">
      <em v-for="(item,index) of data">
        {{item}}
        <q @click="del(index)"></q>
      </em>
    </div>
    <div class="button">
      <button type="button" @click="seve">保存</button>
    </div>

  </div>
</template>

<script>
import { Toast,Indicator,MessageBox } from 'mint-ui';
export default {
  data (){
    return {
     data:[],
     user_info: {}
    }
  },
  created(){
    if(localStorage.getItem('user_info')){
      this.user_info =  JSON.parse(localStorage.getItem('user_info'));
    }
    this.$axios.post('/',{method:'usercenter.user.taginfo',gt_id: this.user_info.gt_id }).then((res)=>{
        if(res.data.status == 0 ){
          if(res.data.data.tag_info!=null){
            this.data = res.data.data.tag_info.split(',') || []
          }
        }
    })
    this.$store.commit('selechange',4)
    this.$store.commit('_change',{
      _logo   : false,
      _title  : '个人标签',
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
      if(this.data == []){
        Toast('标签信息为空')
        return
      }
      Indicator.open('保存中...');
      this.$axios.post('/',{method:'usercenter.user.tagupdate',data: this.data.join(',') }).then((res)=>{
        Indicator.close();
        console.log(res)
        if(res.data.status == 0){
          Toast({message: '操作成功',iconClass: 'icon-success'});
        }else Toast(res.data.msg)
      })   
    },
    del(index){
      this.data.splice(index,1) 
    },
    addlabel(){
      MessageBox.prompt('请输入标签名称','',{ inputValidator: (val) => {  
            if (val === null) {  
              return true;
            }  
            return !(val.length < 2 || val.length > 6 )  
          }, inputErrorMessage: '标签长度必须在2~6位',inputPlaceholder:'请输入 2 - 6位字符串'}).then(({ value, action }) => {
            value = value || '';
           if(value.trim() != "" && this.data.length <= 5){
              this.data.push(value);
              Indicator.open();
              setTimeout(function(){Indicator.close()}, 200)
           }else Toast('最多选择6个标签')
          });
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
  .sign{padding: 0.1rem 0.15rem;}
  .sign p{font-size:14px;color: #777}
  .sign button{display: block;width: 1.3rem;height:0.35rem;border-radius: 1.1rem;background: #dcdcdc;font-size: 0.14rem;line-height: 0.35rem;color: #fff;margin-top: 0.6rem;}
  .m-sign{display: block;width:100%;height:auto;margin-top: 0.15rem;padding: 0.15rem 0rem;}
  .m-sign>em{padding:0.05rem 0.10rem;font-size: 0.14rem;color: #fff;background: #e65400;border-radius:1.1rem;position: relative;margin-right: 0.1rem;float: left;margin-bottom: 0.15rem;}
  .m-sign>em>q{display: block;width: 0.14rem;height:0.14rem;background: #e60000;border-radius: 100%;position: absolute;right: -0.04rem;top: -0.04rem;} 
  .m-sign>em>q:before{display: block;content:"";width:0.1rem;height:0.02rem;background: #fff;top: 0.06rem;left: 0.02rem;transform:rotate(45deg);position: absolute}
  .m-sign>em>q:after{display: block;content:"";width:0.1rem;height:0.02rem;background: #fff;top: 0.06rem;left: 0.02rem;transform:rotate(135deg);position: absolute;}
  .button{
    width: 100%; margin-top: 0.75rem;
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

</style>
