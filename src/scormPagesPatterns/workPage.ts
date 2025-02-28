export const workPageTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{{title}}</title>
</head>

<body>
    <a>return</a>
    <h1>{{title}}</h1>
    <ul>
        {{#each tasks}}
        <li>{{{this}}}</li>
        {{/each}}
    </ul>
    <a href="./index.html">return</a>
</body>
</html>
`