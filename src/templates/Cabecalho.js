//Criar o cabeçalho com bootstrapp
import { Alert } from "react-bootstrap";
export default function Cabecalho(props){
    return(
        <div>            
            <Alert className="text-center mb-0" variant='primary'>
                <h3>
                    {props.texto}
                </h3> 
            
            </Alert>
        </div>
    );
}