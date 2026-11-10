/** Erro com codigo HTTP, para o middleware de erros saber o que responder. */
class ErroApi extends Error {
   constructor(estado, mensagem, detalhes) {
      super(mensagem);
      this.estado = estado;
      this.detalhes = detalhes;
      this.operacional = true;
   }

   static maPeticao(mensagem = "Pedido invalido", detalhes) {
      return new ErroApi(400, mensagem, detalhes);
   }
   static naoAutenticado(mensagem = "Precisa de iniciar sessao") {
      return new ErroApi(401, mensagem);
   }
   static proibido(mensagem = "Sem permissao para esta operacao") {
      return new ErroApi(403, mensagem);
   }
   static naoEncontrado(mensagem = "Recurso nao encontrado") {
      return new ErroApi(404, mensagem);
   }
}

export default ErroApi;
