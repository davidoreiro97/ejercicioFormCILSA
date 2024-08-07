import {
	validarSoloLetras,
	validarNoVacio,
	validarMail,
	validarFechaNac,
} from "./funcionesValidacion.js";
import { validateSurname } from "./validacionCampos/validacionApellido.js";
import { validateMail } from "./validacionCampos/validacionEmail.js";
import { validateBirthDate } from "./validacionCampos/validacionFechaNac.js";
import { validateName } from "./validacionCampos/validacionNombre.js";
//Formulario
const $formulario = document.getElementById("formulario");
//Nombre y sus campos
const $nombre = document.getElementById("nombre");
const $errores_nombre_container = document.getElementById(
	"errores_nombre_container"
);
const $nombre_label = document.getElementById("nombre_label");
//Apellido y sus campos
const $apellido = document.getElementById("apellido");
const $errores_apellido_container = document.getElementById(
	"errores_apellido_container"
);
const $apellido_label = document.getElementById("apellido_label");

//Email
const $email = document.getElementById("email");
const $errores_email_container = document.getElementById(
	"errores_email_container"
);
const $email_label = document.getElementById("email_label");
//Fecha nac
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

//Boton formulario ok
const $botonOk = document.getElementById("buttonFormOK");
const $mensajeFormOk = document.getElementById("formOK");

$botonOk.addEventListener("click", () => {
	$mensajeFormOk.classList.add("hidden");
	//Se envía recién acá el formulario ya que carezco de un backend.
	$formulario.submit();
});

const error_states = {
	nombre: false,
	apellido: false,
	email: false,
	fecha: false,
};
// ----------------- Validación general del formulario ----------------- //
$formulario.addEventListener("submit", (e) => {
	e.preventDefault();
	let error_form = false;
	validateName($nombre, $errores_nombre_container, $nombre_label);
	validateSurname($apellido, $errores_apellido_container, $apellido_label);
	validateMail($email, $errores_email_container, $email_label);
	validateBirthDate(
		$diaNac,
		$mesNac,
		$anioNac,
		$errores_fechaNac_container,
		$fechaNac_label,
		$diaNac_label,
		$mesNac_label,
		$anioNac_label
	);
	if (validarNoVacio($nombre.value) && validarSoloLetras($nombre.value)) {
		error_states.nombre = false;
	} else {
		error_states.nombre = true;
	}

	if (validarNoVacio($apellido.value) && validarSoloLetras($apellido.value)) {
		error_states.apellido = false;
	} else {
		error_states.apellido = true;
	}

	if (validarMail($email.value)) {
		error_states.email = false;
	} else {
		error_states.email = true;
	}

	if (
		validarFechaNac(
			parseFloat($diaNac.value),
			parseFloat($mesNac.value),
			parseFloat($anioNac.value)
		)
	) {
		error_states.fecha = false;
	} else {
		error_states.fecha = true;
	}

	//Si todos son false significa que no hubo error, si hay alguna true marcamos con error el formulario.
	for (const campo in error_states) {
		if (error_states[campo]) {
			error_form = true;
			break;
		}
	}
	if (!error_form) {
		$mensajeFormOk.classList.remove("hidden");
		// $formulario.submit();
	}
	return;
});
