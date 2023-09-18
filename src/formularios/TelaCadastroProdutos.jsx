import { useState } from "react";
import FormProduto from "./FormCadProduto.jsx";
import TabelaCadastroProdutos from "./TabelaCadastroProdutos.jsx";


export default function TalaCadastroProdutos(props){
    const [exibeTabela, setExibeTabela] = useState(true);
    const [listaProdutos, setListaProdutos] = useState([]);

    function alternarTelas(){
        setExibeTabela(!exibeTabela)
    }

    return(
        exibeTabela ? <TabelaCadastroProdutos produtos={listaProdutos} chamarTelasCadastro={alternarTelas} /> : <FormProduto chamarTabelaProdutos={alternarTelas}/>
        
    );//igual a IF e ELSE
}

