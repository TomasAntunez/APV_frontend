import usePatients from "../hooks/usePatients"
import Patient from "./Patient"

function PatientList() {

  const { patients } = usePatients()

  return (
    <>
      { patients.length ?
        (
          <>
            <h2 className="font-black text-3xl text-center">Listado de Pacientes</h2>

            <p className="text-xl mt-5 mb-10 text-center">
              Administra tus
              <span className="text-indigo-600 font-bold"> pacientes y citas</span>
            </p>

            { patients.map( patient => (
              <Patient 
                key={patient._id}
                patient={patient}
              />
            ))
            }
          </>
        ) :
        (
          <>
            <h2 className="font-black text-3xl text-center">No hay Pacientes</h2>

            <p className="text-xl mt-5 mb-10 text-center">
              Comienza agregando pacientes
              <span className="text-indigo-600 font-bold"> y apareceran en este lugar</span>
            </p>
          </>
        )
      }
    </>
  )
}

export default PatientList