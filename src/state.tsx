import {memoize, observable} from "proxily";
const minX = 0;
const maxX = 400;
const minY = 0;
const maxY = 600;
class Forest {
    color = "#239923";
    treeCount = 30;
    minSize = 50;
    maxSize = 150;
    get trees() {
        console.log("Computing trees");
        const trees : Array<any> = [];
        for (let ix = 0; ix < this.treeCount; ++ix)
            trees.push([
                Math.random() * (maxX - minX) + minX,
                Math.random() * (maxY - minY) + minY,
            ]);
        console.log("reorg trees");
        return trees;
    }
}
memoize(Forest, f => f.trees);

export const state = observable(new Forest());
