// JavaScrip for imageEdit.html
//
// JavaScript to handle uploading a doc from file, converting to data URL through FileReader, then uploading to the HTML canvas tag
// This will allow the document to be uploaded and manipulated without affecting the original image.

document.addEventListener('DOMContentLoaded',  function() {
    console.log("DOMContentLoaded");
    let originalImageData; // Create a persistant variable for saving the original image. This is used later in the Reset button.
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const img = new Image();
    img.crossOrigin = "anonymous";
    let currentFilters = []; // create array for holding active filters
    let isFlippedVert = false; // track flipped status
    let isFlippedHoriz = false; // track flipped status

    let queryString = "";
    let isImageFromURL = false;
    loadImageFromURL(); // Call function to load image to canvas from URL


    // Pre-load image to canvas with picture carried from Search page and embedded in URL
    function loadImageFromURL (){
        // JS method to grab URL of image
        queryString = window.location.search.substring(1);
        if (queryString) {
            isImageFromURL = true;

            console.log(queryString);

            // load image onto canvas
            img.src = queryString;
            img.onload = function() {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            }
            console.log("image loaded from search page")
        }
    }

    // Manually upload image to the canvas
    document.getElementById('upload').addEventListener('change', function(event) {
        console.log("file uploaded");
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            img.onload = function() {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            }
            img.src = e.target.result;
        }
        reader.readAsDataURL(file);
        isImageFromURL = false;
    });


    // Apply multiple filters with button clicks.
    // Turn array into string with join().
    function updateFilters() {
        console.log('filters updated');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.filter = currentFilters.join(' ');
        console.log(currentFilters);
        redrawImage();
    };

    {// Code for filter buttons. Check array to avoid duplicates with include(). Add filters to array with push().
    // Grayscale
    document.getElementById('grayscale').addEventListener('click', function() {
        console.log("grayscale clicked");
        if (!currentFilters.includes('grayscale(100%)')) {
            currentFilters.push('grayscale(100%)');
        }
        updateFilters();
    });

    // Sepia
    document.getElementById('sepia').addEventListener('click', function() {
        console.log("sepia clicked");
        if (!currentFilters.includes('sepia(100%)')) {
            currentFilters.push('sepia(100%)');
        }
        updateFilters();
    });

    // Blur
    document.getElementById('blur').addEventListener('click', function() {
        console.log("blur clicked");
        if (!currentFilters.includes('blur(1px)')) {
            currentFilters.push('blur(1px)');
        }
        updateFilters();
    });

    // Brightness
    document.getElementById('brighten').addEventListener('click', function() {
        console.log("brightness clicked");
        if (!currentFilters.includes('brightness(110%)')){
            currentFilters.push('brightness(110%)');
        }
        updateFilters();
    });

    // Contrast
    document.getElementById('contrast').addEventListener('click', function() {
        console.log("contrast clicked");
        if (!currentFilters.includes('contrast(110%)')){
            currentFilters.push('contrast(110%)');
        }
        updateFilters();
    });

    // Hue rotate
    document.getElementById('hue').addEventListener('click', function() {
        console.log("hue clicked");
        if (!currentFilters.includes('hue-rotate(30deg)')){
            currentFilters.push('hue-rotate(30deg)');
        }
        updateFilters();
    });

    // Invert
    document.getElementById('invert').addEventListener('click', function() {
        console.log("invert clicked");
        if (!currentFilters.includes('invert(100%)')){
            currentFilters.push('invert(100%)');
        }
        updateFilters();
    });

    // Saturate
    document.getElementById('saturate').addEventListener('click', function() {
        console.log("saturate clicked");
        if (!currentFilters.includes('saturate(150%)')){
            currentFilters.push('saturate(150%)');
        }
        updateFilters();
    });
    }

    // Flip Vertically (up - down)
    document.getElementById('flipVertical').addEventListener('click', function() {
        console.log("flip vertical clicked");
        isFlippedVert = !isFlippedVert;
        redrawImage();
    })

    // Flip horizontally (left - right)
    document.getElementById('flipHorizontal').addEventListener('click', function() {
        console.log("flip Horizontal clicked");
        isFlippedHoriz = !isFlippedHoriz;
        redrawImage();
    })

    // Redraw the image based on scale and transformation states.
    function redrawImage(){
        ctx.save();
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Use booleans to apply image flip
        ctx.scale(isFlippedHoriz ? -1 : 1, isFlippedVert ? -1 : 1);   //condition ? value_if_true : value_if_false
        ctx.translate(isFlippedHoriz ? -img.width : 0, isFlippedVert ? -img.height : 0);

        ctx.drawImage(img, 0, 0);
        ctx.restore();
        console.log(currentFilters);
    }

    //Reset image function
    document.getElementById('reset').addEventListener('click', function(){
        console.log("image reset");
        console.log("filters reset");

        // Reset flipped states
        isFlippedVert = false;
        isFlippedHoriz = false;

        // Reset filters
        currentFilters = [];
        console.log(currentFilters);
        ctx.filter = "none";

        // Clear canvas and redraw image
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (isImageFromURL == false){
            ctx.putImageData(originalImageData, 0, 0);
        }
        else {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
    });

    // Download image button
    document.getElementById('d_load').addEventListener('click', function() {
        console.log("image downloaded");
        let canvasURL = canvas.toDataURL('image/jpeg');
        const createEl = document.createElement('a');
        createEl.href = canvasURL;
        createEl.download = "new_image";

        createEl.click();
        createEl.remove();
    });
});
