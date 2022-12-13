import { createContext, useReducer } from "react";

export const INITIAL_STATE= {

    city:undefined,
    dates:[],
    persons:{

        adult:undefined,
        children:undefined,
        room:undefined
    }

};


const reducer= (state,action)=>{


    switch(action.type){

        case "NEW_SEARCH": return action.payload; 
        case "RESET_SEARCH":  return INITIAL_STATE;
        default: return new Error("Invalid action");
    }
}


export const SearchContext = createContext(INITIAL_STATE);

export const SearchProvider = ({children})=>{


  const [state,dispatch]= useReducer(reducer,INITIAL_STATE);

    return <SearchContext.Provider value={{city:state.city,dates:state.dates,persons:state.persons,dispatch}} > 
        {children}
    </SearchContext.Provider>


}