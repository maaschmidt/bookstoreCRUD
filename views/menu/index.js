const verify = async () => {
  let logado = JSON.parse(localStorage.getItem('logado'))

  if (logado == null) {
    window.location.href = '../login'
    return;
  }
}
verify();

const getOut = () => {
  localStorage.removeItem('logado')
}