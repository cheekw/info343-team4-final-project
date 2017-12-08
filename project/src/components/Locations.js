import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import "firebase/storage";

export default class Locations extends React.Component {
   constructor() {
       super()
       this.state = {locations: {}}
   }

   componentDidMount() {
       this.locationsRef = firebase.database().ref("locations")
       this.locationsListener = (snapshot) => {
           this.setState({locations: snapshot.val()})
       }
       this.locationsRef.on("value", this.locationsListener)
       
   }

   componentWillUnmount() {
       this.locationsRef.off("value", this.locationsListener)
   }
   render() {
       let locations = []
       for(let itemID in this.state.locations) {
           let item = this.state.locations[itemID];
           let itemRender = null;
           locations.push(itemRender)
       }
       return (
           <div>
               {locations}
           </div>
       )
   }
}

class Location extends React.Component {
   render() {
       return (
           <div>
              
           </div>
       );
   }
}

