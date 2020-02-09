import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

export default class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            user: '',
            pass: '',
            passRep: '',
            query: ''
        };
        this.creaUsuario = this.creaUsuario.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    creaUsuario(e) {
        e.preventDefault();
        if (this.state.pass !== this.state.passRep) {
            alert("Las contraseñas no coinciden");
            this.setState({
                pass: '',
                passRep: ''
            });
        } else {
            const input = { user: this.state.user, password: this.state.pass };
            const res = userMutation({ input });
            this.setState({
                query: res,
                user: '',
                pass: '',
                passRep: ''
            });
        }
    }

    render() {
        return (
            <Container>
                <Row className="justify-content-center py-5">
                    <Form className="login-form p-5" onSubmit={this.creaUsuario}>
                        <h2 className="text-center">Bienvenido</h2>
                        <Form.Group controlId="formGroupUsuario2" className="pt-3">
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroupPrepend3"><i className="fas fa-user"></i></InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    type="text"
                                    placeholder="Usuario"
                                    aria-describedby="inputGroupPrepend3"
                                    name="user"
                                    value={this.state.user}
                                    onChange={this.handleInput}
                                />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group controlId="formGroupPassword2">
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroupPrepend4"><i className="fas fa-key"></i></InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    type="password"
                                    placeholder="Contraseña"
                                    aria-describedby="inputGroupPrepend4"
                                    name="pass"
                                    value={this.state.pass}
                                    onChange={this.handleInput}
                                />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group controlId="formGroupPassword3">
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroupPrepend2"><i className="fas fa-key"></i></InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    type="password"
                                    placeholder="Repetir Contraseña"
                                    aria-describedby="inputGroupPrepend2"
                                    name="passRep"
                                    value={this.state.passRep}
                                    onChange={this.handleInput}
                                />
                            </InputGroup>
                        </Form.Group>
                        <Button variant="primary" size="lg" block type="submit">Crear</Button>
                    </Form>
                </Row>
                {this.state.query}
                <Link to="/"><h3 className="text-center text-info font-italic"><u>Ya tengo usuario</u></h3></Link>
            </Container>
        )
    }
};


const LOGIN_MUTATION = gql`
    mutation createUser($input: UserInput!){
        createUser(input: $input){
        _id
        }
    }
`;

const userMutation = (input) => {
    let llama = false;
    return (
        <Mutation mutation={LOGIN_MUTATION}>
            {
                (loginUser, { loading, error, data }) => {
                    if (loading) { return <h4 className="text-center text-warning">Procesando...</h4> }
                    if (error) {window.location.href = '/SignUp';}
                    if (data) { return <h4 className="text-center text-success">Usuario Creado</h4> }
                    if (llama === false) { llama = true; loginUser({ variables: input }) }

                }
            }
        </Mutation>
    );
}
