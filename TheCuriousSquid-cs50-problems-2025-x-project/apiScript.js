// JavaScrip for index.html

const accessKey = "0zYaB6Z_oEU-B6O9smAROo-IbbVkNeufyXjyOy5KpwQ";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");
const selectBtn = document.getElementById("selectBtn");

let keyword = "";
let page = 1;

// Constants for linking and opening the image filter page
let selectedImage = "";
const filterURL = "https://shiny-space-spork-g4xjprrxjg76cjw9-8080.app.github.dev/imageEdit.html";

// Make request to Unsplash API for image data
async function searchImages(){
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    // Access API data received in JSON format and convert into a JavaScript object
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    // Clear searchResult container in preparation for displaying new images.
    if(page === 1){
        searchResult.innerHTML = "";
    }

    const results = data.results;

    // Run through 'results' array (created ^), turn each image into a clickable link
    results.map((result) =>{
        const image = document.createElement("img");
        image.src = result.urls.small;

        const fullImage = document.createElement("img");
        fullImage.src = result.urls.full;

        const description = document.createElement("p");
        description.textContent = result.alt_description;

        const author = document.createElement("p");
        author.textContent = result.user.name;

        searchResult.appendChild(image);

        // Create pop-up modal when an image is clicked
        image.addEventListener('click', function (event) {
            event.preventDefault();
            const modalImage = document.getElementById('modalImage');
            modalImage.src = fullImage.src;

            const modalDesc = document.getElementById('modalDesc');
            const title = description.textContent;
            modalDesc.textContent = `Title: ${title}`;

            const modalName = document.getElementById('modalName');
            const name2 = author.textContent;
            modalName.textContent = `By: ${name2}`;

            const imageModal = new bootstrap.Modal(document.getElementById('imageModal'));
            imageModal.show();

            selectedImage = modalImage.src;
            console.log(selectedImage);
        })
    })
    showMoreBtn.style.display = "block";
}

// Perform search on button click, reset images to page 1 of new search
searchForm.addEventListener("submit", (e) =>{
    e.preventDefault();
    page = 1;
    searchImages();
})

// Click event on Show More button
showMoreBtn.addEventListener("click", ()=>{
    page++;
    searchImages();
})

// Send image URL to Filter page, open filter page
selectBtn.addEventListener("click", ()=>{
    const buttonLink = document.createElement("a");
    buttonLink.href = `${filterURL}?${selectedImage}`;
    buttonLink.target = "_blank";
    window.open(buttonLink.href);
})

