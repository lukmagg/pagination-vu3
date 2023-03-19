import { createStore } from "vuex";

const store = createStore({
    state () {
        return {
          isLogged: false,
        }
      },
      mutations: {
        setIsLogged (state, value) {
          state.isLogged = value
        },

      }

})


export default store