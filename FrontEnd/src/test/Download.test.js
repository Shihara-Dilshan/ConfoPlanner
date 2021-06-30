import React from 'react';
import ReactDOM from 'react-dom';
import Download from './../Components/Home';
import { react } from '@testing-library/react';
import "jest-dom/extend-expect";

it('renders without any problem', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Download />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('render content correctly' , () => {
    const {getByTestId} = render(<Download />)
    expect(getByTestId('researchlabel')).toHaveTextContent('Download Research Papers');
})

it('render content correctly' , () => {
    const {getByTestId} = render(<Download />)
    expect(getByTestId('workshoplabel')).toHaveTextContent('Download Workshop Presentations');
})

