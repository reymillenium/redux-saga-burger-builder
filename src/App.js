// Not working properly yet: Lazy loading with React.lazy() and using suspense (after React 16.2)
// import React, {Component, Suspense} from 'react';
import React, {Component} from 'react';
// import './App.css';
// Routes & redirect:
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';

// Redux:
import {connect} from 'react-redux';
import * as actionCreators from "./store/actions/index";

// Additional:
import Auxiliary from './hoc/Auxiliary/Auxiliary';
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

// Containers & Components:
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
// import Checkout from "./containers/Checkout/Checkout";
// import Orders from "./containers/Orders/Orders";
// import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";

// Lazy Containers & Components:
// Not working properly yet: Lazy loading with React.lazy() (after React 16.2)
// const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));
// Working fine: Lazy loading with asyncComponent
const Checkout = asyncComponent(() => import("./containers/Checkout/Checkout"));
const Orders = asyncComponent(() => import("./containers/Orders/Orders"));
const Auth = asyncComponent(() => import("./containers/Auth/Auth"));


class App extends Component {

    componentDidMount() {
        this.props.onAuthCheckState();
    }

    render() {
        let routes = (
            <Switch>
                <Route path={"/auth"} component={Auth}/>
                <Route path={"/"} exact component={BurgerBuilder}/>
                <Redirect to={"/"}/>
            </Switch>
        );

        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    {/* Not working properly yet: */}
                    {/*<Route path={"/checkout"} render={() => (*/}
                    {/*    <Suspense fallback={<div>Loading...</div>}>*/}
                    {/*        <Checkout/>*/}
                    {/*    </Suspense>*/}
                    {/*)}/>*/}
                    <Route path={"/checkout"} component={Checkout}/>
                    <Route path={"/orders"} component={Orders}/>
                    <Route path={"/auth"} component={Auth}/>
                    <Route path={"/logout"} component={Logout}/>
                    <Route path={"/"} exact component={BurgerBuilder}/>
                    <Redirect to={"/"}/>
                </Switch>
            );
        }


        // let routes = null;
        //
        // if (this.props.isAuthenticated) {
        //     routes = (
        //         <Switch>
        //             <Route path={"/checkout"} component={Checkout}/>
        //             <Route path={"/orders"} component={Orders}/>
        //             <Route path={"/auth"} component={Auth}/>
        //             <Route path={"/logout"} component={Logout}/>
        //             <Route path={"/"} component={BurgerBuilder}/>
        //             <Redirect to={"/"}/>
        //         </Switch>
        //     );
        // } else {
        //     routes = (
        //         <Switch>
        //             <Route path={"/auth"} component={Auth}/>
        //             <Route path={"/"} component={BurgerBuilder}/>
        //             <Redirect to={"/"}/>
        //         </Switch>
        //     );
        // }

        return (
            <Auxiliary>
                <Layout>
                    {routes}
                    {/*<Switch>*/}
                    {/*    <Route path={"/checkout"} component={Checkout}/>*/}
                    {/*    <Route path={"/orders"} component={Orders}/>*/}
                    {/*    <Route path={"/auth"} component={Auth}/>*/}
                    {/*    <Route path={"/logout"} component={Logout}/>*/}
                    {/*    <Route path={"/"} component={BurgerBuilder}/>*/}
                    {/*</Switch>*/}
                </Layout>
            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.idToken !== null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuthCheckState: () => dispatch(actionCreators.authCheckState())
    }
};

// export default App;
// export default connect(null, mapDispatchToProps)(App);
// withRoute will enforce your props being passed down to the App component and therefore the react router
// ...is back on the page and we'll know whats getting loaded
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
