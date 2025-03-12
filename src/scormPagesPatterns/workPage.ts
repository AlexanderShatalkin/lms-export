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


    <script>
        const workHeaders = document.querySelectorAll('.work-header');

        workHeaders.forEach(header => {
            const toggleSymbol = header.querySelector('.toggle-symbol');
            const taskList = header.nextElementSibling; // Получаем соседний элемент .task-list

            // Обработчик клика
            header.addEventListener('click', () => {
                // Переключаем видимость списка заданий
                if (taskList.style.display === 'none') {
                    taskList.style.display = 'block';
                    toggleSymbol.textContent = '▼'; 
                } else {
                    taskList.style.display = 'none';
                    toggleSymbol.textContent = '▶'; 
                }
            });
        });
    </script>

</body>
</html>
`