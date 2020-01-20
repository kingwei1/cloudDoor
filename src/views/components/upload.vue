<template id="upload">
<div id="main">
  <el-upload v-if="flag=='nobtn'" action="string" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :file-list="fileListView" :on-change="handChange" :auto-upload="false" :http-request="upload">
    <i class="el-icon-plus"></i>

  </el-upload>
  <span v-if="flag=='nobtn'" style="display: block;color:#999;font-size: 10px;width: 300px">每张小于5M，支持JPG/PNG等格式。最多上传五张</span>
  <el-upload v-if="flag=='btn'" class="upload-demo" action="string" :on-preview="handlePreview" :on-remove="handleRemove" multiple :limit="3" accept=".png,.jpg" :on-change="handChange" :on-exceed="handleExceed" :file-list="fileListView" :auto-upload="false">
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip" style="margin-left: 80px">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload>
  <el-upload v-if="flag=='rotationChart'" class="upload-demo" action="string" :on-preview="handlePreview" :on-remove="handleRemove" :multiple="false" :limit="1" accept=".png,.jpg" :on-change="handChange" :on-exceed="handleExceed1" :file-list="fileListView"
    :auto-upload="false">
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip" style="margin-left: 80px">只能上传jpg/png文件，且不超过5M</div>
  </el-upload>
  <el-upload v-if="flag=='nobtnOnly'" action="string" :limit="1" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :file-list="fileListView" :on-change="handChange" :on-exceed="handleExceed1" :auto-upload="false"
    :http-request="upload">
    <i class="el-icon-plus"></i>

  </el-upload>
  <span v-if="flag=='nobtnOnly'" style="display: block;color:#999;font-size: 10px;width: 400px">只能上传一张jpg/png文件，且不超过5M，尺寸建议460*260</span>
  <el-dialog :visible.sync="dialogVisible">
    <img width="100%" :src="dialogImageUrl" alt="">
  </el-dialog>
</div>
</template>
<script>
export default {
  name: 'upload',
  props: ['flag', 'oldImg'],
  data() {
    return {
      fileListView: [],
      dialogVisible: false,
      dialogImageUrl: '',
      file1: '',
    }
  },
  methods: {
    upload(token) {
      let that = this;
      let formData = new FormData();
      formData.append('file', this.file1)
      formData.append('token', token)
      return new Promise(function(resolve, reject) {
        that.$axios({
            url: that.$baseUrl + '/file/upload',
            method: 'post',
            data: formData
          })
          .then(function(res) {
            console.log(res)
            let imgUrl = '';
            let fileId = '';
            imgUrl = res.data.data.filePath;
            fileId = res.data.data.fileId
            resolve({
              value: imgUrl,
              value2: fileId
            });
          })
          .catch(function(err) {
            console.log(err)
          })

      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      for (var i = 0; i < this.fileListView.length; i++) {
        if (this.fileListView[i].name == file.name) {
          this.fileListView.splice(i, 1);
          break;
        }
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;

    },
    handChange(file, fileList) {
      this.file1 = document.getElementsByClassName("el-upload__input")[0].files[0];
      console.log(this.file1)
      this.fileListView.push({
        name: file.name,
        url: file.url
      })
      console.log(this.file1.size)
      console.log(this.fileListView)
      if (this.file1.size > 5242880) {
        this.$message.warning(`当前选择的图片大于5M`);
        this.file1 = '';
        this.fileListView.splice(this.fileListView.lenth - 1, 1)
      } else {
        this.$emit('changeImg');
      }
      console.log(this.file1.size)
      console.log(this.fileListView)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    handleExceed1(files, fileList) {
      this.$message.warning(`当前限制选择 1个文件`);
    },
    handlePreview(file) {
      console.log(file);
    },
    getOldImg(oldImg) {
      this.fileListView = oldImg
    },
  },
  created: function() {

  }
}
</script>
<style scoped>

</style>
<style >
.el-upload-list__item-name {
  margin-right: 0px !important
}
</style>
