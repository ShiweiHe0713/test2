<!--
 * @Description: 字段列表
 * @Author: lixianying
 * @Date: 2020-05-07
 -->
<template>
  <div class="column-group-moudle">
    <div>
      <span class="select-header">维度/指标列表：</span>
    </div>
    <ul class="tag-list-ul">
      <draggable :value="fieldList"
                 v-bind="dragOption">
        <li v-for="item in fieldList"
            :key="item.name+'_tag'"
            :class="['tag-list-li',item.fieldType]">
          <span>{{item["name"]}}</span>
        </li>
      </draggable>
    </ul>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import { measureIcon, dimensionIcon } from '@/core/icons'
export default {
  props: {
    fieldList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  components: {
    Draggable

  },
  created () {
  },
  data () {
    return {
      dimensionIcon,
      measureIcon,
      // 拖拽来源
      dragOption: {
        group: {
          name: 'modelDrag',
          pull: 'clone',
          put: false
        }
      }
    }
  },
  computed: {}

}
</script>

<style lang="less">
.column-group-moudle {
  .list {
    margin: 0;
    padding: 0;
    list-style: none;

    .list-item {
      padding-left: 2px;
      height: 32px;
      line-height: 32px;
      color: #404040;
      border-radius: 2px;

      &:hover {
        cursor: pointer;
        background-color: #e5e5e5;
      }
    }
  }
}
</style>
