import { validarSoloLetras, validarNoVacio } from "../funcionesValidacion.js";
import { error_mensaje } from "./mensajesErrorTypes.js";

const $nombre = document.getElementById("nombre");
const $errores_nombre_container = document.getElementById(
	"errores_nombre_container"
);
const $nombre_label = document.getElementById("nombre_label");

export const validateName = (
	$nombre,
	$errores_nombre_container,
	$nombre_label
) => {
	let valorCampo = $nombre.value;
	const mensajesError = $errores_nombre_container.getElementsByTagName("p");
	let errorExistente = { letras: false, vacio: false };
	if (validarSoloLetras(valorCampo)) {
		const textoError = error_mensaje["nombre_solo_letras"];
		// Si el valor es válido --> Elimino el mensaje de error
		for (let i = 0; i < mensajesError.length; i++) {
			if (mensajesError[i].textContent.trim() === textoError) {
				$errores_nombre_container.removeChild(mensajesError[i]);

				break;
			}
		}
	} else {
		const textoError = error_mensaje["nombre_solo_letras"];
		// Si el valor es inválido compruebo si ya existe el mensaje de error.

		for (let i = 0; i < mensajesError.length; i++) {
			if (mensajesError[i].textContent.trim() === textoError) {
				errorExistente.letras = true;
				break;
			}
		}
		// Si el mensaje de error no existe --> lo agrego
		if (!errorExistente.letras) {
			const elementError = document.createElement("p");
			elementError.classList.add("invalido");
			elementError.innerText = textoError;
			$errores_nombre_container.appendChild(elementError);
		}
	}

	if (validarNoVacio(valorCampo)) {
		const textoError = error_mensaje["nombre_vacio"];
		// Si el valor es válido --> Elimino el mensaje de error
		for (let i = 0; i < mensajesError.length; i++) {
			if (mensajesError[i].textContent.trim() === textoError) {
				$errores_nombre_container.removeChild(mensajesError[i]);
				break;
			}
		}
	} else {
		const textoError = error_mensaje["nombre_vacio"];
		// Si el valor es inválido compruebo si ya existe el mensaje de error.

		for (let i = 0; i < mensajesError.length; i++) {
			if (mensajesError[i].textContent.trim() === textoError) {
				errorExistente.vacio = true;
				break;
			}
		}
		// Si el mensaje de error no existe --> lo agrego
		if (!errorExistente.vacio) {
			const elementError = document.createElement("p");
			elementError.classList.add("invalido");
			elementError.innerText = textoError;
			$errores_nombre_container.appendChild(elementError);
		}
	}
	if (mensajesError.length > 0) {
		$nombre_label.classList.add("invalido");
		$nombre.classList.add("input_invalido");
	} else {
		$nombre_label.classList.remove("invalido");
		$nombre.classList.remove("input_invalido");
	}
};

$nombre.addEventListener("blur", () =>
	validateName($nombre, $errores_nombre_container, $nombre_label)
);

$nombre.addEventListener("input", () =>
	validateName($nombre, $errores_nombre_container, $nombre_label)
);
