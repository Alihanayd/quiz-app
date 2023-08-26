import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import QuestionsView from "@/views/QuestionsView.vue";
import ResultsView from "@/views/ResultsView.vue";
import HighScoresView from "@/views/HighScoresView.vue";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/questions',
        name: 'question',
        component: QuestionsView
    },
    {
        path: '/results',
        name: 'results',
        component: ResultsView
    },
    {
        path: '/highscores',
        name: 'highscores',
        component: HighScoresView
    }
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router
