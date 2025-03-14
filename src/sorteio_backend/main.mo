import Nat "mo:base/Nat";
import Random "mo:base/Random";

actor {
  public func sorteio(num: Nat) : async {numero1: Nat ; numero2: Nat} {
      let num1 : Nat = await sortearNumero(num);  
      var num2 : Nat = await sortearNumero(num);  

      while (num2==num1){
          num2 := await sortearNumero(num);  
      };

      return {numero1 = num1 ; numero2 = num2};
  };

   // Função que recebe um número máximo como parâmetro
  public func sortearNumero(maximo : Nat) : async Nat {
    // Verificar se o número máximo é pelo menos 1
    if (maximo < 1) {
      return 1; // Retorna 1 se o máximo for inválido
    };
        
    let blob = await Random.blob();
    
    // Criar uma instância finita de randomness
    let random = Random.Finite(blob);
    
    // Gerar um número entre 0 e (maximo-1)
    switch (random.range(8)) {  // Usamos 8 bits para ter espaço suficiente
      case (?valor) {
        // Converter para um número entre 1 e maximo
        (valor % maximo) + 1
      };
      case null {
        // Caso a entropia seja esgotada (improvável neste caso)
        1  // Valor padrão
      };
    };
  };
  
};
