const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ordersSchema = new Schema({
  date: {
    type: Date,
    default: Date.now()
  },
  order: {
    type: Number,
    required: true
  },
  list: [
    {
      name: {
        type: String,
      },
      quantity: {
        type: String,
      },
      cost: {
        type: String,
      }
    }
  ],
  user: {
    ref: 'users',
    type: Schema.Types.ObjectId
  },
})

module.exports = mongoose.model('orders', ordersSchema)