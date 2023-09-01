import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import Alerta from "./Alerta";

const FormularioProyecto = () => {

    const [id, setId] = useState(null);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fechaEntrega, setFechaEntrega] = useState('');
    const [cliente, setCliente] = useState('');

    const params = useParams();
    const { mostrarAlerta, alerta, submitProyecto, proyecto } = useProyectos();

    useEffect(() => {
      if(params.id){
        setId(proyecto._id);
        setNombre(proyecto.nombre);
        setDescripcion(proyecto.descripcion);
        setFechaEntrega(proyecto.fechaEntrega?.split('T')[0]);
        setCliente(proyecto.cliente);
      }else{

      }
    }, [params])
    

    const handleSubmit = async e => {
        e.preventDefault();

        if([nombre, descripcion, fechaEntrega, cliente].includes('')){
            mostrarAlerta({
                msg:'Todos los campos son Obligatorios',
                error: true
            })

            return;
        }
        //Pasar los datos al Provider

        await submitProyecto({id, nombre, descripcion, fechaEntrega, cliente});
        
        setId(null);
        setNombre('');
        setDescripcion('');
        setFechaEntrega('');
        setCliente('');

    }

    const { msg } = alerta
    

  return (
    <form 
        className='bg-white py-10 px-5 md:w-1/2 rounded-lg'
        onSubmit={handleSubmit}
        >

            {msg && <Alerta alerta={alerta} />}

        <div className="mb-5">
            <label 
                htmlFor="nombre"
                className='text-gray-700 uppercase font-bold text-sm'
                >
                    Nombre Proyecto
                </label>
                <input 
                    id='nombre'
                    type='text'
                    className='border w-full mt-2 p-2 placeholder-gray-400 rounded-md'
                    placeholder='nombre del proyecto'
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
        </div>
        <div className="mb-5">
            <label 
                htmlFor="descripcion"
                className='text-gray-700 uppercase font-bold text-sm'
                >
                    Descripcion Proyecto
                </label>
                <textarea 
                    id='descripcion'
                    type='text area'
                    className='border w-full mt-2 p-2 placeholder-gray-400 rounded-md'
                    placeholder='descripcion del proyecto'
                    value={descripcion}
                    onChange={e => setDescripcion(e.target.value)}
                />
        </div>
        <div className="mb-5">
            <label 
                htmlFor="fecha-entrega"
                className='text-gray-700 uppercase font-bold text-sm'
                >
                   Fecha Entrega
                </label>
                <input 
                    id='fecha-entrega'
                    type='date'
                    className='border w-full mt-2 p-2 placeholder-gray-400 rounded-md'
                    value={fechaEntrega}
                    onChange={e => setFechaEntrega(e.target.value)}
                />
        </div>
        <div className="mb-5">
            <label 
                htmlFor="nombre-cliente"
                className='text-gray-700 uppercase font-bold text-sm'
                >
                    Nombre Cliente
                </label>
                <input 
                    id='nombre-cliente'
                    type='text'
                    className='border w-full mt-2 p-2 placeholder-gray-400 rounded-md'
                    placeholder='nombre del proyecto'
                    value={cliente}
                    onChange={e => setCliente(e.target.value)}
                />
        </div>

        <input 
            type="submit"
            value={params.id ? 'Editar Proyecto' : 'Crear Proyecto'}
            className="bg-sky-600 w-full uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors py-3"
        />
    </form>
  )
}

export default FormularioProyecto