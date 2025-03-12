export const workVariantTemplate = `
    <div class="work-container">
    <hr class="work-separator">
    {{header}}
    <h1 class="work-header"><span class="toggle-symbol">▼</span> Вариант: {{title}}</h1>
    <ul class="task-list">
        {{#each tasks}}
        <li>{{{this}}}</li>
        {{/each}}
    </ul>
    </div>
`