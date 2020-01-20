<template>
    <div class="ProjectList">
        <div class="layout">
			<breadcrumb :menu="menu"></breadcrumb>
        </div>
        <div class="content">
            <div class="layout">
				<el-menu :default-active="activeIndex" class="el-menu-demo"  @select="handleSelect" active-text-color='#fff'>
					<el-menu-item v-for="type in types" :index="type.id">{{type.label}}</el-menu-item>
				</el-menu>
					<div class="box">
							<div class="layout">							
									<threeLayout>
											<!--卡槽用法-->
											<template slot-scope="slotThree">
													<div v-for="box in boxs" class="project">
															<router-link :to="{path:'/ProjectDetail1',query:{id:box.id}}">
															<img :src="box.src"/>
															<el-button round class="typeName">{{box.typeName}}</el-button>
															<div class="projectIntro">													    
																	<div class="proTitle">{{box.proTitle}}</div>
																	<div class="proCompany">{{box.proCompany}}</div>
																	<div class="proTime">{{box.proTime}}</div>
															</div>
															</router-link>
													</div>
											</template>
											<!--卡槽用法-->
									</threeLayout>
									<el-pagination
													background
													layout="total,sizes, prev, pager, next, jumper"
													:page-sizes="[6]"
													@current-change="handleCurrentChange"
													:total="totalNumber">
									</el-pagination>
							</div>
					</div>
            </div>
        </div>
    </div>
</template>

<script>
    import threeLayout from '../components/threeLayout.vue'
	import breadcrumb from './components/breadcrumb'
    export default {
        name: "project-list",
        components: {
            threeLayout,
			breadcrumb
        },
        data(){
            return{
				menu:[{
					title:'首页',
					path:'/cloudHome'
				},{
					title:'校企项目',
					class:'blue'
				}],
				activeIndex:'',
				totalNumber:0,
				types:[
					{
						label:'全部',
						id:''
					}
				],
				boxs:[]
            }
        },
		methods:{
			handleSelect(index){
				console.log(index)
				this.activeIndex = index;
				this.getList(1);
			},
			getTypes(){
				let that=this;
				const token=localStorage.getItem('token');
				console.log(token)
				this.$axios.get(this.$schoolCompanyUrl+'/type/types/student/1?token='+token)
				.then(function(res){
						console.log(res);
						if(res.data.code == 0){
							let data = res.data.data;
							data.forEach(function(value,index,array){									
									that.types.push({
										label:value.name,
										id:value.id.toString()
									});
							})
						}
						
				})
				.catch(function(err){
				   console.log(err)
				})
			},
			handleCurrentChange(val) {
				console.log(val)
				this.getList(val);
			},
			getList(page){
				 let that=this;
				 const token=localStorage.getItem('token');
				 if(this.activeIndex == undefined){
					 this.activeIndex = ''
				 }
				 this.$axios.get(this.$schoolCompanyUrl+'/student/projects?token='+token+'&pageSize=6&pageNum='+page+'&typeId='+this.activeIndex+'&majorId=1')
				 .then(function(res){
				 		console.log(res);
				 		if(res.data.code == 0){
				 			let data = res.data.data;
							that.boxs = [];
							that.totalNumber = res.data.count;
							data.forEach(function(value,index,array){	
									that.boxs.push({
										src:value.pictureUrl == null? require('../assets/project-1.png'):value.pictureUrl,
										proTitle:value.name,
										proCompany:value.enterpriseName,
										proTime:that.changeDate(new Date(value.created)),
										id:value.id,
										typeName:value.typeName
									});
							})
				 		}else{
							  that.$message.error(res.data.msg);
						}
				 		
				 })
				 .catch(function(err){
				 	console.log(err)
				 })
			}
		},
		created:function(){
			this.handleSelect();
			this.getTypes();
		}
    }
</script>

<style scoped>
    .content{
        background:#F0F8FF;
    }
    .project{		
        margin-bottom: 40px;
		position: relative;
    }
	.project > a {
		font-size: 0;
	}
    .projectIntro{
		font-size: 14px;
        background: var(--blue);
        color: #fff;
        padding: 20px;
        box-sizing: border-box;
    }
    .project:hover{
        cursor: pointer;
    }
    .project img{
		font-size: 0;
        width: 100%;
        height: 244px;		
    }
	.typeName{
		position: absolute;
		top: 10px;
		right: 10px;
	}
    .proTitle{
        font-size: 20px;
        font-weight: bolder;
        padding-bottom: 10px;
				height: 45px;
    }
    .proCompany,.proTime{
        color: #bcd0f0;
        padding-left: 30px;
        padding-bottom: 5px;
    }
    .proCompany{
        background: url("../assets/book.png") 0 4px no-repeat;
    }
    .proTime{
        background: url("../assets/time.png") 0 4px no-repeat;
    }
	/* .el-tabs{
	background:#F0F8FF; 
	}
	.box .btn{
	margin :10px 0px;
	overflow: auto;
	} */
	.el-menu{
	  background: none;
	  margin: 20px 0;
	}
	.el-menu-item{
	  float: left;
	  border-radius: 30px;
	 /* min-width: 120px; */
	  height: 40px;
	  line-height: 40px;
	  text-align: center;
	  font-size: 16px
	}
	.el-menu-item.is-active{
	  background: var(--blue);
	  border: none;
	  font-weight: bolder;
	}
</style>
<style>
    .ProjectList  .el-tabs__header .el-tabs__nav-wrap::after{
        height: 0px
    }
    .ProjectList  .el-tabs__active-bar{
        display: none
    }
    .ProjectList .el-tabs__item{
        padding-left: 20px !important;
        padding-right: 20px !important;
        font-size: 18px
    }
    .ProjectList .el-tabs__item.is-active{
        background: var(--blue);
        color: #fff;
        border-radius: 20px
    }
    .ProjectList .el-tabs__nav-scroll{
        width: 1172px;
        margin:auto;
        padding: 20px 0px ;
    }
    .ProjectList .el-tabs__nav-wrap{
        margin: 0;
    }
    .ProjectList  .el-tabs__header{
        padding-bottom: 15px;
    }
    .ProjectList .el-pagination{
        margin-bottom: 40px;
        text-align: right;
    }
    .ProjectList .el-pagination.is-background .btn-next,.ProjectList .el-pagination.is-background .btn-prev,.ProjectList .el-pagination.is-background .el-pager li{
        background: #fff;
    }
</style>