import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios';
import Navigation from '../components/Navigation';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default class CreateNote extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            content: '',
            date: new Date(),
            author: '',
            users: [],
            editing: false,
            _id: ''
        }
    }

    async componentDidMount() {
        if (!this.props.match.isExact) {
            const res = await axios.get('http://localhost:4000/api/notes/' + this.props.history.location.state.id);
            this.setState({
                title: res.data.title,
                content: res.data.content,
                date: new Date(res.data.date),
                author: res.data.author,
                _id: res.data._id,
                editing: true
            });
        }
    }

    onSubmit = async (e) => {
        e.preventDefault();
        if (this.state.editing) {
            const updatedNote = {
                title: this.state.title,
                content: this.state.content,
                author: this.state.author,
                date: this.state.date
            };
            await axios.put('http://localhost:4000/api/notes/' + this.state._id, updatedNote);
        } else {
            const newNote = {
                title: this.state.title,
                content: this.state.content,
                author: this.state.author,
                date: this.state.date
            };
            await axios.post('http://localhost:4000/api/notes', newNote);
        }
        this.props.history.push("/home");
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onChangeDate = (date) => {
        this.setState({ date });
    }

    render() {
        return (
            <div>
                <Navigation />
                <Container>
                    <Col className="col-md-6 offset-md-3 pt-4">
                        <Card.Body>
                            <h4>Create a Note</h4>
                            <Form onSubmit={this.onSubmit}>
                                <Form.Group>
                                    <Form.Control
                                        type="text"
                                        className="form-control"
                                        placeholder="A hacer por"
                                        value={this.state.author}
                                        onChange={this.onInputChange}
                                        name="author"
                                        required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control
                                        type="text"
                                        className="form-control"
                                        placeholder="Título"
                                        onChange={this.onInputChange}
                                        name="title"
                                        value={this.state.title}
                                        required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control as="textarea"
                                        type="text"
                                        className="form-control"
                                        placeholder="Contenido"
                                        name="content"
                                        onChange={this.onInputChange}
                                        value={this.state.content}
                                        required>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <DatePicker className="form-control" selected={this.state.date} onChange={this.onChangeDate} />
                                </Form.Group>
                                <Button className="btn btn-primary" type="submit">Guardar <i className="material-icons"></i>
                                </Button>
                            </Form>
                        </Card.Body>
                    </Col>
                </Container>
            </div>
        )
    }
}
