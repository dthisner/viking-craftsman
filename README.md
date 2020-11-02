# Viking-Craftsman

This is to make it easier for people to order in beer. You will get a list of what is avaliable at the different location and you can upvote or remove your vote from the different booze.

The goal is to be able to import JSON or CSV or a direct API call to import Booze data and then people can vote for their favoite drink to bb rought into the office.

## Script

`npm run fe` - starts the FrontEnd on port 3000
`npm run be` - starts the BackEnd on port 8080
`npm run install` - installs all dependencies for FE and BE at THE SAME TIME! I know, it is magic!

Run both FE and BE, then you can view the site at: `http://localhost:3000/`

## Tech

It is a repo with the FE and the BE in the same repo.

### Backend

Using `Golang` and using `Air` to autimatically rebuild when changes has happen.

### Frontend

Using lovley `react`.
Basing most stuff on: [React Semantic UI](https://react.semantic-ui.com/collections/form/#types-form)

### DB

We are using MongoDB, free services that can hold 512mb at MongoDB Atlas.
