const {Client} = require('pg')

const client =  new Client({
    host:"petconnect-instance-1.cofkqdav0xcm.eu-west-1.rds.amazonaws.com", 
    user:"postgres", 
    port:5425, 
    password: "admin2022", 
    database: "petconnect"
})

client.connect(); 

client.query(`select * from public."PetOwnerTBL"`, (err, res)=>{
    if(!err){
        console.log(res.rows);
    }else{
        console.log(err.message);
    }
    client.end; 
})

// client.query(`insert into public.pet values('Rex')`, (err, res)=>{
//     if(!err){
//         console.log(res.rows);
//     }else{
//         console.log(err.message);
//     }
//     client.end; 
// })

// client.query(`create table test (Name varchar(25)) `, (err, res)=>{
//     if(!err){
//         console.log(res.rows);
//     }else{
//         console.log(err.message);
//     }
//     client.end; 
// })


