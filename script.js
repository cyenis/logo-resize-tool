document.getElementById('upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            // Fetch the maximum dimension from user input
            const maxDim = parseInt(document.getElementById('maxDim').value, 10) || 500;
            const minDim = parseInt(document.getElementById('minDim').value, 10) || 500; // This value is currently not used in resizing

            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');

            let width = img.width;
            let height = img.height;

            // Calculate the scaling factor to maintain aspect ratio
            const scalingFactor = Math.min(maxDim / width, maxDim / height);
            width = width * scalingFactor;
            height = height * scalingFactor;

            // Resize the canvas to the new dimensions
            canvas.width = width;
            canvas.height = height;

            // Draw the resized image
            ctx.drawImage(img, 0, 0, width, height);

            // Show the canvas and download button
            canvas.style.display = 'block';
            document.getElementById('download').style.display = 'inline';
        };

        img.src = e.target.result; // Set the source of the image to the uploaded file
    };
    reader.readAsDataURL(file); // Read the file as a Data URL
});

document.getElementById('download').addEventListener('click', function() {
    const canvas = document.getElementById('canvas');
    const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    const tempLink = document.createElement('a');
    tempLink.download = 'resized-image.png'; // Set the default file name for the download
    tempLink.href = image; // Link the image source for download
    tempLink.click(); // Programmatically click the link to trigger the download
});
