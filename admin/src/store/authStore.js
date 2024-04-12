import { createStore } from "vuex";
import { JWT_TOKEN } from "../api/auth/const";
import { apiAxios } from "../plugins/axios";

export const authStore = createStore({
  state: {
    loggedIn: !!localStorage.getItem(JWT_TOKEN),
  },
  actions: {
    login: async (context, payload) => {
      const response = await apiAxios.post('auth/login', payload)
      const { token } = response.data

      localStorage.setItem(JWT_TOKEN, token)
      context.state.loggedIn = true
    },

    logout: async (context, payload) => {

    },

    clearAuthData: (context) => {
      localStorage.removeItem(JWT_TOKEN)
      context.state.loggedIn = false
    }
  }
})
