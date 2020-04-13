//using mongoose npm library other than mongodb directly
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology : true
})
