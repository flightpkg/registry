const express = require('express')
const axios = require('axios')
const app = new express()
const port = 3000

async function fetchdata(url) {
    const fetch = await axios.get(url)
    const data = fetch.data
    return Promise.resolve(data)
}

app.get('/', (req, res) => {
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    res.redirect(`https://flightpkg.js.org`)
})

app.get('/js', (req, res) => {
    res.setHeader('Content-Type', 'text/json');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    fetchdata('https://registry.yarnpkg.com').then(r => res.send(r))
})

app.get('/js/:pkg', (req, res) => {
    res.setHeader('Content-Type', 'text/json');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    fetchdata(`https://registry.yarnpkg.com/${req.params.pkg}`).then(r => res.send(r))
})

app.get('/js/:name/-/:name-:version.tgz', (req, res) => {
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    res.redirect(`https://registry.yarnpkg.com/${req.params.name}/-/${req.params.name}-${req.params.version}.tgz`)
})

app.listen(port, () => {
  console.log(`Registry started on ${port}`)
})
