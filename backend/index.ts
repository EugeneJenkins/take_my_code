import express from 'express';
import routes from "./src/routes";
import cors from 'cors';
import "./bootsrap"

const app = express();

const PORT = process.env.APP_PORT || 5001;

app.use(cors());
app.use(express.json());

app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

