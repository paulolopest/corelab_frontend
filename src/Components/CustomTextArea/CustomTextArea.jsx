import React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

export const CustomTextArea = ({ value, setValue }) => {
    return (
        <ReactQuill
            className="textArea-ctr"
            theme="snow"
            value={value}
            onChange={setValue}
            placeholder="Criar nota..."
        />
    )
}
