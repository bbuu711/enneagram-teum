from PIL import Image
import os

images = {
    1: "C:/Users/gramg/.gemini/antigravity/brain/a9d4f87c-d53d-494f-8520-b2be93067806/.user_uploaded/media_1787496954415.jpg",
    2: "C:/Users/gramg/.gemini/antigravity/brain/a9d4f87c-d53d-494f-8520-b2be93067806/.user_uploaded/media_1787496960660.jpg",
    3: "C:/Users/gramg/.gemini/antigravity/brain/a9d4f87c-d53d-494f-8520-b2be93067806/.user_uploaded/media_1787496965522.jpg",
    4: "C:/Users/gramg/.gemini/antigravity/brain/a9d4f87c-d53d-494f-8520-b2be93067806/.user_uploaded/media_1787496971865.jpg",
    5: "C:/Users/gramg/.gemini/antigravity/brain/a9d4f87c-d53d-494f-8520-b2be93067806/.user_uploaded/media_1787496975851.jpg",
    6: "C:/Users/gramg/.gemini/antigravity/brain/a9d4f87c-d53d-494f-8520-b2be93067806/.user_uploaded/media_1787497315454.jpg",
    7: "C:/Users/gramg/.gemini/antigravity/brain/a9d4f87c-d53d-494f-8520-b2be93067806/.user_uploaded/media_1787497320864.jpg",
    8: "C:/Users/gramg/.gemini/antigravity/brain/a9d4f87c-d53d-494f-8520-b2be93067806/.user_uploaded/media_1787497325063.jpg",
    9: "C:/Users/gramg/.gemini/antigravity/brain/a9d4f87c-d53d-494f-8520-b2be93067806/.user_uploaded/media_1787497328846.jpg"
}

output_dir = "assets"
os.makedirs(output_dir, exist_ok=True)

for type_id, path in images.items():
    try:
        img = Image.open(path)
        width, height = img.size
        # The user wants JUST the character portrait on the far left, and the bottom removed.
        # Let's crop width to 28% and height to 75% to remove bottom text/UI.
        crop_width = int(width * 0.28)
        crop_height = int(height * 0.75)
        cropped = img.crop((0, 0, crop_width, crop_height))
        cropped.save(os.path.join(output_dir, f"type{type_id}.jpg"))
        print(f"Cropped and saved type{type_id}.jpg")
    except Exception as e:
        print(f"Error processing {path}: {e}")
