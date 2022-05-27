const YelpItem = ({ item }) => {
    return (
        <div className="yelp-item">
            <a href={item.url} target="_blank">
                <img src={item.image_url} className="yelp-image" />
            </a>
            {item.name}
        </div>
    )
}

const App = () => {
    const { useEffect, useState } = React;
    const [location, setLocation] = useState({});
    const [weather, setWeather] = useState("");
    const [url, setURL] = useState("");
    const [city, setCity] = useState("");
    const [yelpItems, setYelpItems] = useState("");

    function locationSuccess(data) {
        setLocation(data);
        //setURL(`https://api.songkick.com/api/3.0/search/locations.json?location=geo:{${data.coords.latitude},${data.coords.longitude}}&apikey={your_api_key}`);
        fetchData(data);
    }

    const fetchData = async (data) => {
        //const res = await axios(`https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=v4YQ2Jp4GHcbfGbCA5CBeCYWfuY3x61C&q=${data.coords.latitude},${data.coords.longitude}`);
        //setCity(res.data.LocalizedName);
        //const weatherResponse = await axios(`https://dataservice.accuweather.com/currentconditions/v1/${res.data.Key}?apikey=v4YQ2Jp4GHcbfGbCA5CBeCYWfuY3x61C`);
        //setWeather(weatherResponse.data[0]);

        const yelpApi = 'XQ9sGCeCOPzMy-2eY050U3rKE9sLrxeMXA9-Ltz8iD7eg2_mFo1WPj0KdqQeq1qfXYnsErwKuuoAoWUCNH0-KiJ3CETyJnuxB1Zx1rDxAfVHzjCeEe-qCVAVuMIoYnYx';
        //const url = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?latitude=34.2360064&longitude=-116.834304&term=pizza';
        //setURL(url);
        const config = {
            headers: {
                'Authorization': `Bearer ${yelpApi}`,
            }
        }
        //const yelp = await axios(url, config);
        const yelp = {
            data: {
                businesses: all_data
            }
        };
        setYelpItems(yelp.data.businesses);
    }
    function locationError(error) {
        console.log(error);
    }

    useEffect(() => {
        const init = async () => {
            navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
        }
        init();
    }, []);

    return (
        <div className="container">
            <h2>Pizza Finder</h2>
            <div className="weather">
                {city && <h3>{city}</h3>}
                {weather && (<>{weather.Temperature.Imperial.Value} F and {weather.WeatherText}</>)}
            </div>
            <div className="yelp-container">
                {yelpItems && yelpItems.map((item, index) => <YelpItem key={index} item={item} />)}
            </div>
            < div id="test"></div>
        </div >
    )
}

ReactDOM.render(<App />, document.getElementById('root'));