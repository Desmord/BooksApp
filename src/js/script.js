/* global Handlebars, utils */
{
    'use strict'

    const select = {
        books: {
            booksList: '.books-list',
            bookTemplate: '#template-book',
            book: '.book',
            bookImage: `.book__image`,
        },
    }

    const templates = {
        book: Handlebars.compile(document.querySelector(select.books.bookTemplate).innerHTML),
    }

    let favoriteBooks = [];

    const renderBooks = () => {

        dataSource.books.forEach(book => {
            const generateHTML = templates.book(book);
            const DOMElement = utils.createDOMFromHTML(generateHTML);

            document.querySelector(select.books.booksList).appendChild(DOMElement);
        });

    };


    const bookDblClickFunction = (event) => {
        const bookImage = event.target.parentNode.parentNode;
        const dataId = bookImage.getAttribute(`data-id`);
        const isFavorite = favoriteBooks.some(id => id === dataId ? true : false);

        if (isFavorite) {
            favoriteBooks = favoriteBooks.filter(id => id !== dataId ? true : false);
        } else {
            favoriteBooks.push(dataId);
        }

        bookImage.classList.toggle(`favorite`);

    }

    const initActions = () => {

        document.querySelector(select.books.booksList).addEventListener(`dblclick`, (event) => {

            if (event.target.parentNode.parentNode.classList.contains(`book__image`)) {
                bookDblClickFunction(event);
            };

        })

    }


    renderBooks();
    initActions();
}

