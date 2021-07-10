import './App.css';
//import { useState } from 'react';
import React,{Component} from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import ProductScreen from './screens/ProductScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

import Navbar from './components/Navbar';
//import Backdrop from './components/Backdrop'
//import SideDrawer from './components/SideDrawer';
//import { useSelector } from 'react-redux';
import NotfoundScreen from './screens/NotfoundScreen';
import Logout from './components/Logout';
import { getCurrentUser } from "./services/authService";

class App extends Component {
  //const [sideToggle, setSideToggle] = useState(false);

  state = {
    user:null
  }
  componentDidMount(){
    const user = getCurrentUser();
    this.setState({user})
  }
render(){
  return (
    <React.Fragment>
      {/* <Navbar click={() => setSideToggle(true)} /> */}
      <Navbar user = {this.state.user} />
      {/* <Navbar user = {this.state.user}/> */}
      {/* <SideDrawer show={sideToggle} />
      <Backdrop show={sideToggle} click={() => setSideToggle(false)} /> */}
      <main>
        <Switch>
          <Route exact path="/checkout" component={CheckoutScreen} />
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/product/:id" component={ProductScreen} />
          {/* <Route exact path="/cart" component={CartScreen} /> */}

          <Route path="/cart" render = {(props)=>{
                if(this.state.user)
                    return <CartScreen prop1="somevalue" prop2="somevlaue" {...props} />
                else 
                  return <Redirect to="/login"/>
            }} />

          <Route path="/notfound" component={NotfoundScreen} />
          <Route path='/logout' component={Logout}/>
          <Route path='/register' component={RegisterForm} />

          <Route path='/login' component={LoginForm} />
          <Redirect to="/notfound"></Redirect>


        </Switch>
      </main>
    </React.Fragment>
  );
}
}

export default App;
