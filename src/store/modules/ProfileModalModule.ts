export default {
    state: {
        shouldDisplay: true,
        modalCode: 1
    },
    getters: {
        shouldDisplay(state, getters) {
            return state.shouldDisplay;
        },
        modalCode(state, getters) {
            return state.modalCode
        }
    },
    mutations: {
        setDisplay(state, display: boolean) {
            state.shouldDisplay = display;
        },
        setModalCode(state, modalCode: number) {
            state.modalCode = modalCode;
        }
    },
    actions: {
        setShouldDisplay(context, display: boolean) {
            context.commit("setDisplay", display);
        },
        setModalCode(context, modalCode: number) {
            context.commit("setModalCode", modalCode);
        }
    }
}