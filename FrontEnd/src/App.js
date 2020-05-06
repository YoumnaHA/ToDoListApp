// import React, { Component } from "react";
// import { BrowserRouter as Router, Route, Switch, NavLink, Redirect, withRouter } from "react-router-dom";
// import { Button } from 'reactstrap';
// // import {hashHistory} from 'react-router'

// import Login from "./components/login/login";
// import Signup from "./components/signup/signup";
// import Project from "./routes/Project";
// import Home from './components/home/Home'
// import PasswordOublie from "./components/login/PasswordOublie";
// import Tasks from "./components/tasks/Tasks";
// import Auth from './components/auth/auth'


// class App extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       user: undefined
//     }
//   }

//   componentDidMount() {
//     const user = Auth.getUser()

//     if (user) {
//       this.setState({ user })
//     }
//     // Auth.logout()
//   }

//   render() {
//     const { user } = this.state
//     // console.log(user)

//     // return (
//     //   <Router>
//     //     APP
//     //     {!user && <Login updateUser={this.updateUser} />

//     //     }
//     //     {user &&

//     //       <Project user={user} />
//     //     }
//     //   </Router>
//     // )

//     if (user) {
//       return (
//         <Router>
//           <Switch>
//             <Route exact path="/">
//               <Home />
//             </Route>
//             <Route path="/passwordOublie">
//               <Home />
//             </Route>

//             <Route exact path="/login">
//               <Home />

//             </Route>
//             <Route exact path="/signup">
//               <Home />

//             </Route>
//             <Route exact path="/todos">
//               <Project />
//             </Route>

//             <Route exact path="/tasks">
//               <Tasks />
//             </Route>
//             <Route path='*' component={() => "404 Not Found"} />
//           </Switch>
//         </Router>
//       )
//     } else {
//       return (
//         <Router>
//           <Switch>
//             <Route path="/signout">
//               <Login />
//             </Route>
//             <Route path="/passwordOublie">
//               <PasswordOublie />
//             </Route>
//             <Route exact path="/signup">
//               <Signup />
//             </Route>
//             <Route exact path="/">
//               <Login />
//             </Route>
//             <Route exact path="/login">
//               <Login />
//             </Route>
//             <Route path='*' >
//               <Login />
//             </Route>
//           </Switch>
//         </Router>
//       )
//     }


//     // return (
//     //   <Router>
//     //     <Switch>
//     //       <Route path="/passwordOublie">
//     //         <PasswordOublie />
//     //       </Route>
//     //       <Route exact path="/tasks">
//     //         <Tasks />
//     //       </Route>
//     //       <Route exact path="/login">
//     //         {user ?
//     //           <Home />
//     //           :
//     //           <Login />
//     //         }
//     //       </Route>
//     //       <Route exact path="/signup">
//     //         <Signup />
//     //       </Route>
//     //       <Route exact path="/todos">
//     //         <Project />
//     //       </Route>
//     //       <Route exact path="/">
//     //         {user ?
//     //           <Home />
//     //           :
//     //           <Login />
//     //         }
//     //       </Route>
//     //       <Route exact path="/login">
//     //         <Login />
//     //       </Route>



//     //       <Route path='*' component={() => "404 Not Found"} />
//     //     </Switch>
//     //   </Router>
//     // );
//   }
// }

// export default App;

// // module.exports = {
// //   App:  App,
// //   Car:  Car
// // }

// // module.exports = {
// //   Car:Car
// // }


// //token api
// //https://www.youtube.com/watch?v=I3PC8pV1SBM



import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, NavLink, Redirect, withRouter } from "react-router-dom";
import { Button } from 'reactstrap';
// import {hashHistory} from 'react-router'
import Login from "./components/login/login";
import Signup from "./components/signup/signup";
import Home from './components/home/Home'
import PasswordOublie from "./components/login/PasswordOublie";
import Tasks from "./components/tasks/Tasks";
import Auth from './components/auth/auth';
import Loading from './components/loading/loading';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: undefined,
      load: true
    }
  }
  componentDidMount() {
    const user = Auth.getUser()
    setTimeout(() => {
      if (user) {
        this.setState({ user })
      }
      this.setState({ load: false })
    }, 1000)
    // Auth.logout()    
  }
  render() {
    const { user } = this.state

    if (this.state.load) {
      return <Loading />
    }
    if (user) {
      return (
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/passwordOublie">
              <Home />
            </Route>
            <Route exact path="/login">
              <Home />
            </Route>
            <Route exact path="/signup">
              <Home />
            </Route>
            <Route exact path="/tasks">
              <Tasks />
            </Route>
            <Route exact path="/settings">
              <Home />
            </Route>
            <Route path='*' component={() => "404 Not Found"} />
          </Switch>
        </Router>
      )
    } else {
      return (
        <Router>
          <Switch>
            <Route path="/signout">
              <Login />
            </Route>
            <Route path="/passwordOublie">
              <PasswordOublie />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/">
              <Login />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route path='*' >
              <Login />
            </Route>
          </Switch>
        </Router>
      )
    }
  }
}
export default App;
