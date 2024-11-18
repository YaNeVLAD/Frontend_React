import { rootReducer } from "./reducers/rootReducer"

type RootState = ReturnType<typeof rootReducer>

export type { RootState }