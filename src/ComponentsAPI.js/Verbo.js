import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";

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

    useEffect(()=>{
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
    }, [])

    return(
        <>
            <div>
                <div>
                    <h3>Prueba datatable de pagadurias (17 registros) </h3>
                </div>
                <div >
                    <MUIDataTable 
                    title={"Pagadurias"}
                    data={pagadurias}
                    columns={colums}
                    />
                </div>
            </div>


           
        </>
    )
}

export default Verbo