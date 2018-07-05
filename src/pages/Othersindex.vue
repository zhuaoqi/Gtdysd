<template>
  <div class="Other_page">
    <div class="user_">
      <div class="back" @click="$router.goBack()"></div>
      <div class="Authen_user" v-if="user">
          <div @click="chenge_port">
            <img style="border-radius: 50%" :src="user.avatar || 'http://m.gtdysd.com/static/img/morentouxiang%20--icon.png'">
          </div>
          <div>
            <span>{{user.nickname}}</span>
            <span v-if="user.gender == '3'"></span>
            <span :class="user.gender == '1'?'sex_man': 'sex_woman'"></span>
          </div>
          <span>{{user.motto}}</span>
      </div>
    </div>
    <div class="nav_sign" v-if="taginfo">
      <b>标签</b>
      <u v-if="taginfo">
        <em v-for="i in taginfo.split(',')">{{i}}</em>
      </u>
    </div>
    <mt-navbar v-model="selected" class="border" style="position: relative;">
      <mt-tab-item id="1">基本资料</mt-tab-item>
      <mt-tab-item id="2">我的地盘</mt-tab-item>
      <mt-tab-item id="3">我的相册</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected" class="container">
      <mt-tab-container-item id="1">
        <div class="form" v-if="user" style="margin-top: 0.15rem">
          <em @click="init('a')">
            <b>个人信息</b>
            <img src="/static/img/vip/icon_more@2x.png" :style="{'transform':sto.initaa?'rotate(450deg)': 'rotate(0)'}">
          </em>
          <u :style="{'max-height': sto.initaa}">
            <em class="border">
              <label>昵称</label>
              <i>{{user.nickname}}</i>
            </em>
            <em class="border">
              <label>性别</label>
              <i v-if="user.gender == '3'"></i>
              <i v-else>{{user.gender == '1'?'男': '女'}}</i>
            </em>
            <em class="border">
              <label>所在地</label>
              <i>{{user_info.province}}-{{user_info.city}}-{{user_info.area}}</i>
            </em>
            <em class="border">
              <label>生日</label>
              <i>{{user_info.birthday}}</i>
            </em>
            <em class="border">
              <label>血型</label>
              <i>{{user_info.blood}}</i>
            </em>
            <em class="border">
              <label>座右铭</label>
              <i>{{user.motto}}</i>
            </em>
          </u>
        </div>
        <div class="form">
          <em @click="init('b')">
            <b>联系方式</b>
            <img src="/static/img/vip/icon_more@2x.png" :style="{'transform':sto.initab?'rotate(450deg)': 'rotate(0)'}">
          </em>
          <u v-if="ountous" :style="{'max-height': sto.initab}">
            <em class="border">
              <label>微信</label>
              <i>{{ountous.weixin}}</i>
            </em>
            <em class="border">
              <label>邮箱</label>
              <i>{{ountous.email}}</i>
            </em>
            <em class="border">
              <label>QQ</label>
              <i>{{ountous.qq}}</i>
            </em>
            <em class="border">
              <label>手机号</label>
              <i>{{ountous.phone}}</i>
            </em>
          </u>
        </div>
        <div class="form">
          <em @click="init('c')">
            <b>职业信息</b>
            <img src="/static/img/vip/icon_more@2x.png" :style="{'transform':sto.initac?'rotate(450deg)': 'rotate(0)'}">
          </em>
          <u v-if="Occupation" :style="{'max-height': sto.initac}">
            <em class="border">
              <label>单位名称</label>
              <i>{{Occupation.company_name}}</i>
            </em>
            <em class="border">
              <label>部门/职位</label>
              <i>{{Occupation.company_position}}</i>
            </em>
            <em class="border">
              <label>工作时间</label>
              <i>{{Occupation.start_date}}/{{Occupation.end_date}}</i>
            </em>
            <em class="border">
              <label>所在地</label>
              <i>{{Occupation.province}}-{{Occupation.city}}-{{Occupation.area}}</i>
            </em>
          </u>
        </div>
        <div class="form">
          <em @click="init('d')">
            <b>个人标签</b>
            <img src="/static/img/vip/icon_more@2x.png" :style="{'transform':sto.initad?'rotate(450deg)': 'rotate(0)'}">
          </em>
          <u v-if="!taginfo==''" :style="{'max-height': sto.initad}">
            <s v-for="i in taginfo.split(',')">{{i}}</s>
            
          </u>
        </div>
        <!-- <div class="addfriend">
          <span>+</span><s>添加好友</s>
        </div> -->
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
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
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <div class="album">
           <img src="/static/img/wind.png" alt="">
          <p>尽请期待...</p>
        </div> 
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import { Indicator, Toast } from 'mint-ui';
import { expression, _like, _share } from '../assets/js/g.js'
export default {
  data (){
    return {
      arra: ['aaaaaaaaaaaaaaaaaa',''],
      Authentication: true,
      sheetVisible: false,
      selected:'1',
      accordion:false,
      sto: {
        initaa: 0,
        initab: 0,
        initac: 0,
        initad: 0,
      },
      user_info: null,
      user:null,
      ountous:null,
      Occupation: null,
      taginfo: null,
      allLoaded:false,
      sele: '1',
      page: 1,
      PostList: null,
      height: document.body.clientHeight - 140 +'px',
      isdata: false
    }
  },
  created(){
    this.$store.commit('selechange',4)
    this.$store.commit('_change',{
      _topshow: false,
    })
  },
  methods: {
    goto(path){
      this.$router.push(path)
    },
    chenge_port(){
      this.sheetVisible = true
    },
    init(ty){
      this.sto['inita'+ty] = !this.sto['inita'+ty] ?'5rem': 0
    },
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
      this.$axios.post('/',{method:'note.user.userNote',behavior: type,noteConType: 'all',page: this.page,gt_id: this.$route.query.uid}).then((res)=>{ 
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
    this.$axios.post('/',{method:'usercenter.user.userinfo',uid:this.$route.query.uid }).then( (res) => {
        if(res.data.status == 0){
          this.user_info = res.data.data.user_info
          this.user = res.data.data.user
        }else Toast(res.data.res)
    })
    this.$axios.post('/',{method:'usercenter.user.addressinfo',gt_id:this.$route.query.uid }).then( (res) => {
        if(res.data.status == 0){
          this.ountous = res.data.data
        }else Toast(res.data.res)
    })
    this.$axios.post('/',{method:'usercenter.user.jobinfo',gt_id:this.$route.query.uid }).then( (res) => {
        if(res.data.status == 0){
          this.Occupation = res.data.data
        }else Toast(res.data.res)
    })
    this.$axios.post('/',{method:'usercenter.user.taginfo', gt_id:this.$route.query.uid }).then( (res) => {
        if(res.data.status == 0){
          this.taginfo = res.data.data.tag_info
        }else Toast(res.data.res)
    })
    this.getData(1)
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
  .Other_page{
    .user_{
      height: 2rem;
      background-image:url('/static/img/beijing.jpg');
      background-size: 100%;
      background-repeat: no-repeat;
      position: relative;
      .back{
          position: absolute;
          left: 15px; top: 15px;
          width: 20px;height: 20px;
          background-image: url(/static/img/nav_fanhui@3x.png);
          background-repeat: no-repeat;
          background-size: 100%;
        }
      >div{
        position: absolute;
      }
      .Authen_user{
        height: 1.38rem;
        width: 2.4rem;
        bottom:0; left:0.65rem;
        text-align: center;
        color: #fff;
        div:first-child{
          height: 0.65rem;
          width: 0.65rem;
          overflow: hidden;
          margin: 0 auto;
          img{
            width: 100%;
          }
        }
        div:nth-child(2){
          margin: 0.1rem 0;
          span{
            font-size: 16px;
          }
          .sex_woman{
            vertical-align: -10%;
            display: inline-block;
            width: 0.15rem;height: 0.15rem;
            background-image: url('/static/img/tongxunlu_icon_nv@3x.png');
            background-repeat: no-repeat;
            background-size: 100%;margin-left: 0.05rem;
          }
          .sex_man{
            vertical-align: -10%;
            display: inline-block;
            width: 0.15rem;height: 0.15rem;
            background-image: url('/static/img/tongxunlu_icon_nan@3x.png');
            background-repeat: no-repeat;
            background-size: 100%;margin-left: 0.05rem;
          }
        }
      }
    }

  .nav_sign{width:100%;height: 0.8rem;padding: 0.1rem;background-color: #fff;}
  .nav_sign b{display: block;width:0.35rem;font-size: 14px;line-height: 0.24rem;color: #e65400;float: left;font-weight:normal;}
  .nav_sign u{display: block;width: 3.2rem;height: auto;float: right;padding-left:0.05rem;}
  .nav_sign u em{padding:0.045rem 0.10rem;font-size: 12px;color: #fff;background: #e65400;border-radius:1.1rem;position: relative;margin-right: 0.05rem;float: left;margin-bottom: 0.05rem;}
  .mint-navbar{margin-top:0.1rem;height: 0.45rem;}
  .mint-tab-item .mint-tab-item-label{font-size: 14px;color: #333;}
  .mint-tab-item.is-selected .mint-tab-item-label{color: #e65400;}
  .mint-navbar .mint-tab-item.is-selected:after{left:0.47rem;}
  .mint-tab-item-label{line-height: 1.3;}
  
  u,s{text-decoration: none;}
  .container{
    width: 100%;min-height: 3.3rem;
    background: #fff;
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
  }
  .mint-tab-container-item{
    padding: 0;
  }
  .form{
    width:100%;height:auto;
    margin-bottom: 0.13rem;
    padding:0 0.15rem;
  }
  .form>em{
    display:block;
    height:0.44rem;background:#ededed;
    border-radius:2px;
    padding-left: 0.1rem;
    
  }
  .form>em>b{
    display:block;
    height:0.44rem;font-weight: normal;
    line-height: 0.44rem;
    font-size: 15px;
    color:#333;float: left;
  }
  .form>em>img{
    display:block;width:0.07rem;
    float: right;
    margin-top: 0.17rem;
    margin-right:0.15rem;
    transition: transform 0.45s;
  }
  .form>u{
    display:block;width: 100%;
    max-height:5rem;
    overflow: hidden;
    transition: max-height .45s;
  }
  .form>u>em{display:block;width:3.45rem;height:0.43rem;padding-left: 0.1rem;position:relative;}
  .form>u>em>label{display:block;width:0.66rem;height:0.43rem;line-height: 0.43rem;font-size: 0.14rem;color: #646464;float: left;}
  .form>u>em>i{display:block;width:2.65rem;height:0.43rem;line-height:0.43rem;font-size: 0.14rem;color: #333;float: left;}
  .form>u>s{display: block;background: #f96;font-size: 0.14rem;border-radius: 0.06rem;color: #fff;margin-right: 0.1rem; margin-bottom: 0.1rem;padding: 0.03rem 0.05rem;float: left;position: relative;margin-top: 0.2rem;}
  .form>u>s:after{border: 0.06rem solid transparent;position: absolute;left: -0.10rem;top: 0.07rem;border-right: 0.06rem solid #f96;content: "";}
  // .addfriend{
  //   position: fixed;bottom: 0rem;
  //   left:0rem;z-index: 9;
  //   width:100%;height:48px;
  //   background:#ff5e00;margin:0 auto;
  //   display: flex; align-items:center;
  //   justify-content: center;
  //   color:#fff;
  // }
  // .addfriend>span{
  //   font-size: 22px;
  //   margin-right: 5px;
  // }
  // .addfriend>s{
  //   font-size: 16px;
  // }


  .album{
    background: #fff;
    text-align: center;
    img{
      width: 30%;
    }
  }
  .album p{display: block;width:100%;height: 0.48rem;font-size: 0.14rem;line-height: 0.48rem;}

  }


</style>

  
    
    
    
    
    
    
    
    
   
    
    
    
