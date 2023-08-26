import Vuex, {Store} from "vuex";
import Vue from "vue";
import questions from "./modules/questions";
import user from "./modules/user";

Vue.use(Vuex);

const store = new Store({
    modules: {
        questions,
        user,
    },
});

export default store;
