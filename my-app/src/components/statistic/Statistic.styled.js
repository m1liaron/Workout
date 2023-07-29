import styled from "@emotion/styled";

export const StyledInput = styled.input`
  appearance: none;
  box-sizing: border-box;
  border: 1px solid rgb(75, 104, 197);
  outline: none;
  color: #fff;
  background: transparent;
  font-size: 1.5rem;
  padding: 8px;
  ::-webkit-datetime-edit-month-field { text-transform: uppercase; }
  ::-webkit-datetime-edit-day-field { text-transform: uppercase; }
  ::-webkit-datetime-edit-year-field { text-transform: uppercase; }
  ::-webkit-inner-spin-button { display: none; }
  ::-webkit-calendar-picker-indicator { background: transparent;}
  &:focus {
    border: 1px solid rgb(75, 104, 207);
  }
`