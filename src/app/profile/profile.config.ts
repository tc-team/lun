/*
* Profle configuration
* links and tabs
*/

export const StepsMap = {
  '1': 'general',
  '2': 'location',
  '3': 'social',
  '4': 'favorite'
};

export const StepsDescription = {
  1: { number: '1', name: 'general', descr: 'Enter name and email' },
  2: { number: '2', name: 'location', descr: 'Enter location' },
  3: { number: '3', name: 'social', descr: 'Provide social network links' },
  4: { number: '4', name: 'favorite', descr: 'Select your favourite pet' }
};

export const SocialList = [
  { value: 'fb', display: 'Facebook', placeholder: 'Your page on Facebook' },
  { value: 'vk', display: 'Вконтакте', placeholder: 'Your page on Вконтакте' },
  { value: 'tw', display: 'Twitter', placeholder: 'Your page on Twitter' },
  { value: 'ok', display: 'Одноклассники', placeholder: 'Your page on Одноклассники ' }
];

export const PetsList = [
  { name: 'cat1', pictureUrl: 'assets/images/cat1.jpg', type: 'cat' },
  { name: 'cat2', pictureUrl: 'assets/images/cat2.jpg', type: 'cat' },
  { name: 'cat3', pictureUrl: 'assets/images/cat3.jpg', type: 'cat' },
  { name: 'dog4', pictureUrl: 'assets/images/dog4.jpg', type: 'dog' }
];
