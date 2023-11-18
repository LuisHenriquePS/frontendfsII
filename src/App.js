import { BrowserRouter, Route, Routes  } from "react-router-dom";
import TelaCadastroCliente from "./telas/TelaCadastroCliente.jsx";
import TelaCastroProduto from "./telas/TelaCadastroProduto.jsx";
import TelaMenu from "./telas/TelaMenuSistema.jsx";
import Tela404 from "./telas/Tela404.jsx";
import { useEffect, useState } from "react";





function App() {
  const [clienteSelecionado, setClienteSelecionado] = useState({});
  const [produtoSelecionado, setProdutoSelecionado] = useState({});
  const [listaClientes, setListaClientes] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:3000/cadastroResponsavel", {method: "GET" }).then((resposta) => {
      return resposta.json();
    }).then((dados)=>{
      setListaClientes = (dados);
    });
  },[])



  return (
    <div>
      
      <BrowserRouter>  
      
      {/*<Row>
        <Col>
          <CaixaSelecao enderecoFonteDados = "https://129.146.68.51/aluno31-pfsii/clientes"
          campoChave = "id" 
          campoExibicao = "nome"
          funcaoSelecao={setClienteSelecionado} /> 
        </Col>
      </Row>{/*funcionando lindamente - iremos mudar para formcadproduto eu acho*/}          
         
        <Routes>             
            <Route path="/cadastroMaterial" element={<TelaCadastroCliente />} />  
            <Route path="/cadastroResponsavel" element={<TelaCastroProduto />} />         
            
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