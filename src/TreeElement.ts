export class TreeElement<T> implements Iterable<TreeElement<T>> {
    private parent?: TreeElement<T>;
    private readonly data: T;
    private children: Array<TreeElement<T>>;
    private readonly depth: number;

    constructor(data: T, depth: number = 0) {
        this.data = data;
        this.children = [];
        this.depth = depth;
    }

    public* [Symbol.iterator](): Iterator<TreeElement<T>> {
        yield* this.next(this.children);
    }

    private* next(data: Array<TreeElement<T>>): IterableIterator<TreeElement<T>> {
        for (const child of data) {
            yield child;
            if (child.getChildren().length > 0) {
                yield* this.next(child.children);
            }
        }
    }

    public toString(): string {
        return this.data.toString();
    }

    public isRoot(): boolean {
        return !this.parent;
    }

    public getDepth(): number {
        return this.depth;
    }

    public getData<R extends T = T>(): R {
        return this.data as R;
    }

    public addDataChild(newData: T): TreeElement<T> {
        const child = new TreeElement<T>(newData, this.depth + 1);
        child.setParent(this);
        this.children.push(child);

        return child;
    }

    /**
     *  Only retrieves its data!
     *
     * @param newChild
     */
    public addChild(newChild: TreeElement<T>): TreeElement<T> {

        const child = new TreeElement<T>(newChild.getData(), this.depth + 1);
        child.setParent(this);
        this.children.push(child);

        return child;
    }

    public getChildren(): Array<TreeElement<T>> {
        return this.children;
    }

    public clearChildren(): void {
        this.children = [];
    }

    public getParent(): TreeElement<T> {
        return this.parent;
    }

    private setParent(parent: TreeElement<T>) {
        this.parent = parent;
    }

    public forEach(callback: (element: TreeElement<T>) => void, thisArg?: any): void {
        thisArg = thisArg || undefined;

        this.forEachLoop(callback, this.children, thisArg);
    }

    private forEachLoop(callback: (element: TreeElement<T>) => void, loopElement: Array<TreeElement<T>>, thisArg?: any): void {
        thisArg = thisArg || undefined;

        for (const child of loopElement) {
            callback.call(thisArg, child);
            if (child.children.length > 0) {
                this.forEachLoop(callback, child.children);
            }
        }
    }
}
