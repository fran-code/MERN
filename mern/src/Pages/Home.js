import React, { Component } from 'react';
import '../App.css';
import Navigation from '../components/Navigation';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { format } from 'timeago.js'
import { connect } from "react-redux";

const mapStateToProps = state => {
  return state;
};

class HomeConn extends Component {
  constructor() {
    super();
    this.state = {
      notes: []
    }
  }

  async componentDidMount() {
    this.getNotes(this.props.user);
  }

  getNotes = async (user) => {
    const res = await axios.post('http://localhost:4000/api/notes/' + user)
    this.setState({
      notes: res.data
    });
  }

  deleteNote = async (noteId) => {
    await axios.delete('http://localhost:4000/api/notes/' + noteId);
    this.getNotes(this.props.user);
  }


  render() {
    return (
      <div>
        <Navigation />
        <Container>
          <Row className="p-2">
            {
              this.state.notes.map(note => (
                <Col className="p-1" key={note._id}>
                  <Card bg="primary" text="white" style={{ width: '18rem' }}>
                    <Card.Header className="text-center">
                      <h5>{note.title}</h5>
                    </Card.Header>
                    <Link to={{ pathname: `/createNote/${note._id}`, state: { id: note._id } }} className="btn btn-info">
                      <i className="fas fa-edit"> Editar</i>
                    </Link>
                    <Card.Body>
                      <p>
                        {note.content}
                      </p>
                      <p>
                        Fecha de finalización: {format(note.date)}
                      </p>
                      <p>
                        Fecha de creación: {format(note.createdAt)}
                      </p>
                    </Card.Body>
                    <Card.Footer>
                      <Button className="btn btn-danger" onClick={() => this.deleteNote(note._id)}>
                        Delete
                                    </Button>
                    </Card.Footer>
                  </Card>
                </Col>
              ))
            }
          </Row>
        </Container>
      </div>
    )
  }
};

const Home = connect(mapStateToProps)(HomeConn);
export default Home;