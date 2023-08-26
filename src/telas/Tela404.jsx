import Pagina from "../templates/Pagina.js";
import { Alert } from "react-bootstrap";

export default function Tela404(props){
    return (
        <Pagina>
            <Alert className="text-center" variant="warning">
                O RECURSO SOLICITADO NÃO EXISTE!!!
            </Alert>
        </Pagina>
    );
}