# Edge Impulse - Syringe classifier with camera


## About

Runs a [Edge Impulse](https://www.edgeimpulse.com/) machine learning model thats classify loaded and discharged syringes to help in vaccination campains and use IOTA Tangle as descentralized database.


## Installation

### Pre-requisites

* Node Js
* Camera
* If there is no prebuilt binary available for @iota/client in your system you need Rust and Cargo, to build it yourself. Install them [here](https://doc.rust-lang.org/cargo/getting-started/installation.html).

### Steps

* Clone this repo and navigate into it.
* Run ```npm install``` to install dependencies
* Run  ```npm install edge-impulse-linux -g --unsafe-perm```.



* Connect a camera and run ```npm start```
  * If you get an error that shows you all available cameras, run ```node index.js modelfile.eim <camera name>```


PS: You need to download your own model file from your Edge Impulse project/account, with exactly two labels in your dataset for working with this project: ```discharged_syringe``` and ```loaded_syringe```, you can download your model file by running the following command: ```edge-impulse-linux-runner --download modelfile.eim```



