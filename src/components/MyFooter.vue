<template>
<div class="MyFooter">
  <footer>
    <!-- <div class="contact">
                <a><img src="../assets/qq.png"/></a><a><img src="../assets/wechat.png"/></a>
            </div> -->
    <div class="nav">
      <router-link to="/cloudHome">网站首页</router-link>
      <router-link to="/Enterprise">企业合作</router-link>
      <router-link to="/aboutUs">关于我们</router-link>
      <router-link to="/feedback">意见反馈</router-link>
      <!--<router-link to="/Helpcenter">帮助中心</router-link>>-->
      <router-link to="/contact">联系我们</router-link>
      <router-link to="/friendlyLink">友情链接</router-link>
    </div>
    <div>copyright © 2019 benyuntech.com | BY云计算服务平台</div>
    <div style="text-align: left;">
      <dialogBox :flag="'意见反馈'" :datas="allOponionTypes" :dialogVisible="dialogVisible" @submitNewOpinion="submitNewOpinion" @close="close"></dialogBox>
    </div>
  </footer>
</div>
</template>

<script>
import dialogBox from '../views/components/dialogBox'
export default {
  name: "MyFooter",
  components: {
    dialogBox
  },
  data() {
    return {
      dialogVisible: false,
      allOponionTypes: [],
      token: null,
    }
  },
  methods: {
    openDialog() {
      if (!this.token) {
        this.$message({
          message: '请先登录',
          type: 'warning'
        });
        return;
      }
      this.dialogVisible = true;
      this.getAllOponionTypes();
    },
    submitNewOpinion(opinionID, contactType, content) {
      if (!opinionID || !content) {
        this.$message({
          message: '意见类型或内容不能为空',
          type: 'warning'
        });
        return;
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
          contact: contactType
        }
      }).then((response) => {
        if (response.data.code == 0) {
          this.$message({
            message: '提交成功',
            type: 'success'
          });
          this.dialogVisible = true;
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
    close() {
      this.dialogVisible = false;
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
  }
}
</script>

<style scoped>
footer {
  font-size: 12px;
  padding: 0 15px 28px 15px;
  /*padding-top: 0px;*/
  background-color: #fff;
  text-align: center;
  border-top: 1px solid #DEE1DB;
}

footer a {
  color: black;
  display: inline-block;
  padding: 18px 6px;
}

footer a:hover {
  font-weight: 900;
}

footer .contact a {
  padding: 0 6px;
}
</style>
