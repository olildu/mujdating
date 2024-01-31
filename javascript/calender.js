const img = document.getElementById('test');
img.style.display = 'none';

const faceImage = document.getElementById('faceImage');


Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('javascript/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('javascript/models'),
]).then(() => {
    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(img, new faceapi.TinyFaceDetectorOptions());

        if (detections.length > 0) {
            const face = detections[0].box;

            const enlargementFactor = 0.6;
            const enlargedFace = {
                x: Math.max(face.x - face.width * enlargementFactor, 0),
                y: Math.max(face.y - face.height * enlargementFactor, 0),
                width: face.width * (1 + 2 * enlargementFactor),
                height: face.height * (1 + 2 * enlargementFactor),
            };

            const faceCanvas = document.createElement('canvas');
            const faceCanvasCtx = faceCanvas.getContext('2d');
            faceCanvas.width = enlargedFace.width;
            faceCanvas.height = enlargedFace.height;
            faceCanvasCtx.drawImage(img, enlargedFace.x, enlargedFace.y, enlargedFace.width, enlargedFace.height, 0, 0, enlargedFace.width, enlargedFace.height);
            faceImage.src = faceCanvas.toDataURL();
            faceImage.style.display = 'block';
        } else {
            faceImage.style.display = 'none';
        }
    }, 100);
});
