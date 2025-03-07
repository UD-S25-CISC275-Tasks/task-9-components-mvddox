import React, { useState } from "react";
import { Button } from "react-bootstrap";
type Holiday =
    | "Halloween"
    | "Christmas"
    | "Easter"
    | "Thanksgiving"
    | "New Year's";

export function CycleHoliday(): React.JSX.Element {
    let [holiday, setHoliday] = useState<Holiday>("Halloween");
    let emojiMap = new Map<Holiday, string>();
    emojiMap.set("Halloween", "🎃");
    emojiMap.set("Christmas", "🎄");
    emojiMap.set("Easter", "🐣");
    emojiMap.set("Thanksgiving", "🦃");
    emojiMap.set("New Year's", "🎉");

    function nextAlphabetically(): void {
        holiday === "Christmas" ? setHoliday("Easter")
        : holiday === "Easter" ? setHoliday("Halloween")
        : holiday === "Halloween" ? setHoliday("New Year's")
        : holiday === "New Year's" ? setHoliday("Thanksgiving")
        : setHoliday("Christmas");
    }

    function nextCalendar(): void {
        holiday === "Easter" ? setHoliday("Halloween")
        : holiday === "Halloween" ? setHoliday("Thanksgiving")
        : holiday === "Thanksgiving" ? setHoliday("Christmas")
        : holiday === "Christmas" ? setHoliday("New Year's")
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
