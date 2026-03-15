const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
  token:
   { 
    type: String, 
    required: [true, 'Token is required to be added to the blacklist']
}
},
  { timestamps: true }
);

const Blacklist = mongoose.model('Blacklist', blacklistTokenSchema);

module.exports = Blacklist;