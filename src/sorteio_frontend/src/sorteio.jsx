import { useState } from 'react';
import { sorteio_backend } from 'declarations/sorteio_backend';

function App() {
  const [greeting, setGreeting] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    sorteio_backend.greet(name).then((greeting) => {
      setGreeting(greeting);
    });
    return false;
  }

  return (
    <>
    <body>
    <h1>Sorteador</h1>
    <div class="cartao">
        <div class="numeros">
            <div class="grupo-input">
                <label>Modo de jogo</label><br/>
                <input type="number" value="1" />
            </div>
            <div class="grupo-input">
                <label>Total Participantes</label><br/>
                <input type="number" />
            </div>
            <button>Sortear</button>
        </div>
        <div class="resultados">
            <h2>Chaves do campeonato</h2>
            <div class="resultaodos-chaves">
                <div class="resultado-individual">12</div>
            </div>
        </div>
    </div>
    <script src="app.js"></script>
    </body>
    </>
  );
}

export default App;