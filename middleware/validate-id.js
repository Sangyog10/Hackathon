const mongoose=require('mongoose')
const validateMongodbId = (id) => {
    const isvalid = mongoose.Types.ObjectId.isValid(id);
    return isvalid;
  };

module.exports={validateMongodbId}