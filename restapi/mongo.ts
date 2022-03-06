const mongoose = require('mongoose')

const connectionString = 'mongodb+srv://dede_es4b:dede_es4b_pass.DFSS@cluster0.v4ply.mongodb.net/shop?retryWrites=true&w=majority'

mongoose.connect(connectionString,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(() => {
        
}).catch((error: any) =>{
        console.error(error)
    })
