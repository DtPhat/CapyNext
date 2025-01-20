'use server'
require('dotenv').config();
const { TextToSpeechClient } = require('@google-cloud/text-to-speech');
const { Translate } = require('@google-cloud/translate').v2;

const CREDENTIALS = JSON.parse(process.env.CREDENTIALS ?? "")

const textToSpeechClient = new TextToSpeechClient({
  credentials: CREDENTIALS,
  projectId: CREDENTIALS?.project_id
});

const translateClient = new Translate({
  credentials: CREDENTIALS,
  projectId: CREDENTIALS?.project_id
})

export async function generateSpeech(text: string) {
  const request = {
    input: { text },
    voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
    audioConfig: { audioEncoding: 'MP3' },
  };

  try {
    const [response] = await textToSpeechClient.synthesizeSpeech(request);
    const audioContent = response.audioContent;
    return audioContent;
  } catch (error) {
    console.error('Error generating speech:', error);
    throw error;
  }
}


export async function translateText(text: string) {
  const target = 'vi';
  try {
    // Translates the text into the target language. "text" can be a string for
    // translating a single piece of text, or an array of strings for translating
    // multiple texts.
    let [translations] = await translateClient.translate(text, target);
    // translations = Array.isArray(translations) ? translations : [translations];
    // console.log('Translations:');
    // translations.forEach((translation: any, i: number) => {
    //   console.log(`${text[i]} => (${target}) ${translation}`);
    // });
    return translations
  } catch (error) {
    console.log(`Error when translating --> ${error}`);
  }
}

export const detectLanguage = async (text: string) => {
  try {
    let response = await translateClient.detect(text);
    return response[0].language;
  } catch (error) {
    console.log(`Error when detecting language --> ${error}`);
    return 0;
  }
}
