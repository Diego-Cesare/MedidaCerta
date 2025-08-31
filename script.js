const calcBtn = document.getElementById("calc");
const areia = document.getElementById("areia");
const pedra = document.getElementById("pedra");
const cimento = document.getElementById("cimento");

let tipoSelecionado = "concre"; // valor inicial
let mtipo = 0;

function setMedida() {
  const ar = document.getElementById("ar");
  const pe = document.getElementById("pe");
  const ci = document.getElementById("ci");

  mtipo = Number(ar.value) + Number(pe.value) + Number(ci.value);
}

function setTipo() {
  const tipo = document.getElementById("tipo");
  const tipoLarg = document.getElementById("tipoLarg");
  const botoes = document.querySelectorAll("#concre, #reboc, #conPiso");

  const btnInicial = document.getElementById("concre");
  btnInicial.style.borderBottom = "solid 4px var(--bg)";
  tipo.textContent = btnInicial.textContent;
  tipoSelecionado = "concre";

  botoes.forEach((botao) => {
    botao.addEventListener("click", () => {
      tipo.textContent = botao.textContent;

      if (botao.id === "reboc") {
        tipoLarg.textContent = "Altura";
      } else {
        tipoLarg.textContent = "Largura";
      }

      botoes.forEach((b) => (b.style.borderBottom = "none"));
      botao.style.borderBottom = "solid 4px var(--bg)";

      tipoSelecionado = botao.id;

      // 👇 Aqui controlamos a visibilidade do input pedra
      const pedraInput = document.getElementById("pe");
      if (tipoSelecionado === "concre") {
        pedraInput.style.display = "flex"; // mostra o campo
      } else {
        pedraInput.style.display = "none"; // esconde o campo
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", setTipo);

function calcVolume() {
  const comp = Number(document.getElementById("comp").value);
  const larg = Number(document.getElementById("larg").value);
  const esp = Number(document.getElementById("esp").value);

  return comp * larg * esp; // volume em m³
}

calcBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const volume = calcVolume();

  let qtdCimentoM3 = 0,
    qtdAreia = 0,
    qtdPedra = 0;
  let parte = 0;

  if (tipoSelecionado === "concre") {
    setMedida(); // usa inputs ar, pe, ci
    parte = volume / mtipo;

    qtdCimentoM3 = parte * 1;
    qtdAreia = parte * 3;
    qtdPedra = parte * 2;

    pedra.parentElement.style.display = "flex";
    pedra.textContent = ` ${qtdPedra.toFixed(2)} m³`;
  } else if (tipoSelecionado === "reboc") {
    parte = volume / 6; // 1+5
    qtdCimentoM3 = parte * 1;
    qtdAreia = parte * 5;

    pedra.parentElement.style.display = "flex";
    pedra.textContent = " Não aplicável";
  } else if (tipoSelecionado === "conPiso") {
    parte = volume / 4; // 1+3
    qtdCimentoM3 = parte * 1;
    qtdAreia = parte * 3;

    pedra.parentElement.style.display = "flex";
    pedra.textContent = " Não aplicável";
  }

  const qtdCimentoKg = qtdCimentoM3 * 1400;

  cimento.textContent = ` ${Math.round(qtdCimentoKg)} kg | ${Math.round(qtdCimentoKg / 50)} sacas`;
  areia.textContent = ` ${qtdAreia.toFixed(2)} m³`;

  comp.value = "";
  larg.value = "";
  esp.value = "";
  ar.value = "";
  pe.value = "";
  ci.value = "";
});
