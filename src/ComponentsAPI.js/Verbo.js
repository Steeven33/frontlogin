import React, { useState } from "react";
import PagaduriaDTO from "../DTO/PagaduriaDTO";
import MUIDataTable from "mui-datatables";
import { isLabelWithInternallyDisabledControl } from "@testing-library/user-event/dist/utils";

const Verbo = () =>{
    const [pagadurias, setPagadurias] = useState(Array);
    const colums = [
        {
            name: "nombre",
            label: "Entidad"
        },
        {
            name: "nemotecnico",
            label: "Nemotecnico"
        },
        {
            name: "codSecundario1",
            label: "Codigo Secundario 1"
        },
        {
            name: "codSecundario2",
            label: "Codigo Secundario 2"
        }
    ]

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
        <>
            <div>
                <div>
                    <h3>Prueba datatable de pagadurias (17 registros) </h3>
                    <button className="btn btn-primary" onClick={Get}>Obtener Pagadurias</button><br />
                </div>
                <div style={{alignItems: 'center', justifyContent: 'center' }}>
                    <MUIDataTable 
                    title={"listado de pagadurias"}
                    data={pagadurias}
                    columns={colums}
                    />
                </div>
            </div>


            {/* <div>
                <h3>Prueba datatable de pagadurias (17 registros) </h3>
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
                </div> */}
        </>
    )
}

export default Verbo