import { UserState, user } from './user'
import { AppState, app } from './app'

/**
 * Root states.
 */
export type States = {
  app: AppState,
  user: UserState
}

/**
 * Root reducers.
 */
export const reducers = {
  app: app.reducer,
  user: user.reducer
}

/**
 * Root actions.
 */
export const actions = {
  app: app.actions,
  user: user.actions
}

export { app, user }
