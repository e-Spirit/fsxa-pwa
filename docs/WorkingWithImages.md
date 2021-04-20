# Working with Images

[<< Back to Index](./index.md)

1. [Introduction](#introduction)
2. [Working with CaaS](#working-with-caas)
3. [Resolutions in FirstSpirit](#resolutions-in-firstspirit)
4. [Responsivity](#responsivity)
5. [Lazy Loading](#lazy-loading)
6. [SourceSets](#sourcesets)

## Introduction

In modern web design an image needs to be available in multiple croppings and resolutions in order to be rendered in all layouts across all devices. The FSXA-PWA offers a variety of tools to ensure the correct image gets loaded at the proper time. It is important to create and store the same image in multiple resolutions because this saves bandwidth

## Working with CaaS

The FirstSpirit CaaS contains meta information about the various resolutions your image is available in. When you encounter an image reference for your page or section it will probably look like this.

```json
"st_media": {
  "fsType": "FS_REFERENCE",
  "name": "st_media",
  "value": {
    "fsType": "Media",
    "name": "test_cam",
    "identifier": "72c4dd5d-2266-4baa-a242-a350dc05e512",
    "uid": "test_cam",
    "uidType": "MEDIASTORE_LEAF",
    "mediaType": "PICTURE",
    "url": "https://your.caas.url/your-project/d8db6f24-0bf8-4f48-be47-5e41d8d427fc.preview.content/72c4dd5d-2266-4baa-a242-a350dc05e512.en_GB"
  }
}
```

As you can see, the data contains a URL reference that usually points towards the FirstSpirit CaaS media collection. Following the URL will yield all the available resolutions of the image (see example below). Each entry has a name that corresponds to the FirstSpirit image resolution that generated the image and contains a URL pointing to the location of the image in that specific resolution. This URL can point towards the CaaS or it can point to a CDN that stores your image.

```json
"ORIGINAL": {
  "fileSize": 113958,
  "extension": "jpg",
  "mimeType": "image/jpeg",
  "width": 1280,
  "height": 720,
  "url": "https://where.your.image.is.stored/d8db6f24-0bf8-4f48-be47-5e41d8d427fc/preview/Images/Product-Images/Security-Camera.jpg"
},
"banner_slider": {
  "fileSize": 275856,
  "extension": "jpg",
  "mimeType": "image/jpeg",
  "width": 1920,
  "height": 1080,
  "url": "https://where.your.image.is.stored/d8db6f24-0bf8-4f48-be47-5e41d8d427fc/preview/Images/Product-Images/Security-Camera_banner_slider.jpg"
},
"echo_show5": {
  "fileSize": 73716,
  "extension": "jpg",
  "mimeType": "image/jpeg",
  "width": 960,
  "height": 480,
  "url": "https://where.your.image.is.stored/d8db6f24-0bf8-4f48-be47-5e41d8d427fc/preview/Images/Product-Images/Security-Camera_echo_show5.jpg"
},
```
