const { map } = require("@laufire/utils/collection");

const sessionsMap = {
  'connected': 'start', 
  'logged in': 'start',
  'back': 'start', 
  'break': 'end', 
  'dinner': 'end',
  'leaving': 'end',
  'logging off': 'end', 
  'logging off for the day': 'end',
  'disconnected': 'end', 
  'logged off': 'end', 
  'left': 'end', 
  'lunch': 'end',
}

const vendorsMap = {
  '32fd3a39-a618-4b35-8ded-67edc6cfba05': 'admin',
  '64191458-9eb8-4ec1-bd04-3e0012f5c3bb': 'c01',
  '03e297ec-7c3c-4d1d-a52d-f6a3703bcf88': 'Madhuri',
  '042d4e0a-d2c5-4eaf-95d4-4910ae326c90': 'Sivakami',
  '10ab6dcf-96b5-4bed-a6e1-ab37063b3ea2': 'Vairavan',
  '1d4b7c8a-1ce6-4a83-a862-8e0763c15a70': 'Ramya',
  '3f7a93ad-966e-48d0-8a76-b667f45991ce': 'Radhika',
  '65c3e917-edd4-47a8-8da0-4ed95bb83834': 'Prakash',
  'bfb84f96-c9ca-406e-a049-1c1941168006': 'Induppriyadharshini',
  'ccbf9058-0f4d-4bd7-a85c-99c255079ebd': 'Jayasutha',
  'e26e2191-1355-4e99-9888-5f2e44c42b17': 'Thaiyalnayaki',
  'fa5c341f-ab62-47d2-946f-acd40221f7e7': 'Duraimurugan',
  '0a32f02f-b80f-48fd-8eec-c63521619be6': 'rkr',
  '0a97bf7b-2f34-4073-90bc-dcb1f718c35a': 'prl',
  '0c5bf766-5732-4f5e-a01d-35a426a6458e': 'vc',
  '30f3a952-9305-4aa4-bf2d-15156d6114d6': 'nkg',
  '4e954365-9f23-4ab6-9359-acfd1c2834b4': 'njj',
  '4ed8ef2e-ba5d-4667-998a-9b4275e4e7c9': 'kpk',
  '620e0af1-e0cb-4160-83d3-fd78eccbecde': 'pdn',
  '6a8dc2b3-c3ab-4ee6-8226-c29613780fb8': 'vjg',
  '7289b99c-b3af-4c43-ab11-6f073aec3ac2': 'tpk',
  '74ea146c-2825-469e-8e5d-df630d698b1b': 'vv',
  'a9bd345b-16fb-4741-8535-4d3a622fa69f': 'ars',
  'b9903c6b-4113-433d-b3b5-ed80f53bffd6': 'nal',
  'c3d762f7-0b1f-43d0-bf33-9ec7f29abb1a': 'seg',
}

const enrichData = ({data}) => ({
  data: map(data, (message) =>{
    const date = new Date(message.time).toLocaleDateString();
    const session = sessionsMap[message.tag]
    const vendor = vendorsMap[message.id]
    return { ...message, date, session, vendor }
  })
})

module.exports=enrichData;