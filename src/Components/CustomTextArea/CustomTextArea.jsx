import ReactQuill from 'react-quill'
import React, { useState } from 'react'
import 'react-quill/dist/quill.snow.css'

export const CustomTextArea = () => {
  const [value, setValue] = useState('')

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
