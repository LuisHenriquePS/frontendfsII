import { Container, Col, Form, Row , Spinner} from "react-bootstrap";
import { useEffect, useState } from "react";

export default function CaixaSelecao({
    enderecoFonteDados, campoChave, campoExibicao, funcaoSelecao
}){
    const [valorSelecionado, setValorSelecionado] = useState({
        [campoChave]: 0,
        [campoExibicao]:"NÃO FOI POSSÍVEL OBTER OS DADOS DO BANCO DE DADOS!"
    });
    const [carregandoDados, setCarregandoDados] = useState(false);
    const [dados, setDados] = useState([]);

    useEffect(()=>{
        try {
                setCarregandoDados(true);
                fetch(enderecoFonteDados, {method:"GET"}).then((resposta)=>{
                    if (resposta.ok){
                        return resposta.json();
                    }
                    else{
                        return([{
                            [campoChave]: 0,
                            [campoExibicao]:"NÃO FOI POSSÍVEL OBTER OS DADOS DO BANCO DE DADOS!"
                        }]);
                    }
                }).then((listaDados) =>{
                    setCarregandoDados(false);
                    setDados(listaDados);
                });
            } catch(erro){
                setCarregandoDados(false);
                setDados([{
                    [campoChave]: 0,
                    [campoExibicao]:"NÃO FOI POSSÍVEL OBTER OS DADOS DO BANCO DE DADOS!" +erro.message
                }]);
            }

    }, []);

    return(
        <Container border>
            <Row>
                <Col md={11}>
                    <Form.Select value={valorSelecionado[campoChave]}>
                        {
                            dados.map((item) => {
                                return <option key={item[campoChave]} value={item[campoChave]}>{item[campoExibicao]}</option>
                            })
                        }                        
                    </Form.Select>
                </Col>
                

                <Col md={1}>
                    <Spinner className={carregandoDados?"visible":"invisible"}>

                    </Spinner>
                </Col>
            </Row>
        </Container>
    )
}