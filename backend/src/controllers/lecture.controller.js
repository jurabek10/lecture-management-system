import Lecture from "../models/lecture.model.js";
import dayjs from "dayjs";

export const getLecturesByDateView = async (req, res) => {
  try {
    const { view = "weekly", date } = req.query;

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    const baseDate = dayjs(date);

    let startDate, endDate;

    if (view === "daily") {
      startDate = baseDate.startOf("day").toDate();
      endDate = baseDate.endOf("day").toDate();
    } else if (view === "weekly") {
      startDate = baseDate.startOf("week").toDate();
      endDate = baseDate.endOf("week").toDate();
    } else if (view === "monthly") {
      startDate = baseDate.startOf("month").toDate();
      endDate = baseDate.endOf("month").toDate();
    } else {
      return res.status(400).json({ message: "Invalid view type" });
    }

    const lectures = await Lecture.find({
      date: { $gte: startDate, $lte: endDate },
    });

    res.status(200).json(lectures);
  } catch (error) {
    console.error("Error in getLecturesByDateView:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
