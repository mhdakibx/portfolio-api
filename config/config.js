import dotenv from 'dotenv'

dotenv.config()

if(!process.env.PORT){
    throw new Error("PORT Not Defined in Invironment Variable ");
}

if(!process.env.MONGO_URI){
    throw new Error("MONGO_URI Not Defined in Invironment variable");
}

if(!process.env.JWT_SECRET){
    throw new Error("JWT_SECRET Not Defined in Invironment variable");
}

if(!process.env.IMAGEKIT_PRIVATE_KEY){
    throw new Error("IMAGEKIT_PRIVATE_KEY Not Defined in Invironment variable");
}


const config = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY
}

export default config