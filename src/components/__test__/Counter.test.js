import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom'
import { Counter } from "../Counter";

describe("Counter Component Test",()=>{
    test("render the textArea",()=>{
        const {getByPlaceholderText} = render(<Counter/>)
        const textArea = getByPlaceholderText("Type or paste your text")
        expect(textArea).toBeTruthy
    })
    
    test("render the character result",()=>{
        const {getByTestId} = render(<Counter/>)
        const charLength = getByTestId("charLength")
        expect(charLength.innerHTML).toBe("Character: 0")
    }) 

    test("render the word result",()=>{
        render(<Counter/>)
        const wordLength = screen.getByText("Word: 0")   // using document so import jest dom at the top
        expect(wordLength).toBeInTheDocument()
    })

    test("change textArea and update result", async () => {
        render(<Counter />);
        const textArea = screen.getByTestId("textArea");
        const charLength = screen.getByTestId("charLength");
        const wordLength = screen.getByTestId("wordLength");
    
        await userEvent.type(textArea, "shubham");
        expect(charLength).toHaveTextContent("Character: 7");
        expect(wordLength).toHaveTextContent("Word: 1");
    });
    
    test("clear textArea and update result", async () => {
        render(<Counter />);
        const textArea = screen.getByTestId("textArea");
        const clearBtn = screen.getByTestId("clearBtn")
        const charLength = screen.getByTestId("charLength");
        const wordLength = screen.getByTestId("wordLength");
    
        await userEvent.type(textArea, "hrishi");
        expect(charLength).toHaveTextContent("Character: 6");
        expect(wordLength).toHaveTextContent("Word: 1");

        fireEvent.click(clearBtn)                                 // we can use fireEvent or userEvent
        expect(charLength.innerHTML).toBe("Character: 0") 
        expect(wordLength.innerHTML).toBe("Word: 0")
    });
})

