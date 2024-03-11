// Imports the Google Cloud client library
// const { Translate } = require('@google-cloud/translate').v2;
import GoogleCloudTranslate from '@google-cloud/translate';
// Creates a client
const {Translate} = GoogleCloudTranslate.v2
const translate = new Translate();

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
async function translateText(text: string) {
  const target = 'vi';

  // Translates the text into the target language. "text" can be a string for
  // translating a single piece of text, or an array of strings for translating
  // multiple texts.
  let [translations] = await translate.translate(text, target);
  // translations = Array.isArray(translations) ? translations : [translations];
  // console.log('Translations:');
  // translations.forEach((translation: any, i: number) => {
  //   console.log(`${text[i]} => (${target}) ${translation}`);
  // });
  return translations
}

export default translateText;