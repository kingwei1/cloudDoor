<template>
    <div class="ProjectDetail">
        <div class="layout">
			<breadcrumb :menu="menu"></breadcrumb>
            <div class="blur">
                <div class="blurImg"><div class="coverDiv"></div><img :src="coverImg"></div>
                <div class="titleImg">
                    <span>{{box.proTitle}}</span>
                    <div class="titleDetail">
											<span class="proCompany">{{box.proCompany}}</span>
											<span class="proTime">{{box.proTime}}</span>
											<span class="see">{{box.see}}</span>
											<span class="type">{{box.type}}</span>
										</div>								
                </div>
            </div>
        </div>
        <div class="ClassDetail content">
            <div class="classList essay" id="content">
							 <div class="ql-container ql-snow">
							 		<div class="ql-editor">
							 			<div v-html="content"></div>
							 		</div>
							 </div>						
                <!-- <div class="item"><img src="../assets/timg.jpg"/></div>
                <div class="item">运营的三个核心：视角、框架、方向下面进一步升华，就是我们的用户养成框架。我们重新看一下宏观用户视角简图，从下面到上面对于一个新用户从接触产品到习惯产品，它代表着时间。横向代表一个辐射的范围，影响的范围，从底端到顶端对于一批接触用户变成习惯用户，它的数量是慢慢变少的。
                    以时间作为纵向坐标轴，以辐射的范围作为横向坐标轴，以数量作为水平坐标轴，套上一个框架。这个框架就是用户养成运营框架，由此可以推出运营工作的实质，也是做任何运营的一个策略动机和出发点。
                    第一最大程度缩短用户养成时间，使我们的新产品接触用户变成习惯用户的时间尽量最短。第二培育健康的用户养成梯形。第三最大化每一环节的辐射分享。</div>
                <div class="item"><img src="../assets/timg2.jpg"/></div> -->
           </div>
        </div>
				
    </div>
</template>

<script>
	import 'quill/dist/quill.core.css'
	import 'quill/dist/quill.snow.css'
	import breadcrumb from './components/breadcrumb'
    export default {
        name: "information-detail",
        components: {
			    breadcrumb
        },
				computed: {
						editor() {
								return this.$refs.myTextEditor.quill
						}
				},
        data(){
            return{
                id:this.$route.query.id,
                content:'',
                coverImg:'',
				menu:[{
					title:'首页',
					path:'/cloudHome'
				},{
					title:'热门资讯',
					path:'/informationList'
				},{
					title:'热门资讯明细',
					class:'blue'
				}],
                box:{
                proTitle:'基于大数据的汽车后市场服务平台',
                proCompany:'广西犇云科技有限公司',
                proTime:'2018-12-04 15:22',
                see:'1239',
                type:'新闻类型'
                },
                newsType:[],
            }
        },
        methods:{
            getListDetail(){
                const token = localStorage.getItem('token')
                let that=this;
                this.$axios.get(this.$baseUrl+'/news/news/'+this.id+'?token='+token,{})
                .then(function(res){
                    console.log(res)
                    let data=res.data.data;
                    let date=new Date(data.created)
                    let createDate=that.changeDate(date)
                    that.box.proTitle=data.title;
                    that.box.proCompany=data.publisher;
                    that.box.proTime=createDate;
                    that.box.see=data.views;
                    that.coverImg=that.$pictrueShowUrl+'/data/access/'+data.coverImg;
                    that.content=data.content;
                    for (var i = 0; i < that.newsType.length; i++) {
                         if(that.newsType[i].id==data.cid){
                            console.log(1)
                            that.box.type=that.newsType[i].name
                         }
                    }
                    

                })
                .catch(function(err){
                    console.log(err)
                })
            },
            getNewsType(){
                const token = localStorage.getItem('token')
                let that=this;
                this.$axios.get(this.$baseUrl+'/news/category/paged?page=1&size=10&token='+token,{})
                .then(function(res){  
					console.log(res)
                    let data=res.data.data.list;
                    console.log(data)
                    data.forEach(function(value,index,array){
                        that.newsType.push({
                            id:value.id,
                            name:value.name
                        })
                    })
                })
                .catch(function(err){
                    console.log(err)
                })
            }
        },
        created:function(){
            this.getListDetail();
            this.getNewsType()
        }
    }
</script>

<style scoped>
    .title{
        font-size: 20px;
        font-weight: bolder;
        margin-bottom: 14px;
    }
    span.title{
        width: 160px;
        vertical-align: top;
    }
    .titleImg{
        height: 280px;
        text-align: center;
        position: absolute;
        left: 0;top: 0;right: 0;
    }
    .blur{
        position: relative;
        padding-bottom: 20px;
    }
    .blurImg{
        height: 280px;
        text-align: center;
        -webkit-filter: blur(2px);
        -moz-filter: blur(2px);
        -ms-filter: blur(2px);
        -o-filter: blur(2px);
        filter: blur(2px);
        position: relative;
    }
    .blurImg img{
        height: 280px;
        width: 100%;
        -webkit-filter: blur(7px);
        -moz-filter: blur(7px);
        -o-filter: blur(7px);
        -ms-filter: blur(7px);
        filter:blur(7px);
    }
    .blurImg .coverDiv{
        position: absolute;
        background: rgba(0,0,0,0.2);
        top: 0;
        height: 280px;
        width: 100%;
        z-index: 999
    }
    .titleImg>span{
        font-size: 35px;
        font-weight: bolder;
        color: #fff;
        display: block;
        padding: 80px 0 10px 0;
    }
    .content{
        padding: 20px 0;
        background:#f6fafe ;
    }
    .classList {
        background: #fff;
        -webkit-box-shadow: 2px 2px 2px #ddd;
        box-shadow: 2px 2px 2px #ddd;
        padding: 20px;
        width: 1132px;
        margin: auto;
    }
    .classList .item{
        padding-bottom: 10px;
    }
    .classList .item span{
        display: inline-block;
        max-width: 930px;
    }
    .essay img{
        width: 100%;
    }
    .titleDetail{
        font-size: 14px;
        padding-top: 20px;
        display: inline-block;
        border-top: 1px solid #FFFFFF;
        color: #fff
    }
    .titleDetail span{
        display: inline-block;
    }
    .proCompany,.proTime,.see{
        padding-left: 30px;
        padding-bottom: 5px;
        padding-right: 30px;
    }
		.type{
			 padding-left: 30px;
			 padding-bottom: 5px;
		}
    .proCompany{
        background: url("../assets/作业(1).png") 0 0 no-repeat;
        /* background-size: 25% 80%; */
    }
    .proTime{
        background: url("../assets/时间.png") 5px 0px no-repeat;
        background-size: 10% 80%
    }
    .see{
        background: url("../assets/眼睛5.png") 0 0 no-repeat;
        background-size: 25% 78%
    }
    .type{
        background: url("../assets/标签(1).png") 0 0 no-repeat;
        /* background-size: 15% 85%; */
    }
</style>