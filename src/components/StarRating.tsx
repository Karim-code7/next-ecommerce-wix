"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.div
          key={star}
          whileTap={{ scale: 0.8 }}
          whileHover={{ scale: 1.2 }}
          onClick={() => setRating(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className="cursor-pointer"
        >
          <Star
            className={`w-5 h-5 transition-colors ${
              (hover || rating) >= star
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-400"
            }`}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default StarRating;
