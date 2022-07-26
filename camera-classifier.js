import { ImageClassifier, LinuxImpulseRunner, Ffmpeg, Imagesnap } from 'edge-impulse-linux';

export class EdgeCameraClassifier {
    constructor(){
        this.syringeStatus = 'uncertain'
    }

    async initializeCamera(){
        // select a camera... you can implement this interface for other targets :-)
        let camera;
        if (process.platform === 'darwin') {
            camera = new Imagesnap();
        }
        else if (process.platform === 'linux') {
            camera = new Ffmpeg(false /* verbose */);
        }
        else {
            throw new Error('Unsupported platform "' + process.platform + '"');
        }
        await camera.init();
    
        const devices = await camera.listDevices();
        if (devices.length === 0) {
            throw new Error('Cannot find any webcams');
        }
        if (devices.length > 1 && !process.argv[3]) {
            throw new Error('Multiple cameras found (' + devices.map(n => '"' + n + '"').join(', ') + '), add ' +
                'the camera to use to this script (node classify-camera.js model.eim cameraname)');
        }
    
        let device = process.argv[3] || devices[0];
    
        console.log('Using camera', device, 'starting...');
    
        await camera.start({
            device: device,
            intervalMs: 200,
        });
    
        camera.on('error', error => {
            console.log('camera error', error);
        });
    
        console.log('Connected to camera, waiting for POST to send data...');
        return camera
    
    }

    async initializeEdgeImpulse(){
        let runner = new LinuxImpulseRunner(process.argv[2]);
        let model = await runner.init();
    
        console.log('Starting the image classifier for',
            model.project.owner + ' / ' + model.project.name, '(v' + model.project.deploy_version + ')');
        console.log('Parameters',
            'image size', model.modelParameters.image_input_width + 'x' + model.modelParameters.image_input_height + ' px (' +
                model.modelParameters.image_channel_count + ' channels)',
            'classes', model.modelParameters.labels);
    
        return runner
    
    }
    // tslint:disable-next-line: no-floating-promises
    async runClassifier (){
        try  {
            if (!process.argv[2]) {
                console.log('Missing one argument (model file)');
                process.exit(1);
            }

            let runner = await this.initializeEdgeImpulse()

            let camera = await this.initializeCamera();

            let imageClassifier = new ImageClassifier(runner, camera);

            await imageClassifier.start();


            

            imageClassifier.on('result', (ev, timeMs, imgAsJpg) => {
                if (ev.result.classification) {
                    // print the raw predicted values for this frame
                    // (turn into string here so the content does not jump around)
                    let c = ev.result.classification;
                    for (let k of Object.keys(c)) {
                        c[k] = c[k].toFixed(4);
                    }

                    this.syringeStatus = c.discharged_syringe > c.loaded_syringe ?  'discharged_syringe' : 'loaded_syringe'
                    //console.log(this.syringeStatus)
                    //console.log('classification', timeMs + 'ms.',  syringeStatus );
                }
                else if (ev.result.bounding_boxes) {
                    console.log('boundingBoxes', timeMs + 'ms.', JSON.stringify(ev.result.bounding_boxes));
                }
            });

        }
        catch (ex) {
            console.error(ex);
            process.exit(1);
        }
    };

}