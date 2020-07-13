import React, { Component } from 'react';
import MapView, { Polyline } from 'react-native-maps';
const polyline = require('@mapbox/polyline');

import {
    Platform,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableHighlight
} from 'react-native';
import { Actions } from "react-native-router-flux";

const { width, height } = Dimensions.get('window');

export default class GMaps extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initialRegion: {
                latitude: 12.9941,
                longitude: 80.1709,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            },
            coords: [],
            distance: null,
            time: null,
            strlocs1: [],
            searchLocs: []
        }
    }

    componentDidMount() {
        this.setState({ strlocs1: this.props.strlocs, searchLocs: this.props.searchlocs }, () => {
            console.log('received props: ', this.state.strlocs1, this.state.searchLocs);
            console.log('latitude: ', this.state.searchLocs[0]);
            this.setInitialReg();
        });



    }

    setInitialReg() {
        //const lat1 = this.state.searchLocs[0];
        console.log("in function=====");
        //const long1 = this.state.searchLocs[1];
        var initialRegion = { ...this.state.initialRegion };
        initialRegion.latitude = this.state.searchLocs[0];
        initialRegion.longitude = this.state.searchLocs[1];
        this.setState({ initialRegion }, () => {
            this.state.searchLocs[1]
            console.log('inital reg: ', this.state.initialRegion);
        })
    }


    // async fetchInitialRoute() {
    //     const startLoc = "13.5568, 80.0261"
    //     const endLoc = "12.9941, 80.1709"
    //     try {
    //         const resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${endLoc}&key=AIzaSyDU_kJ3UUPCV-HLOaTfDf9zfqBBAXQ0VHE`)
    //         const respJson = await resp.json();
    //         const response = respJson.routes[0]
    //         const distanceTime = response.legs[0]
    //         const distance = distanceTime.distance.text
    //         const time = distanceTime.duration.text
    //         //console.log('distance, time: ', distance, time)
    //         let points = polyline.decode(respJson.routes[0].overview_polyline.points);
    //         let coords = points.map((point, index) => ({ latitude: point[0], longitude: point[1] }))
    //         this.setState({ coords: coords, distance: distance, time: time })
    //     }
    //     catch (error) {
    //         console.log('error: ', error)
    //     }
    // }

    // markerClick = (e) => {
    //   console.log('distance, time: ', this.state.distance, this.state.time)
    // }

    handleClick = async (event, name) => {
        console.log('marker press: ', name);
        Actions.DelForm({ name1: name });

    }

    render() {
        const { initialRegion, coords } = this.state;
        const markerList = this.state.strlocs1.map((data, index) => {
            const lat = data.lat;
            const long = data.long;
            return (
                <MapView.Marker
                    coordinate={{
                        latitude: lat,
                        longitude: long
                    }}
                    title={data.name}
                    onPress={event => this.handleClick(event, data.name)}>

                </MapView.Marker>
            )
        })
        return (
            <View>
                <MapView style={styles.map} initialRegion={initialRegion}>
                    {/* <MapView.Marker
                        coordinate={{
                            latitude: 12.9941,
                            longitude: 80.1709
                        }}
                        onPress={this.handleClick}>

                    </MapView.Marker> */}
                    {markerList}
                </MapView>
                <Text></Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: 'absolute',
        flex: 1,
        width: width,
        height: height
    }
});