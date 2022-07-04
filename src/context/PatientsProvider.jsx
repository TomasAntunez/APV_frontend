import axios from 'axios'
import { createContext, useState, useEffect } from 'react'
import axiosClient from '../config/axios'

const PatientsContext = createContext()

const PatientsProvider = ({children}) => {

    const [ patients, setPatients ] = useState([])
    const [ patient, setPatient ] = useState({})

    useEffect( () => {
        const getPatients = async () => {

            try {
                const token = localStorage.getItem('token')
                if( !token ) return

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await axiosClient('/pacientes', config)

                setPatients(data)

            } catch (error) {
                console.log(error)
            }
        }
        getPatients()
    }, [])

    const savePatient = async patient => {

        console.log(patient)

        const token = localStorage.getItem('token')

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
    
        if( patient.id ) {
            
            try {
                const { data } = await axiosClient.put(`/pacientes/${patient.id}`, patient, config)
                
                const updatedPatients = patients.map( patientState => patientState._id === data._id 
                    ? data
                    : patientState
                )

                setPatients(updatedPatients)
            
            } catch (error) {
                console.log(error)
            }

        } else {

            try {
                
                const { data } = await axiosClient.post('/pacientes', patient, config)
    
                const { createdAt, updatedAt, __v, ...savedPatient } = data
    
                setPatients( [savedPatient, ...patients] )
    
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }
    }

    const setEdition = (patient) => {
        setPatient(patient)
    }

    const deletePatient = async id => {
        const confirmation = confirm('Confirmas que deseas eliminar?')

        if( confirmation ) {
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await axiosClient.delete(`/pacientes/${id}`, config)

                const updatedPatients = patients.filter( patientState => patientState._id !== id )

                setPatients(updatedPatients)

            } catch (error) {
                console.log(error)
            }
        }
    }

    return(
        <PatientsContext.Provider
            value={{
                patients,
                savePatient,
                setEdition,
                patient,
                deletePatient
            }}
        >
            {children}
        </PatientsContext.Provider>
    )
}

export {
    PatientsProvider
}

export default PatientsContext