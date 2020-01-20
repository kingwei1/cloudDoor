<template>
	<div id="main">	
		<div class="backLayout">
		    <breadcrumb :menu="menu"></breadcrumb>	
			<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="原密码" prop="originalPassword">
			  <el-input v-model="ruleForm2.originalPassword"></el-input>
			  </el-form-item>
			  <el-form-item label="新密码" prop="pass">
				<el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
			  </el-form-item>
			  <el-form-item label="确认新密码" prop="checkPass">
				<el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
			  </el-form-item>			  
			  <el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
				<el-button @click="resetForm('ruleForm2')">清空</el-button>
			  </el-form-item>
			</el-form>
		</div>	
	</div>
	
</template>
<script>
  import breadcrumb from '../components/breadcrumb1'
	export default{
		name:'changePassword',
		components:{
			breadcrumb
		},
		data(){
			var checkoriginalPassword = (rule, value, callback) => {
				console.log(value.length);
        if (!value) {
          callback(new Error('原密码不能为空'));
        } else if(value.length < 6 || value.length > 20){
				  callback(new Error('密码长度为6-20个字符'));
				} else{
					callback();
				}
        /* setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000); */
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }else if(value.length < 6 || value.length > 20){
					callback(new Error('密码长度为6-20个字符'));
				} else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
		  menu:[{
		  title:'修改密码',
		  }],
          ruleForm2: {
          pass: '',
          checkPass: '',
          originalPassword: ''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          originalPassword: [
            { validator: checkoriginalPassword, trigger: 'blur' }
          ]
        }
      };
		},
		methods:{			
			submitForm(formName) {
			this.$refs[formName].validate((valid) => {
			  if (valid) {
					let that=this;
					const token=localStorage.getItem('token');
					let data = {
						oldPwd:this.ruleForm2.originalPassword,
						newPwd:this.ruleForm2.pass
					}
					console.log(data)
					this.$axios.post(this.$baseUrl+'/auth/modifyPwd?token='+token+'&oldPwd='+this.ruleForm2.originalPassword+'&newPwd='+this.ruleForm2.pass)
					.then(function(res){
					   console.log(res)
						 if(res.data.code == 0){
						 	that.$message({
						 		message: '修改成功',
						 		type: 'success'
						 	});
							that.resetForm('ruleForm2')
						 } else{
						 	that.$message.error(res.data.msg);
						 }
					})
					.catch(function(err){
					console.log(err)
					})
			  } else {
				 return false;
			  }
			});
		  },
		  resetForm(formName) {
			this.$refs[formName].resetFields();
		  }
		 },		
		created:function(){            			
			
		}
	}
</script>
<style scoped>
.el-input{
	width: 300px;
}
.el-textarea{
	width: 300px; 
}
.tips{
	margin-left: 10px;
}
.el-date-editor.el-input{
	width: 300px;
}
</style>
<style>
	
</style>