import { BrowserRouter, Route, Routes  } from "react-router-dom";
import TelaCadastroCliente from "./telas/TelaCadastroCliente.jsx";
import TelaMenu from "./telas/TelaMenuSistema.jsx";
import Tela404 from "./telas/Tela404.jsx";
import BarraBusca from "./componentes/busca/BarraBusca.jsx";//Está funcionando, não mexer. 
import { useState } from "react";
//01:46:00 - Assistir da aula principal

const listaClientes = [
  {
    cpf:"Carro",
    nome:"32443365",
    endereco:"Luis Henrique Palacio da Silva",
    bairro:"Ford KA branco 4 portas",
    cidade:"Garagem do Prédio",
    uf:"Compra",
    telefone:"Batida do Lado",
    email:"100 mil KM rodados"
  },

  {
    cpf:"Fogão",
    nome:"32443365",
    endereco:"Eurico Campos",
    bairro:"Ford KA branco 4 portas",
    cidade:"Garagem do Prédio",
    uf:"Compra",
    telefone:"Batida do Lado",
    email:"100 mil KM rodados"
  }
]





function App() {
  const [clienteSelecionado, setClienteSelecionado] = useState({});
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