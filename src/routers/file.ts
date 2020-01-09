import * as multer from 'multer'
import * as fs from 'fs'
import { Router } from 'express'
import { Types } from 'mongoose';

const route = Router()
const pathFiles = '/tmp/'
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, pathFiles)
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    },
})
const upload = multer({
    storage,
})

//default path file insede 
route.post('/image', upload.single('file'), (req, res) => {
    console.log(req.body.plant)
    const id = new Types.ObjectId()
    fs.writeFile(pathFiles + id, req.file, (err) => {
        if (err) {
            return res.status(500).send(err.message)
        }
        res.send(id)
    })
})
route.get('/image/:id', (req, res) => {
        res.sendFile(pathFiles + req.params.id)
    
})

export default route