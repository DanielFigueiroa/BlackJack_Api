const express = require("express");
const axios = require("axios");
const app = express();
const host = '0.0.0.0';
const port = 3000;
const hostname = 'https://deckofcardsapi.com/api';

app.get('/', async (req, res) => {

    let result;
    try {
        let response = await axios.get(`${hostname}/deck/new/shuffle/`);
        result = response.data.deck_id
    } catch (error) {
        result = {
            "success": false
        }
    }
    res.send(result)
});

app.get('/start', async (req, res) => {

    let result;
    try {
        console.log(req.query['deck_id'])
        let response = await axios.get(`${hostname}/deck/${req.query['deck_id']}/draw/?count=4`);
        result = response.data.cards
    } catch (error) {
        result = {
            "success": false
        }
    }
    res.send(result)
});

app.get('/redraw', async (req, res) => {

    let result;
    try {
        let response = await axios.get(`${hostname}/deck/${req.query['deck_id']}/draw/?count=2`);
        result = response.data.cards
    } catch (error) {
        result = {
            "success": false
        }
    }
    res.send(result)
});

app.get('/draw', async (req, res) => {
    let result;
    try {
        let response = await axios.get(`${hostname}/deck/${req.query['deck_id']}/draw/?count=1`);
        result = response.data.cards[0]
    } catch (error) {
        result = {
            "success": false
        }
    }
    res.send(result)
});

app.get('/endgame', async (req, res) => {

    let result;
    try {
        let response = await axios.get(`${hostname}/deck/${req.query['deck_id']}/return`);
        result = response.data.success
    } catch (error) {
        result = {
            "success": false
        }
    }
    res.send(result)
});

app.listen(port, () => {
    console.log("Node.js app listening on port ${port}")
});

app.use(express.static('src'))