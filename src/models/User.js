import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  currentHistoryId: {type: String, required: false},
})

export const User = mongoose.model('User', UserSchema)