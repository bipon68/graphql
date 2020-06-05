const continentSelect = document.getElementById('continent-select')
const countryList = document.getElementById('countries-list')


/*fetch('https://countries.trevorblades.com/', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        query: `
        query{
            continents{
              name,
              code
            }
          }
        `
    })
})
.then(res => res.json())
.then(data => {
    console.log(data.data.continents)
    data.data.continents.forEach(continent => {
        const option = document.createElement('option')
        option.value = continent.code
        option.innerText = continent.name
        continentSelect.appendChild(option)
    })
})
*/

queryFetch(`
  query {
    continents {
      name
      code
    }
  }
`).then(data => {
    console.log(data.data.continents)
  data.data.continents.forEach(continent => {
    const option = document.createElement('option')
    option.value = continent.code
    option.innerText = continent.name
    continentSelect.append(option)
  })
})


continentSelect.addEventListener('change', async e => {

    const continentCode = e.target.value
    const countries = await getContinentCountries(continentCode)
    console.log(countries)
    countryList.innerHTML = ''
    countries.forEach(country => {
      const element = document.createElement('div')
      element.innerText = country.name
      countryList.append(element)
    })
})

function getContinentCountries(continentCode) {

    return queryFetch(`
        query getCountries($code: String) {
            continent(code: $code) {
            countries {
                name
            }
            }
        }
    `, {code: continentCode}).then(data => {
        console.log(data)
        return data.data.continent.countries
    })
}



function queryFetch(query, variables) {
  return fetch('https://countries.trevorblades.com/', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: query,
      variables: variables
    })
  }).then(res => res.json())
}



/**
 * continent query
 */

// query {
//     continents {
//       name
//       code
//     }
//   }


/**
 * country qurry
 */

// query{
//     continent(code:"AF"){
//       countries{
//         name
//       }
//     }
//   }

/**
 * dynamic code
 */

// query{
//     getCountries($code: Strign){
//       continent(code:$code){
//         countries{
//         name
//       }
//       }
//     }
//   }

// {code:"AF"}