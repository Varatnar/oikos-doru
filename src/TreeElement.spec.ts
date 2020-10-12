import { TreeElement } from './TreeElement';

const DATA_FILLER = 'dataFiler';

const addDepthTo = (
    element: TreeElement<string>,
    depthness: number
): TreeElement<string> | undefined => {
    if (depthness === 0) {
        return element;
    }
    const newElement = element.addChild(new TreeElement(DATA_FILLER));
    addDepthTo(newElement, depthness - 1);
};

describe('TreeElement', () => {
    const tree = new TreeElement(DATA_FILLER);
    addDepthTo(tree, 10);

    describe('iteration', () => {
        it('should iterate through all child treeElement with foreach', () => {
            let counter = 0;

            tree.forEach(() => {
                counter++;
            });

            expect(counter).toEqual(10);
        });

        it('should iterate through all child treeElement with for of', () => {
            let counter = 0;

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            for (const element of tree) {
                counter++;
            }

            expect(counter).toEqual(10);
        });

        it('should iterate in the correct order', () => {
            const newTree = new TreeElement('root');

            const A = 'layerOne_a';
            const B = 'layerOne_b';
            const C = 'layerTwo_a';
            const D = 'layerTwo_b';

            const expectedGenerator = function* () {
                yield A;
                yield C;
                yield D;
                yield B;
            };

            const expected = expectedGenerator();

            const childOneA = newTree.addChild(A);
            newTree.addChild(B);

            childOneA.addChild(C);
            childOneA.addChild(D);

            for (const child of newTree) {
                expect(child.toString()).toEqual(expected.next().value);
            }
        });

        it('should iterate in the correct order foreach', () => {
            const newTree = new TreeElement('root');

            const A = 'layerOne_a';
            const B = 'layerOne_b';
            const C = 'layerTwo_a';
            const D = 'layerTwo_b';

            const expectedGenerator = function* () {
                yield A;
                yield C;
                yield D;
                yield B;
            };

            const expected = expectedGenerator();

            const childOneA = newTree.addChild(A);
            newTree.addChild(B);

            childOneA.addChild(C);
            childOneA.addChild(D);

            newTree.forEach((child) => {
                expect(child.toString()).toEqual(expected.next().value);
            });
        });
    });

    describe('basics', () => {
        it('should be possible to access wrapped data', () => {
            expect(tree.getData()).toEqual(DATA_FILLER);
        });

        it('should be possible to access parent data from child', () => {
            const newTree = new TreeElement(DATA_FILLER);
            const child = newTree.addChild('someData');

            const parent = child.getParent();

            expect(parent).toEqual(newTree);
        });

        it('should be possible to remove all children', () => {
            const newTree = new TreeElement(DATA_FILLER);
            addDepthTo(newTree, 2);

            expect(newTree.getChildren().length).toEqual(1);

            newTree.clearChildren();

            expect(newTree.getChildren().length).toEqual(0);
        });

        it('should return true for root on root treeElement', () => {
            expect(tree.isRoot()).toEqual(true);
        });

        it('should return false for non root treeElement', () => {
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

            newTree.addChild(DATA_FILLER);

            expect(newTree.getChildren().length).toEqual(1);
            expect(newTree.getChildren()[0].getData()).toEqual(DATA_FILLER);
        });
    });

    describe('toString', () => {
        it.each([
            [' string', 'i am a string', 'i am a string'],
            [' number', 124, '124'],
            [' boolean', true, 'true'],
            [
                'n object',
                { alpha: 'string', beta: 432, gamma: false },
                '{"alpha":"string","beta":432,"gamma":false}',
            ],
        ])(
            'should be possible to get the string if the data is a%s',
            (_, input, expected) => {
                const tree = new TreeElement(input);

                expect(tree.toString()).toEqual(expected);
            }
        );

        it('should throw if the data is a function', () => {
            const tree = new TreeElement(() => 4);

            expect(() => tree.toString()).toThrow(Error);
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
        it('should throw when using method on bad casting', () => {
            const newTree = new TreeElement<string | number>(DATA_FILLER);
            expect(() => {
                newTree.getData<number>().toExponential();
            }).toThrow(TypeError);
        });
    });
});
