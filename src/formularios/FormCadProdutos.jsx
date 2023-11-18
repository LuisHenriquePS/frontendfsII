import { useState } from "react";
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import CaixaSelecao from "../componentes/busca/CaixaSelecao";
import { urlBase } from "../utilitarios/definicoes";
export default function FormProduto(props){
    const [validado, setValidado] = useState(false);
    const [clienteSelecionado, setClienteSelecionado] = useState({});
    const [produtoSelecionado, setProdutoSelecionado] = useState({});
    const [produto, setProduto] = useState({
        codigo: "",
        descricao: "",
        qtdEstoque: "",        
        precoVenda: "",
        cliente: clienteSelecionado

    })

    function manipularMudanca(e){ 
        const elemForm = e.currentTarget;
        const id = elemForm.id;
        const valor = elemForm.value;
        setProduto({...produto, [id]:valor});

    }

    
    

    function manipulaSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            if(props.modoEdicao){

            }
            else{
               fetch(urlBase + "/produtos",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(produto)
               })
               .then((resposta)=>{
                return resposta.json();
               })
               .then((dados)=>{
                    if (dados.status){
                        props.setModoEdicao(false);
                        let novaLista = props.listaprodutos;
                        novaLista.push(produto);
                        props.setProduto(novaLista);
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
            <Container className="text-center">
                <h3>Cadastro do Cliente</h3>
            </Container>
            <Form noValidate validated={validado} onSubmit={manipulaSubmissao}>
                <Row> 
                    <Col>
                        <Form.Group className="mb-3" controlId="codbarprod">
                            <Form.Label>Nome Completo:</Form.Label>
                            <Form.Control type="text" placeholder="Nome" 
                            id='codigo'
                            name='codigo'
                            value={produto.codigo}
                            onChange={manipularMudanca}                             
                            required />
                        </Form.Group>
                        <Form.Control.Feedback type="invalid">
                            Por favor, Informe o Seu Nome Completo!
                        </Form.Control.Feedback>
                    </Col> 
                </Row>

                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formNomeProd">
                            <Form.Label>Telefone:</Form.Label>
                            <Form.Control type="text" placeholder="(XX)XXXXX-XXXX"
                        id='qtdEstoque'
                        name='qtdEstoque'
                        value={produto.qtdEstoque}
                        onChange={manipularMudanca}
                         required />
                        
                        </Form.Group>
                        <Form.Control.Feedback type="invalid">
                            Por favor, Informe o Telefone com DDD!
                        </Form.Control.Feedback>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formDatInc">
                            <Form.Label>Endereço:</Form.Label>
                            <Form.Control type="text" placeholder="Rua, Av., Bairro, Número, Ap., CEP..."
                            id='precoVenda'
                            name='precoVenda'
                            value={produto.precoVenda}
                            onChange={manipularMudanca} 
                            
                             required />
                        </Form.Group>
                        <Form.Control.Feedback type="invalid">
                            Por favor, Informe o Endereço!
                        </Form.Control.Feedback>
                    </Col>                     
                </Row>
                
                <Row className="mb-3">
                    <Form.Group as={Col} md="12" controlId="FormDesc">
                        <Form.Label>Observações:</Form.Label>
                        <Form.Control type="text" placeholder="Pontos de referência, etc..."
                        id='descricao'
                        name='descricao'
                        value={produto.descricao}
                        onChange={manipularMudanca}/>
                        
                    </Form.Group>
                    
                </Row>

                <Row md={2}>
                    <Col>
                        <Button type="submit" variant="sucess" >Cadastrar</Button>
                        <Button variant="secondary" onClick={props.chamarTabelaProdutos}>Voltar</Button>
                    </Col>                    
                </Row>
                <Row>
                    
                </Row>
            </Form>
        </>
    )
}

       
          


