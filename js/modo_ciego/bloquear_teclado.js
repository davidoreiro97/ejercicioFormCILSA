let tecladoBloqueado = false;

export const bloquearTeclado = () => {
	tecladoBloqueado = true;
	document.addEventListener("keydown", bloquearEntradasTeclado);
};

export const desbloquearTeclado = () => {
	tecladoBloqueado = false;
	document.removeEventListener("keydown", bloquearEntradasTeclado);
};

const bloquearEntradasTeclado = (e) => {
	if (tecladoBloqueado) {
		e.preventDefault();
		e.stopPropagation();
	}
};
