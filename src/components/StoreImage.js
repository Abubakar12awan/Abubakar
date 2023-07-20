import React, { useState } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';

const ImageUploader = () => {

    const [image,setimage]=useState()
    
const handleImageChange=(e)=>{

    console.log(e);
    var reader=new FileReader();
    reader.readAsDataURL(e.target.files[0])
reader.onload=()=>{
    console.log(reader.result)
    setimage(reader.result)
}
reader.onerror=error=>{
    console.log("error",error)
}


}
const handleUpload=()=>{
    fetch("http://localhost:8082/images/t",{
        method:"POST",
        crossDomain:true,
        // headers:{
        //     "Content-Type":"application/json",
        //     Accept:"application/json",
        //     "Access-Control-Alllow-Orgin":"*",
        // },
body:(image)
    })
    .then((res)=>res.json()).then((data)=>console.log(data))






}

  return (
    <div>
        <input accept='image/*' type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload</button>
      {image==""||image==null?"":<img width={100} height={100} src={image}/>}
    </div>
  );
};

export default ImageUploader;
