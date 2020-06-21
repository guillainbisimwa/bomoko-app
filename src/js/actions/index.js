import { LOGIN,
  LOGOUT,
  CREATE_USER,
  DELETE_USER,
  UPDATE_USER,
  CREATE_PROFILE,
  DELETE_PROFILE,
  CREATE_GROUP,
  DELETE_GROUP,
  CREATE_LOAN,
  DELETE_LOAN } from "../constants/action-types";

// export function addArticle(payload) {
//   return { type: ADD_ARTICLE, payload };
// }

// export const addFood = (food) => (
//   {
//     type: ADD_FOOD,
//     data: food
//   }
// );
// export const deleteFood = (key) => (
//   {
//     type: DELETE_FOOD,
//     key: key
//   }
// )

export const login = (user) => (
  {
    type: LOGIN,
    data: user
  }
);

export const logout = (session_key) => (
  {
    type: LOGOUT,
    key: session_key
  }
);

export const addUser = (nom, phone, id_g, num_carte_elec, address, sexe,
  profession, code_conf_sms, password) => (
  {
    type: CREATE_USER,
    nom: nom,
    phone: phone,
    id_g: id_g,
    num_carte_elec: num_carte_elec,
    address: address,
    sexe: sexe,
    profession: profession,
    code_conf_sms: code_conf_sms,
    password: password
  }
);

export const updateUser = (nom, phone, id_g, num_carte_elec, address, sexe,
  profession, code_conf_sms, password) => (
  {
    type: UPDATE_USER,
    key: key,
    nom: nom,
    phone: phone,
    id_g: id_g,
    num_carte_elec: num_carte_elec,
    address: address,
    sexe: sexe,
    profession: profession,
    code_conf_sms: code_conf_sms,
    password: password
  }
);

export const deleteUser = (key) => (
  {
    type: DELETE_USER,
    key: key
  }
);

export const addGroup = (group) => (
  {
    type: CREATE_GROUP,
    data: group
  }
);

export const deleteGroup = (key) => (
  {
    type: DELETE_GROUP,
    key: key
  }
);

export const addLoan = (loan) => (
  {
    type: CREATE_LOAN,
    data: loan
  }
);

export const deleteLoan = (key) => (
  {
    type: DELETE_LOAN,
    key: key
  }
);