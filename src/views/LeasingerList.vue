<!--suppress ALL -->
<template>
  <Card>
    <!-- <div>
      <Input
        search
        enter-button="查询"
        placeholder="请输入名称..."
        style="width: 350px;margin-bottom:15px;"
      />
    </div> -->
    <Table :data="tableData" :columns="tableColumns" stripe></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="total" :current="current" @on-change="changePage"></Page>
      </div>
    </div>
  </Card>
</template>

<script>
import fetch from "@/util/fetch";
export default {
  data() {
    return {
      tableColumns: [
        {
          title: "编号",
          key: "id"
        },
        {
          title: "租赁类别",
          key: "type"
        },
        {
          title: "姓名",
          key: "name"
        },
        {
          title: "公司",
          key: "company"
        },
        {
          title: "电子邮箱",
          key: "email"
        },
        {
          title: "手机",
          key: "tel"
        },
        {
          title: "面积",
          key: "sqr"
        },
        {
          title: "详情描述",
          key: "detail"
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
      fetch.get('/leasinger/list',{
        pageNum: current
      }).then(res => {
        this.tableData = res.data.content;
        this.total = res.data.totalElements;
      });
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