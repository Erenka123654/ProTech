const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const FILE = 'appointments.json';

// Randevu ekle
app.post('/api/appointments', (req,res)=>{

    const data = JSON.parse(
        fs.readFileSync(FILE)
    );

    data.push(req.body);

    fs.writeFileSync(
        FILE,
        JSON.stringify(data,null,2)
    );

    res.json({
        message:'Kaydedildi'
    });

});

// Tüm kayıtlar
app.get('/api/appointments',(req,res)=>{

    const data = JSON.parse(
        fs.readFileSync(FILE)
    );

    res.json(data);

});

app.listen(3000,()=>{

    console.log('Server Running');

});