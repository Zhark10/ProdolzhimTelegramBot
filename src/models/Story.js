import mongoose from 'mongoose'

const StorySchema = mongoose.Schema({
  title: {type: String, required: true},
  text: {type: String, required: true},
  category: {type: String, required: true},
  stepSize: {type: Number, required: true},
})

export const Story = mongoose.model('Story', StorySchema)