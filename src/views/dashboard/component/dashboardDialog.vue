<template>
  <a-modal :visible="visible"
           cancelText="取消"
           :okText="buttonText"
           title="编辑看板"
           @cancel="cancle"
           :width="'800px'"
           @ok="saveButton">
    <div class="flex-column">
      <a-form :label-col="{ span: 6 }"
              :wrapper-col="{ span: 12 }">
        <a-form-item label="报表名称">
          <a-input v-model='curDashboard.name' />
        </a-form-item>
        <a-form-item label="共享">
          <a-radio-group v-model='curDashboard.share'>
            <a-radio :value="1">
              私有
            </a-radio>
            <a-radio :value="0">
              共享
            </a-radio>

          </a-radio-group>
        </a-form-item>
        <a-form-item label="背景类型">
          <a-radio-group v-model='curDashboard.config.type'>
            <a-radio value="1">
              颜色
            </a-radio>
            <a-radio value="2">
              图片
            </a-radio>

          </a-radio-group>
        </a-form-item>
        <a-form-item label="背景颜色"
                     v-if='curDashboard.config.type=="1"'>
          <color-group v-model="curDashboard.config.background" />
        </a-form-item>
        <a-form-item label="背景图片"
                     v-if='curDashboard.config.type=="2"'>
          <a-upload name="avatar"
                    list-type="picture-card"
                    class="avatar-uploader"
                    :show-upload-list="false"
                    @change="handleChange"
                    :customRequest="upLoadFile"
                    :before-upload="beforeUpload">
            <img v-if="imageUrl"
                 :src="imageUrl"
                 alt="avatar"
                 style="width: 100%;height: 100%;" />
            <div v-else>
              <div class="ant-upload-text">
                Upload
              </div>
            </div>
          </a-upload>
        </a-form-item>
        <a-form-item label="报表类型">
          <a-radio-group v-model='curDashboard.type'>
            <a-radio value="1">
              PC
            </a-radio>
            <a-radio value="2">
              大屏
            </a-radio>
            <a-radio value="3">
              移动
            </a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="描述">
          <a-textarea v-model="curDashboard.description"
                      :auto-size="{ minRows:3, }" />
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
</template>
<script>
import colorGroup from '@/views/chart/common/colorGroup'
import { save, update, addConfig, uploadImage } from '@/api/dashboard'
import { _merge } from '@/utils/util'
export default {
  props: {
    visible: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    dashboard: {
      type: Object,
      default: () => {
        return {}
      }
    },
  },
  components: {
    colorGroup
  },
  watch: {

  },
  data () {
    return {
      confirmLoading: false,
      fieldName: '',
      buttonText: this.dashboard.uuid ? '更新' : '保存',
      imageUrl: '',
      curDashboard: {
        name: 'test',
        config: {
          type: '2',
          background: '#ffffff',
          opacity: 1,
        },
        share: 1,
        type: 1,
        description: '',
      }
    }
  },
  created () {
    let imgHref = 'http://' + location.hostname + ':7001'
    this.curDashboard = JSON.parse(JSON.stringify(this.dashboard))
    if (this.curDashboard.config && this.curDashboard.config.type == "2") {
      this.imageUrl = imgHref + this.curDashboard.config.background
    }
  },
  computed: {

  },
  mounted () {

  },

  methods: {
    upLoadFile (data) {

      let formData = new FormData()
      formData.append('file', data.file)
      uploadImage(formData, { 'Content-Type': 'multipart/form-data' }).then(res => {
        this.curDashboard.config.background = res.data
      })
    },
    async saveButton () {
      let res = {}
      if (!this.dashboard.uuid) {
        res = await save({ ...this.curDashboard, config: JSON.stringify(this.curDashboard.config) })
        dashboard.uuid = res.uuid
      } else {
        res = await update({ ...this.curDashboard, config: JSON.stringify(this.curDashboard.config) })
      }
      _merge(this.dashboard, this.curDashboard)
      if (this.$listeners['finishSave']) {
        this.$listeners['finishSave'](this.curDashboard)
      }
      this.$emit("update:visible", false)
    },
    cancle () {
      this.$emit("update:visible", false)
    },
    handleChange (info) {
      if (info.file.status === 'uploading') {
        this.loading = true;
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.

      }
    },
    beforeUpload (file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.$message.error('You can only upload JPG file!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      /**
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!');
      } */
      this.getBase64(file, imageUrl => {
        this.imageUrl = imageUrl;
        this.loading = false;
      });
      //this.curDashboard.config.background = file
      return isJpgOrPng && isLt2M;
    },
    getBase64 (img, callback) {
      const reader = new FileReader();
      reader.addEventListener('load', () => callback(reader.result));
      reader.readAsDataURL(img);
    }
  }
}
</script>
<style lang="less" scoped>
</style>
