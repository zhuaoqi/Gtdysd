<template>
  <div class="comm_page">
    <div class="user_msg" ref="usermsg">
      <div class="user_msg_t">
        <img :src="item.user_info.avatar || '/static/img/morentouxiang --icon.png'" alt="">
      </div>
      <div>
        <div style="line-height: 35px;">
          <p>{{item.user_info.nickname}}</p>
          <p></p>
        </div>
      </div>
      <div class="clear"></div>
      <p style="color: #4e4e4e; word-wrap: break-word; text-indent: 0.5rem;">{{item.content}}</p>
      <div class="revidate">
        <p style="font-size: 12px;color: #909090;">{{item.updatetime}}</p>
        <p class="faubl">
          <span class="comment_icon" @click="_comment(item.id,item.user_info.gt_id,item.content,item.fir_answer_id,item.user_info.nickname)"></span>
        </p>
      </div>
    </div>
      <div class="Reviewarea"  :style="{'height': height,'overflow':'scroll'}">
        <mt-loadmore :auto-fill="false" :bottom-method="loadBottom" :top-method="loadTop" :bottom-all-loaded="allLoaded" ref="loadmore">
          <ul>
            <li class="clearfix" v-for="(itemsss,index) in comment">
              <div>
                </div>
                <div>
                  <p>{{itemsss.user_info.nickname}}<span style="padding: 0 5px;color: #e65400">回复</span>{{itemsss.dis_nickname}}</p>
                  <span v-html="itemsss.content"></span>
                  <div class="revidate">
                    <p>{{itemsss.updatetime}}</p>
                    <p class="faubl">
                      <span class="comment_icon" @click="_comment(item.id,itemsss.user_info.gt_id,itemsss.content,itemsss.fir_answer_id,itemsss.user_info.nickname)"></span>
                    </p>
                  </div>
                </div>
              </li>
          </ul>
        </mt-loadmore>
        
      </div>
      <reply :isshow ="issho" :placeholder = "placeholder" v-on:getContent="getContent" ref='input'></reply>
  </div>
</template>

<script>
import { expression,Transformation, deepClone } from '../assets/js/g.js'
import { Toast, Indicator } from 'mint-ui';
import reply from '../components/reply';

export default {
  data (){
    return {
      allLoaded: false,
      placeholder: '',
      issho: true,
      loading: false,
      comment:[],
      item: '',
      comm:{
          note_id: '',
          content: '',
          note_name: '',
          discuss_userid: 0,
          fir_answer_id: 0,
          method:'note.answer.add'
      },
      height: 0,
      page: 1
    }
  },
  created(){
    if(sessionStorage.getItem('commentdetails') == undefined){
      this.$router.push('/404')
      return
    }
    this.item = JSON.parse(sessionStorage.getItem('commentdetails'));
    this.comm.note_id = this.item.params.uid
    this.comm.note_name = this.item.note_name
    this.placeholder = '回复: '+ this.item.user_info.nickname
    this.$store.commit('selechange',4)
    this.$store.commit('_change',{
      _logo   : false,
      _title  : '评论详情',
      _search : false,
      _topshow: true,
      _msg    : false,
      _bottshow: false,
      _regain : false,
      _back   : true
    })

  },
  methods: {
    getContent(data){
      if(data.trim() == ''){
        Toast('评论内容不能为空')
        return
      }
      let da = this.comm
      da.content = Transformation(data)
      var dd = {};
      for(var i in da){
          dd[i] = da[i];
      }
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
    frends_list(){
      this.allLoaded = true
      let data = this.item.params
      this.$axios.post('/',{method:'note.answer.list',note_id: data.uid,page: data.page,pagesize: data.pagesize ,fir_answer_id: data.fir_answer_id}).then( (res) => {
        let data = res.data.data
        console.log(data)
        for (let i = 0; i < data.length; i++) {
          data[i].content = expression(data[i].content);
        }
        this.comment = data
      })
    },
    _comment(note_id,discuss_id,content,fir_answer_id,name){
      this.$nextTick(function() {
        this.$refs.input.$refs.textareaHtml.innerHTML = ''
        this.$refs.input.$refs.textareaHtml.focus()
      })
      this.placeholder = '回复: '+ name
      this.comm.discuss_userid = Number(discuss_id)
      this.comm.fir_answer_id = Number(note_id)
    },
    loadBottom() {
      // 加载更多数据
      let data = this.item.params
      this.page += 1
      Indicator.open();
      this.$axios.post('/',{method:'note.answer.list',note_id: data.uid,page: this.page,pagesize: data.pagesize ,fir_answer_id: data.fir_answer_id}).then( (res) => {
        Indicator.close();
        if(res.data.status == 0){
          if(res.data.data == null){
            Toast('已加载全部评论')
            this.allLoaded = true;// 若数据已全部获取完毕
            return
          }
          let data = res.data.data
          for (let i = 0; i < data.length; i++) {
             data[i].content = expression(data[i].content);
            }
          this.comment = this.comment.concat(data)
        }else Toast(res.data.msg)
      })
      //
      this.$refs.loadmore.onBottomLoaded();
    },
    loadTop(){
      this.$refs.loadmore.onTopLoaded();
    }
  },
  mounted() {
    this.height = document.body.clientHeight - (110 + this.$refs.usermsg.clientHeight) +'px'
    this.frends_list()
  },
  components: {
    reply: reply
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"> 
  .comm_page{
    .user_msg{
      background-color:#fff;
      padding:0.1rem 0.15rem 0 0.15rem;
    }
    .Reviewarea{
    background-color: #fff;
    margin-top: 10px;
    ul{
      padding: 0.1rem 0.15rem 0 0.15rem;
    }
    li{
      display: block;
      margin-top:0.1rem;
      div:first-child{
        width:0;height: 0;
      }
      >div{
        float: left;
        width: 100%;
      }
      div:nth-child(2){
        margin-left: 0rem;
        padding-bottom: 0.07rem;
        border-bottom: 1px solid #dcdcdc;
        padding-left: 0.1rem;
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
      font-size: 12px;
      color: #909090;
      .faubl{
        width: 0.15rem;
        
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
}
  
  
 
</style>
