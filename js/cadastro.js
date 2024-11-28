var btnSignin = document.querySelector("#signin");
var btnSignup = document.querySelector("#signup");

var body = document.querySelector("body");

btnSignin.addEventListener("click", function () {
    body.className = "sign-in-js"; 
});

btnSignup.addEventListener("click", function () {
    body.className = "sign-up-js";
});

function toggleOABField() {
    const userType = document.querySelector('input[name="userType"]:checked').value;
    const oabField = document.getElementById("oabField");
    const areaAtuacaoField = document.getElementById("areaAtuacaoField");
    const descricaoField = document.getElementById("descricaoField");

    if (userType === "advogado") {
        oabField.style.display = "block";
        oabField.querySelector("input").required = true;
        areaAtuacaoField.style.display = "block";
        areaAtuacaoField.querySelector("input").required = true;
        descricaoField.style.display = "block";
        descricaoField.querySelector("input").required = true;
    } else {
        oabField.style.display = "none";
        oabField.querySelector("input").required = false;
        areaAtuacaoField.style.display = "none";
        areaAtuacaoField.querySelector("input").required = false;
        descricaoField.style.display = "none";
        descricaoField.querySelector("input").required = false;
    }
}
