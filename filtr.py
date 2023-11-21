# Открываем файл для чтения в бинарном режиме
with open('my_logs.txt', 'rb') as file:
    lines = file.readlines()  # Читаем все строки из файла

filtered_lines = []  # Создаем пустой список для отфильтрованных строк

# Проходим по каждой строке из исходного файла
for line in lines:
    try:
        decoded_line = line.decode('utf-8')  # Декодируем строку из бинарных данных в строку Unicode
        # Проверяем, равен ли 32-й символ 'E'
        if len(decoded_line) > 32 and decoded_line[31] == 'E':
            # Если 32-й символ - 'E', добавляем строку в список отфильтрованных строк
            filtered_lines.append(line)
    except UnicodeDecodeError:
        # Пропускаем строки, которые нельзя декодировать в utf-8
        pass

# Создаем новый файл для записи отфильтрованных строк
with open('filtered_log.txt', 'wb') as new_file:
    # Записываем отфильтрованные строки в новый файл
    new_file.writelines(filtered_lines)
