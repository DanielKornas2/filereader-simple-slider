const inputUploader = document.getElementById("inputUploader");
const imageContainer = document.getElementById("imageContainer");
const clearPage = document.getElementById("clearPage");



// main function to read data which user sent
// fileSource - when user click and add files - it'll be inputUploader.files but when drag images - e.dataTransfer.files - thats why i need here an argument
const readData = (fileSource) => {

    for (let i = 0; i < fileSource.length; i++) {
        // new FileReader instance . Avaliable methods - https://developer.mozilla.org/en-US/docs/Web/API/FileReader#Methods
        const fileReader = new FileReader();

        fileReader.onload = () => {
            const newImage = new Image();

            // .result - returns the file's contents
            newImage.src = fileReader.result;
            imageContainer.appendChild(newImage);
        }

        // URL representings the file's data 
        fileReader.readAsDataURL(fileSource[i]);
    }

}


// read data when user choose file by click and select
inputUploader.addEventListener("change", () => {
    // inputUploader.files - returns an array of all uploaded files with lastMofifiedDate prop, size, name etc
    readData(inputUploader.files);
})

document.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
}, false)

// drop event - instead of input files shoud be dataTransfer.files on event
document.addEventListener('drop', (e) => {
    e.preventDefault();
    e.stopPropagation();
    readData(e.dataTransfer.files);
}, false)

clearPage.addEventListener('click', ()=>{
    imageContainer.innerText = "";
})