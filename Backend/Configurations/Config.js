const mongoose=require('mongoose')
const dotenv=require('dotenv').config({quiet:true});

const connectionDataBase=async()=>{
    try {
        const data=await mongoose.connect(process.env.DATABASEURL,{dbName:process.env.DATABASENAME});
        console.log(`DataBase connected sucessfully done on ${process.env.DATABASENAME} database`)
    } catch (error) {
        console.log(`DataBase connection issue  on ${process.env.DATABASENAME} database`)
    }
}
const dataBase=connectionDataBase();
module.exports=dataBase