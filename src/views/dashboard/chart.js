const label = {
    show: false,
    position: 'top',
    distance: 5,
    rotate: 0,
    color: '#fff',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: 'sans-serif',
    fontSize: 12,
    align: '',
    verticalAlign: ''
}
const itemStyle = {
    color: '',
    borderColor: '#000',
    borderWidth: 0,
    borderType: 'solid',
    shadowBlur: 0,
    shadowColor: '',
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    opacity: 1
}
const lineStyle = {
    color: '#000',
    width: 2,
    type: 'solid',
    shadowBlur: 0,
    shadowColor: '',
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    opacity: 1
}
const areaStyle = {
    color: '#000',
    origin: 'auto',
    shadowBlur: 0,
    shadowColor: '',
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    opacity: 1
}
 const title = {
    show: true,
    name: '',
    remarks: ''
}
 const legend = {
    show: true,
    type: 'plain',
    top: 'auto',
    bottom: 'auto',
    left: 'auto',
    right: 'auto',
    textStyle: {
        color: '#333',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontFamily: 'sans-serif',
        fontSize: 12
    }
}
 const grid = {
    top: '50',
    bottom: '50',
    left: '10%',
    right: '10%'
}
 const axis = {
    show: true,
    position: 'left',
    type: 'category',
    name: '',
    nameLocation: 'end',
    nameGap: 15,
    nameRotate: 0,
    inverse: false,
    boundaryGap: false,
    nameTextStyle: {
        color: '#333',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontFamily: 'sans-serif',
        fontSize: 12
    },
    axisLine: {
        show: true,
        lineStyle: {
            color: '#333',
            width: 1,
            type: 'solid',
            shadowBlur: 0,
            shadowColor: '#333',
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            opacity: 1
        }
    },
    axisTick: {
        show: true,
        length: 5,
        inside: false,
        lineStyle: {
            color: '#333',
            width: 1,
            type: 'solid',
            shadowBlur: 0,
            shadowColor: '#333',
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            opacity: 1
        }
    },
    axisLabel: {
        show: true,
        interval: 'auto',
        inside: false,
        rotate: 0,
        margin: 8,
        color: '',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontFamily: 'sans-serif',
        fontSize: 12
    },
    splitLine: {
        show: true,
        lineStyle: {
            color: ['#333'],
            width: 1,
            type: 'solid',
            shadowBlur: 0,
            shadowColor: '#333',
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            opacity: 1
        }
    },
    splitArea: {
        show: false,
        areaStyle: {
            color: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)'],
            shadowBlur: 0,
            shadowColor: '',
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            opacity: 1
        }
    }
}
 const line = {
    type: 'line',
    symbol: 'emptyCircle',
    symbolSize: 4,
    symbolRotate: 0,
    symbolKeepAspect: false,
    symbolOffset: [0, 0],
    showSymbol: true,
    showAllSymbol: 'auto',
    hoverAnimation: true,
    legendHoverLink: true,
    stack: false,
    clip: true,
    step: false,
    smooth: false,
    label: { ...label },
    itemStyle: { ...itemStyle },
    lineStyle: { ...lineStyle },
    areaStyle: { ...areaStyle }
}
export {
    title,
    grid,
    legend,
    axis,
    line
}
