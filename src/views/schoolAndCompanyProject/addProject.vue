<template>
	<div id="signAuthenticationMain">
		<div class="backLayout">			
			<breadcrumb :menu="menu"></breadcrumb>
			<div class="box" >				
				<div class="formBox1">
					<div class="formInfo"><span>项目名称</span><el-input v-if="state!='see'" v-model="name"></el-input><span v-if="state=='see'">{{name}}</span></div>
					<div class="formInfo">
						<span>项目类型</span>
						<el-select v-if="state!='see'" v-model="type">
							<el-option
                                v-for="item in types"
                                :label='item.item'
                                :value='item.value'
							>								
							</el-option>
						</el-select>
						<span v-if="state=='see'">{{typeName}}</span>
					</div>
					<div class="formInfo" style=''>
						<span >项目logo</span>
						<el-upload
						     v-if="state!='see'"						
								:action="url"
								list-type="picture-card"
								:limit= 1
								accept=".png,.jpg"
								:file-list="fileListShow"
								:data='projectLogo'
								:before-upload='beforeUpload'
								:on-success='uploudSuccess'
							  >
							  <i class="el-icon-plus"></i>
							  
						</el-upload>
						 <span v-if="state!='see'" style="display: block;margin:20px 150px; ;font-size: 12px;">只能上传一张jpg/png文件，且不超过5M，尺寸建议360*244</span>
						<el-dialog :visible.sync="dialogVisible">
						  <img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>
						<span v-if="state=='see'"><img :src="logo" style="width: 200px;"></span>
					</div>
					
					<div class="formInfo">
						<span>项目简介</span>
						<el-input v-model="introduce" v-if="state!='see'" type="textarea" :rows="5"></el-input>
						<span v-if="state=='see'">{{introduce}}</span>
					</div>
					<div class="formInfo">
						<span>项目内容</span>						
						<div class="ql-container ql-snow" style="margin-left: 150px;" v-if="state =='see'">
							<div class="ql-editor">
								<div v-html="EditorContent"></div>
							</div>
						</div>
					</div>
					<div class="formInfo">
							<div style="height: 380px;" v-if="state!='see'">
									<quill-editor ref="myTextEditor"
													v-model="EditorContent"
													>
									</quill-editor>
							</div>
					</div>
					<div class="formInfo">
						<span>项目岗位</span>
						 <el-button type="primary" @click="addStation" v-if="state!='see'">添加岗位</el-button>
						<tableList :tableData="tableData" :titles="titles" :operate="state !='see'" flag='addProject' @open="open" ></tableList>
						<dialogBox :dialogVisible='show' :flag="flag" :datas="datas" @close="show=false" @submitChange='submitChange'></dialogBox>
					</div>
					<div class="btn1" v-if="state=='edit'">
						<el-button type="primary" @click="save">保存</el-button>
					</div>	
					<div class="btn1" v-if="state=='add'">
						<el-button type="primary" @click="submit">确认创建</el-button>
					</div>												
				</div>
			</div>
		</div>
		<!-- 文件上传input 将它隐藏-->
			<el-upload class="upload-demo" :action="url" :on-success='upScuccess'
					ref="upload" style="display:none" :data="projectLogo" :before-upload='beforeUpload'>
					<el-button size="small" type="primary" id="imgInput"  element-loading-text="插入中,请稍候">点击上传</el-button>
				</el-upload>
	</div>
</template>
<script>
	import 'quill/dist/quill.core.css'
	import 'quill/dist/quill.snow.css'
	import tableList from '../components/tableList'
	import dialogBox from '../components/dialogBox'
	import breadcrumb from '../components/breadcrumb1'
	export default{
		name:'addProject',
		components:{
			tableList,
			dialogBox,
			breadcrumb
		},
		computed: {
						editor() {
								return this.$refs.myTextEditor.quill
						}
				},
		mounted(){
			this.$refs.myTextEditor.quill.getModule('toolbar').addHandler('image', this.imgHandler);
		},
		data(){
			return{ 
			        state:'',
							id:this.$route.query.id,
							menu:[{
								title:'项目列表',
								path: '/projectManage'
								}],
              dialogImageUrl: '',
              dialogVisible: false,
              show:false,
							url:this.$baseUrl+'/file/upload',
              flag:'',
              name:'',
              type:'',
              types:[],
							typeName:'',
              introduce:'',
              EditorContent:'',
              logo:'',
							projectLogo:{},
							fileListShow:[],
              titles:[
                  {
                     prop:'stationName',
                     label:'岗位名称'
                  },{
                     prop:'stationIntroduce',
                     label:'项目介绍'
                  },{
                     prop:'recruitsNumber',
                     label:'招募人数'
                  }
               ],
               tableData:[],
							 count:0,
               datas:{
               	 stationName:'',
               	 stationIntroduce:'',
               	 recruitsNumber:'',
								 id:'',
               	 stationName1:'',
               	 stationIntroduce1:'',
               	 recruitsNumber1:'',
               }
			}
		},
		methods:{
	      onEditorChange({ editor, html, text }) {
	      		// console.log('editor change!', editor, html, text)
	      		this.EditorContent= html;
	      		console.log(this.EditorContent)
	      },
				// 图片上传成功回调   插入到编辑器中
				upScuccess(e, file, fileList) {
						let url = '';
						console.log(e)
						url = this.$pictrueShowUrl+'/data/download/'+e.data.filePath;
						if (url != null && url.length > 0) {  
						// 将文件上传后的URL地址插入到编辑器文本中
							this.editor.insertEmbed(this.editor.getSelection().index, 'image', url);
						}
						this.$refs['upload'].clearFiles()    
						//插入成功后清除input的内容
				},
				imgHandler(state) {
		    	this.addRange = this.$refs.myTextEditor.quill.getSelection()
			    if (state) {
			      let fileInput = document.getElementById('imgInput')
			      fileInput.click() // 加一个触发事件
						this.projectLogo = {};
			    }
			    console.log(state)
			 },
	      addStation(){
	      	this.show=true;
	      	this.flag="添加岗位"
	      },
				beforeUpload(file){
					console.log(file);
					const token=localStorage.getItem('token');
					this.projectLogo = {
						file:file,
						token:token
					}
				},
				uploudSuccess(response, file, fileList){
					console.log(response);
					if(response.code == 0){
						 this.logo = this.$pictrueShowUrl+'/data/download/'+response.data.filePath;
					}else{
						this.$message.error('失败');
					}
				},
	      open(id,flag,stationName,stationIntroduce,recruitsNumber){
	      	this.show=true;
	      	this.flag=flag;
					if(flag == '修改岗位'){
						this.datas.id = id;
						this.datas.stationName1=stationName;
						this.datas.stationIntroduce1=stationIntroduce;
						this.datas.recruitsNumber1=recruitsNumber;
					}else if(flag == '删除岗位' && this.state == 'add'){
						for(let i=0;i<this.tableData.length;i++){
							if(this.tableData[i].id == id){
								this.tableData.splice(i,1);
								console.log(this.tableData)
							}
						}
					}else if(flag == '删除岗位' && this.state == 'edit'){
						  this.$confirm('此操作将直接删除该岗位并保存, 是否继续?', '提示', {
						  	confirmButtonText: '确定',
						  	cancelButtonText: '取消',
						  	type: 'warning'
						  }).then(() => {
						  	let that=this;
						  	const token=localStorage.getItem('token');
						  	this.$axios.post(this.$schoolCompanyUrl+'/enterprise/deletePosition/'+id+'?token='+token)
						  	.then(function(res){
						  			console.log(res);	
						  			if(res.data.code == 0){
						  				that.$message({
						  					type: 'success',
						  					message: '删除成功!'
						  				});
						  				that.queryProject();
						  			}else{
						  				that.$message.error(res.data.msg);
						  			}
						  	})
						  	.catch(function(err){
						  			console.log(err)
						  	})
						  	
						  }).catch(() => {
						  	this.$message({
						  		type: 'info',
						  		message: '已取消'
						  	});          
						  });
					}
					console.log(id,flag,stationName,stationIntroduce,recruitsNumber)
					
	      },
				submitChange(flag){
					 if(flag == '添加岗位' && this.state == 'add'){
						  if(this.datas.stationName == '' || this.datas.stationIntroduce == '' || this.datas.recruitsNumber == 0){
								 this.$message.error('岗位名称和岗位介绍不能为空且招聘人数大于0');
							}else{
								 this.tableData.push({
									  id:this.count++,
									  stationName:this.datas.stationName,
									  stationIntroduce:this.datas.stationIntroduce,
									  recruitsNumber:this.datas.recruitsNumber
								 });
								 this.show=false;
								 this.datas.stationName = '' ;
								 this.datas.stationIntroduce = '';
								 this.datas.recruitsNumber = 0 ;
							}
					 }
					 if(flag == '修改岗位' && this.state == 'add'){
						 if(this.datas.stationName1 == '' || this.datas.stationIntroduce1 == '' || this.datas.recruitsNumber1 == 0){
						 	this.$message.error('岗位名称和岗位介绍不能为空且招聘人数大于0');
						 }else{
							 for(let i=0;i<this.tableData.length;i++){
								 if(this.tableData[i].id == this.datas.id){
									  this.tableData[i].stationName = this.datas.stationName1;
									  this.tableData[i].stationIntroduce = this.datas.stationIntroduce1;
									  this.tableData[i].recruitsNumber = this.datas.recruitsNumber1;
										this.show=false;
										break;
								 }
							 }
						 }
					 }
					 if(flag == '添加岗位' && this.state == 'edit'){
					 	if(this.datas.stationName == '' || this.datas.stationIntroduce == '' || this.datas.recruitsNumber == 0){
					 			console.log(12)
								this.$message.error('岗位名称和岗位介绍不能为空且招聘人数大于0');
					 	}else{
							  this.$confirm('此操作将直接添加岗位并保存, 是否继续?', '提示', {
									confirmButtonText: '确定',
									cancelButtonText: '取消',
									type: 'warning'
								}).then(() => {
									let that=this;
									const token=localStorage.getItem('token');
									let data = {
										projectId:this.id,
										name:this.datas.stationName,
										introduction:this.datas.stationIntroduce,
										total:this.datas.recruitsNumber
									}
									this.$axios.post(this.$schoolCompanyUrl+'/enterprise/addPosition?token='+token,data)
									.then(function(res){
											console.log(res);	
											if(res.data.code == 0){
												that.$message({
													type: 'success',
													message: '添加成功!'
												});
												that.show=false;
												that.queryProject();
											}else{
												that.$message.error(res.data.msg);
											}
									})
									.catch(function(err){
											console.log(err)
									})
									
								}).catch(() => {
									this.$message({
										type: 'info',
										message: '已取消'
									});          
								});
								
					 	}
					 }
					 if(flag == '修改岗位' && this.state == 'edit'){
						 if(this.datas.stationName1 == '' || this.datas.stationIntroduce1 == '' || this.datas.recruitsNumber1 == 0){
						 this.$message.error('岗位名称和岗位介绍不能为空且招聘人数大于0');
						 }else{
								this.$confirm('此操作将直接修改岗位并保存, 是否继续?', '提示', {
									confirmButtonText: '确定',
									cancelButtonText: '取消',
									type: 'warning'
								}).then(() => {
									let that=this;
									const token=localStorage.getItem('token');
									let data = {
										projectId:this.id,
										name:this.datas.stationName1,
										introduction:this.datas.stationIntroduce1,
										total:this.datas.recruitsNumber1,
										id:this.datas.id
									}
									this.$axios.post(this.$schoolCompanyUrl+'/enterprise/position?token='+token,data)
									.then(function(res){
											console.log(res);	
											if(res.data.code == 0){
												that.$message({
													type: 'success',
													message: '修改成功!'
												});
												that.show=false;
												that.queryProject();
											}else{
												that.$message.error(res.data.msg);
											}
									})
									.catch(function(err){
											console.log(err)
									})
									
								}).catch(() => {
									this.$message({
										type: 'info',
										message: '已取消'
									});          
								});
								
						 }
					 }
				},
	      save(){
             console.log(this.name)
             console.log(this.type)
             console.log(this.introduce)
             console.log(this.logo)
             console.log(this.EditorContent)
             let that=this;
             const token=localStorage.getItem('token');
						 let projectLogo = '';
						 if(this.logo == ''){
							  projectLogo =  this.fileListShow[0].url;
						 }else{
							  projectLogo = this.logo;
						 }
             let data = {
							id:this.id,
             	name:this.name,
             	typeId:this.type,
             	introduction:this.introduce,
             	content:this.EditorContent,
             	pictureUrl:projectLogo
             }
						 console.log(data)
             this.$axios.post(this.$schoolCompanyUrl+'/enterprise/project/update?token='+token,data)
             .then(function(res){
             		console.log(res);
             		if(res.data.code == 0){
             			that.$message({
             				message: '保存成功',
             				type: 'success'
             			});
             			that.$router.push({path:'/projectManage',query:{}});
             		}else{
             			that.$message({
             				message:res.data.msg ,
             				type: 'warning'
             			});
             		}
             		
             })
             .catch(function(err){
             		console.log(err)
             })
	      },
	      submit(){
						console.log(this.name)
						console.log(this.type)
						console.log(this.introduce)
						console.log(this.logo)
            console.log(this.EditorContent)
						console.log(this.tableData)
						let that=this;
						const token=localStorage.getItem('token');
						let tableDatas = [];
						this.tableData.forEach(function(value,index,array){
										tableDatas.push({
											name:value.stationName,
											introduction:value.stationIntroduce,
											total:value.recruitsNumber		
										})
							})
						let data = {
							name:this.name,
							typeId:this.type,
							introduction:this.introduce,
							content:this.EditorContent,
							pictureUrl:this.logo,
							majorId:1,
							positions:tableDatas
						}
						this.$axios.post(this.$schoolCompanyUrl+'/enterprise/project?token='+token,data)
						.then(function(res){
								console.log(res);
								if(res.data.code == 0){
									that.$message({
										message: '创建成功',
										type: 'success'
									});
									that.$router.push({path:'/projectManage',query:{}});
								}else{
									that.$message({
										message:res.data.msg ,
										type: 'warning'
									});
								}
								
						})
						.catch(function(err){
								console.log(err)
						})
	      },
				getTypes(){
						let that=this;
						const token=localStorage.getItem('token');
						this.$axios.get(this.$schoolCompanyUrl+'/type/types/1?token='+token)
						.then(function(res){
								console.log(res);	
								if(res.data.code == 0){
									let data = res.data.data;
									that.types = [];
									data.forEach(function(value,index,array){
										that.types.push({
											item:value.name,
											value:value.id			
											})
									})
								}else{
             			that.$message({
             				message:'通过认证后才能创建协同育人合作项目' ,
             				type: 'warning'
             			});
             		}
						})
						.catch(function(err){
						    console.log(err)
						})
					},
					queryProject(){
						let that=this;
						const token=localStorage.getItem('token');
						this.$axios.get(this.$schoolCompanyUrl+'/enterprise/project/'+this.$route.query.id+'?token='+token)
						.then(function(res){
								console.log(res);	
								if(res.data.code == 0){
									let data = res.data.data;
									that.name = data.name;
									that.type= data.typeId;
									that.introduce= data.introduction;
									that.EditorContent= data.content;
									that.fileListShow = [{url:data.pictureUrl}];									
									that.tableData = [];
									data.positions.forEach(function(value,index,array){
										that.tableData.push({
											id:value.id,
											stationName:value.name,
											stationIntroduce:value.introduction,
											recruitsNumber:value.total
										});
									})
									
									that.logo = data.pictureUrl;
									console.log(that.types)
									for(let i;i<that.types.length;i++){
										if(data.typeId == that.types[i].value){
											that.typeName = that.types[i].item;
											break;
										}
									}
								}
						})
						.catch(function(err){
								console.log(err)
						})
					}

		},
		created:function(){		     
           if (this.$route.query.state == '待审核' || this.$route.query.state == '未通过') {
           	   this.state = 'edit';
							 this.getTypes();
							 this.queryProject();
							 this.menu.push({
								 title:'编辑项目'
							 })
           }else if(this.$route.query.state == '进行中' || this.$route.query.state == '已完成') {
           	   this.state = 'see';
							 let that=this;
							 const token=localStorage.getItem('token');
							 //执行先后问题
							 let id = this.$route.query.id;
							 var getPicture1 = new Promise(function(resolve, reject){
									 	that.$axios.get(that.$schoolCompanyUrl+'/type/types/1?token='+token)
									 	.then(function(res){
									 		console.log(res);	
									 		if(res.data.code == 0){
									 			let data = res.data.data;
									 			that.types = [];
									 			data.forEach(function(value,index,array){
									 				that.types.push({
									 					item:value.name,
									 					value:value.id			
									 					})
									 			})
												resolve();
									 		}
									 	})
									 	.catch(function(err){
									 		console.log(err);
											reject();
									 	})															
					     });
							  getPicture1.then(function(value){
									 that.$axios.get(that.$schoolCompanyUrl+'/enterprise/project/'+id+'?token='+token)
									 .then(function(res){
									 		console.log(res);	
									 		if(res.data.code == 0){
									 			let data = res.data.data;
									 			that.name = data.name;
									 			that.type= data.typeId;
									 			that.introduce= data.introduction;
									 			that.EditorContent= data.content;
									 			that.fileListShow = [{url:data.pictureUrl}];									
									 			that.tableData = [];
									 			data.positions.forEach(function(value,index,array){
									 				that.tableData.push({
									 					id:value.id,
									 					stationName:value.name,
									 					stationIntroduce:value.introduction,
									 					recruitsNumber:value.total
									 				});
									 			})
									 			
									 			that.logo = data.pictureUrl;
									 			for(let i =0;i<that.types.length;i++){
									 				if(data.typeId == that.types[i].value){
									 					that.typeName = that.types[i].item;
									 					break;
									 				}
									 			}
									 		}
									 })
									 .catch(function(err){
									 		console.log(err)
									 })	
								},function(value){
									 console.log(value)
								});													 											 
							 this.menu.push({
							 	title:'查看项目'
							 })				
           }else if(this.$route.query.state == 'add') {
           	   this.state = 'add';
							 this.getTypes();
							 this.menu.push({
							 	title:'创建项目'
							 })
           }
		}
	}
</script>
<style scoped>
	.box{
		border: 1px solid #F5F5F5;
		box-shadow: -10px 10px 30px #DCDCDC;
		margin:20px auto;
		padding: 30px 0px
	}
	.formBox1 .formInfo{
		margin: 20px 30px;
		font-size: 16px;
		overflow: auto;
	}
	.formBox1 .formInfo span:nth-child(1){
		display: inline-block;
		width: 150px;
		text-align: left;
		float: left;
	}
	.el-input,.el-select,.el-textarea{
		width: 400px
	}
	.el-table{
	}
	.formBox1 .formInfo .el-button{
		margin: 0px 0 10px 600px
	}
    .btn1{
       text-align: center;
    }
    .btn1 .el-button{
       width: 200px
    }
    .box .el-table{
		width: calc(100% - 200px);
	}
  .quill-editor{
  		height: 300px;
  }
</style>
<style>
   
</style>