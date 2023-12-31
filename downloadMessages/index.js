require('isomorphic-fetch');
const fs = require('fs');
const { map, values } = require('@laufire/utils/collection');
const { pretty } = require('@laufire/utils/debug');
const azureClient = require('./azureClient');

const teamId = '55e7da8b-75ab-4f4b-a083-669dced24720'
const channelId = '19:3965dddc7fa046e6a9bab2f37baa8ec6@thread.tacv2'

let data = [];

const getMessage = async (nextLink) => {
  try {
    const url = nextLink && new URL(nextLink);
    const apiUrl = url?.search || '';
    const response = await azureClient.api(`/teams/${teamId}/channels/${channelId}/messages${apiUrl}`).top(50).get();
    const { value: messages, ['@odata.nextLink']: next } = response

    const result = await Promise.all(values(
      map(messages, async (message) => {
        const { id: messageId } = message;
        const { value: replies } = await azureClient.api(`/teams/${teamId}/channels/${channelId}/messages/${messageId}/replies`).top(50).get();
        return { ...message, replies: replies.reverse()}
      })
    ))
    data = [...data, ...result]
    next && await getMessage(next)

  } catch (error) {
    console.error(error)
  }
};

const saveData = () => {
  fs.open('data/source.json','w+', (err, fd)=>{
    fs.write(fd, pretty(data, 2), () => {})
  })
}

const downloadMessages = async () => {
  await getMessage()
  saveData()
}

module.exports = downloadMessages
