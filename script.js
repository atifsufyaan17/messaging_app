import {ChatHandler, chat_names} from './ChatHandler.js';

onload = function(){

    const chat_list = document.getElementById('chat-list');
    const add = document.getElementById('generate-step');
    const text = document.getElementById('temptext');

    const templates = document.getElementsByTagName('template')[0];
    const chat_template = templates.content.querySelector("li");

    const chatHandler = new ChatHandler(chat_template, chat_list);
    let chats = [];

    add.onclick = function(){
        if(Math.random()>0.75 && chats.length>0){
            let index = Math.floor(Math.random()*chats.length);
            let idToDelete = chats[index];
            chatHandler.deleteMsg(idToDelete);
            text.innerHTML = "Deleted message from " + chat_names[idToDelete] + "<br>" + text.innerHTML;
            chats.splice(index,1);
        }
        else{
            let idToAdd = Math.floor(Math.random()*7);
            if(chats.includes(idToAdd)==false){
                chats.push(idToAdd);
            }
            chatHandler.newMsg(idToAdd);
            text.innerHTML = "New message from " + chat_names[idToAdd] + "<br>" + text.innerHTML;
        }
    };
};