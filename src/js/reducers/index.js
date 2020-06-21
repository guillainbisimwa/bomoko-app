import { LOGIN,
  LOGOUT,
  CREATE_USER,
  DELETE_USER,
  CREATE_PROFILE,
  DELETE_PROFILE,
  CREATE_GROUP,
  DELETE_GROUP,
  CREATE_LOAN,
  DELETE_LOAN } from "../constants/action-types";

// const initialState = {
//   articles: []
// };

// function rootReducer(state = initialState, action) {
//   if (action.type === ADD_ARTICLE) {
//     return Object.assign({}, state, {
//       articles: state.articles.concat(action.payload)
//     });
//   }
//   return state;
// }

// export default rootReducer;

//import { ADD_FOOD, DELETE_FOOD } from '../actions/types';

const initialState = {
  loginList: [],
  userList: [],
  groupList: [],
  loanList: []
}

const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER:
      return {
        ...state,
        userList: state.userList.concat({
          key: Math.random(),
          nom : action.nom,  
          phone : action.phone,  
          id_g : action.id_g,  
          num_carte_elec : action.num_carte_elec,  
          address : action.address,  
          sexe : action.sexe,
          profession : action.profession,
          code_conf_sms : action.code_conf_sms,  
          password : action.password
          
        })
      };
    case DELETE_USER:
      return {
        ...state,
        userList: state.userList.filter((item) =>
          item.key !== action.key)
      };
    case LOGIN:
      return {
        ...state,
        loginList: state.loginList.concat({
          key: Math.random(),
          name: action.data
        })
      };
    case LOGOUT:
      return {
        ...state,
        loginList: state.loginList.filter((item) =>
          item.key !== action.key)
      };
      case CREATE_GROUP:
      return {
        ...state,
        groupList: state.groupList.concat({
          key: Math.random(),
          name: action.data
        })
      };
    case DELETE_GROUP:
      return {
        ...state,
        groupList: state.groupList.filter((item) =>
          item.key !== action.key)
      };
      case CREATE_LOAN:
        return {
          ...state,
          loanList: state.loanList.concat({
            key: Math.random(),
            name: action.data
          })
        };
      case DELETE_LOAN:
        return {
          ...state,
          loanList: state.loanList.filter((item) =>
            item.key !== action.key)
        };
    default:
      return state;
  }
}

export default myReducer;