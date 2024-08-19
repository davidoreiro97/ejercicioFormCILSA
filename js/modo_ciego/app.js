import {
	validarFechaNac,
	validarMail,
	validarNoVacio,
	validarSoloLetras,
	es_pais_valido,
} from "../funcionesValidacion.js";
import mensajes from "./mensajes_voz.js";
let hay_lector_texto = false;
let voces = [];
let voz_esp;
//RECORDAR REMOVER /ejercicioFormCILSA/
const sonido_senial = new Audio(
	`/ejercicioFormCILSA/assets/mp3/sonido_alerta.mp3`
);
let datos_form = {
	nombre: "",
	apellido: "",
	email: "",
	dia_nacimiento: "",
	mes_nacimiento: "",
	anio_nacimiento: "",
	pais_residencia: "",
};
let interval_welcome_msg;
let bloquear_cambio_seccion = false;
let $input_user = document.getElementById("input_user");
let $input_confirmacion = document.getElementById("input_confirmacion");
document.addEventListener("DOMContentLoaded", () => {
	if ("speechSynthesis" in window) {
		hay_lector_texto = true;
	} else {
		hay_lector_texto = false;
	}
	window.speechSynthesis.onvoiceschanged = () => {
		//onvoiceschanged asegura que las voces estén cargadas a iniciar.
		voces = speechSynthesis.getVoices();
		voz_esp = voces.find(
			(voz) =>
				voz.lang === "es-ES" || voz.lang === "es-MX" || voz.lang === "es-US"
		);
		hablar(mensajes["bienvenida"]);
		interval_welcome_msg = setInterval(() => {
			hablar(mensajes["bienvenida"]);
		}, 25000);
	};
});

const hablar = (mensaje) => {
	const msg = new SpeechSynthesisUtterance();
	msg.text = mensaje;
	msg.voice = voz_esp;
	msg.pitch = 0.9;
	speechSynthesis.speak(msg);
};
const hablar_y_alerta = (mensaje) => {
	const msg = new SpeechSynthesisUtterance();
	msg.text = mensaje;
	msg.voice = voz_esp;
	msg.pitch = 0.9;
	speechSynthesis.speak(msg);
	// bloquear_cambio_seccion = true;
	msg.onend = () => {
		sonido_senial.play();
		$input_user.value = "";
		$input_user.focus();
	};
};

//------------------> Secciones

const seccion = {
	bienvenida: "bienvenida",
	nombre: "nombre",
	apellido: "apellido",
	email: "email",
	dia_nacimiento: "dia_nacimiento",
	mes_nacimiento: "mes_nacimiento",
	anio_nacimiento: "anio_nacimiento",
	pais_residencia: "pais_residencia",
	confirmar_form: "confirmar_form",
	agradecimiento_final: "agradecimiento_final",
};
let seccion_actual = seccion["bienvenida"];
export const iniciar_seccion = () => {
	switch (seccion_actual) {
		case seccion["bienvenida"]:
			hablar(mensajes["bienvenida"]);
			if (interval_welcome_msg) {
				clearInterval(interval_welcome_msg);
			}
			interval_welcome_msg = setInterval(() => {
				hablar(mensajes["bienvenida"]);
			}, 25000);
			break;

		case seccion["nombre"]:
			hablar_y_alerta(mensajes["ingresar_nombre"]);
			break;

		case seccion["apellido"]:
			hablar_y_alerta(mensajes["ingresar_apellido"]);
			break;

		case seccion["email"]:
			hablar_y_alerta(mensajes["ingresar_email"]);
			break;

		case seccion["dia_nacimiento"]:
			hablar_y_alerta(mensajes["ingresar_dia_nac"]);
			break;

		case seccion["mes_nacimiento"]:
			hablar_y_alerta(mensajes["ingresar_mes_nac"]);
			break;

		case seccion["anio_nacimiento"]:
			hablar_y_alerta(mensajes["ingresar_anio_nac"]);
			break;

		case seccion["pais_residencia"]:
			hablar_y_alerta(mensajes["ingresar_pais_residencia"]);
			break;

		case seccion["confirmar_form"]:
			hablar(mensajes["confirmar_formulario"]);
			break;

		case seccion["agradecimiento_final"]:
			hablar(mensajes["agradecimiento_final"]);
			break;

		default:
			console.warn("Sección no reconocida");
	}
};
export const avanzar_seccion = () => {
	switch (seccion_actual) {
		case seccion["bienvenida"]:
			clearInterval(interval_welcome_msg);
			seccion_actual = seccion["nombre"];
			break;

		case seccion["nombre"]:
			seccion_actual = seccion["apellido"];
			break;

		case seccion["apellido"]:
			seccion_actual = seccion["email"];
			break;
		case seccion["email"]:
			seccion_actual = seccion["dia_nacimiento"];
			break;

		case seccion["dia_nacimiento"]:
			seccion_actual = seccion["mes_nacimiento"];
			break;

		case seccion["mes_nacimiento"]:
			seccion_actual = seccion["anio_nacimiento"];
			break;

		case seccion["anio_nacimiento"]:
			seccion_actual = seccion["pais_residencia"];
			break;

		case seccion["pais_residencia"]:
			seccion_actual = seccion["confirmar_form"];
			break;

		case seccion["confirmar_form"]:
			seccion_actual = seccion["agradecimiento_final"];
			break;

		default:
			console.warn("Sección no reconocida");
	}
	iniciar_seccion();
};
export const retroceder_seccion = () => {
	switch (seccion_actual) {
		case seccion["nombre"]:
			seccion_actual = seccion["bienvenida"];
			break;

		case seccion["apellido"]:
			seccion_actual = seccion["nombre"];
			break;

		case seccion["email"]:
			seccion_actual = seccion["apellido"];
			break;

		// case seccion["fecha_nacimiento"]:
		// 	seccion_actual = seccion["email"];
		// 	break;

		// case seccion["pais_residencia"]:
		// 	seccion_actual = seccion["fecha_nacimiento"];
		// 	break;

		case seccion["confirmar_form"]:
			seccion_actual = seccion["pais_residencia"];
			break;
	}
	iniciar_seccion(); // Iniciar la nueva sección
};

//------------------> Secciones FIN
document.addEventListener("keydown", (e) => {
	//Este event listener se utiliza para la navegación entre secciones.
	if (e.key === "ArrowRight") {
		speechSynthesis.cancel();
		if (seccion_actual !== seccion["bienvenida"]) {
			clearInterval(interval_welcome_msg);
		}
		if (seccion_actual === seccion["bienvenida"]) {
			avanzar_seccion();
			clearInterval(interval_welcome_msg);
		}
		if (bloquear_cambio_seccion && seccion_actual === seccion["nombre"]) {
			bloquear_cambio_seccion = true;
			hablar(
				`No puede avanzar a la siguiente sección hasta que ingrese un nombre y presione enter.`
			);
			$input_user.focus();
			hablar("Campo nombre seleccionado.");
			if ($input_user.value.trim()) {
				hablar(`El nombre escrito es ${$input_user.value.trim()}`);
			}
		}
		if (bloquear_cambio_seccion && seccion_actual === seccion["apellido"]) {
			bloquear_cambio_seccion = true;
			hablar(
				`No puede avanzar a la siguiente sección hasta que ingrese un apellido y presione enter.`
			);
			$input_user.focus();
			hablar("Campo apellido seleccionado.");
			if ($input_user.value.trim()) {
				hablar(`El apellido escrito es ${$input_user.value.trim()}`);
			}
		}
		if (bloquear_cambio_seccion && seccion_actual === seccion["email"]) {
			bloquear_cambio_seccion = true;
			hablar(
				`No puede avanzar a la siguiente sección hasta que ingrese un email y presione enter.`
			);
			$input_user.focus();
			hablar("Campo email seleccionado.");
			if ($input_user.value.trim()) {
				hablar(`El email escrito es ${$input_user.value.trim()}`);
			}
		}
		//fecha nac
		if (
			bloquear_cambio_seccion &&
			seccion_actual === seccion["dia_nacimiento"]
		) {
			bloquear_cambio_seccion = true;
			hablar(
				`No puede avanzar a la siguiente sección hasta que ingrese su día de nacimiento y presione enter.`
			);
			$input_user.focus();
			hablar("Campo día de nacimiento seleccionado.");
			if ($input_user.value.trim()) {
				hablar(`El día de nacimiento escrito es ${$input_user.value.trim()}`);
			}
		}
		if (
			bloquear_cambio_seccion &&
			seccion_actual === seccion["mes_nacimiento"]
		) {
			bloquear_cambio_seccion = true;
			hablar(
				`No puede avanzar a la siguiente sección hasta que ingrese su mes de nacimiento y presione enter.`
			);
			$input_user.focus();
			hablar("Campo mes de nacimiento seleccionado.");
			if ($input_user.value.trim()) {
				hablar(`El mes de nacimiento escrito es ${$input_user.value.trim()}`);
			}
		}

		if (
			bloquear_cambio_seccion &&
			seccion_actual === seccion["anio_nacimiento"]
		) {
			bloquear_cambio_seccion = true;
			hablar(
				`No puede avanzar a la siguiente sección hasta que ingrese su año de nacimiento y presione enter.`
			);
			$input_user.focus();
			hablar("Campo año de nacimiento seleccionado.");
			if ($input_user.value.trim()) {
				hablar(`El año de nacimiento escrito es ${$input_user.value.trim()}`);
			}
		}
		//fecha nac fin
		//pais resid
		if (
			bloquear_cambio_seccion &&
			seccion_actual === seccion["pais_residencia"]
		) {
			bloquear_cambio_seccion = true;
			hablar(
				`No puede avanzar a la siguiente sección hasta que ingrese su país de residencia y presione enter.`
			);
			$input_user.focus();
			hablar("Campo país de residencia seleccionado.");
			if ($input_user.value.trim()) {
				hablar(`El país de residencia escrito es ${$input_user.value.trim()}`);
			}
		}
		//pas resid fin
	}
	// if (e.key === "ArrowLeft") {
	// 	speechSynthesis.cancel();
	// 	if (seccion_actual !== seccion["bienvenida"]) {
	// 		clearInterval(interval_welcome_msg);
	// 	}
	// 	retroceder_seccion();
	// 	bloquear_cambio_seccion = false;
	// }
});
$input_user.addEventListener("keydown", (e) => {
	//Este event listener se utiliza para confirmar por primera vez el input.
	let error = false;
	//Nombre
	if (e.key === "Enter" && seccion_actual === seccion["nombre"]) {
		bloquear_cambio_seccion = true;
		speechSynthesis.cancel();
		if (!validarNoVacio($input_user.value)) {
			hablar(
				"ERROR : El nombre esta vacío y no debe estarlo, intente nuevamente."
			);
			error = true;
			hablar("Campo para escribir seleccionado.");
			$input_user.focus();
		}
		if (!validarSoloLetras($input_user.value)) {
			hablar(
				`ERROR : El nombre ingresado : ${$input_user.value} contiene numeros u otros carácteres inválidos y no debe contenerlos, intente nuevamente.`
			);
			hablar("Campo para escribir seleccionado.");
			error = true;
			$input_user.focus();
		}
		if (!error) {
			hablar(
				`El nombre ingresado es : ${$input_user.value}. Presione enter para confirmarlo. O escape para borrarlo y volverlo a ingresar.`
			);
			$input_confirmacion.removeAttribute("disabled");
			$input_confirmacion.focus();
		}
	}
	//Nombre fin
	//Apellido
	if (e.key === "Enter" && seccion_actual === seccion["apellido"]) {
		bloquear_cambio_seccion = true;
		speechSynthesis.cancel();
		if (!validarNoVacio($input_user.value)) {
			hablar(
				"ERROR : El apellido esta vacío y no debe estarlo, intente nuevamente."
			);
			error = true;
			hablar("Campo para escribir seleccionado.");
			$input_user.focus();
		}
		if (!validarSoloLetras($input_user.value)) {
			hablar(
				`ERROR : El apellido ingresado : ${$input_user.value} contiene numeros u otros carácteres inválidos y no debe contenerlos, intente nuevamente.`
			);
			hablar("Campo para escribir seleccionado.");
			error = true;
			$input_user.focus();
		}
		if (!error) {
			hablar(
				`El apellido ingresado es : ${$input_user.value}. Presione enter para confirmarlo. O escape para borrarlo y volverlo a ingresar.`
			);
			$input_confirmacion.removeAttribute("disabled");
			$input_confirmacion.focus();
		}
	}
	//Apellido fin
	//email
	if (e.key === "Enter" && seccion_actual === seccion["email"]) {
		bloquear_cambio_seccion = true;
		speechSynthesis.cancel();
		if (!validarNoVacio($input_user.value)) {
			hablar(
				"ERROR : El email esta vacío y no debe estarlo, intente nuevamente."
			);
			error = true;
			hablar("Campo para escribir seleccionado.");
			$input_user.focus();
		}
		if (!validarMail($input_user.value)) {
			hablar(
				`ERROR : El email ingresado : ${$input_user.value} es inválido. Solo los dominios : gmail, yahoo, outlook, aol, icloud, protonmail, zoho, yandex y gmx se admiten.`
			);
			hablar("Campo para escribir seleccionado.");
			error = true;
			$input_user.focus();
		}
		if (!error) {
			hablar(
				`El email ingresado es : ${$input_user.value}. Presione enter para confirmarlo. O escape para borrarlo y volverlo a ingresar.`
			);
			$input_confirmacion.removeAttribute("disabled");
			$input_confirmacion.focus();
		}
	}
	//email fin
	//fecha nacimiento DIA
	if (e.key === "Enter" && seccion_actual === seccion["dia_nacimiento"]) {
		bloquear_cambio_seccion = true;
		speechSynthesis.cancel();
		if (!validarNoVacio($input_user.value)) {
			hablar(
				"ERROR : El día de nacimiento esta vacío y no debe estarlo, intente nuevamente."
			);
			error = true;
			hablar("Campo para escribir seleccionado.");
			$input_user.focus();
		}
		if (isNaN(parseInt($input_user.value))) {
			hablar(
				"ERROR : El día de nacimiento debe ser un número, intente nuevamente."
			);
			error = true;
			hablar("Campo para escribir seleccionado.");
			$input_user.focus();
		}
		if (!error) {
			hablar(
				`El día de nacimiento ingresado es : ${$input_user.value}. Presione enter para confirmarlo. O escape para borrarlo y volverlo a ingresar.`
			);
			$input_confirmacion.removeAttribute("disabled");
			$input_confirmacion.focus();
		}
	}
	//fecha nacimiento DIA fin
	//fecha nacimiento MES
	if (e.key === "Enter" && seccion_actual === seccion["mes_nacimiento"]) {
		bloquear_cambio_seccion = true;
		speechSynthesis.cancel();
		if (!validarNoVacio($input_user.value)) {
			hablar(
				"ERROR : El mes de nacimiento esta vacío y no debe estarlo, intente nuevamente."
			);
			error = true;
			hablar("Campo para escribir seleccionado.");
			$input_user.focus();
		}
		if (isNaN(parseInt($input_user.value))) {
			hablar(
				"ERROR : El mes de nacimiento debe ser un número, intente nuevamente."
			);
			error = true;
			hablar("Campo para escribir seleccionado.");
			$input_user.focus();
		}
		if (!error) {
			hablar(
				`El mes de nacimiento ingresado es : ${$input_user.value}. Presione enter para confirmarlo. O escape para borrarlo y volverlo a ingresar.`
			);
			$input_confirmacion.removeAttribute("disabled");
			$input_confirmacion.focus();
		}
	}
	//fecha nacimiento MES fin
	//fecha nacimiento AÑO
	if (e.key === "Enter" && seccion_actual === seccion["anio_nacimiento"]) {
		bloquear_cambio_seccion = true;
		speechSynthesis.cancel();
		if (!validarNoVacio($input_user.value)) {
			hablar(
				"ERROR : El año de nacimiento esta vacío y no debe estarlo, intente nuevamente."
			);
			error = true;
			hablar("Campo para escribir seleccionado.");
			$input_user.focus();
		}
		if (isNaN(parseInt($input_user.value))) {
			hablar(
				"ERROR : El año de nacimiento debe ser un número, intente nuevamente."
			);
			error = true;
			hablar("Campo para escribir seleccionado.");
			$input_user.focus();
		}
		if (
			!validarFechaNac(
				parseInt(datos_form.dia_nacimiento),
				parseInt(datos_form.mes_nacimiento),
				parseInt($input_user.value)
			)
		) {
			speechSynthesis.cancel();
			hablar_y_alerta(
				`La fecha ${datos_form.dia_nacimiento} del mes ${datos_form.mes_nacimiento} del año ${$input_user.value} es invalida, deberá volver a ingresar la fecha de nacimiento desde el día después de la señal.`
			);
			error = true;
			$input_confirmacion.setAttribute("disabled", true);
			$input_user.value = "";
			datos_form.dia_nacimiento = "";
			datos_form.mes_nacimiento = "";
			$input_user.value = "";
			seccion_actual = seccion["dia_nacimiento"];
			$input_user.focus();
		}
		if (!error) {
			hablar(
				`El año de nacimiento ingresado es : ${$input_user.value}. Presione enter para confirmarlo. O escape para borrarlo y volverlo a ingresar.`
			);
			$input_confirmacion.removeAttribute("disabled");
			$input_confirmacion.focus();
		}
	}
	//fecha nacimiento AÑO fin
	//país de residencia
	if (e.key === "Enter" && seccion_actual === seccion["pais_residencia"]) {
		bloquear_cambio_seccion = true;
		speechSynthesis.cancel();
		if (!validarNoVacio($input_user.value)) {
			hablar(
				"ERROR : El país de residencia esta vacío y no debe estarlo, intente nuevamente."
			);
			error = true;
			hablar("Campo para escribir seleccionado.");
			$input_user.focus();
		}
		if (!es_pais_valido($input_user.value)) {
			hablar(
				"ERROR : El país de residencia debe ser uno existente, intente nuevamente."
			);
			error = true;
			hablar("Campo para escribir seleccionado.");
			$input_user.focus();
		}
		if (!error) {
			hablar(
				`El país de residencia ingresado es : ${$input_user.value}. Presione enter para confirmarlo. O escape para borrarlo y volverlo a ingresar.`
			);
			$input_confirmacion.removeAttribute("disabled");
			$input_confirmacion.focus();
		}
	}
	//país de residencia fin
	//Confirmar envío
	if (e.key === "Enter" && seccion_actual === seccion["confirmar_form"]) {
		bloquear_cambio_seccion = true;
		speechSynthesis.cancel();
		hablar(
			`¿Desea confirmar el envío de su formulario con los siguientes datos?`
		);
		hablar(
			`DATOS. Nombre : ${datos_form.nombre}. Apellido : ${datos_form.apellido}. Email : ${datos_form.email}. `
		);
		hablar(
			`Fecha de nacimiento ; Día : ${datos_form.dia_nacimiento}. Mes : ${datos_form.mes_nacimiento}. Año : ${datos_form.anio_nacimiento}. País de residencia : ${datos_form.pais_residencia}.`
		);
		hablar(
			`Presione la tecla ENTER para confirmar el envío del formulario. Si quiere cancelarlo y volver a comenzar presione escape.`
		);
		$input_confirmacion.removeAttribute("disabled");
		$input_confirmacion.focus();
	}
});

$input_confirmacion.addEventListener("keydown", (e) => {
	//Este event listener se usa para escuchar los eventos de enter o escape para confirmar o rechazar el campo y avanzar de seccion.
	//Nombre
	if (e.key === "Enter" && seccion_actual === seccion["nombre"]) {
		speechSynthesis.cancel();
		datos_form.nombre = $input_user.value;
		bloquear_cambio_seccion = false;
		$input_confirmacion.setAttribute("disabled", true);
		$input_user.value = "";
		$input_user.focus();
		avanzar_seccion();
		return;
	} else {
		if (e.key === "Escape" && seccion_actual === seccion["nombre"]) {
			speechSynthesis.cancel();
			$input_confirmacion.setAttribute("disabled", true);
			$input_user.value = "";
			$input_user.focus();
			hablar_y_alerta("Puede volver a ingresar el nombre luego de la señal.");
			return;
		} else {
			speechSynthesis.cancel();
			hablar(
				`El nombre ingresado es : ${$input_user.value}. Presione enter para confirmarlo. O escape para borrarlo y volverlo a ingresar.`
			);
		}
	}
	//Nombre FIN
	//Apellido
	if (e.key === "Enter" && seccion_actual === seccion["apellido"]) {
		speechSynthesis.cancel();
		datos_form.apellido = $input_user.value;
		bloquear_cambio_seccion = false;
		$input_confirmacion.setAttribute("disabled", true);
		$input_user.value = "";
		$input_user.focus();
		avanzar_seccion();
		return;
	} else {
		if (e.key === "Escape" && seccion_actual === seccion["apellido"]) {
			speechSynthesis.cancel();
			$input_confirmacion.setAttribute("disabled", true);
			$input_user.value = "";
			$input_user.focus();
			hablar_y_alerta("Puede volver a ingresar el apellido luego de la señal.");
			return;
		} else {
			speechSynthesis.cancel();
			hablar(
				`El apellido ingresado es : ${$input_user.value}. Presione enter para confirmarlo. O escape para borrarlo y volverlo a ingresar.`
			);
		}
	}
	//Apellido FIN
	//email
	if (e.key === "Enter" && seccion_actual === seccion["email"]) {
		speechSynthesis.cancel();
		datos_form.email = $input_user.value;
		bloquear_cambio_seccion = false;
		$input_confirmacion.setAttribute("disabled", true);
		$input_user.value = "";
		$input_user.focus();
		avanzar_seccion();
		return;
	} else {
		if (e.key === "Escape" && seccion_actual === seccion["email"]) {
			speechSynthesis.cancel();
			$input_confirmacion.setAttribute("disabled", true);
			$input_user.value = "";
			$input_user.focus();
			hablar_y_alerta("Puede volver a ingresar el email luego de la señal.");
			return;
		} else {
			speechSynthesis.cancel();
			hablar(
				`El email ingresado es : ${$input_user.value}. Presione enter para confirmarlo. O escape para borrarlo y volverlo a ingresar.`
			);
		}
	}
	//email FIN
	//Fecha_nac DIA
	if (e.key === "Enter" && seccion_actual === seccion["dia_nacimiento"]) {
		speechSynthesis.cancel();
		datos_form.dia_nacimiento = $input_user.value;
		bloquear_cambio_seccion = false;
		$input_confirmacion.setAttribute("disabled", true);
		$input_user.value = "";
		$input_user.focus();
		avanzar_seccion();
		return;
	} else {
		if (e.key === "Escape" && seccion_actual === seccion["dia_nacimiento"]) {
			speechSynthesis.cancel();
			$input_confirmacion.setAttribute("disabled", true);
			$input_user.value = "";
			$input_user.focus();
			hablar_y_alerta(
				"Puede volver a ingresar el día de nacimiento luego de la señal."
			);
			return;
		} else {
			speechSynthesis.cancel();
			hablar(
				`El día de su nacimiento es : ${$input_user.value}. Presione enter para confirmarlo. O escape para borrarlo y volverlo a ingresar.`
			);
		}
	}
	//Fecha_nac DIA FIN
	//Fecha_nac MES
	if (e.key === "Enter" && seccion_actual === seccion["mes_nacimiento"]) {
		speechSynthesis.cancel();
		datos_form.mes_nacimiento = $input_user.value;
		bloquear_cambio_seccion = false;
		$input_confirmacion.setAttribute("disabled", true);
		$input_user.value = "";
		$input_user.focus();
		avanzar_seccion();
		return;
	} else {
		if (e.key === "Escape" && seccion_actual === seccion["mes_nacimiento"]) {
			speechSynthesis.cancel();
			$input_confirmacion.setAttribute("disabled", true);
			$input_user.value = "";
			$input_user.focus();
			hablar_y_alerta(
				"Puede volver a ingresar el mes de su nacimiento luego de la señal."
			);
			return;
		} else {
			speechSynthesis.cancel();
			hablar(
				`El mes de nacimiento es : ${$input_user.value}. Presione enter para confirmarlo. O escape para borrarlo y volverlo a ingresar.`
			);
		}
	}
	//Fecha_nac MES FIN
	//Fecha_nac ANIO
	if (e.key === "Enter" && seccion_actual === seccion["anio_nacimiento"]) {
		speechSynthesis.cancel();
		datos_form.anio_nacimiento = $input_user.value;
		bloquear_cambio_seccion = false;
		$input_confirmacion.setAttribute("disabled", true);
		$input_user.value = "";
		$input_user.focus();
		avanzar_seccion();
		return;
	} else {
		if (e.key === "Escape" && seccion_actual === seccion["anio_nacimiento"]) {
			speechSynthesis.cancel();
			$input_confirmacion.setAttribute("disabled", true);
			$input_user.value = "";
			$input_user.focus();
			hablar_y_alerta(
				"Puede volver a ingresar el año de su nacimiento luego de la señal."
			);
			return;
		} else {
			speechSynthesis.cancel();
			hablar(
				`El año de nacimiento es : ${$input_user.value}. Presione enter para confirmarlo. O escape para borrarlo y volverlo a ingresar.`
			);
		}
	}
	//Fecha_nac ANIO FIN
	//Pais de residencia
	if (e.key === "Enter" && seccion_actual === seccion["pais_residencia"]) {
		speechSynthesis.cancel();
		datos_form.pais_residencia = $input_user.value;
		bloquear_cambio_seccion = false;
		$input_confirmacion.setAttribute("disabled", true);
		$input_user.value = "";
		$input_user.focus();
		avanzar_seccion();
		return;
	} else {
		if (e.key === "Escape" && seccion_actual === seccion["pais_residencia"]) {
			speechSynthesis.cancel();
			$input_confirmacion.setAttribute("disabled", true);
			$input_user.value = "";
			$input_user.focus();
			hablar_y_alerta(
				"Puede volver a ingresar el país de residencia luego de la señal."
			);
			return;
		} else {
			speechSynthesis.cancel();
			hablar(
				`El país de residencia es : ${$input_user.value}. Presione enter para confirmarlo. O escape para borrarlo y volverlo a ingresar.`
			);
		}
	}
	//Pais de residencia FIN

	//Pais de residencia
	if (e.key === "Enter" && seccion_actual === seccion["confirmar_form"]) {
		speechSynthesis.cancel();
		//ACA SE HARIA EL POST AL ENDPOINT Y SE ESPERARIA UNA RESPUESTA.
		bloquear_cambio_seccion = false;
		$input_confirmacion.setAttribute("disabled", true);
		$input_user.value = "";
		$input_user.focus();
		avanzar_seccion(); //SECCION DE AGRADECIMIENTO FINAL.
		return;
	} else {
		if (e.key === "Escape" && seccion_actual === seccion["confirmar_form"]) {
			speechSynthesis.cancel();
			$input_confirmacion.setAttribute("disabled", true);
			$input_user.value = "";
			seccion_actual = seccion["nombre"];

			$input_user.focus();
			hablar_y_alerta(
				"Formulario reiniciado, campo nombre seleccionado. Puede ingresar su nombre nuevamente despues de la señal."
			);
			return;
		} else {
			speechSynthesis.cancel();
			hablar(
				`Presione enter para confirmar el envío del formulario. O escape para borrarlo e ingresarlo desde 0.`
			);
		}
	}
	//Pais de residencia FIN
	console.log(datos_form);
});
