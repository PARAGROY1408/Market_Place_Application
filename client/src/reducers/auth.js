

/**->as when we we are refreshing the page so we are loosing the state that is saved inside the redux
 * so what we do when we reload the page the reudx store will get the data from the localstorage
 */

let userState;
if(window.localStorage.getItem("auth")){
  userState=JSON.parse(window.localStorage.getItem("auth"));
  /**this userState is basically a js object and the data that is stored inside the localstorage is in the
   * form of the string so we will first parse it to the js object*/
}
else{
  userState=null;
}


/** ->here we have defined the reducer it has the power to change the state 
 * -> it is basically a function it will take two parameter
 * -> one is the state  (state is basically a js object which has various key value pair)
 * -> 2nd is the action (action is also a js object) (it has two keys in it type and payload)
 * -> const action={
 * type:"",
 * payload:""}
 * ->payload basically contain the data,what we receive from our api,or from the backend
 * -> generally action.payload is also a js object that is we receive the data in json form
*/
export const authReducer=(state=userState,action)=>{
    switch(action.type){
      case "LOGGED_IN_USER":
        return{
          ...state,
          ...action.payload // here we have merged two js object and return it
        }
       case "LOGOUT":
         return action.payload
       default:
         return state
    }
 }