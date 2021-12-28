const { Schema, model } = require("mongoose");
const shortId = require("shortid");


const shortUrlSchema = Schema({
  fullUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
});

const ShortUrl = model("ShortUrl", shortUrlSchema);
module.exports = ShortUrl;
