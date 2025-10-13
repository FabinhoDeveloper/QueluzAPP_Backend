const express = require("express")
const { models } = require("../models/index")

const router = express.Router()

router.get("/get", async (req, res) => {
    try {
        const carList = await models.carro.findAll()

    } catch (error) {
        
    }
})

router.get("/get:id", (req, res) => {
    try {
        
    } catch (error) {
        
    }
})

router.post("/create", (req, res) => {
    try {
        
    } catch (error) {
        
    }
})

router.put("/edit", (req, res) => {

})

router.delete("/delete", (req, res) => {

})

module.exports = router
