import { validarSoloLetras, validarNoVacio } from "../funcionesValidacion.js";
import { error_mensaje } from "./mensajesErrorTypes.js";

const $apellido = document.getElementById("apellido");
const $errores_apellido_container = document.getElementById(
	"errores_apellido_container"
);
const $apellido_label = document.getElementById("apellido_label");

export const validateSurname = (
	$apellido,
	$errores_apellido_container,
	$apellido_label
) => {
	let valorCampo = $apellido.value;
	const mensajesError = $errores_apellido_container.getElementsByTagName("p");
	let errorExistente = { letras: false, vacio: false };
	if (validarSoloLetras(valorCampo)) {
		const textoError = error_mensaje["apellido_solo_letras"];
		// Si el valor es válido --> Elimino el mensaje de error
		for (let i = 0; i < mensajesError.length; i++) {
			if (mensajesError[i].textContent.trim() === textoError) {
				$errores_apellido_container.removeChild(mensajesError[i]);

				break;
			}
		}
	} else {
		const textoError = error_mensaje["apellido_solo_letras"];
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
			$errores_apellido_container.appendChild(elementError);
		}
	}

	if (validarNoVacio(valorCampo)) {
		const textoError = error_mensaje["apellido_vacio"];
		// Si el valor es válido --> Elimino el mensaje de error
		for (let i = 0; i < mensajesError.length; i++) {
			if (mensajesError[i].textContent.trim() === textoError) {
				$errores_apellido_container.removeChild(mensajesError[i]);
				break;
			}
		}
	} else {
		const textoError = error_mensaje["apellido_vacio"];
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
			$errores_apellido_container.appendChild(elementError);
		}
	}
	if (mensajesError.length > 0) {
		$apellido_label.classList.add("invalido");
		$apellido.classList.add("input_invalido");
	} else {
		$apellido_label.classList.remove("invalido");
		$apellido.classList.remove("input_invalido");
	}
};

$apellido.addEventListener("blur", () =>
	validateSurname($apellido, $errores_apellido_container, $apellido_label)
);

$apellido.addEventListener("input", () =>
	validateSurname($apellido, $errores_apellido_container, $apellido_label)
);
