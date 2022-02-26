import React, { Component } from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import SwapiService from "../../services/swapi-service";
import DummySwapiService from "../../services/dummy-swapi-service";

import { PeoplePage, PlanetPage, StarshipPage, SecretPage, LoginPage } from "../pages";
import { SwapiServieProvider } from "../swapi-service-context/swapi-service-context";

import './app.css';

import {BrowserRouter as Router, Routes, Route, useParams} from 'react-router-dom';
import {PersonDetails, StarshipDetails} from "../sw-components";

export default class App extends Component {

    state = {
        swapiService: new SwapiService(),
        isLoggedIn: false
    };

    onLogin = () => {
        this.setState({
            isLoggedIn: true
        });
    };

    onServiceChange = () => {
      this.setState(({swapiService}) => {
          const Service = swapiService instanceof SwapiService ? DummySwapiService : SwapiService;
          return{
              swapiService: new Service()
          };
      });
    };

    render() {

        const { isLoggedIn } = this.state;

        return (
            <ErrorBoundry>
                <SwapiServieProvider value={this.state.swapiService}>
                    <Router>
                        <div className="stardb-app">
                            <Header onServiceChange={this.onServiceChange} />
                            <RandomPlanet />
                            <Routes>
                                <Route path="/" element={<Welcome/>}/>
                                <Route path="people">
                                    <Route path="" element={<PeoplePage/>} />
                                    <Route path=":id" element={<PersonDetails/>}/>
                                </Route>
                                <Route path="/planets" element={<PlanetPage/>} />
                                <Route path="starships">
                                    <Route path="" element={<StarshipPage/>}/>
                                    <Route path="/starships/:id" element={<StarshipDetails/>}/>
                                </Route>
                                <Route path="/login" element={<LoginPage isLoggedIn={isLoggedIn} onLogin={this.onLogin}/>}/>
                                <Route path="/secret" element={<SecretPage isLoggedIn={isLoggedIn}/>}/>
                            </Routes>
                        </div>
                    </Router>
                </SwapiServieProvider>
            </ErrorBoundry>
        );
    }
}

const Welcome = () =>{
    return(
        <h2>Welcome to StarDB</h2>
    );
}
