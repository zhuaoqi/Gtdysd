<template>
  <div ref="index" class="index">
    <mt-swipe class="banner1">
        <mt-swipe-item  v-for="(item,index) in imageList" :key="index">
          <router-link :to="item.href">
            <img :src="item.src">
          </router-link>
      </mt-swipe-item>
    </mt-swipe>
      <mt-navbar v-model="selected" class="border">
        <template v-for="(item,index) of massgeclass"  >
          <mt-tab-item :id="String(index+1)">{{item}}</mt-tab-item>
        </template>
        <mt-tab-container v-model="selected" v-show="vShow"  :class="selected != 1 ? 'border':''">
          <mt-tab-container-item  v-for="(item,index) of massgeclassdata" :id="String(index+2)" :key="index">   
            <span v-for="(array,key,index) of item" :class="selectindex == key ? 'isSelected':''" @click.stop="selectG(key)" :key="index">{{ array }}</span>
          </mt-tab-container-item>
        </mt-tab-container>
      </mt-navbar>
      <mt-swipe :auto="0" :show-indicators="false" class="banner2">
        <mt-swipe-item v-for="(item,index) in Settoplist" :key="index">
          <div class="user_msg">
            <div class="user_msg_t">
              <img src="../assets/Official.png" alt="">
              <span></span>
            </div>
            <div>
              <div>
                <p>电娱时代官方</p>
                <p>{{item.data.update_time}}</p>
              </div>
              <div class="labels">
                <!-- <span v-if="item.data.game_type_str">{{item.data.game_type_str}}</span> -->
                <span>其他<!-- {{item.data.note_type_str}} --></span>
              </div>
            </div>
            <div class="clear"></div>
            <div>
              <span>置顶</span>
              <span>{{item.data.title}}</span>
            </div>
            <div @click="godetails(item.data.uid)">
              <p v-html="item.data.contents"></p>
            </div>
            <div class="startPointer border_t" style="position: relative">
              <a @click="godetails(item.data.uid,true)"><i class="reply-icon"></i><span v-if="item.data.attribute_num.comment == 0">评论</span> <span v-else>{{item.data.attribute_num.comment}}</span></a>
              <a @click="_fenxing(item.data.uid,item)"><i class="share-icon"></i><span>分享</span></a>
              <a @click="liketop(item.data.uid,item.data.title,item.data.user_info.gt_id,item.islike,index)" :class="{'like': item.islike}">
                <i class="collect-icon"></i>
                <span v-if="!item.islike">收藏</span> 
                <span v-else>已收藏</span>
              </a>
              <a @click="sharetop(item.data.uid,item.data.title,item.data.user_info.gt_id,item.isscale,index)" :class="{'scale': item.isscale}"><i class="laud-icon"></i><span v-if="item.data.attribute_num.like == 0">点赞</span> <span v-else>{{item.data.attribute_num.like}}</span></a>
            </div>
          </div>
        </mt-swipe-item>
      </mt-swipe>
      <div class="user">
        <div v-if="PostList" class="user_msg"  v-for="(item,index) in PostList" :key="index">
              <div @click="$router.push({ name: 'othersIndex',query: { uid: item.data.user_info.gt_id}})" class="user_msg_t"><!--@click="$router.push('/othersIndex')"-->
                <img :src="item.data.user_info.avatar || 'http://m.gtdysd.com/static/img/morentouxiang%20--icon.png'" alt="">
              </div>
              <div>
                <div>
                  <p>{{item.data.user_info.nickname}}</p>
                  <p>{{item.data.update_time}}</p>
                </div>
                <div class="labels">
                  <!-- <span v-if="item.data.game_type_str">{{item.data.game_type_str}}</span> -->
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
                      <div @click="$router.push({ name: 'othersIndex',query: { uid: item.user_info.gt_id}})" class="user_msg_t">
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
                  <template v-else style="font-size: 12px;">
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
          <p v-show="loading" class="page-infinite-loading">
            <span>
              <div style="border-top-color: rgb(204, 204, 204);border-left-color: rgb(204, 204, 204);border-bottom-color: rgb(204, 204, 204);height: 25px;width: 25px;"></div>
            </span>
            加载中...
          </p>
          <p v-show="!loading" style="text-align:center;line-height:25px;font-size: 12px;">已加载全部数据</p>
      </div>
      <div class="pushMas">
        <div :class="{'open' : trigge}">
          <img @click.stop="openlist" v-show="!trigge" style="z-index: 5" src="/static/img/game_icon_tuiguang.png" alt="">
          <img @click.stop = "trigge = false" src="/static/img/game_icon_tuiguang.png" alt="">
          <img @click.stop = "pusvideo()"  src="/static/img/game_icon_shiping@2x.png" alt="">
          <img @click.stop = "goto_('/pushimg')" src="/static/img/game_icon_tupian@3x.png" alt="">
          <img @click.stop = "goto_('/pushtext')"  src="/static/img/game_icon_wenzhang@2x.png" alt=""> 
        </div>  
      </div>
      <!-- <mt-palette-button content="+" @expand="main_log('expand')" @expanded="main_log('expanded')" @collapse="main_log('collapse')"
          direction="lt" id="pb" :radius="100" ref="target_1" mainButtonStyle="color:#fff;background-color:#e65400">
           <div class="my-icon-button indexicon icon-popup" @touchstart="sub_log(1)"> <img @click.stop = "goto_()" src="/static/img/game_icon_lianjie@2x.png" alt=""> </div>
          <div class="my-icon-button indexicon icon-popup" @click.stop = "goto_('/pushvideo')" > <img v-show="tupian" src="/static/img/game_icon_shiping@2x.png" alt=""> </div> 
          <div class="my-icon-button indexicon icon-popup" @click.stop = "goto_('/pushimg')" > <img v-show="tupian" src="/static/img/game_icon_tupian@3x.png" alt=""></div>
          <div class="my-icon-button indexicon icon-popup" @click.stop = "goto_('/pushtext')" > <img v-show="tupian" src="/static/img/game_icon_wenzhang@2x.png" alt=""></div>
      </mt-palette-button> -->
      <div v-show="trigge" class="bg" @touchmove.prevent @click="sub_log()"></div>
      
  </div>
</template>

<script>
 import { Toast,Indicator } from 'mint-ui';
 import { expression, _like, _share } from '../assets/js/g.js'
 let a;let dd = 0;
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

export default {
  data (){
    return {
      
      vShow: true,
      tupian: false,
      trigge: false,
      selected: '1',
      selectindex: 0,
      massgeclass: ['全部','手游','网游','单机游戏'],
      massgeclassdata:[],
      PostList:[],
      imageList: [],
      Settoplist: [],
      loading: true,
      pages: [],
      page_index: 0,
      all_pages: null,
      arrtype: 'all'
    }
  },
  created(){
    if(this.$route.params.type){
      window.location.reload(location.href)
    }
    this.$axios.post('/',{method:'note.banner.list',keyname: 'banner_img_web'}).then( (res) => {
      this.imageList = res.data.data
    })
    this.$store.commit('selechange',0)
    this.$store.commit('_change',{
      _logo   : !Boolean(window.localStorage.getItem("is_login")),
      _title  : '游戏圈',
      _search : false,
      _topshow: true,
      _msg    : false,
      _bottshow: true,
      _regain : false,
      _back   : false
    })
   
  },
  methods: {
    goto() {
      let instance = Toast({
        message: '操作成功',
        iconClass: 'icon-success'
      });
      setTimeout(() => {
        instance.close();
      }, 1000);
    },
    // 跳转帖子详情
    godetails(id,ty){
      this.$router.push({
        name: 'details',
        query: {
          notid: id,
          isblur: ty
        }
      })
    },
    pusvideo(){
      Toast('尽请期待~')
    },
    selectG (index){
      let _this = this
      this.arrtype = index
      Indicator.open();
      this.$axios.post('/',{method:'note.index.getNote',typeid: index, ids: ''}).then(function(res){
        Indicator.close();
         if(res.data.data.length != 0){
          let data = res.data.data.list
           _this.page_index = 0
           _this.all_pages = res.data.data.ids.length
          _this.pages = res.data.data.ids
         
          for (var i = 0; i < data.length; i++) {
            data[i].data.contents = expression(data[i].data.contents);
            data[i].isscale =  data[i].data.user_attribute.like == '0' ? false : true
            data[i].islike =  data[i].data.user_attribute.collect == '0' ? false : true
            if(data[i].extra_id){
              for(let a = 0;a <data[i].extra_id.length; a++){
                data[i].extra_id[a] == null?data[i].extra_id[a]:data[i].extra_id[a].contents = expression(data[i].extra_id[a].contents)
              }
            }
          }
          _this.PostList = data
        }else  Toast(res.data.msg)
       
      })
      a =Number(this.selected)-1
      setTimeout(() => {
       this.selected = '0';
      }, 200);
      setTimeout(() => {
       document.getElementsByClassName('mint-tab-item')[a].classList.add("is-selected");
      }, 201);
      this.selectindex = index
      //点击获取
    },
    openlist(){
      this.trigge = true
    },
    goto_(val){
      if(!Boolean(window.localStorage.getItem("is_login"))){
        Toast('登录失效')
        this.$router.push('/logo')
        return false
      }
      this.$router.push(val)
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
    _fenxing(id,item){
      if(!Boolean(window.localStorage.getItem("is_login"))){
        Toast('这不是你的地盘~')
        this.$router.push('/logo')
        return false
      }
      sessionStorage.setItem('_fenxing',id)
      sessionStorage.setItem('tiezi',JSON.stringify(item));
      this.$router.push({
        name: 'share'
      })
    },
    _comment(){

    },
    // 收藏 帖子
    like(uid, tit, gtid, islike, index){
      this.PostList[index].islike = !islike
      islike = islike ? 'no_collect':'collect'
      _like(this,uid,tit,gtid,islike)
    },
    liketop(uid, tit, gtid, islike, index){
      this.Settoplist[index].islike = !islike
      islike = islike ? 'no_collect':'collect'
      _like(this,uid,tit,gtid,islike)
    },
    //点赞 帖子
    share(uid, tit, gtid, isscale, index){
      this.PostList[index].isscale = !isscale
      let scale = Number(this.PostList[index].data.attribute_num.like)
      this.PostList[index].data.attribute_num.like = isscale ? String(scale-1) : String(scale+1)
      isscale = isscale ? 'no_like':'like'
      _share(this,uid,tit,gtid,isscale)
    },
    sharetop(uid, tit, gtid, isscale, index){
      this.Settoplist[index].isscale = !isscale
      let scale = Number(this.Settoplist[index].data.attribute_num.like)
      this.Settoplist[index].data.attribute_num.like = isscale ? String(scale-1) : String(scale+1)
      isscale = isscale ? 'no_like':'like'
      _share(this,uid,tit,gtid,isscale)
    },
    loadMore() {
        // 加载更多数据
      this.loading = true;
      let _this = this
      this.page_index ++
      if(this.pages[this.page_index] == undefined){
         this.loading = false;
         return
      }
      this.$axios.post('/',{method:'note.index.getNote',typeid: this.arrtype, ids: this.pages[this.page_index]}).then(function(res){
        if(res.data.status == 0){
          dd = 0;
          let data = res.data.data.list
          for (var i = 0; i < data.length; i++) {
            data[i].data.contents = expression(data[i].data.contents);
            data[i].isscale =  data[i].data.user_attribute.like == '0' ? false : true
            data[i].islike =  data[i].data.user_attribute.collect == '0' ? false : true
            if(data[i].extra_id){
              for(let a = 0;a <data[i].extra_id.length; a++){
                data[i].extra_id[a] == null?data[i].extra_id[a]:data[i].extra_id[a].contents = expression(data[i].extra_id[a].contents)
              }
            }
          }
          _this.PostList = _this.PostList.concat(data)
        }
      })
    },
    //all 帖子
    alltiez(){
      let _this = this
      Indicator.open();
      this.$axios.post('/',{method:'note.index.getNote',typeid: 'all', ids: ''}).then(function(res){
        Indicator.close();
        if(res.data.status == 0){
          let data = res.data.data.list
          _this.all_pages = res.data.data.ids.length
          _this.pages = res.data.data.ids
          for (var i = 0; i < data.length; i++) {
            
            data[i].data.contents = expression(data[i].data.contents);
            data[i].isscale =  data[i].data.user_attribute.like == '0' ? false : true
            data[i].islike =  data[i].data.user_attribute.collect == '0' ? false : true
            if(data[i].extra_id){
              for(let a = 0;a <data[i].extra_id.length; a++){
                data[i].extra_id[a] == null?data[i].extra_id[a]:data[i].extra_id[a].contents = expression(data[i].extra_id[a].contents)
              }
            }
          }
          _this.PostList = data
          window.onscroll = ()=>{
          　　if(getScrollTop() + getWindowHeight()+60 >= getScrollHeight() && dd == 0){
                  dd+=1;
          　　　　_this.loadMore()
          　　}
          };
        }
      })
    },
    main_log(val) {
        switch(val){
          case 'expand':
          this.trigge = true
          this.tupian = true
            break;
          case 'expanded':

            break;
          case 'collapse':
            this.trigge = false
           setTimeout(()=>{
              this.tupian = false
           },200)
            break;
        }
    },
    sub_log(val) {
      this.trigge = false
      this.$refs.target_1.collapse();
    }
  },
  mounted(){
    
    let _this = this
  // 所有游戏类型 
    this.$axios.post('/',{method:'note.index.gameAll'}).then(function(res){
      let data = res.data.data
      let arr = [];
      Object.keys(data).forEach(function(key){
        arr.push(data[key]);
      })
      _this.massgeclassdata = arr;
    })

    
// 置顶帖子 
    this.$axios.post('/',{method:'note.index.getSticky',ids: ''}).then( (res) => {
      if(res.data.status == 0){
        let data = res.data.data.list
        for(let i = 0; i < data.length; i++){
          let dom = data[i].data.contents
          data[i].data.contents = expression(dom);
          data[i].isscale =  data[i].data.user_attribute.like == '0' ? false : true
          data[i].islike =  data[i].data.user_attribute.collect == '0' ? false : true
        }
        this.Settoplist = data
      }
    })

    this.alltiez(); 
    
  },
  watch: {
    selected (v) {
      if(v == 1) this.alltiez();
      document.getElementsByClassName('mint-tab-item')[a].classList.remove("is-selected");
      this.vShow = true
      this.selectindex = 0
    }
  },
  components: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
// 1  ///4
.wc-mask[data-v-6317c8fc]{
  z-index: 2100
}
.pushMas{
  position: fixed;
  width: 0.5rem; height: 0.5rem;
  right: 0.15rem;bottom: 0.75rem;

  z-index: 2000;
  >div{
    position: relative;
    img{
      width: 0.5rem;border-radius: 50%;
      position: absolute;
    }
  }
  .open{
    img:nth-child(3){
      transform: translateY(-0.6rem);
      animation: openM 1s;
       animation-delay: 0.3s;
    }
    img:nth-child(4){
      transform: translateY(-1.2rem);
      animation: openX 1s;
      animation-delay: 0.1s;
    }
    img:nth-child(5){
      transform: translateY(-1.8rem);
      animation: openC 1s;

    }
  }
  
}
.index .mint-navbar .mint-tab-item.is-selected:after{  
      left: 0.325rem;

  } 
@keyframes openM{
  0%   {transform: translateY(0)}
  50%  {transform: translateY(-0.8rem)}
  100% {transform: translateY(-0.6rem)}
}
@keyframes openX{
  0%   {transform: translateY(0)}
  50%  {transform: translateY(-1.8rem)}
  100% {transform: translateY(-1.2rem)}
}
@keyframes openC{
  0%   {transform: translateY(0)}
  50%  {transform: translateY(-3rem)}
  100% {transform: translateY(-1.8rem)}
}
.index{
  .user .user_msg .user_msg{
    background-color:rgb(246,246,246);
    padding-right: 0.1rem;
    padding-left: 0.1rem
  }
  .mint-header.is-fixed{
    z-index: 100
  }
  li {
    display: inline-block;
  }
  .mint-tab-container-item span{
    padding: 0.05rem 0.1rem;
    background: #f5f5f5;
    border-radius: 0.15rem;
    font-size: 0.11rem;
    margin-right: 0.053rem;
    float: left;
    margin-top: 0.11rem;
  }
}
#pb{
  position: fixed;
  right: 0.15rem;bottom: 0.75rem;
  z-index: 1999;
  .mint-main-button{
     width: 50px; height: 50px;
     line-height: 52px;
     font-size: 3em; 
  }
  img{
    width: 0.5rem;
  }
}
.bg{
    position: fixed;
    left: 0;
    top: 0;z-index: 1998;
    width: 100vw;
    height: 100vh;
    opacity: 0.5;
    background: #000;
}
a {
  color: #e65400;
}

.index .mint-navbar{
  position:relative;
}
.index .mint-navbar .mint-tab-container{
  background-color:#fff;
  position:absolute;
  z-index: 10;
  left:0;top:0.4rem;
}
.mint-tab-container-item .isSelected{
  background-color:#e65400;
  color: #fff;
}
.banner2{
  height: 3.26rem;
  background-image: url(/static/img/lbj.png);
  background-repeat: no-repeat;
  background-position: bottom;
  background-color: #fff;
  background-size: 100%;
  overflow: hidden;
  .mint-swipe-item{
    padding: 0.1rem 0.15rem 0 0.15rem;
  }
  .user_msg >div:nth-child(2){
    height: 0.44rem;
  }

  .user_msg >div:nth-child(5){
    height: 1.8rem; overflow: hidden;
  }
  .user_msg_t{
    height: 0.44rem;
  }
  .labels{
    margin-top: 0.05rem;
    span{
      margin-right: 0.02rem;
    }
  }
}

</style>
