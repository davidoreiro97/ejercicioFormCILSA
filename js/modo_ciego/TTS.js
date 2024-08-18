function speakMessage(message) {
	return new Promise((resolve) => {
		const utterance = new SpeechSynthesisUtterance(message);
		utterance.rate = 1; // Velocidad de la voz
		utterance.pitch = 1; // Tono de la voz
		const voices = window.speechSynthesis.getVoices();
		//voices.forEach((voz) => console.log(`${voz.name} - ${voz.lang}`));
		let voz = voices.find(
			(voz) => voz.lang === "es-ES" || voz.lang === "es-MX"
		);

		if (voz) {
			utterance.voice = voz;
		} else {
			console.warn("No se encontró una voz en español.");
		}

		window.speechSynthesis.speak(utterance);
		//Resuelvo la promesa al finalizar la reproducción del mensaje
		utterance.onend = () => {
			resolve();
		};
	});
}

async function audio_y_alerta_despues() {
	await speakMessage(
		"Saludos, bienvenido al modo ciego del formulario. A continuación se te pedira rellenar datos y se te guiará completamente en el proceso. Cuando esto termine escucharas una alerta."
	);
	const alerta = new Audio("../assets/mp3/sonido_alerta.mp3");
	alerta.play();
}

window.speechSynthesis.onvoiceschanged = async () => {
	// Asegurarse de que las voces estén cargadas
	audio_y_alerta_despues();
};
