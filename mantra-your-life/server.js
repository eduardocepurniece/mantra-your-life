const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();

const PORT = 3000;

require('dotenv').config()


let dbConnectionStr = process.env.DB_STRING;


MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database');
    const db = client.db('your-mantra');
    const quotesCollection = db.collection('user1');

    app.set('viwe engine', 'ejs');
    app.use(bodyParser.urlencoded({ extended: true}));
    app.use(bodyParser.json());
    app.use(express.static('public'));

    app.get('/', (req, res) =>  {
        //res.sendFile(__dirname + '/index.html');

        quotesCollection
            .find({ status: 'displaying'})
            .toArray()
            .then(results => {
                const today = new Date().getDate()
                console.log(results.length)
                if(results.length > 0){
                    if(Number(results[0].date) == today){
                        res.render('index.ejs', { quotes: results[0] })
                    }else{
                        quotesCollection.findOneAndUpdate({ status: 'displaying'}, { $set: { status: 'seen', date: '0' }})
                        quotesCollection.find({ status: 'unseen'}).toArray().then(secondResult => {
                            if(secondResult.length <= 1){
                                quotesCollection.updateMany({ },
                                    { $set: { status: 'unseen'}}
                                )
                            }
                            let random = Math.floor(Math.random() * (secondResult.length))
                            console.log(random)
                            res.render('index.ejs', { quotes: secondResult[random] })
            
                            quotesCollection.findOneAndUpdate({ quote: secondResult[random].quote}, { $set: { status: 'displaying', date: `${today}`}});
                        }).catch(error => console.error(error));
                    }   
                }else {
                    quotesCollection.find({ status: 'unseen'}).toArray().then(secondResult => {
                        if(secondResult.length <= 1){
                            quotesCollection.updateMany({ },
                                { $set: { status: 'unseen'}}
                            )
                        }
                        let random = Math.floor(Math.random() * (secondResult.length))
                        console.log(random)
                        res.render('index.ejs', { quotes: secondResult[random] })
        
                        quotesCollection.findOneAndUpdate({ quote: secondResult[random].quote}, { $set: { status: 'displaying', date: `${today}`}});
                    }).catch(error => console.error(error));
                }
            })
            .catch(error => console.error(error));

    });

    app.get('/mantras', (req, res) =>  {
        //res.sendFile(__dirname + '/index.html');

        quotesCollection
            .find()
            .toArray()
            .then(results => {
                res.render('mantras.ejs', { quotes: results })
            })
            .catch(error => console.error(error));

    });

    app.post('/quotes', (req, res) => {
        quotesCollection
            .insertOne(req.body)
            .then(result => {
                console.log(req.body)
                res.redirect('/mantras')
            })
            .catch(error => console.error(error))
    });

    app.put('/quotes', (req, res) => {
        quotesCollection
            .findOneAndUpdate(
                { name: 'Gandhi' },
                {
                    $set: {
                        name: req.body.name,
                        quote: req.body.quote,
                        status: 'unseen',
                    },
                },
                {
                    upsert: true,
                  }
            )
            .then(result => {
                res.json('Success');
            })
            .catch(error => console.error(error))
    })

    app.delete('/quotes', (req, res) =>{
        quotesCollection.deleteOne({ quote: req.body.quote})
        .then(result => {
            if (result.deletedCount === 0) {
              return res.json('No quote to delete')
            }
            res.json(`Deleted Darth Vader's quote`)
        }).catch(error => console.error(error));
    })

    app.listen(process.env.PORT || PORT ,function(){
        console.log('listening on 3000')
    });
})
.catch(error => console.error(error))



