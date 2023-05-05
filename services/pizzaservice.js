import { config } from "./../dbconfig.js"
import  sql from "mssql"
const {MAX, NVarChar, VARCHAR} = sql

export class PizzaService {
    static getAll = async() => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                                .query('SELECT * FROM Pizzas')
            return result.recordsets[0];
        }
        catch (error) {
            console.log(error); 
        }  
    
    }
    static getById = async(id) => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                                .input('pid', sql.Int, id)
                                .query('SELECT * FROM Pizzas WHERE id = @pid')
                                
            return result.recordsets[0][0];
        } 
        catch (error) {
            console.log(error);
        }   
    }
    static insert = async(pizza) => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                                .input('pNombre', pizza.Nombre)
                                .input('pVegetariana', pizza.Vegetariana)
                                .input('pPrecio', pizza.Precio)
                                .input('pDescripcion', pizza.Descripcion)
                                .query('INSERT INTO Pizzas (Nombre, Vegetariana, Precio, Descripcion) VALUES (@pNombre, @pVegetariana, @pPrecio, @pDescripcion)')
            
        }
        catch (error) {
            console.log(error);
        }
    }
    static update = async(pizza) => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                                .input('pId', pizza.id)
                                .input('pNombre', pizza.Nombre)
                                .input('pPrecio', pizza.Precio)
                                .query('UPDATE Pizzas SET Nombre=@pNombre, Precio=@pPrecio WHERE id = @pId')
        }
        catch (error) {
            console.log(error);
        }
    }
    static deleteById = async(id) => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                            .input('pId', id)
                            .query('DELETE FROM Pizzas WHERE id = @pId')
        }
        catch (error) {
            console.log(error)  
        }
    }
}