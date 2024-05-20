import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function SistemaCP(){
  return(
    <main>
      <FormProduto />
    </main>
  );
}

function FormProduto(){
  const dispatch = useDispatch();
  const produtos = useSelector(state => state.produto.produtos);

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [marca, setMarca] = useState("");
  const [fabricante, setFabricante] = useState("");
  const [validadeProduto, setValidadeProduto] = useState("");
  const [peso, setPeso] = useState("");
  const [preco, setPreco] = useState("");
  const [categoriaID, setCategoriaID] = useState("");
  const [fornecedorID, setFornecedorID] = useState("");
  const [filterFornecedores,  setFilterFornecedores] = useState([]);
  const [imagem, setImagem] = useState(null);
  const [imagemNome, setImagemNome] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    if (mensagem){
      const timer = setTimeout(() => {
        setMensagem("");
        }, 3000);
        return () => clearTimeout(timer);
      }
  }, [mensagem]);

  useEffect(() => {
    if(categoriaID){
      const fornecedoresFiltrados = fornecedores.filter(fornecedor => 
        fornecedor.categorias.includes(parseInt(categoriaID))
      );
        setFilterFornecedores(fornecedoresFiltrados);
        setFornecedorID("");
    } else{
      setFilterFornecedores([]);
    }
  }, [categoriaID]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduto = {
      nome: nome,
      descricao: descricao,
      marca: marca,
      fabricante: fabricante,
      validadeProduto: validadeProduto,
      peso: peso,
      preco: preco,
      categoriaID: categoriaID,
      fornecedorID: fornecedorID,
      imagem: imagem ? URL.createObjectURL(imagem) : null,
      imagemFile: imagem
    };
    dispatch({ type: 'ADD_PRODUTO', payload: newProduto});
    setMensagem("Produto cadastrado com sucesso!");
    clearForm();
  };

  const clearForm = () => {
    setNome("");
    setDescricao("");
    setDescricao("");
    setMarca("");
    setFabricante("");
    setValidadeProduto("");
    setPeso("");
    setPreco("");
    setCategoriaID("");
    setFornecedorID("");
    setImagem(null);
    setImagemNome("");
    setIsEditing(false);
  };

  const handleDelete = (index) => {
    dispatch({ type: 'DELETE_PRODUTO', payload: index});
  };

  const handleEdit = (index) => {
    const produtoToEdit = produtos[index];
    setNome(produtoToEdit.nome);
    setDescricao(produtoToEdit.descricao);
    setMarca(produtoToEdit.marca);
    setFabricante(produtoToEdit.fabricante);
    setValidadeProduto(produtoToEdit.validadeProduto);
    setPeso(produtoToEdit.peso);
    setPreco(produtoToEdit.preco);
    setCategoriaID(produtoToEdit.categoriaID);
    setFornecedorID(produtoToEdit.fornecedorID);
    setImagem(produtoToEdit.imagemFile ? produtoToEdit.imagemFile : null);
    setImagemNome(produtoToEdit.imagemFile ? produtoToEdit.imagemFile.name : "");

    const produtosCopia = [...produtos];
    produtosCopia.splice(index, 1);
    dispatch({ type: 'DELETE_PRODUTO', payload: index});
    setIsEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const updatedProduto = {
      nome,
      descricao,
      marca,
      fabricante,
      validadeProduto,
      peso,
      preco,
      categoriaID,
      fornecedorID,
      imagem: imagem instanceof File ? URL.createObjectURL(imagem) : imagem,
    };
    dispatch({ type: 'ADD_PRODUTO', payload: updatedProduto });
    setMensagem("Produto atualizado com sucesso!");
    clearForm();
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImagem(file);
    setImagemNome(file ? file.name : "");
  }

  return(
    <div className="form-produtos">
    <form onSubmit={isEditing ? handleSave : handleSubmit}>
      <h1>Sistema de Cadastro de Produtos</h1>
      <div className="field-imagem">
        <strong>Imagem do produto</strong>
        <label htmlFor="input-imagem">
          Escolher Imagem {imagemNome && <span className="imagem-nome">{imagemNome}</span>}
          <input type="file" id="input-imagem" 
          onChange={(handleImageChange)} accept="image/*" />
          </label>
      </div>
      <div className="field">
        <strong>Nome do Produto:</strong>
        <input 
        type="text" 
        value={nome}
        onChange={(e) => setNome(e.target.value)} placeholder="Ex: Adidas Aires" 
        required />
      </div>
      <div className="field">
        <strong>Descrição do Produto</strong>
        <input 
        type="text" 
        value={descricao} 
        onChange={(e) => setDescricao(e.target.value)} placeholder="Ex: Tênis Tamanho: 41-42" 
        required />
      </div>
      <div className="field">
        <strong>Marca do Produto</strong>
        <input 
        type="text" 
        value={marca} onChange={(e) => setMarca(e.target.value)} placeholder="Ex: Adidas, Nike" 
        required />
      </div>
      <div className="field">
        <strong>Fabricante do Produto</strong>
        <input 
        type="text" 
        value={fabricante} 
        onChange={(e) => setFabricante(e.target.value)} placeholder="Ex: Nike - Industrias Brasileiras" 
        required />
      </div>
      <div className="field">
        <strong>Validade do Produto</strong>
        <input 
        type="text" 
        value={validadeProduto} 
        onChange={(e) => setValidadeProduto(e.target.value)} placeholder= "Ex: 20 de maio 2025 - (Opcional)" />
      </div>
      <div className="field">
        <strong>Peso do Produto</strong>
        <input 
        type="number" 
        value={peso} 
        onChange={(e) => setPeso(e.target.value)} placeholder="Ex: 125" 
        required />
      </div>
      <div className="field">
        <strong>Preço do Produto</strong>
        <input 
        type="number" 
        value={preco} 
        onChange={(e) => setPreco(e.target.value)} placeholder="Ex: 123" 
        required />
      </div>
      <div className="field">
        <strong>Categoria do Produto</strong>
        <select 
        value={categoriaID} 
        onChange={(e) => setCategoriaID(e.target.value)} 
        required>
          <option value="">Selecione a Categoria</option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nome}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
          <strong>Fornecedor</strong>
          <select 
          value={fornecedorID} 
          onChange={(e) => setFornecedorID(e.target.value)} 
          required>
            <option value="">Selecione o Fornecedor</option>
            {filterFornecedores.map((fornecedor) => (
              <option key={fornecedor.id} value={fornecedor.id}>{fornecedor.nome}</option>
            ))}
          </select>
        </div>
        {mensagem && <div className="mensagem-sucesso">{mensagem}</div>}
        <div className="btn-actions">
          <button type="submit">{isEditing ? "Salvar Produto" : "Adicionar Produto"}</button>
        </div>
      </form>
      <ProdutoLista produtos={produtos} categorias={categorias} fornecedores={fornecedores} handleDelete={handleDelete} handleEdit={handleEdit} />
    </div>
  );
}

function ProdutoLista({ produtos, categorias, fornecedores, handleDelete, handleEdit
}){
return (
  <div className="lista-produto">
    <h2>Produtos</h2>
    {produtos.map((produto, index) => (
      <div key={index} className="product-item">
        {produto.imagem && <img src={produto.imagem} alt="Imagem do produto" />}
        <p><strong>Nome do Produto:</strong> {produto.nome}</p>
        <p><strong>Descrição do Produto:</strong> {produto.descricao}</p>
        <p><strong>Marca do Produto:</strong> {produto.marca}</p>
        <p><strong>Fabricante do Produto:</strong> {produto.fabricante}</p>
        <p><strong>Validade do Produto:</strong> {produto.validadeProduto}</p>
        <p><strong>Peso do Produto:</strong> {produto.peso} kg</p>
        <p><strong>Preço do Produto:</strong> R$ {produto.preco}</p>
        <p><strong>Categoria do Produto:</strong> {getCategoriaNome(categorias, produto.categoriaID)}</p>
        <p><strong>Fornecedor:</strong> {getFornecedorNome(fornecedores, produto.fornecedorID)}</p>
        <button className="delete-btn" onClick={() => handleDelete(index)}>Excluir</button>
        <button className="edite-btn" onClick={() => handleEdit(index)}>Editar</button> 
      </div>
    ))}
  </div>
);
}

function getCategoriaNome(categorias, categoriaID){
  const categoria = categorias.find(cat => cat.id === parseInt(categoriaID));
  return categoria ? categoria.nome : "Categoria não econtrada";
}

function getFornecedorNome(fornecedores, fornecedorID){
    const fornecedor = fornecedores.find(fornecedor => fornecedor.id === parseInt(fornecedorID));
    return fornecedor ? fornecedor.nome : "Fornecedor não encontrado";
}

const categorias = [
  { id: 1, nome: "Eletrônicos" },
  { id: 2, nome: "Roupas" },
  { id: 3, nome: "Alimentos" },
  { id: 4, nome: "Acessórios Esportivos" }
];

const fornecedores = [
  { id: 1, nome: "Fornecedor de Eletrônicos", categorias: [1] },
  { id: 2, nome: "Fornecedor de Roupas", categorias: [2] },
  { id: 3, nome: "Fornecedor de Alimentos", categorias: [3] },
  { id: 4, nome: "Fornecedor de Equipamentos Esportivos", categorias: [4] }
];

export default SistemaCP;