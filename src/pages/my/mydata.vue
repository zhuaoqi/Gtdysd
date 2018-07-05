<template>
  <div class="mydata_page">
        <mt-cell title="个人信息" is-link to="/my/information">
        </mt-cell>
        <mt-cell title="联系方式" is-link to="/my/contact">
        </mt-cell>
        <div @click="openwork()">
          <mt-cell title="职业信息" is-link>
            <span v-if="work.company_position" style="color: #909090">{{work.company_position}}</span>
          </mt-cell>
        </div>
        <mt-cell title="个人标签" is-link to="/my/mylables">
        </mt-cell>
  </div>
</template>

<script>
import { Toast, Indicator, MessageBox } from 'mint-ui';

export default {
  data (){
    return {
      work:{},
      user_info: {}
    }
  },
  created(){
    if(localStorage.getItem('user_info')){
      this.user_info =  JSON.parse(localStorage.getItem('user_info'));
    }
    this.$axios.post('/',{method:'usercenter.user.jobinfo',gt_id: this.user_info.gt_id }).then((res)=>{
        console.log(res)
        if(res.data.status == 0 ){
          this.work = res.data.data
        }
    })
    this.$store.commit('selechange',4)
    this.$store.commit('_change',{
      _logo   : false,
      _title  : '我的资料',
      _search : false,
      _topshow: true,
      _msg    : false,
      _bottshow: true,
      _regain : false,
      _back   : true
    })
  },
  methods: {
    openwork(){
      MessageBox.prompt('请输入部门/职业','提示',{inputPlaceholder:'请输入职业信息',inputType: 'text'}).then(({ value, action }) => {
        this.work.company_position = value
        if(this.work != ''){
          Indicator.open('保存中...');
          this.work.method = 'usercenter.user.jobupdate'
          this.$axios.post('/',this.work).then((res)=>{
              Indicator.close()
              if(res.data.status == 0 ){
                var cc = Toast({message: '操作成功',iconClass: 'icon-success'});
                setTimeout(()=>{cc.close(); },1000)
              }else Toast(res.data.msg)
          })
        }

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
  .mydata_page{
    margin-top: 0.1rem ;
    .mint-cell:last-child{
      background-image: none;
    }
    .mint-cell:first-child .mint-cell-wrapper{
          background-origin: content-box;
    }
  }
</style>
