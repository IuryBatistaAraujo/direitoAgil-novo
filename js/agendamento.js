// URL do backend
const baseURL = "http://localhost:3000"; // Atualize com a URL do seu backend

// Carrega os advogados na lista
async function loadAdvogados() {
    try {
        const response = await fetch(`${baseURL}/advogados`);
        const advogados = await response.json();

        const select = document.getElementById("advogado");
        select.innerHTML = '<option value="">Selecione</option>'; // Reseta o dropdown

        advogados.forEach(adv => {
            const option = document.createElement("option");
            option.value = adv.id_adv;
            option.textContent = `${adv.nome_adv} - ${adv.atuacao_adv}`;
            select.appendChild(option);
        });
    } catch (error) {
        console.error("Erro ao carregar advogados:", error);
    }
}

function decodeToken(token) {
    if (!token) {
        return null;
    }

    try {
        // A parte de payload do JWT é o segundo segmento, separado por "."
        const payloadBase64 = token.split(".")[1];
        if (!payloadBase64) {
            throw new Error("Token inválido");
        }

        // Decodifica a parte base64
        const payloadDecoded = atob(payloadBase64);

        // Converte a string JSON para um objeto
        return JSON.parse(payloadDecoded);
    } catch (error) {
        console.error("Erro ao decodificar o token:", error);
        return null;
    }
}


// Envia o agendamento ao backend
async function submitForm(event) {
    event.preventDefault();

    const token = localStorage.getItem("token"); // Pega o token do localStorage
    if (!token) {
        alert("Você precisa estar autenticado!");
        return;
    }

    const tokendDecode = decodeToken(token)
    
    const formData = {
        fk_id_user: tokendDecode.id, // Será preenchido pelo backend via token
        fk_id_adv: document.getElementById("advogado").value,
        data_agend: document.getElementById("data").value,
        horario_agend: document.getElementById("horario").value,
        descricao: document.getElementById("descricao").value,
    };


    console.log(formData);
    

    try {
        const response = await fetch(`${baseURL}/agendamentos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert("Consulta agendada com sucesso!");
            document.getElementById("agendamento-form").reset();

            setTimeout(() => {
                window.location.href = "consultaUsuario.html"; // Atualize com o nome do arquivo correto
            }, 1000); // 1 segundos de delay

        } else {
            const error = await response.json();
            alert(`Erro: ${error.message}`);
        }
    } catch (error) {
        console.error("Erro ao agendar consulta:", error);
    }
}

// Adiciona eventos e inicializa
document.addEventListener("DOMContentLoaded", () => {
    loadAdvogados();
    document.getElementById("agendamento-form").addEventListener("submit", submitForm);
});

