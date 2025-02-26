export const workPageTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{{title}}</title>
</head>

<body>
    <h1>{{title}}</h1>
    <ul>
        {{#each tasks}}
        <li>{{{this.html}}}</li>
        {{/each}}
    </ul>
</body>
</html>
`