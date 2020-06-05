const continentSelect = document.getElementById('continent-select')
const countryList = document.getElementById('countries-list')


fetch('https://countries.trevorblades.com/', {
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