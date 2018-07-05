
<template>
  <div>

    <canvas id="Canvas" width="375" height="661" style="margin: 0 auto"></canvas>
  </div>

</template>
<script>

export default {
  data (){
    return {
      height:0
    }
  },
  created(){
    this.$store.commit('selechange',5);
    this.$store.commit('_change',{
      _topshow: false,
      _bottshow: false,
    })
  },
  mounted(){
        /**全局变量**/


    var canvas = document.getElementById('Canvas');
    var clien =document.body.clientHeight

    var canvasWidth = canvas.width;  //画布的宽
    var canvasHeight =  canvas.height; //画布的高

    canvas.style.marginTop = (clien -canvasHeight)/2 + 'px'
    var ctx = canvas.getContext('2d');

    var imgBackground ;    // 游戏背景图片
    var imgsButton = [];
    var imgsQiu1 = [];    //足球
    var imgsHammer = [];  //锤子
    var imgsHammer1 = [];  //锤子

    // //下载图片
    setTimeout(()=>{
      download()
    },1000)
    function download() {
        var back = new Image();
        back.src = '/static/img/game/img_1.png';
        back.onload = function(){
          dow()
        };
        function dow(){
          var progress = 0; //下载进度：共有33张，每张的进度权重算3，背景图权重算4，权重和为100
          ctx.font = '0.17rem Helvetica'; //加载进度的字体
          ctx.fillStyle = '#eee';
          function drawProgress(){  //每次加载完一张图片，都会重新绘制当前进度
            ctx.clearRect(0,0,canvasWidth,canvasHeight);//清除画布上已有的内容
            ctx.drawImage(back,0,0,canvasWidth,canvasHeight);
            var txt = '素材加载中' + progress+'%';
            var w = ctx.measureText(txt).width;
            ctx.fillText(txt, canvasWidth/2-w/2, canvasHeight/2+80/2);
            //ctx.strokeText(txt,canvasWidth/2-w/2, canvasHeight/2+80/2);
            if(progress>=100){  //所有图片加载完成，开始游戏
              //startGame();
            }
          }

          imgBackground = new Image();
          imgBackground.src = '/static/img/game/img@2x.png';
          imgBackground.onload = function(){
            progress += 4;
            drawProgress();
          }
          /************** 足球 *****************/
          imgsQiu1[0] = new Image();
          imgsQiu1[0].src = '/static/img/game/football_1@2x.png';
          imgsQiu1[0].onload = function(){
            progress += 5;
            drawProgress();
          }

          imgsQiu1[1] = new Image();
          imgsQiu1[1].src = '/static/img/game/football_2@2x.png';
          imgsQiu1[1].onload = function(){
            progress += 5;
            drawProgress();
          }

          imgsQiu1[2] = new Image();
          imgsQiu1[2].src = '/static/img/game/football_3@2x.png';
          imgsQiu1[2].onload = function(){
            progress += 5;
            drawProgress();
          }
        /************** 伤害锤子 *****************/
          imgsHammer[0] = new Image();
          imgsHammer[0].src = '/static/img/game/act10@2x.png';
          imgsHammer[0].onload = function(){
            progress += 5;
            drawProgress();
          }
          imgsHammer[1] = new Image();
          imgsHammer[1].src = '/static/img/game/act25@2x.png';
          imgsHammer[1].onload = function(){
            progress += 5;
            drawProgress();
          }
          imgsHammer[2] = new Image();
          imgsHammer[2].src = '/static/img/game/act50@2x.png';
          imgsHammer[2].onload = function(){
            progress += 5;
            drawProgress();
          }
          imgsHammer[3] = new Image();
          imgsHammer[3].src = '/static/img/game/act75@2x.png';
          imgsHammer[3].onload = function(){
            progress += 5;
            drawProgress();
          }
          imgsHammer[4] = new Image();
          imgsHammer[4].src = '/static/img/game/act100@2x.png';
          imgsHammer[4].onload = function(){
            progress += 5;
            drawProgress();
          }
          /************** 咂锤子 *****************/
          /************** 锤子1 *****************/
          imgsHammer1[0] = []
          imgsHammer1[0][0] = new Image();
          imgsHammer1[0][0].src = '/static/img/game/wood@2x.png';
          imgsHammer1[0][0].onload = function(){
            progress += 5;
            drawProgress();
          }
          imgsHammer1[0][1] = new Image();
          imgsHammer1[0][1].src = '/static/img/game/wood_s@2x.png';
          imgsHammer1[0][1].onload = function(){
            progress += 5;
            drawProgress();
          }
        /************** 锤子2 *****************/
          imgsHammer1[1] = []
          imgsHammer1[1][0] = new Image();
          imgsHammer1[1][0].src = '/static/img/game/iron@2x.png';
          imgsHammer1[1][0].onload = function(){
            progress += 5;
            drawProgress();
          }
          imgsHammer1[1][1] = new Image();
          imgsHammer1[1][1].src = '/static/img/game/iron_s@2x.png';
          imgsHammer1[1][1].onload = function(){
            progress += 5;
            drawProgress();
          }
          /************** 锤子3 *****************/
          imgsHammer1[2] = []
          imgsHammer1[2][0] = new Image();
          imgsHammer1[2][0].src = '/static/img/game/gold@2x.png';
          imgsHammer1[2][0].onload = function(){
            progress += 5;
            drawProgress();
          }
          imgsHammer1[2][1] = new Image();
          imgsHammer1[2][1].src = '/static/img/game/gold_s@2x.png';
          imgsHammer1[2][1].onload = function(){
            progress += 5;
            drawProgress();
          }
           /************** 锤子4 *****************/
          imgsHammer1[3] = []
          imgsHammer1[3][0] = new Image();
          imgsHammer1[3][0].src = '/static/img/game/diamonds@2x.png';
          imgsHammer1[3][0].onload = function(){
            progress += 5;
            drawProgress();
          }
          imgsHammer1[3][1] = new Image();
          imgsHammer1[3][1].src = '/static/img/game/diamonds_S@2x.png';
          imgsHammer1[3][1].onload = function(){
            progress += 4;
            drawProgress();
          }
           /************** 锤子5 *****************/
          imgsHammer1[4] = []
          imgsHammer1[4][0] = new Image();
          imgsHammer1[4][0].src = '/static/img/game/gt@2x.png';
          imgsHammer1[4][0].onload = function(){
            progress += 5;
            drawProgress();
          }
          imgsHammer1[4][1] = new Image();
          imgsHammer1[4][1].src = '/static/img/game/gt_s@2x.png';
          imgsHammer1[4][1].onload = function(){
            progress += 3;
            drawProgress();
          }
          /**************** 按钮 *****************/
          imgsButton[0] = new Image()
          imgsButton[0].src = '/static/img/game/fraction@2x.png';
          imgsButton[0].onload = function(){
            progress += 5;
            drawProgress();
          }
          imgsButton[1] = new Image()
          imgsButton[1].src = '/static/img/game/time@2x.png';
          imgsButton[1].onload = function(){
            progress += 4;
            drawProgress();
          };
        }
    }

  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>
