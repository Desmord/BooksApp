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
      bookRating: `.book__rating`,
      bookRatingFill: `.book__rating__fill`,
    },
    filters: {
      panel: `.filters`
    }
  };

  const templates = {
    book: Handlebars.compile(document.querySelector(select.books.bookTemplate).innerHTML),
  };

  // let favoriteBooks = [];
  // let filters = [];

  // const renderBooks = () => {

  //   dataSource.books.forEach(book => {
  //     const generateHTML = templates.book(book);
  //     const DOMElement = utils.createDOMFromHTML(generateHTML);

  //     const ratingFill = DOMElement.querySelector(select.books.bookRatingFill);
  //     const rating = book.rating;

  //     ratingFill.style.width = `${(rating / 10) * 100}%`;

  //     if (rating < 6) {
  //       ratingFill.style.background = `linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)`;
  //     } else if (rating >= 6 && rating <= 8) {
  //       ratingFill.style.background = `linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)`;
  //     } else if (rating > 8 && rating <= 9) {
  //       ratingFill.style.background = `linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)`;
  //     } else {
  //       ratingFill.style.background = `linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)`;
  //     }

  //     document.querySelector(select.books.booksList).appendChild(DOMElement);
  //   });

  // };


  // const filterBooks = () => {
  //   const books = document.querySelector(select.books.booksList).querySelectorAll(select.books.book);

  //   dataSource.books.forEach(book => {
  //     const bookName = book.name;
  //     let shouldBehidden = false;

  //     filters.forEach(filter => {

  //       if (book.details.adults && filter === `adults`) {
  //         shouldBehidden = true;
  //       }

  //       if (book.details.nonFiction && filter === `nonFiction`) {
  //         shouldBehidden = true;
  //       }

  //     });

  //     books.forEach(bookElement => {
  //       const bookElementName = bookElement.querySelector(select.books.bookName).innerHTML;

  //       if (bookElementName === bookName) {
  //         const bookImageElement = bookElement.querySelector(select.books.bookImage);

  //         if (shouldBehidden) {
  //           bookImageElement.classList.add(`hidden`);
  //         } else {
  //           bookImageElement.classList.remove(`hidden`);
  //         }

  //       }

  //     });

  //   });

  // };


  // const handleBookDblClick = (event) => {
  //   const bookImage = event.target.parentNode.parentNode;
  //   const dataId = bookImage.getAttribute(`data-id`);
  //   const isFavorite = favoriteBooks.some(id => id === dataId ? true : false);

  //   if (isFavorite) {
  //     favoriteBooks = favoriteBooks.filter(id => id !== dataId ? true : false);
  //   } else {
  //     favoriteBooks.push(dataId);
  //   }

  //   bookImage.classList.toggle(`favorite`);

  // };

  // const handleFilterPanelClick = (e) => {
  //   const isInput = e.target.tagName === `INPUT` ? true : false;
  //   const isCheckbox = e.target.type === `checkbox` ? true : false;
  //   const isFilter = e.target.name === `filter` ? true : false;

  //   if (isInput && isCheckbox && isFilter) {
  //     const isChecked = e.target.checked;

  //     if (isChecked) {
  //       filters.push(e.target.value);
  //     } else {
  //       filters = filters.filter(filter => filter === e.target.value ? false : true);
  //     }

  //     filterBooks();

  //   }

  // };

  // const initActions = () => {
  //   const booksList = document.querySelector(select.books.booksList);
  //   const filtersPanel = document.querySelector(select.filters.panel);

  //   booksList.addEventListener(`dblclick`, (event) => {

  //     if (event.target.parentNode.parentNode.classList.contains(`book__image`)) {
  //       handleBookDblClick(event);
  //     }

  //   });

  //   filtersPanel.addEventListener(`click`, handleFilterPanelClick);



  // };


  // renderBooks();
  // initActions();


  class BookList {
    constructor() {
      this.favoriteBooks = [];
      this.filters = [];

      this.renderBooks();
      this.getElements();
      this.initActions();

    }


    renderBooks() {

      dataSource.books.forEach(book => {
        const generateHTML = templates.book(book);
        const DOMElement = utils.createDOMFromHTML(generateHTML);

        const ratingFill = DOMElement.querySelector(select.books.bookRatingFill);
        const rating = book.rating;

        ratingFill.style.width = `${(rating / 10) * 100}%`;

        if (rating < 6) {
          ratingFill.style.background = `linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)`;
        } else if (rating >= 6 && rating <= 8) {
          ratingFill.style.background = `linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)`;
        } else if (rating > 8 && rating <= 9) {
          ratingFill.style.background = `linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)`;
        } else {
          ratingFill.style.background = `linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)`;
        }

        document.querySelector(select.books.booksList).appendChild(DOMElement);
      });

    }


    getElements() {
      this.books = document.querySelector(select.books.booksList).querySelectorAll(select.books.book);
      this.booksList = document.querySelector(select.books.booksList);
      this.filtersPanel = document.querySelector(select.filters.panel);
    }


    filterBooks() {
      const thisBookList = this;

      dataSource.books.forEach(book => {
        const bookName = book.name;
        let shouldBehidden = false;

        thisBookList.filters.forEach(filter => {

          if (book.details.adults && filter === `adults`) {
            shouldBehidden = true;
          }

          if (book.details.nonFiction && filter === `nonFiction`) {
            shouldBehidden = true;
          }

        });

        thisBookList.books.forEach(bookElement => {
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

    }


    handleBookDblClick(event) {
      const thisBookList = this;
      const bookImage = event.target.parentNode.parentNode;
      const dataId = bookImage.getAttribute(`data-id`);
      const isFavorite = thisBookList.favoriteBooks.some(id => id === dataId ? true : false);

      if (isFavorite) {
        thisBookList.favoriteBooks = thisBookList.favoriteBooks.filter(id => id !== dataId ? true : false);
      } else {
        thisBookList.favoriteBooks.push(dataId);
      }

      bookImage.classList.toggle(`favorite`);

    }


    handleFilterPanelClick(e) {
      const thisBookList = this;
      const isInput = e.target.tagName === `INPUT` ? true : false;
      const isCheckbox = e.target.type === `checkbox` ? true : false;
      const isFilter = e.target.name === `filter` ? true : false;

      if (isInput && isCheckbox && isFilter) {
        const isChecked = e.target.checked;

        if (isChecked) {
          thisBookList.filters.push(e.target.value);
        } else {
          thisBookList.filters = thisBookList.filters.filter(filter => filter === e.target.value ? false : true);
        }

        thisBookList.filterBooks();

      }

    }


    initActions() {
      const thisBooksList = this;

      thisBooksList.booksList.addEventListener(`dblclick`, (event) => {

        if (event.target.parentNode.parentNode.classList.contains(`book__image`)) {
          thisBooksList.handleBookDblClick(event);
        }

      });

      thisBooksList.filtersPanel.addEventListener(`click`, (e) => thisBooksList.handleFilterPanelClick.call(thisBooksList, e));

    }


  }

  const app = new BookList();
  console.log(app);
}

