const express = require("express");
const router = express.Router();
const multer = require("multer");
const dotenv = require("dotenv");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");


const crypto = require("crypto");
const sharp = require("sharp");

const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

dotenv.config();

const storage = multer.memoryStorage();
const upload = multer({storage:storage});

const accessKeyIds =  process.env.S3_ACCESS_KEY
const secretAccessKeys= process.env.S3_SECRET_KEY
const bucketRegion= process.env.S3_BUCKET_REGION
const bucketName = 'ecommerce-thunk'

const s3 = new S3Client({
        credentials : {
          accessKeyId : accessKeyIds,
          secretAccessKey : secretAccessKeys
        },
        region : bucketRegion
})
      

const { newProduct, 
        getProducts, 
        getSingleProduct,
        updateProduct, 
        deleteProduct,
         }  
        = require ('../controllers/productController');
        


router.route('/products').get(getProducts);

// router.route('/products/search/:keyword').get(getProducts);

router.route('/products/:id').get(getSingleProduct);

router.route('/admin/product/:id').put(updateProduct).delete(deleteProduct);


//====================================================================================
// new product route
router.route("/product/new").post(upload.single("image"), async (req, res) => {
        console.log("req.file", req.file)
        console.log("req.body", req.body)

// const  buffer = await sharp(req.file.buffer).resize({height: 1920, width: 1080, fit:"contain"}).toBuffer()

    let imageName = randomImageName()

        const params = {
          Bucket : bucketName,
          Key: imageName,
          Body : req.file.buffer,
          ContentType : req.file.mimetype
        }
    
        const command = new PutObjectCommand(params)
         
        await s3.send(command);

        const imageUrl = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${imageName}`;

         // Generate a pre-signed URL for the image
//   const getObjectParams = {
//         Bucket: bucketName,
//         Key: imageUrl,
//         Expires: 3600 // Set the expiration time (in seconds)
//       }

//       const signedUrl = await getSignedUrl(s3, new GetObjectCommand(getObjectParams));

    req.body.image = imageUrl;

    await newProduct(req, res);
    return;
},  newProduct);

module.exports = router;