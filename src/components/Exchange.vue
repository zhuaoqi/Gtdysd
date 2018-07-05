<template>
    <div v-show="islook" class="Exchange" :class="islook? 'feomCss': ''"  @touchmove.prevent>
        <img :src="data.img">
        <p>{{data.msg}}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            value: false
        }
    },
    methods: {
      
    },
    props: ['islook','data']
}
    
</script>
<style lang="scss">
.Exchange{
    position: fixed;
    top: 35%;left: 0.525rem;
    z-index: 120;
    padding-top: 0.31rem;
    padding-bottom: 0.24rem;
    background-color: #fff;
    width: 2.7rem;
    border-radius: 3px;
    -webkit-user-select: none;
    overflow: hidden;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    text-align: center;
    >img{
        width: 0.54rem;
    }
    >p{
        margin-top: 0.28rem;
    }
}
</style>