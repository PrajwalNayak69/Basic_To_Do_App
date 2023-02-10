const express = require('express')
const fs = require('fs')

const app = express()


app.get('/', (req, res) => {
    fs.readFile('/Users/prajwal/Ng-Next Things/node-course/TO-DO/To-DO.json' ,  'utf8', function (err, data )
{
    if(err)
    {
       res.send('error')
    }
    else{
        const file = JSON.parse(data)
        res.send(file.array)

    }
})
})

app.get('/add' , (req, res) => {
    if(!req.query.id && !req.query.name ){
        res.send('enter the details!!')
    }    
    fs.readFile('/Users/prajwal/Ng-Next Things/node-course/TO-DO/To-DO.json' ,  'utf8', function (err, data )
{
    if(err)
    {
       res.send('error')
    }
    else{
        const file = JSON.parse(data)
        const id = req.query.id
        const name = req.query.name
file.array.push({
     "id": id,
     "name": name
})
const unique = new Set()
const showError = file.array.some(element => unique.size === unique.add(element.id).size)
console.log(showError)
if(showError)
{
    res.send('enter a diffrent data')
}
else{
const todojson = JSON.stringify(file)


fs.writeFile('/Users/prajwal/Ng-Next Things/node-course/TO-DO/To-DO.json', todojson,'utf8', function(err){
if(err){
    res.send('error')
}
else{
    res.send('done')

}})

}

}})

})

app.get('/delete', (req, res) => {
    if(!req.query.id){
        res.send('enter the id!!')
    }  
    fs.readFile('/Users/prajwal/Ng-Next Things/node-course/TO-DO/To-DO.json' ,  'utf8', function (err, data )
    {
        if(err)
        {
           res.send('error')
        }
        else{
            const file = JSON.parse(data)
            const key = req.query.id
            var id = file.array
            file.array = id.filter((newid) => {return newid.id !== key})
            fs.writeFileSync('/Users/prajwal/Ng-Next Things/node-course/TO-DO/To-DO.json', JSON.stringify(file, null, 2))
            res.send('tying to do something')
        }
    })

})

app.listen(3000, () => {
    console.log('server up and running!!!')
})