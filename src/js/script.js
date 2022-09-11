/* global Handlebars, utils */
{
  'use strict';

  const select = {
    books: {
      booksList: '.books-list',
      bookTemplate: '#template-book',
      book: '.book',
      bookImage: `.book__image`,
      bookName: `.book__name`,
    },
    filters: {
      panel: `.filters`
    }
  };

  const templates = {
    book: Handlebars.compile(document.querySelector(select.books.bookTemplate).innerHTML),
  };

  let favoriteBooks = [];
  let filters = [];

  const renderBooks = () => {

    dataSource.books.forEach(book => {
      const generateHTML = templates.book(book);
      const DOMElement = utils.createDOMFromHTML(generateHTML);

      document.querySelector(select.books.booksList).appendChild(DOMElement);
    });

  };


  const handleBookDblClick = (event) => {
    const bookImage = event.target.parentNode.parentNode;
    const dataId = bookImage.getAttribute(`data-id`);
    const isFavorite = favoriteBooks.some(id => id === dataId ? true : false);

    if (isFavorite) {
      favoriteBooks = favoriteBooks.filter(id => id !== dataId ? true : false);
    } else {
      favoriteBooks.push(dataId);
    }

    bookImage.classList.toggle(`favorite`);

  };


  const filterBooks = () => {
    const books = document.querySelector(select.books.booksList).querySelectorAll(select.books.book);

    dataSource.books.forEach(book => {
      const bookName = book.name;
      let shouldBehidden = false;

      filters.forEach(filter => {

        if (book.details.adults && filter === `adults`) {
          shouldBehidden = true;
        }

        if (book.details.nonFiction && filter === `nonFiction`) {
          shouldBehidden = true;
        }

      });

      books.forEach(bookElement => {
        const bookElementName = bookElement.querySelector(select.books.bookName).innerHTML;

        if (bookElementName === bookName) {
          const bookImageElement = bookElement.querySelector(select.books.bookImage);

          if (shouldBehidden) {
            bookImageElement.classList.add(`hidden`);
          } else {
            bookImageElement.classList.remove(`hidden`);
          }

        }

      });

    });

  };

  const handleFilterPanelClick = (e) => {
    const isInput = e.target.tagName === `INPUT` ? true : false;
    const isCheckbox = e.target.type === `checkbox` ? true : false;
    const isFilter = e.target.name === `filter` ? true : false;

    if (isInput && isCheckbox && isFilter) {
      const isChecked = e.target.checked;

      if (isChecked) {
        filters.push(e.target.value);
      } else {
        filters = filters.filter(filter => filter === e.target.value ? false : true);
      }

      filterBooks();

    }

  };

  const initActions = () => {
    const booksList = document.querySelector(select.books.booksList);
    const filtersPanel = document.querySelector(select.filters.panel);

    booksList.addEventListener(`dblclick`, (event) => {

      if (event.target.parentNode.parentNode.classList.contains(`book__image`)) {
        handleBookDblClick(event);
      }

    });

    filtersPanel.addEventListener(`click`, handleFilterPanelClick);



  };


  renderBooks();
  initActions();
}

