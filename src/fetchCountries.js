// function fetchCountries() {
//   const BASE_URL = 'https://restcountries.com/v3.1/name/';

//   fetch(`${BASE_URL}${refs.inputEl.value}?fields=name,capital,population,flags,languages`)
//     .then(response => response.json())
//     .then(data => {
//       if (refs.inputEl.value) {
//         console.log(data);
//         const markUp = data
//           .map(
//             country => `<li>
//         <p>${country.name.official}</p>
//         <p>${country.capital}</p>
//         <p>${country.population}</p>
//         <p>${Object.keys(country.languages)}</p>
//         <img src="${country.flags.svg}" width="500" height="300"/>
//       </li>`,
//           )
//           .join('');
//         refs.listEl.innerHTML = markUp;
//       } else {
//         refs.listEl.innerHTML = '';
//       }
//     });
// }