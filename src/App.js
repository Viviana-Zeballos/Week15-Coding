import React from 'react';
import './App.css';
import House from './house';

const HOUSES_ENDPOINT = 'https://ancient-taiga-31359.herokuapp.com/api/houses';

export default class App extends React.Component {
  // Constructor to initialize state and bind methods
  constructor(props) {
    super(props);
    this.addNewRoom = this.addNewRoom.bind(this);
    this.deleteRoom = this.deleteRoom.bind(this);
  }

  render() {
    // Render method to display the component
    const houses = this.state
    // Map over the houses in state and create House components
    ? this.state.houses.map((house, index) =>
      <House
      key={index}
      data={house}
      addNewRoom={this.addNewRoom}
      deleteRoom={this.deleteRoom} />)
    :null;
    return (
      <div>
        {houses}
      </div>
    );

  }

  // Lifecycle method runs after the component mounts
  componentDidMount() {
    fetch(HOUSES_ENDPOINT)
    .then(res => res.json())
    .then(data => {
      this.setState({
        houses: data
      });
    });
  
  }

  // Method to delete a room from a house
  deleteRoom(e, house, room) {
    // Find and remove the room from the house's rooms array
    const index = house.rooms.indexOf(room);
    house.rooms.splice(index, 1);
    // Update the house data on the server
    updateHouse(house)
    .then(() => {
      this.setState(state => {
        for (let h of state.houses) {
          if (h._id === house._id) {
            let h = house;
            break;
          }
        }
        return state;
      });
    });
    e.preventDefault();
  }

  // Method to add a new room to a house
  addNewRoom(e, house, room) {
   // Add the new room to the house's rooms array
    house.rooms.push(room)
    updateHouse(house)
    .then(() => {
      this.setState(state => {
        for (let h of state.houses) {
          if (h._id === house._id) {
            let h = house;
            break;
          }
        }
        return state;
      });
    });
    e.preventDefault();
  }
}

// Function to send a PUT request to update a house on the server
function updateHouse(house) {
  return fetch(`${HOUSES_ENDPOINT}/${house._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(house)
  });
}
