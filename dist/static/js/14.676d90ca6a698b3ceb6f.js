webpackJsonp([14],{Uk3z:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=a("L6bb"),s=a.n(o),n=a("Au9i"),i={data:function(){return{sel:"1",phone:{tel:"",code:"",lodpass:"",newpass:""},email:{tel:"",code:"",lodpass:"",newpass:""},gobutt:!0,gobutt1:!0}},created:function(){this.$store.commit("selechange",4),this.$store.commit("_change",{_logo:!1,_title:"找回密码",_search:!1,_topshow:!0,_msg:!1,_bottshow:!1,_regain:!1,_back:!0})},methods:{goto:function(){this.$router.goBack()},getcode:function(e){var t=this.$refs["button"+e],a=59,o=this;if(0==e){if(!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(o.phone.tel))return Object(n.Toast)("手机号码格式错误"),!1;this.$axios.post("/",{method:"auth.code.smssend",type:2,mobile:o.phone.tel}).then(function(e){0==e.data.status?Object(n.Toast)("验证码发送成功"):Object(n.Toast)(e.data.msg)}).catch(function(e){Object(n.Toast)(e.data.msg),o.phone.tel=""})}else if(1==e){if(!/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(o.email.tel))return Object(n.Toast)("邮箱格式错误"),!1;this.$axios.post("/",{method:"auth.code.smtpsend",type:2,email:o.email.tel}).then(function(e){Object(n.Toast)(e.data.msg)}).catch(function(e){Object(n.Toast)("未知错误"),o.email.tel=""})}t.setAttribute("disabled",!0),t.innerText="60秒后重试";var s=setInterval(function(){t.innerText=a--+"秒后重试",0==a&&(clearTimeout(s),t.removeAttribute("disabled"),t.innerText="获取验证码",t.style.backgroundColor="#e65400")},1e3);t.style.backgroundColor="#dcdcdc"},send:function(e){var t=void 0,a=void 0,o=void 0,i=this;switch(e){case 0:if(t=i.phone.tel,a=s()(s()("SMARTSCENE."+i.phone.newpass)),o=i.phone.code,i.phone.lodpass!=i.phone.newpass)return Object(n.Toast)("输入的密码不一致"),!1;break;case 1:if(t=i.email.code,a=s()(s()("SMARTSCENE."+i.email.newpass)),o=i.email.tel,i.email.lodpass!=i.email.newpass)return Object(n.Toast)("输入的密码不一致"),!1}n.Indicator.open(),this.$axios.post("/",{method:"usercenter.user.checkForget",auth:t,passone:a,code:o}).then(function(e){n.Indicator.close(),0==e.data.status?(Object(n.Toast)({message:"密码更改成功",iconClass:"icon-success",duration:1500}),setTimeout(function(){i.$router.push("/logo")},2e3)):Object(n.Toast)(e.data.msg)}).catch(function(e){Object(n.Toast)("未知错误"),i.email.tel=""})}},computed:{},watch:{phone:{handler:function(e,t){""==!this.phone.tel&&""==!this.phone.code&&""==!this.phone.lodpass&&""==!this.phone.newpass?this.gobutt=!1:this.gobutt=!0},deep:!0},email:{handler:function(e,t){""==!this.email.tel&&""==!this.email.code&&""==!this.email.lodpass&&""==!this.email.newpass?this.gobutt1=!1:this.gobutt1=!0},deep:!0}}},l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"logo_page"},[a("mt-navbar",{model:{value:e.sel,callback:function(t){e.sel=t},expression:"sel"}},[a("mt-tab-item",{staticStyle:{"margin-right":"10px"},attrs:{id:"1"}},[e._v("手机找回")]),e._v(" "),a("mt-tab-item",{staticStyle:{"margin-left":"10px"},attrs:{id:"2"}},[e._v("邮箱找回")])],1),e._v(" "),a("mt-tab-container",{model:{value:e.sel,callback:function(t){e.sel=t},expression:"sel"}},[a("mt-tab-container-item",{staticStyle:{"padding-left":"0"},attrs:{id:"1"}},[a("div",{staticClass:"from_p"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.phone.tel,expression:"phone.tel"}],attrs:{type:"number",placeholder:"请输入你的手机号",name:""},domProps:{value:e.phone.tel},on:{input:function(t){t.target.composing||e.$set(e.phone,"tel",t.target.value)}}}),e._v(" "),a("div",[a("input",{directives:[{name:"model",rawName:"v-model",value:e.phone.code,expression:"phone.code"}],attrs:{type:"number",placeholder:"验证码"},domProps:{value:e.phone.code},on:{input:function(t){t.target.composing||e.$set(e.phone,"code",t.target.value)}}}),e._v(" "),a("button",{ref:"button0",staticClass:"getcode",attrs:{type:"button"},on:{click:function(t){e.getcode(0)}}},[e._v("获取验证码")])]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.phone.lodpass,expression:"phone.lodpass"}],attrs:{type:"password",placeholder:"设置新密码 (6-24位字符)"},domProps:{value:e.phone.lodpass},on:{input:function(t){t.target.composing||e.$set(e.phone,"lodpass",t.target.value)}}}),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.phone.newpass,expression:"phone.newpass"}],attrs:{type:"password",placeholder:"确认新密码 (6-24位字符)"},domProps:{value:e.phone.newpass},on:{input:function(t){t.target.composing||e.$set(e.phone,"newpass",t.target.value)}}})]),e._v(" "),a("mt-button",{staticStyle:{"margin-top":"16px","font-family":"'Microsoft YaHei'"},attrs:{type:"primary",size:"large",disabled:e.gobutt},on:{click:function(t){e.send(0)}}},[e._v("完成")])],1),e._v(" "),a("mt-tab-container-item",{staticStyle:{"padding-left":"0"},attrs:{id:"2"}},[a("div",{staticClass:"from_p"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.email.tel,expression:"email.tel"}],attrs:{type:"email",placeholder:"强输入你的邮箱号"},domProps:{value:e.email.tel},on:{input:function(t){t.target.composing||e.$set(e.email,"tel",t.target.value)}}}),e._v(" "),a("div",[a("input",{directives:[{name:"model",rawName:"v-model",value:e.email.code,expression:"email.code"}],attrs:{type:"number",placeholder:"验证码"},domProps:{value:e.email.code},on:{input:function(t){t.target.composing||e.$set(e.email,"code",t.target.value)}}}),e._v(" "),a("button",{ref:"button1",staticClass:"getcode",attrs:{type:"button"},on:{click:function(t){e.getcode(1)}}},[e._v("获取验证码")])]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.email.lodpass,expression:"email.lodpass"}],attrs:{type:"password",placeholder:"设置新密码 (6-24位字符)"},domProps:{value:e.email.lodpass},on:{input:function(t){t.target.composing||e.$set(e.email,"lodpass",t.target.value)}}}),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.email.newpass,expression:"email.newpass"}],attrs:{type:"password",placeholder:"确认新密码 (6-24位字符)"},domProps:{value:e.email.newpass},on:{input:function(t){t.target.composing||e.$set(e.email,"newpass",t.target.value)}}})]),e._v(" "),a("mt-button",{staticStyle:{"margin-top":"16px","font-family":"'Microsoft YaHei'"},attrs:{type:"primary",size:"large",disabled:e.gobutt1},on:{click:function(t){e.send(1)}}},[e._v("完成")])],1)],1)],1)},staticRenderFns:[]};var c=a("VU/8")(i,l,!1,function(e){a("pMNv")},null,null);t.default=c.exports},pMNv:function(e,t){}});
//# sourceMappingURL=14.676d90ca6a698b3ceb6f.js.map