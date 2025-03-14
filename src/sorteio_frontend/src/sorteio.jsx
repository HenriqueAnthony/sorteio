import { useState } from "react";
import { sorteio_backend } from "declarations/sorteio_backend";

function App() {
  const [numMembros, setNumMembros] = useState(1); // Quantidade de membros por equipe
  const [totalEquipes, setTotalEquipes] = useState(0); // Quantidade de equipes
  const [nomesEquipes, setNomesEquipes] = useState([]); // Lista com os nomes dos jogadores

  // Atualiza a quantidade de equipes e reinicia os nomes
  function handleTotalEquipesChange(e) {
    const total = Number(e.target.value);
    setTotalEquipes(total);
    setNomesEquipes(Array(total).fill(Array(numMembros).fill("")));
  }

  // Atualiza a quantidade de membros por equipe e reinicia os nomes
  function handleNumMembrosChange(e) {
    const membros = Number(e.target.value);
    setNumMembros(membros);
    setNomesEquipes(Array(totalEquipes).fill(Array(membros).fill("")));
  }

  // Atualiza os nomes de um jogador específico dentro de uma equipe
  function handleNomeChange(e, equipeIndex, membroIndex) {
    const novoNome = e.target.value;
    const novasEquipes = [...nomesEquipes];

    novasEquipes[equipeIndex] = [...novasEquipes[equipeIndex]];
    novasEquipes[equipeIndex][membroIndex] = novoNome;

    setNomesEquipes(novasEquipes);
  }

  function handleSortear() {
    if (totalEquipes === 0) {
      alert("Por favor, insira o número de equipes/jogadores.");
      return;
    }

    console.log("Sorteio enviado para o backend:", nomesEquipes);
    sorteio_backend.sortear(numMembros, nomesEquipes).then((resultado) => {
      console.log("Resultado do sorteio:", resultado);
    });

  }

  return (
    <div>
      <h1>Sorteador</h1>
      <div className="cartao">
        <div className="numeros">
          {/* Seleção de quantidade de membros por equipe */}
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

          {/* Input para total de equipes */}
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

          {/* Campos de entrada para os nomes dos jogadores */}
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
        </div>
      </div>
    </div>
    
  );

}

export default App;
