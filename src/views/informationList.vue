<template>
    <div class="ProjectList">
        <div class="layout">
						<breadcrumb :menu="menu"></breadcrumb>
        </div>
        <div class="content">
            <div class="layout">
                <el-tabs v-model="activeName" >
                    <el-tab-pane
                            v-for="tab in tabs"
                            :label="tab.label"
                            :name="tab.name"
                    >
                        <div class="box">
                            <div class="layout">
                                <div class="information" v-for="box in tab.boxs">
                                   <router-link :to="{path:'/informationDetail',query:{id:box.id}}">
                                       <div class="left">
                                           <img :src="box.src"/>
                                       </div>
                                       <div class="right">
                                            <div class="blue">{{box.proTitle}}</div>
                                            <div class="proContent">{{box.proContent}}</div>
                                            <div><span class="proCompany">{{box.proCompany}}</span><span class="proTime">{{box.proTime}}</span><span class="see">{{box.see}}</span><span class="type">{{box.type}}</span></div>
                                       </div>
                                   </router-link>
                                </div>
																<pagination ref="text" :paginationShow="paginationShow" :listTotal="listTotal" @pageChangeSize="pageChangeSize" @page="page"></pagination>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
	  import pagination from '../views/components/pagination'
	  import breadcrumb from './components/breadcrumb'
    export default {
        name: "information-list",
        components: {
					breadcrumb,
					pagination
        },
        data(){
            return{
				menu:[{
					title:'首页',
					path:'/cloudHome'
				},{
					title:'热门资讯',
					class:'blue'
				}],
				        pageSize:10,
				        paginationShow:true,
				        listTotal:0,
                activeName:'1',
                tabs:[
                    {
                        label:'最热',
                        name:'1',
                        boxs:[]
                    },{
                        label:'最新',
                        name:'2',
                        boxs:[]
                    }
                ]
            }
        },
        methods:{
					page(val){
						this.getNews(val)
					},
					pageChangeSize(val){
						this.paginationShow = false;
						this.$nextTick(function () {
						   this.paginationShow = true;
							 this.$refs.text[0].setSize(val);									
							 this.pageSize = val; 
							 this.getNews(1)
						})
									
					},
            getNews(page){
                const token=localStorage.getItem('token');
                let that=this;
                this.$axios.get(this.$baseUrl+'/news/paged?page='+page+'&size='+this.pageSize+'&sort=2&token='+token,{})
                .then(function(res){
                    console.log(res)
                    let data=res.data.data.list;
										that.listTotal = res.data.count;
                    data.forEach(function(value,index,array){
                        let date=new Date(value.created)
                        let createDate=that.changeDate(date,'yyyy-MM-dd')
                        that.tabs[0].boxs.push({
                            src:that.$pictrueShowUrl+'/data/access/'+value.coverImg,
                            proTitle:value.title,
                            proCompany:value.publisher,
                            proContent:value.description,
                            proTime:createDate,
                            see:value.views,
                            type:value.categoryName,
                            id:value.id

                        })
                    })
                })
                .catch(function(err){
                    console.log(err)
                })
								
								this.$axios.get(this.$baseUrl+'/news/paged?page='+page+'&size='+this.pageSize+'&sort=1&token='+token,{})
								.then(function(res){
										console.log(res.data)
										let data=res.data.data.list;
										that.listTotal = res.data.count;
										data.forEach(function(value,index,array){
												let date=new Date(value.created)
												let createDate=that.changeDate(date,'yyyy-MM-dd')
												that.tabs[1].boxs.push({
														src:that.$pictrueShowUrl+'/data/access/'+value.coverImg,
														proTitle:value.title,
														proCompany:value.publisher,
														proContent:value.description,
														proTime:createDate,
														see:value.views,
														type:value.categoryName,
														id:value.id

												})
										})
								})
								.catch(function(err){
										console.log(err)
								})
            }
        },
        created:function(){
            this.getNews(1);
        }
    }
</script>

<style scoped>
    .content{
        background:#F0F8FF;
    }
    .proCompany,.proTime,.see,.type{
        color: #bcd0f0;
        padding-left: 30px;
        padding-bottom: 5px;
        padding-right: 30px;
    }
    .proCompany{
        background: url("../assets/book.png") 0 2px no-repeat;
    }
    .proTime{
        background: url("../assets/time.png") 0 2px no-repeat;
    }
    .see{
        background: url("../assets/sees.png") 0 2px no-repeat;
    }
    .type{
        background: url("../assets/tags.png") 0 2px no-repeat;
    }
    .information{
        overflow: auto;
        background: #fff;
        padding: 20px;
        margin-bottom: 20px;
    }
    .information .left{
        width: 300px;
				height: 150px;
        float: left;
    }
    .information .left img{
        width: 100%;
				height: 130%;
    }
    .information .right{
        width: 800px;
        float: right;
    }
    .information .blue{
        font-size: 18px;
        font-weight: bolder;
        padding-bottom: 10px;
    }
    .information a{
        color:#2c3e50;
    }
    .proContent{
        line-height: 25px;
        height: 140px;
        overflow: hidden;
        padding-right: 80px;
        background: url("../assets/arrow-right.png") no-repeat right;
    }
</style>
<style>
</style>