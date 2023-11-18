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
                            <Form.Label>Sabor da Pizza:</Form.Label>
                            <Form.Control
                            as="select"                            
                            value={cliente.cpf}
                            id="cpf"
                            onChange={manipularMudanca}
                            required>
                            <option value="Calabresa">Calabresa</option>
                            <option value="Margherita">Margherita</option>
                            <option value="Quatro Queijos">Quatro Queijos</option>
                            <option value="Pepperoni">Pepperoni</option>
                            <option value="Mussarela">Mussarela</option>
                            <option value="Atum">Atum</option>
                            <option value="Frango com Catupiry">Frango com Catupiry</option>
                            <option value="Portuguesa">Portuguesa</option>
                            <option value="Paulista">Paulista</option>
                            <option value="Baiana">Baiana</option>
                            <option value="California">Califórnia</option>
                            <option value="Vegetariana">Vegetariana</option>
                            <option value="Mexicana">Mexicana</option>
                            <option value="Havaiana">Havaiana</option>
                            <option value="Chocolate com Morango">Chocolate com Morango</option>
                            
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                            Selecione pelo menos um sabor!
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                </Row>

                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Escolha um item adicional da pizza:</Form.Label>
                            <Form.Control 
                            as="select"
                            value={cliente.nome}
                            id="nome"
                            onChange={manipularMudanca}
                            required >
                            <option value="Nenhum">Nenhum</option>
                            <option value="Catupiry">Borda recheada - Catupiry</option>
                            <option value="Queijo">Borda recheada - Queijo</option>
                            <option value="Nutela">Borda recheada - Nutela</option>                            
                            </Form.Control>

                        </Form.Group>
                        <Form.Control.Feedback type="invalid">
                            Por favor, Informe a quantidade de Pizzas!
                        </Form.Control.Feedback>
                    </Col>
                </Row>

                <Row>                    
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Endereço:</Form.Label>
                            <Form.Control type="text" placeholder="Informe a sua rua, bairro e numeração do local."
                            value={cliente.endereco}
                            id="endereco"
                            onChange={manipularMudanca}
                             required />
                        </Form.Group>
                        <Form.Control.Feedback type="invalid">
                            Por favor, Informe o endereço!
                        </Form.Control.Feedback>
                    </Col>                            
                    
                     
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Quantidade de Pizza:</Form.Label>
                            <Form.Control
                            value={cliente.bairro}
                            id="bairro"                            
                            onChange={manipularMudanca}
                            placeholder="Informe a quantidade de Pizzas. Ex: 1, 2, 3..."
                            
                            required
                            >                             
                                
                        </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>

                
                <Row className="mb-3">
                    <Form.Group as={Col} md="6">
                        <Form.Label>Informações Adicionais:</Form.Label>
                        <Form.Control type="text" placeholder="Retirar cebola, sem queijo, etc."
                        value={cliente.cidade} 
                        id="cidade"
                        onChange={manipularMudanca}                       
                        required />
                        <Form.Control.Feedback type="invalid">Por favor, informe o Local!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3">
                    <Form.Label>Forma de Pagamento:</Form.Label>
                    <Form.Control as="select" value={cliente.uf} id="uf" onChange={manipularMudanca} required>
                        <option value="">Selecione a forma de Pagamento</option>
                        <option value="Dinheiro/PIX">Dinheiro/PIX</option>
                        <option value="Débito">Cartão - Débito</option>
                        <option value="Crédito">Cartão - Crédito</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        Por favor, selecione a forma de pagamento!
                    </Form.Control.Feedback>
                </Form.Group>

                    <Form.Group as={Col} md="3">
                        <Form.Label>Bebida:</Form.Label>
                        <Form.Control 
                        as="select"
                        value={cliente.telefone}
                        id="telefone"
                        onChange={manipularMudanca}
                        required>
                        <option value="Nenhuma">Nenhuma</option>
                        <option value="Refrigerante">Refrigerante</option>
                        <option value="Suco">Suco</option>
                        <option value="Água">Água</option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">Por favor, informe a bebida desejada</Form.Control.Feedback>
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