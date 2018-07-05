import { Toast } from 'mint-ui';
var Expression = {
    "[m:1]": "/static/img/biaoqing/aoman.gif",
    "[m:2]": "/static/img/biaoqing/baiyan.gif",
    "[m:3]": "/static/img/biaoqing/bang.gif",
    "[m:4]": "/static/img/biaoqing/bishi.gif",
    "[m:5]": "/static/img/biaoqing/bizui.gif",
    "[m:6]": "/static/img/biaoqing/daku.gif",
    "[m:7]": "/static/img/biaoqing/daxiao.gif",
    "[m:8]": "/static/img/biaoqing/fengdou.gif",
    "[m:9]": "/static/img/biaoqing/ganga.gif",
    "[m:10]": "/static/img/biaoqing/guzhang.gif",
    "[m:11]": "/static/img/biaoqing/hanxiao.gif",
    "[m:12]": "/static/img/biaoqing/hanyan.gif",
    "[m:13]": "/static/img/biaoqing/huaixiao.gif",
    "[m:14]": "/static/img/biaoqing/huaji.gif",
    "[m:15]": "/static/img/biaoqing/jingkong.gif",
    "[m:16]": "/static/img/biaoqing/jong.gif",
    "[m:17]": "/static/img/biaoqing/keai.gif",
    "[m:18]": "/static/img/biaoqing/liulei.gif",
    "[m:19]": "/static/img/biaoqing/nanguo.gif",
    "[m:20]": "/static/img/biaoqing/piezui.gif",
    "[m:21]": "/static/img/biaoqing/qinqin.gif",
    "[m:22]": "/static/img/biaoqing/se.gif",
    "[m:23]": "/static/img/biaoqing/shengqi.gif",
    "[m:24]": "/static/img/biaoqing/shuijiao.gif",
    "[m:25]": "/static/img/biaoqing/tiaopi.gif",
    "[m:26]": "/static/img/biaoqing/weixiao.gif",
    "[m:27]": "/static/img/biaoqing/weiqu.gif",
    "[m:28]": "/static/img/biaoqing/wuyu.gif",
    "[m:29]": "/static/img/biaoqing/xia.gif",
    "[m:30]": "/static/img/biaoqing/ye.gif",
    "[m:31]": "/static/img/biaoqing/yiwen.gif",
    "[m:32]": "/static/img/biaoqing/yun.gif",
    "[m:33]": "/static/img/biaoqing/zaijian.gif",
    "[m:34]": "/static/img/biaoqing/zhouma.gif",
    "[m:35]": "/static/img/biaoqing/zhuakuang.gif"
  }
 function expression(dom){
    var ico = /\[m:\d+\]/g;
        var match = dom.match(ico);
        if (match != null) {
            for (var y = 0; y < match.length; y++) {
                dom = dom.replace(match[y], function (data) {
                    var t = match[y];
                    if(Expression[t]) {
                        data = '<img class="look" src="' + Expression[t] + '">'
                    }
                    return data
                })
            }
        }
    return dom
  }
  // 发帖请求
  function addNote(_this,game_name,tag_type,title,img,uurl,contents,remember,cip,type){
    // _this.$axios.post('/mc/',{}).then( (res) => {
    //     if(res.data.status == 201){
           
    //     }
    // })
  }
  // 收藏请求 
  function _like(_this,note,name,gtid,tylike){
    _this.$axios.post('/',{method:'note.user.userDeed',note: note,note_name:name,gtid:gtid,behavior:tylike}).then( (res) => {
     if(res.data.status == 201){
        Toast(res.data.msg)
        _this.$router.push('/logo')
     }
    })
  }
  // 点赞请求 
  function _share(_this,note,name,gtid,tylike){
     _this.$axios.post('/',{method:'note.user.userDeed',note: note,note_name:name,gtid:gtid,behavior:tylike}).then( (res) => {
        if(res.data.status == 201){
            Toast(res.data.msg)
            _this.$router.push('/logo')
        }
     })
  }

  function Transformation(dom){
    var imgfd = /<img.*?(?:>|\/>)/gi;
    var match = dom.match(imgfd);
    if(match !=null){
        for (var y = 0; y < match.length; y++) {
            dom = dom.replace(match[y], function (data) {
            for (var z in Expression) {
                if (match[y] == '<img src="'+Expression[z]+'">') {
                    data = z
                }
            }
            return data
          })
        }
    }
    
    return dom
  }
  function deepClone(obj){ // js对象深拷贝
        var newObj = obj.constructor === Array ? []:{};
        if(typeof obj !== 'object'){
            return
        }else{
            for(var i in obj){
                if(obj.hasOwnProperty(i)){
                    newObj[i] = typeof obj[i] === 'object' ? deepClone(obj[i]):obj[i];
                }
            }
        }
        return newObj
    }
  export { expression, _like, _share, Transformation, deepClone};