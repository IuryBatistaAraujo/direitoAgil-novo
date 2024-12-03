document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Captura os valores dos campos do formulário
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        // Envia a requisição para o backend
        const response = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, senha: password }),
        });

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error("Falha na autenticação. Verifique suas credenciais.");
        }

        const data = await response.json();
        console.log("Login bem-sucedido:", data);

        // Armazena o token e a role (se necessário)
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        // Redireciona o usuário baseado na role
        if (data.role === "user") {
            window.location.href = "http://127.0.0.1:5500/index.html"; // Substitua pelo caminho correto
        } else if (data.role === "advogado") {
            window.location.href = "http://127.0.0.1:5500/index.html"; // Substitua pelo caminho correto
        }
    } catch (error) {
        alert(error.message);
        console.error("Erro ao realizar login:", error);
    }
});
