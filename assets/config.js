console.log(process.env);
export const API_URL = process.env.NODE_ENV;
export const USERS_API = API_URL + "users";