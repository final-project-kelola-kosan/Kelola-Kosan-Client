import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Button, Card, Table, Modal, Form } from 'react-bootstrap';
import { _, Grid } from 'gridjs-react';
import Sidebar from "./components/Sidebar";
import styles from "./styling/room.module.css"
import { useSelector, useDispatch } from "react-redux"
import { fetchRoom, deleteRoom } from "../store/actions/actions"
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { GrAdd } from "react-icons/gr";

function Room() {
  const dispatch = useDispatch();
  const rooms = useSelector(state => state.room.rooms);

  const [showAddForm, setShowAddForm] = useState(false)
  const handleCloseAddForm = () => setShowAddForm(false)

  const [addRoomNumber, setAddRoomNumber] = useState(0)
  const [addRoomStatus, setAddRoomStatus] = useState('')
  const [addRoomType, setAddRoomType] = useState('')
  const [addRoomPrice, setAddRoomPrice] = useState(0)

  function handleDeleteRoom(id) {
    dispatch(deleteRoom(id))
  }


  useEffect(() => {
    dispatch(fetchRoom());
  }, [])

  const handleCreate = () => {
    console.log("GW DI KLIK");
    setShowAddForm(true)
  }

  return (
    <Container fluid>
      <Row>
        <Col xs={2}>
          <Sidebar></Sidebar>
        </Col>
        <Col xs={10} style={{ padding: "20px" }}>
          <div className={styles.wrapper}>
            <h1 className={styles.title}>Rooms</h1>
            <div className="d-flex mb-3 justify-content-end align-items-center">
              <Button variant="primary rounded-pill" className="mr-5" onClick={() => handleCreate()}><GrAdd/> Add New Room</Button>
            </div>
            <div className={styles.content}>
              <Card className={styles.card}>
                <Card.Body className='flex-column'>
                  <Row>
                    <Col xs={9} onClick={() => console.log("STANDARD ROOMS")}>
                      12 Standard Rooms
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
              <Card className={styles.card}>
                <Card.Body className='flex-column'>
                  <Row>
                    <Col xs={9}>
                      5 Deluxe Rooms
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </div>
          </div>

          <Grid
            data={rooms.map((e) => {
              return [
                e.number,
                e.status.toUpperCase(),
                e.type.toUpperCase(),
                `Rp${e.price},00`,
                _(
                  <div style={{display: "flex", justifyContent: "space-around"}}>
                    {' '}
                    <Button
                      variant={'primary'}
                      // style={{color: "#fff", background: "#77acf1"}}
                      size='sm'
                      onClick={() => console.log(`${e.name} edited`)}
                    ><FaEdit />
                          Edit
                        </Button>{' '}
                    <Button
                      variant={'danger'}
                      size='sm'
                      onClick={() => { handleDeleteRoom(e.id) }}
                    ><MdDelete />
                          delete
                        </Button>{' '}
                  </div>
                ),
              ];
            })}
            columns={[
              'Room Number',
              'Status',
              'Type',
              'Price',
              {
                name: 'Action',
              }
            ]}
            sort={true}
            search={true}
            pagination={{
              enabled: true,
              limit: 10,
              summary: false,
            }}
            style={{
              table: {
                color: '#343f56',
              },
              th: {
                'background-color': '#343F56',
                'color': '#FFF',
                'text-align': 'center'
              },
              td: {
                'background-color': '##EEF3F8'
              },
              footer: {
                'background-color': '#343F56'
              }
            }}
          ></Grid>
          
          {/* MODAL ADD */}
          <Modal show={showAddForm} onHide={handleCloseAddForm}>
            <Modal.Header closeButton>
              <Modal.Title>Add Room</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId='formBasicEmail'>
                  <Form.Label>Room Number:</Form.Label>
                  <Form.Control
                    type="number" min={1}
                    value={addRoomNumber}
                    onChange={e => setAddRoomNumber(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId='formBasicEmail'>
                  <Form.Label>Room Status:</Form.Label>
                  <Form.Control
                    type="text"
                    value={addRoomStatus}
                    onChange={e => setAddRoomStatus(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId='formBasicEmail'>
                  <Form.Label>Room Type:</Form.Label>
                  <Form.Control
                    type="text"
                    value={addRoomType}
                    onChange={e => setAddRoomType(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId='formBasicEmail'>
                  <Form.Label>Room Price</Form.Label>
                  <Form.Control
                    type="number" min={1}
                    value={addRoomPrice}
                    onChange={e => setAddRoomPrice(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseAddForm}>Close</Button>
              <Button variant='primary'>Add</Button>
            </Modal.Footer>
          </Modal>

          {/* MODAL EDIT */}

        </Col>
      </Row>
    </Container>
  );
}

export default Room;
