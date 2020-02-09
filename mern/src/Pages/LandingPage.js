import React, { Component } from 'react';
import Auth from '../components/Auth';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { connect } from "react-redux";
import { storeUser } from "../redux/actions/index";

function mapDispatchToProps(dispatch) {
    return {
        storeUser: users => dispatch(storeUser(users)),
    };
}

class LandingPageConn extends Component {
    constructor() {
        super();
        this.state = {
            user: '',
            pass: '',
            query: ''
        };
        this.validaLogin = this.validaLogin.bind(this);
        this.handleInput = this.handleInput.bind(this);
        window.loginPage = this;
    }

    handleInput(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    logea() {
        const { user } = this.state;
        this.props.storeUser({ user });
        Auth.login(() => {
            this.props.history.push("/home");
        });
    }

    async validaLogin(e) {
        e.preventDefault();
        const input = { user: this.state.user, password: this.state.pass };
        const res = userQuery({ input });
        this.setState({
            query: res,
            pass: ''
        });
    }

    render() {
        return (
            <Container>
                <Row className="justify-content-center pt-5">
                    <Form className="login-form p-5" onSubmit={this.validaLogin}>
                        <h2 className="text-center">Bienvenido</h2>
                        <Form.Group controlId="formGroupUsuario" className="pt-3">
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroupPrepend"><i className="fas fa-user"></i></InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    type="text"
                                    placeholder="Usuario"
                                    aria-describedby="inputGroupPrepend"
                                    name="user"
                                    value={this.state.user}
                                    onChange={this.handleInput}
                                />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group controlId="formGroupPassword">
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroupPrepend2"><i className="fas fa-key"></i></InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    type="password"
                                    placeholder="Contraseña"
                                    aria-describedby="inputGroupPrepend2"
                                    name="pass"
                                    value={this.state.pass}
                                    onChange={this.handleInput}
                                />
                            </InputGroup>
                        </Form.Group>
                        <Button variant="primary" size="lg" block type="submit">Login</Button>
                    </Form>
                </Row>
                {this.state.query}
                <Link to="/SignUp"><h3 className="text-center text-info font-italic"><u>No tienes cuenta?</u></h3></Link>
            </Container>
        )
    }
};

const LOGIN_QUERY = gql`
query getUser($input: UserInput!){
    getUser(input: $input){
      _id
    }
  }
`;

const userQuery = (input) => {
    return (
        <Query query={LOGIN_QUERY}
            variables={input}
        >
            {
                ({ loading, error, data }) => {
                    if (loading) return <h4 className="text-center text-warning">Procesando...</h4>
                    if (error) return <h4 className="text-center text-danger">Error procesando la petición</h4>
                    if (data.getUser.length) {
                        window.loginPage.logea();
                    }
                    return <h4 className="text-center text-danger">Usuario incorrecto</h4>
                }
            }
        </Query>
    );
}

const LandingPage = connect(
    null,
    mapDispatchToProps
)(LandingPageConn);

export default LandingPage;