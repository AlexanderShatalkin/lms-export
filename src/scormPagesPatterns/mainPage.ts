export const mainPageTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{{title}}</title>
</head>

<body>
    <h1>{{title}}</h1>
    <ul>
        {{#each works}}
        <li><a href="{{this.url}}">{{this.title}}</a></li>
        {{/each}}
    </ul>
</body>
</html>
`