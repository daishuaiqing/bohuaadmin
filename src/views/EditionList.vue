<!--suppress ALL -->
<style scoped>
.add_bt{
    display: inline-block;
    margin-bottom: 10px;
    width: 150px;
}
</style>

<template>
  <Card>
    <div>
      <!-- <Input
        search
        enter-button="查询"
        placeholder="请输入名称..."
        style="width: 350px;margin-bottom:15px;"
      /> -->
      <Button class="add_bt" type="primary" @click="add">＋ 创建房型</Button>
    </div>
    <Table :data="tableData" :columns="tableColumns" stripe></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="total" :current="current" @on-change="changePage"></Page>
      </div>
    </div>
  </Card>
</template>

<script>
import { getList, deleteById } from "@/api/edition";
export default {
  data() {
    return {
      tableColumns: [
        {
          title: "编号",
          key: "id"
        },
        {
          title: "类型ID",
          key: "typeId"
        },
        {
          title: "展示图jsonStr",
          key: "bannerUrls"
        },
        {
          title: "介绍",
          key: "introduce"
        },
        {
          title: "创建时间",
          key: "createTime"
        }
      ],
      tableData: [],
      total: 0,
      current: 1
    };
  },
  created() {
    this.changePage();
  },
  methods: {
    changePage(current) {
      getList({
        pageNum: current
      }).then(res => {
        this.tableData = res.data.data.content;
        this.total = res.data.data.totalElements;
      });
    },
    add(){
        this.$router.push({ name: "Addedition"});
    },
    edit(params) {
      console.log("编辑参数：", params);
      this.$router.push({ name: "modifyGoods", params: params.row });
    },
    remove(params) {
      this.$Modal.confirm({
        title: "删除提示",
        content: "<p>删除后将不可恢复，您确认删除吗</p>",
        okText: "确认",
        cancelText: "取消",
        onOk: () => {
          deleteById(params.row.id).then(res => {
            if (res.data) {
              this.$Message.info("删除成功");
              this.changePage(this.current);
            } else {
              this.$Message.info("删除失败");
            }
          });
        },
        onCancel: () => {
          this.$Message.info("已取消");
        }
      });
    }
  }
};
</script>