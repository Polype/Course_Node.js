const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000; 

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((request, response, next) => {
    var now = new Date().toString();
    var log = `${now}: ${request.method} ${request.url}`;
    console.log(log);
    
    fs.appendFile('server.log', log + '\n', (error) => {
        if(error) {
            console.log('Unable to append to server.log');
        }
    });

    next();
});

/* app.use((request, response, next) => {
    response.render('maintenance.hbs', {
        pageTitle: 'Maintenance Page',
        welcomeMessage: 'Please, stand by',
    });
}); */

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (request, response) => {
    response.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Hello on page!',
    });
});

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/projects', (request, response) => {
    response.render('projects.hbs', {
        pageTitle: 'Projects Page',
        welcomeMessage: 'Hello there!'
    });
});

app.get('/bad', (request, response) => {
    response.send({
        error: 'Error message'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});