
import dbConnection from '../configs/db.js';

async function getUserById(id) {

}

async function registerUser(username) {
const sql = 'INSERT INTO users (username) VALUES(?)'


 try{
    const [res] = await dbConnection.query(sql, [username])
    console.log(res)
    return 'created'
 }catch(err) {
    throw new Error('register error') 
 }
}

export {
    registerUser
}