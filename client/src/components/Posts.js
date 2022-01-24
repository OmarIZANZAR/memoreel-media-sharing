import React from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'

import Post from './Post'
import Loader from './Loader'



const Posts = () => {
    const posts = useSelector( state => state.posts )
    
    return (
        !posts.length ? <Loader /> : (
        <motion.div 
            layout
            className="w-90 px-4 d-flex flex-column align-items-center"
        >
            {posts.map( (post, index) => (<Post post={post} key={index} />))}
        </motion.div> 
        )
    )
}

export default Posts
