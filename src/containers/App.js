import React, { useState, useEffect } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import ErrorBoundry from "../components/ErrorBoundry";
// import { robots } from "./robots";
import Scroll from "../components/Scroll";
import "./App.css";

function App() {
  // constructor() {
  //   super();
  //   this.state = {
  //     robots: [],
  //     searchfield: "",
  //   };
  // }

  // componentDidMount() {
  //   fetch("https://jsonplaceholder.typicode.com/users")
  //     .then((response) => response.json())
  //     .then((users) => this.setState({ robots: users }));
  // }

  const [robots, setRobots] = useState([]);
  const [searchfield, setsearchfield] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => setRobots(users));
    // console.log(count);
  }, []);

  const onSearchChange = (event) => {
    setsearchfield(event.target.value);
  };

  // const { robots, searchfield } = this.state;
  const filteredRobots = robots.filter((robot) => {
    return robot.name.toLowerCase().includes(searchfield.toLowerCase());
  });
  return !robots.length ? (
    <h1>Loading...</h1>
  ) : (
    <div className="tc">
      <h1 className="f1">RoboFriends</h1>
      <button onClick={() => setCount(count + 1)}>Click Me</button>
      <SearchBox searchChange={onSearchChange} />
      <Scroll>
        <ErrorBoundry>
          <CardList robots={filteredRobots} />
        </ErrorBoundry>
      </Scroll>
    </div>
  );
}

export default App;
