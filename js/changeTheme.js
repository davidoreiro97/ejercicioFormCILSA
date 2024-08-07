const $menuBtn = document.getElementById("menuBtn");
const $optionsMenuContainer = document.getElementById("optionsMenuContainer");
//menuBtnYOptionsRef para al clickear fuera de este contenedor cerrar el menú desplegable.
const $menuBtnYOptionsRef = document.getElementById("menuBtnYOptionsRef");

//Para el cambio de temas
const $temaClaroOnClick = document.getElementById("temaClaroOnClick");
const $temaAltoContrasteOnClick = document.getElementById(
	"temaAltoContrasteOnClick"
);

// Abrir y cerrar el menu
function cerrarMenuClickFuera(event) {
	if (!$menuBtnYOptionsRef.contains(event.target)) {
		$optionsMenuContainer.classList.add("hidden");
	}
}
document.addEventListener("click", cerrarMenuClickFuera);

function toggleMenu() {
	$optionsMenuContainer.classList.toggle("hidden");
}
$menuBtn.addEventListener("click", toggleMenu);

// Cambiar los temas
function toggleClaro() {
	// Remuevo el tema de alto contraste y tengo el claro
	document.documentElement.removeAttribute("data-theme");
}

function toggleAltoContraste() {
	// Agrego el tema de alto contraste
	document.documentElement.setAttribute("data-theme", "altoContraste");
}

$temaClaroOnClick.addEventListener("click", toggleClaro);
$temaAltoContrasteOnClick.addEventListener("click", toggleAltoContraste);
