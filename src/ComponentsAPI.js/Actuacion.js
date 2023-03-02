import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { Box } from "@mui/system";

const Actuacion = () =>{
    const [oportunidades, setOportunidades] = useState([])
    const colums =[
        { name: "id", label: "Id"},
        { name: "tipoProvidenciaId", label: "Tipo Providencia"},
        { name: "articuloId", label: "Articulo"},
        { name: "medioControlId", label: "Medio de Control"},
        { name: "fechaTiempoRegistro", label: "Fecha de Tiempo del Registro"},
        { name: "fechaEjecutoria", label: "Fecha Ejecutoria"},
        { name: "numeroRadicado", label: "Numero Radicado"},
        { name: "codSecundario1", label: "Codigo Secundario 1"},
        { name: "codSecundario2", label: "Codigo Secundario 2"},
        { name: "tipoProvidencia", label: "Tipo Providencia"},
        { name: "articulo", label: "Articulo"},
        { name: "medioControl", label: "Medio de Control"}
    ]

    const options = {
        filterType: "checkbox",        
        rowsPerPage:10,
        rowsPerPageOptions:[5,10,20],
        jumpToPage: true,
        textLabels:{
          pagination: {
            next: "Siguiente >",
            previous: "< Anterior",
            rowsPerPage: "Total items en esta pagina",
            displayRows: "de",
            jumpToPage: "Pagina No."
          }
        },
    }
    
    let token = sessionStorage.getItem('token');
    useEffect(()=>{
        var url = "/api/oportunidad?Pagina=1&RegistrosPorPagina=2000";
        fetch(url, {
        method: 'GET',
        headers: {
        'content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'bearer ' + token
        }
    }).then(res => res.json()).then(info => {
        setOportunidades(info)
    });
    }, [])

    var lst2 = [];
    oportunidades.map((item) => {
        if(item !== undefined){
            var obj = 
            {
                "id": item.id,
                "tipoProvidenciaId": item.tipoProvidenciaId,
                "articuloId": item.articuloId,
                "medioControlId": item.medioControlId,
                "fechaTiempoRegistro": item.fechaTiempoRegistro,
                "fechaEjecutoria": item.fechaEjecutoria,
                "numeroRadicado": item.numeroRadicado,
                "codSecundario1": item.codSecundario1,
                "codSecundario2": item.codSecundario2,
                "tipoProvidencia": item.tipoProvidencia.nombre,
                "articulo": item.articulo.nombre,
                "medioControl": item.medioControl.nombre
            }
            lst2.push(obj);
        }
    });

    // const getMuiTheme = () =>
    // createTheme({
    //   components: {
    //     MuiTableCell: {
    //       styleOverrides:{ root: {
    //         padding: '8px',
    //         backgroundColor: '#CDCAC6',
    //       }}
    //     },
    //     MuiToolbar: {
    //       styleOverrides:{regular: {
    //         minHeight: '8px',
    //       }}
    //     }
    //   }
    // });

    return(
        <>
            <div>
                <div>
                    <h3>Prueba datatable de oportunidades (50 registros)</h3>
                </div>
                <div >
                    <Box
                    sx={{width: '100%'}}
                    >
                        <MUIDataTable
                        title={"Listado de Oportunidades"}
                        columns={colums}
                        data={lst2}
                        options={options}
                        higlightOnHover
                        />
                    </Box>
                </div>
            </div>
        </>
    
    )
}

export default Actuacion