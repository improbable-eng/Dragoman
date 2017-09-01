import * as React from 'react';
import * as ReactMD from 'react-md';

export interface ITextEntryProps {
    id: string;
    multiline?: boolean;
    value?: string | number;
    label?: string;
    placeholder?: string;
    errorText?: string;
    error?: boolean;
    required?: boolean;
    type?: ReactMD.TextFieldTypes;
    handleChange: (newValue: string | number, id: string) => void;
    handleDoubleClick?: () => void;
    handleDrop?: (event: React.DragEvent<HTMLElement>, id: string) => void;
}

function TextEntry({id, multiline = false, handleChange, handleDoubleClick, handleDrop,  label, value,
    placeholder = '', errorText, error = false, required = false, type = 'text'}: ITextEntryProps) {
    return (
        <div style={{ display: 'flex', padding: '0px 10px 0px 10px' }}>
            <ReactMD.TextField
                id={id}
                label={label}
                value={value}
                placeholder={placeholder}
                required={required}
                type={type}
                error={error}
                errorText={errorText}
                onChange={(newValue: string | number) => handleChange(newValue, id)}
                onDoubleClick={handleDoubleClick}
                rows={multiline ? 1 : undefined}
                maxRows={multiline ? -1 : undefined}
                style={{ flex: '1', margin: '0px 8px 0px 8px' }}
                lineDirection='center'
                className='md-cell md-cell--bottom'
                onDrop={handleDrop ? (event) => handleDrop(event, id) : undefined}
            />
        </div>
    );
}

export default TextEntry;
