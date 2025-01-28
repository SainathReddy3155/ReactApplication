// setusername reducer

const initialUsernameState={
    username:'',
}

const kpicountinitalstate={
    kpicount:'',
}



const setusernameReducer=(state=initialUsernameState,action)=>{
    switch(action.type){
        case 'SET_USERNAME':
            console.log("state : ",state)
            return {...state,username:action.payload};
        default:
            return state;
    }
};



export default setusernameReducer;