import { createContext, useReducer } from "react";
import { ActivityActions, ActivityState, acitivityReducer, initialState } from "../reducers/activityReducer";
type ActivityProviderProps = {
    children: React.ReactNode
}

type ActivityContextProps = {
    state: ActivityState
    dispatch: React.Dispatch<ActivityActions>
}
export const ActivityContext = createContext<ActivityContextProps>(null!)


export const ActivityProvider = ({children} : ActivityProviderProps) => {

    const [state, dispatch] = useReducer(acitivityReducer, initialState)

    return (
        <ActivityContext.Provider value={{state,dispatch}}>

            {children}

        </ActivityContext.Provider>
    )
}