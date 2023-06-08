import {
    ID
} from "appwrite";
import {
    storage,
    databases
} from "./appwriteconfig";
import {
    variables
} from "./variables";

function saveEditorDetails(gradient, shadow, radius, frameGap, imageId) {
    console.log("in saveEditors")
    console.log("gradientdetails", gradient)
    const promise = databases.createDocument(`${variables.APPWRITE_DATABASEID}`, `${variables.APPWRITE_COLLECTIONID}`, ID.unique(), {
        frameGap,
        radius,
        shadow,
        gradient: JSON.stringify(gradient),
        imageId
    });
    promise.then(function(response) {
        console.log(response);
    }, function(error) {
        console.log(error);
    });
}

function uploadImage(freezeStore) {
    console.log("hii")
    console.log(document.getElementById('fileUpload'))
    const promise = storage.createFile(variables.APPWRITE_BUCKETID, ID.unique(), document.getElementById("fileUpload").files[0]);
    promise.then(function(response) {
        console.log(response);
        const x = { ...freezeStore,
            imageURI: ""
        }
        console.log(x)
    }, function(error) {
        console.log(error);
    });
}

function listImages() {
    const promise = storage.listFiles(`${variables.APPWRITE_BUCKETID}`);
    promise.then(function(response) {
        console.log(response);
    }, function(error) {
        console.log(error);
    });
}

function getImage(fileId) {
    const promise = storage.getFile(`${variables.APPWRITE_BUCKETID}`, `${fileId}`);
    promise.then(function(response) {
        console.log(response);
    }, function(error) {
        console.log(error);
    });
}

function previewImage(fileId) {
    const result = storage.getFilePreview(`${variables.APPWRITE_BUCKETID}`, `${fileId}`);
    console.log(result); // Resource URL
}

function downloadImage(fileId) {
    const result = storage.getFilePreview(`${variables.APPWRITE_BUCKETID}`, `${fileId}`);
    console.log(result); // Resource URL
}

function updateImage(fileId) {
    const promise = storage.updateFile(`${variables.APPWRITE_BUCKETID}`, `${fileId}`);
    promise.then(function(response) {
        console.log(response); // Success
    }, function(error) {
        console.log(error); // Failure
    });
}

function deleteImage() {
    const promise = storage.deleteFile(`${variables.APPWRITE_BUCKETID}`, `${fileId}`);
    promise.then(function(response) {
        console.log(response); // Success
    }, function(error) {
        console.log(error); // Failure
    });
}
module.exports = {
    saveEditorDetails,
    uploadImage,
    listImages,
    getImage,
    previewImage,
    downloadImage,
    updateImage,
    deleteImage
};