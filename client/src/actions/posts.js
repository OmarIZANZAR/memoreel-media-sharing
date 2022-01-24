import axios from 'axios'
import * as actions from './actions'
import { addNote } from './notes'

const url = process.env.REACT_APP_SERVER_URL
const cloud_url = process.env.REACT_APP_CLOUD_URL

// GETTING ALL POSTS:
export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await axios.get(url)

        if(data.isError){
            dispatch(addNote({isError: true, message: "can not get posts try reloading"}))
            return
        }
        
        dispatch({type: actions.FETCH_ALL_POSTS, payload: data.posts })
    } catch (error) {
        // console.log("CANNOT GET POSTS", error)
        dispatch(addNote({isError: true, message: "can not get posts try reloading"}))
    }
}

// CREATING A NEW POST:
export const createPost = (post) => async (dispatch) => {
    const mediaFormData = new FormData();
    mediaFormData.append("file", post.media.file);
    mediaFormData.append("upload_preset", "default_preset");

    try {
        const { data } = await axios.post(cloud_url, mediaFormData, {
            onUploadProgress: function(progress){
                dispatch({
                    type: actions.SET_PROGRESS,
                    payload: Math.round((progress.loaded * 60 ) / progress.total)
                })
            },
            onDownloadProgress: function(progress){
                dispatch({
                    type: actions.SET_PROGRESS,
                    payload: 60 + Math.round((progress.loaded * 20 ) / progress.total)
                })
            },
        })

        if(data.isError){
            dispatch(addNote({isError: true, message: "post not created try again"}))
            return
        }

        const postData = {
            creator: post.creator,
            title: post.title,
            message: post.message,
            tags: post.tags,
            media: data,
        }
    
        try {
            const { data } = await axios.post(url, postData, {
                onUploadProgress: function(progress){
                    dispatch({
                        type: actions.SET_PROGRESS,
                        payload: 80 + Math.round((progress.loaded * 10 ) / progress.total)
                    })
                },
                onDownloadProgress: function(progress){
                    dispatch({
                        type: actions.SET_PROGRESS,
                        payload: 90 + Math.round((progress.loaded * 10 ) / progress.total)
                    })
                },
            })
    
            if(data.isError){
                dispatch(addNote({isError: true, message: "post not created try again"}))
                return
            }
    
            dispatch({type: actions.CREATE_POST, payload: data.post })
            dispatch(addNote({isError: false, message: "post created successfuly"}))
        } catch (error) {
            // console.log("COULD NOT UPLOAD TO MONGODB",error)
            dispatch(addNote({isError: true, message: "post not created try again"}))
        }

    } catch (error) {
        // console.log("COULD NOT UPLOAD TO CLOUDINARY",error)
        dispatch(addNote({isError: true, message: "post not created try again"}))
    }
}

// UPDATING A POST:
export const updatePost = (postId, post) => async (dispatch) => {
    try {
        const { data } = await axios.patch(`${url}/${postId}`, post, {
            onUploadProgress: function(progress){
                dispatch({
                    type: actions.SET_PROGRESS,
                    payload: Math.round((progress.loaded * 100 ) / progress.total)
                })
            }
        })

        if(data.isError){
            dispatch(addNote({isError: true, message: "post not updated try again"}))
            return
        }

        dispatch({type: actions.UPDATE_POST, payload: data.post})
        dispatch(addNote({isError: false, message: "post updated successfuly"}))
    } catch (error) {
        // console.log("COULD NOT UPDATE POST",error)
        dispatch(addNote({isError: true, message: "post not updated try again"}))
    }
}

// UPDATING POST LIKE COUNT:
export const likePost = (postId, post) => async (dispatch) => {
    try {
        const { data } = await axios.patch(`${url}/${postId}`, {likeCount: post.likeCount+1})

        if(data.isError){
            dispatch(addNote({isError: true, message: "post not updated try again"}))
            return
        }

        dispatch({type: actions.UPDATE_POST, payload: data.post})
    } catch (error) {
        // console.log("COULD NOT UPDATE POST LIKES",error)
        dispatch(addNote({isError: true, message: "post not updated try again"}))
    }
}

// DELETING POST:
export const deletePost = (postId) => async (dispatch) => {
    try {
       await axios.delete(`${url}/${postId}`)
       dispatch({type: actions.DELETE_POST, payload: postId})
       dispatch(addNote({isError: false, message: "post deleted successfuly"}))
    } catch (error) {
        // console.log("COULD NOT DELETE POST",error)
        dispatch(addNote({isError: true, message: "post not deleted try again"}))
    }
}