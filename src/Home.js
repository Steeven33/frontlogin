import React, { useState } from "react";
import PagaduriaDTO from "./DTO/PagaduriaDTO";

export const Home = ()=>{

    const [pagadurias, setPagadurias] = useState(Array);

    function Get(){
        var url = "/api/entidadpagaduria";
        const result = fetch(url, {
        method: 'GET',
        headers: {
        'content-type': 'application/json',
        'Accept': 'application/json',
        }
    }).then(res => res.json()).then(info => {
        var lst = info;
        setPagadurias(lst);
    });
    }
    return(
        <div>
            <h1>Bienvenido al Home</h1>
            <button className="btn btn-primary" onClick={Get}>Obtener Pagadurias</button>
            <br />
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Entidad</th>
                        <th scope="col">Nemo Tecnico</th>
                        <th scope="col">codigo Secundario 1</th>
                        <th scope="col">codigo Secundario 2</th>
                    </tr>
                </thead>
                <tbody>
                    {pagadurias.map((item) => {
                        return <PagaduriaDTO
                        key={item.id} 
                        nombre={item.nombre}
                        nemotecnico={item.nemotecnico}
                        codSecundario1={item.codSecundario1}
                        codSecundario2={item.codSecundario2}
                        />
                    })}
                </tbody>
            </table>
        </div>
    )
}
export default Home
