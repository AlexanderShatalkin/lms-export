# Выпускная квалификационная работа "Разработка модуля экспорта данных для системы оценки и контроля заданий Lmsdot"

Государственный университет "Дубна". Образовательное направление: 09.03.04 Программная инженерия  
Автор: Шаталкин Александр Максимович, 4252  
Руководитель: доцент Дедовеч Татьяна Григорьевна

## Краткое описание проекта
Проект представляет собой модуль для экспорта данных из системы Lmsdot  
Экспорт производится в двух форматах: docx, scorm.
Производиться экспорт заданий и ответов студентов на них

## Технологический стек проекта
Языки: JavaScript, TypeScript  
Фреймворк: Elysia  
База данных: PostgreSQL  
ORM: Prisma

## Структура репозитория

```bash
src/ # Исходный код приложения
├── scormGenerator/ # Классы посвященные генерации Scorm
│ ├── htmlMapper/ # Компоненты для генерации HTML-элементов
│ │ ├── blockquoteCreator.ts
│ │ ├── headerCreator.ts
│ │ ├── hrCreator.ts
│ │ ├── htmlCreator.ts
│ │ ├── imgCreator.ts
│ │ ├── listManager.ts
│ │ ├── mathCreator.ts
│ │ ├── paintCreator.ts
│ │ ├── pCreator.ts
│ │ └── tableCreator.ts
│ ├── mainPageGenerator.ts # Генератор главной страницы
│ ├── PageGenerator.ts # интерфейс, который реализуют генераторы страниц
│ ├── scormGenerator.ts # Основной SCORM-генератор
│ └── workPageGenerator.ts # Генератор страниц для работ
│
├── scormPagesPatterns/ # Шаблоны SCORM-страниц
│ ├── mainPage.ts
│ ├── workPage.ts
│ └── workVariantPage.ts
│
├── static/ # Статические ресурсы для Scorm (CSS, JS)
│ ├── default.css
│ └── script.js
│
├── docParts.ts # маппер создающий элементы docx 
├── imageGeneration.ts # модуль генерирующий изображения 
├── index.ts # тестовые end points
├── interfaces.ts # Интерфейсы для элементов заданий
├── processArray.ts # Обработка массивов данных перед генерацией
├── styles.ts # Стили для docx
└── utils.ts # Тестовые функции для генерации docx
```

## Установка
1. Клонируйте репозиторий

```bash
git clone https://vcs.uni-dubna.ru/ShAM.21/2025-ShatalkinAlexander-LmsdotExportModule.git
```

2. Установите зависимости и запустите
```bash
bun create elysia ./elysia-example
bun run dev
```
Сервер будет открыт на http://localhost:3000/

## Лицензия, коммерческая тайна, права третьих лиц
Данный модуль был внедрен в систему Lmsdot
В данном репозитории находится код отвечающий за процесс генерации объектов.
Вместо кода взаимодействующего непосредственно с системой реализованы заглушки в файлай index.ts, utils.ts

## Контакты
ФИО: Шаталкин Александр Максимович
email: shatalkin.am@gmail.com
