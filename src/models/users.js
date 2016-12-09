import mongoose, { Schema } from 'mongoose';

export default mongoose.model('Users', new Schema({
  name: String,
  email: String,
  password: String,
  city: String,
  state: String,
  ownBooks: Array,
  outboundTradeRequests: Array,
  inboundTradeRequests: Array,
}));