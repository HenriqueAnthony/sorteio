import { useState } from "react";
import { sorteio_backend } from "declarations/sorteio_backend";

function App() {
  const [numMembros, setNumMembros] = useState(1);
  const [totalEquipes, setTotalEquipes] = useState(0);
  const [nomesEquipes, setNomesEquipes] = useState([]);
  const [resultadoSorteio, setResultadoSorteio] = useState(null); // Novo estado para armazenar o resultado


  function handleTotalEquipesChange(e) {
    const total = Number(e.target.value);
    setTotalEquipes(total);
    setNomesEquipes(Array(total).fill(Array(numMembros).fill("")));
  }


  function handleNumMembrosChange(e) {
    const membros = Number(e.target.value);
    setNumMembros(membros);
    setNomesEquipes(Array(totalEquipes).fill(Array(membros).fill("")));
  }


  function handleNomeChange(e, equipeIndex, membroIndex) {
    const novoNome = e.target.value;
    const novasEquipes = [...nomesEquipes];

    novasEquipes[equipeIndex] = [...novasEquipes[equipeIndex]];
    novasEquipes[equipeIndex][membroIndex] = novoNome;

    setNomesEquipes(novasEquipes);
  }

  async function handleSortear(event) {
    event.preventDefault();

    if (totalEquipes === 0) {
      alert("Por favor, insira o número de equipes/jogadores.");
      return;
    }

    try {
      console.log("Enviando sorteio para o backend...");

      const resultado = await sorteio_backend.sorteio(totalEquipes);

      console.log("Resultado do sorteio:", resultado);
      
      setResultadoSorteio(resultado); // Atualiza o estado com o resultado

    } catch (error) {
      console.error("Erro ao realizar o sorteio:", error);
    }
  }

  return (
    <div>
      <h1>Sorteador</h1>
      <div className="cartao">
        <div className="numeros">

          <div className="grupo-input">
            <label htmlFor="tipo-equipe">Selecione o tipo de equipe</label>
            <select
              id="tipo-equipe"
              value={numMembros}
              onChange={handleNumMembrosChange}
            >
              <option value="1">1 Jogador</option>
              <option value="2">Dupla (2 Jogadores)</option>
              <option value="3">Trio (3 Jogadores)</option>
              <option value="4">Quarteto (4 Jogadores)</option>
              <option value="5">Equipe (5 Jogadores)</option>
              <option value="6">Equipe (6 Jogadores)</option>
            </select>
          </div>


          <div className="grupo-input">
            <label htmlFor="total-equipes">Total de Participantes/Equipes</label>
            <br />
            <input
              type="number"
              id="total-equipes"
              value={totalEquipes}
              onChange={handleTotalEquipesChange}
              min="1"
            />
          </div>


          <div className="grupo-input">
            <label>Informe os nomes dos jogadores:</label>
            {nomesEquipes.map((equipe, equipeIndex) => (
              <div key={equipeIndex} className="equipe">
                <strong>Equipe {equipeIndex + 1}</strong>
                {equipe.map((nome, membroIndex) => (
                  <div key={membroIndex}>
                    <input
                      type="text"
                      placeholder={`Jogador ${membroIndex + 1}`}
                      value={nome}
                      onChange={(e) =>
                        handleNomeChange(e, equipeIndex, membroIndex)
                      }
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>

          <button onClick={handleSortear}>Sortear</button>

          {resultadoSorteio && (
            <div className="resultados">
              <h2>DISPUTAS</h2>
              <div className="resultados-chaves">
                <h3>Equipe 1</h3>
                <p>{resultadoSorteio.array1.join(", ")}</p>
                <h3>Equipe 2</h3>
                <p>{resultadoSorteio.array2.join(", ")}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>

  );

}

export default App;
