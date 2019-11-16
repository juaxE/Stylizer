import React from "react";
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'

const MyUploader = (props) => {

    

    const getUploadParams = () => {
        return { url: props.upload }
    }

    const handleSubmit = (files, allFiles) => {
        console.log(files.map(f => f.meta))
        allFiles.forEach(f => f.remove())
      }

    return (

        <Dropzone
            getUploadParams={getUploadParams}
            accept="image/*"
            onSubmit={handleSubmit}
            maxFiles={2}
            inputContent="Drop 2 files"
            inputWithFilesContent={files => `${2 - files.length} 
            more`}
            styles={{
                dropzone: { width: 400, height: 200 },
                dropzoneActive: { borderColor: 'green' },
            }}
            submitButtonDisabled={files => files.length < 2}
        />
    )
}

export default MyUploader