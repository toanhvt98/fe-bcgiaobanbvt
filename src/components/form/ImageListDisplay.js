import React from 'react';
// import { ImageList, ImageListItem, IconButton, ImageListItemBar } from '@material-ui/core';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { IconButton, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
function ImageListDisplay({ listImage, onDelete }) {
  return (
    // <ImageList cols={3}>
    //   {listImage.map((img, index) => (
    //     <ImageListItem key={index}>
    //       <img src={img.preview} alt={`img-${index}`} />
    //       <ImageListItemBar
    //         actionIcon={
    //           <IconButton edge="end"  onClick={() => onDelete(index)}>
    //             <DeleteForeverOutlinedIcon/>
    //           </IconButton>
    //         }
    //       />
    //     </ImageListItem>
    //   ))}
    // </ImageList>


    <ImageList cols={3}>
      {listImage.map((imgUrl, index) => (
        <ImageListItem key={index}>
          <img src={imgUrl} alt={`img-${index}`} />
          <ImageListItemBar
            actionIcon={
              <IconButton edge="end" color="inherit" onClick={() => onDelete(index)}>
                <DeleteForeverOutlinedIcon />
              </IconButton>
            }
          />
        </ImageListItem>
        
      ))}
    </ImageList>

  //   <ImageList cols={3}>
  //   {listImage.map((img, index) => (
  //     <ImageListItem key={index}>
  //       <img src={img.url} alt={`img-${index}`} />
  //       <ImageListItemBar
  //         actionIcon={
  //           <IconButton edge="end" color="inherit" onClick={() => onDelete(index)}>
  //             <DeleteForeverOutlinedIcon />
  //           </IconButton>
  //         }
  //       />
  //     </ImageListItem>
  //   ))}
  // </ImageList>
  );
}

export default ImageListDisplay;
