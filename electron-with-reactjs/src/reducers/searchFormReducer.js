let initialState = {
  params: {},
  isReload: false
};

const searchFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SEND_PARAMS_FORM":
      return { ...state, params: action.params };
    case "RELOAD_PAGING":
      return { ...state,isReload: action.isReload };
    default:
      return state;
  }
};

export default searchFormReducer;
