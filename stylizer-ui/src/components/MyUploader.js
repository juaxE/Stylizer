import React from "react";
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'

const MyUploader = (props) => {
 
    const toast = (innerHTML) => {
        const el = document.getElementById('toast')
        el.innerHTML = innerHTML
        el.className = 'show'
        setTimeout(() => { el.className = el.className.replace('show', '') }, 3000)
    }

    const getUploadParams = () => {
        return { url: props.upload }
    }

    const handleChangeStatus = ({ meta, remove }, status) => {
        if (status === 'headers_received') {
            toast(`${meta.name} uploaded!`)
            remove()
        } else if (status === 'aborted') {
            toast(`${meta.name}, upload failed...`)
        }
    }

    return (
        <React.Fragment>

            <Dropzone
                getUploadParams={getUploadParams}
                onChangeStatus={handleChangeStatus}
                accept="image/*"
                maxFiles={1}
                multiple={false}
                canCancel={false}
                inputContent={props.text}
                styles={{
                    dropzone: { width: 200, height: 100 },
                    dropzoneActive: { borderColor: 'green' },
                }}
            />
            <div id="toast"></div>
        </React.Fragment>
    )
}

export default MyUploader