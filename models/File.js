const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    }
});

// Post Middleware
fileSchema.post("save", async function(doc) {
    try{
        console.log("DOC",doc)

        // Transporter
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth:{
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        // Send Mail
        let info = await transporter.sendMail({
            from:`Veepanshu Kasana`,
            to: doc.email,
            subject: "File Uploaded",
            html: `<h2>Hello Jee</h2> <p>New File Uploaded on Cloudinary, View here: <a href="${doc.imageUrl}">${doc.imageUrl}</a> </p>`,
        })

        console.log("INFO", info);
    }
    catch(error){
        console.log(error);
    }
})

const File = mongoose.model("File", fileSchema);
module.exports = File;