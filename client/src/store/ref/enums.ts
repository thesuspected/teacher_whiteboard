// Тематики досок
export const boardThemes: Record<number, { name: string; icon: string }> = {
    0: { name: 'Обучение', icon: 'mdi-school' },
    1: { name: 'Презентация', icon: 'mdi-presentation' },
    2: { name: 'Рисование', icon: 'mdi-draw' },
}
export const boardThemes2: Record<number, { name: string; icon: string }> = {
    0: { name: 'Обучения', icon: 'mdi-school' },
    1: { name: 'Презентаций', icon: 'mdi-presentation' },
    2: { name: 'Рисования', icon: 'mdi-draw' },
}

// Цвета для пользователя
export const colors: Array<Array<string>> = [
    ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3'],
    ['#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39'],
    ['#FDD835', '#FFC107', '#FF9800', '#FF5722', '#795548', '#607D8B'],
]
