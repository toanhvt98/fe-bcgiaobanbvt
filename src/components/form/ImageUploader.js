import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

function ImageUploader({ onDrop }) {
  const onDropCallback = useCallback(acceptedFiles => {
    onDrop(acceptedFiles);
  }, [onDrop]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop: onDropCallback });

  return (
    <div {...getRootProps()} style={{ border: '2px dashed gray', padding: '20px', cursor: 'pointer' }}>
      <input {...getInputProps()} />
      <p>Kéo thả hoặc click để thêm ảnh</p>
    </div>
  );
}

export default ImageUploader;
