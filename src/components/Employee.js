import React, { Component } from 'react';
import { Table, Button, ButtonToolbar } from "react-bootstrap";
import { AddEmpModal } from './AddEmpModal';
import { EditEmpModal } from './EditEmpModal';

export class Employee extends Component {
    
    constructor(props){
        super(props);
        this.state ={
            employees:[],
            addModalShow:false,
            editModalShow:false
        }
    }

    componentDidMount()
    {
        this.refreshTheList();
    }

    componentDidUpdate(){
        this.refreshTheList();
    }

    refreshTheList()
    {
        fetch('http://localhost:63521/api/employee')
            .then((response) => {
                return response.json();
            })
            .then((data)=> {
                this.setState({
                    employees:data
                });
            })
    }

    deleteEmp(empid)
    {
        if(window.confirm('Are You Sure !!!'))
        {
            fetch('http://localhost:63521/api/employee/'+empid,
            {
                method:'DELETE',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            }
            )
        }
        
    }
    
    
    render() {
        const {employees,empid,empname,department,mailid,doj} = this.state;
        let addModalClose = () => this.setState({addModalShow:false})
        let editModalClose = () => this.setState({editModalShow:false})

        return (
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>Employee Name</th>
                            <th>Department</th>
                            <th>MailID</th>
                            <th>Date Of Join</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                    
                        {employees.map(emp=>
                        <tr key={emp.EmployeeID}>
                            <td>{emp.EmployeeID}</td>
                            <td>{emp.EmployeeName}</td>
                            <td>{emp.Department}</td>
                            <td>{emp.MailID}</td>
                            <td>{emp.DOJ}</td>
                            <td>

                                <ButtonToolbar>

                                    <Button onClick={() => this.setState({
                                        editModalShow:true,
                                        empid:emp.EmployeeID,
                                        empname:emp.EmployeeName,
                                        department:emp.Department,
                                        mailid:emp.MailID,
                                        doj:emp.DOJ
                                    })}>
                                        Edit
                                    </Button>

                                    <Button className="ml-2" variant="danger"
                                    onClick={() => this.deleteEmp(emp.EmployeeID)}
                                    >
                                        Delete
                                    </Button>

                                    <EditEmpModal
                                        show={this.state.editModalShow}
                                        onHide={editModalClose}
                                        empid={empid}
                                        empname={empname}
                                        department={department}
                                        mailid={mailid}
                                        doj={doj}
                                    />

                                </ButtonToolbar>
                                
                            </td>
                        </tr>
                        )
                        }
                    </tbody>
                
                </Table>
                <ButtonToolbar>
                    <Button onClick={()=> this.setState({addModalShow:true})}>
                        Add Employee
                    </Button>
                </ButtonToolbar>
                <AddEmpModal show={this.state.addModalShow} onHide={addModalClose}/>
            </div>
            
            
        )
    }
}
