import IMask from 'imask';

let element = document.querySelector('.date');
let dateMask = IMask(element, {
  mask: Date,
});

