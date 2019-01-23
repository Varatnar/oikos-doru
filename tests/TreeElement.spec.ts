import { expect } from "chai";
import "mocha";
import { TreeElement } from "../src/TreeElement";

const DATA_FILLER = "dataFiler";

describe("TreeElement depth", () => {

    it("should have proper depth on children", () => {
        const tree = generateTree();
        expect(tree.getDepth()).to.equal(0);
        expect(tree.getChildren()[0].getDepth()).to.equals(1);
    });

});

function generateTree(): TreeElement<string> {
    const element = new TreeElement(DATA_FILLER);

    element.addDataChild(DATA_FILLER);

    return element;
}
