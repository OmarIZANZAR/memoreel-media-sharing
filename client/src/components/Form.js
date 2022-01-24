import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'

import FormControls from './Form/FormControls'
import FormInputs from './Form/FormInputs'
import FormFile from './Form/FormFile'
import ProgressBar from './Form/ProgressBar'

import { addNotes } from '../actions/notes'
import { createPost, updatePost } from '../actions/posts'

const formVariants = {
    hidden: {
        opacity: 0,
        x: '100vw',
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            duration: 1,
        }
    },
    exit: {
        x: '100vw',
        transition: { 
            duration: 0.5,
        }
    }
}

const Form = () => {
    const dispatch = useDispatch()
    const { postId } = useParams()
    const [postData, setPostData] = useState({
        creator: '',
        title: '',
        message: '',
        tags: '',
        media: null,
    })

    const post = useSelector( ({posts}) => 
        postId ?
        posts.find(p => p._id === postId) :
        null
    )

    useEffect(()=>{
        if(post) setPostData(post)
    },[post])

    const handleSubmit = (e) => {
        e.preventDefault();

        let warnings = []

        if(postData.creator === ""){
            warnings.push("please provile a valide creator")
        }

        if(postData.title === ""){
            warnings.push("please provile a valide title")
        }

        if(postData.message === ""){
            warnings.push("please provile a valide message")
        }

        if(postData.selectedFile === null){
            warnings.push("please provile a file: video or image")
        }

        if(warnings.length > 0){
            dispatch(addNotes(warnings))
        }else {
            if(post){
                dispatch(updatePost(postId, {
                    title: postData.title,
                    creator: postData.creator,
                    message: postData.message,
                    tags: postData.tags,
                }))
            }else{
                dispatch(createPost(postData))
            }
            
            clear()
        }
    }

    const clear = () => {
        setPostData({
            creator: '',
            title: '',
            message: '',
            tags: '',
            media: null,
        })
    }

    return (
        <motion.div 
            className="container"
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <h1 className="formpage-title font-weight-bolder text-center m-5 " >Share your best moment</h1>
            <form 
                autoComplete="off" 
                noValidate 
                onSubmit={handleSubmit}
                className="d-flex flex-column align-items-center justify-content-center"
            >
                <div className="post rounded shadow mb-2 w-100 p-2 d-flex">
                    <FormFile 
                        edit={ post ? true : false } 
                        postData={postData} 
                        setPostData={setPostData}   
                    />
                    <FormInputs postData={postData} setPostData={setPostData} />
                </div>

                <ProgressBar/>
                <FormControls clear={clear} />
            </form> 
        </motion.div>  
    )
}

export default Form
