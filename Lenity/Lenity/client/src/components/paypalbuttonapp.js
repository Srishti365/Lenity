import React from "react";
import PaypalButton from "./paypalbutton";
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const CLIENT = {
  sandbox:
    "AY-WmDahbCVjmXeE2ziZdKciW0D_ycY9b6Hr0oeCTfS10ZuEheBay48AcdP4Iji3jl0Xd-ITGxuy8jI0",
  production: ""
};
const ENV = process.env.NODE_ENV === "production" ? "production" : "sandbox";

class PaypalButtonApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      payment: null,
      redirect: false
    }
  }

  // componentDidMount() {
  //   this.getResponse();
  // }

  // async getResponse() {
  //   const response = await axios.post("http://localhost:8080/item/requests", {
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       Authorization: localStorage.getItem("JWT_TOKEN")
  //     }
  //   });
  //   console.log('lala',response.data.total);
  //   this.setState({
  //     total : response.data.total
  //   })
  // }
  payToLenity = async () => {
    var res = await axios.post("http://localhost:8080/payment", {
      paymentid: this.state.payment.paymentID,
      payerid: this.state.payment.payerID,
      paymenttoken: this.state.payment.paymentToken,
      // concat_vals:this.props.location.state.concat_vals,
      total: 100
    }, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("JWT_TOKEN")
      }

    })
  }

  render() {
    const onSuccess = (payment) => {
      console.log("Successful payment!", payment);
      this.setState({
        payment: payment
      });
      //console.log('Email: ', this.state.payment.email);
      console.log('Paymentid: ', this.state.payment.paymentID);
      //console.log('recipient: ', this.state.payment.recipient_name);
      console.log('payerid: ', this.state.payment.payerID);
      console.log('payment token: ', this.state.payment.paymentToken);
      // console.log('concat: ', this.props.location.state.concat_vals);


      this.payToLenity().then(() => {
        this.setState({
          redirect: true
        });
      });
    }
    const onError = error =>
      console.log("Erroneous payment OR failed to load script!", error);
    const onCancel = data => console.log("Cancelled payment!", data);
    if (this.state.redirect) {
      return <Redirect to="/dashboard"></Redirect>
    }
    return (
      <div>
        <PaypalButton
          client={CLIENT}
          env={ENV}
          commit={true}
          currency={"INR"}
          total={100}
          onSuccess={onSuccess}
          onError={onError}
          onCancel={onCancel}
        />


      </div>
    );
  }
}
export default PaypalButtonApp;

// import React, { useState, useRef, useEffect } from "react";

// function PaypalButtonApp() {
//   const [paidFor, setPaidFor] = useState(false);
//   const [loaded, setLoaded] = useState(false);

//   let paypalRef = useRef();

//   const product = {
//     price: 1
//   };

//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src =
//       "https://paypal.com/sdk/js?client-id=AQ2EvsceT2kqOaIVXZ2Fk9Mr_vhvbag_o-jZsv4nGTi3ZRclQ9dm1c4xIfgOy3rbgttpVu7UN2H4P8IG";
//     script.addEventListener("load", () => setLoaded(true));
//     document.body.appendChild(script);

//     if (loaded) {
//       setTimeout(() => {
//         window.paypal
//           .Buttons({
//             createOrder: (data, actions) => {
//               return actions.order.create({
//                 purchase_units: [
//                   {
//                     amount: {
//                       currency_code: "USD",
//                       value: product.price
//                     }
//                   }
//                 ]
//               });
//             },
//             onApprove: async (data, actions) => {
//               const order = await actions.order.capture();

//               setPaidFor(true);

//               console.log(order);
//             }
//           })
//           .render(paypalRef);
//       });
//     }
//   });

//   return (
//     <div>
//       {paidFor ? (
//         <div>
//           <h1>Payment Successful!</h1>
//         </div>
//       ) : (
//         <div>
//           <h3> ${product.price} </h3>
//           <div ref={v => (paypalRef = v)} />
//         </div>
//       )}
//     </div>
//   );
// }

// export default PaypalButtonApp;

// import React from "react";
// import PaypalExpressBtn from "react-paypal-express-checkout";

// export default class PaypalButtonApp extends React.Component {
//   render() {
//     const onSuccess = payment => {
//       // Congratulation, it came here means everything's fine!
//       console.log("The payment was succeeded!", payment);
//       // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
//     };

//     const onCancel = data => {
//       // User pressed "cancel" or close Paypal's popup!
//       console.log("The payment was cancelled!", data);
//       // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
//     };

//     const onError = err => {
//       // The main Paypal's script cannot be loaded or somethings block the loading of that script!
//       console.log("Error!", err);
//       // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
//       // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
//     };

//     let env = "sandbox"; // you can set here to 'production' for production
//     let currency = "USD"; // or you can set this value from your props or state
//     let total = 1; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
//     // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/

//     const client = {
//       sandbox:
//         "AQ2EvsceT2kqOaIVXZ2Fk9Mr_vhvbag_o-jZsv4nGTi3ZRclQ9dm1c4xIfgOy3rbgttpVu7UN2H4P8IG",
//       production: ""
//     };
//     // In order to get production's app-ID, you will have to send your app to Paypal for approval first
//     // For sandbox app-ID (after logging into your developer account, please locate the "REST API apps" section, click "Create App"):
//     //   => https://developer.paypal.com/docs/classic/lifecycle/sb_credentials/
//     // For production app-ID:
//     //   => https://developer.paypal.com/docs/classic/lifecycle/goingLive/

//     // NB. You can also have many Paypal express checkout buttons on page, just pass in the correct amount and they will work!
//     return (
//       <PaypalExpressBtn
//         env={env}
//         client={client}
//         currency={currency}
//         total={total}
//         onError={onError}
//         onSuccess={onSuccess}
//         onCancel={onCancel}
//       />
//     );
//   }
// }
