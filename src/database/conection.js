import mongoose from 'mongoose'

const dbconection = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSEDB_URI)
    console.log('✔ DB Connected')
  } catch (error) {
    console.log('❌ DB Connection Error:', error)
  }
}

export default dbconection
