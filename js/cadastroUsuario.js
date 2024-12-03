document.querySelector('form').addEventListener('submit', async function(e) {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    // Pegando os valores dos campos do formulário
    const nome_user = document.getElementById('nome_usuario').value;
    const nascimento_user = document.getElementById('data_nascimento_usuario').value;
    const cpf_user = document.getElementById('cpf_usuario').value;
    const tel_user = document.getElementById('telefone_usuario').value;
    const email_user = document.getElementById('email_usuario').value;
    const senha_user = document.getElementById('senha_usuario').value;

    // Criando o objeto com os dados para enviar para o servidor
    const userData = {
        nome_user,
        nascimento_user,
        cpf_user,
        tel_user,
        email_user,
        senha_user
    };

    try {
        // Enviando os dados via fetch para o back-end
        const response = await fetch('http://localhost:3000/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        // Verificando se a resposta foi bem-sucedida
        if (response.ok) {
            const result = await response.json();
            alert('Usuário cadastrado com sucesso!');

            setTimeout(() => {
                window.location.href = 'http://127.0.0.1:5500/login.html'; // Redireciona para a página de login após 2 segundos
              }, 1000); // 2000 ms = 2 segundos
            
            // Limpar os campos do formulário
            document.querySelector('form').reset(); // Método para limpar o formulário

        } else {
            const error = await response.json();
            alert('Erro ao cadastrar usuário: ' + error.error);
        }
    } catch (error) {
        console.error('Erro ao enviar os dados:', error);
        alert('Erro ao tentar cadastrar usuário. Tente novamente mais tarde.');
    }
});
