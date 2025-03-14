import Nat "mo:base/Nat";
import Random "mo:base/Random";
import Buffer "mo:base/Buffer";

actor {
  public func sorteio(num: Nat) : async { array1: [Nat]; array2: [Nat] } {
    if (num < 1) {
      return { array1 = []; array2 = [] };
    };

    var numerosDisponiveis = Buffer.Buffer<Nat>(num);
    var array1 = Buffer.Buffer<Nat>(num / 2);
    var array2 = Buffer.Buffer<Nat>(num / 2);

    // Preenchendo a lista com os números de 1 até num
    var i = 1;
    while (i <= num) {
      numerosDisponiveis.add(i);
      i += 1;
    };

    var alternar = true;

    while (numerosDisponiveis.size() > 0) {
      let index = await sortearNumero(numerosDisponiveis.size());
      let sorteado = numerosDisponiveis.remove(index - 1); // Remove e retorna o número

      if (alternar) {
        array1.add(sorteado);
      } else {
        array2.add(sorteado);
      };
      alternar := not alternar;
    };

    return { array1 = Buffer.toArray(array1); array2 = Buffer.toArray(array2) };
  };

  public func sortearNumero(maximo: Nat) : async Nat {
    if (maximo < 1) {
      return 1;
    };

    let blob = await Random.blob();

    let random = Random.Finite(blob);
    
    switch (random.range(8)) {
      case (?valor) { (valor % maximo) + 1 };
      case null { 1 };
    };
  };
};
