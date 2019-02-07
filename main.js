const inputUploader = document.getElementById("jsInputUploader");
const imageContainer = document.getElementById("jsImageContainer");
const successMessage = document.getElementById('jsTextBox');
const clearPage = document.getElementById("jsClearPage");
const imageControls = document.getElementById("jsImageControls");
const prev = imageControls.querySelector("#jsPrev");
const next = imageControls.querySelector("#jsNext");

let numberOfUploads = 0;
let sliderPhotos = 0;

// main function to read data which user sent
// fileSource - when user click and add files - it'll be inputUploader.files but when drag images - e.dataTransfer.files - thats why i need here an argument
const readData = (fileSource) => {

    numberOfUploads++;
    sliderPhotos = sliderPhotos + fileSource.length;

    for (let i = 0; i < fileSource.length; i++) {
        // new FileReader instance . Avaliable methods - https://developer.mozilla.org/en-US/docs/Web/API/FileReader#Methods
        const fileReader = new FileReader();

        fileReader.onload = () => {
            const newImage = new Image();

            // .result - returns the file's contents
            newImage.src = fileReader.result;

            if (numberOfUploads === 1 && i === 0) {
                //fist image should be visible only in 1st image upload
                newImage.classList.add("visible");
            }

            imageContainer.appendChild(newImage);
        }

        // URL representings the file's data 
        fileReader.readAsDataURL(fileSource[i]);
    }

    if (!imageControls.classList.contains("show") && sliderPhotos > 1) {
        imageControls.classList.add("show");
    }

    successMessage.innerText = `Success! You've just added ${fileSource.length} ${fileSource.length===1 ? 'photo' : 'photos'}. Your super slider consists of ${sliderPhotos} ${sliderPhotos===1 ? 'photo' : 'photos'}. Upload more! :)`
}

const changeImage = () => {

    let imageIndex = 0;

    next.addEventListener("click", () => {
        imageIndex++;
        const maxImageIndex = imageContainer.querySelectorAll("img").length;

        imageContainer.querySelectorAll("img")[imageIndex - 1].classList.remove("visible")
        if (imageIndex === maxImageIndex) {
            imageIndex = 0;
        }
        imageContainer.querySelectorAll("img")[imageIndex].classList.add("visible");
    })

    prev.addEventListener("click", () => {
        imageIndex--;
        const maxImageIndex = imageContainer.querySelectorAll("img").length;

        imageContainer.querySelectorAll("img")[imageIndex + 1].classList.remove("visible")
        if (imageIndex === -1) {
            imageIndex = maxImageIndex - 1;
        }
        imageContainer.querySelectorAll("img")[imageIndex].classList.add("visible");
    })


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

clearPage.addEventListener('click', () => {
    imageContainer.innerText = "";
    numberOfUploads = 0;
    imageControls.classList.remove("show");
    successMessage.innerText = "Select or drag images."
})

changeImage();