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
                <td>${agendamento.nome_user}</td>
                <td>${agendamento.data_agend}</td>
                <td>${agendamento.horario_agend}</td>
                <td>${agendamento.descricao}</td>
                <td>${agendamento.status_agend}</td>
                <td>
                    <button onclick="confirmAgendamento(${agendamento.id_agend})">Confirmar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Erro ao carregar agendamentos:", error);
        alert("Não foi possível carregar os agendamentos.");
    }
}

async function confirmAgendamento(id_agend) {
    try {
        const response = await fetch(`${baseURL}/agendamentos/${id_agend}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ status_agend: "Confirmado" }),
        });

        if (response.ok) {
            alert("Agendamento confirmado com sucesso!");
            loadAgendamentos();
        } else {
            alert("Erro ao confirmar o agendamento.");
        }
    } catch (error) {
        console.error("Erro ao confirmar agendamento:", error);
    }
}



document.addEventListener("DOMContentLoaded", loadAgendamentos);
