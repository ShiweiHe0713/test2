import Mock from 'mockjs2'
import { builder } from '../util'
const getDataSetList = () => {
  return builder([
    {
     id: 1,
     name: '接口数据',
     type: 'interface',
     param: {
         headers: [
             { name: 'token', value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mbyI6eyJpZCI6MSwibmFtZSI6IueOi-iAgeW4iCIsInJvbGUiOiIwIiwicGhvbmUiOiIxMzgwMDAwMDAwMCIsInNleCI6ImZlbWFsZSIsImVtYWlsIjoiNDQ3ODE4NjY2QHFxLmNvbSIsImJpcnRoZGF5IjoiMTk4OC0wOC0wOCIsInVzZXJHcm91cCI6IjQ4In0sImlhdCI6MTYwNDM5MzkxNn0.gSn0oOKYBWfIeYv9FxOGLymQRHgW_Ga64z6tjpS_YoE' }
         ],
         transferKey: 'data.data',
         url: 'http://paper.ccpsychologist.com:8360/measure/list',
         type: 'GET',
         data: [{ name: 'currentPage', value: '1' }, { name: 'pageSize', value: '50' }]
     }
    }
])
}
const getDataSetFieldMea = () => {
    return builder([
        {
            id: 1,
            name: 'id',
            alias: 'id',
            fieldType: 'measure',
            type: 'int'
        },
        {
            id: 2,
            name: 'user_id',
            alias: 'user_id',
            fieldType: 'measure',
            type: 'int'
        },
        {
            id: 3,
            name: 'status',
            alias: 'status',
            fieldType: 'measure',
            type: 'int'
        },
        {
            id: 6,
            name: 'isRandom',
            alias: '随机',
            fieldType: 'dimension',
            type: 'varchar'
        },
        {
            id: 4,
            name: 'createtime',
            alias: '创建时间',
            fieldType: 'dimension',
            type: 'datatime'
        },
        {
            id: 5,
            name: 'chartType',
            alias: '类型',
            fieldType: 'dimension',
            type: 'varchar'
        }
    ])
}
const getDataSetFieldDim = () => {
    return builder({
        data: [

        ]
    })
}
Mock.mock(/\/dataset\/list/, 'post', getDataSetList)
Mock.mock(/\/api\/dataset\/field\/list/, 'post', getDataSetFieldMea)
Mock.mock(/\/dataset\/field\/dimension/, 'post', getDataSetFieldDim)
