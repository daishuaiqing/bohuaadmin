<!--suppress ALL -->
<style>
.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
<template>
  <Card class="card">
    <p slot="title">房型添加</p>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
      <FormItem label="类型" prop="typeId">
        <!-- <InputNumber placeholder="请选择类型ID" v-model="formValidate.typeId" tyle="width: 200px" /> -->
        <Select v-model="formValidate.typeId" style="width:200px">
          <Option :value='1'>底层</Option>
          <Option :value='2'>中层</Option>
          <Option :value='3'>中高层</Option>
          <Option :value='4'>高层</Option>
        </Select>
      </FormItem>
      <FormItem label="展示图" prop="bannerUrls">
        <div class="demo-upload-list" v-for="(item,index) in uploadList" :key="index">
          <template v-if="item.status === 'finished'">
            <img :src="item.url" />
            <div class="demo-upload-list-cover">
              <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
              <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
            </div>
          </template>
          <template v-else>
            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
          </template>
        </div>
        <Upload
          ref="upload"
          name="image"
          :show-upload-list="false"
          :on-success="handleSuccess"
          :format="['jpg','jpeg','png']"
          :max-size="2048"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize"
          :before-upload="handleBeforeUpload"
          multiple
          type="drag"
          action="/upload/image"
          style="display: inline-block;width:58px;"
        >
          <div style="width: 58px;height:58px;line-height: 58px;">
            <Icon type="ios-camera" size="20"></Icon>
          </div>
        </Upload>
        <Modal title="View Image" v-model="visible">
          <img
            :src="imgName"
            v-if="visible"
            style="width: 100%"
          />
        </Modal>
      </FormItem>
      <FormItem label="介绍" prop="introduce">
        <Input
          type="textarea"
          placeholder="请输入房型介绍"
          v-model="formValidate.introduce"
          :autosize="{minRows: 2,maxRows: 8}"
          style="width: 400px"
        />
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
        <Button @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
      </FormItem>
    </Form>
  </Card>
</template>
<script>
import fetch from '@/util/fetch'
export default {
  data() {
    return {
      defaultList: [],
      imgName: "",
      visible: false,
      uploadList: [],
      formValidate: {
        typeId: null,
        bannerUrls: "",
        introduce: ""
      },
      ruleValidate: {
        typeId: [{ required: true, type: "number", message: "请输入类型ID", trigger: "blur" }],
        introduce: [{ required: true, message: "请输入介绍", trigger: "blur" }]
      }
    };
  },
  mounted() {
    // /this.uploadList = this.$refs.upload.fileList;
  },
  methods: {
    handleView(name) {
      this.imgName = name;
      this.visible = true;
    },
    handleRemove(file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleSuccess(res, file) {
      console.log(res,file)
      file.url = res.url
      this.uploadList.push(file)
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "The file format is incorrect",
        desc:
          "File format of " +
          file.name +
          " is incorrect, please select jpg or png."
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "Exceeding file size limit",
        desc: "File  " + file.name + " is too large, no more than 2M."
      });
    },
    handleBeforeUpload() {
      const check = this.uploadList.length < 5;
      if (!check) {
        this.$Notice.warning({
          title: "Up to five pictures can be uploaded."
        });
      }
      return check;
    },
    /**
     * 提交表单数据
     */
    handleSubmit(name) {
      //console.log(this.formValidate)
      //console.log(JSON.stringify(this.uploadList))
      this.$refs[name].validate(valid => {
        if (valid) {
          this.formValidate.bannerUrls = JSON.stringify(this.uploadList)
          fetch.post('/edition/add',this.formValidate).then(res => {
            if (res) {
              this.$Message.success("成功!");
              this.$router.push({ name: "edition" });
            }
          });
        } else {
          this.$Message.error("失败!");
        }
      });
    },
    //取消
    handleReset(name) {
      this.$router.push({ name: "edition" });
    }
  }
};
</script>