const newPost = document.querySelector('.inputPost'), //Достаем ввод текста
    pubBtn = document.querySelector('.tell'), //Достаем кнопку публикации
    blog = document.querySelector('.blog'), //Достаем тело блога
    clearBlog = document.querySelector('.clear'), //Достаем кнопку для очистки блога
    newName = document.querySelector('.inName'); //Достаем ввод имени

function hideBlog() { //Функция для скрытия блога, если в нем ничего нет
    if (blog.childElementCount == 1) {
        blog.classList.add('show');
    }
}

function showBlog() { //Функция для показа блога, если в нем что-то есть
    if (blog.childElementCount == 1) {
        blog.classList.remove('show');
    }
}


class NewPost { //Создаем шаблон для каждого поста
    constructor(name, mes) {
        this.name = name;
        this.mes = mes;
        this.nameShortening(); //Обрезаем длинные имена
    }

    nameShortening() {
        if (this.name.length > 15) { //Обрезаем имя, если слишком большое
            this.name = `${this.name.substring(0, 15)}...`;
        }
    }

    render() { //Метод для публикации нового поста 
        if (this.name != '' && this.mes != '') { //Защита от дурака
            let newMes = document.createElement('div'); //Создание нового поста
            showBlog(); //Открываем тело блога
            newMes.classList.add('draft');
            newMes.innerHTML = `
                <div class="name">
                    ${this.name} говорит:
                </div>
                <button class="close">X</button>
                <div class="text">
                    ${this.mes}
                </div>`;
            blog.append(newMes); //Публикация нового поста
            newName.value = ''; //Очистка полей ввода для нового поста
            newPost.value = '';
        } else {
            alert('Не бывает безымянных авторов и не бывает пустых историй...'); //Защита от дурака
        }
    }
}

pubBtn.addEventListener('click', (e) => { //Активируем кнопку публикации
    e.preventDefault();
    new NewPost(
            newName.value,
            newPost.value)
        .render(); //При помощи шаблона кадждый раз создаем новый пост и публикуем

    let closeBtns = document.querySelectorAll('.close'); //Удаление поста
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.parentElement.remove();
            hideBlog();
        });
    });
});

clearBlog.addEventListener('click', (e) => { //Очистка блога
    e.preventDefault();
    let postsToDelete = document.querySelectorAll('.draft');
    postsToDelete.forEach(post => {
        post.remove();
    });
    hideBlog();
});