import generatedName from "util/generatedName";
import getGeneratedSpeakerId from "./getGeneratedSpeakerId";
import renderSpeakerName from "util/renderSpeakerName";

/**
 * generatedSpeakerUrl receives a speaker object and replaces all @ with ~, calls renderSpeakerName and generatedName, forms the path with the relevant env variable
 *
 * @param {string} speaker
 *
 * @returns {string} returns a valid url path to single speakers
 */
const generatedSpeakerUrl = (speaker) => {
  const generatedId = getGeneratedSpeakerId(speaker);

  return `/${
    process.env.REACT_APP_SPEAKERS_PRESENTERS_TITLE
  }/${generatedId}/${generatedName(renderSpeakerName(speaker))}`;
};

export default generatedSpeakerUrl;
