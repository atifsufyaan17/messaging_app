export {ChatHandler, chat_names}

const chat_names = ["Atif Sufyaan", "Vishant Batta", "Shubham Sharma", "Vaibhav Tyagi", "Rishank Nemawat", "Vansh Vijayvergia", "Shrey Jain"];
const chat_names_length = chat_names.length;
const chat_msg = [
    "God, he should have talked to me at least...",
    "Perfect, looking forward to your mail by this...",
    "Just meet me at the bar, around 12ish noon...",
    "Let me look into this matter and I'll let you...",
    "This is actually a crazy thing to say to any...",
    "Who do you think will propagate Khainism?"
];
const chat_msg_length = chat_msg.length;
const chat_img_length = chat_names_length;

class ChatHandler{

    constructor(chat_template, chat_list){

        this.chat_template = chat_template;
        this.chat_list = chat_list;

        this.hashmap = new Map();
        this.linked_list = null;

        let clock = new Date();
        this.hrs = clock.getHours();
        this.mins = clock.getMinutes();
    }

    getTime(){
        //Time stamp creation for messages

        this.mins+=1;

        if(this.mins==60){
            this.hrs+=1;
            this.mins=0;
        }

        if(this.hrs==24){
            this.hrs=0;
        }

        return ("0"+this.hrs).slice(-2) + ":" + ("0"+this.mins).slice(-2);
    }

    newMsg(id){
        let node = null;

        if(id in this.hashmap){
            node = this.getNodeFromList(id);
        }
        else{
            node = this.createNode(id);
            this.hashmap[id] = node;
        }

        //Adding node to head of linked list
        node['next'] = this.linked_list;        
        if(this.linked_list!=null){
            this.linked_list['prev'] = node;
        }
        this.linked_list = node;

        this.updateList();
    }

    deleteMsg(id){
        let node = this.getNodeFromList(id); //JS automatically erases this node from memory
        delete this.hashmap[id];
        this.updateList();
    }

    createNode(id){
        let node = {};

        node['prev'] = null;
        node['next'] = null;

        // Creating a copy of the chat_template
        let chat_item = this.chat_template.cloneNode(true);
        chat_item.querySelector('#Name').innerText = chat_names[id%chat_names_length];
        chat_item.querySelector('#Message').innerText = chat_msg[Math.floor(Math.random()*chat_msg_length)];
        chat_item.querySelector('#Image').src = "./images/avatar" + eval(1+id%chat_img_length) + ".png";
        console.log("./images/avatar" + eval(1+id%chat_img_length) + ".png");
        
        node['chat_item'] = chat_item;

        return node;
    }

    getNodeFromList(id){
        let node = this.hashmap[id];
        let p = node['prev'];
        let n = node['next'];

        //Update prev and next node pointers
        if(p!=null){
            p['next'] = n;
        }
        if(n!=null){
            n['prev'] = p;
        }

        //Update head if node is head
        if(node==this.linked_list){
            this.linked_list = n;
        }
        node['prev'] = null;
        node['next'] = null;

        return node;
    }

    updateList(){
        //Update contents of the chat list
        let innerHTML = "";
        let head = this.linked_list;

        while(head!=null){
            let element = head['chat_item'];

            if(head==this.linked_list){
                element.className = "ks-item ks-active";
                element.querySelector('#Time').innerText = this.getTime();
            }
            else{
                element.className = "ks-item";
            }

            innerHTML+=element.outerHTML;
            head = head['next'];
        }

        this.chat_list.innerHTML = innerHTML;
    }
}