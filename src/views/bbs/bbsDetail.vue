<template>
    <div id="main">
        <div class="backLayout">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/bbs' }">帖子列表</el-breadcrumb-item>
                <el-breadcrumb-item>帖子详情</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="box">
                <div class="left">
                    <div class="face">
                        <img src="../../assets/userface.jpg"/>
                        <div>小明</div>
                    </div>
                    <div class="detail">
                        <div><span>标题：</span><span class="blue">撒贝宁的深夜食堂</span></div>
                        <div><span>分类：</span><span>java</span></div>
                        <div><span>发布时间：</span><span>2018-11-23 13:12:22</span></div>
                    </div>
                </div>
                <div class="right">
                    <div>收藏：1000</div>
                    <div>阅读：1000</div>
                    <div>评论：1000</div>
                </div>
            </div>
            <div class="box">
                <div class="page"><span>封面：</span><img src="../../assets/project-1.png"/></div>
                <div class="essay">
                    <span>正文：</span>
                    <p>
                        这是段落XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                        这是段落XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                        这是段落XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                        这是段落XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                        这是段落XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                        这是段落XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                        <img src="../../assets/timg.jpg"/>
                        这是段落XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                        这是段落XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                        这是段落XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                        这是段落XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                        这是段落XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                        这是段落XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                    </p>
                </div>
            </div>
            <div class="box">
                <div class="item"><div class="title">全部评论</div></div>
                <div class="userEva" v-for="(eva,index) in userEva">
                    <div class="item"><img :src="eva.face" class="userface"/><div class="userDetail"><span>{{eva.username}}</span><span>{{eva.date}}</span></div><div class="hidden" @click="">隐藏</div><div class="delete" @click="">删除</div></div>
                    <div class="evaContent">{{eva.content}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "bbs-detail",
        data(){
            return{
                userEva:[{
                    username:'username',
                    face:require('../../assets/userface.jpg'),
                    date:'2018-11-11 08:23:43',
                    good:21,
                    content:'老师治学严谨，要求严格，能深入了解学生的学习和生活状况，循循善诱，平易近人;注意启发和调动学生的积极性，课堂气氛较为活跃;上课例题丰富，不厌其烦，细心讲解，使学生有所收获;半数认真工整，批改作业认真及时并注意讲解学生易犯错误;最重要的是，段老师能虚心并广泛听取学生的意见和反馈信息，做到及时修正和调整自己的教学。总之，段老师是一个不可多得的好教师。'
                },{
                    username:'username',
                    face:require('../../assets/userface.jpg'),
                    date:'2018-11-11 08:23:43',
                    good:9,
                    content:'老师治学严谨，要求严格，能深入了解学生的学习和生活状况，循循善诱，平易近人;注意启发和调动学生的积极性，课堂气氛较为活跃;上课例题丰富，不厌其烦，细心讲解，使学生有所收获;半数认真工整，批改作业认真及时并注意讲解学生易犯错误;最重要的是，段老师能虚心并广泛听取学生的意见和反馈信息，做到及时修正和调整自己的教学。总之，段老师是一个不可多得的好教师。'
                },{
                    username:'username',
                    face:require('../../assets/userface.jpg'),
                    date:'2018-11-11 08:23:43',
                    good:50,
                    content:'老师治学严谨，要求严格，能深入了解学生的学习和生活状况，循循善诱，平易近人;注意启发和调动学生的积极性，课堂气氛较为活跃;上课例题丰富，不厌其烦，细心讲解，使学生有所收获;半数认真工整，批改作业认真及时并注意讲解学生易犯错误;最重要的是，段老师能虚心并广泛听取学生的意见和反馈信息，做到及时修正和调整自己的教学。总之，段老师是一个不可多得的好教师。'
                }]
            }
        }
    }
</script>

<style scoped>
    .box{
        border: 1px solid #F5F5F5;
        box-shadow: -10px 10px 30px #DCDCDC;
        margin:20px auto 50px;
        padding: 20px 30px;
        overflow: auto;
    }
    .left,.face,.detail{
        float: left;
    }
    .right{
        float: right;
        line-height: 50px;
    }
    .face{
        text-align: center;
    }
    .face img{
        width: 120px;
        height: 120px;
        border-radius: 120px;
    }
    .detail{
        padding-left: 30px;
        line-height: 50px;
    }
    .page span,.essay span{
        vertical-align: top;
        display: inline-block;
        width: 100px;
    }
    .page img{
        width: 400px;
    }
    .essay p{
        display: inline-block;
        width: calc(100% - 120px);
        line-height: 34px;
    }
    .essay p img{
        width: 100%;
    }
    .userEva{
        font-size: 20px;
        border-top: 4px solid #f6f9fd;
        margin-top: 20px;
    }
    .userEva:nth-child(1){
        border-top: 0;
    }
    .userEva .evaContent{
        font-size: 16px;
        padding: 20px 0 10px 0;
        cursor: pointer;
    }
    .userEva .userface,.userEva .userDetail{
        float: left;
    }
    .userEva .userDetail>span{
        display: block;
        font-size: 20px;
        padding-top: 8px;
    }
    .userEva .item{
        overflow: auto;
        border-bottom: 1px solid #ededef;
        padding: 10px 0 20px 0;
        position: relative;
    }
    .userEva .userface{
        width: 80px;
        height: 80px;
        border-radius: 80px;
        margin-right: 20px;
    }
    .delete,.hidden{
        position: absolute;
        bottom: 20px;
        color: var(--blue);
        cursor: pointer;
    }
    .delete{
        right: 20px;
    }
    .hidden{
        right: 100px;
    }
</style>