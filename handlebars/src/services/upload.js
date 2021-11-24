import multer from 'multer';
import dirname from 'path';
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        if(file.fieldname==="image"){
            cb(null,dirname+'/../public/images');
        }
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+file.originalname);
    }
})
const upload = multer({storage:storage});

export default upload;