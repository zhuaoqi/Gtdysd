<template>
  <div class="share_page">
    <div class="input">
      <div ref="textareaHtml" class="textareadd" contenteditable="true" placeholder="说些什么吧..." maxlength="200" @focus="islook = false" @input="posttexr($event)"></div>
    </div>
    <imglode ref="selection" style="padding: 0 0.15rem;padding-bottom: 0.2rem;"></imglode>
      <div  class="user_msg"  v-for="(item,key,index) in data" :key="index">
            <div class="user_msg_t">
              <img :src="item.data.user_info.avatar || '/static/img/morentouxiang --icon.png'" alt="">
            </div>
            <div>
              <div>
                <p>{{item.data.user_info.nickname}}</p>
                <p>{{item.data.update_time}}</p>
              </div>
              <div class="labels">
               <!--  <span>{{item.data.game_type_str}}</span> -->
                <span>其他<!-- {{item.data.note_type_str}} --></span>
              </div>
            </div>
            <div class="clear"></div>
            <div>
              <i>{{item.data.title}}</i>
            </div>
            <div>
              <p style="text-indent:0;" v-html="item.data.contents"></p>
              <template v-if="item.data.uurl != ''"> 
                <div v-if="item.data.uurl[0].search('iframe') == -1" class="t-pic">
                  <img v-for="(src, key) in item.data.uurl" :key="key" :src="src+'?x-oss-process=image/resize,m_fill,h_200,w_200'"  class="wc-preview-img" @click.stop="$preview($event, item.data.uurl, key)"/>
                </div>
                <div v-else v-html="dom(item.data.uurl[0])"></div>
              </template>
            </div>
            <!-- 分享帖子 -->
            <template  v-if="item.extra_id" >
              <div class="user_msg" v-for="item in item.extra_id" :style="{'background-color': item == null ? '#fff': '#f6f6f6'}">
                <template v-if="item != null">
                    <div class="user_msg_t">
                      <img :src="item.user_info.avatar || '/static/img/morentouxiang --icon.png'" alt="">
                    </div>
                    <div style="width:2.8rem;">
                      <div>
                        <p>{{item.user_info.nickname}}</p>
                        <p>{{item.update_time}}</p>
                      </div>
                      <div class="labels">
                        <!-- <span>{{item.game_type_str}}</span> -->
                        <span>其他<!-- {{item.note_type_str}} --></span>
                      </div>
                    </div>
                    <div class="clear"></div>
                    <div>
                      <i>{{item.title}}</i>
                    </div>
                    <div>
                      <p style="text-indent:0;" v-html="item.contents"></p>
                      <div v-for="(src, key) in item.uurl" :key="key" class="t-pic">
                         <img v-if="src.search('iframe') == -1" :src="src+'?x-oss-process=image/resize,m_fill,h_200,w_200'"/>
                         <div v-else v-html="dom(src)"> </div>
                      </div>
                    </div>
                </template>
                <template v-else>
                    抱歉该帖已被删除
                </template>
              </div>
            </template>
          </div>

    <div class="bottom_labe" :class="{'Expression': islook}">
      <div class="push_img">
        <img src="/static/img/game_fenxiang_icon_biaoqing@3x.png" @click="openlook">
        <img src="/static/img/game_fenixiang_icon_tupian@3x.png" style="margin-left: 0.12rem;" @click="$refs.selection.addPic()">
      </div>
      <img-select v-on:getExpression="getExpression" :islook ="islook"></img-select>
    </div>
  </div>
</template>

<script>
import imglode from '../components/imglode'
import img from '../components/Emoticons'
export default {
  data (){
    return {
      type: 'share',
      islook: false,
      closelable: false,
      textareaHtml: '',
      uid: sessionStorage.getItem('_fenxing'),
      sendnote: {
        method: 'note.user.addShare',
        note_id: sessionStorage.getItem('_fenxing'),
        img: '',
        uurl: '',
        contents: '',
        cip: '10.10.10.10'
      },
      content: 0,
      data: []
   }
  },
  created(){
    if(this.uid == undefined){
      this.$router.push('/404')
      return
    }
    this.$store.commit('selechange',4)
    this.$store.commit('_change',{
      _logo   : false,
      _title  : '分享帖子',
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
    posttexr(e){
      this.sendnote.contents = e.target.innerHTML
    },
    getExpression(data){
      this.$refs.textareaHtml.appendChild(data)
      this.sendnote.contents = this.$refs.textareaHtml.innerHTML
    },
    dom(str){
      str = str.replace(/&amp;/g, '&');
      str = str.replace(/&lt;/g, '<');
      str = str.replace(/&gt;/g, '>');
      str = str.replace(/&quot;/g, '"');
      str = str.replace(/&#039;/g, "'");
      str = str.replace(/&#39;/g, "'");
      let dom = document.createElement("div");
      dom.innerHTML  = str
      dom.childNodes[0].width = '100%'
      dom.childNodes[0].height = '100%'
      return dom.innerHTML;
    }
  },
  mounted(){
    this.data.push(JSON.parse(sessionStorage.getItem('tiezi')))
  },
  computed:{
  
  },
  components: {
    imgSelect: img,
    imglode: imglode,
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
.share_page{
  background-color: #fff;
  .input{
    >.textareadd{
      width: 100%;min-height: 1rem;
      padding: 0 0.15rem;
      padding-top: 0.1rem;
      outline: none;
      line-height: 25px;
    }
  }
  .user_msg {
      background-color: #eee;
      padding:  0.15rem 0.1rem;
      .user_msg{
        padding:  0.15rem 0.1rem;
      } 
    }
  .bottom_labe{
    position: fixed;
    background-color: #fff;
    bottom: 0; left: 0;
    padding: 0 0.15rem;
    height: 0.6rem;width: 100%;
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
