import React, { createContext, FC, useContext, useState } from "react";
import { GetQuizQuery } from "../GraphQL/useGetQuiz";

export interface IPlayQuizContext{
    quiz?: GetQuizQuery;
    setQuiz: (newQuiz: GetQuizQuery) => void;
}

export const PlayQuizContext = createContext<IPlayQuizContext>({
    quiz: undefined,
    setQuiz: () => null
});

export const usePlayQuizContext = () => useContext(PlayQuizContext);

export const PlayQuizContextProvider: FC<{children:any, quiz: GetQuizQuery}> = ({children, quiz}) => {
    const [_,setQuiz] = useState<GetQuizQuery>(quiz);

    return (
        <PlayQuizContext.Provider
         value={{quiz: quiz, setQuiz: setQuiz}}
        >
        {children}            
        </PlayQuizContext.Provider>
    );
}