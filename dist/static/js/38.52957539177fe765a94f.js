webpackJsonp([38],{lCiy:function(t,a,i){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e=i("mvHQ"),s=i.n(e),o=i("Au9i"),n=i("wSLB"),r={data:function(){return{arra:["aaaaaaaaaaaaaaaaaa",""],Authentication:!0,sheetVisible:!1,selected:"1",accordion:!1,sto:{initaa:0,initab:0,initac:0,initad:0},user_info:null,user:null,ountous:null,Occupation:null,taginfo:null,allLoaded:!1,sele:"1",page:1,PostList:null,height:document.body.clientHeight-140+"px",isdata:!1}},created:function(){this.$store.commit("selechange",4),this.$store.commit("_change",{_topshow:!1})},methods:{goto:function(t){this.$router.push(t)},chenge_port:function(){this.sheetVisible=!0},init:function(t){this.sto["inita"+t]=this.sto["inita"+t]?0:"5rem"},like:function(t,a,i,e,s){this.PostList[s].islike=!e,e=e?"no_collect":"collect",Object(n.b)(this,t,a,i,e)},share:function(t,a,i,e,s){this.PostList[s].isscale=!e;var o=Number(this.PostList[s].data.attribute_num.like);this.PostList[s].data.attribute_num.like=e?String(o-1):String(o+1),e=e?"no_like":"like",Object(n.c)(this,t,a,i,e)},_fenxing:function(t,a){if(!Boolean(window.localStorage.getItem("is_login")))return Object(o.Toast)("登录失效"),this.$router.push("/logo"),!1;sessionStorage.setItem("_fenxing",t),sessionStorage.setItem("tiezi",s()(a)),this.$router.push({name:"share"})},godetails:function(t,a){this.$router.push({name:"details",query:{notid:t,isblur:a}})},getData:function(t,a){var i=this;o.Indicator.open(),this.isdata=!1,this.allLoaded=!1,this.$axios.post("/",{method:"note.user.userNote",behavior:t,noteConType:"all",page:this.page,gt_id:this.$route.query.uid}).then(function(t){if(o.Indicator.close(),i.isdata=!0,0==t.data.status){"shi"==a&&Object(o.Toast)("刷新成功");var e=t.data.data.list;if(0==e.length)return Object(o.Toast)("以加载全部数据~"),void(i.allLoaded=!0);for(var s=0;s<e.length;s++)if(e[s].data.contents=Object(n.e)(e[s].data.contents),e[s].isscale="0"!=e[s].data.user_attribute.like,e[s].islike="0"!=e[s].data.user_attribute.collect,e[s].extra_id&&null!=e[s].extra_id[0])for(var r=0;r<e[s].extra_id.length;r++)e[s].extra_id[r].contents=Object(n.e)(e[s].extra_id[r].contents);i.PostList="add"==a?i.PostList.concat(e):e}else Object(o.Toast)(t.data.msg)})},dom:function(t){t=(t=(t=(t=(t=(t=t.replace(/&amp;/g,"&")).replace(/&lt;/g,"<")).replace(/&gt;/g,">")).replace(/&quot;/g,'"')).replace(/&#039;/g,"'")).replace(/&#39;/g,"'");var a=document.createElement("div");return a.innerHTML=t,a.childNodes[0].width="100%",a.childNodes[0].height="100%",a.innerHTML},loadTop:function(){this.page=1,this.getData(this.sele,"shi"),this.$refs.loadmore.onTopLoaded()},loadBottom:function(){this.page+=1,this.getData(this.sele,"add"),this.$refs.loadmore.onBottomLoaded()}},mounted:function(){var t=this;this.$axios.post("/",{method:"usercenter.user.userinfo",uid:this.$route.query.uid}).then(function(a){0==a.data.status?(t.user_info=a.data.data.user_info,t.user=a.data.data.user):Object(o.Toast)(a.data.res)}),this.$axios.post("/",{method:"usercenter.user.addressinfo",gt_id:this.$route.query.uid}).then(function(a){0==a.data.status?t.ountous=a.data.data:Object(o.Toast)(a.data.res)}),this.$axios.post("/",{method:"usercenter.user.jobinfo",gt_id:this.$route.query.uid}).then(function(a){0==a.data.status?t.Occupation=a.data.data:Object(o.Toast)(a.data.res)}),this.$axios.post("/",{method:"usercenter.user.taginfo",gt_id:this.$route.query.uid}).then(function(a){0==a.data.status?t.taginfo=a.data.data.tag_info:Object(o.Toast)(a.data.res)}),this.getData(1)},computed:{},components:{},watch:{sele:function(t){this.page=1,this.getData(t)}}},c={render:function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",{staticClass:"Other_page"},[i("div",{staticClass:"user_"},[i("div",{staticClass:"back",on:{click:function(a){t.$router.goBack()}}}),t._v(" "),t.user?i("div",{staticClass:"Authen_user"},[i("div",{on:{click:t.chenge_port}},[i("img",{staticStyle:{"border-radius":"50%"},attrs:{src:t.user.avatar||"http://m.gtdysd.com/static/img/morentouxiang%20--icon.png"}})]),t._v(" "),i("div",[i("span",[t._v(t._s(t.user.nickname))]),t._v(" "),"3"==t.user.gender?i("span"):t._e(),t._v(" "),i("span",{class:"1"==t.user.gender?"sex_man":"sex_woman"})]),t._v(" "),i("span",[t._v(t._s(t.user.motto))])]):t._e()]),t._v(" "),t.taginfo?i("div",{staticClass:"nav_sign"},[i("b",[t._v("标签")]),t._v(" "),t.taginfo?i("u",t._l(t.taginfo.split(","),function(a){return i("em",[t._v(t._s(a))])})):t._e()]):t._e(),t._v(" "),i("mt-navbar",{staticClass:"border",staticStyle:{position:"relative"},model:{value:t.selected,callback:function(a){t.selected=a},expression:"selected"}},[i("mt-tab-item",{attrs:{id:"1"}},[t._v("基本资料")]),t._v(" "),i("mt-tab-item",{attrs:{id:"2"}},[t._v("我的地盘")]),t._v(" "),i("mt-tab-item",{attrs:{id:"3"}},[t._v("我的相册")])],1),t._v(" "),i("mt-tab-container",{staticClass:"container",model:{value:t.selected,callback:function(a){t.selected=a},expression:"selected"}},[i("mt-tab-container-item",{attrs:{id:"1"}},[t.user?i("div",{staticClass:"form",staticStyle:{"margin-top":"0.15rem"}},[i("em",{on:{click:function(a){t.init("a")}}},[i("b",[t._v("个人信息")]),t._v(" "),i("img",{style:{transform:t.sto.initaa?"rotate(450deg)":"rotate(0)"},attrs:{src:"/static/img/vip/icon_more@2x.png"}})]),t._v(" "),i("u",{style:{"max-height":t.sto.initaa}},[i("em",{staticClass:"border"},[i("label",[t._v("昵称")]),t._v(" "),i("i",[t._v(t._s(t.user.nickname))])]),t._v(" "),i("em",{staticClass:"border"},[i("label",[t._v("性别")]),t._v(" "),"3"==t.user.gender?i("i"):i("i",[t._v(t._s("1"==t.user.gender?"男":"女"))])]),t._v(" "),i("em",{staticClass:"border"},[i("label",[t._v("所在地")]),t._v(" "),i("i",[t._v(t._s(t.user_info.province)+"-"+t._s(t.user_info.city)+"-"+t._s(t.user_info.area))])]),t._v(" "),i("em",{staticClass:"border"},[i("label",[t._v("生日")]),t._v(" "),i("i",[t._v(t._s(t.user_info.birthday))])]),t._v(" "),i("em",{staticClass:"border"},[i("label",[t._v("血型")]),t._v(" "),i("i",[t._v(t._s(t.user_info.blood))])]),t._v(" "),i("em",{staticClass:"border"},[i("label",[t._v("座右铭")]),t._v(" "),i("i",[t._v(t._s(t.user.motto))])])])]):t._e(),t._v(" "),i("div",{staticClass:"form"},[i("em",{on:{click:function(a){t.init("b")}}},[i("b",[t._v("联系方式")]),t._v(" "),i("img",{style:{transform:t.sto.initab?"rotate(450deg)":"rotate(0)"},attrs:{src:"/static/img/vip/icon_more@2x.png"}})]),t._v(" "),t.ountous?i("u",{style:{"max-height":t.sto.initab}},[i("em",{staticClass:"border"},[i("label",[t._v("微信")]),t._v(" "),i("i",[t._v(t._s(t.ountous.weixin))])]),t._v(" "),i("em",{staticClass:"border"},[i("label",[t._v("邮箱")]),t._v(" "),i("i",[t._v(t._s(t.ountous.email))])]),t._v(" "),i("em",{staticClass:"border"},[i("label",[t._v("QQ")]),t._v(" "),i("i",[t._v(t._s(t.ountous.qq))])]),t._v(" "),i("em",{staticClass:"border"},[i("label",[t._v("手机号")]),t._v(" "),i("i",[t._v(t._s(t.ountous.phone))])])]):t._e()]),t._v(" "),i("div",{staticClass:"form"},[i("em",{on:{click:function(a){t.init("c")}}},[i("b",[t._v("职业信息")]),t._v(" "),i("img",{style:{transform:t.sto.initac?"rotate(450deg)":"rotate(0)"},attrs:{src:"/static/img/vip/icon_more@2x.png"}})]),t._v(" "),t.Occupation?i("u",{style:{"max-height":t.sto.initac}},[i("em",{staticClass:"border"},[i("label",[t._v("单位名称")]),t._v(" "),i("i",[t._v(t._s(t.Occupation.company_name))])]),t._v(" "),i("em",{staticClass:"border"},[i("label",[t._v("部门/职位")]),t._v(" "),i("i",[t._v(t._s(t.Occupation.company_position))])]),t._v(" "),i("em",{staticClass:"border"},[i("label",[t._v("工作时间")]),t._v(" "),i("i",[t._v(t._s(t.Occupation.start_date)+"/"+t._s(t.Occupation.end_date))])]),t._v(" "),i("em",{staticClass:"border"},[i("label",[t._v("所在地")]),t._v(" "),i("i",[t._v(t._s(t.Occupation.province)+"-"+t._s(t.Occupation.city)+"-"+t._s(t.Occupation.area))])])]):t._e()]),t._v(" "),i("div",{staticClass:"form"},[i("em",{on:{click:function(a){t.init("d")}}},[i("b",[t._v("个人标签")]),t._v(" "),i("img",{style:{transform:t.sto.initad?"rotate(450deg)":"rotate(0)"},attrs:{src:"/static/img/vip/icon_more@2x.png"}})]),t._v(" "),""==!t.taginfo?i("u",{style:{"max-height":t.sto.initad}},t._l(t.taginfo.split(","),function(a){return i("s",[t._v(t._s(a))])})):t._e()])]),t._v(" "),i("mt-tab-container-item",{attrs:{id:"2"}},[i("div",{staticClass:"myhome_page"},[i("mt-navbar",{model:{value:t.sele,callback:function(a){t.sele=a},expression:"sele"}},[i("mt-tab-item",{attrs:{id:"1"}},[t._v("推送")]),t._v(" "),i("mt-tab-item",{attrs:{id:"2"}},[t._v("分享")]),t._v(" "),i("mt-tab-item",{attrs:{id:"3"}},[t._v("收藏")]),t._v(" "),i("mt-tab-item",{attrs:{id:"4"}},[t._v("点赞")]),t._v(" "),i("mt-tab-item",{attrs:{id:"5"}},[t._v("评论")])],1),t._v(" "),i("div",{style:{height:t.height,overflow:"scroll"}},[i("mt-loadmore",{ref:"loadmore",attrs:{autoFill:!1,"bottom-method":t.loadBottom,"top-method":t.loadTop,"bottom-all-loaded":t.allLoaded}},[t.isdata?i("ul",{attrs:{id:"ullist"}},t._l(t.PostList,function(a,e){return t.PostList?i("li",{key:e},[i("div",{staticClass:"user_msg"},[i("div",{staticClass:"user_msg_t"},[i("img",{attrs:{src:a.data.user_info.avatar||"/static/img/morentouxiang --icon.png",alt:""}})]),t._v(" "),i("div",[i("div",[i("p",[t._v(t._s(a.data.user_info.nickname))]),t._v(" "),i("p",[t._v(t._s(a.data.update_time))])]),t._v(" "),i("div",{staticClass:"labels"},[i("span",[t._v("其他")])])]),t._v(" "),i("div",{staticClass:"clear"}),t._v(" "),i("div",[i("i",[t._v(t._s(a.data.title))])]),t._v(" "),i("div",{on:{click:function(i){t.godetails(a.data.uid)}}},[i("p",{staticStyle:{"text-indent":"0"},domProps:{innerHTML:t._s(a.data.contents)}}),t._v(" "),""!=a.data.uurl?[-1==a.data.uurl[0].search("iframe")?i("div",{staticClass:"t-pic"},t._l(a.data.uurl,function(e,s){return i("img",{key:s,staticClass:"wc-preview-img",attrs:{src:e+"?x-oss-process=image/resize,m_fill,h_200,w_200"},on:{click:function(i){i.stopPropagation(),t.$preview(i,a.data.uurl,s)}}})})):i("div",{domProps:{innerHTML:t._s(t.dom(a.data.uurl[0]))}})]:t._e()],2),t._v(" "),a.extra_id?t._l(a.extra_id,function(a){return i("div",{staticClass:"user_msg",style:{"background-color":null==a?"#fff":"#f6f6f6"}},[null!=a?[i("div",{staticClass:"user_msg_t"},[i("img",{attrs:{src:a.user_info.avatar||"/static/img/morentouxiang --icon.png",alt:""}})]),t._v(" "),i("div",{staticStyle:{width:"2.8rem"}},[i("div",[i("p",[t._v(t._s(a.user_info.nickname))]),t._v(" "),i("p",[t._v(t._s(a.update_time))])]),t._v(" "),i("div",{staticClass:"labels"},[i("span",[t._v("其他")])])]),t._v(" "),i("div",{staticClass:"clear"}),t._v(" "),i("div",[i("i",[t._v(t._s(a.title))])]),t._v(" "),i("div",{on:{click:function(i){t.godetails(a.uid)}}},[i("p",{staticStyle:{"text-indent":"0"},domProps:{innerHTML:t._s(a.contents)}}),t._v(" "),t._l(a.uurl,function(a,e){return i("div",{key:e,staticClass:"t-pic"},[-1==a.search("iframe")?i("img",{attrs:{src:a+"?x-oss-process=image/resize,m_fill,h_200,w_200"}}):i("div",{domProps:{innerHTML:t._s(t.dom(a))}})])})],2)]:[t._v("\n                          抱歉该帖已被删除\n                      ")]],2)}):t._e(),t._v(" "),i("div",{staticClass:"startPointer border_t",staticStyle:{position:"relative"}},[i("a",{on:{click:function(i){t.godetails(a.data.uid,!0)}}},[i("i",{staticClass:"reply-icon"}),0==a.data.attribute_num.comment?i("span",[t._v("评论")]):i("span",[t._v(t._s(a.data.attribute_num.comment))])]),t._v(" "),i("a",{on:{click:function(i){t._fenxing(a.data.uid,a)}}},[i("i",{staticClass:"share-icon"}),i("span",[t._v("分享")])]),t._v(" "),i("a",{class:{like:a.islike},on:{click:function(i){t.like(a.data.uid,a.data.title,a.data.user_info.gt_id,a.islike,e)}}},[i("i",{staticClass:"collect-icon"}),t._v(" "),a.islike?i("span",[t._v("已收藏")]):i("span",[t._v("收藏")])]),t._v(" "),i("a",{class:{scale:a.isscale},on:{click:function(i){t.share(a.data.uid,a.data.title,a.data.user_info.gt_id,a.isscale,e)}}},[i("i",{staticClass:"laud-icon"}),0==a.data.attribute_num.like?i("span",[t._v("点赞")]):i("span",[t._v(t._s(a.data.attribute_num.like))])])])],2)]):t._e()})):t._e()])],1)],1)]),t._v(" "),i("mt-tab-container-item",{attrs:{id:"3"}},[i("div",{staticClass:"album"},[i("img",{attrs:{src:"/static/img/wind.png",alt:""}}),t._v(" "),i("p",[t._v("尽请期待...")])])])],1)],1)},staticRenderFns:[]};var l=i("VU/8")(r,c,!1,function(t){i("oSc6")},null,null);a.default=l.exports},oSc6:function(t,a){}});
//# sourceMappingURL=38.52957539177fe765a94f.js.map