import { BrowserRouter, Route, Routes  } from "react-router-dom";
import TelaCadastroCliente from "./telas/TelaCadastroCliente.jsx";
import TelaMenu from "./telas/TelaMenuSistema.jsx";
import Tela404 from "./telas/Tela404.jsx";
import BarraBusca from "./componentes/busca/BarraBusca.jsx";//Está funcionando, não mexer. 
import { useEffect, useState } from "react";
//01:46:00 - Assistir da aula principal

function App() {
  const [clienteSelecionado, setClienteSelecionado] = useState({});
  let listaClientes = [];

  useEffect(()=>{
    fetch("https://129.146.68.51/aluno31-pfsii/clientes", {method: "GET" }).then((resposta) => {
      return resposta.json();
    }).then((dados)=>{
      listaClientes = dados;
    });
  },[])



  return (
    <div>
      
      <BrowserRouter>
      <BarraBusca placeholder={'Informe o nome do servidor'}
                  dados={listaClientes}
                  campoChave={'cpf'}
                  campoBusca={'endereco'}
                  funcaoSelecao={setClienteSelecionado}
                  valor={""}/>
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