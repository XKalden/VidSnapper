# VidSnapper
JavaScript getUserMedia

```bash
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
```

<img src="./img.png">




