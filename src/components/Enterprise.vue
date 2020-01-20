<template>
	<div class="cooperation" >
		<h4 class="title">企业合作</h4>
		<p>请填写企业的真实信息，便于联系到贵公司，谢谢合作</p>
		<div class="formbox">
			<el-form ref="form" :model="form" label-width="100px" label-position="left">
		  <el-form-item label="企业名称">
		    <el-input v-model="form.name" placeholder="请输入公司的全称"></el-input>
		    <sub>
		    	({{form.name.length}}/50)
		    </sub>
		  </el-form-item>
		   <el-form-item label="企业负责人">
		    <el-input v-model="form.director" placeholder="请输入真实姓名"></el-input>
		    <sub>
		    	({{form.director.length}}/20)
		    </sub>
		  </el-form-item>
		   <el-form-item label="联系方式">
		    <el-input v-model="form.phone" placeholder="请输入11位有效手机号码"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" round>确定提交</el-button>
		  </el-form-item>
		</el-form>
		</div>
	</div>
			

</template>

<script>
	 export default {
    data() {
      return {
        form: {
          name: '',
          director: '',
          phone:'',
        },
      }
    },
    methods: {
      onSubmit() {
      	if (this.form.name=="") {
      		alert("请输入企业名称");
      	} else if(this.form.director==""){
      		alert("请输入企业负责人");
      	}else if(!(/^1(3|4|5|7|8)\d{9}$/.test(this.form.phone))){
      		alert("请输入正确的联系方式");
      	}else{
      	const token=localStorage.getItem('token');
      	let that=this;
      	var form=new FormData();
      	form.append('name',this.form.name);
      	form.append('director',this.form.director);
      	form.append('phone',this.form.phone);
//    	console.log( token);
      	that.$axios({
      		url:this.$baseUrl+"/partner/enterprisePartner?token="+token,
//				http://api.succy.cn/v1/portal/partner/enterprisePartners?token
      		method:'post',
      		data:form, 
      		
      	})
      	.then((res)=>{
      		console.log(res);
      		alert("添加成功")
//			console.log(res.data.code);
//    		console.log(res.data.msg);
      	})
      	}
    }
  }
   }
</script>

<style scoped>
	*{
		margin: 0;
		padding: 0;
	}
	.cooperation{
		background: white;
		border: 1px solid #d5d5d5;
		box-shadow: 0 2px 4px rgba(0,0,0,.1);
		width: 820px;
		min-height: 305px;
		padding: 0 40px;
		box-sizing: border-box;
	}
	.title{
		line-height: 50px;
		border-bottom: 1px solid #d5d5d5;
	}
	.sidebar-right p{
		margin-top: 50px;
		text-align: center;
		font-size: 14px;
	}
	.formbox{
		width: 400px;
		margin-top: 50px;
		margin-left: 150px;
	}
	 .cooperation .el-input{
		width: 250px;
	}
	sub{
		margin-left: 5px;
	}
	.cooperation .el-form-item{
		margin-bottom: 22px;
	}
</style>
