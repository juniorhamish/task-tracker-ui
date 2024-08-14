import { Checkbox, FormControlLabel, TextField } from '@mui/material';
import { ChangeEvent, useEffect, useReducer } from 'react';

interface HoursOfOperationDay {
  start: string;
  end: string;
}
interface HoursOfOperation {
  monday?: HoursOfOperationDay;
  tuesday?: HoursOfOperationDay;
  wednesday?: HoursOfOperationDay;
  thursday?: HoursOfOperationDay;
  friday?: HoursOfOperationDay;
  saturday?: HoursOfOperationDay;
  sunday?: HoursOfOperationDay;
}
interface DayProps {
  label: string;
  value?: HoursOfOperationDay;
  previousDay?: HoursOfOperationDay;
  onChange: (day: string, value?: HoursOfOperationDay) => void;
}

interface TimeFieldProps {
  label: string;
  hour: number;
  minute: number;
  disabled: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function TimeField({ label, hour, minute, disabled, onChange }: Readonly<TimeFieldProps>) {
  return (
    <TextField
      label={label}
      disabled={disabled}
      value={`${hour.toString(10).padStart(2, '0')}:${minute.toString(10).padStart(2, '0')}`}
      onChange={onChange}
    />
  );
}

function Day({ label, value, previousDay, onChange }: Readonly<DayProps>) {
  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            checked={!!value}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              onChange(label, event.target.checked ? (previousDay ?? { start: '00:00', end: '00:00' }) : undefined);
            }}
          />
        }
        label={label}
      />
      <TimeField
        label="Start"
        hour={value ? Number.parseInt(value.start.substring(0, 2), 10) : 0}
        minute={value ? Number.parseInt(value.start.substring(3), 10) : 0}
        disabled={!value}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          onChange(label, { start: event.target.value, end: value ? value.end : '00:00' });
        }}
      />
      <TimeField
        label="End"
        hour={value ? Number.parseInt(value.end.substring(0, 2), 10) : 0}
        minute={value ? Number.parseInt(value.end.substring(3), 10) : 0}
        disabled={!value}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          onChange(label, { start: value ? value.end : '00:00', end: event.target.value });
        }}
      />
    </div>
  );
}

interface HoursOfOperationAction {
  type: string;
  payload?: HoursOfOperationDay;
}

function HoursOfOperationEditorReducer(state: HoursOfOperation, action: HoursOfOperationAction): HoursOfOperation {
  switch (action.type) {
    case 'updateMonday':
      return { ...state, monday: action.payload };
    case 'updateTuesday':
      return { ...state, tuesday: action.payload };
    case 'updateWednesday':
      return { ...state, wednesday: action.payload };
    case 'updateThursday':
      return { ...state, thursday: action.payload };
    case 'updateFriday':
      return { ...state, friday: action.payload };
    case 'updateSaturday':
      return { ...state, saturday: action.payload };
    case 'updateSunday':
      return { ...state, sunday: action.payload };
    default:
      throw new Error('Invalid action type');
  }
}

interface HoursOfOperationEditorProps {
  hoursOfOperation: HoursOfOperation;
  onChange: (hoursOfOperation: HoursOfOperation) => void;
}

export default function HoursOfOperationEditor({ hoursOfOperation, onChange }: Readonly<HoursOfOperationEditorProps>) {
  const [state, dispatch] = useReducer(HoursOfOperationEditorReducer, hoursOfOperation);
  const updateDay = (day: string, value?: HoursOfOperationDay) => {
    dispatch({ type: `update${day}`, payload: value });
  };
  useEffect(() => {
    onChange(state);
  }, [state, onChange]);
  return (
    <div>
      <Day label="Monday" value={state.monday} onChange={updateDay} />
      <Day label="Tuesday" value={state.tuesday} previousDay={state.monday} onChange={updateDay} />
      <Day label="Wednesday" value={state.wednesday} previousDay={state.tuesday} onChange={updateDay} />
      <Day label="Thursday" value={state.thursday} previousDay={state.wednesday} onChange={updateDay} />
      <Day label="Friday" value={state.friday} previousDay={state.thursday} onChange={updateDay} />
      <Day label="Saturday" value={state.saturday} previousDay={state.friday} onChange={updateDay} />
      <Day label="Sunday" value={state.sunday} previousDay={state.saturday} onChange={updateDay} />
    </div>
  );
}
