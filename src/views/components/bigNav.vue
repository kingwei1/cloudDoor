<template>
    <div id="bigNav">
        <el-tabs v-model="activeName">
            <slot></slot>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        name: "big-nav",
        data(){
            return{
                activeName:'1',
            }
        },
        mounted(){
            //修改tabs宽度
            this.$nextTick(function(){
                for(let i=0;i<document.getElementsByClassName('el-tabs__item').length;i++){
                    document.getElementsByClassName('el-tabs__item')[i].style.width=(1070/document.getElementsByClassName('el-tabs__item').length)+'px';
                }
            });
        }
    }
</script>
<style scoped>
    .imgDetail{
        width: 100%;
        margin: 40px 0;
    }
</style>
<style>
    #bigNav .el-tabs__active-bar{
        display: none;
    }
    #bigNav .el-tabs__header{
        width: 1070px;
        margin: auto;
    }
    #bigNav .el-tabs__nav-wrap::after{
        background: #fff;
    }
    #bigNav .el-tabs__item{
        padding: 10px 0;
        height: auto;
        text-align: center;
        font-size: 22px;
        border: 1px solid #dbdbdb;
    }
    #bigNav .el-tabs__item:nth-child(2){
        border-radius: 80px 0 0 80px;
        border-right: 0;
    }
    #bigNav .el-tabs__item:last-child{
        border-radius: 0 80px 80px 0;
        border-left: 0;
    }
    #bigNav .el-tabs__nav-wrap{
        margin: 0;
    }
    #bigNav .el-tabs__content{
        padding-top: 40px;
    }
    #bigNav .el-tabs__item.is-active{
        color: #fff;
        background: var(--blue);
    }
    #bigNav .btnBox{
        text-align: center;
        padding: 20px;
    }
</style>