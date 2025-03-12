export const workPageTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{{title}}</title>
        <script type="text/javascript" async
        src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
    <script type="text/javascript" async
        id="MathJax-script" src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">
    </script>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <a href="./index.html" id="return-link">return</a>
    <h1>{{title}}</h1>
    {{{workVariantsHtml}}}

</body>
</html>
`