import { TreeElement } from './TreeElement';

const DATA_FILLER = 'dataFiler';

const addDepthTo = (
    element: TreeElement<string>,
    depthness: number
): TreeElement<string> => {
    if (depthness === 0) {
        return element;
    }
    const newElement = element.addChild(new TreeElement(DATA_FILLER));
    addDepthTo(newElement, depthness - 1);
};

describe('TreeElement', () => {
    const tree = new TreeElement(DATA_FILLER);
    addDepthTo(tree, 10);

    describe('with depth', () => {
        it('should have proper depth of 0 on root', () => {
            expect(tree.getDepth()).toEqual(0);
        });

        it('should have proper depth of +1 on child', () => {
            expect(tree.getChildren()[0].getDepth()).toEqual(1);
        });

        it('should have proper depth on all children', () => {
            tree.forEach((element) => {
                expect(element.getDepth()).toEqual(
                    element.getParent().getDepth() + 1
                );
            });
        });
    });

    describe('iteration', () => {
        it('should iterate through all child element with foreach', () => {
            let counter = 0;

            tree.forEach(() => {
                counter++;
            });

            expect(counter).toEqual(10);
        });

        it('should iterate through all child element with for of', () => {
            let counter = 0;

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            for (const element of tree) {
                counter++;
            }

            expect(counter).toEqual(10);
        });
    });

    describe('basics', () => {
        it('should be possible to access wrapped data', () => {
            expect(tree.getData()).toEqual(DATA_FILLER);
        });

        it('should be possible to remove all children', () => {
            const newTree = new TreeElement(DATA_FILLER);
            addDepthTo(newTree, 2);

            expect(newTree.getChildren().length).toEqual(1);

            newTree.clearChildren();

            expect(newTree.getChildren().length).toEqual(0);
        });

        it('should return true for root on root element', () => {
            expect(tree.isRoot()).toEqual(true);
        });

        it('should return false for non root element', () => {
            tree.forEach((child) => {
                expect(child.isRoot()).toEqual(false);
            });
        });

        it('should be possible to add a child', () => {
            const newTree = new TreeElement(DATA_FILLER);

            expect(newTree.getChildren().length).toEqual(0);

            newTree.addChild(new TreeElement(DATA_FILLER));

            expect(newTree.getChildren().length).toEqual(1);
            expect(newTree.getChildren()[0].getData()).toEqual(DATA_FILLER);
        });

        it('should be possible to add data as child', () => {
            const newTree = new TreeElement(DATA_FILLER);

            expect(newTree.getChildren().length).toEqual(0);

            newTree.addDataChild(DATA_FILLER);

            expect(newTree.getChildren().length).toEqual(1);
            expect(newTree.getChildren()[0].getData()).toEqual(DATA_FILLER);
        });
    });

    describe('type casting', () => {
        // todo: not exhaustive
        it('should be able to cast from list of given type', () => {
            const newTree = new TreeElement<string | number>(DATA_FILLER);

            expect(newTree.getData<string>().toUpperCase()).toEqual(
                DATA_FILLER.toUpperCase()
            );
        });

        // limitation : Can attempt casting to wrong type
        // it("should throw when using method on bad casting", () => {
        //     const newTree = new TreeElement<string | number>(DATA_FILLER);
        //     expect(() => {
        //         newTree.getData<number>().toExponential();
        //     }).to.throw(TypeError);
        // });
    });
});
