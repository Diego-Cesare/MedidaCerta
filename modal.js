const modal = document.getElementById("myModal");
const btn = document.getElementById("colabore");
const span = document.querySelector(".close");

// Abrir modal
btn.onclick = function() {
  modal.style.display = "block";
}

// Fechar modal ao clicar no X
span.onclick = function() {
  modal.style.display = "none";
}

// Fechar modal ao clicar fora do conteúdo
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Exemplo de ação dentro do modal
document.getElementById("modalAction").onclick = function() {
  alert("Ação executada!");
  modal.style.display = "none";
}