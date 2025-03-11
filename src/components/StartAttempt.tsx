import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function StartAttempt(): React.JSX.Element {
    let [attempts, setAttempts] = useState<number>(4);
    let [prog, setProg] = useState<boolean>(false);

    function startQuiz(): void {
        setProg(true);
        setAttempts(attempts - 1);
    }

    function stopQuiz(): void {
        setProg(false);
    }

    function mulligan(): void {
        setAttempts(attempts + 1);
    }

    return (
        <div>
            <Button onClick={startQuiz} disabled={prog || attempts === 0}>
                Start Quiz
            </Button>
            <Button onClick={stopQuiz} disabled={!prog}>
                Stop Quiz
            </Button>
            <Button onClick={mulligan} disabled={prog}>
                Mulligan
            </Button>
            <div>{attempts}</div>
        </div>
    );

    //Start attempt
}
