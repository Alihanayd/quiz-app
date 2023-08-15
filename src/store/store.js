import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        questions: {},
    },
    mutations: {
        setQuestions(state, questions) {
            state.questions = questions;
        }
    },
    actions: {
        setQuestions({ commit }, questions) {
            commit("setQuestions", questions);
        }
    },
    getters: {
        getQuestions(state) {
            return state.questions;
        }
    }
});