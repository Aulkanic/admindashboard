import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export const CustomTextArea = ({content,handleChange}) => {
    return (
        <ReactQuill
          theme="snow"
          value={content}
          onChange={handleChange}
          placeholder="Write something..."
        />
      );
}
