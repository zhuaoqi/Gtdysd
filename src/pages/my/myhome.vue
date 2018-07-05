<template>
  <div ref="mydata">
    <div class="myhome_page">
       <!--search 先去掉-->
      <!--<mt-search v-model="value" cancel-text="取消" placeholder="搜索"></mt-search>-->
      <mt-navbar v-model="sele">
        <mt-tab-item id="1">推送</mt-tab-item>
        <mt-tab-item id="2">分享</mt-tab-item>
        <mt-tab-item id="3">收藏</mt-tab-item>
        <mt-tab-item id="4">点赞</mt-tab-item>
        <mt-tab-item id="5">评论</mt-tab-item>
      </mt-navbar>
      <div :style="{'height': height,'overflow':'scroll'}">
        <mt-loadmore :autoFill='false' :bottom-method="loadBottom" :top-method="loadTop" :bottom-all-loaded="allLoaded" ref="loadmore">
          <ul id="ullist" v-if="isdata">
            <li v-if="PostList" v-for="(item,index) in PostList" :key="index">
              <div class="user_msg">
                <div class="user_msg_t">
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
                <div @click="godetails(item.data.uid)">
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
                        <div @click="godetails(item.uid)">
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
                <div class="startPointer border_t" style="position: relative">
                  <a @click="godetails(item.data.uid,true)"><i class="reply-icon"></i><span v-if="item.data.attribute_num.comment == 0">评论</span> <span v-else>{{item.data.attribute_num.comment}}</span></a>
                  <a @click="_fenxing(item.data.uid,item)"><i class="share-icon"></i><span>分享</span></a>
                  <a @click="like(item.data.uid,item.data.title,item.data.user_info.gt_id,item.islike,index)" :class="{'like': item.islike}">
                    <i class="collect-icon"></i>
                    <span v-if="!item.islike">收藏</span> 
                    <span v-else>已收藏</span>
                  </a>
                  <a @click="share(item.data.uid,item.data.title,item.data.user_info.gt_id,item.isscale,index)" :class="{'scale': item.isscale}"><i class="laud-icon"></i><span v-if="item.data.attribute_num.like == 0">点赞</span> <span v-else>{{item.data.attribute_num.like}}</span></a>
                </div>
              </div>
            </li>
          </ul>
        </mt-loadmore>
      </div>
    </div>
  </div>
</template>

<script>
import { Indicator, Toast } from 'mint-ui';
import { expression, _like, _share } from '../../assets/js/g.js'
export default {
  data (){
    return {
      allLoaded:false,
      user_info: null,
      sele: '1',
      page: 1,
      PostList: null,
      height: document.body.clientHeight - 140 +'px',
      isdata: false
  }
},
  created(){
    this.user_info =  JSON.parse(localStorage.getItem('user_info'));
    this.$store.commit('selechange',4)
    this.$store.commit('_change',{
      _logo   : false,
      _title  : '我的地盘',
      _search : false,
      _topshow: true,
      _msg    : false,
      _bottshow: true,
      _regain : false,
      _back   : true
    })
  },
  methods: {
    like(uid, tit, gtid, islike, index){// 收藏帖子
      this.PostList[index].islike = !islike
      islike = islike ? 'no_collect':'collect'
      _like(this,uid,tit,gtid,islike)
    },
    share(uid, tit, gtid, isscale, index){// 电站帖子
      this.PostList[index].isscale = !isscale
      let scale = Number(this.PostList[index].data.attribute_num.like)
      this.PostList[index].data.attribute_num.like = isscale ? String(scale-1) : String(scale+1)
      isscale = isscale ? 'no_like':'like'
      _share(this,uid,tit,gtid,isscale)
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
        name: 'share'
      })
    },
    godetails(id,ty){
      this.$router.push({
        name: 'details',
        query: {
          notid: id,
          isblur: ty
        }
      })
    },
    getData(type,isT){
      Indicator.open();
      this.isdata = false
      this.allLoaded = false;
      this.$axios.post('/',{method:'note.user.userNote',behavior: type,noteConType: 'all',page: this.page,gt_id: this.user_info.gt_id}).then((res)=>{ 
          Indicator.close();
         this.isdata = true
         if(res.data.status == 0){
          if(isT == 'shi') Toast('刷新成功')
          let data = res.data.data.list
          if(data.length == 0){
            Toast('以加载全部数据~')
            this.allLoaded = true;
            return
          }
           for (var i = 0; i < data.length; i++) {
            data[i].data.contents = expression(data[i].data.contents);
            data[i].isscale =  data[i].data.user_attribute.like == '0' ? false : true
            data[i].islike =  data[i].data.user_attribute.collect == '0' ? false : true
            if(data[i].extra_id){
              if(data[i].extra_id[0] != null){
                for(let a = 0;a <data[i].extra_id.length; a++){
                  data[i].extra_id[a].contents = expression(data[i].extra_id[a].contents)
                }
              }
            }
          }
          if(isT == 'add'){
            this.PostList = this.PostList.concat(data)
          }else {
            this.PostList = data
          }
         } else Toast(res.data.msg)
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
    loadTop() {
      this.page = 1
      this.getData(this.sele,'shi')
    //...// 加载更多数据
      this.$refs.loadmore.onTopLoaded();
    },
    loadBottom() {
      //...// 加载更多数据
      this.page += 1
      this.getData(this.sele,'add')
      //// 若数据已全部获取完毕
      this.$refs.loadmore.onBottomLoaded();
    },
  },
  mounted(){
    this.getData(1)
    let Yid = 0;
    //按下
    this.$refs.mydata.ontouchstart = function(e){
      Yid = e.touches[0].pageX
    }
    //抬起
    this.$refs.mydata.ontouchend = (e)=>{
      this.translateX = 0
      if(Yid - e.changedTouches[0].pageX > 100){
        // 右移动 10 个像素以上
        if(this.sele == '5'){
          this.sele = '1'
        }else this.sele = String(Number(this.sele) + 1)
      }else if(Yid - e.changedTouches[0].pageX < -100){
        // 左移动
        if(this.sele == '1'){
          this.sele = '5'
        }else this.sele = String(Number(this.sele)-1)
      }
    }
  },
  computed: {

  },
  components: {

  },
  watch: {
    sele (val) {
      this.page = 1
     this.getData(val)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"> 
  .myhome_page{
    .mint-tab-item-label{
      font-size: 14px;
    }
    .user_msg{
      margin-top: 0.1rem;
      padding: 0.15rem 0.15rem 0.1rem 0.15rem;
      .user_msg{
        padding-right: 0.1rem;
        padding-left: 0.1rem;
      }
    }
    #ullist{
      //transform: translateX(100px)
    }
    .mint-navbar .mint-tab-item.is-selected:after{  
      content: '';
      width: 0.28rem;
      height: 0.03rem;
      position: absolute;
      bottom: 0px;
      left: 0.24rem;
      background: #e65400;
      border-radius: 0.02rem;
    }  
  }
</style>
