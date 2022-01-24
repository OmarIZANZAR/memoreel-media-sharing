const mongoose = require('mongoose')

const connOptions = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
}

const ConnectDB = async () => {
    return new Promise(async (resolve, reject)=>{
        try {
            const conn = await mongoose.connect(process.env.MONGODB_URI, connOptions)

            if( process.env.NODE_ENV === "production" ) {
                console.log(`- mongodb connected to db: ${conn.connection.name}...`)
            } else {
                console.log(`- mongodb connected to db: ${conn.connection.name}...`.green.bold.underline)
            }
            
            resolve(conn)
    
        } catch (error) {
            
            if( process.env.NODE_ENV === "production" ) {
                console.log('- mongodb connection error')
            } else {
                console.log('- mongodb connection error'.red.bold)
            }
            
            console.error(error)
            process.exit(1)
            // reject(error)
        }
    })
} 

module.exports = ConnectDB