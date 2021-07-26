const fieldColumn = [
 {
  title: '字段名称',
  key: 'name',
  align: 'left',
  dataIndex: 'name'
 },
 {
  title: '表字段',
  key: 'col',
  align: 'left',
  dataIndex: 'col'
 },
 {
  title: '别名',
  key: 'alias',
  align: 'left',
  dataIndex: 'alias'
 },
 {
  title: '指标/维度',
  key: 'fieldType',
  align: 'left',
  dataIndex: 'fieldType'
 },
 {
  title: '字段类型',
  key: 'type',
  align: 'left',
  scopedSlots: { customRender: 'fieldType' }
 },
 {
  title: '大小',
  key: 'size',
  align: 'left',
  scopedSlots: { customRender: 'size' }
 },
 {
  title: '为空',
  key: 'isNull',
  align: 'left',
  dataIndex: 'isNull'
 }
]
const fieldRequestColumn = [
 {
  title: '字段名称',
  key: 'name',
  align: 'left',
  dataIndex: 'name'
 },
 {
  title: '别名',
  key: 'alias',
  align: 'left',
  dataIndex: 'alias'
 },
 {
  title: '指标/维度',
  key: 'fieldType',
  align: 'left',
  scopedSlots: { customRender: 'fieldType' }
 },
 {
  title: '字段类型',
  key: 'type',
  align: 'left',
  scopedSlots: { customRender: 'type' }
 },
]
const excelType = {
 's': 'varchar',
 'n': 'int',
 'b': 'boolean',
 'd': 'datetime'
}
const fieldType = [
 {
  label: '字符',
  value: 'varchar'
 },
 {
  label: '数字',
  value: 'int'
 },
 {
  label: '日期',
  value: 'datetime'
 },
 {
  label: '布尔',
  value: 'boolean'
 }
]
const fieldChartType = [
 {
  label: '指标',
  value: 'measure'
 },
 {
  label: '维度',
  value: 'dimension'
 },
]
const letter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
// ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ]
export {
 fieldColumn,
 excelType,
 fieldType,
 letter,
 fieldRequestColumn,
 fieldChartType
}
