import { ActionTree } from 'vuex'
import { RootState, FSXAActions } from 'fsxa-pattern-library'

export interface State extends RootState {}
export const actions: ActionTree<State, State> = {
  // we do need to pass  the nuxtServerInit-Action to the pattern-library, through FSXAActions.setInitialStateFromServer
  nuxtServerInit({ commit }, { store }) {
    commit(FSXAActions.setInitialStateFromServer, store.state.fsxa)
  }
}
