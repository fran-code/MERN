import React, { Component } from 'react';
import Auth from './Auth';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

class Navigation extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <Navbar bg="light" expand="lg" className="shadow-sm" sticky="top">
                <Navbar.Brand href="#" onClick={() => {
                    Auth.login(() => {
                        this.props.history.push("/home");
                    });
                }}>Mis Notas</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link onClick={() => {
                            Auth.login(() => {
                                this.props.history.push("/createNote");
                            });
                        }}>Crear Nota</Nav.Link>
                    </Nav>
                    <Form inline>
                        <Button variant="outline-primary" onClick={() => {
                            Auth.logout(() => {
                                this.props.history.push("/");
                            });
                        }}
                        >Logout</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        )
    }
};

export default withRouter(Navigation);