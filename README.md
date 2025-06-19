# Image search, filter, and download
#### Video Demo:  https://youtu.be/YqqmSn1Ruvc
#### Description: A web page that will allow the user to search for an image, then open the image in another page that will allow the user to apply filters and save a copy of the picture.

## Intro
Welcome to my readme file for my **Image search, filter, and download** project, this project being the Final Project for my CS50 course.
This project allows the user to search for an image, open the image in an editor, apply filters, and then download the image. The image search is performed using the API provided by Unsplash.com.
When creating this project I followed a simple plan that laid out the scope of the project, written out in dot points. The aim of which was to prevent 'scope creap', causing this project to take longer due to me adding additional features without getting closer to a finished product.
My plan was to create an Minimum Viable Product (MVP) for each section to ensure the project is functional, while also being interesting and complex enough to qualify for my Final Project. Once confident in the MVP I would add extra features, and improve the look with CSS.

## Files
The following is a description of each file, how I wrote them, any challenges I faced whilst writting them, and any significant learnings I gained while working on these files. I wrote this section by pairing the HTML and JavaScript files together as each file informs the other.
### `index.html` and `apiScript.js`
#### What it does
This page allows the user to input and execute a search term, and the page will display 12 images related to the search term. The user can click the 'Show More' button below the images to display further images. This button only displays after the initial image search. The page initially displays thumbnails of each image. When an image is clicked, a modal will pop-up and display the full image, along with the image title and the photographer that took the image. While the modal is displayed, the user can click 'X' or 'Close' to close the modal, or click 'Select' to open a new page for applying filters to the selected image.

#### How I wrote it
As I was unfamiliar with using external APIs, I started by following a tutorial titled 'How To Create Image Search Engine Using HTML CSS and JavaScript' by GreatStack on YouTube. This tutorial teaches how to create a page that displays thumbnails loaded from the Unsplash API. By following along with this tutorial I was able to learn how a website that uses an API is built. Once complete, I could research the code I had that I didn't understand, and even ask further questions with the CS50 AI to ensure I had a full understanding of the site, what each line does, and why. After I had learnt how to request and use data from this API I removed the portions of the code I did not want or need, and proceeded to add my own alterations and expansions to this page to further suit the needs of my project.

Here are some of the alterations and additions I made after the tutorial:
- I added a zoom and shadow effect on the thumbnail pictures when the user mouses over them.
- The thumbnails displayed on this page were clickable links that led to the image's page within the Unsplash website. I changed this behaviour so that when a user clicks an image, a pop-up modal will appear instead. This modal featured:
    - buttons for closing the modal, and opening the image in the image filter site
    - a full resolution version of the image, taken from the API
    - the title and photographer of the image, taken from the API

This page takes a keyword as input, and feeds this keyword back to the Unsplash API. The 'fetch' command is used to receive an asynchronous response of a JSON file containing an array related to that keyword. This array would feature 12 lines of information, each line concerned with an image from the Unsplash website. The .map method is used to iterate over each line of the results and create a clickable link displaying a small version of the image, and append that to the search results element (small image is used here to allow all images to load quickly for the user). This would ultimately display 12 image thumbnails to the user after searching for a keyword. The 'Show More' button will display after a search has been performed and would initiate another search for 12 more images, which would be appended to the bottom of the first search results. This button can be clicked multiple times.

If the user clicks on a thumbnail a pop-up modal will appear, displaying a full resolution image so the user can see all image details. This modal would display the picture's title and photographer at the top. The modal also has an 'X' button and 'Close' button (both would close the modal) and a 'Select' button. Clicking the select button would open the Image Filter site, and display the selected image. This works by adding the image URL to the end of the Image Filter page, then opening the resulting URL. Adding the image URL to the Image Filter URL allows the Image Filter page logic to grab the image URL and load it.

#### Challenges
While I followed a tutorial to build part of this page, the tutorial did not go into great detail as to how and why certain decisions were made, and what each line of code is doing. As such I spent a lot of time researching the JavaScript code, and asking the CS50 AI duck questions so I could learn what was happening. This understanding was paramount in allowing me to update the page to suit the project.

Another challenge was working out how to send the selected image to the Image Filter page. I did not want to create a system that would necessitate downloading the image directly to the users computer. I had also not used a web framework to build this project. So I set up the sites so the image URL is appended to the URL for the Image Filter page. This way the image filter page can access the image by accessing the image URL within the main URL.

#### Key learnings
- How to implement and customise a modal pop-up.
- A site like this features links with images attached, not images that have links attached.
- How to implement paragraph elements that change their text based on API data.
- Making an API request using 'fetch' along with API keys and custom elements with the request URL.
- Catching and storing API data returned as a JSON object.
- Using the .map method to iterate over elements in an array and apply a function to each one.
- How simple the HTML for a page like this can be, because all the images are part of an array displayed within a single container.


### `imageEdit.html` and `imageScript.js`
#### What it does
This page will load and display an image. The user can click on buttons on the left hand menu to apply filters to the image and flip the image. The user can also click the 'Reset image' button to undo all changes and begin again with a fresh, un-edited image. Clicking the 'Back to image search' button will return the user to the previous screen and search for a new image. The user can also upload their own image from their computer if they wish, by using the 'Upload from file'. There is a 'Download Image' button that will allow the user to download the image displayed, with applied filters, to their computer.

#### How I wrote it
This page reads the image URL data that has been added to the end of the pages own URL by the Image Search page. This image URL is then used as the image source and uploaded to a canvas element. I also implemented a function to allow an image to be loaded from the user’s computer. This was both to allow the user to apply filters to their own image, and to assist with testing this page because this page was written first, and I did not have the Image Search page to feed this Filter Page an image.

JavaScript methods are used to apply filters to the canvas context directly. This means the actual pixel data of the image is manipulated directly so the updated image can be downloaded as displayed. This method was used as an alternative to CSS styles which would have altered the image on the screen but not the actual file that would be downloaded, giving the user an unchanged picture.

The filters that are applied to the canvas are tracked within an array called currentFilters. Each time a filter button is clicked, the associated function checks if the array contains that filter name already, and if that name is not found, uses the .push method to add the filter name to that array, then calls the updateFilters function. In JavaScript, you can apply multiple CSS filters to an image by chaining them together in a single string; utilising this fact, the updateFilters function uses the .join method to turn the currentFilters array into a string, then redraws the image with the filters string applied to the canvas context.

Whether the image has been flipped horizontally or vertically is tracked with Boolean values. When the buttons for flipping an image are clicked, these booleans are switched and another function for redrawing the image is called. Within the redraw function the .scale and .translate methods are used in conjuction with the booleans to draw the image flipped or not. The functions created for flipping the image do not alter the array of filters, so the image will be redrawn with any current filters the user has set.

The reset button clears the canvas of all pixel data, clears the filter array and the canvas context, then redraws the original image back onto the canvas and saves it as the current image. This original image is saved as a separate backup when the image is first loaded onto the canvas for this purpose.

When clicking the download image button, the JavaScript code creates a temporary link element with the canvas image's data as its URL, and then programmatically clicks the link to trigger the download.

#### Challenges
Learning how to use a canvas element took some time. While it initially appeared as a simple container to hold an image and allow basic image manipulation, I had to constantly remind myself and rewrite code to utilise the canvas context, not the canvas directly (more on this below). Another challenge with building this site is that I was forced to use JavaScript to modify images on the canvas instead of applying CSS styles because JavaScript would actually update the pixel data of the image, allowing a modifies image to be downloaded. Whereas applying CSS filters to the canvas would only modify the display, not the image directly.

My early code for applying filters to the canvas featured the idea of using a string to track filters instead of an array like now. Each button function updated the filters string based on booleans that tracked whether the associated button had been clicked. If a button is clicked, the filter is added to the string. This had the unintended outcome of duplicating the filters each time the string containing the filters was updated, because the booleans were still 'true' when the string was re-called to re-draw the image. To fix this issue, and make the code more efficient, I abstracted out the function to draw the image. So each button click would now add the filter name to an array using .push, then call the same function to redraw the image.

My original code for flipping the image horizontally and vertically was split into two, long, seperate functions. Each code used 4 if statments to check booleans for which orientation to draw the image and whether it had flipped already. To make this code more efficient I abstracted out the function for drawing the image, and created a seperate event listener for each button that would update a boolean and then called the image drawing function. This image drawing function used the .scale() and .rotate() methods to move the image origins and then draw backwards, upsidedown, or both, with the booleans deciding the origins and draw direction.

#### Key learnings
**Canvas element**
- The canvas element is mostly just a container for the image. There exists an object called the 'context' of the canvas which provides the methods and properties for drawing on the canvas.
- The canvas context also carries the persistent canvas state, including scale and filter data. These states had to be reset after setting to avoid having my code reapply them each time I called any function to draw the image. Many function save the canvas context, and then restore canvas context after applying transformations to ensure that the next transformation is applied correctly.
- I had to re-write code when I realised all my filters were being applied to the canvas, not the image within the canvas. This lead to me realising I could create one function to update the ctx.filter and having all the buttons control boolean values that added filters to the ctx.filter function.

**JavaScript**
- I found the Ternery Operator while working on my image flip functions. This code is basically shorthand for an if/else statement. (condition ? value_if_true : value_if_false)
- Using back-slashes (`) instead of commas (') for a line string allows JavaScript to use ${} notation to insert variables.
- Up until this project, I had included functions within event listeners. While coding this project I learnt, or was reminded of the fact, that a function will not execute unless called. So I had to include code to call a function after actually coding it.
- Learning about the push(), join(), and includes() methods to update the array of filters applied to the canvas element. The CS50 AI suggested these methods and it helped make my code much more efficient.
- To create code to download the image from the canvas with a button click I had to write a function that creates a link (or anchor) to download the image, clicks the link, then removes the link.
- Other HTML elements can be created in JavaScript using the createElement method to avoid needing to create these elements in HTML.


### `projectStyle.css`
#### What it does
This is the page for styling both pages of this project. For the image search page, this CSS features styling to make the form look like an appealing search box, places search results in a grid, and ensures the Show More button is not shown until a search has been performed. For the image filter page, the page is styled to have filter buttons listed on the left, while buttons that change the actual image are on top. The image is shown in a container in the middle of the screen.

#### How I wrote it
The initial CSS page was created when following a tutorial for part of the image search page. From there I expanded by making adjustments such as selecting my own colour scheme and making the images expand and have a shadow when the mouse is hovering over them. I also added styles to the pop-up modal, so it's background and button colour scheme matched the main theme.
For the image filter site, I pushed the filter buttons into a column on the left, placed the other buttons to the right within a div up the top of the page, had the canvas container placed in the center of the page and selected a background that had a lighter colour to draw focus to the image placed within.

#### Challenges
I had to re-write my HTML containers for my image filter site so I could then move and style the page appropriately with CSS. My first basic page had all elements jumbled together so I could focus on function.

To have a button that allowed the user to upload their own image, I needed the user to activate an input element on the image filter screen. I was not able to style the input element to match the other buttons. A workaround I used was to hide the input element, and add a label element, styled to look like the other buttons, and have this label point to and activate the input element.

CSS uses hexadecimal values for it's colours. To find and input the colours I wanted, I experimented on a website (https://mdigi.tools/color-shades) to convert what I liked into hexidecimal, and then iterate based on how well the colour looked on the page.

#### Key learnings
- When writing HTML, is it important to do so with a view towards organised containers to facilitate styling later on.
- Forms, anchors, and other elements can often be styled to look and function like buttons with a mix of JavaScript and CSS if actual HTML button elements won't suit what is being made.
    - One exception is input elements. These can not easily be styled to look like buttons and as such benefit from having a label element activate the input element when clicked, and styling the label as a button.

