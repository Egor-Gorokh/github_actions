import express from 'express';
 
const app = express();
const PORT = process.env.PORT || 4545;
 
app.get('/ping', (req, res) => {
  res.send({ message: 'pong' });
});
 
app.listen(PORT, () => {
  console.log(`Server ruvddvdусус nning on http://localhost:${PORT}`);
});
 
export default app;