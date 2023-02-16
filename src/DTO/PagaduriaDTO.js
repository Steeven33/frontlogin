import React from "react";


export const PagaduriaDTO = (props) =>{
    return(
        <tr>
            <td>{props.nombre}</td>
            <td>{props.nemotecnico}</td>
            <td>{props.codSecundario1}</td>
            <td>{props.codSecundario2}</td>
        </tr>
    )
}

export default PagaduriaDTO

