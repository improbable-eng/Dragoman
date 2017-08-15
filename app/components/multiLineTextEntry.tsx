import * as React from "react";
import * as ReactMD from "react-md";

export interface IMultiLineTextEntryProps {
    id: string;
    value?: string | string[];
    label?: string;
    placeholder?: string;
    errorText?: string;
    error?: boolean;
    required?: boolean;
    handleChange: (id: string, newValue: string) => void;
    handleDoubleClick: () => void;
}

function MultiLineTextEntry({id, handleChange, handleDoubleClick, label, value,
    placeholder = "", errorText, error = false, required = false}: IMultiLineTextEntryProps) {
    let val: string | undefined;

    if (value instanceof Array) {
        val = value.join(",\n");
    } else {
        val = value;
    }

    return (
        <div style={{ display: "flex", padding: "0px 10px 0px 10px" }}>
            <ReactMD.TextField
                id={id}
                label={label}
                value={val}
                placeholder={placeholder}
                required={required}
                errorText={errorText}
                onChange={(newValue) => handleChange(id, newValue as string)}
                onDoubleClick={handleDoubleClick}
                rows={1}
                maxRows={-1}
                style={{ flex: "1", margin: "0px 8px 0px 8px" }}
                lineDirection="center"
                className="md-cell md-cell--bottom"
            />
        </div>
    );
}

export default MultiLineTextEntry;
