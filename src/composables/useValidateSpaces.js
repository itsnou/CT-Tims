const useValidateSpaces = (inputText) => {
  return inputText.replace(/\s/g, '').length > 0
}

export default useValidateSpaces
