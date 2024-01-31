from retinaface import RetinaFace
import cv2
import matplotlib.pyplot as plt
import matplotlib.patches as patches
import math

img_path = r"C:\Users\EBIN\Desktop\Code Site\mujdating-1\images\vaal.jpg"

img = cv2.imread(img_path)

# Detect faces using RetinaFace
faces = RetinaFace.detect_faces(img_path)

# Save only the part of the image within the dynamically adjusted bounding box
if faces:
    highest_confidence_face = max(faces, key=lambda x: x['confidence'])
    bounding_box = highest_confidence_face['facial_area']

    # Get the square root of the face area
    face_size = math.sqrt(bounding_box['w'] * bounding_box['h'])

    # Define a fixed percentage for adjustment (e.g., 30%)
    percentage_adjustment = 0.6

    # Calculate the adjustment value based on the square root of the face area and percentage
    adjustment_value = int(face_size * percentage_adjustment)

    # Make the bounding box bigger by the calculated adjustment value
    bounding_box['x'] = max(0, bounding_box['x'] - adjustment_value)
    bounding_box['y'] = max(0, bounding_box['y'] - adjustment_value)
    bounding_box['w'] += 2 * adjustment_value
    bounding_box['h'] += 2 * adjustment_value

    # Convert the float coordinates to integers
    bounding_box = {key: int(value) for key, value in bounding_box.items()}

    # Crop the image within the bounding box
    cropped_face = img[bounding_box['y']:bounding_box['y'] + bounding_box['h'],
                       bounding_box['x']:bounding_box['x'] + bounding_box['w']]

    # Save the cropped face as an image
    cv2.imwrite('face.png', cropped_face)
    print("Cropped face saved as face.png")
else:
    print("No faces detected.")
