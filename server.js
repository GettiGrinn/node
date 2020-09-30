const app = require('fastify');
const fileUpload = require('fastify-file-upload');
const cors = require('cors')
app.use(static('public'))
app.use(cors())
app.use(fileUpload());

app.post('/upload', (req, res) => {

    if (!req.files) {
        return res.status(500).send({ msg: "file is not found" })
    }

    const myFile = req.files.file;

    myFile.mv(`${__dirname}/public/${myFile.name}`, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send({ msg: "something wrong" });
        }
        return res.send({ file: myFile.name, path: `/${myFile.name}`, ty: myFile.type });
    });
})


app.listen(4500, () => {
    console.log('server is running at port 4500');
})