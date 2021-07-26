const chart = {
    state: {
      id: '',
      option: {}
    },
    mutations: {
      SET_CHART_ID: (state, id) => {
        state.id = id
      },
      SET_CHART_OPTION: (state, option) => {
        // const data = Object.assign({}, option)
        state.option = option
      }
    },
    actions: {

    }
  }

  export default chart
