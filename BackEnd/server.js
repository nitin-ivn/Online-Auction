const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();


const User = require("./models/User");
const Auction = require("./models/Auction");
const Bid = require("./models/Bid");


app.use(express.json());
app.use(cors());


mongoose.connect(process.env.MONGO_URI, {
})
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));


const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};


app.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ firstName, lastName, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


app.post("/Createauction", authMiddleware, async (req, res) => {
  try {
    const { title, description, image, startingPrice, minimumBid, endTime } = req.body;

    const auction = new Auction({
      title,
      description,
      image,
      startingPrice,
      minimumBid,
      highestBid: startingPrice,
      endTime,
      createdBy: req.user.id,
    });

    await auction.save();
    res.status(201).json({ message: "Auction created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});



app.get("/auctions", async (req, res) => {
  try {
    const ongoingAuctions = await Auction.find({ endTime: { $gt: new Date() } }).populate("createdBy", "firstName lastName");
    res.json(ongoingAuctions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


app.post("/bid", authMiddleware, async (req, res) => {
  try {
    const { auctionId, amount } = req.body;

    const auction = await Auction.findById(auctionId);
    if (!auction) return res.status(404).json({ message: "Auction not found" });

    if (new Date() > new Date(auction.endTime)) {
      return res.status(400).json({ message: "Auction has ended" });
    }

    if (amount < auction.highestBid + auction.minimumBid) {
      return res.status(400).json({ message: `Bid must be at least ${auction.highestBid + auction.minimumBid}` });
    }

    const bid = new Bid({ auction: auctionId, bidder: req.user.id, amount });
    await bid.save();

    auction.highestBid = amount;
    auction.highestBidder = req.user.id;
    await auction.save();

    res.status(201).json({ message: "Bid placed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
