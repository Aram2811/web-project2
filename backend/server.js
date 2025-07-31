const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoute = require("./routes/authRoutes");


// خواندن متغیرهای محیطی از فایل .env
dotenv.config();

const app = express();
app.use("/api/auth", authRoute);
// Middleware برای خواندن JSON از body درخواست‌ها
app.use(express.json());
app.use(cors());

// تعریف route محصولات
const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);

// اتصال به دیتابیس MongoDB و اجرای سرور
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});
