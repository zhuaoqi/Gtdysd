<template>
  <div class="sysconfig_page">
    <mt-button size="large" type="danger" @click="quit">退出当前账号</mt-button>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  data (){
    return {
     
    }
  },
  created(){
    this.$store.commit('_change',{
      _logo   : false,
      _title  : '系统设置',
      _search : false,
      _topshow: true,
      _bottshow: true,
      _regain : false,
      _back   : true
    })
    this.$store.commit('selechange',4)
  },
  methods: {
    quit(){
      this.$axios.post('/',{method:'usercenter.login.logout'}).then( (res) => {
        if(res.data.status == 0){
          localStorage.clear();
          Toast('退出账号成功')
          this.$router.goBack()
        }else Toast(res.data.msg)
      })
      
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
  .sysconfig_page{
    text-align:center;
    button{
      width:80%;
      margin: 0 auto;
      margin-top: 0.2rem;
    }

  }
</style>
