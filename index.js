import express from "express";
import cors from "cors";
import { PizzaService } from "./services/pizzaservice.js";

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const elLogger = (req, res, next) => {
    console.log("hello middlewere", Date().toString())
    next()
}
app.use(elLogger)
app.get('/pizza',async (req, res) => {
    const pizza = await PizzaService.getAll()
    res.status(200).send(pizza);
})


app.get('/pizza/:id', async (req, res) => {
    const pizza = await PizzaService.getById(req.params.id)
    res.status(200).send(pizza)
})



app.post('/pizza',async (req, res) => {
    console.log("hola")
    res.json(req.body)
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