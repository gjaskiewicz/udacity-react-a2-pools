# Employee Polls

Employee Polls is an application, which allows foster democracy inside your company. Employees can create and answer polls with 2 options to choose from. Polls can be used to learn about employees preferences and give them meaningful choices.

## Getting Started

### Installation

In order to install the project check it out from Github repo
```
git clone https://github.com/gjaskiewicz/
```

Next run ```npm install``` in project directory. This project was run and built using npm 8.1.2

Application was written in Javascript using React/Redux framework. Preferred code editor is Visual Studio Code.

### Running project

To run project go to project directory and invoke:

```
npm start
```

This will run the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

Application comes with sample built-in database, which serves as a demo.

### Running tests

To run tests invoke:

```
npm test
```

Application covers mainly unit tests writted in React testing library.

## User guide

### Answering polls

Navigate to polls dashboard. Select a poll of your interest on click on the one of the options. The question will move to Answered questions tab. After this you can move to answering next questions.

### Creating own poll

After clicking 'Create new' you will go to page for creating new question. Questions take form 'Would you rather...' and there are 2 options which are proposed to co-worker. Right now, there is no moderation, but keep in mind that polls are not anonymous. For your best interest follow company policy of your company.

### Seeing leaderboards

Why not become true poll champ? Each participant of the platform has score based on number of polls created and polls answered. After navigating to leaderboards tab, you will see users ranked according to scoring.

### Account management

Right now, accout management is not offered. Demo comes with limited sandbox data and you can use account from there. To log in into the platform follow sign in link.

## Contributing

Contributions are welcome, but there is no proces as such. Just send me PR and I'll try to get to it as soon as possible.

## Roadmap

Here is a priorotized list of upcomming features:

- Integration with 3P and propiertary auth systems,
- Persistant storage for polls,
- Dockerized deployments,
- Customizable styles per customer,
- Integration points with other systems (eg. event hubs).

## Authors
* **Grzegorz Jaśkiewicz** -  [gjaskiewicz](https://github.com/gjaskiewicz)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments
Thanks to Udacity team for providing nice React/Redux course

## Other info

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) using Redux template.
