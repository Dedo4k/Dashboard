import SimpleElement, {SimpleElementProps, SimpleElementState} from "../simple-element";

class ElementDescription {
    private _elementType: (props: SimpleElementProps) => SimpleElement<SimpleElementProps, SimpleElementState>;
    private _title: string;
    private _description: string;

    constructor(elementType: any, title: string, description: string) {
        this._elementType = elementType;
        this._title = title;
        this._description = description;
    }

    get elementType(): (props: SimpleElementProps) => SimpleElement<SimpleElementProps, SimpleElementState> {
        return this._elementType;
    }

    set elementType(value: (props: SimpleElementProps) => SimpleElement<SimpleElementProps, SimpleElementState>) {
        this._elementType = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }
}

export default ElementDescription;