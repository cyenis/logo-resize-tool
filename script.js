document.getElementById('upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            // Calculate the scaling factor and new dimensions
            let originalWidth = img.width;
            let originalHeight = img.height;
            let newWidth, newHeight;
            const maxDim = 500;

            if (originalWidth > originalHeight) {
                // If the image is wider than it is tall
                const ratio = originalHeight / originalWidth;
                newWidth = maxDim;
                newHeight = maxDim * ratio;
            } else {
                // If the image is taller than it is wide or square
                const ratio = originalWidth / originalHeight;
                newHeight = maxDim;
                newWidth = maxDim * ratio;
            }

            // Adjust for images where width is the smaller dimension
            if (originalWidth < originalHeight) {
                newWidth = Math.round(maxDim * (originalWidth / originalHeight));
                newHeight = maxDim;
            } else { // For images where height is the smaller dimension or if square
                newHeight = Math.round(maxDim * (originalHeight / originalWidth));
                newWidth = maxDim;
            }

            // Resize the canvas to the new dimensions
            const canvas = document.getElementById('canvas');
            canvas.width = newWidth;
            canvas.height = newHeight;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, newWidth, newHeight); // Draw the resized image

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
