import * as React from 'react';
import * as ReactMD from 'react-md';

import { SETTINGS_IDS } from '../reducers/settingsData';

const styles = require('./textEntry.scss');

export interface ITextEntryProps {
    id: SETTINGS_IDS;
    multiline?: boolean;
    value?: string | number;
    label?: string;
    placeholder?: string;
    errorText?: string;
    error?: boolean;
    required?: boolean;
    type?: ReactMD.TextFieldTypes;
    handleChange: (newValue: string, settingdId: SETTINGS_IDS) => void;
    handleDoubleClick?: (settingsId: SETTINGS_IDS, message?: string) => void;
    handleDrop?: (event: React.DragEvent<HTMLElement>, settingsId: SETTINGS_IDS) => void;
}

export default function TextEntry({id, multiline = false, handleChange, handleDoubleClick, handleDrop,  label, value,
    placeholder = '', errorText, error = false, required = false, type = 'text'}: ITextEntryProps) {
    return (
        <div className={styles.container}>
            <ReactMD.TextField
                id={id}
                label={label}
                value={value}
                placeholder={placeholder}
                required={required}
                type={type}
                error={error}
                errorText={errorText}
                onChange={(newValue: string) => handleChange(newValue, id)}
                onDoubleClick={handleDoubleClick ? () => handleDoubleClick(id, `Select ${label}`) : undefined}
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
