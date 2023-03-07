const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin2022:S00191229@cluster0.ixdwjf1.mongodb.net/myroutes?retryWrites=true&w=majority', (err)=> {
    if(err) {
        console.log('Conection has ended with error '+ err);
    } else {
        console.log('Connection is successful');
    }
});

module.exports = mongoose;