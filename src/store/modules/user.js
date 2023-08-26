const state = () => ({
    name: ''
})

const mutations = {
    setName(state, name) {
        state.name = name
    }
}

const actions = {
    async setName({commit}, name) {
        commit('setName', name)
    }
}

const getters = {
    getName(state) {
        return state.name
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};