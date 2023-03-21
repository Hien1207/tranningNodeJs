const fs = require("fs");
const superarent = require("superagent");

fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
    console.log(`Breed : ${data}`);

    superarent
        .get(`https://dog.ceo/api/breed/${data}/images/random`)
        .then(res => {
            console.log(res.body.message);

            fs.writeFile('dog-img.txt', res.body.message, err => {
                console.log('random img');
            });
        })
        .catch(err => {
            console.log(err.message);
        })

})