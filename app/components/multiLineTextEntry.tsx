import * as React from 'react';
import * as ReactMD from 'react-md';

export interface IMultiLineTextEntryProps {
    id: string;
    value?: string;
    label?: string;
    placeholder?: string;
    errorText?: string;
    error?: boolean;
    required?: boolean;
    handleChange: (newValue: string) => void;
    handleDoubleClick?: () => void;
    handleBlur?: () => void;
}

function MultiLineTextEntry({id, handleChange, handleDoubleClick, handleBlur, label, value,
    placeholder = '', errorText, error = false, required = false}: IMultiLineTextEntryProps) {
    return (
        <div style={{ display: 'flex', padding: '0px 10px 0px 10px' }}>
            <ReactMD.TextField
                id={id}
                label={label}
                value={value}
                placeholder={placeholder}
                required={required}
                error={error}
                errorText={errorText}
                onChange={handleChange}
                onDoubleClick={handleDoubleClick}
                onBlur={handleBlur}
                rows={1}
                maxRows={-1}
                style={{ flex: '1', margin: '0px 8px 0px 8px' }}
                lineDirection='center'
                className='md-cell md-cell--bottom'
            />
        </div>
    );
}

export default MultiLineTextEntry;
