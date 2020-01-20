<template>
<div class="block">
  <el-pagination v-if="paginationShow" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="listTotal">
  </el-pagination>
</div>
</template>

<script>
export default {
  name: 'papination',
  props: ['paginationShow', 'listTotal'],
  data() {
    return {
      pageSize: 10,
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('pageChangeSize', val);
    },
    handleCurrentChange(val) {
      this.$emit('page', val);
    },
    setSize(val) {
      this.pageSize = val;
    },
    text() {
      console.log(123)
      /* s */
    }
  }
}
</script>

<style scoped>
.block {
  margin-top: 20px;
  text-align: right;
}
</style>
