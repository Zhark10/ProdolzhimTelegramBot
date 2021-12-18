export const getFactStepSize = (userText, currentStoryState) => {
  const additionalPart = userText.replace(currentStoryState, '');
  return additionalPart.split(' ').length
} 
