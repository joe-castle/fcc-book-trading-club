import { Schema, model } from 'mongoose';

const usersSchema = new Schema({
  name: String,
  email: String,
  password: String,
  city: String,
  state: String,
  outboundTradeRequests: Array,
  inboundTradeRequests: Array,
});

export default model('Users', usersSchema);