import { TypedUseSelectorHook } from "react-redux"
import { rootReducer } from "../storage/redux/reducers/rootReducer"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import * as ActionCreators from "../storage/redux/actions/actionCreators"

type RootState = ReturnType<typeof rootReducer>

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

const useAppActions = () => {
    const dispatch = useDispatch()

    return bindActionCreators(ActionCreators, dispatch)
}

export { useAppSelector, useAppActions }