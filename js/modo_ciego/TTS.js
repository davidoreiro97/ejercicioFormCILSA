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
	// Esperar un breve retraso para asegurar que las voces estén cargadas
	await new Promise((resolve) => setTimeout(resolve, 1000));
	try {
		await speakMessage("Saludos, bienvenido al modo ciego del formulario...");
		const alerta = new Audio("../assets/mp3/sonido_alerta.mp3");
		alerta.play();
	} catch (error) {
		console.error("Error al reproducir el audio:", error);
	}
}
window.speechSynthesis.onvoiceschanged = async () => {
	// Asegurarse de que las voces estén cargadas
	audio_y_alerta_despues();
};
