import React, {useState, useEffect} from 'react'

const FileThumb = ({file, setPostData, edit}) => {
    const [run, setRun] = useState(true)

    useEffect(()=>{
        setRun(false)
    },[])

    let src;
    let type;
    if(file.base64){
        src = file.base64
        type = file.type
    }else {
        src = file.url
        type = `${file.resource_type}/${file.format}`
    }

    return (
        <div className="thumb position-relative w-100 h-100">
            { (setPostData && !edit ) ? (
                <div className="media-clear-butn">
                    <button 
                        className="btn text-secondary bg-light float-right shadow-lg"
                        onClick={() => setPostData(prev => ({
                            ...prev,
                            media: null,
                        }))}
                    >
                        <i className="far fa-times-circle"></i>
                    </button>
                </div>
            ) : null }

            { file.resource_type?.startsWith('image') && (
                <img src={src} alt="post media file" className="post-media" />
            )}
    
            { file.resource_type?.startsWith('video') && (
                <video 
                    preload="auto"
                    autoPlay={run}
                    className="post-media" 
                    controls 
                    loop
                >
                    <source src={src} type={type} />
                    Your browser does not support the video tag.
                </video>
            )}
        </div>
    )
}

export default FileThumb
