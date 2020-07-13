import React from "react";
import { View, AsyncStorage, Alert } from "react-native";
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
  Drawer,
  Label,
  Input,
  Text,
  List,
  ListItem
} from "native-base";
import { Actions } from "react-native-router-flux";
import TruckLogin from "./TruckLogin";
import CustomHeader from "./CustomHeader";
import SideBar from "./sidebar";

export default class PendingDeliveries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      PendingDeliveries: {}
    };
  }
  handleSubmit = async () => {
    console.log("handlesubmitcalled");
    await AsyncStorage.removeItem("jwtToken");
    console.log("tokenremoved");
    Actions.reset("TruckLogin");
  };
  // search = async () => {
  //   const token = await AsyncStorage.getItem("jwtToken");
  //   console.log("token", token);
  //   console.log("stateeee", this.state.location);
  //   let config = {
  //     headers: { Authorization: token },
  //     params: {
  //       location: this.state.location
  //     }
  //   };
  //   var response = await axios.get(
  //     "http://192.168.42.130:8080/findStorage",
  //     config
  //   );
  //   console.log("response received");
  //   console.log("storage response", response);
  // };

  // requestDelivery = async () => {
  //   const token = await AsyncStorage.getItem("jwtToken");
  //   console.log("token", token);

  //   var response = await axios.post(
  //     "http://192.168.42.130:8080/findStorage/confirm",
  //     {
  //       name: this.state.name,
  //       location: this.state.deliverLocation,
  //       quantity: this.state.quantity,
  //       storage: this.state.storage
  //     },

  //     {
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         Authorization: token
  //       }
  //     }
  //   );
  //   console.log("confirmmmm response", response);
  // };
  componentDidMount() {
    this.getpendingRequests();
  }

  //   getrequests = async () => {
  //     const token = await AsyncStorage.getItem("jwtToken");

  //     var response = await axios.get("http://192.168.42.130:8080/delivery", {
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         Authorization: token
  //       }
  //     });
  //     console.log("response received truck", response.data);
  //     this.setState(
  //       { truck_data: response.data.truck_data, isLoading: false },
  //       () => {
  //         //console.log(this.state.user.email);
  //         console.log("state now", this.state.truck_data);
  //         console.log(this.state.isLoading, "..state updated");
  //       }
  //     );

  //     this.state.truck_data.map((x, index) =>
  //       console.log("indivifdual", x.location)
  //     );
  //   };

  getpendingRequests = async () => {
    const token = await AsyncStorage.getItem("jwtToken");

    var response = await axios.get(
      "http://10.0.55.37:8080/delivery/pending",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token
        }
      }
    );
    console.log("response received 111 pending", response.data);
    this.setState(
      { PendingDeliveries: response.data, isLoading: false },
      () => {
        console.log("im innnn");
        //console.log(this.state.user.email);
        console.log("state now of pending-----", this.state.PendingDeliveries);
        console.log(
          "state now of pending deievres-----",
          this.state.PendingDeliveries.deliveries
        );
      }
    );

    this.state.PendingDeliveries.deliveries.map((x, index) =>
      console.log("indivifdual 333 pending", x.location)
    );
  };
  confirmdetails = async (event, value) => {
    const token = await AsyncStorage.getItem("jwtToken");

    console.log("button pressed", value);
    var response = await axios.post(
      "http://10.0.55.37:8080/delivery",
      {
        id: value
      },

      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token
        }
      }
    );
    console.log("response crop type item", response.data.details.cropType);
    this.setState({ selectedCrop: response.data.details }, () => {
      //console.log(this.state.user.email);
      console.log("state now of selected crop", this.state.selectedCrop);
    });
    Actions.PendingDetails({ details: this.state.selectedCrop });
  };

  closeDrawer = () => {
    this.drawer._root.close();
  };
  openDrawer = () => {
    this.drawer._root.open();
  };
  // confirmrequest = async (event, value) => {
  //   const token = await AsyncStorage.getItem("jwtToken");

  //   console.log("button pressed", value);
  //   var response = await axios.post(
  //     "http://192.168.43.234:8080/delivery/pending",
  //     {
  //       id: value
  //     },

  //     {
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         Authorization: token
  //       }
  //     }
  //   );
  //   console.log("response confirm request", response.data);
  //   this.setState({ isLoading: false }, () => {
  //     console.log("request confirmedddddd");
  //     Actions.reset("Profile");

  //     //console.log(this.state.user.email);
  //     //console.log("state now of selected crop", this.state.selectedCrop);
  //   });

  //   //Actions.RequestDetails({ details: this.state.selectedCrop });
  // };

  render() {
    if (!this.state.isLoading) {
      var rendered = this.state.PendingDeliveries.deliveries.map(data => {
        if (!data.status) {
          return (
            <Button
              key={data._id}
              value={data._id}
              onPress={event => this.confirmdetails(event, data._id)}
            >
              <Text>
                {data.location} from {data.name} CONFIRM
              </Text>
            </Button>
          );
        }
      });
      return (
        <Container>
          <Drawer
            ref={ref => {
              this.drawer = ref;
            }}
            content={<SideBar onClose={this.closeDrawer} />}
            onClose={() => this.closeDrawer()}
          >
            <CustomHeader title={"Scene1"} onOpen={this.openDrawer} />
            <Content>
              <View>
                <Text>Your pending deliveries</Text>
              </View>
              <View>{rendered}</View>
            </Content>
          </Drawer>
        </Container>
      );
    } else {
      return <CustomHeader />;
    }

    // return (
    //   <Container>
    //     <Header />
    //     <Content>
    //       <Text>Hello welcome</Text>
    //       <Text>
    //         {!this.state.isLoading ? (
    //           <Text>
    //             {this.state.truck_data.map((data, index) => (
    //               <List>
    //                 {!(data.status || data.confirm_status) ? (
    //                   <ListItem>
    //                     <Text>{data.location}</Text>
    //                   </ListItem>
    //                 ) : (
    //                   <Text>emoty</Text>
    //                 )}
    //               </List>
    //             ))}
    //           </Text>
    //         ) : (
    //           <Text>Loading...</Text>
    //         )}
    //       </Text>

    //       <Button rounded light onPress={this.handleSubmit}>
    //         <Text>Logout</Text>
    //       </Button>
    //     </Content>
    //   </Container>
    // );
  }
}
