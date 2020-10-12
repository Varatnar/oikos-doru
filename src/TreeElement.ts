export class TreeElement<T> implements Iterable<TreeElement<T>> {
    private parent?: TreeElement<T>;
    private readonly data: T;
    private readonly children: Array<TreeElement<T>>;

    constructor(data: T) {
        this.data = data;
        this.children = [];
    }

    public *[Symbol.iterator](): Iterator<TreeElement<T>> {
        yield* this.next(this.children);
    }

    private *next(
        data: Array<TreeElement<T>>
    ): IterableIterator<TreeElement<T>> {
        for (const child of data) {
            yield child;
            if (child.getChildren().length > 0) {
                yield* this.next(child.children);
            }
        }
    }

    /**
     * Returns the data as string of the element
     */
    public toString(): string {
        if (typeof this.data === 'string') {
            return this.data;
        } else if (
            typeof this.data === 'boolean' ||
            typeof this.data === 'number'
        ) {
            return this.data.toString();
        } else if (typeof this.data === 'object') {
            return JSON.stringify(this.data);
        }

        throw new Error(
            'Unexpected error when attempting to convert to string'
        );
    }

    /**
     * Boolean if this is the root of the tree (no parent)
     */
    public isRoot(): boolean {
        return this.parent == null;
    }

    /**
     * Retrieve the data of the element, possible to attempt to cast
     * it `getData<castType>()`
     */
    public getData<R extends T = T>(): R {
        return this.data as R;
    }

    /**
     * Takes the parameter and wraps it in a TreeElement before
     * adding it to the current TreeElement as a child
     *
     * @param child An element to add as a child
     */
    public addChild(child: T): TreeElement<T>;
    /**
     * Add the TreeElement (with all its own children) as a child
     * to the current TreeElement.
     *
     * @param child A tree element to add as a child
     */
    public addChild(child: TreeElement<T>): TreeElement<T>;
    public addChild(child: TreeElement<T> | T): TreeElement<T> {
        if (child instanceof TreeElement) {
            child.setParent(this);
            this.children.push(child);

            return child;
        }

        const newChild = new TreeElement(child);
        newChild.setParent(this);
        this.children.push(newChild);

        return newChild;
    }

    /**
     * Retrieve the array of children TreeElement
     */
    public getChildren(): Array<TreeElement<T>> {
        return this.children;
    }

    /**
     * Reset the array of children
     */
    public clearChildren(): void {
        this.children.length = 0;
    }

    /**
     * Retrieve the parent of this element if there is one.
     *
     * @return TreeElement | undefined
     */
    public getParent(): TreeElement<T> | undefined {
        return this.parent;
    }

    private setParent(parent: TreeElement<T>) {
        this.parent = parent;
    }

    public forEach(
        callback: (element: TreeElement<T>) => void,
        thisArg?: unknown
    ): void {
        thisArg = thisArg || undefined;

        this.forEachLoop(callback, this.children, thisArg);
    }

    private forEachLoop(
        callback: (element: TreeElement<T>) => void,
        loopElement: Array<TreeElement<T>>,
        thisArg?: unknown
    ): void {
        thisArg = thisArg || undefined;

        for (const child of loopElement) {
            callback.call(thisArg, child);
            if (child.children.length > 0) {
                this.forEachLoop(callback, child.children);
            }
        }
    }
}
