import React, { useState, useEffect } from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import EmployeeService from '../services/EmployeeService';


// Create styles
const styles = StyleSheet.create({
    firstPage: {
        backgroundColor: '#E4E4E4',
        margin: 10,
        paddingVertical: 5,
        fontWeight: 400,
        textAlign: 'center'
    },
    page: {
        margin: 20,
        padding: 15,
        fontWeight: 400,
        
    },
    section: {
        margin: 10,
        padding: 10,
    },
    header: {
        fontSize: 22,
        fontWeight: 800,
        marginBottom: 20,
        padding: 20
    }
});


const PDF = () => {


    const [employees, setEmployees] = useState(null)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await EmployeeService.getEmployees()
                console.log(response)
                setEmployees(response.data)
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };
        fetchData()
    }, [])

    return (

        <Document title='Report'>
            {!loading && (
                <Page >
                    <Text style={styles.header}>Employee report</Text>
                    {employees.map((employee, index) => {
                        return (
                            <Text style={styles.firstPage} key={index}>
                                Employee: {employee.firstName} {employee.lastName}, email:{employee.email + '\n'}
                            </Text>
                        )
                    })}
                </Page>)}
            {!loading && employees.map((employee, index) => {
                return (
                    <Page key={index}>
                        <Text style={styles.header}>
                            Employee: extra employee info
                        </Text>
                        <Text style={styles.page}>
                        Employee: {employee.firstName} {employee.lastName+"\n"}
                        Extra information about this employee:sexan smr
                        </Text>
                    </Page>)
            })}
        </Document>
    );
};

export default PDF