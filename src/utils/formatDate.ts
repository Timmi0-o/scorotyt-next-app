/**
 * Форматирует объект Date в строку с датой и временем.
 * Дата отображается в формате "день месяц год", время — "часы:минуты".
 *
 * @param {Date} dateObject - Объект Date, который нужно отформатировать.
 * @returns {string} - Отформатированная строка с датой и временем.
 *
 * @example
 * const formattedDate = FormatDate(new Date());
 * console.log(formattedDate); // Пример вывода: "13 мая 2025 14:30"
 */

export const FormatDate = (dateObject: Date) => {
	const datePart = dateObject.toLocaleDateString('ru-RU', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	})
	const timePart = dateObject.toLocaleTimeString('ru-RU', {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
	})

	const capitalizedDate = datePart.charAt(0).toUpperCase() + datePart.slice(1)

	return `${capitalizedDate} ${timePart}`
}
