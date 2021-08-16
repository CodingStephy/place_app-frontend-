import './App.css';
import { Route, Link, Switch } from "react-router-dom";
import React, {useState, useEffect} from "react";
import Display from "./Display"
import Form from "./Form"

function App() {
  const url = "https://places628sl.herokuapp.com";
  const [places,setPlaces]= useState([])
  const emptyPlace ={
     name:"",
     img:"",
     description:""
  }

  const [selectedPlace, setSelectedPlace] = useState(emptyPlace)

  const getPlaces = () => {
    fetch(url + "/places")
    .then((response) => response.json())
    .then((data) => setPlaces(data))
  }

useEffect(() => getPlaces(), []);
   
  const handleCreate = (newPlace) => {
    fetch(url + "/places", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPlace)
    })
    .then(() => {
      getPlaces()
    })
  }
   
  const handleUpdate = (place) => {
    fetch(url + "/places/"+ place._id, {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(place)
    })
    .then(() => {
      getPlaces()
    })
  }
  const selectPlace = (place) => {
    setSelectedPlace(place)
  }
  const deletePlace = (place) => {
    fetch(url + "/places/"+ place._id, {
      method: "delete",
    })
    .then(() => {
      getPlaces()
    })
  }
  return (
    <div className="App">
      <h1>Place LISTING SITE</h1>
      <hr />
      <Link to="/create">
        <button>Add Place</button>
      </Link>
      <main>
        <Switch>
        <Route exact path="/"
            render={(rp) => <Display {...rp} places={places} selectPlace={selectPlace}
            deletePlace={deletePlace}
            />}
        />
          <Route
            exact
            path="/create"
            render={(rp) => (
              <Form {...rp} label="create" place={emptyPlace} handleSubmit={handleCreate} />
            )}
          />
          <Route
            exact
            path="/edit"
            render={(rp) => (
              <Form {...rp} label="update" place={selectedPlace} handleSubmit={handleUpdate} />
            )}
          />
        </Switch>
        </main>
    </div>
  );
}

export default App;
