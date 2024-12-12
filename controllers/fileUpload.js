const File = require("../models/File");

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
        console.log("Issues in file Uploading!");
        console.log(error);
    }
}