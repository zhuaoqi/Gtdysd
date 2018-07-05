<template>
  <div class="reply" v-show="isshow" :class="{'Expression': issss}">
        <div>
          <p class="push_img">
            <img src="/static/img/game_fenxiang_icon_biaoqing@3x.png" @click="issss = true"/>
            <div ref="textareaHtml" class="textareass" contenteditable="true" :placeholder="placeholder" @focus="issss = false"></div>
          </p>
          <p style="color: #e65400" @click="pushcomm">发布</p>
        </div>
        <div class="boxd">
          <img-select v-on:getExpression="getExpression" :islook ="issss"></img-select>
        </div>
        <div style="height: 20px;"></div>
  </div>
</template>

<script>
import img from '../components/Emoticons'
export default {
  data() {
    return {
        issss: false
    }
  },
  methods: {
    getExpression(data){
      this.$refs.textareaHtml.append(data)
    },
    pushcomm(){
        let dom = this.$refs.textareaHtml.innerHTML 
        this.$emit('getContent', dom)
    }
  },
  components: {
    imgSelect: img
  },
  props:  ['isshow','placeholder']
}
  
</script>
<style lang="scss">
div[contenteditable]:empty:before{
    content: attr(placeholder);
    color: #909090;
}
div[contenteditable]:focus{
    content:none;
}
.reply{
  position: fixed;
  left: 0; bottom: 0;
  width: 100%;height: 50px;
  background-color: #fff;
  padding:0.1rem 0.15rem;
  line-height: 30px;
    transition: transform 0.5s;
  >div{
    display: -webkit-box;
    box-pack: justify;
    -webkit-box-pack: justify;
    background-color: #fff;
  }
  .push_img{
    img{
      width: 0.18rem;
    }
  }
  .textareass{
      width: 2.6rem;
      outline: none;
      line-height: 30px;
      height: 30px;overflow: hidden;
    }
}
.Expression{
  transform: translateY(-2rem);
}
.boxd{
  height:2rem;
  padding: 0.15rem 0;
  
}
</style>