import express from 'express';

const app = express();
const PORT = process.env.PORT || 5001;

// Пример API маршрута
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from the server' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

