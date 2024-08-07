import { validarMail, validarNoVacio } from "../funcionesValidacion.js";
import { error_mensaje } from "./mensajesErrorTypes.js";

const $email = document.getElementById("email");
const $errores_email_container = document.getElementById(
	"errores_email_container"
);
const $email_label = document.getElementById("email_label");

export const validateMail = (
	$email,
	$errores_email_container,
	$email_label
) => {
	let valorCampo = $email.value;
	const mensajesError = $errores_email_container.getElementsByTagName("p");
	let errorExistente = { letras: false, vacio: false };
	if (validarMail(valorCampo)) {
		const textoError = error_mensaje["email_invalido"];
		// Si el valor es válido --> Elimino el mensaje de error
		for (let i = 0; i < mensajesError.length; i++) {
			if (mensajesError[i].textContent.trim() === textoError) {
				$errores_email_container.removeChild(mensajesError[i]);

				break;
			}
		}
	} else {
		const textoError = error_mensaje["email_invalido"];
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
			$errores_email_container.appendChild(elementError);
		}
	}

	if (validarNoVacio(valorCampo)) {
		const textoError = error_mensaje["email_vacio"];
		// Si el valor es válido --> Elimino el mensaje de error
		for (let i = 0; i < mensajesError.length; i++) {
			if (mensajesError[i].textContent.trim() === textoError) {
				$errores_email_container.removeChild(mensajesError[i]);
				break;
			}
		}
	} else {
		const textoError = error_mensaje["email_vacio"];
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
			$errores_email_container.appendChild(elementError);
		}
	}
	if (mensajesError.length > 0) {
		$email_label.classList.add("invalido");
		$email.classList.add("input_invalido");
	} else {
		$email_label.classList.remove("invalido");
		$email.classList.remove("input_invalido");
	}
};

$email.addEventListener("blur", () =>
	validateMail($email, $errores_email_container, $email_label)
);

$email.addEventListener("input", () =>
	validateMail($email, $errores_email_container, $email_label)
);
