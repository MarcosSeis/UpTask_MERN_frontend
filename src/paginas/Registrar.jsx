import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";


const Registrar = () => {

    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repetirPassword, setRepetirPassword] = useState('')
    const [alerta, setAlerta] = useState({})

const handleSubmit = async e => {
    e.preventDefault();

    if([nombre, email, password, repetirPassword].includes('')){
        setAlerta({
            msg: 'Todos los campos son obligatorios',
            error: true
        })

        return
    }

    if(password !== repetirPassword){
        setAlerta({
            msg:'Los passwords no son iguales',
            error:true
        })

        return
    }

    if(password.length < 6){
        setAlerta({
            msg:'Password es muy corto',
            error:true
        })

        return
    }

    setAlerta({});

    //Crear el usario en la API

    try {
        const { data } = await clienteAxios.post(`/usuarios`, {nombre, password, email})
        setAlerta({
            msg: data.msg,
            error:false
        });

        setNombre('');
        setEmail('');
        setPassword('');
        setRepetirPassword('');
        
    } catch (error) {
        setAlerta({
            msg:error.response.data.msg,
            error: true
        })
    }


}

const { msg } = alerta

  return (
   <>
       <h1 className="text-sky-600 font-black text-6xl">Crea tu cuenta y administra<span className="text-slate-700">proyectos</span></h1>

       {msg && <Alerta alerta={alerta} />} 

        <form className="my-10 bg-white shadow rounded-lg p-10" onSubmit={handleSubmit}>
            <div className="my-5">
                <label htmlFor="nombre" className="text-gray-600 uppercase block text-xl font-bold">
                    Nombre
                </label>
                <input
                    id="nombre" 
                    type="text"
                    placeholder="Tú nombre"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    />
            </div>

            <div className="my-5">
                <label htmlFor="email" className="text-gray-600 uppercase block text-xl font-bold">
                    Email
                </label>
                <input
                    id="email" 
                    type="email"
                    placeholder="Email de registro"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
            </div>

            <div className="my-5">
                <label htmlFor="Password" className="text-gray-600 uppercase block text-xl font-bold">
                    Password
                </label>
                <input
                    id="Password" 
                    type="password"
                    placeholder="Password de registro"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    />
            </div>

            <div className="my-5">
                <label htmlFor="Password2" className="text-gray-600 uppercase block text-xl font-bold">
                    Repetir Password
                </label>
                <input
                    id="Password2" 
                    type="Password"
                    placeholder="Repetir tu Password"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    value={repetirPassword}
                    onChange={e => setRepetirPassword(e.target.value)}
                    />
            </div>


            <input 
                type="submit"
                value="Registrar nuevo usuario"
                className="bg-sky-700 mb-5 w-full py-3 text-white font-bold rounded hover:bg-sky-800 transition-colors hover:cursor-pointer"
                />
        </form>

        <nav className="lg:flex lg:justify-between">
            <Link 
                className="block text-center my-5 text-slate-500 uppercase text-sm"
                to="/"
                >
                ¿Ya tienes una cuenta? Inicia Sesión
            </Link>

            <Link
                className="block text-center my-5 text-slate-500 uppercase text-sm"
                to="/olvide-password"
                >
                Olvide mi Password
            </Link>

        </nav>
   </>
  )
}

export default Registrar