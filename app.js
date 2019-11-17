const rootEl = document.getElementById('root');
let nextId = 1;
const posts = [];
const formEl = document.createElement('form');
formEl.className = 'form-inline';

formEl.innerHTML = `
<input type="text" class="form-control mb-2 mr-sm-2" data-id="url">
<select class="form-control mb-2 mr-sm-2" data-id="name">
    <option value="img">Картинка</option>
    <option value="video">Видео</option>
    <option value="audio">Аудио</option>
    <option value="regular">Обычный</option>
</select>
<button class="btn btn-info mb-2" data-action="add">Добавить пост</button>
`;
const urlEl = formEl.querySelector('[data-id=url]');
const nameEl = formEl.querySelector('[data-id=name]');

formEl.addEventListener('submit', (event) => {
    event.preventDefault();
    const url = urlEl.value;
    const name = nameEl.value;
    const post = {
        id: nextId++,
        url,
        name,
        likes: 0,
    };
    posts.push(post);
    posts.sort((a, b) => { return a.likes - b.likes });
    urlEl.value = '';
    nameEl.value = '';
    urlEl.focus();
    rebuildList(postsEl, posts);
});
rootEl.appendChild(formEl);

const postsEl = document.createElement('ul');
postsEl.className = 'list-group';
rootEl.appendChild(postsEl);

function rebuildList(containerEl, items) {
    for (const child of Array.from(containerEl.children)) {
        containerEl.removeChild(child);
    }
    for (const item of items) {
        const el = document.createElement('li');
        el.className = 'list-group-item';
        el.dataset.id = `post-${item.id}`;
        if (item.name === 'img') {
            el.innerHTML = `
                <img src="${item.url}" class="card">
                ${item.name}
                <span class="badge badge-warning">likes: ${item.likes}</span>
                <button type="button" class="btn btn-success btn-sm" data-action="like">like</button>
                <button type="button" class="btn btn-danger btn-sm" data-action="dislike">dislike</button>    
            `;
        } else if (item.name === 'audio') {
            el.innerHTML = `
                <audio src="${item.url}" controls="controls" class="card"></audio>
                ${item.name}
                <span class="badge badge-warning">likes: ${item.likes}</span>
                <button type="button" class="btn btn-success btn-sm" data-action="like">like</button>
                <button type="button" class="btn btn-danger btn-sm" data-action="dislike">dislike</button>    
            `;
        } else if (item.name === 'video') {
            el.innerHTML = `
                <video src="${item.url}" controls="controls" class="card"></video>
                ${item.name}
                <span class="badge badge-warning">likes: ${item.likes}</span>
                <button type="button" class="btn btn-success btn-sm" data-action="like">like</button>
                <button type="button" class="btn btn-danger btn-sm" data-action="dislike">dislike</button>    
            `;
        } else if (item.name === 'regular') {
            el.innerHTML = `
                ${item.name}
                <span class="badge badge-warning">likes: ${item.likes}</span>
                <button type="button" class="btn btn-success btn-sm" data-action="like">like</button>
                <button type="button" class="btn btn-danger btn-sm" data-action="dislike">dislike</button>    
            `;
        } else {
            console.log('Ошибочное имя');
            continue;
        }
        el.querySelector('[data-action=like]').addEventListener('click', (event) => {
            item.likes++;
            items.sort((a, b) => {
                return a.likes - b.likes;
            });
            rebuildList(containerEl, items);
        });
        el.querySelector('[data-action=dislike]').addEventListener('click', (event) => {
            item.likes--;
            items.sort((a, b) => {
                return a.likes - b.likes;
            });
            rebuildList(containerEl, items);
        });
        containerEl.insertBefore(el, containerEl.firstElementChild);
    }
}