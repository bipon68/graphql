const continentSelect = document.getElementById('continent-select')
const countryList = document.getElementById('countries-list')


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

function queryFetch(query) {
    return fetch('https://countries.trevorblades.com/', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: query
      })
    }).then(res => res.json())
  }


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