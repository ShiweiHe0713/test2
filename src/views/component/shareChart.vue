<template>
  <a-modal :visible="visible"
           cancelText="取消"
           :okText="buttonText"
           title="图表"
           @cancel="cancle"
           :width="'800px'"
           @ok="saveButton">
    <div class="flex-column">
      <a-form :label-col="{ span: 6 }"
              :wrapper-col="{ span: 12 }">
        <a-form-item label="图表名称">
          <a-input v-model='curChart.name' />
        </a-form-item>
        <a-form-item label="图表分类">
          <a-select v-model="curChart.classType">
            <a-select-option :value="item.value"
                             v-for="(item,index) in classTypeList"
                             :key="index+'_class'">
              <span>{{item.label}}</span>
            </a-select-option>
          </a-select>

        </a-form-item>
        <a-form-item label="图表图片">
          <a-upload name="avatar"
                    list-type="picture-card"
                    class="avatar-uploader"
                    :show-upload-list="false"
                    :before-upload="beforeUpload">
            <img v-if="imageUrl"
                 :src="imageUrl"
                 alt="avatar"
                 style="width: 100%;height: 100%;" />
            <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">
                Upload
              </div>
            </div>
          </a-upload>
        </a-form-item>

      </a-form>
    </div>
  </a-modal>
</template>
<script>
import colorGroup from '@/views/chart/common/colorGroup'
import { classTypeList, chartTypeList } from '@/views/chart/js/operator'
import { save, update, addConfig } from '@/api/dashboard'
import { _merge } from '@/utils/util'
export default {
  props: {
    visible: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    chart: {
      type: Object,
      default: () => {
        return {}
      }
    },
  },
  components: {

  },
  watch: {

  },
  data () {
    return {
      classTypeList,
      chartTypeList,
      buttonText: '保存',
      imageUrl: '',
      loading: false,
      curChart: {
        name: '',
        classType: '20',
        chartImage: '',
      }
    }
  },
  created () {

  },
  computed: {

  },
  mounted () {

  },

  methods: {
    async saveButton () {
      if (this.$listeners['finishSave']) {
        this.$listeners['finishSave'](this.curChart)
      }
      this.$emit("update:visible", false)
    },
    cancle () {
      this.$emit("update:visible", false)
    },
    handleChange (info) {
      this.loading = true;

      /**
       if (info.file.status === 'uploading') {
         this.loading = true;
         return;
       }
       if (info.file.status === 'done') {
         // Get this url from response in real world.
 
       }
        */
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
        this.loading = true;
      });
      this.curChart.chartImage = file
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
