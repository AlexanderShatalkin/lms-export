export const workVariantTemplate = `
    <div class="work-container">
    <hr>
    {{header}}
    <h1 class="work-header">Вариант: {{title}}</h1>
    <ul class="task-list">
        {{#each tasks}}
        <li>{{{this}}}</li>
        {{/each}}
    </ul>
    </div>
`