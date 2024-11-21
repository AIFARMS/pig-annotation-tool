# Animal Video Annotation Tool (AVAT)

AVAT is a front-end dashboard that can annotate videos of livestock, utilized for various academic disciplines and providing a robust interface for efficient video annotation. This document outlines the key features of the platform, including user interface details, key bindings, and the process for uploading media and annotating videos.

For a system that spans multiple academic disciplines, ensuring a robust interface allows a person of any experience to efficiently annotate videos. A potential user should be able to identify animals of interest easily and have a method to track them across frames in an easy and efficient manner. For a more efficient workflow, a series of key bindings was implemented to expedite each operation within the platform, therefore allowing unexperienced users to familiarize themselves with a predetermined workflow efficiently.

### Goals

AVAT aims to simplify the video annotation process, allowing users to easily identify and track animals of interest across frames. A significant challenge addressed was conditioning users to adopt a predetermined workflow for increased efficiency, even without prior intensive training on our system.

AVAT was designed for ease of use, and to scale easily in order to annotate videos efficiently. The intuition of this project is gained from analyzing similar projects and analyzing the weaknesses and points of frustration and improving them.

Another goal is to have an annotation workflow that is extremely fast and efficient, as there are terabytes of video that need to be processed at large. 

## Deploying AVAT

The AVAT platform offers multiple methods of deployyment covered in this README. Currently supported:

* [Direct browser access](/README.md#direct-access-recommended)
* [Local front-end](/README.md#local-front-end-deployment)
* [Docker](/README.md#docker-setup)
* [Flask](/README.md#flask-server)

### Direct Access (Recommended)

Access AVAT via https://aifarms.github.io/AVAT/.

#### Browser Support

AVAT supports the following browsers:

- Chrome 49 (release: 2/3/2016)
- Firefox 50 (release: 11/15/2016)
- Safari 10 (release: 9/20/2016)
- Edge 14 (release: 2/18/2016)

If you encounter any errors, we recommend using the latest version of Chrome or Firefox.

### Local Front-end Deployment

These instructions allow you to deploy a copy of the project running on your local device.

#### Prerequisites

You will need the following tooling to deploy AVAT:

* npm
* A [compatible web browser](/README.md#browser-support
* Git

#### Installing and Building

1. First, clone the repository to your desired location:

```
git clone https://github.com/AIFARMS/pig-annotation-tool
```

2. Install the node_modules:

```
npm install
```

3. Run `npm start` to get the project running on your local machine. The website will be on http://localhost:4000/

```
npm start
```

This is for the front-end portion of the dashboard. Currently, there is no back-end portion to this website.

If the goal is to only access the website, then go to ```build > index.html``` in this repository.

### Docker Setup

Currently Docker is set up to run the the node project. This will be expanded in the future to include Clowder integration, backend servers, etc.

> [!NOTE]  
> These commands are written for a Unix-based machine running Docker. Support for Windows is uncertain at this time.

Easy command list:
-  To build and run docker container
```sudo docker build --tag avat:latest . && sudo docker run -it --rm -v ${PWD}:/avat -v /AVAT/node_modules -e CHOKIDAR_USEPOLLING=true --name avat -p 3001:3000 avat && sudo docker start avat && sudo docker ps -a | grep avat```
- To stop and remove container
```sudo docker stop avat && sudo docker rm avat```
- To remove pre-existing container and build new container
```sudo docker stop avat && sudo docker rm avat && sudo docker build --tag avat:latest . && sudo docker run -it --rm -v ${PWD}:/avat -v /AVAT/node_modules -e CHOKIDAR_USEPOLLING=true --name avat -p 3001:3000 avat && sudo docker start avat && sudo docker ps -a | grep avat```

### Flask Server

> [!NOTE]  
> This section can be further expanded on to include any external models as needed.

> [!NOTE]  
> These commands are written for a Unix-based machine running Docker. Support for Windows is uncertain at this time.

Set up a virtual environment and install the proper dependencies from ```backend/requirements.txt```. Then change current directory to ```backend``` and type in ```flask run```. The website should be up on ```http://127.0.0.1:5000```

## Getting Started with AVAT

After successfully deploying AVAT, please refer to our [Getting Started with AVAT](https://github.com/AIFARMS/AVAT/blob/master/USAGE.md) doc for a detailed guide on using the platform.

## Built With

* [React](https://reactjs.org/) - Main Front-End Framework
* [React Bootstrap](https://react-bootstrap.github.io/) - UI Library
* [react-player](https://www.npmjs.com/package/react-player) - Video Player
* [fabric.js](http://fabricjs.com/) - Canvas renderer

## Authors

* **Pradeep Senthil** [pradeepsen99](https://github.com/pradeepsen99) - AVAT
* **Ana Lucic** [alucic2](https://github.com/alucic2) - Data Conversion Scripts
* **Zimu Li** [neuroZ68](https://github.com/neuroZ68) - Usage Documentation
