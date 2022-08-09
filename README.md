# Edge Impulse Syringe Camera Classifier


## About

Runs a Edge Impulse machine learning model thats classify loaded and discharged syringes to help in vaccination campains and use IOTA Tangle as descentralized database.


## Installation

### Pre-requisites

* Node Js
* Camera

### Steps

* Clone this repo and navigate into it.
* Run ```npm install``` to install dependencies
* Run  ```npm install edge-impulse-linux -g --unsafe-perm```.



* Connect a camera and run ```npm start```
  * If you get an error that shows you all available cameras, run ```node index.js modelfile.eim <camera name>```


PS: If you want, you can download your own model file from your Edge Impulse project/account with: ```edge-impulse-linux-runner --download modelfile.eim```



