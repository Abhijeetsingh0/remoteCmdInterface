const mongoose = require('mongoose');

module.exports = async () =>{
    const dbName = 'myDB1';
    const dbUrl = `mongodb://${process.env.DB_IP}:${process.env.DB_PORT}/${dbName}`;
    mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        console.log(`Connected to MongoDB, DB name ${dbName}`);
      })
      .catch(error => {
        console.error('Error connecting to MongoDB:', error);
      });
}

//docker run --name mongodb -d  --restart always -p 27017:27017 mongodb/mongodb-community-server
