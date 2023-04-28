import { config } from "./../dbconfig.js"
import  sql  from "mssql"


export class PizzaService {
    static getAll = async() => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                                .query('SELECT * FROM Pizzas')
            return result.recordsets[0][0];
        }
        catch (error) {
            console.log(error); 
        }
        
    }
}