const state = () => ({
    questions: [{}]
})

const mutations = {
    setQuestions(state, questions) {
        state.questions = questions
    }
}

const actions = {
    async setQuestions({commit}, questions) {
        commit('setQuestions', questions)
    },
}

const getters = {
    getQuestions(state) {
        return state.questions
    },
    // async getQuestion(id) {
        // return state.questions.find(question => question.id === id)
    // },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
