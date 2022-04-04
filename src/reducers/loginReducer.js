

const initialState = {
    token: localStorage.getItem("loggedUser"),
    user:null
}

const authReducer=(state = initialState, action)=>{
    switch (action.type){
        case "SIGN_IN":
        case "SIGN_UP":
            return{
                user:action.username,
                token:action.token
            }
        case "SIGN_OUT":
            localStorage.removeItem("loggedUser")

            return{
                token:null,
                user:null,
            }
            default:
                return state
    }
}

export default authReducer