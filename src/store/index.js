import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";

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

      },
      plugins: [
        new VuexPersistence({
          store: window.localStorage
        }).plugin
      ]

})


export default store