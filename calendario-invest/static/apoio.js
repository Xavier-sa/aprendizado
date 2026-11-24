const campoPix = document.querySelector('#pix-code');
const mensagemPix = document.querySelector('#pix-feedback');

document.querySelector('#copy-pix').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(campoPix.value);
    mensagemPix.textContent = 'Pix copiado. Cole o código no aplicativo do seu banco.';
  } catch {
    campoPix.focus();
    campoPix.select();
    mensagemPix.textContent = 'Selecione ou pressione o código e escolha Copiar.';
  }
});
