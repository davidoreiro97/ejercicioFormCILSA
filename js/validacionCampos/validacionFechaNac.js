import { validarFechaNac } from "../funcionesValidacion.js";
import { error_mensaje } from "./mensajesErrorTypes.js";

const $diaNac = document.getElementById("diaNac");
const $diaNac_label = document.getElementById("diaNac_label");

const $mesNac = document.getElementById("mesNac");
const $mesNac_label = document.getElementById("mesNac_label");

const $anioNac = document.getElementById("anioNac");
const $anioNac_label = document.getElementById("anioNac_label");

const $errores_fechaNac_container = document.getElementById(
	"errores_fechaNac_container"
);

const $fechaNac_label = document.getElementById("fechaNac_label");

export const validateBirthDate = (
	$diaNac,
	$mesNac,
	$anioNac,
	$errores_fechaNac_container,
	$fechaNac_label,
	$diaNac_label,
	$mesNac_label,
	$anioNac_label
) => {
	let valorDia = $diaNac.value;
	let valorMes = $mesNac.value;
	let valorAnio = $anioNac.value;

	const mensajesError = $errores_fechaNac_container.getElementsByTagName("p");

	let errorExistente = false;

	if (
		validarFechaNac(
			parseFloat(valorDia),
			parseFloat(valorMes),
			parseFloat(valorAnio)
		)
	) {
		const textoError = error_mensaje["fecha_invalida"];
		// Si el valor es válido --> Elimino el mensaje de error
		for (let i = 0; i < mensajesError.length; i++) {
			if (mensajesError[i].textContent.trim() === textoError) {
				$errores_fechaNac_container.removeChild(mensajesError[i]);
				break;
			}
		}
	} else {
		const textoError = error_mensaje["fecha_invalida"];
		// Si el valor es inválido compruebo si ya existe el mensaje de error.
		for (let i = 0; i < mensajesError.length; i++) {
			if (mensajesError[i].textContent.trim() === textoError) {
				errorExistente = true;
				break;
			}
		}
		// Si el mensaje de error no existe --> lo agrego
		if (!errorExistente) {
			const elementError = document.createElement("p");
			elementError.classList.add("invalido");
			elementError.innerText = textoError;
			$errores_fechaNac_container.appendChild(elementError);
		}
	}

	if (mensajesError.length > 0) {
		$fechaNac_label.classList.add("invalido");
		$diaNac_label.classList.add("invalido");
		$mesNac_label.classList.add("invalido");
		$anioNac_label.classList.add("invalido");
		$diaNac.classList.add("input_invalido");
		$mesNac.classList.add("input_invalido");
		$anioNac.classList.add("input_invalido");
	} else {
		$fechaNac_label.classList.remove("invalido");
		$diaNac_label.classList.remove("invalido");
		$mesNac_label.classList.remove("invalido");
		$anioNac_label.classList.remove("invalido");
		$diaNac.classList.remove("input_invalido");
		$mesNac.classList.remove("input_invalido");
		$anioNac.classList.remove("input_invalido");
	}
};
$diaNac.addEventListener("blur", () =>
	validateBirthDate(
		$diaNac,
		$mesNac,
		$anioNac,
		$errores_fechaNac_container,
		$fechaNac_label,
		$diaNac_label,
		$mesNac_label,
		$anioNac_label
	)
);
$diaNac.addEventListener("input", () =>
	validateBirthDate(
		$diaNac,
		$mesNac,
		$anioNac,
		$errores_fechaNac_container,
		$fechaNac_label,
		$diaNac_label,
		$mesNac_label,
		$anioNac_label
	)
);
$mesNac.addEventListener("blur", () =>
	validateBirthDate(
		$diaNac,
		$mesNac,
		$anioNac,
		$errores_fechaNac_container,
		$fechaNac_label,
		$diaNac_label,
		$mesNac_label,
		$anioNac_label
	)
);
$mesNac.addEventListener("input", () =>
	validateBirthDate(
		$diaNac,
		$mesNac,
		$anioNac,
		$errores_fechaNac_container,
		$fechaNac_label,
		$diaNac_label,
		$mesNac_label,
		$anioNac_label
	)
);
$anioNac.addEventListener("blur", () =>
	validateBirthDate(
		$diaNac,
		$mesNac,
		$anioNac,
		$errores_fechaNac_container,
		$fechaNac_label,
		$diaNac_label,
		$mesNac_label,
		$anioNac_label
	)
);
$anioNac.addEventListener("input", () =>
	validateBirthDate(
		$diaNac,
		$mesNac,
		$anioNac,
		$errores_fechaNac_container,
		$fechaNac_label,
		$diaNac_label,
		$mesNac_label,
		$anioNac_label
	)
);
