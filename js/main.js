import "jquery";
import $ from "jquery";

window.addEventListener("DOMContentLoaded", () => {
  // Навигация
  $(function () {
    function menu(e) {
      e.preventDefault();
      let id = $(this).attr("href"),
        top = $(id).position().top;
      $("body,html").animate({ scrollTop: top }, 1500);
    }
    $("#menu").on("click", "a", menu);
    $("#footer-and-scroll").on("click", "a", menu);
    $("#back").on("click", "a", menu);
    $("#products").on("click", "a", menu);
    $(".post4-div").on("click", "a", menu);
    $(".post5-div").on("click", "a", menu);
  });

  // Смена стрелок
  const link = document.querySelectorAll(".view-more"),
    image = document.querySelectorAll(".double-vector");
  link.forEach((item) => {
    item.onmouseenter = function () {
      image.forEach((item) => {
        item.src = "pictures/double-hover.png";
      });
    };
    item.onmouseleave = function () {
      image.forEach((item) => {
        item.src = "pictures/double.png";
      });
    };
  });

  // Сохранение данных формы в куки
  const email = document.getElementById("emailCookie"),
    button = document.querySelectorAll(".send-email");

  function setCookie(name, value, options = {}) {
    const expires = options.expires;
    if (typeof expires == "number" && expires) {
      let d = new Date();
      d.setTime(d.getTime() + expires * 1000);
      expires = options.expires = d;
    }

    if (expires && expires.toUTCString) {
      options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    const updatedCookie = name + "=" + value;
    for (let propName in options) {
      updatedCookie += "; " + propName;
      let propValue = options[propName];
      if (propValue !== true) {
        updatedCookie += "=" + propValue;
      }
    }

    document.cookie = updatedCookie;
    console.log(document.cookie);
  }

  button.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      setCookie("email", email.value);
    });
  });

  // Таблица
  function cards() {
    // Классы для карточек
    class MenuCard {
      constructor(id, name, symbol, priceUsd, parentSelector, ...classes) {
        this.id = id;
        this.name = name;
        this.symbol = symbol;
        this.priceUsd = priceUsd;
        this.classes = classes; // массив будет
        this.parent = document.querySelector(parentSelector); // DOM елемент лежит теперь тут
      }

      render() {
        const element = document.createElement("tr");
        if (this.classes.length === 0) {
          this.element = "item1";
          element.classList.add(this.element);
        } else {
          this.classes.forEach((className) => element.classList.add(className));
        }

        element.innerHTML = `       
              <td>${this.id}</td>
              <td>${this.name}</td>
              <td>${this.symbol}</td>
              <td>${this.priceUsd}</td>`;
        this.parent.after(element);
      }
    }

    async function getResource(url) {
      let res = await fetch(url);

      if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
      }

      return await res.json();
    }
    getResource("https://api.coincap.io/v2/assets/?limit=10").then((data) => {
      data.data.forEach(({ id, name, symbol, priceUsd }) => {
        new MenuCard(id, name, symbol, priceUsd, ".here").render();
      });
    });
  } // cards

  cards();
});
