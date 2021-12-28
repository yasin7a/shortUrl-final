const router = require("express").Router();
const ShortUrl = require("../models/shortUrl");
const multer = require("multer");
const shortId = require("shortid");
const storeData = multer().any();

router.get("/", async (req, res) => {
  res.render("index");
});

router.post("/", storeData, async (req, res, next) => {
  let sUrl = new ShortUrl({
    fullUrl: req.body.fullUrl,
    shortUrl: shortId.generate(),
  });
console.log(shortId.generate());
  try {
    let shortUrls = await ShortUrl.exists({ shortUrl: sUrl.shortUrl });
    if (shortUrls) {
      next(null);
    } else {
      await sUrl.save();
      res.status(200).json({
        payload: sUrl.shortUrl,
      });
    }
  } catch (error) {
    res.status(500).json({
      payload: "server not found",
    });
    console.log(error);
  }
});
router.get("/:shortUrl", async (req, res, next) => {
  try {
    let shortUrls = await ShortUrl.findOne({ shortUrl: req.params.shortUrl });
    shortUrls.clicks++;
    await shortUrls.save();
    res.redirect(shortUrls.fullUrl);
  } catch (error) {
    next(null);
  }
});

router.get("/shortUrl", (req, res) => {
  res.redirect("/");
});
router.post("/shortUrl", storeData, async (req, res, next) => {
  try {
    let baseUrlPattern = /^https?:\/\/[a-z\:0-9.]+/;
    let url = req.body.shortUrl.trim();
    url = url.replace(baseUrlPattern.exec(url) + "/", "");
    let UrlINfo = await ShortUrl.findOne({ shortUrl: url });
    if (UrlINfo) {
      res.status(200).json({
        payload: UrlINfo,
      });
    } else {
      next(null);
    }
  } catch (error) {
    next(null);
  }
});

module.exports = router;
