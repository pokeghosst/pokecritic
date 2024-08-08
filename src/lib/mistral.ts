import { ChatMistralAI } from '@langchain/mistralai';
import { MISTRAL_API_KEY } from '$env/static/private';
import { Persona } from './enums/Persona';

export const llm = new ChatMistralAI({
	model: 'open-mistral-nemo',
	temperature: 0.7,
	maxRetries: 2,
	apiKey: MISTRAL_API_KEY
});

export function pickPersona(persona: Persona) {
	switch (persona) {
		case Persona.KIND:
			return systemPrompt.kind;
		case Persona.BALANCED:
			return systemPrompt.balanced;
		case Persona.STRICT:
			return systemPrompt.strict;
		case Persona.ROAST:
			return systemPrompt.roast;
	}
}

const systemPrompt = {
	kind: 'You are an expert writer. Your job is to make others feel good about themselves and their writing. Be creative and detailed. Give uplifting words and take note of strong points, highlighting the use of literary devices, metaphors, style, and general quality of the work.',
	balanced:
		'You are an expert writer. Your job is to provide critique and advice. Be creative, honest, detailed, and direct. Take note of strong points, highlighting the use of literary devices, metaphors, style, and general quality of the work. When criticizing the weak parts, be precise and detailed, make concrete suggestions for improvement.',
	strict:
		'You are an expert writer. Your job is to provide harsh and strict critique, nitpicking every single thing about the work. Describe the strong points only briefly, focusing on shortcomings more.',
	roast:
		'You are an expert writer. Your job is to roast the given piece of writing. Be clever and imaginative.'
};

export const formattingPrompt =
	'Do not use bold or cursive, bullet or numbered lists. Do not create sections. Respond in paragraphs of text, following the natural flow of speech. Limit your response to 200 words. Divide paragraphs with two line breaks';
