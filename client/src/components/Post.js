import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {motion} from 'framer-motion'
import moment from 'moment';
import FileThumb from './FileThumb';

import { likePost, deletePost } from '../actions/posts';

const Post = ({ post }) => {
    const dispatch = useDispatch()
    
    return (
        <motion.div layout className="post shadow rounded w-100 mb-4 p-2 d-flex">
                <div className="post-frame d-flex align-items-center justify-content-center">
                    <FileThumb file={post.media} />
                </div>

                <div className="post-body">
                    <div className="post-body-content d-flex flex-column justify-content-between h-100">

                        <div>
                            <div className="w-100 d-flex justify-content-end">
                                <Link to={`/form/${post._id}`}>
                                    <button 
                                        type="button" 
                                        title="edit post"
                                        className="post-edit-button btn text-secondary font-weight-bolder m-0 p-0"
                                    >
                                        <i className="fas fa-edit"></i>
                                    </button>
                                </Link>
                            </div>

                            <h3 className="post-title font-weight-bold text-truncate">{post.title}</h3>

                            <p className="post-message mb-4 text-break">{post.message}</p>

                            <p className="post-tags text-muted text-break">
                                {post.tags.split(' ').map(tag =>` #${tag}`)}
                            </p>
                        </div>

                        <div>

                            <div className="mb-3">
                                <p className="post-creator text-muted font-italic m-0 text-break">
                                    posted by _{post.creator}
                                </p>
                                <p className="post-date text-muted font-italic m-0 text-break">
                                    added on {
                                        moment(post.createdAt).format('MMMM Do YYYY')        
                                    }
                                </p>
                            </div>

                            <div className="d-flex align-items-center justify-content-between w-100">

                                <button 
                                    type="button" 
                                    className="post-like-butn btn btn-outline-success font-weight-bolder"
                                    title="like post"
                                    onClick={()=>dispatch(likePost(post._id, post))}
                                >
                                    <i className="far fa-heart"></i> Like {post.likeCount}
                                </button>

                                <button 
                                    type="button" 
                                    className="post-delete-butn btn btn-outline-danger font-weight-bolder"
                                    title="delete post" 
                                    onClick={() => dispatch(deletePost(post._id))}
                                >
                                    <i className="far fa-trash-alt"></i> Delete
                                </button>
                            </div>

                        </div>
                    
                    </div>
                </div>
        </motion.div>
    )
}

export default Post
