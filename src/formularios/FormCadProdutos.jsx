import { useState } from "react";
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import CaixaSelecao from "../componentes/busca/CaixaSelecao";
import { urlBasep } from "../utilitarios/definicoes";
export default function FormProduto(props){
    const [validado, setValidado] = useState(false);
    const [clienteSelecionado, setClienteSelecionado] = useState({});
    const [produtoSelecionado, setProdutoSelecionado] = useState({});
    const [produto, setProduto] = useState({
        codigo: "",
        descricao: "",
        qtdEstoque: "",        
        precoVenda: 0,
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
               fetch(urlBasep + "/produtos",{
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
                <h3>Cadastro do Responsável</h3>
            </Container>
            <Form noValidate validated={validado} onSubmit={manipulaSubmissao}>
                <Row> 
                    <Col>
                        <Form.Group className="mb-3" controlId="codbarprod">
                            <Form.Label>Código da Matrícula do Responsável:</Form.Label>
                            <Form.Control type="text" placeholder="00000000000" 
                            id='codigo'
                            name='codigo'
                            value={produto.codigo}
                            onChange={manipularMudanca}                             
                            required />
                        </Form.Group>
                        <Form.Control.Feedback type="invalid">
                            Por favor, Informe o Número da Matrícula do Responsável!
                        </Form.Control.Feedback>
                    </Col> 
                </Row>

                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formNomeProd">
                            <Form.Label>Nome do Responsável:</Form.Label>
                            <Form.Control type="text" placeholder="Informe o nome do Responsável"
                        id='qtdEstoque'
                        name='qtdEstoque'
                        value={produto.qtdEstoque}
                        onChange={manipularMudanca}
                         required />
                        
                        </Form.Group>
                        <Form.Control.Feedback type="invalid">
                            Por favor, Informe o nome Nome Completo do Responsável!
                        </Form.Control.Feedback>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formDatInc">
                            <Form.Label>Data da Admissão:</Form.Label>
                            <Form.Control type="date" placeholder="12/01/2XXX"
                            id='precoVenda'
                            name='precoVenda'
                            value={produto.precoVenda}
                            onChange={manipularMudanca} 
                            
                             required />
                        </Form.Group>
                        <Form.Control.Feedback type="invalid">
                            Por favor, Informe a Data de Admissão!
                        </Form.Control.Feedback>
                    </Col>                     
                </Row>
                
                <Row className="mb-3">
                    <Form.Group as={Col} md="12" controlId="FormDesc">
                        <Form.Label>Descrição:</Form.Label>
                        <Form.Control type="text" placeholder="Informe a agência, o cargo e o uso"
                        id='descricao'
                        name='descricao'
                        value={produto.descricao}
                        onChange={manipularMudanca}
                         required />
                        <Form.Control.Feedback type="invalid">Por favor, informe a Informe a agência, o cargo e o uso!</Form.Control.Feedback>
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

       
          


