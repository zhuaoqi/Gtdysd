<template>
  <main>
  <transition :name="transitionName">
    <router-view ref="bbb" :style="{'margin-top':store._topshow? '44px': '','padding-bottom': store._bottshow?'55px': ''}" class="child-view"/>
  </transition>
  </main>
</template>

<script>
  export default {
    data () {
      return {
        transitionName: 'slide-left'
      }
    },
    methods: {
      toggle(id){
        console.log('ss')
      },
      toJSON(){

    }
  },
  computed:{
    store(){
      let data = { 
        _topshow: this.$store.state._topshow,
        _bottshow: this.$store.state._bottshow,
      }
      return data
    }
  },
  beforeRouteUpdate (to, from, next) {
      let isBack = this.$router.isBack
      if (isBack) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-left'
      }
      this.$router.isBack = false
      next()
  },
  mounted(){
    window.addEventListener("popstate", (e) =>{
          this.isBack = true
      }, false);
  }

  }
</script>

<style scoped>
  .child-view {
    position: absolute;
    width:100%;
    transition: all .3s cubic-bezier(.55,0,.1,1);
    
  }
  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(200px, 0);
    transform: translate(200px, 0);
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-200px, 0);
    transform: translate(-200px, 0);
  }
  main{

  }
</style>