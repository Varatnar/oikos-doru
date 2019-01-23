import { expect } from "chai";
import "mocha";
import { TreeElement } from "../src/TreeElement";

const DATA_FILLER = "dataFiler";

const addDepthTo = (element: TreeElement<string>, depthness: number): TreeElement<string> => {
    if (depthness === 0) {
        return element;
    }
    const newElement = element.addChild(new TreeElement(DATA_FILLER));
    addDepthTo(newElement, depthness - 1);
};

describe("TreeElement", () => {

    const tree = new TreeElement(DATA_FILLER);
    addDepthTo(tree, 10);

    describe("with depth", () => {
        it("should have proper depth of 0 on root", () => {
            expect(tree.getDepth()).to.equal(0);
        });

        it("should have proper depth of +1 on child", () => {
            expect(tree.getChildren()[0].getDepth()).to.equal(1);
        });

        it("should have proper depth on all children", () => {
            tree.forEach(((element) => {
                expect(element.getDepth()).to.equals(element.getParent().getDepth() + 1);
            }));
        });
    });

    describe("iteration", () => {
        it("should iterate through all child element with foreach", () => {
            let counter = 0;

            tree.forEach((() => {
                counter++;
            }));

            expect(counter).to.equals(10);
        });

        it("should iterate through all child element with for of", () => {
            let counter = 0;

            // noinspection JSUnusedLocalSymbols
            for (const element of tree) {
                counter++;
            }

            expect(counter).to.equals(10);
        });
    });

    describe("basics", () => {
        it("should be possible to access wrapped data", () => {
            expect(tree.getData()).to.equals(DATA_FILLER);
        });

        it("should be possible to remove all children", () => {
            const newTree = new TreeElement(DATA_FILLER);
            addDepthTo(newTree, 2);

            expect(newTree.getChildren().length).to.equals(1);

            newTree.clearChildren();

            expect(newTree.getChildren().length).to.equals(0);
        });

        it("should return true for root on root element", () => {
            expect(tree.isRoot()).to.equals(true);
        });

        it("should return false for non root element", () => {
            tree.forEach((child) => {
                expect(child.isRoot()).to.equals(false);
            });
        });

        it("should be possible to add a child", () => {
            const newTree = new TreeElement(DATA_FILLER);

            expect(newTree.getChildren().length).to.equals(0);

            newTree.addChild(new TreeElement(DATA_FILLER));

            expect(newTree.getChildren().length).to.equal(1);
            expect(newTree.getChildren()[0].getData()).to.equal(DATA_FILLER);
        });

        it("should be possible to add data as child", () => {

            const newTree = new TreeElement(DATA_FILLER);

            expect(newTree.getChildren().length).to.equals(0);

            newTree.addDataChild(DATA_FILLER);

            expect(newTree.getChildren().length).to.equal(1);
            expect(newTree.getChildren()[0].getData()).to.equal(DATA_FILLER);
        });

    });

});
