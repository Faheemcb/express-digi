import 'dotenv/config'
import express from 'express'

const app = express()
const port = process.env.PORT || 3000;

app.use(express.json())

let teaData = []
let nextId = 1

// Add a new tea
app.post("/teas", (req , res) => {
    const {name , price} = req.body
    // Creating an object to store the data
    const newTea  = {id: nextId++, name , price}
    teaData.push(newTea)
    res.status(201).send(newTea)
})

// Get all tea
app.get("/teas", (req , res) => {
    res.status(200).send(teaData)
})

// Get tea by Id
app.get("/teas/:id", (req , res) => {

    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if (!tea) {
        return res.status(404).send("404 Not Found")
    }
    res.status(200).send(tea)
})

// Update tea
app.put("/teas/:id", (req , res) => {
    
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if (!tea) {
        return res.status(404).send("Tea Not Found")
    }

    const {name , price} = req.body
    tea.name = name
    tea.price = price
    res.send(200).send(tea)
})

// Delete a tea
app.delete("/teas/:id", (req , res) => {
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id))
    if (index === -1) {
        return res.status(404).send("Tea Not Found")
    }
    teaData.splice(index , 1)
    return res.status(204).send("Tea Deleted Successfully")
})

app.listen(port , () => {
    console.log(`Server is running on port ${port}`);
})