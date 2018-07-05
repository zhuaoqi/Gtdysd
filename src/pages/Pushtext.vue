<template>
  <div class="pushtext_page">
    <div class="input">
      <input type="textarea" autofocus placeholder="请输入文章标题" @focus="islook = false" v-model="sendnote.title" maxlength="20">
      <div class="border" style="position: relative;"></div>
      <div ref="textareaHtml" class="textarea" contenteditable="true" placeholder="说些什么吧..." maxlength="200" @focus="islook = false"  @input="posttexr($event)"></div>
      <div style="color: #b2b2b2;text-align: right;">
        {{content}}/200
      </div>
    </div>
    <div class="bottom_labe" :class="{'Expression': islook}">
      <select-label :biaoqian="biaoqian" v-on:getlables="getlables" v-on:togglelables="togglelables"></select-label>
      <div style="position: relative; margin-top: 0.1rem;" class="border"></div>
      <div class="push_img">
        <img src="/static/img/game_fenxiang_icon_biaoqing@3x.png" @click="openlook">
      </div>
      <img-select v-on:getExpression="getExpression" :islook ="islook"></img-select>
    </div>
  </div>
</template>

<script>
function gameType(axios){
    
}
import selectLables from '../components/selectlables'
import imglode from '../components/imglode'
import img from '../components/Emoticons'
export default {
  data (){
    return {
      type: 'text',
      islook: false,
      closelable: false,
      textareaHtml: '',
      biaoqian: {
          lables1:'',
          lables2: ['游戏攻略','游戏视频','游戏心得','游戏图片 ','玩家交流','开黑联机'],
          islables1: null,
          islables2: null
      },
      allGame:'',
      sendnote: {
        method: 'note.index.addNote',
        game_name: null,
        tag_type: null,
        title: '',
        img: '',
        uurl: '',
        contents: '',
        remember: 1,
        cip: '10.10.10.10'
      },
      content: 0
   }
  },
  created(){
    this.$store.commit('selechange',4)
    this.$store.commit('_change',{
      _logo   : false,
      _title  : '推送文章',
      _search : false,
      _topshow: true,
      _msg    : false,
      _bottshow: false,
      _regain : false,
      _back   : false,
      _cancel : true,
      _send   : true
    })
  },
  methods: {
    goBack(){
      this.$router.goBack()
    },
    openlook(){
      //this.$refs.textareaHtml.focus()
      this.islook = true
    },
    getlables(data){
      this.sendnote.game_name = data[0]
      this.sendnote.tag_type = data[1]
    },
    getExpression(data){
      this.$refs.textareaHtml.appendChild(data)
      this.sendnote.contents = this.$refs.textareaHtml.innerHTML
    },
    posttexr(e){
      this.sendnote.contents = e.target.innerHTML
      this.content = e.target.innerText.length
    },
    togglelables(data){
      switch(data){
        case 1:
          this.biaoqian.lables1 = this.allGame['手游']
          break;
        case 2:
          this.biaoqian.lables1 = this.allGame['网游']
          break;
        case 3:
          this.biaoqian.lables1 = this.allGame['单机游戏']
          break;
      }
    }
  },
  mounted(){
    this.$axios.post('/',{method:'note.index.gameAll'}).then((res) => {
      this.allGame = res.data.data
    })
  },
  computed:{
  
  },
  components: {
    imglode: imglode,
    selectLabel: selectLables,
    imgSelect: img
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"> 
input::-webkit-input-placeholder{
    color: #909090;
  }
input::-moz-placeholder{   /* Mozilla Firefox 19+ */
    color: #909090;
}
input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
    color: #909090;
}
input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
    color: #909090;
}
div[contenteditable]:empty:before{
    content: attr(placeholder);
    color: #909090;
}
div[contenteditable]:focus{
    content:none;
}
.pushtext_page{
  background-color: #fff;
  padding: 0 0.15rem;
  .input{
    input{
      border: 0;color: #333333;
      height: 0.5rem;padding: 0;
      font-size: 16px;
    }
    >.textarea{
      width: 100%;min-height: 1.8rem;
      padding-top: 0.1rem;
      outline: none;
      line-height: 25px;
    }
  }
}
.bottom_labe{
  position: fixed;
  background-color: #fff;
  bottom: 0; left: 0;
  padding: 0 0.15rem;
  padding-top: 0.1rem;
  height: 0.95rem;width: 100%;
  transition: transform 0.5s;
  span{
    color: #2c3e50;
    padding: 0.05rem 0.1rem;
    font-size: 0.11rem;
    margin-right: 0.06rem;
    float: left;
  }
  .push_img{
    height: 0.5rem;line-height: 0.5rem;
    img{
      width: 0.18rem;
    }
  }
}
.Expression{
  transform: translateY(-2.2rem);
}


.donghua{
  animation: change 0.3s;
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
</style>
