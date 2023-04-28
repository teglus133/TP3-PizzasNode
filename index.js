import express from "express";
import cors from "cors";
import { PizzaService } from "./services/pizzaservice.js";

const app = express();
const port = 3000;
app.use(express.json())
app.use(cors())


const elLogger = (req, res, next) => {
    console.log("hello middlewere", Date().toString())
    next()
}
app.use(elLogger)
app.get('/pizza',async (req, res) => {
    const pizza = await PizzaService.getAll()
    res.status(200).send(pizza);
})
app.post('/pizza',async (req, res) => {
    console.log("en post, req:", req)
    try {
        await PizzaService.insert(req.body)
        res.status(200).json({ message: 'Pizza creada' })
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Fallo el insert' })
    }
})
app.get('/error',(req,res) => {
    res.status(404).send('No se encuentra, sorry!')
})
app.listen(port, () => {
    console.log(`Escuchando puerto: ${port}`)
})