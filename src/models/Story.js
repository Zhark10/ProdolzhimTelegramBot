import mongoose from 'mongoose'

const StorySchema = mongoose.Schema({
  title: {type: String, required: true},
  text: {type: String, required: true},
  category: {type: String, required: true},
  stepSize: {type: Number, required: true},
  limitStory: {type: Number, required: true},
  showAllStory: {type: Boolean, required: true},
})

export const Story = mongoose.model('Story', StorySchema)