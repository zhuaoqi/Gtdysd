<template>
  <div class="details_page">
    <div class="user_msg" v-for="(item,index) in note_inf" :key="index">
      <div @click="$router.push({ name: 'othersIndex',query: { uid: item.data.user_info.gt_id}})" class="user_msg_t">
        <img :src="item.data.user_info.avatar || '/static/img/morentouxiang --icon.png'" alt="">
      </div>
      <div>
        <div>
          <p>{{item.data.user_info.nickname}}</p>
          <p>{{item.data.update_time}}</p>
        </div>
        <div class="labels">
          <!-- <span>{{item.data.game_type_str}}</span> -->
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
      <template v-if="item.extra_id" >
              <div class="user_msg" :style="{'background-color': item.extra_id[item.extra_id.length -1] == null ? '#fff': '#f6f6f6'}">
                <template v-if="item.extra_id[item.extra_id.length -1] != null">
                    <div  @click="$router.push({ name: 'othersIndex',query: { uid: item.extra_id[item.extra_id.length -1].user_info.gt_id}})" class="user_msg_t">
                      <img :src="item.extra_id[item.extra_id.length -1].user_info.avatar || '/static/img/morentouxiang --icon.png'" alt="">
                    </div>
                    <div style="width:2.8rem;">
                      <div>
                        <p>{{item.extra_id[item.extra_id.length -1].user_info.nickname}}</p>
                        <p>{{item.extra_id[item.extra_id.length -1].update_time}}</p>
                      </div>
                      <div class="labels">
                        <span>{{item.extra_id[item.extra_id.length -1].game_type_str}}</span>
                        <span>{{item.extra_id[item.extra_id.length -1].note_type_str}}</span>
                      </div>
                    </div>
                    <div class="clear"></div>
                    <div>
                      <i>{{item.extra_id[item.extra_id.length -1].title}}</i>
                    </div>
                    <div>
                      <p style="text-indent:0;" v-html="item.extra_id[item.extra_id.length -1].contents"></p>
                      <div v-for="(src, key) in item.extra_id[item.extra_id.length -1].uurl" :key="key" class="t-pic">
                         <img v-if="src.search('iframe') == -1" :src="src+'?x-oss-process=image/resize,m_fill,h_200,w_200'"/>
                         <div v-else v-html="dom(src)"> </div>
                      </div>
                    </div>
                </template>
                <template v-else>
                    抱歉该帖已删除
                </template>
              </div>
            </template>
      <div class="startPointer border_t" style="position: relative">
        <a @click="_comment()"><i class="reply-icon"></i><span v-if="item.data.attribute_num.comment == 0">评论</span> <span v-else>{{item.data.attribute_num.comment}}</span></a>
        <a @click="_fenxing(item.data.uid,item)"><i class="share-icon"></i><span>分享</span></a>
        <a @click="like(item.data.uid,item.data.title,item.data.user_info.gt_id,item.islike,index)" :class="{'like': item.islike}">
          <i class="collect-icon"></i>
          <span v-if="!item.islike">收藏</span> 
          <span v-else>已收藏</span>
        </a>
        <a @click="share(item.data.uid,item.data.title,item.data.user_info.gt_id,item.isscale,index)" :class="{'scale': item.isscale}"><i class="laud-icon"></i><span v-if="item.data.attribute_num.like == 0">点赞</span> <span v-else>{{item.data.attribute_num.like}}</span></a>
      </div>
    </div>
      <div class="Reviewarea">
        <ul>
          <li class="clearfix" v-for="(item,index) in comment">
              <div>
                <img  @click="$router.push({ name: 'othersIndex',query: { uid: item.user_info.gt_id}})" :src="item.user_info.avatar || '/static/img/morentouxiang --icon.png'" alt="">
               
              </div>
              <div>
                <p>{{item.user_info.nickname}}</p>
                <span v-html="item.content"></span>
                <div class="revidate">
                  <p>{{item.updatetime}}</p>
                  <p class="faubl">
                    <span>
                      <span></span>
                    </span>
                    <span class="comment_icon" @click="_comment(item.id,item.user_info.gt_id,item.content,item.fir_answer_id,item.user_info.nickname,true)"></span>
                  </p>
                </div>
                <div v-if="item.count!=0" class="returns" @click="gocommdetails(item)">
                  查看全部{{item.count}}条回复&gt;
                </div>
              </div>
            </li>
        </ul>
         <p v-show="loading" class="page-infinite-loading">
            <span>
              <div style="border-top-color: rgb(204, 204, 204);border-left-color: rgb(204, 204, 204);border-bottom-color: rgb(204, 204, 204);height: 25px;width: 25px;"></div>
            </span>
            加载中...
          </p>
          <p v-show="loadings" style="text-align:center;line-height:25px;font-size: 12px;">已加载全部评论</p>
      </div>
      <div style="height: 50px;"></div>
      <reply :isshow ="issho" :placeholder = "placeholder" v-on:getContent="getContent" ref='input'></reply>
  </div>
</template>

<script>
import { expression, _like, _share ,Transformation, deepClone} from '../assets/js/g.js'
import { Toast, Indicator } from 'mint-ui';
import reply from '../components/reply';
export default {
  data (){
    return {
      issho: true,
      loading: false,
      loadings: false,
      isliding: true,
      note_inf:[],
      comment:[],
      uid: this.$route.query.notid,
      params: {
          uid: this.$route.query.notid,
          page:1,
          pagesize:5,
          fir_answer_id:0
      },
      comm:{
          note_id: this.$route.query.notid,
          content: '',
          note_name: '',
          discuss_userid: 0,
          fir_answer_id: 0,
          method:'note.answer.add'
        },
      placeholder: '说些什么吧...',
      page: ''
    }
  },
  created(){
    if( !this.$route.query.notid){
      this.$router.push('/404')
    }
    this.$store.commit('selechange',4)
    this.$store.commit('_change',{
      _logo   : false,
      _title  : '帖子详情',
      _search : false,
      _topshow: true,
      _msg    : false,
      _bottshow: false,
      _regain : false,
      _back   : false,
      _goinx  : true
    })

  },
  methods: {
    gocommdetails(item){
      this.params.fir_answer_id = item.id
      item.params = this.params
      item.note_name = this.note_inf[0].data.title
      sessionStorage.setItem('commentdetails',JSON.stringify(item))
      this.$router.push({
        name: 'commentdetails'
      })
    },
    getContent(data){
      if(data.trim() == ''){
        Toast('评论内容不能为空')
        return
      }
      let da = this.comm
      da.content = Transformation(data)
      let dd = deepClone(da)
      this.$axios.post('/',dd).then( (res) => {
        if(res.data.status == 0){
          Toast('评论成功')
          this.frends_list()
          this.$refs.input.$refs.textareaHtml.innerHTML = '';
          this.$refs.input.$refs.textareaHtml.blur()
        }
        if(res.data.status == 201){
          Toast(res.data.msg)
          this.$router.push('/logo')
        }
      })
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
    },
    loadMore() {
      this.page = this.page+1
      this.isliding = false
      this.loading= true
      this.$axios.post('/',{method:'note.answer.list',note_id: this.params.uid,page: this.page ,pagesize: 5,fir_answer_id:0}).then( (res) => {
        this.isliding= true
        this.loading= false
        if(res.data.status == 0 ){
          if(res.data.data == null){
            this.loadings = true;
            this.isliding= false
            return
          }
          let comment = res.data.data
          for (let a = 0; a < comment.length; a++) {
            comment[a].content = expression(comment[a].content);
          }
          this.comment = this.comment.concat(comment)
        }
        
      })
    },
    _fenxing(id,item){ // 分享帖子
      if(!Boolean(window.localStorage.getItem("is_login"))){
        Toast('登录失效')
        this.$router.push('/logo')
        return false
      }
      sessionStorage.setItem('_fenxing',id)
      sessionStorage.setItem('tiezi',JSON.stringify(item));
      this.$router.push({
        name: 'share',
      })
    },
    _comment(note_id,discuss_id,content,fir_answer_id,name,type){
      this.issho = true
      this.$nextTick(function() {
        this.$refs.input.$refs.textareaHtml.innerHTML = ''
        this.$refs.input.$refs.textareaHtml.focus()
      })
      if(type){
        this.placeholder = '回复 '+ name
        this.comm.discuss_userid = Number(discuss_id)
        this.comm.fir_answer_id = Number(note_id)
      }else {
        this.placeholder = '说些什么吧...'
        this.comm.discuss_userid  = 0
        this.comm.fir_answer_id = 0
      }
      
    },
    // 收藏 帖子
    like(uid, tit, gtid, islike, index){
      this.note_inf[index].islike = !islike
      islike = islike ? 'no_collect':'collect'
      _like(this,uid,tit,gtid,islike)
    },
    //点赞 帖子
    share(uid, tit, gtid, isscale, index){
      this.note_inf[index].isscale = !isscale
      let scale = Number(this.note_inf[index].data.attribute_num.like)
      this.note_inf[index].data.attribute_num.like = isscale ? String(scale-1) : String(scale+1)
      isscale = isscale ? 'no_like':'like'
      _share(this,uid,tit,gtid,isscale)
    },
    frends_list(){
      Indicator.open();
      this.$axios.post('/',{method:'note.answer.info',note_id: this.uid}).then( (res) => {
        Indicator.close();
        let data = res.data.data.note_info.list
        let comment = res.data.data.answer_list
        this.comm.note_name = data[0].data.title
        if(data[0].extra_id){
          let length =  data[0].extra_id.length - 1
          data[0].extra_id[length].contents = expression(data[0].extra_id[length].contents);
          this.comm.note_name ='分享:' + data[0].extra_id[length].title
        }
        data[0].data.contents = expression(data[0].data.contents);
        data[0].isscale =  data[0].data.user_attribute.like == '0' ? false : true
        data[0].islike =  data[0].data.user_attribute.collect == '0' ? false : true
        
        if(comment.length == 0){
          this.loading = false;
          this.loadings = false;
           this.isliding= false
        }else this.isliding= true
        for (let a = 0; a < comment.length; a++) {
          comment[a].content = expression(comment[a].content);
        }
        this.page = 1
        this.note_inf = data
        this.comment = comment
      })
    }
  },
  mounted() {
    if(this.$route.params.isblur){
       this.$refs.input.$refs.textareaHtml.focus()
    }

    let _this = this
    this.frends_list();

    function getScrollTop(){
  　　var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
  　　if(document.body){
  　　　　bodyScrollTop = document.body.scrollTop;
  　　}
  　　if(document.documentElement){
  　　　　documentScrollTop = document.documentElement.scrollTop;
  　　}
  　　scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
  　　return scrollTop;
    }
    //文档的总高度
    function getScrollHeight(){
    　　var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
    　　if(document.body){
    　　　　bodyScrollHeight = document.body.scrollHeight;
    　　}
    　　if(document.documentElement){
    　　　　documentScrollHeight = document.documentElement.scrollHeight;
    　　}
    　　scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
    　　return scrollHeight;
    }
    //浏览器视口的高度
    function getWindowHeight(){
    　　var windowHeight = 0;
    　　if(document.compatMode == "CSS1Compat"){
    　　　　windowHeight = document.documentElement.clientHeight;
    　　}else{
    　　　　windowHeight = document.body.clientHeight;
    　　}
    　　return windowHeight;
    }
    window.onscroll = function(){
    　　if(getScrollTop() + getWindowHeight()+60 >= getScrollHeight()){
          if(_this.isliding){
            _this.loadMore()
          }　
    　　}
    };
  },
  components: {
    reply: reply
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"> 
  .details_page{
    .user_msg{
      background-color:#fff;
      padding:0.1rem 0.15rem 0 0.15rem;
      >.user_msg{
         padding:0.05rem 0.05rem 0 0.05rem;
      }
    }
    
  }
  .Reviewarea{
    background-color: #fff;
    margin-top: 10px;
    ul{
      padding: 0.1rem 0 0 0.15rem;
    }
    li{
      display: block;
      margin-top:0.1rem;
      div:first-child{
        width:0.35rem;height: 0.35rem;
        overflow: hidden;
        border-radius: 50%;
        img{
          width:100%;
        }
      }
      >div{
        float: left;
        width: 3rem;
      }
      div:nth-child(2){
        padding-bottom: 0.07rem;
        border-bottom: 1px solid #dcdcdc;
        margin-left: 0.1rem;
        >p{
          color: #333;
          font-size:0.14rem;
        }
        >span{
          color: #646464;
          font-size:0.13rem;
          line-height: 0.25rem;
          word-wrap: break-word;
          word-break: break-all;
          white-space: pre-wrap !important;
        }
        .returns{
          width: 100%; height: 0.2rem;
          margin-top: 0.05rem;
          line-height: 0.2rem;
          font-size: 12px;
          background-color:#f5f5f5;
          text-align: center;
          color: #ff5d00;
        }
      }
    }
  }
   .revidate{
    display:-ms-flexbox;
    -ms-flex-pack:justify;

    /* Firefox */
    display:-moz-box;
    -moz-box-pack:justify;

    /* Safari, Chrome, and Opera */
    display:-webkit-box;
    -webkit-box-pack:justify;

    /* W3C */
    display:box;
    box-pack:justify;
    
      font-size:0.12rem;
      color: #909090;
      .faubl{
        width: 0.7rem;
        display:-ms-flexbox;
        -ms-flex-pack:justify;

        /* Firefox */
        display:-moz-box;
        -moz-box-pack:justify;

        /* Safari, Chrome, and Opera */
        display:-webkit-box;
        -webkit-box-pack:justify;

        /* W3C */
        display:box;
        box-pack:justify;
        >span{
          display: block;
        }
      }
    }
 
</style>
