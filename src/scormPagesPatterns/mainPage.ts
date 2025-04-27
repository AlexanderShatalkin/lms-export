export const mainPageTemplate = `
<!DOCTYPE html>
<html lang="en">
<style>
/* Общие стили для страницы */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background-color: #f9f9f9;
    color: #333;
}

/* Секция */
.section {
    margin-bottom: 40px;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Заголовок секции */
.section-header {
    font-size: 24px;
    margin-bottom: 15px;
    color: #2c3e50;
}

/* Список работ */
.work-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

/* Отдельный элемент списка */
.work-item {
    margin-bottom: 10px;
}

/* Ссылка на работу */
.work-item a {
    text-decoration: none;
    color: #3498db;
    font-size: 18px;
    transition: color 0.3s;
}

/* Ховер-состояние для ссылки */
.work-item a:hover {
    color: #1abc9c;
}

</style>
<head>
    <meta charset="UTF-8">
    <title>{{title}}</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    {{#each section}}
    <div class = "section">
    <h1 class = "section-header">{{this.workType}}</h1>
    <ul class = "work-list">
        {{#each this.works}}
        <li class = "work-item"><a href="{{this.id}}.html">{{this.name}}</a></li>
        {{/each}}
    </ul>
    </div>
    {{/each}}

</body>
</html>
`