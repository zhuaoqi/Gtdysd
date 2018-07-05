import Vue from 'vue'
import Router from 'vue-router'


import pageTransition from '@/components/pageTransition'
Vue.use(Router)
Router.prototype.goBack = function () {
  this.isBack = true
  window.history.go(-1)
}

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'pageTransition',
      component: pageTransition, // 引入页面切换组件
      children: [{
        path: '',
        name: 'appIndex',
        component: resolve => require(['@/pages/index'], resolve)  // 主页
      }, {
        path: '/details',
        name: 'details',
        component: resolve => require(['@/pages/details'], resolve)  // 子路由组件  例如，访问www.aaa.com/pageA 显示为PageA
      },{
        path: '/logo',
        component: resolve => require(['@/pages/logo'], resolve)  // 登录页面
      },{
        path: '/vip',
        component: resolve => require(['@/pages/vip'], resolve)  // vip页面
      },{
        path: '/mailList',
        component: resolve => require(['@/pages/maillist'], resolve)  // 登录页面
      },{
        path: '/home',// 我的
        component: resolve => require(['@/pages/my/myindex'], resolve)
      },{
        path: '/pushtext',// 推送文章
        component: resolve => require(['@/pages/pushtext'], resolve)
      },{
        path: '/pushimg',// 推送图片
        component: resolve => require(['@/pages/pushimg'], resolve)
      },{
        path: '/pushvideo',// 推送视频  暂时没
        component: resolve => require(['@/pages/pushvideo'], resolve)
      },{
        path: '/myhome',// 我的地盘
        meta: {
          requireAuth: true
        },
        component: resolve => require(['@/pages/my/myhome'], resolve)
      },{
        path: '/mydata',// 我的资料
        meta: {
          requireAuth: true
        },
        component: resolve => require(['@/pages/my/mydata'], resolve)
      },{
        path: '/my/information',// 个人信息
        meta: {
          requireAuth: true
        },
        component: resolve => require(['@/pages//my/information'], resolve)
      },{
        meta: {
          requireAuth: true
        },
        path: '/my/contact',// 联系方式
        component: resolve => require(['@/pages/my/contact'], resolve)
      },{
        path: '/about',// 关于我们
        component: resolve => require(['@/pages/my/about'], resolve)
      },{
        path: '/search',// 搜索页面
        component: resolve => require(['@/pages/search'], resolve)
      },{
        path: '/othersIndex',// 他人主业
        name: 'othersIndex',
        component: resolve => require(['@/pages/Othersindex'], resolve)
      },{
        path: '/my/massage',// 系统提示
        component: resolve => require(['@/pages/my/mymassage'], resolve)
      },{
        path: '/sysconfig',// 系统设置
        component: resolve => require(['@/pages/my/sysconfig'], resolve)
      },{
        path: '/my/post',// 我的照片
        component: resolve => require(['@/pages/my/searchPost'], resolve)
      },{
        path: '/my/mylables',// 我的标签
        meta: {
          requireAuth: true
        },
        component: resolve => require(['@/pages/my/mylables'], resolve)
      },{
        path: '/share',// 登录页面
        name: 'share',
        component: resolve => require(['@/pages/share'], resolve)
      },{
        path: '/my/vip',// 登录页面
        component: resolve => require(['@/pages/my/myvip'], resolve)
      },{
        path: '/vip/grade',// 会员中心 我的等级
        meta: {
          requireAuth: true
        },
        component: resolve => require(['@/pages/vip/mygrade'], resolve)
      },{
        path: '/vip/Signin',// 我的签到
        meta: {
          requireAuth: true
        },
        component: resolve => require(['@/pages/vip/mySignin'], resolve)
      },{
        path: '/vip/Supplement',// 我的补签
        meta: {
          requireAuth: true
        },
        component: resolve => require(['@/pages/vip/Supplement'], resolve)
      },{
        path: '/vip/camp',// 我的阵营
        meta: {
          requireAuth: true
        },
        component: resolve => require(['@/pages/vip/mycamp'], resolve)
      },{
        path: '/vip/earnPoints',// 赚积分
        meta: {
          requireAuth: true
        },
        component: resolve => require(['@/pages/vip/earnPoints.vue'], resolve)
      },{
        path: '/vip/bilityrecord',// 积分兑换记录
        meta: {
          requireAuth: true
        },
        component: resolve => require(['@/pages/vip/Convertibilityrecord'], resolve)
      },{
        path: '/vip/gift',// 我的礼物
        meta: {
          requireAuth: true
        },
        component: resolve => require(['@/pages/vip/mygift'], resolve)
      },{
        path: '/vip/integral',// 我的积分
        meta: {
          requireAuth: true
        },
        component: resolve => require(['@/pages/vip/myintegral'], resolve)
      },{
        path: '/vip/stoRecord',// 礼物兑换取记录
        meta: {
          requireAuth: true
        },
        component: resolve => require(['@/pages/vip/stoRecord'], resolve)
      },{
        path: '/vip/treasureBox',// 我的宝盒
        meta: {
          requireAuth: true
        },
        component: resolve => require(['@/pages/vip/mytreasureBox'], resolve)
      },{
        path: '/vip/Expired',// 已过期
        meta: {
          requireAuth: true
        },
        component: resolve => require(['@/pages/vip/Expired'], resolve)
      },{
        path: '/vip/unclaimed',// 待领取
        meta: {
          requireAuth: true
        },
        component: resolve => require(['@/pages/vip/unclaimed'], resolve)
      },{
        path: '/vip/Receaddress',// 收货地址
        meta: {
          requireAuth: true
        },
        component: resolve => require(['@/pages/vip/Receaddress'], resolve)
      },{
        path: '/vip/Conveboslist', //宝箱开启记录
        meta: {
          requireAuth: true
        },
        component: resolve => require(['@/pages/vip/Conveboslist'], resolve)// component: resolve => require(['@/pages/register'], resolve)  // 找回密码
      },{
        path: '/vip/boxrule', // 宝箱规则
        component: resolve => require(['@/pages/vip/boxrule'], resolve)// component: resolve => require(['@/pages/register'], resolve)  // 找回密码
      },{
        path: '/test',// 测试页面
        component: resolve => require(['@/pages/test'], resolve)
      },{
        path: '/register',
        component: resolve => require(['@/pages/register'], resolve)// component: resolve => require(['@/pages/register'], resolve)  // 找回密码
      },{
        path: '/commentdetails',
        name: 'commentdetails',
        component: resolve => require(['@/pages/Commentdetails'], resolve) // 注册页面
      },{
        path: '/regain',
        component: resolve => require(['@/pages/regain'], resolve) // 注册页面
      },{
        path: '/img',
        component: resolve => require(['@/components/imglode'], resolve) // 注册页面
      },{
        path: '/active_1',
        component: resolve => require(['@/pages/active/active_1'], resolve)  // 主页
      },{
        path: '/active_1/active1list',
        component: resolve => require(['@/pages/active/active_1_3'], resolve)  // 主页
      },{
        path: '/active_1/details_1',
        component: resolve => require(['@/pages/active/active_1_1'], resolve)  // 主页
      },{
        path: '/active_1/details_2',
        component: resolve => require(['@/pages/active/active_1_2'], resolve)  // 主页
      },{
        path: '/active_1/city',
        component: resolve => require(['@/pages/active/active_1_2_1'], resolve)  // 主页
      },{
        path: '/game',
        component: resolve => require(['@/pages/active/game/game'], resolve)  // 主页
      },{
      path: '/404',
      component: resolve => require(['@/pages/404'], resolve) // 注册页面
      },{
        path: '*',
        component: resolve => require(['@/pages/404'], resolve) // 注册页面
      }]
    }
  ]
})
export default router