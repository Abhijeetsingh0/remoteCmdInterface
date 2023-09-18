const mongoose = require('mongoose');


module.exports = async () =>{
    const dbName = 'myDB1';
    const dbUrl = `mongodb://172.26.163.173:27017/${dbName}`;
    mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        console.log(`Connected to MongoDB, DB name ${dbName}`);
      })
      .catch(error => {
        console.error('Error connecting to MongoDB:', error);
      });

}