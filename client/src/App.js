import React, { Component } from 'react';

import {
  Container,
  Navbar,
  NavbarBrand,
  Row,
  FormGroup,
  Jumbotron,
  InputGroup,
  InputGroupAddon,
  Button,
  Input,
  Col
} from 'reactstrap';

import Weather from './Weather';

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      weather: null,
      cityList:[],
      newCityName: ''
    };
  }

getCityList = () => {
  fetch('/api/cities/')
  .then(res => res.json())
  .then(res =>{
    var cityList = res.map(r => r.city_name);
    this.setState({cityList});
  });
};

handleInputChange = (e) => {
  this.setState({newCityName: e.target.value});
}

handleAddCity = () => {
  fetch('/api/cities/', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ city: this.state.newCityName})
  })
  .then(res => res.json())
  .then(res =>{
    this.getCityList();
    this.setState({ newCityName: ''});
  });
}

  getWeather = (city) => {
    fetch(`/api/weather/${city}`)
    .then(res => res.json())
    .then(weather => {
      console.log(weather);
      this.setState({ weather });
    });
}
handleChangeCity = (e) => {
  this.getWeather(e.target.value)
}

componentDidMount () {
  this.getCityList();
}

  render() {
    return (
      <Container fluid className = "centered">
        <Navbar dark color ="dark">
          <NavbarBrand href="/"> WeatherApplication</NavbarBrand>
        </Navbar>
      <Row>
          <Col>
          <Jumbotron>
              <h1 className="display-3">Look how cold it is!</h1>
              <p className="lead">Weather from city you select</p>
                <InputGroup>
            <Input
              placeholder="City name goes here..."
              value = {this.state.newCityName}
              onChange= {this.handleInputChange}
            />
            <InputGroupAddon addonType ="append">
              <Button color="primary" onClick= {this.handleAddCity}>Add</Button>
            </InputGroupAddon>
            </InputGroup>
          </Jumbotron>
          </Col>
      </Row>
      <Row>
          <Col>
          <h1 className = 'display-5'> current weather</h1>
          <FormGroup> 
              <Input type="select" onChange = {this.handleChangeCity}>
                { this.state.cityList.length === 0 && <option> no cities aded.</option> }
                { this.state.cityList.length >0 && <option>select a city</option>}
                { this.state.cityList.map((city, i) => <option key = {i}>{city} </option>)}
              </Input>
          </FormGroup>
          </Col>
      </Row>
      <Weather data= {this.state.weather}/>
      </Container>
    );
  }
}

export default App;
