import { Container } from "react-bootstrap";
import Cabecalho from "./Cabecalho.js";
import Menu from "./Menu.js";



export default function Pagina(props) {
    return (
        <>
            <Cabecalho texto="Pizzaria do Belucci" />
            <Menu />
            <Container>
                {props.children} 
                            
            </Container>
            
           
            
            
            
        </>
    );
}