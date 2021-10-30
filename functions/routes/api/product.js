// -----------Models---------//
const getCollection = require('../models/getData')
const getCollections = require('../models/getDatas')
const postCollection = require('../models/postData')
const deleteCollection = require('../models/deleteData')

// -----------Back-end---------//
const express = require('express')
const router = express.Router()

// -----------Multer---------//
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + Date.now())
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}
  
const upload = multer({ 
    storage: storage,
    limit: { fieldSize: 1024 * 1024 * 3 },
    fileFilter: fileFilter
})

// -----------Router---------//

router.get('/:product', async (req, res) => {
    const params = {
        dbName: 'HONEYSPLACEDB', collectionName: req.params.product
    }
    const data = await getCollections(params)
    
    res.status(200).send(data)
})

router.get('/:product/:id', async (req, res) => {
    const { product, id } = req.params

    const params = {
        dbName: 'HONEYSPLACEDB', collectionName: product, productId: id
    }
    const data = await getCollection(params)
    
    res.status(200).send(data)
})

router.post('/:product', upload.single('file'), async (req, res) => {
    console.log(req.body);
    console.log(req.file);
    const params = {
        dbName: 'HONEYSPLACEDB', collectionName: req.params.product
    }
    const post = await postCollection(params, req)

    res.status(201).send(post)
})

router.delete('/:product/:id', async (req, res) => {
    const { product, id } = req.params

    const params = {
        dbName: 'HONEYSPLACEDB', collectionName: product, productId: id
    }
    await deleteCollection(params)
    
    res.status(200).send()
})


module.exports = router