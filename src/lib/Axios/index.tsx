import { axiosInstance } from "./interceptors";

export function postRequest(url:string, params = {}) {
    return axiosInstance.post(url, params).then((res:any) => res.data);
}

export function getRequest(url:string, params = {}) {
    return axiosInstance.get(url, params).then((res:any) => res.data);
}

export function putRequest(url:string, params = {}) {
    return axiosInstance.put(url, params).then((res:any) => res.data);
}

export function deleteRequest(url:string, params = {}) {
    return axiosInstance.delete(url, params).then((res:any) => res.data);
}