import { Answer } from "./interfaces/answer";
import { Question, QuestionType } from "./interfaces/question";
import { makeBlankQuestion, duplicateQuestion } from "./objects";

/**
 * Consumes an array of questions and returns a new array with only the questions
 * that are `published`.
 */
export function getPublishedQuestions(questions: Question[]): Question[] {
    let pubQuestions: Question[] = questions.filter(
        (question: Question): boolean => question.published,
    );
    return pubQuestions;
}

/**
 * Consumes an array of questions and returns a new array of only the questions that are
 * considered "non-empty". An empty question has an empty string for its `body` and
 * `expected`, and an empty array for its `options`.
 */
export function getNonEmptyQuestions(questions: Question[]): Question[] {
    let nonEmpQuestions: Question[] = questions.filter(
        (question: Question): boolean =>
            question.body != "" ||
            question.expected != "" ||
            question.options.length != 0,
    );
    return nonEmpQuestions;
}

/***
 * Consumes an array of questions and returns the question with the given `id`. If the
 * question is not found, return `null` instead.
 */
export function findQuestion(
    questions: Question[],
    id: number,
): Question | null {
    let idQuestion: Question | undefined = questions.find(
        (question: Question): boolean => question.id === id,
    );
    if (idQuestion === undefined) {
        return null;
    }
    return idQuestion;
}

/**
 * Consumes an array of questions and returns a new array that does not contain the question
 * with the given `id`.
 */
export function removeQuestion(questions: Question[], id: number): Question[] {
    let removedQuestions: Question[] = questions.filter(
        (question: Question): boolean => question.id != id,
    );
    return removedQuestions;
}

/***
 * Consumes an array of questions and returns a new array containing just the names of the
 * questions, as an array.
 */
export function getNames(questions: Question[]): string[] {
    let nameArr: string[] = questions.map(
        (question: Question): string => question.name,
    );
    return nameArr;
}

/***
 * Consumes an array of questions and returns the sum total of all their points added together.
 */
export function sumPoints(questions: Question[]): number {
    let sum: number = questions.reduce(
        (sum: number, question: Question) => sum + question.points,
        0,
    );
    return sum;
}

/***
 * Consumes an array of questions and returns the sum total of the PUBLISHED questions.
 */
export function sumPublishedPoints(questions: Question[]): number {
    let pubQuestions: Question[] = getPublishedQuestions(questions);
    return sumPoints(pubQuestions);
}

/***
 * Consumes an array of questions, and produces a Comma-Separated Value (CSV) string representation.
 * A CSV is a type of file frequently used to share tabular data; we will use a single string
 * to represent the entire file. The first line of the file is the headers "id", "name", "options",
 * "points", and "published". The following line contains the value for each question, separated by
 * commas. For the `options` field, use the NUMBER of options.
 *
 * Here is an example of what this will look like (do not include the border).
 *`
id,name,options,points,published
1,Addition,0,1,true
2,Letters,0,1,false
5,Colors,3,1,true
9,Shapes,3,2,false
` *
 * Check the unit tests for more examples!
 */
export function toCSV(questions: Question[]): string {
    let CSV: string = "id,name,options,points,published\n";
    let csvArr: string[] = questions.map(
        (question: Question): string =>
            question.id.toString() +
            "," +
            question.name +
            "," +
            question.options.length +
            "," +
            question.points.toString() +
            "," +
            question.published.toString(),
    );
    CSV += csvArr.join("\n");
    return CSV;
}

/**
 * Consumes an array of Questions and produces a corresponding array of
 * Answers. Each Question gets its own Answer, copying over the `id` as the `questionId`,
 * making the `text` an empty string, and using false for both `submitted` and `correct`.
 */
export function makeAnswers(questions: Question[]): Answer[] {
    let answers: Answer[] = questions.map(
        (question: Question): Answer => ({
            questionId: question.id,
            text: "",
            submitted: false,
            correct: false,
        }),
    );
    return answers;
}

export function createDeepCopy(questions: Question[]): Question[] {
    return questions.map(
        (question: Question): Question => ({
            ...question,
            options: [...question.options],
        }),
    );
}

/***
 * Consumes an array of Questions and produces a new array of questions, where
 * each question is now published, regardless of its previous published status.
 */
export function publishAll(questions: Question[]): Question[] {
    let quesCopy: Question[] = createDeepCopy(questions);
    quesCopy = quesCopy.map(
        (question: Question): Question => ({ ...question, published: true }),
    );
    return quesCopy;
}

/***
 * Consumes an array of Questions and produces whether or not all the questions
 * are the same type. They can be any type, as long as they are all the SAME type.
 */
export function sameType(questions: Question[]): boolean {
    let multChoiceIndex: number = questions.findIndex(
        (question: Question): boolean =>
            question.type === "multiple_choice_question",
    );
    let shortAnsIndex: number = questions.findIndex(
        (question: Question): boolean =>
            question.type === "short_answer_question",
    );
    if (multChoiceIndex != -1 && shortAnsIndex != -1) {
        return false;
    }
    return true;
}

/***
 * Consumes an array of Questions and produces a new array of the same Questions,
 * except that a blank question has been added onto the end. Reuse the `makeBlankQuestion`
 * you defined in the `objects.ts` file.
 */
export function addNewQuestion(
    questions: Question[],
    id: number,
    name: string,
    type: QuestionType,
): Question[] {
    let blankQuestion: Question = makeBlankQuestion(id, name, type);
    let newQuestions: Question[] = [...questions, blankQuestion];
    return newQuestions;
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its name should now be `newName`.
 */
export function renameQuestionById(
    questions: Question[],
    targetId: number,
    newName: string,
): Question[] {
    let dpCpy: Question[] = createDeepCopy(questions);
    let foundQuestion: Question | undefined = dpCpy.find(
        (question: Question): boolean => question.id === targetId,
    );
    if (foundQuestion === undefined) {
        return dpCpy;
    }
    foundQuestion.name = newName;
    return dpCpy;
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `type` should now be the `newQuestionType`
 * AND if the `newQuestionType` is no longer "multiple_choice_question" than the `options`
 * must be set to an empty list.
 */
export function changeQuestionTypeById(
    questions: Question[],
    targetId: number,
    newQuestionType: QuestionType,
): Question[] {
    let dpCpy: Question[] = createDeepCopy(questions);
    let foundQuestion: Question | undefined = dpCpy.find(
        (question: Question): boolean => question.id === targetId,
    );
    if (
        newQuestionType === "short_answer_question" &&
        foundQuestion != undefined
    ) {
        foundQuestion.options = [];
        foundQuestion.type = newQuestionType;
    } else if (foundQuestion != undefined) {
        foundQuestion.type = newQuestionType;
    }
    return dpCpy;
}

/**
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `option` array should have a new element.
 * If the `targetOptionIndex` is -1, the `newOption` should be added to the end of the list.
 * Otherwise, it should *replace* the existing element at the `targetOptionIndex`.
 *
 * Remember, if a function starts getting too complicated, think about how a helper function
 * can make it simpler! Break down complicated tasks into little pieces.
 */
export function editOption(
    questions: Question[],
    targetId: number,
    targetOptionIndex: number,
    newOption: string,
): Question[] {
    let dpCpy: Question[] = createDeepCopy(questions);
    let foundQuestion: Question | undefined = dpCpy.find(
        (question: Question): boolean => question.id === targetId,
    );
    if (foundQuestion === undefined) {
        return dpCpy;
    }
    if (targetOptionIndex === -1) {
        foundQuestion.options = [...foundQuestion.options, newOption];
    } else {
        foundQuestion.options[targetOptionIndex] = newOption;
    }
    return dpCpy;
}

/***
 * Consumes an array of questions, and produces a new array based on the original array.
 * The only difference is that the question with id `targetId` should now be duplicated, with
 * the duplicate inserted directly after the original question. Use the `duplicateQuestion`
 * function you defined previously; the `newId` is the parameter to use for the duplicate's ID.
 */
export function duplicateQuestionInArray(
    questions: Question[],
    targetId: number,
    newId: number,
): Question[] {
    let dpCpy: Question[] = createDeepCopy(questions);
    let targetIndex: number = questions.findIndex(
        (question: Question): boolean => question.id === targetId,
    );
    if (targetIndex === -1) {
        return dpCpy;
    }
    let dupe: Question = duplicateQuestion(newId, dpCpy[targetIndex]);
    let leftSide: Question[] = dpCpy.slice(0, targetIndex + 1);
    let rightSide: Question[] = dpCpy.slice(targetIndex + 1, dpCpy.length);
    let combined: Question[] = [...leftSide, dupe, ...rightSide];
    return combined;
}
