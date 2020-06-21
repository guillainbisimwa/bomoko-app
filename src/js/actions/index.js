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

export const logout = (session_id) => (
  {
    type: LOGOUT,
    key: session_id
  }
);

export const addUser = (user) => (
  {
    type: CREATE_USER,
    data: user
  }
);

export const deleteUser = (id) => (
  {
    type: DELETE_USER,
    key: id
  }
);

export const addGroup = (group) => (
  {
    type: CREATE_GROUP,
    data: group
  }
);

export const deleteGroup = (id) => (
  {
    type: DELETE_GROUP,
    key: id
  }
);

export const addLoan = (loan) => (
  {
    type: CREATE_LOAN,
    data: loan
  }
);

export const deleteLoan = (id) => (
  {
    type: DELETE_LOAN,
    key: id
  }
);