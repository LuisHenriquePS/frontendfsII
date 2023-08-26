import { Container } from "react-bootstrap";
import Cabecalho from "./Cabecalho.js";
import Menu from "./Menu.js";



export default function Pagina(props) {
    return (
        <>
            <Cabecalho texto="Sistema de Gerenciamento de Materiais - IBGE/Itajaí - SC" />
            <Menu />
            <Container>
                {props.children} 
                            
            </Container>
            
           
            
            
            
        </>
    );
}