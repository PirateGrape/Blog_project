const newPost = document.querySelector('.inputPost'), //Достаем ввод текста
    blog = document.querySelector('.blog'), //Достаем тело блога
    clearBlog = document.querySelector('.clear'), //Достаем кнопку для очистки блога
    newName = document.querySelector('.inName'), //Достаем ввод имени
    form = document.querySelector('.blank'); 

function hideBlog() { //Функция для скрытия блога, если в нем ничего нет, кроме кнопки "Забыть"
    if (blog.childElementCount == 1) {
        blog.classList.add('show');
    }
}

function showBlog() { //Функция для показа блога, если в нем что-то есть
    if (blog.childElementCount > 0) {
        blog.classList.remove('show');
    }
}

function serverPosting(form) {//Функция для отправки нового поста на сервер
    const newPost = new FormData(form);
    fetch('server.php', {
        method: 'POST',
        body: newPost,
    }).catch(() => {
        alert('Что-то пошло не так...');
    });
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

    render() { //Метод для публикации нового поста на страницу
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
            form.reset(); //Очистка полей ввода для нового поста
        } else {
            alert('Не бывает безымянных авторов и не бывает пустых историй...'); //Защита от дурака
        }
    }
}

form.addEventListener('submit', (e) => { //Активируем публикацию и также отправку на сервер
    e.preventDefault();

    serverPosting(form);
    
    new NewPost(
            newName.value,
            newPost.value)
        .render(); //При помощи шаблона кадждый раз создаем новый пост и публикуем
    

    let closeBtns = document.querySelectorAll('.close'); //Активация кнопки удаление поста
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