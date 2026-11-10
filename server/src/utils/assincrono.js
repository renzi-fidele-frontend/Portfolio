/**
 * Envolve um handler assincrono para que qualquer rejeicao va para o
 * middleware de erros em vez de ficar como unhandled rejection.
 */
const assincrono = (handler) => (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);

export default assincrono;
