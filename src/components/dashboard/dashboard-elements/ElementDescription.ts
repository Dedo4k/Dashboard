class ElementDescription {
    private _elementType: any;
    private _title: string;
    private _description: string;

    constructor(elementType: any, title: string, description: string) {
        this._elementType = elementType;
        this._title = title;
        this._description = description;
    }

    get elementType(): any {
        return this._elementType;
    }

    set elementType(value: any) {
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