const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
  e.preventDefault(); // Impede o envio padrão do formulário

  const data = {
    nome_adv: form.nome.value,
    nascimento_adv: form.dataNascimento.value,
    OAB: form.registroOAB.value,
    email_adv: form.email.value,
    tel_adv: form.telefone.value,
    senha_adv: form.senha.value,
    atuacao_adv: form.areaAtuacao.value,
  };

  try {
    const response = await fetch('http://localhost:3000/advogados', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (response.ok) {
      alert('Advogado cadastrado com sucesso!');

      setTimeout(() => {
        window.location.href = 'http://127.0.0.1:5500/login.html'; // Redireciona para a página de login após 2 segundos
      }, 1000); // 2000 ms = 2 segundos

      form.reset();
    } else {
      alert(`Erro: ${result.error}`);
    }
  } catch (error) {
    alert('Erro ao enviar dados. Tente novamente mais tarde.');
    console.error(error);
  }
});
