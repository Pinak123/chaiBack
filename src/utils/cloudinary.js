import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View Credentials' below to copy your API secret
    });

 const uploadOnCloudinary = async (localFilePath) =>{
    try {
        if (!localFilePath) return null;
        ///Upload file
        const response = await cloudinary.uploader.upload(localFilePath , {
            resource_type:'auto',
        })
        //File loaded successfully
        console.log("The file is uploaded on cloudinary " , response.url);

    } catch (error) {
        fs.unlinkSync(localFilePath); //Removed temporary saved file
        return null; //
        
    }
 }
 export {uploadOnCloudinary}