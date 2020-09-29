import React ,{Component} from 'react';
import {Modal, Button, Row,Col,Form} from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';


export class EditEmpModal extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            snackbaropen:false,
            snackbarmsg:''
        }
        this.handleSubmit =this.handleSubmit.bind(this);
    }

    snackbarClose = () => 
    {
        this.setState({
            snackbaropen:false
        });
    }
    

    handleSubmit(e)
    {
        e.preventDefault();
        fetch('http://localhost:63521/api/employee',
        {
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                EmployeeID:     e.target.EmployeeID.value,
                EmployeeName:   e.target.EmployeeName.value,
                Department:     e.target.Department.value,
                MailID:         e.target.MailID.value,
                DOJ:            e.target.DOJ.value,
            })
        }).then(res => res.json()).then((result)=>{
            this.setState({
                snackbaropen:true,
                snackbarmsg:result
            });
        },
            (error) => {
                this.setState({
                    snackbaropen:true,
                    snackbarmsg:'Failed'
                });
            }
        )
    }
    
    render()
    {
        return(
        <div className="container">
        
            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Add Department
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            
                <Row>
                    <Col sm={6}>
                        <Form onSubmit={this.handleSubmit}>


                            <Form.Group controlId="EmployeeID">
                                <Form.Label>
                                    Employee ID
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="EmployeeID"
                                    required
                                    disabled
                                    defaultValue={this.props.empid}
                                    placeholder="EmployeeID"
                                />
                            </Form.Group>


                            <Form.Group controlId="EmployeeName">
                                <Form.Label>
                                    Employee Name
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="EmployeeName"
                                    required
                                    defaultValue={this.props.empname}
                                    placeholder="EmployeeName"
                                />
                            </Form.Group>

                            <Form.Group controlId="Department">
                                <Form.Label>
                                    Department
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="Department"
                                    required
                                    defaultValue={this.props.department}
                                    placeholder="Department"
                                />
                            </Form.Group>

                            <Form.Group controlId="MailID">
                                <Form.Label>
                                    Mail ID
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="MailID"
                                    required
                                    defaultValue={this.props.mailid}
                                    placeholder="MailID"
                                />
                            </Form.Group>

                            <Form.Group controlId="DOJ">
                                <Form.Label>
                                    Date Of Joining
                                </Form.Label>
                                <Form.Control
                                    type="date"
                                    name="DOJ"
                                    required
                                    defaultValue={this.props.doj}
                                    placeholder="DOJ"
                                />
                            </Form.Group>

                            
                            <Form.Group>
                                <Button variant="success" type="submit">
                                    Update Employee
                                </Button>
                                <Snackbar 
                                    anchorOrigin={{vertical:'center', horizontal:'center'}}
                                    open={this.state.snackbaropen}
                                    autoHideDuration={3000}
                                    onClose={this.snackbarClose}
                                    message={<span id="message-id">{this.state.snackbarmsg}</span>}
                                    action={[
                                        <IconButton key="close" aria-label="close" color="inherit" onClick={this.snackbarClose}>
                                            x
                                        </IconButton>
                                    ]}
                                ></Snackbar>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
            
            </Modal>
            
        </div>
        )
    }
}