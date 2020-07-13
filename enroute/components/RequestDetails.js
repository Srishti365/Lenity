import React, { Component } from "react";
import {
  View,
  Text,
  AsyncStorage,
  StyleSheet,
  ImageBackground,
  Dimensions
} from "react-native";
import axios from "axios";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Form,
  Item,
  Picker,
  Icon,
  Button,
  Label,
  Input,
  Image,
  Body,
  Grid,
  Col
} from "native-base";
import { Actions } from "react-native-router-flux";

export default class RequestDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLoggedin: false,
      details1: {},
      startLat: null,
      startLong: null,
      endLat: null,
      endLong: null
    };
  }
  componentDidMount() {
    this.setState({ details1: this.props.details }, () => {
      //console.log(this.state.user.email);
      console.log("state receivedd settingg", this.state.details1);
      console.log("name", this.state.details1.name);
    });
  }
  accept = async (event, value) => {
    const token = await AsyncStorage.getItem("jwtToken");

    //console.log("button pressed", value);
    var response = await axios.post(
      "http://10.0.55.37:8080/delivery/confirm_pickup",
      {
        id: this.state.details1._id
      },

      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token
        }
      }
    );
    console.log("accept response", response.data);

    Actions.reset("Profile");
  };

  viewRoute = async (event, value) => {
    const token = await AsyncStorage.getItem("jwtToken");

    //console.log("button pressed", value);
    var response = await axios.post(
      "http://10.0.55.37:8080/delivery/view_route",
      {
        id: this.state.details1._id
      },

      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token
        }
      }
    );
    console.log("route response", response.data);
    this.setState(
      {
        startLat: response.data.lat_truck,
        startLong: response.data.long_truck,
        endLat: response.data.lat_stor,
        endLong: response.data.long_stor
      },
      () => {
        console.log(
          "latlongs: ",
          this.state.startLat,
          this.state.startLong,
          this.state.endLat,
          this.state.endLong
        );
      }
    );

    //Actions.reset("Profile");
    Actions.GMaps({
      stLat: this.state.startLat,
      stLong: this.state.startLong,
      desLat: this.state.endLat,
      desLong: this.state.endLong
    });
  };

  // this.setState({
  //   avail_quantity: response.data.Available,
  //   text: "Items Available"
  // });

  render() {
    let { height, width } = Dimensions.get("window");

    return (
      <Container>
        <ImageBackground
          source={require("./galaxy.jpg")}
          style={{
            width: width,
            height: height
          }}
        >
          <Header />

          <Content contentContainerStyle={{ flex: 1 }} style={{ padding: 10 }}>
            <Grid style={{ alignItems: "center" }}>
              <Col>
                <Card>
                  <CardItem header bordered>
                    <Text>{this.state.details1.name}</Text>
                  </CardItem>
                  <CardItem bordered>
                    <Body>
                      <Text>Crop Type:{this.state.details1.cropType}</Text>
                      <Text>
                        Pickup Location:{this.state.details1.location}
                      </Text>
                      <Text>
                        Cold Storage Location:
                        {this.state.details1.storage_location}
                      </Text>
                    </Body>
                  </CardItem>
                  <CardItem footer bordered>
                    <Button onPress={this.accept}>
                      <Text>Accept</Text>
                    </Button>
                    <Button onPress={this.viewRoute}>
                      <Text>View Route</Text>
                    </Button>
                  </CardItem>
                </Card>
              </Col>
            </Grid>
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}

let styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center"
  }
});
