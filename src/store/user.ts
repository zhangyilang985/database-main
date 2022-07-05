let initial = null;
initial = "2333";
const user = {
  namespaced: true,
  state: {
    logInfo: initial
  },
  getters: {
    isloggedIn(state: any) {
      return state.logInfo;
    },
    role: (state: any) => "assistant"
    //(state: any) => state.logInfo?.role
  }
};

export default user;