require('dotenv').config()
const azure = require('@azure/identity');
const graph = require('@microsoft/microsoft-graph-client');
const authProviders = require('@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials');

const clientSecretCredential = new azure.ClientSecretCredential(
  process.env.tenantId,
  process.env.clientId,
  process.env.clientSecret
);

const authProvider = new authProviders.TokenCredentialAuthenticationProvider(
  clientSecretCredential,
  { scopes: ['https://graph.microsoft.com/.default'] }
);

const azureClient = graph.Client.initWithMiddleware({
  authProvider: authProvider,
  defaultVersion: 'v1.0',
});

module.exports = azureClient