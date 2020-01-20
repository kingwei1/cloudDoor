<template>
	<div id="signAuthenticationMain" v-loading="loading" 
	  element-loading-text="正在提交"
		v-loading.fullscreen.lock="loading"
		element-loading-background="rgba(0, 0, 0, 0.8)"
    >
		<div class="backLayout">
			<el-breadcrumb separator-class="el-icon-arrow-right">
		        <el-breadcrumb-item :to="{ path: '/Authentication' }">企业认证</el-breadcrumb-item>
		        <el-breadcrumb-item>立即认证</el-breadcrumb-item>
		     </el-breadcrumb> 
			<div class="box" >
				<div class="stepBox">
				<div class="step" :class="{pass:state1=='pass'}">
					<div class="num" :class="{passNum:state1=='pass'}">1</div>
					<div class="text" :class="{passText:state1=='pass'}">选择认证类型</div>
				</div>
				<div class="step" :class="{pass:state2=='pass'}">
					<div class="num" :class="{passNum:state2=='pass'}">2</div>
					<div class="text" :class="{passText:state2=='pass'}">填写认证信息</div>
				</div>
				<div class="step">
					<div class="num" :class="{passNum:state3=='pass'}">3</div>
					<div class="text" :class="{passText:state3=='pass'}">申请成功</div>
				</div>	
				</div>				
				<div class="formBox" v-if="state3!='pass'">
					<div class="title">企业基本信息</div>
					<div class="formInfo"><span>企业名称</span><el-input v-model="name"></el-input></div>
					<div class="formInfo"><span>统一社会信用代码</span><el-input v-model="code" @blur="blurCode"></el-input></div>
					<div class="formInfo" style=''>
						<span style="margin-left: 150px">事业单位证明/营业执照</span>
						<el-upload
							  action="string"
							  list-type="picture-card"
								:limit= 5
								accept=".png,.jpg"
							  :on-change="handleChange1"
							  :on-remove="handleRemove1"
								:auto-upload='false'
                              style='width: 550px;float: right;text-align: left;'
							  >
							  <i class="el-icon-plus"></i>
							  
						</el-upload>
						 <span style="display: block;margin: 135px 0px 0px 400px;font-size: 10px;width: 300px">每张小于5M，支持JPG/PNG等格式。最多上传五张，请上传清晰，最近的年审证件扫描件或图片</span>
						<el-dialog :visible.sync="dialogVisible">
						  <img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>
					</div>
					<div class="formInfo"><span>机构类型</span><el-input v-model="type"></el-input></div>
					<div class="formInfo">
						<span>企业规模</span>
						<el-select v-model="scale">
							<el-option
                                v-for="item in option"
                                :value='item.value'
							>								
							</el-option>
						</el-select>
					</div>
					<div class="formInfo">
						<span>所在区域</span>
						<el-select v-model="province" style='width: 180px;margin-right: 40px'  @change="choseProvince"> 
							<el-option
                                v-for='item in provinces'
                                :value='item.value'
							>								
							</el-option>
						</el-select>
						<el-select v-model="city" style='width: 180px'>
							<el-option
                                v-for='item in shi'
                                :value='item.value'
							>								
							</el-option>
						</el-select>
					</div>
					<div class="formInfo"><span>详细地址</span><el-input v-model="adress"></el-input></div>
					<div class="title">企业运营信息</div>
					<div class="formInfo"><span>运营者身份证姓名</span><el-input v-model="operatorName"/></div>
					<div class="formInfo"><span>运营者手机号</span><el-input v-model="operatorPhone"/></div>
					<div class="formInfo"><span>验证码</span><el-input v-model="idCode" style="width: 230px;margin-right: 20px" />
					  <el-button type='primary' style='width: 150px;' @click='getIdCode' :disabled="!canClick">{{setIdCode}}</el-button>
					</div>
					<div class="formInfo"><span>联系邮箱</span><el-input v-model="email" ></el-input></div>
					<div class="formInfo">
						<span style="margin-left: 150px">运营授权确认函</span>
						<el-upload
							  action="https://jsonplaceholder.typicode.com/posts/"
							  list-type="picture-card"
								:limit= 5
								accept=".png,.jpg"
							  :on-change="handleChange2"
							  :on-remove="handleRemove2"
								:auto-upload='false'
                              style='width: 550px;float: right;text-align: left;'
							  >
							  <i class="el-icon-plus"></i>
							  
						</el-upload>
						 <span style="display: block;margin: 135px 0px 0px 400px;font-size: 10px;width: 300px">每张小于5M，支持JPG/PNG等格式。最多上传五张，请下载<a href="#">《实训能力企业认证申请公函》</a>，并加盖企业公章（合同章，财务章无效）后扫描或拍照上传</span>
					</div>
					<div class="formInfo">
						<span style="margin-left: 150px">补充文件</span>
						<el-upload
							  action="https://jsonplaceholder.typicode.com/posts/"
							  list-type="picture-card"
								:limit= 5
								accept=".png,.jpg"
							  :on-change="handleChange3"
							  :on-remove="handleRemove3"
								:auto-upload='false'
                 style='width: 550px;float: right;text-align: left;'
							  >
							  <i class="el-icon-plus"></i>
							  
						</el-upload>
						 <span style="display: block;margin: 135px 0px 0px 400px;font-size: 10px;width: 300px">每张小于5M，支持JPG/PNG等格式。最多上传五张，上传补充证明材料有利于认证审核通过，如实训提供场所、奖状、奖杯、聘用书等</span>
					</div>
					<div style="width: 150px;margin:auto;" ><el-button type="primary" style="width: 150px;" @click="submit">提交申请</el-button></div>		
				</div>
			</div>
			<div class="box" v-if="state3=='pass'">
				<div class="icon">
					<i class="el-icon-success"></i>
					<span>申请成功</span>
					<span>提交时间：{{submitTime}}</span>
					<span>正在审核中，工作人员会在3-5个工作日进行处理，请耐心等待！</span>
				</div>

			</div>
		</div>
	</div>
</template>
<script>
	import map from '../../../static/json/map.js'
	export default{
		name:'signAuthentication',
		data(){
			return{
              dialogImageUrl: '',
              dialogVisible: false,
              name:'',
              code:'',
              type:'',
              scale:'',
							picture1:[],
							picture2:[],
							picture3:[],
              option:[
                 {
                 	item:'1',
									value:'1',
                 },{
                 	item:'2',
									value:'2',
                 },{
                 	item:'3',
									value:'3',
                 },
              ],
              provinces:[],
              province:'',
              citys:[],
              city:'',
              shi:[],
              adress:'',
              operatorName:'',
              operatorPhone:'',
              idCode:'',
              email:'',
              state1:"pass",
              state2:"pass",
              state3:"",
              submitTime:'2019-1-12 16:43:00',
							setIdCode:'获取验证码',
							loading: false,
							canClick:true,
							totalTime:60
			}
		},
		methods:{
        blurCode(e){
					console.log(e.target.value);
					if(!this.CheckSocialCreditCode(e.target.value)){
						this.$message.error("不是有效的统一社会信用编码！");
					}
				},
			  handleFiles(files){
					console.log(files)
				},
        handleRemove1(file, fileList) {
					console.log(file)
				for(var index in this.picture1){
					console.log(file)
					if(file.name == this.picture1[index].name){
						this.picture1.splice(index, 1);
						 console.log(this.picture1)
					}
				}				
       },
        handleChange1(files) {
					let temp = document.getElementsByClassName("el-upload__input")[0].files[0];
					this.picture1.push(temp);
					console.log(this.picture1)
					console.log(temp)
      },
				handleRemove2(file, fileList) {
				for(var index in this.picture2){
					if(file.name == this.picture2[index].name){
						this.picture2.splice(index, 1); 
					}
				}				
			},
				handleChange2(files) {
					let temp = document.getElementsByClassName("el-upload__input")[1].files[0];
					this.picture2.push(temp);
					console.log(this.picture2)
			},
			handleRemove3(file, fileList) {
				for(var index in this.picture3){
					if(file.name == this.picture3[index].name){
						this.picture3.splice(index, 1); 
					}
				}				
      },
        handleChange3(files) {
					let temp = document.getElementsByClassName("el-upload__input")[2].files[0];
					this.picture3.push(temp);
      },
			setTimeChange(){
					//if (!this.canClick) return
					this.canClick = false
					this.setIdCode = this.totalTime + 's后重新发送';
					let clock = window.setInterval(() => {
							this.totalTime--;
							this.setIdCode = this.totalTime + 's后重新发送';
							if (this.totalTime < 0) {
									window.clearInterval(clock);
									this.setIdCode = '重新发送验证码';
									this.totalTime = 60;
									this.canClick = true;
					}
				},1000)
			},
			CheckSocialCreditCode(Code) {
					var patrn = /^[0-9A-Z]+$/;
					//18位校验及大写校验
					if ((Code.length != 18) || (patrn.test(Code) == false)) {
						console.info("不是有效的统一社会信用编码！");
						return false;
					}
					else {
						var Ancode;//统一社会信用代码的每一个值
						var Ancodevalue;//统一社会信用代码每一个值的权重 
						var total = 0;
						var weightedfactors = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28];//加权因子 
						var str = '0123456789ABCDEFGHJKLMNPQRTUWXY';
						//不用I、O、S、V、Z 
						for (var i = 0; i < Code.length - 1; i++) {
							Ancode = Code.substring(i, i + 1);
							Ancodevalue = str.indexOf(Ancode);
							total = total + Ancodevalue * weightedfactors[i];
							//权重与加权因子相乘之和 
						}
						var logiccheckcode = 31 - total % 31;
						if (logiccheckcode == 31) {
							logiccheckcode = 0;
						}
						var Str = "0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,J,K,L,M,N,P,Q,R,T,U,W,X,Y";
						var Array_Str = Str.split(',');
						logiccheckcode = Array_Str[logiccheckcode];
				 
				 
						var checkcode = Code.substring(17, 18);
						if (logiccheckcode != checkcode) {
							console.info("不是有效的统一社会信用编码！");
							return false;
						}else{
							console.info("yes");
						}
						return true;
					}
			　},
			getIdCode(){
				 console.log(this.operatorPhone);
				 let that=this;
				 const token=localStorage.getItem('token');
				 if(this.operatorPhone == ''){
					  this.$message({
					  	message: '请填入运营者手机号',
					  	type: 'warning'
					  });
				 }else{
					  this.$axios.get(this.$baseUrl+'/auth/tempCode?token='+token+'&phone='+this.operatorPhone)
					  .then(function(res){
					  	console.log(res)
								if(res.data.code == 0){
									 that.setTimeChange();
								}	else {
									that.$message.error(res.data.msg);
								}								
					  })
					  .catch(function(err){
					  console.log(err)
					  })
				 }
							 
			},
			submit(){
				let that=this;
				const token=localStorage.getItem('token');
				if(this.name == '' || this.code == '' || this.type == '' || this.scale == '' || this.province == '' || this.city == '' || this.adress == '' 
				|| this.idCode == '' || this.operatorName == '' || this.operatorPhone == '' || this.picture1.length == 0 || this.picture2.length == 0){
					  this.$message({
							message: '请完善信息后提交',
							type: 'warning'
						});
				}else{
					 this.$axios.get(this.$baseUrl+'/auth/checkTempCode?token='+token+'&phone='+this.operatorPhone+'&code='+this.idCode)
					 .then(function(res){
					 	console.log(res)
					 		if(res.data.code == 0){
					 			 that.loading = true;
								 that.submit2();
					 		}	else {
					 			that.$message.error(res.data.msg);
					 		}								
					 })
					 .catch(function(err){
					 console.log(err)
					 })
				}														
				
			},
			submit2(){				
				let that=this;
				const token=localStorage.getItem('token');
				let formData=new FormData();
				formData.append('name',this.name);
				formData.append('code',this.code);
				formData.append('type',this.type);
				formData.append('scale',this.scale);
				formData.append('province',this.province);	
				formData.append('city',this.city);
				formData.append('address',this.adress);	
				formData.append('operatorname',this.operatorName);	
				formData.append('operatorphone',this.operatorPhone);	
				formData.append('email',this.email);
				formData.append('authtype',this.$route.query.type);
				for(let i = 0;i<this.picture1.length;i++){
				formData.append('license',this.picture1[i]);
				}
				for(let i =0;i<this.picture2.length;i++){
				formData.append('authorization',this.picture2[i]);
				}
				for(let i =0;i<this.picture3.length;i++){
				formData.append('supplement',this.picture3[i]);
				}
				if(this.$route.query.id != undefined && this.$route.query.id != '' && this.$route.query.id != null){
					formData.append('id',this.$route.query.id);
				}
				console.log(formData)
						
				this.$axios({
				url:this.$userUrl+'/company/authentication?token='+token,
				method:'POST',
				data:formData
				})
				.then(function(res){
						console.log(res);
						that.loading = false;
						if(res.data.code == 0){
							that.state3='pass';
							that.submitTime = that.changeDate();
						}else{
							that.$message.error(res.data.msg);
						}				
				})
				.catch(function(err){
				  that.loading = false;
				  that.$message.error(err.response.data.msg);
				  console.log(err)
				})
			},
      choseProvince(e){
                for (var index2 in this.provinces) {
                    if (e === this.provinces[index2].value) {
                        console.log(this.provinces[index2].value)
                        this.shi = this.provinces[index2].children;
                        this.city = this.provinces[index2].children[0].value;
                    }
                }
            }       
		},
		created:function(){
			console.log(this.$route.query.id)
			 for (var item in map[0]) {
                if (item.match(/0000$/)) {//省
                    this.provinces.push({id: item, value: map[0][item], children: []})
                } else if (item.match(/00$/)) {//市
                    this.citys.push({id: item, value: map[0][item], children: []})
                } else if(item.match(/^8101/)){//香港
									  this.citys.push({id: item, value: map[0][item], children: []})
								} else if(item.match(/^8201/)){//澳门
									  this.citys.push({id: item, value: map[0][item], children: []})
								}
            }
            // 分类市级
            for (var index in this.provinces) {
                for (var index1 in this.citys) {
                    if (this.provinces[index].id.slice(0, 2) === this.citys[index1].id.slice(0, 2)) {
                        this.provinces[index].children.push(this.citys[index1])
                    }
                }
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
	.stepBox{
		overflow: auto;
	}
	.step{
		width: 30%;
		overflow: auto;
		float: left;
		background: url('../../assets/right_nopass.png') 220px 10px no-repeat;
		background-size: 10%
		
	}
	.step:last-child{
		background: #fff
	}
	.step:first-child{
		margin-left: 100px
	}
	.step .num {
		line-height: 50px;
		width: 50px;
		background: gray;
		text-align: center;
		border-radius: 30px;
		color: #fff;
		float: left;
		font-weight: bolder;
		font-size: 16px

	}
	.step .text{
     float: left;
     line-height: 50px;
     margin-left: 20px;
     font-size:16px
	}
	.formBox .title{
		font-size: 23px;
		font-weight: bolder;
		margin: 50px 100px 20px;
	}
	.formBox .formInfo{
		margin: 20px 30px;
		text-align: center;
		font-size: 16px;
		overflow: auto;
	}
	.formBox .formInfo span:nth-child(1){
		display: inline-block;
		width: 200px;
		text-align: left;
	}
	.el-input,.el-select{
		width: 400px
	}
   .step .passNum{
     background: #1a8bfd;
   }
   .step .passText{
     color:#1a8bfd ;
   }
   .pass{
   	background: #fff;
   	background: url('../../assets/right_pass.png') 220px 10px no-repeat;
	background-size: 10%;
   }
   .icon{
   	text-align: center;
   }
   .icon .el-icon-success{
   	 color: #8bc34a;
   	 font-size: 100px;
   	 display: block;

   }
   .icon span{
   	 font-size: 26px;
     display: block;
     margin: 20px 0px;	 
   }

</style>
<style>
   
</style>