const baseURL = "http://localhost:3000"; // Atualize com o URL do backend
const token = localStorage.getItem("token"); // Obtém o token

if (!token) {
    alert("Você precisa estar autenticado!");
    window.location.href = "login.html"; // Redireciona para a página de login
}

async function loadAgendamentos() {
    try {
        const response = await fetch(`${baseURL}/agendamentos`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        const agendamentos = await response.json();

        const tableBody = document.querySelector("#agendamentos-table tbody");
        tableBody.innerHTML = "";

        agendamentos.forEach(agendamento => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${agendamento.nome_adv}</td>
                <td>${agendamento.data_agend}</td>
                <td>${agendamento.horario_agend}</td>
                <td>${agendamento.descricao}</td>
                <td>${agendamento.status_agend}</td>
                <td>
                    <button onclick="excluirAgendamento(${agendamento.id_agend})" class="btn-excluir">Excluir</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Erro ao carregar agendamentos:", error);
        alert("Não foi possível carregar os agendamentos.");
    }
}

async function excluirAgendamento(id_agend) {
    if (confirm('Tem certeza que deseja excluir este agendamento?')) {
        try {
            const response = await fetch(`http://localhost:3000/agendamentos/${id_agend}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Agendamento excluído com sucesso!');
                carregarAgendamentos(); // Atualiza a tabela após excluir
            } else {
                const error = await response.json();
                alert(`Erro: ${error.message}`);
            }
        } catch (error) {
            console.error('Erro ao excluir agendamento:', error);
        }
    }
}

document.getElementById('btn-voltar').addEventListener('click', () => {
    window.location.href = 'http://127.0.0.1:5500/index.html'; // Atualize com o caminho real da página principal
});


document.addEventListener("DOMContentLoaded", loadAgendamentos);
