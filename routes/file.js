const router = require('express').Router();
const multer = require('multer');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const uri = process.env.ATLAS_URI;

// set up connection to db for file storage
const conn  = mongoose.createConnection(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
let gfs;

conn.once('open', () => {
  // initialize stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('images');
});

const storage = require('multer-gridfs-storage')({
  url: uri,
  file: (req, file) => {
    return {
          filename: file.originalname,
          bucketName: 'images'
    }
  }
});
 
// sets file input to single file
const singleUpload = multer({ storage: storage }).single('file');
router.route('/files')
        .get((req, res, next) => {
            gfs.files.find().toArray((err, files) => {
                if (!files || files.length === 0) {
                    return res.status(200).json({
                        success: false,
                        message: 'No files available'
                    });
                }

                files.map(file => {
                    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png' || file.contentType === 'image/svg') {
                        file.isImage = true;
                    } else {
                        file.isImage = false;
                    }
                });

                res.status(200).json({
                    success: true,
                    files,
                });
            });
        });
router.route('/files/:filename').get( (req, res) => {
  gfs.files.find({ filename: req.params.filename }).toArray((err, files) => {
    if(!files || files.length === 0){
      return res.status(404).json({
        message: "Could not find file"
      });
    }
    var readstream = gfs.createReadStream({
      filename: files[0].filename
    })
    res.set('Content-Type', files[0].contentType);
    return readstream.pipe(res);
  });
});
router.post('/files', singleUpload, (req, res) => {
  if (req.file) {
    return res.json({
      success: true,
      file: req.file
    });
  }
  res.send({ success: false });
});
router.delete('/files/:id', (req, res) => {
  gfs.remove({ _id: req.params.id }, (err) => {
    if (err) return res.status(500).json({ success: false })
      return res.json({ success: true });
    });
});
module.exports = router;