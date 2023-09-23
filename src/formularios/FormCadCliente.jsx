import { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import CaixaSelecao from "../componentes/busca/CaixaSelecao";
import { urlBase } from "../utilitarios/definicoes.js";
export default function FormCliente(props){
    const [validado, setValidado] = useState(false);
    const [clienteSelecionado, setClienteSelecionado] = useState({});
    const [cliente, setCliente] = useState({
        cpf:"",
        nome:"",
        endereco:"",
        bairro:"",
        cidade:"",
        uf:"",
        telefone:"",
        email:""


    });
    function manipularMudanca(e){ 
        const elemForm = e.currentTarget;
        const id = elemForm.id;
        const valor = elemForm.value;
        setCliente({...cliente, [id]:valor});

    }

    function manipulaSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            if(props.modoEdicao){

            }
            else{
               fetch(urlBase + "/clientes",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(cliente)
               })
               .then((resposta)=>{
                return resposta.json();
               })
               .then((dados)=>{
                    if (dados.status){
                        props.setModoEdicao(false);
                        let novaLista = props.listaClientes;
                        novaLista.push(cliente);
                        props.setClientes(novaLista);
                        props.exibirTabela(true);
                    }
                window.alert(dados.mensagem);
               })
               .catch((erro)=>{
                window.alert("Erro ao Executar a Requisição: " + erro.mensagem);
               }) 
            }            
            setValidado(false);
            
        } else {
            setValidado(true);
        }
        evento.preventDefault();
        evento.stopPropagation();
    }

      
    return(
        <>            
            <Form noValidate validated={validado} onSubmit={manipulaSubmissao}>
                <Row> 
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Material:</Form.Label>
                            <Form.Control type="text" placeholder="Nome do material" 
                            value={cliente.cpf}
                            id="cpf"
                            onChange={manipularMudanca}
                            required />
                        </Form.Group>
                        <Form.Control.Feedback type="invalid">
                            Por favor, Informe o Material!
                        </Form.Control.Feedback>
                    </Col> 
                </Row>

                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Código do Item:</Form.Label>
                            <Form.Control type="text" placeholder="Informe o código do Item."
                            value={cliente.nome}
                            id="nome"
                            onChange={manipularMudanca}
                             required />
                        </Form.Group>
                        <Form.Control.Feedback type="invalid">
                            Por favor, Informe o código do Item!
                        </Form.Control.Feedback>
                    </Col>
                </Row>

                <Row>                    
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Responsável:</Form.Label>
                            <Col>
                    <CaixaSelecao enderecoFonteDados = "https://129.146.68.51/aluno31-pfsii/clientes"
                                campoChave = "id" 
                                campoExibicao = "nome"
                                funcaoSelecao={setClienteSelecionado} />
                    </Col>
                            
                        </Form.Group>
                        <Form.Control.Feedback type="invalid">
                            Por favor, selecione um responsável!
                        </Form.Control.Feedback>
                    </Col>

                     
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Descrição:</Form.Label>
                            <Form.Control
                            value={cliente.bairro}
                            id="bairro"
                            onChange={manipularMudanca}
                            required
                            >                             
                                
                        </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>

                
                <Row className="mb-3">
                    <Form.Group as={Col} md="6">
                        <Form.Label>Local:</Form.Label>
                        <Form.Control type="text" placeholder="Local onde se encontra o intem"
                        value={cliente.cidade} 
                        id="cidade"
                        onChange={manipularMudanca}                       
                        required />
                        <Form.Control.Feedback type="invalid">Por favor, informe o Local!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3">
                    <Form.Label>Forma de Aquisição:</Form.Label>
                    <Form.Control as="select" value={cliente.uf} id="uf" onChange={manipularMudanca} required>
                        <option value="">Selecione a forma de aquisição</option>
                        <option value="Compra">Compra</option>
                        <option value="Doação">Doação</option>
                        <option value="Cessão">Cessão</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        Por favor, selecione a forma de aquisição!
                    </Form.Control.Feedback>
                </Form.Group>

                    <Form.Group as={Col} md="3">
                        <Form.Label>Origem do Item:</Form.Label>
                        <Form.Control type="text" placeholder="Loja, órgão público, etc."
                        value={cliente.telefone}
                        id="telefone"
                        onChange={manipularMudanca}
                         required />
                        <Form.Control.Feedback type="invalid">Por favor, informe a Origem do Item!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3">
                        <Form.Label>Observações:</Form.Label>
                        <Form.Control type="text" placeholder="Para maiores detalhamentos"
                        value={cliente.email}
                        id="email"
                        onChange={manipularMudanca}
                          />
                        
                    </Form.Group>
                </Row>

                <Row md={2}>
                    <Col>
                        <Button type="submit" variant="dark"> {props.modoEdicao ? "Atualizar": "Cadastrar"}</Button>{' '}
                        <Button type="button" onClick={()=>{
                            props.exibirTabela(true);
                        }}>Voltar</Button>
                    </Col>                    
                </Row>
            </Form>
        </>
    )
}