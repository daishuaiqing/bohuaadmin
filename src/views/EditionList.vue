<!--suppress ALL -->
<style scoped>
.add_bt {
  display: inline-block;
  margin-bottom: 10px;
  width: 150px;
}
.banner {
  width: 50px;
  height: 50px;
  margin: 5px;
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
      />-->
      <Button class="add_bt" type="primary" @click="add">＋ 创建房型</Button>
    </div>
    <Table :data="tableData" :columns="tableColumns" stripe>
      <template slot-scope="{ row }" slot="typeId">{{ showTypeName(row) }}</template>
      <template slot-scope="{ row }" slot="bannerUrls">
        <img class="banner" :src="item.url" v-for="(item,index) in row.bannerUrls" :key="index" alt />
      </template>
    </Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="total" :current="current" @on-change="changePage"></Page>
      </div>
    </div>
  </Card>
</template>

<script>
import fetch from "@/util/fetch";
import { parse } from 'path';
export default {
  data() {
    return {
      tableColumns: [
        {
          title: "编号",
          key: "id"
        },
        {
          title: "类型",
          key: "typeId",
          slot: "typeId"
        },
        {
          title: "介绍",
          key: "introduce"
        },
        {
          title: "展示图",
          key: "bannerUrls",
          slot: "bannerUrls",
          width: 500
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
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
  computed: {
    showTypeName() {
      return function(row) {
        switch (row.typeId) {
          case 1:
            return "底层";
          case 2:
            return "中层";
          case 3:
            return "中高层";
          case 4:
            return "高层";
        }
      };
    }
  },
  methods: {
    changePage(current) {
      fetch
        .get("/edition/list", {
          pageNum: current
        })
        .then(res => {
          for (let i = 0; i < res.data.content.length; i++) {
            res.data.content[i].bannerUrls = JSON.parse(
              res.data.content[i].bannerUrls
            );
          }
          this.tableData = res.data.content;
          console.log(this.tableData);
          this.total = res.data.totalElements;
        });
    },
    add() {
      this.$router.push({ name: "Addedition" });
    },
    edit(params) {
      console.log("编辑参数：", params);
      this.$router.push({ name: "modifyGoods", params: params.row });
    },
    remove(params) {
      console.log(params)
      this.$Modal.confirm({
        title: "删除提示",
        content: "<p>删除后将不可恢复，您确认删除吗</p>",
        okText: "确认",
        cancelText: "取消",
        onOk: () => {
          fetch.get('/edition/delete/'+params.row.id,params.row.id).then(res => {
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