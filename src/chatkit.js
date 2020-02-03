import { ChatManager, TokenProvider } from '@pusher/chatkit-client'
import moment from 'moment'
import store from './store/index'

const INSTANCE_LOCATOR = 'v1:us1:eb09d50b-83e5-44d1-bbbb-3b1729b21614';
const TOKEN_URL = 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/eb09d50b-83e5-44d1-bbbb-3b1729b21614/token';
const MESSAGE_LIMIT = 10;

let currentUser = null;
let activeRoom = null;

async function connectUser(userId) {
    const chatManager = new ChatManager({
        instanceLocator: INSTANCE_LOCATOR,
        tokenProvider: new TokenProvider({ url: TOKEN_URL }),
        userId
    });
    currentUser = await chatManager.connect();
    return currentUser;
}

function setMembers() {
    const members = activeRoom.users.map(user => ({
        username: user.id,
        name: user.name,
        presence: user.presence.state
    }));
    store.commit('setUsers', members);
}

async function subscribeToRoom(roomId) {
    store.commit('clearChatRoom');
    activeRoom = await currentUser.subscribeToRoom({
        roomId,
        messageLimit: MESSAGE_LIMIT,
        hooks: {
            onMessage: message => {
                store.commit('addMessage', {
                    name: message.sender.name,
                    username: message.senderId,
                    text: message.text,
                    date: moment(message.createdAt).format('h:mm:ss a D-MM-YYYY')
                });
            },
            onPresenceChanged: () => {
                setMembers();
            },
            onUserStartedTyping: user => {
                store.commit('setUserTyping', user.id)
            },
            onUserStoppedTyping: () => {
                store.commit('setUserTyping', null)
            }
        }
    });
    setMembers();
    return activeRoom;
}

export default {
    connectUser,
    subscribeToRoom
}