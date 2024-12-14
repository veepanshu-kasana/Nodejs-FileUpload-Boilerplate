const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

// LocalFileUpload -> Handler Function
exports.localFileUpload = async(request,response) => {
    try {
        // Fetch file from request
        const file = request.files.file;
        console.log("File agyi hai -> ",file);

        // Create path where file need to be stored on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;

        // Add path to the move function
        file.mv(path, (error) => {
            console.log(error);
        })

        // Create a successful response
        response.json({
            success:true,
            message:'Local File Uploaded Successfully',
        });
    }
    catch(error) {
        console.log("Issues in localFile uploading!");
        console.log(error);
    }
}

function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality) {
    const options = {folder};

    if(quality){
        options.quality = quality;
    }
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async(request,response) => {
    try {
        // Data Fetch
        const {name,tags,email} = request.body;
        console.log(name,tags,email);

        const file = request.files.imageFile;
        console.log(file);

        // Validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return response.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }

        // File formated supported hai
        console.log("Uploading to KasanaJee");
        const responseData = await uploadFileToCloudinary(file, "KasanaJee");
        console.log(responseData);

        // DB mai entry save krni hai
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:responseData.secure_url,
        });

        response.json({
            success:true,
            imageUrl:responseData.secure_url,
            message:'Image Successfully Uploaded',
        })
    }
    catch(error) {
        console.error(error);
        response.status(400).json({
            success:false,
            message:'Something went wrong!',
        });
    }
}

exports.videoUpload = async(request,response) => {
    try {
        // Data Fetch
        const {name,tags,email} = request.body;
        console.log(name,tags,email);

        const file = request.files.videoFile;

        // Validation
        const supportedTypes = ["mp4", "mov"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type", fileType);

        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return response.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }

        // File formated supported hai
        console.log("Uploading to KasanaJee");
        const responseData = await uploadFileToCloudinary(file, "KasanaJee");
        console.log(responseData);

        // DB mai entry save krni hai
        const fileData = await File.create({
            name,
            tags,
            email,
            videoUrl:responseData.secure_url,
        });

        response.json({
            success:true,
            videoUrl:responseData.secure_url,
            message:'Video Successfully Uploaded',
        })
    }
    catch(error) {
        console.error(error);
        response.status(400).json({
            success:false,
            message:'Something went wrong!',
        });
    }
}

// ImageSizeReducer
exports.imageSizeReducer = async(request,response) => {
    try {
        // Data Fetch
        const {name,tags,email} = request.body;
        console.log(name,tags,email);

        const file = request.files.imageFile;
        console.log(file);

        // Validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return response.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }

        // File formated supported hai
        console.log("Uploading to KasanaJee");
        const responseData = await uploadFileToCloudinary(file, "KasanaJee", 30);
        console.log(responseData);

        // DB mai entry save krni hai
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:responseData.secure_url,
        });

        response.json({
            success:true,
            imageUrl:responseData.secure_url,
            message:'Image Successfully Uploaded',
        })
    }
    catch(error) {
        console.error(error);
        response.status(400).json({
            success:false,
            message:'Something went wrong!',
        });
    }
}