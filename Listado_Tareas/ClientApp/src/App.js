import "bootstrap/dist/css/bootstrap.min.css"
import Modal from "./Modal"
import { useEffect, useState } from "react";
const App = () => {

    const [tareas, setTareas] = useState([])
    const [descripcion, setDescripcion] = useState("")

    const mostrarTareas = async () => {
        const response = await fetch("api/tarea/Lista");
        if (response.ok) {
            const data = await response.json();
            setTareas(data);

        }
        else {
            console.log("status code" + response.status);
        }

    }

    const formatDate = (string) => {
        let options = { year: 'numeric', month: 'long', day: 'numeric' };
        let fecha = new Date(string).toLocaleDateString("es-PE", options);
        let horas = new Date(string).toLocaleTimeString();
        return fecha + " | " + horas
    }


    useEffect(() => {
        mostrarTareas();
    }, [])


    

    const guardarTarea = async(e) => {
        e.preventDefault()
        if (descripcion == "") {

            document.getElementById("mymodal").style.display = "block";
           
            return 
            
        }

        const response = await fetch("api/tarea/Guardar", {
            method: "POST",
            headers: {
               'Content-Type':'application/json;charset=utf-8'
            },
            body: JSON.stringify({ descripcion: descripcion })
                
        })
        if (response.ok) { 
            setDescripcion("")
            await mostrarTareas();
        }
        
    }

    const cerrarTarea = async (id) => {
        const response = await fetch("api/tarea/Cerrar/" +id, {
            method: "DELETE"            

        })
        if (response.ok) {
            
            await mostrarTareas();
        }

    }




    return (
        <div className="container bg-dark p-12 vh-auto"  >
            <h2 className="text-white">Lista de tareas</h2>
            <div className="row">
                <div className="col-sm-12" >
                    <form onSubmit={guardarTarea}>
                        <div className="input-group">
                            <input type="text" className="form-control"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                placeholder="Ingrese la descripcion de la tarea"></input>
                            <button className="btn btn-success" type="submit">Agregar</button>  
                        </div> 
                    </form>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-sm-12">
                    <div className="list-group"  >
                        {
                            tareas.map(
                                (item) => (
                                    <div key={item.idTarea } className="list-group-item list-group-item-action">
                                        <h5 className="text-primary">{item.descripcion}</h5>
                                        <div className="d-flex justify-content-between">
                                            <small className="text-muted">{formatDate(item.fechaRegistro)}</small>
                                            <button className="btn btn-sm btn-outline-danger" onClick={() => cerrarTarea(item.idTarea)}>Cerrar</button>
                                        </div> 
                                    </div>
                                
                                )
                            )
                        }
                    </div> 
                </div>
            </div> 
            <Modal />    
        </div>

         
    )
}

export default App;
