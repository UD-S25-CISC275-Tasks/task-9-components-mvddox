import React, { useState } from "react";
import { Button } from "react-bootstrap";
type Holiday =
    | "Halloween"
    | "Christmas"
    | "Easter"
    | "Thanksgiving"
    | "Fourth of July";

export function CycleHoliday(): React.JSX.Element {
    let [holiday, setHoliday] = useState<Holiday>("Halloween");
    let emojiMap = new Map<Holiday, string>();
    emojiMap.set("Halloween", "🎃");
    emojiMap.set("Christmas", "🎄");
    emojiMap.set("Easter", "🐣");
    emojiMap.set("Thanksgiving", "🦃");
    emojiMap.set("Fourth of July", "🧨");

    function nextAlphabetically(): void {
        holiday === "Christmas"
            ? setHoliday("Easter")
            : holiday === "Easter"
              ? setHoliday("Fourth of July")
              : holiday === "Fourth of July"
                ? setHoliday("Halloween")
                : holiday === "Halloween"
                  ? setHoliday("Thanksgiving")
                  : setHoliday("Christmas");
    }

    function nextCalendar(): void {
        holiday === "Easter"
            ? setHoliday("Fourth of July")
            : holiday === "Fourth of July"
              ? setHoliday("Halloween")
              : holiday === "Halloween"
                ? setHoliday("Thanksgiving")
                : holiday === "Thanksgiving"
                  ? setHoliday("Christmas")
                  : setHoliday("Easter");
    }

    return (
        <div>
            <Button onClick={nextAlphabetically}>Alphabet</Button>
            <Button onClick={nextCalendar}>Year</Button>Holiday:{" "}
            {emojiMap.get(holiday)}
        </div>
    );
}
