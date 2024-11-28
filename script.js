function abrirModal(nome, especialidade, oab, descricao) {
    document.getElementById("advogado-nome").textContent = nome;
    document.getElementById("advogado-especialidade").textContent = `Especialidade: ${especialidade}`;
    document.getElementById("advogado-oab").textContent = `OAB: ${oab}`;
    document.getElementById("advogado-descricao").textContent = descricao;

    const modal = document.getElementById("modal-advogado");
    modal.classList.add("show");
}

function fecharModal() {
    const modal = document.getElementById("modal-advogado");
    modal.classList.remove("show");
}
