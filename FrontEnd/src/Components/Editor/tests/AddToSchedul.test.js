import React from 'react';
import { getByTestId, render} from '@testing-library/react';
import AddToSchedule from '../AddToSchedule';
import Editor from '../Editor';


it('renders AddToSchedule without errors', () => {
    const {container} = render(<AddToSchedule />);
    const researchPaperTogglettonText = getByTestId(container, "load-papers");
    
    expect(researchPaperTogglettonText.textContent).toBe("Research Papers")
});

it('renders ViewSchedule from Editor', () => {    
    const {getByText} = render(<Editor />);
    expect(getByText(/Research Papers/i)).toBeInTheDocument();
});

it('renders AddToSchedule from Editor', () => {    
    const {getByTestId} = render(<Editor />);
    expect(getByTestId("load-papers")).toBeInTheDocument();
});

it('renders UpdateConferenceDate from Editor', () => {    
    const {getByText} = render(<Editor />);
    expect(getByText(/Current Conference Start Date:/i)).toBeInTheDocument();
});
