const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * Please DO NOT INCLUDE the private app access token in your repo. Don't do this practicum in your normal account.
const PRIVATE_APP_ACCESS = '';

// ROUTE 1 - Homepage: GET all Pets custom objects and render homepage
app.get('/', async (req, res) => {
    const url = 'https://api.hubapi.com/crm/v3/objects/2-227014870?properties=name,species,bio';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };
    try {
        const resp = await axios.get(url, { headers });
        const data = resp.data.results;
        res.render('homepage', { title: 'Pets | HubSpot Custom Object', data });
    } catch (error) {
        console.error(error);
    }
});

// ROUTE 2 - Update form: GET form to create a new Pet
app.get('/update-cobj', async (req, res) => {
    try {
        res.render('updates', { title: 'Update Custom Object Form | HubSpot APIs' });
    } catch (error) {
        console.error(error);
    }
});

// ROUTE 3 - POST new Pet record, then redirect to homepage
app.post('/update-cobj', async (req, res) => {
    const newPet = {
        properties: {
            name: req.body.name,
            species: req.body.species,
            bio: req.body.bio
        }
    };
    const url = 'https://api.hubapi.com/crm/v3/objects/2-227014870';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };
    try {
        await axios.post(url, newPet, { headers });
        res.redirect('/');
    } catch (error) {
        console.error(error);
    }
});

// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));
