import React from 'react'
import moment from 'moment'

const FormInputs = ({postData, setPostData}) => {

    return (
        <div className="post-body mb-1">
            <div className="post-body-content d-flex flex-column justify-content-between h-100">

                <div>
                
                    <div className="w-100 d-flex justify-content-end">
                        <button 
                            type="button" 
                            className="btn text-secondary font-weight-bolder m-0 p-0"
                            disabled
                        >
                            <i className="fas fa-edit"></i>
                        </button>
                    </div>

                    <input
                        className="form-input form-title font-weight-bold h3 text-secondary"
                        name="title"
                        label="Title"
                        placeholder="Title"
                        value={postData.title}
                        onChange={(e) => setPostData({...postData, title: e.target.value})}
                    />

                    <textarea 
                        className="form-input form-message mb-4 text-secondary"
                        name="message"
                        label="Message"
                        placeholder="express here"
                        value={postData.message}
                        onChange={(e) => setPostData({...postData, message: e.target.value})}
                    />

                    <textarea 
                        className="form-input form-tags text-secondary text-muted"
                        name="tags"
                        label="Tags"
                        placeholder="enter tags here separated by space: fun joy..."
                        value={postData.tags}
                        onChange={(e) => setPostData({...postData, tags: e.target.value})}
                    />
                </div>

                <div>
                    <div className="mb-3">
                        <div className="d-flex align-items-center">
                            <p className="text-muted font-italic m-0">
                                posted by _
                            </p>
                            <input
                                className="form-input form-creator text-secondary text-muted font-italic m-0"
                                name="creator"
                                label="Creator"
                                placeholder="creator name"
                                value={postData.creator}
                                onChange={(e) => setPostData({ ...postData ,creator: e.target.value})}
                            />
                        </div>
                        <p className="text-muted font-italic m-0">
                            added on {moment(Date.now()).format('MMMM Do YYYY')}
                        </p>
                    </div>

                    <div className="d-flex align-items-center justify-content-between w-100">

                        <button 
                            type="button" 
                            className="btn btn-outline-success font-weight-bolder"
                            disabled
                        >
                            <i className="far fa-heart"></i> Like 
                        </button>

                        <button 
                            type="button" 
                            className="btn btn-outline-danger font-weight-bolder"
                            disabled 
                        >
                            <i className="far fa-trash-alt"></i> Delete
                        </button>
                        
                    </div>
                </div>
                        
            </div>
        </div>
    )
}

export default FormInputs
