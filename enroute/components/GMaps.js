import React, { Component } from "react";
import MapView, { Polyline } from "react-native-maps";
const polyline = require("@mapbox/polyline");

import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight
} from "react-native";

const { width, height } = Dimensions.get("window");

export default class GMaps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialRegion: {
        latitude: 13.5568,
        longitude: 80.0261,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      coords: [],
      distance: null,
      time: null,
      startLatitude: null,
      startLongitude: null,
      endLatitude: null,
      endLongitude: null
    };
  }

  componentDidMount() {
    this.setState(
      {
        startLatitude: this.props.stLat,
        startLongitude: this.props.stLong,
        endLatitude: this.props.desLat,
        endLongitude: this.props.desLong
      },
      () => {
        console.log(
          "received coords: ",
          this.state.startLatitude,
          this.state.startLongitude,
          this.state.endLatitude,
          this.state.endLongitude
        );
        this.fetchInitialRoute(
          this.state.startLatitude,
          this.state.startLongitude,
          this.state.endLatitude,
          this.state.endLongitude
        );
        this.setInitialReg();
      }
    );
  }

  setInitialReg() {
    console.log("in function=====");
    //const long1 = this.state.searchLocs[1];
    var initialRegion = { ...this.state.initialRegion };
    initialRegion.latitude = this.state.startLatitude;
    initialRegion.longitude = this.state.startLongitude;
    this.setState({ initialRegion }, () => {
      console.log("inital reg: ", this.state.initialRegion);
    });
  }

  async fetchInitialRoute(startLat, startLong, endLat, endLong) {
    const startLoc = startLat + ", " + startLong;
    //const startLoc = "13.5568, 80.0261"
    const endLoc = endLat + ", " + endLong;
    //const endLoc = "12.9941, 80.1709"
    try {
      const resp = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${endLoc}&key=AIzaSyDU_kJ3UUPCV-HLOaTfDf9zfqBBAXQ0VHE`
      );
      const respJson = await resp.json();
      const response = respJson.routes[0];
      // const distanceTime = response.legs[0]
      // const distance = distanceTime.distance.text
      // const time = distanceTime.duration.text
      //console.log('distance, time: ', distance, time)
      let points = polyline.decode(respJson.routes[0].overview_polyline.points);
      let coords = points.map((point, index) => ({
        latitude: point[0],
        longitude: point[1]
      }));
      this.setState({ coords: coords });
    } catch (error) {
      console.log("error: ", error);
    }
  }

  // markerClick = (e) => {
  //   console.log('distance, time: ', this.state.distance, this.state.time)
  // }

  handleClick = e => {
    //console.log('distance, time: ', this.state.distance, this.state.time)
  };

  render() {
    const { initialRegion, coords } = this.state;
    return (
      <View>
        <MapView
          style={styles.map}
          initialRegion={initialRegion}
          showsUserLocation
        >
          <MapView.Marker
            coordinate={{
              latitude: this.state.startLatitude,
              longitude: this.state.startLongitude
            }}
            onPress={this.handleClick}
          ></MapView.Marker>
          <MapView.Marker
            coordinate={{
              latitude: this.state.endLatitude,
              longitude: this.state.endLongitude
            }}
          />
          <Polyline coordinates={coords} strokeColor="blue" strokeWidth={3} />
        </MapView>
        <Text>hello</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: "absolute",
    flex: 1,
    width: width,
    height: height
  }
});
