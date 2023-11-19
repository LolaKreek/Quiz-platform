import { postRequest } from "../../lib/Axios";

//Authentication
export function userLogin(userName:string, password:string, url:string = 'Authenticate/UserLogin') {
    return postRequest(`${url}`, {userName, password});
}

export function createUser(userName:string, password:string, url:string = 'Authenticate/CreateUser') {
    return postRequest(`${url}`, {userName, password});
}

export function createRole(roleName:string, url:string = 'Authenticate/CreateRole') {
    return postRequest(`${url}`, {roleName});
}

export function assingRoleToUser(userName:string, userRoleName:string, url:string = 'Authenticate/AssignRoleToUser') {
    return postRequest(`${url}`, {userName, userRoleName});
}

export function removeRoleFromUser(userName:string, userRoleName:string, url:string = 'Authenticate/RemoveRoleFromUser') {
    return postRequest(`${url}`, {userName, userRoleName});
}