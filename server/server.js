const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const axios = require('axios');
const app = express();

app.use(cors());

const allowed_ips = [
    '10.37.1.243',
    'njbernal.github.io'
]

const config = {
    headers: {
        'User-Agent': 'nicks-app',
        Authorization: `Bearer ${process.env.API}`,
    }
}

app.get(`/apps/pizzafinder/:city`, (req, res) => {
    let ip = req.headers.origin;
    if (ip) {
        ip = ip.split('//');
        ip = ip[1].split(':')[0];
        if (!allowed_ips.includes(ip)) {
            res.send({ error: `Error, ip ${ip} is not allowed here.` });
        }
    }

    const getYelp = async () => {
        try {
            const url = `https://api.yelp.com/v3/businesses/search?location=${req.params.city}&term=pizza&sort_by=rating&open_now=true`;
            const result = await axios.get(url, config);
            res.send(result.data);
        }
        catch (error) {
            res.send(error);
        }
    }
    getYelp();
});

app.listen(3000, () => {
    console.log('listening');
});