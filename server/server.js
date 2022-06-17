const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const axios = require('axios');
const app = express();
app.use(cors());

const config = {
    headers: {
        'Authorization': `Bearer ${process.env.API}`,
    }
}

app.get('/:city', (req, res) => {
    const getYelp = async () => {
        const url = `https://api.yelp.com/v3/businesses/search?location=${req.params.city}&term=pizza&sort_by=rating&open_now=true`;
        const result = await axios.get(url, config);
        res.send(result.data);
    }
    getYelp();
});

app.listen(3000, () => {
    console.log('listening');
});