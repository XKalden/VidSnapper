//Gobal Var
let width = 500,
    height = 0,
    filter = 'none',
    streaming = false;

// DOM Elements
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photos = document.getElementById('photos');
const photoButton = document.getElementById('photo-button');
const clearButton = document.getElementById('clear-button');
const photoFilter = document.getElementById('photo-filter');

// Get Media Stream 
navigator.mediaDevices.getUserMedia({video: true, auto: false})
.then(function(stream){
    // Link to the video source
    video.srcObject = stream;
    // Play video
    video.play();
})
.catch(function(err){
    console.log(`Error: ${err}`);
});

// Play when ready
video.addEventListener('canplay', function(e){

    if(!streaming){
        height = video.videoHeight / (video.videoWidth / width);
        
        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        streaming = true;
    }
}, false);

// Photo Button evnets
photoButton.addEventListener('click',function(e){
    takePicture();
    e.preventDefault();
}, false);


//Filter Event
photoFilter.addEventListener('change', function(e){
    // Set Filter to options
    filter = e.target.value;
    
    // Set filter to video
    video.style.filter = filter;
    e.preventDefault();

});

//clear event
clearButton.addEventListener('click', function(){
    photos.innerHTML = '';

    filter = 'none';
    video.style.filter = filter;

    //Reset Select list
    photoFilter.selectedIndex = 0;

})


// Take Pic form canvas
function takePicture(){
    // create canvas
    const context = canvas.getContext('2d');
    if(width && height){
        // Set canvas props
        canvas.width = width;
        canvas.height = height;

        //Draw an image of the video on the canvas 
        context.drawImage(video, 0, 0, width, height);

        // Create image form the canvas
        const imgUrl = canvas.toDataURL('image/png');
        
        // Create image element
        const img = document.createElement('img');

        // Set Img src
        img.setAttribute('src', imgUrl);

        // Set img filter 
        img.style.filter = filter;

        // Add img to photo
        photos.appendChild(img);

    }
}

