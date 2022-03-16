# Geolocation sharing, and presenting 
PWA apps made using NEXT.JS, Firebase and openstreetmap.

There are two separate apps in this repo.
- ***Geolocation-share:*** gets the device locations info (GeoLocation API) which can be stored in Firestore by user. When the device is offline, it stores the location info in the local storage and next time the device gets online it uploads all the infos. [Geolocation-share](https://gl-share.vercel.app/)
- ***Geolocation-find:*** It presents the stored locations in a list and on the map. [Geolocation-find](https://gl-find.vercel.app/)

## Preview Images:
- Geolocation-share:

<img src="https://github.com/hdadr/geolocation/blob/main/screen%20examples/share/offline.png" width="300"> <img src="https://github.com/hdadr/geolocation/blob/main/screen%20examples/share/online.png" width="300">


- Geolocation-find:

<img src="https://github.com/hdadr/geolocation/blob/main/screen%20examples/find/ex.png" width="300">
