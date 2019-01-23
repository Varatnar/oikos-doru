import { expect } from "chai";
import "mocha";
import { TreeElement } from "../src/TreeElement";

const DATA_FILLER = "dataFiler";

describe("TreeElement depth", () => {

    const tree = new TreeElement(DATA_FILLER);
    addDepthTo(tree, 10);

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

function addDepthTo(element: TreeElement<string>, depthness: number): TreeElement<string> {
    if (depthness === 0) {
        return element;
    }
    const newElement = element.addChild(new TreeElement(DATA_FILLER));
    addDepthTo(newElement, depthness - 1);
}
