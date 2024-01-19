const crypto = require("crypto")

const generateHash = (content) => crypto.createHash("sha256")
.update(content)
.digest("hex");

class merkleTree {
    constructor(name, content, level, parent){
        this.name = name;
        this.conent = content;
        this.level = level;
        this.parent = parent;

        this.children = []

        this.hash = generateHash(JSON.stringify({
            name, level, content
        }))
    }

    setContent(content) {
        this.content = content;
        this.hash = generateHash(JSON.stringify({
            type: this.type,
            name: this.name,
            level: this.level,
            content: this.content
        }))

        this.parent.updateChildrenHashes()        
    }


    updateChildrenHashes(){
        this.hash = generateHash(this.getChildHashes())
        this.parent && this.parent.updateChildrenHashes();
    }

    getChildHashes(){
        return this.children.reduce((previous, current) => previous += current.hash, "")
    }

    addChild(node) {
        this.children.push(node);
        this.hash = generateHash(this.getChildHashes())
    }
}

const root = new merkleTree("rootnode", "root", 0, );
const child1 = new merkleTree("child1", "content child 1", root.level + 1, root);
const child2 = new merkleTree("child2", "content child 2", root.level + 1, root);
const child3 = new merkleTree("child3", "content child 3", child1.level + 1, child1); 

child1.addChild(child3);
root.addChild(child1);
root.addChild(child2);

console.log(root.hash);