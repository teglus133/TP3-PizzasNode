import { config } from "./../dbconfig.js"
import  sql  from "mssql"


export class PizzaService {
    static getAll = async() => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                                .query('SELECT * FROM Pizzas')
            return result.recordsets;
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

    }
}