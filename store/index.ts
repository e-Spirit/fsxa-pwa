import { ActionTree } from 'vuex'
import { RootState, FSXAActions } from 'fsxa-pattern-library'

export interface State extends RootState {}
export const actions: ActionTree<State, State> = {
  nuxtServerInit({ commit }, { store }) {
    commit(FSXAActions.setInitialStateFromServer, store.state.fsxa)
  }
}
