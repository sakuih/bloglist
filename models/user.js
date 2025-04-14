const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    /*
    validate: {
      validator: async function (value) {
        const user = await mongoose.models.User.findOne({username : value})
        if (user) {
          const error = new mongoose.Error('Username already exists')
          error.status = 400
          throw error
        }
        return true
      },
      message: 'Username already exists'
    },
    */
  },
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  },
  virtuals: true
})

//userSchema.set('toObject', {virtuals : true})

/*
userSchema.virtual('blog', {
  ref: 'Blog',
  localField: 'id',
  foreignField: 'author',
  justone: false
})
*/
const User = mongoose.model('User', userSchema)

module.exports = User

