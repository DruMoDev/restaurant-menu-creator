function convertDate(fechaISO: string) {
  // Crear un objeto Date a partir de la cadena de fecha ISO
  const fecha = new Date(fechaISO);

  // Opciones de formato para la fecha y hora en español
  const opcionesFecha: {} = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  const opcionesHora: {} = { hour: "2-digit", minute: "2-digit" };

  // Formatear la fecha y la hora por separado
  const fechaFormateada = new Intl.DateTimeFormat(
    "es-ES",
    opcionesFecha
  ).format(fecha);
//   const horaFormateada = new Intl.DateTimeFormat("es-ES", opcionesHora).format(
//     fecha
//   );

  // Combinar la fecha y la hora formateadas
  return `${fechaFormateada}`;
}

// Ejemplo de uso
// const fechaISO = "2024-07-11T09:02:57.710939+00:00";
// const fechaEspañola = convertDate(fechaISO);
// console.log(fechaEspañola); // Salida: "11/07/2024 09:02"

export default convertDate;