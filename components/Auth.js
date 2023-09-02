// import { Alert } from 'react-native';
// import { authorize } from 'react-native-app-auth';

// const spotifyConfig = {
//     clientId: '80ba12ab960340ab83d812829acc8cac',
//     redirectUrl: 'exp://192.168.0.105:8081',
//     scopes: ['user-read-email', 'user-library-read'], // Define the scopes you need
//     serviceConfiguration: {
//       authorizationEndpoint: 'https://accounts.spotify.com/authorize',
//       tokenEndpoint: 'https://accounts.spotify.com/api/token',
//     },
// };
  



// async function startSpotifyPKCEFlow() {
// try {
//     await authorize(spotifyConfig);
//     // console.log('Auth State:', authState);
//     Alert.alert('hurray');
// } catch (error) {
//     // console.error('Authentication Error:', error);
//     Alert.alert('try again');
// }
// }
  
import axios from 'axios';
import { AsyncStorage } from 'react-native';

const clientId = '80ba12ab960340ab83d812829acc8cac';
const redirectUri = 'exp://192.168.0.105:8081'; // Replace with your redirect URI

async function startSpotifyPKCEFlow() {
  try {
    // Generate code verifier and code challenge
    const codeVerifier = generateRandomString(128);
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    // Generate state and scope
    const state = generateRandomString(16);
    const scope = 'user-read-private user-read-email';

    // Store code verifier in AsyncStorage
    await AsyncStorage.setItem('code_verifier', codeVerifier);

    // Construct authorization URL
    const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}&state=${state}&code_challenge_method=S256&code_challenge=${codeChallenge}`;

    // Redirect the user to the Spotify authorization page
    // Handle the redirection in your app as needed.
    console.log('Redirect URL:', authUrl);
  } catch (error) {
    console.error('Authentication Error:', error);
  }
}

// ... Rest of your code ...

async function getToken(code) {
  const codeVerifier = await AsyncStorage.getItem('code_verifier');
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: 'exp://192.168.0.105:8081',
    client_id: clientId,
    code_verifier: codeVerifier,
  }).toString();

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (!response.ok) {
      throw new Error('HTTP status ' + response.status);
    }

    const data = response.data;
    await AsyncStorage.setItem('access_token', data.access_token);
  } catch (error) {
    console.error('Error:', error);
  }
}

async function getProfile() {
  try {
    const accessToken = await AsyncStorage.getItem('access_token');

    const response = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    });

    const data = response.data;
    console.log('Spotify Profile:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}




export default startSpotifyPKCEFlow