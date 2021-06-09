import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_TO_PROJECT,
    GET_PROJECT_ITEMS,
    ADD_TO_PAGE
} from './types';
import { USER_SERVER, PROJECT_SERVER } from '../components/Config.js';

export function registerUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/register`,dataToSubmit)
        .then(response => response.data);
    
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function loginUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/login`,dataToSubmit)
                .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function auth(){
    const request = axios.get(`${USER_SERVER}/auth`)
    .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser(){
    const request = axios.get(`${USER_SERVER}/logout`)
    .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

export function addToProject(id, title, description, pages) {

    let body = {
        projectId: id,
        projectTitle: title,
        projectDescription: description,
        projectPages: pages
    }

    const request = axios.post(`${USER_SERVER}/addToProject`, body)
        .then(response => response.data);

    return {
        type: ADD_TO_PROJECT,
        payload: request
    }
}

export function getProjectItems(projectItems, userProject) {

    const request = axios.get(`${PROJECT_SERVER}/proejcts_by_id?id=${projectItems}&type=array`)
        .then(response => {
            userProject.forEach(projectItem => {
                response.data.forEach((projectDetail, index) => {
                    if (projectItem.id === projectDetail._id) {
                        response.data[index].quantity = projectItem.quantity
                    }
                })
            })
            return response.data
        });

    return {
        type: GET_PROJECT_ITEMS,
        payload: request
    }
}

export function addToPage(id, page) {

    let body = {
        projectId: id,
        projectPages: page
    }

    const request = axios.post(`${PROJECT_SERVER}/addToPage`, body)
        .then(response => response.data);

    return {
        type: ADD_TO_PAGE,
        payload: request
    }
}