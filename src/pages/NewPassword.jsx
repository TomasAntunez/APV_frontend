import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Alert from "../components/Alert"
import { Link } from "react-router-dom"
import axiosClient from "../config/axios"

const NewPassword = () => {

  const [ password, setPassword ] = useState('')
  const [ alert, setAlert ] = useState({})
  const [ validToken, setValidToken ] = useState(false)
  const [ modifiedPassword, setModifiedPassword ] = useState(false)

  const params = useParams()
  const { token } = params

  useEffect(() => {
    const checkToken = async () => {
      try {
        await axiosClient(`/veterinarios/olvide-password/${token}`)
        setAlert({
          msg: 'Coloca tu Nuevo Password'
        })
        setValidToken(true)

      } catch (error) {
        setAlert({
          msg: 'Hubo un error con el enlace',
          error: true
        })
      }
    }

    checkToken()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()

    if( password.length < 6 ) {
      setAlert({
        msg: 'El password debe ser minimo de 6 caracteres',
        error: true
      })

      return
    }

    try {
      const url = `/veterinarios/olvide-password/${token}`
      const { data } = await axiosClient.post(url, { password } )

      setAlert({
        msg: data.msg
      })

      setModifiedPassword(true)

    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } = alert;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Reestablece tu Password y no Pierdas Acceso a
          <span className="text-black"> tus Pacientes</span>
        </h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

        { msg && 
          <Alert 
            alert={alert}
          />
        }

        { validToken && (
            <form onSubmit={handleSubmit}>
              <div className="my-5">
                <label
                  className="uppercase text-gray-600 block text-xl font-bold"
                >
                  Nuevo Password
                </label>
                <input
                  type='password'
                  placeholder='Tu Nuevo Password'
                  className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                  value={password}
                  onChange={ e => setPassword(e.target.value) }
                />
              </div>

              <input 
                type="submit"
                value="Guardar Nuevo Password"
                className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
              />
            </form>
        )}

        { modifiedPassword &&
          <Link
            className='block text-center my-5 text-gray-500'
            to="/">Inicia Sesion
          </Link>
        }

      </div>
    </>  
  )
}

export default NewPassword