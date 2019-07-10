export default {
  state: {
    access_token: "",
    user_id: "",
    gender: "",
    logged_in: false
  },
  actions: {},
  mutations: {
    setCurrentUser(state, user_info) {
      state.access_token = user_info.access_token;
      state.user_id = user_info.user_id;
      state.gender = user_info.gender;
      state.logged_in = user_info.logged_in;
    },
    logout(state) {
      state.access_token = '';
      state.user_id = '';
      state.gender = '';
      state.logged_in = false;
    }
  },
  getters: {}
}
