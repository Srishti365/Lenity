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
  Form,
  Item,
  Picker,
  Icon,
  Button,
  Label,
  Input,
  Image,
  Grid,
  Row,
  Col
} from "native-base";
import { Actions } from "react-native-router-flux";

export default class restaurantLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLoggedin: false
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    //console.log(this.state);
    this.Login();
  };
  Login = async () => {
    var response = await axios.post(
      "http://10.0.55.37:8080/restaurant/signin",
      {
        email: this.state.email,
        password: this.state.password
      }
    );
    console.log(response.data);
    await AsyncStorage.setItem("jwtToken", response.data.token);
    const value = await AsyncStorage.getItem("jwtToken");
    console.log("tokennnnnhao", value);
    this.setState({ isLoggedin: true });
    this.switch();

    // this.setState({
    //   avail_quantity: response.data.Available,
    //   text: "Items Available"
    // });
  };
  switch() {
    if (this.state.isLoggedin) {
      Actions.restaurantProfile();
    }
  }

  render() {
    let { height, width } = Dimensions.get("window");

    return (
      <Container>
        <ImageBackground
          source={require("./restaurantlogin.jpg")}
          style={{
            width: width,
            height: height
          }}
        >
          <Content contentContainerStyle={{ flex: 1 }} style={{ padding: 10 }}>
            <Grid style={{ alignItems: "center", justifyContent: "center" }}>
              <Row>
                <Col>
                  <Text
                    style={{
                      fontSize: 50,
                      paddingTop: 30,
                      marginLeft: 50,
                      color: "white"
                    }}
                  >
                    Lettuce Eat
                  </Text>
                  <Icon
                    name="md-wine"
                    style={{ fontSize: 200, marginLeft: 100, color: "white" }}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form>
                    <Item floatingLabel>
                      <Icon active name="mail" style={{ color: "white" }} />

                      <Label style={{ color: "white" }}>Email</Label>
                      <Input
                        value={this.state.email}
                        onChangeText={val => this.setState({ email: val })}
                        style={{ color: "white" }}
                      />
                    </Item>
                    <Item floatingLabel>
                      <Icon active name="lock" style={{ color: "white" }} />

                      <Label style={{ color: "white" }}>Password</Label>
                      <Input
                        value={this.state.password}
                        onChangeText={val => this.setState({ password: val })}
                        secureTextEntry
                        style={{ color: "white" }}
                      />
                    </Item>
                    <Button
                      rounded
                      transparent
                      onPress={this.handleSubmit}
                      style={{
                        paddingLeft: 25,
                        marginTop: 20,
                        marginLeft: 130,
                        width: 100,
                        backgroundColor: "white"
                      }}
                    >
                      <Text>LOGIN</Text>
                    </Button>
                  </Form>
                </Col>
              </Row>
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
