import express from "express";
import Acronym from "./acronymModel";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { page, limit, search } = req.query;
    const pageNumber = parseInt(page as string) || 1;
    const pageSize = parseInt(limit as string) || 10;
    const query = search ? { acronym: { $regex: search, $options: "i" } } : {};
    const acronyms = await Acronym.find(query)
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    const totalCount = await Acronym.countDocuments(query);

    res.header("X-Total-Count", totalCount.toString());
    res.json(acronyms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching acronyms" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newAcronym = new Acronym(req.body);
    await newAcronym.save();
    res.status(201).json(newAcronym);
  } catch (error) {
    res.status(500).json({ message: "Error creating acronym" });
  }
});

router.patch("/:acronymID", async (req, res) => {
  try {
    const updatedAcronym = await Acronym.findByIdAndUpdate(
      req.params.acronymID,
      req.body,
      { new: true }
    );
    if (updatedAcronym) {
      res.json(updatedAcronym);
    } else {
      res.status(404).json({ message: "Acronym not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating acronym" });
  }
});

router.delete("/:acronymID", async (req, res) => {
  try {
    const deletedAcronym = await Acronym.findByIdAndRemove(
      req.params.acronymID
    );
    if (deletedAcronym) {
      res.json({ message: "Acronym deleted" });
    } else {
      res.status(404).json({ message: "Acronym not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting acronym" });
  }
});

export default router;
