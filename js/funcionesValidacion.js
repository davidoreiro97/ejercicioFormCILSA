import { paises } from "./insertOptions.js";
export function validarSoloLetras(cadena) {
	//Devuelve true si son solo letras.
	const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/;
	return regex.test(cadena);
}
export function validarNoVacio(cadena) {
	//Devuelve true si la cadena no está vacía.
	return cadena.trim() !== "";
}
export function validarMail(mail) {
	//La ER comprueba que :
	//- El mail empieze por una letra o número
	//- No tenga más de dos puntos consecutivos ni termine en punto antes del @
	//- Además pertenezca a un dominio dentro de la lista seguido de un subdominio de 2 o más letras
	const regex =
		/^[a-zA-Z0-9]{1,}([.]?[_]?[-]?[a-zA-Z0-9]+)*(@gmail.com|@yahoo.com|@outlook.com|@aol.com|@icloud.com|@protonmail.com|@zoho.com|@gmx.com|@yandex.com){1}(\.)*([a-zA-z]{2,})*$/;
	return regex.test(mail);
}

function esAnioBisiesto(anio) {
	//Un año es bisiesto si :
	// Primero se verifica que sea divisible por 4, caso afirmativo es bisiesto, caso contrario NO.
	// Luego se verifica que sea divisible por 100, si NO es divisible por 100 es bisiesto, caso contrario pasar al paso sig.
	// Si el año es divisible por 100 se debe comprobar que sea divisible TAMBIEN por 400, en este caso es bisiesto, caso contrario no.
	if (anio % 4 === 0) {
		if (anio % 100 === 0) {
			if (anio % 400 === 0) {
				return true; // Año divisible por 100 y por 400 --> bisiesto
			} else {
				return false; // Año divisible por 100 pero NO por 400 --> NO bisiesto
			}
		} else {
			return true; // Año divisible por 4 pero no por 100 --> bisiesto
		}
	}
	return false; // Año no divisible por 4 --> NO bisiesto
}
function esEntero(numero) {
	return Number.isInteger(numero);
}
export function validarFechaNac(dia, mes, anio) {
	const cant_diasXmes = {
		1: 31,
		2: 28,
		3: 31,
		4: 30,
		5: 31,
		6: 30,
		7: 31,
		8: 31,
		9: 30,
		10: 31,
		11: 30,
		12: 31,
	};
	const cant_diasXmes_bisiesto = {
		1: 31,
		2: 29,
		3: 31,
		4: 30,
		5: 31,
		6: 30,
		7: 31,
		8: 31,
		9: 30,
		10: 31,
		11: 30,
		12: 31,
	};
	const fecha_hoy = new Date();
	const dia_hoy = fecha_hoy.getDate();
	const mes_hoy = fecha_hoy.getMonth() + 1; // Se suma uno ya que los meses van del 0 al 11.
	const anio_hoy = fecha_hoy.getFullYear();
	if (dia === null || mes === null || anio === null) {
		return false;
	}
	if (!(esEntero(dia) && esEntero(mes) && esEntero(anio))) {
		//Comprobamos que no se haya ingresado un número racional
		return false;
	}
	//Compruebo si el año es bisiesto para ponerle 29 a febrero dado el caso.
	const dias_en_mes = esAnioBisiesto(anio)
		? cant_diasXmes_bisiesto[mes]
		: cant_diasXmes[mes];

	if (!(dia > 0 && dia <= dias_en_mes)) {
		return false;
	}
	if (!(mes > 0 && mes <= 12)) {
		return false;
	}
	if (!(anio >= 1900 && anio <= anio_hoy)) {
		//A menos que una persona de 124 años se quiera registrar o que algúna regla de negocio lo especifique.
		//Tampoco se sabe cual es la edad mínima por lo que se establece a partir de ahora.
		return false;
	}

	if (anio < anio_hoy) {
		//Si el año es menor al actual es válido
		return true;
	} else {
		if (anio === anio_hoy) {
			//Si no, comprobamos que el año sea igual al actual
			if (mes < mes_hoy) {
				//En caso que el año sea igual al actual comprobamos que el mes sea menor al actual.
				return true;
			} else {
				if (mes === mes_hoy) {
					//Si el mes no es menor al actual comprobamos que sea igual.
					if (dia < dia_hoy) {
						//Por ultimo comprobamos si el día es menor al de hoy
						return true;
					} else {
						//Si el dia no es menor al de hoy vemos si es hoy
						if (dia === dia_hoy) {
							return true;
						}
						//En caso de que el día no sea hoy devolvemos false.
						return false;
					}
				}
				//Si el mes no es menor o igual al actual devolvemos false.
				return false;
			}
		}
		//Si el año no es menor o igual al actual devolvemos false (Aunque más arriba ya se comprobo esto.)
		return false;
	}
}

export function es_pais_valido(pais) {
	let pais_existe = paises.some(
		(nombre_pais) => nombre_pais.toLowerCase() === pais.toLowerCase()
	);
	if (pais_existe) {
		return true;
	} else {
		return false;
	}
}
