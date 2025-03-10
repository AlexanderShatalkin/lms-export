export const mainPageTemplate = `
<!DOCTYPE html>
<html lang="en">
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