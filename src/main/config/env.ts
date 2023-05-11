export default {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://localhost:27017/clean-node-api',
  port: process.env.PORT ?? 3000,
  jwtScret: process.env.JWT_SECRET ?? 'jv987==JH5'
}
