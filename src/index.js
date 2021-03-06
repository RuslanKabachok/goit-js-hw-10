import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
  inputEl: document.querySelector('input'),
  listEl: document.querySelector('ul'),
  infoEl: document.querySelector('.country-info'),
};

refs.inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput() {
  const countryName = refs.inputEl.value;

  if (!countryName.trim()) {
    refs.listEl.innerHTML = '';
    return;
  } else {
    fetchCountries(countryName.trim()).then(data => {
      if (data.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        return;
      } else if (data.length > 2 && data.length < 10) {
        renderSmallCard(data);
      } else if (data.length === 1) {
        renderBigCard(data);
      }
    });
  }
}

function renderBigCard(data) {
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
  refs.listEl.innerHTML = markUp;
}

function renderSmallCard(data) {
  const markUp = data
    .map(
      country => `<li>
        <p>${country.name.official}</p>
        <img src="${country.flags.svg}" width="150" height="100"/>
      </li>`,
    )
    .join('');
  refs.listEl.innerHTML = markUp;
}
