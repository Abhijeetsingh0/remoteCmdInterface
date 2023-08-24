const mongoose = require('mongoose');


module.exports = () =>{
    const dbName = 'myDB1';
    const dbUrl = `mongodb://127.0.0.1/${dbName}`;
    mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        console.log(`Connected to MongoDB, DB name ${dbName}`);
      })
      .catch(error => {
        console.error('Error connecting to MongoDB:', error);
      });

}