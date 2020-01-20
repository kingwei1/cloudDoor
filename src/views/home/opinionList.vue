<template>
<div id="main">
  <div class="backLayout">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>意见列表</el-breadcrumb-item>
    </el-breadcrumb>
    <tableList :tableData="tableData" :titles="titles" operate='true' flag='enterpriseCooperation' @open="open"></tableList>
    <pagination :listTotal="total" :paginationShow="true" @page="page" @pageChangeSize="pageChangeSize"></pagination>
    <dialogBox :dialogVisible='dialogVisible' :imgs="imgs" :flag="dialogFlag" @openBigImageDialog="openBigImageDialog" :datas="datas" @close="close" @reply="reply"></dialogBox>
    <bigImageDialog :dialogVisible="bigImageDialogShow" :current="currentImage" :imgs="imgArr" @close="closed"></bigImageDialog>
  </div>
</div>
</template>

<script>
import tableList from '../components/tableList'
import pagination from '../components/pagination'
import dialogBox from '../components/dialogBox'
import bigImageDialog from '../components/bigImageDialog'
export default {
  name: "enterpriseCooper",
  components: {
    tableList,
    pagination,
    dialogBox,
    bigImageDialog
  },
  data() {
    return {
      show: false,
      dialogFlag: '',
      id: 0,
      titles: [{
        prop: 'id',
        label: '意见ID',
        width: '80px'
      }, {
        prop: 'name',
        label: '意见类型'
      }, {
        prop: 'content',
        label: '意见内容'
      }, {
        prop: 'contact',
        label: '联系方式'
      }, {
        prop: 'created',
        label: '提交时间'
      }, {
        prop: 'status',
        label: '状态'
      }, ],
      total: 0,
      pageSize: 10, // 每页显示数据条数
      current: 1, // 当前页
      tableData: [],
      datas: null,
      dialogVisible: false,
      replyID: null, // 回复意见 ID
      imgs: [],
      bigImageDialogShow: false,
      currentImage: null,
      imgArr: [],
    }
  },
  methods: {
    closed() {
      this.bigImageDialogShow = false;
    },
    openBigImageDialog(current, imgs) {
      this.currentImage = current;
      this.imgArr = imgs;
      this.bigImageDialogShow = true;
    },
    getOpinionList(current, pageSize) {
      const token = localStorage.getItem('token');
      const that = this;
      // 获取一键列表数据
      const loading = this.$loading({
        lock: true,
        text: '加载中...',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      this.$axios.get(`${this.$baseUrl}/opinion/opinions?token=${token}&pageNum=${current}&pageSize=${pageSize}`)
        .then((response) => {
          if (response.data.code == 0) {
            that.tableData = response.data.data;
            that.tableData.map((item) => {
              item.created = that.changeDate(item.created);
              item.status = item.status ? '已回复' : '未回复';
              if (item.content.indexOf('imgs:') >= 0) {
                // 本条反馈带有图片，分离出图片
                const subIndex = item.content.indexOf('imgs:') + 5;
                const subStr = item.content.substr(subIndex);
                if (subStr) {
                  item.imgs = subStr.split(',');
                  item.imgs = item.imgs.filter((url) => {
                    return url;
                  });
                }
                item.content = item.content.substring(0, subIndex - 5);
              }
            })
            that.total = response.data.count;
          }
          loading.close();
        })
        .catch((error) => {
          console.log(JSON.stringify(error));
          loading.close();
        });
    },
    page(current) {
      // 改变页码
      this.current = current;
      this.getOpinionList(this.current, this.pageSize);
    },
    close() {
      if (this.dialogFlag == '回复') {
        for (let i = 0; this.tableData && i < this.tableData.length; i++) {
          if (this.tableData[i].id == this.replyID) {
            this.tableData[i].reply = null;
            break;
          }
        }
      }
      this.dialogVisible = false;
    },
    pageChangeSize(pageSize) {
      // 改变每页显示条数
      this.current = 1;
      this.pageSize = pageSize;
      this.getOpinionList(this.current, this.pageSize);
    },
    open(id, flag) {
      this.dialogVisible = true;
      this.dialogFlag = flag;
      this.replyID = id;
      for (let i = 0; this.tableData && i < this.tableData.length; i++) {
        if (this.tableData[i].id == this.replyID) {
          this.datas = this.tableData[i];
          if (this.tableData[i].imgs) {
            const imgs = JSON.parse(JSON.stringify(this.tableData[i].imgs));
            this.imgs = imgs.reduce((total, item) => {
              total.push(`${this.$pictrueShowUrl}/data/access/${item}`);
              return total;
            }, []);
          } else {
            this.imgs = [];
          }
          break;
        }
      }
      this.getReplyMsg();
    },

    getReplyMsg() {
      // 查看回复消息
      // 提交回复消息
      if (!this.replyID) {
        this.$message({
          message: '系统出错，请刷新后重试',
          type: 'warning'
        });
      }
      const token = localStorage.getItem('token');
      const that = this;
      const loading = this.$loading({
        lock: true,
        text: '加载中...',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      this.$axios({
        method: 'get',
        url: `${this.$baseUrl}/opinion/opinion/${this.replyID}?token=${token}`,
      }).then((response) => {
        if (response.data.code == 0) {
          that.datas.remarks = response.data.data.remarks;
          that.datas.reply = response.data.data.reply;
        } else {
          that.$message({
            message: response.data.msg,
            type: 'error'
          });
        }
        loading.close();
      }).catch((error) => {
        loading.close();
        console.log(error);
      });
    },

    reply(val) {
      // 提交回复消息
      if (!this.replyID) {
        this.$message({
          message: '系统出错，请刷新后重试',
          type: 'warning'
        });
        return;
      } else if (!val) {
        this.$message({
          message: '回复内容不能为空',
          type: 'warning'
        });
        return;
      }
      const token = localStorage.getItem('token');
      const that = this;
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      this.$axios({
        method: 'post',
        url: `${this.$baseUrl}/opinion/reply?token=${token}&id=${this.replyID}&reply=${val}`,
      }).then((response) => {
        if (response.data.code == 0) {
          that.$message({
            message: '提交成功',
            type: 'success'
          });
          for (let i = 0; that.tableData && i < that.tableData.length; i++) {
            if (that.tableData[i].id == that.replyID) {
              that.tableData[i].status = '已回复';
              break;
            }
          }
          that.dialogVisible = false;
        } else {
          that.$message({
            message: response.data.msg,
            type: 'error'
          });
        }
        loading.close();
      }).catch((error) => {
        loading.close();
        console.log(error);
      });
    },

  },
  created: function() {
    this.getOpinionList(this.current, this.pageSize);
  }
}
</script>

<style >
</style>
