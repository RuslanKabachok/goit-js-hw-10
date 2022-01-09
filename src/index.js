import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
// import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
  inputEl: document.querySelector('input'),
  listEl: document.querySelector('ul'),
  infoEl: document.querySelector('.country-info'),
};

refs.inputEl.addEventListener('input', debounce(fetchCountries, 300));

function fetchCountries(e) {
  const BASE_URL = 'https://restcountries.com/v3.1/name/';

  fetch(`${BASE_URL}${e.target.value}?fields=name,capital,population,flags,languages`)
    .then(response => {
      if (!response.ok) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      }
      return response.json();
    })
    .then(data => {
      if (data.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        return;
      } else if (data.length > 2 && data.length < 10) {
        const markUp = data
          .map(
            country => `<li>
        <p>${country.name.official}</p>
        <img src="${country.flags.svg}" width="150" height="100"/>
      </li>`,
          )
          .join('');
        refs.listEl.innerHTML = markUp.trim();
      } else if (data.length === 1) {
        console.log(data);
        const markUp = data
          .map(
            country => `<li>
          <p>${country.name.official}</p>
          <p>${country.capital}</p>
          <p>${country.population}</p>
          <p>${Object.keys(country.languages)}</p>
          <img src="${country.flags.svg}" width="500" height="300"/>
        </li>`,
          )
          .join('');
        refs.listEl.innerHTML = markUp.trim();
      } else if (!refs.inputEl.value) {
        refs.listEl.innerHTML = '';
      }
    })
    .catch(error => {
      console.log(error);
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}
