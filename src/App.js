import { BrowserRouter, Route, Routes  } from "react-router-dom";
import TelaCadastroCliente from "./telas/TelaCadastroCliente.jsx";
import TelaMenu from "./telas/TelaMenuSistema.jsx";
import Tela404 from "./telas/Tela404.jsx";
import BarraBusca from "./componentes/busca/BarraBusca.jsx";//Está funcionando, não mexer. 
import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import CaixaSelecao from "./componentes/busca/CaixaSelecao.jsx";
//Aula 02 01:26:00

function App() {
  const [clienteSelecionado, setClienteSelecionado] = useState({});
  const [produtoSelecionado, setProdutoSelecionado] = useState({});
  const [listaClientes, setListaClientes] = useState([]);

  useEffect(()=>{
    fetch("https://129.146.68.51/aluno31-pfsii/clientes", {method: "GET" }).then((resposta) => {
      return resposta.json();
    }).then((dados)=>{
      setListaClientes = (dados);
    });
  },[])



  return (
    <div>
      
      <BrowserRouter>  
      <Row>
        <Col>
          <Form.Group style={{ textAlign: 'center' }}>
            <Form.Label>Selecione o servidor:</Form.Label>
            <BarraBusca placeholder={'Informe o nome do servidor'}
                        dados={listaClientes}
                        campoChave={'cpf'}
                        campoExibicao={'endereco'}
                        funcaoSelecao={setClienteSelecionado}
                        valor={""}/>
          </Form.Group>  
        </Col> 
      </Row>
      <Row>
        <Col>
          <CaixaSelecao enderecoFonteDados = "https://129.146.68.51/aluno31-pfsii/clientes"
          campoChave = "id" 
          campoExibicao = "nome"
          funcaoSelecao={setClienteSelecionado} />{/*funcionando lindamente - iremos mudar para formcadproduto eu acho - continuar no minuto 54:00 - Aula Seleção de Dados*/}

          
        </Col>
      </Row> 
        <Routes>             
            <Route path="/cadastroMaterial" element={<TelaCadastroCliente />} />           
            
            <Route path="/" element={<TelaMenu />}/>
            <Route path="*" element={<Tela404/>}/>

        </Routes>
      </BrowserRouter>
           
    </div>
  );
}

export default App;

//Instalar o react-router-dom
// /menu e /cadastroCliente devem estar na url do navegador