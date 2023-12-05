require('isomorphic-fetch');
const azure = require('@azure/identity');
const { map, values } = require('@laufire/utils/collection');
const { pretty } = require('@laufire/utils/debug');
const graph = require('@microsoft/microsoft-graph-client');
const authProviders = require('@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials');

const settings = {
  'clientId': process.env.clientId,
  'clientSecret': process.env.clientSecret,
  'tenantId': process.env.tenantId,
};

const clientSecretCredential = new azure.ClientSecretCredential(
  settings.tenantId,
  settings.clientId,
  settings.clientSecret
);

const authProvider = new authProviders.TokenCredentialAuthenticationProvider(
  clientSecretCredential,
  { scopes: ['https://graph.microsoft.com/.default'] }
);

const appClient = graph.Client.initWithMiddleware({
  authProvider: authProvider,
  defaultVersion: 'v1.0',
});

const teamId = '55e7da8b-75ab-4f4b-a083-669dced24720'
const channelId = '19:3965dddc7fa046e6a9bab2f37baa8ec6@thread.tacv2'

let data = [];

const getMessage = async (nextLink) => {
  try {
    const url = nextLink && new URL(nextLink);
    const apiUrl = url?.search || '';
    const response = await appClient.api(`/teams/${teamId}/channels/${channelId}/messages${apiUrl}`).top(50).get();
    const { value: messages, ['@odata.nextLink']: next } = response

    const result = await Promise.all(values(
      map(messages, async (message) => {
        const { id: messageId } = message;
        const { value: replies } = await appClient.api(`/teams/${teamId}/channels/${channelId}/messages/${messageId}/replies`).top(50).get();
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
  console.log(pretty(data, 2))
}

(async () => {
  await getMessage()
  saveData()
})()
