import React, {useEffect, useState}from "react";

export default function SearchWeather() {
  const[search, setSearch] = useState("durg");
  const[data, setData] = useState([]);
  const[input, setInput] = useState("");
  let componentMounted = true;

  useEffect(()=> {
    const fetchWeather = async() => {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=a9bc24695a2033b03f4719cc3155ab5a`);
      if(componentMounted)
      {
        setData(await response.json());
        // console.log(data);
      }
      return () => {
        componentMounted = false;
      }
    }
    fetchWeather();
  }, [search]);

  let emoji = null;

  if(typeof data.main!="undefined")
  {
     if(data.weather[0].main === "Clouds")
     {
       emoji = "fa-cloud"
     }
     else if(data.weather[0].main === "Thunderstorm")
     {
        emoji = "fa-bolt"
     }
     else if(data.weather[0].main === "Drizzle")
     {
        emoji = "fa-cloud-rain"
     }
     else if(data.weather[0].main === "Rain")
     {
        emoji = "fa-cloud-shower-heavy"
     }
     else if(data.weather[0].main === "Snow")
     {
        emoji = "fa-snow-flake"
     }
     else
     {
       emoji = "fa-smog"
     }
  }
  else
  {
     return (
      <div>......Loading</div>
     )
  }

  var temp = (data.main.temp - 273.15).toFixed(2);
  var temp_min = (data.main.temp_min - 273.15).toFixed(2);
  var temp_max = (data.main.temp_max - 273.15).toFixed(2);

  // Data
  let d = new Date();
  let date = d.getDate();
  let year = d.getFullYear();
  let month = d.toLocaleDateString("default",{month:'long'});
  let day = d.toLocaleDateString("default",{weekday:'long'});

  // Time
  let time = d.toLocaleDateString([],{
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearch(input);
  }
  return (
    <div>
      <h3 className="heading">Weather App</h3>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card text-white text-center border-0">
              <img
                src={`https://source.unsplash.com/600x900/?${data.weather[0].main}`}
                className="card-img"
                alt="..."
              />
              <div className="card-img-overlay">
                <form onSubmit={handleSubmit}>
                  <div className="input-group mb-4 w-75 mx-auto">
                    <input
                      type="search"
                      className="form-control"
                      placeholder="Search City"
                      aria-label="Search City"
                      aria-describedby="basic-addon2"
                      name="search"
                      value={input}
                      onChange={(e)=>setInput(e.target.value)}
                      required
                    />
                    <button type="submit" className="btn btn-primary" id="basic-addon2">
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </form>
                <div className="bg-dark bg-opacity-50 py-3">
                <h2 className="card-title">{data.name}</h2>
                <p className="card-text lead">
                   {day}  {date} {month}  {year}
                   <br/>
                   
                </p>
                <hr/>
                <i className={`fas ${emoji} fa-4x`}></i>
                <h1 className="fw-bolder mb-5">{temp}&deg;C</h1>
                <p className="lead fw-bolder mb-0">{data.weather[0].main}</p>
                <p className="lead">Min:{temp_min}&deg;C | Max:{temp_max}&deg;C</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
