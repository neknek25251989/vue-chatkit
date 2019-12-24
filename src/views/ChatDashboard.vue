<template>
    <div class="chat-dashboard">
        <ChatNavBar></ChatNavBar>
        <b-container fluid class="ld-over" :class="{running: loading}">
            <div class="ld ld-ring ld-spin"></div>
            <b-row>
                <b-col cols="2">
                    <RoomList></RoomList>
                </b-col>
                <b-col cols="8">
                    <b-row>
                        <b-col id="chet-content">
                            <MessageList></MessageList>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                            <MessageForm></MessageForm>
                        </b-col>
                    </b-row>
                </b-col>
                <b-col cols="2">
                    <UserList></UserList>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import ChatNavBar from '@/components/ChatNavBar.vue'
    import RoomList from '@/components/RoomList.vue'
    import MessageList from '@/components/MessageList.vue'
    import MessageForm from '@/components/MessageForm.vue'
    import UserList from '@/components/UserList.vue'
    import { mapState } from 'vuex'
    export default {
        name: 'Chat',
        components: {
            ChatNavBar,
            RoomList,
            UserList,
            MessageList,
            MessageForm
        },
        computed: {
            ...mapState([
                'loading'
            ])
        },
    }
</script>