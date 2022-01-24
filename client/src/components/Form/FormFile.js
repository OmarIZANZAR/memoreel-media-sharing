import React, {useRef} from 'react';
import FileThumb from '../FileThumb'

const FormFile = ({postData, setPostData, edit}) => {
    const myRef = useRef()

    let File;
    if(postData.media) { 
        File = postData.media
    }

    const zoneDropClick = (e) => {
        if(myRef.current){
            myRef.current.click()
        }
    }

    const makefile = (file) => {
        console.log("makefile function:", file)
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setPostData({...postData, media: {
                resource_type: file.type,
                base64: reader.result,
                file: file,
            }}) 
        };
    }

    const inputChange = (e) => {
        if(e.target.files.length){
            const file = e.target.files[0]
            if(file.type.startsWith("image/") || file.type.startsWith("video/")){
                makefile(file)
            }
        }
    }

    const zoneDropDragOver = (e) => {
        e.preventDefault()
    }

    const zoneDropDrop = (e) => {
        e.preventDefault();
        if(e.dataTransfer.files.length){
            const file = e.dataTransfer.files[0]
            if(file.type.startsWith("image/") || file.type.startsWith("video/")){
                makefile(file)
            }
        }
    }

    return (
        <div className="post-frame bg-light d-flex align-items-center justify-content-center">

            { !File && (

                <div 
                    className="drop-zone rounded d-flex align-items-center justify-content-center p-1"
                    onClick={zoneDropClick}
                    onDragOver={zoneDropDragOver}
                    onDrop={zoneDropDrop}
                >

                    <div className="drop-zone-text font-weight-bolder h4 text-center">
                        <span className="d-block overflow-hidden">
                            Drop file here or click to upload
                        </span>
                        <i className="fas fa-cloud-upload-alt"></i>
                    </div>

                    <div className="file-input d-none">
                        <input 
                            ref={myRef}
                            type="file" 
                            multiple={false}
                            name="selectedFile"
                            className="file-input-field"
                            onChange={inputChange}
                        />
                    </div>
                </div>
            )}

            { File && <FileThumb edit={edit} file={File} setPostData={setPostData} /> }
            
        </div>
    )
}

export default FormFile
