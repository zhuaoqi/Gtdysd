webpackJsonp([42],{Hv0A:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("cbo7"),n=s("Au9i"),i={data:function(){return{getUseDepot:null}},created:function(){this.$store.commit("selechange",4),this.$store.commit("_change",{_topshow:!1,_bottshow:!0})},methods:{},mounted:function(){var t=this;this.$axios.post("/",{method:"member.depot.getUseDepot"}).then(function(e){0==e.data.status?t.getUseDepot=e.data.data.data:Object(n.Toast)(e.data.msg)})},components:{vipPahead:a.a}},o={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"stoRecord"},[s("vip-pahead",{attrs:{title:"兑换记录"}}),t._v(" "),s("main",[t.getUseDepot?s("div",{staticClass:"unclaimed_list"},t._l(t.getUseDepot,function(e){return s("div",{staticClass:"box border"},[s("div",[s("h5",[t._v(t._s(e.title))]),t._v(" "),s("p",[t._v(t._s(e.update_time))])])])})):s("div",{staticStyle:{"text-align":"center",padding:"20px"}},[t._v("\n          空\n        ")])])],1)},staticRenderFns:[]};var c=s("VU/8")(i,o,!1,function(t){s("VD//")},null,null);e.default=c.exports},"VD//":function(t,e){}});
//# sourceMappingURL=42.038917e3b1c4e4a7b388.js.map