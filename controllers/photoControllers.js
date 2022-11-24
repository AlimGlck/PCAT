const Photo = require('../models/Photo');
const fs = require('fs');
  
  exports.getAllPhotos = async (req, res) => {
    const photos = await Photo.find({});
    res.render('index', {
      photos,
    });
  }

  exports.getSinglePhoto = async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    res.render('photo', {
      photo,
    });
  } 

  exports.photoUpload = async (req, res) => {
    const uploadDir = 'public/uploads';
  
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
  
    let uploadImage = req.files.image;
    let uploadPath = process.cwd() + '/public/uploads/' + uploadImage.name;
  
    uploadImage.mv(uploadPath, async () => {
      await Photo.create({
        ...req.body,
        image: '/uploads/' + uploadImage.name,
      });
      res.redirect('/');
    });
  }

  

  exports.photoUpdate = async (req,res) => {
    const photo = await Photo.findOne({_id:req.params.id});
    photo.title= req.body.title;
    photo.description = req.body.description;
    await photo.save();
    res.redirect('/photo/'+req.params.id);
    }

    exports.photoDelete = async (req, res) => {
        const photo = await Photo.findOne({_id:req.params.id});
        let deletedImage = process.cwd() + '/public' +photo.image;
        fs.unlinkSync(deletedImage);
        await Photo.findByIdAndRemove(req.params.id);
        res.redirect('/');
        
      }