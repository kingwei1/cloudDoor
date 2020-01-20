<template>
<div class="feedback">
  <h4 class="title">意见反馈<el-button type="success">我的反馈</el-button>
  </h4>
  <div class="feedbackcon">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="意见类型">
        <el-select v-model="selectType" placeholder="请选择类型">
          <el-option v-for="item in allOponionTypes" :key="item.value" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
			<el-input type="textarea" :rows="6" placeholder="请填写具体内容帮助我们了解您的意见与建议……" v-model="opinionContent"></el-input>
      <el-upload :action="uploadURL" list-type="picture-card" :limit="3" :before-upload="brforeUpload" :on-success="uploadSuccess" :on-error="uploadFail" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
      <span class="prompt">最多可以上传3张图片，图片大小不能超过5M，图片格式：ipeg/jpg/png</span>
      <el-input v-model="contactType" placeholder="请留下真实联系方式（邮箱、手机号），方便我们答疑解惑"></el-input>
      <div class="address">
        <h5>相关页面地址（选填）</h5>
        <el-input type="textarea" :row="5" v-model="pageUrl" placeholder="为了方便问题的解答，请把页面的相关超链接复制到这里，谢谢~……"></el-input>
      </div>
      <el-button type="primary" round @click="submitNewOpinion">确定提交</el-button>
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
        region: '',
      },
      dialogImageUrl: '',
      dialogVisible: false,
      token: null,
      opinionContent: null,
      contactType: null,
      selectType: null,
      allOponionTypes: [],
			pageUrl: null,
			uploadURL: null,
			imgsURL: [],
			uploadingArr: [], // 用于保存上传的完成情况
    }
  },
  methods: {
		submitNewOpinion() {
			const opinionID = this.selectType; // 问题类型 ID
			const contactType = this.contactType; // 联系方式
			let content = this.opinionContent;
      if (!opinionID || !content) {
        this.$message({
          message: '意见类型或内容不能为空',
          type: 'warning'
        });
        return;
      }
			// 判断是否所有图片已上传完成
			if (this.uploadingArr && this.uploadingArr.length > 0) {
				for (let i = 0; i < this.uploadingArr.length; i++) {
					if (!this.uploadingArr[i]) {
						this.$message({
		          message: '请先等待所有图片上传完成后再提交',
		          type: 'warning'
		        });
						return;
					}
				}
			}
			if (this.imgsURL && this.imgsURL.length > 0) {
				content = `${content}imgs:`;
				content = this.imgsURL.reduce((total, item) => {
					total = `${total}${item},`;
					return total;
				}, content)// 拼接图片的 url 在 content 的后面
			}
      const loading = this.$loading({
        lock: true,
        text: '请稍后',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      const that = this;
      this.$axios({
        method: 'post',
        url: `${this.$baseUrl}/opinion/opinion?token=${this.token}`,
        data: {
          typeId: opinionID,
          content: content,
          contact: contactType,
					remarks: this.pageUrl,
        }
      }).then((response) => {
        if (response.data.code == 0) {
          this.$message({
            message: '提交成功',
            type: 'success'
          });
					this.selectType = null; // 问题类型 ID
					this.contactType = null; // 联系方式
					this.opinionContent = null;
					this.pageUrl = null;
        } else {
          this.$message({
            message: `${response.data.msg}`,
            type: 'error'
          });
        }
        loading.close();
      }).catch((error) => {
        console.log(error);
        loading.close();
      })
    },
		brforeUpload() {
			this.uploadingArr.push(false);
		},
		// 上传图片 -- 成功
		uploadSuccess(response, file, fileList) {
			if (response.code == 0) {
				this.imgsURL.push(response.data.filePath);
				// 更新一个上传状态
				for (let i = 0; this.uploadingArr && i < this.uploadingArr.length; i++) {
					if (!this.uploadingArr[i]) {
						this.uploadingArr[i] = true;
						break;
					}
				}
			} else {
				this.uploadFail();
			}

		},
		// 上传图片 -- 失败
		uploadFail(err, file, fileList) {
			// 删除一个上传未完成的状态
			for (let i = 0; this.uploadingArr && i < this.uploadingArr.length; i++) {
				if (!this.uploadingArr[i]) {
					this.uploadingArr.splice(i, 1);
					break;
				}
			}
		},
    handleRemove(file, fileList) {
			if (file && file.response && file.response.code == 0) {
				// 说明这张图片已经上传完成
				this.imgsURL.filter((item) => {
					// 过滤掉这张图片的 url
					return item != file.response.data.filePath;
				});
			} else {
				// 说明这张图片在上传过程中点击删除，即取消上传
				// 调用 uploadFail()，删除掉一个上传中的状态
				this.uploadFail();
			}
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    getAllOponionTypes() {
      const loading = this.$loading({
        lock: true,
        text: '请稍后',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      const that = this;
      this.$axios({
        method: 'get',
        url: `${this.$baseUrl}/opinion/types?token=${this.token}`,
      }).then((response) => {
        if (response.data.code == 0) {
          that.allOponionTypes = response.data.data;
        }
        loading.close();
      }).catch((error) => {
        console.log(error);
        loading.close();
      })
    }
  },
  created: function() {
    this.token = localStorage.getItem('token');
		this.uploadURL = `${this.$baseUrl}/file/upload?token=${this.token}`;
    this.getAllOponionTypes();
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.feedback {
  float: right;
  background: white;
  border: 1px solid #d5d5d5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .1);
  width: 820px;
  min-height: 305px;
  padding: 0 40px;
  box-sizing: border-box;
}

.title {
  line-height: 50px;
  border-bottom: 1px solid #d5d5d5;
}

.title .el-button {
  float: right;
  background: #1abc9c;
  width: 90px;
  height: 30px;
  margin: 12px 0;
  border-radius: 20px;
  padding: 6px;
}

.feedbackcon {
  margin-top: 30px;
}

.feedbackcon .el-input {
  width: 100%;
  margin: 20px 0px;
}

.prompt {
  font-size: 12px;
  color: #FF9800;
}

.address {
  width: 716px;
  background: #eeeeee;
  border: 1px solid #d5d5d5;
  padding: 10px;
  margin-bottom: 30px;
}

.address h5 {
  margin-bottom: 10px;
}

.el-form-item {
  margin-bottom: 20px;
}

.el-button.is-round {
  margin-bottom: 30px;
  margin-left: 636px;

}
</style>
<style>
.feedbackcon .el-upload--picture-card {
  width: 100px;
  height: 100px;
  line-height: 100px;
  margin: 20px 0;
}

.el-input__inner {
  width: 100%;
}
</style>
