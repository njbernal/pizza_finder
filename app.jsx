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
    const [city, setCity] = useState("");
    const [{ data, isLoading, isError }, doFetch] = useDataApi();

    const handleChange = (e) => {
        setCity(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let city = document.getElementById('city').value;
        const url = `http://localhost:3000/${city}`;
        doFetch(url);
    }

    return (
        <div className="container">
            <h2>Pizza Finder</h2>
            <div className="city">
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Enter a city" name="city" id="city" autoComplete="off" onChange={handleChange} />
                </form>
            </div>
            {city && (
                <div className="yelp-container">
                    {data && data.map((item, index) => <YelpItem key={index} item={item} />)}
                </div>
            )}
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));