import { screen, cleanup, render, act} from '@testing-library/react';
import AddToSchedule from '../AddToSchedule';
import Editor from '../Editor';
import ViewSchedule from '../ViewSchedule';
import UpdateConferenceDate from '../UpdateConferenceDate';

afterEach(() => {
    cleanup();
})

it('renders AddToSchedule', () => {
    act(() => {
        render(<AddToSchedule/>);
    });
    const gridContainer = screen.getByTestId("addtoschedule-container");
    expect(gridContainer).toBeInTheDocument();
});

it('renders UpdateConference componenet without errors', () => {
    render(<UpdateConferenceDate/>);
    const divConatainer = screen.getByTestId("updateconference-container");
    expect(divConatainer).toBeInTheDocument();
});

it('renders ViewComponent componenet without errors', () => {
    render(<ViewSchedule/>);
    const divConatainer = screen.getByTestId("viewschedule-container");
    expect(divConatainer).toBeInTheDocument();
})

it('renders Editor component with all other child components', () => {
    render(<Editor isEditor={true}/>);
    const addtoscheduleContainer = screen.getByTestId("addtoschedule-container"); 
    const updateConferenceConatainer = screen.getByTestId("updateconference-container"); 
    const viewscheduleConatainer = screen.getByTestId("viewschedule-container");

    expect(addtoscheduleContainer).toBeInTheDocument();
    expect(updateConferenceConatainer).toBeInTheDocument();
    expect(viewscheduleConatainer).toBeInTheDocument();
});