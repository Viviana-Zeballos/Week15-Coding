import React from "react";
import NewRoomForm from "./new-room-form";

export default class House extends React.Component {
    render() {
         // Destructure rooms from the house data
        const rooms = this.props.data.rooms
        ? this.props.data.rooms.map((room,index) => (
            // Map over rooms to create a list item for each room
            <li key={index}>
                {room.name} Area: {room.area} 
                <button onClick={e =>
                    this.props.deleteRoom(e, this.props.data, room)
                }>Delete</button>
            </li> 
        ))
        : null;
        // Render method to display house name, list of rooms, and form to add new rooms
        return (
            <div className="container">
                <h1>{this.props.data.name}</h1>
                <ul>
                    {rooms}
                </ul>
                <NewRoomForm addNewRoom={this.props.addNewRoom} data={this.props.data} />
            </div>
        )
    }
}