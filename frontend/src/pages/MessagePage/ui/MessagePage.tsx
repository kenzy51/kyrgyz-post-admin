import { observer } from 'mobx-react-lite';
import React from 'react';
import MessagesComponent from 'src/widgets/MessagesTable';

export const MessagePage = observer(() => {
    return (
        <div>
            <h3>Сообщения</h3>
            <MessagesComponent/>
        </div>
    );
})
