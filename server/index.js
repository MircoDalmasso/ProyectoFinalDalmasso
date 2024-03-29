import express from "express";
import cors from "cors";

// SDK de Mercado Pago
import { MercadoPagoConfig, Preference } from 'mercadopago';
// Agrega credenciales
const client = new MercadoPagoConfig({ accessToken: "TEST-6293246131631581-020821-bdfbcd7e9009bc2b321a12eaed534bf9-1298293813" });

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req,res) =>{
    res.send("Soy el server");
});

app.post("/create_preference", async (req, res) =>{
    try{
        const body = {
            items: [{
                title: req.body.title,
                quantity: Number(req.body.quantity),
                unit_price: Number(req.body.price),
                currency_id: "ARS",
            },],
            back_urls: {
                success: "index.html",
                failure: "index.html",
                pending: "index.html"
            },
            auto_return: "approved",
        };

        const preference = new Preference(client);
        const result = await preference.create({body});
        res.json({
            id: result.id,
        });
    }catch{
        res.status(500).json({
            error: "Error al crear la preferencia"
        });
    };
});

app.listen(port, ()=>{
    console.log(`El server esta corriendo en el puerto ${port}`);
});