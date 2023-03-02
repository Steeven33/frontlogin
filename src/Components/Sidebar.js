import React, { useContext } from "react";
import ContextExternos from "../Context/ContextExternos";
import {Row} from "antd"
import Header from "./Header";
import SiderMenu from "./SiderMenu";


const Sidebar = () => {
    return(
        <>
            <div style={{ display: "flex", flexDirection: 'column', flex: 1, height: '100vh' }}>
                <div >
                    <Header />
                </div>
                <div style={{ backgroundColor: '#FDFEFE', display: "flex", flexDirection: 'row', flex: 1}}>
                    <SiderMenu />
                </div>
                <div >
                    <Footer />
                </div>
            </div>
        </>
    )
}

function Footer(){
    return(
        <>
            <div style={{
                height: 60,
                backgroundColor: '#FDFEFE',
                color: '#17202A'
            }}>
                <Row>
                    <h5>Valuez BPM</h5>
                </Row>
                <Row>
                    <p>Gestion de proceso de negocio</p>
                </Row>
            </div>
        </>
    )
}



export default Sidebar