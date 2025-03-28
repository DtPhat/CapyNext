import { CollectionItem } from '@/lib/definitions';
import shuffle from 'lodash/shuffle';
import { isSentence } from '../../../../lib/helpers/string';

export const shuffleCollectionForFlashcard = (data: CollectionItem[]) => {
	return shuffle(data);
};

export const splitAndShuffleCollectionForMatchingGame = (
	data: CollectionItem[]
) => {
	const splitSourceTextData: DataToSplit = [];
	const splitTranslationData: DataToSplit = [];

	const shuffledData = shuffle(data);

	const n = shuffledData.length > 5 ? 5 : shuffledData.length;

	for (let i = 0; i < n; i++) {
		const { _id, sourceText, translation } = shuffledData[i];

		splitSourceTextData.push({
			id: _id,
			text: sourceText,
		});
		splitTranslationData.push({
			id: _id,
			text: translation,
		});
	}

	return {
		shuffledSourceTexts: splitSourceTextData,
		shuffledTranslations: shuffle(splitTranslationData),
	};
};

export const splitAndShuffleFourAnswers = (data: CollectionItem[]) => {
	const questionsAndAnswersData: {
		question?: MultipleChoiceData;
		answers: MultipleChoiceData[];
	}[] = [];

	const shuffledData = shuffle(data);

	const shortCollectionDifference = shuffledData.length - 4;

	for (let i = 0; i < shuffledData.length; i++) {
		const splitAnswerData: MultipleChoiceData[] = [];

		const oneQuestionAndAnswers: {
			question?: MultipleChoiceData;
			answers: MultipleChoiceData[];
		} = {
			question: undefined,
			answers: [],
		};

		const { _id, sourceText, translation } = shuffledData[i];
		splitAnswerData.push({
			id: _id,
			sourceText: sourceText,
			translation: translation,
		});
		oneQuestionAndAnswers.question = {
			id: _id,
			sourceText: sourceText,
			translation: translation,
		};
		const copyArray = shuffledData;
		copyArray.splice(i, 1);
		const random = shuffle(copyArray);
		for (let j = 0; j < 3 && j < random.length - 1; j++) {
			const { _id, sourceText, translation } = random[j];
			splitAnswerData.push({
				id: _id,
				sourceText: sourceText,
				translation: translation,
			});
		}

		oneQuestionAndAnswers.answers = shuffle(splitAnswerData);

		questionsAndAnswersData.push(oneQuestionAndAnswers);
	}

	return questionsAndAnswersData;
};

export const getWordGuessingData = (data: CollectionItem[]) => {
  const shuffledData = shuffle(data);
  const randomWordsData: string[] = [];
  const questionsBank: {
    index: number;
    question: string[];
    answer: string;
    isSentence: boolean;
  }[] = [];

  shuffledData.forEach((element) => {
    if (isSentence(element.sourceText)) {
      // Split the sentence into words using a regular expression
      const sentence = element.sourceText;

      const words = sentence.match(/\b(\w+)\b/g);

      if (words && words?.length > 0) {
        words.forEach((word) => {
          if (randomWordsData.length < 12) { // only add up to 12 words
            randomWordsData.push(word.trim());
          }
        });

        const randomIndex = Math.floor(Math.random() * words.length);

        const replacedWord = words[randomIndex];
        words[randomIndex] = '__________';

        questionsBank.push({
          index: randomIndex,
          question: words,
          answer: replacedWord,
          isSentence: true,
        });
      }
    } else {
      const word = element.sourceText.trim();
      if (randomWordsData.length < 12) { // only add up to 12 words
        randomWordsData.push(word);
      }

      const randomIndex = Math.floor(Math.random() * word.length);
      const replacedCharacter = word.charAt(randomIndex);
      let newWord = '';
      if (randomIndex === word.length - 1) {
        newWord = word.substring(0, randomIndex) + '_';
      } else {
        newWord =
          word.substring(0, randomIndex) +
          '_' +
          word.substring(randomIndex + 1);
      }

      questionsBank.push({
        index: randomIndex,
        question: newWord.split(''),
        answer: replacedCharacter,
        isSentence: false,
      });
    }
  });

  return {
    fillerAnswers: randomWordsData,
    questions: questionsBank,
  };
};

type MultipleChoiceData = {
	id: string;
	sourceText: string;
	translation: string;
};

type DataToSplit = {
	id: string;
	text: string;
}[];
