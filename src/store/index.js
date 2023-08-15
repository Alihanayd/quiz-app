import Vuex, {Store} from "vuex";
import Vue from "vue";
import questions from "./modules/questions";

Vue.use(Vuex);

const store = new Store({
    modules: {
        questions: questions
    },
});

export default store;
