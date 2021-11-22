const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        if(file.fieldname==="image"){
            cb(null,'imagenes')
        }else if (file.fieldname==="documents"){
            cb(null,'documentos')
        }
    },
    filename: function(req,file,cb){
        cb(null,Date.now()+file.fieldname+"."+file.originalname.split(".")[1])
    }
})

const upload = multer({storage:storage})

module.exports = upload