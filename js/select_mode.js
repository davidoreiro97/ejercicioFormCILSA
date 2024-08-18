let $cartel_elegir_modo = document.getElementById("cartel_elegir_modo");
let $main = document.getElementById("main");
let $normal_btn = document.getElementById("normal_btn");
let $ciego_btn = document.getElementById("ciego_btn");
let $modo_btn_menu = document.getElementById("modo_btn_menu");
let $preferencesMenu = document.getElementById("preferencesMenu");
const pagina_ciego = "/index_ciego.html";

// const modo = localStorage.getItem("modo");
// if (modo === "normal") {
// 	$cartel_elegir_modo.classList.add("hidden");
// 	$main.classList.remove("hidden");
// }
// if (modo === "ciego") {
// 	window.location.href = pagina_ciego;
// }

$normal_btn.addEventListener("click", () => {
	$cartel_elegir_modo.classList.add("hidden");
	$preferencesMenu.classList.remove("hidden");
	$main.classList.remove("hidden");
	localStorage.setItem("modo", "normal");
});

$modo_btn_menu.addEventListener("click", () => {
	$cartel_elegir_modo.classList.remove("hidden");
	$main.classList.add("hidden");
	$preferencesMenu.classList.add("hidden");
	localStorage.setItem("modo", "ciego");
});

$ciego_btn.addEventListener("click", () => {
	window.location.href = pagina_ciego;
});
